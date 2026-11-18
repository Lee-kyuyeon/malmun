const { chromium, devices } = require('playwright');
(async () => {
  const file = 'file://' + process.argv[2], out = process.argv[3];
  const b = await chromium.launch(); const errs = [];
  async function run(mode){ // mode: 'right' | 'wrong'
    const ctx = await b.newContext({ ...devices['Pixel 7'] });
    await ctx.addInitScript(() => { try { if (!localStorage.getItem('malmun.v1')) localStorage.setItem('malmun.v1', JSON.stringify({onboarded:true})); } catch(e){} });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(mode+': '+e.message)); p.on('console', m => { if (m.type()==='error') errs.push(mode+': '+m.text()); });
    await p.goto(file); await p.waitForTimeout(300);
    await p.evaluate(() => { const orig = say; window.__said = null; say = function(t, ...a){ window.__said = t; return orig(t, ...a); }; });
    const tabs = await p.$$eval('nav.tabs a', as => as.map(a => a.textContent.trim()));
    await p.evaluate(() => { location.hash = '#placement'; }); await p.waitForTimeout(300);
    await p.click('.pick button:has-text("익숙한 상황에서")');   // self-assess A2
    for (let k = 0; k < 40; k++) {
      await p.waitForTimeout(250);
      if (await p.$('.lvl-badge')) break;
      if (await p.$('#intro')) { // speaking sample
        const intro = mode === 'right' ? 'Hi my name is Minji and I work in marketing at a tech company in Seoul. I love hiking and cooking and I am learning English because I want to work with people from all over the world and travel more confidently' : 'Hello';
        await p.fill('#intro', intro); await p.evaluate(ms => document.querySelector('#intro').dataset.speechMs = String(ms), mode==='right' ? 20000 : 5000);
        await p.click('.actionbar button:has-text("다 말했어")'); continue; }
      const isListen = await p.evaluate(() => !!document.querySelector('.opt[data-id]:not([disabled])'));
      const isRecall = await p.evaluate(() => !!document.querySelector('#answer:not([disabled])'));
      if (!isListen && !isRecall) continue;
      if (isListen) {
        await p.waitForFunction(() => window.__said && DECK.some(c => c.en === window.__said && document.querySelector(`.opt[data-id="${c.id}"]`)), null, {timeout: 5000});
        const right = await p.evaluate(() => { const c = DECK.find(c => c.en === window.__said); return c && c.id; });
        await p.evaluate(() => { window.__said = null; });
        await p.click(mode==='right' ? `.opt[data-id="${right}"]` : `.opt:not([data-id="${right}"])`);
      } else {
        const en = await p.evaluate(() => { const ko = document.querySelector('.prompt-ko').textContent; const c = DECK.find(c => c.ko === ko); return c && c.en; });
        await p.fill('#answer', mode==='right' ? en : 'banana banana');
        await p.click('.actionbar button:has-text("확인")');
      }
    }
    await p.waitForTimeout(400);
    const result = await p.evaluate(() => ({badge: document.querySelector('.lvl-badge') && document.querySelector('.lvl-badge').textContent, bars: [...document.querySelectorAll('.hbar .v')].map(x=>x.textContent)}));
    if (mode === 'right') await p.screenshot({ path: out + '/placement-result.png', fullPage: true });
    // manual level change → start course
    await p.click('.seg button:has-text("B1")'); await p.click('.cta:has-text("이 레벨로 코스 시작")'); await p.waitForTimeout(400);
    const after = await p.evaluate(() => { const c = buildCurriculum(); const now = c.units[c.cur];
      return {hash: location.hash, level: S.level, placement: S.placement, srsFromPlacement: Object.keys(S.cards).length, nowUnit: now.id,
        nowHighlighted: !!document.querySelector('.pu.now'), skippedLower: c.units.filter(u=>u.lvl==="A1"||u.lvl==="A2").every(u=>u.status==="skipped"||u.status==="done")}; });
    if (mode === 'right') await p.screenshot({ path: out + '/course.png', fullPage: true });
    await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(300);
    const sessionLevels = await p.evaluate(() => [...new Set(session.steps.filter(s=>s.type==='listen').map(s=>cardById(s.id).lvl))]);
    await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(300);
    const me = await p.evaluate(() => ({hasDiag: document.body.innerText.includes('실력 진단'), hasSettings: !!document.querySelector('.menu button'), }));
    await p.click('.menu button:has-text("효과적인 이유")'); await p.waitForTimeout(200);
    const sci = await p.evaluate(() => location.hash);
    if (mode === 'right') { await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(200); await p.screenshot({ path: out + '/me.png', fullPage: true }); }
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await ctx.close();
    return {tabs, result, after, sessionLevels, me, sci, overflow};
  }
  const right = await run('right'), wrong = await run('wrong');
  console.log(JSON.stringify({errs, right, wrong}, null, 1));
  await b.close();
})();
