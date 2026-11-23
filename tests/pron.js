// Pronunciation check: VAD segments and auto-stop maths, fluency/pauses, word scores, total; the sheet records with a fake mic.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ ...devices['Pixel 7'], permissions: ['microphone'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(600); await p.evaluate(() => closeSheet());

  const m = await p.evaluate(() => {
    // 0.3 s silence, 1 s speech, 0.6 s pause, 0.6 s speech, 1 s silence (30 ms frames)
    const f = [...Array(10).fill(.003), ...Array(33).fill(.08), ...Array(20).fill(.004), ...Array(20).fill(.07), ...Array(33).fill(.003)];
    const v = vadSegments(f); const flu = fluencyScore(v.segments, 1500);
    const smooth = fluencyScore([{start:0, end:1600}], 1500);
    const ws = wordScores('Can I get an iced americano?', 'can I get a iced americano');
    const full = pronScore('Can I get an iced americano?', 'can I get an iced americano', [{start:0, end:1600}], 1500, true);
    const noRec = pronScore('Can I get an iced americano?', '', [{start:0, end:1600}], 1500, false);
    return { n: v.segments.length, pauses: flu.pauses, fluPause: flu.score, fluSmooth: smooth.score, ws: ws.map(x => x.s), full, noRec };
  });
  ok('vad_segments', m.n === 2 && m.pauses === 1, m);
  ok('fluency', m.fluSmooth === 1 && m.fluPause < m.fluSmooth, { a: m.fluSmooth, b: m.fluPause });
  ok('word_scores', m.ws.join() === '1,1,1,0.5,1,1', m.ws);   // 'a' for 'an' is a near miss
  ok('total', m.full.total === 100 && m.full.completeness === 1 && m.noRec.accuracy === null && m.noRec.total === 100, { full: m.full.total, noRec: m.noRec.total });

  // the sheet: record with the fake microphone, stop, see scores and the rhythm picture
  await p.evaluate(() => openPronounce('Can I get an iced americano?', '아이스 아메리카노 하나 주세요.')); await p.waitForTimeout(300);
  await p.click('[data-act="pa-record"]'); await p.waitForTimeout(2200);
  await p.click('[data-act="pa-record"]'); await p.waitForTimeout(1800);
  const sheet = await p.evaluate(() => ({ kpis: [...document.querySelectorAll('.pa-kpis .kpi span')].map(x => x.textContent), env: document.querySelectorAll('.env.me i').length, mine: !document.querySelector('.sheet .speak:nth-of-type(2)')?.disabled, note: document.querySelector('.sheet .ctx:last-child')?.textContent, saved: (S.pron||[]).length }));
  await p.screenshot({ path: out + '/pron-sheet.png' });
  ok('sheet_flow', (sheet.kpis.includes('유창함') && sheet.env > 0 && sheet.saved === 1) || /소리가 거의/.test(sheet.note || ''), sheet);

  // entry points: shadow task and word card
  await p.evaluate(() => closeSheet());
  await p.evaluate(() => { session = {steps:[{type:'shadow', id:DECK[0].id}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); }); await p.waitForTimeout(300);
  ok('shadow_button', !!(await p.$('.task [data-act="pron"]')));
  await p.evaluate(() => { session = null; openWord('receipt'); }); await p.waitForTimeout(300);
  ok('wordcard_button', !!(await p.$('.sheet [data-act="pron"]')));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
