/* 재잘 content: chunks (DECK), role-play scenes (SCENARIOS), word dictionary (WORDS).
   Loaded before the app script; ids of the original 81 chunks (c01–c81) are kept so saved progress stays valid. */
"use strict";
/* ---------- chunks: high-frequency formulaic sequences ---------- */
const DECK = [
 {id:"c01",tag:"카페·식당",lvl:"A1",en:"Can I get an iced americano?",ko:"아이스 아메리카노 하나 주세요.",alts:["Could I get an iced americano?","Can I have an iced americano?","Could I have an iced americano?"],note:"주문은 Can I get ~? 하나로 거의 다 됩니다."},
 {id:"c02",tag:"카페·식당",lvl:"A1",en:"For here or to go?",ko:"드시고 가세요, 포장하세요?",alts:[],note:"점원이 가장 먼저 묻는 말. 귀로 먼저 익혀 두세요."},
 {id:"c03",tag:"카페·식당",lvl:"A1",en:"To go, please.",ko:"포장이요.",alts:["To go please."],note:"매장에서 먹으면 For here, please."},
 {id:"c04",tag:"카페·식당",lvl:"A2",en:"Could I get the check, please?",ko:"계산서 주시겠어요?",alts:["Can I get the check, please?","Could we get the check, please?","Can we get the check, please?"],note:"영국에서는 the bill."},
 {id:"c05",tag:"카페·식당",lvl:"A2",en:"I'll have what she's having.",ko:"저분이 드시는 걸로 할게요.",alts:["I will have what she is having."],note:"I'll have ~ 는 주문 확정 표현."},
 {id:"c06",tag:"카페·식당",lvl:"A1",en:"Is this seat taken?",ko:"여기 자리 있나요?",alts:["Is this seat free?"],note:"taken = 이미 누가 앉은."},
 {id:"c07",tag:"스몰토크",lvl:"A1",en:"How's it going?",ko:"잘 지내?",alts:["How is it going?"],note:"대답은 Pretty good, you? 처럼 짧게."},
 {id:"c08",tag:"스몰토크",lvl:"A1",en:"Long time no see.",ko:"오랜만이야.",alts:[],note:"문법보다 덩어리로 외우는 대표 표현."},
 {id:"c09",tag:"스몰토크",lvl:"A2",en:"What have you been up to?",ko:"요즘 뭐 하고 지냈어?",alts:[],note:"be up to = ~을 하며 지내다."},
 {id:"c10",tag:"스몰토크",lvl:"B1",en:"I've been swamped with work.",ko:"요즘 일 때문에 정신없었어.",alts:["I've been swamped at work.","I have been swamped with work."],note:"swamped = 일에 파묻힌."},
 {id:"c11",tag:"스몰토크",lvl:"A2",en:"That makes sense.",ko:"그거 말 되네.",alts:["That makes a lot of sense."],note:"상대 말을 이해했다는 신호."},
 {id:"c12",tag:"스몰토크",lvl:"A2",en:"I'm not sure what you mean.",ko:"무슨 뜻인지 잘 모르겠어요.",alts:["I am not sure what you mean."],note:"못 알아들어도 대화를 이어가는 생존 표현."},
 {id:"c13",tag:"스몰토크",lvl:"A1",en:"Could you say that again?",ko:"다시 한 번 말해 줄래요?",alts:["Can you say that again?","Could you say that again, please?"],note:"Pardon? 보다 자연스럽습니다."},
 {id:"c14",tag:"스몰토크",lvl:"A2",en:"Let me think about it.",ko:"생각 좀 해볼게요.",alts:[],note:"바로 답하기 어려울 때 시간을 버는 말."},
 {id:"c15",tag:"여행",lvl:"A2",en:"I have a reservation under Kim.",ko:"김으로 예약했어요.",alts:["I have a reservation under the name Kim."],note:"under + 이름 = ~ 이름으로."},
 {id:"c16",tag:"여행",lvl:"A1",en:"What time is check-out?",ko:"체크아웃은 몇 시예요?",alts:["What time is checkout?"],note:""},
 {id:"c17",tag:"여행",lvl:"A1",en:"How do I get to the station?",ko:"역까지 어떻게 가요?",alts:["How can I get to the station?"],note:"How do I get to ~? 길 묻기의 기본형."},
 {id:"c18",tag:"여행",lvl:"A2",en:"Is it within walking distance?",ko:"걸어갈 수 있는 거리인가요?",alts:[],note:""},
 {id:"c19",tag:"여행",lvl:"A2",en:"Could you take a picture of us?",ko:"저희 사진 좀 찍어 주실래요?",alts:["Can you take a picture of us?","Could you take a photo of us?"],note:""},
 {id:"c20",tag:"여행",lvl:"A1",en:"I think I'm lost.",ko:"길을 잃은 것 같아요.",alts:["I think I am lost."],note:"I think 로 시작하면 말이 부드러워집니다."},
 {id:"c21",tag:"직장·면접",lvl:"B1",en:"Let me walk you through it.",ko:"차근차근 설명해 드릴게요.",alts:[],note:"walk someone through = 단계별로 안내하다."},
 {id:"c22",tag:"직장·면접",lvl:"B1",en:"I'll get back to you by Friday.",ko:"금요일까지 답드릴게요.",alts:["I will get back to you by Friday."],note:"get back to = 나중에 다시 연락하다."},
 {id:"c23",tag:"직장·면접",lvl:"B1",en:"Can we push the meeting to three?",ko:"회의를 3시로 미룰 수 있을까요?",alts:["Could we push the meeting to three?","Can we move the meeting to three?"],note:"push = 뒤로 미루다, move up = 당기다."},
 {id:"c24",tag:"직장·면접",lvl:"A2",en:"I'm on it.",ko:"제가 바로 할게요.",alts:["I am on it."],note:""},
 {id:"c25",tag:"직장·면접",lvl:"A2",en:"That's a good point.",ko:"좋은 지적이에요.",alts:["That is a good point."],note:"회의에서 동의하며 말을 이을 때."},
 {id:"c26",tag:"직장·면접",lvl:"B1",en:"I'd like to build on that.",ko:"거기에 덧붙이고 싶어요.",alts:["I would like to build on that."],note:"남의 의견에 이어서 말할 때."},
 {id:"c27",tag:"직장·면접",lvl:"A2",en:"I'm in charge of marketing.",ko:"저는 마케팅을 담당하고 있어요.",alts:["I am in charge of marketing.","I'm responsible for marketing."],note:"in charge of ~ = ~ 담당."},
 {id:"c28",tag:"직장·면접",lvl:"B1",en:"One of my strengths is that I adapt quickly.",ko:"제 강점 중 하나는 적응이 빠르다는 거예요.",alts:[],note:"One of my strengths is ~ 면접 단골 틀."},
 {id:"c29",tag:"감정·의견",lvl:"A2",en:"I'm really looking forward to it.",ko:"정말 기대돼요.",alts:["I am really looking forward to it."],note:"look forward to 뒤에는 명사나 -ing."},
 {id:"c30",tag:"감정·의견",lvl:"A2",en:"It's not a big deal.",ko:"별일 아니야.",alts:["It is not a big deal.","It's no big deal."],note:""},
 {id:"c31",tag:"감정·의견",lvl:"B1",en:"I couldn't agree more.",ko:"전적으로 동의해.",alts:["I could not agree more."],note:"더 동의할 수 없을 만큼 = 완전 동의."},
 {id:"c32",tag:"감정·의견",lvl:"B1",en:"I see where you're coming from.",ko:"왜 그렇게 말하는지 알겠어.",alts:["I see where you are coming from."],note:"반대하기 전에 공감부터 표시하는 말."},
 {id:"c33",tag:"감정·의견",lvl:"A2",en:"To be honest, I'm a bit nervous.",ko:"솔직히 좀 긴장돼.",alts:["Honestly, I'm a bit nervous.","To be honest, I am a bit nervous."],note:""},
 {id:"c34",tag:"감정·의견",lvl:"A2",en:"That sounds like a plan.",ko:"좋아, 그렇게 하자.",alts:["Sounds like a plan."],note:""},
 {id:"c35",tag:"감정·의견",lvl:"B1",en:"I'm down for that.",ko:"나 그거 좋아, 콜.",alts:["I am down for that.","I'm down."],note:"친구 사이 캐주얼 표현."},
 {id:"c36",tag:"감정·의견",lvl:"A1",en:"No worries.",ko:"괜찮아, 신경 쓰지 마.",alts:["No worries at all."],note:"Thank you / Sorry 에 대한 가벼운 답."},
 /* ---- added for the A1–B2 curriculum: every situation × level has at least 4 chunks ---- */
 {id:"c37",tag:"감정·의견",lvl:"A1",en:"That's great!",ko:"잘됐다!",alts:["That is great!"],note:"좋은 소식에 바로 반응하는 말."},
 {id:"c38",tag:"감정·의견",lvl:"A1",en:"I'm a little tired today.",ko:"오늘 좀 피곤해.",alts:["I am a little tired today.","I'm a bit tired today."],note:"a little = 조금. 감정을 부드럽게."},
 {id:"c39",tag:"감정·의견",lvl:"A1",en:"I don't like it.",ko:"그거 마음에 안 들어.",alts:["I do not like it."],note:""},
 {id:"c40",tag:"감정·의견",lvl:"B1",en:"It's not my cup of tea.",ko:"내 취향은 아니야.",alts:["It is not my cup of tea."],note:"싫다는 말을 부드럽게 돌려 말하기."},
 {id:"c41",tag:"감정·의견",lvl:"B2",en:"I have mixed feelings about it.",ko:"그건 좋기도 하고 싫기도 해.",alts:["I've got mixed feelings about it."],note:"한마디로 정하기 어려울 때."},
 {id:"c42",tag:"감정·의견",lvl:"B2",en:"That's easier said than done.",ko:"말이야 쉽지.",alts:["That is easier said than done."],note:""},
 {id:"c43",tag:"감정·의견",lvl:"B2",en:"I'm on the fence about it.",ko:"아직 마음을 못 정했어.",alts:["I am on the fence about it."],note:"on the fence = 어느 쪽도 아닌."},
 {id:"c44",tag:"감정·의견",lvl:"B2",en:"Let's agree to disagree.",ko:"생각이 다른 걸로 하고 넘어가자.",alts:["Let us agree to disagree."],note:"논쟁을 기분 좋게 마무리하는 말."},
 {id:"c45",tag:"스몰토크",lvl:"A1",en:"Nice to meet you.",ko:"만나서 반가워요.",alts:["Nice to meet you too."],note:""},
 {id:"c46",tag:"스몰토크",lvl:"B1",en:"It's been ages since we last talked.",ko:"마지막으로 얘기한 지 엄청 오래됐네.",alts:["It has been ages since we last talked."],note:"ages = 아주 오랜 시간."},
 {id:"c47",tag:"스몰토크",lvl:"B1",en:"Speaking of which, did you see the game?",ko:"말 나온 김에, 경기 봤어?",alts:["Speaking of which, did you watch the game?"],note:"Speaking of which = 말 나온 김에."},
 {id:"c48",tag:"스몰토크",lvl:"B1",en:"I've been meaning to ask you.",ko:"물어보려고 했었어.",alts:["I have been meaning to ask you."],note:"미뤄 둔 질문을 꺼낼 때."},
 {id:"c49",tag:"스몰토크",lvl:"B2",en:"I'll let you get back to work.",ko:"이제 일 보세요.",alts:["I will let you get back to work."],note:"대화를 자연스럽게 끝내는 말."},
 {id:"c50",tag:"스몰토크",lvl:"B2",en:"We should catch up properly sometime.",ko:"언제 제대로 얘기 좀 하자.",alts:["We should catch up sometime."],note:"catch up = 근황을 나누다."},
 {id:"c51",tag:"스몰토크",lvl:"B2",en:"That rings a bell.",ko:"어디서 들어 본 것 같아.",alts:["That name rings a bell."],note:""},
 {id:"c52",tag:"스몰토크",lvl:"B2",en:"I couldn't help overhearing.",ko:"우연히 듣게 됐는데요.",alts:["I could not help overhearing."],note:"남의 대화에 끼어들 때 정중하게."},
 {id:"c53",tag:"여행",lvl:"A1",en:"Where is the restroom?",ko:"화장실이 어디예요?",alts:["Where's the restroom?","Where is the bathroom?"],note:"영국에서는 toilet도 흔해요."},
 {id:"c54",tag:"여행",lvl:"A2",en:"Can I have a window seat?",ko:"창가 자리로 주실 수 있어요?",alts:["Could I have a window seat?","Can I get a window seat?"],note:"통로 쪽은 aisle seat."},
 {id:"c55",tag:"여행",lvl:"B1",en:"My flight was delayed.",ko:"비행기가 지연됐어요.",alts:[],note:""},
 {id:"c56",tag:"여행",lvl:"B1",en:"Is breakfast included?",ko:"조식 포함인가요?",alts:["Does it include breakfast?"],note:""},
 {id:"c57",tag:"여행",lvl:"B1",en:"I'd like to change my reservation.",ko:"예약을 변경하고 싶어요.",alts:["I would like to change my reservation."],note:"I'd like to ~ = 정중한 요청의 기본형."},
 {id:"c58",tag:"여행",lvl:"B1",en:"Could you recommend a good place to eat around here?",ko:"근처에 괜찮은 식당 추천해 주실래요?",alts:["Can you recommend a good place to eat around here?"],note:""},
 {id:"c59",tag:"여행",lvl:"B2",en:"My luggage didn't show up on the carousel.",ko:"수하물이 컨베이어에 안 나왔어요.",alts:["My luggage did not show up on the carousel."],note:"show up = 나타나다."},
 {id:"c60",tag:"여행",lvl:"B2",en:"Is there any way I could get an upgrade?",ko:"혹시 업그레이드받을 방법이 있을까요?",alts:["Is there any way I can get an upgrade?"],note:"Is there any way ~? 아주 공손한 부탁."},
 {id:"c61",tag:"여행",lvl:"B2",en:"I was charged twice for the same room.",ko:"같은 방값이 두 번 청구됐어요.",alts:[],note:""},
 {id:"c62",tag:"여행",lvl:"B2",en:"We'd like to make the most of our time here.",ko:"여기 있는 동안 알차게 보내고 싶어요.",alts:["We would like to make the most of our time here."],note:"make the most of = 최대한 활용하다."},
 {id:"c63",tag:"직장·면접",lvl:"A1",en:"I work in sales.",ko:"영업 일을 해요.",alts:["I work in sales now."],note:"I work in + 분야."},
 {id:"c64",tag:"직장·면접",lvl:"A1",en:"See you tomorrow.",ko:"내일 봐요.",alts:["See you tomorrow!"],note:""},
 {id:"c65",tag:"직장·면접",lvl:"A1",en:"I have a question.",ko:"질문이 있어요.",alts:["I've got a question."],note:""},
 {id:"c66",tag:"직장·면접",lvl:"A1",en:"Thank you for your help.",ko:"도와줘서 고마워요.",alts:["Thanks for your help."],note:"Thank you for + 명사/-ing."},
 {id:"c67",tag:"직장·면접",lvl:"A2",en:"Let me check my schedule.",ko:"일정 좀 확인해 볼게요.",alts:["Let me check my calendar."],note:""},
 {id:"c68",tag:"직장·면접",lvl:"B2",en:"Let's circle back to this next week.",ko:"이건 다음 주에 다시 얘기해요.",alts:["Let us circle back to this next week."],note:"circle back = 나중에 다시 다루다."},
 {id:"c69",tag:"직장·면접",lvl:"B2",en:"Could you elaborate on that?",ko:"그 부분을 좀 더 자세히 설명해 주시겠어요?",alts:["Can you elaborate on that?"],note:""},
 {id:"c70",tag:"직장·면접",lvl:"B2",en:"We need to get everyone on the same page.",ko:"모두 같은 이해를 갖게 해야 해요.",alts:[],note:"on the same page = 같은 생각을 공유하는."},
 {id:"c71",tag:"직장·면접",lvl:"B2",en:"Let me play devil's advocate for a second.",ko:"잠깐 일부러 반대 입장에서 말해 볼게요.",alts:["Let me play devil's advocate."],note:"반론을 부드럽게 꺼내는 회의 표현."},
 {id:"c72",tag:"카페·식당",lvl:"A2",en:"Can I get it without ice?",ko:"얼음 빼고 주세요.",alts:["Could I get it without ice?","Can I have it without ice?"],note:"without = ~없이."},
 {id:"c73",tag:"카페·식당",lvl:"A2",en:"Could we see the menu, please?",ko:"메뉴판 좀 볼 수 있을까요?",alts:["Can we see the menu, please?","Could we have the menu, please?"],note:""},
 {id:"c74",tag:"카페·식당",lvl:"B1",en:"What would you recommend?",ko:"뭘 추천하세요?",alts:["What do you recommend?"],note:"고민될 땐 점원에게 넘기기."},
 {id:"c75",tag:"카페·식당",lvl:"B1",en:"I'm allergic to peanuts.",ko:"땅콩 알레르기가 있어요.",alts:["I am allergic to peanuts."],note:"allergic to + 음식."},
 {id:"c76",tag:"카페·식당",lvl:"B1",en:"Could we split the bill?",ko:"따로 계산할 수 있을까요?",alts:["Can we split the bill?","Could we split the check?"],note:""},
 {id:"c77",tag:"카페·식당",lvl:"B1",en:"I think there's a mistake on the bill.",ko:"계산서에 착오가 있는 것 같아요.",alts:["I think there is a mistake on the bill."],note:"I think 로 시작해 부드럽게 지적."},
 {id:"c78",tag:"카페·식당",lvl:"B2",en:"This isn't quite what I ordered.",ko:"제가 주문한 거랑 좀 다른데요.",alts:["This is not quite what I ordered."],note:"not quite = 딱 그건 아닌."},
 {id:"c79",tag:"카페·식당",lvl:"B2",en:"Could you go easy on the salt?",ko:"소금은 조금만 넣어 주실래요?",alts:["Can you go easy on the salt?"],note:"go easy on = 적게 쓰다."},
 {id:"c80",tag:"카페·식당",lvl:"B2",en:"We're celebrating, so we'd like something special.",ko:"축하하는 자리라 특별한 걸 먹고 싶어요.",alts:["We are celebrating, so we would like something special."],note:""},
 {id:"c81",tag:"카페·식당",lvl:"B2",en:"It's on me tonight.",ko:"오늘은 내가 살게.",alts:["It is on me tonight.","Tonight is on me."],note:"It's on me = 내가 낼게."}
];
const SCENARIOS = [
 {id:"cafe",tag:"카페·식당",lvl:"A1",t:"카페에서 주문하기",d:"바리스타 Jamie와 음료 주문",persona:"Jamie, a cheerful barista at a busy café in Seattle",setting:"The learner is at the counter ordering.",missions:["음료 주문하기","사이즈나 옵션 말하기","매장/포장 답하기"]},
 {id:"hotel",tag:"여행",lvl:"A2",t:"호텔 체크인",d:"프런트 직원 Priya와 체크인",persona:"Priya, a polite front-desk clerk at a hotel in London",setting:"The learner arrives to check in.",missions:["예약자 이름 말하기","체크아웃 시간 묻기","주변 추천 받기"]},
 {id:"smalltalk",tag:"스몰토크",lvl:"A2",t:"동료와 스몰토크",d:"월요일 아침, 동료 Alex와 주말 이야기",persona:"Alex, a friendly coworker chatting by the coffee machine on Monday morning",setting:"Casual small talk at work.",missions:["주말에 한 일 말하기","상대에게 질문 하나 하기","점심 약속 잡기"]},
 {id:"interview",tag:"직장·면접",lvl:"B1",t:"영어 면접 자기소개",d:"면접관 Morgan의 질문에 답하기",persona:"Morgan, a hiring manager interviewing the learner for a marketing role",setting:"A job interview over video call.",missions:["간단히 자기소개하기","강점 하나 예시와 함께 말하기","면접관에게 질문하기"]},
 {id:"directions",tag:"여행",lvl:"A1",t:"길 묻기",d:"뉴욕 거리에서 행인 Sam에게 길 묻기",persona:"Sam, a helpful local walking in New York",setting:"The learner is lost and stops Sam on the street.",missions:["가려는 곳 말하기","걸어갈 수 있는지 묻기","고맙다고 인사하기"]},
 {id:"weekend",tag:"감정·의견",lvl:"A2",t:"친구와 주말 계획",d:"친구 Riley와 토요일 약속 정하기",persona:"Riley, a close friend texting about weekend plans",setting:"Two friends planning Saturday.",missions:["하고 싶은 것 제안하기","시간과 장소 정하기","약속 확정하기"]},
 {id:"meeting",tag:"직장·면접",lvl:"B2",t:"회의에서 의견 조율하기",d:"팀장 Dana와 일정 연기를 두고 조율",persona:"Dana, a team lead in a project meeting who wants to keep the original deadline",setting:"A work meeting where the learner wants to push the deadline by one week.",missions:["내 의견과 이유 말하기","상대 의견에 공감 표시하기","절충안 제안하기"]},
 {id:"complaint",tag:"카페·식당",lvl:"B2",t:"식당에서 정중하게 불만 말하기",d:"서버 Chris에게 잘못 나온 주문 알리기",persona:"Chris, a busy but friendly server at a restaurant",setting:"The learner's dish came out wrong and the bill seems off.",missions:["주문이 잘못 나왔다고 말하기","원하는 해결 방법 요청하기","계산서 착오 확인하기"]}
];

/* ---------- more situations (phase 1): ids are stable hashes of the English text ---------- */
const chunkId = en => "x" + [...en].reduce((h,c)=>((h*33) ^ c.charCodeAt(0)) >>> 0, 5381).toString(36);
const C = (tag, lvl, en, ko, alts=[], note="") => ({id:chunkId(en), tag, lvl, en, ko, alts, note});
DECK.push(
 /* 쇼핑 */
 C("쇼핑","A1","How much is this?","이거 얼마예요?",["How much is it?"]),
 C("쇼핑","A1","I'm just looking.","그냥 둘러보는 중이에요.",["I'm just browsing."],"점원이 Can I help you? 하면 이렇게."),
 C("쇼핑","A1","Can I try this on?","이거 입어 봐도 돼요?",["Could I try this on?"]),
 C("쇼핑","A1","Do you take cards?","카드 되나요?",["Do you accept cards?"]),
 C("쇼핑","A1","I'll take it.","이걸로 할게요.",["I'll take this one."],"사겠다는 결정의 한마디."),
 C("쇼핑","A1","Can I pay in cash?","현금으로 내도 돼요?",["Could I pay in cash?"]),
 C("쇼핑","A2","Do you have this in a smaller size?","이거 더 작은 사이즈 있어요?",["Do you have this in a smaller size?"]),
 C("쇼핑","A2","Where are the fitting rooms?","탈의실이 어디예요?",["Where is the fitting room?"]),
 C("쇼핑","A2","Is this on sale?","이거 할인 중인가요?",["Is this item on sale?"]),
 C("쇼핑","A2","Can I get a bag, please?","봉투 하나 주시겠어요?",["Could I get a bag, please?"]),
 C("쇼핑","A2","It doesn't fit.","사이즈가 안 맞아요.",["It does not fit."]),
 C("쇼핑","A2","Do you have it in black?","이거 검은색 있어요?",["Do you have this in black?"],"in + 색깔 = ~색으로."),
 C("쇼핑","B1","I'd like to return this.","이거 반품하고 싶어요.",["I would like to return this."]),
 C("쇼핑","B1","Can I exchange it for a different size?","다른 사이즈로 교환할 수 있나요?",["Could I exchange it for a different size?"]),
 C("쇼핑","B1","I have the receipt right here.","영수증 여기 있어요.",["I've got the receipt right here."]),
 C("쇼핑","B1","Is there a warranty on this?","이거 보증 기간이 있나요?",["Does this come with a warranty?"]),
 C("쇼핑","B1","It's a bit out of my price range.","제 예산보다 조금 비싸네요.",["It's a little out of my price range."],"비싸다는 말을 돌려서."),
 C("쇼핑","B1","Could you hold it for me until tomorrow?","내일까지 맡아 주실 수 있어요?",["Can you hold it for me until tomorrow?"]),
 C("쇼핑","B2","Is there any room to negotiate on the price?","가격 조정의 여지가 있을까요?",["Is there any room for negotiation on the price?"],"room = 여지."),
 C("쇼핑","B2","It looked different in the pictures online.","온라인 사진이랑 달라 보이네요.",[]),
 C("쇼핑","B2","Is this the best price you can do?","이게 해 주실 수 있는 최선의 가격인가요?",["Is that the best price you can do?"]),
 C("쇼핑","B2","I'd rather wait until it goes on sale.","세일할 때까지 기다리는 게 낫겠어요.",["I would rather wait until it goes on sale."],"would rather = 차라리 ~하겠다."),
 C("쇼핑","B2","That's a real bargain.","진짜 싸게 잘 샀네요.",["That is a real bargain."]),
 C("쇼핑","B2","The item arrived damaged, so I'd like a full refund.","물건이 파손돼서 와서 전액 환불받고 싶어요.",["The item arrived damaged, so I would like a full refund."]),
 /* 전화·약속 */
 C("전화·약속","A1","Can you hear me?","내 말 들려?",["Can you hear me now?"]),
 C("전화·약속","A1","I'll call you back.","다시 전화할게.",["I will call you back."]),
 C("전화·약속","A1","Are you free tomorrow?","내일 시간 돼?",["Are you free tomorrow?"]),
 C("전화·약속","A1","See you at seven.","7시에 봐.",["See you at 7."]),
 C("전화·약속","A1","Sorry, wrong number.","죄송해요, 잘못 걸었어요.",["Sorry, I have the wrong number."]),
 C("전화·약속","A1","Hi, it's me.","안녕, 나야.",["Hey, it's me."],"전화에선 I'm 대신 it's."),
 C("전화·약속","A2","What time works for you?","몇 시가 좋아요?",["What time is good for you?"],"works for you = 너한테 괜찮다."),
 C("전화·약속","A2","Can I leave a message?","메시지 남길 수 있을까요?",["Could I leave a message?"]),
 C("전화·약속","A2","You're breaking up.","소리가 끊겨요.",["You are breaking up."],"통화가 끊길 때 쓰는 말."),
 C("전화·약속","A2","Let's meet in front of the station.","역 앞에서 만나자.",["Let us meet in front of the station."]),
 C("전화·약속","A2","I'm running a little late.","조금 늦을 것 같아.",["I'm running a bit late."],"run late = 늦어지다."),
 C("전화·약속","A2","Could you speak a little louder?","조금 더 크게 말해 줄래요?",["Can you speak a little louder?"]),
 C("전화·약속","B1","I'd like to make an appointment.","예약을 잡고 싶어요.",["I would like to make an appointment."],"병원·미용실 예약은 appointment."),
 C("전화·약속","B1","Something came up, so I need to cancel.","일이 생겨서 취소해야 해.",[],"come up = 갑자기 생기다."),
 C("전화·약속","B1","Can we reschedule for next week?","다음 주로 일정 바꿀 수 있을까?",["Could we reschedule for next week?"]),
 C("전화·약속","B1","I'll text you the address.","주소 문자로 보내 줄게.",["I will text you the address."]),
 C("전화·약속","B1","Sorry, I missed your call.","미안, 전화 못 받았어.",["Sorry I missed your call."]),
 C("전화·약속","B1","Let me put you on speaker.","스피커폰으로 돌릴게.",["Let me put you on speakerphone."]),
 C("전화·약속","B2","I'm afraid I have to bail on tonight.","미안한데 오늘 밤 약속 못 갈 것 같아.",["I'm afraid I have to bail tonight."],"bail on = 약속을 펑크 내다(구어)."),
 C("전화·약속","B2","Let's play it by ear.","상황 봐서 정하자.",["Let us play it by ear."],"악보 없이 귀로 연주하듯 그때그때."),
 C("전화·약속","B2","Could you pencil me in for Thursday?","목요일로 일단 잡아 주실래요?",["Can you pencil me in for Thursday?"],"연필로 적듯 잠정 일정."),
 C("전화·약속","B2","I'll keep you posted.","계속 소식 전해 줄게.",["I will keep you posted."]),
 C("전화·약속","B2","Sorry to call out of the blue.","갑자기 연락해서 미안해.",["Sorry for calling out of the blue."],"맑은 하늘(blue)에서 뚝 떨어지듯 갑자기."),
 C("전화·약속","B2","Can I get back to you on that?","그건 나중에 답해도 될까?",["Could I get back to you on that?"]),
 /* 병원·약국 */
 C("병원·약국","A1","I don't feel well.","몸이 안 좋아요.",["I do not feel well."]),
 C("병원·약국","A1","I have a headache.","머리가 아파요.",["I've got a headache."]),
 C("병원·약국","A1","I have a fever.","열이 나요.",["I've got a fever."]),
 C("병원·약국","A1","My stomach hurts.","배가 아파요.",["My stomach is hurting."]),
 C("병원·약국","A1","I need a doctor.","의사가 필요해요.",[]),
 C("병원·약국","A1","Where is the pharmacy?","약국이 어디예요?",["Where's the pharmacy?"]),
 C("병원·약국","A2","I have a sore throat.","목이 아파요.",["I've got a sore throat."]),
 C("병원·약국","A2","How often should I take this?","이거 얼마나 자주 먹어야 해요?",["How often do I take this?"],"약을 먹다 = take."),
 C("병원·약국","A2","Do I need a prescription?","처방전이 필요한가요?",[]),
 C("병원·약국","A2","I've had a cough for three days.","사흘째 기침을 해요.",["I have had a cough for three days."],"have had + for = 쭉 그래 왔다."),
 C("병원·약국","A2","I think I caught a cold.","감기에 걸린 것 같아요.",["I think I've caught a cold."]),
 C("병원·약국","A2","Do you have anything for allergies?","알레르기약 있나요?",["Is there anything for allergies?"]),
 C("병원·약국","B1","I'd like to see a doctor as soon as possible.","가능한 한 빨리 진료받고 싶어요.",["I would like to see a doctor as soon as possible."]),
 C("병원·약국","B1","It hurts when I swallow.","삼킬 때 아파요.",[]),
 C("병원·약국","B1","Are there any side effects?","부작용이 있나요?",["Does it have any side effects?"]),
 C("병원·약국","B1","I'm allergic to penicillin.","페니실린 알레르기가 있어요.",["I am allergic to penicillin."]),
 C("병원·약국","B1","Should I take it before or after meals?","식전에 먹어요, 식후에 먹어요?",[]),
 C("병원·약국","B1","I twisted my ankle.","발목을 삐었어요.",["I sprained my ankle."]),
 C("병원·약국","B2","The pain comes and goes.","통증이 있다 없다 해요.",[]),
 C("병원·약국","B2","I've been feeling run-down lately.","요즘 계속 기운이 없어요.",["I have been feeling run-down lately."],"run-down = 지치고 기운 없는."),
 C("병원·약국","B2","Does my insurance cover this?","이거 보험 적용되나요?",["Will my insurance cover this?"]),
 C("병원·약국","B2","I'd like to get a second opinion.","다른 의사 소견도 듣고 싶어요.",["I would like to get a second opinion."]),
 C("병원·약국","B2","The symptoms started a couple of days ago.","증상은 이틀쯤 전에 시작됐어요.",[]),
 C("병원·약국","B2","It's nothing serious, just a mild sprain.","심각한 건 아니고 가볍게 삔 거예요.",["It is nothing serious, just a mild sprain."]),
 /* 집·생활 */
 C("집·생활","A1","Can you help me?","좀 도와줄래요?",["Could you help me?"]),
 C("집·생활","A1","The light is broken.","불이 고장 났어요.",["The light doesn't work."]),
 C("집·생활","A1","I'm home!","나 왔어!",["I am home!"],"집에 들어오면서 하는 인사."),
 C("집·생활","A1","What's for dinner?","저녁 뭐야?",["What is for dinner?"]),
 C("집·생활","A1","It's cold in here.","여기 춥다.",["It is cold in here."]),
 C("집·생활","A1","Good night.","잘 자.",["Good night!"]),
 C("집·생활","A2","The heater isn't working.","히터가 안 돼요.",["The heater is not working."]),
 C("집·생활","A2","Could you turn down the music?","음악 소리 좀 줄여 줄래요?",["Can you turn down the music?"],"turn down = 소리를 줄이다."),
 C("집·생활","A2","I'll take out the trash.","쓰레기 내가 버릴게.",["I will take out the trash."]),
 C("집·생활","A2","My package hasn't arrived yet.","택배가 아직 안 왔어요.",["My package has not arrived yet."]),
 C("집·생활","A2","Can I borrow your charger?","충전기 좀 빌려도 돼?",["Could I borrow your charger?"]),
 C("집·생활","A2","Whose turn is it to do the dishes?","설거지 누구 차례야?",[]),
 C("집·생활","B1","There's a leak under the sink.","싱크대 밑에서 물이 새요.",["There is a leak under the sink."]),
 C("집·생활","B1","When can someone come and fix it?","언제 와서 고쳐 주실 수 있어요?",[]),
 C("집·생활","B1","The rent is due on the first.","월세는 1일까지 내야 해요.",["The rent is due on the 1st."],"due = 기한이 된."),
 C("집·생활","B1","Could you sign for my package?","제 택배 대신 받아 주실래요?",["Can you sign for my package?"]),
 C("집·생활","B1","We're running out of toilet paper.","휴지가 다 떨어져 가.",["We are running out of toilet paper."],"run out of = ~이 떨어지다."),
 C("집·생활","B1","Sorry about the noise last night.","어젯밤 시끄럽게 해서 죄송해요.",[]),
 C("집·생활","B2","I'd like to renew my lease.","임대 계약을 연장하고 싶어요.",["I would like to renew my lease."]),
 C("집·생활","B2","The landlord still hasn't gotten back to me.","집주인이 아직도 연락이 없어요.",["The landlord still hasn't got back to me."]),
 C("집·생활","B2","Let's split the utilities evenly.","공과금은 똑같이 나누자.",["Let us split the utilities evenly."]),
 C("집·생활","B2","Could you keep it down after ten?","열 시 이후엔 조용히 해 주실래요?",["Can you keep it down after ten?"],"keep it down = 소리를 낮추다."),
 C("집·생활","B2","I'd like my deposit back in full.","보증금을 전액 돌려받고 싶어요.",["I would like my deposit back in full."]),
 C("집·생활","B2","I really need to declutter my room.","방 정리 좀 제대로 해야겠어.",[]),
 /* 학교·공부 */
 C("학교·공부","A1","I'm a student.","저는 학생이에요.",["I am a student."]),
 C("학교·공부","A1","What does this word mean?","이 단어 무슨 뜻이에요?",[]),
 C("학교·공부","A1","How do you spell that?","그거 철자가 어떻게 돼요?",["How do you spell it?"]),
 C("학교·공부","A1","Can you say it slowly?","천천히 말해 줄래요?",["Could you say it slowly?"]),
 C("학교·공부","A1","I don't understand.","이해가 안 돼요.",["I do not understand."]),
 C("학교·공부","A1","I have a test tomorrow.","내일 시험이 있어요.",["I've got a test tomorrow."]),
 C("학교·공부","A2","When is the homework due?","숙제 언제까지예요?",[]),
 C("학교·공부","A2","Can I ask a question?","질문해도 될까요?",["Could I ask a question?","May I ask a question?"]),
 C("학교·공부","A2","I'm studying for my exam.","시험공부 중이에요.",["I am studying for my exam."]),
 C("학교·공부","A2","Could you explain that again?","그거 다시 설명해 줄래요?",["Can you explain that again?"]),
 C("학교·공부","A2","What page are we on?","지금 몇 페이지예요?",[]),
 C("학교·공부","A2","I forgot my textbook.","교과서를 깜빡했어요.",["I forgot to bring my textbook."]),
 C("학교·공부","B1","I'm having trouble keeping up.","진도 따라가기가 힘들어요.",["I am having trouble keeping up."],"keep up = 뒤처지지 않고 따라가다."),
 C("학교·공부","B1","Could I get an extension on the assignment?","과제 기한을 연장받을 수 있을까요?",["Can I get an extension on the assignment?"]),
 C("학교·공부","B1","Let's form a study group.","스터디 그룹 만들자.",["Let us form a study group."]),
 C("학교·공부","B1","I need to brush up on my grammar.","문법을 다시 다져야 해요.",[],"brush up on = 녹슨 실력을 다듬다."),
 C("학교·공부","B1","What's the difference between these two?","이 둘의 차이가 뭐예요?",["What is the difference between these two?"]),
 C("학교·공부","B1","I learned it by heart.","그거 통째로 외웠어.",[],"by heart = 마음에 새기듯 외워서."),
 C("학교·공부","B2","I've been cramming all week.","일주일 내내 벼락치기했어.",["I have been cramming all week."],"cram = 꾸역꾸역 쑤셔 넣다."),
 C("학교·공부","B2","Could you walk me through how you got that answer?","그 답이 어떻게 나왔는지 차근차근 알려 줄래요?",[]),
 C("학교·공부","B2","I'm considering majoring in economics.","경제학 전공을 고려하고 있어요.",["I am considering majoring in economics."]),
 C("학교·공부","B2","The lecture went right over my head.","강의가 너무 어려워서 하나도 이해 못 했어.",["The lecture went over my head."],"머리 위로 휙 지나가 버렸다 = 이해 못 함."),
 C("학교·공부","B2","I'd appreciate some feedback on my essay.","제 에세이에 피드백 주시면 감사하겠어요.",["I would appreciate some feedback on my essay."]),
 C("학교·공부","B2","Practice makes perfect.","연습이 완벽을 만든다.",[]),
 /* 취미·여가 */
 C("취미·여가","A1","I like music.","음악을 좋아해요.",[]),
 C("취미·여가","A1","Do you like movies?","영화 좋아해요?",[]),
 C("취미·여가","A1","I play soccer.","축구를 해요.",["I play football."],"영국에선 football."),
 C("취미·여가","A1","Let's go for a walk.","산책하자.",["Let us go for a walk."]),
 C("취미·여가","A1","I love cooking.","요리하는 걸 정말 좋아해요.",["I love to cook."]),
 C("취미·여가","A1","What's your hobby?","취미가 뭐예요?",["What is your hobby?","What are your hobbies?"]),
 C("취미·여가","A2","What do you do in your free time?","시간 날 때 뭐 해요?",[]),
 C("취미·여가","A2","How often do you work out?","운동 얼마나 자주 해요?",[]),
 C("취미·여가","A2","Have you seen this movie?","이 영화 봤어요?",[]),
 C("취미·여가","A2","I'm into hiking these days.","요즘 등산에 빠졌어요.",["I am into hiking these days."],"be into = ~에 빠지다."),
 C("취미·여가","A2","Do you want to join us?","같이 할래?",["Want to join us?"]),
 C("취미·여가","A2","I'm learning to play the guitar.","기타를 배우고 있어요.",["I am learning to play the guitar."]),
 C("취미·여가","B1","I'm thinking of taking up yoga.","요가를 시작해 볼까 해요.",["I am thinking of taking up yoga."],"take up = 새 취미를 시작하다."),
 C("취미·여가","B1","It helps me unwind after work.","퇴근 후에 긴장을 푸는 데 도움이 돼요.",[]),
 C("취미·여가","B1","I'm not very good at it yet.","아직 잘하진 못해요.",["I am not very good at it yet."]),
 C("취미·여가","B1","We should do this more often.","이거 더 자주 하자.",[]),
 C("취미·여가","B1","I got hooked on this show.","이 드라마에 푹 빠졌어.",[],"hooked = 낚싯바늘에 걸린 듯 빠진."),
 C("취미·여가","B1","It's a great way to meet people.","사람들 만나기 좋은 방법이에요.",["It is a great way to meet people."]),
 C("취미·여가","B2","I've really gotten into baking lately.","요즘 베이킹에 제대로 빠졌어.",["I have really gotten into baking lately."]),
 C("취미·여가","B2","It's a bit of a guilty pleasure.","좀 부끄러운 취미이긴 해.",["It is a bit of a guilty pleasure."]),
 C("취미·여가","B2","I'm a bit rusty, but I'll give it a shot.","좀 녹슬었지만 한번 해 볼게.",["I'm a little rusty, but I'll give it a shot."],"rusty = 녹슨, 오래 안 해서 서툰."),
 C("취미·여가","B2","Time flies when you're having fun.","즐거우면 시간 가는 줄 모른다니까.",[]),
 C("취미·여가","B2","I'd love to pick up a new hobby this year.","올해는 새 취미를 하나 시작하고 싶어.",["I would love to pick up a new hobby this year."]),
 C("취미·여가","B2","It takes a lot of patience.","인내심이 많이 필요해.",[]),
 /* 온라인·SNS */
 C("온라인·SNS","A1","What's your Instagram?","인스타 아이디가 뭐야?",["What is your Instagram?"]),
 C("온라인·SNS","A1","Send me a photo.","사진 보내 줘.",["Send me a picture."]),
 C("온라인·SNS","A1","The Wi-Fi is slow.","와이파이가 느려.",["The wifi is slow."]),
 C("온라인·SNS","A1","I'll text you.","문자할게.",["I will text you."]),
 C("온라인·SNS","A1","Did you see my message?","내 메시지 봤어?",[]),
 C("온라인·SNS","A1","What's the password?","비밀번호가 뭐야?",["What is the password?"]),
 C("온라인·SNS","A2","Can you send me the link?","링크 좀 보내 줄래?",["Could you send me the link?"]),
 C("온라인·SNS","A2","My phone is about to die.","폰 배터리가 거의 다 됐어.",[],"die = 배터리가 꺼지다."),
 C("온라인·SNS","A2","I forgot my password.","비밀번호를 잊어버렸어.",[]),
 C("온라인·SNS","A2","I'll post it tonight.","오늘 밤에 올릴게.",["I will post it tonight."]),
 C("온라인·SNS","A2","Can you tag me in the photo?","사진에 나 태그해 줄래?",["Could you tag me in the photo?"]),
 C("온라인·SNS","A2","Let's video chat later.","이따 영상 통화하자.",["Let us video chat later."]),
 C("온라인·SNS","B1","This video went viral.","이 영상 완전 떴어.",[],"viral = 바이러스처럼 퍼지는."),
 C("온라인·SNS","B1","I muted the group chat.","단톡방 알림 꺼 놨어.",[]),
 C("온라인·SNS","B1","Can you share your screen?","화면 공유해 줄 수 있어?",["Could you share your screen?"]),
 C("온라인·SNS","B1","I'm trying to spend less time on my phone.","폰 보는 시간을 줄이려고 해.",["I am trying to spend less time on my phone."]),
 C("온라인·SNS","B1","The app keeps crashing.","앱이 자꾸 꺼져.",[],"keep -ing = 계속 ~하다."),
 C("온라인·SNS","B1","Don't believe everything you read online.","온라인에서 읽는 걸 다 믿지 마.",["Do not believe everything you read online."]),
 C("온라인·SNS","B2","I take what I see on social media with a grain of salt.","SNS에서 보는 건 걸러서 들어.",[],"소금 한 꼬집 쳐서 먹듯 의심하며."),
 C("온라인·SNS","B2","I'm doing a digital detox this weekend.","이번 주말엔 디지털 디톡스 중이야.",["I am doing a digital detox this weekend."]),
 C("온라인·SNS","B2","The comments section got out of hand.","댓글 창이 난리가 났어.",[],"out of hand = 손을 벗어나 통제 불능."),
 C("온라인·SNS","B2","Make sure you back up your files.","파일 꼭 백업해 둬.",["Make sure to back up your files."]),
 C("온라인·SNS","B2","I've been doomscrolling all night.","밤새 우울한 뉴스만 계속 넘겨 봤어.",["I have been doomscrolling all night."]),
 C("온라인·SNS","B2","Let's take this conversation offline.","이 얘기는 따로 직접 하자.",["Let us take this conversation offline."])
);

/* ---------- phase 2a: the first five situations up to ~10 per level ---------- */
DECK.push(
 C("카페·식당","A1","A coffee, please.","커피 한 잔 주세요.",["One coffee, please."]),
 C("카페·식당","A1","Can I have some water?","물 좀 주실래요?",["Could I have some water?"]),
 C("카페·식당","A1","It's delicious.","맛있어요.",["It is delicious.","This is delicious."]),
 C("카페·식당","A1","Table for two, please.","두 명 자리 주세요.",["A table for two, please."]),
 C("카페·식당","A1","I'm full.","배불러요.",["I am full."]),
 C("카페·식당","A1","Where do I pay?","어디서 계산해요?",["Where can I pay?"]),
 C("카페·식당","A2","Can I get a refill?","리필 되나요?",["Could I get a refill?"]),
 C("카페·식당","A2","What's in this?","이 안에 뭐가 들어 있어요?",["What is in this?"]),
 C("카페·식당","A2","Is it spicy?","매워요?",["Is this spicy?"]),
 C("카페·식당","A2","We're ready to order.","이제 주문할게요.",["We are ready to order."]),
 C("카페·식당","A2","Could I have a little more time?","시간 좀 더 주실래요?",["Can I have a little more time?"],"메뉴를 아직 못 골랐을 때."),
 C("카페·식당","A2","Can I get the sauce on the side?","소스는 따로 주실래요?",["Could I get the sauce on the side?"],"on the side = 따로 곁들여."),
 C("카페·식당","B1","Do you have any vegetarian options?","채식 메뉴 있나요?",[]),
 C("카페·식당","B1","How long is the wait?","얼마나 기다려야 해요?",["How long is the wait for a table?"]),
 C("카페·식당","B1","Could we get a table by the window?","창가 자리 있을까요?",["Can we get a table by the window?"]),
 C("카페·식당","B1","I'd like my steak medium, please.","스테이크는 미디엄으로 해 주세요.",["I would like my steak medium, please."]),
 C("카페·식당","B1","Could you pack up the leftovers?","남은 거 포장해 주실래요?",["Can you pack up the leftovers?"]),
 C("카페·식당","B1","Is service included?","봉사료 포함인가요?",["Is the service charge included?"]),
 C("카페·식당","B2","We'll get a few small plates to share.","나눠 먹을 작은 요리 몇 개로 할게요.",["We will get a few small plates to share."]),
 C("카페·식당","B2","Could you recommend a wine that goes well with this?","이거랑 잘 어울리는 와인 추천해 주실래요?",[],"go well with = ~와 잘 어울리다."),
 C("카페·식당","B2","The service here is top-notch.","여기 서비스 최고네요.",[],"top-notch = 최고 수준의."),
 C("카페·식당","B2","I'm trying to cut back on sugar.","설탕을 줄이려고 해요.",["I am trying to cut back on sugar."],"cut back on = 양을 줄이다."),
 C("카페·식당","B2","Let's grab a bite after work.","퇴근하고 간단히 뭐 좀 먹자.",["Let us grab a bite after work."],"grab a bite = 간단히 먹다."),
 C("카페·식당","B2","My compliments to the chef.","셰프께 정말 맛있었다고 전해 주세요.",[]),
 C("스몰토크","A1","What's your name?","이름이 뭐예요?",["What is your name?"]),
 C("스몰토크","A1","Where are you from?","어디서 왔어요?",[]),
 C("스몰토크","A1","Nice weather today.","오늘 날씨 좋네요.",["Nice weather today, isn't it?"]),
 C("스몰토크","A1","See you later.","나중에 봐요.",["See you."]),
 C("스몰토크","A1","Have a nice day.","좋은 하루 보내요.",["Have a good day."]),
 C("스몰토크","A1","Me too.","저도요.",[]),
 C("스몰토크","A2","What do you do?","무슨 일 하세요?",["What do you do for a living?"],"직업을 묻는 가장 흔한 말."),
 C("스몰토크","A2","How was your weekend?","주말 어땠어?",[]),
 C("스몰토크","A2","Have you been here before?","여기 와 본 적 있어요?",[]),
 C("스몰토크","A2","It's freezing today.","오늘 엄청 춥다.",["It is freezing today."]),
 C("스몰토크","A2","What are you up to this weekend?","이번 주말에 뭐 해?",[]),
 C("스몰토크","A2","How do you know each other?","두 분 서로 어떻게 알아요?",[]),
 C("스몰토크","B1","I don't think we've met.","처음 뵙는 것 같네요.",["I do not think we have met."]),
 C("스몰토크","B1","Small world!","세상 참 좁다!",["It's a small world!"]),
 C("스몰토크","B1","Did you hear about the new café?","새로 생긴 카페 얘기 들었어?",["Have you heard about the new café?"]),
 C("스몰토크","B1","You seem to be in a good mood.","기분 좋아 보이네.",["You seem like you're in a good mood."]),
 C("스몰토크","B1","Anyway, it was great talking to you.","아무튼, 얘기 즐거웠어요.",["Anyway, it was nice talking to you."],"대화를 끝내는 신호."),
 C("스몰토크","B1","How's work been?","요즘 일은 좀 어때?",["How has work been?"]),
 C("스몰토크","B2","I'm terrible with names.","제가 이름을 잘 못 외워요.",["I am terrible with names."]),
 C("스몰토크","B2","Let's not talk shop.","일 얘기는 하지 말자.",["Let us not talk shop."],"talk shop = 가게(일) 얘기를 하다."),
 C("스몰토크","B2","You haven't changed a bit.","하나도 안 변했네.",["You have not changed a bit."]),
 C("스몰토크","B2","Long story short, we missed the train.","간단히 말하면, 기차를 놓쳤어.",[]),
 C("스몰토크","B2","I'll leave you to it.","하던 거 마저 해.",["I will leave you to it."]),
 C("스몰토크","B2","Sorry, I didn't catch your name.","죄송해요, 성함을 못 들었어요.",["Sorry, I did not catch your name."],"catch = (말을) 알아듣다."),
 C("여행","A1","One ticket, please.","표 한 장 주세요.",["One ticket please."]),
 C("여행","A1","Where is the bus stop?","버스 정류장이 어디예요?",["Where's the bus stop?"]),
 C("여행","A1","How far is it?","얼마나 멀어요?",[]),
 C("여행","A1","Can I have a map?","지도 한 장 주실래요?",["Could I have a map?"]),
 C("여행","A1","I'm here on vacation.","휴가로 왔어요.",["I am here on vacation.","I'm here on holiday."]),
 C("여행","A1","Take me to this address, please.","이 주소로 가 주세요.",["Please take me to this address."]),
 C("여행","A2","What time does the train leave?","기차가 몇 시에 출발해요?",[]),
 C("여행","A2","Can I check in early?","일찍 체크인할 수 있어요?",["Could I check in early?"]),
 C("여행","A2","How do I get to the airport?","공항에 어떻게 가요?",["How can I get to the airport?"]),
 C("여행","A2","Is there a direct bus?","직행버스 있어요?",[]),
 C("여행","A2","Could you call a taxi for me?","택시 좀 불러 주실래요?",["Can you call a taxi for me?"]),
 C("여행","A2","I'd like a room for two nights.","2박 할 방 주세요.",["I would like a room for two nights."]),
 C("여행","B1","Is there a cheaper way to get there?","더 싸게 가는 방법 있어요?",[]),
 C("여행","B1","I'd like to store my luggage for a few hours.","짐을 몇 시간 맡기고 싶어요.",["I would like to store my luggage for a few hours."]),
 C("여행","B1","Which platform does it leave from?","몇 번 승강장에서 출발해요?",[]),
 C("여행","B1","I missed my connecting flight.","환승 비행기를 놓쳤어요.",[]),
 C("여행","B1","Do I need to transfer?","갈아타야 하나요?",["Do I have to transfer?"]),
 C("여행","B1","Could you keep an eye on my bag?","가방 좀 봐 주실래요?",["Can you keep an eye on my bag?"],"keep an eye on = 눈을 떼지 않고 지켜보다."),
 C("여행","B2","We'd like to go off the beaten path.","잘 안 알려진 곳에 가 보고 싶어요.",["We would like to go off the beaten path."],"사람들이 밟아 다진 길을 벗어나."),
 C("여행","B2","Is it worth the detour?","돌아서 갈 만한 가치가 있나요?",[]),
 C("여행","B2","The jet lag is really getting to me.","시차 때문에 정말 힘드네요.",[],"get to someone = 힘들게 하다."),
 C("여행","B2","I'd like to file a complaint about the room.","방 문제로 정식 항의하고 싶어요.",["I would like to file a complaint about the room."]),
 C("여행","B2","We got ripped off by the taxi driver.","택시 기사한테 바가지 썼어요.",[],"rip off = 바가지 씌우다."),
 C("여행","B2","Is there a local spot you'd recommend?","추천할 만한 현지 맛집 있어요?",["Is there a local spot you would recommend?"]),
 C("직장·면접","A1","Good morning, everyone.","좋은 아침이에요, 여러분.",[]),
 C("직장·면접","A1","I'm busy right now.","지금 바빠요.",["I am busy right now."]),
 C("직장·면접","A1","Here you go.","여기 있어요.",["Here you are."],"물건을 건넬 때."),
 C("직장·면접","A1","Just a moment.","잠시만요.",["Just a minute."]),
 C("직장·면접","A1","I'm new here.","여기 처음 왔어요.",["I am new here."]),
 C("직장·면접","A1","Good job!","잘했어요!",["Great job!"]),
 C("직장·면접","A2","Can you send me the file?","파일 보내 줄래요?",["Could you send me the file?"]),
 C("직장·면접","A2","I'll be in a meeting until two.","두 시까지 회의예요.",["I will be in a meeting until two."]),
 C("직장·면접","A2","Who's in charge of this?","이거 누가 담당이에요?",["Who is in charge of this?"]),
 C("직장·면접","A2","Can we talk for a minute?","잠깐 얘기할 수 있어요?",["Could we talk for a minute?"]),
 C("직장·면접","A2","I'm working from home today.","오늘 재택근무해요.",["I am working from home today."]),
 C("직장·면접","A2","The deadline is Friday.","마감은 금요일이에요.",[]),
 C("직장·면접","B1","I'll look into it.","제가 알아볼게요.",["I will look into it."],"look into = 자세히 들여다보다."),
 C("직장·면접","B1","Can you give me a hand with this?","이거 좀 도와줄래요?",["Could you give me a hand with this?"],"give a hand = 손을 빌려주다."),
 C("직장·면접","B1","Let's touch base tomorrow.","내일 잠깐 확인해요.",["Let us touch base tomorrow."],"야구에서 베이스를 밟듯 잠깐 연락하다."),
 C("직장·면접","B1","I'm afraid I can't make it to the meeting.","미안하지만 회의에 못 갈 것 같아요.",["I'm afraid I cannot make it to the meeting."],"make it = 시간 맞춰 가다."),
 C("직장·면접","B1","Could you clarify what you mean?","무슨 뜻인지 분명히 말씀해 주실래요?",["Can you clarify what you mean?"]),
 C("직장·면접","B1","We're behind schedule.","일정이 밀렸어요.",["We are behind schedule."]),
 C("직장·면접","B2","I'd like to propose a different approach.","다른 접근법을 제안하고 싶어요.",["I would like to propose a different approach."]),
 C("직장·면접","B2","That's outside the scope of this project.","그건 이번 프로젝트 범위 밖이에요.",["That is outside the scope of this project."]),
 C("직장·면접","B2","Can we push back the launch date?","출시일을 미룰 수 있을까요?",["Could we push back the launch date?"],"push back = 뒤로 미루다."),
 C("직장·면접","B2","I'm stretched a bit thin right now.","요즘 일이 많아서 좀 벅차요.",["I am stretched a bit thin right now."],"얇게 늘어난 반죽처럼 여유가 없는."),
 C("직장·면접","B2","Let's not reinvent the wheel.","있는 걸 굳이 새로 만들지 말자.",["Let us not reinvent the wheel."]),
 C("직장·면접","B2","I'd be happy to take the lead on this.","이 건은 제가 기꺼이 맡을게요.",["I would be happy to take the lead on this."]),
 C("감정·의견","A1","I'm happy.","행복해.",["I am happy."]),
 C("감정·의견","A1","I'm sad.","슬퍼.",["I am sad."]),
 C("감정·의견","A1","I love it!","정말 좋아!",[]),
 C("감정·의견","A1","That's funny.","웃기다.",["That is funny."]),
 C("감정·의견","A1","I'm hungry.","배고파.",["I am hungry."]),
 C("감정·의견","A1","Really?","정말?",["Really?!"]),
 C("감정·의견","A2","I'm so happy for you.","정말 잘됐다.",["I am so happy for you."]),
 C("감정·의견","A2","That sounds fun.","재밌겠다.",["That sounds like fun."]),
 C("감정·의견","A2","I'm worried about the test.","시험이 걱정돼.",["I am worried about the test."]),
 C("감정·의견","A2","What do you think?","어떻게 생각해?",[]),
 C("감정·의견","A2","I'm not sure about that.","그건 잘 모르겠어.",["I am not sure about that."]),
 C("감정·의견","A2","That's too bad.","안됐다.",["That is too bad."]),
 C("감정·의견","B1","It's up to you.","너한테 달렸어.",["It is up to you."]),
 C("감정·의견","B1","I can't stand it.","못 참겠어.",["I cannot stand it."],"stand = 견디다."),
 C("감정·의견","B1","I was really disappointed.","정말 실망했어.",[]),
 C("감정·의견","B1","Honestly, I'm a bit overwhelmed.","솔직히 좀 벅차.",["Honestly, I am a bit overwhelmed."]),
 C("감정·의견","B1","That makes me feel better.","그 말 들으니 기분이 나아지네.",[]),
 C("감정·의견","B1","I'm not a big fan of it.","그거 별로 안 좋아해.",["I am not a big fan of it."],"싫다는 말을 부드럽게."),
 C("감정·의견","B2","I'm over the moon!","너무 기뻐!",["I am over the moon!"],"기뻐서 달을 뛰어넘을 듯."),
 C("감정·의견","B2","It really got on my nerves.","그거 진짜 신경 거슬렸어.",[]),
 C("감정·의견","B2","I see your point, but I'm not convinced.","무슨 말인지 알지만 납득은 안 돼.",["I see your point, but I am not convinced."]),
 C("감정·의견","B2","It was a blessing in disguise.","전화위복이었어.",[],"변장한 축복 = 처음엔 나빠 보였던 좋은 일."),
 C("감정·의견","B2","I've had a change of heart.","마음이 바뀌었어.",["I have had a change of heart."]),
 C("감정·의견","B2","Let's look on the bright side.","좋은 쪽으로 생각하자.",["Let us look on the bright side."])
);

/* ---------- phase 2b: the seven newer situations up to ~10 per level ---------- */
DECK.push(
 C("쇼핑","A1","It's too big.","너무 커요.",["It is too big."]),
 C("쇼핑","A1","Do you have a bigger one?","더 큰 거 있어요?",[]),
 C("쇼핑","A1","Where is the cashier?","계산대가 어디예요?",["Where's the cashier?"]),
 C("쇼핑","A1","Just this, please.","이것만 할게요.",["Just this one, please."]),
 C("쇼핑","A2","Is there a student discount?","학생 할인 있어요?",["Do you have a student discount?"]),
 C("쇼핑","A2","Can you gift-wrap it?","선물 포장해 주실 수 있어요?",["Could you gift-wrap it?"]),
 C("쇼핑","A2","I'm looking for a jacket.","재킷을 찾고 있어요.",["I am looking for a jacket."]),
 C("쇼핑","A2","Do you have this in stock?","이거 재고 있어요?",[],"in stock = 재고가 있는."),
 C("쇼핑","B1","What's your return policy?","반품 규정이 어떻게 돼요?",["What is your return policy?"]),
 C("쇼핑","B1","It's cheaper online.","온라인이 더 싸네요.",["It is cheaper online."]),
 C("쇼핑","B1","Do you price match?","다른 곳 최저가에 맞춰 주시나요?",[]),
 C("쇼핑","B1","That was a total impulse buy.","완전 충동구매였어.",[]),
 C("쇼핑","B2","I'm torn between these two.","이 두 개 사이에서 고민돼요.",["I am torn between these two."],"torn = 둘로 찢긴 마음."),
 C("쇼핑","B2","It's worth splurging on good shoes.","좋은 신발엔 돈 좀 써도 괜찮아.",["It is worth splurging on good shoes."]),
 C("쇼핑","B2","It's buy one, get one free.","하나 사면 하나 공짜예요.",["It is buy one, get one free."]),
 C("쇼핑","B2","I'd like to speak to a manager, please.","매니저와 얘기하고 싶어요.",["I would like to speak to a manager, please."]),
 C("전화·약속","A1","Call me later.","나중에 전화해.",[]),
 C("전화·약속","A1","What's your number?","번호가 뭐야?",["What is your number?"]),
 C("전화·약속","A1","I'm on my way.","가는 중이야.",["I am on my way."]),
 C("전화·약속","A1","Let's meet at noon.","정오에 만나자.",["Let us meet at noon."]),
 C("전화·약속","A2","Can I call you tonight?","오늘 밤에 전화해도 돼?",["Could I call you tonight?"]),
 C("전화·약속","A2","Is this a good time to talk?","지금 통화 괜찮아?",[]),
 C("전화·약속","A2","Let me check and call you back.","확인하고 다시 전화할게.",[]),
 C("전화·약속","A2","I'll be there in ten minutes.","10분 안에 도착해.",["I will be there in ten minutes."]),
 C("전화·약속","B1","Could you hold on a second?","잠깐만 기다려 줄래요?",["Can you hold on a second?"]),
 C("전화·약속","B1","I'll put you through to her.","그분께 연결해 드릴게요.",["I will put you through to her."],"put through = 전화를 연결하다."),
 C("전화·약속","B1","Can we make it a bit later?","조금 늦게 만날 수 있을까?",["Could we make it a bit later?"]),
 C("전화·약속","B1","I'm calling about my appointment.","예약 건으로 전화드렸어요.",["I am calling about my appointment."]),
 C("전화·약속","B2","Sorry, you caught me at a bad time.","미안, 지금 타이밍이 안 좋아.",[]),
 C("전화·약속","B2","I'll give you a ring tomorrow.","내일 전화할게.",["I will give you a ring tomorrow."],"give a ring = 전화를 걸다."),
 C("전화·약속","B2","We've been playing phone tag all day.","하루 종일 서로 엇갈리게 전화만 했어.",["We have been playing phone tag all day."],"술래잡기(tag)처럼 엇갈리는 전화."),
 C("전화·약속","B2","Let's find a time that works for everyone.","모두 괜찮은 시간으로 정하자.",["Let us find a time that works for everyone."]),
 C("병원·약국","A1","I feel sick.","속이 안 좋아요.",[]),
 C("병원·약국","A1","My back hurts.","허리가 아파요.",["My back is hurting."]),
 C("병원·약국","A1","I need some medicine.","약이 좀 필요해요.",[]),
 C("병원·약국","A1","Call an ambulance!","구급차 불러 주세요!",["Please call an ambulance!"]),
 C("병원·약국","A2","I can't sleep at night.","밤에 잠을 못 자요.",["I cannot sleep at night."]),
 C("병원·약국","A2","Where does it hurt?","어디가 아파요?",[]),
 C("병원·약국","A2","I feel dizzy.","어지러워요.",["I'm feeling dizzy."]),
 C("병원·약국","A2","Take two pills a day.","하루에 두 알 드세요.",[]),
 C("병원·약국","B1","I've been sneezing all morning.","아침 내내 재채기가 나요.",["I have been sneezing all morning."]),
 C("병원·약국","B1","Do I need to make an appointment?","예약해야 하나요?",[]),
 C("병원·약국","B1","I think I have food poisoning.","식중독인 것 같아요.",[]),
 C("병원·약국","B1","How long will it take to recover?","회복하는 데 얼마나 걸려요?",[]),
 C("병원·약국","B2","I'd like to get a full checkup.","종합 검진을 받고 싶어요.",["I would like to get a full checkup."]),
 C("병원·약국","B2","Can I get this over the counter?","이거 처방전 없이 살 수 있나요?",["Is this available over the counter?"],"over the counter = 계산대 너머로 바로 파는."),
 C("병원·약국","B2","I'm on the mend.","회복 중이에요.",["I am on the mend."],"mend = 수선하다, 고쳐지는 중."),
 C("병원·약국","B2","I've been under the weather all week.","일주일 내내 몸이 안 좋았어.",["I have been under the weather all week."]),
 C("집·생활","A1","Where are my keys?","내 열쇠 어디 있지?",[]),
 C("집·생활","A1","Please close the door.","문 좀 닫아 줘.",["Close the door, please."]),
 C("집·생활","A1","I'm going to bed.","자러 갈게.",["I am going to bed."]),
 C("집·생활","A1","The water is hot.","물이 뜨거워.",[]),
 C("집·생활","A2","Could you water the plants?","화분에 물 좀 줄래?",["Can you water the plants?"]),
 C("집·생활","A2","The internet isn't working.","인터넷이 안 돼.",["The internet is not working."]),
 C("집·생활","A2","I'll do the laundry.","빨래는 내가 할게.",["I will do the laundry."]),
 C("집·생활","A2","Can you pick up some milk?","우유 좀 사 올래?",["Could you pick up some milk?"],"pick up = 가는 길에 사 오다."),
 C("집·생활","B1","The washing machine is making a weird noise.","세탁기에서 이상한 소리가 나.",[]),
 C("집·생활","B1","Can you help me move the couch?","소파 옮기는 거 좀 도와줄래?",["Could you help me move the couch?"]),
 C("집·생활","B1","We need to clean up before the guests arrive.","손님 오기 전에 치워야 해.",[]),
 C("집·생활","B1","I locked myself out.","문이 잠겨서 못 들어가.",[],"열쇠를 안에 두고 문을 잠가 버렸을 때."),
 C("집·생활","B2","The neighbors keep complaining about the noise.","이웃들이 소음 때문에 계속 항의해.",[]),
 C("집·생활","B2","Let's divide up the chores.","집안일 나눠서 하자.",["Let us divide up the chores."]),
 C("집·생활","B2","The pipes froze overnight.","밤새 배관이 얼었어.",[]),
 C("집·생활","B2","I'm thinking of moving to a bigger place.","더 큰 집으로 이사할까 생각 중이야.",["I am thinking of moving to a bigger place."]),
 C("학교·공부","A1","Open your books.","책 펴세요.",["Please open your books."]),
 C("학교·공부","A1","I'm late for class.","수업에 늦었어요.",["I am late for class."]),
 C("학교·공부","A1","Can I borrow a pen?","펜 좀 빌려도 돼요?",["Could I borrow a pen?"]),
 C("학교·공부","A1","Is this right?","이거 맞아요?",["Is this correct?"]),
 C("학교·공부","A2","How do you say this in English?","이거 영어로 뭐라고 해요?",[]),
 C("학교·공부","A2","Can you check my answer?","제 답 좀 봐 주실래요?",["Could you check my answer?"]),
 C("학교·공부","A2","I passed the test!","시험 통과했어!",[]),
 C("학교·공부","A2","What's the homework for tomorrow?","내일 숙제가 뭐예요?",["What is the homework for tomorrow?"]),
 C("학교·공부","B1","I'm not following you.","무슨 말인지 잘 못 따라가겠어요.",["I am not following you."],"follow = (이야기를) 따라가다."),
 C("학교·공부","B1","Could you give me an example?","예를 하나 들어 주실래요?",["Can you give me an example?"]),
 C("학교·공부","B1","I need to work on my pronunciation.","발음을 연습해야 해요.",[]),
 C("학교·공부","B1","Let's go over it one more time.","한 번 더 훑어보자.",["Let us go over it one more time."],"go over = 훑어보다, 복습하다."),
 C("학교·공부","B2","I'd like to get a head start on next semester.","다음 학기 공부를 미리 시작하고 싶어요.",["I would like to get a head start on next semester."],"head start = 남보다 앞서 출발."),
 C("학교·공부","B2","It finally clicked.","드디어 이해가 됐어.",[],"딸깍 맞물리듯 이해되다."),
 C("학교·공부","B2","I'm burnt out from studying.","공부하느라 완전히 지쳤어.",["I am burnt out from studying.","I'm burned out from studying."]),
 C("학교·공부","B2","Can you break it down for me?","쉽게 풀어서 설명해 줄래요?",["Could you break it down for me?"],"break down = 잘게 나누다."),
 C("취미·여가","A1","I like reading.","독서를 좋아해요.",["I like to read."]),
 C("취미·여가","A1","Let's play a game.","게임 하자.",["Let us play a game."]),
 C("취미·여가","A1","I go swimming on Sundays.","일요일마다 수영해요.",[]),
 C("취미·여가","A1","Do you like dogs?","강아지 좋아해요?",[]),
 C("취미·여가","A2","I go to the gym three times a week.","일주일에 세 번 헬스장 가요.",[]),
 C("취미·여가","A2","What kind of music do you like?","어떤 음악 좋아해요?",[]),
 C("취미·여가","A2","Let's watch a movie tonight.","오늘 밤 영화 보자.",["Let us watch a movie tonight."]),
 C("취미·여가","A2","I'm good at drawing.","그림을 잘 그려요.",["I am good at drawing."]),
 C("취미·여가","B1","I've been into photography lately.","요즘 사진에 빠졌어요.",["I have been into photography lately."]),
 C("취미·여가","B1","It's a good way to clear my head.","머리 식히기 좋아요.",["It is a good way to clear my head."]),
 C("취미·여가","B1","We could go camping this weekend.","이번 주말에 캠핑 가도 좋겠다.",[]),
 C("취미·여가","B1","I'm saving up for a new camera.","새 카메라 사려고 돈 모으는 중이에요.",["I am saving up for a new camera."]),
 C("취미·여가","B2","Hiking is how I recharge.","등산이 나한테는 재충전 방법이야.",[]),
 C("취미·여가","B2","I'm a total foodie.","나 완전 미식가야.",["I am a total foodie."]),
 C("취미·여가","B2","It's not really my thing, but I'll give it a try.","내 취향은 아니지만 한번 해 볼게.",["It is not really my thing, but I will give it a try."]),
 C("취미·여가","B2","I'd love to do it professionally someday.","언젠가 이걸 전문적으로 해 보고 싶어.",["I would love to do it professionally someday."]),
 C("온라인·SNS","A1","I'm online now.","나 지금 접속해 있어.",["I am online now."]),
 C("온라인·SNS","A1","Check your email.","이메일 확인해 봐.",[]),
 C("온라인·SNS","A1","Like my photo!","내 사진에 좋아요 눌러 줘!",[]),
 C("온라인·SNS","A1","Send it to me.","그거 나한테 보내 줘.",[]),
 C("온라인·SNS","A2","Did you get my email?","내 이메일 받았어?",[]),
 C("온라인·SNS","A2","I'll send you a friend request.","친구 신청 보낼게.",["I will send you a friend request."]),
 C("온라인·SNS","A2","The file is too big to send.","파일이 너무 커서 못 보내.",[]),
 C("온라인·SNS","A2","Can you turn on the subtitles?","자막 좀 켜 줄래?",["Could you turn on the subtitles?"]),
 C("온라인·SNS","B1","I just updated the app.","방금 앱 업데이트했어.",[]),
 C("온라인·SNS","B1","Make sure your account is private.","계정 꼭 비공개로 해 둬.",[]),
 C("온라인·SNS","B1","I'll leave a comment.","댓글 남길게.",["I will leave a comment."]),
 C("온라인·SNS","B1","I unsubscribed from that channel.","그 채널 구독 취소했어.",[]),
 C("온라인·SNS","B2","Don't feed the trolls.","악플러는 상대하지 마.",["Do not feed the trolls."],"관심(먹이)을 주면 더 날뛰니까."),
 C("온라인·SNS","B2","That post really struck a chord.","그 게시물 정말 와닿았어.",[],"strike a chord = 마음의 현을 울리다."),
 C("온라인·SNS","B2","My feed is full of ads lately.","요즘 피드가 광고로 가득해.",[]),
 C("온라인·SNS","B2","I'm trying to curate my feed.","보는 피드를 신중하게 골라 보려고 해.",["I am trying to curate my feed."],"curate = 큐레이터처럼 골라 담다.")
);

/* ---------- WORDS: headword → {pos, ko, band, forms, parts, story, idiom}
   band ≈ frequency: 1 = top ~1,000, 2 = ~1,001–3,000, 3 = rarer (approximate, after NGSL/COCA ranks).
   parts "a=b|c=d" = word parts and their meanings; story = one-line memory hook (etymology or image). ---------- */
const WORDS = {};
const WORD_IGNORE = ["kim","instagram","wi","fi"];
const W = (w, pos, ko, band, x={}) => { WORDS[w] = {w, pos, ko, band, forms:(x.f||"").split(" ").filter(Boolean),
  parts:(x.p||"").split("|").filter(Boolean).map(s=>{ const [p,m] = s.split("="); return {p, m}; }), story:x.s||"", idiom:!!x.i}; };
W("adapt","동사","적응하다",2,{p:"ad=~쪽으로|apt=꼭 맞는",s:"상황 쪽으로 몸을 꼭 맞추다"});
W("address","명사","주소",2);
W("advocate","명사","옹호자",3,{p:"ad=~를 위해|voc=목소리|ate=~하는 사람",s:"누군가를 위해 목소리(voc, voice)를 내는 사람. devil's advocate는 일부러 반대편을 맡는 사람",i:1});
W("afraid","형용사","두려운 · (I'm afraid) 유감이지만",1);
W("ages","명사","(구어) 아주 오랜 시간",1);
W("ago","부사","~전에",1);
W("agree","동사","동의하다",1);
W("allergic","형용사","알레르기가 있는",3,{p:"all(o)=다른|erg=작용|ic=~한",s:"몸이 남들과 '다르게 작용'하는 것 = 알레르기"});
W("allergy","명사","알레르기",3,{f:"allergies",p:"all(o)=다른|erg=작용|y=~것",s:"그리스어 allos(다른) + ergon(작용)"});
W("americano","명사","아메리카노",3,{s:"유럽에 온 미국인(American)이 에스프레소에 물을 타 마신 데서 붙은 이름"});
W("ankle","명사","발목",2);
W("answer","명사·동사","답, 대답하다",1);
W("anything","대명사","무엇이든",1,{p:"any=어떤|thing=것"});
W("app","명사","앱",2,{s:"application(응용 프로그램)을 줄인 말"});
W("appointment","명사","(병원·미용실) 예약, 약속",2,{p:"ap=~에|point=점 찍다|ment=~하는 것",s:"달력의 날짜에 점을 콕 찍어 정한 것"});
W("appreciate","동사","고맙게 여기다",2,{p:"ap=~에|preci=값(price)|ate=하다",s:"값(price)을 높이 매겨 소중히 여기다 → 감사하다"});
W("around","부사·전치사","주변에",1);
W("arrive","동사","도착하다",1,{f:"arrived"});
W("ask","동사","묻다",1);
W("assignment","명사","과제",2,{p:"as=~에게|sign=표시하다|ment=~하는 것",s:"누군가에게 표시해서 맡긴 일 = 과제"});
W("back","부사","뒤로, 다시",1);
W("bag","명사","가방, 봉투",1);
W("bail","동사","(구어) 약속을 펑크 내다",3,{s:"bail out(비행기에서 뛰어내리다)처럼 쏙 빠져나가다",i:1});
W("bake","동사","굽다",2,{f:"baking"});
W("bargain","명사","싸게 잘 산 물건, 흥정",2);
W("believe","동사","믿다",1);
W("bell","명사","종",2,{s:"That rings a bell = 기억 속 종이 '땡' 울리다 → 어디서 들어 본 것 같다",i:1});
W("best","형용사","최고의",1);
W("between","전치사","~사이에",1);
W("big","형용사","큰",1);
W("bill","명사","계산서, 청구서",1);
W("bit","명사","조금",1);
W("black","형용사","검은",1);
W("blue","명사·형용사","파랑",1,{s:"out of the blue = 맑은 하늘(blue)에서 갑자기 번개가 치듯, 난데없이",i:1});
W("borrow","동사","빌리다",2);
W("breakfast","명사","아침 식사",1,{p:"break=깨다|fast=단식",s:"밤새 굶은(fast) 상태를 깨는(break) 첫 끼"});
W("break","동사","깨다, (통화가) 끊기다",1,{f:"breaking broken"});
W("brush","동사","솔질하다 · (brush up on) 다시 다듬다",2,{s:"녹슨 실력을 솔로 문질러 다시 반짝이게"});
W("build","동사","짓다 · (build on) 덧붙여 발전시키다",1);
W("call","동사","전화하다",1);
W("cancel","동사","취소하다",2);
W("card","명사","카드",1,{f:"cards"});
W("carousel","명사","회전목마, (공항) 수하물 컨베이어",3,{s:"빙글빙글 도는 회전목마처럼 짐이 돌아가는 벨트"});
W("cash","명사","현금",2);
W("catch","동사","잡다 · (catch up) 근황을 나누다",1,{f:"caught"});
W("celebrate","동사","축하하다",2,{f:"celebrating",p:"celebr=많이 모인|ate=하다",s:"사람들이 많이 모여 떠들썩하게 기리다"});
W("change","동사","바꾸다",1);
W("charge","동사","(요금을) 청구하다",2,{f:"charged"});
W("charger","명사","충전기",2,{p:"charge=채우다|er=~하는 것",s:"전기를 채워(charge) 주는 것"});
W("chat","명사·동사","수다, 채팅",2);
W("check","명사","계산서, 확인",1);
W("circle","동사","돌다 · (circle back) 다시 다루다",2,{s:"한 바퀴 빙 돌아 원래 주제로 돌아오다"});
W("cold","명사·형용사","감기, 추운",1);
W("come","동사","오다 · (come up) 갑자기 생기다",1,{f:"comes coming"});
W("comment","명사","댓글, 의견",2,{f:"comments",p:"com=함께|ment=마음·생각",s:"함께 생각을 덧붙이는 것"});
W("consider","동사","고려하다",2,{f:"considering",p:"con=함께|sider=별",s:"점성술사가 별자리를 함께 살피듯 신중히 따지다"});
W("conversation","명사","대화",2,{p:"con=함께|vers=돌다|ation=~하는 것",s:"말을 서로 주고받으며 함께 돌리는 것"});
W("cook","동사","요리하다",1,{f:"cooking"});
W("cough","명사","기침",3);
W("couple","명사","둘, 두어 개",2);
W("cover","동사","덮다, (보험이) 보장하다",1);
W("cram","동사","벼락치기하다",3,{f:"cramming",s:"가방에 꾸역꾸역 쑤셔 넣듯 머리에 몰아넣다"});
W("crash","동사","충돌하다, (앱이) 꺼지다",2,{f:"crashing"});
W("cup","명사","컵",1,{s:"영국인에게 차 한 잔은 딱 내 취향 → not my cup of tea = 내 취향 아님",i:1});
W("damage","동사","손상시키다",2,{f:"damaged"});
W("day","명사","날",1,{f:"days"});
W("deal","명사","일, 거래 · (big deal) 큰일",1);
W("declutter","동사","잡동사니를 치우다",3,{p:"de=없애다|clutter=잡동사니",s:"어질러진 것(clutter)을 걷어 내다(de)"});
W("delay","동사","지연시키다",2,{f:"delayed",p:"de=떨어져|lay=두다",s:"뒤로 떨어뜨려 두다 → 늦추다"});
W("deposit","명사","보증금",2,{p:"de=아래로|posit=놓다",s:"맡겨 두려고 내려놓은 돈"});
W("detox","명사","디톡스",3,{p:"de=없애다|tox=독",s:"몸이나 생활에서 독(toxin)을 빼내다"});
W("devil","명사","악마",3,{s:"devil's advocate: 가톨릭 성인 심사에서 일부러 반대 의견을 맡던 '악마의 변호인'",i:1});
W("die","동사","죽다, (배터리가) 꺼지다",1);
W("difference","명사","차이",1,{p:"dif=떨어져|fer=나르다|ence=~것",s:"서로 다른 곳으로 실려 가 떨어진 것"});
W("different","형용사","다른",1,{p:"dif=떨어져|fer=나르다|ent=~한",s:"따로 떨어져 실려 간 → 다른"});
W("digital","형용사","디지털의",2,{p:"digit=손가락·숫자|al=~의",s:"손가락으로 세던 숫자(digit)로 된"});
W("dinner","명사","저녁 식사",1);
W("disagree","동사","동의하지 않다",2,{p:"dis=반대|agree=동의하다"});
W("dish","명사","접시 · (do the dishes) 설거지",1,{f:"dishes"});
W("distance","명사","거리",2,{p:"di=떨어져|st=서다|ance=~것",s:"떨어져 서 있는 정도"});
W("doctor","명사","의사",1);
W("doomscrolling","명사","나쁜 뉴스만 끝없이 넘겨 보기",3,{p:"doom=파멸|scroll=화면 넘기기|ing=~하기",s:"파멸(doom) 같은 소식만 끝없이 스크롤"});
W("down","부사","아래로",1);
W("due","형용사","기한이 된",2);
W("ear","명사","귀",1,{s:"play it by ear = 악보 없이 귀로 듣고 연주하듯 그때그때 정하다",i:1});
W("easy","형용사","쉬운",1,{f:"easier"});
W("eat","동사","먹다",1);
W("economics","명사","경제학",2,{p:"eco=집|nom=관리|ics=학문",s:"그리스어 oikos(집)+nomos(관리): 집안 살림을 꾸리는 학문"});
W("effect","명사","효과 · (side effect) 부작용",1,{f:"effects"});
W("elaborate","동사","자세히 설명하다",3,{p:"e=밖으로|labor=노동|ate=하다",s:"공들여(labor) 다듬어 밖으로 내놓다"});
W("evenly","부사","고르게, 똑같이",3,{p:"even=고른|ly=~하게"});
W("everyone","대명사","모두",1,{p:"every=모든|one=사람"});
W("everything","대명사","모든 것",1,{p:"every=모든|thing=것"});
W("exam","명사","시험",2,{s:"examination을 줄인 말"});
W("exchange","동사","교환하다",2,{p:"ex=밖으로|change=바꾸다",s:"내 것을 밖으로 내주고 바꿔 오다"});
W("explain","동사","설명하다",1,{p:"ex=밖으로|plain=평평한·분명한",s:"구겨진 생각을 밖으로 평평하게 펴서 보여 주다"});
W("extension","명사","(기한) 연장",2,{p:"ex=밖으로|tens=늘이다|ion=~것",s:"밖으로 쭉 늘인 것"});
W("feedback","명사","피드백",2,{p:"feed=먹이다|back=되돌려",s:"결과를 다시 먹여 주어 고치게 하는 것"});
W("feel","동사","느끼다",1);
W("feeling","명사","감정, 느낌",1,{f:"feelings"});
W("fence","명사","울타리",2,{s:"on the fence = 울타리 위에 걸터앉아 어느 쪽으로도 안 내려간 상태",i:1});
W("fever","명사","열",2);
W("file","명사","파일",2,{f:"files"});
W("fit","동사","(크기가) 맞다",2,{f:"fitting"});
W("fix","동사","고치다",2);
W("fly","동사","날다",1,{f:"flies"});
W("flight","명사","비행편",2);
W("forget","동사","잊다",1,{f:"forgot"});
W("form","동사","만들다",1);
W("forward","부사","앞으로 · (look forward to) 기대하다",1);
W("free","형용사","한가한, 무료의",1);
W("friday","명사","금요일",1);
W("front","명사","앞",1);
W("full","형용사","가득 찬, 전부의",1);
W("fun","명사","재미",1);
W("game","명사","경기",1);
W("go","동사","가다",1,{f:"goes went"});
W("good","형용사","좋은",1);
W("grain","명사","알갱이",3,{s:"with a grain of salt = 독을 막으려 소금 한 꼬집을 곁들여 먹었다는 옛말에서, 의심하며 받아들이다",i:1});
W("grammar","명사","문법",2);
W("great","형용사","훌륭한",1);
W("group","명사","그룹",1);
W("guilty","형용사","죄책감 드는",2,{s:"guilty pleasure = 죄책감이 살짝 드는 즐거움"});
W("guitar","명사","기타",2);
W("hand","명사","손",1,{s:"out of hand = 손(통제)을 벗어나 난리가 난",i:1});
W("head","명사","머리",1,{s:"went over my head = 머리 위로 휙 지나가 버렸다 → 이해 못 했다",i:1});
W("headache","명사","두통",2,{p:"head=머리|ache=아픔"});
W("hear","동사","듣다",1);
W("heart","명사","마음 · (by heart) 외워서",1,{s:"옛사람들은 기억이 심장(heart)에 있다고 믿었다"});
W("heater","명사","히터",3,{p:"heat=열|er=~하는 것"});
W("help","동사","돕다",1,{f:"helps"});
W("hike","동사","등산하다",2,{f:"hiking"});
W("hobby","명사","취미",2);
W("hold","동사","잡다, 맡아 두다",1);
W("home","명사","집",1);
W("homework","명사","숙제",2,{p:"home=집|work=일"});
W("honest","형용사","솔직한",2);
W("hooked","형용사","푹 빠진",3,{s:"낚싯바늘(hook)에 걸린 물고기처럼 빠져나오지 못하는"});
W("hurt","동사","아프다",1,{f:"hurts"});
W("ice","명사","얼음",1,{f:"iced"});
W("include","동사","포함하다",1,{f:"included",p:"in=안에|clud=닫다",s:"안에 넣고 문을 닫다"});
W("insurance","명사","보험",2,{p:"in=안에|sure=확실한|ance=~것",s:"확실히(sure) 안전 안에 두는 것"});
W("item","명사","물건, 항목",2);
W("join","동사","함께하다",1);
W("keep","동사","유지하다, 계속하다",1,{f:"keeping keeps"});
W("landlord","명사","집주인",3,{p:"land=땅|lord=주인"});
W("last","형용사","지난, 마지막의",1);
W("late","형용사","늦은",1);
W("lately","부사","요즘",2,{p:"late=최근의|ly=~하게"});
W("later","부사","나중에",1);
W("leak","명사","새는 곳",3);
W("learn","동사","배우다",1,{f:"learned learning"});
W("lease","명사","임대 계약",3);
W("leave","동사","남기다, 떠나다",1);
W("lecture","명사","강의",2,{p:"lect=읽다|ure=~것",s:"중세 대학에선 교수가 책을 소리 내어 읽어(lect) 주는 것이 강의였다"});
W("light","명사","불, 전등",1);
W("link","명사","링크",2);
W("little","형용사","조금, 작은",1);
W("long","형용사","긴",1);
W("look","동사","보다, ~처럼 보이다",1,{f:"looked looking"});
W("lost","형용사","길을 잃은",1);
W("lot","명사","많음",1);
W("loud","형용사","시끄러운",2,{f:"louder"});
W("love","동사","사랑하다",1);
W("luggage","명사","수하물",3,{p:"lug=질질 끌다|gage=~것",s:"질질 끌고(lug) 다니는 짐"});
W("major","동사","전공하다",2,{f:"majoring"});
W("make","동사","만들다",1,{f:"makes"});
W("marketing","명사","마케팅",2,{p:"market=시장|ing=~하기"});
W("meal","명사","식사",2,{f:"meals"});
W("mean","동사","의미하다 · (be meaning to) ~하려고 하다",1,{f:"meaning"});
W("media","명사","매체 · (social media) SNS",2);
W("meet","동사","만나다",1);
W("meeting","명사","회의",1);
W("menu","명사","메뉴",2);
W("message","명사","메시지",1);
W("mild","형용사","가벼운, 순한",3);
W("miss","동사","놓치다",1,{f:"missed"});
W("mistake","명사","실수",1,{p:"mis=잘못|take=잡다",s:"잘못 집어 든 것"});
W("mixed","형용사","섞인",2);
W("movie","명사","영화",1,{f:"movies"});
W("music","명사","음악",1);
W("mute","동사","알림·소리를 끄다",3,{f:"muted"});
W("negotiate","동사","협상하다",3,{p:"neg=아니다|oti=여가|ate=하다",s:"라틴어 '여가가 아님(neg+otium)' = 일·거래를 하다"});
W("negotiation","명사","협상",3,{p:"neg=아니다|oti=여가|ation=~것",s:"여가가 아닌 일, 거래를 하는 것"});
W("nervous","형용사","긴장한",2);
W("new","형용사","새로운",1);
W("next","형용사","다음의",1);
W("nice","형용사","좋은",1);
W("night","명사","밤",1);
W("noise","명사","소음",2);
W("nothing","대명사","아무것도",1,{p:"no=없는|thing=것"});
W("number","명사","번호",1);
W("offline","형용사·부사","오프라인으로, 직접",3,{p:"off=떨어진|line=선",s:"인터넷 선에서 떨어진 → 직접 만나서"});
W("often","부사","자주",1);
W("online","형용사·부사","온라인의",2,{p:"on=연결된|line=선"});
W("opinion","명사","의견",2);
W("order","동사","주문하다",1,{f:"ordered"});
W("overhear","동사","우연히 듣다",3,{f:"overhearing",p:"over=넘어|hear=듣다",s:"어깨 너머로(over) 들려온 말을 듣다"});
W("package","명사","택배, 소포",2,{p:"pack=싸다|age=~것",s:"싸서(pack) 보낸 것"});
W("page","명사","페이지",1);
W("pain","명사","통증",1);
W("paper","명사","종이",1);
W("password","명사","비밀번호",2,{p:"pass=통과하다|word=말",s:"보초를 통과하려고 대던 암호 말"});
W("patience","명사","인내심",3,{p:"pati=견디다|ence=~것",s:"견디는(pati) 힘. patient(환자)도 '견디는 사람'"});
W("pay","동사","내다, 지불하다",1);
W("peanut","명사","땅콩",3,{f:"peanuts",p:"pea=콩|nut=견과",s:"콩(pea)처럼 생긴 견과(nut)"});
W("pencil","명사·동사","연필 · (pencil in) 잠정적으로 일정을 잡다",2,{s:"지울 수 있게 연필로 적어 두듯"});
W("penicillin","명사","페니실린",3,{s:"붓처럼 생긴 곰팡이 Penicillium(라틴어 penicillus '작은 붓')에서 나온 약"});
W("people","명사","사람들",1);
W("perfect","형용사","완벽한",1);
W("pharmacy","명사","약국",2,{p:"pharmac=약|y=~곳",s:"그리스어 pharmakon(약)에서"});
W("phone","명사","전화기",1);
W("photo","명사","사진",1);
W("pick","동사","고르다 · (pick up) 새로 시작하다",1);
W("picture","명사","사진, 그림",1,{f:"pictures"});
W("place","명사","장소",1);
W("plan","명사","계획",1);
W("play","동사","하다, 연주하다",1);
W("pleasure","명사","즐거움",2,{p:"pleas=기쁘게 하다|ure=~것"});
W("point","명사","요점, 지적",1);
W("possible","형용사","가능한",1,{p:"poss=할 수 있다|ible=~할 수 있는"});
W("post","동사","(글·사진을) 올리다",2,{f:"posted",s:"keep you posted = 게시판에 붙여 알리듯 계속 소식을 알리다"});
W("practice","명사","연습",1,{p:"pract=행하다|ice=~것",s:"그리스어 praktikos(직접 해 보는): 머리가 아니라 몸으로 해 보는 것"});
W("prescription","명사","처방전",3,{p:"pre=미리|script=쓰다|ion=~것",s:"약을 짓기 전에 의사가 미리(pre) 써 준(script) 것"});
W("price","명사","가격",1);
W("properly","부사","제대로",2,{p:"proper=알맞은|ly=~하게"});
W("push","동사","밀다, (일정을) 미루다",1);
W("question","명사","질문",1,{p:"quest=찾다|ion=~것",s:"답을 찾아 나서는(quest) 것"});
W("quickly","부사","빨리",1,{p:"quick=빠른|ly=~하게"});
W("quite","부사","꽤, 완전히",1);
W("range","명사","범위",2);
W("rather","부사","차라리",1);
W("read","동사","읽다",1);
W("real","형용사","진짜의",1);
W("really","부사","정말",1);
W("receipt","명사","영수증",3,{s:"receive(받다)와 같은 뿌리. p는 소리 내지 않아요 [리씻]"});
W("recommend","동사","추천하다",2,{p:"re=강조|com=함께|mend=맡기다",s:"믿고 맡길 만하다고 힘주어 말하다"});
W("refund","명사","환불",3,{p:"re=다시|fund=붓다",s:"낸 돈을 다시 부어 돌려주다"});
W("renew","동사","갱신하다",3,{p:"re=다시|new=새로운"});
W("rent","명사","월세",2);
W("reschedule","동사","일정을 다시 잡다",3,{p:"re=다시|schedule=일정"});
W("reservation","명사","예약",2,{p:"re=뒤로|serv=지키다|ation=~것",s:"자리를 뒤에 남겨 지켜 두는 것"});
W("restroom","명사","화장실",2,{p:"rest=쉬다|room=방",s:"잠깐 쉬어 가는 방"});
W("return","동사","반품하다, 돌아오다",1,{p:"re=다시|turn=돌다"});
W("right","형용사·부사","옳은, 바로",1);
W("ring","동사","울리다",1,{f:"rings"});
W("room","명사","방, 여지",1,{f:"rooms"});
W("run","동사","달리다 · (run late) 늦어지다 · (run out of) 떨어지다",1,{f:"running"});
W("rusty","형용사","녹슨, 오래 안 해서 서툰",3,{p:"rust=녹|y=~한"});
W("sale","명사","할인 판매, 판매",1,{f:"sales"});
W("salt","명사","소금",2);
W("schedule","명사","일정",2,{s:"그리스어 schedē(종이 조각): 할 일을 적은 쪽지"});
W("screen","명사","화면",2);
W("seat","명사","자리",1);
W("second","형용사","두 번째의",1);
W("section","명사","구역, 칸",2);
W("send","동사","보내다",1);
W("sense","명사","감각, 말이 됨",1);
W("serious","형용사","심각한",1);
W("share","동사","공유하다",1);
W("shot","명사","시도",2,{s:"give it a shot = 총 한 발 쏴 보듯 한번 해 보다",i:1});
W("show","명사","프로그램, 드라마",1);
W("side","명사","쪽, 옆",1);
W("sign","동사","서명하다",1);
W("since","전치사","~이후로",1);
W("sink","명사","싱크대",3);
W("size","명사","크기",1);
W("slow","형용사","느린",1);
W("slowly","부사","천천히",1,{p:"slow=느린|ly=~하게"});
W("small","형용사","작은",1,{f:"smaller"});
W("soccer","명사","축구",2);
W("social","형용사","사회적인",1);
W("someone","대명사","누군가",1,{p:"some=어떤|one=사람"});
W("something","대명사","무언가",1,{p:"some=어떤|thing=것"});
W("sometime","부사","언젠가",2,{p:"some=어떤|time=때"});
W("soon","부사","곧",1);
W("sore","형용사","(염증으로) 아픈",3);
W("sorry","형용사","미안한",1);
W("sound","동사","~처럼 들리다",1,{f:"sounds"});
W("speak","동사","말하다",1,{f:"speaking"});
W("speaker","명사","스피커",2,{p:"speak=말하다|er=~하는 것"});
W("special","형용사","특별한",1);
W("spell","동사","철자를 말하다",2);
W("spend","동사","(시간·돈을) 쓰다",1);
W("split","동사","나누다",2);
W("sprain","명사·동사","삠, 삐다",3);
W("start","동사","시작하다",1,{f:"started"});
W("station","명사","역",1);
W("stomach","명사","배, 위",2);
W("strength","명사","강점",2,{f:"strengths",p:"streng=강한(strong)|th=~함",s:"strong에 -th를 붙여 '강함'"});
W("student","명사","학생",1);
W("study","동사","공부하다",1,{f:"studying"});
W("sure","형용사","확실한",1);
W("swallow","동사","삼키다",3);
W("swamped","형용사","(일이) 넘쳐 정신없는",3,{s:"늪(swamp)에 빠진 것처럼 일에 파묻힌"});
W("symptom","명사","증상",3,{f:"symptoms",p:"sym=함께|ptom=떨어지다",s:"병과 함께 떨어져 나타나는 것"});
W("tag","동사","태그하다",2);
W("take","동사","가져가다, (약을) 먹다",1,{f:"taken taking takes"});
W("talk","동사","이야기하다",1,{f:"talked"});
W("tea","명사","차",1);
W("test","명사","시험",1);
W("text","동사","문자하다",2);
W("textbook","명사","교과서",2,{p:"text=글|book=책"});
W("thank","동사","감사하다",1);
W("think","동사","생각하다",1,{f:"thinking"});
W("throat","명사","목구멍",2);
W("through","전치사","~을 통해, 처음부터 끝까지",1);
W("thursday","명사","목요일",1,{p:"thurs=토르(Thor)|day=날",s:"천둥의 신 토르의 날"});
W("time","명사","시간",1);
W("tired","형용사","피곤한",1);
W("today","명사","오늘",1);
W("toilet","명사","화장실, 변기",2);
W("tomorrow","명사","내일",1,{p:"to=~에|morrow=아침",s:"옛말 morrow(아침): 다음 날 아침"});
W("tonight","명사","오늘 밤",1);
W("trash","명사","쓰레기",2);
W("trouble","명사","어려움",1);
W("try","동사","해 보다",1,{f:"trying"});
W("turn","명사·동사","차례, 돌리다",1);
W("twice","부사","두 번",2);
W("twist","동사","비틀다, 삐다",2,{f:"twisted"});
W("understand","동사","이해하다",1,{p:"under=사이에|stand=서다",s:"일의 한가운데(under)에 서서 속을 파악하다"});
W("until","전치사","~까지",1);
W("unwind","동사","긴장을 풀다",3,{p:"un=되돌리다|wind=감다",s:"꽉 감긴 태엽을 풀듯 긴장을 풀다"});
W("upgrade","명사","업그레이드",2,{p:"up=위로|grade=등급"});
W("utilities","명사","공과금",3,{p:"util=쓰다|ity=~것",s:"생활에 쓰이는(use) 것들 = 전기·가스·수도"});
W("video","명사","영상",1);
W("viral","형용사","입소문이 퍼진",3,{p:"vir=바이러스|al=~의",s:"바이러스(virus)처럼 퍼지는"});
W("wait","동사","기다리다",1);
W("walk","명사·동사","산책, 걷다",1,{f:"walking"});
W("warranty","명사","품질 보증",3,{s:"warrant(보증하다)에서. guarantee와 같은 뿌리"});
W("way","명사","방법, 길",1);
W("week","명사","주",1);
W("weekend","명사","주말",1,{p:"week=주|end=끝"});
W("whose","대명사","누구의",1);
W("window","명사","창문",1);
W("within","전치사","~이내에",2,{p:"with=함께|in=안"});
W("without","전치사","~없이",1,{p:"with=함께|out=밖"});
W("word","명사","단어, 말",1);
W("work","동사·명사","일하다, 일",1,{f:"working works"});
W("worry","명사·동사","걱정",1,{f:"worries"});
W("wrong","형용사","틀린, 잘못된",1);
W("year","명사","해, 년",1);
W("yoga","명사","요가",2);
W("do","동사","하다",1,{f:"doing"});
W("essay","명사","에세이, 글",2);

/* ---------- phase 2a words ---------- */
const F = (w, forms) => { if (WORDS[w]) WORDS[w].forms.push(...forms.split(" ")); };
F("change","changed"); F("talk","talking"); F("meet","met");
W("airport","명사","공항",1,{p:"air=하늘|port=항구",s:"하늘(air)의 항구(port)"});
W("anyway","부사","아무튼",1,{p:"any=어떤|way=길",s:"어떤 길로 가든 결국 → 아무튼"});
W("approach","명사·동사","접근법, 다가가다",2,{p:"ap=~쪽으로|proach=가까이",s:"문제 쪽으로 가까이 다가가는 방법"});
W("bad","형용사","나쁜",1);
W("base","명사","기지, 베이스",1,{s:"touch base = 야구에서 베이스를 밟고 가듯 잠깐 연락해 확인하다",i:1});
W("beat","동사","밟아 다지다, 이기다",1,{f:"beaten",s:"off the beaten path = 사람들이 밟아 다진 길을 벗어난 곳",i:1});
W("behind","전치사","뒤에, 뒤처진",1);
W("better","형용사","더 나은",1);
W("bite","명사","한 입",2,{s:"grab a bite = 한 입 낚아채듯 간단히 먹다",i:1});
W("blessing","명사","축복",2,{p:"bless=축복하다|ing=~것",s:"blessing in disguise = 변장한 축복, 처음엔 나빠 보였던 좋은 일",i:1});
W("bright","형용사","밝은",1,{s:"look on the bright side = 밝은 쪽을 보다 → 좋게 생각하다"});
W("bus","명사","버스",1);
W("busy","형용사","바쁜",1);
W("cafe","명사","카페",2);
W("cheap","형용사","싼",2,{f:"cheaper"});
W("chef","명사","요리사",2);
W("clarify","동사","분명히 하다",3,{p:"clar=맑은|ify=~하게 하다",s:"흐린 말을 맑게(clear) 만들다"});
W("coffee","명사","커피",1);
W("complaint","명사","불만, 항의",2,{p:"com=강조|plain=슬퍼하다|t=~것",s:"크게 슬퍼하며 하소연하는 것"});
W("compliment","명사","칭찬",2,{f:"compliments",p:"com=함께|pli=채우다|ment=~것",s:"상대의 마음을 가득 채워 주는 말"});
W("connect","동사","연결하다",1,{f:"connecting",p:"con=함께|nect=묶다",s:"함께 묶다 → connecting flight = 이어지는 비행편"});
W("convinced","형용사","확신하는, 납득한",2,{p:"con=완전히|vinc=이기다|ed=~된",s:"상대 말에 완전히 져서(이겨져서) 믿게 된"});
W("cut","동사","자르다 · (cut back on) 줄이다",1);
W("date","명사","날짜",1);
W("deadline","명사","마감",2,{p:"dead=죽은|line=선",s:"넘으면 끝장나는 선 = 마감"});
W("delicious","형용사","맛있는",2,{p:"de=강조|lic=끌어당기다|ious=~한",s:"혀를 강하게 끌어당기는 맛"});
W("detour","명사","돌아가는 길",3,{p:"de=벗어나|tour=돌다",s:"원래 길에서 벗어나 빙 도는 길"});
W("direct","형용사","곧장 가는, 직행의",1,{p:"di=떨어져|rect=곧은",s:"곧게(rect) 뻗은"});
W("disappointed","형용사","실망한",2,{p:"dis=반대|appoint=정하다|ed=~된",s:"기대해서 정해 둔 것이 뒤집힌 → 실망한"});
W("disguise","명사","변장",3,{p:"dis=벗어나|guise=모습",s:"원래 모습(guise)에서 벗어나게 꾸미기"});
W("driver","명사","운전기사",1,{p:"drive=운전하다|er=~하는 사람"});
W("early","부사·형용사","일찍",1);
W("eye","명사","눈",1,{s:"keep an eye on = 눈을 떼지 않고 지켜보다",i:1});
W("fan","명사","팬, 좋아하는 사람",2,{s:"not a big fan of = 열성 팬은 아니다 → 별로 안 좋아한다"});
W("far","형용사·부사","먼",1);
W("few","형용사","몇몇의",1);
W("freezing","형용사","몹시 추운",2,{p:"freeze=얼다|ing=~하는",s:"얼어붙을 만큼"});
W("funny","형용사","웃긴",1,{p:"fun=재미|ny=~한"});
W("grab","동사","잡다, 간단히 먹다",2);
W("happy","형용사","행복한",1);
W("honestly","부사","솔직히",1,{p:"honest=솔직한|ly=~하게"});
W("hour","명사","시간",1,{f:"hours"});
W("hungry","형용사","배고픈",1);
W("jet","명사","제트기",2,{s:"jet lag = 제트기로 시간대를 넘어 몸이 뒤처지는(lag) 것"});
W("job","명사","일, 직업",1);
W("lag","명사","지연, 뒤처짐",3);
W("launch","명사·동사","출시, 출시하다",2,{s:"배를 물에 띄우듯 제품을 세상에 내보내다"});
W("lead","명사·동사","선두, 이끌다",1,{s:"take the lead = 앞장서서 맡다"});
W("leftovers","명사","남은 음식",3,{p:"left=남은|over=넘어서|s=것들",s:"먹고 남아 넘친 것들"});
W("local","형용사","현지의, 동네의",1);
W("map","명사","지도",1);
W("medium","형용사","중간의",2,{p:"medi=가운데|um=~것",s:"가운데(medi) — media, middle과 같은 뿌리"});
W("minute","명사","분, 잠깐",1);
W("moment","명사","순간, 잠깐",1);
W("mood","명사","기분",2);
W("moon","명사","달",1,{s:"over the moon = 동요에서 소가 달을 뛰어넘을 만큼 기쁜",i:1});
W("morning","명사","아침",1);
W("name","명사","이름",1,{f:"names"});
W("nerve","명사","신경",2,{f:"nerves",s:"get on my nerves = 신경 위에 올라타 긁듯 거슬리다",i:1});
W("night","명사","밤, 박",1,{f:"nights"});
W("notch","명사","눈금, 홈",3,{s:"top-notch = 나무에 새긴 눈금 중 맨 위 → 최고 수준",i:1});
W("option","명사","선택지",1,{f:"options"});
W("outside","전치사","~밖에",1,{p:"out=밖|side=쪽"});
W("overwhelmed","형용사","벅찬, 압도된",3,{p:"over=위로|whelm=뒤덮다|ed=~된",s:"파도가 위로 뒤덮어 버린 느낌"});
W("pack","동사","싸다, 포장하다",1);
W("path","명사","길",2);
W("plate","명사","접시, 요리",1,{f:"plates"});
W("platform","명사","승강장",2,{p:"plat=평평한|form=모양",s:"평평한(plat) 단 = 승강장, 발표대"});
W("project","명사","프로젝트",1,{p:"pro=앞으로|ject=던지다",s:"앞으로 던져 놓은 계획"});
W("propose","동사","제안하다",2,{p:"pro=앞에|pose=놓다",s:"앞에 내놓다 → 제안하다"});
W("ready","형용사","준비된",1);
W("refill","명사","리필",3,{p:"re=다시|fill=채우다"});
W("reinvent","동사","새로 발명하다",3,{p:"re=다시|in=안으로|vent=오다",s:"reinvent the wheel = 이미 있는 바퀴를 다시 발명하다 → 헛수고",i:1});
W("rip","동사","찢다 · (rip off) 바가지 씌우다",3,{f:"ripped",s:"지갑을 찢어 빼 가듯"});
W("sad","형용사","슬픈",1);
W("sauce","명사","소스",2);
W("scope","명사","범위",2,{s:"telescope(망원경)의 scope: 볼 수 있는 범위"});
W("seem","동사","~처럼 보이다",1);
W("service","명사","서비스, 봉사료",1,{p:"serv=섬기다|ice=~것"});
W("shop","명사","가게",1,{s:"talk shop = 가게(일) 얘기를 하다",i:1});
W("short","형용사","짧은",1,{s:"long story short = 긴 이야기를 짧게 하면"});
W("spicy","형용사","매운",2,{p:"spice=향신료|y=~한"});
W("spot","명사","장소, 곳",1);
W("stand","동사","서다, 견디다",1);
W("steak","명사","스테이크",2);
W("stop","명사","정류장",1);
W("store","동사","맡기다, 보관하다",1);
W("story","명사","이야기",1);
W("stretch","동사","늘이다",2,{f:"stretched",s:"stretched thin = 반죽을 얇게 늘인 것처럼 여유가 없는",i:1});
W("sugar","명사","설탕",1);
W("table","명사","테이블, 자리",1);
W("taxi","명사","택시",1);
W("terrible","형용사","끔찍한, 아주 못하는",1,{p:"terr=겁주다|ible=~할 만한",s:"겁에 질릴 만한(terror) 정도로"});
W("thin","형용사","얇은",1);
W("ticket","명사","표",1);
W("top","명사","맨 위",1);
W("touch","동사","닿다",1);
W("train","명사","기차",1);
W("transfer","동사","갈아타다",2,{p:"trans=건너|fer=나르다",s:"이쪽에서 저쪽으로 건너(trans) 옮겨 가다"});
W("vacation","명사","휴가",2,{p:"vac=비다|ation=~것",s:"일정이 텅 빈(vacant) 기간"});
W("vegetarian","명사·형용사","채식주의자, 채식의",3,{p:"veget=자라다|arian=~하는 사람",s:"땅에서 자라는 것(vegetable)만 먹는 사람"});
W("water","명사","물",1);
W("weather","명사","날씨",1);
W("wheel","명사","바퀴",2);
W("wine","명사","와인",2);
W("world","명사","세상",1,{s:"Small world! = 세상 참 좁다"});
W("worried","형용사","걱정하는",1,{p:"worry=걱정하다|ed=~된"});
W("worth","형용사","~할 가치가 있는",1);

/* ---------- phase 2b words ---------- */
F("big","bigger"); F("call","calling"); F("minute","minutes"); F("play","playing"); F("make","making"); F("time","times");
W("account","명사","계정",1,{p:"ac=~에|count=세다",s:"숫자를 세어 기록해 두는 장부 → 계정"});
W("ad","명사","광고",2,{f:"ads",s:"advertisement를 줄인 말"});
W("ambulance","명사","구급차",3,{p:"ambul=걷다·움직이다|ance=~것",s:"전쟁터를 따라 움직이던(ambulant) 이동 병원에서"});
W("bed","명사","침대",1);
W("book","명사","책",1,{f:"books"});
W("burnt","형용사","타 버린 · (burnt out) 완전히 지친",2,{s:"초가 다 타 버리듯(burn out) 기운이 바닥난"});
W("buy","명사·동사","구매, 사다",1);
W("camera","명사","카메라",1);
W("camp","동사","캠핑하다",2,{f:"camping"});
W("cashier","명사","계산원, 계산대",2,{p:"cash=현금|ier=~하는 사람"});
W("channel","명사","채널",2);
W("checkup","명사","건강 검진",3,{p:"check=확인하다|up=완전히",s:"몸을 구석구석 완전히(up) 확인하는 것"});
W("chord","명사","화음, 현",3,{s:"strike a chord = 마음의 현을 울리다 → 와닿다",i:1});
W("chore","명사","집안일",3,{f:"chores"});
W("class","명사","수업",1);
W("clean","동사","치우다",1);
W("clear","동사·형용사","맑게 하다, 분명한",1,{s:"clear my head = 머릿속을 맑게 비우다"});
W("click","동사","딸깍 맞물리다 · 이해되다",2,{f:"clicked",s:"퍼즐 조각이 딸깍 맞물리듯 이해되다"});
W("close","동사","닫다",1);
W("complain","동사","불평하다, 항의하다",2,{f:"complaining",p:"com=강조|plain=슬퍼하다",s:"크게 슬퍼하며 하소연하다"});
W("couch","명사","소파",2);
W("counter","명사","계산대",2,{s:"over the counter = 계산대 너머로 바로 파는 → 처방전 없이 사는",i:1});
W("curate","동사","골라 담다",3,{p:"cur=돌보다|ate=하다",s:"박물관 큐레이터(curator)처럼 정성껏 골라 돌보다"});
W("discount","명사","할인",2,{p:"dis=떨어뜨려|count=세다",s:"셈(가격)에서 일부를 떨어뜨리는 것"});
W("divide","동사","나누다",2,{p:"di=따로|vide=가르다"});
W("dizzy","형용사","어지러운",3);
W("dog","명사","개",1,{f:"dogs"});
W("door","명사","문",1);
W("draw","동사","그리다",1,{f:"drawing"});
W("email","명사","이메일",1,{p:"e=전자|mail=우편",s:"electronic mail을 줄인 말"});
W("english","명사","영어",1);
W("example","명사","예",1);
W("feed","명사·동사","피드, 먹이를 주다",2,{s:"Don't feed the trolls = 악플러에게 관심이라는 먹이를 주지 마라",i:1});
W("finally","부사","드디어",1,{p:"final=마지막|ly=~하게"});
W("find","동사","찾다",1);
W("follow","동사","따라가다, 이해하다",1,{f:"following"});
W("food","명사","음식",1);
W("foodie","명사","미식가",3,{p:"food=음식|ie=~하는 사람"});
W("friend","명사","친구",1);
W("freeze","동사","얼다",2,{f:"froze"});
W("gift","명사","선물",1);
W("guest","명사","손님",1,{f:"guests"});
W("gym","명사","헬스장",2,{s:"gymnasium을 줄인 말"});
W("hot","형용사","뜨거운",1);
W("impulse","명사","충동",3,{p:"im=안으로|pulse=밀다",s:"안에서 확 밀어 올리는 힘 = 충동"});
W("internet","명사","인터넷",1,{p:"inter=사이|net=그물",s:"컴퓨터 사이(inter)를 잇는 그물(net)"});
W("jacket","명사","재킷",2);
W("key","명사","열쇠",1,{f:"keys"});
W("kind","명사","종류",1);
W("laundry","명사","빨래",2,{p:"laund=씻다(lave)|ry=~것",s:"lavatory(세면실)와 같은 뿌리: 씻는 일"});
W("lock","동사","잠그다",1,{f:"locked",s:"locked myself out = 나를 밖에 두고 문을 잠가 버렸다"});
W("machine","명사","기계",1);
W("manager","명사","관리자, 매니저",1,{p:"manage=관리하다|er=~하는 사람",s:"라틴어 manus(손): 손으로 다루는 사람"});
W("match","동사","맞추다",1);
W("medicine","명사","약",1,{p:"medic=치료하다|ine=~것",s:"medic(치료)에서: 치료하는 것"});
W("mend","동사","고치다, 회복하다",3,{s:"on the mend = 수선(mend) 중 → 회복 중",i:1});
W("milk","명사","우유",1);
W("move","동사","옮기다, 이사하다",1,{f:"moving"});
W("neighbor","명사","이웃",2,{f:"neighbors",p:"neigh=가까이|bor=사는 사람",s:"가까이(nigh) 사는 사람"});
W("noon","명사","정오",2);
W("open","동사","열다",1);
W("overnight","부사","밤사이에",2,{p:"over=넘어|night=밤",s:"밤을 넘기는 동안"});
W("pass","동사","통과하다",1,{f:"passed"});
W("pen","명사","펜",1);
W("photography","명사","사진 촬영",2,{p:"photo=빛|graph=그리다|y=~것",s:"빛(photo)으로 그리는(graph) 것"});
W("pill","명사","알약",2,{f:"pills"});
W("pipe","명사","배관",2,{f:"pipes"});
W("plant","명사","식물, 화분",1,{f:"plants"});
W("poisoning","명사","중독",3,{p:"poison=독|ing=~됨",s:"food poisoning = 음식의 독에 당함 = 식중독"});
W("policy","명사","규정, 정책",1);
W("private","형용사","비공개의",1);
W("professionally","부사","전문적으로",3,{p:"pro=앞에서|fess=말하다|ion=~것|al=~의|ly=~하게",s:"사람들 앞에서 공언(profess)할 만큼 → 직업으로서"});
W("pronunciation","명사","발음",2,{p:"pro=앞으로|nunci=알리다|ation=~것",s:"소리를 앞으로 내어 알리는 것. pronounce와 철자가 달라요(nun)"});
W("read","동사","읽다",1,{f:"reading"});
W("recharge","동사","재충전하다",3,{p:"re=다시|charge=채우다"});
W("recover","동사","회복하다",2,{p:"re=다시|cover=얻다",s:"잃은 것을 다시 얻다"});
W("request","명사","요청, 신청",2,{p:"re=다시|quest=찾다",s:"다시 찾아 구하다"});
W("save","동사","모으다, 저축하다",1,{f:"saving"});
W("semester","명사","학기",3,{p:"se=6|mester=달",s:"라틴어 '6개월'에서 = 한 학기"});
W("shoe","명사","신발",1,{f:"shoes"});
W("sick","형용사","아픈, 속이 안 좋은",1);
W("sleep","동사","자다",1);
W("sneeze","동사","재채기하다",3,{f:"sneezing"});
W("someday","부사","언젠가",2,{p:"some=어떤|day=날"});
W("splurge","동사","돈을 펑펑 쓰다",3,{f:"splurging"});
W("stock","명사","재고",2,{s:"in stock = 창고에 쌓여 있는"});
W("strike","동사","치다",2,{f:"struck"});
W("subtitle","명사","자막",3,{f:"subtitles",p:"sub=아래|title=제목",s:"화면 아래(sub)에 붙는 글"});
W("sunday","명사","일요일",1,{f:"sundays",s:"해(sun)의 날"});
W("swim","동사","수영하다",1,{f:"swimming"});
W("thing","명사","것, 일 · (my thing) 내 취향",1);
W("torn","형용사","찢긴, 갈피를 못 잡는",3,{s:"마음이 둘로 찢긴(tear-torn) 상태"});
W("total","형용사","완전한",1);
W("troll","명사","악플러",3,{f:"trolls",s:"북유럽 전설 속 다리 밑 괴물 트롤에서"});
W("unsubscribe","동사","구독을 취소하다",3,{f:"unsubscribed",p:"un=되돌리다|sub=아래|scribe=쓰다",s:"아래에 이름을 써서(subscribe) 신청한 것을 되돌리다"});
W("update","동사","업데이트하다",1,{f:"updated",p:"up=위로|date=날짜",s:"최신 날짜로 끌어올리다"});
W("wash","동사","씻다, 빨다",1,{f:"washing"});
W("watch","동사","보다",1);
W("weird","형용사","이상한",2);
W("wrap","동사","포장하다",2);

/* ---------- role-play scenes for the seven newer situations ---------- */
SCENARIOS.push(
 {id:"exchange",tag:"쇼핑",lvl:"A2",t:"옷 가게에서 교환하기",d:"점원 Mia에게 사이즈 교환 부탁하기",persona:"Mia, a friendly clerk at a clothing store",setting:"The learner bought a jacket that doesn't fit and wants to exchange it.",missions:["교환하고 싶다고 말하기","원하는 사이즈·색 말하기","영수증이 있다고 말하기"]},
 {id:"resched",tag:"전화·약속",lvl:"B1",t:"전화로 약속 바꾸기",d:"친구 Jordan에게 저녁 약속 변경하기",persona:"Jordan, a friend who planned dinner with the learner tonight",setting:"A phone call. Something came up and the learner needs to move tonight's dinner.",missions:["약속을 바꿔야 한다고 말하기","이유를 짧게 말하기","새 날짜와 시간 정하기"]},
 {id:"pharmacy",tag:"병원·약국",lvl:"A2",t:"약국에서 증상 설명하기",d:"약사 Ellen에게 감기약 문의",persona:"Ellen, a careful pharmacist",setting:"The learner walks into a pharmacy feeling sick.",missions:["증상 말하기","언제부터 아팠는지 말하기","약 먹는 방법 묻기"]},
 {id:"repair",tag:"집·생활",lvl:"B1",t:"집주인에게 수리 요청하기",d:"집주인 Mr. Brooks에게 고장 신고",persona:"Mr. Brooks, a busy but fair landlord",setting:"A phone call. Something in the learner's apartment is broken.",missions:["무엇이 고장 났는지 설명하기","언제 고치러 올 수 있는지 묻기","고맙다고 정중히 말하기"]},
 {id:"office",tag:"학교·공부",lvl:"A2",t:"교수님께 질문하기",d:"면담 시간에 Grant 교수님 찾아가기",persona:"Professor Grant, a kind instructor during office hours",setting:"The learner visits office hours with questions about today's lecture.",missions:["이해 안 된 부분 말하기","예를 들어 달라고 하기","과제 마감일 묻기"]},
 {id:"club",tag:"취미·여가",lvl:"A1",t:"동호회에서 취미 이야기",d:"등산 동호회 Noah와 첫 인사",persona:"Noah, a cheerful member of a weekend hiking club",setting:"The learner joins a hobby club meetup for the first time.",missions:["내 취미 말하기","얼마나 자주 하는지 말하기","다음에 같이 하자고 제안하기"]},
 {id:"social",tag:"온라인·SNS",lvl:"B1",t:"친구와 SNS 이야기",d:"친구 Zoe와 요즘 본 영상 수다",persona:"Zoe, a friend who loves posting and watching videos online",setting:"Two friends chatting about something that went viral this week.",missions:["최근에 본 영상 이야기하기","그 영상에 대한 내 의견 말하기","링크를 보내 달라고 하기"]}
);
