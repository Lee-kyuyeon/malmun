// Lists every sentence/word the app can play from a file, with the voice(s) to record it in.
// Usage: node tools/tts/dump.js > items.json   (read by tools/tts/gen.py)
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "../..");
const src = ["content.js", "content-abroad.js", "content-examples.js", "content-climb.js"].map(f => fs.readFileSync(path.join(root, f), "utf8")).join("\n;\n");
const { DECK, WORDS, EPISODES, EX2, CLIMB_SEASONS, chunkId } = new Function(src + "\n;return {DECK, WORDS, EPISODES, EX2, CLIMB_SEASONS, chunkId};")();
const VOICES = require("./voices.json");
const vi = v => { const i = VOICES.indexOf(v); if (i < 0) throw new Error("unknown voice " + v); return i; };
/* the main voice rotates over six American speakers; the second voice is the other sex, British from B1 up */
const MAIN = ["af_heart", "am_michael", "af_bella", "am_fenrir", "af_sarah", "am_puck"];
const ALT_US = { f: ["am_michael", "am_fenrir", "am_puck"], m: ["af_heart", "af_bella", "af_sarah"] };
const ALT_GB = { f: ["bm_george", "bm_fable"], m: ["bf_emma", "bf_isabella"] };
const items = new Map();
const add = (text, voices, speed) => { const key = chunkId(text); const it = items.get(key) || { key, text, voices: [] }; if (speed) it.speed = speed;
  if (it.text !== text) throw new Error("hash clash: " + text + " / " + it.text);
  voices.forEach(v => { if (!it.voices.includes(vi(v))) it.voices.push(vi(v)); }); items.set(key, it); };
DECK.forEach(c => { const n = parseInt(chunkId(c.en).slice(1), 36); const main = MAIN[n % MAIN.length]; const sex = main[1];
  const pool = (c.lvl === "B1" || c.lvl === "B2" || c.lvl === "C1") ? ALT_GB : ALT_US; const alt = pool[sex][Math.floor(n / 8) % pool[sex].length];
  add(c.en, [main, alt]); (c.alts || []).forEach(a => add(a, [main])); });
/* a lone word is read as a one-word sentence, a little slower: the model clips and blurs bare short words */
Object.keys(WORDS).forEach(w => { add(w, ["af_heart"], 0.95); items.get(chunkId(w)).say = w[0].toUpperCase() + w.slice(1) + "."; });
/* episodes are real-life listening: recorded a little faster than the study sentences, faster again at higher levels */
const EP_SPEED = { A1: 1.05, A2: 1.05, B1: 1.1, B2: 1.15 };
EPISODES.forEach(e => e.scenes.forEach(s => s.lines.forEach(l => add(l.en, [e.cast[l.who].v], EP_SPEED[e.lvl] || 1.1))));
/* vocabulary-course example sentences last, so the words themselves are recorded first; main voice rotates like the deck */
Object.values(WORDS).forEach(e => { if (!e.e || !e.e.en) return; const n = parseInt(chunkId(e.e.en).slice(1), 36); add(e.e.en, [MAIN[n % MAIN.length]]); });
/* second example sentences (review contexts) after that */
Object.values(EX2).forEach(x => { const n = parseInt(chunkId(x.en).slice(1), 36); add(x.en, [MAIN[(n + 3) % MAIN.length]]); });
/* travel postcards: the idiom and its example */
CLIMB_SEASONS.forEach(s => s.marks.forEach(mk => { add(mk.en, ["af_heart"]); add(mk.ex, ["am_michael"]); }));
process.stdout.write(JSON.stringify([...items.values()]));
