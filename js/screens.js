/* 재잘 · placement, course, me, deck, science. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- PLACEMENT: self-assessment (DIALANG-style) → 10 adaptive items (CAT-style staircase) → 30s speaking sample (CAF) ---------- */
const PLACE_ITEMS = 10;
/* placement core, kept pure so it can be tested with simulated learners (tests/curriculum.js) */
function placementPool(L, used){
  /* typical items of a level: the middle half by difficulty, so A1 is not just "Hello?" and B2 not just the longest */
  const all = DECK.filter(c=>c.lvl===L).sort((a,b)=>chunkDifficulty(a)-chunkDifficulty(b));
  const mid = all.slice(Math.floor(all.length*.25), Math.ceil(all.length*.75));
  const free = mid.filter(c=>!used.has(c.id)); return free.length ? free : all.filter(c=>!used.has(c.id));
}
function placementPick(theta, used){
  const want = Math.max(0, Math.min(LEVELS.length-1, Math.round(theta)));
  for (const d of [0,1,-1,2,-2,3,-3]) { const L = LEVELS[want+d]; if (!L) continue;
    const pool = placementPool(L, used); if (pool.length) return pool[Math.random()*pool.length|0]; }
  return null;
}
/* the first item moves a whole level so strong learners reach their level within 10 items, then the steps shrink */
function placementUpdate(theta, i, ok){ const step = i === 0 ? 1 : i < 4 ? .5 : .25; return Math.max(0, Math.min(LEVELS.length-1, theta + (ok ? step : -step))); }
/* the level is the highest one answered at least 60% right (rounding the staircase estimate placed learners a level too high
   in simulation); a strong or weak 30-second speaking sample can move it by one level when the item answers allow it */
function placementLevel(theta, results, speak){
  const acc = L => { const r = (results||[]).filter(x=>x.lvl===L); return r.length ? r.filter(x=>x.ok).length / r.length : null; };
  let best = 0; LEVELS.forEach((L,i) => { const a = acc(L); if (a !== null && a >= .6) best = Math.max(best, i); });
  if (!results || !results.length) best = Math.max(0, Math.min(LEVELS.length-1, Math.floor(theta)));
  if (speak === "strong" && best < LEVELS.length-1 && (acc(LEVELS[best+1]) ?? 0) >= .5) best++;
  if (speak === "weak" && best > 0 && (acc(LEVELS[best]) ?? 1) < .8) best--;
  return LEVELS[best];
}
function viewPlacement(app){
  setFocusMode(true);
  const P = {theta:0, i:0, used:new Set(), results:[], wpm:null, words:0, stage:"self"};
  const total = 1 + PLACE_ITEMS + (caps.dict ? 1 : 0);
  const bar = (n) => h("div",{class:"topbar"},
    h("button",{class:"x","aria-label":"진단 그만하기",onclick:()=>{ location.hash = "#home"; }},"×"),
    h("div",{class:"prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(total),"aria-valuenow":String(n)}, h("i",{style:`width:${Math.max(4, n/total*100)}%`})),
    h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash = "#home"; }},"나중에"));
  const clear = (n) => { app.replaceChildren(bar(n)); stopDict(); const box = h("section",{class:"task"}); app.append(box); return box; };

  function self(){
    const box = clear(0);
    asker(box, "영어로 어느 정도 말할 수 있어?");
    box.append(h("p",{class:"ctx"},"가장 가까운 걸 골라 줘. 그다음 짧은 문제로 확인할게."));
    const pick = h("div",{class:"pick"});
    LEVELS.forEach((L,i) => pick.append(h("button",{class:"press",type:"button",onclick:()=>{ P.theta = i; sfx("tap"); item(); }}, h("span",{}, h("b",{}, LEVEL_CAN[L])), h("small",{}, L))));
    pick.append(h("button",{class:"press",type:"button",onclick:()=>{ P.theta = 0; sfx("tap"); item(); }}, h("span",{}, h("b",{},"잘 모르겠어")), h("small",{},"쉬운 것부터")));
    box.append(pick);
  }
  const pickCard = () => placementPick(P.theta, P.used);
  function answer(card, type, ok){
    P.results.push({id:card.id, lvl:card.lvl, type, ok});
    P.theta = placementUpdate(P.theta, P.i, ok);
    sfx(ok ? "ding" : "tap"); P.i++;
    setTimeout(()=>{ if (location.hash === "#placement") item(); }, 380);
  }
  function item(){
    if (P.i >= PLACE_ITEMS) return caps.dict ? speak() : result();
    const card = pickCard(); if (!card) return result(); P.used.add(card.id);
    const box = clear(1 + P.i); const type = P.i % 2 === 0 ? "listen" : "recall";
    const dunno = h("button",{class:"ghost",type:"button"},"잘 모르겠어"); dunno.onclick = () => { dunno.disabled = true; answer(card, type, false); };
    if (type === "listen") {
      const m = asker(box, "들리는 말, 무슨 뜻일까?");
      const play = h("button",{class:"speak jumbo",type:"button","aria-pressed":"false","aria-label":"다시 듣기",html:ICON.spk+"<span>다시 듣기</span>"}); play.onclick = () => say(card.en, 1, play, m);
      box.append(h("div",{class:"row",style:"justify-content:center"}, play));
      const others = shuffle(DECK.filter(c=>c.id!==card.id && c.lvl===card.lvl)).slice(0,3);
      const wrap = h("div",{class:"opts"});
      shuffle([card, ...others]).forEach(o => wrap.append(h("button",{class:"opt","data-id":o.id,onclick:(e)=>{ wrap.querySelectorAll("button").forEach(b=>b.disabled=true); e.currentTarget.style.borderColor="var(--sky)"; answer(card, type, o.id===card.id); }}, o.ko)));
      box.append(wrap, h("div",{class:"row"}, dunno));
      setTimeout(()=>{ if (document.contains(play)) play.click(); }, 300);
    } else {
      asker(box, "영어로 말해 볼래?");
      box.append(h("p",{class:"prompt-ko"}, card.ko), h("div",{class:"row"}, dunno));
      answerBox(box, caps.dict ? "또는 여기에 입력" : "영어로 입력하세요", ans => answer(card, type, grade(ans, card).score >= 0.8));
    }
  }
  function speak(){
    const box = clear(1 + PLACE_ITEMS);
    asker(box, "마지막! 영어로 30초 자기소개해 줘", "happy");
    box.append(h("div",{class:"row"}, ...["이름","하는 일","취미","영어 공부하는 이유"].map(t=>h("span",{class:"chip"}, t))),
      h("p",{class:"ctx"},"틀려도 괜찮아. 말이 끊기면 마이크를 다시 눌러서 이어 말해 줘."));
    const ta = h("textarea",{id:"intro",rows:"4",placeholder:"마이크를 누르고 말하기","data-ph":"마이크를 누르고 말하기","aria-label":"자기소개"});
    box.append(h("div",{class:"answer"}, micFor(ta), ta));
    const done = h("button",{class:"primary"},"다 말했어");
    const skip = h("button",{class:"ghost",type:"button",onclick:()=>result()},"건너뛰기");
    done.onclick = async () => { await stopDict();
      const words = toks(ta.value).length, ms = Number(ta.dataset.speechMs||0);
      P.words = words; P.wpm = ms >= 3000 && words ? Math.round(words/(ms/60000)) : null;
      /* fluency nudges the estimate a quarter step: long, fluent answers up; very short ones down */
      P.speak = words >= 35 && (P.wpm||0) >= 100 ? "strong" : words < 10 ? "weak" : null;
      result(); };
    actionBar(done, skip);
  }
  function result(){
    setFocusMode(false); app.replaceChildren(); stopDict();
    const rec = placementLevel(P.theta, P.results, P.speak);
    const acc = t => { const r = P.results.filter(x=>x.type===t); return r.length ? r.filter(x=>x.ok).length/r.length : 0; };
    const listen = acc("listen"), spk = acc("recall");
    let chosen = rec;
    const m = mascot(110,"happy"); speaker = m; confetti(); sfx("fanfare");
    app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"},"실력 진단 결과"), h("h1",{class:"title"}, "추천 시작 레벨"), h("span",{class:"lvl-badge",style:"font-size:28px"}, `${rec} ${LEVEL_KO[rec]}`), h("p",{class:"muted"}, "이 레벨의 목표: "+LEVEL_CAN[rec]+". 지금 실력에 딱 맞는 출발점이야.")));
    const hb = (lab, pct, val) => h("div",{class:"hbar"}, h("span",{}, lab), h("span",{class:"t"}, h("i",{style:`width:${Math.round(pct*100)}%`})), h("span",{class:"v"}, val));
    app.append(h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"영역별 결과"), hb("듣기", listen, Math.round(listen*100)+"%"), hb("말하기", spk, Math.round(spk*100)+"%"),
      hb("유창성", P.wpm ? Math.min(1, P.wpm/140) : 0, P.wpm ? P.wpm+" WPM" : "–"),
      h("p",{class:"ctx"}, "듣기·말하기는 진단 문제 정답률, 유창성은 자기소개의 분당 단어 수예요.")));
    const seg = h("div",{class:"seg",role:"group","aria-label":"시작 레벨 고르기"});
    const preview = h("div",{style:"display:flex;flex-direction:column;gap:8px"});
    const draw = () => {
      seg.replaceChildren(...LEVELS.map(L=>h("button",{type:"button","aria-pressed":String(L===chosen),onclick:()=>{ chosen = L; sfx("tap"); draw(); }}, L + (L===rec ? " · 추천" : ""))));
      const keep = S.level; S.level = chosen; const {units, startIdx} = buildCurriculum(); S.level = keep;
      preview.replaceChildren(...units.slice(startIdx, startIdx+3).map((u,i)=>h("div",{class:"pu press "+(i===0?"now":"next")}, h("span",{class:"st"}, String(i+1)), h("span",{style:"min-width:0"}, h("div",{class:"tg"}, `${u.lvl} · ${u.tag}`), h("div",{class:"sb"}, `표현 ${u.total}개`+(u.scen?` · 미션: ${u.scen.t}${u.scen.lvl!==u.lvl?` (${u.scen.lvl})`:""}`:""))), "")));
    };
    draw();
    app.append(h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"내 코스 미리보기"), h("p",{class:"ctx"},"너무 쉽거나 어려우면 시작 레벨을 바꿔도 돼."), seg, preview));
    const go = h("button",{class:"cta",onclick:()=>{
      S.level = chosen; S.placement = {date:dayKey(), theta:+P.theta.toFixed(2), level:rec, listen:+listen.toFixed(2), speak:+spk.toFixed(2), wpm:P.wpm};
      /* chunks already answered correctly skip "new" and go straight to spaced review */
      P.results.filter(r=>r.ok && !S.cards[r.id]).forEach(r=>schedule(r.id, 3));
      save(); sfx("tap"); location.hash = "#course"; }},
      h("div",{}, h("b",{},"이 레벨로 코스 시작"), h("span",{},"진단에서 맞힌 표현은 복습으로 넘겨 둘게")), h("span",{class:"arrow","aria-hidden":"true"},"→"));
    app.append(go);
  }
  self();
}

/* ---------- COURSE: the learning path ---------- */
function viewCourse(app){
  const {units} = buildCurriculum();
  const head = h("div",{class:"top"}, h("div",{}, h("p",{class:"eyebrow"},"내 코스"), h("h1",{class:"title"},"한 단원씩, 입에 붙이기")), h("span",{class:"lvl-badge"}, myLevel()));
  app.append(head);
  app.append(h("p",{class:"muted"}, S.placement ? `진단 결과 ${myLevel()} ${LEVEL_KO[myLevel()]}부터 시작했어요. 아래 단원은 건너뛰었지만 언제든 복습할 수 있어요.` : "아직 실력 진단 전이라 B1(중급)부터 시작해요. 진단하면 내 레벨에 맞는 단원부터 열려요."),
    h("div",{class:"row"}, h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash="#placement"; }}, S.placement ? "실력 다시 진단" : "실력 진단하기")));
  { const cu = currentUnit(), ready = speakReady(cu);
    app.append(h("button",{class:"cta alt","data-open":"speak",type:"button",onclick:()=>{ speakUnitNext = cu.id; location.hash = "#speak"; }},
      h("div",{}, h("b",{},"30초 말하기"), h("span",{}, ready ? `${cu.lvl} · ${cu.tag} 표현으로 길게 답해 보기` : `이 단원 표현 ${SPEAK_MIN_LEARNED}개를 익히면 열려요 (지금 ${learnedIn(cu).length}개)`)), h("span",{class:"arrow","aria-hidden":"true"},"→"))); }
  LEVELS.forEach(L => {
    const us = units.filter(u=>u.lvl===L); if (!us.length) return;
    /* a level with nothing left to do (all skipped or finished) folds away so the current unit is near the top */
    const settled = us.every(u => u.status === "skipped" || u.status === "done");
    const head = h("div",{class:"lvl-h"}, h("b",{}, `${L} ${LEVEL_KO[L]}`), h("span",{}, settled ? `${us.filter(u=>u.status==="done").length ? "완료·" : ""}건너뜀 ${us.length}단원 · 눌러서 펼치기` : LEVEL_CAN[L]));
    const sec = settled ? h("details",{class:"lvl-sec folded"}, h("summary",{}, head)) : h("section",{class:"lvl-sec"}, head);
    us.forEach((u,i) => {
      const label = {done:"완료", now:"지금", skipped:"건너뜀", open:"진행 중", next:"예정"}[u.status];
      const btn = h("button",{class:"pu press "+u.status,type:"button","aria-label":`${u.lvl} ${u.tag} 단원, ${label}, ${u.done}/${u.total}`,onclick:()=>{ S.focusUnit = u.id; save(); sfx("tap"); location.hash="#learn"; }},
        h("span",{class:"st"}, u.status==="now" ? mascot(36) : u.status==="done" ? "✓" : String(i+1)),
        h("span",{style:"min-width:0"}, h("div",{class:"tg"}, u.tag), h("div",{class:"sb"}, `${label} · ${u.done}/${u.total} 입에 붙음`+(u.scen?` · 미션: ${u.scen.t}${u.scen.lvl!==u.lvl?` (${u.scen.lvl})`:""}`:"")), h("div",{class:"bar"}, h("i",{style:`width:${Math.round(u.done/u.total*100)}%`}))),
        h("span",{class:"mono muted","aria-hidden":"true"},"→"));
      sec.append(btn);
    });
    app.append(sec);
  });
  setTimeout(() => { const now = app.querySelector(".pu.now"); if (now && now.getBoundingClientRect().top > innerHeight * .6) now.scrollIntoView({block:"center", behavior: reduced() ? "auto" : "smooth"}); }, 60);
}

/* ---------- ME: level, diagnosis, stats, settings, why it works ---------- */
function viewMe(app){
  const m = mascot(76); speaker = m;
  app.append(h("section",{class:"greet"}, m, h("div",{class:"bubble"}, h("b",{}, `지금 레벨 ${myLevel()} · ${LEVEL_KO[myLevel()]}`), "지금 목표는 '"+LEVEL_CAN[myLevel()]+"'야. 같이 해 보자!")));
  app.append(gradeCard());
  const P = S.placement;
  const diag = h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"실력 진단"));
  if (P) {
    const bar = (lab, pct, val) => h("div",{class:"hbar"}, h("span",{}, lab), h("span",{class:"t"}, h("i",{style:`width:${Math.round(Math.max(0,Math.min(1,pct))*100)}%`})), h("span",{class:"v"}, val));
    diag.append(h("p",{class:"ctx"}, `${P.date} 진단 · 추천 ${P.level} · 선택 ${myLevel()}`),
      bar("듣기", P.listen, Math.round(P.listen*100)+"%"), bar("말하기", P.speak, Math.round(P.speak*100)+"%"),
      bar("유창성", P.wpm ? P.wpm/140 : 0, P.wpm ? P.wpm+" WPM" : "–"));
  } else diag.append(h("p",{class:"muted"},"아직 진단 전이에요. 3~4분이면 내 레벨과 맞춤 코스가 나와요."));
  diag.append(h("button",{class:"primary",onclick:()=>{ location.hash="#placement"; }}, P ? "다시 진단하기" : "진단 시작"));
  app.append(diag);
  /* 앵두 꾸미기, badges, streak calendar */
  const dress = h("button",{class:"cta alt",type:"button","data-open":"shop",onclick:openShop}, h("div",{style:"display:flex;align-items:center;gap:12px"}, mascot(56,"happy"), h("div",{}, h("b",{},"앵두 꾸미기"), h("span",{html:`${CHERRY} 체리 ${S.cherries||0}개 · 옷 ${S.owned.length}/${ACC.filter(a=>!a.badge).length} · 보호권 ${S.freezes||0}개`}))), h("span",{class:"arrow","aria-hidden":"true"},"→"));
  app.append(dress);
  const nb = Object.keys(S.badges||{}).length;
  app.append(h("section",{class:"card-s",id:"badges"}, h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"},"배지"), h("span",{class:"chip"}, `${nb}/${BADGES.length}`)), badgeGrid(6),
    h("button",{class:"ghost",type:"button","data-open":"badges",onclick:()=>openSheet(`배지 ${nb}/${BADGES.length}`, inner=>inner.append(badgeGrid()))}, "배지 모두 보기")));
  S.badgesSeen = Object.keys(S.badges||{}); save();
  app.append(h("section",{class:"card-s",id:"calendar"}, h("h2",{class:"sec-h"},"연속 기록 달력"), calendarEl(), h("button",{class:"ghost",type:"button","data-act":"share-card",onclick:shareCard},"기록 카드 공유")));
  const known = Object.keys(S.cards).filter(id=>!id.startsWith("w:") && mastery(id)>=3).length;
  const kpi = (v, l) => h("div",{class:"kpi"}, h("b",{}, v), h("span",{}, l));
  app.append(raceCard());
  app.append(h("div",{class:"statgrid"}, kpi(String(S.xp), "총 XP"), kpi(streakNow()+"일", "연속 학습"), kpi((S.bestStreak||0)+"일", "최고 연속"), kpi(String(S.cherries||0), "체리"), kpi(known+"/"+allCards().length, "입에 붙은 표현"), kpi(String(S.talks||0), "AI 대화"), kpi(String(Object.keys(S.words||{}).length), "내 단어장"), kpi(String(Object.keys(S.words||{}).filter(w=>mastery("w:"+w)>=3).length), "외운 단어")));
  const wl = Object.keys(S.words||{}); if (wl.length) { const cnt = [0,0,0,0,0,0]; wl.forEach(w => cnt[wordStage(w)]++); const mx = Math.max(...cnt, 1);
    app.append(h("section",{class:"card-s",id:"word-ladder"}, h("h2",{class:"sec-h"}, `단어 ${wl.length}개 학습 단계`), h("div",{class:"stagebars"}, ...STAGE_KO.map((t,i)=>h("div",{class:"hbar"}, h("span",{style:"font-size:12px"}, t), h("span",{class:"t"}, h("i",{style:`width:${cnt[i]/mx*100}%`})), h("span",{class:"v"}, cnt[i]+"개")))),
      h("button",{class:"ghost",type:"button",onclick:()=>{ wordOnlyNext = true; location.hash = "#learn"; }},"단어만 복습하기"))); }
  { const sg = speakGrowth(); if (sg) app.append(sg); }
  const errs = Object.entries(S.errors||{}).sort((a,b)=>b[1]-a[1]);
  if (errs.length) app.append(h("p",{class:"note"}, "자주 고친 유형", ...errs.slice(0,4).map(([k,v])=>h("span",{class:"chip warn"}, (ERR_KO[k]||"기타")+" "+v))));
  { const chip = (ok, on, off) => h("span",{class:"chip"+(ok?" ok":"")}, ok?on:off);
    app.append(h("p",{class:"note","data-note":"device"}, chip(!!caps.dict,"말하기 입력 켜짐","타이핑 입력"), chip(canSpeak(), hasClips() ? "원어민 녹음 음성" : "기기 음성","음성 없음"), chip(!!llm.engine, "AI 모델 준비됨", "AI 모델 미준비"), chip(store.ok,"이 기기에 저장","저장 안 됨 (사생활 보호 모드)"))); }
  app.append(h("div",{class:"menu"},
    !isStandalone() ? h("button",{type:"button","data-open":"install",onclick:installApp}, h("span",{}, "홈 화면에 추가", h("small",{},"앱처럼 열고 오프라인에서도 연습")), h("span",{"aria-hidden":"true"},"→")) : "",
    h("button",{type:"button",onclick:openSettings}, h("span",{}, "설정", h("small",{},"하루 목표, 효과음, 핸즈프리, 기록 백업")), h("span",{"aria-hidden":"true"},"→")),
    h("button",{type:"button",onclick:()=>{ location.hash="#science"; }}, h("span",{}, "이 앱이 효과적인 이유", h("small",{},"제2언어 습득 연구와 인기 앱 분석")), h("span",{"aria-hidden":"true"},"→"))));
}

/* ---------- DECK ---------- */
let deckFilter = "전체", deckLevel = "모든 레벨", deckMode = "chunks", wordScope = "mine";
function viewDeck(app){
  const seg = h("div",{class:"seg2",role:"group","aria-label":"표현함 보기"},
    h("button",{type:"button","aria-pressed":String(deckMode==="chunks"),onclick:()=>{ deckMode="chunks"; route(); }},"표현"),
    h("button",{type:"button","aria-pressed":String(deckMode==="words"),onclick:()=>{ deckMode="words"; route(); }},"단어"));
  const body = h("div",{class:"deck-body"});
  app.append(seg, dictSearchBox(body), body);
  if (deckMode === "words") return viewWords(body);
  const cards = allCards(); const tags = ["전체", ...new Set(cards.map(c=>c.tag))];
  body.append(h("p",{class:"eyebrow"},"표현함 · "+cards.length+"개"), h("h1",{class:"title"},"입에 붙일 덩어리들"),
    h("p",{class:"lead muted"},"단어 하나가 아니라 통째로 쓰는 표현을 모읍니다. 막대가 다섯 칸 차면 몇 주 동안 잊지 않는 상태예요."));
  const fl = h("div",{class:"filters",role:"group","aria-label":"상황별 보기"}); const fl2 = h("div",{class:"filters",role:"group","aria-label":"레벨별 보기"}); const list = h("div",{class:"cards"});
  const lv = ["모든 레벨", ...LEVELS];
  const draw = () => { fl.replaceChildren(...tags.map(t=>h("button",{"aria-pressed":String(t===deckFilter),onclick:refilter(()=>{ deckFilter=t; })}, t)));
    fl2.replaceChildren(...lv.map(t=>h("button",{"aria-pressed":String(t===deckLevel),onclick:refilter(()=>{ deckLevel=t; })}, t)));
    /* 1,200+ rows at once made a page ~120 screens long: draw 60 at a time */
    const shown = cards.filter(c=>(deckFilter==="전체"||c.tag===deckFilter) && (deckLevel==="모든 레벨"||c.lvl===deckLevel)).sort((a,b)=>mastery(b.id)-mastery(a.id));
    list.replaceChildren(...shown.slice(0, deckShow).map(c=>{ const m = mastery(c.id);
      const row = h("button",{class:"card",style:"border-left:0;border-right:0;border-bottom:0;background:transparent;text-align:left;width:100%",onclick:()=>say(c.en,1),"aria-label":c.en+" 듣기"},
        h("div",{class:"en"}, c.en), h("div",{class:"ko"}, c.ko),
        h("div",{class:"m"}, h("div",{class:"meter"}, ...[0,1,2,3,4].map(k=>h("i",{class:k<=m-1||(k===0&&m>0)?"on":""}))), h("span",{}, MASTERY_LABEL[m])));
      return row; }));
    more.hidden = shown.length <= deckShow; more.textContent = `더 보기 (${shown.length - deckShow}개 남음)`; };
  let deckShow = 60; const more = h("button",{class:"ghost more-btn",type:"button","data-act":"deck-more",onclick:()=>{ deckShow += 60; draw(); }});
  const refilter = fn => () => { deckShow = 60; fn(); draw(); };
  draw(); body.append(fl, fl2, list, more);
}

function viewWords(app){
  const mine = Object.keys(S.words||{});
  app.append(h("h1",{class:"title"}, wordScope==="mine" ? "내 단어장" : "자주 쓰는 단어"),
    h("p",{class:"lead muted"}, wordScope==="mine" ? "말하다 막힌 단어가 여기 모여요. 자주 쓰는 단어는 자동으로, 드문 단어는 골라서 담아요." : "표현에 나오는 단어 전체예요. 자주 쓰는 순서로 보여 줘요."));
  const fl = h("div",{class:"filters",role:"group","aria-label":"단어 범위"},
    h("button",{"aria-pressed":String(wordScope==="mine"),onclick:()=>{ wordScope="mine"; route(); }}, `내 단어장 ${mine.length}`),
    h("button",{"aria-pressed":String(wordScope==="all"),onclick:()=>{ wordScope="all"; route(); }}, `전체 단어 ${Object.keys(WORDS).length}`));
  app.append(fl);
  /* vocabulary course: frequency-ranked words, met so far, in bands of 500 */
  { const vp = vocabProgress(), c = activeCourse(), dd = goalDays(); if (vp.total) app.append(h("section",{class:"card-s",id:"vocab-course"},
      h("div",{class:"row",style:"justify-content:space-between;align-items:center"}, h("h2",{class:"sec-h"}, c.t), h("span",{class:"chip"}, `${vp.met.toLocaleString()}/${vp.total.toLocaleString()}`)),
      h("p",{class:"ctx",style:"margin-top:-6px"}, dd ? `시험까지 D-${dd} · 남은 단어를 맞추려면 하루 ${wordsPerDay()}개씩. 아는 단어는 '이미 알아요'로 넘겨요.` : `${c.d} · 하루 ${wordsPerDay()}개씩. 아는 단어는 '이미 알아요'로 넘겨요.`),
      h("button",{class:"ghost sm",type:"button","data-open":"course-pick",onclick:openCoursePicker}, "단어장 바꾸기 · 시험 날짜"),
      h("div",{class:"stagebars"}, ...vp.bands.map(b => h("div",{class:"hbar"}, h("span",{style:"font-size:12px"}, `${b.from}~${b.to}`), h("span",{class:"t"}, h("i",{style:`width:${b.met/b.total*100}%`})), h("span",{class:"v"}, `${b.met}`)))),
      h("button",{class:"primary","data-open":"wordcourse",onclick:()=>{ sfx("tap"); wordOnlyNext = true; location.hash = "#learn"; }}, "오늘의 단어 학습"))); }
  if (wordScope === "mine" && mine.length) { const now = Date.now();
    const dueN = mine.filter(w => S.cards["w:"+w] && S.cards["w:"+w].due <= now).length, newN = Math.min(mine.filter(w=>!S.cards["w:"+w]).length, wordNewLeft());
    app.append(h("button",{class:"cta","data-open":"wordonly",onclick:()=>{ sfx("tap"); wordOnlyNext = true; location.hash = "#learn"; }}, h("div",{}, h("b",{},"단어만 복습하기"), h("span",{}, `복습 ${dueN}개 · 새 단어 ${newN}개 (하루 ${wordsPerDay()}개까지)`)), h("span",{class:"arrow","aria-hidden":"true"},"→")));
    app.append(h("p",{class:"ctx"},"단어는 만나기 → 뜻 알아보기 → 문장 속 빈칸 → 한→영 떠올리기 → 다른 문장 빈칸 → 내 문장 만들기 순서로 올라가요. 틀리면 한 칸 내려가요.")); }
  const list = (wordScope==="mine" ? mine.map(wordEntry).filter(Boolean) : Object.values(WORDS)).sort((a,b)=>a.band-b.band || a.w.localeCompare(b.w));
  if (!list.length) { const m = mascot(90); app.append(h("section",{class:"celebrate"}, m, h("p",{class:"muted"},"아직 비어 있어. 오늘의 5분에서 말하다 막힌 단어가 생기면 여기 모여."))); return; }
  /* the full dictionary has ~2,900 words: render in pages so the tab stays fast on phones */
  const box = h("div",{class:"cards"}); const PAGE = 150; let shown = 0;
  const more = h("button",{class:"ghost",type:"button","data-act":"more-words"}, "더 보기");
  const renderMore = () => { list.slice(shown, shown + PAGE).forEach(row); shown += PAGE; more.hidden = shown >= list.length; more.textContent = `더 보기 (${Math.max(0, list.length - shown)}개 남음)`; };
  const row = e => { const m = mastery("w:"+e.w);
    box.append(h("button",{class:"card",style:"border-left:0;border-right:0;border-bottom:0;background:transparent;text-align:left;width:100%",onclick:()=>openWord(e.w),"aria-label":e.w+" 단어 카드"},
      h("div",{class:"en"}, e.w, " ", e.ipa ? h("span",{class:"ipa",style:"font-size:13px;font-weight:400"}, e.ipa+" ") : "", h("span",{class:"chip band"+e.band,style:"font-weight:400"}, BAND_KO[e.band].split(" · ")[0]), (e.parts&&e.parts.length) ? h("span",{class:"chip",style:"font-weight:400;margin-left:4px"},"해부") : ""),
      h("div",{class:"ko"}, e.pos+" · "+e.ko),
      hasWord(e.w) ? h("div",{class:"m"}, h("div",{class:"meter"}, ...[1,2,3,4,5].map(k=>h("i",{class:k<=wordStage(e.w)?"on":""}))), h("span",{}, STAGE_KO[wordStage(e.w)]))
        : h("div",{class:"m"}, h("div",{class:"meter"}, ...[0,1,2,3,4].map(k=>h("i",{class:k<=m-1||(k===0&&m>0)?"on":""}))), h("span",{}, MASTERY_LABEL[m])))); };
  more.onclick = renderMore; renderMore();
  app.append(box, more);
}

/* 단어장 고르기: everyday, school, 수능, TOEIC, TOEFL/IELTS; exam courses take an exam date and work out the daily amount */
function openCoursePicker(){
  let pick = activeCourse().id, date = (S.goal && S.goal.date) || "";
  openSheet("단어장 고르기", inner => {
    const draw = () => {
      inner.replaceChildren();
      const list = h("div",{class:"course-list",role:"radiogroup","aria-label":"단어장"});
      allCourses().forEach(c => { const tot = c.words.filter(w => WORDS[w]).length, met = c.words.filter(w => WORDS[w] && wordMet(w)).length;
        list.append(h("button",{class:"course-opt press" + (c.id === pick ? " on" : ""),type:"button",role:"radio","aria-checked":String(c.id === pick),"data-course":c.id,onclick:()=>{ sfx("tap"); pick = c.id; draw(); }},
          h("div",{style:"min-width:0;flex:1;text-align:left"}, h("b",{}, c.t), h("small",{class:"ctx",style:"display:block"}, c.d)),
          h("span",{class:"chip"}, `${met}/${tot.toLocaleString()}`))); });
      inner.append(list);
      if (EXAM_COURSES.includes(pick)) {
        const inp = h("input",{type:"date",value:date,min:dayKey(),"aria-label":"시험 날짜",class:"date-in"});
        inp.onchange = () => { date = inp.value; draw(); };
        const c = allCourses().find(x => x.id === pick), left = c.words.filter(w => WORDS[w] && !wordMet(w)).length;
        const days = date ? daysBetween(dayKey(), date) : 0, per = days >= 1 ? Math.max(3, Math.min(40, Math.ceil(left / Math.max(1, Math.floor(days * .85))))) : 0;
        inner.append(h("div",{class:"card-s",style:"gap:8px;padding:12px"}, h("label",{class:"ctx"}, "시험 날짜 (선택)"), inp,
          h("p",{class:"ctx",id:"pace-note"}, days >= 1 ? `D-${days} · 남은 단어 ${left.toLocaleString()}개 → 하루 ${per}개씩이면 시험 ${Math.max(1, days - Math.floor(days*.85))}일 전에 다 보고 복습할 수 있어요.` + (per >= 40 ? " 하루 40개가 최대라 시간이 조금 모자라요. 자주 나오는 단어부터 나와요." : "") : "날짜를 넣으면 하루에 몇 개씩 하면 되는지 계산해 줘요. 비워 두면 설정의 하루 새 단어 수를 따라요.")));
      }
      const src = allCourses().find(x => x.id === pick).src;
      inner.append(h("p",{class:"ctx"}, `출처: ${src}. 뜻·예문은 재잘이 직접 썼어요.`));
      const ok = h("button",{class:"primary",type:"button","data-act":"save-course"}, "이 단어장으로 공부하기");
      ok.onclick = () => { S.goal = {course:pick, date: EXAM_COURSES.includes(pick) && date ? date : null}; save(); closeSheet(); toast(`'${allCourses().find(x=>x.id===pick).t}'으로 바꿨어요 · 하루 ${wordsPerDay()}개`); route(); };
      inner.append(ok);
    };
    draw();
  });
}

/* ---------- SCIENCE ---------- */
function viewScience(app){
  app.append(h("div",{class:"row"}, h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash="#me"; }},"← 나")));
  app.append(h("p",{class:"eyebrow"},"이 앱이 이렇게 생긴 이유"), h("h1",{class:"title"},"연구가 정한 설계"),
    h("p",{class:"lead muted"},"기능마다 근거가 있어요. 왼쪽은 제2언어 습득과 기억 연구에서 확인된 원리, 오른쪽은 그 원리가 화면에서 어떻게 쓰였는지예요."));
  const P = [
    ["덩어리로 배우기","Wray (2002); Boers et al. (2006), Language Teaching Research","원어민 발화의 큰 부분은 미리 조립된 표현이고, 이런 덩어리를 많이 쓰는 학습자가 더 유창하게 들립니다.","<b>적용</b> 모든 학습 단위가 단어가 아닌 문장 덩어리입니다."],
    ["간격 반복","Cepeda et al. (2006), Psychological Bulletin; Ye et al. (2022), KDD","잊기 직전에 다시 떠올릴수록 기억이 오래갑니다. FSRS는 이 간격을 기억 모델로 계산합니다.","<b>적용</b> FSRS 방식으로 표현마다 기억 안정도를 계산해, 기억할 확률이 약 90%로 떨어질 때 복습에 넣습니다."],
    ["떠올리기 연습","Roediger & Karpicke (2006); Karpicke & Roediger (2008), Science","다시 읽기보다 기억에서 꺼내 보는 시험이 장기 기억을 더 크게 늘립니다.","<b>적용</b> 복습은 보기 없이 한국어만 보고 영어로 말하게 합니다. 힌트는 첫 단어까지만."],
    ["이해 가능한 입력 먼저","Krashen (1985); VanPatten (2004)","이해할 수 있는 입력이 습득의 재료입니다. 새 표현은 먼저 소리와 뜻으로 받아들인 뒤 말합니다.","<b>적용</b> 새 표현은 '듣고 뜻 고르기'로 먼저 만나고, 같은 세션 뒤쪽에서 직접 조립합니다."],
    ["출력과 알아차리기","Swain (1985, 1995); Schmidt (1990), Applied Linguistics","직접 말해 봐야 내가 모르는 부분이 드러나고, 그 차이를 알아차려야 습득이 일어납니다.","<b>적용</b> 답을 내면 내 문장과 자연스러운 문장을 나란히 놓고, 빠진 단어를 강조합니다."],
    ["대화 속 교정: 스스로 고치기 먼저","Long (1996); Lyster & Ranta (1997); Lyster (2004); Li (2010), Language Learning","의미 중심 대화 안의 교정은 효과가 뚜렷하고, 정답을 바로 주기(리캐스트)보다 스스로 고치게 이끌 때 더 많이 흡수됩니다.","<b>적용</b> 틀린 문장이 나오면 먼저 힌트를 주고 한 번 더 말할 기회를 준 뒤, 그래도 어려우면 고친 문장을 보여 줍니다. 고친 문장은 복습 카드로 넣을 수 있어요."],
    ["과제 중심 말하기","Ellis (2003), Task-based Language Learning and Teaching","실제 목표가 있는 과제를 수행할 때 언어를 의미 있게 씁니다.","<b>적용</b> 상황극마다 미션 세 개가 있고, 미션을 달성해야 장면이 마무리됩니다."],
    ["섀도잉","Hamada (2016), Language Teaching Research","들리는 대로 바로 따라 말하기는 소리 인식과 말하기 유창성을 함께 키웁니다.","<b>적용</b> 복습 셋 중 하나는 원어민 속도·느린 속도로 듣고 따라 말하는 문제입니다."],
    ["바람직한 어려움과 섞어 풀기","Bjork (1994); Bjork & Bjork (2011)","조금 어렵게, 여러 유형을 섞어서 연습하면 당장은 느려도 오래 남습니다.","<b>적용</b> 한 세션 안에서 듣기·조립·인출·섀도잉이 섞이고, 틀린 표현은 세 문제 뒤에 다시 나옵니다."],
    ["복잡성·정확성·유창성 (CAF)","Housen & Kuiken (2009), Applied Linguistics; Skehan (2009)","말하기 능력은 복잡성, 정확성, 유창성 세 축으로 따로 보아야 정확합니다.","<b>적용</b> 대화가 끝나면 평균 발화 길이, 고칠 곳 없던 턴의 비율, 말한 턴 수를 따로 보여 줍니다."],
    ["자주 쓰는 단어부터","Nation (2001, 2013); Browne, Culligan & Phillips (2013) NGSL","가장 자주 쓰는 2,000여 단어가 일상 텍스트의 대부분을 덮어요. 드문 단어보다 자주 쓰는 단어를 먼저 익히는 게 효율적이에요.","<b>적용</b> 말하다 놓친 단어 중 자주 쓰는 단어는 자동으로 단어장에 담고, 드문 단어는 골라서 담게 해요."],
    ["단어를 쪼개고 이야기로 기억하기","Bauer & Nation (1993); Wei (2015), Language Teaching Research; Boers, Demecheleer & Eyckmans (2004)","접두사·어근·접미사로 단어를 쪼개 보거나, 관용 표현이 생긴 이야기를 알면 더 오래 기억해요.","<b>적용</b> 긴 단어는 re + serv + ation 처럼 해부해서 보여 주고, devil's advocate 같은 표현은 생긴 이야기를 붙였어요."],
    ["문장 속에서 다시 꺼내기","Laufer & Hulstijn (2001); Craik & Lockhart (1972)","뜻만 보는 것보다 문장 속 빈칸에 직접 넣어 보는 깊은 처리가 기억을 더 단단하게 해요.","<b>적용</b> 단어 복습은 뜻 고르기로 시작해, 그 단어를 만났던 원래 표현의 빈칸 채우기로 이어져요."],
    ["자율성·유능감·관계","Deci & Ryan (2000), American Psychologist","스스로 고르고, 잘하고 있다고 느끼고, 연결되어 있을 때 동기가 오래갑니다.","<b>적용</b> 하루 목표는 50 XP로 작게, 연속 기록과 콤보로 성취를 보이게 하고, 상황은 직접 고릅니다."],
    ["게임 요소는 학습 행동에 묶을 때","Hamari, Koivisto & Sarsa (2014); Sailer & Homner (2020), Educational Psychology Review","게임 요소는 학습 동기와 행동에 작지만 뚜렷한 효과가 있고, 그 효과는 무엇에 보상하느냐에 달려 있어요.","<b>적용</b> 체리는 접속이 아니라 복습·말하기·스스로 고치기 같은 학습 행동에만 줘요. 상자 안 체리 수(10~20개)도 미리 알려 줘요."],
    ["언제 할지 정하면 습관이 된다","Gollwitzer (1999), American Psychologist; Lally et al. (2010), European Journal of Social Psychology","'언제, 어디서'를 미리 정한 계획은 실천율을 높이고, 습관이 자리 잡는 데는 평균 66일이 걸렸어요.","<b>적용</b> 공부할 시간을 정하면 그 시간에 앵두가 알려 주고, 66일 연속 배지를 두었어요. 하루 빠져도 보호권이 기록을 지켜 불안을 줄여요."]
  ];
  const box = h("div",{class:"prin"});
  P.forEach(([t,src,body,use]) => box.append(h("article",{}, h("h3",{}, t), h("div",{class:"src"}, src), h("p",{}, body), h("p",{class:"use",html:use}))));
  app.append(box);
  app.append(h("p",{class:"eyebrow",style:"margin-top:8px"},"인기 앱 분석에서 가져온 것"));
  const RE = h("div",{class:"prin"});
  [["AI 대화의 턴 구조","실시간 음성 AI 레슨은 '질문 → 내 발화 확정 → 교정 → 다음 질문' 흐름과 미션 진행도를 따로 관리합니다. 재잘의 상황극도 같은 흐름에 미션 칩을 둡니다."],
   ["막혔을 때 추천 답변","AI 영상통화 기능은 막힌 학습자에게 다음에 할 말을 추천합니다. 재잘의 '뭐라고 하지?' 버튼이 같은 역할입니다."],
   ["CAF 기반 분석","1:1 수업 녹음을 복잡성·정확성·유창성으로 나눠 보여 주는 분석 방식을 대화 피드백 숫자에 가볍게 옮겼습니다."],
   ["대화에서 나온 표현을 복습으로","AI 튜터 대화에서 나온 표현을 간격 반복 복습으로 넘기는 구조를 그대로 따릅니다."],
   ["짧은 세션과 연속 기록","5분 세션, 일일 목표, 연속 기록처럼 매일 돌아오게 만드는 장치는 대부분의 인기 앱이 공통으로 씁니다."]
  ].forEach(([t,b]) => RE.append(h("article",{}, h("h3",{}, t), h("p",{class:"use"}, b))));
  app.append(RE);
}
