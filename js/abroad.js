/* 재잘 · 해외살이: ears first. Each scene plays with no subtitles; the learner acts on what they heard and sees what happens.
   Help comes one rung at a time (slower → key words → subtitles → translation); a scene counts as "heard by ear" when the first
   action was right and no more than the slower replay was used. Classic script: shares globals with the other js/ files. */
"use strict";
const EAR_HELP = ["천천히 듣기", "핵심 단어 보기", "영어 자막 보기", "한국어 번역 보기"];
let abroad = null;
function earState(){ if (!S.ear) S.ear = {clean:0, scenes:0, eps:{}, recent:[]}; return S.ear; }
/* share of the last 30 scenes understood without subtitles */
function earRate(){ const r = (S.ear && S.ear.recent) || []; return r.length ? Math.round(r.reduce((a,b)=>a+b,0) / r.length * 100) : null; }
/* open: the first one, anything at or below my level, and the one after each finished episode */
const epUnlocked = i => i === 0 || LEVELS.indexOf(EPISODES[i].lvl) <= LEVELS.indexOf(myLevel()) || !!(S.ear && S.ear.eps && S.ear.eps[EPISODES[i-1].id]);

function viewAbroad(app){
  abroad = null;
  const ear = S.ear || {}, rate = earRate();
  app.append(h("div",{class:"top"}, h("div",{}, h("p",{class:"eyebrow"},"귀 트이기"), h("h1",{class:"title"},"앵두와 해외살이")), mascot(48, "happy")));
  app.append(h("p",{class:"muted"},"시애틀에 막 이사 왔어요. 자막 없이 먼저 듣고, 들은 대로 움직여 보세요. 못 알아들으면 이야기 속에서 일이 꼬여요."));
  app.append(h("section",{class:"card-s earmeter"},
    h("div",{class:"ring",html:ringSvg((rate||0)/100, 84, 9, "var(--sky)")}, h("div",{class:"lbl"}, h("b",{}, rate==null ? "–" : rate+"%"), h("span",{},"귀 트임"))),
    h("div",{style:"min-width:0"}, h("b",{}, "자막 없이 알아들은 장면"), h("p",{class:"ctx"}, rate==null ? "첫 에피소드를 들으면 여기에 내 귀 상태가 나와요." : `최근 ${Math.min(30,(ear.recent||[]).length)}장면 중 ${rate}%를 자막 없이 알아들었어요. 지금까지 ${ear.clean||0}장면.`))));
  app.append(h("h2",{class:"sec-h"},"에피소드"));
  EPISODES.forEach((e, i) => {
    const rec = (S.ear && S.ear.eps && S.ear.eps[e.id]) || null, open = epUnlocked(i);
    app.append(h("button",{class:"pu press "+(rec ? "done" : open ? "now" : "next"),type:"button","data-ep":e.id,disabled:!open,"aria-label":`${i+1}화 ${e.t}${rec ? `, ${rec.best}/${e.scenes.length} 장면 알아들음` : open ? "" : ", 잠김"}`,
      onclick:()=>{ sfx("tap"); startEpisode(e); }},
      h("span",{class:"st"}, rec ? "✓" : String(i+1)),
      h("span",{style:"min-width:0"}, h("div",{class:"tg"}, `${i+1}화 · ${e.t}`), h("div",{class:"sb"}, `${e.lvl} · ${e.d}`+(rec ? ` · 최고 ${rec.best}/${e.scenes.length}` : open ? "" : " · 앞 이야기를 들으면 열려요"))),
      h("span",{class:"mono muted","aria-hidden":"true"}, open ? "→" : "🔒")));
  });
  app.append(h("p",{class:"note"}, h("span",{class:"chip"}, hasClips() ? "원어민 음성 녹음 · 기기 음성 아님" : "기기 음성")));
}

function startEpisode(e){ abroad = {e, i:0, res:[]}; renderScene(); }
function renderScene(){
  const app = $("#app"); app.replaceChildren(); setFocusMode(true); hush();
  const a = abroad, e = a.e; if (a.i >= e.scenes.length) return renderEpisodeEnd();
  const sc = e.scenes[a.i]; const st = {help:0, tries:0, solved:false}; a.cur = st;
  app.append(h("div",{class:"topbar"}, h("button",{class:"x","aria-label":"그만하기",onclick:()=>{ abroad = null; location.hash = "#abroad"; route(); }},"×"),
    h("div",{class:"prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(e.scenes.length),"aria-valuenow":String(a.i)}, h("i",{style:`width:${Math.max(4, a.i/e.scenes.length*100)}%`}))));
  const box = h("section",{class:"task scene"}); app.append(box);
  box.append(h("div",{class:"row"}, h("span",{class:"chip place"}, sc.place), h("span",{class:"chip"}, `${a.i+1}/${e.scenes.length}`)), h("p",{class:"scene-ctx"}, sc.ctx));
  const who = [...new Set(sc.lines.map(l=>l.who))].map(w=>e.cast[w].name).join(", ");
  const m = mascot(56, "think"); speaker = null;
  /* a newer play (or leaving the scene) stops an older one between lines */
  const playAll = async (rate=1, btn) => { const run = st.run = (st.run||0) + 1; for (let k = 0; k < sc.lines.length; k++) { if (abroad !== a || a.cur !== st || st.run !== run) return; await say(sc.lines[k].en, rate, btn, null, {exact:true}); if (k < sc.lines.length-1) await new Promise(r=>setTimeout(r, 350)); } };
  const play = h("button",{class:"speak jumbo",type:"button","aria-pressed":"false","aria-label":"다시 듣기",html:ICON.spk+"<span>다시 듣기</span>"});
  play.onclick = () => playAll(1, play);
  box.append(h("div",{class:"listen-card"}, m, h("div",{style:"min-width:0;flex:1"}, h("div",{class:"who"}, who), h("div",{class:"ctx"},"자막 없이 들어 보세요. 몇 번이고 다시 들어도 괜찮아요.")), play));
  /* the help ladder: each press opens one more rung */
  const helpBox = h("div",{class:"helps"}), shown = h("div",{class:"help-shown"});
  const helpBtn = h("button",{class:"ghost",type:"button","data-act":"help"}, EAR_HELP[0]);
  const showHelp = lvl => {
    if (lvl === 1) { const slow = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span>천천히</span>"}); slow.onclick = () => playAll(.75, slow); helpBox.prepend(slow); playAll(.75, slow); }
    if (lvl === 2) shown.append(h("div",{class:"keys"}, h("span",{class:"ctx"},"핵심 단어"), ...sc.keys.map(k=>h("span",{class:"chip key"}, k))));
    if (lvl === 3) shown.append(h("div",{class:"subs"}, ...sc.lines.map(l=>h("p",{class:"prompt-en"}, h("b",{class:"spk-name"}, e.cast[l.who].name+" "), tapText(l.en, {en:l.en, ko:l.ko})))));
    if (lvl === 4) shown.append(h("div",{class:"subs ko"}, ...sc.lines.map(l=>h("p",{class:"ctx"}, l.ko))));
  };
  helpBtn.onclick = () => { if (st.help >= EAR_HELP.length) return; st.help++; sfx("tap"); showHelp(st.help);
    if (st.help >= EAR_HELP.length) helpBtn.remove(); else helpBtn.textContent = EAR_HELP[st.help]; };
  helpBox.append(helpBtn); box.append(helpBox, shown);
  box.append(h("h2",{class:"scene-q"}, sc.q));
  const conseq = h("div",{class:"conseq",role:"status",hidden:true});
  const wrap = h("div",{class:"opts"});
  shuffle(sc.opts).forEach(([label, out]) => wrap.append(h("button",{class:"opt",type:"button",onclick:(ev)=>{
    if (st.solved) return; const b = ev.currentTarget;
    if (out === true) { st.solved = true; b.classList.add("right"); wrap.querySelectorAll("button").forEach(x=>x.disabled=true); conseq.hidden = true; solved(box, sc, st, m); }
    else { st.tries++; b.classList.add("wrong"); b.disabled = true; setMood(m, "oops"); sfx("bloop"); haptic([30,40,30]);
      conseq.hidden = false; conseq.replaceChildren(h("b",{},"이런…"), " "+out, h("span",{class:"ctx"}, " 다시 들어 보고 골라 봐요.")); }
  }}, label)));
  box.append(conseq, wrap);
  setTimeout(() => { if (abroad === a && a.cur === st) play.click(); }, 400);
}
function solved(box, sc, st, m){
  const a = abroad, e = a.e; const clean = st.tries === 0 && st.help <= 1;
  a.res.push({clean, tries:st.tries, help:st.help});
  setMood(m, "happy"); sfx(clean ? "ding" : "tap"); haptic(15);
  $("#app").querySelectorAll(".actionbar").forEach(x=>x.remove());
  const inner = h("div",{class:"in"}, h("div",{class:"head"}, mascot(44, "happy"), h("span",{}, clean ? "자막 없이 알아들었어!" : st.help >= 3 ? "자막 보고 해결! 다음엔 귀로만 해 보자" : "해결! 조금만 더 들으면 귀로만 될 거야")));
  inner.append(h("div",{class:"subs"}, ...sc.lines.map(l=>h("div",{class:"sub-line"}, h("p",{class:"prompt-en"}, h("b",{class:"spk-name"}, e.cast[l.who].name+" "), tapText(l.en, {en:l.en, ko:l.ko})), h("p",{class:"ctx"}, l.ko)))));
  inner.append(h("div",{class:"row"}, ...sc.lines.map((l,k)=>speakBtn(l.en, sc.lines.length > 1 ? `${k+1}번 다시 듣기` : "다시 듣기"))));
  if (sc.tip) inner.append(h("div",{class:"ctx tip"}, "귀 팁 · "+sc.tip));
  const next = h("button",{class:"primary",onclick:()=>{ sfx("tap"); a.i++; renderScene(); }}, a.i+1 >= e.scenes.length ? "에피소드 끝내기" : "다음 장면");
  inner.append(next);
  $("#app").append(h("div",{class:"fb "+(clean?"good":"bad"),role:"status"}, inner)); next.focus();
}
function renderEpisodeEnd(){
  const app = $("#app"); app.replaceChildren(); setFocusMode(false);
  const a = abroad, e = a.e, ear = earState();
  const clean = a.res.filter(r=>r.clean).length, total = a.res.length;
  /* the meter tracks every play; the running total (and its badge) only grows when an episode beats its own best */
  const prev = ear.eps[e.id]; ear.clean = (ear.clean||0) + Math.max(0, clean - (prev ? prev.best : 0)); ear.scenes = (ear.scenes||0) + total;
  ear.recent = [...(ear.recent||[]), ...a.res.map(r=>r.clean?1:0)].slice(-30); ear.eps[e.id] = {best: Math.max(clean, prev ? prev.best : 0), plays: (prev ? prev.plays : 0) + 1, t: Date.now()};
  const xp = addXP(clean * 4 + (total - clean) * 2); track("listen", total); track("abroad_scene", total); checkBadges(); save();
  const m = mascot(110, clean >= total - 1 ? "happy" : "idle");
  const idx = EPISODES.indexOf(e), nextEp = EPISODES[idx+1];
  app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"}, `${idx+1}화 · ${e.t}`),
    h("h1",{class:"title"}, clean === total ? "전부 귀로 알아들었어!" : `${total}장면 중 ${clean}장면을 자막 없이!`),
    h("p",{class:"muted"}, `+${xp} XP · 귀 트임 ${earRate()}%`),
    h("p",{class:"ctx"}, clean === total ? "실제로 시애틀에 있었어도 문제없었을 거야." : "같은 에피소드를 내일 다시 들어 봐. 두 번째엔 훨씬 잘 들려. 외국에서도 같은 말을 여러 번 들으면서 귀가 트여.")));
  const recap = h("section",{class:"card-s",style:"display:block"}, h("h2",{class:"sec-h"},"오늘 들은 말"), h("p",{class:"tapnote"},"모르는 단어를 눌러 단어장에 담아요"));
  e.scenes.forEach(sc => sc.lines.forEach(l => recap.append(h("div",{class:"sub-line"}, h("div",{class:"row",style:"justify-content:space-between;flex-wrap:nowrap"}, h("p",{class:"prompt-en",style:"margin:0"}, tapText(l.en, {en:l.en, ko:l.ko})), speakBtn(l.en, "듣기")), h("p",{class:"ctx"}, l.ko)))));
  app.append(recap);
  const again = h("button",{class:"ghost",type:"button",onclick:()=>{ sfx("tap"); startEpisode(e); }},"다시 듣기");
  const go = h("button",{class:"primary",onclick:()=>{ sfx("tap"); if (nextEp) startEpisode(nextEp); else { abroad = null; location.hash = "#abroad"; route(); } }}, nextEp ? `${idx+2}화 · ${nextEp.t}` : "에피소드 목록");
  actionBar(again, go);
  abroad = null; setTimeout(flushCelebration, 600);
}
