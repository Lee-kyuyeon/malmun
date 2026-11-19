/* 재잘 · 30-second speaking task: answer an open question using the unit's chunks. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* longer turns are where B1+ speaking actually happens: the answer is scored on its own device (length, chunk use, speed),
   and the on-device AI, when ready, adds a polished version and one thing to fix (complexity · accuracy · fluency) */
const SPEAK_SECONDS = 30;
const SPEAK_TARGET = {A1:8, A2:15, B1:30, B2:45, C1:60};
const SPEAK_MIN_LEARNED = 6;

function unitById(id){ return buildCurriculum().units.find(u => u.id === id) || null; }
function learnedIn(unit){ return unit ? unit.cards.filter(id => S.cards[id] && S.cards[id].reps > 0) : []; }
function speakReady(unit){ return learnedIn(unit || currentUnit()).length >= SPEAK_MIN_LEARNED; }
/* the question asked least recently for this unit's situation and level */
function promptFor(unit){
  const list = PROMPTS.filter(p => p.tag === unit.tag && p.lvl === unit.lvl);
  const last = en => { const r = (S.speakouts||[]).find(x => x.q === en); return r ? r.t : 0; };
  return list.sort((a,b) => last(a.en) - last(b.en))[0] || PROMPTS.find(p => p.lvl === unit.lvl) || PROMPTS[0];
}
/* two or three chunks the learner already knows from this unit, strongest first so the task stretches without stalling */
function speakTargets(unit, n = 3){
  return shuffle(learnedIn(unit).sort((a,b) => mastery(b) - mastery(a)).slice(0, 8)).slice(0, n).map(cardById).filter(Boolean);
}
/* a chunk counts as used when some stretch of the answer matches it closely (word order kept, small slips allowed) */
function chunkUsed(answerToks, en){
  const T = toks(en); if (!T.length) return false;
  let best = 0;
  for (let len = Math.max(1, T.length - 2); len <= T.length + 2; len++)
    for (let i = 0; i + len <= answerToks.length; i++) { const W = answerToks.slice(i, i + len); const r = lcs(W, T); best = Math.max(best, 2 * r.len / (W.length + T.length)); }
  return best >= 0.8;
}
function speakMetrics(answer, targets, lvl, speechMs){
  const A = toks(answer), words = A.length, goalWords = SPEAK_TARGET[lvl] || 30;
  const used = targets.filter(c => chunkUsed(A, c.en));
  const wpm = speechMs >= 1500 ? Math.round(words / (speechMs / 60000)) : null;
  const sentences = Math.max(1, (answer.match(/[.!?]+(\s|$)/g) || []).length || Math.round(words / 12));
  return { words, goalWords, used, wpm, sentences, mlu: +(words / sentences).toFixed(1),
    lenScore: Math.min(1, words / goalWords), useScore: targets.length ? used.length / targets.length : 1 };
}
function speakScore(m, aiAcc){
  return aiAcc == null ? .5 * m.useScore + .5 * m.lenScore : .5 * m.useScore + .3 * m.lenScore + .2 * aiAcc;
}

function taskSpeakout(box, step){
  const unit = unitById(step.id) || currentUnit();
  const q = promptFor(unit), targets = speakTargets(unit), t0 = Date.now();
  header(box, `${SPEAK_SECONDS}초 동안 말해 볼래?`, "think");
  box.append(h("p",{class:"prompt-en"}, q.en), h("p",{class:"ctx"}, q.ko));
  if (targets.length) box.append(h("div",{class:"speak-targets"}, h("div",{class:"ctx"},"이 단원 표현을 넣어 봐"),
    ...targets.map(c => h("div",{class:"st","data-en":c.en}, h("b",{}, c.en), h("small",{}, c.ko)))));
  const goal = SPEAK_TARGET[unit.lvl] || 30;
  const timer = h("div",{class:"speak-timer","aria-live":"off"}, h("span",{class:"tm"}, String(SPEAK_SECONDS)), h("small",{}, ` 초 · 목표 ${goal}단어 이상`));
  box.append(timer);
  let left = SPEAK_SECONDS, tick = null;
  const start = () => { if (tick) return; tick = setInterval(() => { left--; timer.querySelector(".tm").textContent = String(Math.max(0, left));
    if (left <= 0) { clearInterval(tick); timer.classList.add("over"); toast("30초 끝! 마무리하고 확인을 눌러"); } }, 1000); };
  const ta = answerBox(box, caps.dict ? "마이크를 누르고 이어서 말해요 (또는 입력)" : "영어로 입력하세요", async ans => {
    clearInterval(tick);
    const m = speakMetrics(ans, targets, unit.lvl, Number(ta.dataset.speechMs || 0));
    let ai = null;
    if (llm.engine && m.words >= 3) {
      box.append(h("p",{class:"typing"},"앵두가 답변을 보는 중…"));
      try { ai = await llmJSON(`You are a kind English speaking coach for Korean learners at CEFR ${unit.lvl}. Review one spoken answer and reply with one JSON object:
"better": a natural improved version of the learner's answer that keeps their ideas (max 70 words),
"good_ko": one specific strength in Korean,
"fix_ko": the single most useful fix in Korean (grammar, word choice or linking), with one short English example,
"accuracy": a number from 0 to 1 for grammatical accuracy.`, `Question: ${q.en}\nAnswer: ${ans}\nRespond as JSON.`, 360); } catch(e) { ai = null; }
      box.querySelectorAll(".typing").forEach(x => x.remove());
    }
    const acc = ai && typeof ai.accuracy === "number" ? Math.max(0, Math.min(1, ai.accuracy)) : null;
    finishSpeakout(box, unit, q, targets, m, ai, speakScore(m, acc), Date.now() - t0);
  }, {continuous: true});
  ta._onSpoken = null; /* no auto-submit after a pause: the learner decides when the answer is done */
  ta.addEventListener("input", start, {once: true});
  box.querySelectorAll(".mic").forEach(b => b.addEventListener("click", start, {once: true}));
}

function finishSpeakout(box, unit, q, targets, m, ai, score, ms){
  const s = session;
  m.used.forEach(c => schedule(c.id, 3)); /* using a chunk in your own answer is strong retrieval */
  s.total++; if (score >= .6) s.right++;
  let gain = Math.round(10 + 20 * score); gain = addXP(gain); s.xp += gain;
  S.speakouts = [{t: Date.now(), d: dayKey(), unit: unit.id, lvl: unit.lvl, q: q.en, words: m.words, wpm: m.wpm, used: m.used.length, of: targets.length}, ...(S.speakouts||[])].slice(0, 30);
  S.speakDay = dayKey(); save();
  track("speakout"); track("produce");
  $("#app").querySelectorAll(".actionbar").forEach(x => x.remove());
  const ok = score >= .6; setMood(box.mascot, ok ? "happy" : "think"); sfx(ok ? "combo" : "ding"); haptic(15);
  const kpi = (v, l) => h("div",{class:"kpi"}, h("b",{}, v), h("span",{}, l));
  const inner = h("div",{class:"in"},
    h("div",{class:"head"}, mascot(44, ok ? "happy" : "idle"), h("span",{}, score >= .85 ? "길게 잘 말했어!" : ok ? "좋아, 말이 늘고 있어!" : "시작이 반이야!"), h("span",{class:"xpfloat"}, "+" + gain + " XP")),
    h("div",{class:"kpis speak-kpis"}, kpi(`${m.words}/${m.goalWords}`, "단어 수 / 목표"), kpi(`${m.used.length}/${targets.length}`, "단원 표현 사용"), kpi(m.wpm ? String(m.wpm) : "–", "분당 단어(WPM)"), kpi(String(m.mlu), "문장당 단어")));
  if (targets.length) inner.append(h("div",{class:"speak-targets done"}, ...targets.map(c => h("div",{class:"st" + (m.used.includes(c) ? " ok" : "")}, h("b",{}, (m.used.includes(c) ? "✓ " : "") + c.en), h("small",{}, c.ko)))));
  if (ai && ai.better) inner.append(h("div",{class:"ctx"},"이렇게 말하면 더 자연스러워"), h("p",{style:"font-weight:700;line-height:1.6"}, tapText(String(ai.better), {en:q.en, ko:q.ko})), h("div",{class:"row"}, speakBtn(String(ai.better),"듣기")));
  if (ai && ai.good_ko) inner.append(h("p",{class:"ctx"}, "잘한 점 · " + ai.good_ko));
  if (ai && ai.fix_ko) inner.append(h("p",{class:"ctx"}, "다음엔 · " + ai.fix_ko));
  if (!ai) inner.append(h("p",{class:"ctx"}, m.words < m.goalWords ? `목표까지 ${m.goalWords - m.words}단어 더! 이유나 예시를 하나 덧붙이면 금방 늘어.` : "목표 길이를 채웠어. 다음엔 단원 표현을 하나 더 넣어 봐." + (llm.engine ? "" : " AI 대화 탭에서 모델을 준비하면 다듬은 답변도 보여 줄게.")));
  const next = h("button",{class:"primary",onclick:()=>{ sfx("tap"); s.i++; renderStep(); }}, s.i + 1 >= s.steps.length ? "결과 보기" : "다음");
  inner.append(next);
  $("#app").append(h("div",{class:"fb " + (ok ? "good" : "bad"),role:"status"}, inner)); next.focus();
}

/* #speak: a speaking-only session for the current (or chosen) unit */
let speakUnitNext = null;
function viewSpeak(app){
  const unit = (speakUnitNext && unitById(speakUnitNext)) || currentUnit(); speakUnitNext = null;
  if (!speakReady(unit)) { app.append(h("section",{class:"celebrate"}, mascot(110,"think"), h("h1",{class:"title"},"표현을 조금 더 익히고 오자!"),
    h("p",{class:"muted"}, `이 단원에서 표현 ${SPEAK_MIN_LEARNED}개를 익히면 30초 말하기가 열려요. 지금 ${learnedIn(unit).length}개.`),
    h("button",{class:"primary",onclick:()=>{ location.hash = "#learn"; }},"오늘의 5분 하러 가기"))); return; }
  session = {steps:[{type:"speakout", id:unit.id}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false, unit:{id:unit.id, complete:unit.complete, lvl:unit.lvl}, speakOnly:true};
  renderStep();
}
/* '나' tab: how long and how fast answers have become */
function speakGrowth(){
  const list = (S.speakouts||[]).slice(0, 10).reverse(); if (!list.length) return null;
  const mx = Math.max(...list.map(x => x.words), 1);
  const avg = k => { const v = list.map(x => x[k]).filter(x => x != null); return v.length ? Math.round(v.reduce((a,b)=>a+b,0) / v.length) : null; };
  return h("section",{class:"card-s",id:"speak-growth"}, h("h2",{class:"sec-h"},"말하기 성장"),
    h("p",{class:"ctx"}, `최근 ${list.length}번 평균 ${avg("words")}단어` + (avg("wpm") ? ` · 분당 ${avg("wpm")}단어` : "")),
    h("div",{class:"spark","aria-label":"최근 30초 말하기 단어 수"}, ...list.map(x => h("i",{style:`height:${Math.max(8, x.words / mx * 100)}%`,title:`${x.d} · ${x.words}단어`}))),
    h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash = "#speak"; }},"30초 말하기 하러 가기"));
}
