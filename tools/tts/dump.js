// Lists every sentence/word the app can play from a file, with the voice(s) to record it in.
// Usage: node tools/tts/dump.js > items.json   (read by tools/tts/gen.py)
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "../..");
const src = ["content.js", "content-abroad.js"].map(f => fs.readFileSync(path.join(root, f), "utf8")).join("\n;\n");
const { DECK, WORDS, EPISODES, chunkId } = new Function(src + "\n;return {DECK, WORDS, EPISODES, chunkId};")();
const VOICES = require("./voices.json");
const vi = v => { const i = VOICES.indexOf(v); if (i < 0) throw new Error("unknown voice " + v); return i; };
/* the main voice rotates over six American speakers; the second voice is the other sex, British from B1 up */
const MAIN = ["af_heart", "am_michael", "af_bella", "am_fenrir", "af_sarah", "am_puck"];
const ALT_US = { f: ["am_michael", "am_fenrir", "am_puck"], m: ["af_heart", "af_bella", "af_sarah"] };
const ALT_GB = { f: ["bm_george", "bm_fable"], m: ["bf_emma", "bf_isabella"] };
const items = new Map();
const add = (text, voices) => { const key = chunkId(text); const it = items.get(key) || { key, text, voices: [] };
  if (it.text !== text) throw new Error("hash clash: " + text + " / " + it.text);
  voices.forEach(v => { if (!it.voices.includes(vi(v))) it.voices.push(vi(v)); }); items.set(key, it); };
DECK.forEach(c => { const n = parseInt(chunkId(c.en).slice(1), 36); const main = MAIN[n % MAIN.length]; const sex = main[1];
  const pool = (c.lvl === "B1" || c.lvl === "B2") ? ALT_GB : ALT_US; const alt = pool[sex][Math.floor(n / 8) % pool[sex].length];
  add(c.en, [main, alt]); (c.alts || []).forEach(a => add(a, [main])); });
Object.keys(WORDS).forEach(w => add(w, ["af_heart"]));
EPISODES.forEach(e => e.scenes.forEach(s => s.lines.forEach(l => add(l.en, [e.cast[l.who].v]))));
process.stdout.write(JSON.stringify([...items.values()]));
