// 목표별 단어장: course data, picker sheet, switching course changes the next words, exam date → daily amount, progress per course.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(600); await p.evaluate(() => closeSheet());

  const data = await p.evaluate(() => ({ ids: allCourses().map(c => c.id), sizes: allCourses().map(c => c.words.filter(w => WORDS[w]).length),
    goalWords: Object.values(WORDS).filter(w => w.goal).length, withEx: Object.values(WORDS).filter(w => w.goal && w.e && w.ipa).length, def: activeCourse().id }));
  ok('data', data.ids.join() === 'basic,elem,school,csat,toeic,academic' && data.sizes.every(n => n > 600) && data.goalWords > 2000 && data.withEx === data.goalWords && data.def === 'basic', data);

  // words tab shows the course card with a picker
  await p.evaluate(() => { deckMode = 'words'; location.hash = '#deck'; }); await p.waitForTimeout(500);
  ok('card_basic', (await p.textContent('#vocab-course')).includes('기본 단어장'));
  await p.click('[data-open="course-pick"]'); await p.waitForTimeout(300);
  ok('picker_lists', (await p.$$('.course-opt')).length === 6);
  await p.click('[data-course="toeic"]'); await p.waitForTimeout(200);
  const date = await p.evaluate(() => dayKey(new Date(Date.now() + 60 * DAY)));
  await p.fill('.date-in', date); await p.dispatchEvent('.date-in', 'change'); await p.waitForTimeout(200);
  const note = await p.textContent('#pace-note');
  await p.screenshot({ path: out + '/goals-picker.png' });
  ok('pace_note', /D-60/.test(note) && /하루 \d+개/.test(note), note);
  await p.click('[data-act="save-course"]'); await p.waitForTimeout(500);

  // TOEIC course is active, the daily amount follows the exam date, and new words come from the TSL list
  const st = await p.evaluate(() => { const c = activeCourse(); const left = c.words.filter(w => WORDS[w] && !wordMet(w)).length;
    return { id: c.id, per: wordsPerDay(), expect: Math.ceil(left / Math.floor(60 * .85)), next: vocabNext(5), first: c.words.slice(0, 5), card: document.querySelector('#vocab-course').textContent }; });
  ok('toeic_active', st.id === 'toeic' && st.per === Math.max(3, Math.min(40, st.expect)) && st.next.join() === st.first.join() && st.card.includes('토익') && st.card.includes('D-60'), st);
  await p.screenshot({ path: out + '/goals-card.png' });

  // a word session pulls today's amount of new TOEIC words
  await p.evaluate(() => { wordOnlyNext = true; location.hash = '#learn'; }); await p.waitForTimeout(500);
  const sess = await p.evaluate(() => ({ intro: session.steps.filter(s => s.type === 'wordintro').map(s => s.id.slice(2)), toeic: activeCourse().words }));
  ok('session_from_course', sess.intro.length > 0 && sess.intro.every(w => sess.toeic.includes(w)), sess.intro);

  // a past date is ignored; switching back to the basic course restores the setting amount
  const back = await p.evaluate(() => { S.settings.wordsPerDay = 10; S.goal = { course: 'toeic', date: dayKey(new Date(Date.now() - 2 * DAY)) }; const a = wordsPerDay(); S.goal = { course: 'basic', date: null }; S.settings.wordsPerDay = 10; return { a, b: wordsPerDay(), id: activeCourse().id }; });
  ok('past_date_and_back', back.a === 10 && back.b === 10 && back.id === 'basic', back);
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
