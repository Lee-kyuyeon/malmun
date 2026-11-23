/* 재잘 · on-device dictionary search over every word (English or Korean meaning, forms, one-typo tolerance) and every chunk.
   Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
let DICT_INDEX = null;
function dictIndex(){
  if (DICT_INDEX) return DICT_INDEX;
  DICT_INDEX = { words: Object.values(WORDS).map(e => ({e, en:e.w, ko:String(e.ko||"").toLowerCase()})),
    chunks: allCards().map(c => ({c, en:c.en.toLowerCase(), ko:c.ko||""})) };
  return DICT_INDEX;
}
/* true when a and b differ by at most one insertion, deletion, substitution or swap of neighbours (recieve → receive) */
function oneEdit(a, b){
  if (a === b) return true; const la = a.length, lb = b.length; if (Math.abs(la - lb) > 1) return false;
  if (la === lb) { const d = []; for (let k = 0; k < la; k++) if (a[k] !== b[k]) d.push(k);
    if (d.length === 2 && d[1] === d[0] + 1 && a[d[0]] === b[d[1]] && a[d[1]] === b[d[0]]) return true; }
  let i = 0, j = 0, diff = 0;
  while (i < la && j < lb) { if (a[i] === b[j]) { i++; j++; continue; } if (++diff > 1) return false;
    if (la > lb) i++; else if (lb > la) j++; else { i++; j++; } }
  return diff + (la - i) + (lb - j) <= 1;
}
function dictSearch(raw){
  const q = String(raw||"").trim().toLowerCase().replace(/[’]/g,"'"); if (!q) return null;
  const ix = dictIndex(); let words = [], fuzzy = false, chunks;
  if (/[가-힣]/.test(q)) {
    words = ix.words.filter(x => x.ko.includes(q)).sort((a,b) => (b.ko.startsWith(q) - a.ko.startsWith(q)) || a.e.band - b.e.band || a.en.length - b.en.length).map(x => x.e);
    chunks = ix.chunks.filter(x => x.ko.includes(q));
  } else {
    /* an inflected form finds its headword: listed forms first, then common endings (borrowed → borrow, studies → study) */
    const stems = [q, q.replace(/ies$/,"y"), q.replace(/(ed|es|s|ing|er|est)$/,""), q.replace(/(d|ing)$/,""), q.replace(/(.)\1(ed|ing)$/,"$1"), q.replace(/ing$/,"e")];
    const owner = /^[a-z'-]+$/.test(q) ? stems.map(x => WORD_FORM.get(x) || WORDS[x]).find(Boolean) || null : null;
    words = ix.words.filter(x => x.en.startsWith(q)).sort((a,b) => (a.en === q ? -1 : b.en === q ? 1 : 0) || a.e.band - b.e.band || a.en.length - b.en.length).map(x => x.e);
    if (owner && !words.includes(owner)) words.unshift(owner);
    if (!words.length && q.length >= 4) { words = ix.words.filter(x => oneEdit(x.en, q)).map(x => x.e); fuzzy = words.length > 0; }
    chunks = q.length >= 2 ? ix.chunks.filter(x => x.en.includes(q)) : [];
  }
  return {q, words: words.slice(0, 30), moreWords: Math.max(0, words.length - 30), chunks: chunks.slice(0, 20).map(x => x.c), moreChunks: Math.max(0, chunks.length - 20), fuzzy};
}
/* the search box on top of 표현함; results replace the list while there is a query */
function dictSearchBox(body){
  const input = h("input",{type:"search",class:"dict-q",placeholder:"단어·표현 검색 (영어 또는 한글 뜻)","aria-label":"사전 검색",autocomplete:"off",autocapitalize:"off",spellcheck:"false",enterkeyhint:"search"});
  const out = h("div",{class:"dict-out",id:"dict-results","aria-live":"polite"});
  let timer = null;
  const draw = () => {
    const r = dictSearch(input.value); out.replaceChildren(); body.hidden = !!r; if (!r) return;
    out.append(h("p",{class:"ctx"}, `단어 ${r.words.length + r.moreWords}개 · 표현 ${r.chunks.length + r.moreChunks}개` + (r.fuzzy ? " · 비슷한 철자로 찾았어요" : "")));
    if (r.words.length) out.append(h("div",{class:"cards"}, ...r.words.map(e => h("button",{class:"card dict-row",type:"button","data-w":e.w,onclick:()=>{ sfx("tap"); openWord(e.w); }},
      h("div",{class:"en"}, e.w, " ", e.ipa ? h("span",{class:"ipa",style:"font-size:13px;font-weight:400"}, e.ipa) : "", hasWord(e.w) ? h("span",{class:"chip ok",style:"margin-left:6px;font-weight:400"},"담음") : ""),
      h("div",{class:"ko"}, `${e.pos} · ${e.ko}`)))));
    if (r.chunks.length) out.append(h("h2",{class:"sec-h"},"표현"), h("div",{class:"cards"}, ...r.chunks.map(c => h("button",{class:"card dict-row",type:"button",onclick:()=>say(c.en,1),"aria-label":c.en+" 듣기"},
      h("div",{class:"en"}, c.en), h("div",{class:"ko"}, `${c.ko} · ${c.tag} ${c.lvl}`)))));
    if (!r.words.length && !r.chunks.length) {
      const asWord = /^[a-z][a-z'-]{2,}$/.test(r.q);
      out.append(h("p",{class:"muted"}, "찾는 단어가 사전에 없어요."), asWord && llm.engine ? h("button",{class:"ghost",type:"button",onclick:()=>openWord(r.q)}, `앵두에게 '${r.q}' 물어보기`) : "");
    }
  };
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(draw, 120); });
  input.addEventListener("keydown", e => { if (e.key === "Escape") { input.value = ""; draw(); } });
  return h("div",{class:"dict-box"}, input, out);
}
