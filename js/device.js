/* 재잘 · speech in/out, on-device LLM (WebLLM). Classic script: shares globals with the other js/ files, loaded in order by index.html; call functions from later files only inside functions, never at load time. */
"use strict";
/* ---------- device features (all optional; the core loop works with none) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const caps = { dict: !!SR, ready: true };
try { localStorage.setItem("malmun.probe","1"); localStorage.removeItem("malmun.probe"); store.ok = true; } catch(e) {}

/* speech out: the device's own English voice */
let enVoice = null;
function pickVoice(){ try { const vs = speechSynthesis.getVoices(); enVoice = vs.find(v=>/en[-_]US/i.test(v.lang)&&/Samantha|Google|Natural|Aria|Jenny|Ava|Allison/i.test(v.name)) || vs.find(v=>/^en[-_]US/i.test(v.lang)) || vs.find(v=>/^en/i.test(v.lang)) || null; } catch(e){} }
try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch(e) {}
function canSpeak(){ return "speechSynthesis" in window; }
async function say(text, rate=1, btn, who){
  if (!canSpeak()) return;
  const m = who || speaker;
  if (btn) btn.setAttribute("aria-pressed","true");
  let flap = null;
  await new Promise(res => { try {
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang="en-US"; if (enVoice) u.voice=enVoice; u.rate = rate * (S.settings.rate||1);
    u.onstart = () => { if (m) { setMood(m,"talk"); flap = setInterval(()=>m.classList.toggle("open", Math.random() > .35), 120); } };
    u.onboundary = () => { if (m) { m.classList.add("open"); setTimeout(()=>m.classList.remove("open"), 90); } };
    u.onend = res; u.onerror = res; speechSynthesis.speak(u); setTimeout(res, 12000);
  } catch(_) { res(); } });
  clearInterval(flap); if (m) { m.classList.remove("open"); if (m.classList.contains("talk")) setMood(m,"idle"); }
  if (btn) btn.setAttribute("aria-pressed","false");
}
function speakBtn(text, label="듣기", rate=1){ const b = h("button",{class:"speak",type:"button","aria-pressed":"false",html:ICON.spk+"<span></span>"}); b.querySelector("span").textContent=label; b.onclick=()=>say(text,rate,b); return b; }

/* speech in: the browser's speech recognition (Chrome on Android, Safari on iOS 14.5+) */
let rec = null;
function refreshMics(){ document.querySelectorAll(".mic").forEach(m=>m.hidden=!caps.dict); }
function micFor(field){
  const b = h("button",{class:"mic",type:"button","aria-label":"말해서 입력",html:ICON.mic});
  b.hidden = !caps.dict;
  b.onclick = () => {
    if (rec) { try { rec.stop(); } catch(e){} return; }
    try { speechSynthesis.cancel(); } catch(e){}
    const r = new SR(); rec = r;
    r.lang = "en-US"; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    const base = field.value.trim() ? field.value.trim()+" " : "";
    /* speaking time for fluency (WPM): from the first recognized sound to the last result */
    let tFirst = 0, tLast = 0;
    r.onresult = e => { let fin = "", inter = ""; const now = Date.now(); if (!tFirst) tFirst = now; tLast = now;
      for (let i=0;i<e.results.length;i++){ const x = e.results[i]; if (x.isFinal) fin += x[0].transcript; else inter += x[0].transcript; }
      field.value = (base + fin).trim(); field.placeholder = inter || "듣고 있어요…"; field.dispatchEvent(new Event("input")); };
    r.onerror = e => {
      if (e.error==="not-allowed"||e.error==="service-not-allowed") { caps.dict = false; refreshMics(); toast("마이크 권한이 없어 타이핑으로 진행해요."); }
      else if (e.error==="no-speech") toast("소리가 들리지 않았어요. 다시 눌러 말해 주세요.");
      else if (e.error==="network") toast("음성인식에 인터넷 연결이 필요해요.");
    };
    r.onend = () => { b.classList.remove("live"); field.placeholder = field.dataset.ph || ""; if (rec === r) rec = null;
      if (tFirst && tLast > tFirst) field.dataset.speechMs = String(Number(field.dataset.speechMs||0) + (tLast - tFirst) + 400);
      if (typeof field._onSpoken === "function" && field.value.trim()) field._onSpoken(); };
    try { r.start(); b.classList.add("live"); field.placeholder = "듣고 있어요…"; } catch(e) { rec = null; }
  };
  return b;
}
async function stopDict(){ const r = rec; if (!r) return; await new Promise(res => { r.addEventListener("end", res, {once:true}); try { r.stop(); } catch(e) { res(); } setTimeout(res, 1500); }); }

/* ---------- on-device LLM (WebLLM + WebGPU). Weights download once, then stay in the browser cache. ---------- */
const WEBLLM_URL = "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/+esm";
const MODELS = [
  {key:"std", nm:"표준 · Qwen2.5 1.5B", sub:"대부분의 최신 폰. 한국어 번역도 무난해요.", sz:"약 1GB", f16:"Qwen2.5-1.5B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-1.5B-Instruct-q4f32_1-MLC"},
  {key:"lite", nm:"가벼움 · Qwen2.5 0.5B", sub:"메모리가 적은 폰. 대화가 단순해요.", sz:"약 400MB", f16:"Qwen2.5-0.5B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-0.5B-Instruct-q4f32_1-MLC"},
  {key:"pro", nm:"고품질 · Qwen2.5 3B", sub:"노트북이나 고사양 폰. 교정이 더 정확해요.", sz:"약 2GB", f16:"Qwen2.5-3B-Instruct-q4f16_1-MLC", f32:"Qwen2.5-3B-Instruct-q4f32_1-MLC"}
];
const llm = { lib:null, engine:null, modelId:null, key:null, gpu:undefined, loading:false };
let modelPick = (()=>{ try { return localStorage.getItem("malmun.model") || "std"; } catch(e){ return "std"; } })();
async function gpuInfo(){
  if (llm.gpu !== undefined) return llm.gpu;
  try { if (!navigator.gpu) return (llm.gpu = null); const a = await navigator.gpu.requestAdapter(); llm.gpu = a ? {f16: a.features.has("shader-f16")} : null; }
  catch(e) { llm.gpu = null; }
  return llm.gpu;
}
function modelIdFor(key, gpu){ const m = MODELS.find(x=>x.key===key) || MODELS[0]; return gpu && gpu.f16 ? m.f16 : m.f32; }
async function libLoad(){ if (!llm.lib) llm.lib = await import(WEBLLM_URL); return llm.lib; }
async function isCached(key){ try { const gpu = await gpuInfo(); if (!gpu) return false; const lib = await libLoad(); return await lib.hasModelInCache(modelIdFor(key, gpu)); } catch(e) { return false; } }
async function loadLLM(key, onProgress){
  const gpu = await gpuInfo(); if (!gpu) throw new Error("nogpu");
  const id = modelIdFor(key, gpu);
  if (llm.engine && llm.modelId === id) return;
  llm.loading = true;
  try {
    const lib = await libLoad();
    if (llm.engine) { try { await llm.engine.unload(); } catch(e){} llm.engine = null; }
    if (llm.worker) { try { llm.worker.terminate(); } catch(e){} llm.worker = null; }
    /* prefer a Web Worker so generation never freezes the UI; fall back to the main thread */
    try {
      llm.worker = new Worker(new URL("./worker.js", location.href), { type: "module" });
      llm.engine = await lib.CreateWebWorkerMLCEngine(llm.worker, id, { initProgressCallback: onProgress });
    } catch(e) {
      if (llm.worker) { try { llm.worker.terminate(); } catch(_){} llm.worker = null; }
      if (/memory|OOM|allocate|Device was lost/i.test(String(e && e.message || e))) throw e;
      llm.engine = await lib.CreateMLCEngine(id, { initProgressCallback: onProgress });
    }
    llm.modelId = id; llm.key = key;
    try { localStorage.setItem("malmun.model", key); } catch(e){}
  } finally { llm.loading = false; }
}
function parseLoose(t){
  try { return JSON.parse(t); } catch(e){}
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a > -1 && b > a) { try { return JSON.parse(t.slice(a, b+1)); } catch(e){} }
  return null;
}
async function llmJSON(system, user, maxTokens=280){
  const r = await llm.engine.chat.completions.create({
    messages:[{role:"system",content:system},{role:"user",content:user}],
    temperature:0.6, max_tokens:maxTokens, response_format:{type:"json_object"}
  });
  const txt = (r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content) || "";
  return parseLoose(txt) || {reply: txt.trim()};
}
