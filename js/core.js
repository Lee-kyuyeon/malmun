/* 재잘 · utilities, stored state and migrations, mascot, sounds, bottom sheet. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- utilities ---------- */
const $ = (s, el=document) => el.querySelector(s);
const h = (tag, attrs={}, ...kids) => { const e=document.createElement(tag);
  for (const [k,v] of Object.entries(attrs||{})) { if (v==null||v===false) continue;
    if (k==="class") e.className=v; else if (k.startsWith("on")) e.addEventListener(k.slice(2),v); else if (k==="html") e.innerHTML=v; else e.setAttribute(k, v===true?"":v); }
  for (const c of kids.flat()) { if (c==null||c===false) continue; e.append(c.nodeType?c:document.createTextNode(String(c))); }
  return e; };
const dayKey = (d=new Date()) => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const shuffle = a => { a=[...a]; for (let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];} return a; };
function toast(msg){ document.querySelectorAll(".toast").forEach(x=>x.remove()); const t=h("div",{class:"toast",role:"status"},msg); document.body.append(t); setTimeout(()=>t.remove(),2600); }
const ICON = {
 mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
 spk:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg>'
};

/* ---------- state & persistence ---------- */
const LS_KEY = "malmun.v1";
const NEW_PER_DAY = 6;
const SETTINGS_DEFAULT = {goal:50, sound:true, haptic:true, handsfree:false, showKo:false, rate:1, interests:[], studyTime:"", wordsPerDay:5};
function blank(){ return {v:2,cards:{},xp:0,streak:0,bestStreak:0,lastDay:null,hist:{},custom:[],newDay:null,newCount:0,talks:0,sessions:0,errors:{},settings:{...SETTINGS_DEFAULT},onboarded:false,cherries:0,ledger:[],daily:null,freezes:0,freezeDays:[],freezeNotice:null,outfit:{},owned:[],badges:{},badgesSeen:[],boostUntil:0,selfRepairs:0,perfectSessions:0,fullTalks:0,earlyBird:false,nightOwl:false,pending:[],speakouts:[],lastSeen:null,welcomeDay:null,updatedAt:0}; }
/* stored-state migrations: each step upgrades one schema version */
const SCHEMA = 2;
function migrate(o){ o = o || {}; const v = o.v || 1;
  if (v < 2) Object.entries(o.words||{}).forEach(([w, e]) => { if (typeof e.stage === "number") return; const c = (o.cards||{})["w:"+w];
    const m = !c ? 0 : c.s>=21 ? 4 : c.s>=7 ? 3 : c.s>=1.5 ? 2 : 1; e.stage = c ? Math.min(3, 1 + Math.max(0, m-1)) : 0; });
  o.v = SCHEMA; return o; }
function hydrate(obj){ const s = Object.assign(blank(), migrate(obj)); s.settings = Object.assign({...SETTINGS_DEFAULT}, (obj&&obj.settings)||{}); return s; }
let S = blank();
try { const raw = localStorage.getItem(LS_KEY); if (raw) { S = hydrate(JSON.parse(raw)); if (!("onboarded" in JSON.parse(raw)) && (S.sessions || Object.keys(S.cards).length)) S.onboarded = true; } } catch(e) {}
const goal = () => S.settings.goal || 50;
const store = { ok: (() => { try { localStorage.setItem("malmun.probe","1"); localStorage.removeItem("malmun.probe"); return true; } catch(e) { return false; } })() };
/* one write per task: many state changes in one tap become a single localStorage write */
let saveQueued = false;
function flushSave(){ saveQueued = false; S.updatedAt = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); store.ok = true; } catch(e) {} }
function save(){ if (saveQueued) return; saveQueued = true; queueMicrotask(flushSave); }
addEventListener("pagehide", () => { if (saveQueued) flushSave(); });
function allCards(){ return DECK.concat(S.custom||[]); }
/* id → card index, rebuilt only when the learner's own cards change */
let CARD_IX = null, CARD_IX_KEY = null;
function cardById(id){ const cu = S.custom || []; const key = cu.length + ":" + (cu[cu.length-1]||{}).id;
  if (!CARD_IX || CARD_IX_KEY !== key || CARD_IX.src !== cu) { CARD_IX = new Map(allCards().map(c=>[c.id, c])); CARD_IX.src = cu; CARD_IX_KEY = key; }
  return CARD_IX.get(id); }


/* ---------- mascot: an original parrot chick. moods: idle · happy · oops · think · talk ---------- */
const MASCOT_SVG = `<svg class="mascot" viewBox="0 0 100 100" aria-hidden="true">
<g class="m-all">
 <path d="M47 31c-7-13-1-20 4-21-1 7 1 14-1 21z" fill="#FF7A6B"/><path d="M53 32c2-12 9-17 15-16-3 6-8 12-12 17z" fill="#FF9A8C"/>
 <ellipse class="wing l" cx="22" cy="63" rx="8" ry="13" fill="#F2BE3A"/><ellipse class="wing r" cx="78" cy="63" rx="8" ry="13" fill="#F2BE3A"/>
 <circle cx="50" cy="60" r="30" fill="#FFD45C"/><ellipse cx="50" cy="72" rx="17" ry="13" fill="#FFE9A6"/><circle class="flush" cx="50" cy="60" r="30" fill="#FF4D3D"/>
 <circle cx="32" cy="66" r="4.5" fill="#FF7A6B" opacity=".45"/><circle cx="68" cy="66" r="4.5" fill="#FF7A6B" opacity=".45"/>
 <g class="eye"><circle cx="39" cy="53" r="8" fill="#fff"/><g class="pupil"><circle cx="40" cy="54" r="4.6" fill="#1F2A26"/><circle cx="41.6" cy="52.2" r="1.6" fill="#fff"/></g></g>
 <g class="eye"><circle cx="61" cy="53" r="8" fill="#fff"/><g class="pupil"><circle cx="60" cy="54" r="4.6" fill="#1F2A26"/><circle cx="61.6" cy="52.2" r="1.6" fill="#fff"/></g></g>
 <g class="brows soft" stroke="#1F2A26" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M32 42q7-2 13 2"/><path d="M68 42q-7-2-13 2"/></g>
 <g class="brows hard" stroke="#1F2A26" stroke-width="3" stroke-linecap="round" fill="none"><path d="M31 39l15 6"/><path d="M69 39l-15 6"/></g>
 <g class="vein" stroke="#E0343F" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M70 30h4v-4M78 26v4h4M82 34h-4v4M74 38v-4h-4"/></g>
 <g class="steam" fill="#C9D3CF"><circle cx="20" cy="32" r="5"/><circle cx="14" cy="24" r="4"/><circle cx="80" cy="32" r="5"/><circle cx="86" cy="24" r="4"/></g>
 <path class="tear" d="M31 58c-2 3-2 5 0 6 2-1 2-3 0-6z" fill="#79C2FF"/>
 <path d="M43 61q7-6 14 0q-7 7-14 0z" fill="#FF9A3C"/><path class="beak-lo" d="M45 63q5 6 10 0q-5 2-10 0z" fill="#E2762A"/>
 <path d="M42 89l-3 5M42 89l0 6M58 89l3 5M58 89l0 6" stroke="#E2762A" stroke-width="2.4" stroke-linecap="round"/>
 <g class="acc"></g>
</g></svg>`;
function mascot(size=72, mood="idle", outfit){ const t = document.createElement("template"); t.innerHTML = MASCOT_SVG.trim(); const el = t.content.firstChild; el.style.width = size+"px"; el.style.height = size+"px";
  const o = outfit || (typeof S !== "undefined" ? S.outfit : null) || {};
  const acc = el.querySelector(".acc"); if (acc && typeof ACC !== "undefined") acc.innerHTML = ["neck","extra","eyes","hat"].map(slot => { const it = ACC.find(a=>a.id===o[slot]); return it ? it.svg : ""; }).join("");
  setMood(el, mood); return el; }
const MOODS = ["happy","oops","think","talk","pout","angry","fury"];
function setMood(el, mood){ if (!el) return; el.classList.remove(...MOODS); if (mood && mood !== "idle") { void el.getBoundingClientRect(); el.classList.add(mood); } }
let speaker = null; /* the mascot whose beak follows the voice */

/* ---------- juice: sound, haptics, confetti ---------- */
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let actx = null;
function tone(freq, start, dur, type="sine", vol=.18){
  const o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.setValueAtTime(freq, actx.currentTime+start);
  g.gain.setValueAtTime(0.0001, actx.currentTime+start); g.gain.exponentialRampToValueAtTime(vol, actx.currentTime+start+.015);
  g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+start+dur); o.connect(g).connect(actx.destination); o.start(actx.currentTime+start); o.stop(actx.currentTime+start+dur+.02);
}
const SFX = {
  ding:()=>{ tone(1046,0,.12); tone(1318,.09,.22); },
  bloop:()=>{ tone(330,0,.16,"triangle",.2); tone(247,.12,.24,"triangle",.18); },
  combo:()=>{ [784,988,1175,1568].forEach((f,i)=>tone(f,i*.06,.14,"square",.06)); },
  fanfare:()=>{ [523,659,784,1046].forEach((f,i)=>tone(f,i*.12,.22,"triangle",.16)); tone(1046,.5,.5,"sine",.14); },
  tap:()=>{ tone(660,0,.05,"sine",.08); }
};
function sfx(name){ if (!S.settings.sound) return; try { actx = actx || new (window.AudioContext||window.webkitAudioContext)(); if (actx.state==="suspended") actx.resume(); SFX[name] && SFX[name](); } catch(e){} }
function haptic(p){ if (S.settings.haptic && navigator.vibrate) { try { navigator.vibrate(p); } catch(e){} } }
function confetti(){
  if (reduced()) return;
  const c = h("canvas",{class:"confetti","aria-hidden":"true"}); document.body.append(c);
  const W = c.width = innerWidth*devicePixelRatio, H = c.height = innerHeight*devicePixelRatio, x = c.getContext("2d");
  const cols = ["#2DBE8C","#FFD45C","#FF7A6B","#79C2FF","#B794F6"];
  const P = Array.from({length:110},()=>({x:W/2+(Math.random()-.5)*W*.3, y:H*.35, vx:(Math.random()-.5)*14*devicePixelRatio, vy:(-Math.random()*16-6)*devicePixelRatio, s:(5+Math.random()*6)*devicePixelRatio, r:Math.random()*6, vr:(Math.random()-.5)*.4, c:cols[Math.random()*cols.length|0]}));
  const t0 = performance.now();
  (function frame(t){ const k = (t-t0)/1500; x.clearRect(0,0,W,H);
    P.forEach(p=>{ p.vy += .55*devicePixelRatio; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.globalAlpha = Math.max(0,1-k); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66); x.restore(); });
    if (k < 1) requestAnimationFrame(frame); else c.remove(); })(t0);
}
function countUp(el, to, ms=900){ if (reduced()) { el.textContent = to; return; } const t0 = performance.now(); (function f(t){ const k = Math.min(1,(t-t0)/ms); el.textContent = Math.round(to*(1-Math.pow(1-k,3))); if (k<1) requestAnimationFrame(f); })(t0); }
const FLAME = '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-6 1-9z" fill="#FF7A6B"/><path d="M12 12c1 1.5 2.5 2 2.5 4a2.5 2.5 0 0 1-5 0c0-1.5 1.5-2 2.5-4z" fill="#FFD45C"/></svg>';

/* ---------- bottom sheet ---------- */
function openSheet(title, build){
  closeSheet();
  const scrim = h("div",{class:"scrim",onclick:closeSheet});
  const inner = h("div",{class:"in"}, h("div",{class:"grab","aria-hidden":"true"}), h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"}, title), h("button",{class:"x","aria-label":"닫기",onclick:closeSheet},"×")));
  const sheet = h("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":title}, inner);
  build(inner); document.body.append(scrim, sheet);
  const f = sheet.querySelector("button,input"); if (f) f.focus();
}
function closeSheet(){ document.querySelectorAll(".scrim,.sheet").forEach(x=>x.remove()); }
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
/* keep the screen on while a session or role-play is open (iOS 16.4+, Android) */
let wakeLock = null, wantAwake = false;
async function keepAwake(on){ wantAwake = !!on; try {
  if (on && !wakeLock && navigator.wakeLock && document.visibilityState === "visible") { wakeLock = await navigator.wakeLock.request("screen"); wakeLock.addEventListener("release", () => { wakeLock = null; }); }
  else if (!on && wakeLock) { const w = wakeLock; wakeLock = null; await w.release(); } } catch(e) {} }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && wantAwake) keepAwake(true); });
function setFocusMode(on){ document.body.classList.toggle("focus", !!on); keepAwake(on); }
