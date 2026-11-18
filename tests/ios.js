const { chromium, devices } = require('playwright');
const base = process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
const DAY = 864e5; const key = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const ago = n => key(new Date(Date.now() - n * DAY));
let b;
async function open(state, dev = 'Pixel 7', path = '/') {
  const ctx = await b.newContext({ ...devices[dev] });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); }
    window.__shared = []; window.__badge = []; window.__wake = 0; window.__rel = 0;
    navigator.canShare = () => true; navigator.share = async d => { window.__shared.push({ n: (d.files || []).map(f => [f.name, f.type, f.size]), t: d.text || '' }); };
    navigator.setAppBadge = async n => { window.__badge.push(n); }; navigator.clearAppBadge = async () => { window.__badge.push(0); };
    Object.defineProperty(navigator, 'wakeLock', { value: { request: async () => { window.__wake++; const l = new EventTarget(); l.release = async () => { window.__rel++; }; return l; } } });
  }, { onboarded: true, ...state });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto(base + path); await p.waitForTimeout(900); return { p, ctx };
}
const closeSheets = async p => { while (await p.$('.sheet')) { await p.evaluate(() => closeSheet()); await p.waitForTimeout(500); } };
(async () => {
  b = await chromium.launch();
  for (const [d, mood] of [[1, null], [2, 'pout'], [3, 'angry'], [6, 'fury']]) {
    const { p, ctx } = await open({ hist: { [ago(d)]: 30 }, lastDay: ago(d), lastSeen: ago(1) });
    await closeSheets(p);
    const cls = await p.evaluate(() => document.querySelector('.greet .mascot').getAttribute('class'));
    const txt = await p.textContent('.greet .bubble');
    ok('anger_' + d, mood ? cls.includes(mood) : !/pout|angry|fury/.test(cls), { cls, txt });
    if (d === 6) { await p.screenshot({ path: out + '/ios-fury.png' });
      await p.evaluate(() => addXP(5)); await p.evaluate(() => { location.hash = '#course'; }); await p.waitForTimeout(300); await p.evaluate(() => { location.hash = '#home'; }); await p.waitForTimeout(900);
      const lab = await p.evaluate(() => document.querySelector('.sheet')?.getAttribute('aria-label'));
      ok('calm_after_study', lab === '화 풀렸어!', lab); await closeSheets(p);
      ok('calm_mood_home', !/angry|fury/.test(await p.evaluate(() => document.querySelector('.greet .mascot').getAttribute('class')))); }
    if (d === 3) { await p.screenshot({ path: out + '/ios-angry.png' }); }
    await ctx.close();
  }
  { const { p, ctx } = await open({ v: 1, words: { reservation: { added: 0, misses: 1 } }, cards: { 'w:reservation': { due: 0, s: 8, d: 5, reps: 3, lapses: 0, last: 0 } } });
    const m = await p.evaluate(() => ({ v: S.v, st: S.words.reservation.stage }));
    ok('migrate_v2', m.v === 2 && m.st === 3, m); await ctx.close(); }
  { const { p, ctx } = await open({ hist: { [ago(0)]: 40 }, lastDay: ago(0), streak: 4, sessions: 6 });
    ok('backup_card', !!(await p.$('#backup-card')));
    await p.evaluate(() => shareCard()); await p.waitForTimeout(1500);
    const sh = await p.evaluate(() => window.__shared);
    ok('share_card_png', sh.length === 1 && sh[0].n[0][1] === 'image/png' && sh[0].n[0][2] > 20000, sh);
    // wake lock during a session
    await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(500);
    const w1 = await p.evaluate(() => window.__wake);
    await p.evaluate(() => { location.hash = '#home'; }); await p.waitForTimeout(400);
    const r1 = await p.evaluate(() => window.__rel);
    ok('wake_lock', w1 >= 1 && r1 >= 1, { w1, r1 });
    // app badge
    await p.evaluate(() => { S.settings.badge = true; S.cards[DECK[0].id] = { due: 0, s: 1, d: 5, reps: 1, lapses: 0, last: 0 }; route(); });
    const bd = await p.evaluate(() => window.__badge.slice(-1)[0]);
    ok('app_badge', bd >= 1, bd);
    // offline → typing
    const had = await p.evaluate(() => caps.dict);
    await ctx.setOffline(true); await p.waitForTimeout(300);
    const off = await p.evaluate(() => ({ dict: caps.dict, flag: !!caps.dictOffline }));
    await ctx.setOffline(false); await p.waitForTimeout(300);
    const on = await p.evaluate(() => caps.dict);
    ok('offline_typing', !had || (off.dict === false && off.flag && on === true), { had, off, on });
    await ctx.close(); }
  { const { p, ctx } = await open({ sessions: 2 }, 'iPhone 15');
    const ios = await p.evaluate(() => isIOS()); await closeSheets(p);
    await p.evaluate(() => exportBackup()); await p.waitForTimeout(400);
    const sh = await p.evaluate(() => ({ s: window.__shared, lb: !!S.lastBackup }));
    ok('ios_backup_share', ios && sh.lb && sh.s.length === 1 && sh.s[0].n[0][1] === 'application/json', sh);
    await p.evaluate(() => installApp()); await p.waitForTimeout(300);
    ok('ios_install_steps', (await p.textContent('.sheet')).includes('따로 저장') && !!(await p.$('.sheet button:has-text("기록 내보내기")')));
    await p.screenshot({ path: out + '/ios-install.png' });
    await ctx.close(); }
  { const { p, ctx } = await open({}, 'Pixel 7', '/?text=' + encodeURIComponent('I was on cloud nine after the interview. https://x.com/a'));
    await p.waitForTimeout(600); await closeSheets; 
    const lab = await p.evaluate(() => [...document.querySelectorAll('.sheet')].map(x => x.getAttribute('aria-label')));
    ok('shared_sheet', lab.includes('공유한 문장'), lab);
    await p.screenshot({ path: out + '/ios-shared.png' });
    await p.fill('.sheet input.field', '면접 끝나고 날아갈 듯 기뻤어'); await p.click('[data-act="save-shared"]'); await p.waitForTimeout(200);
    const cu = await p.evaluate(() => ({ c: S.custom.map(c => c.en), q: location.search }));
    ok('shared_saved', cu.c.length === 1 && cu.c[0].startsWith('I was on cloud nine') && cu.q === '', cu);
    await ctx.close(); }
  await b.close();
  console.log(JSON.stringify({ R, errs: errs.filter(e => !/Failed to load resource|ERR_INTERNET/.test(e)), fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
