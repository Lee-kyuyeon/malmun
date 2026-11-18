// Validates content.js: shape, duplicates, per-cell counts, level fit, near-duplicates, Korean/English sanity,
// dictionary coverage, morphology on long words, IPA, scenarios.
// Usage: node tests/check-content.js content.js [--missing]   (--missing prints every word missing from WORDS as JSON)
const fs = require('fs'), vm = require('vm'); const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[2], 'utf8') + ';this.D=DECK;this.SC=SCENARIOS;this.W=WORDS;this.IG=WORD_IGNORE;', ctx);
const D = ctx.D, W = ctx.W, IG = new Set(ctx.IG), errs = [], warn = [];
const LEVELS = ["A1", "A2", "B1", "B2"], MIN_PER_CELL = 25;
const STOP = new Set("i me my mine you your yours we our us he him his she her it its they them their a an the to of in on at for with and or but is am are was were be been being does did done have has had having will would can could should shall may might must this that these those there here what where when how who whom which why not no so up out about as by from if then than too very just let s ll d ve re t m into over under after before again all any some each every both more most less much many own same such only also yet still even now well get got gotten going gone came took made put say said see seen give know want need like one two three ten seven first oh hi hey yes please getting other off another myself yourself".split(" "));
/* word counts per level: outside this range is a warning to review, not an error (short idioms are fine at B2) */
const LEN = { A1: [1, 7], A2: [2, 10], B1: [3, 14], B2: [3, 18] };
const words = en => (en.match(/[A-Za-z][A-Za-z'’-]*|\d+/g) || []);
const HANGUL = /[가-힣]/;

const ids = new Set(), ens = new Set();
D.forEach(c => {
  ['id', 'tag', 'lvl', 'en', 'ko'].forEach(k => { if (!c[k]) errs.push(`missing ${k}: ${JSON.stringify(c).slice(0, 60)}`); });
  if (!LEVELS.includes(c.lvl)) errs.push('bad lvl ' + c.en);
  if (ids.has(c.id)) errs.push('dup id ' + c.id); ids.add(c.id);
  const e = c.en.toLowerCase(); if (ens.has(e)) errs.push('dup en ' + c.en); ens.add(e);
  if (HANGUL.test(c.en)) errs.push('Korean in en: ' + c.en);
  if (c.ko && !HANGUL.test(c.ko)) errs.push('ko has no Korean: ' + c.en + ' → ' + c.ko);
  (c.alts || []).forEach(a => { if (a.toLowerCase() === e) warn.push('alt same as en: ' + c.en); });
  const n = words(c.en).length, [lo, hi] = LEN[c.lvl] || [0, 99]; if (n < lo || n > hi) warn.push(`length ${n} outside ${c.lvl} ${lo}-${hi}: ${c.en}`);
});

const forms = new Map(); Object.values(W).forEach(w => { if (![1, 2, 3].includes(w.band)) errs.push('bad band ' + w.w); if (!w.ko || !w.pos) errs.push('missing ko/pos ' + w.w); [w.w, ...w.forms].forEach(f => forms.set(f, w)); });
const used = new Set(), missing = new Map();
const contentWords = en => { const out = [];
  for (const raw of en.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’]/g, "'").match(/[a-z][a-z'-]*/g) || []) {
    const w = raw === "can't" ? "can" : raw === "won't" ? "will" : raw.endsWith("n't") ? raw.slice(0, -3) : raw.replace(/'(s|ll|d|ve|re|m)$/, '');
    w.split('-').forEach(p => { if (p && !STOP.has(p) && !IG.has(p)) out.push(p); }); }
  return out; };
D.forEach(c => contentWords(c.en).forEach(p => { const e = forms.get(p);
  if (!e) { if (!missing.has(p)) missing.set(p, c.en); errs.push(`no WORDS entry for "${p}" (${c.en})`); }
  else { used.add(e.w); if (e.w.length >= 8 && !e.parts.length && !e.story) errs.push(`long word without parts/story: ${p}`); } }));

/* near-duplicates inside one cell: content-word overlap of 80%+ */
const cellOf = {}; D.forEach(c => (cellOf[c.tag + '|' + c.lvl] = cellOf[c.tag + '|' + c.lvl] || []).push(c));
Object.values(cellOf).forEach(list => { for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  const a = new Set(contentWords(list[i].en)), b = new Set(contentWords(list[j].en)); if (a.size < 2 || b.size < 2) continue;
  const inter = [...a].filter(x => b.has(x)).length, jac = inter / (a.size + b.size - inter);
  if (jac >= 0.8) warn.push(`similar in ${list[i].tag} ${list[i].lvl}: "${list[i].en}" ~ "${list[j].en}"`); } });

const cell = {}; D.forEach(c => { const k = c.tag + '|' + c.lvl; cell[k] = (cell[k] || 0) + 1; });
const tags = [...new Set(D.map(c => c.tag))];
const minCell = Math.min(...tags.flatMap(t => LEVELS.map(l => cell[t + '|' + l] || 0)));
if (minCell < MIN_PER_CELL) errs.push(`a situation × level cell has only ${minCell} chunks (need ${MIN_PER_CELL})`);
ctx.SC.forEach(s => { if (!tags.includes(s.tag)) errs.push('scenario tag not in deck ' + s.id); if (!LEVELS.includes(s.lvl)) errs.push('scenario bad lvl ' + s.id);
  if (!Array.isArray(s.missions) || s.missions.length !== 3) errs.push('scenario needs 3 missions ' + s.id); });
const scenIds = new Set(); ctx.SC.forEach(s => { if (scenIds.has(s.id)) errs.push('dup scenario id ' + s.id); scenIds.add(s.id); });
const withParts = Object.values(W).filter(w => w.parts.length || w.story).length;
Object.values(W).filter(e => !/^\/[^\/]+\/$/.test(e.ipa || '')).forEach(e => errs.push('no ipa ' + e.w));
Object.values(W).filter(e => e.ipa && (e.ipa.match(/[aeiouɑæɔəɪʊʌɜ]+/g) || []).length > 2 && !/[ˈ]/.test(e.ipa)).forEach(e => errs.push('no stress ' + e.w + ' ' + e.ipa));

if (process.argv.includes('--missing')) { console.log(JSON.stringify([...missing.entries()])); process.exit(0); }
console.log(JSON.stringify({ withIpa: Object.values(W).filter(e => e.ipa).length, chunks: D.length, situations: tags.length, minPerCell: minCell, scenarios: ctx.SC.length,
  scenarioTags: new Set(ctx.SC.map(s => s.tag)).size, words: Object.keys(W).length, wordsUsed: used.size, wordsWithMorphologyOrStory: withParts, errors: errs.length, warnings: warn.length }));
if (warn.length) console.log('warnings:\n' + warn.join('\n'));
if (errs.length) { console.log(errs.slice(0, 30).join('\n')); process.exit(1); }
