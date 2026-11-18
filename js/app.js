/* 재잘 · router, onboarding, settings, curriculum. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- router ---------- */
let session = null, talk = null;
const inSession = () => !!(session && !session.done) || !!(talk && talk.active);
function route(){
  let name = (location.hash||"#home").slice(1);
  if (name === "words") { wordOnlyNext = true; history.replaceState(null, "", "#learn"); name = "learn"; }
  const v = VIEWS[name] ? name : "home";
  closeSheet(); setFocusMode(false); speaker = null; hush();
  const tab = TAB_OF[v] || v;
  document.querySelectorAll("nav.tabs a").forEach(a=>{ if(a.dataset.tab===tab) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  const app = $("#app"); app.replaceChildren();
  if (!S.onboarded && v !== "science" && v !== "placement") { viewOnboarding(app); window.scrollTo(0,0); return; }
  VIEWS[v](app); window.scrollTo(0,0); updateTabBadges(); updateAppBadge();
  if (v === "home" || v === "me" || v === "course") setTimeout(()=>{ if (!inSession()) flushCelebration(); }, 450);
}
window.addEventListener("hashchange", () => { stopDict(); session = null; if (talk) talk.active = false; route(); });
const MASCOT_NAME = "앵두";
const ringSvg = (pct, size=96, stroke=9, color="var(--mint)") => { const r = size/2 - stroke/2 - 1, C = 2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--sunk)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-Math.max(0,Math.min(1,pct)))}"/></svg>`; };
function asker(box, text, mood="idle", size=60){
  const m = mascot(size, mood); speaker = m;
  box.append(h("div",{class:"asker"}, m, h("div",{class:"bubble"}, h("h2",{}, text))));
  box.mascot = m; return m;
}
function actionBar(...kids){ const bar = h("div",{class:"actionbar"}, h("div",{class:"in"}, ...kids)); $("#app").append(bar); return bar; }

/* ---------- ONBOARDING (goal → situations → sound & mic) ---------- */
function viewOnboarding(app){
  setFocusMode(true);
  let step = 0; const picked = new Set(S.settings.interests||[]); let goalPick = S.settings.goal || 50;
  const finishOb = (toPlacement) => { S.onboarded = true; S.settings.goal = goalPick; S.settings.interests = [...picked]; save(); sfx("tap"); location.hash = toPlacement ? "#placement" : "#home"; route(); };
  const draw = () => {
    app.replaceChildren(); speaker = null;
    const skip = h("button",{class:"ghost",type:"button",onclick:()=>finishOb(false)},"건너뛰기");
    if (step === 0 && isStandalone()) app.append(h("button",{class:"ghost",type:"button","data-act":"import-start",style:"align-self:center;margin-bottom:8px",onclick:importBackup}, isIOS() ? "Safari에서 쓰던 기록 가져오기" : "기록 파일 가져오기"));
    app.append(h("div",{class:"top"}, h("div",{class:"ob"}, h("div",{class:"dots-step","aria-label":`${step+1}/3 단계`}, ...[0,1,2].map(i=>h("i",{class:i===step?"on":""})))), skip));
    const ob = h("section",{class:"ob"}); app.append(ob);
    const next = h("button",{class:"primary"}, step < 2 ? "다음" : "실력 진단 시작하기");
    if (step === 0) {
      const m = mascot(120,"happy"); speaker = m;
      ob.append(m, h("h1",{class:"title"}, `안녕, 나는 ${MASCOT_NAME}야!`), h("p",{class:"muted"},"네 말을 따라 하며 영어 말문을 틔워 줄게. 하루에 얼마나 할까?"));
      const pick = h("div",{class:"pick",role:"radiogroup","aria-label":"하루 목표"});
      [[10,"가볍게","하루 1분"],[30,"꾸준히","하루 3분"],[50,"제대로","하루 5분 · 추천"],[100,"불태우기","하루 10분"]].forEach(([g,t,d]) =>
        pick.append(h("button",{class:"press",type:"button",role:"radio","aria-pressed":String(g===goalPick),"aria-checked":String(g===goalPick),onclick:()=>{ goalPick=g; sfx("tap"); draw(); }}, h("span",{}, h("b",{}, t), " ", h("small",{}, d)), h("span",{class:"mono"}, g+" XP"))));
      ob.append(pick);
      const when = h("div",{class:"seg",role:"group","aria-label":"공부할 시간"}, ...Object.keys(STUDY_TIMES).filter(k=>k).map(k=>h("button",{type:"button","aria-pressed":String(S.settings.studyTime===k),onclick:()=>{ S.settings.studyTime = S.settings.studyTime===k ? "" : k; save(); sfx("tap"); draw(); }}, STUDY_TIMES[k])));
      ob.append(h("p",{class:"muted",style:"margin-top:6px"},"보통 언제 할래? 시간을 정해 두면 습관이 훨씬 잘 붙어."), when);
    } else if (step === 1) {
      ob.append(mascot(96,"think"), h("h1",{class:"title"},"어떤 상황에서 영어가 필요해?"), h("p",{class:"muted"},"고른 상황의 표현부터 먼저 보여 줄게. 여러 개 골라도 돼."));
      const pick = h("div",{class:"pick"});
      [...new Set(DECK.map(c=>c.tag))].forEach(t => pick.append(h("button",{class:"press",type:"button","aria-pressed":String(picked.has(t)),onclick:()=>{ picked.has(t)?picked.delete(t):picked.add(t); sfx("tap"); draw(); }}, h("b",{}, t), h("small",{}, DECK.filter(c=>c.tag===t).length+"개 표현"))));
      ob.append(pick);
    } else {
      const m = mascot(110); speaker = m;
      ob.append(m, h("h1",{class:"title"},"소리랑 마이크를 확인해 볼까?"), h("p",{class:"muted"},"내가 먼저 말해 볼게. 들리면 따라 해 봐!"));
      const hear = h("button",{class:"speak",type:"button",html:ICON.spk+"<span>소리 듣기</span>"}); hear.onclick = () => say("Hi! Nice to meet you.", 1, hear, m);
      ob.append(h("div",{class:"row",style:"justify-content:center"}, hear));
      if (caps.dict) {
        const ta = h("textarea",{id:"ob-mic",rows:"1",placeholder:"마이크를 누르고 'Nice to meet you'","data-ph":"마이크를 누르고 'Nice to meet you'","aria-label":"마이크 테스트"});
        ta._onSpoken = () => { if (ta.value.trim()) { setMood(m,"happy"); sfx("ding"); toast("잘 들려! 준비 끝"); } };
        ob.append(h("div",{class:"answer",style:"width:100%"}, micFor(ta), ta));
      } else ob.append(h("p",{class:"ctx"},"이 브라우저는 음성 입력을 지원하지 않아 타이핑으로 진행해요. Android Chrome에서는 말로 답할 수 있어요."));
    }
    next.onclick = () => { sfx("tap"); if (step < 2) { step++; draw(); } else finishOb(true); };
    actionBar(next);
  };
  draw();
}

/* ---------- SETTINGS (bottom sheet) ---------- */
function openSettings(){
  openSheet("설정", inner => {
    const set = (k, v) => { S.settings[k] = v; save(); sfx("tap"); };
    const seg = (label, sub, opts, key, fmt) => { const box = h("div",{class:"seg",role:"group","aria-label":label});
      const draw = () => box.replaceChildren(...opts.map(o => h("button",{type:"button","aria-pressed":String(S.settings[key]===o),onclick:()=>{ set(key,o); draw(); if (key==="rate") say("Nice to meet you.",1); }}, fmt(o))));
      draw(); return h("div",{style:"display:flex;flex-direction:column;gap:8px"}, h("div",{class:"lab"}, h("b",{}, label), sub ? h("small",{class:"ctx"}, sub) : ""), box); };
    const sw = (key, label, sub) => { const id = "set-"+key; const cb = h("input",{type:"checkbox",class:"switch",id,role:"switch"}); cb.checked = !!S.settings[key]; cb.onchange = () => set(key, cb.checked);
      return h("label",{class:"setrow",for:id}, h("span",{class:"lab"}, h("b",{}, label), sub ? h("small",{}, sub) : ""), cb); };
    inner.append(seg("하루 목표", "목표 링이 이만큼 차면 오늘 완료", [10,30,50,100], "goal", o=>o+" XP"));
    inner.append(seg("보통 언제 공부할래?", "그 시간에 앱을 열면 앵두가 알려 줘요 (앱 밖 알림은 없어요)", Object.keys(STUDY_TIMES), "studyTime", o=>STUDY_TIMES[o]));
    inner.append(sw("sound","효과음","정답·오답·축하 소리"));
    if (navigator.vibrate) inner.append(sw("haptic","진동","정답·오답 때 짧게 떨림"));
    if (caps.dict) inner.append(sw("autosubmit","말 끝나면 바로 채점","마이크를 다시 누르지 않아도 돼요"));
    if (caps.dict) inner.append(sw("handsfree","핸즈프리 대화","AI가 말을 마치면 자동으로 듣기 시작 (일부 기기에선 동작하지 않아요)"));
    inner.append(sw("showKo","번역 먼저 보기","AI 대화에서 한국어 번역을 펼쳐 둬요"));
    inner.append(seg("원어민 말하기 속도", "", [0.8,1,1.2], "rate", o=>o===1?"보통":o<1?"천천히":"빠르게"));
    if (hasClips() && "serviceWorker" in navigator && location.protocol.startsWith("http")) {
      const dl = h("button",{class:"ghost",type:"button","data-act":"save-audio"}, S.audioSaved ? "다시 받기" : `받기 (약 ${typeof AUDIO_MB !== "undefined" ? AUDIO_MB : "?"}MB)`);
      dl.onclick = async () => { dl.disabled = true; const r = await saveClipsOffline((n, t) => { dl.textContent = `받는 중 ${Math.round(n/t*100)}%`; });
        S.audioSaved = !r.fail; save(); dl.disabled = false; dl.textContent = r.fail ? `${r.fail}개 실패 · 다시 받기` : "저장 완료"; toast(r.fail ? "인터넷 연결을 확인하고 다시 받아 주세요" : "원어민 음성을 이 기기에 저장했어요"); };
      inner.append(h("div",{class:"setrow"}, h("span",{class:"lab"}, h("b",{},"원어민 음성 오프라인 저장"), h("small",{}, "들은 음성은 자동으로 저장돼요. 비행기 모드에서도 다 들으려면 한 번에 받아 두세요 (와이파이 추천)")), dl)); }
    const exp = h("button",{class:"ghost",type:"button",onclick:exportBackup},"기록 내보내기");
    const imp = h("button",{class:"ghost",type:"button",onclick:importBackup},"기록 가져오기");
    inner.append(h("div",{style:"display:flex;flex-direction:column;gap:8px"}, h("div",{class:"lab"}, h("b",{},"학습 기록 백업"), h("small",{class:"ctx"}, isIOS() ? "기록은 이 기기에만 저장돼요. 아이폰은 Safari와 홈 화면 앱의 기록도 따로라서, 옮길 땐 파일로 내보내고 가져오세요." : "기록은 이 기기에만 저장돼요. 기기를 바꿀 땐 파일로 옮기세요.")), h("div",{class:"row"}, exp, imp)));
    if ("setAppBadge" in navigator) { const cb = h("input",{type:"checkbox",class:"switch",id:"set-badge",role:"switch"}); cb.checked = !!S.settings.badge;
      cb.onchange = async () => { if (cb.checked && "Notification" in window && Notification.permission === "default") { try { await Notification.requestPermission(); } catch(e) {} }
        S.settings.badge = cb.checked; save(); updateAppBadge(); sfx("tap"); };
      inner.append(h("label",{class:"setrow",for:"set-badge"}, h("span",{class:"lab"}, h("b",{},"아이콘에 복습 수 표시"), h("small",{}, isIOS() ? "홈 화면 앱 아이콘에 숫자가 떠요 (알림 권한 필요, 알림은 보내지 않아요)" : "홈 화면 앱 아이콘에 오늘 복습할 개수를 표시해요")), cb)); }
  });
}

/* ---------- CURRICULUM: units = (CEFR level × situation), ordered A1→B2, interests first within a level ---------- */
const LEVELS = ["A1","A2","B1","B2"];
const LEVEL_KO = {A1:"기초", A2:"초급", B1:"중급", B2:"중상급"};
const LEVEL_CAN = {A1:"인사하고 간단히 주문하기", A2:"익숙한 상황에서 짧게 대화하기", B1:"여행·일상 대화를 대부분 해내기", B2:"회의·의견 조율까지 자연스럽게"};
const myLevel = () => LEVELS.includes(S.level) ? S.level : "A1";
function buildCurriculum(){
  const like = S.settings.interests || [];
  const tags = [...new Set(DECK.map(c=>c.tag))].sort((a,b)=> (like.includes(b)-like.includes(a)));
  const units = [];
  LEVELS.forEach(L => tags.forEach(t => { const cards = DECK.filter(c=>c.lvl===L && c.tag===t).map(c=>c.id);
    if (!cards.length) return;
    const scen = SCENARIOS.find(x=>x.tag===t && x.lvl===L) || null;
    const done = cards.filter(id=>mastery(id)>=2).length;
    units.push({id:L+"·"+t, lvl:L, tag:t, cards, scen, done, total:cards.length, complete: done/cards.length >= .8}); }));
  const startIdx = Math.max(0, units.findIndex(u=>u.lvl===myLevel()));
  let cur = units.findIndex((u,i)=>i>=startIdx && !u.complete); if (cur < 0) cur = units.length-1;
  units.forEach((u,i)=>{ u.status = u.complete ? "done" : i===cur ? "now" : i<startIdx ? "skipped" : i<cur ? "open" : "next"; });
  return {units, cur, startIdx};
}
function currentUnit(){ const c = buildCurriculum(); return c.units[c.cur]; }
