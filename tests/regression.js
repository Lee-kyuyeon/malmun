const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2]; const out = process.argv[3];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { try { if (!localStorage.getItem('malmun.v1')) localStorage.setItem('malmun.v1', JSON.stringify({onboarded:true})); } catch(e){} }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(800);
  await p.screenshot({ path: out + '/home.png' });
  // run a learn session: answer every step generically
  await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(400);
  for (let k = 0; k < 40; k++) {
    if (await p.$('.big')) break;
    const opt = await p.$('.opt:not([disabled])'); if (opt) { await opt.click(); }
    const tile = await p.$('.tiles:not(.slot) .tile:not([disabled])');
    if (tile) { while (await p.$('.tiles:not(.slot) .tile:not([disabled])')) await p.click('.tiles:not(.slot) .tile:not([disabled])'); await p.click('button.primary:has-text("확인")'); }
    const ta = await p.$('#answer:not([disabled])'); if (ta) { await ta.fill('Can I get the check please'); await p.click('button.primary:has-text("확인")'); }
    const shadow = await p.$('button.primary:has-text("세 번 따라 했어요")'); if (shadow) await shadow.click();
    if (k === 2) await p.screenshot({ path: out + '/learn.png' });
    const next = await p.$('button.primary:has-text("다음"), button.primary:has-text("결과 보기")'); if (next) await next.click();
    await p.waitForTimeout(120);
  }
  await p.screenshot({ path: out + '/recap.png' });
  for (const t of ['course','talk','deck','me']) { while (await p.$('.sheet')) { await p.evaluate(()=>closeSheet()); await p.waitForTimeout(500); } await p.click(`nav a[data-tab="${t}"]`); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/${t}.png` }); }
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  await p.waitForTimeout(600); while (await p.$('.sheet')) { await p.evaluate(()=>closeSheet()); await p.waitForTimeout(500); } await p.emulateMedia({ colorScheme: 'dark' }); await p.click('nav a[data-tab="home"]'); await p.waitForTimeout(300); await p.screenshot({ path: out + '/home-dark.png' });
  const st = await p.evaluate(() => JSON.parse(localStorage.getItem('malmun.v1')||'{}'));
  console.log(JSON.stringify({ errs, overflow, xp: st.xp, cards: Object.keys(st.cards||{}).length, sessions: st.sessions }));
  await b.close();
})();
