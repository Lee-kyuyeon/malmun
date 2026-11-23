/* 재잘 · 어휘 등급: a CEFR-based vocabulary grade (10 grades) from a Yes/No vocabulary-size test plus words learned in the app.
   Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* size thresholds (lemmas) follow Milton (2010) and Milton & Alexiou (2009): A1 < 1,500, A2 1,500–2,500, B1 2,500–3,250,
   B2 3,250–3,750, C1 3,750–4,500, C2 4,500+; the '+' grades split A2, B1 and B2 in two */
const GRADES = [
  {id:"<A1", min:0,    col:"#A3A7B0", can:"인사말, 숫자, 아주 익숙한 단어 몇 개를 알아봐요. 문장보다는 단어 하나하나로 뜻을 짐작하는 단계예요."},
  {id:"A1",  min:600,  col:"#6FC3B2", can:"자기소개, 가족, 음식처럼 아주 익숙한 주제의 짧은 문장을 이해해요. 상대가 천천히 말해 주면 간단한 질문에 답할 수 있어요."},
  {id:"A2",  min:1500, col:"#6CC8D6", can:"쇼핑, 길 찾기, 하루 일과처럼 자주 겪는 일을 짧은 문장으로 주고받아요. 간단한 안내문과 메시지를 읽을 수 있어요."},
  {id:"A2+", min:2000, col:"#79B4EE", can:"익숙한 상황이라면 대화를 조금 더 길게 이어 가요. 지난 경험이나 다음 계획을 몇 문장으로 묶어 설명할 수 있어요."},
  {id:"B1",  min:2500, col:"#8A9BEA", can:"여행 중 생기는 대부분의 상황을 영어로 처리해요. 관심 있는 주제라면 의견과 이유를 들어 말하고, 일상적인 글은 모르는 단어를 문맥으로 짐작하며 읽어요."},
  {id:"B1+", min:2900, col:"#8E8FE6", can:"영상이나 뉴스의 요점을 따라가요. 경험·감정·계획을 자세히 이야기하고, 예상하지 못한 상황에서도 말을 이어 갈 수 있어요."},
  {id:"B2",  min:3250, col:"#E07FB6", can:"원어민과 꽤 자연스럽게 대화하고, 시사 기사나 업무 문서의 핵심을 이해해요. 장단점을 들어 내 입장을 설명할 수 있어요."},
  {id:"B2+", min:3500, col:"#EE937A", can:"추상적인 주제로도 토론하고, 말투와 어감의 차이를 골라 써요. 자막 없이도 대부분의 드라마를 따라갈 수 있어요."},
  {id:"C1",  min:3750, col:"#F2C75C", can:"길고 어려운 글의 숨은 뜻까지 파악하고, 일이나 공부에서 영어를 유연하고 정확하게 써요. 표현을 찾느라 멈추는 일이 드물어요."},
  {id:"C2",  min:4500, col:"#E5A93A", can:"듣고 읽는 거의 모든 것을 쉽게 이해하고, 미묘한 뉘앙스까지 살려 정확하게 표현해요."}
];
const BAND_SIZE = 1000, N_BANDS = 5, PER_BAND = 10, N_FAKES = 10;
const gradeOf = size => { let g = GRADES[0]; GRADES.forEach(x => { if (size >= x.min) g = x; }); return g; };
const gradeIdx = g => GRADES.indexOf(g);
/* words the learner has actually learned in the app (meaning recognised or recalled), counted per 1,000-lemma band */
function learnedBands(){
  const out = new Array(N_BANDS).fill(0);
  Object.keys(S.words || {}).forEach(w => { const r = typeof VOCAB_RANK === "undefined" ? 0 : VOCAB_RANK[w]; if (!r) return;
    const b = Math.floor((r - 1) / BAND_SIZE); if (b >= N_BANDS) return;
    if (wordStage(w) >= 3 || mastery("w:" + w) >= 2) out[b]++; });
  return out;
}
/* corrected hit rate per band: (hits − false alarms) / (1 − false alarms), the usual correction for Yes/No tests */
function testRates(answers){
  const fakes = answers.filter(a => a.fake), fa = fakes.length ? fakes.filter(a => a.yes).length / fakes.length : 0;
  const rates = [...Array(N_BANDS)].map((_, b) => { const r = answers.filter(a => a.band === b); if (!r.length) return 0;
    const hit = r.filter(a => a.yes).length / r.length; return Math.max(0, Math.min(1, fa >= 1 ? 0 : (hit - fa) / (1 - fa))); });
  return {rates, fa};
}
/* the live estimate: the test result, plus words learned since the test that the test would probably have missed */
function vocabSize(){
  const V = S.vgrade; if (!V) return null;
  const now = learnedBands();
  return Math.round(V.rates.reduce((sum, rate, b) => { const gained = Math.max(0, now[b] - (V.base[b] || 0));
    return sum + Math.min(BAND_SIZE, rate * BAND_SIZE + gained * (1 - rate)); }, 0));
}
function currentGrade(){ const n = vocabSize(); return n == null ? null : gradeOf(n); }
/* after a session: if the live estimate crossed into a new grade, remember it so the recap can celebrate */
function gradeCheck(){
  const g = currentGrade(); if (!g || !S.vgrade) return null;
  const was = S.vgrade.top || S.vgrade.grade;
  if (gradeIdx(g) > GRADES.findIndex(x => x.id === was)) { S.vgrade.top = g.id; S.vgradeHist = [...(S.vgradeHist||[]), {d:dayKey(), size:vocabSize(), grade:g.id}].slice(-40); save(); return {from:was, to:g.id}; }
  return null;
}

/* the 10-dot scale, like a ruler: grades reached are filled, the current one is ringed */
function gradeScale(cur){
  const ci = cur ? gradeIdx(cur) : -1;
  return h("div",{class:"gscale",role:"img","aria-label": cur ? `어휘 등급 ${cur.id}, 10등급 중 ${ci+1}번째` : "어휘 등급 10단계"},
    ...GRADES.map((g, i) => h("div",{class:"gs" + (i === ci ? " now" : "") + (i <= ci ? " on" : "")}, h("span",{}, g.id), h("i",{style:`--c:${g.col}`}))));
}
function gradeEmblem(g, size = 56){
  return h("span",{class:"gemblem",style:`--c:${g.col};width:${size}px;height:${size}px`,"aria-hidden":"true",
    html:`<svg viewBox="0 0 48 48"><path d="M24 3l19 13.5-7 23H12l-7-23z" fill="var(--c)" stroke="rgba(0,0,0,.18)" stroke-width="2" stroke-linejoin="round"/><path d="M24 35V20" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M24 25c-6 0-9-3.5-9-8 6 0 9 3.5 9 8zM24 21c5 0 8-3 8-7-5 0-8 3-8 7z" fill="#fff"/><circle cx="15" cy="30" r="1.6" fill="#fff" opacity=".8"/><circle cx="34" cy="27" r="1.3" fill="#fff" opacity=".8"/></svg>`});
}
/* the card on the 나 tab */
function gradeCard(){
  const g = currentGrade(), n = vocabSize();
  const card = h("section",{class:"card-s",id:"vgrade"}, h("div",{class:"row",style:"justify-content:space-between"}, h("h2",{class:"sec-h"},"어휘 등급"), h("span",{class:"chip"},"CEFR 기준 10등급")));
  card.append(gradeScale(g));
  if (!g) {
    card.append(h("p",{class:"ctx"},"아는 단어 수로 내 영어가 어디쯤인지, 그 위치에서 무엇을 할 수 있는지 알려 줘요. 2분이면 돼요."),
      h("button",{class:"primary",type:"button",onclick:()=>{ location.hash = "#vocabtest"; }},"어휘 등급 확인하기"));
    return card;
  }
  const next = GRADES[gradeIdx(g) + 1];
  const det = h("details",{class:"gdet",open:true}, h("summary",{}, gradeEmblem(g, 44), h("b",{}, g.id), h("span",{class:"chip now"},"현재 등급")), h("p",{}, g.can));
  card.append(det, h("p",{class:"ctx"}, `아는 단어 약 ${n.toLocaleString()}개` + (next ? ` · ${next.id}까지 약 ${Math.max(10, next.min - n).toLocaleString()}개` : " · 최고 등급이에요!")));
  if (next) card.append(h("details",{class:"gdet next"}, h("summary",{}, gradeEmblem(next, 32), h("b",{}, next.id), h("span",{class:"chip"},"다음 등급")), h("p",{}, next.can)));
  card.append(h("p",{class:"ctx"}, `${S.vgrade.d} 테스트 결과에, 그 뒤로 앱에서 익힌 단어를 더한 추정치예요.`),
    h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash = "#vocabtest"; }},"다시 테스트하기"));
  return card;
}

/* #vocabtest: 50 real words from five frequency bands + 10 pseudowords, shuffled; "알아요" on a dictionary word is spot-checked now and then */
function viewVocabTest(app){
  const items = shuffle([
    ...VOCAB_TEST.bands.flatMap((list, b) => shuffle(list.slice()).slice(0, PER_BAND).map(w => ({w, band:b}))),
    ...shuffle(VOCAB_TEST.fakes.slice()).slice(0, N_FAKES).map(w => ({w, fake:true}))]);
  const answers = []; let i = 0, checks = 0;
  const intro = () => {
    app.replaceChildren();
    const m = mascot(110, "happy"); speaker = m;
    app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"},"새로운 실력 지표"), h("h1",{class:"title"},"어휘 등급"),
      h("p",{class:"muted"},"CEFR(유럽 공통 언어 기준)을 바탕으로 내 영어가 어디쯤인지, 그 위치에서 무엇을 할 수 있는지 알려 줘요. 등급은 모두 10개예요.")),
      h("section",{class:"card-s"}, gradeScale(currentGrade()),
        h("p",{class:"ctx"},"단어 60개가 하나씩 나와요. 뜻을 대충이라도 말할 수 있으면 '알아요', 아니면 '몰라요'를 눌러요."),
        h("p",{class:"ctx"},"사실 없는 가짜 단어도 섞여 있어요. 모르는 걸 안다고 하면 등급이 오히려 내려가요. 가끔 뜻을 확인하는 문제도 나와요.")));
    const go = h("button",{class:"primary",type:"button"},"시작하기 (약 2분)"); go.onclick = () => { sfx("tap"); setFocusMode(true); item(); };
    actionBar(go);
  };
  const item = () => {
    app.replaceChildren(); stopDict();
    if (i >= items.length) return result();
    const it = items[i];
    app.append(h("div",{class:"topbar"}, h("button",{class:"x","aria-label":"그만하기",onclick:()=>{ location.hash = "#me"; }},"×"),
      h("div",{class:"prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(items.length),"aria-valuenow":String(i)}, h("i",{style:`width:${Math.max(4, i/items.length*100)}%`})), h("span",{class:"chip"}, `${i+1}/${items.length}`)));
    const box = h("section",{class:"task"}); app.append(box);
    asker(box, "이 단어 알아?");
    box.append(h("div",{class:"wordbig vt-word",style:"text-align:center;margin:18px 0"}, it.w));
    const ans = yes => { sfx("tap"); haptic(8);
      const entry = !it.fake && yes && WORDS[it.w];
      if (entry && checks < 6 && Math.random() < .35) { checks++; return spot(it, entry); }
      answers.push({...it, yes}); i++; item(); };
    actionBar(h("button",{class:"ghost",type:"button","data-act":"no",onclick:()=>ans(false)},"몰라요"), h("button",{class:"primary",type:"button","data-act":"yes",onclick:()=>ans(true)},"알아요"));
  };
  /* a quick meaning check keeps "알아요" honest; a wrong pick counts the word as unknown */
  const spot = (it, entry) => {
    app.querySelectorAll(".actionbar").forEach(x => x.remove());
    const box = app.querySelector(".task"); box.querySelectorAll(".bubble h2").forEach(x => x.textContent = "그럼 뜻은?");
    const pool = shuffle(Object.values(WORDS).filter(x => x.w !== it.w && x.ko !== entry.ko && x.pos === entry.pos)).slice(0, 3);
    const wrap = h("div",{class:"opts"});
    shuffle([entry, ...pool]).forEach(o => wrap.append(h("button",{class:"opt",type:"button",onclick:ev => {
      const ok = o.w === it.w; wrap.querySelectorAll("button").forEach(b => b.disabled = true); ev.currentTarget.classList.add(ok ? "right" : "wrong");
      sfx(ok ? "ding" : "bloop"); answers.push({...it, yes: ok, checked:true}); i++; setTimeout(item, 650); }}, o.ko)));
    box.append(wrap);
  };
  const result = () => {
    setFocusMode(false); app.replaceChildren();
    const {rates, fa} = testRates(answers);
    const prev = S.vgrade ? currentGrade() : null;
    S.vgrade = {d:dayKey(), t:Date.now(), rates:rates.map(r => +r.toFixed(3)), fa:+fa.toFixed(2), base:learnedBands(), grade:null};
    const n = vocabSize(), g = gradeOf(n); S.vgrade.grade = g.id; S.vgrade.top = g.id;
    S.vgradeHist = [...(S.vgradeHist||[]), {d:dayKey(), size:n, grade:g.id, test:true}].slice(-40); save(); track("vocab_test");
    const m = mascot(110, "happy"); speaker = m; confetti(); sfx("fanfare");
    app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"},"내 어휘 등급"), gradeEmblem(g, 84), h("h1",{class:"big"}, g.id),
      h("p",{class:"muted"}, `아는 단어 약 ${n.toLocaleString()}개` + (prev && prev.id !== g.id ? ` · 지난번 ${prev.id}` : ""))));
    app.append(h("section",{class:"card-s"}, gradeScale(g), h("h2",{class:"sec-h"},"지금 할 수 있는 것"), h("p",{}, g.can),
      fa >= .3 ? h("p",{class:"note"}, h("span",{class:"chip warn"}, `가짜 단어 ${Math.round(fa*N_FAKES)}개를 안다고 했어요`), " 그만큼 점수를 깎아 계산했어요. 다음엔 확실히 아는 단어만 '알아요'를 눌러 봐요.") : ""));
    const bars = h("section",{class:"card-s"}, h("h2",{class:"sec-h"},"빈도 구간별로 아는 비율"));
    rates.forEach((r, b) => bars.append(h("div",{class:"hbar"}, h("span",{}, `${b*1000+1}~${(b+1)*1000}위`), h("span",{class:"t"}, h("i",{style:`width:${Math.round(r*100)}%`})), h("span",{class:"v"}, Math.round(r*100)+"%"))));
    bars.append(h("p",{class:"ctx"},"자주 쓰는 순서로 1,000단어씩 묶었어요. 비율이 처음 크게 떨어지는 구간이 지금 공부하기 가장 좋은 단어들이에요."));
    app.append(bars);
    app.append(h("button",{class:"cta",onclick:()=>{ location.hash = "#me"; }}, h("div",{}, h("b",{},"확인"), h("span",{},"앱에서 단어를 익힐수록 등급이 올라가요")), h("span",{class:"arrow","aria-hidden":"true"},"→")));
  };
  intro();
}
