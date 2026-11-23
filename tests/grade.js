// 어휘 등급: scoring maths (simulated learners), the Yes/No test flow with spot checks, the 나 tab card, live growth and the recap grade-up.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());

  // data: 5 bands × 60 words, enough pseudowords, ranks for dictionary words
  ok('data', await p.evaluate(() => VOCAB_TEST.bands.length === 5 && VOCAB_TEST.bands.every(x => x.length >= 10) && VOCAB_TEST.fakes.length >= 10 && Object.keys(VOCAB_RANK).length > 2000));
  // maths: a learner who knows the first k bands fully and says no to fakes gets about k×1000 words; guessing is corrected
  const sim = await p.evaluate(() => { const mk = (known, faYes) => [...[0,1,2,3,4].flatMap(bd => [...Array(10)].map((_, i) => ({band: bd, yes: bd < known}))), ...[...Array(10)].map((_, i) => ({fake: true, yes: i < faYes}))];
    const size = a => { const {rates} = testRates(a); return Math.round(rates.reduce((s, r) => s + r * 1000, 0)); };
    const allYes = [...Array(50)].map((_, i) => ({band: i % 5, yes: true})).concat([...Array(10)].map(() => ({fake: true, yes: true})));
    const half = [...[0,1,2,3,4].flatMap(bd => [...Array(10)].map((_, i) => ({band: bd, yes: bd < 3 || i < 5}))), ...[...Array(10)].map((_, i) => ({fake: true, yes: i < 5}))];
    return { k1: size(mk(1, 0)), k3: size(mk(3, 0)), k3guess: size(half), allYes: size(allYes), g: [gradeOf(0).id, gradeOf(1600).id, gradeOf(2950).id, gradeOf(4800).id] }; });
  ok('size_maths', sim.k1 === 1000 && sim.k3 === 3000 && sim.k3guess === 3000 && sim.allYes === 0 && sim.g.join() === '<A1,A2,B1+,C2', sim);

  // me tab before the test: scale + CTA
  await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());
  ok('me_card_cta', (await p.textContent('#vgrade')).includes('어휘 등급 확인하기') && (await p.$$('#vgrade .gs')).length === 10);

  // the test: answer yes to bands 0–2, no to the rest and to fakes; pick the right meaning in spot checks
  await p.evaluate(() => { location.hash = '#vocabtest'; }); await p.waitForTimeout(400);
  await p.screenshot({ path: out + '/grade-intro.png' });
  await p.click('.actionbar button:has-text("시작하기")'); await p.waitForTimeout(200);
  let spots = 0;
  for (let n = 0; n < 80; n++) {
    const st = await p.evaluate(() => { const w = document.querySelector('.vt-word')?.textContent; const opts = document.querySelectorAll('.opts .opt:not([disabled])').length;
      const band = w ? VOCAB_TEST.bands.findIndex(x => x.includes(w)) : -2; return { w, band, opts, done: !!document.querySelector('.gemblem') && !document.querySelector('.vt-word') }; });
    if (st.done) break;
    if (st.opts) { spots++; const ko = await p.evaluate(w => WORDS[w].ko, st.w); await p.click(`.opts .opt:has-text("${ko}")`); await p.waitForTimeout(750); continue; }
    if (n === 3) await p.screenshot({ path: out + '/grade-item.png' });
    await p.click(st.band >= 0 && st.band <= 2 ? '[data-act="yes"]' : '[data-act="no"]'); await p.waitForTimeout(60);
  }
  await p.waitForTimeout(400);
  const res = await p.evaluate(() => ({ g: S.vgrade, size: vocabSize(), big: document.querySelector('.celebrate .big')?.textContent }));
  ok('test_result', res.g && res.size === 3000 && res.big === 'B1+' && res.g.grade === 'B1+', { size: res.size, big: res.big });
  await p.screenshot({ path: out + '/grade-result.png', fullPage: true });

  // me tab after: current grade, can-do text, next grade
  await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());
  const card = await p.textContent('#vgrade');
  ok('me_card_grade', card.includes('현재 등급') && card.includes('B1+') && card.includes('다음 등급') && card.includes('B2'), card.slice(0, 160));
  await p.screenshot({ path: out + '/grade-me.png' });

  // learning band-3/4 words in the app raises the live estimate, and the recap celebrates the new grade
  const up = await p.evaluate(() => { const ws = Object.keys(VOCAB_RANK).filter(w => VOCAB_RANK[w] > 3000 && VOCAB_RANK[w] <= 5000).slice(0, 300);
    S.words = S.words || {}; ws.forEach(w => { S.words[w] = { added: Date.now(), stage: 4, misses: 0 }; });
    const live = vocabSize(); S.vgrade.rates[3] = .3; save();   /* a learner who knew some band-4 words: their new words count 70% */
    return { n: ws.length, live, size: vocabSize(), grade: currentGrade().id }; });
  ok('live_growth', up.live === 3000 + up.n && up.size > 3300 && up.size < up.live + 300 && up.grade === 'B2', up);
  await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(400);
  await p.evaluate(() => { session.steps = session.steps.slice(0, 0); renderStep(); }); await p.waitForTimeout(500);
  ok('recap_grade_up', ((await p.textContent('#grade-up').catch(() => '')) || '').includes('B1+ → B2'));
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, spots, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
