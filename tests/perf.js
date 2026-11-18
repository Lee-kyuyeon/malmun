const { chromium, devices } = require('playwright');
const seed = () => { S.onboarded = true; S.words = {}; DECK.forEach((c, i) => S.cards[c.id] = { due: Date.now() - (i % 3 ? 1e9 : -1e9), s: 3, d: 5, reps: 3, lapses: 0, last: 0 });
  Object.keys(WORDS).slice(0, 300).forEach(w => { S.words[w] = { added: 0, misses: 1, stage: 2 }; S.cards['w:' + w] = { due: 0, s: 2, d: 5, reps: 2, lapses: 0, last: 0 }; }); };
(async () => { const b = await chromium.launch(); const out = {};
  for (const rate of [1, 6]) { const ctx = await b.newContext({ ...devices['Pixel 7'] }); const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    await p.goto(process.argv[2]); await p.waitForTimeout(500);
    out['cpu' + rate] = await p.evaluate(`(${seed})(); (() => { const t = f => { const a = performance.now(); f(); return Math.round(performance.now() - a); };
      return { dueList: t(() => dueList()), curriculum: t(() => buildCurriculum()), badges: t(() => BADGES.forEach(b => b.p())), homeRoute: t(() => { location.hash = '#home'; route(); }), addXP: t(() => addXP(5)), buildSession: t(() => buildSession()) }; })()`);
    await ctx.close(); }
  console.log(JSON.stringify(out)); await b.close(); })();
