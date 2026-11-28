/* 재잘 offline support: the app shell is cached so the home-screen app opens without a network.
   Own files: network first (updates land right away), cache when offline.
   Fonts and the pinned WebLLM library: cache first. Model weights are cached by WebLLM itself. */
const VERSION = "jaejal-2026-11-28a";
const AUDIO_CACHE = "jaejal-audio-1"; /* recorded voices: kept across app updates, filled as clips are played or saved for offline */
const SHELL = ["./", "index.html", "app.css", "js/core.js", "js/device.js", "js/words.js", "js/game.js", "js/app.js", "js/learn.js", "js/talk.js", "js/screens.js", "js/pwa.js", "js/speak.js", "js/grade.js", "content-goals.js", "content-vocab.js", "content-examples.js", "content-climb.js", "js/climb.js", "js/dict.js", "js/pron.js", "js/main.js", "content.js", "content-abroad.js", "audio/manifest.js", "js/abroad.js", "worker.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/icon.svg"];

/* updates download only what changed: shell.json lists a hash per file; unchanged files are copied from the previous cache */
self.addEventListener("install", e => { e.waitUntil(install().then(() => self.skipWaiting())); });
async function install(){
  const cache = await caches.open(VERSION);
  let man = null; try { const r = await fetch("shell.json", {cache: "no-store"}); if (r.ok) man = await r.json(); } catch(e) {}
  if (!man || !man.files) return cache.addAll(SHELL);
  const old = await previousShell(); let reused = 0, fetched = 0;
  await Promise.all(SHELL.map(async p => { const h = man.files[p];
    if (old && h && old.man.files && old.man.files[p] === h) { const r = await old.cache.match(p); if (r) { await cache.put(p, r); reused++; return; } }
    const res = await fetch(h ? `${p}?v=${h}` : p, {cache: "no-cache"}); if (!res.ok) throw new Error("shell " + p); await cache.put(p, res); fetched++; }));
  await cache.put("shell.json", new Response(JSON.stringify({...man, reused, fetched, at: Date.now()}), {headers: {"Content-Type": "application/json"}}));
}
async function previousShell(){
  const keys = (await caches.keys()).filter(k => k.startsWith("jaejal-") && k !== VERSION && k !== AUDIO_CACHE).reverse();
  for (const k of keys) { const c = await caches.open(k); const r = await c.match("shell.json"); if (r) { try { return {cache: c, man: await r.json()}; } catch(e) {} } }
  return null;
}
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("jaejal-") && k !== VERSION && k !== AUDIO_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const CACHE_FIRST = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net\/npm\/@mlc-ai\/web-llm@)/;
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin && /\/audio\/[^/]+\.m4a$/.test(url.pathname)) { e.respondWith(clip(req)); return; }
  if (url.origin === self.location.origin) {
    /* network first, but never wait more than 2.5s on a weak connection when a cached copy exists */
    const fromCache = () => caches.match(req, {ignoreSearch: true}).then(r => r || (req.mode === "navigate" ? caches.match("index.html") : null));
    const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; });
    e.waitUntil(net.catch(() => {}));
    e.respondWith(new Promise(resolve => {
      let done = false; const finish = r => { if (!done && r) { done = true; resolve(r); } };
      const timer = setTimeout(() => fromCache().then(finish), 2500);
      net.then(res => { clearTimeout(timer); finish(res); })
         .catch(() => { clearTimeout(timer); fromCache().then(r => { if (r) finish(r); else if (!done) { done = true; resolve(Response.error()); } }); });
    }));
    return;
  }
  if (CACHE_FIRST.test(req.url)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })));
  }
});

/* audio clips: cache first. Safari asks for media in byte ranges, so a cached clip is sliced into a 206 answer */
async function clip(req){
  const c = await caches.open(AUDIO_CACHE); const key = req.url.split("?")[0]; let res = await c.match(key);
  if (!res) { try { const net = await fetch(key); if (!net.ok) return net; await c.put(key, net.clone()); res = net; } catch(e) { return Response.error(); } }
  const range = req.headers.get("range"); if (!range) return res;
  const buf = await res.arrayBuffer(), size = buf.byteLength, m = /bytes=(\d*)-(\d*)/.exec(range);
  let start = m && m[1] ? +m[1] : 0, end = m && m[2] ? +m[2] : size - 1;
  if (m && !m[1] && m[2]) { start = Math.max(0, size - +m[2]); end = size - 1; }
  end = Math.min(end, size - 1);
  if (start > end) return new Response(null, {status: 416, headers: {"Content-Range": "bytes */" + size}});
  return new Response(buf.slice(start, end + 1), {status: 206, headers: {"Content-Type": "audio/mp4", "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes"}});
}
