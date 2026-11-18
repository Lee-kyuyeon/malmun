const { chromium, devices } = require('playwright');
(async () => {
  const file = 'file://' + process.argv[2], out = process.argv[3];
  const b = await chromium.launch(); const errs = [];
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { try { if (!localStorage.getItem('malmun.v1')) localStorage.setItem('malmun.v1', JSON.stringify({onboarded:true})); } catch(e){} });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  await p.goto(file); await p.waitForTimeout(400);
  const brand = await p.evaluate(() => ({title: document.title, logo: document.querySelector('.logo').textContent.trim(), deck: DECK.length, words: Object.keys(WORDS).length}));
  // 1) pure extraction
  const pure = await p.evaluate(() => { const r = missedWords("I have a booking under Kim", "I have a reservation under Kim."); return {known: r.known.map(e=>e.w+':'+e.band), unknown: r.unknown}; });
  // 2) recall task in a real session: answer wrong for the reservation chunk
  await p.evaluate(() => { session = {steps:[{type:"recall", id:"c15"}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; location.hash = '#learn'; });
  await p.waitForTimeout(100);
  await p.evaluate(() => { session = {steps:[{type:"recall", id:"c15"}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); });
  await p.fill('#answer', 'I have a booking under Kim'); await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(300);
  const chips = await p.evaluate(() => ({chips: [...document.querySelectorAll('.fb .wchip')].map(c=>c.textContent), note: [...document.querySelectorAll('.fb .ctx')].map(c=>c.textContent).find(t=>t.includes('놓친 단어')), inBook: !!(S.words && S.words.reservation)}));
  await p.screenshot({ path: out + '/word-feedback.png' });
  // 3) word card with parts
  await p.click('.fb .wchip:has-text("reservation")'); await p.waitForTimeout(300);
  const card = await p.evaluate(() => ({parts: [...document.querySelectorAll('.sheet .part b')].map(b=>b.textContent), story: (document.querySelector('.sheet .story')||{}).textContent, mark: (document.querySelector('.sheet mark.w')||{}).textContent, band: (document.querySelector('.sheet .chip')||{}).textContent, ipa: (document.querySelector('.sheet .ipa')||{}).textContent}));
  await p.screenshot({ path: out + '/word-card.png' });
  await p.evaluate(() => closeSheet());
  // 4) next session includes word review; answer meaning then cloze
  const steps = await p.evaluate(() => { const s = buildSession(); return s.steps.filter(x=>x.type.startsWith('word')).map(x=>x.type+':'+x.id); });
  await p.evaluate(() => { session = {steps:[{type:"wordmean", id:"w:reservation"}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); });
  const meanIpa = await p.evaluate(() => (document.querySelector('.task .ipa')||{}).textContent);
  await p.click('.opt:has-text("예약")'); await p.waitForTimeout(300);
  const afterMean = await p.evaluate(() => ({reps: S.cards['w:reservation'] && S.cards['w:reservation'].reps, fbGood: !!document.querySelector('.fb.good')}));
  await p.evaluate(() => { const c = S.cards['w:reservation']; c.due = Date.now()-1; save(); const s = buildSession(); window.__clozeType = (s.steps.find(x=>x.id==='w:reservation')||{}).type; session = {steps:[{type:"wordcloze", id:"w:reservation"}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false}; renderStep(); });
  const blank = await p.evaluate(() => (document.querySelector('.blank')||{}).textContent);
  await p.fill('#answer', 'reservation'); await p.click('.actionbar button:has-text("확인")'); await p.waitForTimeout(300);
  const afterCloze = await p.evaluate(() => ({type: window.__clozeType, reps: S.cards['w:reservation'].reps, fbGood: !!document.querySelector('.fb.good')}));
  await p.screenshot({ path: out + '/word-cloze.png' });
  // 5) deck words view
  await p.evaluate(() => { session = null; deckMode = 'words'; location.hash = '#deck'; }); await p.waitForTimeout(300);
  const deck = await p.evaluate(() => ({title: document.querySelector('.title').textContent, rows: [...document.querySelectorAll('.cards .card .en')].map(e=>e.textContent).slice(0,3), ipaRows: document.querySelectorAll('.cards .card .ipa').length}));
  await p.screenshot({ path: out + '/word-deck.png', fullPage: true });
  await p.click('.filters button:has-text("전체 단어")'); await p.waitForTimeout(200);
  const allRows = await p.evaluate(() => document.querySelectorAll('.cards .card').length);
  // 6) talk correction → words
  const talkWords = await p.evaluate(() => { const r = missedWords("Can I get a window sit?", "Can I have a window seat?"); return r.known.map(e=>e.w); });
  // 7) me stats
  await p.evaluate(() => { location.hash = '#me'; }); await p.waitForTimeout(200);
  const me = await p.evaluate(() => [...document.querySelectorAll('.kpi span')].map(s=>s.textContent));
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(JSON.stringify({meanIpa, errs, brand, pure, chips, card, steps, afterMean, blank, afterCloze, deck, allRows, talkWords, me, overflow}, null, 1));
  await b.close();
})();
