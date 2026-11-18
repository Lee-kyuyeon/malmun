const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['Pixel 7'] });
  await ctx.addInitScript(() => { try { if (!localStorage.getItem('malmun.v1')) localStorage.setItem('malmun.v1', JSON.stringify({onboarded:true})); } catch(e){} }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  await p.goto('file://' + process.argv[2]); await p.waitForTimeout(500);
  // 1) self-reported shadowing must not touch the memory model
  const shadow = await p.evaluate(() => {
    session = {steps:[{type:"shadow",id:"c01"}], i:0, combo:0, xp:0, right:0, total:0, misses:{}, retried:new Set(), started:Date.now(), done:false};
    const before = JSON.stringify(S.cards.c01||null); const box = document.createElement("section"); document.body.append(box);
    finish(box, cardById("c01"), {type:"shadow",id:"c01"}, 1, 6000, null, {selfReport:true});
    return {before, after: JSON.stringify(S.cards.c01||null), total: session.total, xp: session.xp};
  });
  // 2) talk flow with a scripted engine
  await p.evaluate(() => {
    const Q = [
      {reply:"Hi there! What can I get you today?", reply_ko:"안녕하세요! 뭐 드릴까요?", corrected:"", suggestions:["Can I get a latte?","What do you recommend?"], missions_done:[]},
      {reply:"Sure! What size would you like?", reply_ko:"사이즈는요?", corrected:"I want an americano.", note_ko:"모음 앞에 오는 관사를 확인해 보세요", error_type:"article", missions_done:[0], suggestions:["Large, please."]},
      {reply:"Great. For here or to go?", reply_ko:"드시고 가세요?", corrected:"Can you tell me where the station is?", note_ko:"x", error_type:"other", missions_done:[0,1], suggestions:["To go, please."]},
      {reply:"Here you go. Have a nice day!", reply_ko:"여기요", corrected:"For here, please.", note_ko:"정중한 한 단어를 붙여 보세요", error_type:"word_choice", missions_done:[0,1,2], end:true, suggestions:[]},
      {summary_ko:"주문을 끝까지 해냈어요.", strength_ko:"짧고 분명했어요.", fix_ko:"관사 a/an을 챙기세요. 예: an americano", chunks:[{en:"What size would you like?",ko:"사이즈는요?"},{en:"For here or to go?",ko:"드시고 가세요?"},{en:"Have a nice day!",ko:"좋은 하루 되세요"}], corrections_ko:["아메리카노 주세요.","여기서 먹을게요."]}
    ];
    window.__calls = [];
    llm.engine = { chat:{ completions:{ create: async (req) => { window.__calls.push(req.messages[1].content); const r = Q.shift(); return {choices:[{message:{content: JSON.stringify(r)}}]}; } } } };
    S.errors = {}; S.custom = [];
    startTalk(SCENARIOS[0]);
  });
  await p.waitForTimeout(300);
  const send = async (txt, speechMs) => { await p.fill('#talk-input', txt); if (speechMs) await p.evaluate(ms => document.querySelector('#talk-input').dataset.speechMs = String(ms), speechMs); await p.click('button.primary:has-text("보내기")'); await p.waitForTimeout(300); };
  await send("I want a americano", 2400);                 // error → prompt, reply held
  const held = await p.evaluate(() => ({pending: !!talk.pendingFix, aiMsgs: document.querySelectorAll('.msg.ai').length, promptShown: !!document.body.innerText.includes("조금만 고치면 완벽해요")}));
  await send("I want an americano", 2000);                // self-repair
  const afterRepair = await p.evaluate(() => ({pending: !!talk.pendingFix, aiMsgs: document.querySelectorAll('.msg.ai').length, repairedNote: document.body.innerText.includes("스스로 고쳤어요")}));
  await send("Large please", 1500);                       // meaning-changing "correction" → filtered
  const filtered = await p.evaluate(() => ({pending: !!talk.pendingFix, fb: talk.feedback.length, aiMsgs: document.querySelectorAll('.msg.ai').length}));
  await send("for here");                                 // error → prompt → skip
  await p.click('button:has-text("정답 보고 넘어가기")'); await p.waitForTimeout(300);
  const skipped = await p.evaluate(() => ({fb: talk.feedback.map(f=>[f.type,f.selfRepaired]), recast: document.body.innerText.includes("이렇게 말하면 더 자연스러워요"), errors: S.errors}));
  await p.screenshot({ path: process.argv[3] + '/talk-chat.png', fullPage: true });
  await p.click('button:has-text("피드백 받기")'); await p.waitForTimeout(600);
  const recap = await p.evaluate(() => ({kpis: [...document.querySelectorAll('.kpi')].map(k=>k.innerText.replace(/\n/g,' | ')), checks: document.querySelectorAll('input[type=checkbox]').length, types: [...document.querySelectorAll('.note .chip')].map(c=>c.innerText)}));
  await p.click('button:has-text("체크한 문장 복습에 넣기")'); await p.waitForTimeout(200);
  const added = await p.evaluate(() => S.custom.map(c=>[c.tag,c.en,c.ko]));
  await p.screenshot({ path: process.argv[3] + '/talk-recap.png', fullPage: true });
  console.log(JSON.stringify({errs, shadow, held, afterRepair, filtered, skipped, recap, added}, null, 1));
  await b.close();
})();
