// Curriculum checks on the real app code: unit size and ordering, level ladder, pacing, role-play links,
// word contexts for the word ladder, and placement accuracy with simulated learners.
const { chromium } = require('playwright');
const file = 'file://' + process.argv[2]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })));
  await p.goto(file); await p.waitForTimeout(400);
  const m = await p.evaluate(() => {
    const cur = buildCurriculum(); const units = cur.units;
    const sizes = [...new Set(units.map(u => u.total))];
    const sorted = units.every(u => u.cards.every((id, i) => !i || chunkDifficulty(cardById(u.cards[i - 1])) <= chunkDifficulty(cardById(id))));
    const ladder = LEVELS.map(L => { const cs = DECK.filter(c => c.lvl === L); const avg = f => +(cs.reduce((a, c) => a + f(c), 0) / cs.length).toFixed(2);
      return { L, n: cs.length, words: avg(c => toks(c.en).length), diff: avg(c => chunkDifficulty(c)),
        rare: avg(c => toks(c.en).some(w => { const e = lookupTok(w); return e && e.band >= 3; }) ? 1 : 0) }; });
    const noScen = units.filter(u => !u.scen).map(u => u.id);
    const exactScen = units.filter(u => u.scen && u.scen.lvl === u.lvl).length;
    /* word ladder rung 4 needs a second sentence for each dictionary word */
    const ctxCount = w => { const f = new Set([w, ...(WORDS[w].forms || [])]); return DECK.filter(c => toks(c.en).some(t => f.has(t.replace(/'s$/, '')))).length; };
    const words = Object.keys(WORDS); const multi = words.filter(w => ctxCount(w) >= 2).length;
    /* pacing: 6 new chunks a day, a unit counts as done at 80% */
    const perUnitDays = Math.ceil(units[0].total * .8 / NEW_PER_DAY);
    return { units: units.length, sizes, sorted, ladder, noScen, exactScen, words: words.length, multi, perUnitDays, totalDays: Math.ceil(DECK.length / NEW_PER_DAY) };
  });
  ok('unit_size_25', m.sizes.every(n => n >= 25), m.sizes);
  ok('units_60', m.units === 60, m.units);
  ok('units_easy_first', m.sorted);
  const inc = k => m.ladder.every((x, i) => !i || x[k] > m.ladder[i - 1][k]);
  ok('ladder_words_up', inc('words'), m.ladder);
  ok('ladder_difficulty_up', inc('diff'), m.ladder);
  ok('every_unit_has_roleplay', m.noScen.length === 0, m.noScen);
  ok('pacing_about_8_months', m.totalDays >= 230 && m.totalDays <= 280, m.totalDays);
  /* placement with simulated learners: right 90% at or below their level, 15% above it */
  const sim = await p.evaluate(() => {
    let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    const out = {};
    for (const [k, start] of [[0, 0], [1, 0], [2, 1], [3, 2], [1, 1], [2, 2], [3, 0], [0, 2], [4, 3], [4, 4]]) {
      let hit = 0, near = 0; const N = 300;
      for (let t = 0; t < N; t++) { let theta = start; const used = new Set(), results = [];
        for (let i = 0; i < PLACE_ITEMS; i++) { const c = placementPick(theta, used); used.add(c.id); const li = LEVELS.indexOf(c.lvl);
          const right = rnd() < (li <= k ? .9 : .15); results.push({lvl:c.lvl, ok:right}); theta = placementUpdate(theta, i, right); }
        const got = LEVELS.indexOf(placementLevel(theta, results)); if (got === k) hit++; if (Math.abs(got - k) <= 1) near++; }
      out[`${LEVELS[k]}_from_${LEVELS[start]}`] = { exact: +(hit / N).toFixed(2), within1: +(near / N).toFixed(2) };
    }
    return out;
  });
  Object.entries(sim).forEach(([k, v]) => ok('placement_' + k, v.exact >= (k === 'B2_from_A1' ? .7 : .85) && v.within1 >= .9, v));
  await b.close();
  console.log(JSON.stringify({ R, metrics: m, placement: sim, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
