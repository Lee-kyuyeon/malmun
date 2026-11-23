/* 재잘 · free pronunciation check: record yourself, stop automatically when you finish (energy-based voice activity
   detection on the phone), compare with the native recording, and score accuracy · completeness · fluency word by word.
   Words come from the browser's speech recognition when it can run alongside the recording; rhythm and pauses come
   from the audio itself, so fluency works even without recognition.
   Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
const PRON = { FRAME_MS: 30, SILENCE_END_MS: 1200, MAX_MS: 12000, MIN_SPEECH_MS: 250 };
const canRecord = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

/* ---------- pure analysis (tested with synthetic input in tests/pron.js) ---------- */
/* frames: RMS per 30 ms. Noise floor from the quietest 20% of frames; speech is well above it. Returns voiced segments. */
function vadSegments(frames, frameMs = PRON.FRAME_MS){
  if (!frames.length) return {segments:[], floor:0, thr:0};
  const sorted = [...frames].sort((a,b) => a-b), floor = sorted[Math.floor(sorted.length * .2)] || 0;
  const thr = Math.max(floor * 3, 0.012);
  const segs = []; let start = -1, quiet = 0;
  frames.forEach((v, i) => {
    if (v > thr) { if (start < 0) start = i; quiet = 0; }
    else if (start >= 0 && ++quiet * frameMs >= 180) { segs.push([start, i - quiet + 1]); start = -1; quiet = 0; }
  });
  if (start >= 0) segs.push([start, frames.length - quiet]);
  return {segments: segs.map(([a,b]) => ({start:a*frameMs, end:b*frameMs})).filter(s => s.end - s.start >= 60), floor, thr};
}
/* fluency: speaking time against the native clip, and pauses longer than 400 ms in the middle of the sentence */
function fluencyScore(segments, nativeMs){
  if (!segments.length) return {score:0, speechMs:0, pauses:0};
  const speechMs = segments[segments.length-1].end - segments[0].start;
  let pauses = 0; for (let i = 1; i < segments.length; i++) if (segments[i].start - segments[i-1].end >= 400) pauses++;
  const pace = nativeMs ? Math.min(1, (nativeMs * 1.25) / Math.max(speechMs, 1)) : 1;
  return {score: Math.max(0, Math.min(1, pace - pauses * .12)), speechMs, pauses};
}
/* words: each target word is matched to what was recognised (order kept); a near miss (one letter off) counts half */
function wordScores(target, heard){
  const T = toks(target), H = toks(heard||""); const r = lcs(H, T);
  return T.map((w, j) => { if (r.keepB.has(j)) return {w, s:1};
    const near = H.some(x => x.length > 2 && oneEdit(x, w)); return {w, s: near ? .5 : 0}; });
}
function pronScore(target, heard, segments, nativeMs, hasRecognition){
  const flu = fluencyScore(segments, nativeMs);
  if (!hasRecognition) return {words:null, accuracy:null, completeness:null, fluency:flu.score, total:Math.round(flu.score*100), flu};
  const ws = wordScores(target, heard);
  const completeness = ws.filter(x => x.s > 0).length / Math.max(1, ws.length);
  const accuracy = ws.reduce((a,x) => a + x.s, 0) / Math.max(1, ws.length);
  return {words:ws, accuracy, completeness, fluency:flu.score, total:Math.round((.45*accuracy + .3*completeness + .25*flu.score) * 100), flu};
}

/* ---------- recording ---------- */
/* resolves with {blob, frames, heard, recognized} when the learner stops talking (or taps stop) */
async function recordSpeech(onLevel, stopSignal){
  const stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true, noiseSuppression:true}});
  const ac = new (window.AudioContext || window.webkitAudioContext)(); const src = ac.createMediaStreamSource(stream);
  const an = ac.createAnalyser(); an.fftSize = 1024; src.connect(an); const buf = new Float32Array(an.fftSize);
  const mime = ["audio/webm;codecs=opus","audio/mp4","audio/webm"].find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || "";
  const rec = new MediaRecorder(stream, mime ? {mimeType:mime} : undefined); const chunks = []; rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  let heard = "", recognized = false, sr = null;
  if (caps.dict && SR) { try { sr = new SR(); sr.lang = "en-US"; sr.interimResults = false; sr.continuous = true; sr.maxAlternatives = 1;
    sr.onresult = e => { let t = ""; for (let i = 0; i < e.results.length; i++) if (e.results[i].isFinal) t += e.results[i][0].transcript + " "; heard = t.trim(); recognized = true; };
    sr.onerror = () => {}; sr.start(); } catch(e) { sr = null; } }
  rec.start(100);
  const frames = []; const t0 = performance.now(); let spoke = false, quietMs = 0;
  return new Promise(resolve => {
    const tick = setInterval(() => {
      an.getFloatTimeDomainData(buf); let s = 0; for (let i = 0; i < buf.length; i++) s += buf[i]*buf[i]; const rms = Math.sqrt(s / buf.length);
      frames.push(rms); if (onLevel) onLevel(rms);
      const floor = Math.min(...frames.slice(0, 10)), thr = Math.max(floor * 3, 0.012);
      if (rms > thr) { spoke = true; quietMs = 0; } else if (spoke) quietMs += PRON.FRAME_MS;
      const elapsed = performance.now() - t0;
      if ((spoke && quietMs >= PRON.SILENCE_END_MS) || elapsed >= PRON.MAX_MS || (stopSignal && stopSignal.stop)) finish();
    }, PRON.FRAME_MS);
    let done = false;
    const finish = () => { if (done) return; done = true; clearInterval(tick);
      rec.onstop = () => { stream.getTracks().forEach(t => t.stop()); ac.close().catch(()=>{});
        /* recognition results arrive a moment after the audio ends */
        setTimeout(() => { try { sr && sr.stop(); } catch(e) {} setTimeout(() => resolve({blob: new Blob(chunks, {type: rec.mimeType || "audio/webm"}), frames, heard, recognized}), 500); }, 200); };
      try { rec.stop(); } catch(e) { resolve({blob:null, frames, heard, recognized}); } };
  });
}
/* the native clip's length and loudness envelope, for the pace comparison and the rhythm picture */
async function nativeEnvelope(text){
  const src = typeof clipFor === "function" && player && location.protocol !== "file:" ? clipFor(text) : null; if (!src) return null;
  try { const res = await fetch(src); const ab = await res.arrayBuffer(); const ac = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
    const audio = await ac.decodeAudioData(ab); const ch = audio.getChannelData(0), step = Math.round(audio.sampleRate * PRON.FRAME_MS / 1000), frames = [];
    for (let i = 0; i < ch.length; i += step) { let s = 0; const n = Math.min(step, ch.length - i); for (let k = 0; k < n; k++) s += ch[i+k]*ch[i+k]; frames.push(Math.sqrt(s / n)); }
    const v = vadSegments(frames); const segs = v.segments;
    return {frames, ms: segs.length ? segs[segs.length-1].end - segs[0].start : audio.duration * 1000};
  } catch(e) { return null; }
}
function envelopeEl(frames, cls){
  const mx = Math.max(...frames, .0001), n = Math.min(60, frames.length), step = frames.length / n;
  return h("div",{class:"env " + cls,"aria-hidden":"true"}, ...[...Array(n)].map((_, i) => h("i",{style:`height:${Math.max(4, frames[Math.floor(i*step)] / mx * 100)}%`})));
}

/* ---------- the sheet ---------- */
function openPronounce(en, ko){
  if (!canRecord()) { toast("이 브라우저에서는 녹음을 쓸 수 없어요."); return; }
  openSheet("발음 연습", async inner => {
    const nat = nativeEnvelope(en);
    const kpis = h("div",{class:"kpis pa-kpis"}); const words = h("p",{class:"pa-words prompt-en"}, en); const envs = h("div",{class:"pa-envs"}); const note = h("p",{class:"ctx"});
    const level = h("div",{class:"pa-level","aria-hidden":"true"}, h("i",{}));
    const mine = h("button",{class:"speak",type:"button",disabled:true,html:ICON.spk+"<span>나의 발음</span>"});
    const go = h("button",{class:"primary pa-go",type:"button","data-act":"pa-record"}, "말하기");
    inner.append(words, ko ? h("p",{class:"ctx"}, ko) : "", h("div",{class:"row"}, speakBtn(en,"원어민 발음"), mine), level, go, kpis, envs, note);
    let url = null, signal = null;
    mine.onclick = () => { if (!url) return; const a = new Audio(url); a.play().catch(()=>{}); };
    go.onclick = async () => {
      if (signal) { signal.stop = true; return; }
      hush(); signal = {stop:false}; go.textContent = "말하기 완료"; go.classList.add("live"); note.textContent = "듣고 있어요… 다 말하면 잠시 멈추면 돼요.";
      let r; try { r = await recordSpeech(v => { level.firstChild.style.width = Math.min(100, v * 600) + "%"; }, signal); }
      catch(e) { signal = null; go.textContent = "말하기"; go.classList.remove("live"); note.textContent = "마이크를 쓸 수 없어요. 설정에서 마이크 권한을 허용해 주세요."; return; }
      signal = null; go.textContent = "다시 말하기"; go.classList.remove("live"); level.firstChild.style.width = "0";
      if (url) URL.revokeObjectURL(url); url = r.blob && r.blob.size ? URL.createObjectURL(r.blob) : null; mine.disabled = !url;
      const n = await nat, segs = vadSegments(r.frames).segments;
      if (!segs.length) { note.textContent = "소리가 거의 안 들렸어요. 마이크에 조금 더 가까이 말해 볼래요?"; return; }
      const res = pronScore(en, r.heard, segs, n && n.ms, r.recognized);
      const pct = x => x == null ? "–" : Math.round(x*100) + "";
      kpis.replaceChildren(...[["총점", res.total], ["정확도", pct(res.accuracy)], ["완성도", pct(res.completeness)], ["유창함", pct(res.fluency)]].map(([l, v]) => h("div",{class:"kpi"}, h("b",{}, String(v)), h("span",{}, l))));
      if (res.words) { words.replaceChildren(...res.words.flatMap((x, i) => [i ? " " : "", h("button",{class:"pa-w " + (x.s >= 1 ? "ok" : x.s > 0 ? "near" : "miss"),type:"button",onclick:()=>say(x.w, .9)}, x.w)])); }
      envs.replaceChildren(h("small",{class:"ctx"},"리듬 비교 (위: 원어민, 아래: 나)"), n ? envelopeEl(n.frames, "nat") : "", envelopeEl(r.frames, "me"));
      note.textContent = (res.words ? (res.completeness < 1 ? `빨간 단어가 잘 안 들렸어요. 눌러서 들어 보고 다시 해 봐요. ` : "모든 단어가 들렸어요! ") : "이 기기에서는 단어 인식이 안 돼서 리듬과 속도만 봤어요. ")
        + (res.flu.pauses ? `중간에 ${res.flu.pauses}번 끊겼어요. 덩어리로 이어 말해 봐요.` : n && res.flu.speechMs > n.ms * 1.4 ? "원어민보다 꽤 느려요. 한 번 더 듣고 리듬을 따라 해 봐요." : "끊김 없이 자연스러웠어요.");
      sfx(res.total >= 80 ? "combo" : "ding"); track("shadow");
      S.pron = [{t:Date.now(), en, total:res.total}, ...(S.pron||[])].slice(0, 30); save();
    };
  });
}
