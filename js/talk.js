/* 재잘 · AI role-play. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- TALK: AI role-play with recasts, hints, missions ---------- */
function viewTalk(app, preferredTag){
  const m = mascot(80); speaker = m;
  app.append(h("p",{class:"eyebrow"},"AI 상황극"), h("section",{class:"greet"}, m, h("div",{class:"bubble"}, h("b",{},"말로 써 봐야 남아!"), "상황을 고르면 내가 역할을 맡을게. 틀려도 괜찮아, 힌트 주고 다시 말할 기회를 줄게.")),
    h("p",{class:"ctx"},"AI 대화는 이 기기 안에서 처리돼요. 음성 입력은 브라우저의 음성인식 서비스를 써요."));
  const setup = h("section",{class:"card-s"});
  const list = h("div",{class:"scen"});
  const li = LEVELS.indexOf(myLevel());
  const distance = sc => Math.abs(LEVELS.indexOf(sc.lvl)-li);
  [...SCENARIOS].sort((a,b)=>Number(b.tag===preferredTag)-Number(a.tag===preferredTag) || distance(a)-distance(b)).forEach(sc => list.append(h("button",{onclick:()=>startTalk(sc)}, h("span",{class:"lvl"}, sc.lvl), h("div",{}, h("div",{class:"t"}, sc.t), h("div",{class:"d"}, sc.d + (sc.lvl===myLevel() ? " · 내 레벨" : ""))), h("span",{class:"mono muted","aria-hidden":"true"},"→"))));
  app.append(setup, list);
  const gate = () => list.querySelectorAll("button").forEach(b => b.disabled = !llm.engine);
  gate();
  renderSetup(setup, gate);
}
async function renderSetup(box, onReady){
  box.replaceChildren(h("h2",{},"폰 안의 AI 준비"), h("p",{class:"typing"},"이 기기에서 AI를 돌릴 수 있는지 확인하는 중…"));
  const gpu = await gpuInfo();
  if (!gpu) {
    box.replaceChildren(h("h2",{},"이 브라우저에서는 AI를 돌릴 수 없어요"),
      h("p",{}, "폰 안에서 AI를 돌리려면 WebGPU가 필요해요. Android는 최신 Chrome, iPhone은 iOS 26 이상 Safari, 컴퓨터는 Chrome이나 Edge에서 열어 주세요."),
      h("p",{class:"ctx"}, "오늘의 5분과 표현함은 이 브라우저에서도 그대로 쓸 수 있어요."));
    return;
  }
  if (llm.engine) {
    const m = MODELS.find(x=>x.key===llm.key);
    box.replaceChildren(h("div",{class:"row",style:"justify-content:space-between"}, h("div",{}, h("div",{style:"font-weight:700"},"AI 준비됨"), h("div",{class:"ctx"}, m ? m.nm : llm.modelId)), h("span",{class:"chip ok"},"오프라인 동작")));
    onReady(); return;
  }
  const picker = h("div",{class:"models",role:"radiogroup","aria-label":"AI 모델 고르기"});
  const go = h("button",{class:"primary"}, "");
  const dl = h("div",{class:"dl",hidden:true}, h("div",{class:"bar"}, h("i",{})), h("div",{class:"txt"}));
  const cached = {};
  const draw = () => {
    picker.replaceChildren(...MODELS.map(m => h("button",{class:"model",type:"button",role:"radio","aria-checked":String(m.key===modelPick),onclick:()=>{ modelPick = m.key; draw(); }},
      h("span",{class:"dot","aria-hidden":"true"}), h("div",{}, h("div",{class:"nm"}, m.nm), h("div",{class:"sub"}, m.sub)), h("span",{class:"sz"}, cached[m.key] ? "저장됨" : m.sz))));
    go.textContent = cached[modelPick] ? "AI 깨우기" : "모델 받기 (" + (MODELS.find(m=>m.key===modelPick)||MODELS[0]).sz + ", 처음 한 번)";
  };
  box.replaceChildren(h("h2",{},"폰 안의 AI 준비"), picker, h("p",{class:"ctx"}, "처음 한 번만 받으면 브라우저에 저장돼 다음부턴 몇 초면 켜져요. Wi-Fi에서 받는 걸 권해요."), dl, go);
  draw();
  MODELS.forEach(async m => { cached[m.key] = await isCached(m.key); draw(); });
  go.onclick = async () => {
    go.disabled = true; picker.querySelectorAll("button").forEach(b=>b.disabled=true); dl.hidden = false;
    const bar = dl.querySelector("i"), txt = dl.querySelector(".txt");
    try {
      await loadLLM(modelPick, r => { bar.style.width = Math.round((r.progress||0)*100) + "%"; txt.textContent = r.text || ""; });
      toast("AI가 준비됐어요. 상황을 골라 주세요.");
      renderSetup(box, onReady);
    } catch(e) {
      dl.hidden = true; go.disabled = false; picker.querySelectorAll("button").forEach(b=>b.disabled=false);
      const msg = String(e && e.message || e);
      toast(/memory|OOM|allocate|Device was lost/i.test(msg) ? "메모리가 부족해요. 더 가벼운 모델을 골라 주세요." : /fetch|network|Failed to/i.test(msg) ? "모델을 받지 못했어요. 인터넷 연결을 확인해 주세요." : "AI를 켜지 못했어요. 더 가벼운 모델로 다시 시도해 주세요.");
    }
  };
}
/* small on-device models do best with a short system prompt and a flat JSON shape */
const ERR_KO = {article:"관사", preposition:"전치사", tense:"시제", plural:"단·복수", word_order:"어순", word_choice:"단어 선택", other:"기타"};
function talkSystem(sc){
  const knownChunks = allCards().filter(c=>S.cards[c.id]).slice(-12).map(c=>c.en).join(" | ");
  return `You are ${sc.persona}. ${sc.setting} You talk with a Korean learner of English (CEFR ${sc.lvl}).
Stay in character. Use 1-2 short, simple, natural sentences (max 25 words). End with a question or something easy to answer.
${knownChunks ? "If natural, reuse these phrases: " + knownChunks + "." : ""}
Learner missions: ${sc.missions.map((m,i)=>i+"="+m).join(", ")}. Steer toward missions not done yet.
Always answer with one JSON object with these keys:
"reply": your English line in character.
"reply_ko": Korean translation of reply.
"corrected": only if the learner's last message had a real grammar or word error, the minimally corrected version that keeps their meaning; otherwise "". Do not rewrite correct sentences.
"note_ko": a very short Korean hint about the error (do not give the answer), or "".
"error_type": one of "article","preposition","tense","plural","word_order","word_choice","other", or "" if no error.
"missions_done": array of mission numbers the learner has completed so far.
"suggestions": array of two short English lines the learner could say next.
"end": true only if the scene has naturally finished.`;
}
function talkUser(newMsg){
  const hist = talk.turns.slice(-10).map(t => (t.role==="ai"?"You: ":"Learner: ")+t.text).join("\n");
  return (hist ? "Conversation so far:\n" + hist + "\n\n" : "") +
    (newMsg ? `Learner's last message: "${newMsg}"\nRespond as JSON.` : "Start the scene with a short greeting in character. Respond as JSON.");
}
/* similarity of two sentences on normalized tokens (0..1) */
function sim(a, b){ const A = toks(a), B = toks(b); return (A.length+B.length) ? 2*lcs(A,B).len/(A.length+B.length) : 0; }
/* a small on-device model sometimes "corrects" correct text or rewrites the meaning; keep only minimal, real edits */
function acceptCorrection(said, corrected){
  if (!said || !corrected) return false;
  if (toks(said).join(" ") === toks(corrected).join(" ")) return false;
  return sim(said, corrected) >= 0.5;
}
function addCustom(items, tag, lvl, note){
  let n = 0;
  items.forEach(c => { const en = String(c.en||"").trim(), ko = String(c.ko||"").trim(); if (!en || !ko) return;
    if (allCards().some(x=>toks(x.en).join(" ")===toks(en).join(" "))) return;
    S.custom.push({id:"u"+Date.now().toString(36)+n, tag, lvl, en, ko, alts:[], note}); n++; });
  if (n) save();
  return n;
}
function startTalk(sc){
  talk = {sc, turns:[], missions:new Set(), feedback:[], speech:[], pendingFix:null, active:true, busy:false, started:Date.now()};
  const app = $("#app"); app.replaceChildren(); stopDict(); setFocusMode(true);
  const ms = h("div",{class:"missions"});
  const drawMissions = () => ms.replaceChildren(...sc.missions.map((m,i)=>h("span",{class:"chip"+(talk.missions.has(i)?" ok":"")}, (talk.missions.has(i)?"✓ ":"")+m)));
  drawMissions();
  app.append(h("div",{class:"topbar"}, h("button",{class:"x","aria-label":"대화 끝내기",onclick:()=>endTalk()},"×"), h("div",{style:"flex:1;min-width:0"}, h("div",{style:"font-weight:700"}, sc.t), h("div",{class:"ctx"}, sc.d))), ms);
  const chat = h("div",{class:"chat"}); const sugg = h("div",{class:"sugg"}); const status = h("p",{class:"typing",hidden:true}, h("span",{class:"dots","aria-hidden":"true"}, h("i"), h("i"), h("i")), "상대가 생각하는 중");
  const ta = h("textarea",{id:"talk-input",rows:"2",placeholder:"영어로 답하기","data-ph":"영어로 답하기",autocomplete:"off",spellcheck:"false","aria-label":"영어로 답하기"});
  const send = h("button",{class:"primary"},"보내기");
  const hintBtn = h("button",{class:"ghost",type:"button"},"뭐라고 하지?");
  const finishBtn = h("button",{class:"ghost",type:"button",onclick:()=>endTalk()},"대화 마치고 피드백 받기");
  const mic = micFor(ta);
  const hf = h("input",{type:"checkbox",class:"switch",id:"hf-toggle",role:"switch"}); hf.checked = !!S.settings.handsfree;
  hf.onchange = () => { S.settings.handsfree = hf.checked; save(); sfx("tap"); toast(hf.checked ? "AI가 말을 마치면 바로 들을게요" : "핸즈프리를 껐어요"); };
  app.append(chat, status, h("div",{class:"composer"}, sugg, h("div",{class:"answer"}, ta, mic), h("div",{class:"row"}, send, hintBtn),
    caps.dict ? h("label",{class:"hf",for:"hf-toggle"}, hf, "핸즈프리: AI가 말을 마치면 자동으로 듣기") : "", finishBtn));
  send.style.width = "auto"; send.style.flex = "1";
  let lastSugg = [];
  hintBtn.onclick = () => {
    if (talk.pendingFix) { toast("힌트를 보고 고쳐서 다시 말해 보세요."); return; }
    sugg.replaceChildren(...lastSugg.map(t=>h("button",{onclick:()=>{ ta.value=t; ta.dispatchEvent(new Event("input")); }}, t))); if (!lastSugg.length) toast("상대가 먼저 말할 때까지 기다려 주세요."); };
  ta.addEventListener("keydown", e=>{ if (e.key==="Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send.click(); } });
  const addAI = (r) => {
    /* the partner is the mascot: its beak follows the voice (a light take on viseme-driven avatars) */
    const av = mascot(42); speaker = av;
    const b = h("div",{class:"msg ai"}, h("div",{}, tapText(r.reply, {en:r.reply, ko:r.reply_ko||""})));
    const ko = h("div",{class:"ko",hidden:!S.settings.showKo}, r.reply_ko||"");
    const sp = h("button",{type:"button"},"듣기"); sp.onclick = () => say(r.reply, 1, null, av);
    const tr = h("button",{type:"button"},"번역"); tr.onclick = () => ko.hidden = !ko.hidden;
    b.append(ko, h("div",{class:"tools"}, sp, tr)); chat.append(h("div",{class:"airow"}, av, b));
    say(r.reply, 1, null, av).then(() => {
      if (S.settings.handsfree && caps.dict && talk && talk.active && !talk.busy && !rec && document.contains(mic)) { try { mic.click(); } catch(e){} }
    });
  };
  const recastBubble = (f) => h("div",{class:"recast"}, h("span",{class:"ctx"},"이렇게 말하면 더 자연스러워요"), h("b",{}, f.corrected), f.note ? h("span",{class:"ctx"}, f.note) : "");
  /* show the partner's reply that was held back while the learner got a chance to self-repair */
  function continueAI(r){
    (Array.isArray(r.missions_done)?r.missions_done:[]).forEach(i=>{ i = Number(i); if (Number.isInteger(i) && i>=0 && i<sc.missions.length && !talk.missions.has(i)) { talk.missions.add(i); addXP(10); sfx("combo"); haptic(20); toast("미션 완료 · "+sc.missions[i]); track("talk_mission"); } });
    drawMissions();
    talk.turns.push({role:"ai", text:r.reply}); addAI(r);
    lastSugg = (Array.isArray(r.suggestions)?r.suggestions:[]).map(String).slice(0,3);
    if (r.end) { finishBtn.textContent = "장면이 끝났어요 · 피드백 받기"; finishBtn.className = "primary"; }
    hintBtn.disabled = false;
  }
  /* elicitation first (Lyster 2004): a hint and one chance to fix it before the answer is shown */
  function promptRepair(fix){
    talk.pendingFix = fix; hintBtn.disabled = true;
    const box = h("div",{class:"recast"},
      h("span",{class:"ctx"},"조금만 고치면 완벽해요"),
      h("b",{}, fix.note || (ERR_KO[fix.type] ? ERR_KO[fix.type]+"을(를) 다시 확인해 보세요." : "한 군데만 다시 확인해 보세요.")),
      h("span",{class:"ctx"},"고쳐서 다시 말해 볼까요?"));
    const skip = h("button",{class:"ghost",type:"button"},"정답 보고 넘어가기");
    skip.onclick = () => resolveRepair(null);
    box.append(h("div",{class:"row"}, skip));
    fix.box = box; chat.append(box);
    ta.dataset.ph = "고친 문장을 다시 말하거나 입력하세요"; ta.placeholder = ta.dataset.ph;
  }
  function resolveRepair(retry){
    const fix = talk.pendingFix; if (!fix) return; talk.pendingFix = null;
    fix.box.querySelectorAll("button").forEach(b=>b.remove());
    ta.dataset.ph = "영어로 답하기"; ta.placeholder = ta.dataset.ph;
    let repaired = false;
    if (retry) {
      chat.append(h("div",{class:"msg me"}, retry));
      repaired = sim(retry, fix.corrected) >= 0.8 || toks(retry).join(" ") === toks(fix.corrected).join(" ");
    }
    if (repaired) {
      chat.append(h("div",{class:"recast"}, h("b",{},"스스로 고쳤어요!"), h("span",{class:"ctx"}, fix.corrected))); sfx("ding"); haptic(15);
      addXP(8); S.selfRepairs = (S.selfRepairs||0) + 1; track("self_repair"); checkBadges();
      const last = [...talk.turns].reverse().find(t=>t.role==="me"); if (last) last.text = retry;
    } else { chat.append(recastBubble(fix)); addXP(2); }
    talk.feedback.push({said:fix.said, corrected:fix.corrected, note:fix.note, type:fix.type, selfRepaired:repaired});
    { const wc = wordChips(missedWords(fix.said, fix.corrected), {en:fix.corrected, ko:"(상황극) "+talk.sc.t}); if (wc) chat.append(h("div",{class:"recast"}, wc)); }
    continueAI(fix.r);
    status.scrollIntoView({block:"end",behavior:"smooth"});
  }
  async function turn(userText, speechMs){
    if (talk.busy || !talk.active) return; talk.busy = true; send.disabled = true; status.hidden = false; sugg.replaceChildren();
    if (userText) { talk.turns.push({role:"me", text:userText}); chat.append(h("div",{class:"msg me"}, userText));
      if (speechMs > 0) talk.speech.push({words: toks(userText).length, ms: speechMs}); }
    try {
      if (!llm.engine) throw {code:"no_engine"};
      const r = await llmJSON(talkSystem(sc), talkUser(userText));
      if (!talk.active) return;
      if (!r || typeof r.reply !== "string" || !r.reply.trim()) throw {code:"invalid_json"};
      const fbObj = r.feedback && typeof r.feedback === "object" ? r.feedback : null;
      const corrected = String((fbObj && fbObj.corrected) || r.corrected || "").trim();
      const noteKo = String((fbObj && fbObj.note_ko) || r.note_ko || "").trim();
      const type = ERR_KO[r.error_type] ? r.error_type : "other";
      if (userText && acceptCorrection(userText, corrected)) {
        S.errors = S.errors || {}; S.errors[type] = (S.errors[type]||0) + 1; save();
        promptRepair({said:userText, corrected, note:noteKo, type, r});
      } else { if (userText) addXP(5); continueAI(r); }
    } catch(e) {
      if (e && e.code === "no_engine") { toast("먼저 AI 모델을 준비해 주세요."); endTalk(true); return; }
      toast("AI가 답하지 못했어요. 다시 보내 주세요.");
      if (userText) { talk.turns.pop(); if (speechMs > 0) talk.speech.pop(); chat.lastChild && chat.lastChild.remove(); ta.value = userText; }
    } finally { talk.busy = false; send.disabled = false; status.hidden = true; status.scrollIntoView({block:"end",behavior:"smooth"}); }
  }
  send.onclick = async () => {
    await stopDict(); const v = ta.value.trim(); if (!v || talk.busy) return;
    const speechMs = Number(ta.dataset.speechMs||0); ta.dataset.speechMs = "0"; ta.value = "";
    if (talk.pendingFix) { if (speechMs > 0) talk.speech.push({words: toks(v).length, ms: speechMs}); resolveRepair(v); return; }
    turn(v, speechMs);
  };
  turn("");
}
async function endTalk(silent){
  stopDict();
  if (!talk) { route(); return; }
  const t = talk; t.active = false;
  if (t.pendingFix) { t.feedback.push({said:t.pendingFix.said, corrected:t.pendingFix.corrected, note:t.pendingFix.note, type:t.pendingFix.type, selfRepaired:false}); t.pendingFix = null; }
  const mine = t.turns.filter(x=>x.role==="me");
  if (silent || mine.length < 2 || !llm.engine) { talk = null; if (!silent && mine.length) toast("두 번 이상 말하면 피드백을 드려요."); route(); return; }
  S.talks++; save();
  const app = $("#app"); app.replaceChildren(h("p",{class:"eyebrow"},"대화 피드백"), h("p",{class:"typing"},"대화를 돌아보는 중…"));
  /* CAF: complexity = mean length of utterance, accuracy = turns with no accepted correction, fluency = words per minute while speaking */
  const words = mine.map(m=>toks(m.text).length); const mlu = (words.reduce((a,b)=>a+b,0)/words.length).toFixed(1);
  const acc = Math.max(0, Math.round((1 - t.feedback.length/mine.length)*100));
  const spokenMs = t.speech.reduce((a,x)=>a+x.ms,0), spokenWords = t.speech.reduce((a,x)=>a+x.words,0);
  const wpm = spokenMs >= 1500 ? Math.round(spokenWords/(spokenMs/60000)) : null;
  const repaired = t.feedback.filter(f=>f.selfRepaired).length;
  let r = null;
  try {
    r = await llmJSON(
      `You are a kind English tutor for Korean learners. You review a short role-play and answer with one JSON object with keys:
"summary_ko": one Korean sentence on how it went.
"strength_ko": one specific thing the learner did well, in Korean.
"fix_ko": the single most useful thing to fix next time, in Korean, with one English example.
"chunks": array of exactly 3 objects {"en": a natural multi-word English phrase from this scene worth memorizing, "ko": its Korean meaning}.
"corrections_ko": array with the Korean meaning of each corrected sentence listed below, in the same order.`,
      `Learner level: CEFR ${t.sc.lvl}. Scene: ${t.sc.persona}.
Transcript:
${t.turns.slice(-16).map(x=>(x.role==="ai"?"Partner: ":"Learner: ")+x.text).join("\n")}
Corrected sentences: ${JSON.stringify(t.feedback.slice(-6).map(f=>f.corrected))}
Respond as JSON.`, 480);
  } catch(e) { r = null; }
  talk = null;
  app.replaceChildren();
  const allDone = t.missions.size === t.sc.missions.length;
  app.append(h("section",{class:"celebrate"}, mascot(110, allDone ? "happy" : "idle"), h("p",{class:"eyebrow"}, t.sc.t+" · 대화 피드백"), h("h1",{class:"big"}, t.missions.size+"/"+t.sc.missions.length+" 미션")));
  if (allDone) { confetti(); sfx("fanfare"); haptic([20,60,20]); S.fullTalks = (S.fullTalks||0) + 1; save(); checkBadges(); }
  app.append(h("div",{class:"kpis"},
    h("div",{class:"kpi"}, h("b",{}, mlu), h("span",{},"복잡성 · 평균 발화 길이 (단어)")),
    h("div",{class:"kpi"}, h("b",{}, acc+"%"), h("span",{},"정확성 · 고칠 곳 없던 턴")),
    h("div",{class:"kpi"}, h("b",{}, wpm == null ? "–" : String(wpm)), h("span",{}, wpm == null ? "유창성 · 말로 답하면 측정돼요" : "유창성 · 말하기 속도 (WPM)")),
    h("div",{class:"kpi"}, h("b",{}, repaired+"/"+t.feedback.length), h("span",{},"스스로 고친 문장"))));
  const types = {}; t.feedback.forEach(f => types[f.type] = (types[f.type]||0)+1);
  if (Object.keys(types).length) app.append(h("p",{class:"note"}, "자주 틀린 유형", ...Object.entries(types).sort((a,b)=>b[1]-a[1]).map(([k,v])=>h("span",{class:"chip"}, (ERR_KO[k]||"기타")+" "+v))));
  if (r && typeof r === "object") {
    const sec = h("section",{class:"task"});
    if (r.summary_ko) sec.append(h("p",{}, String(r.summary_ko)));
    if (r.strength_ko) sec.append(h("div",{class:"fb good"}, h("div",{class:"head"},"잘한 점"), h("div",{}, String(r.strength_ko))));
    if (r.fix_ko) sec.append(h("div",{class:"fb bad"}, h("div",{class:"head"},"다음엔 이것 하나만"), h("div",{}, String(r.fix_ko))));
    if (sec.childNodes.length) app.append(sec);
    const chunks = (Array.isArray(r.chunks)?r.chunks:[]).filter(c=>c&&c.en&&c.ko).slice(0,3);
    if (chunks.length) {
      const box = h("section",{class:"task"}, h("h2",{},"표현함에 담을 표현"));
      chunks.forEach(c => box.append(h("div",{class:"row",style:"justify-content:space-between"}, h("div",{style:"min-width:0"}, h("div",{style:"font-weight:600"}, String(c.en)), h("div",{class:"ctx"}, String(c.ko))), speakBtn(String(c.en),"듣기"))));
      const add = h("button",{class:"primary"},"모두 표현함에 담기");
      add.onclick = () => { const n = addCustom(chunks, "AI 대화", t.sc.lvl, "'"+t.sc.t+"' 대화에서");
        add.disabled = true; add.textContent = n ? n+"개를 담았어요 · 내일 복습에 나와요" : "이미 표현함에 있어요"; };
      box.append(add); app.append(box);
    }
  } else app.append(h("p",{class:"muted"},"자세한 피드백을 받지 못했어요. 위 숫자는 이 기기에서 계산한 값이에요."));
  if (t.feedback.length) {
    /* the learner's own gaps become review cards (Ringle-style): output gaps → spaced retrieval */
    const kos = r && Array.isArray(r.corrections_ko) ? r.corrections_ko.map(String) : [];
    const shown = t.feedback.slice(-6);
    const box = h("section",{class:"task"}, h("h2",{},"고쳐 본 문장"));
    const checks = shown.map((f,i) => {
      const id = "fix-"+i; const cb = h("input",{type:"checkbox",id,checked:true});
      box.append(h("label",{for:id,style:"display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;cursor:pointer"}, cb,
        h("div",{style:"min-width:0"}, h("div",{class:"ctx",style:"text-decoration:line-through"}, f.said), h("div",{style:"font-weight:600"}, f.corrected),
          h("div",{class:"ctx"}, (f.selfRepaired ? "스스로 고침 · " : "") + (ERR_KO[f.type]||"기타") + (f.note ? " · "+f.note : "")))));
      return {cb, f, ko: (kos[t.feedback.length - shown.length + i] || kos[i] || "").trim()};
    });
    const add = h("button",{class:"primary"},"체크한 문장 복습에 넣기");
    add.onclick = () => { const items = checks.filter(c=>c.cb.checked).map(c=>({en:c.f.corrected, ko: c.ko || "(내가 하려던 말) "+c.f.said}));
      const n = addCustom(items, "내 교정", t.sc.lvl, "'"+t.sc.t+"'에서 고친 문장");
      add.disabled = true; checks.forEach(c=>c.cb.disabled=true); add.textContent = n ? n+"개를 넣었어요 · 내일 복습에 나와요" : "이미 표현함에 있어요"; };
    box.append(add); app.append(box);
  }
  app.append(h("button",{class:"cta alt",onclick:()=>{ location.hash="#talk"; route(); }}, h("div",{}, h("b",{},"다른 상황 고르기")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
}
