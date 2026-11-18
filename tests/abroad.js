// 해외살이 (ears first) and recorded voices: clip lookup, files on disk, episode flow, help ladder, unlocks, ear stats.
const { chromium, devices } = require('playwright');
const fs = require('fs'), path = require('path');
const file = 'file://' + process.argv[2], out = process.argv[3], root = path.dirname(process.argv[2]);
const R = {}; const errs = []; let b;
const ok = (name, cond, extra) => { R[name] = cond ? 'PASS' : 'FAIL ' + JSON.stringify(extra ?? ''); };

async function open(state, hash = '') {
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('malmun.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, { onboarded: true, ...state });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/ERR_FILE_NOT_FOUND|net::|Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto(file + hash); await p.waitForTimeout(600);
  /* playback is not under test here: make every line finish at once */
  await p.evaluate(() => { window.say = async () => {}; });
  return { p, ctx };
}
// plays one scene: optional wrong pick first, optional help presses, then the right answer
async function scene(p, i, { wrong = false, help = 0 } = {}) {
  const right = await p.evaluate(i => abroad.e.scenes[i].opts.find(o => o[1] === true)[0], i);
  for (let k = 0; k < help; k++) await p.click('[data-act="help"]');
  if (wrong) { const w = await p.evaluate(i => abroad.e.scenes[i].opts.find(o => o[1] !== true)[0], i); await p.click(`.opt:text-is("${w}")`); }
  await p.click(`.opt:text-is("${right}")`);
  await p.waitForSelector('.fb'); await p.click('.fb button.primary'); await p.waitForTimeout(150);
}

(async () => {
  b = await chromium.launch();

  // 1) every manifest entry has its files, and lookups find sentences, words and episode lines
  { const src = ['content.js', 'content-abroad.js', 'audio/manifest.js'].map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n;\n');
    const { AUDIO, DECK, WORDS, EPISODES } = new Function(src + ';return {AUDIO, DECK, WORDS, EPISODES};')();
    const missing = Object.entries(AUDIO).flatMap(([k, v]) => [...v].map(i => `audio/${k}-${i}.m4a`)).filter(f => !fs.existsSync(path.join(root, f)));
    ok('clip_files_exist', missing.length === 0, missing.slice(0, 5));
    const lines = EPISODES.flatMap(e => e.scenes.flatMap(s => s.lines));
    const { p, ctx } = await open({});
    const r = await p.evaluate(({ deck, words, lines }) => ({
      deck: deck.filter(t => !clipFor(t)).length, words: words.filter(w => !clipFor(w)).length, lines: lines.filter(t => !clipFor(t)).length,
      cap: clipFor('Hello'.toUpperCase() === 'HELLO' ? 'Coffee' : ''), none: clipFor('This sentence was never recorded.'),
      alt: hasAltVoice(deck[0]) && clipFor(deck[0]) !== clipFor(deck[0], true) }),
      { deck: DECK.map(c => c.en), words: Object.keys(WORDS), lines: lines.map(l => l.en) });
    ok('clip_lookup_all_content', r.deck === 0 && r.words === 0 && r.lines === 0, r);
    ok('clip_lookup_word_case_and_unknown', /^audio\/x[0-9a-z]+-\d\.m4a$/.test(r.cap || '') && r.none === null, r);
    ok('clip_second_voice', r.alt, r);
    ok('home_chip_recorded_voice', (await p.textContent('.note')).includes('원어민 녹음 음성'));
    ok('home_abroad_cta', !!(await p.$('[data-cta="abroad"]')));
    await ctx.close(); }

  // 2) episode list: A1 learner sees the first episode open and A2+ ones locked
  { const { p, ctx } = await open({ level: 'A1' }, '#abroad');
    const st = await p.$$eval('[data-ep]', bs => bs.map(x => [x.dataset.ep, x.disabled]));
    ok('ep_list', st.length === 6 && st[0][1] === false && st.find(x => x[0] === 'neighbor')[1] === true, st);
    await p.screenshot({ path: out + '/ab-list.png' });
    // 3) play episode 1: a wrong pick shows what went wrong; the first scene is then not "by ear"
    await p.click('[data-ep="arrive"]'); await p.waitForTimeout(200);
    ok('scene_no_subtitles_first', !(await p.$('.subs')) && !!(await p.$('.listen-card')));
    const right = await p.evaluate(() => abroad.e.scenes[0].opts.find(o => o[1] === true)[0]);
    const wrong = await p.evaluate(() => abroad.e.scenes[0].opts.find(o => o[1] !== true));
    await p.click(`.opt:text-is("${wrong[0]}")`);
    ok('wrong_shows_consequence', (await p.textContent('.conseq')).includes(wrong[1].slice(0, 10)) && !(await p.$('.fb')));
    await p.screenshot({ path: out + '/ab-wrong.png' });
    await p.click(`.opt:text-is("${right}")`); await p.waitForSelector('.fb');
    ok('right_reveals_subtitles', (await p.$$('.fb .sub-line')).length >= 1 && (await p.textContent('.fb')).includes('귀 팁'));
    await p.screenshot({ path: out + '/ab-solved.png' });
    await p.click('.fb button.primary'); await p.waitForTimeout(150);
    // help ladder on scene 2: slow, keys, subtitles, translation
    for (let k = 0; k < 4; k++) await p.click('[data-act="help"]');
    ok('help_ladder', !!(await p.$('.keys')) && !!(await p.$('.subs .prompt-en')) && !!(await p.$('.subs.ko')) && !(await p.$('[data-act="help"]')));
    await p.screenshot({ path: out + '/ab-help.png' });
    const right2 = await p.evaluate(() => abroad.e.scenes[1].opts.find(o => o[1] === true)[0]);
    await p.click(`.opt:text-is("${right2}")`); await p.waitForSelector('.fb'); await p.click('.fb button.primary'); await p.waitForTimeout(150);
    // one "say that again" is free; a second replay is recorded; the slower replay counts as help
    await p.click('.listen-card .speak.jumbo'); await scene(p, 2);
    await p.click('.listen-card .speak.jumbo'); await p.click('.listen-card .speak.jumbo');
    ok('replay_note', (await p.textContent('.listen-card')).includes('여러 번 들었어요'));
    await scene(p, 3);
    const N = await p.evaluate(() => abroad.e.scenes.length), lines = await p.evaluate(() => abroad.e.scenes.reduce((n, s) => n + s.lines.length, 0));
    for (let i = 4; i < N; i++) await scene(p, i, { help: i === 4 ? 1 : 0 });
    await p.waitForTimeout(300);
    const ear = await p.evaluate(() => S.ear), clean = N - 5 + 1, want = '0010' + '0' + '1'.repeat(N - 5);
    ok('episode_end_stats', ear.eps.arrive.best === clean && ear.clean === clean && ear.scenes === N && ear.recent.join('') === want, { ear, want });
    ok('episode_end_screen', (await p.textContent('.celebrate')).includes(`${clean}장면`) && (await p.$$('.card-s .sub-line')).length === lines);
    await p.screenshot({ path: out + '/ab-end.png', fullPage: true });
    // 4) replaying adds to the meter, but the total only grows by the improvement
    await p.click('.actionbar .ghost'); await p.waitForTimeout(200);
    for (let i = 0; i < N; i++) await scene(p, i);
    await p.waitForTimeout(300);
    const ear2 = await p.evaluate(() => ({ e: S.ear, open: epUnlocked(1) }));
    ok('replay_counts_improvement_only', ear2.e.clean === N && ear2.e.eps.arrive.best === N && ear2.e.eps.arrive.plays === 2 && ear2.e.recent.length === 2 * N && ear2.open, ear2);
    await ctx.close(); }

  // 5) a B1 learner can start every episode up to B1 right away; B2 ones wait for the one before
  { const { p, ctx } = await open({ level: 'B1' }, '#abroad');
    const st = await p.evaluate(() => [...document.querySelectorAll('[data-ep]')].map((x, i) => [EPISODES[i].lvl, x.disabled]));
    ok('level_unlocks', st.every(([l, d], i) => i === 0 || d === (l === 'B2')), st);
    await ctx.close(); }

  await b.close();
  const fails = Object.entries(R).filter(([, v]) => v !== 'PASS');
  console.log(JSON.stringify({ R, errs, fails: fails.length }, null, 1));
})();
