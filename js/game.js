/* 재잘 · XP, streak, cherries, missions, badges, shop, game widgets. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- XP, streak ---------- */
const boostOn = () => (S.boostUntil||0) > Date.now();
function addXP(n){
  if (boostOn()) n *= 2;   /* bought 2x XP boost */
  const k = dayKey(); const wasAngry = !(S.hist[k] > 0) && angerMood(); applyFreezes();
  if (wasAngry) S.pending = [...(S.pending||[]), {kind:"calm"}]; S.xp += n; S.hist[k] = (S.hist[k]||0) + n;
  if (S.lastDay !== k) { const y = dayKey(new Date(Date.now()-DAY)); S.streak = (S.lastDay===y) ? S.streak+1 : 1; S.lastDay = k;
    S.bestStreak = Math.max(S.bestStreak||0, S.streak); milestoneCheck();
    const hr = new Date().getHours(); if (hr < 7) S.earlyBird = true; if (hr >= 23) S.nightOwl = true; }
  if (S.hist[k] >= goal()) track("goal_met", 1, "max");
  save(); checkBadges(); return n;
}
function streakNow(){ const k=dayKey(), y=dayKey(new Date(Date.now()-DAY)); return (S.lastDay===k||S.lastDay===y) ? S.streak : 0; }

/* ---------- GAME: cherries, daily missions, chest, streak freeze, milestones, badges (all offline) ---------- */
const parseDay = k => { const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); };
const daysBetween = (a, b) => Math.round((parseDay(b) - parseDay(a)) / DAY);
function earn(reason, n){ S.cherries = (S.cherries||0) + n; S.ledger = [{t:Date.now(), r:reason, n}, ...(S.ledger||[])].slice(0,30);
  if (session && !session.done) session.cherries = (session.cherries||0) + n; save(); }
function spend(reason, n){ if ((S.cherries||0) < n) return false; S.cherries -= n; S.ledger = [{t:Date.now(), r:reason, n:-n}, ...(S.ledger||[])].slice(0,30); save(); return true; }
/* a missed day is covered by a freeze when the app opens: the streak stays and the learner is told so */
function applyFreezes(){
  if (!S.lastDay) return; const today = dayKey(); const gap = daysBetween(S.lastDay, today); if (gap <= 1) return;
  const missed = gap - 1;
  if ((S.freezes||0) >= missed) {
    for (let i = 1; i <= missed; i++) S.freezeDays = [...(S.freezeDays||[]), dayKey(new Date(parseDay(S.lastDay).getTime() + i*DAY + 3600000))];
    S.freezes -= missed; S.lastDay = dayKey(new Date(Date.now()-DAY)); S.freezeNotice = {days:missed, streak:S.streak, day:today}; save();
  }
}
/* 앵두 gets crosser the longer the learner stays away (days since the last study day); one session calms it */
function daysAway(){ const ks = Object.keys(S.hist||{}).filter(k => S.hist[k] > 0).sort(); const last = ks[ks.length-1]; return last ? daysBetween(last, dayKey()) : 0; }
function angerMood(d = daysAway()){ return d >= 5 ? "fury" : d >= 3 ? "angry" : d >= 2 ? "pout" : null; }
function angerLine(d){ const m = angerMood(d);
  return m === "fury" ? {b:"완전 화났어!!", t:`${d}일이나 안 오다니! 지금 5분 하면 용서해 줄게.`} : m === "angry" ? {b:"나 화났어!", t:`${d}일째 기다렸어. 5분만 하면 화 풀어 줄게.`} : m === "pout" ? {b:"흥…", t:"이틀이나 안 왔잖아. 오늘은 같이 할 거지?"} : null; }
const MILESTONES = {3:5, 7:10, 14:15, 30:30, 50:40, 66:50, 100:80, 200:120, 365:200};
function milestoneCheck(){ const n = S.streak, r = MILESTONES[n]; if (!r) return;
  earn(`${n}일 연속 기록`, r); S.pending = [...(S.pending||[]), {kind:"streak", n, r}]; }

/* daily missions: three per day, chosen from the date so they are stable; counts scale with the daily goal */
const MISSION_POOL = [
  {id:"session", ev:"session_done", n:1, t:"오늘의 5분 1번 끝내기"},
  {id:"new", ev:"new_learned", n:4, t:"새 표현 {n}개 익히기"},
  {id:"review", ev:"review", n:6, t:"복습 {n}개 하기"},
  {id:"produce", ev:"produce", n:5, t:"영어로 직접 답하기 {n}번"},
  {id:"combo", ev:"combo_max", n:5, t:"콤보 {n} 달성", max:true},
  {id:"words", ev:"word_review", n:3, t:"단어장 단어 {n}개 복습", need:()=>Object.keys(S.words||{}).length >= 3},
  {id:"talk", ev:"talk_mission", n:1, t:"AI 상황극 미션 {n}개", need:()=>(S.talks||0) > 0},
  {id:"repair", ev:"self_repair", n:1, t:"AI 대화에서 스스로 고치기 {n}번", need:()=>(S.talks||0) > 1},
  {id:"acc", ev:"acc90", n:1, t:"정확도 90% 이상으로 세션 끝내기"},
  {id:"shadow", ev:"shadow", n:2, t:"따라 말하기 {n}번"},
  {id:"goal", ev:"goal_met", n:1, t:"하루 목표 채우기", max:true},
  {id:"save", ev:"word_saved", n:2, t:"놓친 단어 {n}개 담기"},
  {id:"listen", ev:"listen", n:3, t:"듣고 뜻 고르기 {n}번"}
];
function seeded(str){ let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; }
function ensureDaily(){
  const k = dayKey(); if (S.daily && S.daily.day === k) return S.daily;
  const rnd = seeded("jaejal-" + k); const scale = goal() <= 10 ? .6 : goal() >= 100 ? 1.5 : 1;
  const pool = MISSION_POOL.filter(m => !m.need || m.need()); const pick = [];
  pick.push(pool.find(m=>m.id==="session"));
  const rest = pool.filter(m=>m.id!=="session");
  while (pick.length < 3 && rest.length) pick.push(rest.splice(Math.floor(rnd()*rest.length), 1)[0]);
  S.daily = {day:k, missions: pick.map(m => ({id:m.id, ev:m.ev, n: Math.max(1, Math.round(m.n*(m.n>1?scale:1))), t:m.t, max:!!m.max})), counts:{}, done:[], chest:false};
  return S.daily;
}
function missionLabel(m){ return m.t.replace("{n}", m.n); }
function track(ev, n=1, mode){
  const d = ensureDaily(); d.counts[ev] = mode === "max" ? Math.max(d.counts[ev]||0, n) : (d.counts[ev]||0) + n;
  d.missions.forEach(m => { if (m.ev === ev && !d.done.includes(m.id) && (d.counts[ev]||0) >= m.n) {
    d.done.push(m.id); earn("미션: "+missionLabel(m), 5); toast(`미션 완료! ${missionLabel(m)} · 체리 +5`); sfx("combo"); haptic(20);
    if (session && !session.done) session.missions = [...(session.missions||[]), m.id]; } });
  save();
}
const CHEST = [10, 20];
function openChest(){
  const d = ensureDaily(); if (d.done.length < d.missions.length || d.chest) return;
  const n = CHEST[0] + Math.floor(Math.random()*(CHEST[1]-CHEST[0]+1)); d.chest = true; earn("미션 상자", n);
  openSheet("미션 상자", inner => { const m = mascot(120, "happy"); inner.append(h("section",{class:"celebrate"}, m, h("h1",{class:"big"}, "+"+n), h("p",{class:"muted"}, `체리 ${n}개를 받았어! 상자에는 항상 체리 ${CHEST[0]}~${CHEST[1]}개가 들어 있어.`), h("button",{class:"primary",onclick:()=>{ closeSheet(); route(); }},"좋아!"))); });
  confetti(); sfx("fanfare"); haptic([20,60,20]);
}

/* badges: long-term goals with visible progress (locked ones show how close you are) */
function knownChunks(){ return Object.keys(S.cards).filter(id=>!id.startsWith("w:") && mastery(id)>=3).length; }
let curricCache = null; /* set while checkBadges runs so the four graduation badges share one curriculum build */
function gradDone(L){ try { const us = (curricCache || buildCurriculum()).units.filter(u=>u.lvl===L); return us.length && us.every(u=>u.complete); } catch(e) { return false; } }
const BADGES = [
  {id:"first", t:"첫걸음", d:"첫 세션 끝내기", p:()=>[S.sessions,1], r:5},
  {id:"s7", t:"일주일 불꽃", d:"7일 연속 학습", p:()=>[S.bestStreak||0,7], r:10},
  {id:"s30", t:"한 달 불꽃", d:"30일 연속 학습", p:()=>[S.bestStreak||0,30], r:30},
  {id:"s66", t:"습관 완성", d:"66일 연속 (습관이 자리 잡는 평균 기간)", p:()=>[S.bestStreak||0,66], r:50},
  {id:"s100", t:"백일 앵두", d:"100일 연속 학습", p:()=>[S.bestStreak||0,100], r:80},
  {id:"c50", t:"입이 트였다", d:"표현 50개 입에 붙이기", p:()=>[knownChunks(),50], r:20},
  {id:"c150", t:"수다쟁이", d:"표현 150개 입에 붙이기", p:()=>[knownChunks(),150], r:50},
  {id:"w30", t:"단어 수집가", d:"단어장 30개", p:()=>[Object.keys(S.words||{}).length,30], r:15},
  {id:"w100", t:"단어 부자", d:"단어장 100개", p:()=>[Object.keys(S.words||{}).length,100], r:40},
  {id:"wm50", t:"단어 장인", d:"단어 50개 외우기", p:()=>[Object.keys(S.words||{}).filter(w=>mastery("w:"+w)>=3).length,50], r:40},
  {id:"talk5", t:"상황극 배우", d:"상황극 미션 모두 달성 5번", p:()=>[S.fullTalks||0,5], r:30},
  {id:"fix10", t:"스스로 고치는 힘", d:"AI 대화에서 스스로 고치기 10번", p:()=>[S.selfRepairs||0,10], r:25},
  {id:"gA1", t:"A1 졸업", d:"A1 단원 모두 완료", p:()=>[gradDone("A1")?1:0,1], r:30},
  {id:"gA2", t:"A2 졸업", d:"A2 단원 모두 완료", p:()=>[gradDone("A2")?1:0,1], r:40},
  {id:"gB1", t:"B1 졸업", d:"B1 단원 모두 완료", p:()=>[gradDone("B1")?1:0,1], r:50},
  {id:"gB2", t:"B2 졸업", d:"B2 단원 모두 완료", p:()=>[gradDone("B2")?1:0,1], r:80},
  {id:"early", t:"일찍 일어난 새", d:"오전 7시 전에 공부하기", p:()=>[S.earlyBird?1:0,1], r:10},
  {id:"owl", t:"올빼미", d:"밤 11시 이후에 공부하기", p:()=>[S.nightOwl?1:0,1], r:10},
  {id:"perfect", t:"완벽주의자", d:"정확도 100%로 세션 끝내기", p:()=>[S.perfectSessions||0,1], r:15}
];
let badgeBusy = false;
function checkBadges(){
  if (badgeBusy) return []; badgeBusy = true; const got = [];
  try { curricCache = BADGES.some(b => b.id[0]==="g" && !S.badges[b.id]) ? buildCurriculum() : null; BADGES.forEach(b => { if (S.badges[b.id]) return; const [cur, need] = b.p(); if (cur >= need) { S.badges[b.id] = dayKey(); got.push(b); earn("배지: "+b.t, b.r);
    S.pending = [...(S.pending||[]), {kind:"badge", id:b.id}]; if (session && !session.done) session.badges = [...(session.badges||[]), b.id]; } }); }
  finally { badgeBusy = false; curricCache = null; }
  if (got.length) save(); return got;
}
const BADGE_SVG = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="22" r="16" fill="currentColor"/><path d="M15 35l-4 10 7-3 4 6 3-11M33 35l4 10-7-3-4 6-3-11" fill="currentColor" opacity=".7"/><path d="M24 12l3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6-6.3 3.6 1.5-7L14 19.3l7-.8z" fill="#fff"/></svg>';
/* ---------- SHOP: 앵두 outfits (SVG layers in the mascot's .acc slot) + streak freeze + 2x XP ---------- */
const CHERRY = '<svg class="cherry-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-1 5-4 8-6 10M12 3c1 4 3 7 6 9M12 3c3-1 6 0 7 2-3 1-5 0-7-2z" stroke="#2D8A4E" stroke-width="1.8" fill="#4CB36B" stroke-linecap="round"/><circle cx="6.5" cy="16" r="4.5" fill="#E0343F"/><circle cx="17.5" cy="15.5" r="4.5" fill="#E0343F"/><circle cx="5" cy="14.5" r="1.3" fill="#fff" opacity=".7"/><circle cx="16" cy="14" r="1.3" fill="#fff" opacity=".7"/></svg>';
const ICE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" stroke="#3E95D8" stroke-width="2.2" stroke-linecap="round"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2" stroke="#3E95D8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
const BOLT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="#FFB020" stroke="#C98200" stroke-width="1.4" stroke-linejoin="round"/></svg>';
const CHEST_SVG = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="20" width="36" height="22" rx="4" fill="#C9772E"/><path d="M6 22q0-12 18-12t18 12z" fill="#E08E3F"/><rect x="6" y="20" width="36" height="4" fill="#A35D20"/><rect x="20" y="20" width="8" height="10" rx="2" fill="#FFD45C"/><circle cx="24" cy="25" r="1.6" fill="#7A4513"/></svg>';
const ACC = [
  {id:"straw", slot:"hat", t:"밀짚모자", price:40, svg:'<ellipse cx="50" cy="31" rx="27" ry="6" fill="#E8C077"/><path d="M36 31q1-14 14-14t14 14z" fill="#F1D08E"/><path d="M36.6 27.5h26.8" stroke="#FF7A6B" stroke-width="3.2"/>'},
  {id:"beanie", slot:"hat", t:"털모자", price:50, svg:'<path d="M27 38q2-23 23-23t23 23z" fill="#79C2FF"/><rect x="26" y="33" width="48" height="8" rx="4" fill="#4A9BE0"/><circle cx="50" cy="14" r="5.5" fill="#fff"/>'},
  {id:"crown", slot:"hat", t:"왕관", price:0, badge:"s100", svg:'<path d="M34 35l-2-17 9 8 9-12 9 12 9-8-2 17z" fill="#FFC21A" stroke="#E3A100" stroke-width="1.5" stroke-linejoin="round"/><circle cx="50" cy="29" r="2.8" fill="#FF7A6B"/>'},
  {id:"grad", slot:"hat", t:"졸업모", price:0, badge:"grad", svg:'<path d="M36 26v8q14 6 28 0v-8l-14 5z" fill="#2F3B36"/><path d="M50 14l28 9-28 9-28-9z" fill="#1F2A26"/><path d="M76 23v12" stroke="#FFD45C" stroke-width="2"/><circle cx="76" cy="36" r="2.6" fill="#FFD45C"/>'},
  {id:"glasses", slot:"eyes", t:"동그란 안경", price:30, svg:'<g fill="none" stroke="#5B3A1E" stroke-width="2.2"><circle cx="39" cy="53" r="9.5"/><circle cx="61" cy="53" r="9.5"/><path d="M48.5 52q1.5-2 3 0M29.5 51l-6-2M70.5 51l6-2"/></g>'},
  {id:"shades", slot:"eyes", t:"선글라스", price:45, svg:'<path d="M27 47h20q1 12-10 12t-10-12zM53 47h20q0 12-10 12t-10-12z" fill="#1F2A26"/><path d="M47 49h6M27 47l-5-1M73 47l5-1" stroke="#1F2A26" stroke-width="2.4"/><path d="M31 50l5-1M57 50l5-1" stroke="#fff" stroke-width="1.6" opacity=".55"/>'},
  {id:"ribbon", slot:"extra", t:"리본", price:25, svg:'<path d="M66 33l-10-6v12zM66 33l10-6v12z" fill="#FF7AB8"/><circle cx="66" cy="33" r="3" fill="#E0559A"/>'},
  {id:"flower", slot:"extra", t:"꽃 핀", price:25, svg:'<g transform="translate(33 36)"><circle cy="-5" r="4" fill="#fff"/><circle cx="4.8" cy="-1.5" r="4" fill="#fff"/><circle cx="3" cy="4" r="4" fill="#fff"/><circle cx="-3" cy="4" r="4" fill="#fff"/><circle cx="-4.8" cy="-1.5" r="4" fill="#fff"/><circle r="3" fill="#FFC21A"/></g>'},
  {id:"phones", slot:"extra", t:"헤드폰", price:60, svg:'<path d="M23 55q0-33 27-33t27 33" fill="none" stroke="#3A4744" stroke-width="4"/><rect x="16" y="47" width="11" height="17" rx="5.5" fill="#FF7A6B"/><rect x="73" y="47" width="11" height="17" rx="5.5" fill="#FF7A6B"/>'},
  {id:"cherries", slot:"extra", t:"앵두 귀걸이", price:20, svg:'<g stroke="#2D8A4E" stroke-width="1.4" fill="none"><path d="M23 62q-1 6-4 11M23 62q2 6 3 12M77 62q-2 6-3 12M77 62q1 6 4 11"/></g><g fill="#E0343F"><circle cx="19" cy="75" r="3.3"/><circle cx="26" cy="76" r="3.3"/><circle cx="74" cy="76" r="3.3"/><circle cx="81" cy="75" r="3.3"/></g>'},
  {id:"scarf", slot:"neck", t:"목도리", price:35, svg:'<path d="M23 74q27 10 54 0l1 7q-28 11-56 0z" fill="#FF7A6B"/><path d="M61 80l5 13-7-1-1-11z" fill="#DB5B4D"/>'},
  {id:"bowtie", slot:"neck", t:"나비넥타이", price:30, svg:'<path d="M50 80l-10-6v12zM50 80l10-6v12z" fill="#4A9BE0"/><circle cx="50" cy="80" r="3" fill="#2F78B8"/>'}
];
const SLOT_KO = {hat:"모자", eyes:"안경", extra:"장식", neck:"목"};
const FREEZE_PRICE = 30, FREEZE_MAX = 2, BOOST_PRICE = 40, BOOST_MIN = 15;
function accUnlocked(a){ if (!a.badge) return true; if (a.badge === "grad") return ["gA1","gA2","gB1","gB2"].some(b=>S.badges[b]); return !!S.badges[a.badge]; }
function openShop(){
  let preview = {...S.outfit};
  openSheet("앵두 꾸미기", inner => {
    const draw = () => {
      inner.replaceChildren();
      inner.append(h("div",{class:"shop-prev"}, mascot(120, "happy", preview), h("p",{class:"tchip",style:"min-height:0"}, h("span",{html:CHERRY}), String(S.cherries||0)),
        h("p",{class:"ctx",style:"text-align:center"}, "체리는 미션·상자·연속 기록·배지로 모아요. 눌러서 입혀 보고 마음에 들면 사요.")));
      Object.keys(SLOT_KO).forEach(slot => {
        const grid = h("div",{class:"shop"});
        ACC.filter(a=>a.slot===slot).forEach(a => { const own = S.owned.includes(a.id) || (a.badge && accUnlocked(a)), worn = S.outfit[slot] === a.id, open = accUnlocked(a);
          const label = worn ? "착용 중" : own ? "갖고 있음" : !open ? (a.badge==="s100" ? "100일 연속 배지" : "레벨 졸업 배지") : a.price;
          grid.append(h("button",{class:"press"+(worn?" worn":"")+(!open?" lock":""),type:"button","aria-pressed":String(preview[slot]===a.id),"data-acc":a.id,onclick:()=>{ sfx("tap"); preview = {...preview, [slot]: preview[slot]===a.id ? null : a.id}; draw(); }},
            mascot(64, "idle", {[slot]:a.id}), h("b",{}, a.t), h("span",{class:"pr"+(typeof label === "number" ? "" : " txt"),html: typeof label === "number" ? CHERRY+" "+label : ""}, typeof label === "number" ? "" : label))); });
        inner.append(h("h3",{class:"sec-h"}, SLOT_KO[slot]), grid);
      });
      /* action for the item being previewed */
      const changed = Object.keys(SLOT_KO).filter(sl => (preview[sl]||null) !== (S.outfit[sl]||null));
      const act = h("div",{class:"row",style:"position:sticky;bottom:0;background:var(--surface);padding:8px 0"});
      if (changed.length) {
        const need = changed.map(sl=>ACC.find(a=>a.id===preview[sl])).filter(a=>a && !S.owned.includes(a.id) && !(a.badge && accUnlocked(a)));
        const locked = need.filter(a=>!accUnlocked(a)); const cost = need.reduce((t,a)=>t+a.price,0);
        const btn = h("button",{class:"primary",type:"button","data-act":"apply"}, locked.length ? "배지를 얻으면 열려요" : cost ? `체리 ${cost}개로 사서 입히기` : "이대로 입히기");
        btn.disabled = !!locked.length || cost > (S.cherries||0);
        if (!locked.length && cost > (S.cherries||0)) btn.textContent = `체리 ${cost - (S.cherries||0)}개 더 모으면 살 수 있어`;
        btn.onclick = () => { if (cost && !spend("앵두 꾸미기: "+need.map(a=>a.t).join(", "), cost)) return;
          need.forEach(a=>S.owned.push(a.id)); changed.forEach(sl=>{ S.outfit[sl] = preview[sl] || null; }); save(); sfx("fanfare"); haptic(20); toast(cost ? "새 옷이 생겼어! 고마워" : "옷을 갈아입었어"); draw(); };
        act.append(btn, h("button",{class:"ghost",type:"button",onclick:()=>{ preview = {...S.outfit}; draw(); }},"되돌리기"));
        inner.append(act);
      }
      /* consumables */
      const fz = h("button",{class:"press",type:"button","data-buy":"freeze",style:"display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:12px 14px;text-align:left;width:100%"},
        h("span",{style:"width:36px;height:36px",html:ICE}), h("span",{}, h("b",{},"연속 기록 보호권"), h("br"), h("small",{class:"ctx"}, `하루 빠져도 연속 기록을 지켜 줘요. ${S.freezes||0}/${FREEZE_MAX}개 보유`)), h("span",{class:"mono",html:CHERRY+" "+FREEZE_PRICE}));
      fz.disabled = (S.freezes||0) >= FREEZE_MAX || (S.cherries||0) < FREEZE_PRICE;
      fz.onclick = () => { if (!spend("연속 기록 보호권", FREEZE_PRICE)) return; S.freezes = (S.freezes||0)+1; save(); sfx("ding"); toast("보호권을 챙겼어!"); draw(); };
      const left = Math.max(0, Math.ceil(((S.boostUntil||0) - Date.now())/60000));
      const bo = h("button",{class:"press",type:"button","data-buy":"boost",style:"display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:12px 14px;text-align:left;width:100%"},
        h("span",{style:"width:36px;height:36px",html:BOLT}), h("span",{}, h("b",{},`2배 XP ${BOOST_MIN}분`), h("br"), h("small",{class:"ctx"}, left ? `지금 켜져 있어요 · ${left}분 남음` : "사는 순간부터 15분 동안 XP가 두 배")), h("span",{class:"mono",html:CHERRY+" "+BOOST_PRICE}));
      bo.disabled = (S.cherries||0) < BOOST_PRICE;
      bo.onclick = () => { if (!spend("2배 XP", BOOST_PRICE)) return; S.boostUntil = Math.max(Date.now(), S.boostUntil||0) + BOOST_MIN*60000; save(); sfx("combo"); toast("15분 동안 XP 두 배! 바로 5분 하러 가자"); draw(); };
      inner.append(h("h3",{class:"sec-h"},"아이템"), fz, bo);
      if ((S.ledger||[]).length) inner.append(h("h3",{class:"sec-h"},"최근 체리 기록"), h("div",{class:"ledger"}, ...S.ledger.slice(0,6).map(x=>h("div",{}, h("span",{}, x.r), h("span",{class:x.n>0?"plus":"minus"}, (x.n>0?"+":"")+x.n)))));
    };
    draw();
  });
}

/* ---------- small game widgets ---------- */
function missionsCard(compact){
  const d = ensureDaily(); const box = h("section",{class:"card-s",id:"missions"});
  box.append(h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"},"오늘의 미션"), h("span",{class:"chip"+(d.done.length===d.missions.length?" ok":"")}, `${d.done.length}/${d.missions.length}`)));
  d.missions.forEach(m => { const cur = Math.min(m.n, d.counts[m.ev]||0), ok = d.done.includes(m.id);
    box.append(h("div",{class:"mrow"+(ok?" done":""),"data-m":m.id}, h("span",{class:"ck","aria-hidden":"true"}, ok?"✓":""), h("span",{class:"mt"}, missionLabel(m)), h("span",{class:"mv"}, `${cur}/${m.n}`),
      h("span",{class:"bar"}, h("i",{style:`width:${cur/m.n*100}%`})))); });
  const all = d.done.length === d.missions.length;
  const chest = h("button",{class:"chest"+(all && !d.chest ? " ready" : ""),type:"button",html:CHEST_SVG,"data-chest":"1"});
  chest.append(h("span",{}, d.chest ? "오늘 상자는 열었어. 내일 새 미션이 와!" : all ? h("b",{},"상자 열기! 체리 10~20개") : `미션 ${d.missions.length-d.done.length}개를 더 하면 상자가 열려 · 미션마다 체리 +5`));
  chest.disabled = !all || d.chest; chest.onclick = openChest;
  box.append(chest);
  return box;
}
function weekRace(){
  const now = new Date(); const base = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12); const dow = (now.getDay()+6)%7; let tw = 0, lw = 0;
  for (let i = 0; i <= dow; i++) { tw += S.hist[dayKey(new Date(base - (dow-i)*DAY))]||0; lw += S.hist[dayKey(new Date(base - (dow-i+7)*DAY))]||0; }
  return {tw, lw, dow};
}
function raceCard(){
  const {tw, lw} = weekRace(); const mx = Math.max(tw, lw, 1);
  const msg = !tw && !lw ? "이번 주 첫 XP를 쌓아 보자. 다음 주엔 오늘의 내가 경쟁 상대야!" : tw >= lw ? `지난주의 나보다 +${tw-lw} XP 앞서고 있어!` : `${lw-tw} XP만 더 하면 지난주의 나를 따라잡아!`;
  return h("section",{class:"card-s race",id:"race"}, h("h2",{class:"sec-h"},"지난주의 나와 대결"), h("p",{class:"ctx",style:"margin-top:-6px"},"월요일부터 오늘 요일까지 비교해요"),
    h("div",{class:"hbar me"}, h("span",{},"이번 주"), h("span",{class:"t"}, h("i",{style:`width:${tw/mx*100}%`})), h("span",{class:"v","data-tw":tw}, tw+" XP")),
    h("div",{class:"hbar past"}, h("span",{},"지난주"), h("span",{class:"t"}, h("i",{style:`width:${lw/mx*100}%`})), h("span",{class:"v","data-lw":lw}, lw+" XP")),
    h("p",{style:"font-weight:700"}, msg));
}
function calendarEl(){
  const now = new Date(), y = now.getFullYear(), mo = now.getMonth(); const first = new Date(y, mo, 1), days = new Date(y, mo+1, 0).getDate(); const today = dayKey();
  const cal = h("div",{class:"cal",role:"grid","aria-label":`${mo+1}월 학습 달력`}, ...["월","화","수","목","금","토","일"].map(w=>h("span",{class:"wd"}, w)));
  for (let i = 0; i < (first.getDay()+6)%7; i++) cal.append(h("span",{}));
  for (let d = 1; d <= days; d++) { const k = dayKey(new Date(y, mo, d)); const on = (S.hist[k]||0) > 0, ice = (S.freezeDays||[]).includes(k);
    cal.append(h("span",{class:"d"+(on?" on":ice?" ice":"")+(k===today?" today":"")+(k>today?" fut":""),"aria-label":`${d}일 ${on?"학습함":ice?"보호권 사용":""}`}, String(d))); }
  const studied = Object.keys(S.hist).filter(k=>k.startsWith(today.slice(0,7)) && S.hist[k]>0).length;
  return h("div",{style:"display:flex;flex-direction:column;gap:10px"}, h("p",{class:"ctx"}, `${mo+1}월 · ${studied}일 공부함 · 최고 연속 ${S.bestStreak||0}일 · 보호권 ${S.freezes||0}개`), cal,
    h("div",{class:"legend"}, h("span",{}, h("i",{style:"background:var(--butter)"}), "공부한 날"), h("span",{}, h("i",{style:"background:var(--sky)"}), "보호권이 지킨 날")));
}
function openCalendar(){
  openSheet("연속 기록", inner => { const st = streakNow(); const next = Object.keys(MILESTONES).map(Number).find(n=>n>st);
    inner.append(h("p",{class:"streakline",html:FLAME.replace("<svg",'<svg width="22" height="22" style="vertical-align:-4px"')}, " ", h("b",{}, st+"일"), " 연속 학습 중"),
      next ? h("p",{class:"ctx"}, `${next-st}일 더 하면 ${next}일 기록 · 체리 +${MILESTONES[next]}`) : "", calendarEl(),
      h("div",{class:"row"}, h("button",{class:"ghost",type:"button",onclick:()=>{ closeSheet(); openShop(); }}, `보호권 사러 가기 (${S.freezes||0}/${FREEZE_MAX})`), h("button",{class:"ghost",type:"button","data-act":"share-card",onclick:shareCard},"기록 카드 공유"))); });
}
function badgeGrid(limit){
  const g = h("div",{class:"badges"});
  /* earned first, then the closest ones: a short list keeps the next goal in view */
  const ratio = b => { if (S.badges[b.id]) return 2; const [c, n] = b.p(); return Math.min(1, c/n); };
  const list = limit ? [...BADGES].sort((a,b)=>ratio(b)-ratio(a)).slice(0, limit) : BADGES;
  list.forEach(b => { const got = !!S.badges[b.id]; const [cur, need] = b.p();
    g.append(h("button",{class:"badge",type:"button","data-badge":b.id,"aria-label":`${b.t} ${got?"획득":"잠김"}`,onclick:()=>openSheet(b.t, inner=>inner.append(h("section",{class:"celebrate"}, h("span",{class:"badge-ic big"+(got?" on":""),html:BADGE_SVG}), h("p",{}, b.d), h("p",{class:"ctx"}, got ? `${S.badges[b.id]} 획득 · 체리 +${b.r}` : `지금 ${Math.min(cur,need)}/${need} · 얻으면 체리 +${b.r}`))))},
      h("span",{class:"badge-ic"+(got?" on":""),html:BADGE_SVG}), h("b",{}, b.t), got ? h("span",{class:"bs"},"획득!") : h("span",{class:"bp"}, h("i",{style:`width:${Math.min(1,cur/need)*100}%`})))); });
  return g;
}
const STUDY_TIMES = {"":"정하지 않음", morning:"아침", lunch:"점심", commute:"퇴근길", night:"자기 전"};
const STUDY_WIN = {morning:[6,10], lunch:[11,14], commute:[17,20], night:[21,24]};
function studyTimeNow(){ const k = S.settings.studyTime, w = STUDY_WIN[k]; if (!w) return null; const hr = new Date().getHours(); return hr >= w[0] && hr < w[1] ? STUDY_TIMES[k] : null; }
/* in-app nudges only (no push): the mascot's bubble picks the most useful line */
function homeMessage(today, g, due, newLeft){
  const hr = new Date().getHours(), st = streakNow(), k = dayKey(), d = ensureDaily(), left = d.missions.length - d.done.length, studied = S.lastDay === k;
  if (!studied && st > 0 && hr >= 20) return S.freezes ? {b:"오늘 아직이야!", t:`오늘 못 해도 보호권이 ${st}일 기록을 지켜 줄 거야. 그래도 5분이면 충분해!`, mood:"think", risk:true}
    : {b:"기록이 위험해!", t:`오늘 안 하면 ${st}일 연속 기록이 끊겨! 5분만 하자.`, mood:"oops", risk:true};
  if (S.freezeNotice && S.freezeNotice.day === k) return {b:"기록을 지켰어!", t:`못 한 날이 ${S.freezeNotice.days}일 있었지만 보호권이 ${S.freezeNotice.streak}일 기록을 지켰어.`, mood:"happy"};
  const stn = studyTimeNow(); if (stn && !studied) return {b:"약속한 시간이야!", t:`${stn}에 하기로 했지? 5분만 같이 하자!`, mood:"happy"};
  if (left === 0 && !d.chest) return {b:"상자가 열렸어!", t:"오늘 미션을 다 했어. 아래 상자를 열어 봐!", mood:"happy"};
  if (left === 1 && studied) return {b:"거의 다 왔어!", t:"미션 1개만 더 하면 체리 상자야!", mood:"idle"};
  const next = Object.keys(MILESTONES).map(Number).find(n=>n>st);
  if (st > 0 && next && next - st <= 3 && !studied) return {b:"곧 기록이야!", t:`${next-st}일만 더 하면 ${next}일 연속! 체리 ${MILESTONES[next]}개가 기다려.`, mood:"happy"};
  return null;
}
function updateTabBadges(){
  const set = (tab, val, dot) => { const a = document.querySelector(`nav.tabs a[data-tab="${tab}"]`); if (!a) return; a.querySelectorAll(".tbadge").forEach(x=>x.remove());
    if (val) a.append(h("span",{class:"tbadge"+(dot?" dot":""),"aria-label":dot?"새 소식":`복습 ${val}개`}, dot ? "" : String(Math.min(99,val)))); };
  if (!S.onboarded) return;
  set("course", dueList().length);
  const d = S.daily && S.daily.day === dayKey() ? S.daily : null;
  set("me", Object.keys(S.badges||{}).some(b=>!(S.badgesSeen||[]).includes(b)) ? 1 : 0, true);
  set("home", d && d.done.length === d.missions.length && !d.chest ? 1 : 0, true);
}
function welcomeBack(days){
  const mood = angerMood() || "happy";
  openSheet("다시 왔구나!", inner => inner.append(h("section",{class:"celebrate"}, mascot(120, mood), h("h1",{class:"title"}, mood === "happy" ? `${days}일 만이야, 반가워!` : `${days}일 만이야! 기다렸잖아!`),
    h("p",{class:"muted"}, mood === "happy" ? "쉬어도 괜찮아. 배운 건 사라지지 않았어. 가볍게 3분만 해서 다시 시동 걸어 볼까?" : "기다리다 화났어! 그래도 와 줘서 반가워. 3분만 같이 하면 화 풀어 줄게."),
    h("button",{class:"primary",onclick:()=>{ lightNext = true; closeSheet(); location.hash = "#learn"; }},"가볍게 3분 시작"),
    h("button",{class:"ghost",onclick:closeSheet},"둘러볼게"))));
}
let lightNext = false;

/* one celebration at a time, shown on the next calm screen */
function flushCelebration(){
  const q = S.pending || []; if (!q.length || document.querySelector(".sheet")) return;
  const c = q.shift(); S.pending = q; save();
  if (c.kind === "welcome") { welcomeBack(c.days); return; }
  if (c.kind === "calm") { openSheet("화 풀렸어!", inner => inner.append(h("section",{class:"celebrate"}, mascot(120,"happy"), h("h1",{class:"title"},"다시 와 줘서 고마워!"), h("p",{class:"muted"},"이제 화 다 풀렸어. 내일도 오면 더 좋아할 거야."), h("button",{class:"primary",onclick:closeSheet},"약속!")))); sfx("ding"); return; }
  if (c.kind === "streak") openSheet(`${c.n}일 연속!`, inner => inner.append(h("section",{class:"celebrate"}, mascot(120,"happy"), h("h1",{class:"big"}, `${c.n}일`), h("p",{class:"muted"}, `${c.n}일 동안 하루도 빠짐없이 했어! 체리 ${c.r}개를 줄게.`), h("button",{class:"primary",onclick:closeSheet},"계속 가자!"))));
  else if (c.kind === "badge") { const b = BADGES.find(x=>x.id===c.id); if (b) openSheet("새 배지!", inner => inner.append(h("section",{class:"celebrate"}, h("span",{class:"badge-ic big on",html:BADGE_SVG}), h("h1",{class:"title"}, b.t), h("p",{class:"muted"}, `${b.d} · 체리 +${b.r}`), h("button",{class:"primary",onclick:closeSheet},"좋아!")))); }
  confetti(); sfx("fanfare");
}

function dueList(){ const now=Date.now(); return Object.entries(S.cards).filter(([id,c])=>c.due<=now && cardById(id)).sort((a,b)=>a[1].due-b[1].due).map(([id])=>id); }
