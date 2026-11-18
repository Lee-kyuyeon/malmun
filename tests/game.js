// Gamification checks: missions, chest, freeze, milestones, shop, boost, race, in-app nudges, tab badges.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3];
const DAY = 86400000;
const key = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const T = (hh) => new Date(2026, 10, 18, hh, 0, 0); // Wed 18 Nov 2026, local time
const R = {}; const errs = []; let b;
const ok = (name, cond, extra) => { R[name] = cond ? 'PASS' : 'FAIL ' + JSON.stringify(extra ?? ''); };

async function open(state, hour = 12, opts = {}) {
  const ctx = await b.newContext({ ...devices['Pixel 7'], ...(opts.ctx || {}) });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, { onboarded: true, ...state });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.clock.setFixedTime(T(hour));
  await p.goto(file + (opts.hash || '')); await p.waitForTimeout(700);
  return { p, ctx };
}
const closeSheets = async p => { while (await p.$('.sheet')) { await p.evaluate(() => closeSheet()); await p.waitForTimeout(500); } };

(async () => {
  b = await chromium.launch();
  const today = key(T(12)), yday = key(new Date(T(12) - DAY)), d2 = key(new Date(T(12) - 2 * DAY));

  // 1) missions are stable for the day and session progress counts
  { const { p, ctx } = await open({});
    const a = await p.evaluate(() => ensureDaily().missions.map(m => m.id));
    await p.reload(); await p.waitForTimeout(500);
    const b2 = await p.evaluate(() => ensureDaily().missions.map(m => m.id));
    ok('missions_stable', JSON.stringify(a) === JSON.stringify(b2) && a.length === 3 && a[0] === 'session', { a, b2 });
    ok('missions_card_on_home', (await p.$$('#missions .mrow')).length === 3);
    await p.screenshot({ path: out + '/g-home.png' });
    // run one session
    await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(400);
    for (let k = 0; k < 40; k++) {
      if (await p.$('#recap-game')) break;
      const opt = await p.$('.opt:not([disabled])'); if (opt) await opt.click();
      if (await p.$('.tiles:not(.slot) .tile:not([disabled])')) { while (await p.$('.tiles:not(.slot) .tile:not([disabled])')) await p.click('.tiles:not(.slot) .tile:not([disabled])'); await p.click('button.primary:has-text("확인")'); }
      const ta = await p.$('#answer:not([disabled])'); if (ta) { await ta.fill('Can I get the check please'); await p.click('button.primary:has-text("확인")'); }
      const sh = await p.$('button.primary:has-text("세 번 따라 했어요")'); if (sh) await sh.click();
      const next = await p.$('.fb button.primary'); if (next) await next.click();
      await p.waitForTimeout(100);
    }
    await p.waitForTimeout(400);
    await p.screenshot({ path: out + '/g-recap.png', fullPage: true });
    const st = await p.evaluate(() => ({ d: S.daily, c: S.cherries, badges: Object.keys(S.badges), ledger: S.ledger }));
    ok('session_mission_done', st.d.done.includes('session') && st.d.counts.session_done === 1, st.d);
    ok('cherries_earned', st.c >= 10, st.c);           // mission +5, first badge +5
    ok('first_badge', st.badges.includes('first'), st.badges);
    ok('recap_game_section', !!(await p.$('#recap-game .mrow')));
    // finish all missions → chest
    await p.evaluate(() => { const d = ensureDaily(); d.missions.forEach(m => track(m.ev, m.n * 3, m.max ? 'max' : undefined)); location.hash = '#home'; });
    await p.waitForTimeout(700); await closeSheets(p);
    const before = await p.evaluate(() => S.cherries);
    const chest = await p.$('#missions .chest.ready');
    ok('chest_ready', !!chest);
    const tabDot = await p.$('nav a[data-tab="home"] .tbadge');
    ok('home_tab_dot_for_chest', !!tabDot);
    if (chest) { await chest.click(); await p.waitForTimeout(400); }
    const after = await p.evaluate(() => S.cherries);
    ok('chest_10_20', after - before >= 10 && after - before <= 20, { before, after });
    await p.screenshot({ path: out + '/g-chest.png' });
    await ctx.close(); }

  // 2) freeze keeps the streak / no freeze resets it
  { const { p, ctx } = await open({ lastDay: d2, streak: 5, freezes: 1, hist: { [d2]: 30 }, lastSeen: d2 });
    const st = await p.evaluate(() => ({ f: S.freezes, s: streakNow(), fd: S.freezeDays, msg: document.querySelector('.greet .bubble b').textContent }));
    ok('freeze_used', st.f === 0 && st.s === 5 && st.fd.includes(key0()), st);
    function key0() { return null; }
    R.freeze_used = (st.f === 0 && st.s === 5 && st.fd.includes(yday)) ? 'PASS' : 'FAIL ' + JSON.stringify(st);
    ok('freeze_notice_msg', st.msg.includes('지켰어'), st.msg);
    await p.evaluate(() => addXP(5));
    ok('streak_continues_after_freeze', await p.evaluate(() => S.streak) === 6);
    await ctx.close(); }
  { const { p, ctx } = await open({ lastDay: d2, streak: 5, freezes: 0, hist: { [d2]: 30 } });
    ok('no_freeze_breaks', await p.evaluate(() => streakNow()) === 0);
    await p.evaluate(() => addXP(5));
    ok('no_freeze_restart_1', await p.evaluate(() => S.streak) === 1);
    await ctx.close(); }

  // 3) milestone 7 days → cherries + badge + celebration
  { const { p, ctx } = await open({ lastDay: yday, streak: 6, bestStreak: 6, hist: { [yday]: 50 } });
    const c0 = await p.evaluate(() => S.cherries);
    await p.evaluate(() => addXP(10));
    const st = await p.evaluate(() => ({ s: S.streak, c: S.cherries, b: Object.keys(S.badges), pend: S.pending.map(x => x.kind) }));
    ok('milestone7', st.s === 7 && st.b.includes('s7') && st.c - c0 >= 20, { st, c0 });
    await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(900);
    ok('celebration_sheet', !!(await p.$('.sheet')), await p.evaluate(() => document.querySelector('.sheet')?.getAttribute('aria-label')));
    await closeSheets(p);
    ok('me_badges_grid', (await p.$$('#badges .badge')).length === 6); await p.click('[data-open="badges"]'); await p.waitForTimeout(300); ok('all_badges_sheet', (await p.$$('.sheet .badge')).length === 20); await closeSheets(p);
    ok('me_calendar', !!(await p.$('#calendar .cal .d.today')));
    await p.screenshot({ path: out + '/g-me.png', fullPage: true });
    await ctx.close(); }

  // 4) shop: buy + wear, badge-locked items, freeze, boost
  { const { p, ctx } = await open({ cherries: 200 });
    await p.click('[data-chip="cherry"]'); await p.waitForTimeout(400);
    await p.click('.shop button[data-acc="straw"]'); await p.click('.shop button[data-acc="shades"]');
    await p.screenshot({ path: out + '/g-shop.png' });
    await p.click('button[data-act="apply"]'); await p.waitForTimeout(300);
    let st = await p.evaluate(() => ({ c: S.cherries, owned: S.owned, outfit: S.outfit }));
    ok('shop_buy', st.c === 200 - 40 - 45 && st.owned.includes('straw') && st.outfit.hat === 'straw' && st.outfit.eyes === 'shades', st);
    await p.click('.shop button[data-acc="crown"]');
    const lockTxt = await p.textContent('button[data-act="apply"]'); const lockDis = await p.$eval('button[data-act="apply"]', x => x.disabled);
    ok('crown_locked', lockDis && lockTxt.includes('배지'), lockTxt);
    await p.click('button.ghost:has-text("되돌리기")');
    await p.click('[data-buy="freeze"]'); await p.waitForTimeout(200);
    await p.click('[data-buy="boost"]'); await p.waitForTimeout(200);
    st = await p.evaluate(() => ({ c: S.cherries, f: S.freezes, boost: boostOn() }));
    ok('shop_freeze_boost', st.f === 1 && st.boost && st.c === 200 - 85 - 30 - 40, st);
    const got = await p.evaluate(() => addXP(10));
    ok('boost_doubles', got === 20, got);
    await p.evaluate(() => { closeSheet(); route(); }); await p.waitForTimeout(500); await closeSheets(p);
    const acc = await p.evaluate(() => document.querySelector('.greet .mascot .acc').innerHTML.length);
    ok('outfit_on_mascot', acc > 50, acc);
    ok('boost_chip', !!(await p.$('.boostchip')));
    await p.screenshot({ path: out + '/g-home-outfit.png' });
    await ctx.close(); }

  // 5) last-week race matches hist (Wed: Mon..Wed)
  { const mon = new Date(T(12) - 2 * DAY), tue = new Date(T(12) - DAY), lmon = new Date(T(12) - 9 * DAY), lwed = new Date(T(12) - 7 * DAY), lthu = new Date(T(12) - 6 * DAY);
    const hist = { [key(mon)]: 40, [key(tue)]: 20, [key(lmon)]: 30, [key(lwed)]: 50, [key(lthu)]: 999 };
    const { p, ctx } = await open({ hist, lastDay: key(tue), streak: 2 });
    const tw = await p.getAttribute('[data-tw]', 'data-tw'), lw = await p.getAttribute('[data-lw]', 'data-lw');
    ok('race_values', tw === '60' && lw === '80', { tw, lw });
    await ctx.close(); }

  // 6) in-app nudges
  { const { p, ctx } = await open({ lastDay: yday, streak: 4, hist: { [yday]: 50 }, lastSeen: yday }, 21);
    const t = await p.textContent('.greet .bubble'); const risk = await p.$('.greet .bubble.risk');
    ok('risk_msg', !!risk && t.includes('4일'), t);
    await p.screenshot({ path: out + '/g-risk.png' });
    await ctx.close(); }
  { const { p, ctx } = await open({ lastDay: yday, streak: 4, freezes: 1, hist: { [yday]: 50 } }, 21);
    ok('risk_msg_soft_with_freeze', (await p.textContent('.greet .bubble')).includes('보호권'));
    await ctx.close(); }
  { const { p, ctx } = await open({ lastDay: yday, streak: 1, hist: { [yday]: 50 }, settings: { studyTime: 'morning', goal: 50 } }, 8);
    ok('studytime_msg', (await p.textContent('.greet .bubble')).includes('약속'), await p.textContent('.greet .bubble'));
    await ctx.close(); }
  { const five = key(new Date(T(12) - 5 * DAY));
    const { p, ctx } = await open({ lastDay: five, streak: 3, hist: { [five]: 50 }, lastSeen: five });
    await p.waitForTimeout(500);
    const lab = await p.evaluate(() => document.querySelector('.sheet')?.getAttribute('aria-label'));
    ok('welcome_back', lab === '다시 왔구나!', lab);
    await p.screenshot({ path: out + '/g-welcome.png' });
    await p.click('.sheet button.primary'); await p.waitForTimeout(500);
    const steps = await p.evaluate(() => session && session.steps.length);
    ok('light_session', steps > 0 && steps <= 6, steps);
    await ctx.close(); }

  // 7) course tab badge = due reviews
  { const cards = {}; ['c01', 'c02', 'c03'].forEach(id => cards[id] = { due: 0, s: 1, d: 5, reps: 2, lapses: 0, last: 0 });
    const { p, ctx } = await open({ cards });
    const n = await p.textContent('nav a[data-tab="course"] .tbadge').catch(() => null);
    const due = await p.evaluate(() => dueList().length);
    ok('course_tab_badge', n === String(due) && due === 3, { n, due });
    // onboarding + settings have study time
    await p.evaluate(() => openSettings()); await p.waitForTimeout(300);
    ok('settings_studytime', (await p.textContent('.sheet')).includes('보통 언제 공부할래?'));
    await ctx.close(); }

  // 8) visual: dark + 360px, no horizontal scroll
  { const { p, ctx } = await open({ cherries: 120, owned: ['beanie', 'scarf'], outfit: { hat: 'beanie', neck: 'scarf' }, lastDay: yday, streak: 12, bestStreak: 12, hist: { [yday]: 60, [d2]: 40 } }, 12, { ctx: { colorScheme: 'dark' } });
    await closeSheets(p);
    await p.screenshot({ path: out + '/g-home-dark.png', fullPage: true });
    await p.setViewportSize({ width: 360, height: 780 }); await p.waitForTimeout(200);
    const ov1 = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await p.click('nav a[data-tab="me"]'); await p.waitForTimeout(700); await closeSheets(p);
    const ov2 = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await p.screenshot({ path: out + '/g-me-360-dark.png', fullPage: true });
    await p.click('[data-open="shop"]'); await p.waitForTimeout(400);
    const ov3 = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await p.screenshot({ path: out + '/g-shop-360-dark.png' });
    ok('no_overflow', !ov1 && !ov2 && !ov3, { ov1, ov2, ov3 });
    await ctx.close(); }

  await b.close();
  const fails = Object.entries(R).filter(([, v]) => v !== 'PASS');
  console.log(JSON.stringify({ R, errs, fails: fails.length }, null, 1));
})();
