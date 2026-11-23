/* 재잘 · grading, word notebook, word ladder, FSRS spacing. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- grading: normalize → LCS diff → score ---------- */
const CONTR = {"i'm":"i am","i've":"i have","i'll":"i will","i'd":"i would","it's":"it is","that's":"that is","what's":"what is","how's":"how is","you're":"you are","we're":"we are","they're":"they are","she's":"she is","he's":"he is","there's":"there is","where's":"where is","let's":"let us","can't":"can not","cannot":"can not","couldn't":"could not","don't":"do not","doesn't":"does not","didn't":"did not","isn't":"is not","aren't":"are not","won't":"will not","wouldn't":"would not","you've":"you have","we've":"we have","you'll":"you will","we'll":"we will","haven't":"have not","hasn't":"has not","hadn't":"had not","wasn't":"was not","weren't":"were not","shouldn't":"should not","mustn't":"must not","needn't":"need not","here's":"here is","who's":"who is","they've":"they have","they'll":"they will","he'll":"he will","she'll":"she will","it'll":"it will","that'll":"that will","you'd":"you would","we'd":"we would","he'd":"he would","she'd":"she would","they'd":"they would","it'd":"it would","that'd":"that would","what're":"what are","who'll":"who will","there'll":"there will","how'd":"how did","why's":"why is","when's":"when is","y'all":"you all","gonna":"going to","wanna":"want to","gotta":"got to"};
const NUM = {"1":"one","2":"two","3":"three","4":"four","5":"five","6":"six","7":"seven","8":"eight","9":"nine","10":"ten","11":"eleven","12":"twelve"};
function toks(s){
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’‘]/g,"'").replace(/[^a-z0-9' -]/g," ").replace(/-/g," ").split(/\s+/).filter(Boolean)
    .flatMap(w => (CONTR[w]||NUM[w]||w.replace(/^'+|'+$/g,"")).split(" ")).filter(Boolean);
}
function lcs(a,b){ const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const keepA=new Set(),keepB=new Set(); let i=0,j=0; while(i<m&&j<n){ if(a[i]===b[j]){keepA.add(i);keepB.add(j);i++;j++;} else if(dp[i+1][j]>=dp[i][j+1]) i++; else j++; }
  return {len:dp[0][0],keepA,keepB}; }
function grade(answer, card){
  const A = toks(answer); let best = null;
  for (const target of [card.en, ...(card.alts||[])]) {
    const T = toks(target); const r = lcs(A,T); const score = (A.length+T.length) ? (2*r.len)/(A.length+T.length) : 0;
    if (!best || score > best.score) best = {score, target, A, T, r};
  }
  return best;
}
function diffView(best){
  const mine = h("div",{class:"diff"}), right = h("div",{class:"diff"});
  best.A.forEach((w,i)=>{ mine.append(best.r.keepA.has(i) ? w+" " : h("span",{class:"extra"},w), best.r.keepA.has(i)?"":" "); });
  best.T.forEach((w,j)=>{ right.append(best.r.keepB.has(j) ? w+" " : h("span",{class:"miss"},w), best.r.keepB.has(j)?"":" "); });
  return {mine, right};
}

/* ---------- WORDS: the learner's missed words → word notebook (frequency first, word parts for long words) ---------- */
const FUNC_WORDS = new Set("i me my mine you your yours we our us he him his she her it its they them their a an the to of in on at for with and or but is am are was were be been being does did done have has had having will would can could should shall may might must this that these those there here what where when how who whom which why not no so up out about as by from if then than too very just let s ll d ve re t m into over under after before again all any some each every both more most less much many own same such only also yet still even now well get got gotten going gone came took made put say said see seen give know want need like one two three ten seven first oh hi hey yes please getting other off another myself yourself".split(" "));
const WORD_FORM = new Map(); Object.values(WORDS).forEach(w => [w.w, ...w.forms].forEach(f => WORD_FORM.set(f, w)));
const BAND_KO = {1:"자주 씀 · 상위 1,000", 2:"꽤 씀 · 상위 3,000", 3:"가끔 씀"};
function wordEntry(w){ return WORDS[w] || (S.wordCache||{})[w] || null; }
function lookupTok(t){ t = t.replace(/'s$/,""); if (WORD_IGNORE.includes(t) || FUNC_WORDS.has(t)) return null; return WORD_FORM.get(t) || (S.wordCache||{})[t] || null; }
/* words in the target the learner did not produce: content words only, most frequent first, then longest */
function missedWords(answer, target, max=2){
  const A = toks(answer), T = toks(target), r = lcs(A, T), out = [], unknown = [];
  T.forEach((t,j) => { if (r.keepB.has(j)) return; const e = lookupTok(t);
    if (e) { if (!out.includes(e)) out.push(e); }
    else { const u = t.replace(/'s$/,""); if (u.length >= 4 && !FUNC_WORDS.has(u) && !WORD_IGNORE.includes(u) && !unknown.includes(u)) unknown.push(u); } });
  return {known: out.sort((a,b)=>a.band-b.band || b.w.length-a.w.length).slice(0,max), unknown: unknown.slice(0,1)};
}
function hasWord(w){ return !!(S.words && S.words[w]); }
function addWord(w, src, auto){
  S.words = S.words || {}; if (!S.words[w]) setTimeout(()=>track("word_saved"), 0); const e = S.words[w] || {added:Date.now(), src:null, misses:0, auto:!!auto, stage:0};
  e.misses++; if (src && !e.src) e.src = src; S.words[w] = e;
  if (session && !session.done) { session.newWords = session.newWords || []; if (!session.newWords.includes(w)) session.newWords.push(w); }
  save();
}
function removeWord(w){ if (S.words) { delete S.words[w]; delete S.cards["w:"+w]; save(); } }
/* where a word was met: the learner's own sentence, else the first deck chunk using it, else the dictionary example.
   The deck lookup is cached: the deck never changes while the app runs and the course has ~2,900 words */
const SRC_CACHE = new Map();
function srcFor(w){ const e = S.words && S.words[w]; if (e && e.src) return e.src;
  if (SRC_CACHE.has(w)) return SRC_CACHE.get(w);
  const entry = wordEntry(w); const forms = entry ? [entry.w, ...(entry.forms||[])] : [w];
  const c = DECK.find(c => toks(c.en).some(t => forms.includes(t.replace(/'s$/,""))));
  const r = c ? {en:c.en, ko:c.ko} : entry && entry.e ? {en:entry.e.en, ko:entry.e.ko} : null;
  SRC_CACHE.set(w, r); return r; }
/* ---------- word ladder: meet → recognise → cloze in its sentence → recall from Korean → cloze in a new sentence → make my own sentence ----------
   a correct answer moves the word up one rung, a miss moves it down one; FSRS still decides when it comes back */
const STAGE_KO = ["새 단어","뜻 알아보기","문장 속 빈칸","한→영 떠올리기","다른 문장 빈칸","내 문장 만들기"];
const WORD_NEW_PER_DAY = 5; /* default; the learner picks 5/10/15 in settings */
/* with an exam date, the daily amount is worked out so the course is finished a little before the exam (last 15% of days for review) */
const wordsPerDay = () => goalDaily() || S.settings.wordsPerDay || WORD_NEW_PER_DAY;
/* words saved before the ladder existed start from their memory strength */
const wordStage = w => { const e = S.words && S.words[w]; if (!e) return 0; if (typeof e.stage === "number") return e.stage; return S.cards["w:"+w] ? Math.min(3, 1 + Math.max(0, mastery("w:"+w)-1)) : 0; };
function setStage(w, ok){ const e = S.words && S.words[w]; if (!e) return; const st = wordStage(w);
  e.stage = ok ? Math.min(5, Math.max(1, st) + 1) : Math.max(1, st - 1); e.best = Math.max(e.best||0, e.stage); }
function formsOf(w){ const e = wordEntry(w); return new Set(e ? [e.w, ...(e.forms||[])] : [w]); }
/* which exercise fits a word now; rung 5 needs the on-device AI, otherwise it alternates recall and new-context cloze */
function wordStepFor(w){
  const st = wordStage(w), src = srcFor(w);
  if (!S.cards["w:"+w] && st === 0) return {type:"wordintro", id:"w:"+w};
  const lvl = Math.max(1, st);
  if (lvl <= 1) return {type:"wordmean", id:"w:"+w};
  if (lvl === 2) return src ? {type:"wordcloze", id:"w:"+w} : {type:"wordrecall", id:"w:"+w};
  if (lvl === 3) return {type:"wordrecall", id:"w:"+w};
  if (lvl === 4 || !llm.engine) { const c = nextContext(w, lvl === 4 && src ? src.en : null); if (c && (lvl === 4 || Math.random() < .6)) return {type:"wordcloze", id:"w:"+w, ctx:c.en}; return {type:"wordrecall", id:"w:"+w}; }
  return {type:"wordmake", id:"w:"+w};
}
/* every sentence the app has for a word: deck chunks, any dictionary example that uses it, and its second example (EX2).
   Reviews rotate through them so a word is recalled in a sentence the learner has not just seen */
const CTX_CACHE = new Map();
function contextsFor(w){
  if (CTX_CACHE.has(w)) return CTX_CACHE.get(w);
  const f = formsOf(w), has = en => toks(en).some(t => f.has(t.replace(/'s$/,""))), out = [], seen = new Set();
  const add = (en, ko) => { const k = en.toLowerCase(); if (!seen.has(k) && has(en)) { seen.add(k); out.push({en, ko}); } };
  const e = wordEntry(w); if (e && e.e) add(e.e.en, e.e.ko);
  if (typeof EX2 !== "undefined" && EX2[w]) add(EX2[w].en, EX2[w].ko);
  DECK.forEach(c => { if (out.length < 12) add(c.en, c.ko); });
  if (out.length < 4) Object.values(WORDS).forEach(x => { if (out.length < 8 && x.e && x.w !== w) add(x.e.en, x.e.ko); });
  CTX_CACHE.set(w, out); return out;
}
/* a sentence other than the one shown last time, preferring ones never shown */
function nextContext(w, notEn){
  const list = contextsFor(w), rec = (S.words && S.words[w]) || {}, seen = rec.seenCtx || [];
  const pool = list.filter(c => c.en !== notEn && c.en !== rec.lastCtx);
  const fresh = pool.filter(c => !seen.includes(c.en));
  const pick = fresh.length ? fresh : pool;
  return pick.length ? pick[Math.floor(Math.random()*pick.length)] : null;
}
function markContext(w, en){ const rec = S.words && S.words[w]; if (!rec) return; const isNew = !(rec.seenCtx||[]).includes(en);
  rec.lastCtx = en; rec.seenCtx = [...(rec.seenCtx||[]).filter(x => x !== en), en].slice(-6); return isNew; }
/* bonus hint: the learner typed a word that means the same thing (WordNet synonym or the same Korean meaning) */
const koSenses = ko => String(ko||"").split(/[,·/;]| 또는 /).map(s => s.replace(/\(.*?\)/g,"").trim()).filter(s => s.length >= 2);
function sameMeaning(typed, target){
  const t = (WORD_FORM.get(typed) || {}).w || typed; if (!t || t === target) return false;
  const S1 = (typeof SYN !== "undefined" && SYN[target] && SYN[target].s) || [], S2 = (typeof SYN !== "undefined" && SYN[t] && SYN[t].s) || [];
  if (S1.includes(t) || S2.includes(target)) return true;
  const a = WORDS[t], b = WORDS[target]; if (!a || !b) return false;
  const ka = koSenses(a.ko); return koSenses(b.ko).some(x => ka.includes(x));
}
function wordNewLeft(){ const k = dayKey(); if (!S.wordNew || S.wordNew.day !== k) S.wordNew = {day:k, n:0}; return Math.max(0, wordsPerDay() - S.wordNew.n); }
/* word courses: the everyday frequency course, plus goal courses (school, 수능, TOEIC, TOEFL/IELTS) from content-goals.js */
const EXAM_COURSES = ["csat", "toeic", "academic"];
function allCourses(){ return [{id:"basic", t:"기본 단어장", d:"영어에서 자주 쓰는 순서 (생활 영어)", src:"wordfreq", words: typeof VOCAB_ORDER === "undefined" ? [] : VOCAB_ORDER},
  ...(typeof GOAL_COURSES === "undefined" ? [] : GOAL_COURSES)]; }
function activeCourse(){ const id = (S.goal && S.goal.course) || "basic"; return allCourses().find(c => c.id === id) || allCourses()[0]; }
const wordMet = w => !!(S.words && S.words[w] && (S.cards["w:"+w] || wordStage(w) > 0));
function goalDays(){ if (!S.goal || !S.goal.date || !EXAM_COURSES.includes(S.goal.course)) return null; const d = daysBetween(dayKey(), S.goal.date); return d >= 1 ? d : null; }
function goalDaily(){ const days = goalDays(); if (!days) return null;
  const left = activeCourse().words.filter(w => WORDS[w] && !wordMet(w)).length; if (!left) return null;
  return Math.max(3, Math.min(40, Math.ceil(left / Math.max(1, Math.floor(days * .85))))); }
/* the next words of the chosen course that are not in the notebook yet */
function vocabNext(n){ const out = [];
  for (const w of activeCourse().words) { if (out.length >= n) break; if (WORDS[w] && !(S.words && S.words[w])) out.push(w); } return out; }
function courseAdd(w){ S.words = S.words || {}; if (!S.words[w]) S.words[w] = {added:Date.now(), src:null, misses:0, auto:true, stage:0, course:true}; }
function vocabProgress(){ const all = activeCourse().words.filter(w => WORDS[w]);
  const met = wordMet;
  const bands = []; for (let i = 0; i < all.length; i += 500) { const part = all.slice(i, i + 500); bands.push({from:i+1, to:i+part.length, met:part.filter(met).length, total:part.length}); }
  return {met: all.filter(met).length, total: all.length, bands}; }
/* every content word in an English sentence can be tapped to open its card and save it */
function tapText(en, src){
  const el = h("span",{class:"taptext"});
  en.split(/(\s+)/).forEach(tok => { const bare = tok.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z'-]/g,"").replace(/'s$/,"");
    if (!bare || bare.length < 2) { el.append(tok); return; }
    const e = lookupTok(bare); const unknown = !e && /^[a-z]{4,}$/.test(bare) && !FUNC_WORDS.has(bare) && !WORD_IGNORE.includes(bare);
    if (!e && !unknown) { el.append(tok); return; }
    const w = e ? e.w : bare;
    el.append(h("button",{class:"tw"+(hasWord(w)?" in":""),type:"button","data-w":w,"aria-label":`${tok} 단어 카드`,onclick:(ev)=>{ ev.stopPropagation(); sfx("tap"); openWord(w, src); }}, tok)); });
  return el;
}
function highlight(en, w){
  const entry = wordEntry(w); const forms = new Set(entry ? [entry.w, ...(entry.forms||[])] : [w]);
  const el = h("span",{});
  en.split(/(\s+)/).forEach(tok => { const bare = tok.toLowerCase().replace(/[^a-z'-]/g,"").replace(/'s$/,"");
    el.append(forms.has(bare) ? h("mark",{class:"w"}, tok) : tok); });
  return el;
}
/* 비슷한 말 · 반대말 (WordNet, reviewed): each one opens its own card when the app knows it */
function synView(w){
  const d = typeof SYN !== "undefined" && SYN[w]; if (!d) return null;
  const chip = x => { const e = WORDS[x]; return e ? h("button",{class:"wchip",type:"button",onclick:()=>openWord(x)}, h("b",{}, x), e.ko) : h("span",{class:"wchip"}, h("b",{}, x)); };
  const row = (lab, list) => list && list.length ? h("div",{class:"synrow"}, h("span",{class:"ctx"}, lab), ...list.map(chip)) : "";
  return h("div",{class:"syn"}, row("비슷한 말", d.s), row("반대말", d.a));
}
function partsView(entry){
  const box = h("div",{style:"display:flex;flex-direction:column;gap:8px"});
  if (entry.parts && entry.parts.length) {
    const row = h("div",{class:"parts","aria-label":"단어 해부"});
    entry.parts.forEach((pt,i) => { if (i) row.append(h("span",{class:"plus","aria-hidden":"true"},"+")); row.append(h("div",{class:"part"}, h("b",{}, pt.p), h("small",{}, pt.m))); });
    box.append(h("div",{class:"ctx"},"단어 해부"), row);
  }
  if (entry.story) box.append(h("p",{class:"story"}, (entry.idiom ? "표현이 생긴 이야기 · " : "기억 이야기 · "), entry.story));
  return box;
}
/* chips under feedback: frequent words go straight into the notebook; rare ones wait for a tap */
function wordChips(res, src){
  const wrap = h("div",{class:"wchips"});
  if (!res.known.length && !(res.unknown.length && llm.engine)) return null;
  let auto = 0;
  res.known.forEach(e => { if (e.band <= 2 && !hasWord(e.w)) { addWord(e.w, src, true); auto++; } else if (hasWord(e.w)) addWord(e.w, src, false);
    wrap.append(h("button",{class:"wchip",type:"button",onclick:()=>openWord(e.w, src)}, h("b",{}, e.w), e.ko, h("span",{class:"chip band"+e.band}, e.band===3 ? "담기" : "담음"))); });
  if (llm.engine) res.unknown.forEach(u => wrap.append(h("button",{class:"wchip",type:"button",onclick:()=>openWord(u, src)}, h("b",{}, u), "뜻 보기")));
  return h("div",{style:"display:flex;flex-direction:column;gap:6px"}, h("div",{class:"ctx"}, auto ? `놓친 단어 · 자주 쓰는 ${auto}개를 단어장에 담았어` : "놓친 단어"), wrap);
}
async function ensureEntry(w){
  if (wordEntry(w)) return wordEntry(w);
  if (!llm.engine) return null;
  const r = await llmJSON('You are an English vocabulary tutor for Korean learners. Answer with one JSON object: {"pos": Korean part of speech, "ko": short Korean meaning, "ipa": American IPA between slashes like /ˈwɔtər/, "parts": array of {"p": word part, "m": its Korean meaning} if the word is built from clear parts (else []), "story": one short Korean memory hook based on real etymology, or ""}. Do not invent etymology.', `Word: ${w}`, 260);
  if (!r || !r.ko) return null;
  const entry = {w, pos:String(r.pos||""), ko:String(r.ko), band:3, forms:[], parts:(Array.isArray(r.parts)?r.parts:[]).filter(x=>x&&x.p&&x.m).slice(0,4).map(x=>({p:String(x.p),m:String(x.m)})), story:String(r.story||""), idiom:false, ai:true, ipa: /^\/[^\/]{1,40}\/$/.test(String(r.ipa||"").trim()) ? String(r.ipa).trim() : ""};
  S.wordCache = S.wordCache || {}; S.wordCache[w] = entry; save(); return entry;
}
function openWord(w, src){
  openSheet("단어 카드", async inner => {
    let entry = wordEntry(w);
    const body = h("div",{style:"display:flex;flex-direction:column;gap:12px"}); inner.append(body);
    const draw = () => {
      body.replaceChildren();
      body.append(h("div",{class:"row",style:"justify-content:space-between;align-items:center;flex-wrap:nowrap"}, h("div",{style:"min-width:0"}, h("div",{class:"wordbig"}, w), entry && entry.ipa ? h("div",{class:"ipa","aria-label":"발음기호"}, entry.ipa) : ""), speakBtn(w,"듣기")));
      if (entry) {
        body.append(h("p",{}, h("span",{class:"ctx"}, entry.pos+" · "), h("b",{}, entry.ko)), h("div",{class:"row"}, h("span",{class:"chip band"+entry.band}, BAND_KO[entry.band]), entry.ai ? h("span",{class:"chip"},"앵두가 정리한 뜻") : ""));
        const pv = partsView(entry); if (pv.childNodes.length) body.append(pv);
        const sv = synView(w); if (sv) body.append(sv);
        if (hasWord(w)) { const st = wordStage(w); body.append(h("div",{style:"display:flex;flex-direction:column;gap:6px"}, h("div",{class:"ctx"}, `학습 단계 ${st}/5 · ${STAGE_KO[st]}`), h("div",{class:"ladder","aria-hidden":"true"}, ...[1,2,3,4,5].map(i=>h("i",{class:i<=st?"on":""}))))); }
      } else body.append(h("p",{class:"muted"}, llm.engine ? "앵두가 단어를 정리하는 중…" : "이 단어는 사전에 없어요. AI 대화 탭에서 모델을 준비하면 뜻과 어원을 정리해 줄게."));
      const sc = src || srcFor(w);
      if (sc) body.append(h("div",{class:"card-s",style:"gap:6px;padding:12px"}, h("div",{class:"ctx"},"이 표현에서 만났어"), h("div",{style:"font-weight:700"}, highlight(sc.en, w)), h("div",{class:"ctx"}, sc.ko), h("div",{class:"row"}, speakBtn(sc.en,"표현 듣기"))));
      const inBook = hasWord(w);
      const btn = h("button",{class:inBook?"ghost":"primary",type:"button"}, inBook ? "단어장에서 빼기" : "단어장에 담기");
      btn.onclick = () => { if (hasWord(w)) { removeWord(w); toast("단어장에서 뺐어요"); } else { addWord(w, sc, false); sfx("ding"); toast("단어장에 담았어"); } draw(); };
      body.append(btn, h("p",{class:"ctx"},"빈도 구간은 영어 고빈도 단어 목록(NGSL·COCA)을 참고한 대략적인 값이에요."));
    };
    draw();
    if (!entry && llm.engine) { try { entry = await ensureEntry(w); } catch(e) {} if (document.contains(body)) draw(); }
  });
}
function wordCard(id){
  const w = id.slice(2); const entry = wordEntry(w); if (!entry) return null;
  return {id, en:w, ko:entry.ko, alts:[], note:"", tag:"단어", lvl:"", word:entry, src:srcFor(w)};
}
function wordInfo(entry){
  const box = h("div",{style:"display:flex;flex-direction:column;gap:8px"});
  box.append(h("p",{}, h("b",{}, entry.w), entry.ipa ? h("span",{class:"ipa"}, " "+entry.ipa) : "", " · ", entry.ko));
  const pv = partsView(entry); if (pv.childNodes.length) box.append(pv);
  const sv = synView(entry.w); if (sv) box.append(sv);
  box.append(h("div",{class:"row"}, speakBtn(entry.w,"단어 듣기"), h("button",{class:"ghost",type:"button",onclick:()=>openWord(entry.w)},"단어 카드")));
  return box;
}

/* ---------- spacing: FSRS-style memory model (R = 0.9 when t = S) ---------- */
const DAY = 86400000;
function schedule(id, g){ /* g: 1 again, 2 hard, 3 good, 4 easy */
  const now = Date.now(); const c = S.cards[id] || {s:0,d:5,due:now,reps:0,lapses:0,last:0};
  if (!c.reps) { c.s = [0.02,0.6,1.5,4][g-1]; c.d = [7,6,5,3.5][g-1]; }
  else {
    const t = Math.max(0,(now - c.last)/DAY); const R = Math.pow(1 + t/(9*c.s), -1);
    if (g === 1) { c.lapses++; c.s = Math.max(0.02, c.s*0.3); c.d = Math.min(10, c.d+1.5); }
    else { const f = g===2?0.55:g===4?1.5:1; c.s = c.s * (1 + Math.exp(1.1)*((11-c.d)/10)*Math.pow(c.s,-0.18)*(Math.exp((1-R)*1.2)-0.9)*f); c.d = Math.max(1, Math.min(10, c.d + (3-g)*0.6)); }
  }
  c.reps++; c.last = now; c.due = now + Math.max(c.s, 0.007)*DAY; S.cards[id] = c; return c;
}
function gradeFrom(score, ms){ if (score < 0.6) return 1; if (score < 0.92 || ms > 15000) return 2; if (score >= 0.99 && ms < 5000) return 4; return 3; }
function mastery(id){ const c=S.cards[id]; if(!c) return 0; if(c.s>=21) return 4; if(c.s>=7) return 3; if(c.s>=1.5) return 2; return 1; }
const MASTERY_LABEL = ["처음","익히는 중","눈에 익음","입에 붙음","장기 기억"];
