// Vocabulary course: frequency order, daily limit and setting, "already know", example-sentence cloze, progress bars, list paging.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());

  // empty notebook: course words come in frequency order, up to the daily limit
  const first = await p.evaluate(() => { const s = buildWordSession(); return { intros: s.steps.filter(x => x.type === 'wordintro').map(x => x.id.slice(2)), order: VOCAB_ORDER.slice(0, 5), saved: Object.keys(S.words).length }; });
  ok('course_order', JSON.stringify(first.intros) === JSON.stringify(first.order), first);
  ok('course_limit_5', first.intros.length === 5 && first.saved === 5, first);

  // setting 10 a day
  const ten = await p.evaluate(() => { S.words = {}; S.wordNew = null; S.settings.wordsPerDay = 10; return buildWordSession().steps.filter(x => x.type === 'wordintro').length; });
  ok('setting_10', ten === 10, ten);
  await p.evaluate(() => { S.settings.wordsPerDay = 5; S.words = {}; S.wordNew = null; save(); });

  // deck words tab: course card with progress and bands
  await p.evaluate(() => { deckMode = 'words'; wordScope = 'all'; location.hash = '#deck'; }); await p.waitForTimeout(600);
  const deck = await p.evaluate(() => ({ chip: document.querySelector('#vocab-course .chip')?.textContent, bands: document.querySelectorAll('#vocab-course .hbar').length, rows: document.querySelectorAll('.cards .card').length, total: Object.keys(WORDS).length }));
  ok('progress_card', deck.chip && deck.chip.startsWith('0/') && deck.bands >= 4, deck);
  ok('list_paged', deck.rows === 150 && deck.total > 2500, deck);
  await p.click('[data-act="more-words"]'); await p.waitForTimeout(200);
  ok('list_more', (await p.$$('.cards .card')).length === 300);
  await p.screenshot({ path: out + '/wordcourse-deck.png' });

  // start today's words: intro → "already know" skips its meaning check and puts it at rung 3
  await p.click('[data-open="wordcourse"]'); await p.waitForTimeout(600);
  const w1 = await p.evaluate(() => session.steps[session.i].id.slice(2));
  await p.screenshot({ path: out + '/wordcourse-intro.png' });
  await p.click('[data-act="known"]'); await p.waitForTimeout(300);
  const known = await p.evaluate(w => ({ stage: wordStage(w), card: !!S.cards['w:' + w], left: session.steps.slice(session.i).some(s => s.id === 'w:' + w) }), w1);
  ok('already_know', known.stage === 3 && known.card && !known.left, known);

  // example-sentence cloze for a course word with no deck chunk
  const cz = await p.evaluate(() => { const w = VOCAB_ORDER.find(x => WORDS[x].e && !DECK.some(c => toks(c.en).includes(x))); courseAdd(w); S.words[w].stage = 2; S.cards['w:' + w] = { due: 0, s: 2, d: 5, reps: 2, lapses: 0, last: 0 };
    session = { steps: [{ type: 'wordcloze', id: 'w:' + w }], i: 0, combo: 0, xp: 0, right: 0, total: 0, misses: {}, retried: new Set(), started: Date.now(), done: false }; renderStep();
    return { w, ex: WORDS[w].e.en, blank: !!document.querySelector('.blank'), ko: document.querySelector('.prompt-ko')?.textContent, srcKo: WORDS[w].e.ko }; });
  ok('example_cloze', cz.blank && cz.ko === cz.srcKo, cz);
  const form = await p.evaluate(() => document.querySelector('.blank').textContent);
  await p.fill('#answer', cz.w); await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(300);
  ok('example_cloze_graded', !!(await p.$('.fb')), form);
  await p.screenshot({ path: out + '/wordcourse-cloze.png' });

  // settings segment
  await p.evaluate(() => { session = null; openSettings(); }); await p.waitForTimeout(300);
  ok('settings_words_per_day', (await p.textContent('.sheet')).includes('하루 새 단어'));
  await p.evaluate(() => closeSheet());
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
