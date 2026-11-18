/* 재잘 offline support: the app shell is cached so the home-screen app opens without a network.
   Own files: network first (updates land right away), cache when offline.
   Fonts and the pinned WebLLM library: cache first. Model weights are cached by WebLLM itself. */
const VERSION = "jaejal-2026-11-18c";
const SHELL = ["./", "index.html", "app.css", "js/core.js", "js/device.js", "js/words.js", "js/game.js", "js/app.js", "js/learn.js", "js/talk.js", "js/screens.js", "js/pwa.js", "js/main.js", "content.js", "worker.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("jaejal-") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const CACHE_FIRST = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net\/npm\/@mlc-ai\/web-llm@)/;
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
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
