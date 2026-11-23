// Typing cloze with a hint ladder: letter hints, one retry, synonym bonus hint, show-answer-then-retype,
// chunk cloze in review sessions, rotating example sentences, synonym/antonym chips on word cards.
const { chromium, devices } = require('playwright');
const file = 'file://' + process.argv[2], out = process.argv[3]; const R = {}, errs = [];
const ok = (n, c, x) => { R[n] = c ? 'PASS' : 'FAIL ' + JSON.stringify(x ?? ''); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify({ onboarded: true, settings: { autosubmit: false } })); sessionStorage.setItem('seeded', '1'); } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file); await p.waitForTimeout(500); await p.evaluate(() => closeSheet());
  const run = steps => p.evaluate(st => { session = {steps: st, i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); }, steps);
  const type = async t => { await p.fill('#answer', t); await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(250); };
  const blank = () => p.evaluate(() => document.querySelector('.blank')?.textContent);

  // helpers: synonym detection and rotating contexts
  ok('same_meaning', await p.evaluate(() => sameMeaning('large', 'big') && sameMeaning('begin', 'start') && !sameMeaning('dog', 'big')));
  const rot = await p.evaluate(() => { courseAdd('price'); const list = contextsFor('price'); const a = nextContext('price'); markContext('price', a.en); const b2 = nextContext('price'); return { n: list.length, diff: !!b2 && b2.en !== a.en }; });
  ok('contexts_rotate', rot.n >= 2 && rot.diff, rot);

  // word cloze: one wrong try reveals a letter, then the right answer scores below 1 but counts as correct
  await p.evaluate(() => { courseAdd('borrow'); S.words.borrow.stage = 2; save(); });
  await run([{ type: 'wordcloze', id: 'w:borrow' }]); await p.waitForTimeout(300);
  const b0 = await blank();
  await type('steal');
  const b1 = await blank(), note1 = await p.textContent('.cz-note');
  await p.screenshot({ path: out + '/cloze-retry.png' });
  ok('retry_reveals_letter', b0.startsWith('b') && b1.startsWith(b0.replace(/_+$/, '').slice(0, 1)) && b1.replace(/_/g, '').length === b0.replace(/_/g, '').length + 1 && note1.includes('한 번 더'), { b0, b1, note1 });
  const ans = await p.evaluate(() => { const e = document.querySelector('.blank'); return e ? null : null; });
  const form = await p.evaluate(() => [...document.querySelectorAll('.prompt-en')].map(x => x.textContent).join(' '));
  const word = await p.evaluate(() => { const f = formsOf('borrow'); const en = S.words.borrow.lastCtx; return toks(en).find(t => f.has(t)); });
  await type(word);
  const fb = await p.evaluate(() => ({ good: !!document.querySelector('.fb.good'), stage: S.words.borrow.stage, card: S.cards['w:borrow'] && S.cards['w:borrow'].reps }));
  ok('retry_then_correct', fb.good && fb.stage === 3 && fb.card === 1, { fb, word, form });

  // synonym bonus: typing a word with the same meaning gives a free letter and a friendly note
  await p.evaluate(() => { courseAdd('big'); S.words.big.stage = 3; save(); });
  await run([{ type: 'wordrecall', id: 'w:big' }]); await p.waitForTimeout(300);
  await type('large');
  const bonus = { note: await p.textContent('.cz-note'), blank: await blank() };
  await p.screenshot({ path: out + '/cloze-bonus.png' });
  ok('bonus_hint', bonus.note.includes('보너스 힌트') && bonus.blank === 'bi_', bonus);
  await type('big');
  ok('bonus_no_penalty', await p.evaluate(() => !!document.querySelector('.fb.good') && S.cards['w:big'].s >= 1.5));

  // hint button reveals letters; "정답 보기" requires retyping and counts as a miss (requeued)
  await p.evaluate(() => { courseAdd('receipt'); S.words.receipt.stage = 3; save(); });
  await run([{ type: 'wordrecall', id: 'w:receipt' }]); await p.waitForTimeout(300);
  await p.click('[data-act="hint"]'); await p.click('[data-act="hint"]');
  const hb = await blank();
  await p.click('[data-act="show"]'); await p.waitForTimeout(150);
  const shown = await blank();
  await type('recipe');
  const still = await p.evaluate(() => !document.querySelector('.fb'));
  await type('receipt');
  const miss = await p.evaluate(() => ({ bad: !!document.querySelector('.fb.bad'), requeued: session.steps.length === 2, lapses: S.cards['w:receipt'].reps }));
  ok('hint_and_show', hb === 'rec____' && shown === 'receipt' && still && miss.bad && miss.requeued, { hb, shown, still, miss });

  // chunk cloze: due chunks get typed-cloze reviews in a session
  const plan = await p.evaluate(() => { DECK.slice(0, 9).forEach(c => S.cards[c.id] = { due: Date.now() - 1000, s: 2, d: 5, reps: 2, lapses: 0, last: Date.now() - 3 * DAY }); save();
    return buildSession().steps.map(s => s.type); });
  ok('session_has_cloze', plan.includes('cloze') && plan.includes('recall') && plan.includes('shadow'), plan);
  const cid = await p.evaluate(() => DECK.slice(0, 9).find(c => clozeTarget(c)).id);
  await run([{ type: 'cloze', id: cid }]); await p.waitForTimeout(300);
  await p.screenshot({ path: out + '/cloze-chunk.png' });
  const tg = await p.evaluate(id => clozeTarget(cardById(id)).t, cid);
  await type(tg);
  ok('chunk_cloze_correct', await p.evaluate(() => !!document.querySelector('.fb.good')), tg);

  // synonym/antonym chips on the word card
  await p.evaluate(() => openWord('big')); await p.waitForTimeout(300);
  const syn = await p.textContent('.sheet .syn').catch(() => '');
  ok('word_card_syn', syn.includes('비슷한 말') && syn.includes('large') && syn.includes('반대말') && syn.includes('small'), syn);
  await p.screenshot({ path: out + '/cloze-wordcard.png' });
  ok('no_overflow', !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await b.close();
  console.log(JSON.stringify({ R, errs, fails: Object.values(R).filter(v => v !== 'PASS').length }, null, 1));
})();
