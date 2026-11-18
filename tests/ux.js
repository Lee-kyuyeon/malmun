const { chromium, devices } = require('playwright');
const fs = require('fs');
(async () => {
  const file = 'file://' + process.argv[2], out = process.argv[3];
  const b = await chromium.launch(); const errs = [];
  // A) first run → onboarding (fresh storage)
  let ctx = await b.newContext({ ...devices['Pixel 7'], acceptDownloads: true }); let p = await ctx.newPage();
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  await p.goto(file); await p.waitForTimeout(500);
  const ob0 = await p.evaluate(() => document.body.innerText.includes('나는 앵두야'));
  await p.screenshot({ path: out + '/ob1.png' });
  await p.click('.pick button:has-text("불태우기")'); await p.click('.actionbar button:has-text("다음")');
  await p.click('.pick button:has-text("여행")'); await p.click('.pick button:has-text("직장·면접")');
  await p.screenshot({ path: out + '/ob2.png' });
  await p.click('.actionbar button:has-text("다음")'); await p.screenshot({ path: out + '/ob3.png' });
  await p.click('.actionbar button:has-text("시작하기")'); await p.waitForTimeout(600);
  const toPlacement = await p.evaluate(() => location.hash);
  await p.click('.topbar button:has-text("나중에")'); await p.waitForTimeout(400);
  const afterOb = await p.evaluate(() => ({onb:S.onboarded, goal:S.settings.goal, interests:S.settings.interests, ring: document.querySelector('.ring .lbl').innerText.replace(/\n/g,' '), hash: location.hash}));
  // first new card should come from an interest
  await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(300);
  const firstTag = await p.evaluate(() => cardById(session.steps[0].id).tag);
  await p.click('.x'); await p.waitForTimeout(300);
  await p.screenshot({ path: out + '/home.png', fullPage: true });
  // B) settings sheet
  await p.click('button[aria-label="설정"]'); await p.waitForTimeout(300);
  const gearGoesTo = await p.evaluate(() => location.hash);
  await p.click('.menu button:has-text("설정")'); await p.waitForTimeout(300);
  await p.screenshot({ path: out + '/settings.png' });
  await p.click('.sheet .seg button:has-text("30 XP")');
  await p.click('label[for="set-sound"]');
  const afterSet = await p.evaluate(() => ({goal:S.settings.goal, sound:S.settings.sound, stored: JSON.parse(localStorage.getItem('malmun.v1')).settings}));
  // C) export → import round-trip
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('.sheet button:has-text("기록 내보내기")')]);
  const path = out + '/backup.json'; await dl.saveAs(path);
  await p.evaluate(() => { S.settings.goal = 10; S.xp = 0; save(); });
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.click('.sheet button:has-text("기록 가져오기")')]); await fc.setFiles(path); await p.waitForTimeout(500);
  const restored = await p.evaluate(() => ({goal:S.settings.goal, interests:S.settings.interests}));
  await p.emulateMedia({ colorScheme: 'dark' }); await p.waitForTimeout(200); await p.screenshot({ path: out + '/home-dark.png', fullPage: true });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  await ctx.close();
  // D) reduced motion → no confetti canvas at recap
  ctx = await b.newContext({ ...devices['Pixel 7'], reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { if (!localStorage.getItem('malmun.v1')) localStorage.setItem('malmun.v1', JSON.stringify({onboarded:true})); } catch(e){} });
  p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(file); await p.waitForTimeout(300);
  const conf = await p.evaluate(() => { confetti(); return document.querySelectorAll('canvas.confetti').length; });
  // narrow 360px check
  await p.setViewportSize({ width: 360, height: 760 }); await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(300);
  await p.screenshot({ path: out + '/learn-360.png' });
  const overflow360 = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(JSON.stringify({errs, ob0, toPlacement, gearGoesTo, afterOb, firstTag, afterSet, restored, overflow, conf, overflow360}, null, 1));
  await b.close();
})();
