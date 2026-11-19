// Word ladder: intro → meaning → cloze → recall → new-context cloze → make a sentence; tap-to-save; word-only session.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3];
const R = {}; const errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  const now = Date.now();
  await ctx.addInitScript(st => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify(st)); sessionStorage.setItem('seeded', '1'); } }, {
    onboarded: true,
    words: { reservation: { added: now, src: null, misses: 2, auto: true, stage: 0 }, luggage: { added: now, src: null, misses: 1, auto: true, stage: 0 },
      refund: { added: now, src: null, misses: 1, auto: true, stage: 0 }, receipt: { added: now - 9e8, src: null, misses: 1, auto: true, stage: 2 },
      menu: { added: now - 9e8, src: null, misses: 1, auto: true } },
    cards: { 'w:receipt': { due: 0, s: 2, d: 5, reps: 2, lapses: 0, last: 0 }, 'w:menu': { due: now + 9e8, s: 10, d: 5, reps: 3, lapses: 0, last: 0 } }
  });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(600);
  await p.evaluate(() => closeSheet());

  // legacy word without a stage starts from memory strength
  ok('legacy_stage', await p.evaluate(() => wordStage('menu')) >= 2, await p.evaluate(() => wordStage('menu')));

  // word-only session from the notebook
  await p.evaluate(() => { deckMode = 'words'; wordScope = 'mine'; location.hash = '#deck'; }); await p.waitForTimeout(400);
  await p.screenshot({ path: out + '/l-notebook.png', fullPage: true });
  await p.click('[data-open="wordonly"]'); await p.waitForTimeout(500);
  const plan = await p.evaluate(() => session.steps.map(s => s.type + ':' + s.id.slice(2)));
  const idx = t => plan.indexOf(t);
  ok('plan_intros', ['reservation', 'luggage', 'refund'].every(w => idx('wordintro:' + w) > -1 && idx('wordmean:' + w) > idx('wordintro:' + w) + 1), plan);
  ok('plan_due_cloze', idx('wordcloze:receipt') > -1, plan);

  // play through answering correctly
  const shots = {};
  for (let k = 0; k < 30; k++) {
    if (await p.$('#recap-game')) break;
    const type = await p.evaluate(() => session && session.steps[session.i] && session.steps[session.i].type);
    const w = await p.evaluate(() => session.steps[session.i].id.slice(2));
    if (!shots[type]) { shots[type] = 1; await p.screenshot({ path: `${out}/l-${type}.png` }); }
    if (type === 'wordintro') { await p.click('.actionbar button.primary'); await p.waitForTimeout(150); continue; }
    if (type === 'wordmean') { const ko = await p.evaluate(w => wordEntry(w).ko, w); await p.click(`.opt[data-id="${w}"]`); }
    else { await p.fill('#answer', w); await p.click('.actionbar button:has-text("확인")'); }
    await p.waitForTimeout(200);
    const next = await p.$('.fb button.primary'); if (next) await next.click();
    await p.waitForTimeout(150);
  }
  const st = await p.evaluate(() => Object.fromEntries(Object.keys(S.words).map(w => [w, wordStage(w)])));
  ok('stages_up', st.reservation === 2 && st.luggage === 2 && st.refund === 2 && st.receipt === 3, st);
  ok('recap_word_title', (await p.textContent('.celebrate .eyebrow')).includes('단어'));
  ok('new_count', await p.evaluate(() => S.wordNew.n === wordsPerDay() && Object.values(S.words).filter(e => e.course).length === wordsPerDay() - 3), await p.evaluate(() => S.wordNew.n)); // 3 notebook words first, then course words up to the daily limit

  // ladder exercise selection
  const sel = await p.evaluate(() => { const r = {};
    S.words.reservation.stage = 3; r.s3 = wordStepFor('reservation').type;
    S.words.reservation.stage = 4; const a = wordStepFor('reservation'); r.s4 = a.type; r.ctxDiff = a.ctx ? cardById(a.ctx).en !== srcFor('reservation').en : 'noctx';
    S.words.reservation.stage = 5; r.s5 = wordStepFor('reservation').type;
    llm.engine = {}; r.s5ai = wordStepFor('reservation').type; llm.engine = null;
    setStage('reservation', false); r.down = wordStage('reservation'); return r; });
  ok('select_s3_recall', sel.s3 === 'wordrecall', sel);
  ok('select_s4_newctx', sel.s4 === 'wordcloze' && sel.ctxDiff === true, sel);
  ok('select_s5_noai', ['wordrecall', 'wordcloze'].includes(sel.s5), sel);
  ok('select_s5_ai_make', sel.s5ai === 'wordmake', sel);
  ok('miss_moves_down', sel.down === 4, sel);

  // make-a-sentence with a stubbed on-device model
  await p.evaluate(() => { llm.engine = {}; llmJSON = async () => ({ ok: true, corrected: 'I made a reservation for two.', note_ko: '좋아요' });
    S.words.reservation.stage = 5; session = { steps: [{ type: 'wordmake', id: 'w:reservation' }], i: 0, combo: 0, xp: 0, right: 0, total: 0, misses: {}, retried: new Set(), started: Date.now(), done: false }; renderStep(); });
  await p.fill('#answer', 'I have a reservation for two'); await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(500);
  await p.screenshot({ path: out + '/l-wordmake.png' });
  ok('make_good', !!(await p.$('.fb.good')) && await p.evaluate(() => wordStage('reservation')) === 5);
  await p.evaluate(() => { llm.engine = null; session = null; });

  // tap any word in a sentence to save it
  await p.evaluate(() => { const c = DECK.find(c => /\bluggage|bag|ticket\b/.test(c.en)) || DECK[0]; session = { steps: [{ type: 'listen', id: c.id }], i: 0, combo: 0, xp: 0, right: 0, total: 0, misses: {}, retried: new Set(), started: Date.now(), done: false }; renderStep(); });
  await p.waitForTimeout(400); await p.click('.opt >> nth=0'); await p.waitForTimeout(300);
  const tw = await p.$$eval('.task .tw', xs => xs.map(x => x.dataset.w));
  ok('tap_words_shown', tw.length > 0, tw);
  const target = await p.evaluate(ws => ws.find(w => !hasWord(w)) || ws[0], tw);
  await p.click(`.task .tw[data-w="${target}"]`); await p.waitForTimeout(400);
  const sheet = await p.$('.sheet'); ok('tap_opens_card', !!sheet);
  await p.screenshot({ path: out + '/l-tap.png' });
  const addBtn = await p.$('.sheet button.primary:has-text("단어장에 담기")'); if (addBtn) await addBtn.click(); await p.waitForTimeout(200);
  ok('tap_saved', await p.evaluate(w => hasWord(w), target), target);
  await p.evaluate(() => { closeSheet(); session = null; });

  // daily new-word limit
  const lim = await p.evaluate(() => { for (let i = 0; i < 6; i++) addWord(['coffee', 'water', 'window', 'seat', 'aisle', 'cash'][i], null, true); S.wordNew.n = 5; return buildWordSession().steps.filter(s => s.type === 'wordintro').length; });
  ok('new_limit', lim === 0, lim);

  // me: ladder bars
  await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(700); await p.evaluate(() => closeSheet());
  ok('me_ladder', (await p.$$('#word-ladder .hbar')).length === 6);
  await p.screenshot({ path: out + '/l-me.png', fullPage: true });
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
