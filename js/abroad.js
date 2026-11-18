/* 재잘 · 해외살이: ears first. Each scene plays with no subtitles; the learner acts on what they heard and sees what happens.
   Help comes one rung at a time (slower → key words → subtitles → translation). Like real life, you can ask for one repeat:
   a scene counts as "heard by ear" only when the first action was right, no help was used, and it was heard at most twice. Classic script: shares globals with the other js/ files. */
"use strict";
const EP_ICON = {arrive:"✈️", cafe:"☕", neighbor:"🏠", pharmacy:"💊", transit:"🚋", firstday:"💼"};
const EAR_HELP = ["천천히 듣기", "핵심 단어 보기", "영어 자막 보기", "한국어 번역 보기"];
let abroad = null;
function earState(){ if (!S.ear) S.ear = {clean:0, scenes:0, eps:{}, firstListens:[]}; return S.ear; }
function markSceneSeen(episode, index){
  const ear = earState(), seen = ear.seen || (ear.seen = {});
  const key = episode + ":" + index;
  if (seen[key] || ear.eps[episode]) return false;
  seen[key] = true;
  save();
  return true;
}
/* Share of the last 30 first encounters understood without help. */
function earRate(){ const r = (S.ear && S.ear.firstListens) || []; return r.length ? Math.round(r.reduce((a,b)=>a+b,0) / r.length * 100) : null; }
/* open: the first one, anything at or below my level, and the one after each finished episode */
const epUnlocked = i => i === 0 || LEVELS.indexOf(EPISODES[i].lvl) <= LEVELS.indexOf(myLevel()) || !!(S.ear && S.ear.eps && S.ear.eps[EPISODES[i-1].id]);

function viewAbroad(app){
  abroad = null;
  const ear = S.ear || {}, rate = earRate();
  /* a travel diary, not a syllabus: a boarding pass on top, then the days of the stay as stops on a route */
  const done = EPISODES.filter(e => S.ear && S.ear.eps && S.ear.eps[e.id]).length;
  app.append(h("p",{class:"eyebrow trip-eyebrow"},"귀 트이기 · 앵두와 해외살이"));
  app.append(h("section",{class:"pass","aria-label":`서울에서 시애틀, 체류 ${done+1}일째`},
    h("div",{class:"pass-main"},
      h("div",{class:"pass-row"}, h("div",{}, h("b",{},"ICN"), h("span",{},"서울")), h("div",{class:"pass-plane","aria-hidden":"true"},"✈"), h("div",{}, h("b",{},"SEA"), h("span",{},"시애틀"))),
      h("div",{class:"pass-meta"}, h("span",{}, h("small",{},"승객"), "나 + 앵두"), h("span",{}, h("small",{},"체류"), `${done+1}일째`), h("span",{}, h("small",{},"좌석"), "귀 트이기"))),
    h("div",{class:"pass-stub"}, h("div",{class:"stamp-ring"+(rate==null?" empty":"")}, h("b",{}, rate==null ? "–" : rate+"%"), h("span",{},"처음 듣기")))));
  app.append(h("p",{class:"muted trip-lead"}, rate==null ? "막 도착했어요. 자막 없이 먼저 듣고, 들은 대로 움직여 보세요. 못 알아들으면 이야기 속에서 일이 꼬여요."
    : `처음 들은 최근 ${Math.min(30,(ear.firstListens||[]).length)}장면 중 ${rate}%를 도움 없이 두 번 안에 알아들었어요.`));
  const route_ = h("ol",{class:"route"});
  EPISODES.forEach((e, i) => {
    const rec = (S.ear && S.ear.eps && S.ear.eps[e.id]) || null, open = epUnlocked(i);
    const state = rec ? "done" : open ? "open" : "fog";
    route_.append(h("li",{class:"stop "+state},
      h("span",{class:"pin","aria-hidden":"true"}, EP_ICON[e.id] || "📍"),
      h("button",{class:"postcard",type:"button","data-ep":e.id,disabled:!open,"aria-label":`Day ${i+1} ${e.t}${rec ? `, ${rec.best}/${e.scenes.length} 장면 귀로 해결` : open ? "" : ", 아직 못 가 본 곳"}`,
        onclick:()=>{ sfx("tap"); startEpisode(e); }},
        h("span",{class:"day"}, `DAY ${i+1} · ${e.lvl}`),
        h("b",{class:"pc-t"}, e.t),
        h("span",{class:"pc-d"}, open ? e.d : "앞 이야기를 들으면 갈 수 있어요"),
        rec ? h("span",{class:"pc-stamp"}, `귀로 해결 ${rec.best}/${e.scenes.length}`) : open ? h("span",{class:"pc-go"}, "들으러 가기 →") : "")));
  });
  app.append(route_);
  app.append(h("p",{class:"note"}, h("span",{class:"chip"}, hasClips() ? "원어민 음성 녹음 · 기기 음성 아님" : "기기 음성")));
}

function startEpisode(e, quick=false){ abroad = {e, i:0, res:[], quick}; renderScene(); }
function renderScene(){
  const app = $("#app"); app.replaceChildren(); setFocusMode(true); hush();
  const a = abroad, e = a.e; if (a.i >= e.scenes.length) return renderEpisodeEnd();
  const sc = e.scenes[a.i]; const st = {help:0, tries:0, solved:false, replays:0, heard:false}; a.cur = st;
  app.append(h("div",{class:"topbar"}, h("button",{class:"x","aria-label":"그만하기",onclick:()=>{ abroad = null; location.hash = a.quick ? "#home" : "#abroad"; route(); }},"×"),
    h("div",{class:"prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(a.quick ? 1 : e.scenes.length),"aria-valuenow":String(a.i)}, h("i",{style:`width:${Math.max(4, a.i/e.scenes.length*100)}%`}))));
  const box = h("section",{class:"task scene"}); app.append(box);
  box.append(h("div",{class:"row"}, h("span",{class:"chip place"}, sc.place), h("span",{class:"chip"}, `${a.i+1}/${a.quick ? 1 : e.scenes.length}`)), h("p",{class:"scene-ctx"}, sc.ctx));
  const who = [...new Set(sc.lines.map(l=>l.who))].map(w=>e.cast[w].name).join(", ");
  const m = mascot(56, "think"); speaker = null;
  /* a newer play (or leaving the scene) stops an older one between lines */
  const active = () => abroad === a && a.cur === st && box.isConnected;
  const playAll = async (rate, btn) => {
    const run = st.run = (st.run || 0) + 1;
    for (const [index, line] of sc.lines.entries()) {
      if (index) await new Promise(resolve => setTimeout(resolve, 350));
      if (!active() || st.run !== run || st.solved) return;
      const played = await say(line.en, rate, btn, null, {exact:true});
      if (!active() || st.run !== run || st.solved) return;
      if (!played) { replayNote.textContent = "음성이 재생되지 않았어요. 다시 듣거나 도움을 열어 보세요."; return; }
    }
    if (!st.heard) st.firstListen = markSceneSeen(e.id, a.i);
    st.heard = true;
  };
  const play = h("button",{class:"speak jumbo",type:"button","aria-pressed":"false","aria-label":"다시 듣기",html:ICON.spk+"<span>다시 듣기</span>"});
  /* the automatic first play is free, so is one "say that again?"; more replays still work but are recorded */
  const replayNote = h("div",{class:"ctx"}, "자막 없이 들어 보세요. 실제 대화처럼 한 번은 다시 말해 달라고 할 수 있어요.");
  play.onclick = () => { if (!st.solved) { st.replays++; if (st.replays === 2) replayNote.textContent = "여러 번 들었어요. 괜찮아요, 대신 이번 장면은 '여러 번 듣고 해결'로 기록돼요."; } playAll(1, play); };
  box.append(h("div",{class:"listen-card"}, m, h("div",{style:"min-width:0;flex:1"}, h("div",{class:"who"}, who), replayNote), play));
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
  setTimeout(() => { if (active() && !st.run && !st.solved) playAll(1, play); }, 400);
}
function solved(box, sc, st, m){
  const a = abroad, e = a.e; const clean = st.heard && st.tries === 0 && st.help === 0 && st.replays <= 1;
  a.res.push({clean, tries:st.tries, help:st.help, replays:st.replays});
  const ear = earState();
  if (!st.heard) markSceneSeen(e.id, a.i);
  if (st.firstListen) {
    ear.firstListens = [...(ear.firstListens || []), Number(clean)].slice(-30);
    save();
  }
  setMood(m, "happy"); sfx(clean ? "ding" : "tap"); haptic(15);
  $("#app").querySelectorAll(".actionbar").forEach(x=>x.remove());
  const inner = h("div",{class:"in"}, h("div",{class:"head"}, mascot(44, "happy"), h("span",{}, clean ? "도움 없이 알아들었어!" : !st.heard ? "장면 해결 · 듣기 점수 미반영" : st.help >= 3 ? "자막 보고 해결! 다음엔 귀로만 해 보자" : st.tries === 0 && st.help === 0 ? "여러 번 듣고 해결! 다음엔 두 번 안에 잡아 보자" : "해결! 조금만 더 들으면 귀로만 될 거야")));
  inner.append(h("div",{class:"subs"}, ...sc.lines.map(l=>h("div",{class:"sub-line"}, h("p",{class:"prompt-en"}, h("b",{class:"spk-name"}, e.cast[l.who].name+" "), tapText(l.en, {en:l.en, ko:l.ko})), h("p",{class:"ctx"}, l.ko)))));
  inner.append(h("div",{class:"row"}, ...sc.lines.map((l,k)=>speakBtn(l.en, sc.lines.length > 1 ? `${k+1}번 다시 듣기` : "다시 듣기"))));
  if (sc.tip) inner.append(h("div",{class:"ctx tip"}, "귀 팁 · "+sc.tip));
  const next = h("button",{class:"primary",onclick:()=>{ sfx("tap"); if (a.quick) return renderCafeReply(); a.i++; renderScene(); }}, a.quick ? "영어로 답해 보기" : a.i+1 >= e.scenes.length ? "에피소드 끝내기" : "다음 장면");
  inner.append(next);
  $("#app").append(h("div",{class:"fb "+(clean?"good":"bad"),role:"status"}, inner)); next.focus();
}
function renderEpisodeEnd(){
  const app = $("#app"); app.replaceChildren(); setFocusMode(false);
  const a = abroad, e = a.e, ear = earState();
  const clean = a.res.filter(r=>r.clean).length, total = a.res.length;
  /* The episode best remains available for reviewing familiar scenes. */
  const prev = ear.eps[e.id]; ear.clean = (ear.clean||0) + Math.max(0, clean - (prev ? prev.best : 0)); ear.scenes = (ear.scenes||0) + total;
  ear.eps[e.id] = {best: Math.max(clean, prev ? prev.best : 0), plays: (prev ? prev.plays : 0) + 1, t: Date.now()};
  const xp = addXP(clean * 4 + (total - clean) * 2); track("listen", total); track("abroad_scene", total); checkBadges(); save();
  const m = mascot(110, clean >= total - 1 ? "happy" : "idle");
  const idx = EPISODES.indexOf(e), nextEp = EPISODES[idx+1];
  app.append(h("section",{class:"celebrate"}, m, h("p",{class:"eyebrow"}, `${idx+1}화 · ${e.t}`),
    h("h1",{class:"title"}, clean === total ? "전부 귀로 알아들었어!" : `${total}장면 중 ${clean}장면을 자막 없이!`),
    h("p",{class:"muted"}, `+${xp} XP${earRate() == null ? "" : " · 처음 듣기 " + earRate() + "%"}`),
    h("p",{class:"ctx"}, clean === total ? "실제로 시애틀에 있었어도 문제없었을 거야." : "같은 에피소드를 내일 다시 들어 봐. 두 번째엔 훨씬 잘 들려. 외국에서도 같은 말을 여러 번 들으면서 귀가 트여.")));
  const recap = h("section",{class:"card-s",style:"display:block"}, h("h2",{class:"sec-h"},"오늘 들은 말"), h("p",{class:"tapnote"},"모르는 단어를 눌러 단어장에 담아요"));
  e.scenes.forEach(sc => sc.lines.forEach(l => recap.append(h("div",{class:"sub-line"}, h("div",{class:"row",style:"justify-content:space-between;flex-wrap:nowrap"}, h("p",{class:"prompt-en",style:"margin:0"}, tapText(l.en, {en:l.en, ko:l.ko})), speakBtn(l.en, "듣기")), h("p",{class:"ctx"}, l.ko)))));
  app.append(recap);
  const again = h("button",{class:"ghost",type:"button",onclick:()=>{ sfx("tap"); startEpisode(e); }},"다시 듣기");
  const go = h("button",{class:"primary",onclick:()=>{ sfx("tap"); if (nextEp) startEpisode(nextEp); else { abroad = null; location.hash = "#abroad"; route(); } }}, nextEp ? `${idx+2}화 · ${nextEp.t}` : "에피소드 목록");
  actionBar(again, go);
  abroad = null; setTimeout(flushCelebration, 600);
}

function renderCafeReply(){
  const app = $("#app"); app.replaceChildren(); hush(); abroad = null;
  const box = h("section",{class:"task"}); app.append(box);
  header(box, "바리스타에게 영어로 답해 볼래?");
  box.append(h("p",{class:"prompt-ko"},"아몬드 우유로 아이스 라떼를 주문해 보세요."),
    h("div",{class:"row"}, speakBtn("Hot or iced?","질문 다시 듣기")));
  const example = "An iced latte with almond milk, please.";
  answerBox(box, "영어로 답하기", answer => {
    app.querySelector(".actionbar")?.remove();
    const words = toks(answer);
    const order = ["iced","latte","almond"].every(word=>words.includes(word)) && !words.some(word=>["no","not","without","hot"].includes(word));
    box.append(h("section",{class:"card-s",role:"status"},
      h("h2",{class:"sec-h"}, order ? "주문에 필요한 말을 담았어요" : "예문을 듣고 한 번 더 말해 보세요"),
      h("p",{class:"prompt-en"}, example), h("div",{class:"row"}, speakBtn(example,"예문 듣기")),
      h("button",{class:"ghost",type:"button",onclick:renderCafeReply},"다시 답하기")));
    actionBar(h("button",{class:"primary",onclick:()=>{ location.hash="#talk-cafe"; }},"AI 상황극에서 더 말하기"),
      h("button",{class:"ghost",onclick:()=>{ location.hash="#home"; }},"홈으로"));
  });
  box.append(h("button",{class:"ghost",type:"button",onclick:()=>{ location.hash="#home"; }},"말하기 건너뛰고 홈으로"));
}
