/* 재잘 · home screen and the 5-minute session. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- HOME ---------- */
function viewHome(app){
  const today = S.hist[dayKey()]||0, g = goal();
  const due = dueList().length, fresh = allCards().filter(c=>!S.cards[c.id]).length;
  const newLeft = Math.min(fresh, Math.max(0, NEW_PER_DAY-(S.newDay===dayKey()?S.newCount:0)));
  const gear = h("button",{class:"iconbtn press",type:"button","aria-label":"설정",onclick:()=>{ sfx("tap"); openSettings(); },html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'});
  const cher = h("button",{class:"tchip press",type:"button","aria-label":`체리 ${S.cherries||0}개, 앵두 꾸미기`,"data-chip":"cherry",onclick:openShop,html:CHERRY}, String(S.cherries||0));
  const fl = h("button",{class:"tchip press",type:"button","aria-label":`${streakNow()}일 연속, 달력 보기`,"data-chip":"streak",onclick:openCalendar,html:FLAME}, String(streakNow()));
  app.append(h("div",{class:"top"}, h("div",{class:"logo"}, mascot(34, today > 0 ? "idle" : (angerMood() || "idle")), "재잘"), h("div",{class:"topr"}, fl, cher, gear)));

  const hr = new Date().getHours();
  const hello = hr < 5 ? "아직 안 잤어?" : hr < 11 ? "좋은 아침!" : hr < 17 ? "반가워!" : hr < 22 ? "좋은 저녁!" : "자기 전에 딱 5분!";
  const line = today >= g ? "오늘 목표 달성! AI랑 대화로 마무리해 볼까?" : due ? `잊어버리기 직전인 표현이 ${due}개 있어. 지금 꺼내면 오래 가!` : S.sessions ? `새 표현 ${newLeft}개가 기다려. 같이 입에 붙여 보자!` : "처음이지? 5분이면 표현 6개를 입에 붙일 수 있어.";
  /* a freeze that just saved the streak is the more useful news; 앵두 still pouts while saying it */
  const anger = today > 0 || (S.freezeNotice && S.freezeNotice.day === dayKey()) ? null : angerLine(daysAway());
  const msg = anger ? {...anger, mood:angerMood(), risk:angerMood()!=="pout"} : homeMessage(today, g, due, newLeft);
  const m = mascot(92, msg ? msg.mood : today >= g ? "happy" : "idle"); speaker = m;
  m.addEventListener("click", () => { setMood(m,"happy"); sfx("tap"); haptic(10); setTimeout(()=>setMood(m,"idle"), 1300); });
  app.append(h("section",{class:"greet"}, m, h("div",{class:"bubble"+(msg&&msg.risk?" risk":""),"data-msg":msg?msg.b:"default"}, h("b",{}, msg ? msg.b : hello), msg ? msg.t : line)));
  if (boostOn()) app.append(h("p",{class:"note"}, h("span",{class:"chip boostchip",html:BOLT.replace("<svg",'<svg width="14" height="14"')}, ` 2배 XP · ${Math.ceil((S.boostUntil-Date.now())/60000)}분 남음`)));

  const days = [...Array(7)].map((_,i)=>{ const d=new Date(Date.now()-(6-i)*DAY); return {k:dayKey(d), d}; });
  const WD = ["일","월","화","수","목","금","토"];
  const stamps = h("div",{class:"stamps",role:"list","aria-label":"최근 7일 출석"}, ...days.map((x,i)=>{ const on = (S.hist[x.k]||0) > 0;
    return h("div",{class:"stamp"+(on?" on":"")+(i===6?" now":""),role:"listitem","aria-label":`${WD[x.d.getDay()]}요일 ${on?"학습함":"쉼"}`}, h("i",{html:FLAME}), h("span",{}, i===6 ? "오늘" : WD[x.d.getDay()])); }));
  const ring = h("div",{class:"ring",html:ringSvg(today/g, 96, 10, today>=g?"var(--mint)":"var(--butter)")}, h("div",{class:"lbl"}, h("b",{}, String(today)), h("span",{}, "/ "+g+" XP")));
  app.append(h("section",{class:"card-s today"}, ring, h("div",{style:"min-width:0"}, h("p",{class:"streakline",html:FLAME.replace("<svg",'<svg width="18" height="18" style="vertical-align:-3px"')}, " ", h("b",{}, streakNow()+"일"), " 연속 학습 중"), stamps)));

  app.append(h("button",{class:"cta",onclick:()=>{ sfx("tap"); location.hash="#learn"; }},
    h("div",{}, h("b",{}, S.sessions? "오늘의 5분 이어가기":"첫 5분 시작하기"), h("span",{}, `${currentUnit().lvl} · ${currentUnit().tag} 단원 · 복습 ${due}개 · 새 표현 ${newLeft}개`)),
    h("span",{class:"arrow","aria-hidden":"true"},"→")));
  app.append(nextPracticeCard());
  const ic = installCard(); if (ic) app.append(ic);
  const bc = backupCard(); if (bc) app.append(bc);
  app.append(missionsCard());

  if (!S.placement) app.append(h("button",{class:"cta alt",onclick:()=>{ location.hash="#placement"; }},
    h("div",{}, h("b",{},"실력 진단하고 맞춤 코스 받기"), h("span",{},"3~4분이면 내 레벨에 맞는 단원부터 시작해요")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
  /* the one thing worth knowing from AI chats; device status lives in 나 */
  const weak = Object.entries(S.errors||{}).filter(([k,v])=>v>=2).sort((a,b)=>b[1]-a[1])[0];
  if (weak) app.append(h("p",{class:"note"}, h("span",{class:"chip warn",title:"AI 대화에서 가장 자주 고친 유형"}, "약점: "+(ERR_KO[weak[0]]||"기타")+" "+weak[1]+"회")));
}

/* home shows one next practice instead of a button per mode: the next unheard 해외살이 day,
   or the unit's role-play when listening was done more recently and this browser can run the AI */
function nextPracticeCard(){
  const eps = (S.ear && S.ear.eps) || {}, lastListen = Math.max(0, ...Object.values(eps).map(r=>r.t||0));
  const ep = EPISODES.find((e,i) => epUnlocked(i) && !eps[e.id]);
  const u = currentUnit(), aiOk = "gpu" in navigator && llm.gpu !== null;
  const talkFirst = aiOk && (!ep || lastListen > (S.lastTalkT||0));
  const card = (mode, b, sub, go) => h("button",{class:"cta alt next-practice","data-cta":mode,onclick:()=>{ sfx("tap"); S.practiceMode = mode; save(); go(); }},
    h("div",{}, h("small",{class:"np-k"}, mode === "listen" ? "🎧 다음 연습 · 듣기" : "💬 다음 연습 · 말하기"), h("b",{}, b), h("span",{}, sub)), h("span",{class:"arrow","aria-hidden":"true"},"→"));
  if (!talkFirst && ep) { const i = EPISODES.indexOf(ep), er = earRate();
    return card("listen", `해외살이 Day ${i+1} · ${ep.t}`, er==null ? "자막 없이 듣고, 들은 대로 움직여 봐요" : `처음 듣기 ${er}% · 자막 없이 듣고 움직이기`, () => { location.hash = "#abroad"; }); }
  if (talkFirst && u.scen) return card("talk", `AI 상황극 · ${u.scen.t}`, `${u.tag} 단원에서 배운 표현을 말로 써 보기`, () => { location.hash = "#talk"; });
  return card("listen", "앵두와 해외살이", "다시 들으면 처음보다 훨씬 잘 들려요", () => { location.hash = "#abroad"; });
}

/* ---------- LEARN: build a 5-minute interleaved session ---------- */
function buildSession(){
  const k = dayKey(); if (S.newDay !== k) { S.newDay = k; S.newCount = 0; }
  const due = dueList().slice(0, 8);
  const newBudget = Math.max(0, Math.min(NEW_PER_DAY - S.newCount, 10 - due.length));
  /* new chunks come from the chosen/current unit, then the following units, then the learner's own saved chunks */
  const cur = buildCurriculum(); let from = cur.cur;
  if (S.focusUnit) { const fi = cur.units.findIndex(u=>u.id===S.focusUnit); if (fi > -1) from = fi; S.focusUnit = null; }
  const order = cur.units.slice(from).concat(cur.units.slice(0, from).filter(u=>u.status!=="skipped")).flatMap(u=>u.cards);
  const pool = order.map(cardById).concat((S.custom||[])).filter(c=>c && !S.cards[c.id]);
  const fresh = pool.slice(0, Math.max(newBudget, due.length? 0 : 3)).map(c=>c.id);
  let extra = [];
  if (due.length + fresh.length < 5) extra = Object.entries(S.cards).filter(([id])=>!due.includes(id)&&cardById(id)).sort((a,b)=>a[1].due-b[1].due).slice(0, 5-due.length-fresh.length).map(([id])=>id);
  const steps = [];
  fresh.forEach(id => steps.push({type:"listen", id}));
  const prod = shuffle([...fresh.map(id=>({type:"tiles", id})), ...[...due, ...extra].map((id,i)=>({type: i%3===2 ? "shadow":"recall", id}))]);
  const firstHalf = steps.splice(0, Math.ceil(steps.length/2));
  const out = [...firstHalf]; let li = 0;
  prod.forEach((p,i)=>{ out.push(p); if (i%2===1 && li < steps.length) out.push(steps[li++]); });
  while (li < steps.length) out.push(steps[li++]);
  const seenListen = new Set(); const fixed = [];
  for (const s of out) { if (s.type==="tiles" && !seenListen.has(s.id)) { const j = out.findIndex(x=>x.type==="listen"&&x.id===s.id); if (j>-1 && !fixed.includes(out[j])) fixed.push(out[j]); seenListen.add(s.id); }
    if (s.type==="listen") { if (fixed.includes(s)) continue; seenListen.add(s.id); } fixed.push(s); }
  /* up to 3 notebook words per session (at most 2 brand-new), placed between chunk steps */
  wordSteps(3, 2).forEach((st,i) => fixed.splice(Math.min(fixed.length, 2 + i*3), 0, st));
  const unit = cur.units[from];
  /* once a day, a 30-second answer closes the session when the unit has enough known chunks to build one */
  if (unit && S.speakDay !== k && speakReady(unit)) fixed.push({type:"speakout", id:unit.id});
  return {steps: fixed, i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false, unit: unit && {id:unit.id, complete:unit.complete, lvl:unit.lvl}};
}
/* due words first (most-missed, most frequent), then new ones within today's limit; a new word is met, then checked a few steps later */
function wordSteps(maxWords, maxNew, course){
  /* word-only sessions top up new words from the frequency-ranked course when the notebook has none waiting */
  if (course) { const waiting = Object.keys(S.words||{}).filter(w => wordEntry(w) && !S.cards["w:"+w]).length; const need = Math.min(maxNew, wordNewLeft()) - waiting; if (need > 0) vocabNext(need).forEach(courseAdd); }
  const now = Date.now(); const all = Object.keys(S.words||{}).filter(w => wordEntry(w));
  const due = all.filter(w => S.cards["w:"+w] && S.cards["w:"+w].due <= now).sort((a,b)=>(S.cards["w:"+a].due-S.cards["w:"+b].due) || (S.words[b].misses-S.words[a].misses));
  const fresh = all.filter(w => !S.cards["w:"+w]).sort((a,b)=>(S.words[b].misses-S.words[a].misses) || (wordEntry(a).band-wordEntry(b).band)).slice(0, Math.min(maxNew, wordNewLeft()));
  const pick = [...due.slice(0, Math.max(0, maxWords - fresh.length)), ...fresh].slice(0, maxWords);
  /* each new word: meet it now, check it after at least one other step */
  const res = [], pending = [];
  pick.forEach(w => { const st = wordStepFor(w); res.push(st);
    if (pending.length && res.length - pending[0].at >= 2) res.push(pending.shift().st);
    if (st.type === "wordintro") pending.push({at:res.length, st:{type:"wordmean", id:st.id}}); });
  pending.forEach(p => res.push(p.st));
  return res;
}
function buildWordSession(){
  const steps = wordSteps(8 + wordsPerDay(), wordsPerDay(), true);
  return {steps, i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false, wordOnly:true};
}
let wordOnlyNext = false;
function viewLearnStart(app){
  session = wordOnlyNext ? buildWordSession() : buildSession(); wordOnlyNext = false;
  if (lightNext) { session.steps = session.steps.slice(0, 6); lightNext = false; }
  if (!session.steps.length && session.wordOnly) { app.append(h("section",{class:"celebrate"}, mascot(110,"happy"), h("h1",{class:"title"},"지금 복습할 단어가 없어!"), h("p",{class:"muted"}, Object.keys(S.words||{}).length ? "새 단어는 하루 5개까지야. 문장 속 단어를 눌러 더 담을 수 있어." : "표현 속 단어를 누르면 단어장에 담을 수 있어."))); return; }
  if (!session.steps.length) { const m = mascot(110,"happy"); app.append(h("section",{class:"celebrate"}, m, h("h1",{class:"title"},"오늘 분량을 다 했어!"), h("p",{class:"muted"},"내일 다시 오면 잊어버리기 직전의 표현부터 꺼내 줄게."))); return; }
  renderStep();
}
function renderStep(){
  const app = $("#app"); app.replaceChildren(); stopDict(); setFocusMode(true);
  const s = session; if (s.i >= s.steps.length) return renderRecap();
  const step = s.steps[s.i], card = step.type === "speakout" ? {id: step.id} : step.type.startsWith("word") ? wordCard(step.id) : cardById(step.id);
  if (!card) { s.i++; return renderStep(); }
  const combo = h("span",{class:"combo","aria-label": s.combo>=2 ? `${s.combo}연속 정답` : ""});
  if (s.combo >= 2) combo.innerHTML = FLAME + `<span>${s.combo}</span>`;
  app.append(h("div",{class:"topbar"}, h("button",{class:"x","aria-label":"그만하기",onclick:()=>{ session=null; location.hash="#home"; route(); }},"×"),
    h("div",{class:"prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(s.steps.length),"aria-valuenow":String(s.i)}, h("i",{style:`width:${Math.max(4, s.i/s.steps.length*100)}%`})), combo));
  const box = h("section",{class:"task"}); app.append(box);
  if (step.type === "speakout") return taskSpeakout(box, step);
  ({listen:taskListen, tiles:taskTiles, recall:taskRecall, shadow:taskShadow, wordmean:taskWordMean, wordcloze:taskWordCloze, wordintro:taskWordIntro, wordrecall:taskWordRecall, wordmake:taskWordMake})[step.type](box, card, step);
}
const PRAISE = ["완벽해!","최고야!","원어민 같아!","입에 착 붙었어!","잘했어!"];
function finish(box, card, step, score, ms, extra, opts={}){
  /* self-reported practice (no mic) earns XP but never touches the memory model: nothing was retrieved */
  const s = session, prod = step.type !== "listen" && step.type !== "wordintro" && !opts.selfReport;
  if (prod && card.word) setStage(card.word.w, score >= 0.6);
  if (prod) { s.total++; const g = gradeFrom(score, ms); schedule(card.id, g);
    if (!card.word && (!S.cards[card.id] || S.cards[card.id].reps===1)) { S.newCount++; }
    if (score >= 0.6) { s.right++; s.combo++; } else { s.combo = 0; s.misses[card.id]=(s.misses[card.id]||0)+1;
      if (!s.retried.has(card.id)) { s.retried.add(card.id); s.steps.splice(Math.min(s.i+3, s.steps.length), 0, card.word ? wordStepFor(card.word.w) : {type:"recall", id:card.id}); } } }
  const mult = Math.min(2, 1 + Math.max(0,s.combo-1)*0.2);
  let gain = Math.round((prod ? 10*score : 4) * mult) + (prod && score>=0.99 && ms<5000 ? 3 : 0);
  if (gain) { gain = addXP(gain); s.xp += gain; } else save();
  /* daily-mission events: only learning actions count */
  if (prod) { const isNew = !card.word && S.cards[card.id] && S.cards[card.id].reps === 1;
    track(card.word ? "word_review" : isNew ? "new_learned" : "review");
    if (["recall","shadow","wordcloze","wordrecall","wordmake"].includes(step.type)) track("produce");
    if (step.type === "shadow") track("shadow");
    track("combo_max", s.combo, "max"); }
  else if (step.type === "shadow") track("shadow");
  if (step.type === "listen") track("listen");
  const good = score >= 0.92, ok = score >= 0.6;
  /* feedback in the thumb zone, with the mascot reacting (sound + haptics follow settings) */
  $("#app").querySelectorAll(".actionbar").forEach(x=>x.remove());
  setMood(box.mascot, ok ? "happy" : "oops");
  if (ok) { sfx(prod && s.combo>0 && s.combo%3===0 ? "combo" : "ding"); haptic(15); } else { sfx("bloop"); haptic([30,40,30]); }
  const head = h("div",{class:"head"}, mascot(44, ok?"happy":"oops"), h("span",{}, good ? PRAISE[Math.random()*PRAISE.length|0] : ok ? "거의 맞았어!" : "괜찮아, 다시 볼게"), gain ? h("span",{class:"xpfloat"},"+"+gain+" XP") : "");
  const inner = h("div",{class:"in"}, head);
  if (extra) inner.append(extra);
  if (card.note) inner.append(h("div",{class:"ctx"}, card.note));
  const next = h("button",{class:"primary",onclick:()=>{ sfx("tap"); s.i++; renderStep(); }}, s.i+1 >= s.steps.length ? "결과 보기" : "다음");
  inner.append(next);
  $("#app").append(h("div",{class:"fb "+(ok?"good":"bad"),role:"status"}, inner)); next.focus();
}
function header(box, label, mood){ return asker(box, label, mood); }

function taskListen(box, card, step){
  const m = header(box, "들리는 말, 무슨 뜻일까?");
  const play = h("button",{class:"speak jumbo",type:"button","aria-pressed":"false","aria-label":"다시 듣기",html:ICON.spk+"<span>다시 듣기</span>"}); play.onclick = () => say(card.en, 1, play, m);
  const slow = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span>천천히</span>"}); slow.onclick = () => say(card.en, .75, slow, m);
  const other = hasAltVoice(card.en) ? h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span>다른 목소리</span>"}) : null;
  if (other) other.onclick = () => say(card.en, 1, other, m, {alt:true});
  box.append(h("div",{class:"row",style:"justify-content:center;gap:14px;flex-wrap:wrap"}, play, slow, other));
  const pool = shuffle(allCards().filter(c=>c.id!==card.id)).sort((a,b)=>(b.tag===card.tag)-(a.tag===card.tag)).slice(0,3);
  const opts = shuffle([card, ...pool]); const t0 = Date.now();
  const wrap = h("div",{class:"opts"});
  const reveal = h("div",{hidden:true}, h("p",{class:"prompt-en"}, tapText(card.en, {en:card.en, ko:card.ko})), h("p",{class:"tapnote"},"모르는 단어가 있으면 눌러서 단어장에 담아요"));
  opts.forEach(o => wrap.append(h("button",{class:"opt",onclick:(e)=>{
    wrap.querySelectorAll("button").forEach(b=>{ b.disabled=true; if (b.dataset.id===card.id) b.classList.add("right"); });
    if (o.id!==card.id) e.currentTarget.classList.add("wrong");
    reveal.hidden = false; finish(box, card, step, o.id===card.id?1:0.3, Date.now()-t0);
  },"data-id":o.id}, o.ko)));
  box.append(wrap, reveal);
  setTimeout(()=>{ if (document.contains(play)) play.click(); }, 300);
}
function taskTiles(box, card, step){
  header(box, "단어를 순서대로 놓아 볼래?");
  box.append(h("p",{class:"prompt-ko"}, card.ko));
  const words = card.en.split(/\s+/); const picked = []; const t0 = Date.now();
  const slot = h("div",{class:"tiles slot","aria-label":"내가 만든 문장"}), bank = h("div",{class:"tiles"});
  const check = h("button",{class:"primary",disabled:true}, "확인");
  const draw = () => { slot.replaceChildren(...picked.map((p,k)=>h("button",{class:"tile",onclick:()=>{ picked.splice(k,1); bankBtns[p].disabled=false; sfx("tap"); draw(); }}, words[p])));
    check.disabled = picked.length !== words.length; };
  const bankBtns = shuffle(words.map((w,i)=>i)).reduce((acc,i)=>{ const b=h("button",{class:"tile",onclick:()=>{ picked.push(i); b.disabled=true; sfx("tap"); draw(); }}, words[i]); acc[i]=b; bank.append(b); return acc; }, {});
  check.onclick = () => { bank.querySelectorAll("button").forEach(b=>b.disabled=true); slot.querySelectorAll("button").forEach(b=>b.disabled=true);
    const ans = picked.map(i=>words[i]).join(" "); const g = grade(ans, card); const ex = h("div",{class:"row"}, speakBtn(card.en,"정답 듣기"));
    if (g.score < 0.99) { const d = diffView({...g, target:card.en, T:toks(card.en), r:lcs(g.A,toks(card.en))}); ex.prepend(d.right); }
    finish(box, card, step, g.score, Date.now()-t0, ex); };
  box.append(slot, bank); actionBar(check);
}
function answerBox(box, ph, onSubmit, opts={}){
  const ta = h("textarea",{id:"answer",rows:"2",placeholder:ph,"data-ph":ph,autocomplete:"off",autocapitalize:"off",spellcheck:"false","aria-label":"영어로 답하기"});
  const send = h("button",{class:"primary",disabled:true}, "확인");
  ta.addEventListener("input", ()=> send.disabled = !ta.value.trim());
  ta.addEventListener("keydown", e=>{ if (e.key==="Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); if (!send.disabled) send.click(); } });
  send.onclick = async () => { await stopDict(); ta.disabled = true; box.querySelectorAll(".mic").forEach(m=>m.remove()); onSubmit(ta.value); };
  ta._onSpoken = () => { if (S.settings.autosubmit && !send.disabled) setTimeout(()=>{ if (document.contains(send) && !ta.disabled) send.click(); }, 350); };
  const mic = micFor(ta, opts);
  box.append(h("div",{class:"answer"}, mic, caps.dict ? h("p",{class:"mic-hint"}, opts.continuous ? "누르면 계속 들어요. 다 말하면 마이크를 다시 누르고 확인" : S.settings.autosubmit ? "누르고 말하면 끝나는 대로 채점해요" : "누르고 말한 뒤 확인을 눌러요") : "", ta));
  actionBar(send);
  if (!matchMedia("(pointer:coarse)").matches && !caps.dict) ta.focus();
  return ta;
}
function resultExtra(ans, card){
  const g = grade(ans, card); const d = diffView(g); const ex = h("div",{style:"display:flex;flex-direction:column;gap:6px"});
  if (g.score < 0.99) ex.append(h("div",{class:"ctx"},"내 답"), d.mine, h("div",{class:"ctx"},"자연스러운 표현 (빠진 부분 강조)"), d.right);
  ex.append(h("p",{class:"tapnote"}, "단어를 눌러 담기: ", tapText(g.target, {en:card.en, ko:card.ko})));
  ex.append(h("div",{class:"row"}, speakBtn(g.target,"원어민처럼 듣기")));
  if (g.score < 0.99) { const wc = wordChips(missedWords(ans, g.target), {en:card.en, ko:card.ko}); if (wc) ex.append(wc); }
  return {g, ex};
}
function taskRecall(box, card, step){
  header(box, "영어로 말해 볼래?");
  box.append(h("p",{class:"prompt-ko"}, card.ko), h("div",{class:"row"}, h("span",{class:"chip"}, card.tag+" · "+card.lvl)));
  const t0 = Date.now();
  const hint = h("button",{class:"ghost",type:"button"}, "첫 단어 힌트");
  hint.onclick = () => { sfx("tap"); hint.replaceWith(h("span",{class:"chip ok"}, card.en.split(" ")[0]+" …")); };
  box.lastChild.append(hint);
  answerBox(box, caps.dict ? "또는 여기에 입력" : "영어로 입력하세요", ans => { const {g, ex} = resultExtra(ans, card); finish(box, card, step, g.score, Date.now()-t0, ex); });
}
function taskShadow(box, card, step){
  const m = header(box, "내 말을 따라 해 봐!");
  box.append(h("p",{class:"prompt-en"}, tapText(card.en, {en:card.en, ko:card.ko})), h("p",{class:"ctx"}, card.ko));
  const fast = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span>원어민 속도</span>"}); fast.onclick = () => say(card.en, 1, fast, m);
  const slow = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span>천천히</span>"}); slow.onclick = () => say(card.en, .75, slow, m);
  box.append(h("div",{class:"row"}, fast, slow));
  const t0 = Date.now();
  if (caps.dict) {
    answerBox(box, "또는 여기에 입력", ans => { const {g, ex} = resultExtra(ans, card); finish(box, card, step, g.score, Date.now()-t0, ex); });
  } else {
    box.append(h("p",{class:"ctx"},"마이크 없이도 효과가 있어요. 두 번 듣고 소리 내어 세 번 따라 한 뒤 눌러 주세요."));
    const done = h("button",{class:"primary"}, "세 번 따라 했어요");
    done.onclick = () => { finish(box, card, step, 1, 6000, null, {selfReport:true}); };
    actionBar(done);
  }
}
function taskWordMean(box, card, step){
  const m = header(box, "이 단어, 무슨 뜻일까?");
  const e = card.word; const t0 = Date.now();
  box.append(h("div",{class:"row",style:"justify-content:center;gap:14px;align-items:center"}, h("div",{style:"text-align:center;min-width:0"}, h("div",{class:"wordbig"}, e.w), e.ipa ? h("div",{class:"ipa"}, e.ipa) : ""), speakBtn(e.w,"듣기")));
  const pool = shuffle(Object.values(WORDS).filter(x=>x.w!==e.w && x.pos===e.pos && x.ko!==e.ko)).slice(0,3);
  const opts = shuffle([e, ...(pool.length===3 ? pool : shuffle(Object.values(WORDS).filter(x=>x.w!==e.w)).slice(0,3))]);
  const wrap = h("div",{class:"opts"});
  opts.forEach(o => wrap.append(h("button",{class:"opt","data-id":o.w,onclick:(ev)=>{
    wrap.querySelectorAll("button").forEach(b=>{ b.disabled=true; if (b.dataset.id===e.w) b.classList.add("right"); });
    if (o.w!==e.w) ev.currentTarget.classList.add("wrong");
    finish(box, card, step, o.w===e.w ? 1 : 0.3, Date.now()-t0, wordInfo(e)); }}, o.ko)));
  box.append(wrap);
  setTimeout(()=>say(e.w, 1, null, m), 300);
}
function taskWordCloze(box, card, step){
  header(box, "빈칸에 들어갈 단어는?");
  const e = card.word, ctxC = step.ctx ? cardById(step.ctx) : null, src = ctxC ? {en:ctxC.en, ko:ctxC.ko} : card.src; const t0 = Date.now();
  if (ctxC) box.append(h("p",{class:"chip",style:"align-self:flex-start"},"처음 보는 문장이야"));
  const forms = new Set([e.w, ...(e.forms||[])]);
  let answerForm = e.w;
  const line = h("p",{class:"prompt-en"});
  src.en.split(/(\s+)/).forEach(tok => { const bare = tok.toLowerCase().replace(/[^a-z'-]/g,"").replace(/'s$/,"");
    if (forms.has(bare)) { answerForm = bare; const tail = tok.slice(tok.toLowerCase().indexOf(bare)+bare.length); line.append(h("span",{class:"blank"}, bare[0] + "_".repeat(Math.max(2, bare.length-1))), tail); }
    else line.append(tok); });
  box.append(h("p",{class:"prompt-ko"}, src.ko), line);
  answerBox(box, caps.dict ? "또는 여기에 입력" : "빈칸 단어를 입력하세요", ans => {
    const said = toks(ans).map(t=>t.replace(/'s$/,""));
    const ok = said.includes(answerForm) || said.some(t => forms.has(t));
    const ex = h("div",{style:"display:flex;flex-direction:column;gap:8px"}, h("p",{style:"font-weight:700"}, highlight(src.en, e.w)), h("div",{class:"row"}, speakBtn(src.en,"표현 듣기")), wordInfo(e));
    finish(box, card, step, ok ? 1 : 0.2, Date.now()-t0, ex);
  });
}
function taskWordIntro(box, card, step){
  const m = header(box, "새 단어를 만나 볼까?", "happy");
  const e = card.word;
  box.append(h("div",{class:"row",style:"justify-content:center;gap:14px;align-items:center"}, h("div",{style:"text-align:center;min-width:0"}, h("div",{class:"wordbig"}, e.w), e.ipa ? h("div",{class:"ipa"}, e.ipa) : ""), speakBtn(e.w,"듣기")),
    h("p",{style:"text-align:center"}, h("span",{class:"ctx"}, e.pos+" · "), h("b",{}, e.ko)));
  const pv = partsView(e); if (pv.childNodes.length) box.append(pv);
  if (card.src) box.append(h("div",{class:"card-s",style:"gap:6px;padding:12px"}, h("div",{class:"ctx"},"이 문장에서 만났어"), h("div",{style:"font-weight:700"}, highlight(card.src.en, e.w)), h("div",{class:"ctx"}, card.src.ko), h("div",{class:"row"}, speakBtn(card.src.en,"문장 듣기"))));
  setTimeout(()=>say(e.w, 1, null, m), 300);
  const go = h("button",{class:"primary"}, "알겠어! 곧 물어봐");
  go.onclick = () => { sfx("tap"); wordNewLeft(); S.wordNew.n++; if (S.words[e.w]) S.words[e.w].stage = Math.max(1, S.words[e.w].stage||0); addXP(2); session.i++; renderStep(); };
  /* already known: skip the first rungs (straight to recall from Korean) and space it out as an easy card */
  const known = h("button",{class:"ghost","data-act":"known"}, "이미 알아요");
  known.onclick = () => { sfx("tap"); if (S.words[e.w]) { S.words[e.w].stage = 3; S.words[e.w].best = Math.max(S.words[e.w].best||0, 3); } schedule("w:"+e.w, 4);
    session.steps = session.steps.filter((st, j) => j <= session.i || st.id !== "w:"+e.w); addXP(1); toast(`'${e.w}'는 아는 단어로 넘길게`); session.i++; renderStep(); };
  actionBar(known, go);
}
function taskWordRecall(box, card, step){
  header(box, "이 뜻의 영어 단어는?");
  const e = card.word; const t0 = Date.now(); const forms = formsOf(e.w);
  box.append(h("p",{class:"prompt-ko"}, e.ko), h("div",{class:"row"}, h("span",{class:"chip"}, e.pos), h("span",{class:"chip mono"}, e.w[0] + " " + "_ ".repeat(Math.max(1, e.w.length-1)).trim())));
  answerBox(box, caps.dict ? "또는 여기에 입력" : "영어 단어를 입력하세요", ans => {
    const said = toks(ans).map(t=>t.replace(/'s$/,"")); const ok = said.some(t => forms.has(t));
    const ex = h("div",{style:"display:flex;flex-direction:column;gap:8px"}, wordInfo(e)); if (card.src) ex.prepend(h("p",{style:"font-weight:700"}, highlight(card.src.en, e.w)));
    finish(box, card, step, ok ? 1 : 0.2, Date.now()-t0, ex);
  });
}
function taskWordMake(box, card, step){
  header(box, "이 단어로 짧은 문장을 말해 볼래?");
  const e = card.word; const t0 = Date.now(); const forms = formsOf(e.w);
  box.append(h("div",{class:"row",style:"justify-content:center;gap:12px;align-items:center"}, h("span",{class:"wordbig"}, e.w), speakBtn(e.w,"듣기")), h("p",{class:"ctx",style:"text-align:center"}, e.pos+" · "+e.ko),
    h("p",{class:"ctx"},"정답은 하나가 아니야. 오늘 있었던 일이나 내 이야기로 만들어 봐."));
  answerBox(box, caps.dict ? "또는 여기에 입력" : "영어 문장을 입력하세요", async ans => {
    const used = toks(ans).some(t => forms.has(t.replace(/'s$/,"")));
    let r = null; if (used && llm.engine) { box.append(h("p",{class:"typing"},"앵두가 문장을 보는 중…"));
      try { r = await llmJSON('You check one English sentence written by a Korean learner who must use a target word. Answer with one JSON object: {"ok": true if the target word is used with a correct meaning and the sentence is understandable, "corrected": a natural corrected version (same meaning), "note_ko": one short Korean tip}.', `Target word: ${e.w} (${e.ko}). Sentence: ${ans}`, 160); } catch(err) { r = null; }
      box.querySelectorAll(".typing").forEach(x=>x.remove()); }
    const ok = used && (!r || r.ok !== false);
    const ex = h("div",{style:"display:flex;flex-direction:column;gap:8px"});
    if (!used) ex.append(h("p",{}, `'${e.w}'가 문장에 들어가야 해.`));
    if (r && r.corrected && toks(r.corrected).join(" ") !== toks(ans).join(" ")) ex.append(h("div",{class:"ctx"},"더 자연스럽게"), h("p",{style:"font-weight:700"}, highlight(String(r.corrected), e.w)), h("div",{class:"row"}, speakBtn(String(r.corrected),"듣기")));
    if (r && r.note_ko) ex.append(h("p",{class:"ctx"}, String(r.note_ko)));
    ex.append(wordInfo(e));
    finish(box, card, step, ok ? 1 : used ? 0.5 : 0.2, Date.now()-t0, ex);
  });
}
function renderRecap(){
  const s = session; S.sessions++;
  track("session_done"); if (!s.total || s.right/s.total >= .9) track("acc90");
  if (s.total >= 3 && s.right === s.total) S.perfectSessions = (S.perfectSessions||0) + 1;
  checkBadges(); s.done = true; save(); setFocusMode(false);
  const app = $("#app"); app.replaceChildren();
  const mins = Math.max(1, Math.round((Date.now()-s.started)/60000));
  const acc = s.total ? Math.round(s.right/s.total*100) : 100;
  const worst = Object.entries(s.misses).filter(([id])=>!id.startsWith("w:")).sort((a,b)=>b[1]-a[1])[0];
  const m = mascot(130,"happy"); speaker = m;
  const xp = h("h1",{class:"big"}, "+0 XP"); const n = h("span",{}, "0");
  xp.replaceChildren("+", n, " XP");
  app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"}, s.wordOnly ? "단어 복습 완료!" : s.speakOnly ? "30초 말하기 완료!" : "오늘의 5분 완료!"), xp,
    h("p",{class:"streakline",html:FLAME.replace("<svg",'<svg width="20" height="20" style="vertical-align:-4px"')}, " ", h("b",{}, streakNow()+"일"), " 연속! 내일도 만나")));
  countUp(n, s.xp); confetti(); sfx("fanfare"); haptic([20,60,20,60,40]);
  if (s.unit && !s.unit.complete) { const after = buildCurriculum(); const u = after.units.find(x=>x.id===s.unit.id);
    if (u && u.complete) { const lvlDone = after.units.filter(x=>x.lvl===u.lvl).every(x=>x.complete||x.status==="skipped"); const nxt = after.units[after.cur];
      const bonus = lvlDone ? 30 : 10; earn(lvlDone ? `${u.lvl} 레벨 졸업` : `${u.lvl} · ${u.tag} 단원 완료`, bonus); s.cherries = (s.cherries||0) + bonus; checkBadges();
      app.append(h("section",{class:"card-s",style:"text-align:center"}, h("b",{class:"sec-h"}, lvlDone ? `${u.lvl} 레벨 졸업!` : `'${u.lvl} · ${u.tag}' 단원 완료!`), h("p",{html:`${CHERRY} 체리 +${bonus}`}),
        h("p",{class:"muted"}, nxt && nxt.id !== u.id ? `다음 단원 '${nxt.lvl} · ${nxt.tag}'이(가) 열렸어.` : "모든 단원을 끝냈어!"),
        u.scen ? h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash="#talk"; }}, `단원 미션: ${u.scen.t}${u.scen.lvl!==u.lvl?` (${u.scen.lvl})`:""}`) : "")); } }
  setTimeout(()=>setMood(m,"idle"), 1600);
  { const up = gradeCheck(); if (up) { const g = GRADES.find(x=>x.id===up.to);
    app.append(h("section",{class:"card-s",id:"grade-up",style:"text-align:center;align-items:center"}, gradeEmblem(g, 64), h("b",{class:"sec-h"}, `어휘 등급 상승! ${up.from} → ${up.to}`), h("p",{class:"ctx"}, g.can))); } }
  app.append(h("div",{class:"kpis"},
    h("div",{class:"kpi"}, h("b",{}, acc+"%"), h("span",{},"정확도 (말하기·조립)")),
    h("div",{class:"kpi"}, h("b",{}, streakNow()+"일"), h("span",{},"연속 학습")),
    h("div",{class:"kpi"}, h("b",{}, String(s.steps.length)), h("span",{},"푼 문제")),
    h("div",{class:"kpi"}, h("b",{}, mins+"분"), h("span",{},"걸린 시간"))));
  /* what this session did for today's missions, cherries and badges */
  const dd = ensureDaily(); const gbox = h("section",{class:"card-s",id:"recap-game"});
  gbox.append(h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"},"오늘의 미션"), h("span",{class:"tchip",style:"min-height:0",html:CHERRY}, "+"+(s.cherries||0))));
  dd.missions.forEach(mm => { const cur = Math.min(mm.n, dd.counts[mm.ev]||0), ok = dd.done.includes(mm.id), now = (s.missions||[]).includes(mm.id);
    gbox.append(h("div",{class:"mrow"+(ok?" done":"")}, h("span",{class:"ck"}, ok?"✓":""), h("span",{class:"mt"}, missionLabel(mm)), h("span",{class:"mv"}, now ? "방금 완료!" : `${cur}/${mm.n}`), h("span",{class:"bar"}, h("i",{style:`width:${cur/mm.n*100}%`})))); });
  if (dd.done.length === dd.missions.length && !dd.chest) gbox.append(h("button",{class:"chest ready",type:"button",html:CHEST_SVG,onclick:openChest}, h("b",{},"상자 열기! 체리 10~20개")));
  (s.badges||[]).forEach(id => { const b = BADGES.find(x=>x.id===id); if (b) gbox.append(h("div",{class:"row"}, h("span",{class:"badge-ic on",style:"width:32px;height:32px",html:BADGE_SVG}), h("b",{}, "새 배지: "+b.t))); });
  app.append(gbox);
  if (worst) { const c = cardById(worst[0]);
    app.append(h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"이것 하나만 기억하자"), h("p",{class:"prompt-en"}, tapText(c.en, {en:c.en, ko:c.ko})), h("p",{class:"ctx"}, c.ko + (c.note? " · "+c.note : "")), h("div",{class:"row"}, speakBtn(c.en,"듣기")))); }
  else app.append(h("p",{class:"muted",style:"text-align:center"},"틀린 표현 없이 끝냈어! 다음 복습은 기억이 흐려지기 직전으로 미뤄 둘게."));
  if (s.newWords && s.newWords.length) app.append(h("section",{class:"card-s"}, h("h2",{class:"sec-h"}, `오늘 단어장에 담은 단어 ${s.newWords.length}개`),
    h("div",{class:"wchips"}, ...s.newWords.map(w => { const e = wordEntry(w); return h("button",{class:"wchip",type:"button",onclick:()=>openWord(w)}, h("b",{}, w), e ? e.ko : ""); })),
    h("p",{class:"ctx"},"다음 세션부터 뜻 고르기와 빈칸 채우기로 복습해요.")));
  const practicedCafe = !s.wordOnly && s.steps.some(step=>cardById(step.id)?.tag === "카페·식당");
  if (practicedCafe) app.append(h("button",{class:"cta",onclick:()=>{ location.hash="#abroad-cafe"; }},
    h("div",{}, h("b",{},"카페에서 한 장면 연습하기"), h("span",{},"점원의 말을 듣고 영어로 주문해 봐요")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
  else if (!s.wordOnly) app.append(h("button",{class:"cta",onclick:()=>{ location.hash="#talk"; }},
    h("div",{}, h("b",{},"배운 표현으로 AI와 대화"), h("span",{},"말로 써 봐야 오래 남아요")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
  app.append(h("button",{class:"cta alt",onclick:()=>{ session=null; location.hash="#home"; route(); }}, h("div",{}, h("b",{},"홈으로")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
  app.append(h("button",{class:"ghost",type:"button","data-act":"share-card",style:"align-self:center",onclick:shareCard},"오늘 기록 카드 공유하기"));
}
