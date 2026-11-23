/* 재잘 · 앵두의 여행: learning moves 앵두's balloon (then submarine, then rocket) one meter per correct answer.
   Landmarks give idiom postcards, every 25 m a small surprise, a long break lets some air out, the top ends the season.
   Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
function climbState(){
  if (!S.climb) S.climb = {m:0, season:0, posts:[], log:{}, lastDay:null, wind:0, hall:[], ev:[], photos:0};
  return S.climb;
}
const climbSeason = (n) => CLIMB_SEASONS[((n ?? climbState().season) || 0) % CLIMB_SEASONS.length];
const postId = (season, m) => `${CLIMB_SEASONS[season % CLIMB_SEASONS.length].id}:${m}`;
/* a longer streak climbs faster: +10% for every 7 days, up to +50% */
function climbMult(){ return 1 + Math.min(.5, Math.floor(streakNow() / 7) * .1); }
function lastMark(m){ let best = null; climbSeason().marks.forEach(mk => { if (mk.m <= m) best = mk; }); return best; }
function nextMark(m){ return climbSeason().marks.find(mk => mk.m > m) || null; }
function fmtM(m, season){ const s = climbSeason(season); const v = Math.floor(m); return (s.up ? "" : "수심 ") + v.toLocaleString() + s.unit; }

/* the one entry point: n meters of learning (before bonuses). Returns the meters actually gained. */
function climb(n){
  const C = climbState(); if (C.summit || !n) return 0;
  let gain = n * climbMult();
  if (C.wind > 0) { const w = Math.min(C.wind, gain); C.wind = +(C.wind - w).toFixed(2); gain += w; }
  const before = C.m, season = C.season, sea = climbSeason();
  C.m = Math.min(CLIMB_TOP, +(C.m + gain).toFixed(2)); C.log[dayKey()] = C.m; C.lastDay = dayKey();
  const S1 = session && !session.done ? session : null;
  if (S1) S1.climb = (S1.climb || 0) + (C.m - before);
  sea.marks.forEach(mk => { if (before < mk.m && C.m >= mk.m) { const id = postId(season, mk.m);
    if (!C.posts.includes(id)) { C.posts.push(id); earn(`${mk.t} 도착`, 5); if (S1) S1.marks = [...(S1.marks||[]), id]; else S.pending = [...(S.pending||[]), {kind:"landmark", id}]; } } });
  for (let k = Math.floor(before / 25) + 1; k * 25 <= C.m; k++) { const at = k * 25; if (sea.marks.some(mk => mk.m === at)) continue;
    const ev = CLIMB_EVENTS[Math.floor(seeded(`climb-${season}-${at}`)() * CLIMB_EVENTS.length)];
    if (ev.id === "wind") C.wind += 10; else if (ev.id === "cherry") earn("여행 선물", 3); else if (ev.id === "snack") earn("여행 간식", 2); else if (ev.id === "photo") C.photos = (C.photos||0) + 1;
    C.ev = [{at, id:ev.id, season, d:dayKey()}, ...(C.ev||[])].slice(0, 30); if (S1) S1.events = [...(S1.events||[]), ev.id]; }
  if (C.m >= CLIMB_TOP && !C.summit) { C.summit = true; S.pending = [...(S.pending||[]), {kind:"summit"}]; }
  save(); return C.m - before;
}
/* days away let some air out (3 m a day), never below the last landmark; streak freezes cover the day like they cover the streak */
function climbDecay(){
  const C = climbState(), t = dayKey(); if (!C.lastDay || C.summit) return;
  const gap = daysBetween(C.lastDay, t); if (gap < 2) return;
  const frozen = S.freezeNotice && S.freezeNotice.day === t ? S.freezeNotice.days : 0;
  const missed = Math.max(0, gap - 1 - frozen), floor = (lastMark(C.m) || {m:0}).m;
  const lost = Math.min(missed * 3, Math.max(0, C.m - floor));
  C.lastDay = dayKey(new Date(Date.now() - DAY));
  if (lost > 0) { C.m = +(C.m - lost).toFixed(2); C.decay = {day:t, lost:Math.round(lost)}; }
  save();
}

/* ---------- drawing ---------- */
function rideSvg(id, size = 64){
  const el = h("div",{class:"ride ride-" + id,style:`width:${size}px;height:${size*1.25}px`});
  const art = {
    sky:'<svg viewBox="0 0 80 100" aria-hidden="true"><path d="M40 4C20 4 8 18 8 34c0 16 14 28 24 36h16c10-8 24-20 24-36C72 18 60 4 40 4z" fill="#FF7A6B"/><path d="M40 4c-8 0-14 14-14 30s8 28 10 36h8c2-8 10-20 10-36S48 4 40 4z" fill="#FFD45C"/><path d="M30 70l2 10M50 70l-2 10" stroke="#8A5A2B" stroke-width="2"/><rect x="26" y="78" width="28" height="18" rx="4" fill="#C9772E"/></svg>',
    sea:'<svg viewBox="0 0 100 80" aria-hidden="true"><rect x="40" y="10" width="16" height="18" rx="4" fill="#E3B12F"/><path d="M48 10v-6h8" stroke="#E3B12F" stroke-width="3" fill="none"/><rect x="6" y="24" width="86" height="40" rx="20" fill="#FFD45C"/><circle cx="30" cy="44" r="7" fill="#9BE3F0" stroke="#E3B12F" stroke-width="3"/><circle cx="70" cy="44" r="7" fill="#9BE3F0" stroke="#E3B12F" stroke-width="3"/><path d="M92 40l6-8v24z" fill="#E3B12F"/></svg>',
    space:'<svg viewBox="0 0 70 110" aria-hidden="true"><path d="M35 4c16 14 20 36 18 66H17C15 40 19 18 35 4z" fill="#F2F4FF"/><path d="M35 4c8 7 12 16 14 26H21c2-10 6-19 14-26z" fill="#FF7A6B"/><path d="M17 56L4 78l14-4zM53 56l13 22-14-4z" fill="#FF7A6B"/><path d="M24 70h22l-4 14H28z" fill="#9AA3C8"/><path d="M28 86q7 22 14 0" fill="#FFB020"/></svg>'}[id];
  el.innerHTML = art;
  const m = mascot(Math.round(size * .5), "happy"); m.classList.add("ride-pilot"); el.append(m);
  return el;
}
/* home: where 앵두 is now and what is next */
function climbCard(){
  const C = climbState(), sea = climbSeason(), nx = nextMark(C.m), lm = lastMark(C.m);
  const from = lm ? lm.m : 0, to = nx ? nx.m : CLIMB_TOP, pct = Math.max(.03, (C.m - from) / Math.max(1, to - from));
  const today = Math.max(0, C.m - (C.log[dayKey(new Date(Date.now() - DAY))] ?? (C.lastDay === dayKey() ? 0 : C.m)));
  const sub = C.summit ? `${sea.end.e} ${sea.end.t}에 도착했어! 눌러서 소감을 남겨 줘` :
    C.decay && C.decay.day === dayKey() ? `오랜만이야! 풍선 바람이 빠져서 ${C.decay.lost}${sea.unit} 내려왔어` :
    nx ? `다음 ${nx.e} ${nx.t}까지 ${Math.ceil(nx.m - C.m)}${sea.unit}` : "";
  return h("button",{class:"cta alt climb-card","data-open":"climb",onclick:()=>{ sfx("tap"); location.hash = "#climb"; }},
    h("div",{class:"cc-art",style:`--top:${sea.sky[1]};--bot:${sea.sky[0]}`}, rideSvg(sea.id, 34)),
    h("div",{style:"min-width:0;flex:1"}, h("small",{class:"np-k"}, `앵두의 ${sea.t} · 시즌 ${C.season + 1}`),
      h("b",{}, fmtM(C.m) + (today >= 1 ? ` · 오늘 +${Math.round(today)}` : "")), h("span",{}, sub),
      h("span",{class:"cc-bar","aria-hidden":"true"}, h("i",{style:`width:${Math.round(pct*100)}%`}))),
    h("span",{class:"arrow","aria-hidden":"true"},"→"));
}
function postcardEl(season, mk, owned){
  const s = CLIMB_SEASONS[season % CLIMB_SEASONS.length];
  return h("button",{class:"postcard" + (owned ? " on" : ""),type:"button",style:`--top:${s.sky[1]};--bot:${s.sky[0]}`,disabled:!owned,"aria-label": owned ? `${mk.t} 엽서: ${mk.en}` : "아직 못 받은 엽서",
    onclick:()=>{ sfx("tap"); openPostcard(season, mk); }},
    h("span",{class:"pc-e"}, owned ? mk.e : "?"), h("span",{class:"pc-t"}, owned ? mk.en : mk.t));
}
function openPostcard(season, mk){
  const s = CLIMB_SEASONS[season % CLIMB_SEASONS.length];
  openSheet(`${mk.t}에서 온 엽서`, inner => inner.append(
    h("div",{class:"pc-big",style:`--top:${s.sky[1]};--bot:${s.sky[0]}`}, h("span",{class:"pc-e"}, mk.e), h("b",{}, mk.en), h("span",{}, mk.ko)),
    h("div",{class:"card-s",style:"gap:6px;padding:12px"}, h("div",{class:"ctx"},"이렇게 써요"), h("p",{style:"font-weight:700"}, tapText(mk.ex, {en:mk.ex, ko:mk.exko})), h("p",{class:"ctx"}, mk.exko),
      h("div",{class:"row"}, speakBtn(mk.en,"표현 듣기"), speakBtn(mk.ex,"예문 듣기")))));
}
/* landmark arrival (from the queue, or the recap) */
function landmarkSheet(id){
  const [sid, mStr] = id.split(":"); const season = CLIMB_SEASONS.findIndex(s => s.id === sid); const mk = CLIMB_SEASONS[season].marks.find(x => x.m === +mStr); if (!mk) return;
  openSheet(`${mk.t} 도착!`, inner => { inner.append(h("section",{class:"celebrate"}, h("span",{style:"font-size:64px;line-height:1"}, mk.e), h("h1",{class:"title"}, `${mk.t}에 도착!`), h("p",{class:"muted",html:`엽서 한 장을 받았어 · ${CHERRY} 체리 +5`})));
    inner.append(postcardEl(season, mk, true)); });
  confetti(); sfx("fanfare");
}
/* the top: write one line about the trip (in English if you can), then a new season starts with a new ride */
function summitSheet(){
  const C = climbState(), sea = climbSeason();
  openSheet(`${sea.end.t} 도착!`, inner => {
    const ta = h("textarea",{rows:"2",maxlength:"80",placeholder:"예: I made it! / Step by step, I got here.","aria-label":"정상 소감"});
    const ideas = ["I made it!", "Step by step, I got here.", "Five minutes a day really works!", "Next stop: the stars!"];
    inner.append(h("section",{class:"celebrate"}, rideSvg(sea.id, 80), h("h1",{class:"title"}, `${sea.t} 완주!`), h("p",{class:"muted"}, sea.end.line)),
      h("p",{class:"ctx"},"여기 올라온 소감을 한 줄 남겨 줘. 영어로 써 보면 더 좋아! 명예의 전당에 남아."),
      h("div",{class:"row"}, ...ideas.map(x => h("button",{class:"chip",type:"button",onclick:()=>{ ta.value = x; }}, x))), ta);
    const save1 = h("button",{class:"primary",type:"button"},"소감 남기고 다음 여행 떠나기");
    save1.onclick = async () => { const line = ta.value.trim() || ideas[0]; let better = null;
      if (llm.engine && /[a-z]/i.test(line)) { save1.disabled = true; save1.textContent = "앵두가 읽는 중…";
        try { const r = await llmJSON('Fix any English mistakes in one short line written by a learner. Reply with JSON {"better": the corrected line (same meaning, natural, max 12 words)}.', line, 60); better = r && r.better && r.better !== line ? String(r.better) : null; } catch(e) {} }
      C.hall = [...(C.hall||[]), {season:C.season, t:sea.t, line, better, d:dayKey()}];
      earn(`${sea.t} 완주`, 50); C.season++; C.m = 0; C.summit = false; C.log = {}; C.wind = 0; save(); checkBadges();
      closeSheet(); toast(`새 여행 시작! 이번엔 ${climbSeason().ride}를 타고 ${climbSeason().t}`); route(); };
    inner.append(save1);
  });
  confetti(); sfx("fanfare");
}
/* #climb: the whole trip as a tall scene, ghosts of yesterday and last week, postcards and the hall of fame */
function viewClimb(app){
  const C = climbState(), sea = climbSeason(), H = 1500;
  const at = m => sea.up ? `bottom:${8 + m / CLIMB_TOP * 84}%` : `top:${8 + m / CLIMB_TOP * 84}%`;
  app.append(h("div",{class:"top"}, h("button",{class:"iconbtn press",type:"button","aria-label":"뒤로",onclick:()=>{ history.length > 1 ? history.back() : (location.hash = "#home"); }},"←"),
    h("h1",{class:"sec-h",style:"margin:0"}, `앵두의 ${sea.t}`), h("span",{class:"chip"}, `시즌 ${C.season + 1}`)));
  const scene = h("div",{class:"climb-scene",style:`height:${H}px;background:linear-gradient(${sea.up ? "to top" : "to bottom"}, ${sea.sky.join(",")})`});
  sea.marks.forEach((mk, i) => { const got = C.posts.includes(postId(C.season, mk.m)), isNext = mk === nextMark(C.m);
    scene.append(h("div",{class:"mark" + (got ? " got" : "") + (isNext ? " next" : ""),style:at(mk.m) + `;${i % 2 ? "right:6%" : "left:6%"}`},
      h("span",{class:"mk-e"}, got || isNext ? mk.e : "❔"), h("span",{class:"mk-t"}, got || isNext ? mk.t : "???"), h("small",{}, fmtM(mk.m)))); });
  const ghost = (days, label) => { const k = dayKey(new Date(Date.now() - days * DAY)); const keys = Object.keys(C.log).filter(x => x <= k).sort(); const v = keys.length ? C.log[keys[keys.length-1]] : null;
    if (v == null || Math.abs(v - C.m) < 4) return; scene.append(h("div",{class:"past-ride",style:at(v)}, h("span",{}, "🎈"), h("small",{}, `${label} ${fmtM(v)}`))); };
  ghost(1, "어제의 나"); ghost(7, "지난주의 나");
  const me = h("div",{class:"me-ride",style:at(C.m)}, rideSvg(sea.id, 70), h("b",{class:"me-m"}, fmtM(C.m)));
  scene.append(me);
  app.append(scene);
  requestAnimationFrame(() => { try { me.scrollIntoView({block:"center"}); } catch(e) {} });
  const mult = climbMult();
  app.append(h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"여행 규칙"),
    h("p",{class:"ctx"}, `맞힌 문제 하나에 1${sea.unit}, 30초 말하기는 3${sea.unit}. 지금 연속 ${streakNow()}일이라 ${mult > 1 ? `${Math.round((mult-1)*100)}% 더 빨리 올라가.` : "7일 연속부터 더 빨리 올라가."}` + (C.wind > 0 ? ` 순풍이 ${Math.ceil(C.wind)}${sea.unit} 남았어!` : "")),
    h("p",{class:"ctx"}, `랜드마크마다 영어 표현 엽서를 받고, 25${sea.unit}마다 작은 선물이 있어. 며칠 쉬면 풍선 바람이 조금 빠지지만 지나온 랜드마크 아래로는 안 내려가.`)));
  const album = h("section",{class:"card-s",id:"postcards"}, h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"},"엽서첩"), h("span",{class:"chip"}, `${C.posts.length}/${CLIMB_SEASONS.length * 10}`)));
  CLIMB_SEASONS.forEach((s, si) => { const grid = h("div",{class:"pc-grid"}); s.marks.forEach(mk => grid.append(postcardEl(si, mk, C.posts.includes(postId(si, mk.m))))); album.append(h("div",{class:"ctx"}, s.t), grid); });
  app.append(album);
  if ((C.hall||[]).length) app.append(h("section",{class:"card-s",id:"hall"}, h("h2",{class:"sec-h"},"명예의 전당"),
    ...C.hall.map(x => h("div",{class:"hall-row"}, h("span",{class:"chip"}, `${x.t} · ${x.d}`), h("p",{style:"font-weight:700"}, `“${x.better || x.line}”`), x.better ? h("small",{class:"ctx"}, `처음 쓴 문장: ${x.line}`) : ""))));
  if (C.summit) setTimeout(summitSheet, 400);
}
/* recap: how far this session went, any landmark reached on the way */
function climbRecap(s){
  if (!s.climb && !(s.marks||[]).length) return null;
  const C = climbState(), sea = climbSeason(), nx = nextMark(C.m), lm = lastMark(C.m);
  const from = lm ? lm.m : 0, to = nx ? nx.m : CLIMB_TOP;
  const box = h("section",{class:"card-s",id:"recap-climb"}, h("div",{class:"row",style:"justify-content:space-between;align-items:center"},
    h("h2",{class:"sec-h"}, `앵두 ${sea.ride} +${Math.round(s.climb||0)}${sea.unit} 상승!`), rideSvg(sea.id, 30)),
    h("div",{class:"cc-bar big","aria-hidden":"true"}, h("i",{style:`width:${Math.round(Math.max(.03,(C.m-from)/Math.max(1,to-from))*100)}%`})),
    h("p",{class:"ctx"}, nx ? `지금 ${fmtM(C.m)} · ${nx.e} ${nx.t}까지 ${Math.ceil(nx.m - C.m)}${sea.unit}` : `${sea.end.t}에 도착했어!`));
  (s.events||[]).slice(0, 3).forEach(id => { const ev = CLIMB_EVENTS.find(x => x.id === id); if (ev) box.append(h("p",{class:"ctx"}, `${ev.e} ${ev.t} · ${ev.d}`)); });
  (s.marks||[]).forEach(id => { const [sid, mStr] = id.split(":"); const si = CLIMB_SEASONS.findIndex(x => x.id === sid); const mk = CLIMB_SEASONS[si].marks.find(x => x.m === +mStr);
    if (mk) box.append(h("p",{style:"font-weight:700"}, `${mk.e} ${mk.t} 도착! 엽서를 받았어`), postcardEl(si, mk, true)); });
  return box;
}
