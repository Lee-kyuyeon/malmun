// 30-second speaking: unlock rule, prompt and target chunks, on-device scoring, AI feedback, records, missions, session placement.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());

  // locked until 6 chunks of the unit are known
  await p.evaluate(() => { location.hash = '#speak'; }); await p.waitForTimeout(400);
  ok('locked_message', (await p.textContent('#app')).includes('조금 더 익히고'));
  ok('fn_chunk_used', await p.evaluate(() => chunkUsed(toks('well can I have a menu please and some water'), 'Can I have a menu?') && !chunkUsed(toks('I like dogs a lot'), 'Can I have a menu?')));

  // learn 8 chunks of the current unit
  const unit = await p.evaluate(() => { const u = currentUnit(); u.cards.slice(0, 8).forEach(id => S.cards[id] = { due: Date.now() + 9e8, s: 5, d: 5, reps: 2, lapses: 0, last: Date.now() }); save(); return { id: u.id, lvl: u.lvl }; });
  await p.evaluate(() => { location.hash = '#course'; }); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());
  ok('course_cta_ready', (await p.textContent('[data-open="speak"]')).includes('길게 답해'));
  await p.click('[data-open="speak"]'); await p.waitForTimeout(500);
  const task = await p.evaluate(() => ({ q: document.querySelector('.task .prompt-en')?.textContent, targets: [...document.querySelectorAll('.speak-targets .st')].map(x => x.dataset.en), timer: !!document.querySelector('.speak-timer') }));
  ok('task_shown', task.q && task.targets.length === 3 && task.timer, task);
  await p.screenshot({ path: out + '/speak-task.png' });
  // answer using two of the three target chunks
  const answer = `Well, ${task.targets[0]} And also ${task.targets[1]} I come here a lot because it is close to my office and the staff are very kind to me.`;
  await p.fill('#answer', answer);
  await p.evaluate(() => { document.querySelector('#answer').dataset.speechMs = '20000'; });
  await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(600);
  const fb = await p.evaluate(() => ({ kpis: [...document.querySelectorAll('.fb .kpi b')].map(x => x.textContent), used: document.querySelectorAll('.fb .speak-targets .st.ok').length, rec: S.speakouts[0], daily: S.daily && S.daily.counts.speakout }));
  ok('scored_on_device', fb.used === 2 && fb.kpis[1] === '2/3' && fb.rec && fb.rec.words > 20 && fb.rec.wpm > 0, fb);
  ok('record_and_mission_event', fb.rec.unit === unit.id && fb.daily === 1, fb);
  await p.screenshot({ path: out + '/speak-feedback.png' });
  ok('used_chunks_reviewed', await p.evaluate(t => S.cards[cardById(currentUnit().cards.find(id => cardById(id).en === t)).id].due > Date.now(), task.targets[0]));

  // with the on-device AI: polished version and tips
  await p.evaluate(() => { llm.engine = {}; llmJSON = async () => ({ better: 'Could I get an iced americano, please? I come here a lot because it is close to my office.', good_ko: '표현을 자연스럽게 이었어요', fix_ko: 'because 뒤 문장을 짧게', accuracy: 0.8 }); });
  await p.evaluate(() => { location.hash = '#course'; }); await p.waitForTimeout(300); await p.evaluate(() => { location.hash = '#speak'; }); await p.waitForTimeout(500);
  await p.fill('#answer', 'I usually get an iced americano and a sandwich because I am always busy in the morning.');
  await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(800);
  const fb2 = await p.evaluate(() => document.querySelector('.fb')?.textContent || '');
  ok('ai_feedback', fb2.includes('더 자연스러워') && fb2.includes('잘한 점') && fb2.includes('다음엔'), fb2.slice(0, 120));
  await p.evaluate(() => { llm.engine = null; });

  // session placement: once a day at the end of the 5-minute session
  const pl = await p.evaluate(() => { S.speakDay = null; const a = buildSession().steps.slice(-1)[0]; S.speakDay = dayKey(); const b2 = buildSession().steps.some(s => s.type === 'speakout'); return { last: a.type, again: b2 }; });
  ok('session_end_once_a_day', pl.last === 'speakout' && !pl.again, pl);

  // growth on the me tab
  await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(600); await p.evaluate(() => closeSheet());
  ok('me_growth', !!(await p.$('#speak-growth .spark i')));
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
