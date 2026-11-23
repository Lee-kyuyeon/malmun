// 앵두의 여행: meters from correct answers (streak bonus, tail wind), landmarks → postcards + cherries, 25 m surprises,
// decay after days away (never below the last landmark, freezes respected), summit → hall of fame → next season, views.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true, settings: { autosubmit: false } })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());
  ok('data', await p.evaluate(() => CLIMB_SEASONS.length === 3 && CLIMB_SEASONS.every(s => s.marks.length === 10 && s.marks[9].m === CLIMB_TOP && s.marks.every(m => m.en && m.ex.length > 10 && /[가-힣]/.test(m.ko)))));

  // home card
  ok('home_card', (await p.textContent('.climb-card')).includes('하늘 여행'));
  await p.screenshot({ path: out + '/climb-home.png' });

  // a correct answer climbs 1 m; a wrong one does not
  await p.evaluate(() => { session = {steps:[{type:'tiles', id:DECK[0].id}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); });
  const box = await p.evaluate(() => document.querySelector('.task') && true);
  await p.evaluate(() => { const card = cardById(DECK[0].id); finish(document.querySelector('.task'), card, session.steps[0], 1, 3000); });
  const one = await p.evaluate(() => S.climb.m);
  await p.evaluate(() => { const card = cardById(DECK[1].id); finish(document.querySelector('.task'), card, {type:'recall', id:card.id}, 0.2, 3000); });
  ok('meter_per_correct', box && one === 1 && (await p.evaluate(() => S.climb.m)) === 1, one);

  // crossing 25 m triggers a surprise, crossing 40 m a landmark postcard + 5 cherries
  const cr = await p.evaluate(() => { session = null; const c0 = S.cherries || 0; climb(39); return { m: S.climb.m, posts: S.climb.posts, ev: S.climb.ev.length, pend: (S.pending||[]).map(x => x.kind), dc: (S.cherries||0) - c0 }; });
  ok('landmark_and_event', cr.m === 40 && cr.posts.includes('sky:40') && cr.ev === 1 && cr.pend.includes('landmark') && cr.dc >= 5, cr);

  // streak bonus: 14-day streak → +20%
  const mult = await p.evaluate(() => { S.streak = 14; S.lastDay = dayKey(); const a = S.climb.m; climb(10); return +(S.climb.m - a).toFixed(2); });
  ok('streak_bonus', mult >= 12 && mult <= 12.01 + 10, mult);   // a tail wind from a surprise may add on top

  // decay: 5 days away loses 3 m/day of the 4 missed days, but stops at the last landmark (40 m)
  const dec = await p.evaluate(() => { S.wind = 0; S.climb.wind = 0; S.climb.m = 60; S.climb.lastDay = dayKey(new Date(Date.now() - 5 * DAY)); climbDecay(); const a = S.climb.m;
    S.climb.m = 45; S.climb.lastDay = dayKey(new Date(Date.now() - 5 * DAY)); climbDecay(); return { a, b: S.climb.m, again: (climbDecay(), S.climb.m) }; });
  ok('decay_floor', dec.a === 48 && dec.b === 40 && dec.again === 40, dec);

  // landmark sheet from the queue on home
  await p.evaluate(() => { location.hash = '#home'; }); await p.waitForTimeout(800);
  const sheet = await p.textContent('.sheet').catch(() => '');
  ok('landmark_sheet', sheet.includes('지붕 위 고양이') && sheet.includes("bird's-eye view"), sheet.slice(0, 80));
  await p.screenshot({ path: out + '/climb-landmark.png' });
  await p.evaluate(() => closeSheet());

  // climb view: scene, ride, ghosts, postcard album
  await p.evaluate(() => { S.climb.m = 233; S.climb.log = { [dayKey(new Date(Date.now() - DAY))]: 200, [dayKey(new Date(Date.now() - 7 * DAY))]: 120, [dayKey()]: 233 }; S.climb.posts = ['sky:40','sky:90','sky:150','sky:220']; save(); location.hash = '#climb'; });
  await p.waitForTimeout(700);
  const v = await p.evaluate(() => ({ marks: document.querySelectorAll('.climb-scene .mark').length, got: document.querySelectorAll('.climb-scene .mark.got').length, ghosts: document.querySelectorAll('.past-ride').length, cards: document.querySelectorAll('.postcard').length, on: document.querySelectorAll('.postcard.on').length }));
  ok('climb_view', v.marks === 10 && v.got === 4 && v.ghosts === 2 && v.cards === 30 && v.on === 4, v);
  await p.screenshot({ path: out + '/climb-view.png' });
  await p.click('.postcard.on >> nth=3'); await p.waitForTimeout(300);
  ok('postcard_sheet', (await p.textContent('.sheet')).includes('on cloud nine'));
  await p.screenshot({ path: out + '/climb-postcard.png' });
  await p.evaluate(() => closeSheet());

  // summit: reaching the top queues the ending; leaving a line starts season 2 (sea) and records the hall of fame
  await p.evaluate(() => { climb(800); location.hash = '#home'; }); await p.waitForTimeout(400);
  await p.evaluate(() => { location.hash = '#climb'; }); await p.waitForTimeout(900);
  const sum = await p.textContent('.sheet').catch(() => '');
  await p.screenshot({ path: out + '/climb-summit.png' });
  await p.fill('.sheet textarea', 'I made it to the moon!');
  await p.click('.sheet .primary'); await p.waitForTimeout(600);
  const s2 = await p.evaluate(() => ({ season: S.climb.season, m: S.climb.m, hall: S.climb.hall.length, badge: !!S.badges.summit, title: climbSeason().t }));
  ok('summit_next_season', sum.includes('완주') && s2.season === 1 && s2.m === 0 && s2.hall === 1 && s2.badge && s2.title === '바다 탐험', { s2, sum: sum.slice(0, 60) });
  await p.screenshot({ path: out + '/climb-sea.png' });
  ok('sea_depth_label', (await p.textContent('.climb-scene')).includes('수심'));

  // recap card after a session that climbed
  await p.evaluate(() => { location.hash = '#learn'; }); await p.waitForTimeout(400);
  await p.evaluate(() => { session.climb = 12; session.marks = ['sea:40']; session.steps = []; renderStep(); }); await p.waitForTimeout(400);
  ok('recap_card', ((await p.textContent('#recap-climb').catch(() => '')) || '').includes('+12'));
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
