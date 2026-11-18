/* 재잘 · speech in/out, on-device LLM (WebLLM). Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- device features (all optional; the core loop works with none) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const caps = { dict: !!SR, ready: true };
try { localStorage.setItem("malmun.probe","1"); localStorage.removeItem("malmun.probe"); store.ok = true; } catch(e) {}

/* speech out: sentences and words recorded with an open neural voice (audio/, made by tools/tts/gen.py) play from files;
   anything else (AI replies, the learner's own saved sentences) falls back to the device's English voice */
let enVoice = null;
const VOICE_RANK = [/premium/i, /enhanced/i, /neural|natural|online/i, /Samantha|Google|Aria|Jenny|Ava|Allison|Zoe|Evan|Nathan/i];
function pickVoice(){ try { const vs = speechSynthesis.getVoices(); const us = vs.filter(v=>/^en[-_]US/i.test(v.lang));
  const pool = us.length ? us : vs.filter(v=>/^en/i.test(v.lang)); const score = v => { const i = VOICE_RANK.findIndex(r=>r.test(v.name)); return i < 0 ? 9 : i; };
  enVoice = pool.slice().sort((a,b)=>score(a)-score(b))[0] || null; } catch(e){} }
try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch(e) {}
function canSpeak(){ return "speechSynthesis" in window || hasClips(); }
const hasClips = () => typeof AUDIO !== "undefined" && typeof chunkId === "function";
/* which file plays this text: alt picks the second recorded voice when there is one */
function clipFor(text, alt){
  if (!hasClips() || !text) return null; const t = String(text).trim();
  let k = chunkId(t), v = AUDIO[k];
  if (!v && /^[A-Za-z'-]+$/.test(t)) { k = chunkId(t.toLowerCase()); v = AUDIO[k]; }
  if (!v) return null;
  return "audio/" + k + "-" + v[alt && v.length > 1 ? 1 : 0] + ".m4a";
}
const hasAltVoice = text => { const c1 = clipFor(text), c2 = clipFor(text, true); return !!c1 && c1 !== c2; };
const player = typeof Audio !== "undefined" ? new Audio() : null;
let stopCur = null, clipsUnlocked = false;
/* iOS plays media only after a tap: start the shared player once inside the first tap so later automatic plays work */
const SILENT = "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQIAAAAAAA==";
function unlockClips(){ if (clipsUnlocked || !player || !player.paused) return; clipsUnlocked = true;
  try { player.src = SILENT; const p = player.play(); if (p) p.then(()=>{ if (player.src === SILENT) player.pause(); }).catch(()=>{}); } catch(e) {} }
addEventListener("pointerdown", unlockClips, {capture:true}); addEventListener("keydown", unlockClips, {capture:true});
function playClip(src, rate, onStart){ return new Promise(res => {
  let done = false; let timer; const end = ok => { if (done) return; done = true; clearTimeout(timer); if (stopCur === stop) stopCur = null; player.onended = player.onerror = player.onplaying = null; res(ok); };
  const stop = () => { try { player.pause(); } catch(e) {} end(null); };
  if (stopCur) stopCur(); stopCur = stop;
  try { player.src = src; player.defaultPlaybackRate = player.playbackRate = rate; if ("preservesPitch" in player) player.preservesPitch = true;
    player.onplaying = onStart; player.onended = () => end(true); player.onerror = () => end(false);
    const p = player.play(); if (p) p.catch(() => end(false)); timer = setTimeout(() => { player.pause(); end(false); }, 20000);
  } catch(e) { end(false); } }); }
function hush(){ if (stopCur) stopCur(); try { speechSynthesis.cancel(); } catch(e) {} }
function speakTTS(text, rate, onStart, m){ return new Promise(res => { if (!("speechSynthesis" in window)) return res(false);
  const timer = setTimeout(() => done(false), 12000);
  function done(ok){ clearTimeout(timer); res(ok); }
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang="en-US"; if (enVoice) u.voice=enVoice; u.rate = rate;
    u.onstart = onStart; u.onboundary = () => { if (m) { m.classList.add("open"); setTimeout(()=>m.classList.remove("open"), 90); } };
    u.onend = () => done(true); u.onerror = () => done(false); speechSynthesis.speak(u);
  } catch(_) { done(false); } }); }
/* opts.alt: the other recorded voice · opts.exact: play at this rate, ignoring the speed setting */
async function say(text, rate=1, btn, who, opts={}){
  const m = who || speaker;
  if (btn) btn.setAttribute("aria-pressed","true");
  let flap = null; const onStart = () => { if (m && !flap) { setMood(m,"talk"); flap = setInterval(()=>m.classList.toggle("open", Math.random() > .35), 120); } };
  const r = opts.exact ? rate : rate * (S.settings.rate||1);
  const src = player && clipFor(text, opts.alt);
  hush();
  const ok = src ? await playClip(src, r, onStart) : false;
  const played = ok === false ? await speakTTS(text, r, onStart, m) : ok;
  clearInterval(flap); if (m) { m.classList.remove("open"); if (m.classList.contains("talk")) setMood(m,"idle"); }
  if (btn) btn.setAttribute("aria-pressed","false");
  return played === true;
}
/* lets the learner keep every recorded clip for offline use (the service worker stores what is fetched) */
function clipList(){ return hasClips() ? Object.entries(AUDIO).flatMap(([k,v]) => [...v].map(i => "audio/"+k+"-"+i+".m4a")) : []; }
async function saveClipsOffline(onProgress){ const list = clipList(); let n = 0, fail = 0; const q = list.slice();
  const worker = async () => { while (q.length) { const u = q.shift(); try { const r = await fetch(u); if (!r.ok) fail++; } catch(e) { fail++; } n++; if (onProgress) onProgress(n, list.length); } };
  await Promise.all([1,2,3,4,5,6].map(worker)); return {n, fail}; }
function speakBtn(text, label="듣기", rate=1){ const b = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span></span>"}); b.querySelector("span").textContent=label; b.onclick=()=>say(text,rate,b); return b; }

/* speech in: the browser's speech recognition (Chrome on Android, Safari on iOS 14.5+) */
let rec = null, micStalls = 0;
/* stop for good: abort() where stop() never fires "end" (seen in iPhone home-screen apps) */
function killDict(){ const r = rec; rec = null; if (!r) return; try { r.abort(); } catch(e) { try { r.stop(); } catch(_) {} } document.querySelectorAll(".mic.live").forEach(m=>m.classList.remove("live")); }
function refreshMics(){ document.querySelectorAll(".mic").forEach(m=>m.hidden=!caps.dict); }
function micFor(field){
  const b = h("button",{class:"mic",type:"button","aria-label":"말해서 입력",html:ICON.mic});
  b.hidden = !caps.dict;
  b.onclick = () => {
    if (rec) { try { rec.stop(); } catch(e){} return; }
    hush();
    const r = new SR(); rec = r;
    r.lang = "en-US"; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    const base = field.value.trim() ? field.value.trim()+" " : "";
    /* speaking time for fluency (WPM): from the first recognized sound to the last result */
    let tFirst = 0, tLast = 0;
    /* no sound recognized within 8s: give up instead of showing "듣고 있어요…" forever; after two such stalls, switch to typing */
    const watchdog = setTimeout(() => { if (rec !== r || tFirst) return; killDict(); field.placeholder = field.dataset.ph || "";
      micStalls++; if (micStalls >= 2) { caps.dict = false; refreshMics(); toast("이 기기에서는 음성 인식이 응답하지 않아 타이핑으로 진행해요."); }
      else toast("음성 인식이 응답하지 않아요. 한 번 더 눌러 보거나 입력해 주세요.");
      if (typeof field._onStall === "function") field._onStall(micStalls); }, 8000);
    r.onresult = e => { let fin = "", inter = ""; const now = Date.now(); if (!tFirst) tFirst = now; tLast = now;
      for (let i=0;i<e.results.length;i++){ const x = e.results[i]; if (x.isFinal) fin += x[0].transcript; else inter += x[0].transcript; }
      field.value = (base + fin).trim(); field.placeholder = inter || "듣고 있어요…"; field.dispatchEvent(new Event("input")); };
    r.onerror = e => {
      if (e.error==="not-allowed"||e.error==="service-not-allowed") { caps.dict = false; refreshMics(); toast("마이크 권한이 없어 타이핑으로 진행해요."); }
      else if (e.error==="no-speech") toast("소리가 들리지 않았어요. 다시 눌러 말해 주세요.");
      else if (e.error==="network") toast("음성인식에 인터넷 연결이 필요해요.");
    };
    r.onend = () => { clearTimeout(watchdog); b.classList.remove("live"); field.placeholder = field.dataset.ph || ""; if (rec === r) rec = null;
      if (tFirst && tLast > tFirst) field.dataset.speechMs = String(Number(field.dataset.speechMs||0) + (tLast - tFirst) + 400);
      if (typeof field._onSpoken === "function" && field.value.trim()) field._onSpoken(); };
    try { r.start(); b.classList.add("live"); field.placeholder = "듣고 있어요…"; } catch(e) { rec = null; }
  };
  return b;
}
async function stopDict(){ const r = rec; if (!r) return; await new Promise(res => { r.addEventListener("end", res, {once:true}); try { r.stop(); } catch(e) { res(); } setTimeout(res, 1500); }); if (rec === r) killDict(); }

/* ---------- on-device LLM (WebLLM + WebGPU). Weights download once, then stay in the browser cache. ---------- */
const WEBLLM_URL = "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/+esm";
const MODELS = [
  {key:"std", nm:"표준 · Qwen2.5 1.5B", sub:"대부분의 최신 폰. 한국어 번역도 무난해요.", sz:"약 1GB", f16:"Qwen2.5-1.5B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-1.5B-Instruct-q4f32_1-MLC"},
  {key:"lite", nm:"가벼움 · Qwen2.5 0.5B", sub:"메모리가 적은 폰. 대화가 단순해요.", sz:"약 400MB", f16:"Qwen2.5-0.5B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-0.5B-Instruct-q4f32_1-MLC"},
  {key:"pro", nm:"고품질 · Qwen2.5 3B", sub:"노트북이나 고사양 폰. 교정이 더 정확해요.", sz:"약 2GB", f16:"Qwen2.5-3B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-3B-Instruct-q4f32_1-MLC"}
];
const llm = { lib:null, engine:null, modelId:null, key:null, gpu:undefined, loading:false };
let modelPick = (()=>{ try { return localStorage.getItem("malmun.model") || "std"; } catch(e){ return "std"; } })();
async function gpuInfo(){
  if (llm.gpu !== undefined) return llm.gpu;
  try { if (!navigator.gpu) return (llm.gpu = null); const a = await navigator.gpu.requestAdapter(); llm.gpu = a ? {f16: a.features.has("shader-f16")} : null; }
  catch(e) { llm.gpu = null; }
  return llm.gpu;
}
function modelIdFor(key, gpu){ const m = MODELS.find(x=>x.key===key) || MODELS[0]; return gpu && gpu.f16 ? m.f16 : m.f32; }
async function libLoad(){ if (!llm.lib) llm.lib = await import(WEBLLM_URL); return llm.lib; }
async function isCached(key){ try { const gpu = await gpuInfo(); if (!gpu) return false; const lib = await libLoad(); return await lib.hasModelInCache(modelIdFor(key, gpu)); } catch(e) { return false; } }
async function loadLLM(key, onProgress){
  const gpu = await gpuInfo(); if (!gpu) throw new Error("nogpu");
  const id = modelIdFor(key, gpu);
  if (llm.engine && llm.modelId === id) return;
  llm.loading = true;
  try {
    const lib = await libLoad();
    if (llm.engine) { try { await llm.engine.unload(); } catch(e){} llm.engine = null; }
    if (llm.worker) { try { llm.worker.terminate(); } catch(e){} llm.worker = null; }
    /* prefer a Web Worker so generation never freezes the UI; fall back to the main thread */
    try {
      llm.worker = new Worker(new URL("./worker.js", location.href), { type: "module" });
      llm.engine = await lib.CreateWebWorkerMLCEngine(llm.worker, id, { initProgressCallback: onProgress });
    } catch(e) {
      if (llm.worker) { try { llm.worker.terminate(); } catch(_){} llm.worker = null; }
      if (/memory|OOM|allocate|Device was lost/i.test(String(e && e.message || e))) throw e;
      llm.engine = await lib.CreateMLCEngine(id, { initProgressCallback: onProgress });
    }
    llm.modelId = id; llm.key = key;
    try { localStorage.setItem("malmun.model", key); } catch(e){}
  } finally { llm.loading = false; }
}
function parseLoose(t){
  try { return JSON.parse(t); } catch(e){}
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a > -1 && b > a) { try { return JSON.parse(t.slice(a, b+1)); } catch(e){} }
  return null;
}
async function llmJSON(system, user, maxTokens=280){
  const r = await llm.engine.chat.completions.create({
    messages:[{role:"system",content:system},{role:"user",content:user}],
    temperature:0.6, max_tokens:maxTokens, response_format:{type:"json_object"}
  });
  const txt = (r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content) || "";
  return parseLoose(txt) || {reply: txt.trim()};
}
