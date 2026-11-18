/* 재잘 · home-screen app: install, backup, share, badge, offline. Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- install as a home-screen app (PWA) ---------- */
let installEvt = null;
const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const canInstall = () => !isStandalone() && (!!installEvt || isIOS() || /Android|Chrome/.test(navigator.userAgent));
/* only relabel the button: re-rendering here would close a celebration sheet that is shown once */
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; document.querySelectorAll('[data-act="install"]').forEach(b => b.textContent = "설치하기"); });
window.addEventListener("appinstalled", () => { installEvt = null; S.installed = true; save(); toast("홈 화면에 재잘을 추가했어!"); if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); if (!inSession()) route(); });
async function installApp(){
  if (installEvt) { const e = installEvt; installEvt = null; e.prompt(); try { const r = await e.userChoice; if (r && r.outcome === "accepted") return; } catch(err) {} return; }
  openSheet("홈 화면에 추가", inner => {
    const steps = isIOS()
      ? ["Safari(또는 iOS 16.4 이상의 Chrome)에서 공유 버튼을 눌러요", "아래로 내려 '홈 화면에 추가'를 골라요", "오른쪽 위 '추가'를 누르면 끝!"]
      : ["Chrome 오른쪽 위 ⋮ 메뉴를 눌러요", "'홈 화면에 추가' 또는 '앱 설치'를 골라요", "'설치'를 누르면 홈 화면에 앵두 아이콘이 생겨요"];
    inner.append(h("section",{class:"celebrate"}, mascot(96,"happy"), h("p",{class:"muted"}, "홈 화면에 추가하면 주소창 없이 앱처럼 열리고, 인터넷이 없어도 연습할 수 있어요.")),
      h("ol",{class:"steps"}, ...steps.map(t=>h("li",{}, t))),
      isIOS() ? h("p",{class:"ctx"},"아이폰은 홈 화면 앱과 Safari의 기록이 따로 저장돼요. 지금까지 기록이 있다면 먼저 내보낸 뒤, 홈 화면 앱에서 '기록 가져오기'로 이어 가세요.") : h("p",{class:"ctx"},"메뉴에 안 보이면 페이지를 한 번 새로고침해 보세요."),
      isIOS() && (S.sessions||0) > 0 ? h("button",{class:"ghost",type:"button",onclick:exportBackup},"1단계: 지금 기록 내보내기") : "",
      h("button",{class:"primary",type:"button",onclick:closeSheet},"알겠어"));
  });
}
function installCard(){
  if (!canInstall() || S.installHide) return null;
  const card = h("section",{class:"card-s install",id:"install-card"},
    h("div",{style:"display:flex;gap:12px;align-items:center"}, h("img",{src:"icons/icon-192.png",alt:"",width:"48",height:"48",style:"border-radius:12px;flex:none"}),
      h("div",{style:"min-width:0"}, h("b",{},"홈 화면에 재잘 추가"), h("div",{class:"ctx"},"앱처럼 바로 열리고, 오프라인에서도 연습할 수 있어요"))),
    h("div",{class:"row"}, h("button",{class:"primary",type:"button","data-act":"install",onclick:installApp}, installEvt ? "설치하기" : "추가하는 방법"),
      h("button",{class:"ghost",type:"button",onclick:()=>{ S.installHide = true; save(); card.remove(); }},"나중에")));
  return card;
}
async function exportBackup(){
  const name = `jaejal-${dayKey()}.json`, json = JSON.stringify(S); S.lastBackup = Date.now(); save();
  const file = typeof File === "function" ? new File([json], name, {type:"application/json"}) : null;
  if (file && isIOS() && navigator.canShare && navigator.canShare({files:[file]})) {
    try { await navigator.share({files:[file], title:"재잘 학습 기록"}); toast("'파일에 저장'을 고르면 보관돼요"); return; } catch(e) { if (e && e.name === "AbortError") return; } }
  const a = h("a",{href:URL.createObjectURL(new Blob([json],{type:"application/json"})),download:name}); document.body.append(a); a.click(); a.remove(); toast("백업 파일을 저장했어요");
}
function importBackup(){
  const file = h("input",{type:"file",hidden:true, accept: isIOS() ? null : "application/json,.json"}); document.body.append(file);
  file.onchange = () => { const f = file.files && file.files[0]; file.remove(); if (!f) return; const rd = new FileReader();
    rd.onload = () => { try { const o = JSON.parse(String(rd.result)); if (!o || typeof o.cards !== "object") throw 0; S = hydrate(o); S.onboarded = true; save(); closeSheet(); toast("학습 기록을 가져왔어요"); route(); } catch(e) { toast("재잘 백업 파일이 아니에요. 다시 골라 주세요."); } };
    rd.readAsText(f); };
  file.click();
}
function backupCard(){
  const DAYMS = 86400000; if ((S.sessions||0) < 5) return null;
  if (Date.now() - (S.lastBackup||0) < 14*DAYMS || Date.now() - (S.backupSnooze||0) < 7*DAYMS) return null;
  const card = h("section",{class:"card-s",id:"backup-card"}, h("b",{},"기록을 백업해 둘까?"),
    h("p",{class:"ctx"}, isIOS() ? "기록은 이 폰 안에만 있어요. 백업하면 폰을 바꾸거나 홈 화면 앱으로 옮길 때 그대로 가져올 수 있어요." : "기록은 이 기기 안에만 있어요. 파일로 백업하면 기기를 바꿔도 이어서 할 수 있어요."),
    h("div",{class:"row"}, h("button",{class:"primary",type:"button",onclick:async()=>{ await exportBackup(); card.remove(); }},"지금 백업"), h("button",{class:"ghost",type:"button",onclick:()=>{ S.backupSnooze = Date.now(); save(); card.remove(); }},"나중에")));
  return card;
}
/* home-screen icon number (iOS 16.4+ home-screen apps with notification permission; desktop/Android Chrome) */
function updateAppBadge(){ if (!("setAppBadge" in navigator)) return; try {
  if (!S.settings.badge) { navigator.clearAppBadge(); return; }
  const now = Date.now(); const n = dueList().length + Object.keys(S.words||{}).filter(w => S.cards["w:"+w] && S.cards["w:"+w].due <= now).length;
  (n ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(()=>{}); } catch(e) {} }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") { if (saveQueued) flushSave(); updateAppBadge(); } });
/* share a progress card as an image (iOS share sheet → 카톡, 인스타 등) */
async function mascotImage(size){
  const el = mascot(size, "happy"); el.querySelectorAll(".tear,.brows,.steam,.vein,.flush").forEach(x=>x.remove());
  el.setAttribute("xmlns","http://www.w3.org/2000/svg"); el.setAttribute("width", size); el.setAttribute("height", size); el.removeAttribute("style"); el.removeAttribute("class");
  const img = new Image(); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(el.outerHTML); await img.decode(); return img;
}
async function shareCard(){
  try {
    const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d");
    try { await Promise.all([document.fonts.load('120px "Jua"'), document.fonts.load('44px "IBM Plex Sans KR"')]); } catch(e) {}
    g.fillStyle = "#F2F8F4"; g.fillRect(0, 0, W, H);
    g.fillStyle = "#BFF0DC"; g.beginPath(); g.roundRect ? g.roundRect(90, 110, 900, 1000, 64) : g.rect(90, 110, 900, 1000); g.fill();
    g.drawImage(await mascotImage(440), 320, 150, 440, 440);
    const st = streakNow(), words = Object.keys(S.words||{}).length, nb = Object.keys(S.badges||{}).length;
    g.textAlign = "center"; g.fillStyle = "#1F2A26"; g.font = '150px "Jua", sans-serif'; g.fillText(st ? `${st}일 연속!` : `${S.sessions||0}번째 5분`, 540, 760);
    g.font = '46px "IBM Plex Sans KR", sans-serif'; g.fillStyle = "#3C4A45";
    g.fillText(`입에 붙은 표현 ${knownChunks()}개 · 단어 ${words}개`, 540, 860); g.fillText(`배지 ${nb}개 · 레벨 ${myLevel()}`, 540, 930);
    g.fillStyle = "#1F9B71"; g.font = '64px "Jua", sans-serif'; g.fillText("재잘 · 하루 5분 영어 말문", 540, 1220);
    const blob = await new Promise(r => c.toBlob(r, "image/png")); const file = new File([blob], "jaejal.png", {type:"image/png"});
    const url = location.href.split("#")[0].split("?")[0];
    if (navigator.canShare && navigator.canShare({files:[file]})) { try { await navigator.share({files:[file], text:`재잘로 영어 말문 트는 중! ${url}`}); } catch(e) {} return; }
    const a = h("a",{href:URL.createObjectURL(blob),download:"jaejal.png"}); document.body.append(a); a.click(); a.remove(); toast("기록 카드를 저장했어요");
  } catch(e) { toast("카드를 만들지 못했어요"); }
}
/* text shared from other apps (Android share sheet → 재잘) */
function openShared(raw){
  const text = raw.replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim().slice(0, 400); if (!text) return;
  const first = (text.match(/[^.!?]+[.!?]?/) || [text])[0].trim().slice(0, 140);
  openSheet("공유한 문장", inner => {
    const en = h("textarea",{rows:"2","aria-label":"담을 영어 문장"}); en.value = first;
    const ko = h("input",{type:"text",class:"field",placeholder:"한국어 뜻 (내가 알아볼 수 있게)","aria-label":"한국어 뜻"});
    const saveBtn = h("button",{class:"primary",type:"button","data-act":"save-shared"},"내 표현으로 담기");
    saveBtn.onclick = () => { if (!ko.value.trim()) { toast("한국어 뜻을 적어 주세요"); ko.focus(); return; }
      const n = addCustom([{en:en.value, ko:ko.value}], "내 표현", myLevel(), "공유로 담음"); closeSheet(); toast(n ? "표현함에 담았어! 다음 세션부터 연습해요" : "이미 있는 표현이에요"); };
    inner.append(h("p",{class:"tapnote"},"모르는 단어는 눌러서 단어장에 담아요"), h("p",{style:"font-weight:700;line-height:1.7"}, tapText(text, {en:first, ko:""})),
      h("div",{class:"ctx"},"연습할 문장"), en, ko, saveBtn);
    if (llm.engine) llmJSON('Translate the English sentence into natural Korean. Answer as JSON {"ko": "..."}.', en.value, 120).then(r => { if (r && r.ko && !ko.value) ko.value = String(r.ko); }).catch(()=>{});
  });
}
/* speech recognition needs a network in Chrome/Safari: switch to typing while offline */
function syncOnline(){ const off = !navigator.onLine;
  if (off && caps.dict) { caps.dict = false; caps.dictOffline = true; refreshMics(); }
  else if (!off && caps.dictOffline) { caps.dict = true; caps.dictOffline = false; refreshMics(); } }
addEventListener("online", syncOnline); addEventListener("offline", () => { syncOnline(); toast("오프라인이에요. 말하기 대신 타이핑으로 진행해요."); });
syncOnline();
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{}));
if (isStandalone() && navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(()=>{});
