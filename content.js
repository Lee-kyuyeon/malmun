/* 재잘 content: chunks (DECK), role-play scenes (SCENARIOS), word dictionary (WORDS).
   Loaded before the app script; ids of the original 81 chunks (c01–c81) are kept so saved progress stays valid. */
"use strict";
/* ---------- chunks: high-frequency formulaic sequences ---------- */
const DECK = [
 {id:"c01",tag:"카페·식당",lvl:"A1",en:"Can I get an iced americano?",ko:"아이스 아메리카노 하나 주세요.",alts:["Could I get an iced americano?","Can I have an iced americano?","Could I have an iced americano?"],note:"주문은 Can I get ~? 하나로 거의 다 됩니다."},
 {id:"c02",tag:"카페·식당",lvl:"A1",en:"For here or to go?",ko:"드시고 가세요, 포장하세요?",alts:[],note:"점원이 가장 먼저 묻는 말. 귀로 먼저 익혀 두세요."},
 {id:"c03",tag:"카페·식당",lvl:"A1",en:"To go, please.",ko:"포장이요.",alts:[],note:"매장에서 먹으면 For here, please."},
 {id:"c04",tag:"카페·식당",lvl:"A2",en:"Could I get the check, please?",ko:"계산서 주시겠어요?",alts:["Can I get the check, please?","Could we get the check, please?","Can we get the check, please?"],note:"영국에서는 the bill."},
 {id:"c05",tag:"카페·식당",lvl:"A2",en:"I'll have what she's having.",ko:"저분이 드시는 걸로 할게요.",alts:[],note:"I'll have ~ 는 주문 확정 표현."},
 {id:"c06",tag:"카페·식당",lvl:"A1",en:"Is this seat taken?",ko:"여기 자리 있나요?",alts:["Is this seat free?"],note:"taken = 이미 누가 앉은."},
 {id:"c07",tag:"스몰토크",lvl:"A1",en:"How's it going?",ko:"잘 지내?",alts:[],note:"대답은 Pretty good, you? 처럼 짧게."},
 {id:"c08",tag:"스몰토크",lvl:"A1",en:"Long time no see.",ko:"오랜만이야.",alts:[],note:"문법보다 덩어리로 외우는 대표 표현."},
 {id:"c09",tag:"스몰토크",lvl:"A2",en:"What have you been up to?",ko:"요즘 뭐 하고 지냈어?",alts:[],note:"be up to = ~을 하며 지내다."},
 {id:"c10",tag:"스몰토크",lvl:"B1",en:"I've been swamped with work.",ko:"요즘 일 때문에 정신없었어.",alts:["I've been swamped at work."],note:"swamped = 일에 파묻힌."},
 {id:"c11",tag:"스몰토크",lvl:"A2",en:"That makes sense.",ko:"그거 말 되네.",alts:["That makes a lot of sense."],note:"상대 말을 이해했다는 신호."},
 {id:"c12",tag:"스몰토크",lvl:"A2",en:"I'm not sure what you mean.",ko:"무슨 뜻인지 잘 모르겠어요.",alts:[],note:"못 알아들어도 대화를 이어가는 생존 표현."},
 {id:"c13",tag:"스몰토크",lvl:"A1",en:"Could you say that again?",ko:"다시 한 번 말해 줄래요?",alts:["Can you say that again?","Could you say that again, please?"],note:"Pardon? 보다 자연스럽습니다."},
 {id:"c14",tag:"스몰토크",lvl:"A2",en:"Let me think about it.",ko:"생각 좀 해볼게요.",alts:[],note:"바로 답하기 어려울 때 시간을 버는 말."},
 {id:"c15",tag:"여행",lvl:"A2",en:"I have a reservation under Kim.",ko:"김으로 예약했어요.",alts:["I have a reservation under the name Kim."],note:"under + 이름 = ~ 이름으로."},
 {id:"c16",tag:"여행",lvl:"A1",en:"What time is check-out?",ko:"체크아웃은 몇 시예요?",alts:["What time is checkout?"],note:""},
 {id:"c17",tag:"여행",lvl:"A1",en:"How do I get to the station?",ko:"역까지 어떻게 가요?",alts:["How can I get to the station?"],note:"How do I get to ~? 길 묻기의 기본형."},
 {id:"c18",tag:"여행",lvl:"A2",en:"Is it within walking distance?",ko:"걸어갈 수 있는 거리인가요?",alts:[],note:""},
 {id:"c19",tag:"여행",lvl:"A2",en:"Could you take a picture of us?",ko:"저희 사진 좀 찍어 주실래요?",alts:["Can you take a picture of us?","Could you take a photo of us?"],note:""},
 {id:"c20",tag:"여행",lvl:"A1",en:"I think I'm lost.",ko:"길을 잃은 것 같아요.",alts:[],note:"I think 로 시작하면 말이 부드러워집니다."},
 {id:"c21",tag:"직장·면접",lvl:"B1",en:"Let me walk you through it.",ko:"차근차근 설명해 드릴게요.",alts:[],note:"walk someone through = 단계별로 안내하다."},
 {id:"c22",tag:"직장·면접",lvl:"B1",en:"I'll get back to you by Friday.",ko:"금요일까지 답드릴게요.",alts:[],note:"get back to = 나중에 다시 연락하다."},
 {id:"c23",tag:"직장·면접",lvl:"B1",en:"Can we push the meeting to three?",ko:"회의를 3시로 미룰 수 있을까요?",alts:["Could we push the meeting to three?","Can we move the meeting to three?"],note:"push = 뒤로 미루다, move up = 당기다."},
 {id:"c24",tag:"직장·면접",lvl:"A2",en:"I'm on it.",ko:"제가 바로 할게요.",alts:[],note:""},
 {id:"c25",tag:"직장·면접",lvl:"A2",en:"That's a good point.",ko:"좋은 지적이에요.",alts:[],note:"회의에서 동의하며 말을 이을 때."},
 {id:"c26",tag:"직장·면접",lvl:"B1",en:"I'd like to build on that.",ko:"거기에 덧붙이고 싶어요.",alts:[],note:"남의 의견에 이어서 말할 때."},
 {id:"c27",tag:"직장·면접",lvl:"A2",en:"I'm in charge of marketing.",ko:"저는 마케팅을 담당하고 있어요.",alts:["I'm responsible for marketing."],note:"in charge of ~ = ~ 담당."},
 {id:"c28",tag:"직장·면접",lvl:"B1",en:"One of my strengths is that I adapt quickly.",ko:"제 강점 중 하나는 적응이 빠르다는 거예요.",alts:[],note:"One of my strengths is ~ 면접 단골 틀."},
 {id:"c29",tag:"감정·의견",lvl:"A2",en:"I'm really looking forward to it.",ko:"정말 기대돼요.",alts:[],note:"look forward to 뒤에는 명사나 -ing."},
 {id:"c30",tag:"감정·의견",lvl:"A2",en:"It's not a big deal.",ko:"별일 아니야.",alts:["It's no big deal."],note:""},
 {id:"c31",tag:"감정·의견",lvl:"B1",en:"I couldn't agree more.",ko:"전적으로 동의해.",alts:[],note:"더 동의할 수 없을 만큼 = 완전 동의."},
 {id:"c32",tag:"감정·의견",lvl:"B1",en:"I see where you're coming from.",ko:"왜 그렇게 말하는지 알겠어.",alts:[],note:"반대하기 전에 공감부터 표시하는 말."},
 {id:"c33",tag:"감정·의견",lvl:"A2",en:"To be honest, I'm a bit nervous.",ko:"솔직히 좀 긴장돼.",alts:["Honestly, I'm a bit nervous."],note:""},
 {id:"c34",tag:"감정·의견",lvl:"A2",en:"That sounds like a plan.",ko:"좋아, 그렇게 하자.",alts:["Sounds like a plan."],note:""},
 {id:"c35",tag:"감정·의견",lvl:"B1",en:"I'm down for that.",ko:"나 그거 좋아, 콜.",alts:["I'm down."],note:"친구 사이 캐주얼 표현."},
 {id:"c36",tag:"감정·의견",lvl:"A1",en:"No worries.",ko:"괜찮아, 신경 쓰지 마.",alts:["No worries at all."],note:"Thank you / Sorry 에 대한 가벼운 답."},
 /* ---- added for the A1–B2 curriculum: every situation × level has at least 4 chunks ---- */
 {id:"c37",tag:"감정·의견",lvl:"A1",en:"That's great!",ko:"잘됐다!",alts:[],note:"좋은 소식에 바로 반응하는 말."},
 {id:"c38",tag:"감정·의견",lvl:"A1",en:"I'm a little tired today.",ko:"오늘 좀 피곤해.",alts:["I'm a bit tired today."],note:"a little = 조금. 감정을 부드럽게."},
 {id:"c39",tag:"감정·의견",lvl:"A1",en:"I don't like it.",ko:"그거 마음에 안 들어.",alts:[],note:""},
 {id:"c40",tag:"감정·의견",lvl:"B1",en:"It's not my cup of tea.",ko:"내 취향은 아니야.",alts:[],note:"싫다는 말을 부드럽게 돌려 말하기."},
 {id:"c41",tag:"감정·의견",lvl:"B2",en:"I have mixed feelings about it.",ko:"그건 좋기도 하고 싫기도 해.",alts:["I've got mixed feelings about it."],note:"한마디로 정하기 어려울 때."},
 {id:"c42",tag:"감정·의견",lvl:"B2",en:"That's easier said than done.",ko:"말이야 쉽지.",alts:[],note:""},
 {id:"c43",tag:"감정·의견",lvl:"B2",en:"I'm on the fence about it.",ko:"아직 마음을 못 정했어.",alts:[],note:"on the fence = 어느 쪽도 아닌."},
 {id:"c44",tag:"감정·의견",lvl:"B2",en:"Let's agree to disagree.",ko:"생각이 다른 걸로 하고 넘어가자.",alts:[],note:"논쟁을 기분 좋게 마무리하는 말."},
 {id:"c45",tag:"스몰토크",lvl:"A1",en:"Nice to meet you.",ko:"만나서 반가워요.",alts:["Nice to meet you too."],note:""},
 {id:"c46",tag:"스몰토크",lvl:"B1",en:"It's been ages since we last talked.",ko:"마지막으로 얘기한 지 엄청 오래됐네.",alts:["It has been ages since we last talked."],note:"ages = 아주 오랜 시간."},
 {id:"c47",tag:"스몰토크",lvl:"B1",en:"Speaking of which, did you see the game?",ko:"말 나온 김에, 경기 봤어?",alts:["Speaking of which, did you watch the game?"],note:"Speaking of which = 말 나온 김에."},
 {id:"c48",tag:"스몰토크",lvl:"B1",en:"I've been meaning to ask you.",ko:"물어보려고 했었어.",alts:[],note:"미뤄 둔 질문을 꺼낼 때."},
 {id:"c49",tag:"스몰토크",lvl:"B2",en:"I'll let you get back to work.",ko:"이제 일 보세요.",alts:[],note:"대화를 자연스럽게 끝내는 말."},
 {id:"c50",tag:"스몰토크",lvl:"B2",en:"We should catch up properly sometime.",ko:"언제 제대로 얘기 좀 하자.",alts:["We should catch up sometime."],note:"catch up = 근황을 나누다."},
 {id:"c51",tag:"스몰토크",lvl:"B2",en:"That rings a bell.",ko:"어디서 들어 본 것 같아.",alts:["That name rings a bell."],note:""},
 {id:"c52",tag:"스몰토크",lvl:"B2",en:"I couldn't help overhearing.",ko:"우연히 듣게 됐는데요.",alts:[],note:"남의 대화에 끼어들 때 정중하게."},
 {id:"c53",tag:"여행",lvl:"A1",en:"Where is the restroom?",ko:"화장실이 어디예요?",alts:["Where is the bathroom?"],note:"영국에서는 toilet도 흔해요."},
 {id:"c54",tag:"여행",lvl:"A2",en:"Can I have a window seat?",ko:"창가 자리로 주실 수 있어요?",alts:["Could I have a window seat?","Can I get a window seat?"],note:"통로 쪽은 aisle seat."},
 {id:"c55",tag:"여행",lvl:"B1",en:"My flight was delayed.",ko:"비행기가 지연됐어요.",alts:[],note:""},
 {id:"c56",tag:"여행",lvl:"B1",en:"Is breakfast included?",ko:"조식 포함인가요?",alts:["Does it include breakfast?"],note:""},
 {id:"c57",tag:"여행",lvl:"B1",en:"I'd like to change my reservation.",ko:"예약을 변경하고 싶어요.",alts:[],note:"I'd like to ~ = 정중한 요청의 기본형."},
 {id:"c58",tag:"여행",lvl:"B1",en:"Could you recommend a good place to eat around here?",ko:"근처에 괜찮은 식당 추천해 주실래요?",alts:["Can you recommend a good place to eat around here?"],note:""},
 {id:"c59",tag:"여행",lvl:"B2",en:"My luggage didn't show up on the carousel.",ko:"수하물이 컨베이어에 안 나왔어요.",alts:[],note:"show up = 나타나다."},
 {id:"c60",tag:"여행",lvl:"B2",en:"Is there any way I could get an upgrade?",ko:"혹시 업그레이드받을 방법이 있을까요?",alts:["Is there any way I can get an upgrade?"],note:"Is there any way ~? 아주 공손한 부탁."},
 {id:"c61",tag:"여행",lvl:"B2",en:"I was charged twice for the same room.",ko:"같은 방값이 두 번 청구됐어요.",alts:[],note:""},
 {id:"c62",tag:"여행",lvl:"B2",en:"We'd like to make the most of our time here.",ko:"여기 있는 동안 알차게 보내고 싶어요.",alts:[],note:"make the most of = 최대한 활용하다."},
 {id:"c63",tag:"직장·면접",lvl:"A1",en:"I work in sales.",ko:"영업 일을 해요.",alts:["I work in sales now."],note:"I work in + 분야."},
 {id:"c64",tag:"직장·면접",lvl:"A1",en:"See you tomorrow.",ko:"내일 봐요.",alts:[],note:""},
 {id:"c65",tag:"직장·면접",lvl:"A1",en:"I have a question.",ko:"질문이 있어요.",alts:["I've got a question."],note:""},
 {id:"c66",tag:"직장·면접",lvl:"A1",en:"Thank you for your help.",ko:"도와줘서 고마워요.",alts:["Thanks for your help."],note:"Thank you for + 명사/-ing."},
 {id:"c67",tag:"직장·면접",lvl:"A2",en:"Let me check my schedule.",ko:"일정 좀 확인해 볼게요.",alts:["Let me check my calendar."],note:""},
 {id:"c68",tag:"직장·면접",lvl:"B2",en:"Let's circle back to this next week.",ko:"이건 다음 주에 다시 얘기해요.",alts:[],note:"circle back = 나중에 다시 다루다."},
 {id:"c69",tag:"직장·면접",lvl:"B2",en:"Could you elaborate on that?",ko:"그 부분을 좀 더 자세히 설명해 주시겠어요?",alts:["Can you elaborate on that?"],note:""},
 {id:"c70",tag:"직장·면접",lvl:"B2",en:"We need to get everyone on the same page.",ko:"모두 같은 이해를 갖게 해야 해요.",alts:[],note:"on the same page = 같은 생각을 공유하는."},
 {id:"c71",tag:"직장·면접",lvl:"B2",en:"Let me play devil's advocate for a second.",ko:"잠깐 일부러 반대 입장에서 말해 볼게요.",alts:["Let me play devil's advocate."],note:"반론을 부드럽게 꺼내는 회의 표현."},
 {id:"c72",tag:"카페·식당",lvl:"A2",en:"Can I get it without ice?",ko:"얼음 빼고 주세요.",alts:["Could I get it without ice?","Can I have it without ice?"],note:"without = ~없이."},
 {id:"c73",tag:"카페·식당",lvl:"A2",en:"Could we see the menu, please?",ko:"메뉴판 좀 볼 수 있을까요?",alts:["Can we see the menu, please?","Could we have the menu, please?"],note:""},
 {id:"c74",tag:"카페·식당",lvl:"B1",en:"What would you recommend?",ko:"뭘 추천하세요?",alts:["What do you recommend?"],note:"고민될 땐 점원에게 넘기기."},
 {id:"c75",tag:"카페·식당",lvl:"B1",en:"I'm allergic to peanuts.",ko:"땅콩 알레르기가 있어요.",alts:[],note:"allergic to + 음식."},
 {id:"c76",tag:"카페·식당",lvl:"B1",en:"Could we split the bill?",ko:"따로 계산할 수 있을까요?",alts:["Can we split the bill?","Could we split the check?"],note:""},
 {id:"c77",tag:"카페·식당",lvl:"B1",en:"I think there's a mistake on the bill.",ko:"계산서에 착오가 있는 것 같아요.",alts:[],note:"I think 로 시작해 부드럽게 지적."},
 {id:"c78",tag:"카페·식당",lvl:"B2",en:"This isn't quite what I ordered.",ko:"제가 주문한 거랑 좀 다른데요.",alts:[],note:"not quite = 딱 그건 아닌."},
 {id:"c79",tag:"카페·식당",lvl:"B2",en:"Could you go easy on the salt?",ko:"소금은 조금만 넣어 주실래요?",alts:["Can you go easy on the salt?"],note:"go easy on = 적게 쓰다."},
 {id:"c80",tag:"카페·식당",lvl:"B2",en:"We're celebrating, so we'd like something special.",ko:"축하하는 자리라 특별한 걸 먹고 싶어요.",alts:[],note:""},
 {id:"c81",tag:"카페·식당",lvl:"B2",en:"It's on me tonight.",ko:"오늘은 내가 살게.",alts:["Tonight is on me."],note:"It's on me = 내가 낼게."}
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
 C("쇼핑","A2","Do you have this in a smaller size?","이거 더 작은 사이즈 있어요?",[]),
 C("쇼핑","A2","Where are the fitting rooms?","탈의실이 어디예요?",["Where is the fitting room?"]),
 C("쇼핑","A2","Is this on sale?","이거 할인 중인가요?",["Is this item on sale?"]),
 C("쇼핑","A2","Can I get a bag, please?","봉투 하나 주시겠어요?",["Could I get a bag, please?"]),
 C("쇼핑","A2","It doesn't fit.","사이즈가 안 맞아요.",[]),
 C("쇼핑","A2","Do you have it in black?","이거 검은색 있어요?",["Do you have this in black?"],"in + 색깔 = ~색으로."),
 C("쇼핑","B1","I'd like to return this.","이거 반품하고 싶어요.",[]),
 C("쇼핑","B1","Can I exchange it for a different size?","다른 사이즈로 교환할 수 있나요?",["Could I exchange it for a different size?"]),
 C("쇼핑","B1","I have the receipt right here.","영수증 여기 있어요.",["I've got the receipt right here."]),
 C("쇼핑","B1","Is there a warranty on this?","이거 보증 기간이 있나요?",["Does this come with a warranty?"]),
 C("쇼핑","B1","It's a bit out of my price range.","제 예산보다 조금 비싸네요.",["It's a little out of my price range."],"비싸다는 말을 돌려서."),
 C("쇼핑","B1","Could you hold it for me until tomorrow?","내일까지 맡아 주실 수 있어요?",["Can you hold it for me until tomorrow?"]),
 C("쇼핑","B2","Is there any room to negotiate on the price?","가격 조정의 여지가 있을까요?",["Is there any room for negotiation on the price?"],"room = 여지."),
 C("쇼핑","B2","It looked different in the pictures online.","온라인 사진이랑 달라 보이네요.",[]),
 C("쇼핑","B2","Is this the best price you can do?","이게 해 주실 수 있는 최선의 가격인가요?",["Is that the best price you can do?"]),
 C("쇼핑","B2","I'd rather wait until it goes on sale.","세일할 때까지 기다리는 게 낫겠어요.",[],"would rather = 차라리 ~하겠다."),
 C("쇼핑","B2","That's a real bargain.","진짜 싸게 잘 샀네요.",[]),
 C("쇼핑","B2","The item arrived damaged, so I'd like a full refund.","물건이 파손돼서 와서 전액 환불받고 싶어요.",[]),
 /* 전화·약속 */
 C("전화·약속","A1","Can you hear me?","내 말 들려?",["Can you hear me now?"]),
 C("전화·약속","A1","I'll call you back.","다시 전화할게.",[]),
 C("전화·약속","A1","Are you free tomorrow?","내일 시간 돼?",[]),
 C("전화·약속","A1","See you at seven.","7시에 봐.",["See you at 7."]),
 C("전화·약속","A1","Sorry, wrong number.","죄송해요, 잘못 걸었어요.",["Sorry, I have the wrong number."]),
 C("전화·약속","A1","Hi, it's me.","안녕, 나야.",["Hey, it's me."],"전화에선 I'm 대신 it's."),
 C("전화·약속","A2","What time works for you?","몇 시가 좋아요?",["What time is good for you?"],"works for you = 너한테 괜찮다."),
 C("전화·약속","A2","Can I leave a message?","메시지 남길 수 있을까요?",["Could I leave a message?"]),
 C("전화·약속","A2","You're breaking up.","소리가 끊겨요.",[],"통화가 끊길 때 쓰는 말."),
 C("전화·약속","A2","Let's meet in front of the station.","역 앞에서 만나자.",[]),
 C("전화·약속","A2","I'm running a little late.","조금 늦을 것 같아.",["I'm running a bit late."],"run late = 늦어지다."),
 C("전화·약속","A2","Could you speak a little louder?","조금 더 크게 말해 줄래요?",["Can you speak a little louder?"]),
 C("전화·약속","B1","I'd like to make an appointment.","예약을 잡고 싶어요.",[],"병원·미용실 예약은 appointment."),
 C("전화·약속","B1","Something came up, so I need to cancel.","일이 생겨서 취소해야 해.",[],"come up = 갑자기 생기다."),
 C("전화·약속","B1","Can we reschedule for next week?","다음 주로 일정 바꿀 수 있을까?",["Could we reschedule for next week?"]),
 C("전화·약속","B1","I'll text you the address.","주소 문자로 보내 줄게.",[]),
 C("전화·약속","B1","Sorry, I missed your call.","미안, 전화 못 받았어.",[]),
 C("전화·약속","B1","Let me put you on speaker.","스피커폰으로 돌릴게.",["Let me put you on speakerphone."]),
 C("전화·약속","B2","I'm afraid I have to bail on tonight.","미안한데 오늘 밤 약속 못 갈 것 같아.",["I'm afraid I have to bail tonight."],"bail on = 약속을 펑크 내다(구어)."),
 C("전화·약속","B2","Let's play it by ear.","상황 봐서 정하자.",[],"악보 없이 귀로 연주하듯 그때그때."),
 C("전화·약속","B2","Could you pencil me in for Thursday?","목요일로 일단 잡아 주실래요?",["Can you pencil me in for Thursday?"],"연필로 적듯 잠정 일정."),
 C("전화·약속","B2","I'll keep you posted.","계속 소식 전해 줄게.",[]),
 C("전화·약속","B2","Sorry to call out of the blue.","갑자기 연락해서 미안해.",["Sorry for calling out of the blue."],"맑은 하늘(blue)에서 뚝 떨어지듯 갑자기."),
 C("전화·약속","B2","Can I get back to you on that?","그건 나중에 답해도 될까?",["Could I get back to you on that?"]),
 /* 병원·약국 */
 C("병원·약국","A1","I don't feel well.","몸이 안 좋아요.",[]),
 C("병원·약국","A1","I have a headache.","머리가 아파요.",["I've got a headache."]),
 C("병원·약국","A1","I have a fever.","열이 나요.",["I've got a fever."]),
 C("병원·약국","A1","My stomach hurts.","배가 아파요.",["My stomach is hurting."]),
 C("병원·약국","A1","I need a doctor.","의사가 필요해요.",[]),
 C("병원·약국","A1","Where is the pharmacy?","약국이 어디예요?",[]),
 C("병원·약국","A2","I have a sore throat.","목이 아파요.",["I've got a sore throat."]),
 C("병원·약국","A2","How often should I take this?","이거 얼마나 자주 먹어야 해요?",["How often do I take this?"],"약을 먹다 = take."),
 C("병원·약국","A2","Do I need a prescription?","처방전이 필요한가요?",[]),
 C("병원·약국","A2","I've had a cough for three days.","사흘째 기침을 해요.",[],"have had + for = 쭉 그래 왔다."),
 C("병원·약국","A2","I think I caught a cold.","감기에 걸린 것 같아요.",["I think I've caught a cold."]),
 C("병원·약국","A2","Do you have anything for allergies?","알레르기약 있나요?",["Is there anything for allergies?"]),
 C("병원·약국","B1","I'd like to see a doctor as soon as possible.","가능한 한 빨리 진료받고 싶어요.",[]),
 C("병원·약국","B1","It hurts when I swallow.","삼킬 때 아파요.",[]),
 C("병원·약국","B1","Are there any side effects?","부작용이 있나요?",["Does it have any side effects?"]),
 C("병원·약국","B1","I'm allergic to penicillin.","페니실린 알레르기가 있어요.",[]),
 C("병원·약국","B1","Should I take it before or after meals?","식전에 먹어요, 식후에 먹어요?",[]),
 C("병원·약국","B1","I twisted my ankle.","발목을 삐었어요.",["I sprained my ankle."]),
 C("병원·약국","B2","The pain comes and goes.","통증이 있다 없다 해요.",[]),
 C("병원·약국","B2","I've been feeling run-down lately.","요즘 계속 기운이 없어요.",[],"run-down = 지치고 기운 없는."),
 C("병원·약국","B2","Does my insurance cover this?","이거 보험 적용되나요?",["Will my insurance cover this?"]),
 C("병원·약국","B2","I'd like to get a second opinion.","다른 의사 소견도 듣고 싶어요.",[]),
 C("병원·약국","B2","The symptoms started a couple of days ago.","증상은 이틀쯤 전에 시작됐어요.",[]),
 C("병원·약국","B2","It's nothing serious, just a mild sprain.","심각한 건 아니고 가볍게 삔 거예요.",[]),
 /* 집·생활 */
 C("집·생활","A1","Can you help me?","좀 도와줄래요?",["Could you help me?"]),
 C("집·생활","A1","The light is broken.","불이 고장 났어요.",["The light doesn't work."]),
 C("집·생활","A1","I'm home!","나 왔어!",[],"집에 들어오면서 하는 인사."),
 C("집·생활","A1","What's for dinner?","저녁 뭐야?",[]),
 C("집·생활","A1","It's cold in here.","여기 춥다.",[]),
 C("집·생활","A1","Good night.","잘 자.",[]),
 C("집·생활","A2","The heater isn't working.","히터가 안 돼요.",[]),
 C("집·생활","A2","Could you turn down the music?","음악 소리 좀 줄여 줄래요?",["Can you turn down the music?"],"turn down = 소리를 줄이다."),
 C("집·생활","A2","I'll take out the trash.","쓰레기 내가 버릴게.",[]),
 C("집·생활","A2","My package hasn't arrived yet.","택배가 아직 안 왔어요.",[]),
 C("집·생활","A2","Can I borrow your charger?","충전기 좀 빌려도 돼?",["Could I borrow your charger?"]),
 C("집·생활","A2","Whose turn is it to do the dishes?","설거지 누구 차례야?",[]),
 C("집·생활","B1","There's a leak under the sink.","싱크대 밑에서 물이 새요.",[]),
 C("집·생활","B1","When can someone come and fix it?","언제 와서 고쳐 주실 수 있어요?",[]),
 C("집·생활","B1","The rent is due on the first.","월세는 1일까지 내야 해요.",["The rent is due on the 1st."],"due = 기한이 된."),
 C("집·생활","B1","Could you sign for my package?","제 택배 대신 받아 주실래요?",["Can you sign for my package?"]),
 C("집·생활","B1","We're running out of toilet paper.","휴지가 다 떨어져 가.",[],"run out of = ~이 떨어지다."),
 C("집·생활","B1","Sorry about the noise last night.","어젯밤 시끄럽게 해서 죄송해요.",[]),
 C("집·생활","B2","I'd like to renew my lease.","임대 계약을 연장하고 싶어요.",[]),
 C("집·생활","B2","The landlord still hasn't gotten back to me.","집주인이 아직도 연락이 없어요.",["The landlord still hasn't got back to me."]),
 C("집·생활","B2","Let's split the utilities evenly.","공과금은 똑같이 나누자.",[]),
 C("집·생활","B2","Could you keep it down after ten?","열 시 이후엔 조용히 해 주실래요?",["Can you keep it down after ten?"],"keep it down = 소리를 낮추다."),
 C("집·생활","B2","I'd like my deposit back in full.","보증금을 전액 돌려받고 싶어요.",[]),
 C("집·생활","B2","I really need to declutter my room.","방 정리 좀 제대로 해야겠어.",[]),
 /* 학교·공부 */
 C("학교·공부","A1","I'm a student.","저는 학생이에요.",[]),
 C("학교·공부","A1","What does this word mean?","이 단어 무슨 뜻이에요?",[]),
 C("학교·공부","A1","How do you spell that?","그거 철자가 어떻게 돼요?",["How do you spell it?"]),
 C("학교·공부","A1","Can you say it slowly?","천천히 말해 줄래요?",["Could you say it slowly?"]),
 C("학교·공부","A1","I don't understand.","이해가 안 돼요.",[]),
 C("학교·공부","A1","I have a test tomorrow.","내일 시험이 있어요.",["I've got a test tomorrow."]),
 C("학교·공부","A2","When is the homework due?","숙제 언제까지예요?",[]),
 C("학교·공부","A2","Can I ask a question?","질문해도 될까요?",["Could I ask a question?","May I ask a question?"]),
 C("학교·공부","A2","I'm studying for my exam.","시험공부 중이에요.",[]),
 C("학교·공부","A2","Could you explain that again?","그거 다시 설명해 줄래요?",["Can you explain that again?"]),
 C("학교·공부","A2","What page are we on?","지금 몇 페이지예요?",[]),
 C("학교·공부","A2","I forgot my textbook.","교과서를 깜빡했어요.",["I forgot to bring my textbook."]),
 C("학교·공부","B1","I'm having trouble keeping up.","진도 따라가기가 힘들어요.",[],"keep up = 뒤처지지 않고 따라가다."),
 C("학교·공부","B1","Could I get an extension on the assignment?","과제 기한을 연장받을 수 있을까요?",["Can I get an extension on the assignment?"]),
 C("학교·공부","B1","Let's form a study group.","스터디 그룹 만들자.",[]),
 C("학교·공부","B1","I need to brush up on my grammar.","문법을 다시 다져야 해요.",[],"brush up on = 녹슨 실력을 다듬다."),
 C("학교·공부","B1","What's the difference between these two?","이 둘의 차이가 뭐예요?",[]),
 C("학교·공부","B1","I learned it by heart.","그거 통째로 외웠어.",[],"by heart = 마음에 새기듯 외워서."),
 C("학교·공부","B2","I've been cramming all week.","일주일 내내 벼락치기했어.",[],"cram = 꾸역꾸역 쑤셔 넣다."),
 C("학교·공부","B2","Could you walk me through how you got that answer?","그 답이 어떻게 나왔는지 차근차근 알려 줄래요?",[]),
 C("학교·공부","B2","I'm considering majoring in economics.","경제학 전공을 고려하고 있어요.",[]),
 C("학교·공부","B2","The lecture went right over my head.","강의가 너무 어려워서 하나도 이해 못 했어.",["The lecture went over my head."],"머리 위로 휙 지나가 버렸다 = 이해 못 함."),
 C("학교·공부","B2","I'd appreciate some feedback on my essay.","제 에세이에 피드백 주시면 감사하겠어요.",[]),
 C("학교·공부","B2","Practice makes perfect.","연습하면 잘하게 돼.",[],"직역(연습이 완벽을 만든다)보다 이렇게 쓰여요."),
 /* 취미·여가 */
 C("취미·여가","A1","I like music.","음악을 좋아해요.",[]),
 C("취미·여가","A1","Do you like movies?","영화 좋아해요?",[]),
 C("취미·여가","A1","I play soccer.","축구를 해요.",["I play football."],"영국에선 football."),
 C("취미·여가","A1","Let's go for a walk.","산책하자.",[]),
 C("취미·여가","A1","I love cooking.","요리하는 걸 정말 좋아해요.",["I love to cook."]),
 C("취미·여가","A1","What's your hobby?","취미가 뭐예요?",["What are your hobbies?"]),
 C("취미·여가","A2","What do you do in your free time?","시간 날 때 뭐 해요?",[]),
 C("취미·여가","A2","How often do you work out?","운동 얼마나 자주 해요?",[]),
 C("취미·여가","A2","Have you seen this movie?","이 영화 봤어요?",[]),
 C("취미·여가","A2","I'm into hiking these days.","요즘 등산에 빠졌어요.",[],"be into = ~에 빠지다."),
 C("취미·여가","A2","Do you want to join us?","같이 할래?",["Want to join us?"]),
 C("취미·여가","A2","I'm learning to play the guitar.","기타를 배우고 있어요.",[]),
 C("취미·여가","B1","I'm thinking of taking up yoga.","요가를 시작해 볼까 해요.",[],"take up = 새 취미를 시작하다."),
 C("취미·여가","B1","It helps me unwind after work.","퇴근 후에 긴장을 푸는 데 도움이 돼요.",[]),
 C("취미·여가","B1","I'm not very good at it yet.","아직 잘하진 못해요.",[]),
 C("취미·여가","B1","We should do this more often.","이거 더 자주 하자.",[]),
 C("취미·여가","B1","I got hooked on this show.","이 드라마에 푹 빠졌어.",[],"hooked = 낚싯바늘에 걸린 듯 빠진."),
 C("취미·여가","B1","It's a great way to meet people.","사람들 만나기 좋은 방법이에요.",[]),
 C("취미·여가","B2","I've really gotten into baking lately.","요즘 베이킹에 제대로 빠졌어.",[]),
 C("취미·여가","B2","It's a bit of a guilty pleasure.","좀 부끄러운 취미이긴 해.",[]),
 C("취미·여가","B2","I'm a bit rusty, but I'll give it a shot.","좀 녹슬었지만 한번 해 볼게.",["I'm a little rusty, but I'll give it a shot."],"rusty = 녹슨, 오래 안 해서 서툰."),
 C("취미·여가","B2","Time flies when you're having fun.","즐거우면 시간 가는 줄 모른다니까.",[]),
 C("취미·여가","B2","I'd love to pick up a new hobby this year.","올해는 새 취미를 하나 시작하고 싶어.",[]),
 C("취미·여가","B2","It takes a lot of patience.","인내심이 많이 필요해.",[]),
 /* 온라인·SNS */
 C("온라인·SNS","A1","What's your Instagram?","인스타 아이디가 뭐야?",[]),
 C("온라인·SNS","A1","Send me a photo.","사진 보내 줘.",["Send me a picture."]),
 C("온라인·SNS","A1","The Wi-Fi is slow.","와이파이가 느려.",["The wifi is slow."]),
 C("온라인·SNS","A1","I'll text you.","문자할게.",[]),
 C("온라인·SNS","A1","Did you see my message?","내 메시지 봤어?",[]),
 C("온라인·SNS","A1","What's the password?","비밀번호가 뭐야?",[]),
 C("온라인·SNS","A2","Can you send me the link?","링크 좀 보내 줄래?",["Could you send me the link?"]),
 C("온라인·SNS","A2","My phone is about to die.","폰 배터리가 거의 다 됐어.",[],"die = 배터리가 꺼지다."),
 C("온라인·SNS","A2","I forgot my password.","비밀번호를 잊어버렸어.",[]),
 C("온라인·SNS","A2","I'll post it tonight.","오늘 밤에 올릴게.",[]),
 C("온라인·SNS","A2","Can you tag me in the photo?","사진에 나 태그해 줄래?",["Could you tag me in the photo?"]),
 C("온라인·SNS","A2","Let's video chat later.","이따 영상 통화하자.",[]),
 C("온라인·SNS","B1","This video went viral.","이 영상 완전 떴어.",[],"viral = 바이러스처럼 퍼지는."),
 C("온라인·SNS","B1","I muted the group chat.","단톡방 알림 꺼 놨어.",[]),
 C("온라인·SNS","B1","Can you share your screen?","화면 공유해 줄 수 있어?",["Could you share your screen?"]),
 C("온라인·SNS","B1","I'm trying to spend less time on my phone.","폰 보는 시간을 줄이려고 해.",[]),
 C("온라인·SNS","B1","The app keeps crashing.","앱이 자꾸 꺼져.",[],"keep -ing = 계속 ~하다."),
 C("온라인·SNS","B1","Don't believe everything you read online.","온라인에서 읽는 걸 다 믿지 마.",[]),
 C("온라인·SNS","B2","I take what I see on social media with a grain of salt.","SNS에서 보는 건 걸러서 들어.",[],"소금 한 꼬집 쳐서 먹듯 의심하며."),
 C("온라인·SNS","B2","I'm doing a digital detox this weekend.","이번 주말엔 디지털 디톡스 중이야.",[]),
 C("온라인·SNS","B2","The comments section got out of hand.","댓글 창이 난리가 났어.",[],"out of hand = 손을 벗어나 통제 불능."),
 C("온라인·SNS","B2","Make sure you back up your files.","파일 꼭 백업해 둬.",["Make sure to back up your files."]),
 C("온라인·SNS","B2","I've been doomscrolling all night.","밤새 우울한 뉴스만 계속 넘겨 봤어.",[]),
 C("온라인·SNS","B2","Let's take this conversation offline.","이 얘기는 따로 직접 하자.",[])
);

/* ---------- phase 2a: the first five situations up to ~10 per level ---------- */
DECK.push(
 C("카페·식당","A1","A coffee, please.","커피 한 잔 주세요.",["One coffee, please."]),
 C("카페·식당","A1","Can I have some water?","물 좀 주실래요?",["Could I have some water?"]),
 C("카페·식당","A1","It's delicious.","맛있어요.",["This is delicious."]),
 C("카페·식당","A1","Table for two, please.","두 명 자리 주세요.",["A table for two, please."]),
 C("카페·식당","A1","I'm full.","배불러요.",[]),
 C("카페·식당","A1","Where do I pay?","어디서 계산해요?",["Where can I pay?"]),
 C("카페·식당","A2","Can I get a refill?","리필 되나요?",["Could I get a refill?"]),
 C("카페·식당","A2","What's in this?","이 안에 뭐가 들어 있어요?",[]),
 C("카페·식당","A2","Is it spicy?","매워요?",["Is this spicy?"]),
 C("카페·식당","A2","We're ready to order.","이제 주문할게요.",[]),
 C("카페·식당","A2","Could I have a little more time?","시간 좀 더 주실래요?",["Can I have a little more time?"],"메뉴를 아직 못 골랐을 때."),
 C("카페·식당","A2","Can I get the sauce on the side?","소스는 따로 주실래요?",["Could I get the sauce on the side?"],"on the side = 따로 곁들여."),
 C("카페·식당","B1","Do you have any vegetarian options?","채식 메뉴 있나요?",[]),
 C("카페·식당","B1","How long is the wait?","얼마나 기다려야 해요?",["How long is the wait for a table?"]),
 C("카페·식당","B1","Could we get a table by the window?","창가 자리 있을까요?",["Can we get a table by the window?"]),
 C("카페·식당","B1","I'd like my steak medium, please.","스테이크는 미디엄으로 해 주세요.",[]),
 C("카페·식당","B1","Could you pack up the leftovers?","남은 거 포장해 주실래요?",["Can you pack up the leftovers?"]),
 C("카페·식당","B1","Is service included?","봉사료 포함인가요?",["Is the service charge included?"]),
 C("카페·식당","B2","We'll get a few small plates to share.","나눠 먹을 작은 요리 몇 개로 할게요.",[]),
 C("카페·식당","B2","Could you recommend a wine that goes well with this?","이거랑 잘 어울리는 와인 추천해 주실래요?",[],"go well with = ~와 잘 어울리다."),
 C("카페·식당","B2","The service here is top-notch.","여기 서비스 최고네요.",[],"top-notch = 최고 수준의."),
 C("카페·식당","B2","I'm trying to cut back on sugar.","설탕을 줄이려고 해요.",[],"cut back on = 양을 줄이다."),
 C("카페·식당","B2","Let's grab a bite after work.","퇴근하고 간단히 뭐 좀 먹자.",[],"grab a bite = 간단히 먹다."),
 C("카페·식당","B2","My compliments to the chef.","셰프께 정말 맛있었다고 전해 주세요.",[]),
 C("스몰토크","A1","What's your name?","이름이 뭐예요?",[]),
 C("스몰토크","A1","Where are you from?","어디서 왔어요?",[]),
 C("스몰토크","A1","Nice weather today.","오늘 날씨 좋네요.",["Nice weather today, isn't it?"]),
 C("스몰토크","A1","See you later.","나중에 봐요.",["See you."]),
 C("스몰토크","A1","Have a nice day.","좋은 하루 보내요.",["Have a good day."]),
 C("스몰토크","A1","Me too.","저도요.",[]),
 C("스몰토크","A2","What do you do?","무슨 일 하세요?",["What do you do for a living?"],"직업을 묻는 가장 흔한 말."),
 C("스몰토크","A2","How was your weekend?","주말 어땠어?",[]),
 C("스몰토크","A2","Have you been here before?","여기 와 본 적 있어요?",[]),
 C("스몰토크","A2","It's freezing today.","오늘 엄청 춥다.",[]),
 C("스몰토크","A2","What are you up to this weekend?","이번 주말에 뭐 해?",[]),
 C("스몰토크","A2","How do you know each other?","두 분 서로 어떻게 알아요?",[]),
 C("스몰토크","B1","I don't think we've met.","처음 뵙는 것 같네요.",[]),
 C("스몰토크","B1","Small world!","세상 참 좁다!",["It's a small world!"]),
 C("스몰토크","B1","Did you hear about the new café?","새로 생긴 카페 얘기 들었어?",["Have you heard about the new café?"]),
 C("스몰토크","B1","You seem to be in a good mood.","기분 좋아 보이네.",["You seem like you're in a good mood."]),
 C("스몰토크","B1","Anyway, it was great talking to you.","아무튼, 얘기 즐거웠어요.",["Anyway, it was nice talking to you."],"대화를 끝내는 신호."),
 C("스몰토크","B1","How's work been?","요즘 일은 좀 어때?",["How has work been?"]),
 C("스몰토크","B2","I'm terrible with names.","제가 이름을 잘 못 외워요.",[]),
 C("스몰토크","B2","Let's not talk shop.","일 얘기는 하지 말자.",[],"talk shop = 가게(일) 얘기를 하다."),
 C("스몰토크","B2","You haven't changed a bit.","하나도 안 변했네.",[]),
 C("스몰토크","B2","Long story short, we missed the train.","간단히 말하면, 기차를 놓쳤어.",[]),
 C("스몰토크","B2","I'll leave you to it.","하던 거 마저 해.",[]),
 C("스몰토크","B2","Sorry, I didn't catch your name.","죄송해요, 성함을 못 들었어요.",[],"catch = (말을) 알아듣다."),
 C("여행","A1","One ticket, please.","표 한 장 주세요.",[]),
 C("여행","A1","Where is the bus stop?","버스 정류장이 어디예요?",[]),
 C("여행","A1","How far is it?","얼마나 멀어요?",[]),
 C("여행","A1","Can I have a map?","지도 한 장 주실래요?",["Could I have a map?"]),
 C("여행","A1","I'm here on vacation.","휴가로 왔어요.",["I'm here on holiday."]),
 C("여행","A1","Take me to this address, please.","이 주소로 가 주세요.",["Please take me to this address."]),
 C("여행","A2","What time does the train leave?","기차가 몇 시에 출발해요?",[]),
 C("여행","A2","Can I check in early?","일찍 체크인할 수 있어요?",["Could I check in early?"]),
 C("여행","A2","How do I get to the airport?","공항에 어떻게 가요?",["How can I get to the airport?"]),
 C("여행","A2","Is there a direct bus?","직행버스 있어요?",[]),
 C("여행","A2","Could you call a taxi for me?","택시 좀 불러 주실래요?",["Can you call a taxi for me?"]),
 C("여행","A2","I'd like a room for two nights.","2박 할 방 주세요.",[]),
 C("여행","B1","Is there a cheaper way to get there?","더 싸게 가는 방법 있어요?",[]),
 C("여행","B1","I'd like to store my luggage for a few hours.","짐을 몇 시간 맡기고 싶어요.",[]),
 C("여행","B1","Which platform does it leave from?","몇 번 승강장에서 출발해요?",[]),
 C("여행","B1","I missed my connecting flight.","환승 비행기를 놓쳤어요.",[]),
 C("여행","B1","Do I need to transfer?","갈아타야 하나요?",["Do I have to transfer?"]),
 C("여행","B1","Could you keep an eye on my bag?","가방 좀 봐 주실래요?",["Can you keep an eye on my bag?"],"keep an eye on = 눈을 떼지 않고 지켜보다."),
 C("여행","B2","We'd like to go off the beaten path.","잘 안 알려진 곳에 가 보고 싶어요.",[],"사람들이 밟아 다진 길을 벗어나."),
 C("여행","B2","Is it worth the detour?","돌아서 갈 만한 가치가 있나요?",[]),
 C("여행","B2","The jet lag is really getting to me.","시차 때문에 정말 힘드네요.",[],"get to someone = 힘들게 하다."),
 C("여행","B2","I'd like to file a complaint about the room.","방 문제로 정식 항의하고 싶어요.",[]),
 C("여행","B2","We got ripped off by the taxi driver.","택시 기사한테 바가지 썼어요.",[],"rip off = 바가지 씌우다."),
 C("여행","B2","Is there a local spot you'd recommend?","추천할 만한 현지 맛집 있어요?",[]),
 C("직장·면접","A1","Good morning, everyone.","좋은 아침이에요, 여러분.",[]),
 C("직장·면접","A1","I'm busy right now.","지금 바빠요.",[]),
 C("직장·면접","A1","Here you go.","여기 있어요.",["Here you are."],"물건을 건넬 때."),
 C("직장·면접","A1","Just a moment.","잠시만요.",["Just a minute."]),
 C("직장·면접","A1","I'm new here.","여기 처음 왔어요.",[]),
 C("직장·면접","A1","Good job!","잘했어요!",["Great job!"]),
 C("직장·면접","A2","Can you send me the file?","파일 보내 줄래요?",["Could you send me the file?"]),
 C("직장·면접","A2","I'll be in a meeting until two.","두 시까지 회의예요.",[]),
 C("직장·면접","A2","Who's in charge of this?","이거 누가 담당이에요?",[]),
 C("직장·면접","A2","Can we talk for a minute?","잠깐 얘기할 수 있어요?",["Could we talk for a minute?"]),
 C("직장·면접","A2","I'm working from home today.","오늘 재택근무해요.",[]),
 C("직장·면접","A2","The deadline is Friday.","마감은 금요일이에요.",[]),
 C("직장·면접","B1","I'll look into it.","제가 알아볼게요.",[],"look into = 자세히 들여다보다."),
 C("직장·면접","B1","Can you give me a hand with this?","이거 좀 도와줄래요?",["Could you give me a hand with this?"],"give a hand = 손을 빌려주다."),
 C("직장·면접","B1","Let's touch base tomorrow.","내일 잠깐 연락해서 상황 맞춰 봐요.",["Let's check in tomorrow."],"touch base = 짧게 연락해 진행 상황을 확인하다. 야구에서 베이스를 잠깐 밟듯이."),
 C("직장·면접","B1","I'm afraid I can't make it to the meeting.","미안하지만 회의에 못 갈 것 같아요.",[],"make it = 시간 맞춰 가다."),
 C("직장·면접","B1","Could you clarify what you mean?","무슨 뜻인지 분명히 말씀해 주실래요?",["Can you clarify what you mean?"]),
 C("직장·면접","B1","We're behind schedule.","일정이 밀렸어요.",[]),
 C("직장·면접","B2","I'd like to propose a different approach.","다른 접근법을 제안하고 싶어요.",[]),
 C("직장·면접","B2","That's outside the scope of this project.","그건 이번 프로젝트 범위 밖이에요.",[]),
 C("직장·면접","B2","Can we push back the launch date?","출시일을 미룰 수 있을까요?",["Could we push back the launch date?"],"push back = 뒤로 미루다."),
 C("직장·면접","B2","I'm stretched a bit thin right now.","요즘 일이 많아서 좀 벅차요.",[],"얇게 늘어난 반죽처럼 여유가 없는."),
 C("직장·면접","B2","Let's not reinvent the wheel.","있는 걸 굳이 새로 만들지 말자.",[]),
 C("직장·면접","B2","I'd be happy to take the lead on this.","이 건은 제가 기꺼이 맡을게요.",[]),
 C("감정·의견","A1","I'm happy.","행복해.",[]),
 C("감정·의견","A1","I'm sad.","슬퍼.",[]),
 C("감정·의견","A1","I love it!","정말 좋아!",[]),
 C("감정·의견","A1","That's funny.","웃기다.",[]),
 C("감정·의견","A1","I'm hungry.","배고파.",[]),
 C("감정·의견","A1","Really?","정말?",[]),
 C("감정·의견","A2","I'm so happy for you.","정말 잘됐다.",[]),
 C("감정·의견","A2","That sounds fun.","재밌겠다.",["That sounds like fun."]),
 C("감정·의견","A2","I'm worried about the test.","시험이 걱정돼.",[]),
 C("감정·의견","A2","What do you think?","어떻게 생각해?",[]),
 C("감정·의견","A2","I'm not sure about that.","그건 잘 모르겠어.",[]),
 C("감정·의견","A2","That's too bad.","안됐다.",[]),
 C("감정·의견","B1","It's up to you.","너한테 달렸어.",[]),
 C("감정·의견","B1","I can't stand it.","못 참겠어.",[],"stand = 견디다."),
 C("감정·의견","B1","I was really disappointed.","정말 실망했어.",[]),
 C("감정·의견","B1","Honestly, I'm a bit overwhelmed.","솔직히 좀 벅차.",[]),
 C("감정·의견","B1","That makes me feel better.","그 말 들으니 기분이 나아지네.",[]),
 C("감정·의견","B1","I'm not a big fan of it.","그거 별로 안 좋아해.",[],"싫다는 말을 부드럽게."),
 C("감정·의견","B2","I'm over the moon!","너무 기뻐!",[],"기뻐서 달을 뛰어넘을 듯."),
 C("감정·의견","B2","It really got on my nerves.","그거 진짜 신경 거슬렸어.",[]),
 C("감정·의견","B2","I see your point, but I'm not convinced.","무슨 말인지 알지만 납득은 안 돼.",[]),
 C("감정·의견","B2","It was a blessing in disguise.","전화위복이었어.",[],"변장한 축복 = 처음엔 나빠 보였던 좋은 일."),
 C("감정·의견","B2","I've had a change of heart.","마음이 바뀌었어.",[]),
 C("감정·의견","B2","Let's look on the bright side.","좋은 쪽으로 생각하자.",[])
);

/* ---------- phase 2b: the seven newer situations up to ~10 per level ---------- */
DECK.push(
 C("쇼핑","A1","It's too big.","너무 커요.",[]),
 C("쇼핑","A1","Do you have a bigger one?","더 큰 거 있어요?",[]),
 C("쇼핑","A1","Where is the cashier?","계산대가 어디예요?",[]),
 C("쇼핑","A1","Just this, please.","이것만 할게요.",["Just this one, please."]),
 C("쇼핑","A2","Is there a student discount?","학생 할인 있어요?",["Do you have a student discount?"]),
 C("쇼핑","A2","Can you gift-wrap it?","선물 포장해 주실 수 있어요?",["Could you gift-wrap it?"]),
 C("쇼핑","A2","I'm looking for a jacket.","재킷을 찾고 있어요.",[]),
 C("쇼핑","A2","Do you have this in stock?","이거 재고 있어요?",[],"in stock = 재고가 있는."),
 C("쇼핑","B1","What's your return policy?","반품 규정이 어떻게 돼요?",[]),
 C("쇼핑","B1","It's cheaper online.","온라인이 더 싸네요.",[]),
 C("쇼핑","B1","Do you price match?","다른 곳 최저가에 맞춰 주시나요?",[]),
 C("쇼핑","B1","That was a total impulse buy.","완전 충동구매였어.",[]),
 C("쇼핑","B2","I'm torn between these two.","이 두 개 사이에서 고민돼요.",[],"torn = 둘로 찢긴 마음."),
 C("쇼핑","B2","It's worth splurging on good shoes.","좋은 신발엔 돈 좀 써도 괜찮아.",[]),
 C("쇼핑","B2","It's buy one, get one free.","하나 사면 하나 공짜예요.",[]),
 C("쇼핑","B2","I'd like to speak to a manager, please.","매니저와 얘기하고 싶어요.",[]),
 C("전화·약속","A1","Call me later.","나중에 전화해.",[]),
 C("전화·약속","A1","What's your number?","번호가 뭐야?",[]),
 C("전화·약속","A1","I'm on my way.","가는 중이야.",[]),
 C("전화·약속","A1","Let's meet at noon.","정오에 만나자.",[]),
 C("전화·약속","A2","Can I call you tonight?","오늘 밤에 전화해도 돼?",["Could I call you tonight?"]),
 C("전화·약속","A2","Is this a good time to talk?","지금 통화 괜찮아?",[]),
 C("전화·약속","A2","Let me check and call you back.","확인하고 다시 전화할게.",[]),
 C("전화·약속","A2","I'll be there in ten minutes.","10분 안에 도착해.",[]),
 C("전화·약속","B1","Could you hold on a second?","잠깐만 기다려 줄래요?",["Can you hold on a second?"]),
 C("전화·약속","B1","I'll put you through to her.","그분께 연결해 드릴게요.",[],"put through = 전화를 연결하다."),
 C("전화·약속","B1","Can we make it a bit later?","조금 늦게 만날 수 있을까?",["Could we make it a bit later?"]),
 C("전화·약속","B1","I'm calling about my appointment.","예약 건으로 전화드렸어요.",[]),
 C("전화·약속","B2","Sorry, you caught me at a bad time.","미안, 지금 타이밍이 안 좋아.",[]),
 C("전화·약속","B2","I'll give you a ring tomorrow.","내일 전화할게.",[],"give a ring = 전화를 걸다."),
 C("전화·약속","B2","We've been playing phone tag all day.","하루 종일 서로 엇갈리게 전화만 했어.",[],"술래잡기(tag)처럼 엇갈리는 전화."),
 C("전화·약속","B2","Let's find a time that works for everyone.","모두 괜찮은 시간으로 정하자.",[]),
 C("병원·약국","A1","I feel sick.","속이 안 좋아요.",[],"미국에선 '몸이 아프다', 영국에선 주로 '토할 것 같다'는 뜻."),
 C("병원·약국","A1","My back hurts.","허리가 아파요.",["My back is hurting."]),
 C("병원·약국","A1","I need some medicine.","약이 좀 필요해요.",[]),
 C("병원·약국","A1","Call an ambulance!","구급차 불러 주세요!",["Please call an ambulance!"]),
 C("병원·약국","A2","I can't sleep at night.","밤에 잠을 못 자요.",[]),
 C("병원·약국","A2","Where does it hurt?","어디가 아파요?",[]),
 C("병원·약국","A2","I feel dizzy.","어지러워요.",["I'm feeling dizzy."]),
 C("병원·약국","A2","Take two pills a day.","하루에 두 알 드세요.",[]),
 C("병원·약국","B1","I've been sneezing all morning.","아침 내내 재채기가 나요.",[]),
 C("병원·약국","B1","Do I need to make an appointment?","예약해야 하나요?",[]),
 C("병원·약국","B1","I think I have food poisoning.","식중독인 것 같아요.",[]),
 C("병원·약국","B1","How long will it take to recover?","회복하는 데 얼마나 걸려요?",[]),
 C("병원·약국","B2","I'd like to get a full checkup.","종합 검진을 받고 싶어요.",[]),
 C("병원·약국","B2","Can I get this over the counter?","이거 처방전 없이 살 수 있나요?",["Is this available over the counter?"],"over the counter = 계산대 너머로 바로 파는."),
 C("병원·약국","B2","I'm on the mend.","회복 중이에요.",[],"mend = 수선하다, 고쳐지는 중."),
 C("병원·약국","B2","I've been under the weather all week.","일주일 내내 몸이 안 좋았어.",[]),
 C("집·생활","A1","Where are my keys?","내 열쇠 어디 있지?",[]),
 C("집·생활","A1","Please close the door.","문 좀 닫아 줘.",["Close the door, please."]),
 C("집·생활","A1","I'm going to bed.","자러 갈게.",[]),
 C("집·생활","A1","The water is hot.","물이 뜨거워.",[]),
 C("집·생활","A2","Could you water the plants?","화분에 물 좀 줄래?",["Can you water the plants?"]),
 C("집·생활","A2","The internet isn't working.","인터넷이 안 돼.",[]),
 C("집·생활","A2","I'll do the laundry.","빨래는 내가 할게.",[]),
 C("집·생활","A2","Can you pick up some milk?","우유 좀 사 올래?",["Could you pick up some milk?"],"pick up = 가는 길에 사 오다."),
 C("집·생활","B1","The washing machine is making a weird noise.","세탁기에서 이상한 소리가 나.",[]),
 C("집·생활","B1","Can you help me move the couch?","소파 옮기는 거 좀 도와줄래?",["Could you help me move the couch?"]),
 C("집·생활","B1","We need to clean up before the guests arrive.","손님 오기 전에 치워야 해.",[]),
 C("집·생활","B1","I locked myself out.","문이 잠겨서 못 들어가.",[],"열쇠를 안에 두고 문을 잠가 버렸을 때."),
 C("집·생활","B2","The neighbors keep complaining about the noise.","이웃들이 소음 때문에 계속 항의해.",[]),
 C("집·생활","B2","Let's divide up the chores.","집안일 나눠서 하자.",[]),
 C("집·생활","B2","The pipes froze overnight.","밤새 배관이 얼었어.",[]),
 C("집·생활","B2","I'm thinking of moving to a bigger place.","더 큰 집으로 이사할까 생각 중이야.",[]),
 C("학교·공부","A1","Open your books.","책 펴세요.",["Please open your books."]),
 C("학교·공부","A1","I'm late for class.","수업에 늦었어요.",[]),
 C("학교·공부","A1","Can I borrow a pen?","펜 좀 빌려도 돼요?",["Could I borrow a pen?"]),
 C("학교·공부","A1","Is this right?","이거 맞아요?",["Is this correct?"]),
 C("학교·공부","A2","How do you say this in English?","이거 영어로 뭐라고 해요?",[]),
 C("학교·공부","A2","Can you check my answer?","제 답 좀 봐 주실래요?",["Could you check my answer?"]),
 C("학교·공부","A2","I passed the test!","시험 통과했어!",[]),
 C("학교·공부","A2","What's the homework for tomorrow?","내일 숙제가 뭐예요?",[]),
 C("학교·공부","B1","I'm not following you.","무슨 말인지 잘 못 따라가겠어요.",[],"follow = (이야기를) 따라가다."),
 C("학교·공부","B1","Could you give me an example?","예를 하나 들어 주실래요?",["Can you give me an example?"]),
 C("학교·공부","B1","I need to work on my pronunciation.","발음을 연습해야 해요.",[]),
 C("학교·공부","B1","Let's go over it one more time.","한 번 더 훑어보자.",[],"go over = 훑어보다, 복습하다."),
 C("학교·공부","B2","I'd like to get a head start on next semester.","다음 학기 공부를 미리 시작하고 싶어요.",[],"head start = 남보다 앞서 출발."),
 C("학교·공부","B2","It finally clicked.","드디어 이해가 됐어.",[],"딸깍 맞물리듯 이해되다."),
 C("학교·공부","B2","I'm burnt out from studying.","공부하느라 완전히 지쳤어.",["I'm burned out from studying."]),
 C("학교·공부","B2","Can you break it down for me?","쉽게 풀어서 설명해 줄래요?",["Could you break it down for me?"],"break down = 잘게 나누다."),
 C("취미·여가","A1","I like reading.","독서를 좋아해요.",["I like to read."]),
 C("취미·여가","A1","Let's play a game.","게임 하자.",[]),
 C("취미·여가","A1","I go swimming on Sundays.","일요일마다 수영해요.",[]),
 C("취미·여가","A1","Do you like dogs?","강아지 좋아해요?",[]),
 C("취미·여가","A2","I go to the gym three times a week.","일주일에 세 번 헬스장 가요.",[]),
 C("취미·여가","A2","What kind of music do you like?","어떤 음악 좋아해요?",[]),
 C("취미·여가","A2","Let's watch a movie tonight.","오늘 밤 영화 보자.",[]),
 C("취미·여가","A2","I'm good at drawing.","그림을 잘 그려요.",[]),
 C("취미·여가","B1","I've been into photography lately.","요즘 사진에 빠졌어요.",[]),
 C("취미·여가","B1","It's a good way to clear my head.","머리 식히기 좋아요.",[]),
 C("취미·여가","B1","We could go camping this weekend.","이번 주말에 캠핑 가도 좋겠다.",[]),
 C("취미·여가","B1","I'm saving up for a new camera.","새 카메라 사려고 돈 모으는 중이에요.",[]),
 C("취미·여가","B2","Hiking is how I recharge.","등산이 나한테는 재충전 방법이야.",[]),
 C("취미·여가","B2","I'm a total foodie.","나 완전 미식가야.",[]),
 C("취미·여가","B2","It's not really my thing, but I'll give it a try.","내 취향은 아니지만 한번 해 볼게.",[]),
 C("취미·여가","B2","I'd love to do it professionally someday.","언젠가 이걸 전문적으로 해 보고 싶어.",[]),
 C("온라인·SNS","A1","I'm online now.","나 지금 접속해 있어.",[]),
 C("온라인·SNS","A1","Check your email.","이메일 확인해 봐.",[]),
 C("온라인·SNS","A1","Like my photo!","내 사진에 좋아요 눌러 줘!",[]),
 C("온라인·SNS","A1","Send it to me.","그거 나한테 보내 줘.",[]),
 C("온라인·SNS","A2","Did you get my email?","내 이메일 받았어?",[]),
 C("온라인·SNS","A2","I'll send you a friend request.","친구 신청 보낼게.",[]),
 C("온라인·SNS","A2","The file is too big to send.","파일이 너무 커서 못 보내.",[]),
 C("온라인·SNS","A2","Can you turn on the subtitles?","자막 좀 켜 줄래?",["Could you turn on the subtitles?"]),
 C("온라인·SNS","B1","I just updated the app.","방금 앱 업데이트했어.",[]),
 C("온라인·SNS","B1","Make sure your account is private.","계정 꼭 비공개로 해 둬.",[]),
 C("온라인·SNS","B1","I'll leave a comment.","댓글 남길게.",[]),
 C("온라인·SNS","B1","I unsubscribed from that channel.","그 채널 구독 취소했어.",[]),
 C("온라인·SNS","B2","Don't feed the trolls.","악플러는 상대하지 마.",[],"관심(먹이)을 주면 더 날뛰니까."),
 C("온라인·SNS","B2","That post really struck a chord.","그 게시물 정말 와닿았어.",[],"strike a chord = 마음의 현을 울리다."),
 C("온라인·SNS","B2","My feed is full of ads lately.","요즘 피드가 광고로 가득해.",[]),
 C("온라인·SNS","B2","I'm trying to curate my feed.","보는 피드를 신중하게 골라 보려고 해.",[],"curate = 큐레이터처럼 골라 담다.")
);

/* ---------- phase 3: every situation × level up to 25 chunks (6-month course) ---------- */
DECK.push(
 /* 카페·식당 */
 C("카페·식당","A1","Hot or iced?","따뜻한 거요, 아이스요?",[],"주문할 때 점원이 자주 묻는 말."),
 C("카페·식당","A1","Iced, please.","아이스로 주세요."),
 C("카페·식당","A1","A small latte, please.","라테 작은 사이즈로 주세요.",["Small latte, please."]),
 C("카페·식당","A1","Can I have a menu?","메뉴판 주실래요?",["Could I have a menu?"]),
 C("카페·식당","A1","Two coffees, please.","커피 두 잔 주세요."),
 C("카페·식당","A1","No sugar, please.","설탕은 빼 주세요."),
 C("카페·식당","A1","Can I have a straw?","빨대 하나 주실래요?",["Could I have a straw?"]),
 C("카페·식당","A1","Are you open now?","지금 영업하세요?"),
 C("카페·식당","A1","Excuse me!","저기요!",[],"직원을 부를 때. 손을 살짝 들면서."),
 C("카페·식당","A1","How much is a latte?","라테 얼마예요?"),
 C("카페·식당","A1","Do you have Wi-Fi?","와이파이 있어요?"),
 C("카페·식당","A1","I'll have this one.","이걸로 할게요.",[],"메뉴를 가리키면서."),
 C("카페·식당","A1","That's all, thanks.","그게 다예요, 감사합니다.",["That's all."]),
 C("카페·식당","A1","Can I sit here?","여기 앉아도 돼요?"),
 C("카페·식당","A1","Just water, please.","그냥 물 주세요."),
 C("카페·식당","A2","Could I get an extra shot?","샷 추가해 주실래요?",["Can I get an extra shot?"]),
 C("카페·식당","A2","Can I get that with oat milk?","귀리 우유로 해 주실래요?",["Could I get that with oat milk?"]),
 C("카페·식당","A2","What do you have for dessert?","디저트는 뭐 있어요?"),
 C("카페·식당","A2","Could we get some napkins?","냅킨 좀 주실래요?",["Can we get some napkins?"]),
 C("카페·식당","A2","Can I pay by card?","카드로 계산해도 돼요?",["Could I pay by card?"]),
 C("카페·식당","A2","Is this decaf?","이거 디카페인이에요?"),
 C("카페·식당","A2","We'd like to sit outside.","밖에 앉고 싶어요."),
 C("카페·식당","A2","What's today's special?","오늘의 추천 메뉴가 뭐예요?"),
 C("카페·식당","A2","Can I get a box for this?","이거 싸 갈 용기 주실래요?",["Could I get a box for this?"]),
 C("카페·식당","A2","Is there a password for the Wi-Fi?","와이파이 비밀번호 있어요?",["What's the Wi-Fi password?"]),
 C("카페·식당","A2","How long will it take?","얼마나 걸려요?"),
 C("카페·식당","A2","Do you have a kids' menu?","어린이 메뉴 있어요?"),
 C("카페·식당","A2","Could you warm this up?","이거 좀 데워 주실래요?",["Can you warm this up?"]),
 C("카페·식당","A2","I'm waiting for a friend.","친구 기다리는 중이에요."),
 C("카페·식당","A2","Can I get a large instead?","대신 큰 사이즈로 주실래요?",["Could I get a large instead?"]),
 C("카페·식당","B1","Could you make it a little less sweet?","조금 덜 달게 해 주실래요?",["Can you make it a little less sweet?"]),
 C("카페·식당","B1","I'm not that hungry, so I'll just have a salad.","배가 많이 안 고파서 샐러드만 먹을게요."),
 C("카페·식당","B1","Do you take reservations for tonight?","오늘 저녁 예약 받으세요?"),
 C("카페·식당","B1","We've been waiting for quite a while.","꽤 오래 기다렸는데요.",[],"불만을 부드럽게 전할 때."),
 C("카페·식당","B1","Could you tell me what's popular here?","여기서 뭐가 인기 있는지 알려 주실래요?",["What's popular here?"]),
 C("카페·식당","B1","I'd like to book a table for four at seven.","7시에 네 명 자리 예약하고 싶어요.",["I'd like to make a reservation for four at seven."]),
 C("카페·식당","B1","Is it possible to swap the fries for a salad?","감자튀김을 샐러드로 바꿀 수 있나요?",["Can I swap the fries for a salad?"]),
 C("카페·식당","B1","Sorry, I think this is someone else's order.","죄송한데 이거 다른 분 주문인 것 같아요."),
 C("카페·식당","B1","Could you bring us a couple more plates?","접시 몇 개 더 갖다주실래요?",["Can you bring us a couple more plates?"]),
 C("카페·식당","B1","Can you make it without onions?","양파 빼고 해 주실 수 있어요?",["Could you make it without onions?"]),
 C("카페·식당","B1","What would you suggest if I can't eat spicy food?","매운 걸 못 먹는데 뭘 추천하세요?"),
 C("카페·식당","B1","I think our order got lost.","저희 주문이 누락된 것 같아요."),
 C("카페·식당","B1","Could we move to a quieter table?","좀 더 조용한 자리로 옮길 수 있을까요?",["Can we move to a quieter table?"]),
 C("카페·식당","B1","The coffee here is better than I expected.","여기 커피 생각보다 맛있네요."),
 C("카페·식당","B1","Does this come with a side?","이거 사이드 메뉴도 같이 나와요?",["Does it come with a side?"]),
 C("카페·식당","B2","I'm afraid this steak is a bit overcooked.","죄송한데 스테이크가 좀 너무 익었네요.",[],"I'm afraid로 시작하면 불만이 부드러워져요."),
 C("카페·식당","B2","Would you mind if we took our time with the menu?","메뉴 천천히 봐도 괜찮을까요?"),
 C("카페·식당","B2","Let's go Dutch this time.","이번엔 각자 내자.",["Let's split it this time."],"go Dutch = 각자 계산(더치페이)."),
 C("카페·식당","B2","I'd like to treat you to dinner as a thank-you.","고마워서 저녁 한번 대접하고 싶어요."),
 C("카페·식당","B2","This place is always packed on weekends.","여긴 주말마다 사람이 꽉 차."),
 C("카페·식당","B2","The portions here are huge, so we could share.","여기 양이 많아서 나눠 먹어도 되겠다."),
 C("카페·식당","B2","I've heard great things about this place.","여기 평이 정말 좋더라고요."),
 C("카페·식당","B2","Could you hold off on the dessert for now?","디저트는 조금 이따가 주실래요?",["Can you hold off on the dessert for now?"]),
 C("카페·식당","B2","I'll pass on dessert, thanks.","디저트는 괜찮아요, 감사해요.",["I'll pass on dessert."],"pass on = 사양하다."),
 C("카페·식당","B2","It's a little too rich for me.","저한텐 좀 느끼하네요.",[],"rich = 기름지고 진한 맛."),
 C("카페·식당","B2","We're on a tight schedule, so could we get the food quickly?","일정이 빠듯해서 음식을 빨리 받을 수 있을까요?"),
 C("카페·식당","B2","Would it be possible to split the bill three ways?","계산을 세 명으로 나눌 수 있을까요?",["Could we split the bill three ways?"]),
 C("카페·식당","B2","The flavors really complement each other.","맛이 서로 정말 잘 어울리네요."),
 C("카페·식당","B2","I'm craving something sweet.","단 게 당기네."),
 C("카페·식당","B2","This is hands down the best pasta I've ever had.","이건 단연코 내가 먹어 본 최고의 파스타야.",[],"hands down = 의심할 여지 없이."),
 /* 스몰토크 */
 C("스몰토크","A1","How are you?","잘 지내요?"),
 C("스몰토크","A1","I'm fine, thanks.","잘 지내요, 고마워요.",["I'm good, thanks."]),
 C("스몰토크","A1","And you?","당신은요?",["How about you?"]),
 C("스몰토크","A1","Where do you live?","어디 살아요?"),
 C("스몰토크","A1","I live in Seoul.","서울에 살아요."),
 C("스몰토크","A1","What's up?","별일 없어?",[],"친한 사이의 인사. 답은 Not much."),
 C("스몰토크","A1","Not much.","별일 없어.",["Nothing much."]),
 C("스몰토크","A1","It's hot today.","오늘 덥다."),
 C("스몰토크","A1","Thank you so much.","정말 고마워요.",["Thanks so much."]),
 C("스몰토크","A1","You're welcome.","천만에요."),
 C("스몰토크","A1","Take care.","잘 지내.",[],"헤어질 때 하는 인사."),
 C("스몰토크","A1","Good to see you.","만나서 반가워.",["Good to see you again."],"아는 사람을 다시 만났을 때."),
 C("스몰토크","A1","Same here.","저도 그래요."),
 C("스몰토크","A1","I'm from Korea.","한국에서 왔어요.",["I come from Korea."]),
 C("스몰토크","A1","Sorry I'm late.","늦어서 미안해."),
 C("스몰토크","A2","How long have you lived here?","여기 산 지 얼마나 됐어요?"),
 C("스몰토크","A2","Are you from around here?","이 동네 분이세요?"),
 C("스몰토크","A2","I've heard a lot about you.","얘기 많이 들었어요."),
 C("스몰토크","A2","How was your trip?","여행 어땠어?"),
 C("스몰토크","A2","It's been a long week.","길고 힘든 한 주였어."),
 C("스몰토크","A2","What brings you here?","여긴 어쩐 일이에요?"),
 C("스몰토크","A2","I like your shirt.","셔츠 예쁘다.",[],"칭찬으로 대화를 여는 흔한 방법."),
 C("스몰토크","A2","Thanks for coming.","와 줘서 고마워."),
 C("스몰토크","A2","I have to go now.","이제 가야 해.",["I've got to go now."]),
 C("스몰토크","A2","Say hi to your family.","가족들한테 안부 전해 줘.",["Say hello to your family."]),
 C("스몰토크","A2","It was nice meeting you.","만나서 반가웠어요.",["It was nice to meet you."],"헤어질 때 쓰는 말."),
 C("스몰토크","A2","Are you enjoying the party?","파티 재밌어요?"),
 C("스몰토크","A2","What's new with you?","요즘 새로운 일 있어?"),
 C("스몰토크","A2","I'm doing well, thanks for asking.","잘 지내요, 물어봐 줘서 고마워요."),
 C("스몰토크","A2","Can I join you?","저도 껴도 될까요?",["Mind if I join you?"]),
 C("스몰토크","B1","How do you like living here?","여기 사는 거 어때요?"),
 C("스몰토크","B1","Have you been keeping busy?","요즘 바쁘게 지냈어?"),
 C("스몰토크","B1","Do you mind if I ask where you're from?","어디서 오셨는지 여쭤봐도 될까요?"),
 C("스몰토크","B1","Time really flies, doesn't it?","시간 정말 빠르다, 그치?"),
 C("스몰토크","B1","I was just about to call you.","막 전화하려던 참이었어."),
 C("스몰토크","B1","It's nice to finally meet you in person.","드디어 직접 뵙네요, 반가워요."),
 C("스몰토크","B1","What a coincidence!","이런 우연이!"),
 C("스몰토크","B1","How did you end up here?","어쩌다 여기 오게 됐어요?"),
 C("스몰토크","B1","I've been meaning to try that new restaurant.","그 새 식당 가 보려고 했었어."),
 C("스몰토크","B1","Let's keep in touch.","계속 연락하고 지내자.",["Let's stay in touch."]),
 C("스몰토크","B1","It looks like it's going to rain.","비 올 것 같아."),
 C("스몰토크","B1","How's your family doing?","가족들은 잘 지내?"),
 C("스몰토크","B1","I'm glad you could make it.","와 줘서 기뻐."),
 C("스몰토크","B1","We should hang out sometime.","언제 한번 같이 놀자."),
 C("스몰토크","B1","I didn't recognize you at first.","처음에 못 알아봤어."),
 C("스몰토크","B2","Speak of the devil!","호랑이도 제 말 하면 온다더니!",[],"막 얘기하던 사람이 나타났을 때."),
 C("스몰토크","B2","Let's do this again soon.","조만간 또 이렇게 만나자."),
 C("스몰토크","B2","Your face looks familiar.","낯이 익네요."),
 C("스몰토크","B2","We must have met somewhere before.","전에 어디선가 만난 적 있는 것 같아요."),
 C("스몰토크","B2","I'm not much of a talker, but I'm a good listener.","말은 별로 없지만 잘 들어 주는 편이에요."),
 C("스몰토크","B2","How have you been holding up?","요즘 어떻게 버티고 있어?",[],"힘든 일을 겪은 사람에게."),
 C("스몰토크","B2","I'd love to hear more about that.","그 얘기 더 듣고 싶어요."),
 C("스몰토크","B2","That came out wrong.","말이 잘못 나왔네."),
 C("스몰토크","B2","Don't get me wrong, I like it here.","오해하지 마, 여기 좋아."),
 C("스몰토크","B2","We're in the same boat.","우리 같은 처지네."),
 C("스몰토크","B2","I didn't mean to interrupt.","방해하려던 건 아니었어요."),
 C("스몰토크","B2","Let's break the ice with a quick game.","간단한 게임으로 어색함 좀 풀어 보자.",[],"break the ice = 어색한 분위기를 깨다."),
 C("스몰토크","B2","You must be exhausted after your flight.","비행기 타고 오느라 엄청 피곤하겠다."),
 C("스몰토크","B2","Funny you should mention that.","마침 그 얘기를 하다니 신기하네."),
 C("스몰토크","B2","I'll take your word for it.","네 말 믿을게."),
 /* 여행 */
 C("여행","A1","Where is the hotel?","호텔이 어디예요?",[]),
 C("여행","A1","A one-way ticket, please.","편도 표 주세요.",["One-way, please."]),
 C("여행","A1","A round-trip ticket, please.","왕복 표 주세요.",["Round-trip, please."]),
 C("여행","A1","Where is the exit?","출구가 어디예요?",[]),
 C("여행","A1","Is this the right train?","이 기차 맞아요?"),
 C("여행","A1","Here is my passport.","여기 제 여권이요.",[]),
 C("여행","A1","I'm a tourist.","관광객이에요."),
 C("여행","A1","Where can I get a taxi?","택시 어디서 타요?"),
 C("여행","A1","How long is the flight?","비행시간이 얼마나 돼요?"),
 C("여행","A1","Is it far from here?","여기서 멀어요?"),
 C("여행","A1","Stop here, please.","여기서 세워 주세요."),
 C("여행","A1","Can I walk there?","거기 걸어갈 수 있어요?"),
 C("여행","A1","I have one bag.","가방은 하나예요."),
 C("여행","A1","What time does it open?","몇 시에 열어요?"),
 C("여행","A1","Where is gate twelve?","12번 게이트가 어디예요?",[]),
 C("여행","A2","Is there a bus to the city center?","시내 가는 버스 있어요?"),
 C("여행","A2","How much is a ticket to the airport?","공항까지 표 얼마예요?"),
 C("여행","A2","Can I leave my bags here?","여기 가방 둬도 돼요?",["Could I leave my bags here?"]),
 C("여행","A2","Is there free Wi-Fi in the room?","방에 무료 와이파이 있어요?"),
 C("여행","A2","What time is breakfast?","조식은 몇 시예요?"),
 C("여행","A2","Could you write down the address?","주소 좀 적어 주실래요?",["Can you write down the address?"]),
 C("여행","A2","Which way is the beach?","해변은 어느 쪽이에요?"),
 C("여행","A2","Can I have an extra towel?","수건 하나 더 주실래요?",["Could I have an extra towel?"]),
 C("여행","A2","The room key doesn't work.","방 키가 안 돼요.",["My room key doesn't work."]),
 C("여행","A2","I'd like to check out, please.","체크아웃할게요."),
 C("여행","A2","Where can I exchange money?","환전은 어디서 해요?"),
 C("여행","A2","Is it safe to walk around at night?","밤에 돌아다녀도 안전해요?"),
 C("여행","A2","How long does it take to get there?","거기까지 얼마나 걸려요?"),
 C("여행","A2","Could you recommend a hotel nearby?","근처 호텔 추천해 주실래요?",["Can you recommend a hotel nearby?"]),
 C("여행","A2","I'm traveling alone.","혼자 여행 중이에요."),
 C("여행","B1","I'd like to extend my stay by one night.","하루 더 묵고 싶어요."),
 C("여행","B1","Could I switch to a quieter room?","더 조용한 방으로 바꿀 수 있을까요?",["Can I switch to a quieter room?"]),
 C("여행","B1","What's the best way to get around the city?","시내 다닐 땐 뭐가 제일 좋아요?"),
 C("여행","B1","Are there any day trips you'd recommend?","추천할 만한 당일치기 여행 있어요?"),
 C("여행","B1","I've lost my passport.","여권을 잃어버렸어요.",["I lost my passport."]),
 C("여행","B1","Do you know where I can buy a SIM card?","유심 어디서 살 수 있는지 아세요?"),
 C("여행","B1","How long is the layover?","경유 대기 시간이 얼마나 돼요?"),
 C("여행","B1","The air conditioning in my room isn't working.","방 에어컨이 안 돼요."),
 C("여행","B1","Could you tell me when we get to my stop?","제가 내릴 정류장에 오면 알려 주실래요?",["Can you tell me when we get to my stop?"]),
 C("여행","B1","I'd like a wake-up call at six.","6시에 모닝콜 부탁해요."),
 C("여행","B1","Do you have any rooms available for tonight?","오늘 밤 빈방 있어요?"),
 C("여행","B1","What are the must-see places around here?","이 근처에 꼭 가 봐야 할 곳이 어디예요?"),
 C("여행","B1","We're planning to rent a car.","차를 빌릴 계획이에요."),
 C("여행","B1","Is there a fee for canceling?","취소 수수료가 있나요?",["Is there a cancellation fee?"]),
 C("여행","B1","My bag is over the weight limit.","가방이 무게 제한을 넘었어요."),
 C("여행","B2","I'd like to report a lost wallet.","지갑 분실 신고를 하고 싶어요."),
 C("여행","B2","We're traveling on a shoestring budget.","아주 빠듯한 예산으로 여행 중이에요.",[],"shoestring = 아주 적은 돈."),
 C("여행","B2","Could you point me in the right direction?","어느 쪽으로 가면 되는지 알려 주실래요?"),
 C("여행","B2","I'm still getting my bearings.","아직 여기 지리를 익히는 중이에요."),
 C("여행","B2","Our flight got canceled, so we're stuck here overnight.","비행기가 취소돼서 여기서 하룻밤 꼼짝없이 있어야 해요."),
 C("여행","B2","Is there any chance we could get a late checkout?","혹시 체크아웃을 늦게 할 수 있을까요?"),
 C("여행","B2","The hotel looked nothing like the photos.","호텔이 사진이랑 전혀 달랐어요."),
 C("여행","B2","I'd rather avoid the tourist traps.","관광객 상대로 비싸기만 한 곳은 피하고 싶어요."),
 C("여행","B2","It was a once-in-a-lifetime experience.","평생 한 번 있을까 말까 한 경험이었어."),
 C("여행","B2","We should go early to beat the crowds.","사람 몰리기 전에 일찍 가자."),
 C("여행","B2","I'd like to be compensated for the delay.","지연에 대해 보상을 받고 싶어요."),
 C("여행","B2","Do you happen to know if the museum is open on Mondays?","혹시 박물관이 월요일에도 여는지 아세요?"),
 C("여행","B2","We ended up taking the scenic route.","결국 경치 좋은 길로 돌아서 갔어."),
 C("여행","B2","I've caught the travel bug.","여행에 푹 빠져 버렸어.",[],"travel bug = 여행병."),
 C("여행","B2","Let's travel light this time.","이번엔 짐 가볍게 다니자."),
 /* 직장·면접 */
 C("직장·면접","A1","Nice to work with you.","함께 일하게 돼서 반가워요.",["Nice working with you."]),
 C("직장·면접","A1","Where is the meeting room?","회의실이 어디예요?",[]),
 C("직장·면접","A1","Can I help you?","도와드릴까요?",["How can I help you?"]),
 C("직장·면접","A1","Thank you for waiting.","기다려 주셔서 감사합니다.",["Thanks for waiting."]),
 C("직장·면접","A1","I'm on a break.","쉬는 시간이에요."),
 C("직장·면접","A1","What time is the meeting?","회의 몇 시예요?"),
 C("직장·면접","A1","I'll be right back.","금방 올게요."),
 C("직장·면접","A1","Have a good weekend.","주말 잘 보내세요.",["Have a nice weekend."]),
 C("직장·면접","A1","I'm done.","다 했어요.",["I'm finished."]),
 C("직장·면접","A1","Is this okay?","이거 괜찮아요?"),
 C("직장·면접","A1","Let's get started.","시작합시다.",["Let's start."]),
 C("직장·면접","A1","I'm a designer.","저는 디자이너예요."),
 C("직장·면접","A1","My desk is over there.","제 자리는 저쪽이에요."),
 C("직장·면접","A1","See you on Monday.","월요일에 봐요."),
 C("직장·면접","A1","It's lunchtime.","점심시간이에요."),
 C("직장·면접","A2","Can I take a day off next week?","다음 주에 하루 쉬어도 될까요?",["Could I take a day off next week?"]),
 C("직장·면접","A2","I'll send you an email.","이메일 보내 드릴게요."),
 C("직장·면접","A2","Could you sign this, please?","여기 서명해 주시겠어요?",["Can you sign this, please?"]),
 C("직장·면접","A2","The printer isn't working.","프린터가 안 돼요."),
 C("직장·면접","A2","I'm on vacation next week.","다음 주에 휴가예요."),
 C("직장·면접","A2","Let's have lunch together.","같이 점심 먹어요."),
 C("직장·면접","A2","I finished the report.","보고서 다 끝냈어요."),
 C("직장·면접","A2","How long have you worked here?","여기서 일한 지 얼마나 됐어요?"),
 C("직장·면접","A2","What time do you finish work?","몇 시에 퇴근해요?"),
 C("직장·면접","A2","I have to work late tonight.","오늘 야근해야 해요."),
 C("직장·면접","A2","Could you print this for me?","이거 좀 출력해 줄래요?",["Can you print this for me?"]),
 C("직장·면접","A2","Thanks for the update.","알려 줘서 고마워요."),
 C("직장·면접","A2","I applied for the job online.","온라인으로 그 일자리에 지원했어요."),
 C("직장·면접","A2","Here's my business card.","제 명함이에요.",[]),
 C("직장·면접","A2","I'm not available on Tuesday.","화요일엔 시간이 안 돼요."),
 C("직장·면접","B1","Tell me a little about yourself.","자기소개 좀 해 주세요.",[],"면접 첫 질문으로 자주 나와요."),
 C("직장·면접","B1","I have three years of experience in marketing.","마케팅 경력이 3년 있어요."),
 C("직장·면접","B1","I'm looking for new challenges.","새로운 도전을 찾고 있어요."),
 C("직장·면접","B1","Why do you want to work here?","왜 여기서 일하고 싶으세요?"),
 C("직장·면접","B1","I work well under pressure.","압박감 속에서도 일을 잘해요."),
 C("직장·면접","B1","Could you send me the agenda before the meeting?","회의 전에 안건 좀 보내 주실래요?",["Can you send me the agenda before the meeting?"]),
 C("직장·면접","B1","Let's wrap up the meeting.","회의 마무리합시다."),
 C("직장·면접","B1","I'll keep you in the loop.","진행 상황 계속 공유할게요."),
 C("직장·면접","B1","Sorry for the late reply.","답장이 늦어서 죄송해요."),
 C("직장·면접","B1","I'll follow up with an email.","이메일로 다시 정리해서 보낼게요."),
 C("직장·면접","B1","What are the next steps?","다음 단계는 뭐예요?"),
 C("직장·면접","B1","Could we go over the numbers again?","숫자를 다시 한번 검토할 수 있을까요?",["Can we go over the numbers again?"]),
 C("직장·면접","B1","I'm calling in sick today.","오늘 아파서 결근할게요.",[],"call in sick = 아파서 못 나간다고 연락하다."),
 C("직장·면접","B1","When would you be able to start?","언제부터 출근할 수 있으세요?"),
 C("직장·면접","B1","Thank you for having me.","불러 주셔서 감사합니다.",[],"면접이나 초대 자리에서 쓰는 인사."),
 C("직장·면접","B2","I'd like to negotiate my salary.","연봉을 협상하고 싶어요."),
 C("직장·면접","B2","Can we table this discussion for now?","이 논의는 일단 보류할까요?",[],"미국에선 '보류', 영국에선 '안건으로 올리다'라는 반대 뜻."),
 C("직장·면접","B2","I'll need to run it by my manager.","매니저한테 먼저 확인받아야 해요."),
 C("직장·면접","B2","We're on track to meet the deadline.","마감 맞추는 데 문제없이 진행되고 있어요."),
 C("직장·면접","B2","Let's touch on the budget before we finish.","끝내기 전에 예산 얘기도 잠깐 하죠."),
 C("직장·면접","B2","My biggest weakness is that I can be a perfectionist.","제 가장 큰 약점은 완벽주의 성향이 있다는 거예요."),
 C("직장·면접","B2","I'm open to relocating for the right opportunity.","좋은 기회라면 다른 지역 근무도 괜찮아요."),
 C("직장·면접","B2","Let's not lose sight of the big picture.","큰 그림을 놓치지 말자."),
 C("직장·면접","B2","I think we're getting sidetracked.","얘기가 딴 데로 새는 것 같아요."),
 C("직장·면접","B2","Could you give me a ballpark figure?","대략적인 수치라도 알려 주실래요?",["Can you give me a ballpark figure?"],"ballpark = 대략의."),
 C("직장·면접","B2","That's a bit of a stretch.","그건 좀 무리예요."),
 C("직장·면접","B2","I'd appreciate it if you could prioritize this.","이걸 먼저 처리해 주시면 감사하겠어요."),
 C("직장·면접","B2","We need to think outside the box.","틀에 박히지 않게 생각해야 해요."),
 C("직장·면접","B2","I'll have to respectfully disagree.","정중하게 반대 의견을 말씀드려야겠어요."),
 C("직장·면접","B2","Can you give me a heads-up next time?","다음엔 미리 귀띔해 줄래요?",["Could you give me a heads-up next time?"]),
 /* 감정·의견 */
 C("감정·의견","A1","I'm so excited!","너무 신나!"),
 C("감정·의견","A1","I'm scared.","무서워."),
 C("감정·의견","A1","I'm bored.","심심해."),
 C("감정·의견","A1","I'm sorry.","미안해."),
 C("감정·의견","A1","That's cool!","멋지다!"),
 C("감정·의견","A1","I'm angry.","화났어."),
 C("감정·의견","A1","I like it.","마음에 들어."),
 C("감정·의견","A1","Me neither.","나도 아니야.",[],"부정문에 맞장구칠 때. 긍정문엔 Me too."),
 C("감정·의견","A1","Don't worry.","걱정 마."),
 C("감정·의견","A1","I'm okay.","난 괜찮아.",["I'm fine."]),
 C("감정·의견","A1","That's terrible.","끔찍하다."),
 C("감정·의견","A1","Good idea!","좋은 생각이야!",["That's a good idea!"]),
 C("감정·의견","A1","I'm nervous.","긴장돼."),
 C("감정·의견","A1","That's not fair!","불공평해!"),
 C("감정·의견","A1","I don't know.","모르겠어."),
 C("감정·의견","A2","I feel much better now.","이제 훨씬 나아졌어."),
 C("감정·의견","A2","I'm really proud of you.","네가 정말 자랑스러워."),
 C("감정·의견","A2","I think so too.","나도 그렇게 생각해."),
 C("감정·의견","A2","I don't think so.","난 그렇게 생각 안 해."),
 C("감정·의견","A2","It's not your fault.","네 잘못 아니야."),
 C("감정·의견","A2","I'm in a bad mood today.","오늘 기분이 안 좋아."),
 C("감정·의견","A2","That's so kind of you.","정말 친절하시네요."),
 C("감정·의견","A2","I was so surprised.","정말 놀랐어."),
 C("감정·의견","A2","I can't wait!","너무 기대돼!"),
 C("감정·의견","A2","What's wrong?","무슨 일 있어?"),
 C("감정·의견","A2","I'm a little stressed out.","좀 스트레스받아."),
 C("감정·의견","A2","I'm sorry to hear that.","그런 일이 있었다니 안타깝다.",[],"안 좋은 소식을 들었을 때."),
 C("감정·의견","A2","That's amazing news!","정말 좋은 소식이다!"),
 C("감정·의견","A2","I miss you.","보고 싶어."),
 C("감정·의견","A2","I didn't mean it.","그럴 뜻은 아니었어."),
 C("감정·의견","B1","In my opinion, it's too expensive.","내 생각엔 너무 비싸."),
 C("감정·의견","B1","I'm not sure I agree with that.","그 말엔 동의하기 좀 어려워."),
 C("감정·의견","B1","It depends on the situation.","상황에 따라 달라."),
 C("감정·의견","B1","I'm fed up with this weather.","이 날씨 정말 지긋지긋해."),
 C("감정·의견","B1","That's exactly what I was thinking.","내가 생각하던 게 딱 그거야."),
 C("감정·의견","B1","I feel like nobody listens to me.","아무도 내 말을 안 듣는 것 같아."),
 C("감정·의견","B1","I'm relieved to hear that.","그 말 들으니 안심이다."),
 C("감정·의견","B1","I have a feeling it's going to work out.","잘될 것 같은 느낌이 들어."),
 C("감정·의견","B1","You have a point.","네 말도 일리가 있어."),
 C("감정·의견","B1","I'm a bit annoyed, to be honest.","솔직히 좀 짜증 나."),
 C("감정·의견","B1","It's hard to say.","뭐라고 말하기 어렵네."),
 C("감정·의견","B1","I'm so grateful for your help.","도와줘서 정말 고마워."),
 C("감정·의견","B1","That really cheered me up.","그 덕분에 기운이 났어."),
 C("감정·의견","B1","I'm starting to get used to it.","이제 좀 익숙해지고 있어."),
 C("감정·의견","B1","Personally, I prefer the first one.","개인적으론 첫 번째가 더 좋아."),
 C("감정·의견","B2","I'm at my wit's end.","이제 어떻게 해야 할지 모르겠어.",[],"더는 방법이 없을 만큼 지쳤을 때."),
 C("감정·의견","B2","It's a double-edged sword.","양날의 검이야."),
 C("감정·의견","B2","I can see both sides of the argument.","양쪽 주장이 다 이해돼."),
 C("감정·의견","B2","I have to say, I was pleasantly surprised.","솔직히 기대 이상이라 놀랐어."),
 C("감정·의견","B2","It's been weighing on my mind.","그게 계속 마음에 걸려."),
 C("감정·의견","B2","I'm not going to sugarcoat it.","돌려 말하지 않을게."),
 C("감정·의견","B2","To be fair, he did apologize.","공정하게 말하면, 걔가 사과는 했어."),
 C("감정·의견","B2","That's beside the point.","그건 요점이 아니야."),
 C("감정·의견","B2","I'm having second thoughts.","다시 생각해 보게 되네.",[],"결정을 망설이게 될 때."),
 C("감정·의견","B2","It took me by surprise.","정말 뜻밖이었어."),
 C("감정·의견","B2","I couldn't care less.","전혀 관심 없어."),
 C("감정·의견","B2","I'm still trying to wrap my head around it.","아직도 그게 잘 이해가 안 돼."),
 C("감정·의견","B2","It's not the end of the world.","세상 끝난 거 아니야."),
 C("감정·의견","B2","I was on cloud nine.","날아갈 듯 기뻤어."),
 C("감정·의견","B2","With all due respect, I disagree.","외람되지만, 동의하지 않습니다."),
 /* 쇼핑 */
 C("쇼핑","A1","Can I see that one?","저거 좀 볼 수 있어요?",["Could I see that one?"]),
 C("쇼핑","A1","It's too small.","너무 작아요."),
 C("쇼핑","A1","It's too expensive.","너무 비싸요."),
 C("쇼핑","A1","I like this color.","이 색 마음에 들어요."),
 C("쇼핑","A1","Where are the shoes?","신발은 어디 있어요?"),
 C("쇼핑","A1","Do you have a smaller one?","더 작은 거 있어요?"),
 C("쇼핑","A1","Can I have a receipt?","영수증 주실래요?",["Could I have a receipt?"]),
 C("쇼핑","A1","How much are these?","이건 얼마예요?",[],"여러 개나 바지·신발처럼 짝인 물건엔 these."),
 C("쇼핑","A1","What size is this?","이거 무슨 사이즈예요?"),
 C("쇼핑","A1","It looks good on you.","잘 어울려요."),
 C("쇼핑","A1","Is this a gift?","선물하실 거예요?",[],"계산할 때 점원이 묻는 말."),
 C("쇼핑","A1","One more, please.","하나 더 주세요."),
 C("쇼핑","A1","Not today, thanks.","오늘은 괜찮아요, 고마워요."),
 C("쇼핑","A1","When do you close?","몇 시에 문 닫아요?",["What time do you close?"]),
 C("쇼핑","A1","Do you sell batteries?","건전지 팔아요?"),
 C("쇼핑","A2","Can I try these shoes on?","이 신발 신어 봐도 돼요?",["Could I try these shoes on?"]),
 C("쇼핑","A2","I'm looking for a gift for my mom.","엄마 선물을 찾고 있어요."),
 C("쇼핑","A2","Does this come in other colors?","이거 다른 색도 나와요?"),
 C("쇼핑","A2","It's a bit too tight.","좀 꽉 껴요."),
 C("쇼핑","A2","Can I use this coupon?","이 쿠폰 쓸 수 있어요?"),
 C("쇼핑","A2","I'll think about it.","생각해 볼게요.",[],"정중하게 안 사겠다고 할 때도 써요."),
 C("쇼핑","A2","Do you have anything cheaper?","더 싼 거 있어요?"),
 C("쇼핑","A2","What is this made of?","이거 소재가 뭐예요?"),
 C("쇼핑","A2","Where can I find the milk?","우유는 어디 있어요?"),
 C("쇼핑","A2","I need a size medium.","미디엄 사이즈 주세요."),
 C("쇼핑","A2","Can you deliver it?","배달돼요?"),
 C("쇼핑","A2","The line is so long.","줄이 너무 길다."),
 C("쇼핑","A2","I paid too much for this.","이거 너무 비싸게 샀어."),
 C("쇼핑","A2","How long is the sale?","세일은 언제까지예요?"),
 C("쇼핑","A2","It's not my style.","내 스타일이 아니야."),
 C("쇼핑","B1","Could I pay in installments?","할부로 결제할 수 있을까요?",["Can I pay in installments?"]),
 C("쇼핑","B1","I think I was overcharged.","돈이 더 결제된 것 같아요."),
 C("쇼핑","B1","The zipper is broken.","지퍼가 고장 났어요."),
 C("쇼핑","B1","Can I get a refund if it doesn't fit?","안 맞으면 환불받을 수 있어요?"),
 C("쇼핑","B1","Is it machine washable?","세탁기에 빨아도 돼요?"),
 C("쇼핑","B1","I'm looking for something more casual.","좀 더 편한 스타일을 찾고 있어요."),
 C("쇼핑","B1","Could you check if you have it in the back?","창고에 있는지 확인해 주실래요?",["Can you check if you have it in the back?"]),
 C("쇼핑","B1","This doesn't go with my shoes.","이건 내 신발이랑 안 어울려."),
 C("쇼핑","B1","I ordered it online, but it hasn't arrived.","온라인으로 주문했는데 아직 안 왔어요."),
 C("쇼핑","B1","How long does shipping take?","배송은 얼마나 걸려요?"),
 C("쇼핑","B1","Can I get this tailored?","이거 수선할 수 있어요?"),
 C("쇼핑","B1","These are on clearance.","이건 재고 정리 상품이에요."),
 C("쇼핑","B1","I'm just going to compare prices first.","일단 가격 비교부터 해 볼게요."),
 C("쇼핑","B1","Could you recommend something for sensitive skin?","민감성 피부에 좋은 거 추천해 주실래요?",["Can you recommend something for sensitive skin?"]),
 C("쇼핑","B1","Does this come with free shipping?","이거 무료 배송이에요?"),
 C("쇼핑","B2","That's a total rip-off.","완전 바가지네."),
 C("쇼핑","B2","I'm on a tight budget this month.","이번 달은 예산이 빠듯해."),
 C("쇼핑","B2","It's a bit pricey, but the quality is worth it.","좀 비싸지만 품질을 생각하면 그만한 가치가 있어."),
 C("쇼핑","B2","Would you be able to throw in a free case?","케이스 하나 덤으로 주실 수 있을까요?",[],"throw in = 덤으로 얹어 주다."),
 C("쇼핑","B2","I've been eyeing this bag for weeks.","몇 주째 이 가방을 눈여겨보고 있었어."),
 C("쇼핑","B2","I'd like to cancel my order before it ships.","발송 전에 주문을 취소하고 싶어요."),
 C("쇼핑","B2","The quality isn't what I expected for the price.","이 가격에 기대한 품질이 아니네요."),
 C("쇼핑","B2","I tend to shop around before buying anything big.","큰 걸 살 땐 여기저기 비교해 보는 편이야."),
 C("쇼핑","B2","I got it for a steal.","거의 공짜나 다름없게 샀어.",[],"a steal = 훔친 것처럼 싼 물건."),
 C("쇼핑","B2","It sold out in minutes.","몇 분 만에 품절됐어."),
 C("쇼핑","B2","I'm trying to cut down on impulse shopping.","충동구매를 줄이려고 해."),
 C("쇼핑","B2","This brand is overrated, if you ask me.","내가 보기엔 이 브랜드는 과대평가됐어."),
 C("쇼핑","B2","I'll have to think it over before I commit.","결정하기 전에 곰곰이 생각해 봐야겠어요."),
 C("쇼핑","B2","Could you waive the delivery fee?","배송비를 빼 주실 수 있을까요?",["Can you waive the delivery fee?"]),
 C("쇼핑","B2","I returned it because it was defective.","불량이라서 반품했어."),
 /* 전화·약속 */
 C("전화·약속","A1","Hello?","여보세요?"),
 C("전화·약속","A1","Who is this?","누구세요?",[],"전화로 상대를 확인할 때. 더 정중하게는 May I ask who's calling?"),
 C("전화·약속","A1","Is your mom home?","엄마 집에 계셔?"),
 C("전화·약속","A1","Bye for now.","그럼 이만 끊을게."),
 C("전화·약속","A1","Talk to you later.","나중에 얘기해."),
 C("전화·약속","A1","Where are you?","어디야?"),
 C("전화·약속","A1","I'm here.","나 도착했어."),
 C("전화·약속","A1","Wait a minute.","잠깐만.",["Wait a second."]),
 C("전화·약속","A1","What time?","몇 시에?"),
 C("전화·약속","A1","Tomorrow is fine.","내일 괜찮아."),
 C("전화·약속","A1","See you there.","거기서 봐."),
 C("전화·약속","A1","Text me.","문자해."),
 C("전화·약속","A1","I'm at the station.","나 역에 있어."),
 C("전화·약속","A1","I can't hear you.","잘 안 들려."),
 C("전화·약속","A1","Let's meet tomorrow.","내일 만나자."),
 C("전화·약속","A2","May I ask who's calling?","누구신지 여쭤봐도 될까요?",["Can I ask who's calling?"]),
 C("전화·약속","A2","She's not here right now.","지금 자리에 안 계세요."),
 C("전화·약속","A2","Can you call me back later?","이따 다시 전화해 줄래?",["Could you call me back later?"]),
 C("전화·약속","A2","Let me give you my number.","내 번호 알려 줄게."),
 C("전화·약속","A2","How about Saturday afternoon?","토요일 오후는 어때?"),
 C("전화·약속","A2","Where should we meet?","어디서 만날까?"),
 C("전화·약속","A2","I'm stuck in traffic.","차가 막혀서 꼼짝 못 하고 있어."),
 C("전화·약속","A2","Sorry, I have plans that day.","미안, 그날은 약속이 있어."),
 C("전화·약속","A2","Is Friday okay with you?","금요일 괜찮아?",["Does Friday work for you?"]),
 C("전화·약속","A2","I'll wait for you inside.","안에서 기다릴게."),
 C("전화·약속","A2","Can you hear me better now?","이제 좀 잘 들려?"),
 C("전화·약속","A2","Let's meet halfway.","중간에서 만나자."),
 C("전화·약속","A2","I'm almost there.","거의 다 왔어."),
 C("전화·약속","A2","Don't forget about tomorrow.","내일 약속 잊지 마."),
 C("전화·약속","A2","What's a good time to call?","언제 전화하면 좋아?"),
 C("전화·약속","B1","I'd like to confirm my appointment for tomorrow.","내일 예약을 확인하고 싶어요."),
 C("전화·약속","B1","Could you let her know I called?","제가 전화했다고 전해 주실래요?",["Can you let her know I called?"]),
 C("전화·약속","B1","The line is busy.","통화 중이에요."),
 C("전화·약속","B1","I think we got cut off.","전화가 끊겼었나 봐."),
 C("전화·약속","B1","Can we push it back an hour?","한 시간 미룰 수 있을까?",["Could we push it back an hour?"]),
 C("전화·약속","B1","Sorry, I have to cancel at the last minute.","미안, 막판에 취소해야 할 것 같아."),
 C("전화·약속","B1","Let me know if anything changes.","바뀌는 거 있으면 알려 줘."),
 C("전화·약속","B1","I'm free any time after five.","5시 이후엔 언제든 괜찮아."),
 C("전화·약속","B1","Could you spell your last name for me?","성 철자 좀 불러 주실래요?",["Can you spell your last name for me?"]),
 C("전화·약속","B1","The reception here is terrible.","여기 신호가 너무 안 좋아."),
 C("전화·약속","B1","I'll be there unless something comes up.","별일 없으면 갈게."),
 C("전화·약속","B1","Can I call you back in five minutes?","5분 뒤에 다시 전화해도 될까?",["Could I call you back in five minutes?"]),
 C("전화·약속","B1","Are we still on for tonight?","오늘 밤 약속 그대로지?"),
 C("전화·약속","B1","Let's meet at the usual place.","늘 만나던 데서 보자."),
 C("전화·약속","B1","I'm returning your call.","전화 주셨다고 해서 연락드렸어요."),
 C("전화·약속","B2","Sorry, can I take a rain check?","미안, 다음으로 미뤄도 될까?",[],"rain check = 다음 기회로 미루기."),
 C("전화·약속","B2","I'll have to double-check my calendar.","일정 다시 확인해 봐야겠어."),
 C("전화·약속","B2","Let's set a tentative date and confirm later.","날짜를 잠정적으로 정하고 나중에 확정하자."),
 C("전화·약속","B2","I hate to cut you off, but I have to go.","말 끊어서 미안한데 이제 가 봐야 해."),
 C("전화·약속","B2","Thanks for squeezing me in.","바쁜데 시간 내 줘서 고마워."),
 C("전화·약속","B2","Would it be possible to move our call to the morning?","통화를 오전으로 옮길 수 있을까요?"),
 C("전화·약속","B2","I've been trying to get hold of you all day.","하루 종일 너랑 연락하려고 했어."),
 C("전화·약속","B2","Let's not leave it to the last minute.","막판까지 미루지 말자."),
 C("전화·약속","B2","Something urgent came up at work.","회사에 급한 일이 생겼어."),
 C("전화·약속","B2","Can I put you on hold for a moment?","잠시 기다려 주시겠어요?",["Could I put you on hold for a moment?"],"전화를 대기 상태로 돌릴 때."),
 C("전화·약속","B2","I'll drop you a line when I'm back.","돌아오면 연락할게."),
 C("전화·약속","B2","I'm running behind, so let's push it to four.","좀 늦어지고 있으니까 4시로 미루자."),
 C("전화·약속","B2","Sorry for the short notice.","갑자기 알려서 미안해."),
 C("전화·약속","B2","Let's pick this up tomorrow.","이건 내일 이어서 얘기하자."),
 C("전화·약속","B2","I must have dialed the wrong number.","번호를 잘못 눌렀나 봐요."),
 /* 병원·약국 */
 C("병원·약국","A1","I have a cold.","감기에 걸렸어요."),
 C("병원·약국","A1","I have a toothache.","이가 아파요."),
 C("병원·약국","A1","My eyes hurt.","눈이 아파요."),
 C("병원·약국","A1","I'm sick.","아파요."),
 C("병원·약국","A1","I cut my finger.","손가락을 베였어요."),
 C("병원·약국","A1","It hurts here.","여기가 아파요."),
 C("병원·약국","A1","I need a bandage.","밴드가 필요해요."),
 C("병원·약국","A1","Is it serious?","심각한 거예요?"),
 C("병원·약국","A1","Where is the hospital?","병원이 어디예요?",[]),
 C("병원·약국","A1","I have a runny nose.","콧물이 나요."),
 C("병원·약국","A1","Help me, please!","도와주세요!",["Please help me!"]),
 C("병원·약국","A1","I threw up.","토했어요."),
 C("병원·약국","A1","My leg hurts.","다리가 아파요."),
 C("병원·약국","A1","I'm better now.","이제 나아졌어요.",["I feel better now."]),
 C("병원·약국","A1","I have a cough.","기침이 나요."),
 C("병원·약국","A2","I'd like to see a dentist.","치과 진료를 받고 싶어요."),
 C("병원·약국","A2","How many should I take?","몇 알 먹어야 해요?"),
 C("병원·약국","A2","I have a stuffy nose.","코가 막혔어요."),
 C("병원·약국","A2","Do I need to take this with food?","이거 밥이랑 같이 먹어야 해요?"),
 C("병원·약국","A2","It started yesterday.","어제부터 그랬어요."),
 C("병원·약국","A2","I hurt my knee playing soccer.","축구하다가 무릎을 다쳤어요."),
 C("병원·약국","A2","Can I get something for a headache?","두통약 있을까요?",["Do you have something for a headache?"]),
 C("병원·약국","A2","I've had a fever since last night.","어젯밤부터 열이 나요."),
 C("병원·약국","A2","Is there a hospital near here?","근처에 병원 있어요?"),
 C("병원·약국","A2","I need to rest for a few days.","며칠 쉬어야 해요."),
 C("병원·약국","A2","I have an appointment at three.","3시에 예약했어요."),
 C("병원·약국","A2","My skin is itchy.","피부가 가려워요."),
 C("병원·약국","A2","It hurts a lot.","많이 아파요."),
 C("병원·약국","A2","Should I stay home today?","오늘 집에 있어야 할까요?"),
 C("병원·약국","A2","I feel a little better today.","오늘은 좀 나아요."),
 C("병원·약국","B1","I've been feeling tired all the time.","계속 피곤해요."),
 C("병원·약국","B1","I think I'm coming down with something.","뭔가 걸리려나 봐요.",[],"몸살 기운이 있을 때."),
 C("병원·약국","B1","The medicine makes me drowsy.","약을 먹으면 졸려요."),
 C("병원·약국","B1","Do I need to fill out a form?","서류를 작성해야 하나요?"),
 C("병원·약국","B1","I'm on medication for my blood pressure.","혈압약을 먹고 있어요."),
 C("병원·약국","B1","How long should I wait before taking another one?","한 알 더 먹으려면 얼마나 기다려야 해요?"),
 C("병원·약국","B1","It's been getting worse since this morning.","아침부터 점점 심해지고 있어요."),
 C("병원·약국","B1","I can't move my arm very well.","팔을 잘 못 움직이겠어요."),
 C("병원·약국","B1","Is it okay to drink alcohol with this?","이거 먹으면서 술 마셔도 돼요?"),
 C("병원·약국","B1","I need to refill my prescription.","처방약을 다시 받아야 해요."),
 C("병원·약국","B1","I've had trouble breathing at night.","밤에 숨쉬기가 힘들어요."),
 C("병원·약국","B1","Can I get a doctor's note for work?","회사에 낼 진단서 받을 수 있어요?",["Could I get a doctor's note for work?"]),
 C("병원·약국","B1","My nose won't stop bleeding.","코피가 안 멈춰요."),
 C("병원·약국","B1","Do you have this in a lower dose?","이거 더 낮은 용량으로 있어요?"),
 C("병원·약국","B1","I'd like to get a flu shot.","독감 주사 맞고 싶어요."),
 C("병원·약국","B2","I haven't been sleeping well, and it's affecting my work.","요즘 잠을 잘 못 자서 일에 지장이 있어요."),
 C("병원·약국","B2","The pain is sharp rather than dull.","묵직한 게 아니라 찌르는 듯이 아파요."),
 C("병원·약국","B2","It's a recurring problem.","자꾸 재발하는 문제예요."),
 C("병원·약국","B2","I'd like to know what my treatment options are.","어떤 치료 방법이 있는지 알고 싶어요."),
 C("병원·약국","B2","I'm a bit squeamish about needles.","주삿바늘을 좀 무서워해요."),
 C("병원·약국","B2","I think I pulled a muscle at the gym.","헬스장에서 근육을 다친 것 같아요."),
 C("병원·약국","B2","I've been on antibiotics for a week.","일주일째 항생제를 먹고 있어요."),
 C("병원·약국","B2","Could you explain the test results in simple terms?","검사 결과를 쉽게 설명해 주실래요?",["Can you explain the test results in simple terms?"]),
 C("병원·약국","B2","I'm feeling a bit off today.","오늘 컨디션이 좀 이상해요."),
 C("병원·약국","B2","The swelling has gone down a lot.","붓기가 많이 빠졌어요."),
 C("병원·약국","B2","I'd rather avoid surgery if possible.","가능하면 수술은 피하고 싶어요."),
 C("병원·약국","B2","It's probably just a bug that's going around.","아마 요즘 도는 감기 같은 걸 거예요.",[],"bug = (구어) 가벼운 전염병."),
 C("병원·약국","B2","I'll be back on my feet in no time.","금방 털고 일어날 거야."),
 C("병원·약국","B2","Are there any lifestyle changes I should make?","생활 습관에서 바꿔야 할 게 있을까요?"),
 C("병원·약국","B2","The rash has spread to my arms.","발진이 팔까지 번졌어요."),
 /* 집·생활 */
 C("집·생활","A1","Wake up!","일어나!"),
 C("집·생활","A1","Breakfast is ready.","아침 다 됐어."),
 C("집·생활","A1","Turn off the light.","불 꺼 줘.",["Turn off the lights."]),
 C("집·생활","A1","Where is the remote?","리모컨 어디 있어?",[]),
 C("집·생활","A1","Let's eat!","먹자!"),
 C("집·생활","A1","The door is open.","문이 열려 있어."),
 C("집·생활","A1","Take off your shoes.","신발 벗어."),
 C("집·생활","A1","I need a shower.","샤워해야겠다."),
 C("집·생활","A1","Clean your room.","방 치워."),
 C("집·생활","A1","It's time for bed.","잘 시간이야."),
 C("집·생활","A1","Is anyone home?","집에 누구 있어?"),
 C("집·생활","A1","The TV is too loud.","TV 소리가 너무 커."),
 C("집·생활","A1","I'm cooking dinner.","저녁 하는 중이야."),
 C("집·생활","A1","Can you open the window?","창문 좀 열어 줄래?",["Could you open the window?"]),
 C("집·생활","A1","See you tonight.","저녁에 봐."),
 C("집·생활","A2","Could you take out the recycling?","분리수거 좀 내놔 줄래?",["Can you take out the recycling?"]),
 C("집·생활","A2","The fridge is almost empty.","냉장고가 거의 비었어."),
 C("집·생활","A2","Who left the lights on?","누가 불 켜 놨어?"),
 C("집·생활","A2","I'll vacuum the living room.","거실은 내가 청소기 돌릴게."),
 C("집·생활","A2","Can you set the table?","상 좀 차려 줄래?",["Could you set the table?"]),
 C("집·생활","A2","The toilet is clogged.","변기가 막혔어."),
 C("집·생활","A2","I need to buy groceries.","장 봐야 해."),
 C("집·생활","A2","Let's order takeout tonight.","오늘 밤엔 음식 시켜 먹자."),
 C("집·생활","A2","Did you lock the door?","문 잠갔어?"),
 C("집·생활","A2","My room is a mess.","내 방 엉망이야."),
 C("집·생활","A2","The dishwasher is full.","식기세척기 꽉 찼어."),
 C("집·생활","A2","Could you feed the cat?","고양이 밥 좀 줄래?",["Can you feed the cat?"]),
 C("집·생활","A2","There's no hot water.","온수가 안 나와.",["There isn't any hot water."]),
 C("집·생활","A2","I'm going to take a nap.","낮잠 좀 잘게."),
 C("집·생활","A2","We're out of eggs.","계란이 다 떨어졌어."),
 C("집·생활","B1","Could you fix the faucet when you have time?","시간 될 때 수도꼭지 좀 고쳐 줄래?",["Can you fix the faucet when you have time?"]),
 C("집·생활","B1","The smoke alarm keeps going off.","화재경보기가 계속 울려."),
 C("집·생활","B1","I'm going to rearrange the furniture.","가구 배치 좀 바꿀 거야."),
 C("집·생활","B1","The mold in the bathroom is getting worse.","화장실 곰팡이가 점점 심해져."),
 C("집·생활","B1","Is it okay if my friend stays over tonight?","오늘 친구가 자고 가도 돼?"),
 C("집·생활","B1","The electricity bill was really high this month.","이번 달 전기 요금이 정말 많이 나왔어."),
 C("집·생활","B1","I'd like to report a problem with my apartment.","집에 문제가 있어서 알려 드리려고요."),
 C("집·생활","B1","Could you let the plumber in tomorrow?","내일 배관공 좀 들여보내 줄래?",["Can you let the plumber in tomorrow?"]),
 C("집·생활","B1","We should get the carpets cleaned.","카펫 청소 맡겨야겠어."),
 C("집·생활","B1","The new neighbors seem really nice.","새 이웃들 정말 좋아 보여."),
 C("집·생활","B1","My roommate never cleans up after himself.","룸메이트가 자기가 어지른 걸 절대 안 치워."),
 C("집·생활","B1","I'm looking for a place closer to work.","회사랑 더 가까운 집을 찾고 있어."),
 C("집·생활","B1","The water will be shut off on Monday.","월요일에 단수된대."),
 C("집·생활","B1","We need to get a spare key made.","여분 열쇠를 하나 만들어야 해."),
 C("집·생활","B1","Could you turn up the heat a little?","난방 좀 올려 줄래?",["Can you turn up the heat a little?"]),
 C("집·생활","B2","The landlord keeps dragging his feet on the repairs.","집주인이 수리를 자꾸 미루고 있어.",[],"drag one's feet = 일부러 질질 끌다."),
 C("집·생활","B2","Are pets allowed under the lease?","임대 계약상 반려동물 키워도 되나요?"),
 C("집·생활","B2","We need to set some ground rules for the apartment.","집에서 지킬 기본 규칙을 정해야 해."),
 C("집·생활","B2","I'd rather pay a bit more for a quieter neighborhood.","좀 더 내더라도 조용한 동네가 좋아."),
 C("집·생활","B2","The walls are paper-thin.","벽이 종잇장처럼 얇아."),
 C("집·생활","B2","I'm sick and tired of doing all the chores myself.","집안일을 나 혼자 다 하는 거 이제 지긋지긋해."),
 C("집·생활","B2","Dealing with the moving company has been a nightmare.","이삿짐 업체 상대하느라 악몽 같았어."),
 C("집·생활","B2","Let me know before you have people over.","사람 부르기 전에 미리 말해 줘."),
 C("집·생활","B2","We've finally settled into the new place.","드디어 새집에 자리 잡았어."),
 C("집·생활","B2","The repairs should be covered by the landlord, not us.","수리비는 우리가 아니라 집주인이 내야 해."),
 C("집·생활","B2","Our lease is up at the end of the month.","이달 말에 임대 계약이 끝나."),
 C("집·생활","B2","I'm trying to cut down on our energy bills.","에너지 요금을 좀 줄여 보려고 해."),
 C("집·생활","B2","It's a fixer-upper, but it has potential.","손볼 데가 많은 집이지만 가능성은 있어."),
 C("집·생활","B2","Let's take turns cooking during the week.","주중엔 돌아가면서 요리하자."),
 C("집·생활","B2","The house could use a fresh coat of paint.","집에 페인트칠을 새로 하면 좋겠다."),
 /* 학교·공부 */
 C("학교·공부","A1","May I go to the restroom?","화장실 다녀와도 돼요?",["Can I go to the restroom?"]),
 C("학교·공부","A1","Sorry, I forgot.","죄송해요, 깜빡했어요."),
 C("학교·공부","A1","I finished my homework.","숙제 다 했어요."),
 C("학교·공부","A1","What time is class?","수업 몇 시예요?"),
 C("학교·공부","A1","I don't know the answer.","답을 모르겠어요."),
 C("학교·공부","A1","Can you help me with this?","이것 좀 도와줄래요?",["Could you help me with this?"]),
 C("학교·공부","A1","Where is the library?","도서관이 어디예요?",[]),
 C("학교·공부","A1","I like English.","영어 좋아해요."),
 C("학교·공부","A1","Can I go home now?","이제 집에 가도 돼요?"),
 C("학교·공부","A1","I need a pencil.","연필이 필요해요."),
 C("학교·공부","A1","Let's study together.","같이 공부하자."),
 C("학교·공부","A1","Is it on the test?","그거 시험에 나와요?"),
 C("학교·공부","A1","I'm in second grade.","2학년이에요."),
 C("학교·공부","A1","What's the answer?","답이 뭐예요?"),
 C("학교·공부","A1","Can I sit next to you?","옆에 앉아도 돼?"),
 C("학교·공부","A2","Can I hand it in tomorrow?","내일 내도 돼요?",["Could I hand it in tomorrow?"]),
 C("학교·공부","A2","I got a good grade.","좋은 점수 받았어."),
 C("학교·공부","A2","Which classes are you taking?","어떤 수업 들어?"),
 C("학교·공부","A2","I have a lot of homework tonight.","오늘 밤 숙제가 많아."),
 C("학교·공부","A2","Can I borrow your notes?","네 필기 좀 빌려도 돼?",["Could I borrow your notes?"]),
 C("학교·공부","A2","When is the final exam?","기말고사 언제야?"),
 C("학교·공부","A2","I was absent yesterday.","어제 결석했어요."),
 C("학교·공부","A2","What did I miss?","제가 뭘 놓쳤어요?",[],"결석하거나 늦었을 때."),
 C("학교·공부","A2","How did you do on the test?","시험 어떻게 봤어?"),
 C("학교·공부","A2","I need to study harder.","더 열심히 공부해야 해."),
 C("학교·공부","A2","Can you repeat the question?","질문 다시 말해 줄래요?",["Could you repeat the question?"]),
 C("학교·공부","A2","I'm taking an English class.","영어 수업 듣고 있어요."),
 C("학교·공부","A2","My major is biology.","전공은 생물학이에요.",["I major in biology."]),
 C("학교·공부","A2","Do we have class tomorrow?","내일 수업 있어?"),
 C("학교·공부","A2","The library closes at nine.","도서관은 9시에 닫아."),
 C("학교·공부","B1","I'm falling behind in math.","수학 진도를 못 따라가고 있어."),
 C("학교·공부","B1","Could you go over the main points again?","핵심 내용을 다시 짚어 주실래요?",["Can you go over the main points again?"]),
 C("학교·공부","B1","I'd like to drop this class.","이 수업 수강 철회하고 싶어요."),
 C("학교·공부","B1","Do you have office hours this week?","이번 주에 면담 시간 있으세요?",[],"office hours = 교수님 면담 시간."),
 C("학교·공부","B1","I'm not sure how to start my essay.","에세이를 어떻게 시작해야 할지 모르겠어요."),
 C("학교·공부","B1","What's the word limit for the paper?","리포트 분량 제한이 몇 단어예요?"),
 C("학교·공부","B1","I need to cite my sources properly.","출처를 제대로 표기해야 해."),
 C("학교·공부","B1","Could you recommend some good resources?","좋은 자료 좀 추천해 주실래요?",["Can you recommend some good resources?"]),
 C("학교·공부","B1","I studied all night, but I still failed.","밤새 공부했는데 그래도 떨어졌어."),
 C("학교·공부","B1","Do you want to work on this project together?","이 프로젝트 같이 할래?"),
 C("학교·공부","B1","I'm applying for a scholarship.","장학금을 신청하고 있어요."),
 C("학교·공부","B1","What's the best way to learn new words?","새 단어를 익히는 가장 좋은 방법이 뭐예요?"),
 C("학교·공부","B1","I keep making the same mistakes.","계속 같은 실수를 해."),
 C("학교·공부","B1","The group presentation is next Monday.","조별 발표는 다음 주 월요일이야."),
 C("학교·공부","B1","I take notes on my laptop.","노트북으로 필기해."),
 C("학교·공부","B2","I'm struggling to stay motivated.","의욕을 유지하기가 힘들어."),
 C("학교·공부","B2","It's on the tip of my tongue.","혀끝에서 맴도는데 생각이 안 나."),
 C("학교·공부","B2","Could you give me some constructive criticism?","건설적인 비판 좀 해 주실래요?",["Can you give me some constructive criticism?"]),
 C("학교·공부","B2","I need to pull an all-nighter.","밤을 새워야 해.",[],"all-nighter = 밤샘 공부."),
 C("학교·공부","B2","My thesis is due at the end of the month.","졸업 논문 마감이 이달 말이야."),
 C("학교·공부","B2","I'd like to clarify a point from the lecture.","강의 내용 중 한 가지를 확인하고 싶어요."),
 C("학교·공부","B2","I'm trying to decide whether to study abroad.","유학을 갈지 고민 중이야."),
 C("학교·공부","B2","Could I sit in on your class next week?","다음 주에 수업 청강해도 될까요?",["Can I sit in on your class next week?"],"sit in on = 청강하다, 참관하다."),
 C("학교·공부","B2","I aced the exam!","시험 완전 잘 봤어!",[],"ace = 만점에 가깝게 잘하다."),
 C("학교·공부","B2","I've been procrastinating all week.","일주일 내내 미루기만 했어."),
 C("학교·공부","B2","The professor grades on a curve.","그 교수님은 상대평가로 성적을 매겨."),
 C("학교·공부","B2","I'd like to get some hands-on experience.","직접 해 보는 경험을 쌓고 싶어요."),
 C("학교·공부","B2","Let me rephrase that.","다르게 다시 말해 볼게요."),
 C("학교·공부","B2","It has a steep learning curve.","익히는 데 꽤 오래 걸려.",[],"learning curve = 배우는 데 드는 노력."),
 C("학교·공부","B2","I need to strike a balance between work and study.","일과 공부 사이에서 균형을 잡아야 해."),
 /* 취미·여가 */
 C("취미·여가","A1","I like to dance.","춤추는 거 좋아해요.",["I like dancing."]),
 C("취미·여가","A1","Do you play tennis?","테니스 쳐요?"),
 C("취미·여가","A1","I watch TV every night.","매일 밤 TV 봐요."),
 C("취미·여가","A1","Let's go to the park.","공원 가자."),
 C("취미·여가","A1","I play the piano.","피아노를 쳐요."),
 C("취미·여가","A1","I like sports.","운동 좋아해요."),
 C("취미·여가","A1","Do you like to sing?","노래하는 거 좋아해?",["Do you like singing?"]),
 C("취미·여가","A1","I have a cat.","고양이 키워요."),
 C("취미·여가","A1","Let's go shopping.","쇼핑 가자."),
 C("취미·여가","A1","I like taking pictures.","사진 찍는 거 좋아해요.",["I like to take pictures."]),
 C("취미·여가","A1","I go running every morning.","매일 아침 달리기해요."),
 C("취미·여가","A1","This is fun!","이거 재밌다!"),
 C("취미·여가","A1","What's your favorite food?","제일 좋아하는 음식이 뭐예요?"),
 C("취미·여가","A1","My favorite color is blue.","제일 좋아하는 색은 파란색이에요."),
 C("취미·여가","A1","I read comics.","만화책 읽어요."),
 C("취미·여가","A2","I've never tried skiing.","스키는 한 번도 안 타 봤어요."),
 C("취미·여가","A2","How long have you been playing?","얼마나 오래 했어요?"),
 C("취미·여가","A2","What's your favorite movie?","제일 좋아하는 영화가 뭐예요?"),
 C("취미·여가","A2","I usually stay home on weekends.","주말엔 보통 집에 있어요."),
 C("취미·여가","A2","Do you want to go to a concert?","콘서트 갈래?"),
 C("취미·여가","A2","I'm reading a really good book.","정말 재밌는 책 읽고 있어."),
 C("취미·여가","A2","Let's go to the beach this summer.","이번 여름에 바다 가자."),
 C("취미·여가","A2","I play video games with my friends.","친구들이랑 비디오 게임 해요."),
 C("취미·여가","A2","Have you ever been fishing?","낚시 가 본 적 있어요?"),
 C("취미·여가","A2","I'm not very good at sports.","운동을 잘 못해요."),
 C("취미·여가","A2","We went to a festival last weekend.","지난 주말에 축제 갔었어."),
 C("취미·여가","A2","I like listening to podcasts.","팟캐스트 듣는 거 좋아해요."),
 C("취미·여가","A2","Can you teach me how to play?","하는 법 가르쳐 줄래?",["Could you teach me how to play?"]),
 C("취미·여가","A2","What kind of books do you read?","어떤 책 읽어요?"),
 C("취미·여가","A2","I started a new hobby.","새 취미를 시작했어요."),
 C("취미·여가","B1","I've been playing tennis since I was a kid.","어릴 때부터 테니스를 쳤어요."),
 C("취미·여가","B1","It's a good way to relieve stress.","스트레스 풀기 좋아요."),
 C("취미·여가","B1","I'm thinking about joining a book club.","독서 모임에 들어갈까 생각 중이에요."),
 C("취미·여가","B1","I usually binge-watch shows on weekends.","주말엔 보통 드라마를 몰아 봐요."),
 C("취미·여가","B1","We should go hiking when the weather gets better.","날씨 좋아지면 등산 가자."),
 C("취미·여가","B1","I'm training for a half marathon.","하프 마라톤 준비하고 있어요."),
 C("취미·여가","B1","Do you know any good places to go camping?","캠핑 가기 좋은 곳 알아요?"),
 C("취미·여가","B1","I signed up for a cooking class.","요리 수업에 등록했어요."),
 C("취미·여가","B1","I can't get enough of this song.","이 노래 아무리 들어도 안 질려."),
 C("취미·여가","B1","It's more fun than I thought.","생각보다 재밌어요."),
 C("취미·여가","B1","I used to play the violin, but I gave it up.","예전에 바이올린을 했는데 그만뒀어요."),
 C("취미·여가","B1","I like to spend my weekends outdoors.","주말엔 밖에서 보내는 걸 좋아해요."),
 C("취미·여가","B1","The concert tickets sold out right away.","콘서트 표가 바로 매진됐어."),
 C("취미·여가","B1","I'm learning to knit from online videos.","온라인 영상 보면서 뜨개질 배우는 중이에요."),
 C("취미·여가","B1","Do you want to come over and watch the game?","우리 집 와서 경기 볼래?"),
 C("취미·여가","B2","I'm a bit of a homebody.","나는 좀 집에 있는 걸 좋아하는 편이야.",[],"homebody = 집순이·집돌이."),
 C("취미·여가","B2","It's a great way to switch off from work.","일 생각을 끄기에 좋은 방법이야."),
 C("취미·여가","B2","I've been dabbling in painting.","그림을 취미로 조금씩 해 보고 있어.",[],"dabble = 가볍게 손대 보다."),
 C("취미·여가","B2","I'm not much of a sports fan, to be honest.","솔직히 스포츠는 별로 안 좋아해."),
 C("취미·여가","B2","I've lost interest in it over time.","시간이 지나면서 흥미를 잃었어."),
 C("취미·여가","B2","I find it really therapeutic.","그게 정말 마음이 편해져."),
 C("취미·여가","B2","I tend to get competitive when I play board games.","보드게임 하면 승부욕이 생기는 편이야."),
 C("취미·여가","B2","Once you get the hang of it, it's easy.","요령만 익히면 쉬워.",[],"get the hang of = 요령을 익히다."),
 C("취미·여가","B2","We stayed up all night talking about movies.","영화 얘기하느라 밤을 새웠어."),
 C("취미·여가","B2","It's not as hard as it looks.","보기보다 어렵지 않아."),
 C("취미·여가","B2","I'm trying to make more time for my hobbies.","취미 생활할 시간을 더 내 보려고 해."),
 C("취미·여가","B2","My weekends are pretty laid-back.","주말은 꽤 느긋하게 보내."),
 C("취미·여가","B2","I'm completely obsessed with this series.","이 시리즈에 완전히 빠져 있어."),
 C("취미·여가","B2","It brings back so many memories.","옛날 생각이 많이 나."),
 C("취미·여가","B2","I'd recommend it to anyone who loves nature.","자연을 좋아하는 사람이라면 누구에게나 추천해."),
 /* 온라인·SNS */
 C("온라인·SNS","A1","I'm on Instagram.","나 인스타 해."),
 C("온라인·SNS","A1","Follow me!","팔로우해 줘!"),
 C("온라인·SNS","A1","Nice photo!","사진 멋지다!",["Nice picture!"]),
 C("온라인·SNS","A1","Is the internet down?","인터넷 끊겼어?"),
 C("온라인·SNS","A1","My phone is broken.","폰 고장 났어."),
 C("온라인·SNS","A1","I need to charge my phone.","폰 충전해야 해."),
 C("온라인·SNS","A1","Can I use your phone?","폰 좀 써도 돼?",["Could I use your phone?"]),
 C("온라인·SNS","A1","Look at this video.","이 영상 봐 봐."),
 C("온라인·SNS","A1","I posted a new photo.","새 사진 올렸어."),
 C("온라인·SNS","A1","Let's take a selfie!","셀카 찍자!"),
 C("온라인·SNS","A1","What's your email address?","이메일 주소가 뭐야?",["What's your email?"]),
 C("온라인·SNS","A1","It's loading.","로딩 중이야."),
 C("온라인·SNS","A1","I don't have Wi-Fi.","와이파이가 없어."),
 C("온라인·SNS","A1","Turn on your camera.","카메라 켜 봐."),
 C("온라인·SNS","A1","Read my message.","내 메시지 읽어 봐."),
 C("온라인·SNS","A2","Can you download the app?","그 앱 다운받아 줄래?",["Could you download the app?"]),
 C("온라인·SNS","A2","I'll add you to the group chat.","단톡방에 초대할게."),
 C("온라인·SNS","A2","My screen is cracked.","화면이 깨졌어."),
 C("온라인·SNS","A2","I can't log in to my account.","계정에 로그인이 안 돼."),
 C("온라인·SNS","A2","Did you see my story?","내 스토리 봤어?"),
 C("온라인·SNS","A2","The video keeps buffering.","영상이 자꾸 끊겨."),
 C("온라인·SNS","A2","I left you a voice message.","음성 메시지 남겼어."),
 C("온라인·SNS","A2","How many followers do you have?","팔로워 몇 명이야?"),
 C("온라인·SNS","A2","I'll send you the photos later.","사진은 이따 보낼게."),
 C("온라인·SNS","A2","I turned off my notifications.","알림 꺼 놨어."),
 C("온라인·SNS","A2","This website is really slow.","이 웹사이트 너무 느려."),
 C("온라인·SNS","A2","I deleted the app.","그 앱 지웠어."),
 C("온라인·SNS","A2","Who posted this?","이거 누가 올렸어?"),
 C("온라인·SNS","A2","My battery dies so fast.","배터리가 너무 빨리 닳아."),
 C("온라인·SNS","A2","I'm watching a live stream.","라이브 방송 보고 있어."),
 C("온라인·SNS","B1","I think my account got hacked.","계정이 해킹당한 것 같아."),
 C("온라인·SNS","B1","Have you tried turning it off and on again?","껐다가 다시 켜 봤어?"),
 C("온라인·SNS","B1","I reset my password, but it still doesn't work.","비밀번호 재설정했는데 그래도 안 돼."),
 C("온라인·SNS","B1","I don't post much, but I check it every day.","글은 잘 안 올리지만 매일 확인해."),
 C("온라인·SNS","B1","Could you send me the file as a PDF?","파일을 PDF로 보내 줄래요?",["Can you send me the file as a PDF?"]),
 C("온라인·SNS","B1","I'll share the link in the chat.","링크는 채팅창에 올릴게."),
 C("온라인·SNS","B1","My video call keeps freezing.","영상 통화가 자꾸 멈춰."),
 C("온라인·SNS","B1","Have you tried clearing the cache?","캐시 삭제해 봤어?"),
 C("온라인·SNS","B1","I ordered it through an app.","앱으로 주문했어."),
 C("온라인·SNS","B1","I accidentally deleted the photo.","실수로 사진을 지웠어."),
 C("온라인·SNS","B1","This ad keeps popping up.","이 광고가 계속 떠."),
 C("온라인·SNS","B1","I'm thinking of starting a blog.","블로그를 시작해 볼까 해."),
 C("온라인·SNS","B1","It's hard to tell what's real online.","온라인에선 뭐가 진짜인지 알기 어려워."),
 C("온라인·SNS","B1","Could you mute yourself, please?","마이크 좀 꺼 주실래요?",["Can you mute yourself, please?"],"화상 회의에서."),
 C("온라인·SNS","B1","I'll send you the details by DM.","자세한 건 DM으로 보낼게.",["I'll DM you the details."]),
 C("온라인·SNS","B2","I've been really careful about my privacy settings.","개인정보 설정에 신경을 많이 쓰고 있어."),
 C("온라인·SNS","B2","That headline is just clickbait.","그 제목은 그냥 낚시야."),
 C("온라인·SNS","B2","It's just an echo chamber.","그냥 비슷한 의견끼리만 모이는 곳이야.",[],"echo chamber = 같은 의견만 되울리는 공간."),
 C("온라인·SNS","B2","I don't want to overshare online.","온라인에 사생활을 너무 많이 올리고 싶지 않아."),
 C("온라인·SNS","B2","The algorithm keeps recommending the same stuff.","알고리즘이 계속 똑같은 걸 추천해."),
 C("온라인·SNS","B2","I fell down a rabbit hole of cooking videos.","요리 영상 보다가 끝없이 빠져들었어.",[],"rabbit hole = 끝없이 빠져드는 것."),
 C("온라인·SNS","B2","That account is clearly fake.","그 계정은 누가 봐도 가짜야."),
 C("온라인·SNS","B2","Let's not air our dirty laundry online.","우리 집안 문제를 온라인에 떠벌리지 말자.",[],"air one's dirty laundry = 치부를 드러내다."),
 C("온라인·SNS","B2","I think it's a phishing email.","피싱 메일 같아."),
 C("온라인·SNS","B2","I'm taking a break from social media.","SNS를 잠시 쉬고 있어."),
 C("온라인·SNS","B2","Influencers make it look effortless.","인플루언서들은 그걸 쉬워 보이게 해."),
 C("온라인·SNS","B2","The post blew up overnight.","그 게시물이 하룻밤 새 엄청 퍼졌어."),
 C("온라인·SNS","B2","You should turn on two-factor authentication.","2단계 인증을 켜 두는 게 좋아."),
 C("온라인·SNS","B2","The livestream drew a huge audience.","그 라이브 방송에 엄청 많은 사람이 몰렸어."),
 C("온라인·SNS","B2","I have a love-hate relationship with social media.","SNS랑은 애증 관계야.")
);

/* ---------- phase 4: C1 (advanced) — hedging, discourse markers, idioms, negotiation ---------- */
DECK.push(
 /* 카페·식당 */
 C("카페·식당","C1","I'd be inclined to go for the tasting menu, if you don't mind splurging a bit.","돈 좀 써도 괜찮다면, 난 코스 요리 쪽으로 하고 싶어.",[],"I'd be inclined to = ~하는 쪽으로 마음이 기울다."),
 C("카페·식당","C1","Would you be able to accommodate a gluten-free diet?","글루텐 프리 식단도 맞춰 주실 수 있을까요?"),
 C("카페·식당","C1","I hate to be a pain, but this isn't quite cooked through.","번거롭게 해서 죄송한데, 이게 속까지 안 익었네요."),
 C("카페·식당","C1","Everything was lovely, but the wait was a bit much.","다 좋았는데 기다리는 시간이 좀 길었어요."),
 C("카페·식당","C1","It's a bit of an acquired taste, to be honest.","솔직히 먹다 보면 익숙해지는 맛이야.",[],"acquired taste = 처음엔 낯설지만 점점 좋아지는 맛."),
 C("카페·식당","C1","Let's book well in advance; it fills up quickly.","금방 차니까 넉넉히 미리 예약하자."),
 C("카페·식당","C1","I'll leave the wine pairing entirely up to you.","와인 페어링은 전적으로 맡길게요."),
 C("카페·식당","C1","That's not to say the food was bad, just overpriced.","음식이 별로였다는 건 아니고, 가격이 너무 비쌌다는 거야.",[],"That's not to say ~ = ~라는 뜻은 아니다."),
 C("카페·식당","C1","Could we possibly get a table that's a little more private?","혹시 좀 더 조용한 자리가 있을까요?"),
 C("카페·식당","C1","The atmosphere more than makes up for the prices.","분위기가 가격을 충분히 만회하고도 남아."),
 C("카페·식당","C1","I'm trying to be mindful of what I eat these days.","요즘 먹는 걸 신경 쓰려고 해."),
 C("카페·식당","C1","Shall we settle up and head somewhere for dessert?","계산하고 디저트 먹으러 다른 데 갈까?"),
 C("카페·식당","C1","Having said that, I'd happily come back for the brunch.","그렇긴 해도 브런치 먹으러는 기꺼이 또 올 거야.",[],"Having said that = 그렇긴 하지만(앞말을 한발 물릴 때)."),
 C("카페·식당","C1","It's nothing to write home about, but it does the job.","대단한 건 아닌데 그럭저럭 괜찮아."),
 C("카페·식당","C1","I'd rather we didn't make a fuss about the mix-up.","주문 착오로 괜히 소란 피우지 않았으면 해."),
 C("카페·식당","C1","Could you walk me through what's in the chef's special?","셰프 특선에 뭐가 들어가는지 하나씩 설명해 주실래요?"),
 C("카페·식당","C1","We were hoping to linger a while, if that's all right.","괜찮으시면 좀 더 머물다 가고 싶어요."),
 C("카페·식당","C1","I'm not a big drinker, so I'll stick to sparkling water.","술을 잘 안 마셔서 탄산수로 할게요."),
 C("카페·식당","C1","The flavors are subtle but really well balanced.","맛이 은은한데 균형이 정말 잘 잡혀 있어."),
 C("카페·식당","C1","On reflection, we may have over-ordered.","생각해 보니 너무 많이 시킨 것 같아."),
 C("카페·식당","C1","It's on the pricey side, but you're paying for the experience.","좀 비싼 편이지만 경험에 돈을 내는 거지."),
 C("카페·식당","C1","We'd like to put down a deposit for a group booking.","단체 예약 보증금을 걸고 싶어요."),
 C("카페·식당","C1","Whatever you do, don't skip the dessert here.","무슨 일이 있어도 여기 디저트는 빼먹지 마."),
 C("카페·식당","C1","I've gone off spicy food since my stomach started acting up.","위가 탈 나기 시작한 뒤로 매운 음식이 싫어졌어.",[],"go off = (먹던 것이) 싫어지다."),
 C("카페·식당","C1","It's the kind of place you'd take someone to impress them.","누군가에게 잘 보이고 싶을 때 데려갈 만한 곳이야."),
 /* 스몰토크 */
 C("스몰토크","C1","I don't think we've been properly introduced.","정식으로 인사를 못 나눈 것 같네요."),
 C("스몰토크","C1","So, what's keeping you busy these days?","그래서, 요즘 뭐 하느라 바빠?"),
 C("스몰토크","C1","I couldn't help but notice your accent.","말투가 눈에 띄어서요."),
 C("스몰토크","C1","If you don't mind my asking, what got you into that line of work?","실례가 안 된다면, 어떻게 그 일을 하게 됐어요?"),
 C("스몰토크","C1","That must have been quite the experience.","꽤 대단한 경험이었겠네요."),
 C("스몰토크","C1","I've lost track of how long it's been since we last caught up.","마지막으로 근황 나눈 게 언젠지도 모르겠다."),
 C("스몰토크","C1","Correct me if I'm wrong, but didn't we meet at the conference?","제가 틀렸으면 말해 주세요, 학회에서 뵙지 않았어요?"),
 C("스몰토크","C1","I'll let you get on with your evening.","이제 저녁 시간 편하게 보내세요.",[],"대화를 정중하게 마무리할 때."),
 C("스몰토크","C1","It's been a pleasure chatting with you.","이야기 나눠서 정말 즐거웠어요."),
 C("스몰토크","C1","Fancy seeing you here!","여기서 보다니 웬일이야!",[],"뜻밖의 장소에서 아는 사람을 만났을 때. 주로 영국식."),
 C("스몰토크","C1","I've heard nothing but good things about you.","좋은 얘기만 들었어요."),
 C("스몰토크","C1","Let's not leave it so long next time.","다음엔 이렇게 오래 연락 끊지 말자."),
 C("스몰토크","C1","I'm not one for small talk, but this is nice.","원래 가벼운 대화는 잘 못 하는데, 이건 좋네."),
 C("스몰토크","C1","How are you finding the new neighborhood?","새 동네는 어때요?",[],"How are you finding ~? = ~는 겪어 보니 어때?"),
 C("스몰토크","C1","You'll have to fill me in on what I missed.","내가 놓친 거 좀 알려 줘."),
 C("스몰토크","C1","I'd love to pick your brain about that sometime.","언제 그 얘기 좀 자세히 여쭤보고 싶어요.",[],"pick someone's brain = 지식이나 조언을 구하다."),
 C("스몰토크","C1","That's a conversation for another day.","그건 다음에 얘기하자."),
 C("스몰토크","C1","Our paths keep crossing, don't they?","우리 자꾸 마주치네, 그치?"),
 C("스몰토크","C1","I'm glad we finally got the chance to sit down and talk.","드디어 앉아서 얘기할 기회가 생겨서 기뻐."),
 C("스몰토크","C1","Anyway, enough about me. How have things been on your end?","아무튼 내 얘기는 그만. 넌 어떻게 지냈어?"),
 C("스몰토크","C1","I'll take that as a compliment.","칭찬으로 들을게."),
 C("스몰토크","C1","Now that you mention it, I do remember.","듣고 보니 기억나."),
 C("스몰토크","C1","We seem to have a lot in common.","우리 공통점이 많은 것 같아."),
 C("스몰토크","C1","Sorry, I didn't catch the end of that.","미안, 마지막 부분을 못 들었어."),
 C("스몰토크","C1","Let me know if you're ever in town.","혹시 이 동네 오게 되면 연락해."),
 /* 여행 */
 C("여행","C1","I was wondering whether you could recommend somewhere off the tourist trail.","관광객이 잘 안 가는 곳을 추천해 주실 수 있을까 해서요."),
 C("여행","C1","Our itinerary is fairly flexible, so we're open to suggestions.","일정이 꽤 유연해서 제안은 언제든 환영이에요."),
 C("여행","C1","Given the delay, I'd expect some form of compensation.","지연을 생각하면 어떤 식으로든 보상이 있어야 한다고 봐요."),
 C("여행","C1","Would it be possible to waive the change fee, given the circumstances?","상황을 감안해서 변경 수수료를 면제해 주실 수 있을까요?"),
 C("여행","C1","We'd rather soak up the atmosphere than rush between sights.","명소 사이를 바쁘게 다니기보다 분위기를 즐기고 싶어요."),
 C("여행","C1","I'm afraid the room doesn't quite live up to the description.","죄송하지만 방이 설명에 좀 못 미치네요."),
 C("여행","C1","It's well worth the trek, provided the weather holds.","날씨만 버텨 주면 힘들게 갈 가치가 충분해."),
 C("여행","C1","We got hopelessly lost, but it turned out to be the highlight of the trip.","완전히 길을 잃었는데 그게 여행의 하이라이트가 됐어."),
 C("여행","C1","Is there any leeway on the checkout time?","체크아웃 시간에 여유를 좀 주실 수 있나요?"),
 C("여행","C1","I'd like to lodge a formal complaint about the service.","서비스에 대해 정식으로 항의하고 싶어요."),
 C("여행","C1","The locals were incredibly welcoming.","현지 사람들이 정말 따뜻하게 맞아 줬어."),
 C("여행","C1","I tend to travel on a whim rather than plan everything.","난 다 계획하기보다 즉흥적으로 여행하는 편이야."),
 C("여행","C1","We should factor in time for delays.","지연될 시간도 계산에 넣어야 해."),
 C("여행","C1","It's a bit of a tourist trap, so I'd skip it.","거긴 좀 관광객용이라 나라면 안 가."),
 C("여행","C1","Is there a less crowded way to get there?","거기 덜 붐비게 가는 방법이 있나요?"),
 C("여행","C1","I'm still getting over the jet lag, so I'm taking it easy.","아직 시차 적응 중이라 쉬엄쉬엄하고 있어."),
 C("여행","C1","The trip was a real eye-opener.","그 여행은 정말 눈이 뜨이는 경험이었어."),
 C("여행","C1","We were upgraded free of charge, which was a pleasant surprise.","무료로 업그레이드돼서 뜻밖에 기분이 좋았어."),
 C("여행","C1","I'd recommend booking well ahead during peak season.","성수기엔 훨씬 미리 예약하는 걸 추천해."),
 C("여행","C1","Let's play it safe and get travel insurance.","안전하게 여행자 보험 들자."),
 C("여행","C1","It's not the most convenient location, but the view makes up for it.","위치가 아주 편하진 않지만 경치가 그걸 만회해."),
 C("여행","C1","I'd hate to miss our connection, so let's not cut it too fine.","환승 놓치기 싫으니까 너무 빠듯하게 잡지 말자.",[],"cut it fine = 시간을 빠듯하게 잡다."),
 C("여행","C1","We ended up extending our stay on the spur of the moment.","즉흥적으로 숙박을 연장해 버렸어.",[],"on the spur of the moment = 충동적으로."),
 C("여행","C1","Could you note on the booking that we'll be arriving late?","저희가 늦게 도착한다고 예약에 적어 두실래요?"),
 C("여행","C1","Traveling solo forces you out of your comfort zone.","혼자 여행하면 익숙한 곳에서 벗어나게 돼."),
 /* 직장·면접 */
 C("직장·면접","C1","I'd like to push back on that a little, if I may.","괜찮다면 그 부분에 조금 반론을 제기하고 싶어요.",[],"push back = 이의를 제기하다."),
 C("직장·면접","C1","Let's take a step back and reassess our priorities.","한발 물러서서 우선순위를 다시 따져 보죠."),
 C("직장·면접","C1","With that in mind, I'd propose we revisit the timeline.","그걸 감안해서 일정을 다시 검토하자고 제안할게요."),
 C("직장·면접","C1","I take your point, but the data suggests otherwise.","말씀하신 요지는 알지만, 데이터는 다르게 말해요."),
 C("직장·면접","C1","Could we agree on the principle first and sort out the details later?","원칙부터 합의하고 세부 사항은 나중에 정리할까요?"),
 C("직장·면접","C1","In my previous role, I was responsible for overseeing a team of eight.","이전 직무에서 8명 팀을 총괄했어요."),
 C("직장·면접","C1","I thrive in fast-paced environments.","빠르게 돌아가는 환경에서 더 잘해요."),
 C("직장·면접","C1","I'm looking for a role where I can make a tangible impact.","눈에 보이는 성과를 낼 수 있는 자리를 찾고 있어요."),
 C("직장·면접","C1","To be perfectly honest, the timeline seems a bit ambitious.","아주 솔직히 말하면 일정이 좀 무리해 보여요."),
 C("직장·면접","C1","Let's not get bogged down in the details.","세부 사항에 너무 매몰되지 맙시다."),
 C("직장·면접","C1","I'd welcome any feedback on how I could improve.","개선할 점에 대한 피드백은 무엇이든 환영해요."),
 C("직장·면접","C1","That's outside my area, but I can point you to the right person.","제 담당 밖이지만 맞는 분을 알려 드릴게요."),
 C("직장·면접","C1","We need to manage the client's expectations.","고객의 기대치를 조절해야 해요."),
 C("직장·면접","C1","I'm keen to hear what others think before we commit.","확정하기 전에 다른 분들 생각을 꼭 듣고 싶어요."),
 C("직장·면접","C1","Let's take this up separately after the call.","통화 끝나고 따로 얘기하죠."),
 C("직장·면접","C1","I'd argue that the risks outweigh the benefits.","위험이 이점보다 크다고 봐요."),
 C("직장·면접","C1","What would success look like in the first six months?","첫 6개월 동안의 성공은 어떤 모습일까요?",[],"면접 끝에 면접관에게 하기 좋은 질문."),
 C("직장·면접","C1","I'd be happy to take ownership of the rollout.","출시 진행은 제가 책임지고 맡을게요."),
 C("직장·면접","C1","We're already at capacity, so something has to give.","이미 여력이 꽉 차서 뭔가는 포기해야 해요."),
 C("직장·면접","C1","Let's agree on clear next steps and owners.","다음 단계와 담당자를 분명히 정합시다."),
 C("직장·면접","C1","I appreciate the offer, but I'd like a few days to consider it.","제안 감사하지만 며칠 생각해 볼 시간을 주세요."),
 C("직장·면접","C1","It's a fair point, and one we hadn't fully considered.","일리 있는 지적이고, 저희가 충분히 생각하지 못한 부분이에요."),
 C("직장·면접","C1","Could you clarify what you mean by \"streamline\"?","'간소화'가 정확히 무슨 뜻인지 설명해 주실래요?"),
 C("직장·면접","C1","I'd rather under-promise and over-deliver.","약속은 적게 하고 결과는 더 내는 쪽이 좋아요."),
 C("직장·면접","C1","Going forward, let's flag issues as soon as they come up.","앞으로는 문제가 생기면 바로 알립시다."),
 /* 감정·의견 */
 C("감정·의견","C1","I can't say I'm thrilled about it, but I'll go along with it.","썩 내키진 않지만 따를게."),
 C("감정·의견","C1","I'm in two minds about it.","그건 마음이 반반이야."),
 C("감정·의견","C1","It's not that I disagree; I just see it differently.","반대한다기보다 내가 좀 다르게 볼 뿐이야."),
 C("감정·의견","C1","I have to admit, you've got a point there.","인정할게, 그 말엔 일리가 있어."),
 C("감정·의견","C1","I'm all for it, as long as it's done properly.","제대로만 한다면 난 대찬성이야."),
 C("감정·의견","C1","It's hard not to take it personally.","개인적으로 받아들이지 않기가 어렵네."),
 C("감정·의견","C1","I was taken aback by how blunt he was.","걔가 너무 직설적이라 당황했어."),
 C("감정·의견","C1","It struck me as a little insensitive.","좀 무신경하게 느껴졌어."),
 C("감정·의견","C1","I'm still processing what happened.","무슨 일이 있었는지 아직 정리하는 중이야."),
 C("감정·의견","C1","I'd go as far as to say it's the best decision we've made.","우리가 내린 최고의 결정이라고까지 말하고 싶어."),
 C("감정·의견","C1","Frankly, I've had enough of the excuses.","솔직히 핑계라면 이제 지긋지긋해."),
 C("감정·의견","C1","It's a bit of a mixed bag.","좋은 것도 있고 나쁜 것도 있어."),
 C("감정·의견","C1","I'm not entirely convinced, but I'm willing to give it a go.","완전히 납득된 건 아니지만 한번 해 볼 의향은 있어."),
 C("감정·의견","C1","That really hit home for me.","그건 정말 와닿았어."),
 C("감정·의견","C1","I didn't see that coming at all.","그건 전혀 예상 못 했어."),
 C("감정·의견","C1","Let's not jump to conclusions.","섣불리 결론 내리지 말자."),
 C("감정·의견","C1","Both options have their merits, which makes it tricky.","둘 다 장점이 있어서 정하기 까다로워."),
 C("감정·의견","C1","It goes without saying that I'm grateful.","고마운 건 말할 필요도 없지."),
 C("감정·의견","C1","I'm over it now, but it stung at the time.","이제 괜찮은데 그땐 좀 아팠어."),
 C("감정·의견","C1","If I'm being completely honest, I felt a bit left out.","아주 솔직히 말하면 좀 소외감을 느꼈어."),
 C("감정·의견","C1","I wouldn't read too much into it.","너무 깊게 생각하지 마."),
 C("감정·의견","C1","That's a valid concern, and I share it.","타당한 걱정이고, 나도 같은 생각이야."),
 C("감정·의견","C1","It's not ideal, but we'll make the best of it.","이상적이진 않지만 최선을 다해 보자."),
 C("감정·의견","C1","I'm beginning to warm to the idea.","그 생각이 점점 마음에 들기 시작해.",[],"warm to = ~에 마음이 가다."),
 C("감정·의견","C1","Honestly, it's been a bit of a rollercoaster.","솔직히 감정 기복이 꽤 심했어."),
 /* 쇼핑 */
 C("쇼핑","C1","I'm after something understated but well made.","수수하지만 잘 만든 걸 찾고 있어요.",[],"I'm after = I'm looking for. 영국·호주에서 흔한 구어."),
 C("쇼핑","C1","Is there any flexibility on the price if I buy two?","두 개 사면 가격 조정이 좀 될까요?"),
 C("쇼핑","C1","I'd like to know what your policy is on faulty items.","불량품에 대한 규정이 어떻게 되는지 알고 싶어요."),
 C("쇼핑","C1","It's lovely, but I can't justify spending that much right now.","예쁘긴 한데 지금 그만큼 쓸 명분이 없네요."),
 C("쇼핑","C1","I've been burned by cheap knockoffs before.","전에 싸구려 짝퉁에 데인 적이 있어요."),
 C("쇼핑","C1","The reviews are mixed, so I'm a bit wary.","후기가 엇갈려서 좀 조심스러워요."),
 C("쇼핑","C1","I'd rather invest in something that will last.","오래 쓸 수 있는 걸 사는 데 돈을 쓰고 싶어요."),
 C("쇼핑","C1","Could you set it aside while I think it over?","생각해 보는 동안 따로 빼 두실 수 있을까요?"),
 C("쇼핑","C1","I was led to believe it came with a warranty.","보증이 포함된 줄 알았어요.",[],"I was led to believe = (상대 말 때문에) ~라고 믿게 됐다."),
 C("쇼핑","C1","This isn't what was advertised, so I'd like a full refund.","광고한 것과 달라서 전액 환불받고 싶어요."),
 C("쇼핑","C1","I'm not one for brand names; quality matters more.","난 브랜드는 별로 안 따져. 품질이 더 중요해."),
 C("쇼핑","C1","Retail therapy is my guilty pleasure.","쇼핑으로 스트레스 푸는 게 나만의 은근한 즐거움이야."),
 C("쇼핑","C1","Buying the cheapest one is a false economy.","제일 싼 걸 사는 건 결국 손해야.",[],"false economy = 아끼는 것 같지만 결국 손해인 것."),
 C("쇼핑","C1","I'd appreciate it if you could escalate this to a manager.","이 건을 매니저께 올려 주시면 감사하겠어요."),
 C("쇼핑","C1","The sales assistant was a little too pushy for my liking.","점원이 좀 지나치게 사라고 몰아붙였어."),
 C("쇼핑","C1","Do you offer any discount for loyal customers?","단골 고객 할인이 있나요?"),
 C("쇼핑","C1","I'll hold off until the new model comes out.","새 모델 나올 때까지 기다릴게요."),
 C("쇼핑","C1","It's been on my wish list for ages.","오랫동안 위시리스트에 있던 거야."),
 C("쇼핑","C1","I'm not convinced it's worth the hype.","그렇게 화제가 될 만한지는 모르겠어."),
 C("쇼핑","C1","Is it possible to have it delivered on a specific date?","특정 날짜에 배송받을 수 있을까요?"),
 C("쇼핑","C1","The fit is spot on, but the color isn't quite me.","핏은 딱인데 색이 나랑 좀 안 어울려."),
 C("쇼핑","C1","I'd like to raise an issue with the delivery service.","배송 서비스에 대해 문제를 제기하고 싶어요."),
 C("쇼핑","C1","They've really jacked up the prices since last year.","작년보다 가격을 확 올렸네."),
 C("쇼핑","C1","It works out cheaper in the long run.","길게 보면 그게 더 싸게 먹혀."),
 C("쇼핑","C1","I'm trying to buy less but buy better.","덜 사고 더 좋은 걸 사려고 해."),
 /* 전화·약속 */
 C("전화·약속","C1","I'm calling to follow up on the email I sent last week.","지난주에 보낸 이메일 건으로 확인차 전화드렸어요."),
 C("전화·약속","C1","Would it be possible to bring the meeting forward to Tuesday?","회의를 화요일로 앞당길 수 있을까요?",[],"bring forward = 앞당기다 (push back = 미루다)."),
 C("전화·약속","C1","I'm afraid something's come up and I'll have to postpone.","죄송하지만 일이 생겨서 미뤄야 할 것 같아요."),
 C("전화·약속","C1","Let me check my availability and get back to you.","제 일정 확인하고 다시 연락드릴게요."),
 C("전화·약속","C1","Sorry, you're breaking up. Could you repeat that last part?","죄송해요, 소리가 끊겨요. 마지막 부분 다시 말씀해 주실래요?"),
 C("전화·약속","C1","I'll pencil it in for now and confirm closer to the date.","일단 잡아 두고 날짜가 가까워지면 확정할게요."),
 C("전화·약속","C1","Just to confirm, we're meeting at ten on Thursday?","확인차 여쭤요, 목요일 10시에 만나는 거 맞죠?"),
 C("전화·약속","C1","I've been meaning to give you a call for ages.","오래전부터 전화하려고 했었어."),
 C("전화·약속","C1","Would you mind if I called you back on a better line?","더 잘 들리는 데서 다시 전화드려도 될까요?"),
 C("전화·약속","C1","I won't keep you long; it's just a quick question.","오래 붙잡지 않을게요, 간단한 질문 하나예요."),
 C("전화·약속","C1","Shall we leave it open and decide on Friday?","정하지 말고 열어 뒀다가 금요일에 정할까?"),
 C("전화·약속","C1","I'm running about fifteen minutes behind, apologies.","15분 정도 늦어지고 있어요, 죄송해요."),
 C("전화·약속","C1","Is there a window on Monday that works for you?","월요일에 시간 비는 때가 있으세요?",[],"window = 비어 있는 짧은 시간."),
 C("전화·약속","C1","I'd rather not discuss it over the phone.","그건 전화로 얘기하고 싶지 않아."),
 C("전화·약속","C1","Could you let him know it's fairly urgent?","꽤 급한 일이라고 전해 주시겠어요?"),
 C("전화·약속","C1","Sorry to cut it short, but I've got another call coming in.","짧게 끊어서 미안한데 다른 전화가 와서."),
 C("전화·약속","C1","Let's lock in a date before everyone's calendars fill up.","다들 일정 차기 전에 날짜를 확정하자."),
 C("전화·약속","C1","I'll send a calendar invite so it's in writing.","기록이 남게 일정 초대를 보낼게요."),
 C("전화·약속","C1","Shall we say half past two, then?","그럼 2시 반으로 할까요?"),
 C("전화·약속","C1","It's no trouble at all; I'm flexible.","전혀 문제없어요, 저는 시간 맞출 수 있어요."),
 C("전화·약속","C1","I must have missed your call while I was in a meeting.","회의 중에 전화를 놓쳤나 봐요."),
 C("전화·약속","C1","Let's reconfirm nearer the time.","날짜 가까워지면 다시 확인하자."),
 C("전화·약속","C1","I hate to do this to you, but can we rearrange?","이러기 정말 미안한데, 일정 다시 잡을 수 있을까?"),
 C("전화·약속","C1","Feel free to call my cell if anything changes.","바뀌는 게 있으면 편하게 휴대폰으로 전화 주세요."),
 C("전화·약속","C1","I'll have my assistant coordinate the details with you.","세부 사항은 제 비서가 조율하도록 할게요."),
 /* 병원·약국 */
 C("병원·약국","C1","I've been having intermittent chest pain over the past week.","지난 일주일 동안 가슴 통증이 간간이 있었어요."),
 C("병원·약국","C1","Could this be related to the medication I'm on?","지금 먹는 약과 관련이 있을 수 있나요?"),
 C("병원·약국","C1","I'd like to understand the risks before I agree to the procedure.","시술에 동의하기 전에 위험을 알고 싶어요."),
 C("병원·약국","C1","Is there anything I should avoid while taking this?","이거 먹는 동안 피해야 할 게 있나요?"),
 C("병원·약국","C1","I've had a nagging cough that just won't go away.","떨어지지 않는 잔기침이 계속 있어요."),
 C("병원·약국","C1","The symptoms seem to flare up whenever I'm stressed.","스트레스받을 때마다 증상이 심해지는 것 같아요.",[],"flare up = (증상이) 갑자기 심해지다."),
 C("병원·약국","C1","Would you recommend seeing a specialist?","전문의를 만나 보는 게 좋을까요?"),
 C("병원·약국","C1","My energy levels have been really low lately.","요즘 기력이 정말 떨어졌어요."),
 C("병원·약국","C1","Are there any non-drug options I could try first?","약 말고 먼저 해 볼 수 있는 방법이 있을까요?"),
 C("병원·약국","C1","I'd prefer something that won't make me drowsy.","졸리지 않은 약이면 좋겠어요."),
 C("병원·약국","C1","Is it worth getting it checked out, or am I overreacting?","검사받아 볼 만한가요, 아니면 제가 과민한 걸까요?"),
 C("병원·약국","C1","The doctor said it's nothing to worry about.","의사가 걱정할 거 없대."),
 C("병원·약국","C1","I'm due for a follow-up appointment next month.","다음 달에 경과 진료가 잡혀 있어요."),
 C("병원·약국","C1","It's a chronic condition, so I've learned to manage it.","만성 질환이라 관리하는 법을 익혔어요."),
 C("병원·약국","C1","Could you write down the dosage so I don't forget?","잊지 않게 복용량을 적어 주실래요?"),
 C("병원·약국","C1","I've been prescribed this before, and it worked well.","전에 이걸 처방받았는데 잘 들었어요."),
 C("병원·약국","C1","My sleep has been all over the place lately.","요즘 수면 패턴이 엉망이에요."),
 C("병원·약국","C1","I'd like a referral to a dermatologist.","피부과 진료 의뢰서를 받고 싶어요."),
 C("병원·약국","C1","It's been dragging on for weeks now.","몇 주째 질질 끌고 있어요."),
 C("병원·약국","C1","I'm worried it might be something more serious.","더 심각한 걸까 봐 걱정돼요."),
 C("병원·약국","C1","How long before I can get back to exercising?","운동을 다시 하려면 얼마나 기다려야 해요?"),
 C("병원·약국","C1","Prevention is better than cure.","예방이 치료보다 낫다."),
 C("병원·약국","C1","I've cut out caffeine, but it hasn't made much difference.","카페인을 끊었는데 별 차이가 없어요."),
 C("병원·약국","C1","Is this covered, or will I have to pay out of pocket?","이거 보험 적용돼요, 아니면 제가 직접 내야 해요?",[],"out of pocket = 자기 돈으로."),
 C("병원·약국","C1","I'm on the road to recovery.","회복하는 중이에요."),
 /* 집·생활 */
 C("집·생활","C1","We've been meaning to redecorate, but we keep putting it off.","집을 새로 꾸미려고 했는데 계속 미루고 있어."),
 C("집·생활","C1","Would you mind keeping the noise to a minimum after eleven?","11시 이후엔 소음을 최소한으로 해 주실 수 있을까요?"),
 C("집·생활","C1","The landlord has been less than helpful about the repairs.","집주인이 수리 문제로 그다지 협조적이지 않아.",[],"less than helpful = 전혀 도움이 안 되는(완곡)."),
 C("집·생활","C1","I'm not sure it's worth the hassle of moving.","이사하는 수고를 감수할 만한지 모르겠어."),
 C("집·생활","C1","Let's split the costs based on how much each of us uses.","각자 쓰는 만큼 비용을 나누자."),
 C("집·생활","C1","The humidity is starting to cause real problems.","습기가 진짜 문제를 일으키기 시작했어."),
 C("집·생활","C1","I'd rather rent for now and keep my options open.","당분간은 월세로 살면서 선택지를 열어 두고 싶어."),
 C("집·생활","C1","We need to have a proper conversation about the chores.","집안일에 대해 제대로 얘기 좀 해야 해."),
 C("집·생활","C1","It's cozy, but it's a bit cramped for three.","아늑하긴 한데 셋이 살기엔 좀 비좁아."),
 C("집·생활","C1","The neighbors have been really understanding about the renovation.","이웃들이 공사를 정말 잘 이해해 줬어."),
 C("집·생활","C1","I've been trying to get rid of all the clutter.","잡동사니를 다 치워 버리려고 하고 있어."),
 C("집·생활","C1","It's in a great location, but the rent is steep.","위치는 좋은데 월세가 비싸."),
 C("집·생활","C1","Could you give me a rough estimate for the repairs?","수리비 대략적인 견적을 알려 주실래요?"),
 C("집·생활","C1","I think we should get a second quote before we commit.","확정하기 전에 견적을 한 군데 더 받아 보자."),
 C("집·생활","C1","Living with roommates has its ups and downs.","룸메이트와 사는 건 장단점이 있어."),
 C("집·생활","C1","The heating bill went through the roof this winter.","이번 겨울 난방비가 엄청 올랐어.",[],"go through the roof = 천정부지로 치솟다."),
 C("집·생활","C1","I'm a bit of a neat freak, I'll admit.","인정할게, 나 좀 깔끔 떠는 편이야."),
 C("집·생활","C1","We should set aside a weekend to tackle the garage.","주말 하루 날 잡아서 차고 정리하자."),
 C("집·생활","C1","It's not ideal, but it'll do for now.","이상적이진 않지만 당분간은 이걸로 충분해."),
 C("집·생활","C1","The deposit should be returned in full, barring any damage.","파손이 없다면 보증금은 전액 돌려받아야 해요."),
 C("집·생활","C1","Let's not let the dishes pile up this time.","이번엔 설거지 쌓아 두지 말자."),
 C("집·생활","C1","I'd like to give notice that I'll be moving out.","이사 나간다고 미리 통보하고 싶어요."),
 C("집·생활","C1","The place has a lot of character.","그 집은 개성이 넘쳐."),
 C("집·생활","C1","We've finally got the place looking the way we want.","드디어 집을 원하는 모습으로 꾸몄어."),
 C("집·생활","C1","Working from home has blurred the line between work and rest.","재택근무를 하니 일과 휴식의 경계가 흐려졌어."),
 /* 학교·공부 */
 C("학교·공부","C1","I'm struggling to structure my argument coherently.","주장을 논리적으로 구성하는 데 애를 먹고 있어요."),
 C("학교·공부","C1","Could you elaborate on the methodology you used?","사용하신 연구 방법을 좀 더 자세히 설명해 주실래요?"),
 C("학교·공부","C1","I'd like to challenge one of the assumptions in the reading.","읽기 자료의 가정 중 하나에 이의를 제기하고 싶어요."),
 C("학교·공부","C1","The evidence for that claim seems rather thin.","그 주장의 근거가 좀 빈약해 보여요."),
 C("학교·공부","C1","I'm aiming to submit a first draft by the end of the week.","이번 주말까지 초안을 내는 게 목표예요."),
 C("학교·공부","C1","It's a fascinating topic, but the scope is too broad.","흥미로운 주제지만 범위가 너무 넓어요."),
 C("학교·공부","C1","Could we narrow down the research question?","연구 질문을 좁힐 수 있을까요?"),
 C("학교·공부","C1","I've been reading up on the subject over the break.","방학 동안 그 주제를 미리 공부해 뒀어요."),
 C("학교·공부","C1","I'd appreciate it if you could look over my outline.","제 개요를 한번 봐 주시면 감사하겠어요."),
 C("학교·공부","C1","That's a really thought-provoking point.","정말 생각할 거리를 주는 지적이네요."),
 C("학교·공부","C1","I'm finding it hard to strike the right tone in my essay.","에세이 어조를 적절하게 잡기가 어려워요."),
 C("학교·공부","C1","I tend to learn best by teaching others.","남을 가르치면서 가장 잘 배우는 편이에요."),
 C("학교·공부","C1","Let's divide the reading and summarize it for each other.","읽을거리를 나눠서 서로 요약해 주자."),
 C("학교·공부","C1","The lecture really broadened my perspective.","그 강의가 내 시야를 정말 넓혀 줬어."),
 C("학교·공부","C1","I've hit a wall with this assignment.","이 과제에서 벽에 부딪혔어."),
 C("학교·공부","C1","I need to brush up on statistics before the exam.","시험 전에 통계를 다시 다져야 해."),
 C("학교·공부","C1","To what extent do you agree with the author?","저자 의견에 어느 정도 동의하세요?"),
 C("학교·공부","C1","I'm considering a gap year before graduate school.","대학원 가기 전에 1년 쉬는 걸 고려 중이에요."),
 C("학교·공부","C1","It's less about memorizing and more about understanding.","외우는 것보다 이해하는 게 중요해."),
 C("학교·공부","C1","Could you point me toward some reliable sources?","믿을 만한 자료를 좀 알려 주실래요?"),
 C("학교·공부","C1","I lost points for not citing properly.","인용을 제대로 안 해서 감점됐어."),
 C("학교·공부","C1","Group projects only work if everyone pulls their weight.","조별 과제는 다들 제 몫을 해야 굴러가.",[],"pull one's weight = 제 몫을 하다."),
 C("학교·공부","C1","I've finally found a study routine that works for me.","드디어 나한테 맞는 공부 루틴을 찾았어."),
 C("학교·공부","C1","I'd like to discuss the possibility of an extension.","기한 연장 가능성에 대해 상의드리고 싶어요."),
 C("학교·공부","C1","The more I learn, the more I realize how little I know.","배울수록 내가 얼마나 모르는지 깨닫게 돼."),
 /* 취미·여가 */
 C("취미·여가","C1","I've been meaning to take up something creative.","창의적인 걸 하나 시작하려고 했었어."),
 C("취미·여가","C1","It's become something of an obsession, to be honest.","솔직히 거의 집착 수준이 됐어."),
 C("취미·여가","C1","I find it incredibly grounding after a long week.","긴 한 주를 보내고 나면 마음을 정말 차분하게 잡아 줘."),
 C("취미·여가","C1","I'm a jack of all trades, master of none.","이것저것 다 조금씩 하는데 잘하는 건 없어."),
 C("취미·여가","C1","I've plateaued, so I'm thinking of getting a coach.","실력이 정체돼서 코치를 받아 볼까 해."),
 C("취미·여가","C1","It's surprisingly addictive once you get going.","일단 시작하면 의외로 중독성 있어."),
 C("취미·여가","C1","I'm not as competitive as I used to be.","예전만큼 승부욕이 강하진 않아."),
 C("취미·여가","C1","It's a great excuse to get out of the house.","집 밖에 나갈 좋은 핑계야."),
 C("취미·여가","C1","I'd love to turn it into a side hustle someday.","언젠가 이걸 부업으로 만들고 싶어."),
 C("취미·여가","C1","I tend to lose interest once the novelty wears off.","새로움이 사라지면 흥미를 잃는 편이야."),
 C("취미·여가","C1","We should make it a regular thing.","이걸 정기적으로 하자."),
 C("취미·여가","C1","I'm trying to put my phone down and read more.","폰을 내려놓고 책을 더 읽으려고 해."),
 C("취미·여가","C1","It took a while before it started to click.","감이 오기까지 시간이 좀 걸렸어."),
 C("취미·여가","C1","I've rediscovered my love of drawing.","그림 그리는 즐거움을 다시 찾았어."),
 C("취미·여가","C1","It's not everyone's cup of tea, but I love it.","모두의 취향은 아니지만 난 정말 좋아."),
 C("취미·여가","C1","I'm completely hooked on this podcast.","이 팟캐스트에 완전히 빠졌어."),
 C("취미·여가","C1","I like the sense of achievement when I finish something.","뭔가를 끝냈을 때의 성취감이 좋아."),
 C("취미·여가","C1","We spent the whole afternoon browsing used bookstores.","오후 내내 헌책방을 구경했어."),
 C("취미·여가","C1","I'm saving up for a proper set of gear.","제대로 된 장비를 사려고 돈 모으는 중이야."),
 C("취미·여가","C1","I'd recommend starting small and building up gradually.","작게 시작해서 조금씩 늘려 가는 걸 추천해."),
 C("취미·여가","C1","It's a nice change of pace from work.","일하다가 기분 전환하기 좋아."),
 C("취미·여가","C1","I've joined a local league, which keeps me motivated.","동네 리그에 들어가서 의욕이 유지돼."),
 C("취미·여가","C1","Once you're in the zone, time just disappears.","몰입하면 시간이 그냥 사라져.",[],"in the zone = 완전히 몰입한 상태."),
 C("취미·여가","C1","I'm a bit of a night owl, so I tend to paint late.","올빼미족이라 밤늦게 그림을 그리는 편이야."),
 C("취미·여가","C1","Some of my best memories come from those trips.","내 최고의 추억 중 몇은 그 여행들에서 나왔어."),
 /* 온라인·SNS */
 C("온라인·SNS","C1","I'm increasingly wary of how much data these apps collect.","이 앱들이 데이터를 얼마나 수집하는지 점점 경계하게 돼."),
 C("온라인·SNS","C1","The way the algorithm amplifies outrage is concerning.","알고리즘이 분노를 증폭시키는 방식이 걱정스러워."),
 C("온라인·SNS","C1","I'd hold off sharing it until it's been fact-checked.","사실 확인되기 전까진 공유하지 않을래."),
 C("온라인·SNS","C1","It's easy to lose perspective when you're constantly online.","계속 온라인에 있으면 균형 감각을 잃기 쉬워."),
 C("온라인·SNS","C1","I've unfollowed accounts that made me feel inadequate.","날 초라하게 만드는 계정들을 언팔했어."),
 C("온라인·SNS","C1","That thread sparked a really heated debate.","그 글타래가 정말 뜨거운 논쟁을 불러일으켰어."),
 C("온라인·SNS","C1","Context gets lost so easily in text messages.","문자로는 맥락이 너무 쉽게 사라져."),
 C("온라인·SNS","C1","I'm trying to be more intentional about my screen time.","화면 보는 시간을 더 의식적으로 쓰려고 해."),
 C("온라인·SNS","C1","Online, everyone seems to have an opinion on everything.","온라인에선 다들 모든 일에 의견이 있는 것 같아."),
 C("온라인·SNS","C1","It's a fine line between sharing and oversharing.","공유와 과한 공유는 종이 한 장 차이야."),
 C("온라인·SNS","C1","I'd rather discuss this in person than over text.","이건 문자보다 직접 만나서 얘기하고 싶어."),
 C("온라인·SNS","C1","That post didn't age well.","그 게시물은 시간이 지나니 민망해졌네.",[],"age well = 시간이 지나도 괜찮다."),
 C("온라인·SNS","C1","I suspect the reviews have been manipulated.","후기가 조작된 것 같아."),
 C("온라인·SNS","C1","Going viral can be a blessing and a curse.","화제가 되는 건 축복이자 저주일 수 있어."),
 C("온라인·SNS","C1","I've switched off most of my notifications to stay focused.","집중하려고 알림을 대부분 껐어."),
 C("온라인·SNS","C1","It's worth double-checking the source before you share.","공유하기 전에 출처를 다시 확인해 볼 만해."),
 C("온라인·SNS","C1","Remote meetings are efficient, but they can feel impersonal.","원격 회의는 효율적이지만 좀 삭막하게 느껴질 수 있어."),
 C("온라인·SNS","C1","I'm seriously considering deleting my account.","계정 삭제를 진지하게 고민 중이야."),
 C("온라인·SNS","C1","Social media gives you a distorted picture of other people's lives.","SNS는 남의 삶을 왜곡해서 보여 줘."),
 C("온라인·SNS","C1","The comment was clearly taken out of context.","그 댓글은 분명히 맥락이 잘린 채 퍼졌어."),
 C("온라인·SNS","C1","Using a password manager has been a game changer.","비밀번호 관리자를 쓰면서 완전히 달라졌어."),
 C("온라인·SNS","C1","It's hard to switch off when your phone is always within reach.","폰이 늘 손 닿는 곳에 있으면 쉬기가 어려워."),
 C("온라인·SNS","C1","I'd recommend muting the thread rather than arguing.","말싸움하기보다 그 글 알림을 끄는 걸 추천해."),
 C("온라인·SNS","C1","Influencer marketing has become impossible to ignore.","인플루언서 마케팅은 이제 무시할 수 없게 됐어."),
 C("온라인·SNS","C1","Technology should serve us, not the other way around.","기술은 우리를 위해 있어야지, 그 반대가 되면 안 돼.")
);

/* C1 role-plays: one per situation */
SCENARIOS.push(
 {id:"clientdinner",tag:"카페·식당",lvl:"C1",t:"거래처와 저녁 자리 이끌기",d:"레스토랑에서 거래처 Ms. Hart를 대접하기",persona:"Ms. Hart, a senior client who is polite but particular about food",setting:"An upscale restaurant. The learner is hosting an important client dinner.",missions:["메뉴를 추천하며 자연스럽게 주문 이끌기","음식 문제를 정중하게 해결하기","식사 끝에 감사와 다음 만남 제안하기"]},
 {id:"networking",tag:"스몰토크",lvl:"C1",t:"네트워킹 행사에서 대화하기",d:"업계 행사에서 Jordan과 깊이 있는 대화",persona:"Jordan, an experienced founder at an industry networking event",setting:"A networking reception. Small talk is expected to turn into a meaningful conversation.",missions:["자연스럽게 대화 시작하고 상대 일에 질문하기","내 일을 간결하고 인상 깊게 소개하기","정중하게 대화를 마무리하고 연락처 교환하기"]},
 {id:"compensation",tag:"여행",lvl:"C1",t:"항공사와 보상 협상하기",d:"취소된 항공편 보상을 직원 Morgan과 협상",persona:"Morgan, an airline service agent who follows policy closely",setting:"An airport service desk. The learner's flight was canceled and they missed a booked hotel night.",missions:["상황과 입은 손해를 차분히 설명하기","규정을 근거로 보상 요구하기","절충안을 받아들이거나 다른 안 제시하기"]},
 {id:"offer",tag:"직장·면접",lvl:"C1",t:"입사 조건 협상하기",d:"인사 담당 Alex와 연봉·근무 조건 협상",persona:"Alex, an HR manager who wants to close the hire within budget",setting:"A video call after a job offer. Salary and remote work days are on the table.",missions:["제안에 대한 감사와 관심 표현하기","근거를 들어 조건 조정 요청하기","합의 내용을 정리하고 확인하기"]},
 {id:"debate",tag:"감정·의견",lvl:"C1",t:"민감한 주제로 토론하기",d:"친구 Sam과 재택근무의 장단점 토론",persona:"Sam, a thoughtful friend who strongly prefers working in the office",setting:"A café. The two friends disagree about whether remote work is better.",missions:["내 입장을 이유와 함께 말하기","상대 의견의 일리를 인정하기","공통점을 찾아 정리하기"]},
 {id:"escalate",tag:"쇼핑",lvl:"C1",t:"고가 제품 불량 협상하기",d:"매장 매니저 Dana와 불량 노트북 해결",persona:"Dana, a store manager who wants to avoid a full refund",setting:"An electronics store. The learner's expensive laptop has a recurring fault after two repairs.",missions:["지금까지의 경과를 정확히 설명하기","원하는 해결과 그 이유 말하기","합의가 안 되면 다음 단계를 정중하게 언급하기"]},
 {id:"coordinate",tag:"전화·약속",lvl:"C1",t:"여러 사람 일정 조율하기",d:"동료 Riley와 전화로 워크숍 일정 맞추기",persona:"Riley, a busy colleague coordinating a workshop with several teams",setting:"A phone call. Three teams need to meet, and everyone's calendar is full.",missions:["가능한 시간대 제안하기","충돌하는 일정을 정중하게 조정하기","확정 내용과 다음 할 일 정리하기"]},
 {id:"treatment",tag:"병원·약국",lvl:"C1",t:"치료 방법 상담하기",d:"Dr. Kim과 치료 선택지 상담",persona:"Dr. Kim, a specialist who explains options carefully",setting:"A specialist clinic. The learner has a chronic knee problem and several treatment options.",missions:["증상의 경과와 생활 영향 설명하기","각 치료의 위험과 효과 묻기","결정 전에 필요한 정보 정리하기"]},
 {id:"depositdispute",tag:"집·생활",lvl:"C1",t:"보증금 분쟁 해결하기",d:"집주인 Mr. Lee와 보증금 공제 문제 협상",persona:"Mr. Lee, a landlord who wants to keep part of the deposit for repairs",setting:"A phone call after moving out. The landlord is deducting money for damage the learner says was already there.",missions:["공제에 동의하지 않는 이유 말하기","증거(사진·계약서)를 언급하기","합리적인 해결안 제안하기"]},
 {id:"seminar",tag:"학교·공부",lvl:"C1",t:"세미나에서 논문 토론하기",d:"Dr. Evans의 세미나에서 의견 발표",persona:"Dr. Evans, a demanding seminar leader who challenges every claim",setting:"A graduate seminar discussing a controversial research paper.",missions:["논문의 핵심 주장 요약하기","근거의 약점 하나 지적하기","반론에 대응하며 내 입장 다듬기"]},
 {id:"sidehustle",tag:"취미·여가",lvl:"C1",t:"취미를 부업으로 만드는 상담",d:"선배 Chris에게 수공예 부업 조언 구하기",persona:"Chris, a friend who turned a hobby into a successful small business",setting:"A weekend meetup. The learner wants to sell handmade goods online.",missions:["내 취미와 목표 설명하기","현실적인 어려움에 대해 묻기","조언을 바탕으로 첫 계획 정리하기"]},
 {id:"techdebate",tag:"온라인·SNS",lvl:"C1",t:"SNS의 영향에 대해 토론하기",d:"동료 Taylor와 SNS 규제 토론",persona:"Taylor, a colleague who thinks social media does more good than harm",setting:"A lunch break. The conversation turns to whether social media should be more regulated.",missions:["내 의견을 근거와 함께 말하기","상대 논리의 허점을 정중하게 짚기","균형 잡힌 결론 제안하기"]}
);

/* ---------- 30-second speaking prompts: 3 per situation × level (js/speak.js) ---------- */
const PROMPTS = [
 {tag:"카페·식당",lvl:"A1",en:"What do you usually order at a café?",ko:"카페에서 보통 뭘 주문해?"},
 {tag:"카페·식당",lvl:"A1",en:"Order a drink and a snack for yourself.",ko:"음료랑 간식을 하나씩 주문해 봐."},
 {tag:"카페·식당",lvl:"A1",en:"What is your favorite food?",ko:"제일 좋아하는 음식이 뭐야?"},
 {tag:"카페·식당",lvl:"A2",en:"Tell me about a restaurant you like and why.",ko:"좋아하는 식당 한 곳과 그 이유를 말해 줘."},
 {tag:"카페·식당",lvl:"A2",en:"You're at a café with a friend. Order for both of you.",ko:"친구랑 카페에 왔어. 둘 다 먹을 걸 주문해 봐."},
 {tag:"카페·식당",lvl:"A2",en:"What did you eat yesterday? Was it good?",ko:"어제 뭐 먹었어? 맛있었어?"},
 {tag:"카페·식당",lvl:"B1",en:"Your order is wrong. Explain the problem politely and ask for a fix.",ko:"주문이 잘못 나왔어. 정중하게 문제를 말하고 해결을 부탁해 봐."},
 {tag:"카페·식당",lvl:"B1",en:"Recommend a place to eat in your neighborhood and explain why.",ko:"동네 식당 한 곳을 추천하고 이유를 설명해 봐."},
 {tag:"카페·식당",lvl:"B1",en:"Describe the best meal you've ever had.",ko:"지금까지 먹은 최고의 식사를 설명해 봐."},
 {tag:"카페·식당",lvl:"B2",en:"You're hosting friends for dinner out. Suggest a place, handle a dietary need, and plan the bill.",ko:"친구들과 외식을 주최해. 장소를 제안하고, 식단 제한을 챙기고, 계산 방법을 정해 봐."},
 {tag:"카페·식당",lvl:"B2",en:"Is it worth paying more for a nice restaurant? Give your opinion.",ko:"좋은 식당에 돈을 더 쓸 가치가 있을까? 의견을 말해 봐."},
 {tag:"카페·식당",lvl:"B2",en:"Complain about slow service without sounding rude.",ko:"무례하지 않게 느린 서비스에 대해 항의해 봐."},
 {tag:"카페·식당",lvl:"C1",en:"Persuade a client to try a restaurant they've never heard of.",ko:"거래처 사람에게 처음 들어 보는 식당에 가 보자고 설득해 봐."},
 {tag:"카페·식당",lvl:"C1",en:"Discuss whether food reviews online can be trusted.",ko:"온라인 음식 후기를 믿을 수 있는지 논해 봐."},
 {tag:"카페·식당",lvl:"C1",en:"Give balanced feedback to a restaurant owner who asked for your honest opinion.",ko:"솔직한 의견을 물어본 식당 주인에게 균형 잡힌 피드백을 줘 봐."},
 {tag:"스몰토크",lvl:"A1",en:"Introduce yourself in a few sentences.",ko:"몇 문장으로 자기소개해 봐."},
 {tag:"스몰토크",lvl:"A1",en:"How is the weather today? How do you feel?",ko:"오늘 날씨 어때? 기분은 어때?"},
 {tag:"스몰토크",lvl:"A1",en:"Where do you live, and do you like it?",ko:"어디 살아? 거기 좋아?"},
 {tag:"스몰토크",lvl:"A2",en:"What did you do last weekend?",ko:"지난 주말에 뭐 했어?"},
 {tag:"스몰토크",lvl:"A2",en:"You meet a new coworker. Start a friendly conversation.",ko:"새 동료를 만났어. 친근하게 대화를 시작해 봐."},
 {tag:"스몰토크",lvl:"A2",en:"Tell me about your plans for this week.",ko:"이번 주 계획을 말해 줘."},
 {tag:"스몰토크",lvl:"B1",en:"Catch up with a friend you haven't seen in a year.",ko:"1년 동안 못 본 친구와 근황을 나눠 봐."},
 {tag:"스몰토크",lvl:"B1",en:"Describe your hometown to someone who has never been there.",ko:"가 본 적 없는 사람에게 고향을 설명해 봐."},
 {tag:"스몰토크",lvl:"B1",en:"You run into someone whose name you forgot. Handle it politely.",ko:"이름이 기억 안 나는 사람을 마주쳤어. 정중하게 넘겨 봐."},
 {tag:"스몰토크",lvl:"B2",en:"Keep a conversation going with a stranger at a party.",ko:"파티에서 처음 본 사람과 대화를 이어 가 봐."},
 {tag:"스몰토크",lvl:"B2",en:"Politely end a conversation that is going on too long.",ko:"너무 길어지는 대화를 정중하게 마무리해 봐."},
 {tag:"스몰토크",lvl:"B2",en:"Talk about something interesting you learned recently.",ko:"최근에 알게 된 흥미로운 걸 이야기해 봐."},
 {tag:"스몰토크",lvl:"C1",en:"Make a memorable first impression at a networking event.",ko:"네트워킹 행사에서 기억에 남는 첫인상을 남겨 봐."},
 {tag:"스몰토크",lvl:"C1",en:"Steer an awkward conversation back to a comfortable topic.",ko:"어색해진 대화를 편한 주제로 자연스럽게 돌려 봐."},
 {tag:"스몰토크",lvl:"C1",en:"Share a personal story that shows something about your values.",ko:"네 가치관이 드러나는 개인적인 이야기를 해 봐."},
 {tag:"여행",lvl:"A1",en:"Where do you want to travel? Why?",ko:"어디로 여행 가고 싶어? 왜?"},
 {tag:"여행",lvl:"A1",en:"Ask how to get to the station and say thank you.",ko:"역에 어떻게 가는지 묻고 고맙다고 말해 봐."},
 {tag:"여행",lvl:"A1",en:"Check in at a hotel.",ko:"호텔에 체크인해 봐."},
 {tag:"여행",lvl:"A2",en:"Tell me about a trip you took.",ko:"다녀온 여행 하나를 이야기해 줘."},
 {tag:"여행",lvl:"A2",en:"Ask the hotel staff for help with two things.",ko:"호텔 직원에게 두 가지를 부탁해 봐."},
 {tag:"여행",lvl:"A2",en:"What do you always pack when you travel?",ko:"여행 갈 때 늘 챙기는 게 뭐야?"},
 {tag:"여행",lvl:"B1",en:"Tell me about a trip that didn't go as planned.",ko:"계획대로 안 된 여행 이야기를 해 줘."},
 {tag:"여행",lvl:"B1",en:"Your flight is delayed. Talk to the airline staff about your options.",ko:"비행기가 지연됐어. 항공사 직원과 선택지를 이야기해 봐."},
 {tag:"여행",lvl:"B1",en:"Recommend a place in your country to a foreign visitor.",ko:"외국인 방문객에게 우리나라 여행지를 추천해 봐."},
 {tag:"여행",lvl:"B2",en:"Your room is not what you booked. Negotiate a solution.",ko:"예약한 방과 달라. 해결책을 협상해 봐."},
 {tag:"여행",lvl:"B2",en:"Is it better to travel alone or with friends? Explain.",ko:"혼자 여행과 친구와의 여행 중 뭐가 나은지 설명해 봐."},
 {tag:"여행",lvl:"B2",en:"Describe a place that changed how you see the world.",ko:"세상을 보는 눈을 바꿔 준 장소를 설명해 봐."},
 {tag:"여행",lvl:"C1",en:"Argue for or against limiting tourism in popular cities.",ko:"인기 도시의 관광객 수를 제한하는 것에 찬반 의견을 말해 봐."},
 {tag:"여행",lvl:"C1",en:"Persuade an airline agent to waive a fee, using the circumstances.",ko:"상황을 근거로 항공사 직원에게 수수료 면제를 설득해 봐."},
 {tag:"여행",lvl:"C1",en:"Reflect on what traveling has taught you.",ko:"여행이 너에게 가르쳐 준 것을 돌아보며 말해 봐."},
 {tag:"직장·면접",lvl:"A1",en:"What do you do? Where do you work or study?",ko:"무슨 일 해? 어디서 일하거나 공부해?"},
 {tag:"직장·면접",lvl:"A1",en:"Describe your typical day.",ko:"보통의 하루를 설명해 봐."},
 {tag:"직장·면접",lvl:"A1",en:"Ask a coworker for help with something.",ko:"동료에게 뭔가 도와달라고 부탁해 봐."},
 {tag:"직장·면접",lvl:"A2",en:"Tell me about your job or your studies.",ko:"네 일이나 공부에 대해 이야기해 줘."},
 {tag:"직장·면접",lvl:"A2",en:"Ask your manager for a day off.",ko:"매니저에게 하루 휴가를 요청해 봐."},
 {tag:"직장·면접",lvl:"A2",en:"Explain why you will be late for a meeting.",ko:"회의에 늦는 이유를 설명해 봐."},
 {tag:"직장·면접",lvl:"B1",en:"Answer the interview question: \"Tell me about yourself.\"",ko:"\"자기소개 해 주세요\"라는 면접 질문에 답해 봐."},
 {tag:"직장·면접",lvl:"B1",en:"Describe a problem you solved at work or school.",ko:"일이나 학교에서 해결한 문제 하나를 설명해 봐."},
 {tag:"직장·면접",lvl:"B1",en:"Give a short update on a project you're working on.",ko:"진행 중인 프로젝트 근황을 짧게 공유해 봐."},
 {tag:"직장·면접",lvl:"B2",en:"Disagree with a teammate's idea and suggest an alternative.",ko:"팀원의 아이디어에 반대하고 대안을 제안해 봐."},
 {tag:"직장·면접",lvl:"B2",en:"Answer the interview question: \"What is your biggest weakness?\"",ko:"\"가장 큰 약점이 뭐예요?\"라는 면접 질문에 답해 봐."},
 {tag:"직장·면접",lvl:"B2",en:"Ask your manager to push back a deadline, with reasons.",ko:"이유를 들어 매니저에게 마감 연기를 요청해 봐."},
 {tag:"직장·면접",lvl:"C1",en:"Negotiate a better offer without sounding ungrateful.",ko:"감사하지 않아 보이지 않게 더 나은 조건을 협상해 봐."},
 {tag:"직장·면접",lvl:"C1",en:"Lead the end of a meeting: summarize decisions and assign next steps.",ko:"회의를 마무리해 봐. 결정 사항을 요약하고 다음 할 일을 나눠 줘."},
 {tag:"직장·면접",lvl:"C1",en:"Give constructive criticism to a colleague whose work is late.",ko:"일이 늦어지는 동료에게 건설적인 비판을 해 봐."},
 {tag:"감정·의견",lvl:"A1",en:"How do you feel today? Why?",ko:"오늘 기분이 어때? 왜?"},
 {tag:"감정·의견",lvl:"A1",en:"What makes you happy?",ko:"뭐가 너를 행복하게 해?"},
 {tag:"감정·의견",lvl:"A1",en:"What do you like and not like?",ko:"좋아하는 것과 싫어하는 걸 말해 봐."},
 {tag:"감정·의견",lvl:"A2",en:"Tell me about a time you were really surprised.",ko:"정말 놀랐던 때를 이야기해 줘."},
 {tag:"감정·의견",lvl:"A2",en:"Your friend got good news. Congratulate them.",ko:"친구가 좋은 소식을 들었어. 축하해 줘."},
 {tag:"감정·의견",lvl:"A2",en:"What do you do when you are stressed?",ko:"스트레스받을 때 뭐 해?"},
 {tag:"감정·의견",lvl:"B1",en:"Give your opinion on working from home.",ko:"재택근무에 대한 의견을 말해 봐."},
 {tag:"감정·의견",lvl:"B1",en:"Comfort a friend who failed an exam.",ko:"시험에 떨어진 친구를 위로해 봐."},
 {tag:"감정·의견",lvl:"B1",en:"Describe a decision you're proud of.",ko:"자랑스러운 결정 하나를 설명해 봐."},
 {tag:"감정·의견",lvl:"B2",en:"Do you agree that social media makes people less happy? Explain.",ko:"SNS가 사람들을 덜 행복하게 만든다는 데 동의해? 설명해 봐."},
 {tag:"감정·의견",lvl:"B2",en:"Talk about something you changed your mind about.",ko:"생각이 바뀐 일 하나를 이야기해 봐."},
 {tag:"감정·의견",lvl:"B2",en:"Politely disagree with a friend's strong opinion.",ko:"친구의 강한 의견에 정중하게 반대해 봐."},
 {tag:"감정·의견",lvl:"C1",en:"Weigh the pros and cons of a four-day work week.",ko:"주 4일 근무의 장단점을 따져 봐."},
 {tag:"감정·의견",lvl:"C1",en:"Explain a complicated feeling you had about a recent event.",ko:"최근 일에 대해 느낀 복잡한 감정을 설명해 봐."},
 {tag:"감정·의견",lvl:"C1",en:"Defend an unpopular opinion you hold.",ko:"네가 가진 소수 의견 하나를 변호해 봐."},
 {tag:"쇼핑",lvl:"A1",en:"What do you want to buy? Why?",ko:"뭘 사고 싶어? 왜?"},
 {tag:"쇼핑",lvl:"A1",en:"Ask about the price and the size of a jacket.",ko:"재킷 가격과 사이즈를 물어봐."},
 {tag:"쇼핑",lvl:"A1",en:"Describe what you are wearing today.",ko:"오늘 입은 옷을 설명해 봐."},
 {tag:"쇼핑",lvl:"A2",en:"Return an item that doesn't fit.",ko:"안 맞는 물건을 반품해 봐."},
 {tag:"쇼핑",lvl:"A2",en:"Tell me about the last thing you bought.",ko:"마지막으로 산 물건 이야기를 해 줘."},
 {tag:"쇼핑",lvl:"A2",en:"Do you prefer shopping online or in stores? Why?",ko:"온라인 쇼핑과 매장 쇼핑 중 뭐가 좋아? 왜?"},
 {tag:"쇼핑",lvl:"B1",en:"Your online order arrived damaged. Explain and ask for a refund.",ko:"온라인 주문이 파손돼서 왔어. 설명하고 환불을 요청해 봐."},
 {tag:"쇼핑",lvl:"B1",en:"Help a friend choose between two phones.",ko:"친구가 휴대폰 두 개 중에 고르는 걸 도와줘."},
 {tag:"쇼핑",lvl:"B1",en:"Describe a purchase you regret.",ko:"후회하는 구매 하나를 설명해 봐."},
 {tag:"쇼핑",lvl:"B2",en:"Negotiate a better price at a market.",ko:"시장에서 가격을 더 깎아 봐."},
 {tag:"쇼핑",lvl:"B2",en:"Is it better to buy cheap things often or expensive things rarely?",ko:"싼 걸 자주 사는 것과 비싼 걸 가끔 사는 것 중 뭐가 나을까?"},
 {tag:"쇼핑",lvl:"B2",en:"Explain how you decide whether something is worth the money.",ko:"돈을 쓸 가치가 있는지 어떻게 판단하는지 설명해 봐."},
 {tag:"쇼핑",lvl:"C1",en:"Escalate a complaint to a manager after two failed repairs.",ko:"두 번 수리에 실패한 뒤 매니저에게 항의를 올려 봐."},
 {tag:"쇼핑",lvl:"C1",en:"Discuss the effects of fast fashion.",ko:"패스트 패션의 영향을 논해 봐."},
 {tag:"쇼핑",lvl:"C1",en:"Convince a friend to stop impulse buying, without lecturing them.",ko:"잔소리하지 않으면서 친구에게 충동구매를 멈추라고 설득해 봐."},
 {tag:"전화·약속",lvl:"A1",en:"Call a friend and make plans for tomorrow.",ko:"친구에게 전화해서 내일 약속을 잡아 봐."},
 {tag:"전화·약속",lvl:"A1",en:"Leave a short message for a friend.",ko:"친구에게 짧은 메시지를 남겨 봐."},
 {tag:"전화·약속",lvl:"A1",en:"Tell your friend you are late and where you are.",ko:"친구에게 늦는다고, 지금 어디인지 말해 봐."},
 {tag:"전화·약속",lvl:"A2",en:"Change a plan with a friend because something came up.",ko:"일이 생겨서 친구와 약속을 바꿔 봐."},
 {tag:"전화·약속",lvl:"A2",en:"Make a dinner reservation by phone.",ko:"전화로 저녁 예약을 해 봐."},
 {tag:"전화·약속",lvl:"A2",en:"Invite a friend to a movie and agree on a time.",ko:"친구를 영화에 초대하고 시간을 정해 봐."},
 {tag:"전화·약속",lvl:"B1",en:"Call to reschedule a doctor's appointment.",ko:"병원 예약을 바꾸려고 전화해 봐."},
 {tag:"전화·약속",lvl:"B1",en:"Leave a voicemail for a coworker about an urgent issue.",ko:"급한 일로 동료에게 음성 메시지를 남겨 봐."},
 {tag:"전화·약속",lvl:"B1",en:"Find a time that works for three busy friends.",ko:"바쁜 친구 셋이 모두 되는 시간을 찾아 봐."},
 {tag:"전화·약속",lvl:"B2",en:"Cancel plans at the last minute and make it up to your friend.",ko:"막판에 약속을 취소하고 친구에게 만회할 방법을 말해 봐."},
 {tag:"전화·약속",lvl:"B2",en:"The line keeps cutting out. Manage the call so nothing important is lost.",ko:"전화가 자꾸 끊겨. 중요한 내용을 놓치지 않게 통화를 이끌어 봐."},
 {tag:"전화·약속",lvl:"B2",en:"Set up a meeting with someone you've never met.",ko:"처음 연락하는 사람과 미팅 일정을 잡아 봐."},
 {tag:"전화·약속",lvl:"C1",en:"Coordinate a workshop across three teams with conflicting schedules.",ko:"일정이 겹치는 세 팀의 워크숍을 조율해 봐."},
 {tag:"전화·약속",lvl:"C1",en:"Politely push back when someone keeps changing the meeting time.",ko:"회의 시간을 계속 바꾸는 사람에게 정중하게 이의를 제기해 봐."},
 {tag:"전화·약속",lvl:"C1",en:"Follow up on an unanswered email without sounding impatient.",ko:"조급해 보이지 않게, 답이 없는 이메일 건으로 다시 연락해 봐."},
 {tag:"병원·약국",lvl:"A1",en:"Tell the doctor where it hurts.",ko:"의사에게 어디가 아픈지 말해 봐."},
 {tag:"병원·약국",lvl:"A1",en:"Ask for medicine for a cold.",ko:"감기약을 달라고 해 봐."},
 {tag:"병원·약국",lvl:"A1",en:"How do you feel today? Are you sick?",ko:"오늘 몸은 어때? 아파?"},
 {tag:"병원·약국",lvl:"A2",en:"Describe your symptoms and when they started.",ko:"증상과 언제부터 그랬는지 설명해 봐."},
 {tag:"병원·약국",lvl:"A2",en:"Ask the pharmacist how to take your medicine.",ko:"약사에게 약 먹는 방법을 물어봐."},
 {tag:"병원·약국",lvl:"A2",en:"Tell me what you do to stay healthy.",ko:"건강을 지키려고 하는 일을 이야기해 줘."},
 {tag:"병원·약국",lvl:"B1",en:"Explain an injury and how it happened.",ko:"다친 곳과 어떻게 다쳤는지 설명해 봐."},
 {tag:"병원·약국",lvl:"B1",en:"Call in sick to work and explain your situation.",ko:"회사에 아파서 결근한다고 연락하고 상황을 설명해 봐."},
 {tag:"병원·약국",lvl:"B1",en:"Ask the doctor about side effects and alternatives.",ko:"의사에게 부작용과 다른 방법을 물어봐."},
 {tag:"병원·약국",lvl:"B2",en:"Describe a health problem that affects your daily life.",ko:"일상에 영향을 주는 건강 문제를 설명해 봐."},
 {tag:"병원·약국",lvl:"B2",en:"Give advice to a friend who can't sleep well.",ko:"잠을 잘 못 자는 친구에게 조언해 봐."},
 {tag:"병원·약국",lvl:"B2",en:"Is it better to see a doctor early or wait? Explain.",ko:"일찍 병원에 가는 것과 기다리는 것 중 뭐가 나은지 설명해 봐."},
 {tag:"병원·약국",lvl:"C1",en:"Discuss your treatment options and the risks you're willing to accept.",ko:"치료 선택지와 감수할 수 있는 위험을 논의해 봐."},
 {tag:"병원·약국",lvl:"C1",en:"Explain why prevention matters more than cure.",ko:"예방이 치료보다 왜 중요한지 설명해 봐."},
 {tag:"병원·약국",lvl:"C1",en:"Describe how a chronic condition can affect someone's work and relationships.",ko:"만성 질환이 일과 관계에 어떤 영향을 주는지 설명해 봐."},
 {tag:"집·생활",lvl:"A1",en:"Describe your room.",ko:"네 방을 설명해 봐."},
 {tag:"집·생활",lvl:"A1",en:"What do you do every morning?",ko:"매일 아침 뭐 해?"},
 {tag:"집·생활",lvl:"A1",en:"Ask someone to help you at home.",ko:"집에서 도와달라고 부탁해 봐."},
 {tag:"집·생활",lvl:"A2",en:"Tell your roommate which chores you will do.",ko:"룸메이트에게 네가 할 집안일을 말해 봐."},
 {tag:"집·생활",lvl:"A2",en:"Something in your home is broken. Explain the problem.",ko:"집에 뭔가 고장 났어. 문제를 설명해 봐."},
 {tag:"집·생활",lvl:"A2",en:"Describe your perfect weekend at home.",ko:"집에서 보내는 완벽한 주말을 설명해 봐."},
 {tag:"집·생활",lvl:"B1",en:"Ask your landlord to fix something and when they can come.",ko:"집주인에게 수리를 부탁하고 언제 올 수 있는지 물어봐."},
 {tag:"집·생활",lvl:"B1",en:"Your neighbor is too loud. Talk to them politely.",ko:"이웃이 너무 시끄러워. 정중하게 이야기해 봐."},
 {tag:"집·생활",lvl:"B1",en:"Describe the place you'd like to live in the future.",ko:"앞으로 살고 싶은 집을 설명해 봐."},
 {tag:"집·생활",lvl:"B2",en:"Set fair rules for sharing an apartment.",ko:"아파트를 같이 쓰는 공정한 규칙을 정해 봐."},
 {tag:"집·생활",lvl:"B2",en:"Is it better to rent or to buy a home? Explain.",ko:"집은 빌리는 게 나을까, 사는 게 나을까? 설명해 봐."},
 {tag:"집·생활",lvl:"B2",en:"Talk about the pros and cons of living alone.",ko:"혼자 사는 것의 장단점을 이야기해 봐."},
 {tag:"집·생활",lvl:"C1",en:"Negotiate the return of your deposit with a difficult landlord.",ko:"까다로운 집주인과 보증금 반환을 협상해 봐."},
 {tag:"집·생활",lvl:"C1",en:"Discuss how working from home changes family life.",ko:"재택근무가 가족생활을 어떻게 바꾸는지 논해 봐."},
 {tag:"집·생활",lvl:"C1",en:"Persuade your housemates to cut energy costs together.",ko:"같이 사는 사람들에게 에너지 비용을 함께 줄이자고 설득해 봐."},
 {tag:"학교·공부",lvl:"A1",en:"What subjects do you like? Why?",ko:"좋아하는 과목이 뭐야? 왜?"},
 {tag:"학교·공부",lvl:"A1",en:"Ask your teacher a question about the homework.",ko:"선생님께 숙제에 대해 질문해 봐."},
 {tag:"학교·공부",lvl:"A1",en:"Why are you learning English?",ko:"왜 영어를 배워?"},
 {tag:"학교·공부",lvl:"A2",en:"Tell me about your best teacher.",ko:"최고의 선생님 이야기를 해 줘."},
 {tag:"학교·공부",lvl:"A2",en:"Explain how you study for a test.",ko:"시험공부를 어떻게 하는지 설명해 봐."},
 {tag:"학교·공부",lvl:"A2",en:"You missed a class. Ask a classmate what you missed.",ko:"수업을 빠졌어. 친구에게 뭘 놓쳤는지 물어봐."},
 {tag:"학교·공부",lvl:"B1",en:"Ask your professor for an extension and explain why.",ko:"교수님께 기한 연장을 요청하고 이유를 설명해 봐."},
 {tag:"학교·공부",lvl:"B1",en:"Describe the best way to learn a language.",ko:"언어를 배우는 가장 좋은 방법을 설명해 봐."},
 {tag:"학교·공부",lvl:"B1",en:"Talk about a mistake that taught you something.",ko:"뭔가를 가르쳐 준 실수 이야기를 해 봐."},
 {tag:"학교·공부",lvl:"B2",en:"Divide tasks fairly in a group project.",ko:"조별 과제 일을 공평하게 나눠 봐."},
 {tag:"학교·공부",lvl:"B2",en:"Should university be free? Give your opinion.",ko:"대학은 무료여야 할까? 의견을 말해 봐."},
 {tag:"학교·공부",lvl:"B2",en:"Explain a difficult idea you learned in simple terms.",ko:"배운 어려운 개념을 쉽게 풀어 설명해 봐."},
 {tag:"학교·공부",lvl:"C1",en:"Challenge an argument in a reading and support your view.",ko:"읽은 글의 주장에 반론하고 네 입장을 뒷받침해 봐."},
 {tag:"학교·공부",lvl:"C1",en:"Discuss whether AI tools help or hurt learning.",ko:"AI 도구가 학습에 도움이 되는지 해가 되는지 논해 봐."},
 {tag:"학교·공부",lvl:"C1",en:"Summarize a topic you know well for someone new to it.",ko:"잘 아는 주제를 처음 접하는 사람에게 요약해 줘."},
 {tag:"취미·여가",lvl:"A1",en:"What do you do on weekends?",ko:"주말에 뭐 해?"},
 {tag:"취미·여가",lvl:"A1",en:"Tell me about your hobby.",ko:"네 취미를 말해 줘."},
 {tag:"취미·여가",lvl:"A1",en:"What sports do you like?",ko:"어떤 운동 좋아해?"},
 {tag:"취미·여가",lvl:"A2",en:"Tell me about a movie or show you liked.",ko:"좋았던 영화나 드라마 이야기를 해 줘."},
 {tag:"취미·여가",lvl:"A2",en:"Invite a friend to do your hobby with you.",ko:"친구에게 네 취미를 같이 하자고 해 봐."},
 {tag:"취미·여가",lvl:"A2",en:"What did you do for fun when you were a kid?",ko:"어릴 때 재미로 뭐 했어?"},
 {tag:"취미·여가",lvl:"B1",en:"Describe a hobby you'd like to start and why.",ko:"시작하고 싶은 취미와 그 이유를 설명해 봐."},
 {tag:"취미·여가",lvl:"B1",en:"Recommend a book, show, or game to a friend.",ko:"친구에게 책이나 드라마, 게임을 추천해 봐."},
 {tag:"취미·여가",lvl:"B1",en:"How do you relax after a busy week?",ko:"바쁜 한 주를 보내고 어떻게 쉬어?"},
 {tag:"취미·여가",lvl:"B2",en:"Talk about a hobby you gave up and why.",ko:"그만둔 취미와 그 이유를 이야기해 봐."},
 {tag:"취미·여가",lvl:"B2",en:"Are hobbies more fun alone or with others? Explain.",ko:"취미는 혼자가 재밌을까, 함께가 재밌을까? 설명해 봐."},
 {tag:"취미·여가",lvl:"B2",en:"Describe how a hobby has changed you.",ko:"취미가 너를 어떻게 바꿨는지 설명해 봐."},
 {tag:"취미·여가",lvl:"C1",en:"Discuss whether turning a hobby into a job is a good idea.",ko:"취미를 직업으로 바꾸는 게 좋은 생각인지 논해 봐."},
 {tag:"취미·여가",lvl:"C1",en:"Explain why some people find repetitive hobbies relaxing.",ko:"어떤 사람들은 왜 반복적인 취미에서 편안함을 느끼는지 설명해 봐."},
 {tag:"취미·여가",lvl:"C1",en:"Persuade a busy friend to make time for a hobby.",ko:"바쁜 친구에게 취미 생활할 시간을 내라고 설득해 봐."},
 {tag:"온라인·SNS",lvl:"A1",en:"What apps do you use every day?",ko:"매일 쓰는 앱이 뭐야?"},
 {tag:"온라인·SNS",lvl:"A1",en:"Describe a photo you posted.",ko:"올린 사진 하나를 설명해 봐."},
 {tag:"온라인·SNS",lvl:"A1",en:"How much time do you spend on your phone?",ko:"폰을 얼마나 오래 봐?"},
 {tag:"온라인·SNS",lvl:"A2",en:"Tell me about a video you watched recently.",ko:"최근에 본 영상 이야기를 해 줘."},
 {tag:"온라인·SNS",lvl:"A2",en:"Ask a friend to help you with a phone problem.",ko:"친구에게 폰 문제를 도와달라고 해 봐."},
 {tag:"온라인·SNS",lvl:"A2",en:"Do you like posting on social media? Why?",ko:"SNS에 글 올리는 거 좋아해? 왜?"},
 {tag:"온라인·SNS",lvl:"B1",en:"Explain how you protect your account online.",ko:"온라인에서 계정을 어떻게 지키는지 설명해 봐."},
 {tag:"온라인·SNS",lvl:"B1",en:"Talk about something that went viral and what you think of it.",ko:"화제가 된 것 하나와 네 생각을 이야기해 봐."},
 {tag:"온라인·SNS",lvl:"B1",en:"Give tips for a good video call.",ko:"화상 통화를 잘하는 팁을 줘 봐."},
 {tag:"온라인·SNS",lvl:"B2",en:"Should social media have age limits? Explain.",ko:"SNS에 나이 제한이 있어야 할까? 설명해 봐."},
 {tag:"온라인·SNS",lvl:"B2",en:"How do you decide whether something online is true?",ko:"온라인 정보가 사실인지 어떻게 판단해?"},
 {tag:"온라인·SNS",lvl:"B2",en:"Describe the good and bad sides of working online.",ko:"온라인으로 일하는 것의 좋은 점과 나쁜 점을 설명해 봐."},
 {tag:"온라인·SNS",lvl:"C1",en:"Discuss how algorithms shape what we believe.",ko:"알고리즘이 우리가 믿는 것을 어떻게 만드는지 논해 봐."},
 {tag:"온라인·SNS",lvl:"C1",en:"Argue for or against stricter rules for social media companies.",ko:"SNS 회사에 더 엄격한 규칙을 두는 것에 찬반 의견을 말해 봐."},
 {tag:"온라인·SNS",lvl:"C1",en:"Reflect on how your online habits have changed over the years.",ko:"몇 년 사이 네 온라인 습관이 어떻게 바뀌었는지 돌아보며 말해 봐."}
];

/* ---------- WORDS: headword → {pos, ko, band, forms, parts, story, idiom}
   band ≈ frequency: 1 = top ~1,000, 2 = ~1,001–3,000, 3 = rarer (approximate, after NGSL/COCA ranks).
   parts "a=b|c=d" = word parts and their meanings; story = one-line memory hook (etymology or image). ---------- */
const WORDS = {};
const WORD_IGNORE = ["kim","instagram","wi","fi"];
const W = (w, pos, ko, band, x={}) => { WORDS[w] = {w, pos, ko, band, forms:(x.f||"").split(" ").filter(Boolean),
  parts:(x.p||"").split("|").filter(Boolean).map(s=>{ const [p,m] = s.split("="); return {p, m}; }), story:x.s||"", idiom:!!x.i, e:x.e||null}; };
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
W("transfer","동사","갈아타다, 송금하다, 옮기다",2,{p:"trans=건너|fer=나르다",s:"이쪽에서 저쪽으로 건너(trans) 옮겨 가다"});
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
W("counter","명사","계산대, 카운터",2,{s:"over the counter = 계산대 너머로 바로 파는 → 처방전 없이 사는",i:1});
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

/* ---------- phase 3 role-play scenes: every situation now has two, at different levels ---------- */
SCENARIOS.push(
 {id:"mingle",tag:"스몰토크",lvl:"B2",t:"파티에서 처음 만난 사람과 대화",d:"친구 생일 파티에서 Taylor와 첫인사",persona:"Taylor, an outgoing guest at a friend's birthday party who works in design",setting:"A birthday party. The learner and Taylor only know the host and start chatting by the snacks.",missions:["어떻게 주인공을 아는지 말하기","상대 이야기에 관심 보이며 더 묻기","연락처를 주고받자고 하기"]},
 {id:"movie",tag:"감정·의견",lvl:"B1",t:"영화 보고 의견 나누기",d:"친구 Casey와 방금 본 영화 이야기",persona:"Casey, a friend who just watched a movie with the learner and has strong opinions",setting:"Leaving the theater. Casey loved the movie; the learner is not so sure.",missions:["좋았던 점 하나 말하기","아쉬웠던 점을 부드럽게 말하기","상대 의견에 일부 동의하기"]},
 {id:"refund",tag:"쇼핑",lvl:"B2",t:"온라인 주문 환불 받기",d:"고객센터 Lee에게 파손 상품 환불 요청",persona:"Lee, a polite but rule-following customer service agent for an online store",setting:"A support chat. The learner's order arrived damaged and late.",missions:["무엇이 문제인지 설명하기","원하는 해결(환불이나 교환) 요청하기","배송비나 보상도 요청해 보기"]},
 {id:"meetup",tag:"전화·약속",lvl:"A1",t:"친구와 만날 시간 정하기",d:"친구 Ben과 전화로 내일 약속 잡기",persona:"Ben, a friendly classmate calling the learner",setting:"A short phone call about meeting tomorrow.",missions:["내일 시간이 되는지 답하기","만날 시간 정하기","만날 장소 정하기"]},
 {id:"clinic",tag:"병원·약국",lvl:"B1",t:"병원에서 증상 설명하기",d:"Dr. Patel에게 진료받기",persona:"Dr. Patel, a calm family doctor",setting:"A doctor's office. The learner has felt sick for a few days.",missions:["증상과 시작된 때 말하기","먹고 있는 약이나 알레르기 말하기","회복 기간이나 주의할 점 묻기"]},
 {id:"chores",tag:"집·생활",lvl:"A2",t:"룸메이트와 집안일 나누기",d:"룸메이트 Kai와 이번 주 집안일 정하기",persona:"Kai, a relaxed roommate who often forgets chores",setting:"The kitchen on Sunday evening. The apartment is a bit of a mess.",missions:["내가 할 일 말하기","상대에게 할 일 부탁하기","장 볼 것 정하기"]},
 {id:"teamwork",tag:"학교·공부",lvl:"B2",t:"조별 과제 역할 나누기",d:"조원 Avery와 발표 준비 조율",persona:"Avery, a classmate in the learner's project group who wants to do everything at the last minute",setting:"A study room. The group presentation is next week.",missions:["일정에 대한 걱정 말하기","역할을 나누자고 제안하기","마감일 정하기"]},
 {id:"cooking",tag:"취미·여가",lvl:"B1",t:"취미 수업 등록 상담",d:"요리 교실 직원 Rosa와 상담",persona:"Rosa, a staff member at a community cooking school",setting:"The front desk of a cooking school. The learner wants to start a new hobby.",missions:["배우고 싶은 것과 이유 말하기","수업 시간과 비용 묻기","초보도 괜찮은지 묻기"]},
 {id:"techhelp",tag:"온라인·SNS",lvl:"A2",t:"친구에게 폰 문제 도움 받기",d:"친구 Sky에게 앱 문제 물어보기",persona:"Sky, a friend who is good with phones and apps",setting:"A café. The learner's app keeps crashing and they can't log in.",missions:["무슨 문제인지 말하기","해 본 것을 말하기","방법을 다시 알려 달라고 하기"]}
);

/* ---------- phase 3 words (new chunks) ---------- */
WORD_IGNORE.push("gets");
W("decide","동사","결정하다",1,{f:"decided decides deciding"});
F("coffee","coffees");
F("thank","thanks");
F("wait","waiting");
F("reservation","reservations");
F("pack","packed");
F("weekend","weekends");
F("thing","things");
F("way","ways");
F("hand","hands");
F("ask","asking");
F("look","looks");
F("hold","holding");
F("bag","bags");
F("place","places");
F("plan","planning plans");
F("cancel","canceling canceled");
F("photo","photos");
F("work","worked");
F("year","years");
F("number","numbers");
F("head","heads");
F("start","starting");
F("side","sides");
F("price","prices");
F("eye","eyeing eyes");
F("week","weeks");
F("buy","buying");
F("shop","shopping");
F("return","returned returning");
F("call","called");
F("change","changes");
F("sleep","sleeping");
F("show","shows");
F("light","lights");
F("clean","cleaned cleans");
F("deal","dealing");
F("cover","covered");
F("bill","bills");
F("turn","turns turned turning");
F("class","classes");
F("close","closes");
F("point","points");
F("study","studied");
F("word","words");
F("mistake","mistakes");
F("try","tried");
F("game","games");
F("friend","friends");
F("join","joining");
F("train","training");
F("sign","signed");
F("ticket","tickets");
F("video","videos");
F("hobby","hobbies");
F("love","loves");
F("die","dies");
F("watch","watching");
F("clear","clearing clearly");
F("recommend","recommending");
F("pay","paid");
W("latte","명사","라테",2,{f: "lattes", s: "라테는 이탈리아어로 '우유'라는 뜻이에요."});
W("straw","명사","빨대, 짚",2,{f: "straws"});
W("excuse","동사·명사","용서하다, 핑계",1,{f: "excused excuses"});
W("sit","동사","앉다",1,{f: "sits sat sitting"});
W("extra","형용사·명사","추가의, 여분의",1,{f: "extras"});
W("oat","명사","귀리",3,{f: "oats"});
W("dessert","명사","디저트, 후식",2,{f: "desserts", s: "프랑스어 desservir(상을 치우다)에서 왔어요. 식탁을 치운 뒤 먹는 것."});
W("napkin","명사","냅킨",2,{f: "napkins"});
W("decaf","명사·형용사","디카페인 (커피)",3,{p: "de=없애다|caf=카페인"});
W("box","명사","상자, 포장 용기",1,{f: "boxes"});
W("kid","명사","아이",1,{f: "kids kids'"});
W("warm","동사·형용사","데우다, 따뜻한",1,{f: "warmer warmed"});
W("large","형용사","큰",1,{f: "larger largest"});
W("instead","부사","대신에",1);
W("sweet","형용사","단, 달콤한",1,{f: "sweeter"});
W("salad","명사","샐러드",2,{f: "salads"});
W("while","명사·접속사","동안, 잠시",1);
W("tell","동사","말하다, 알려 주다",1,{f: "tells told telling"});
W("popular","형용사","인기 있는",1,{p: "popul=사람들(people)|ar=~의", s: "사람들이 좋아하는 것이 인기 있는 것."});
W("four","숫자","넷, 4",1);
W("swap","동사","바꾸다",2,{f: "swapped swapping"});
W("fries","명사","감자튀김",2);
W("else","부사","그 밖의, 다른",1);
W("bring","동사","가져오다",1,{f: "brings brought bringing"});
W("onion","명사","양파",2,{f: "onions"});
W("suggest","동사","제안하다, 추천하다",1,{f: "suggested suggests"});
W("quiet","형용사","조용한",1,{f: "quieter quietest quietly"});
W("expect","동사","예상하다, 기대하다",1,{f: "expected expects expecting"});
W("overcook","동사","너무 익히다",3,{f: "overcooked", p: "over=지나치게|cook=익히다"});
W("mind","동사·명사","꺼리다, 마음",1,{f: "minds"});
W("dutch","형용사","네덜란드의, (go Dutch) 각자 내다",3,{s: "go Dutch(각자 내기)는 네덜란드 사람이 각자 계산한다는 옛 영어권의 고정관념에서 왔어요."});
W("treat","동사·명사","대접하다, 한턱",1,{f: "treated treats"});
W("always","부사","항상",1);
W("portion","명사","(음식의) 1인분, 양",2,{f: "portions"});
W("huge","형용사","거대한, 엄청난",1);
F("hear","heard hears");
W("rich","형용사","(맛이) 진하고 기름진, 부유한",1,{f: "richer"});
W("tight","형용사","빠듯한, 꽉 끼는",1,{f: "tighter"});
W("flavor","명사","맛, 풍미",2,{f: "flavors"});
W("complement","동사","보완하다, 잘 어울리다",3,{f: "complements", p: "com=함께|ple=채우다|ment=~것", s: "서로 빈 곳을 함께 채워 주는 것."});
W("crave","동사","몹시 먹고 싶다",3,{f: "craving craved"});
W("pasta","명사","파스타",2);
W("ever","부사","(지금까지) 한 번이라도",1);
W("fine","형용사","괜찮은, 좋은",1);
W("live","동사","살다",1,{f: "lived lives living"});
W("seoul","고유명사","서울",1);
W("welcome","형용사·감탄사","환영받는, 천만에요",1);
W("care","명사·동사","조심, 돌봄, 신경 쓰다",1,{f: "cares cared"});
W("korea","고유명사","한국",1);
W("trip","명사","여행",1,{f: "trips"});
W("shirt","명사","셔츠",1,{f: "shirts"});
W("family","명사","가족",1,{f: "families"});
W("enjoy","동사","즐기다",1,{f: "enjoying enjoyed enjoys"});
W("party","명사","파티",1,{f: "parties"});
W("person","명사","사람, (in person) 직접",1);
W("coincidence","명사","우연의 일치",3,{p: "co=함께|incid=일어나다|ence=~것", s: "두 일이 함께 일어나는 것."});
W("end","동사·명사","끝나다, 끝",1,{f: "ended ends"});
W("restaurant","명사","식당",1,{f: "restaurants", s: "프랑스어 restaurer(기운을 회복시키다)에서 왔어요. 원래 기운 나게 하는 수프를 파는 곳."});
W("rain","동사·명사","비가 오다, 비",1,{f: "rained raining"});
W("glad","형용사","기쁜",1);
W("hang","동사","(hang out) 어울려 놀다, 걸다",2,{f: "hanging hung"});
W("recognize","동사","알아보다",2,{f: "recognized", p: "re=다시|cogn=알다|ize=~하다", s: "전에 알던 걸 다시 알아보는 것."});
W("face","명사","얼굴",1,{f: "faces"});
W("familiar","형용사","낯익은, 익숙한",2,{p: "famil=가족|iar=~의", s: "가족처럼 익숙한 것."});
W("somewhere","부사","어딘가에서",1,{p: "some=어떤|where=곳"});
W("talker","명사","말하는 사람, 수다쟁이",3,{f: "talkers"});
W("listener","명사","듣는 사람",2,{f: "listeners", p: "listen=듣다|er=~하는 사람"});
W("boat","명사","배, 보트",1,{f: "boats"});
W("interrupt","동사","방해하다, 말을 끊다",2,{f: "interrupted", p: "inter=사이에|rupt=깨다", s: "말 사이를 깨고 들어오는 것."});
W("quick","형용사","빠른, 간단한",1,{f: "quicker"});
W("exhausted","형용사","기진맥진한",2,{p: "ex=밖으로|haust=퍼내다", s: "힘을 밖으로 다 퍼내 버린 상태."});
W("mention","동사","언급하다",1,{f: "mentioned"});
W("hotel","명사","호텔",1,{f: "hotels"});
W("round","형용사","둥근, (round-trip) 왕복의",1);
W("exit","명사","출구",1,{f: "exits"});
W("passport","명사","여권",2,{f: "passports", p: "pass=지나가다|port=항구", s: "항구를 지나갈 때 보여 주던 문서."});
W("tourist","명사","관광객",2,{f: "tourists", p: "tour=여행|ist=~하는 사람"});
W("gate","명사","게이트, 문",1,{f: "gates"});
W("twelve","숫자","열둘, 12",1);
W("city","명사","도시",1,{f: "cities"});
W("center","명사","중심, 시내",1,{f: "centers"});
W("write","동사","쓰다",1,{f: "wrote written writing"});
W("beach","명사","해변",1,{f: "beaches"});
W("towel","명사","수건",2,{f: "towels"});
W("money","명사","돈",1);
W("safe","형용사","안전한",1,{f: "safer"});
W("nearby","부사·형용사","근처에",2,{p: "near=가까이|by=옆에"});
W("travel","동사·명사","여행하다, 여행",1,{f: "traveling traveled travels"});
W("alone","부사","혼자",1);
W("extend","동사","연장하다",2,{f: "extended", p: "ex=밖으로|tend=늘이다"});
W("stay","동사·명사","머무르다, 숙박",1,{f: "stays stayed staying"});
W("switch","동사","바꾸다, 전환하다",1,{f: "switched"});
W("sim","명사","(SIM card) 유심",3);
W("layover","명사","경유 대기 시간",3,{p: "lay=머물다|over=넘어서"});
W("air","명사","공기, (air conditioning) 에어컨",1);
W("conditioning","명사","(air conditioning) 냉방",3,{p: "condition=상태|ing=~하기", s: "공기의 상태를 맞추는 것이 에어컨."});
W("wake","동사","깨다, 깨우다",1,{f: "woke waking"});
W("six","숫자","여섯, 6",1);
W("available","형용사","이용 가능한, 비어 있는",1,{p: "avail=쓸모 있다|able=~할 수 있는"});
W("car","명사","자동차",1,{f: "cars"});
W("fee","명사","수수료, 요금",2,{f: "fees"});
W("weight","명사","무게",1);
W("limit","명사","제한",1,{f: "limits"});
W("report","동사·명사","신고하다, 보고서",1,{f: "reported reports"});
W("wallet","명사","지갑",2,{f: "wallets"});
W("shoestring","명사","(on a shoestring) 아주 적은 돈으로",3,{p: "shoe=신발|string=끈", s: "신발 끈만큼 가늘고 적은 돈."});
W("budget","명사","예산",2,{f: "budgets"});
W("direction","명사","방향",1,{f: "directions", p: "di=떨어져|rect=곧게|ion=~것"});
W("bearings","명사","(get one's bearings) 방향 감각",3,{p: "bear=지니다|ing=~것", s: "배가 지닌 방향을 확인하던 항해 용어에서 왔어요."});
W("stuck","형용사","꼼짝 못 하는",2);
W("chance","명사","가능성, 기회",1,{f: "chances"});
W("checkout","명사","체크아웃, 계산대",2,{p: "check=확인하다|out=나가다"});
W("avoid","동사","피하다",1,{f: "avoided"});
W("trap","명사","함정, (tourist trap) 바가지 관광지",2,{f: "traps"});
W("once","부사","한 번",1);
W("lifetime","명사","일생",2,{p: "life=삶|time=시간"});
W("experience","명사·동사","경험, 겪다",1,{f: "experiences", p: "ex=밖으로|peri=시도하다|ence=~것", s: "직접 나가서 시도해 본 것."});
W("crowd","명사","사람들, 군중",2,{f: "crowds crowded"});
W("compensate","동사","보상하다",3,{f: "compensated", p: "com=함께|pens=무게를 달다|ate=~하다", s: "저울에 함께 올려 균형을 맞추는 것."});
W("happen","동사","(do you happen to) 혹시, 일어나다",1,{f: "happened"});
W("museum","명사","박물관",2,{f: "museums"});
W("monday","고유명사","월요일",1,{f: "mondays"});
W("scenic","형용사","경치가 좋은",3);
W("route","명사","길, 경로",2,{f: "routes"});
W("bug","명사","벌레, (travel bug) 여행병, 가벼운 병",2,{f: "bugs"});
W("okay","형용사·감탄사","괜찮은",1);
W("designer","명사","디자이너",2,{f: "designers", p: "design=디자인하다|er=~하는 사람"});
W("desk","명사","책상, 자리",1);
W("lunchtime","명사","점심시간",2,{p: "lunch=점심|time=시간"});
W("printer","명사","프린터",2,{p: "print=인쇄하다|er=~하는 기계"});
W("lunch","명사","점심",1);
W("together","부사","함께",1,{p: "to=~에|gather=모이다", s: "한데 모이는 것."});
W("finish","동사","끝내다",1,{f: "finished finishes"});
W("print","동사","출력하다",1,{f: "printed"});
W("apply","동사","지원하다, 신청하다",1,{f: "applied applying applies"});
W("business","명사","사업, (business card) 명함",1,{p: "busy=바쁜|ness=~함", s: "바쁘게 하는 일이 사업."});
W("tuesday","고유명사","화요일",1);
W("challenge","명사","도전",1,{f: "challenges", s: "중세 프랑스어 chalenge(비난, 결투 신청)에서 왔어요. 맞서 보자는 것."});
W("pressure","명사","압박, 부담",1,{p: "press=누르다|ure=~것"});
W("agenda","명사","안건, 회의 일정",2,{s: "라틴어로 '해야 할 일들'이라는 뜻."});
W("loop","명사","고리, (keep in the loop) 계속 공유하다",2);
W("reply","명사·동사","답장, 답하다",1,{f: "replied"});
W("step","명사","단계",1,{f: "steps"});
W("able","형용사","~할 수 있는",1);
W("salary","명사","연봉, 급여",2,{s: "라틴어 salarium(소금 값)에서 왔다는 설명이 널리 알려져 있어요."});
W("discussion","명사","논의",1,{p: "dis=따로|cuss=흔들다|ion=~것", s: "생각을 흔들어 따로 나눠 보는 것."});
W("track","명사","궤도, (on track) 순조로운",1);
F("big","biggest");
W("weakness","명사","약점",2,{p: "weak=약한|ness=~함"});
W("perfectionist","명사","완벽주의자",3,{p: "perfect=완벽한|ion=~것|ist=~하는 사람"});
W("relocate","동사","이전하다, 이사하다",3,{f: "relocating relocated", p: "re=다시|loc=장소|ate=~하다"});
W("opportunity","명사","기회",1,{p: "op=~쪽으로|port=항구|unity=~것", s: "항구 쪽으로 부는 좋은 바람에서 나온 말."});
W("lose","동사","잃다, 놓치다",1,{f: "lost losing"});
W("sight","명사","시야",2);
W("sidetrack","동사","딴 데로 새게 하다",3,{f: "sidetracked", p: "side=옆|track=길", s: "기차가 옆길로 빠지는 것."});
W("ballpark","명사·형용사","대략의 (수치)",3,{p: "ball=공|park=경기장", s: "야구장 안 어딘가라는 데서 '대충 그 범위'라는 뜻이 됐어요."});
W("figure","명사","수치",1,{f: "figures"});
W("prioritize","동사","우선순위를 두다",2,{p: "prior=먼저|ity=~것|ize=~하다"});
W("respectfully","부사","정중하게",3,{p: "respect=존중|ful=~가득한|ly=~하게"});
W("excited","형용사","신난",1);
W("scared","형용사","무서운, 겁먹은",1);
W("bored","형용사","심심한, 지루한",1);
W("cool","형용사","멋진, 시원한",1);
W("angry","형용사","화난",1);
W("neither","부사","(me neither) 나도 아니야",2);
W("idea","명사","생각, 아이디어",1,{f: "ideas"});
W("fair","형용사","공평한",1);
W("proud","형용사","자랑스러운",1);
W("fault","명사","잘못",2);
W("surprised","형용사","놀란",1,{p:"sur=위에서|prise=잡다|ed=~된"});
W("stressed","형용사","스트레스받은",2,{p:"stress=압박|ed=~된"});
W("amazing","형용사","놀라운, 굉장한",1);
W("news","명사","소식, 뉴스",1);
W("expensive","형용사","비싼",1,{p: "ex=밖으로|pens=무게를 달다|ive=~한", s: "밖으로 많이 달아서 내줘야 하는 것."});
W("depend","동사","~에 달려 있다",1,{f: "depends depended"});
W("situation","명사","상황",1,{p: "situ=위치|ation=~것"});
W("fed","형용사","(fed up) 지긋지긋한",2);
W("exactly","부사","정확히",1);
W("nobody","대명사","아무도 ~않다",1);
W("listen","동사","듣다",1,{f: "listens listening listened"});
W("relieved","형용사","안심한",2,{p:"re=다시|lieve=가볍게 하다|ed=~된"});
W("annoyed","형용사","짜증 난",2);
W("hard","형용사","어려운, 열심히",1,{f: "harder"});
W("grateful","형용사","고마워하는",2,{p: "grate=기쁜|ful=~가득한"});
W("cheer","동사","(cheer up) 기운 나게 하다",2,{f: "cheered"});
W("use","동사","쓰다, (used to) 익숙한",1,{f: "used uses using"});
W("personally","부사","개인적으로",1,{p: "person=사람|al=~의|ly=~하게"});
W("prefer","동사","더 좋아하다",1,{f: "preferred"});
W("wit","명사","기지, (at my wit's end) 어쩔 줄 모르는",3);
W("double","형용사","두 배의, 양쪽의",1);
W("edged","형용사","날이 있는",3,{s: "double-edged = 양쪽에 날이 선 칼처럼 좋기도 나쁘기도 한 것."});
W("sword","명사","칼, 검",2);
W("argument","명사","주장, 논쟁",1,{f: "arguments", p: "argu=밝히다|ment=~것"});
W("pleasantly","부사","기분 좋게",3,{p: "pleas=기쁘게 하다|ant=~한|ly=~하게"});
W("weigh","동사","무게가 나가다, (weigh on) 마음을 짓누르다",2,{f: "weighing weighed"});
W("sugarcoat","동사","좋게 포장하다",3,{p: "sugar=설탕|coat=입히다", s: "쓴 약에 설탕을 입혀 삼키기 쉽게 만드는 데서 왔어요."});
W("apologize","동사","사과하다",1,{f: "apologized", p: "apo=떨어져|log=말|ize=~하다", s: "원래 자신을 변호하는 말에서 '사과하다'로 바뀌었어요."});
W("beside","전치사","옆에, (beside the point) 요점에서 벗어난",2);
W("thought","명사","생각",1,{f: "thoughts"});
W("surprise","명사·동사","놀람, 놀라게 하다",1,{p: "sur=위에서|prise=잡다", s: "위에서 갑자기 붙잡는 것."});
W("cloud","명사","구름",1,{f: "clouds"});
W("nine","숫자","아홉, 9",1);
W("respect","명사·동사","존중, 존경하다",1);
W("color","명사","색",1,{f: "colors"});
W("sell","동사","팔다",1,{f: "sold sells selling"});
W("battery","명사","건전지, 배터리",1,{f: "batteries"});
W("mom","명사","엄마",1);
W("coupon","명사","쿠폰",2,{f: "coupons"});
W("deliver","동사","배달하다",1,{f: "delivered"});
W("line","명사","줄",1,{f: "lines"});
W("style","명사","스타일",1);
W("installment","명사","할부금",3,{f: "installments", p: "in=안에|stall=자리|ment=~것"});
W("overcharge","동사","돈을 더 받다",3,{f: "overcharged", p: "over=지나치게|charge=청구하다"});
W("zipper","명사","지퍼",2);
W("washable","형용사","물빨래 가능한",3,{p: "wash=빨다|able=~할 수 있는"});
W("casual","형용사","편한, 캐주얼한",2);
W("shipping","명사","배송",2,{p: "ship=보내다|ing=~하기", s: "원래 배로 보내는 것에서 모든 배송을 뜻하게 됐어요."});
W("tailor","동사·명사","(옷을) 맞추다, 재단사",3,{f: "tailored"});
W("clearance","명사","재고 정리 (세일)",3,{p: "clear=비우다|ance=~것", s: "가게를 비우려고 싸게 파는 것."});
W("compare","동사","비교하다",1,{f: "compared"});
W("sensitive","형용사","민감한",2,{p: "sens=느끼다|itive=~한"});
W("skin","명사","피부",1);
W("month","명사","달, 월",1,{f: "months"});
W("pricey","형용사","비싼",3);
W("quality","명사","품질",1);
W("throw","동사","던지다, (throw in) 덤으로 주다",1,{f: "threw thrown"});
W("case","명사","케이스, 경우",1);
W("ship","동사","발송하다",2,{f: "ships shipped"});
W("tend","동사","~하는 경향이 있다",1);
W("steal","동사·명사","훔치다, 거저나 다름없는 것",2);
W("brand","명사","브랜드",1,{f: "brands"});
W("overrate","동사","과대평가하다",3,{f: "overrated", p: "over=지나치게|rate=평가하다"});
W("commit","동사","결정하다, 전념하다",2);
W("waive","동사","(요금을) 면제하다",3);
W("delivery","명사","배달, 배송",1,{p: "deliver=배달하다|y=~것"});
W("because","접속사","~때문에",1);
W("defective","형용사","결함 있는",3,{p: "de=떨어져|fect=만들다|ive=~한", s: "제대로 만들어진 상태에서 떨어진 것."});
W("hello","감탄사","여보세요, 안녕하세요",1);
W("bye","감탄사","안녕 (헤어질 때)",1);
W("saturday","고유명사","토요일",1,{p: "saturn=토성|day=날", s: "토성(Saturn)의 날."});
W("afternoon","명사","오후",1,{p: "after=뒤|noon=정오"});
W("traffic","명사","교통, 차량 흐름",1);
W("inside","부사","안에서",1,{p: "in=안|side=쪽"});
W("halfway","부사","중간에서",2,{p: "half=절반|way=길"});
W("almost","부사","거의",1);
W("confirm","동사","확인하다, 확정하다",1,{f: "confirmed"});
W("five","숫자","다섯, 5",1);
W("reception","명사","(전화) 수신 상태, 접수처",2,{p: "re=다시|cept=받다|ion=~것", s: "신호를 받아들이는 상태."});
W("unless","접속사","~하지 않으면",1);
W("usual","형용사","늘 하던, 평소의",1);
W("calendar","명사","달력, 일정표",1,{s: "라틴어 calendae(매달 첫날)에서 왔어요. 그날 빚을 갚던 장부가 달력이 됐어요."});
W("set","동사","정하다, 차리다",1,{f: "sets setting"});
W("tentative","형용사","잠정적인",3,{p: "tent=시도하다|ative=~한", s: "일단 시도해 보는 정도로 정한 것."});
W("hate","동사","싫어하다",1);
W("squeeze","동사","짜다, (squeeze in) 시간을 내다",2,{f: "squeezing squeezed"});
W("urgent","형용사","급한",2);
W("drop","동사","떨어뜨리다, (drop a line) 연락하다",1,{f: "dropped"});
W("notice","명사","통지, (short notice) 갑작스러운 알림",1);
W("dial","동사","전화를 걸다",2,{f: "dialed"});
W("toothache","명사","치통",2,{p: "tooth=이|ache=아픔"});
W("finger","명사","손가락",1,{f: "fingers"});
W("bandage","명사","밴드, 붕대",2,{p: "band=끈|age=~것"});
W("hospital","명사","병원",1,{p: "hospit=손님을 맞다|al=~곳", s: "원래 손님과 나그네를 맞아 돌보던 곳."});
W("runny","형용사","(콧물이) 흐르는",3);
W("nose","명사","코",1);
W("leg","명사","다리",1,{f: "legs"});
W("dentist","명사","치과 의사",2,{p: "dent=이|ist=~하는 사람"});
W("stuffy","형용사","(코가) 막힌",3);
W("yesterday","부사·명사","어제",1,{p: "yester=전날의|day=날"});
W("knee","명사","무릎",2,{f: "knees"});
W("near","전치사","가까이",1);
W("rest","동사·명사","쉬다, 휴식",1);
W("itchy","형용사","가려운",3);
W("drowsy","형용사","졸린",3);
W("fill","동사","(fill out) 작성하다, 채우다",1,{f: "filled"});
W("medication","명사","약, 약물 치료",2,{p: "medic=치료하다|ation=~것"});
W("blood","명사","피, (blood pressure) 혈압",1);
W("worse","형용사","더 나쁜",1);
W("arm","명사","팔",1,{f: "arms"});
W("drink","동사","마시다",1,{f: "drinks drank"});
W("alcohol","명사","술, 알코올",2);
W("breathe","동사","숨 쉬다",2,{f: "breathing"});
W("note","명사","메모, (doctor's note) 진단서",1,{f: "notes"});
W("bleed","동사","피가 나다",2,{f: "bleeding"});
W("low","형용사","낮은",1,{f: "lower"});
W("dose","명사","복용량",3);
W("flu","명사","독감",2);
W("affect","동사","영향을 주다",1,{f: "affecting affected"});
W("sharp","형용사","날카로운, 찌르는 듯한",2);
W("dull","형용사","둔한, 묵직한",2);
W("recur","동사","재발하다",3,{f: "recurring", p: "re=다시|cur=달리다", s: "다시 달려 돌아오는 것."});
W("problem","명사","문제",1,{f: "problems"});
W("treatment","명사","치료",1,{p: "treat=다루다|ment=~것"});
W("squeamish","형용사","(피·주사를) 무서워하는",3,{s: "어원이 분명하지 않은 말이에요. 속이 울렁거리는 느낌으로 기억해요."});
W("needle","명사","바늘, 주삿바늘",2,{f: "needles"});
W("pull","동사","당기다, (pull a muscle) 근육을 다치다",1,{f: "pulled"});
W("muscle","명사","근육",2);
W("antibiotic","명사","항생제",3,{f: "antibiotics", p: "anti=반대|bio=생명|tic=~것", s: "세균의 생명에 맞서는 약."});
W("result","명사","결과",1,{f: "results"});
W("simple","형용사","간단한, 쉬운",1);
W("term","명사","용어, (in simple terms) 쉽게 말해",1,{f: "terms"});
W("swelling","명사","부기",3,{p: "swell=붓다|ing=~것"});
W("surgery","명사","수술",2,{s: "라틴어 chirurgia(손으로 하는 일)에서 왔어요."});
W("probably","부사","아마",1,{p: "prob=증명하다|able=~할 수 있는|ly=~하게", s: "증명될 수 있을 만큼, 즉 아마."});
W("foot","명사","발, (on one's feet) 회복한",1,{f: "feet"});
W("lifestyle","명사","생활 방식",2,{p: "life=삶|style=방식"});
W("rash","명사","발진",3);
W("spread","동사","퍼지다",1);
W("remote","명사","리모컨",2);
W("anyone","대명사","누구든, 누가",1);
W("tv","명사","텔레비전",1);
W("recycling","명사","재활용, 분리수거",2,{p: "re=다시|cycle=돌다|ing=~하기"});
W("fridge","명사","냉장고",2);
W("empty","형용사","빈",1);
F("leave","left");
W("vacuum","동사·명사","청소기를 돌리다, 진공",3);
W("clog","동사","막히다",3,{f: "clogged"});
W("groceries","명사","식료품, 장 볼 것",2,{p: "grocer=식료품상|ies=~물건들"});
W("takeout","명사","포장·배달 음식",2,{p: "take=가져가다|out=밖으로"});
W("mess","명사","엉망",2);
W("dishwasher","명사","식기세척기",2,{p: "dish=접시|wash=씻다|er=~하는 기계"});
W("cat","명사","고양이",1,{f: "cats"});
W("nap","명사","낮잠",2);
W("egg","명사","달걀",1,{f: "eggs"});
W("faucet","명사","수도꼭지",3);
W("smoke","명사","연기",2);
W("alarm","명사","경보기, 알람",2);
W("rearrange","동사","재배치하다",3,{p: "re=다시|arrange=배치하다"});
W("furniture","명사","가구",2,{p: "furnish=갖추다|ure=~것", s: "집에 갖춰 넣는 것."});
W("mold","명사","곰팡이",3);
W("bathroom","명사","화장실, 욕실",1,{p: "bath=목욕|room=방"});
W("electricity","명사","전기",2,{p: "electr=호박(보석)|icity=~성질", s: "그리스어 elektron(호박)에서 왔어요. 호박을 문지르면 정전기가 생겼거든요."});
W("high","형용사","높은",1);
W("apartment","명사","아파트, 집",1,{p: "apart=따로|ment=~것", s: "따로 나뉜 공간."});
W("plumber","명사","배관공",3,{p: "plumb=납(라틴어 plumbum)|er=~하는 사람", s: "옛날 수도관을 납으로 만들어서 생긴 이름이에요."});
W("carpet","명사","카펫",2,{f: "carpets"});
W("roommate","명사","룸메이트",2,{p: "room=방|mate=친구"});
W("never","부사","결코 ~않다",1);
W("himself","대명사","그 자신",1);
W("closer","형용사","더 가까운",1);
W("shut","동사","닫다, (shut off) 끊다",1);
W("spare","형용사","여분의",2);
W("heat","명사","난방, 열",1);
W("drag","동사","끌다, (drag one's feet) 질질 끌다",2,{f: "dragging"});
W("repair","명사·동사","수리, 수리하다",1,{f: "repairs"});
W("pet","명사","반려동물",1,{f: "pets"});
W("allow","동사","허락하다",1,{f: "allowed"});
W("ground","명사","땅, (ground rules) 기본 규칙",1);
W("rule","명사","규칙",1,{f: "rules"});
W("neighborhood","명사","동네",1,{p: "neighbor=이웃|hood=~무리"});
W("wall","명사","벽",1,{f: "walls"});
W("company","명사","회사, 업체",1);
W("nightmare","명사","악몽",2,{p: "night=밤|mare=악령", s: "mare는 밤에 사람을 누른다고 믿던 악령이에요."});
W("settle","동사","자리 잡다",2,{f: "settled"});
W("energy","명사","에너지",1);
W("upper","형용사","위쪽의, (fixer-upper) 손볼 곳 많은 집",2);
W("fixer","명사","(fixer-upper) 고칠 곳이 많은 집",3,{s: "fixer-upper = fix(고치다) + up. 고쳐야 쓸 수 있는 집."});
W("potential","명사","가능성, 잠재력",1,{p: "potent=힘 있는|ial=~것", s: "안에 숨은 힘."});
W("during","전치사","~동안",1);
W("house","명사","집",1);
W("fresh","형용사","새로운, 신선한",1);
W("coat","명사","(페인트) 칠, 외투",1);
W("paint","명사","페인트",1);
W("library","명사","도서관",1,{p: "libr=책|ary=~곳"});
W("grade","명사","성적, 학년",1,{f: "grades"});
W("final","형용사","마지막의, (final exam) 기말고사",1);
W("absent","형용사","결석한",2);
W("repeat","동사","반복하다",1);
W("biology","명사","생물학",2,{p: "bio=생명|logy=학문"});
W("fall","동사","떨어지다, (fall behind) 뒤처지다",1,{f: "falling fell"});
W("math","명사","수학",1);
W("main","형용사","주요한",1);
W("office","명사","사무실, (office hours) 면담 시간",1);
W("cite","동사","인용하다",3);
W("source","명사","출처",1,{f: "sources"});
W("resource","명사","자료",1,{f: "resources", p: "re=다시|source=샘", s: "필요할 때 다시 솟아나는 샘."});
W("fail","동사","실패하다, 떨어지다",1,{f: "failed"});
W("scholarship","명사","장학금",2,{p: "scholar=학자|ship=~자격", s: "공부하는 사람의 자격으로 받는 돈."});
W("presentation","명사","발표",1,{p: "present=보여 주다|ation=~것"});
W("laptop","명사","노트북",2,{p: "lap=무릎|top=위", s: "무릎 위에 올려놓는 컴퓨터."});
W("struggle","동사","애쓰다, 힘들어하다",1,{f: "struggling", s: "원래 '버둥거리다'라는 뜻이에요."});
W("motivated","형용사","의욕이 있는",2,{p: "motiv=움직이다|ate=~하다|ed=~된", s: "마음이 움직인 상태."});
W("tip","명사","팁, 끝, (tip of my tongue) 혀끝",1);
W("tongue","명사","혀",2);
W("constructive","형용사","건설적인",3,{p: "con=함께|struct=쌓다|ive=~한", s: "함께 쌓아 올리는."});
W("criticism","명사","비판",2,{p: "critic=비평가|ism=~함"});
W("thesis","명사","논문",3);
W("whether","접속사","~인지 아닌지",1);
W("abroad","부사","해외에서",2,{p: "a=~에|broad=넓은", s: "넓은 바깥 세상으로."});
W("ace","동사","(시험을) 아주 잘 보다",3,{f: "aced"});
W("procrastinate","동사","미루다",3,{f: "procrastinating", p: "pro=앞으로|crastin=내일의|ate=~하다", s: "라틴어 cras(내일)에서 왔어요. 내일로 미루는 것."});
W("professor","명사","교수",1,{p: "pro=앞에서|fess=말하다|or=~하는 사람", s: "앞에 서서 말하는 사람."});
W("curve","명사","곡선, (grade on a curve) 상대평가",2);
W("rephrase","동사","다른 말로 바꿔 말하다",3,{p: "re=다시|phrase=말로 하다"});
W("steep","형용사","가파른",2);
W("balance","명사","균형",1);
W("dance","동사","춤추다",1,{f: "dancing"});
W("tennis","명사","테니스",2);
W("park","명사","공원",1);
W("piano","명사","피아노",2);
W("sport","명사","운동, 스포츠",1,{f: "sports"});
W("sing","동사","노래하다",1,{f: "singing"});
W("favorite","형용사","가장 좋아하는",1,{p: "favor=호의|ite=~한"});
W("comic","명사","만화책",2,{f: "comics"});
W("ski","동사","스키를 타다",2,{f: "skiing"});
W("usually","부사","보통",1);
W("concert","명사","콘서트",2,{f: "concerts"});
W("summer","명사","여름",1);
W("fishing","명사","낚시",2);
W("festival","명사","축제",2,{p: "fest=잔치|ival=~것"});
W("podcast","명사","팟캐스트",2,{f: "podcasts", p: "pod=아이팟|cast=방송하다"});
W("teach","동사","가르치다",1);
W("relieve","동사","덜다, 풀다",2);
W("stress","명사","스트레스",1);
W("club","명사","모임, 동호회",1);
W("binge","동사","(binge-watch) 몰아 보다",3);
W("half","명사","절반",1);
W("marathon","명사","마라톤",2,{s: "그리스의 마라톤 전투 소식을 전하려 아테네까지 달린 전령 이야기에서 왔어요."});
W("enough","형용사","충분한",1);
W("song","명사","노래",1);
W("violin","명사","바이올린",2);
W("give","동사","(give up) 그만두다",1,{f: "gave"});
W("outdoors","부사","야외에서",2,{p: "out=밖|doors=문", s: "문밖에서."});
W("away","부사","떨어져, (right away) 바로",1);
W("knit","동사","뜨개질하다",3);
W("homebody","명사","집에 있기 좋아하는 사람",3,{p: "home=집|body=사람"});
W("dabble","동사","취미로 조금씩 해 보다",3,{f: "dabbling"});
W("painting","명사","그림 그리기",1,{p: "paint=칠하다|ing=~하기"});
W("interest","명사","흥미, 관심",1,{p: "inter=사이에|est=있다", s: "그 사이에 끼어 마음이 가는 것."});
W("therapeutic","형용사","치유 효과가 있는",3,{p: "therap=치료|eutic=~한"});
W("competitive","형용사","승부욕이 강한",2,{p: "compete=경쟁하다|itive=~한"});
W("board","명사","판, (board game) 보드게임",1);
W("pretty","부사","꽤",1);
W("laid","형용사","(laid-back) 느긋한",3,{s: "laid-back = 뒤로 기대 누운 듯 느긋한."});
W("completely","부사","완전히",1,{p: "complete=완전한|ly=~하게"});
W("obsessed","형용사","푹 빠진, 집착하는",2,{p: "ob=앞에|sess=앉다|ed=~된", s: "앞에 딱 붙어 앉아 떠나지 않는 상태."});
W("series","명사","시리즈",1);
W("memory","명사","기억, 추억",1,{f: "memories"});
W("nature","명사","자연",1);
W("selfie","명사","셀카",3);
W("load","동사","싣다, 불러오다(로딩)",2,{f: "loading"});
W("download","동사","내려받다",2,{p: "down=아래로|load=싣다"});
W("add","동사","추가하다",1);
W("crack","동사","금이 가다",2,{f: "cracked"});
W("log","동사","(log in) 로그인하다",2);
W("buffer","동사","(영상이) 버퍼링되다",3,{f: "buffering"});
W("voice","명사","목소리, 음성",1);
W("follower","명사","팔로워",2,{f: "followers", p: "follow=따르다|er=~하는 사람"});
W("notification","명사","알림",2,{f: "notifications", p: "notify=알리다|ation=~것"});
W("website","명사","웹사이트",1,{p: "web=거미줄|site=장소"});
W("delete","동사","지우다",2,{f: "deleted"});
W("fast","형용사·부사","빠른, 빨리",1);
W("stream","명사","(live stream) 실시간 방송",2);
W("hack","동사","해킹하다",2,{f: "hacked"});
W("reset","동사","재설정하다",2);
W("pdf","명사","PDF 파일",3);
W("cache","명사","캐시 (임시 저장 데이터)",3);
W("accidentally","부사","실수로",2,{p: "accident=사고|ally=~하게"});
W("pop","동사","펑 터지다, (pop up) 갑자기 뜨다",2,{f: "popping"});
W("blog","명사","블로그",2);
W("detail","명사","세부 사항",1,{f: "details"});
W("dm","명사","DM, 개인 메시지",3);
W("careful","형용사","조심하는",1);
W("privacy","명사","사생활, 개인정보",2);
W("setting","명사","설정",2,{f: "settings", p: "set=정하다|ing=~것"});
W("headline","명사","헤드라인, 제목",2,{p: "head=머리|line=줄"});
W("clickbait","명사","낚시성 콘텐츠",3,{p: "click=클릭|bait=미끼", s: "클릭하게 만드는 미끼."});
W("echo","명사","메아리",3);
W("chamber","명사","방, 공간",3);
W("overshare","동사","사생활을 과하게 공유하다",3,{p: "over=지나치게|share=공유하다"});
W("algorithm","명사","알고리즘",2,{s: "9세기 수학자 알콰리즈미(al-Khwarizmi)의 이름에서 왔어요."});
W("stuff","명사","것들, 물건",1);
W("rabbit","명사","토끼",2);
W("hole","명사","구멍",1);
W("fake","형용사","가짜의",2);
W("dirty","형용사","더러운",1);
W("phishing","명사","피싱 (사기)",3,{p: "phish=낚다(fish)|ing=~하기", s: "fish(낚시)를 비틀어 만든 말이에요."});
W("influencer","명사","인플루언서",2,{f: "influencers", p: "influence=영향을 주다|er=~하는 사람"});
W("effortless","형용사","힘들이지 않은",3,{p: "effort=노력|less=~없는"});
W("blow","동사","불다, (blow up) 폭발적으로 퍼지다",1,{f: "blew"});
W("factor","명사","요소, (two-factor) 2단계",2);
W("authentication","명사","인증",3,{p: "authentic=진짜인|ation=~것", s: "진짜인지 확인하는 것."});
W("livestream","명사","라이브 방송",3,{p: "live=실시간|stream=흐름"});
F("draw","drew");
W("audience","명사","청중, 시청자",2,{p: "audi=듣다|ence=~것", s: "소리를 듣는 사람들."});
W("relationship","명사","관계",1,{p: "relation=관계|ship=~상태"});
W("shower","명사","샤워",1);
W("nighter","명사","(all-nighter) 밤샘",3,{s: "all-nighter = 밤(night)을 통째로(all) 새우는 것."});

/* ---------- phase 4 words (C1 chunks) ---------- */
W("bookstore","명사","서점",2,{f:"bookstores",p:"book=책|store=가게"});
W("humidity","명사","습기, 습도",2,{p:"humid=축축한|ity=~성질"});
F("cook","cooked");
F("fill","fills");
F("happy","happily");
F("drink","drinker");
F("balance","balanced");
F("pay","paying");
F("book","booking");
F("chat","chatting");
F("find","finding");
F("path","paths");
F("sight","sights");
F("hold","holds");
F("local","locals");
F("welcome","welcoming");
F("delay","delays");
F("upgrade","upgraded");
F("extend","extending");
F("arrive","arriving");
F("perfect","perfectly");
F("seem","seems");
F("consider","considered");
F("different","differently");
F("item","items");
F("spend","spending");
F("cheap","cheapest");
F("calendar","calendars");
F("near","nearer");
F("check","checked checking");
F("base","based");
F("understand","understanding");
F("roommate","roommates");
F("heat","heating heated");
F("teach","teaching");
F("cite","citing");
F("project","projects");
F("pull","pulls");
F("build","building");
F("join","joined");
F("app","apps");
F("share","sharing");
F("account","accounts");
F("easy","easily");
F("message","messages");
F("overshare","oversharing");
F("meeting","meetings");
F("serious","seriously");
F("delete","deleting");
F("give","gives");
F("mute","muting");
W("inclined","형용사","(be inclined to) ~하는 쪽으로 마음이 기운",3,{p:"in=~쪽으로|cline=기울다|ed=~된",s:"한쪽으로 기울어진 마음."});
W("tasting","명사","(tasting menu) 맛보기 코스",3);
W("accommodate","동사","(요구를) 맞춰 주다, 수용하다",2,{p:"ac=~에|commod=알맞은|ate=~하다",s:"알맞게 맞춰 주는 것."});
W("gluten","명사","글루텐",3);
W("diet","명사","식단",2);
W("acquired","형용사","(acquired taste) 길들여야 좋아지는",3,{p:"ac=~에|quire=구하다|ed=~된",s:"애써 얻어야 하는 맛."});
W("taste","명사","맛, 취향",1);
W("advance","명사","(in advance) 미리",1);
W("pairing","명사","(음식과 술의) 페어링, 짝짓기",3,{p:"pair=짝|ing=~하기"});
W("entirely","부사","전적으로",2,{p:"entire=전체의|ly=~하게"});
W("overpriced","형용사","너무 비싼",3,{p:"over=지나치게|price=가격|ed=~된"});
W("possibly","부사","혹시, 아마",1,{p:"possible=가능한|ly=~하게"});
W("atmosphere","명사","분위기",2,{p:"atmo=증기|sphere=구",s:"원래 지구를 둘러싼 공기층을 뜻했어요."});
W("mindful","형용사","신경 쓰는, 의식하는",3,{p:"mind=마음|ful=~가득한"});
W("brunch","명사","브런치",2,{s:"breakfast + lunch를 합친 말이에요."});
W("fuss","명사","소란, 야단",2);
W("mix","명사","(mix-up) 혼동, 착오",1);
W("hope","동사","바라다",1,{f:"hoping hoped"});
W("linger","동사","오래 머무르다",3);
W("stick","동사","(stick to) 고수하다, 붙이다",1);
W("sparkling","형용사","탄산이 든",2,{p:"sparkle=반짝이다|ing=~하는"});
W("subtle","형용사","은은한, 미묘한",2);
W("reflection","명사","(on reflection) 다시 생각해 보니, 반사",2,{p:"re=다시|flect=구부리다|ion=~것",s:"생각을 다시 되돌려 보는 것."});
W("whatever","대명사","무엇이든",1,{p:"what=무엇|ever=언제나"});
W("skip","동사","건너뛰다",2);
W("act","동사","(act up) 말썽을 부리다, 행동하다",1,{f:"acting"});
W("impress","동사","깊은 인상을 주다",2);
W("introduce","동사","소개하다",1,{p:"intro=안으로|duce=이끌다",f:"introduced"});
W("accent","명사","말투, 억양",2);
W("correct","동사","바로잡다",1);
W("conference","명사","학회, 회의",2,{p:"con=함께|fer=나르다|ence=~것",s:"함께 의견을 가져와 나누는 자리."});
W("evening","명사","저녁",1);
W("fancy","동사·형용사","(Fancy seeing you here!) 이런 데서 보다니, 고급스러운",2);
W("see","동사","보다",1,{f:"seeing"});
W("brain","명사","뇌, (pick one's brain) 조언을 구하다",1);
W("cross","동사","건너다, (paths cross) 마주치다",1,{f:"crossing"});
W("remember","동사","기억하다",1,{p:"re=다시|member=마음에 두다"});
W("common","형용사","(in common) 공통의",1);
W("town","명사","동네, 도시",1);
W("wonder","동사","궁금하다, (I was wondering) 혹시 ~할까 해서요",1,{f:"wondering"});
W("trail","명사","길, (off the tourist trail) 관광객이 잘 안 가는",2);
W("itinerary","명사","여행 일정",3,{p:"itiner=길|ary=~것",s:"라틴어 iter(여행길)에서 왔어요."});
W("fairly","부사","꽤",1);
W("flexible","형용사","유연한",2,{p:"flex=구부리다|ible=~할 수 있는"});
W("suggestion","명사","제안",1,{p:"sug=아래에서|gest=가져오다|ion=~것",f:"suggestions"});
W("given","전치사","~을 고려하면",1);
W("compensation","명사","보상",2,{p:"compensate=보상하다|ion=~것"});
W("circumstance","명사","상황, 사정",2,{f:"circumstances",p:"circum=둘레|stance=서 있음",s:"나를 둘러싸고 있는 것들."});
W("soak","동사","(soak up) 흠뻑 즐기다, 적시다",3);
W("rush","동사","서두르다",1);
W("description","명사","설명, 묘사",2,{p:"de=아래로|script=쓰다|ion=~것"});
W("trek","명사","힘든 여정",3);
W("provided","접속사","~라면",2,{p:"pro=앞에|vide=보다|ed=~된"});
W("hopelessly","부사","완전히, 절망적으로",3,{p:"hope=희망|less=~없는|ly=~하게"});
W("highlight","명사","하이라이트, 가장 좋은 부분",2,{p:"high=높은|light=빛",s:"가장 밝게 비추는 부분."});
W("leeway","명사","여유, 재량",3,{s:"원래 배가 바람에 밀려 옆으로 흘러갈 수 있는 여유 공간을 뜻하는 항해 용어예요."});
W("lodge","동사","(lodge a complaint) 정식으로 제기하다",3);
W("formal","형용사","공식적인",1);
W("incredibly","부사","믿을 수 없을 만큼",2,{p:"in=아니다|cred=믿다|ibly=~할 수 있게",s:"믿을 수 없을 만큼."});
W("whim","명사","(on a whim) 즉흥적으로",3);
W("pleasant","형용사","기분 좋은",2,{p:"please=기쁘게 하다|ant=~한"});
W("ahead","부사","미리, 앞에",1);
W("peak","명사","정점, (peak season) 성수기",2);
W("season","명사","철, 시즌",1);
W("convenient","형용사","편리한",1,{p:"con=함께|veni=오다|ent=~한",s:"모두가 오기 좋은."});
W("location","명사","위치",1,{p:"locate=위치하다|ion=~것"});
W("view","명사","경치, 견해",1);
W("connection","명사","환승편, 연결",1,{p:"connect=연결하다|ion=~것"});
W("spur","명사","(on the spur of the moment) 즉흥적으로",3,{s:"spur는 말을 차는 박차예요. 박차를 받은 듯 순간적으로."});
W("solo","부사","혼자",2);
W("force","동사","억지로 ~하게 하다",1,{f:"forces"});
W("comfort","명사","편안함, (comfort zone) 익숙한 영역",1);
W("zone","명사","구역, (in the zone) 몰입한 상태",2);
W("reassess","동사","재평가하다",3,{p:"re=다시|assess=평가하다"});
W("priority","명사","우선순위",1,{f:"priorities",p:"prior=먼저|ity=~것"});
W("revisit","동사","다시 검토하다",3,{p:"re=다시|visit=찾아가다"});
W("timeline","명사","일정, 시간표",2,{p:"time=시간|line=줄"});
W("data","명사","데이터",1);
W("otherwise","부사","다르게, 그렇지 않으면",1,{p:"other=다른|wise=방식으로"});
W("principle","명사","원칙",1,{p:"princip=첫째|le=~것",s:"가장 먼저 오는 것."});
W("sort","동사","(sort out) 정리하다, 해결하다",1);
W("previous","형용사","이전의",1,{p:"pre=앞의|vi=길|ous=~한",s:"앞서 지나온 길의."});
W("role","명사","직무, 역할",1);
W("responsible","형용사","책임이 있는",1,{p:"respons=응답하다|ible=~할 수 있는",s:"응답할 수 있는 사람이 책임자."});
W("oversee","동사","감독하다",3,{f:"overseeing",p:"over=위에서|see=보다"});
W("team","명사","팀",1);
W("eight","숫자","여덟, 8",1);
W("thrive","동사","잘 해내다, 번창하다",2);
W("pace","명사","속도, (change of pace) 기분 전환",2,{f:"paced"});
W("environment","명사","환경",1,{f:"environments",p:"en=안에|viron=둘레|ment=~것",s:"나를 둘러싼 것."});
W("tangible","형용사","눈에 보이는, 실재하는",3,{p:"tang=만지다|ible=~할 수 있는",s:"손으로 만질 수 있는."});
W("impact","명사","영향, 성과",1);
W("ambitious","형용사","야심 찬, 무리한",2,{p:"ambit=돌아다니다|ious=~한",s:"표를 얻으려 돌아다니던 사람에서 나온 말."});
W("bog","동사","(get bogged down) 수렁에 빠지다",3,{f:"bogged",s:"bog는 늪이에요."});
W("improve","동사","개선하다",1);
W("area","명사","분야, 지역",1);
W("manage","동사","관리하다",1);
W("client","명사","고객",1);
W("expectation","명사","기대",2,{f:"expectations",p:"expect=기대하다|ation=~것"});
W("keen","형용사","열심인, (keen on) ~에 관심이 많은",2);
W("others","대명사","다른 사람들",1);
W("separately","부사","따로",2,{p:"separate=분리된|ly=~하게"});
W("argue","동사","주장하다, 말다툼하다",1,{f:"arguing"});
W("risk","명사","위험",1,{f:"risks"});
W("outweigh","동사","~보다 크다",3,{p:"out=넘어서|weigh=무게가 나가다"});
W("benefit","명사","이점",1,{f:"benefits"});
W("success","명사","성공",1);
W("ownership","명사","(take ownership) 책임지고 맡음, 소유",2,{p:"own=소유하다|er=~하는 사람|ship=~상태"});
W("rollout","명사","출시, 도입",3,{p:"roll=굴리다|out=밖으로"});
W("already","부사","이미",1);
W("capacity","명사","수용력, (at capacity) 꽉 찬",2,{p:"capac=담을 수 있는|ity=~것"});
W("owner","명사","담당자, 주인",1,{f:"owners"});
W("offer","명사","제안",1);
W("fully","부사","완전히",1);
W("streamline","동사","간소화하다",3,{p:"stream=흐름|line=선",s:"물 흐름을 따라 매끄럽게 만든 선에서 왔어요."});
W("promise","동사","약속하다",1);
W("flag","동사","(문제를) 알리다, 표시하다",2);
W("issue","명사","문제",1,{f:"issues"});
W("thrilled","형용사","매우 기쁜",2,{p:"thrill=짜릿함|ed=~된"});
W("along","부사","(go along with) 따르다",1);
W("admit","동사","인정하다",1);
W("aback","부사","(taken aback) 깜짝 놀란",3);
W("blunt","형용사","직설적인, 무딘",3);
W("insensitive","형용사","무신경한",3,{p:"in=아니다|sensitive=민감한"});
W("process","동사","받아들이다, 처리하다",1,{f:"processing"});
W("decision","명사","결정",1,{p:"decide=결정하다|ion=~것"});
W("frankly","부사","솔직히",2);
W("willing","형용사","기꺼이 ~하는",1);
W("hit","동사","(hit home) 와닿다, 치다",1);
W("jump","동사","뛰다, (jump to conclusions) 섣불리 결론 내리다",1);
W("conclusion","명사","결론",1,{f:"conclusions",p:"con=완전히|clus=닫다|ion=~것",s:"완전히 닫아 마무리하는 것."});
W("merit","명사","장점",3,{f:"merits"});
W("tricky","형용사","까다로운",2);
W("say","동사","(it goes without saying) 말할 것도 없다",1,{f:"saying"});
W("sting","동사","따끔하게 아프다",3,{f:"stung"});
F("feel","felt");
W("valid","형용사","타당한",2);
W("concern","명사","걱정, 우려",1,{f:"concerning"});
W("ideal","형용사","이상적인",2);
W("begin","동사","시작하다",1,{f:"beginning"});
W("rollercoaster","명사","롤러코스터, 감정 기복",3,{p:"roller=굴러가는|coaster=썰매"});
W("understated","형용사","수수한, 절제된",3,{p:"under=아래로|state=말하다|ed=~된",s:"덜 드러내 말한 듯한."});
W("flexibility","명사","융통성",2,{p:"flexible=유연한|ity=~성질"});
W("faulty","형용사","결함 있는",3);
W("justify","동사","정당화하다",2,{p:"just=올바른|ify=~하게 하다"});
W("burn","동사","(be burned) 데다, 손해 보다",1,{f:"burned"});
W("knockoff","명사","모조품",3,{f:"knockoffs",s:"knock off = 빨리 찍어 내다에서 '짝퉁'이 됐어요."});
W("review","명사","후기",1,{f:"reviews"});
W("wary","형용사","조심스러운",3);
W("invest","동사","투자하다",2);
W("aside","부사","(set aside) 따로 떼어 두다",2);
F("lead","led");
W("advertise","동사","광고하다",2,{p:"ad=~쪽으로|vert=돌리다|ise=~하다",f:"advertised"});
W("matter","동사","중요하다",1,{f:"matters"});
W("retail","명사","소매, (retail therapy) 쇼핑으로 기분 풀기",3);
W("therapy","명사","치료",2);
W("false","형용사","거짓의, (false economy) 결국 손해인 절약",2);
W("economy","명사","경제, 절약",1);
W("escalate","동사","(윗선에) 올리다, 악화되다",3,{p:"e=밖으로|scal=사다리|ate=~하다",s:"사다리를 타고 위로 올라가는 것."});
W("assistant","명사","점원, 비서",2,{p:"assist=돕다|ant=~하는 사람"});
W("pushy","형용사","강매하는, 밀어붙이는",3);
W("liking","명사","(for my liking) 내 취향에는",3);
W("loyal","형용사","충성스러운, 단골의",2);
W("customer","명사","고객",1,{p:"custom=습관|er=~하는 사람",f:"customers"});
W("model","명사","모델, 기종",1);
W("wish","명사","바람, (wish list) 위시리스트",1);
W("list","명사","목록",1);
W("hype","명사","과장된 화제",3);
W("specific","형용사","특정한",1,{p:"speci=종류|fic=만드는"});
W("raise","동사","(문제를) 제기하다, 올리다",1);
W("jack","동사","(jack up) 가격을 확 올리다, (jack of all trades) 팔방미인",3,{f:"jacked"});
F("send","sent");
W("postpone","동사","미루다",2,{p:"post=뒤에|pone=두다"});
W("availability","명사","시간 여유, 이용 가능성",2,{p:"available=이용 가능한|ity=~성질"});
W("part","명사","부분",1);
W("fifteen","숫자","열다섯, 15",1);
W("apology","명사","사과",2,{f:"apologies"});
W("discuss","동사","논의하다",1);
W("invite","명사","초대(장)",1);
W("past","전치사","(half past two) ~시 지나서",1);
W("reconfirm","동사","재확인하다",3,{p:"re=다시|confirm=확인하다"});
W("cell","명사","휴대폰",2);
W("coordinate","동사","조율하다",2,{p:"co=함께|ordin=순서|ate=~하다",s:"함께 순서를 맞추는 것."});
W("intermittent","형용사","간헐적인",3,{p:"inter=사이에|mitt=보내다|ent=~한",s:"사이사이에 보내지는."});
W("chest","명사","가슴",1);
W("related","형용사","관련된, 친척인",1);
W("procedure","명사","시술, 절차",2,{p:"proceed=진행하다|ure=~것"});
W("nag","동사","잔소리하다, 계속 괴롭히다",3,{f:"nagging"});
W("flare","동사","(flare up) 확 심해지다",3);
W("whenever","접속사","~할 때마다",1,{p:"when=언제|ever=언제나"});
W("specialist","명사","전문의",2,{p:"special=특별한|ist=~하는 사람"});
W("level","명사","수준",1,{f:"levels"});
W("non","접두사","~이 아닌",2);
W("drug","명사","약",1);
W("overreact","동사","과민 반응하다",3,{f:"overreacting",p:"over=지나치게|react=반응하다"});
W("chronic","형용사","만성의",3,{s:"그리스어 chronos(시간)에서 왔어요. 시간이 오래 가는 병."});
W("condition","명사","질환, 상태",1,{p:"con=함께|dit=말하다|ion=~것"});
W("dosage","명사","복용량",3,{p:"dose=1회분|age=~것"});
W("prescribe","동사","처방하다",2,{f:"prescribed",p:"pre=미리|scribe=쓰다"});
W("referral","명사","진료 의뢰",3,{p:"refer=보내다|al=~것"});
W("dermatologist","명사","피부과 의사",3,{p:"derma=피부|logist=전문가"});
W("exercise","동사","운동하다",1,{p:"ex=밖으로|erc=가두다|ise=~하다",f:"exercising"});
W("prevention","명사","예방",2,{p:"pre=먼저|vent=오다|ion=~것",s:"먼저 와서 막는 것."});
W("cure","명사","치료",2);
W("caffeine","명사","카페인",2,{s:"커피(독일어 Kaffee)에서 이름을 땄어요."});
W("pocket","명사","주머니, (out of pocket) 자기 돈으로",1);
W("road","명사","길",1);
W("recovery","명사","회복",2,{p:"recover=회복하다|y=~것"});
W("redecorate","동사","다시 꾸미다",3,{p:"re=다시|decorate=꾸미다"});
W("put","동사","(put off) 미루다",1,{f:"putting"});
W("minimum","명사","최소",2);
W("eleven","숫자","열하나, 11",1);
W("helpful","형용사","도움이 되는",1);
W("hassle","명사","귀찮은 일",2);
W("cost","명사","비용",1,{f:"costs"});
W("damp","명사","습기",3);
W("cause","동사","일으키다",1);
W("proper","형용사","제대로 된",1);
W("cozy","형용사","아늑한",2);
W("cramped","형용사","비좁은",3);
W("renovation","명사","수리, 공사",2,{p:"re=다시|nov=새로운|ation=~것",s:"다시 새롭게 만드는 것."});
W("rid","동사","(get rid of) 없애다",2);
W("clutter","명사","잡동사니",3);
W("rough","형용사","대략적인, 거친",1);
W("estimate","명사","견적, 추정",2,{p:"estim=값을 매기다|ate=~하다"});
W("quote","명사","견적",2);
W("ups","명사","(ups and downs) 좋은 일과 나쁜 일",2);
W("downs","명사","(ups and downs) 나쁜 일",2);
W("roof","명사","지붕, (go through the roof) 치솟다",1);
W("winter","명사","겨울",1);
W("neat","형용사","깔끔한, (neat freak) 깔끔쟁이",2);
W("freak","명사","(~ freak) ~광",3);
W("tackle","동사","(일을) 처리하다, 달려들다",2);
W("garage","명사","차고",2);
W("barring","전치사","~이 없다면",3,{p:"bar=막다|ing=~하는"});
W("pile","동사","(pile up) 쌓이다",2);
W("character","명사","개성, 성격",1,{s:"그리스어 kharaktēr(새긴 자국)에서 왔어요. 사람마다 새겨진 특징."});
W("blur","동사","흐리게 하다",3,{f:"blurred"});
W("structure","동사","구성하다",1,{p:"struct=쌓다|ure=~것"});
W("coherently","부사","논리 정연하게",3,{p:"co=함께|her=붙다|ently=~하게",s:"생각이 서로 딱 붙어 있게."});
W("methodology","명사","연구 방법론",3,{p:"method=방법|ology=학문"});
W("assumption","명사","가정",2,{f:"assumptions",p:"as=~에|sumpt=취하다|ion=~것",s:"일단 사실로 취해 두는 것."});
W("evidence","명사","증거, 근거",1,{p:"e=밖으로|vid=보다|ence=~것",s:"밖으로 보이게 드러난 것."});
W("claim","명사","주장",1);
W("aim","동사","목표로 하다",1,{f:"aiming"});
W("submit","동사","제출하다",2);
W("draft","명사","초안",2);
W("fascinating","형용사","매우 흥미로운",2,{p:"fascinate=매혹하다|ing=~하는"});
W("topic","명사","주제",1);
W("broad","형용사","넓은",1);
W("narrow","동사","좁히다",1);
W("research","명사","연구",1,{p:"re=다시|search=찾다"});
W("subject","명사","주제, 과목",1);
W("outline","명사","개요",2,{p:"out=바깥|line=선"});
W("provoke","동사","(thought-provoking) 생각을 불러일으키다",3,{f:"provoking"});
W("tone","명사","어조",2);
W("summarize","동사","요약하다",2,{p:"summary=요약|ize=~하다"});
W("broaden","동사","넓히다",3,{f:"broadened"});
W("perspective","명사","관점",2,{p:"per=꿰뚫어|spect=보다|ive=~것"});
W("statistics","명사","통계(학)",2,{p:"state=국가|istics=~학",s:"국가의 수치를 다루던 학문에서 왔어요."});
W("extent","명사","정도",2);
W("author","명사","저자",1);
W("gap","명사","틈, (gap year) 1년 쉬는 기간",2);
W("graduate","형용사","(graduate school) 대학원",2,{p:"grad=단계|uate=~하다"});
W("school","명사","학교",1);
W("memorize","동사","암기하다",2,{f:"memorizing",p:"memory=기억|ize=~하다"});
W("toward","전치사","~쪽으로",1);
W("reliable","형용사","믿을 만한",2,{p:"rely=의지하다|able=~할 수 있는"});
W("mark","명사","점수",1,{f:"marks"});
F("find","found");
W("routine","명사","일과, 루틴",2);
W("possibility","명사","가능성",1,{p:"possible=가능한|ity=~성질"});
W("realize","동사","깨닫다",1);
W("creative","형용사","창의적인",1,{p:"create=만들다|ive=~한"});
W("become","동사","되다",1);
W("obsession","명사","집착",3,{p:"ob=앞에|sess=앉다|ion=~것"});
W("grounding","형용사","마음을 차분하게 잡아 주는",3,{p:"ground=땅|ing=~하는",s:"땅에 발을 딛게 해 주는."});
W("trade","명사","일, 기술, (jack of all trades) 팔방미인",2,{f:"trades"});
W("master","명사","달인",1);
W("none","대명사","아무것도",1);
W("plateau","동사","정체되다",3,{f:"plateaued"});
W("coach","명사","코치",2);
W("surprisingly","부사","놀랍게도",2,{p:"surprise=놀라게 하다|ingly=~하게"});
W("addictive","형용사","중독성 있는",3,{p:"addict=중독되다|ive=~한"});
W("hustle","명사","(side hustle) 부업",3);
W("novelty","명사","새로움",3,{p:"novel=새로운|ty=~성질"});
W("wear","동사","(wear off) 사라지다, 입다",1,{f:"wears"});
W("regular","형용사","정기적인",1);
W("rediscover","동사","다시 발견하다",3,{f:"rediscovered",p:"re=다시|discover=발견하다"});
W("achievement","명사","성취",2,{p:"achieve=이루다|ment=~것"});
F("spend","spent");
W("whole","형용사","전체의",1);
W("browse","동사","둘러보다",2,{f:"browsing"});
W("secondhand","형용사","중고의",3,{p:"second=두 번째|hand=손",s:"두 번째 손을 거친."});
W("bookshop","명사","서점",2,{f:"bookshops",p:"book=책|shop=가게"});
W("gear","명사","장비",2);
W("gradually","부사","점차",2,{p:"grade=단계|ually=~하게"});
W("league","명사","리그",2);
W("disappear","동사","사라지다",1,{f:"disappears",p:"dis=반대|appear=나타나다"});
W("owl","명사","올빼미, (night owl) 밤에 활동하는 사람",2);
W("increasingly","부사","점점 더",2,{p:"increase=늘다|ingly=~하게"});
W("collect","동사","모으다",1);
W("amplify","동사","증폭시키다",3,{f:"amplifies",p:"ampl=큰|ify=~하게 하다"});
W("outrage","명사","분노",3,{p:"out=넘어서|rage=분노"});
W("fact","명사","사실, (fact-check) 사실 확인",1);
W("constantly","부사","끊임없이",2,{p:"con=완전히|stant=서 있다|ly=~하게"});
W("unfollow","동사","팔로우를 끊다",3,{f:"unfollowed",p:"un=반대|follow=따르다"});
W("inadequate","형용사","부족한, 초라한",3,{p:"in=아니다|adequate=충분한"});
W("thread","명사","글타래, 실",2);
W("spark","동사","불러일으키다",2,{f:"sparked"});
W("debate","명사","논쟁, 토론",1);
W("context","명사","맥락",2,{p:"con=함께|text=짜다",s:"함께 짜인 글의 흐름."});
W("intentional","형용사","의도적인",3,{p:"intent=의도|ional=~의"});
W("age","동사","(age well) 시간이 지나도 괜찮다",1);
W("suspect","동사","의심하다, ~인 것 같다",2);
W("manipulate","동사","조작하다",3,{f:"manipulated",p:"mani=손|pul=채우다|ate=~하다",s:"손으로 주무르는 것."});
W("curse","명사","저주",2);
W("focus","동사","집중하다",1,{f:"focused"});
W("efficient","형용사","효율적인",2,{p:"ef=밖으로|fic=만들다|ient=~한",s:"결과를 잘 만들어 내는."});
W("impersonal","형용사","삭막한, 인간미 없는",3,{p:"im=아니다|personal=개인적인"});
W("distort","동사","왜곡하다",3,{f:"distorted",p:"dis=떨어져|tort=비틀다"});
W("changer","명사","(game changer) 판도를 바꾸는 것",3);
W("reach","명사","(within reach) 손 닿는 곳",1);
W("impossible","형용사","불가능한",1,{p:"im=아니다|possible=가능한"});
W("ignore","동사","무시하다",1);
W("technology","명사","기술",1,{p:"techno=기술|logy=학문"});
W("serve","동사","봉사하다, 쓰이다",1);
W("lovely","형용사","아주 좋은, 사랑스러운",1);
W("opener","명사","(eye-opener) 눈을 뜨게 하는 경험",3);

/* ---------- phase 5: vocabulary course — frequency-ranked headwords (tools/wordlist.py, wordfreq CC BY-SA 4.0) with example sentences ---------- */
W("life","명사","삶, 인생",1,{f:"lifes",e:{en:"I want a quiet life.",ko:"조용한 삶을 원해."}});
W("man","명사","남자",1,{f:"men mans",e:{en:"That man is my uncle.",ko:"저 남자는 우리 삼촌이야."}});
W("state","명사","상태, 주",1,{f:"states",e:{en:"The room was in a terrible state.",ko:"방이 엉망인 상태였어."}});
W("old","형용사","나이 든, 오래된",1,{e:{en:"This building is very old.",ko:"이 건물은 아주 오래됐어."}});
W("however","부사","하지만",1,{e:{en:"It was cheap. However, it broke quickly.",ko:"쌌어. 하지만 금방 고장 났어."}});
W("government","명사","정부",1,{f:"governments",s:"govern(다스리다) + ment(~것). 나라를 다스리는 곳.",e:{en:"The government raised taxes.",ko:"정부가 세금을 올렸어."}});
W("public","형용사","공공의, 대중의",1,{e:{en:"Is there a public restroom nearby?",ko:"근처에 공중화장실 있어요?"}});
W("woman","명사","여자",1,{f:"women womans",e:{en:"A woman asked me for directions.",ko:"한 여자가 나에게 길을 물었어."}});
W("system","명사","체계, 시스템",1,{f:"systems",e:{en:"The new system is easier to use.",ko:"새 시스템이 쓰기 더 쉬워."}});
W("support","동사·명사","지지하다, 지원",1,{f:"supports supported supporting",e:{en:"My family always supports me.",ko:"가족은 늘 나를 지지해 줘."}});
W("power","명사","힘, 전력",1,{f:"powers",e:{en:"The power went out last night.",ko:"어젯밤에 정전됐어."}});
W("white","형용사","하얀",1,{e:{en:"She wore a white dress.",ko:"그녀는 흰 드레스를 입었어."}});
W("actually","부사","사실은",1,{e:{en:"Actually, I've never been there.",ko:"사실 거기 가 본 적 없어."}});
W("country","명사","나라",1,{f:"countries",e:{en:"Which country are you from?",ko:"어느 나라에서 왔어요?"}});
W("child","명사","아이",1,{f:"children childs",e:{en:"The child is sleeping.",ko:"아이가 자고 있어."}});
W("general","형용사","일반적인",1,{e:{en:"In general, people here are friendly.",ko:"일반적으로 여기 사람들은 친절해."}});
W("law","명사","법",1,{f:"laws",e:{en:"It's against the law.",ko:"그건 법에 어긋나."}});
W("war","명사","전쟁",1,{f:"wars",e:{en:"My grandfather fought in the war.",ko:"할아버지는 전쟁에 참전하셨어."}});
W("maybe","부사","아마, 어쩌면",1,{e:{en:"Maybe we can go tomorrow.",ko:"어쩌면 내일 갈 수 있을 거야."}});
W("president","명사","대통령, 회장",1,{f:"presidents",s:"pre(앞) + sid(앉다) + ent(~사람). 맨 앞에 앉는 사람.",e:{en:"The president gave a speech.",ko:"대통령이 연설을 했어."}});
W("course","명사","강좌, (of course) 물론",1,{f:"courses",e:{en:"I'm taking an online course.",ko:"온라인 강좌를 듣고 있어."}});
W("health","명사","건강",1,{f:"",e:{en:"Sleep is important for your health.",ko:"잠은 건강에 중요해."}});
W("important","형용사","중요한",1,{s:"im(안으로) + port(나르다) + ant(~한). 안으로 실어 올 만큼 중요한.",e:{en:"This meeting is important.",ko:"이 회의는 중요해."}});
W("least","부사·형용사","가장 적은, (at least) 적어도",1,{e:{en:"At least we tried.",ko:"적어도 우리는 해 봤잖아."}});
W("information","명사","정보",1,{f:"informations",s:"in(안에) + form(모양) + ation(~것). 머릿속에 모양을 잡아 주는 것.",e:{en:"Where can I get more information?",ko:"더 많은 정보는 어디서 얻을 수 있어요?"}});
W("young","형용사","젊은, 어린",1,{e:{en:"He looks young for his age.",ko:"그는 나이에 비해 젊어 보여."}});
W("court","명사","법정, 코트",1,{f:"courts",e:{en:"They met on the tennis court.",ko:"그들은 테니스 코트에서 만났어."}});
W("guy","명사","남자, 녀석",1,{f:"guys",e:{en:"He's a really nice guy.",ko:"그는 정말 좋은 사람이야."}});
W("single","형용사","하나의, 미혼의",1,{e:{en:"I didn't make a single mistake.",ko:"실수를 하나도 안 했어."}});
W("body","명사","몸",1,{f:"bodies",e:{en:"My whole body hurts.",ko:"온몸이 아파."}});
W("control","동사·명사","통제하다, 통제",1,{f:"controls controled controling",e:{en:"Try to control your temper.",ko:"화를 참아 봐."}});
W("death","명사","죽음",1,{f:"deaths",e:{en:"His death was a shock to everyone.",ko:"그의 죽음은 모두에게 충격이었어."}});
W("south","명사","남쪽",1,{f:"souths",e:{en:"We drove south for two hours.",ko:"우리는 두 시간 동안 남쪽으로 운전했어."}});
W("true","형용사","사실인",1,{e:{en:"Is it true that you're moving?",ko:"이사 간다는 게 사실이야?"}});
W("history","명사","역사",1,{f:"histories",e:{en:"I love reading about history.",ko:"역사에 관한 글 읽는 걸 좋아해."}});
W("several","형용사","몇몇의",1,{e:{en:"I've been there several times.",ko:"거기 몇 번 가 봤어."}});
W("university","명사","대학교",1,{f:"universities",s:"uni(하나) + vers(돌다) + ity. 하나로 모인 학자들의 공동체.",e:{en:"She studies at a university in Seoul.",ko:"그녀는 서울에 있는 대학교에 다녀."}});
W("win","동사","이기다",1,{f:"won winning wins",e:{en:"Our team won the game.",ko:"우리 팀이 경기에서 이겼어."}});
W("girl","명사","소녀, 여자아이",1,{f:"girls",e:{en:"The little girl waved at us.",ko:"꼬마 여자아이가 우리에게 손을 흔들었어."}});
W("human","형용사·명사","인간(의)",1,{f:"humans",e:{en:"It's only human to make mistakes.",ko:"실수하는 건 인간이라면 당연해."}});
W("member","명사","회원, 구성원",1,{f:"members",e:{en:"Are you a member of this club?",ko:"이 동호회 회원이에요?"}});
W("community","명사","지역 사회, 공동체",1,{f:"communities",s:"com(함께) + mun(나누다) + ity. 함께 나누는 사람들.",e:{en:"Our community is very close.",ko:"우리 동네 사람들은 아주 가까워."}});
W("north","명사","북쪽",1,{f:"norths",e:{en:"The wind is coming from the north.",ko:"바람이 북쪽에서 불어와."}});
W("either","부사·한정사","(둘 중) 어느 하나, ~도",1,{e:{en:"I don't like it either.",ko:"나도 그거 별로야."}});
W("future","명사","미래",1,{f:"futures",e:{en:"What are your plans for the future?",ko:"앞으로 계획이 뭐야?"}});
W("police","명사","경찰",1,{f:"polices",e:{en:"Call the police!",ko:"경찰 불러!"}});
W("reason","명사","이유",1,{f:"reasons",e:{en:"There's no reason to worry.",ko:"걱정할 이유가 없어."}});
W("red","형용사","빨간",1,{e:{en:"I bought a red jacket.",ko:"빨간 재킷을 샀어."}});
W("third","형용사","세 번째의",1,{e:{en:"This is my third time here.",ko:"여기 세 번째 와 봐."}});
W("development","명사","발전, 개발",1,{f:"developments",s:"develop(발전하다) + ment(~것).",e:{en:"The city is under development.",ko:"그 도시는 개발 중이야."}});
W("fire","명사","불, 화재",1,{f:"fires",e:{en:"There was a fire in the building.",ko:"건물에 불이 났어."}});
W("player","명사","선수, 플레이어",1,{f:"players",e:{en:"He's the best player on the team.",ko:"그가 팀에서 최고의 선수야."}});
W("art","명사","미술, 예술",1,{f:"arts",e:{en:"I'm going to an art museum.",ko:"미술관에 가는 중이야."}});
W("market","명사","시장",1,{f:"markets",e:{en:"Let's buy fruit at the market.",ko:"시장에서 과일 사자."}});
W("political","형용사","정치적인",1,{e:{en:"I avoid political topics at work.",ko:"회사에선 정치 얘기는 피해."}});
W("according","전치사","(according to) ~에 따르면",3,{e:{en:"According to the news, it will snow.",ko:"뉴스에 따르면 눈이 온대."}});
W("education","명사","교육",1,{f:"educations",s:"e(밖으로) + duc(이끌다) + ation. 재능을 밖으로 이끌어 내는 것.",e:{en:"Education is very important here.",ko:"여기선 교육이 아주 중요해."}});
W("former","형용사","이전의",1,{e:{en:"She's a former teacher.",ko:"그녀는 전직 교사야."}});
W("sometimes","부사","가끔",1,{e:{en:"I sometimes work from home.",ko:"가끔 재택근무를 해."}});
W("son","명사","아들",1,{f:"sons",e:{en:"Their son just started school.",ko:"그 집 아들이 막 학교에 들어갔어."}});
W("street","명사","거리",1,{f:"streets",e:{en:"I live on this street.",ko:"나는 이 거리에 살아."}});
W("college","명사","대학",1,{f:"colleges",e:{en:"My brother is in college.",ko:"형은 대학생이야."}});
W("current","형용사","현재의",1,{e:{en:"What's your current address?",ko:"지금 주소가 어떻게 돼요?"}});
W("program","명사","프로그램",1,{f:"programs",e:{en:"This program helps students find jobs.",ko:"이 프로그램은 학생들의 취업을 도와."}});
W("type","명사","유형, 종류",1,{f:"types",e:{en:"What type of music do you like?",ko:"어떤 종류의 음악을 좋아해?"}});
W("baby","명사","아기",1,{f:"babies",e:{en:"The baby finally fell asleep.",ko:"아기가 드디어 잠들었어."}});
W("action","명사","행동",1,{f:"actions",e:{en:"We need to take action now.",ko:"지금 행동해야 해."}});
W("self","명사","자신, 자아",1,{f:"selfs",e:{en:"Just be your true self.",ko:"그냥 너다운 모습을 보여 줘."}});
W("field","명사","분야, 들판",1,{f:"fields",e:{en:"What field do you work in?",ko:"어느 분야에서 일해요?"}});
W("mother","명사","어머니",1,{f:"mothers",e:{en:"My mother calls me every day.",ko:"엄마가 매일 전화하셔."}});
W("fight","동사·명사","싸우다, 싸움",1,{f:"fought fights fighting",e:{en:"They fight about money a lot.",ko:"그들은 돈 때문에 자주 싸워."}});
W("space","명사","공간, 우주",1,{f:"spaces",e:{en:"There's not enough space for a sofa.",ko:"소파 놓을 공간이 부족해."}});
W("wife","명사","아내",1,{f:"wives wifes",e:{en:"This is my wife, Jenny.",ko:"이쪽은 제 아내 제니예요."}});
W("beautiful","형용사","아름다운",1,{e:{en:"What a beautiful view!",ko:"정말 아름다운 경치다!"}});
W("kill","동사","죽이다",1,{f:"kills killed killing",e:{en:"This heat is killing me.",ko:"더위 때문에 죽겠어."}});
W("land","명사·동사","땅, 착륙하다",1,{f:"lands landed landing",e:{en:"The plane will land in an hour.",ko:"비행기는 한 시간 뒤에 착륙해."}});
W("shoot","동사","쏘다, 촬영하다",1,{f:"shoots shooting",e:{en:"Can I shoot a video here?",ko:"여기서 영상 찍어도 돼요?"}});
W("site","명사","장소, 현장",1,{f:"sites",e:{en:"Is there parking on site?",ko:"현장에 주차할 곳이 있나요?"}});
W("strong","형용사","강한",1,{e:{en:"This coffee is too strong.",ko:"이 커피 너무 진해."}});
W("especially","부사","특히",1,{s:"e(밖으로) + special(특별한) + ly(~하게).",e:{en:"I love fruit, especially apples.",ko:"과일 좋아해, 특히 사과."}});
W("parent","명사","부모",1,{f:"parents",e:{en:"My parents live in Busan.",ko:"부모님은 부산에 사셔."}});
W("period","명사","기간, 시기",1,{f:"periods",e:{en:"It was a hard period of my life.",ko:"내 인생에서 힘든 시기였어."}});
W("position","명사","위치, 직위",1,{f:"positions",e:{en:"I applied for the position.",ko:"그 자리에 지원했어."}});
W("similar","형용사","비슷한",1,{e:{en:"We have similar tastes.",ko:"우리는 취향이 비슷해."}});
W("above","전치사","~위에",1,{e:{en:"Read the instructions above.",ko:"위의 안내를 읽어 봐."}});
W("film","명사","영화",1,{f:"films",e:{en:"Have you seen this film?",ko:"이 영화 봤어?"}});
W("likely","형용사","~할 것 같은",1,{e:{en:"It's likely to rain later.",ko:"이따 비 올 것 같아."}});
W("military","형용사·명사","군대(의)",1,{f:"militaries",e:{en:"He served in the military for two years.",ko:"그는 2년 동안 군 복무를 했어."}});
W("personal","형용사","개인적인",1,{e:{en:"Can I ask you a personal question?",ko:"개인적인 질문 해도 될까요?"}});
W("security","명사","보안",1,{f:"securities",e:{en:"Please go through security.",ko:"보안 검색대를 통과해 주세요."}});
W("dead","형용사","죽은, 방전된",1,{e:{en:"My phone is dead.",ko:"폰 배터리가 나갔어."}});
W("industry","명사","산업",1,{f:"industries",e:{en:"She works in the film industry.",ko:"그녀는 영화 산업에서 일해."}});
W("british","형용사","영국의",1,{e:{en:"He has a British accent.",ko:"그는 영국 억양이 있어."}});
W("event","명사","행사, 사건",1,{f:"events",e:{en:"The event starts at seven.",ko:"행사는 7시에 시작해."}});
W("middle","명사·형용사","중간",1,{f:"middles",e:{en:"I'm in the middle of something.",ko:"지금 뭐 하는 중이야."}});
W("present","형용사·명사","현재의, 선물",1,{f:"presents",e:{en:"This is a present for you.",ko:"이건 너를 위한 선물이야."}});
W("boy","명사","소년",1,{f:"boys",e:{en:"The boy kicked the ball.",ko:"소년이 공을 찼어."}});
W("design","명사·동사","디자인, 설계하다",1,{f:"designs designed designing",e:{en:"I love the design of this phone.",ko:"이 폰 디자인이 정말 좋아."}});
W("gold","명사","금",1,{f:"golds",e:{en:"She won a gold medal.",ko:"그녀는 금메달을 땄어."}});
W("guess","동사","추측하다",1,{f:"guesses guessed guessing",e:{en:"Guess what happened today!",ko:"오늘 무슨 일 있었는지 맞혀 봐!"}});
W("king","명사","왕",1,{f:"kings",e:{en:"The king lived in this palace.",ko:"왕이 이 궁전에 살았어."}});
W("society","명사","사회",1,{f:"societies",e:{en:"Technology is changing society.",ko:"기술이 사회를 바꾸고 있어."}});
W("average","형용사·명사","평균(의)",1,{f:"averages",e:{en:"The average price is about ten dollars.",ko:"평균 가격은 10달러 정도야."}});
W("certain","형용사","확실한, 어떤",1,{e:{en:"Are you certain about that?",ko:"그거 확실해?"}});
W("church","명사","교회",1,{f:"churches",e:{en:"They got married in a small church.",ko:"그들은 작은 교회에서 결혼했어."}});
W("medical","형용사","의료의",1,{e:{en:"She needs medical help.",ko:"그녀는 치료가 필요해."}});
W("original","형용사","원래의, 독창적인",1,{e:{en:"I prefer the original version.",ko:"원래 버전이 더 좋아."}});
W("performance","명사","공연, 성과",1,{f:"performances",e:{en:"Her performance was amazing.",ko:"그녀의 공연은 굉장했어."}});
W("press","동사","누르다",1,{f:"presses pressed pressing",e:{en:"Press the button to start.",ko:"시작하려면 버튼을 눌러."}});
W("receive","동사","받다",1,{f:"receives received receiving",e:{en:"Did you receive my email?",ko:"내 이메일 받았어?"}});
W("director","명사","감독, 책임자",1,{f:"directors",e:{en:"Who's the director of this movie?",ko:"이 영화 감독이 누구야?"}});
W("provide","동사","제공하다",1,{f:"provides providing",e:{en:"The hotel provides free breakfast.",ko:"그 호텔은 무료 조식을 제공해."}});
W("value","명사","가치",1,{f:"values",e:{en:"This ring has great sentimental value.",ko:"이 반지는 추억이 담겨 있어 소중해."}});
W("official","형용사","공식적인",1,{e:{en:"It's not official yet.",ko:"아직 공식적인 건 아니야."}});
W("production","명사","생산, 제작",1,{f:"productions",e:{en:"The production costs are high.",ko:"제작비가 많이 들어."}});
W("rate","명사","비율, 요금",1,{f:"rates",e:{en:"What's the exchange rate today?",ko:"오늘 환율이 어떻게 돼?"}});
W("tax","명사","세금",1,{f:"taxes",e:{en:"Is tax included in the price?",ko:"가격에 세금 포함이에요?"}});
W("amount","명사","양, 금액",1,{f:"amounts",e:{en:"That's a large amount of money.",ko:"그건 큰돈이야."}});
W("drive","동사","운전하다",1,{f:"drove driven drives driving",e:{en:"Can you drive me home?",ko:"집까지 태워 줄 수 있어?"}});
W("federal","형용사","연방의",1,{e:{en:"It's a federal holiday in the US.",ko:"미국에서는 연방 공휴일이야."}});
W("management","명사","경영, 관리진",1,{f:"managements",e:{en:"The management made a new rule.",ko:"경영진이 새 규칙을 만들었어."}});
W("trust","동사·명사","믿다, 신뢰",1,{f:"trusts trusted trusting",e:{en:"I trust you completely.",ko:"난 너를 완전히 믿어."}});
W("central","형용사","중심의",1,{e:{en:"Our hotel is in central London.",ko:"우리 호텔은 런던 중심가에 있어."}});
W("science","명사","과학",1,{f:"sciences",e:{en:"He teaches science at a high school.",ko:"그는 고등학교에서 과학을 가르쳐."}});
W("various","형용사","다양한",1,{e:{en:"They sell various kinds of tea.",ko:"여러 종류의 차를 팔아."}});
W("attention","명사","주의, 관심",1,{f:"attentions",s:"at(~에) + tent(뻗다) + ion. 마음을 그쪽으로 뻗는 것.",e:{en:"Can I have your attention, please?",ko:"잠시 주목해 주시겠어요?"}});
W("brother","명사","형제",1,{f:"brothers",e:{en:"My brother lives abroad.",ko:"형은 해외에 살아."}});
W("chief","형용사·명사","최고의, 우두머리",1,{f:"chiefs",e:{en:"She's the chief editor.",ko:"그녀가 편집장이야."}});
W("football","명사","미식축구, 축구",1,{f:"footballs",e:{en:"We watched football all afternoon.",ko:"오후 내내 미식축구를 봤어."}});
W("natural","형용사","자연스러운, 자연의",1,{e:{en:"Your English sounds very natural.",ko:"네 영어 정말 자연스러워."}});
W("property","명사","재산, 부동산",1,{f:"properties",e:{en:"This is private property.",ko:"이곳은 사유지예요."}});
W("vote","동사·명사","투표하다, 투표",1,{f:"votes voted voting",e:{en:"Did you vote yesterday?",ko:"어제 투표했어?"}});
W("complete","동사·형용사","완성하다, 완전한",1,{f:"completes completed completing",e:{en:"Please complete this form.",ko:"이 서류를 작성해 주세요."}});
W("economic","형용사","경제의",1,{e:{en:"The country has economic problems.",ko:"그 나라는 경제 문제가 있어."}});
W("involve","동사","포함하다, 관련시키다",1,{f:"involves involved involving",e:{en:"The job involves a lot of travel.",ko:"그 일은 출장이 많아."}});
W("language","명사","언어",1,{f:"languages",e:{en:"How many languages do you speak?",ko:"몇 개 언어를 해?"}});
W("oil","명사","기름",1,{f:"oils",e:{en:"Add a little olive oil.",ko:"올리브유를 조금 넣어."}});
W("relate","동사","공감하다, 관련되다",1,{f:"relates relating",e:{en:"I can totally relate to that.",ko:"그거 완전 공감돼."}});
W("stage","명사","무대, 단계",1,{f:"stages",e:{en:"We're in the early stages of the project.",ko:"프로젝트 초기 단계야."}});
W("title","명사","제목",1,{f:"titles",e:{en:"What's the title of the book?",ko:"그 책 제목이 뭐야?"}});
W("article","명사","기사",1,{f:"articles",e:{en:"I read an interesting article today.",ko:"오늘 흥미로운 기사를 읽었어."}});
W("attack","명사·동사","공격, 공격하다",1,{f:"attacks attacked attacking",e:{en:"He had a heart attack last year.",ko:"그는 작년에 심장마비를 겪었어."}});
W("bear","동사·명사","참다, 곰",1,{f:"bore borne bears bearing",e:{en:"I can't bear this noise.",ko:"이 소음 못 참겠어."}});
W("entire","형용사","전체의",1,{e:{en:"I spent the entire day at home.",ko:"하루 종일 집에 있었어."}});
W("french","형용사·명사","프랑스의, 프랑스어",1,{f:"",e:{en:"I'm learning French too.",ko:"프랑스어도 배우고 있어."}});
W("perhaps","부사","아마",1,{e:{en:"Perhaps we should leave early.",ko:"아마 일찍 출발하는 게 좋겠어."}});
W("poor","형용사","가난한, 불쌍한",1,{e:{en:"The poor dog was shaking.",ko:"불쌍한 개가 떨고 있었어."}});
W("release","동사·명사","발표하다, 출시",1,{f:"releases released releasing",e:{en:"The album will be released next week.",ko:"그 앨범은 다음 주에 나와."}});
W("choice","명사","선택",1,{f:"choices",e:{en:"You made the right choice.",ko:"넌 옳은 선택을 했어."}});
W("code","명사","코드, 암호",1,{f:"codes",e:{en:"Enter the code to open the door.",ko:"문을 열려면 코드를 입력해."}});
W("continue","동사","계속하다",1,{f:"continues continued continuing",e:{en:"Let's continue tomorrow.",ko:"내일 계속하자."}});
W("currently","부사","현재",1,{e:{en:"I'm currently looking for a job.",ko:"지금 일자리를 찾고 있어."}});
W("election","명사","선거",1,{f:"elections",e:{en:"The election is next month.",ko:"선거는 다음 달이야."}});
W("financial","형용사","재정의",1,{e:{en:"I need some financial advice.",ko:"재정 관련 조언이 필요해."}});
W("foreign","형용사","외국의",1,{e:{en:"Do you speak any foreign languages?",ko:"외국어 할 줄 알아?"}});
W("hair","명사","머리카락",1,{f:"hairs",e:{en:"I'm getting my hair cut today.",ko:"오늘 머리 자를 거야."}});
W("increase","동사·명사","증가하다, 증가",1,{f:"increases increased increasing",e:{en:"Prices increased again.",ko:"가격이 또 올랐어."}});
W("legal","형용사","법적인, 합법적인",1,{e:{en:"Is that even legal?",ko:"그게 합법이긴 해?"}});
W("race","명사","경주, 인종",1,{f:"races",e:{en:"She won the race easily.",ko:"그녀는 경주에서 쉽게 이겼어."}});
W("simply","부사","그저, 간단히",1,{e:{en:"I simply forgot.",ko:"그냥 깜빡했어."}});
W("staff","명사","직원",1,{f:"staffs",e:{en:"The staff here are very friendly.",ko:"여기 직원들은 아주 친절해."}});
W("union","명사","노동조합, 연합",1,{f:"unions",e:{en:"He joined the union last year.",ko:"그는 작년에 노조에 가입했어."}});
W("career","명사","경력, 직업",1,{f:"careers",e:{en:"She wants a career in medicine.",ko:"그녀는 의료 분야에서 일하고 싶어 해."}});
W("crazy","형용사","미친, 말도 안 되는",1,{e:{en:"That's a crazy idea.",ko:"그거 말도 안 되는 생각이야."}});
W("daily","형용사","매일의",1,{e:{en:"Exercise is part of my daily routine.",ko:"운동은 내 일과의 일부야."}});
W("difficult","형용사","어려운",1,{s:"dif(아니다) + ficult(쉬운). 쉽지 않은.",e:{en:"This question is difficult.",ko:"이 질문은 어려워."}});
W("loss","명사","손실, 상실",1,{f:"losses",e:{en:"I'm sorry for your loss.",ko:"상심이 크시겠어요."}});
W("modern","형용사","현대의",1,{e:{en:"I like modern art.",ko:"현대 미술을 좋아해."}});
W("publish","동사","출판하다",1,{f:"publishes published publishing",e:{en:"She published her first book.",ko:"그녀는 첫 책을 냈어."}});
W("version","명사","버전",1,{f:"versions",e:{en:"Do you have the latest version?",ko:"최신 버전 있어?"}});
W("army","명사","군대",1,{f:"armies",e:{en:"My brother is in the army.",ko:"형은 군대에 있어."}});
W("earth","명사","지구",1,{f:"earths",e:{en:"The earth goes around the sun.",ko:"지구는 태양 주위를 돌아."}});
W("goal","명사","목표",1,{f:"goals",e:{en:"What's your goal this year?",ko:"올해 목표가 뭐야?"}});
W("sea","명사","바다",1,{f:"seas",e:{en:"We swam in the sea.",ko:"우리는 바다에서 수영했어."}});
W("sir","명사","(남성에 대한 존칭) 선생님",1,{f:"sirs",e:{en:"Excuse me, sir, you dropped this.",ko:"실례합니다, 이거 떨어뜨리셨어요."}});
W("access","명사·동사","접근, 이용하다",1,{f:"accesses accessed accessing",e:{en:"I can't access my account.",ko:"계정에 접속이 안 돼."}});
W("create","동사","만들다",1,{f:"creates created creating",e:{en:"She created her own website.",ko:"그녀는 자기 웹사이트를 만들었어."}});
W("deep","형용사","깊은",1,{e:{en:"Take a deep breath.",ko:"숨을 깊이 들이쉬어."}});
W("professional","형용사·명사","전문적인, 전문가",1,{f:"professionals",s:"profess(공언하다) + ion + al. 직업으로 공언한.",e:{en:"You should get professional help.",ko:"전문가의 도움을 받아 봐."}});
W("truth","명사","진실",1,{f:"truths",e:{en:"Just tell me the truth.",ko:"그냥 진실을 말해."}});
W("ball","명사","공",1,{f:"balls",e:{en:"Throw me the ball.",ko:"공 던져 줘."}});
W("dark","형용사","어두운",1,{e:{en:"It gets dark early in winter.",ko:"겨울엔 일찍 어두워져."}});
W("percent","명사","퍼센트",1,{f:"percents",e:{en:"Prices went up ten percent.",ko:"가격이 10% 올랐어."}});
W("piece","명사","조각",1,{f:"pieces",e:{en:"Can I have a piece of cake?",ko:"케이크 한 조각 먹어도 돼?"}});
W("product","명사","제품",1,{f:"products",e:{en:"This product is very popular.",ko:"이 제품은 인기가 많아."}});
W("recent","형용사","최근의",1,{e:{en:"Have you seen his recent photos?",ko:"걔 최근 사진 봤어?"}});
W("straight","부사·형용사","곧장, 똑바른",1,{e:{en:"Go straight for two blocks.",ko:"두 블록 곧장 가세요."}});
W("visit","동사·명사","방문하다, 방문",1,{f:"visits visited visiting",e:{en:"I'll visit my grandma this weekend.",ko:"이번 주말에 할머니 댁에 갈 거야."}});
W("culture","명사","문화",1,{f:"cultures",e:{en:"I'm interested in Korean culture.",ko:"한국 문화에 관심 있어요."}});
W("growth","명사","성장",1,{f:"growths",e:{en:"The company saw fast growth.",ko:"그 회사는 빠르게 성장했어."}});
W("marry","동사","결혼하다",1,{f:"married marries marrying",e:{en:"They got married last spring.",ko:"그들은 지난봄에 결혼했어."}});
W("officer","명사","경찰관, 장교",1,{f:"officers",e:{en:"The officer asked for my ID.",ko:"경찰관이 신분증을 달라고 했어."}});
W("response","명사","응답",1,{f:"responses",e:{en:"Thanks for your quick response.",ko:"빠른 답변 감사해요."}});
W("river","명사","강",2,{f:"rivers",e:{en:"We walked along the river.",ko:"우리는 강을 따라 걸었어."}});
W("rock","명사","바위, 록 음악",2,{f:"rocks",e:{en:"I listen to a lot of rock.",ko:"록 음악을 많이 들어."}});
W("album","명사","앨범",2,{f:"albums",e:{en:"Their new album is amazing.",ko:"그들의 새 앨범은 정말 좋아."}});
W("century","명사","세기, 100년",2,{f:"centuries",e:{en:"This church is from the 16th century.",ko:"이 교회는 16세기에 지어졌어."}});
W("network","명사","네트워크, 인맥",2,{f:"networks",e:{en:"Networking events help you build a network.",ko:"네트워킹 행사는 인맥을 쌓는 데 도움이 돼."}});
W("peace","명사","평화",2,{f:"peaces",e:{en:"I just want some peace and quiet.",ko:"그냥 좀 조용히 쉬고 싶어."}});
W("recently","부사","최근에",2,{e:{en:"I recently moved to Seoul.",ko:"최근에 서울로 이사했어."}});
W("require","동사","필요로 하다",2,{f:"requires required requiring",e:{en:"This job requires a lot of patience.",ko:"이 일은 인내심이 많이 필요해."}});
W("addition","명사","추가, (in addition) 게다가",2,{f:"additions",e:{en:"In addition, breakfast is free.",ko:"게다가 조식은 무료예요."}});
W("capital","명사","수도, 자본",2,{f:"capitals",e:{en:"Seoul is the capital of Korea.",ko:"서울은 한국의 수도야."}});
W("committee","명사","위원회",2,{f:"committees",e:{en:"The committee will decide next week.",ko:"위원회가 다음 주에 결정할 거야."}});
W("gas","명사","가스, 휘발유",2,{f:"gases",e:{en:"We need to stop for gas.",ko:"기름 넣으러 들러야 해."}});
W("island","명사","섬",2,{f:"islands",e:{en:"We spent a week on a small island.",ko:"작은 섬에서 일주일을 보냈어."}});
W("normal","형용사","보통의, 정상적인",2,{e:{en:"Is it normal to feel this tired?",ko:"이렇게 피곤한 게 정상이에요?"}});
W("population","명사","인구",2,{f:"populations",e:{en:"The city has a population of ten million.",ko:"그 도시 인구는 천만 명이야."}});
W("radio","명사","라디오",2,{f:"radios",e:{en:"I heard the song on the radio.",ko:"그 노래 라디오에서 들었어."}});
W("western","형용사","서양의, 서쪽의",2,{e:{en:"I love western food.",ko:"서양 음식 좋아해."}});
W("campaign","명사","캠페인, 운동",2,{f:"campaigns",e:{en:"The campaign raised a lot of money.",ko:"그 캠페인으로 많은 돈이 모였어."}});
W("certainly","부사","확실히, 물론",2,{e:{en:"I'll certainly think about it.",ko:"꼭 생각해 볼게."}});
W("content","명사","내용, 콘텐츠",2,{f:"contents",e:{en:"I like the content on this channel.",ko:"이 채널 콘텐츠가 좋아."}});
W("credit","명사","신용, (credit card) 신용카드",2,{f:"credits",e:{en:"Can I pay by credit card?",ko:"신용카드로 결제해도 돼요?"}});
W("describe","동사","묘사하다, 설명하다",2,{f:"describes described describing",e:{en:"Can you describe the man?",ko:"그 남자 인상착의를 설명해 줄래요?"}});
W("female","형용사·명사","여성(의)",2,{f:"females",e:{en:"I'd prefer a female doctor.",ko:"여자 의사분이면 좋겠어요."}});
W("husband","명사","남편",2,{f:"husbands",e:{en:"My husband does most of the cooking.",ko:"요리는 대부분 남편이 해."}});
W("individual","형용사·명사","개인(의)",2,{f:"individuals",e:{en:"Each individual has a different style.",ko:"사람마다 스타일이 달라."}});
W("interesting","형용사","흥미로운",2,{e:{en:"That's an interesting idea.",ko:"그거 흥미로운 생각이다."}});
W("mile","명사","마일(약 1.6km)",2,{f:"miles",e:{en:"It's about two miles from here.",ko:"여기서 2마일 정도야."}});
W("nearly","부사","거의",2,{e:{en:"I nearly missed the bus.",ko:"버스를 놓칠 뻔했어."}});
W("particular","형용사","특정한, 까다로운",2,{e:{en:"Is there a particular reason?",ko:"특별한 이유가 있어?"}});
W("region","명사","지역",2,{f:"regions",e:{en:"This region is famous for wine.",ko:"이 지역은 와인으로 유명해."}});
W("speed","명사","속도",2,{f:"speeds",e:{en:"Slow down. You're over the speed limit.",ko:"속도 줄여. 제한 속도를 넘었어."}});
W("contact","명사·동사","연락, 연락하다",2,{f:"contacts contacted contacting",e:{en:"Feel free to contact me anytime.",ko:"언제든 편하게 연락해."}});
W("positive","형용사","긍정적인",2,{e:{en:"Try to stay positive.",ko:"긍정적으로 생각해 봐."}});
W("throughout","전치사","~내내",2,{e:{en:"It rained throughout the trip.",ko:"여행 내내 비가 왔어."}});
W("tour","명사","투어, 관광",2,{f:"tours",e:{en:"We joined a walking tour.",ko:"걸어서 하는 투어에 참여했어."}});
W("absolutely","부사","완전히, 물론이지",2,{e:{en:"Absolutely! I'd love to come.",ko:"물론이지! 꼭 갈게."}});
W("additional","형용사","추가의",2,{e:{en:"Is there an additional fee?",ko:"추가 요금이 있나요?"}});
W("immediately","부사","즉시",2,{e:{en:"Please call me immediately.",ko:"바로 전화 주세요."}});
W("significant","형용사","상당한, 중요한",2,{e:{en:"There was a significant change.",ko:"상당한 변화가 있었어."}});
W("computer","명사","컴퓨터",2,{f:"computers",e:{en:"My computer is really slow.",ko:"내 컴퓨터 진짜 느려."}});
W("construction","명사","공사, 건설",2,{f:"constructions",e:{en:"There's construction on this road.",ko:"이 길은 공사 중이야."}});
W("episode","명사","(드라마의) 회차",2,{f:"episodes",e:{en:"Did you watch the last episode?",ko:"마지막 회 봤어?"}});
W("income","명사","소득",2,{f:"incomes",e:{en:"Her income doubled this year.",ko:"올해 그녀의 소득이 두 배가 됐어."}});
W("justice","명사","정의",2,{f:"justices",e:{en:"They want justice for the victims.",ko:"그들은 피해자들을 위한 정의를 원해."}});
W("movement","명사","움직임, 운동",2,{f:"movements",e:{en:"The movement started on social media.",ko:"그 운동은 SNS에서 시작됐어."}});
W("safety","명사","안전",2,{f:"safeties",e:{en:"Safety comes first.",ko:"안전이 먼저야."}});
W("scene","명사","장면, 현장",2,{f:"scenes",e:{en:"That was my favorite scene.",ko:"그게 내가 제일 좋아하는 장면이었어."}});
W("statement","명사","성명, 진술",2,{f:"statements",e:{en:"The company released a statement.",ko:"회사가 성명을 발표했어."}});
W("ability","명사","능력",2,{f:"abilities",e:{en:"She has the ability to stay calm.",ko:"그녀는 침착함을 유지하는 능력이 있어."}});
W("announce","동사","발표하다",2,{f:"announces announced announcing",e:{en:"They announced their engagement.",ko:"그들은 약혼을 발표했어."}});
W("collection","명사","수집품, 컬렉션",2,{f:"collections",e:{en:"He has a huge collection of records.",ko:"그는 음반을 엄청 많이 모았어."}});
W("definitely","부사","분명히, 꼭",2,{e:{en:"I'll definitely be there.",ko:"꼭 갈게."}});
W("heavy","형용사","무거운, 심한",2,{e:{en:"This box is really heavy.",ko:"이 상자 정말 무거워."}});
W("knowledge","명사","지식",2,{f:"knowledges",e:{en:"He has a lot of knowledge about wine.",ko:"그는 와인에 대해 아는 게 많아."}});
W("particularly","부사","특히",2,{e:{en:"I'm not particularly hungry.",ko:"별로 배가 안 고파."}});
W("search","동사·명사","찾다, 검색",2,{f:"searches searched searching",e:{en:"I searched for it online.",ko:"온라인에서 찾아봤어."}});
W("wide","형용사","넓은",2,{e:{en:"The road is very wide.",ko:"그 길은 아주 넓어."}});
W("dad","명사","아빠",2,{f:"dads",e:{en:"My dad loves fishing.",ko:"우리 아빠는 낚시를 정말 좋아해."}});
W("develop","동사","개발하다, 발달시키다",2,{f:"develops developed developing",e:{en:"I want to develop my skills.",ko:"내 실력을 키우고 싶어."}});
W("fear","명사·동사","두려움, 두려워하다",2,{f:"fears feared fearing",e:{en:"I have a fear of heights.",ko:"나는 고소공포증이 있어."}});
W("generally","부사","일반적으로",2,{e:{en:"I generally wake up at seven.",ko:"보통 7시에 일어나."}});
W("german","형용사·명사","독일의, 독일어",2,{f:"germans",e:{en:"She speaks German fluently.",ko:"그녀는 독일어를 유창하게 해."}});
W("interested","형용사","관심 있는",2,{e:{en:"Are you interested in art?",ko:"미술에 관심 있어?"}});
W("judge","명사·동사","판사, 판단하다",2,{f:"judges judged judging",e:{en:"Don't judge people by their looks.",ko:"겉모습으로 사람을 판단하지 마."}});
W("leader","명사","지도자, 리더",2,{f:"leaders",e:{en:"She's a natural leader.",ko:"그녀는 타고난 리더야."}});
W("letter","명사","편지, 글자",2,{f:"letters",e:{en:"I wrote her a letter.",ko:"그녀에게 편지를 썼어."}});
W("material","명사","재료, 자료",2,{f:"materials",e:{en:"What material is this made of?",ko:"이거 무슨 재료로 만들었어요?"}});
W("secretary","명사","비서, 장관",2,{f:"secretaries",e:{en:"Please leave a message with my secretary.",ko:"제 비서에게 메시지를 남겨 주세요."}});
W("sister","명사","자매",2,{f:"sisters",e:{en:"My sister is two years older than me.",ko:"언니는 나보다 두 살 많아."}});
W("unit","명사","단위, 단원",2,{f:"units",e:{en:"We finished the first unit today.",ko:"오늘 첫 단원을 끝냈어."}});
W("worker","명사","노동자, 직원",2,{f:"workers",e:{en:"The workers went on strike.",ko:"노동자들이 파업했어."}});
W("annual","형용사","연간의, 매년의",2,{e:{en:"We have an annual meeting in May.",ko:"5월에 연례 회의가 있어."}});
W("anymore","부사","더 이상",2,{e:{en:"I don't live there anymore.",ko:"더 이상 거기 안 살아."}});
W("bar","명사","술집, 막대",2,{f:"bars",e:{en:"Let's meet at the bar after work.",ko:"퇴근하고 술집에서 만나자."}});
W("battle","명사","전투, 싸움",2,{f:"battles",e:{en:"It's a constant battle to stay healthy.",ko:"건강을 지키는 건 끝없는 싸움이야."}});
W("contract","명사","계약(서)",2,{f:"contracts",e:{en:"Read the contract carefully.",ko:"계약서를 꼼꼼히 읽어."}});
W("degree","명사","학위, (온도) 도",2,{f:"degrees",e:{en:"It's thirty degrees outside.",ko:"밖은 30도야."}});
W("feature","명사","기능, 특징",2,{f:"features",e:{en:"This phone has a great camera feature.",ko:"이 폰은 카메라 기능이 좋아."}});
W("floor","명사","바닥, 층",2,{f:"floors",e:{en:"Our office is on the fifth floor.",ko:"우리 사무실은 5층이야."}});
W("grow","동사","자라다, 기르다",2,{f:"grew grown grows growed growing",e:{en:"I grew up in a small town.",ko:"나는 작은 동네에서 자랐어."}});
W("image","명사","이미지, 모습",2,{f:"images",e:{en:"The image on the screen is blurry.",ko:"화면의 이미지가 흐려."}});
W("majority","명사","대다수",2,{f:"majorities",e:{en:"The majority of people agreed.",ko:"대다수 사람들이 동의했어."}});
W("physical","형용사","신체의, 물리적인",2,{e:{en:"Physical exercise helps me sleep.",ko:"몸을 쓰는 운동을 하면 잠이 잘 와."}});
W("stupid","형용사","어리석은",2,{e:{en:"That was a stupid mistake.",ko:"그건 바보 같은 실수였어."}});
W("successful","형용사","성공한",2,{e:{en:"Her business is very successful.",ko:"그녀의 사업은 아주 잘돼."}});
W("active","형용사","활동적인",2,{e:{en:"My grandma is still very active.",ko:"할머니는 여전히 아주 활동적이셔."}});
W("administration","명사","행정, 관리",2,{f:"administrations",e:{en:"Talk to the school administration.",ko:"학교 행정실에 얘기해 봐."}});
W("australian","형용사·명사","호주의, 호주 사람",2,{f:"australians",e:{en:"My roommate is Australian.",ko:"내 룸메이트는 호주 사람이야."}});
W("cancer","명사","암",2,{f:"cancers",e:{en:"She's a cancer survivor.",ko:"그녀는 암을 이겨 냈어."}});
W("civil","형용사","시민의, 정중한",2,{e:{en:"Let's keep this conversation civil.",ko:"이 대화는 정중하게 하자."}});
W("defense","명사","방어",2,{f:"defenses",e:{en:"Their defense is really strong.",ko:"그 팀은 수비가 정말 강해."}});
W("independent","형용사","독립적인",2,{e:{en:"She's very independent.",ko:"그녀는 아주 독립적이야."}});
W("worst","형용사","최악의",2,{e:{en:"That was the worst day of my life.",ko:"그날은 내 인생 최악의 날이었어."}});
W("awesome","형용사","굉장한, 멋진",2,{e:{en:"That concert was awesome!",ko:"그 콘서트 끝내줬어!"}});
W("band","명사","밴드",2,{f:"bands",e:{en:"He plays guitar in a band.",ko:"그는 밴드에서 기타를 쳐."}});
W("commercial","형용사·명사","상업의, 광고",2,{f:"commercials",e:{en:"I saw a funny commercial on TV.",ko:"TV에서 웃긴 광고를 봤어."}});
W("effort","명사","노력",2,{f:"efforts",e:{en:"Thanks for all your effort.",ko:"노력해 줘서 고마워."}});
W("imagine","동사","상상하다",2,{f:"imagines imagined imagining",e:{en:"I can't imagine living without music.",ko:"음악 없이 사는 건 상상도 못 해."}});
W("lack","명사·동사","부족, 부족하다",2,{f:"lacks lacked lacking",e:{en:"I'm tired from lack of sleep.",ko:"잠이 부족해서 피곤해."}});
W("multiple","형용사","여러",2,{e:{en:"I tried multiple times.",ko:"여러 번 시도했어."}});
W("operation","명사","수술, 운영",2,{f:"operations",e:{en:"He's recovering from an operation.",ko:"그는 수술 후 회복 중이야."}});
W("organization","명사","조직, 단체",2,{f:"organizations",e:{en:"She works for a nonprofit organization.",ko:"그녀는 비영리 단체에서 일해."}});
W("protect","동사","보호하다",2,{f:"protects protected protecting",e:{en:"Wear sunscreen to protect your skin.",ko:"피부를 보호하려면 선크림을 발라."}});
W("secret","명사·형용사","비밀(의)",2,{f:"secrets",e:{en:"Can you keep a secret?",ko:"비밀 지킬 수 있어?"}});
W("senior","형용사·명사","상급의, 어르신",2,{f:"seniors",e:{en:"He's a senior engineer.",ko:"그는 선임 엔지니어야."}});
W("spring","명사","봄",2,{f:"springs",e:{en:"The flowers bloom in spring.",ko:"봄에 꽃이 펴."}});
W("activity","명사","활동",2,{f:"activities",e:{en:"What activities do you enjoy?",ko:"어떤 활동을 즐겨?"}});
W("analysis","명사","분석",2,{f:"",e:{en:"We need a deeper analysis.",ko:"더 깊은 분석이 필요해."}});
W("choose","동사","고르다",2,{f:"chose chosen chooses choosed choosing",e:{en:"It's hard to choose.",ko:"고르기 어려워."}});
W("competition","명사","대회, 경쟁",2,{f:"competitions",e:{en:"She entered a singing competition.",ko:"그녀는 노래 대회에 나갔어."}});
W("dream","명사·동사","꿈, 꿈꾸다",2,{f:"dreamt dreams dreamed dreaming",e:{en:"It's my dream to live by the sea.",ko:"바닷가에 사는 게 내 꿈이야."}});
W("literally","부사","말 그대로, 진짜로",2,{e:{en:"I literally ran all the way here.",ko:"여기까지 진짜로 뛰어왔어."}});
W("luck","명사","운",2,{f:"lucks",e:{en:"Good luck with your interview!",ko:"면접 잘 봐!"}});
W("marriage","명사","결혼",2,{f:"marriages",e:{en:"They have a happy marriage.",ko:"그들은 행복한 결혼 생활을 하고 있어."}});
W("necessary","형용사","필요한",2,{e:{en:"Is it necessary to book in advance?",ko:"미리 예약해야 하나요?"}});
W("patient","명사·형용사","환자, 참을성 있는",2,{f:"patients",e:{en:"Please be patient with me.",ko:"조금만 참아 줘."}});
W("suppose","동사","생각하다, (be supposed to) ~하기로 되어 있다",2,{f:"supposes supposed supposing",e:{en:"We're supposed to meet at six.",ko:"우리 6시에 만나기로 했어."}});
W("thus","부사","따라서",2,{e:{en:"The road was closed, thus the delay.",ko:"길이 막혀서 늦어졌어."}});
W("directly","부사","직접",2,{e:{en:"You can contact him directly.",ko:"그에게 직접 연락해도 돼."}});
W("disease","명사","질병",2,{f:"diseases",e:{en:"Heart disease runs in my family.",ko:"우리 집안에 심장병 내력이 있어."}});
W("doubt","명사·동사","의심, 의심하다",2,{f:"doubts doubted doubting",e:{en:"I doubt he'll come.",ko:"걔가 올지 의문이야."}});
W("establish","동사","설립하다, 확립하다",2,{f:"establishes established establishing",e:{en:"The company was established in 1990.",ko:"그 회사는 1990년에 세워졌어."}});
W("fish","명사","물고기, 생선",2,{f:"fishes",e:{en:"I don't eat raw fish.",ko:"날생선은 안 먹어."}});
W("overall","부사·형용사","전반적으로",2,{e:{en:"Overall, it was a good trip.",ko:"전반적으로 좋은 여행이었어."}});
W("record","명사·동사","기록, 녹음하다",2,{f:"records recorded recording",e:{en:"She broke the world record.",ko:"그녀는 세계 기록을 깼어."}});
W("associate","동사","연관 짓다",2,{f:"associates associated associating",e:{en:"I associate this song with summer.",ko:"이 노래를 들으면 여름이 떠올라."}});
W("basic","형용사","기본적인",2,{e:{en:"I only know basic Spanish.",ko:"기초 스페인어만 알아."}});
W("captain","명사","주장, 선장",2,{f:"captains",e:{en:"He's the captain of our team.",ko:"그가 우리 팀 주장이야."}});
W("carry","동사","들고 다니다, 나르다",2,{f:"carried carries carrying",e:{en:"Can you help me carry this?",ko:"이거 드는 것 좀 도와줄래?"}});
W("crime","명사","범죄",2,{f:"crimes",e:{en:"Crime is low in this area.",ko:"이 지역은 범죄가 적어."}});
W("effective","형용사","효과적인",2,{e:{en:"This medicine is very effective.",ko:"이 약은 효과가 좋아."}});
W("highly","부사","매우, 높이",2,{e:{en:"I highly recommend this book.",ko:"이 책 강력 추천해."}});
W("male","형용사·명사","남성(의)",2,{f:"males",e:{en:"Most of the staff are male.",ko:"직원 대부분이 남자야."}});
W("reality","명사","현실",2,{f:"realities",e:{en:"It's time to face reality.",ko:"현실을 직시할 때야."}});
W("advice","명사","조언",2,{f:"advices",e:{en:"Can I give you some advice?",ko:"조언 하나 해 줘도 될까?"}});
W("agreement","명사","합의, 계약",2,{f:"agreements",e:{en:"We finally reached an agreement.",ko:"드디어 합의에 이르렀어."}});
W("award","명사","상",2,{f:"awards",e:{en:"The film won three awards.",ko:"그 영화는 상을 세 개 받았어."}});
W("block","명사·동사","블록, 막다",2,{f:"blocks blocked blocking",e:{en:"The store is two blocks away.",ko:"가게는 두 블록 떨어져 있어."}});
W("equipment","명사","장비",2,{f:"equipments",e:{en:"We rent all the equipment there.",ko:"장비는 전부 거기서 빌려."}});
W("eventually","부사","결국",2,{e:{en:"She eventually said yes.",ko:"그녀는 결국 승낙했어."}});
W("nation","명사","국가, 국민",2,{f:"nations",e:{en:"The whole nation watched the game.",ko:"온 국민이 그 경기를 봤어."}});
W("primary","형용사","주된, 초등의",2,{e:{en:"My primary goal is to stay healthy.",ko:"내 주된 목표는 건강을 지키는 거야."}});
W("purpose","명사","목적",2,{f:"purposes",e:{en:"What's the purpose of your visit?",ko:"방문 목적이 뭐예요?"}});
W("teacher","명사","선생님",2,{f:"teachers",e:{en:"My English teacher is from Canada.",ko:"우리 영어 선생님은 캐나다 사람이야."}});
W("theory","명사","이론",2,{f:"theories",e:{en:"That's just a theory.",ko:"그건 그냥 이론일 뿐이야."}});
W("agency","명사","대행사, 기관",2,{f:"agencies",e:{en:"I booked it through a travel agency.",ko:"여행사를 통해 예약했어."}});
W("mission","명사","임무",2,{f:"missions",e:{en:"Our mission is to help small businesses.",ko:"우리 임무는 소상공인을 돕는 거야."}});
W("politics","명사","정치",3,{f:"",e:{en:"I'm not interested in politics.",ko:"정치엔 관심 없어."}});
W("produce","동사","생산하다",2,{f:"produces produced producing",e:{en:"This farm produces organic vegetables.",ko:"이 농장은 유기농 채소를 생산해."}});
W("status","명사","상태, 지위",2,{f:"statuses",e:{en:"Can I check the status of my order?",ko:"주문 상태 확인할 수 있어요?"}});
W("therefore","부사","그러므로",2,{e:{en:"It's late; therefore, the shop is closed.",ko:"늦어서 가게가 닫았어."}});
W("trial","명사","재판, 시험",2,{f:"trials",e:{en:"You can get a free trial for a month.",ko:"한 달 무료 체험을 할 수 있어."}});
W("truly","부사","진심으로",2,{e:{en:"I'm truly sorry.",ko:"진심으로 미안해."}});
W("application","명사","지원서, 앱",2,{f:"applications",e:{en:"I sent my application yesterday.",ko:"어제 지원서를 보냈어."}});
W("complex","형용사","복잡한",2,{e:{en:"The situation is more complex than that.",ko:"상황은 그보다 더 복잡해."}});
W("division","명사","부서, 나눗셈",2,{f:"divisions",e:{en:"She manages the sales division.",ko:"그녀는 영업 부서를 관리해."}});
W("freedom","명사","자유",2,{f:"freedoms",e:{en:"I love the freedom of working from home.",ko:"재택근무의 자유로움이 좋아."}});
W("interview","명사·동사","면접, 인터뷰하다",2,{f:"interviews interviewed interviewing",e:{en:"I have a job interview tomorrow.",ko:"내일 면접이 있어."}});
W("locate","동사","(위치를) 찾다",2,{f:"locates located locating",e:{en:"We couldn't locate the problem.",ko:"문제를 찾지 못했어."}});
W("murder","명사","살인",2,{f:"murders",e:{en:"It's a murder mystery.",ko:"그건 살인 추리물이야."}});
W("star","명사","별, 스타",2,{f:"stars",e:{en:"We watched the stars at night.",ko:"밤에 별을 봤어."}});
W("accept","동사","받아들이다",2,{f:"accepts accepted accepting",e:{en:"I accept your apology.",ko:"사과 받아 줄게."}});
W("actual","형용사","실제의",2,{e:{en:"What's the actual price?",ko:"실제 가격이 얼마예요?"}});
W("appear","동사","나타나다, ~인 것 같다",2,{f:"appears appeared appearing",e:{en:"He appeared out of nowhere.",ko:"그가 갑자기 나타났어."}});
W("attempt","명사·동사","시도, 시도하다",2,{f:"attempts attempted attempting",e:{en:"She passed on her first attempt.",ko:"그녀는 첫 시도에 합격했어."}});
W("fat","형용사·명사","뚱뚱한, 지방",2,{f:"fats",e:{en:"This yogurt is low in fat.",ko:"이 요거트는 지방이 적어."}});
W("glass","명사","유리, 잔",2,{f:"glasses",e:{en:"Can I have a glass of water?",ko:"물 한 잔 주실래요?"}});
W("northern","형용사","북쪽의",2,{e:{en:"We're traveling in northern Italy.",ko:"이탈리아 북부를 여행 중이야."}});
W("powerful","형용사","강력한",2,{e:{en:"It was a powerful speech.",ko:"강렬한 연설이었어."}});
W("prior","형용사","이전의, (prior to) ~ 전에",2,{e:{en:"Please arrive prior to nine.",ko:"9시 전에 도착해 주세요."}});
W("protection","명사","보호",2,{f:"protections",e:{en:"Wear gloves for protection.",ko:"보호를 위해 장갑을 껴."}});
W("religious","형용사","종교적인",2,{e:{en:"My parents are very religious.",ko:"우리 부모님은 신앙심이 깊으셔."}});
W("ride","동사·명사","타다, 태워 줌",2,{f:"rode ridden rides riding",e:{en:"Do you need a ride home?",ko:"집까지 태워 줄까?"}});
W("speech","명사","연설, 말",2,{f:"speeches",e:{en:"She gave a great speech at the wedding.",ko:"그녀는 결혼식에서 멋진 축사를 했어."}});
W("tree","명사","나무",2,{f:"trees",e:{en:"There's a big tree in our yard.",ko:"우리 마당에 큰 나무가 있어."}});
W("wonderful","형용사","훌륭한",2,{e:{en:"We had a wonderful time.",ko:"정말 즐거운 시간 보냈어."}});
W("animal","명사","동물",2,{f:"animals",e:{en:"Do you have any animals at home?",ko:"집에 동물 키워?"}});
W("bottom","명사","바닥, 맨 아래",2,{f:"bottoms",e:{en:"Sign at the bottom of the page.",ko:"페이지 맨 아래에 서명하세요."}});
W("demand","명사·동사","수요, 요구하다",2,{f:"demands demanded demanding",e:{en:"There's a high demand for nurses.",ko:"간호사 수요가 많아."}});
W("engine","명사","엔진",2,{f:"engines",e:{en:"The engine won't start.",ko:"시동이 안 걸려."}});
W("famous","형용사","유명한",2,{e:{en:"This street is famous for its cafés.",ko:"이 거리는 카페로 유명해."}});
W("investment","명사","투자",2,{f:"investments",e:{en:"Buying a house is a big investment.",ko:"집을 사는 건 큰 투자야."}});
W("lie","동사·명사","거짓말하다, 눕다",2,{f:"lied lying lay lain lies",e:{en:"Don't lie to me.",ko:"나한테 거짓말하지 마."}});
W("partner","명사","파트너, 동반자",2,{f:"partners",e:{en:"I'll ask my partner.",ko:"파트너한테 물어볼게."}});
W("solution","명사","해결책",2,{f:"solutions",e:{en:"We need to find a solution.",ko:"해결책을 찾아야 해."}});
W("square","명사·형용사","광장, 정사각형의",2,{f:"squares",e:{en:"Let's meet in the main square.",ko:"중앙 광장에서 만나자."}});
W("traditional","형용사","전통적인",2,{e:{en:"We tried traditional Korean food.",ko:"전통 한식을 먹어 봤어."}});
W("wind","명사","바람",2,{f:"winds",e:{en:"The wind is really strong today.",ko:"오늘 바람이 정말 세."}});
W("cent","명사","센트",2,{f:"cents",e:{en:"It only costs fifty cents.",ko:"50센트밖에 안 해."}});
W("count","동사","세다, 중요하다",2,{f:"counts counted counting",e:{en:"Every little bit counts.",ko:"작은 것 하나하나가 중요해."}});
W("critical","형용사","중대한, 비판적인",2,{e:{en:"This is a critical moment.",ko:"지금이 중대한 순간이야."}});
W("fourth","형용사","네 번째의",2,{e:{en:"This is our fourth date.",ko:"이번이 네 번째 데이트야."}});
W("mental","형용사","정신의",2,{e:{en:"Mental health is just as important.",ko:"정신 건강도 똑같이 중요해."}});
W("mostly","부사","대부분",2,{e:{en:"I mostly work from home.",ko:"대부분 재택근무를 해."}});
W("mouth","명사","입",2,{f:"mouths",e:{en:"Don't talk with your mouth full.",ko:"입에 음식 넣고 말하지 마."}});
W("previously","부사","이전에",2,{e:{en:"I previously worked in Busan.",ko:"전에 부산에서 일했어."}});
W("remain","동사","남아 있다, 여전히 ~이다",2,{f:"remains remained remaining",e:{en:"Please remain seated.",ko:"자리에 앉아 계세요."}});
W("scale","명사","규모, 저울",2,{f:"scales",e:{en:"The project is on a large scale.",ko:"그 프로젝트는 규모가 커."}});
W("score","명사·동사","점수, 득점하다",2,{f:"scores scored scoring",e:{en:"What was the final score?",ko:"최종 점수가 몇 대 몇이었어?"}});
W("separate","형용사·동사","별개의, 나누다",2,{f:"separates separated separating",e:{en:"Can we get separate checks?",ko:"계산서 따로 주실래요?"}});
W("smart","형용사","똑똑한",2,{e:{en:"She's really smart.",ko:"그녀는 정말 똑똑해."}});
W("surface","명사","표면",2,{f:"surfaces",e:{en:"Clean the surface with a dry cloth.",ko:"마른 천으로 표면을 닦아."}});
W("totally","부사","완전히",2,{e:{en:"I totally forgot about it.",ko:"그거 완전히 잊어버렸어."}});
W("wedding","명사","결혼식",2,{f:"weddings",e:{en:"We're going to a wedding on Saturday.",ko:"토요일에 결혼식 가."}});
W("estate","명사","토지, (real estate) 부동산",2,{f:"estates",e:{en:"He works in real estate.",ko:"그는 부동산 일을 해."}});
W("faith","명사","믿음",2,{f:"faiths",e:{en:"Don't lose faith.",ko:"믿음을 잃지 마."}});
W("fashion","명사","패션, 유행",2,{f:"fashions",e:{en:"She has great taste in fashion.",ko:"그녀는 패션 감각이 좋아."}});
W("fund","명사·동사","자금, 기금을 대다",2,{f:"funds funded funding",e:{en:"We're raising funds for the school.",ko:"학교를 위해 기금을 모으고 있어."}});
W("generation","명사","세대",2,{f:"generations",e:{en:"My generation grew up with the internet.",ko:"우리 세대는 인터넷과 함께 자랐어."}});
W("metal","명사","금속",2,{f:"metals",e:{en:"The chair is made of metal.",ko:"그 의자는 금속으로 만들었어."}});
W("profile","명사","프로필",2,{f:"profiles",e:{en:"Update your profile picture.",ko:"프로필 사진을 바꿔 봐."}});
W("rise","동사·명사","오르다, 상승",2,{f:"rose risen rises rised rising",e:{en:"Prices keep rising.",ko:"물가가 계속 올라."}});
W("target","명사","목표, 대상",2,{f:"targets",e:{en:"Our target is 100 customers a day.",ko:"목표는 하루 손님 100명이야."}});
W("village","명사","마을",2,{f:"villages",e:{en:"They live in a small village.",ko:"그들은 작은 마을에 살아."}});
W("agent","명사","대리인, 직원",2,{f:"agents",e:{en:"I spoke to a travel agent.",ko:"여행사 직원과 얘기했어."}});
W("authority","명사","권한, 당국",2,{f:"authorities",e:{en:"I don't have the authority to do that.",ko:"저는 그럴 권한이 없어요."}});
W("basis","명사","기준, 근거",2,{f:"",e:{en:"We meet on a weekly basis.",ko:"우리는 매주 만나."}});
W("dude","명사","(구어) 친구, 녀석",2,{f:"dudes",e:{en:"Dude, that was amazing!",ko:"야, 그거 대박이었어!"}});
W("employee","명사","직원",2,{f:"employees",e:{en:"The company has fifty employees.",ko:"그 회사엔 직원이 50명 있어."}});
W("enter","동사","들어가다, 입력하다",2,{f:"enters entered entering",e:{en:"Enter your password.",ko:"비밀번호를 입력하세요."}});
W("ex","명사","전 애인",2,{f:"exes",e:{en:"I ran into my ex yesterday.",ko:"어제 전 애인을 마주쳤어."}});
W("gain","동사·명사","얻다, 늘다",2,{f:"gains gained gaining",e:{en:"I gained a few pounds over the holidays.",ko:"연휴 동안 살이 좀 쪘어."}});
W("silver","명사","은",2,{f:"silvers",e:{en:"She wore a silver necklace.",ko:"그녀는 은목걸이를 했어."}});
W("soul","명사","영혼",2,{f:"souls",e:{en:"This music is good for the soul.",ko:"이 음악은 마음을 달래 줘."}});
W("supply","명사·동사","공급, 공급하다",2,{f:"supplies supplied supplying",e:{en:"We need to buy office supplies.",ko:"사무용품을 사야 해."}});
W("waste","동사·명사","낭비하다, 낭비",2,{f:"wastes wasted wasting",e:{en:"Don't waste your money on that.",ko:"그런 데 돈 낭비하지 마."}});
W("adult","명사·형용사","어른(의)",2,{f:"adults",e:{en:"Tickets are ten dollars for adults.",ko:"성인 표는 10달러예요."}});
W("apparently","부사","듣자 하니",2,{e:{en:"Apparently, the store is closing.",ko:"듣자 하니 그 가게 문 닫는대."}});
W("artist","명사","예술가",2,{f:"artists",e:{en:"She's a talented artist.",ko:"그녀는 재능 있는 예술가야."}});
W("chairman","명사","회장, 의장",2,{f:"chairmen",e:{en:"The chairman opened the meeting.",ko:"의장이 회의를 시작했어."}});
W("engineering","명사","공학",2,{f:"",e:{en:"He studied engineering in college.",ko:"그는 대학에서 공학을 전공했어."}});
W("healthy","형용사","건강한",2,{e:{en:"I'm trying to eat healthy food.",ko:"건강한 음식을 먹으려고 해."}});
W("method","명사","방법",2,{f:"methods",e:{en:"What method do you use to study?",ko:"공부할 때 어떤 방법을 써?"}});
W("obviously","부사","분명히, 당연히",2,{e:{en:"Obviously, I said yes.",ko:"당연히 좋다고 했지."}});
W("prison","명사","감옥",2,{f:"prisons",e:{en:"He spent five years in prison.",ko:"그는 감옥에서 5년을 보냈어."}});
W("stone","명사","돌",2,{f:"stones",e:{en:"The house is built of stone.",ko:"그 집은 돌로 지어졌어."}});
W("user","명사","사용자",2,{f:"users",e:{en:"The app has millions of users.",ko:"그 앱은 사용자가 수백만 명이야."}});
W("wild","형용사","야생의, 정신없는",2,{e:{en:"We saw wild horses.",ko:"야생마를 봤어."}});
W("winner","명사","우승자",2,{f:"winners",e:{en:"And the winner is...",ko:"그리고 우승자는…"}});
W("cast","명사","출연진",2,{f:"casts",e:{en:"The cast of this show is great.",ko:"이 프로그램 출연진이 좋아."}});
W("dangerous","형용사","위험한",2,{e:{en:"It's dangerous to walk here at night.",ko:"밤에 여기 걷는 건 위험해."}});
W("extremely","부사","극도로",2,{e:{en:"I'm extremely tired.",ko:"극도로 피곤해."}});
W("firm","명사·형용사","회사, 단단한",2,{f:"firms",e:{en:"She works at a law firm.",ko:"그녀는 법률 회사에서 일해."}});
W("handle","동사","다루다, 처리하다",2,{f:"handles handled handling",e:{en:"Can you handle this?",ko:"이거 처리할 수 있어?"}});
W("indeed","부사","정말로",2,{e:{en:"It was indeed a great day.",ko:"정말로 멋진 날이었어."}});
W("negative","형용사","부정적인",2,{e:{en:"Don't be so negative.",ko:"너무 부정적으로 생각하지 마."}});
W("prevent","동사","막다, 예방하다",2,{f:"prevents prevented preventing",e:{en:"Wash your hands to prevent colds.",ko:"감기 예방하려면 손을 씻어."}});
W("remove","동사","없애다, 제거하다",2,{f:"removes removed removing",e:{en:"Please remove your shoes.",ko:"신발을 벗어 주세요."}});
W("television","명사","텔레비전",2,{f:"televisions",e:{en:"There's nothing good on television.",ko:"TV에 볼 게 없어."}});
W("advantage","명사","장점, 이점",2,{f:"advantages",e:{en:"One advantage is the low price.",ko:"한 가지 장점은 싼 가격이야."}});
W("apart","부사","떨어져",2,{e:{en:"We live two hours apart.",ko:"우리는 두 시간 거리에 떨어져 살아."}});
W("aware","형용사","알고 있는",2,{e:{en:"Are you aware of the risks?",ko:"위험을 알고 있어?"}});
W("dollar","명사","달러",2,{f:"dollars",e:{en:"It costs twenty dollars.",ko:"20달러야."}});
W("fifth","형용사","다섯 번째의",2,{e:{en:"He finished fifth in the race.",ko:"그는 경주에서 5등을 했어."}});
W("function","명사","기능",2,{f:"functions",e:{en:"What's the function of this button?",ko:"이 버튼은 무슨 기능이에요?"}});
W("influence","명사·동사","영향, 영향을 주다",2,{f:"influences influenced influencing",e:{en:"My mom had a big influence on me.",ko:"엄마가 나에게 큰 영향을 줬어."}});
W("progress","명사","진전",2,{f:"progresses",e:{en:"I'm making progress with my English.",ko:"영어 실력이 늘고 있어."}});
W("standard","명사·형용사","기준, 표준의",2,{f:"standards",e:{en:"The standards here are very high.",ko:"여기 기준은 아주 높아."}});
W("wood","명사","나무, 목재",2,{f:"woods",e:{en:"The table is made of wood.",ko:"그 식탁은 나무로 만들었어."}});
W("background","명사","배경",2,{f:"backgrounds",e:{en:"What's your educational background?",ko:"학력이 어떻게 되세요?"}});
W("birth","명사","출생",2,{f:"births",e:{en:"What's your date of birth?",ko:"생년월일이 어떻게 되세요?"}});
W("concept","명사","개념",2,{f:"concepts",e:{en:"The concept is simple.",ko:"개념은 간단해."}});
W("copy","명사·동사","사본, 복사하다",2,{f:"copies copied copying",e:{en:"Can I get a copy of this?",ko:"이거 사본 받을 수 있어요?"}});
W("dear","형용사","소중한, (편지) ~에게",2,{e:{en:"Thank you, my dear friend.",ko:"고마워, 소중한 친구야."}});
W("garden","명사","정원",2,{f:"gardens",e:{en:"My mom grows tomatoes in her garden.",ko:"엄마는 정원에서 토마토를 키우셔."}});
W("host","명사·동사","주최자, 주최하다",2,{f:"hosts hosted hosting",e:{en:"We're hosting a party on Friday.",ko:"금요일에 파티를 열어."}});
W("housing","명사","주택",2,{f:"housings",e:{en:"Housing is expensive in this city.",ko:"이 도시는 집값이 비싸."}});
W("labor","명사","노동",2,{f:"labors",e:{en:"The price includes parts and labor.",ko:"가격에 부품과 인건비가 포함돼 있어요."}});
W("leadership","명사","리더십",2,{f:"leaderships",e:{en:"She showed great leadership.",ko:"그녀는 뛰어난 리더십을 보였어."}});
W("length","명사","길이",2,{f:"lengths",e:{en:"What's the length of the movie?",ko:"영화 상영 시간이 얼마야?"}});
W("lucky","형용사","운 좋은",2,{e:{en:"You're so lucky!",ko:"너 정말 운 좋다!"}});
W("prove","동사","증명하다",2,{f:"proves proved proving",e:{en:"Can you prove it?",ko:"그거 증명할 수 있어?"}});
W("rare","형용사","드문, 덜 익은",2,{e:{en:"It's rare to see snow here.",ko:"여기서 눈 보는 건 드물어."}});
W("skill","명사","기술, 실력",2,{f:"skills",e:{en:"Communication is an important skill.",ko:"소통은 중요한 기술이야."}});
W("software","명사","소프트웨어",2,{f:"softwares",e:{en:"You need to update the software.",ko:"소프트웨어를 업데이트해야 해."}});
W("thousand","숫자","천, 1000",2,{f:"thousands",e:{en:"There were thousands of people.",ko:"사람이 수천 명 있었어."}});
W("tough","형용사","힘든, 강인한",2,{e:{en:"It's been a tough week.",ko:"힘든 한 주였어."}});
W("alive","형용사","살아 있는",2,{e:{en:"I feel so alive here.",ko:"여기 있으니 살아 있는 느낌이야."}});
W("apple","명사","사과",2,{f:"apples",e:{en:"An apple a day keeps the doctor away.",ko:"하루 사과 한 개면 병원 갈 일 없다."}});
W("birthday","명사","생일",2,{f:"birthdays",e:{en:"Happy birthday!",ko:"생일 축하해!"}});
W("boss","명사","상사",2,{f:"bosses",e:{en:"My boss is on vacation.",ko:"상사가 휴가 중이야."}});
W("dress","명사·동사","드레스, 옷을 입다",2,{f:"dresses dressed dressing",e:{en:"You don't need to dress up.",ko:"차려입을 필요 없어."}});
W("fellow","형용사","동료의",2,{e:{en:"I met a fellow traveler on the train.",ko:"기차에서 같은 여행자를 만났어."}});
W("horse","명사","말",2,{f:"horses",e:{en:"Have you ever ridden a horse?",ko:"말 타 본 적 있어?"}});
W("magic","명사","마법, 마술",2,{f:"magics",e:{en:"The kids loved the magic show.",ko:"아이들이 마술 쇼를 좋아했어."}});
W("net","명사","그물, 망",2,{f:"nets",e:{en:"The ball hit the net.",ko:"공이 네트에 맞았어."}});
W("vehicle","명사","차량",2,{f:"vehicles",e:{en:"Please stay in your vehicle.",ko:"차 안에 계세요."}});
W("volume","명사","음량, 양",2,{f:"volumes",e:{en:"Can you turn up the volume?",ko:"볼륨 좀 키워 줄래?"}});
W("aid","명사","도움, 지원",2,{f:"aids",e:{en:"Do you know first aid?",ko:"응급 처치할 줄 알아?"}});
W("beauty","명사","아름다움",2,{f:"beauties",e:{en:"The beauty of this place is amazing.",ko:"이곳의 아름다움은 굉장해."}});
W("corner","명사","모퉁이",2,{f:"corners",e:{en:"The shop is just around the corner.",ko:"가게는 모퉁이 돌면 바로 있어."}});
W("cultural","형용사","문화의",2,{e:{en:"There are some cultural differences.",ko:"문화적인 차이가 좀 있어."}});
W("exist","동사","존재하다",2,{f:"exists existed existing",e:{en:"Does that app still exist?",ko:"그 앱 아직 있어?"}});
W("farm","명사","농장",2,{f:"farms",e:{en:"My uncle runs a small farm.",ko:"삼촌은 작은 농장을 해."}});
W("guide","명사·동사","안내자, 안내하다",2,{f:"guides guided guiding",e:{en:"Our guide spoke perfect English.",ko:"가이드가 영어를 완벽하게 했어."}});
W("investigation","명사","조사",2,{f:"investigations",e:{en:"The police started an investigation.",ko:"경찰이 조사를 시작했어."}});
W("operate","동사","작동하다, 운영하다",2,{f:"operates operated operating",e:{en:"Do you know how to operate this machine?",ko:"이 기계 어떻게 쓰는지 알아?"}});
W("responsibility","명사","책임",2,{f:"responsibilities",e:{en:"It's your responsibility.",ko:"그건 네 책임이야."}});
W("roll","동사·명사","굴리다, 롤",2,{f:"rolls rolled rolling",e:{en:"Can you roll down the window?",ko:"창문 좀 내려 줄래?"}});
W("slightly","부사","약간",2,{e:{en:"I'm slightly nervous.",ko:"약간 긴장돼."}});
W("unique","형용사","독특한",2,{e:{en:"Her style is really unique.",ko:"그녀의 스타일은 정말 독특해."}});
W("variety","명사","다양성",2,{f:"varieties",e:{en:"They have a wide variety of dishes.",ko:"요리 종류가 정말 다양해."}});
W("violence","명사","폭력",2,{f:"violences",e:{en:"I don't like movies with a lot of violence.",ko:"폭력적인 영화는 싫어."}});
W("weapon","명사","무기",2,{f:"weapons",e:{en:"Weapons are not allowed inside.",ko:"무기는 반입 금지예요."}});
W("youth","명사","젊음, 청소년",2,{f:"youths",e:{en:"I spent my youth in Busan.",ko:"젊은 시절을 부산에서 보냈어."}});
W("discover","동사","발견하다",2,{f:"discovers discovered discovering",e:{en:"I discovered a great café nearby.",ko:"근처에서 좋은 카페를 발견했어."}});
W("dry","형용사·동사","마른, 말리다",2,{f:"dried dries drying",e:{en:"My skin is really dry.",ko:"피부가 정말 건조해."}});
W("edge","명사","가장자리",2,{f:"edges",e:{en:"Don't stand so close to the edge.",ko:"가장자리에 너무 가까이 서지 마."}});
W("evil","형용사","사악한",2,{e:{en:"He played an evil character.",ko:"그는 악역을 맡았어."}});
W("excite","동사","흥분시키다",2,{f:"excites exciting",e:{en:"Nothing excites me more than travel.",ko:"여행만큼 날 설레게 하는 건 없어."}});
W("forever","부사","영원히",2,{e:{en:"I'll remember this forever.",ko:"이걸 영원히 기억할 거야."}});
W("injury","명사","부상",2,{f:"injuries",e:{en:"He's recovering from a knee injury.",ko:"그는 무릎 부상에서 회복 중이야."}});
W("iron","명사·동사","철, 다림질하다",2,{f:"irons ironed ironing",e:{en:"I need to iron my shirt.",ko:"셔츠 다려야 해."}});
W("mad","형용사","화난, 미친",2,{e:{en:"Are you mad at me?",ko:"나한테 화났어?"}});
W("magazine","명사","잡지",2,{f:"magazines",e:{en:"I read it in a magazine.",ko:"잡지에서 읽었어."}});
W("parliament","명사","의회",2,{f:"parliaments",e:{en:"Parliament passed the new law.",ko:"의회가 새 법을 통과시켰어."}});
W("prepare","동사","준비하다",2,{f:"prepares prepared preparing",e:{en:"I need to prepare for the meeting.",ko:"회의 준비를 해야 해."}});
W("reference","명사","참고, 추천서",2,{f:"references",e:{en:"Can you write me a reference?",ko:"추천서 좀 써 줄 수 있어요?"}});
W("religion","명사","종교",2,{f:"religions",e:{en:"We never talk about religion.",ko:"우리는 종교 얘기는 안 해."}});
W("strategy","명사","전략",2,{f:"strategies",e:{en:"What's your strategy for the exam?",ko:"시험 전략이 뭐야?"}});
W("core","명사·형용사","핵심(의)",2,{f:"cores",e:{en:"Honesty is one of our core values.",ko:"정직은 우리의 핵심 가치 중 하나야."}});
W("democratic","형용사","민주적인",2,{e:{en:"We made a democratic decision.",ko:"민주적으로 결정했어."}});
W("excellent","형용사","훌륭한",2,{e:{en:"The food was excellent.",ko:"음식이 훌륭했어."}});
W("guard","명사·동사","경비원, 지키다",2,{f:"guards guarded guarding",e:{en:"The guard checked our bags.",ko:"경비원이 가방을 검사했어."}});
W("mountain","명사","산",2,{f:"mountains",e:{en:"We climbed the mountain on Sunday.",ko:"일요일에 산에 올랐어."}});
W("nuclear","형용사","핵의",2,{e:{en:"There's a nuclear power plant nearby.",ko:"근처에 원자력 발전소가 있어."}});
W("port","명사","항구",2,{f:"ports",e:{en:"The ship arrived at the port.",ko:"배가 항구에 도착했어."}});
W("presence","명사","존재, 참석",2,{f:"presences",e:{en:"Your presence is requested.",ko:"참석을 부탁드립니다."}});
W("reaction","명사","반응",2,{f:"reactions",e:{en:"What was his reaction?",ko:"그의 반응이 어땠어?"}});
W("reduce","동사","줄이다",2,{f:"reduces reduced reducing",e:{en:"Try to reduce your sugar intake.",ko:"설탕 섭취를 줄여 봐."}});
W("solid","형용사","단단한, 탄탄한",2,{e:{en:"He gave a solid performance.",ko:"그는 탄탄한 성과를 보였어."}});
W("spanish","형용사·명사","스페인의, 스페인어",2,{f:"",e:{en:"I'm learning Spanish.",ko:"스페인어를 배우고 있어."}});
W("victory","명사","승리",2,{f:"victories",e:{en:"It was a big victory for the team.",ko:"팀에게 큰 승리였어."}});
W("citizen","명사","시민",2,{f:"citizens",e:{en:"She became a citizen last year.",ko:"그녀는 작년에 시민권을 받았어."}});
W("classic","형용사·명사","고전(적인)",2,{f:"classics",e:{en:"This movie is a classic.",ko:"이 영화는 고전이야."}});
W("clothes","명사","옷",3,{f:"",e:{en:"I need to buy new clothes.",ko:"새 옷을 사야 해."}});
W("emergency","명사","비상(사태)",2,{f:"emergencies",e:{en:"In an emergency, call 911.",ko:"응급 상황엔 911에 전화해."}});
W("failure","명사","실패",2,{f:"failures",e:{en:"Failure is part of learning.",ko:"실패는 배움의 일부야."}});
W("flat","형용사·명사","평평한, 펑크 난",2,{f:"flats",e:{en:"I got a flat tire.",ko:"타이어가 펑크 났어."}});
W("fuel","명사","연료",2,{f:"fuels",e:{en:"We're low on fuel.",ko:"연료가 얼마 없어."}});
W("initial","형용사","초기의",2,{e:{en:"My initial reaction was shock.",ko:"처음 반응은 충격이었어."}});
W("kick","동사","차다",2,{f:"kicks kicked kicking",e:{en:"He kicked the ball into the goal.",ko:"그는 공을 골대로 찼어."}});
W("mail","명사·동사","우편, 부치다",2,{f:"mails mailed mailing",e:{en:"Did the mail come today?",ko:"오늘 우편물 왔어?"}});
W("massive","형용사","거대한",2,{e:{en:"They live in a massive house.",ko:"그들은 엄청 큰 집에 살아."}});
W("pair","명사","쌍, 켤레",2,{f:"pairs",e:{en:"I bought a new pair of shoes.",ko:"신발 한 켤레를 새로 샀어."}});
W("plane","명사","비행기",2,{f:"planes",e:{en:"The plane is delayed.",ko:"비행기가 지연됐어."}});
W("plenty","명사","많음",2,{f:"",e:{en:"We have plenty of time.",ko:"시간 충분해."}});
W("quarter","명사","4분의 1, 15분",2,{f:"quarters",e:{en:"It's a quarter past three.",ko:"3시 15분이야."}});
W("regional","형용사","지역의",2,{e:{en:"They serve regional dishes.",ko:"그 지역 요리를 팔아."}});
W("session","명사","(활동) 시간, 회기",2,{f:"sessions",e:{en:"I have a training session at six.",ko:"6시에 훈련이 있어."}});
W("shape","명사","모양, 상태",2,{f:"shapes",e:{en:"I'm trying to get in shape.",ko:"몸을 만들려고 해."}});
W("sky","명사","하늘",2,{f:"skies",e:{en:"The sky is so clear today.",ko:"오늘 하늘 정말 맑다."}});
W("useful","형용사","유용한",2,{e:{en:"This app is really useful.",ko:"이 앱 정말 유용해."}});
W("accident","명사","사고",2,{f:"accidents",e:{en:"I had a small accident on the way.",ko:"오는 길에 작은 사고가 있었어."}});
W("alternative","명사·형용사","대안(의)",2,{f:"alternatives",e:{en:"Is there an alternative?",ko:"다른 방법이 있나요?"}});
W("climate","명사","기후",2,{f:"climates",e:{en:"Climate change is a big problem.",ko:"기후 변화는 큰 문제야."}});
W("duty","명사","의무, 근무",2,{f:"duties",e:{en:"The doctor on duty will see you.",ko:"당직 의사가 봐 드릴 거예요."}});
W("governor","명사","주지사",2,{f:"governors",e:{en:"The governor visited our town.",ko:"주지사가 우리 동네를 방문했어."}});
W("industrial","형용사","산업의",2,{e:{en:"It's an old industrial area.",ko:"그곳은 오래된 산업 지역이야."}});
W("joint","명사·형용사","관절, 공동의",2,{f:"joints",e:{en:"My joints hurt when it rains.",ko:"비가 오면 관절이 아파."}});
W("purchase","명사·동사","구매, 구매하다",2,{f:"purchases purchased purchasing",e:{en:"Keep the receipt for your purchase.",ko:"구매 영수증은 보관하세요."}});
W("steel","명사","강철",2,{f:"steels",e:{en:"The bridge is made of steel.",ko:"그 다리는 강철로 만들었어."}});
W("vice","형용사","부(副)-",2,{e:{en:"She's the vice president of the company.",ko:"그녀는 회사 부사장이야."}});
W("beer","명사","맥주",2,{f:"beers",e:{en:"Let's grab a beer after work.",ko:"퇴근하고 맥주 한잔하자."}});
W("border","명사","국경",2,{f:"borders",e:{en:"We crossed the border by bus.",ko:"버스로 국경을 넘었어."}});
W("command","명사","명령, 구사력",2,{f:"commands",e:{en:"He has a good command of English.",ko:"그는 영어를 잘 구사해."}});
W("crew","명사","승무원, 팀",2,{f:"crews",e:{en:"The crew was very friendly.",ko:"승무원들이 아주 친절했어."}});
W("element","명사","요소",2,{f:"elements",e:{en:"Trust is a key element of teamwork.",ko:"신뢰는 팀워크의 핵심 요소야."}});
W("enemy","명사","적",2,{f:"enemies",e:{en:"Don't make enemies at work.",ko:"직장에서 적을 만들지 마."}});
W("ensure","동사","보장하다, 확실히 하다",2,{f:"ensures ensured ensuring",e:{en:"Please ensure the door is locked.",ko:"문이 잠겼는지 꼭 확인하세요."}});
W("environmental","형용사","환경의",2,{e:{en:"We care about environmental issues.",ko:"우리는 환경 문제에 관심이 있어."}});
W("forest","명사","숲",2,{f:"forests",e:{en:"We went for a walk in the forest.",ko:"숲으로 산책을 갔어."}});
W("intelligence","명사","지능, 정보",2,{f:"intelligences",e:{en:"Artificial intelligence is everywhere now.",ko:"인공지능은 이제 어디에나 있어."}});
W("intend","동사","의도하다",2,{f:"intends intended intending",e:{en:"I didn't intend to hurt you.",ko:"널 상처 줄 생각은 없었어."}});
W("profit","명사","이익",2,{f:"profits",e:{en:"The company made a big profit.",ko:"회사가 큰 이익을 냈어."}});
W("proof","명사","증거",2,{f:"proofs",e:{en:"Do you have proof?",ko:"증거 있어?"}});
W("soldier","명사","군인",2,{f:"soldiers",e:{en:"He was a soldier for ten years.",ko:"그는 10년 동안 군인이었어."}});
W("suit","명사·동사","정장, 어울리다",2,{f:"suits suited suiting",e:{en:"That color really suits you.",ko:"그 색 정말 잘 어울려."}});
W("appearance","명사","외모, 등장",2,{f:"appearances",e:{en:"Don't judge by appearance.",ko:"외모로 판단하지 마."}});
W("attorney","명사","변호사",2,{f:"attorneys",e:{en:"I need to talk to my attorney.",ko:"변호사와 얘기해야 해요."}});
W("bank","명사","은행",2,{f:"banks",e:{en:"Is there a bank near here?",ko:"근처에 은행 있어요?"}});
W("behavior","명사","행동",2,{f:"behaviors",e:{en:"His behavior was unacceptable.",ko:"그의 행동은 받아들일 수 없었어."}});
W("chair","명사","의자",2,{f:"chairs",e:{en:"Please take a chair.",ko:"의자에 앉으세요."}});
W("debt","명사","빚",2,{f:"debts",e:{en:"I finally paid off my debt.",ko:"드디어 빚을 다 갚았어."}});
W("domestic","형용사","국내의, 가정의",2,{e:{en:"Is this a domestic flight?",ko:"이거 국내선이에요?"}});
W("historical","형용사","역사적인",2,{e:{en:"This is a historical building.",ko:"이건 역사적인 건물이야."}});
W("honor","명사","영광",2,{f:"honors",e:{en:"It's an honor to meet you.",ko:"만나 뵙게 되어 영광이에요."}});
W("native","형용사","원어민의, 태어난 곳의",2,{e:{en:"She's a native speaker of English.",ko:"그녀는 영어 원어민이야."}});
W("originally","부사","원래",2,{e:{en:"I'm originally from Daegu.",ko:"원래 대구 출신이에요."}});
W("suddenly","부사","갑자기",2,{e:{en:"Suddenly, the lights went out.",ko:"갑자기 불이 꺼졌어."}});
W("survey","명사","설문 조사",2,{f:"surveys",e:{en:"Please fill out this short survey.",ko:"짧은 설문 조사를 작성해 주세요."}});
W("writer","명사","작가",2,{f:"writers",e:{en:"She's a famous writer.",ko:"그녀는 유명한 작가야."}});
W("yellow","형용사","노란",2,{e:{en:"She has a yellow umbrella.",ko:"그녀는 노란 우산을 가지고 있어."}});
W("ancient","형용사","고대의",2,{e:{en:"We visited ancient ruins.",ko:"고대 유적을 방문했어."}});
W("combine","동사","결합하다",2,{f:"combines combined combining",e:{en:"Combine the eggs and flour.",ko:"달걀과 밀가루를 섞어."}});
W("communication","명사","소통",2,{f:"communications",e:{en:"Good communication is key.",ko:"좋은 소통이 핵심이야."}});
W("contain","동사","포함하다",2,{f:"contains contained containing",e:{en:"Does this contain nuts?",ko:"여기 견과류 들었어요?"}});
W("express","동사","표현하다",2,{f:"expresses expressed expressing",e:{en:"It's hard to express my feelings.",ko:"감정을 표현하기 어려워."}});
W("flow","명사·동사","흐름, 흐르다",2,{f:"flows flowed flowing",e:{en:"Just go with the flow.",ko:"그냥 흐름에 맡겨."}});
W("girlfriend","명사","여자 친구",2,{f:"girlfriends",e:{en:"I'm meeting my girlfriend tonight.",ko:"오늘 밤 여자 친구 만나."}});
W("hero","명사","영웅",2,{f:"heroes heros",e:{en:"You're my hero!",ko:"넌 내 영웅이야!"}});
W("illegal","형용사","불법의",2,{e:{en:"Parking here is illegal.",ko:"여기 주차하는 건 불법이야."}});
W("loan","명사","대출",2,{f:"loans",e:{en:"I took out a loan for my car.",ko:"차 사려고 대출받았어."}});
W("perform","동사","공연하다, 수행하다",2,{f:"performs performed performing",e:{en:"The band will perform tonight.",ko:"그 밴드가 오늘 밤 공연해."}});
W("planet","명사","행성",2,{f:"planets",e:{en:"We need to protect the planet.",ko:"지구를 지켜야 해."}});
W("select","동사","선택하다",2,{f:"selects selected selecting",e:{en:"Select your seat on the screen.",ko:"화면에서 좌석을 선택하세요."}});
W("soft","형용사","부드러운",2,{e:{en:"This blanket is so soft.",ko:"이 담요 정말 부드러워."}});
W("transport","명사","교통, 운송",2,{f:"transports",e:{en:"Public transport here is great.",ko:"여기 대중교통이 아주 좋아."}});
W("affair","명사","일, 사건",2,{f:"affairs",e:{en:"That's my own affair.",ko:"그건 내 일이야."}});
W("appeal","동사·명사","호소하다, 매력",2,{f:"appeals appealed appealing",e:{en:"The idea doesn't appeal to me.",ko:"그 생각은 별로 끌리지 않아."}});
W("appropriate","형용사","적절한",2,{e:{en:"Is this outfit appropriate for work?",ko:"이 옷 회사에 입기 적절해?"}});
W("device","명사","기기",2,{f:"devices",e:{en:"Please turn off all devices.",ko:"모든 기기를 꺼 주세요."}});
W("drama","명사","드라마, 극적인 일",2,{f:"dramas",e:{en:"I'm watching a Korean drama.",ko:"한국 드라마 보는 중이야."}});
W("entry","명사","입장, 출품작",2,{f:"entries",e:{en:"Entry is free on Sundays.",ko:"일요일엔 입장 무료예요."}});
W("era","명사","시대",2,{f:"eras",e:{en:"It was the end of an era.",ko:"한 시대가 끝났어."}});
W("golden","형용사","금빛의, 황금기의",2,{e:{en:"It was a golden opportunity.",ko:"그건 절호의 기회였어."}});
W("grant","명사·동사","보조금, 허락하다",2,{f:"grants granted granting",e:{en:"She received a research grant.",ko:"그녀는 연구 보조금을 받았어."}});
W("hop","동사","깡충 뛰다, 잠깐 타다",2,{f:"hopped hops hopping",e:{en:"Hop in, I'll give you a ride.",ko:"타, 태워 줄게."}});
W("lawyer","명사","변호사",2,{f:"lawyers",e:{en:"You should talk to a lawyer.",ko:"변호사와 상의해 봐."}});
W("measure","동사·명사","재다, 조치",2,{f:"measures measured measuring",e:{en:"Let me measure the room first.",ko:"먼저 방 크기를 재 볼게."}});
W("pool","명사","수영장",2,{f:"pools",e:{en:"The hotel has an outdoor pool.",ko:"그 호텔엔 야외 수영장이 있어."}});
W("regard","명사·동사","관심, 여기다",2,{f:"regards regarded regarding",e:{en:"Give my regards to your parents.",ko:"부모님께 안부 전해 줘."}});
W("relation","명사","관계",2,{f:"relations",e:{en:"What's the relation between the two?",ko:"둘이 무슨 관계야?"}});
W("scientific","형용사","과학적인",2,{e:{en:"Is there any scientific evidence?",ko:"과학적 근거가 있어?"}});
W("testing","명사","시험, 검사",2,{f:"testings",e:{en:"The new app is still in testing.",ko:"새 앱은 아직 테스트 중이야."}});
W("abuse","명사·동사","남용, 학대",2,{f:"abuses abused abusing",e:{en:"That's an abuse of power.",ko:"그건 권력 남용이야."}});
W("candidate","명사","후보자",2,{f:"candidates",e:{en:"She's the best candidate for the job.",ko:"그녀가 그 자리에 가장 적합한 후보야."}});
W("comfortable","형용사","편안한",2,{e:{en:"These shoes are really comfortable.",ko:"이 신발 정말 편해."}});
W("emotional","형용사","감정적인",2,{e:{en:"It was an emotional goodbye.",ko:"감정이 북받치는 작별이었어."}});
W("facility","명사","시설",2,{f:"facilities",e:{en:"The gym has great facilities.",ko:"그 헬스장은 시설이 좋아."}});
W("fox","명사","여우",2,{f:"foxes",e:{en:"We saw a fox in the park.",ko:"공원에서 여우를 봤어."}});
W("gun","명사","총",2,{f:"guns",e:{en:"Guns are banned here.",ko:"여기선 총이 금지야."}});
W("holiday","명사","휴일, 휴가",2,{f:"holidays",e:{en:"Monday is a public holiday.",ko:"월요일은 공휴일이야."}});
W("internal","형용사","내부의",2,{e:{en:"It's an internal email.",ko:"사내 이메일이야."}});
W("laugh","동사·명사","웃다, 웃음",2,{f:"laughs laughed laughing",e:{en:"We laughed all night.",ko:"우리는 밤새 웃었어."}});
W("liberal","형용사","진보적인, 관대한",2,{e:{en:"My parents are quite liberal.",ko:"우리 부모님은 꽤 개방적이셔."}});
W("payment","명사","지불",2,{f:"payments",e:{en:"We accept card payment only.",ko:"카드 결제만 받아요."}});
W("relatively","부사","비교적",2,{e:{en:"The test was relatively easy.",ko:"시험이 비교적 쉬웠어."}});
W("sector","명사","분야, 부문",2,{f:"sectors",e:{en:"He works in the tech sector.",ko:"그는 IT 분야에서 일해."}});
W("snow","명사·동사","눈, 눈이 오다",2,{f:"snows snowed snowing",e:{en:"It snowed all night.",ko:"밤새 눈이 왔어."}});
W("storm","명사","폭풍",2,{f:"storms",e:{en:"The storm knocked out the power.",ko:"폭풍 때문에 전기가 나갔어."}});
W("studio","명사","작업실, 원룸",2,{f:"studios",e:{en:"I live in a small studio.",ko:"작은 원룸에 살아."}});
W("weak","형용사","약한",2,{e:{en:"The coffee is a bit weak.",ko:"커피가 좀 연해."}});
W("actor","명사","배우",2,{f:"actors",e:{en:"He's my favorite actor.",ko:"그가 내가 제일 좋아하는 배우야."}});
W("chain","명사","체인, 사슬",2,{f:"chains",e:{en:"It's a famous coffee chain.",ko:"유명한 커피 체인점이야."}});
W("chapter","명사","장(章)",2,{f:"chapters",e:{en:"I've read the first chapter.",ko:"첫 장을 읽었어."}});
W("confidence","명사","자신감",2,{f:"confidences",e:{en:"She speaks with confidence.",ko:"그녀는 자신 있게 말해."}});
W("cute","형용사","귀여운",2,{e:{en:"Your dog is so cute!",ko:"강아지 정말 귀엽다!"}});
W("equal","형용사","같은, 평등한",2,{e:{en:"Everyone gets an equal share.",ko:"모두가 똑같이 나눠 가져."}});
W("finance","명사","재정, 금융",2,{f:"finances",e:{en:"She works in finance.",ko:"그녀는 금융 쪽에서 일해."}});
W("identity","명사","신원, 정체성",2,{f:"identities",e:{en:"Please show proof of identity.",ko:"신분증을 보여 주세요."}});
W("journey","명사","여정",2,{f:"journeys",e:{en:"It was a long journey home.",ko:"집까지 긴 여정이었어."}});
W("kitchen","명사","부엌",2,{f:"kitchens",e:{en:"Let's eat in the kitchen.",ko:"부엌에서 먹자."}});
W("maintain","동사","유지하다",2,{f:"maintains maintained maintaining",e:{en:"It's hard to maintain a healthy diet.",ko:"건강한 식단을 유지하기 어려워."}});
W("numerous","형용사","많은",2,{e:{en:"I've told you numerous times.",ko:"여러 번 말했잖아."}});
W("reveal","동사","드러내다",2,{f:"reveals revealed revealing",e:{en:"She revealed her secret.",ko:"그녀는 비밀을 털어놨어."}});
W("specifically","부사","특히, 구체적으로",2,{e:{en:"I specifically asked for no onions.",ko:"양파 빼 달라고 분명히 말했어요."}});
W("task","명사","과제, 일",2,{f:"tasks",e:{en:"I have a lot of tasks today.",ko:"오늘 할 일이 많아."}});
W("urban","형용사","도시의",2,{e:{en:"I prefer urban life.",ko:"난 도시 생활이 더 좋아."}});
W("aircraft","명사","항공기",2,{f:"aircrafts",e:{en:"The aircraft landed safely.",ko:"항공기가 안전하게 착륙했어."}});
W("approve","동사","승인하다, 찬성하다",2,{f:"approves approved approving",e:{en:"My boss approved my vacation.",ko:"상사가 휴가를 승인해 줬어."}});
W("approximately","부사","대략",2,{e:{en:"It takes approximately two hours.",ko:"대략 두 시간 걸려."}});
W("arrest","동사·명사","체포하다, 체포",2,{f:"arrests arrested arresting",e:{en:"The police arrested the thief.",ko:"경찰이 도둑을 체포했어."}});
W("conflict","명사","갈등",2,{f:"conflicts",e:{en:"There's a conflict between the two teams.",ko:"두 팀 사이에 갈등이 있어."}});
W("corporate","형용사","기업의",2,{e:{en:"I don't like corporate culture.",ko:"기업 문화가 나랑 안 맞아."}});
W("determine","동사","결정하다, 알아내다",2,{f:"determines determined determining",e:{en:"We need to determine the cause.",ko:"원인을 알아내야 해."}});
W("distribution","명사","분배, 유통",2,{f:"distributions",e:{en:"The distribution of work is unfair.",ko:"업무 분배가 불공평해."}});
W("document","명사","문서",2,{f:"documents",e:{en:"Please sign this document.",ko:"이 문서에 서명해 주세요."}});
W("escape","동사·명사","탈출하다, 탈출",2,{f:"escapes escaped escaping",e:{en:"We escaped the city for the weekend.",ko:"주말 동안 도시를 벗어났어."}});
W("flower","명사","꽃",2,{f:"flowers",e:{en:"He brought her flowers.",ko:"그가 그녀에게 꽃을 가져왔어."}});
W("friendly","형용사","친절한, 다정한",2,{e:{en:"The people here are so friendly.",ko:"여기 사람들은 정말 친절해."}});
W("lady","명사","숙녀, 여성",2,{f:"ladies",e:{en:"Ask the lady at the front desk.",ko:"안내 데스크에 있는 여자분께 물어보세요."}});
W("million","숫자","백만",2,{e:{en:"The city has two million people.",ko:"그 도시엔 200만 명이 살아."}});
W("phase","명사","단계",2,{f:"phases",e:{en:"It's just a phase.",ko:"그냥 한때야."}});
W("pure","형용사","순수한",2,{e:{en:"It was pure luck.",ko:"순전히 운이었어."}});
W("requirement","명사","요건",2,{f:"requirements",e:{en:"What are the requirements for the job?",ko:"그 일의 자격 요건이 뭐예요?"}});
W("resident","명사","주민",2,{f:"residents",e:{en:"Parking is for residents only.",ko:"주차는 주민 전용이에요."}});
W("revenue","명사","수익",2,{f:"revenues",e:{en:"Revenue went up this year.",ko:"올해 수익이 늘었어."}});
W("secure","형용사·동사","안전한, 확보하다",2,{f:"secures secured securing",e:{en:"Is this website secure?",ko:"이 웹사이트 안전해?"}});
W("smile","동사·명사","웃다, 미소",2,{f:"smiles smiled smiling",e:{en:"She has a beautiful smile.",ko:"그녀는 미소가 예뻐."}});
W("strange","형용사","이상한",2,{e:{en:"That's strange. It was here a minute ago.",ko:"이상하다. 방금 여기 있었는데."}});
W("talent","명사","재능",2,{f:"talents",e:{en:"You have a real talent for music.",ko:"넌 음악에 진짜 재능이 있어."}});
W("temperature","명사","온도",2,{f:"temperatures",e:{en:"What's the temperature today?",ko:"오늘 기온이 몇 도야?"}});
W("troop","명사","군대, 무리",2,{f:"troops",e:{en:"The troops returned home.",ko:"군대가 귀환했어."}});
W("truck","명사","트럭",2,{f:"trucks",e:{en:"A truck was blocking the road.",ko:"트럭이 길을 막고 있었어."}});
W("basically","부사","기본적으로, 한마디로",2,{e:{en:"Basically, we need more time.",ko:"한마디로 시간이 더 필요해."}});
W("besides","부사","게다가",2,{e:{en:"Besides, it's too late now.",ko:"게다가 이제 너무 늦었어."}});
W("bird","명사","새",2,{f:"birds",e:{en:"I woke up to birds singing.",ko:"새소리에 잠에서 깼어."}});
W("blame","동사·명사","탓하다, 책임",2,{f:"blames blamed blaming",e:{en:"Don't blame yourself.",ko:"자책하지 마."}});
W("chicken","명사","닭, 닭고기",2,{f:"chickens",e:{en:"I'll have the chicken salad.",ko:"치킨 샐러드로 할게요."}});
W("coverage","명사","보도, 보장 범위",2,{f:"coverages",e:{en:"My phone has no coverage here.",ko:"여기선 폰이 안 터져."}});
W("display","명사·동사","진열, 보여 주다",2,{f:"displays displayed displaying",e:{en:"The shoes on display are on sale.",ko:"진열된 신발은 할인 중이에요."}});
W("elect","동사","선출하다",2,{f:"elects elected electing",e:{en:"She was elected class president.",ko:"그녀는 반장으로 뽑혔어."}});
W("identify","동사","확인하다, 알아보다",2,{f:"identifies identified identifying",e:{en:"Can you identify the problem?",ko:"문제를 찾아낼 수 있어?"}});
W("incredible","형용사","믿기 어려운, 굉장한",2,{e:{en:"The view was incredible.",ko:"경치가 끝내줬어."}});
W("inspire","동사","영감을 주다",2,{f:"inspires inspired inspiring",e:{en:"Her story inspired me.",ko:"그녀의 이야기가 나에게 영감을 줬어."}});
W("meat","명사","고기",2,{f:"meats",e:{en:"I don't eat meat.",ko:"난 고기를 안 먹어."}});
W("ministry","명사","(정부의) 부처",2,{f:"ministries",e:{en:"The Ministry of Education made an announcement.",ko:"교육부가 발표를 했어."}});
W("mode","명사","모드, 방식",2,{f:"modes",e:{en:"Put your phone on silent mode.",ko:"폰을 무음 모드로 해 줘."}});
W("neck","명사","목",2,{f:"necks",e:{en:"I have a stiff neck.",ko:"목이 뻐근해."}});
W("novel","명사","소설",2,{f:"novels",e:{en:"I'm reading a mystery novel.",ko:"추리 소설을 읽고 있어."}});
W("obvious","형용사","분명한",2,{e:{en:"The answer is obvious.",ko:"답은 뻔해."}});
W("stadium","명사","경기장",2,{f:"stadiums",e:{en:"The stadium was full.",ko:"경기장이 꽉 찼어."}});
W("trading","명사","거래, 무역",2,{f:"",e:{en:"He does stock trading.",ko:"그는 주식 거래를 해."}});
W("vision","명사","시력, 비전",2,{f:"visions",e:{en:"She has a clear vision for the company.",ko:"그녀는 회사에 대한 분명한 비전이 있어."}});
W("champion","명사","챔피언",2,{f:"champions",e:{en:"They're the world champions.",ko:"그들은 세계 챔피언이야."}});
W("cream","명사","크림",2,{f:"creams",e:{en:"Do you take cream in your coffee?",ko:"커피에 크림 넣으세요?"}});
W("crisis","명사","위기",2,{f:"",e:{en:"The company is in crisis.",ko:"회사가 위기에 처했어."}});
W("editor","명사","편집자",2,{f:"editors",e:{en:"She's an editor at a magazine.",ko:"그녀는 잡지 편집자야."}});
W("giant","형용사·명사","거대한, 거인",2,{f:"giants",e:{en:"There was a giant line outside.",ko:"밖에 엄청 긴 줄이 있었어."}});
W("jail","명사","감옥",2,{f:"jails",e:{en:"He spent a night in jail.",ko:"그는 유치장에서 하룻밤을 보냈어."}});
W("kingdom","명사","왕국",2,{f:"kingdoms",e:{en:"The castle belonged to an old kingdom.",ko:"그 성은 옛 왕국의 것이었어."}});
W("literature","명사","문학",2,{f:"literatures",e:{en:"She studied English literature.",ko:"그녀는 영문학을 전공했어."}});
W("mayor","명사","시장",2,{f:"mayors",e:{en:"The mayor opened the new library.",ko:"시장이 새 도서관을 개관했어."}});
W("minor","형용사","사소한",2,{e:{en:"It's just a minor problem.",ko:"그냥 사소한 문제야."}});
W("opposite","형용사·명사","반대(의)",2,{f:"opposites",e:{en:"The bank is on the opposite side of the street.",ko:"은행은 길 건너편에 있어."}});
W("selection","명사","선택, 구색",2,{f:"selections",e:{en:"They have a great selection of books.",ko:"책 구색이 정말 좋아."}});
W("signal","명사","신호",2,{f:"signals",e:{en:"I can't get a signal here.",ko:"여기 신호가 안 잡혀."}});
W("theme","명사","주제, 테마",2,{f:"themes",e:{en:"The theme of the party is the 90s.",ko:"파티 테마는 90년대야."}});
W("tiny","형용사","아주 작은",2,{e:{en:"Our apartment is tiny.",ko:"우리 집은 아주 좁아."}});
W("typically","부사","보통, 일반적으로",2,{e:{en:"I typically eat lunch at noon.",ko:"보통 정오에 점심을 먹어."}});
W("unfortunately","부사","안타깝게도",2,{e:{en:"Unfortunately, we're fully booked.",ko:"죄송하지만 예약이 꽉 찼어요."}});
W("wave","동사·명사","손을 흔들다, 파도",2,{f:"waves waved waving",e:{en:"She waved goodbye.",ko:"그녀는 손을 흔들며 작별 인사했어."}});
W("capable","형용사","능력 있는",2,{e:{en:"She's very capable.",ko:"그녀는 정말 유능해."}});
W("combination","명사","조합",2,{f:"combinations",e:{en:"It's a nice combination of flavors.",ko:"맛의 조합이 좋아."}});
W("conservative","형용사","보수적인",2,{e:{en:"My grandparents are quite conservative.",ko:"조부모님은 꽤 보수적이셔."}});
W("desire","명사","욕구, 바람",2,{f:"desires",e:{en:"I have no desire to go back.",ko:"돌아가고 싶은 마음이 전혀 없어."}});
W("destroy","동사","파괴하다",2,{f:"destroys destroyed destroying",e:{en:"The storm destroyed the bridge.",ko:"폭풍이 다리를 무너뜨렸어."}});
W("drunk","형용사","술 취한",2,{e:{en:"He was too drunk to drive.",ko:"그는 너무 취해서 운전할 수 없었어."}});
W("hundred","숫자","백, 100",2,{f:"hundreds",e:{en:"There were hundreds of people.",ko:"사람이 수백 명 있었어."}});
W("largely","부사","주로, 대체로",2,{e:{en:"The plan was largely successful.",ko:"계획은 대체로 성공적이었어."}});
W("refer","동사","언급하다, 참고하다",2,{f:"referred referring refers refered refering",e:{en:"Who are you referring to?",ko:"누구 얘기하는 거야?"}});
W("relevant","형용사","관련 있는",2,{e:{en:"That's not relevant right now.",ko:"그건 지금 상관없어."}});
W("seek","동사","찾다, 구하다",2,{f:"sought seeks seeked seeking",e:{en:"You should seek medical advice.",ko:"의사의 조언을 구해 봐."}});
W("unable","형용사","~할 수 없는",2,{e:{en:"I'm unable to attend the meeting.",ko:"회의에 참석할 수 없어요."}});
W("upset","형용사","속상한",2,{e:{en:"Are you upset with me?",ko:"나 때문에 속상해?"}});
W("wing","명사","날개",2,{f:"wings",e:{en:"Can we sit over the wing?",ko:"날개 쪽 자리에 앉을 수 있을까요?"}});
W("bomb","명사","폭탄",2,{f:"bombs",e:{en:"The movie was a bomb at the box office.",ko:"그 영화는 흥행에 참패했어."}});
W("cycle","명사·동사","주기, 자전거를 타다",2,{f:"cycles cycled cycling",e:{en:"I cycle to work every day.",ko:"매일 자전거로 출근해."}});
W("educational","형용사","교육적인",2,{e:{en:"It's a fun and educational game.",ko:"재밌고 교육적인 게임이야."}});
W("entertainment","명사","오락, 엔터테인먼트",2,{f:"entertainments",e:{en:"What do you do for entertainment?",ko:"여가로 뭐 하고 놀아?"}});
W("extreme","형용사","극단적인",2,{e:{en:"That's a bit extreme, don't you think?",ko:"그건 좀 극단적이지 않아?"}});
W("info","명사","(구어) 정보",2,{f:"infos",e:{en:"Can you send me the info?",ko:"정보 좀 보내 줄래?"}});
W("mainly","부사","주로",2,{e:{en:"I mainly use my phone for work.",ko:"폰은 주로 업무용으로 써."}});
W("newspaper","명사","신문",2,{f:"newspapers",e:{en:"My dad still reads the newspaper.",ko:"아빠는 아직 신문을 보셔."}});
W("offering","명사","제공품, 상품",2,{f:"offerings",e:{en:"This is our newest offering.",ko:"이건 저희 최신 상품이에요."}});
W("republic","명사","공화국",2,{f:"republics",e:{en:"Korea is a republic.",ko:"한국은 공화국이야."}});
W("reserve","동사","예약하다",2,{f:"reserves reserved reserving",e:{en:"I'd like to reserve a table for two.",ko:"두 명 자리 예약하고 싶어요."}});
W("row","명사","줄, 열",2,{f:"rows",e:{en:"We sat in the front row.",ko:"우리는 맨 앞줄에 앉았어."}});
W("scar","명사","흉터",2,{f:"scars",e:{en:"He has a scar on his arm.",ko:"그는 팔에 흉터가 있어."}});
W("territory","명사","영토, 영역",2,{f:"territories",e:{en:"This is new territory for me.",ko:"이건 나한테 처음 해 보는 분야야."}});
W("threat","명사","위협",2,{f:"threats",e:{en:"Climate change is a real threat.",ko:"기후 변화는 실제 위협이야."}});
W("appoint","동사","임명하다",2,{f:"appoints appointed appointing",e:{en:"She was appointed team leader.",ko:"그녀가 팀장으로 임명됐어."}});
W("assistance","명사","도움",2,{f:"",e:{en:"Do you need any assistance?",ko:"도움이 필요하세요?"}});
W("bond","명사","유대",2,{f:"bonds",e:{en:"They have a strong bond.",ko:"그들은 끈끈한 사이야."}});
W("boyfriend","명사","남자 친구",2,{f:"boyfriends",e:{en:"Her boyfriend is a chef.",ko:"그녀의 남자 친구는 요리사야."}});
W("corporation","명사","기업",2,{f:"corporations",e:{en:"He works for a big corporation.",ko:"그는 대기업에서 일해."}});
W("cry","동사","울다",2,{f:"cried cries crying",e:{en:"The movie made me cry.",ko:"그 영화 보고 울었어."}});
W("danger","명사","위험",2,{f:"dangers",e:{en:"Is he in danger?",ko:"그가 위험한 상황이야?"}});
W("deserve","동사","~할 자격이 있다",2,{f:"deserves deserved deserving",e:{en:"You deserve a break.",ko:"넌 좀 쉴 자격이 있어."}});
W("folk","명사","사람들, 민속",2,{f:"folks",e:{en:"Hi, folks! Welcome!",ko:"안녕하세요, 여러분! 환영해요!"}});
W("gender","명사","성별",2,{f:"genders",e:{en:"Please select your gender.",ko:"성별을 선택해 주세요."}});
W("instance","명사","사례, (for instance) 예를 들어",2,{f:"instances",e:{en:"For instance, you could take the bus.",ko:"예를 들어 버스를 탈 수도 있어."}});
W("motion","명사","움직임",2,{f:"motions",e:{en:"I get motion sickness on boats.",ko:"배를 타면 멀미가 나."}});
W("prize","명사","상, 상품",2,{f:"prizes",e:{en:"She won first prize.",ko:"그녀가 1등 상을 받았어."}});
W("reasonable","형용사","합리적인, 적당한",2,{e:{en:"The prices are very reasonable.",ko:"가격이 아주 적당해."}});
W("register","동사","등록하다",2,{f:"registers registered registering",e:{en:"You need to register online first.",ko:"먼저 온라인으로 등록해야 해."}});
W("resolution","명사","결심, 해상도",2,{f:"resolutions",e:{en:"My New Year's resolution is to read more.",ko:"새해 결심은 책을 더 읽는 거야."}});
W("rural","형용사","시골의",2,{e:{en:"They moved to a rural area.",ko:"그들은 시골로 이사했어."}});
W("tool","명사","도구",2,{f:"tools",e:{en:"Do you have the right tools?",ko:"맞는 도구 있어?"}});
W("typical","형용사","전형적인",2,{e:{en:"It's a typical Monday morning.",ko:"전형적인 월요일 아침이야."}});
W("universe","명사","우주",2,{f:"universes",e:{en:"Do you think we're alone in the universe?",ko:"우주에 우리뿐이라고 생각해?"}});
W("warn","동사","경고하다",2,{f:"warns warned warning",e:{en:"I warned you about this.",ko:"내가 이거 경고했잖아."}});
W("attitude","명사","태도",2,{f:"attitudes",e:{en:"I love your positive attitude.",ko:"네 긍정적인 태도가 좋아."}});
W("branch","명사","지점, 나뭇가지",2,{f:"branches",e:{en:"Which branch do you work at?",ko:"어느 지점에서 일하세요?"}});
W("conduct","동사·명사","실시하다, 행동",2,{f:"conducts conducted conducting",e:{en:"We conducted a survey.",ko:"우리는 설문 조사를 실시했어."}});
W("decade","명사","10년",2,{f:"decades",e:{en:"I've lived here for a decade.",ko:"여기 산 지 10년 됐어."}});
W("dedicate","동사","바치다, 헌신하다",2,{f:"dedicates dedicated dedicating",e:{en:"She dedicated her life to teaching.",ko:"그녀는 가르치는 일에 평생을 바쳤어."}});
W("definition","명사","정의, 뜻",2,{f:"definitions",e:{en:"What's the definition of this word?",ko:"이 단어의 정의가 뭐예요?"}});
W("favor","명사","호의, 부탁",2,{f:"favors",e:{en:"Can you do me a favor?",ko:"부탁 하나 들어줄래?"}});
W("frame","명사","틀, 액자",2,{f:"frames",e:{en:"I need a frame for this photo.",ko:"이 사진 넣을 액자가 필요해."}});
W("independence","명사","독립",2,{f:"",e:{en:"Living alone gave me independence.",ko:"혼자 살면서 독립심이 생겼어."}});
W("institution","명사","기관",2,{f:"institutions",e:{en:"It's a respected institution.",ko:"그곳은 존경받는 기관이야."}});
W("kiss","동사·명사","입 맞추다, 키스",2,{f:"kisses kissed kissing",e:{en:"She kissed her baby goodnight.",ko:"그녀는 아기에게 잘 자라고 입 맞췄어."}});
W("plot","명사","줄거리",2,{f:"plots",e:{en:"The plot was hard to follow.",ko:"줄거리를 따라가기 어려웠어."}});
W("random","형용사","무작위의, 뜬금없는",2,{e:{en:"That was so random!",ko:"그거 완전 뜬금없었어!"}});
W("replace","동사","교체하다",2,{f:"replaces replaced replacing",e:{en:"I need to replace my phone battery.",ko:"폰 배터리를 갈아야 해."}});
W("represent","동사","대표하다, 나타내다",2,{f:"represents represented representing",e:{en:"She represents our company.",ko:"그녀는 우리 회사를 대표해."}});
W("sentence","명사","문장",2,{f:"sentences",e:{en:"Can you use it in a sentence?",ko:"그걸로 문장 하나 만들어 볼래?"}});
W("tooth","명사","이, 치아",2,{f:"teeth tooths",e:{en:"I need to brush my teeth.",ko:"양치해야 해."}});
W("academic","형용사","학업의",2,{e:{en:"She has great academic results.",ko:"그녀는 학업 성적이 뛰어나."}});
W("accurate","형용사","정확한",2,{e:{en:"Is this information accurate?",ko:"이 정보 정확해?"}});
W("achieve","동사","이루다",2,{f:"achieves achieved achieving",e:{en:"You can achieve anything.",ko:"넌 뭐든 이룰 수 있어."}});
W("afford","동사","여유가 되다",2,{f:"affords afforded affording",e:{en:"I can't afford a new car.",ko:"새 차를 살 여유가 없어."}});
W("assume","동사","추측하다, 가정하다",2,{f:"assumes assumed assuming",e:{en:"I assume you're tired.",ko:"피곤한가 보네."}});
W("bottle","명사","병",2,{f:"bottles",e:{en:"Can I get a bottle of water?",ko:"물 한 병 주실래요?"}});
W("bunch","명사","다발, 많음",2,{f:"bunches",e:{en:"I have a bunch of things to do.",ko:"할 일이 잔뜩 있어."}});
W("category","명사","범주",2,{f:"categories",e:{en:"Which category does this go in?",ko:"이건 어느 분류에 들어가?"}});
W("fruit","명사","과일",2,{f:"fruits",e:{en:"I eat fruit every morning.",ko:"매일 아침 과일을 먹어."}});
W("index","명사","색인, 지수",2,{f:"indexes",e:{en:"Check the index at the back of the book.",ko:"책 뒤의 색인을 확인해 봐."}});
W("lane","명사","차선, 좁은 길",2,{f:"lanes",e:{en:"Stay in the right lane.",ko:"오른쪽 차선으로 가."}});
W("normally","부사","보통",2,{e:{en:"I normally go to bed at eleven.",ko:"보통 11시에 자."}});
W("occur","동사","발생하다, 떠오르다",2,{f:"occurred occurs occured occuring",e:{en:"It never occurred to me.",ko:"그런 생각은 전혀 못 했어."}});
W("opposition","명사","반대",2,{f:"oppositions",e:{en:"There was strong opposition to the plan.",ko:"그 계획에 강한 반대가 있었어."}});
W("permanent","형용사","영구적인",2,{e:{en:"Is this a permanent job?",ko:"이거 정규직이에요?"}});
W("representative","명사","대표자, 담당자",2,{f:"representatives",e:{en:"A customer service representative will help you.",ko:"고객 서비스 담당자가 도와드릴 거예요."}});
W("scheme","명사","계획, 음모",2,{f:"schemes",e:{en:"It sounds like a scam scheme.",ko:"사기 수법처럼 들려."}});
W("shift","명사·동사","교대 근무, 바꾸다",2,{f:"shifts shifted shifting",e:{en:"I work the night shift.",ko:"난 야간 근무를 해."}});
W("storage","명사","저장 공간, 보관",2,{f:"storages",e:{en:"My phone is out of storage.",ko:"폰 저장 공간이 꽉 찼어."}});
W("tank","명사","탱크, 통",2,{f:"tanks",e:{en:"Fill up the tank, please.",ko:"기름 가득 채워 주세요."}});
W("transportation","명사","교통수단",2,{f:"transportations",e:{en:"Is transportation included?",ko:"교통편도 포함이에요?"}});
W("ultimately","부사","궁극적으로, 결국",2,{e:{en:"Ultimately, it's your decision.",ko:"결국 네가 결정할 일이야."}});
W("yard","명사","마당",2,{f:"yards",e:{en:"The kids are playing in the yard.",ko:"아이들이 마당에서 놀고 있어."}});
W("asset","명사","자산",2,{f:"assets",e:{en:"She's a real asset to the team.",ko:"그녀는 팀에 정말 귀한 존재야."}});
W("basketball","명사","농구",2,{f:"basketballs",e:{en:"We play basketball on weekends.",ko:"주말마다 농구를 해."}});
W("combat","명사·동사","전투, 싸우다",2,{f:"combats combated combating",e:{en:"We need to combat fake news.",ko:"가짜 뉴스와 싸워야 해."}});
W("constitution","명사","헌법, 체질",2,{f:"constitutions",e:{en:"The constitution protects free speech.",ko:"헌법은 표현의 자유를 보호해."}});
W("consumer","명사","소비자",2,{f:"consumers",e:{en:"Consumers want cheaper prices.",ko:"소비자들은 더 싼 가격을 원해."}});
W("creation","명사","창작, 창조",2,{f:"creations",e:{en:"This dish is the chef's own creation.",ko:"이 요리는 셰프의 창작 요리야."}});
W("define","동사","정의하다",2,{f:"defines defined defining",e:{en:"How would you define success?",ko:"성공을 어떻게 정의하겠어?"}});
W("depression","명사","우울증, 불황",2,{f:"depressions",e:{en:"She's been dealing with depression.",ko:"그녀는 우울증을 겪고 있어."}});
W("employment","명사","고용, 일자리",2,{f:"employments",e:{en:"She's looking for employment.",ko:"그녀는 일자리를 찾고 있어."}});
W("exclusive","형용사","독점적인, 고급의",2,{e:{en:"It's an exclusive offer for members.",ko:"회원 전용 혜택이에요."}});
W("expert","명사","전문가",2,{f:"experts",e:{en:"Ask an expert.",ko:"전문가에게 물어봐."}});
W("frequently","부사","자주",2,{e:{en:"I frequently travel for work.",ko:"일 때문에 자주 출장 가."}});
W("golf","명사","골프",2,{f:"golfs",e:{en:"My dad plays golf on Sundays.",ko:"아빠는 일요일마다 골프를 치셔."}});
W("grace","명사","우아함, 은혜",2,{f:"graces",e:{en:"She handled it with grace.",ko:"그녀는 품위 있게 대처했어."}});
W("hopefully","부사","바라건대",2,{e:{en:"Hopefully, it won't rain.",ko:"비가 안 왔으면 좋겠다."}});
W("importance","명사","중요성",2,{f:"",e:{en:"Don't underestimate the importance of sleep.",ko:"잠의 중요성을 과소평가하지 마."}});
W("latter","명사·형용사","후자(의)",2,{f:"",e:{en:"Between tea and coffee, I prefer the latter.",ko:"차와 커피 중엔 후자가 좋아."}});
W("manufacture","동사","제조하다",2,{f:"manufactures manufactured manufacturing",e:{en:"They manufacture car parts.",ko:"그들은 자동차 부품을 제조해."}});
W("mining","명사","광업",2,{f:"",e:{en:"The town grew because of mining.",ko:"그 마을은 광업 덕분에 커졌어."}});
W("object","명사·동사","물건, 반대하다",2,{f:"objects objected objecting",e:{en:"Does anyone object?",ko:"반대하는 사람 있어?"}});
W("pattern","명사","무늬, 패턴",2,{f:"patterns",e:{en:"I like the pattern on your shirt.",ko:"네 셔츠 무늬 좋다."}});
W("personnel","명사","인원, 인사과",2,{f:"personnels",e:{en:"Only authorized personnel can enter.",ko:"허가된 인원만 들어갈 수 있어요."}});
W("pregnant","형용사","임신한",2,{e:{en:"My sister is pregnant!",ko:"언니가 임신했어!"}});
W("premier","형용사","최고의",2,{e:{en:"It's the city's premier hotel.",ko:"그곳은 도시 최고의 호텔이야."}});
W("promote","동사","승진시키다, 홍보하다",2,{f:"promotes promoted promoting",e:{en:"She got promoted last month.",ko:"그녀는 지난달 승진했어."}});
W("revolution","명사","혁명",2,{f:"revolutions",e:{en:"Smartphones started a revolution.",ko:"스마트폰이 혁명을 일으켰어."}});
W("severe","형용사","심각한",2,{e:{en:"I have a severe headache.",ko:"두통이 심해."}});
W("tournament","명사","토너먼트, 대회",2,{f:"tournaments",e:{en:"Our team made it to the tournament.",ko:"우리 팀이 대회에 진출했어."}});
W("victim","명사","피해자",2,{f:"victims",e:{en:"He was a victim of fraud.",ko:"그는 사기 피해자였어."}});
W("attend","동사","참석하다",2,{f:"attends attended attending",e:{en:"Will you attend the meeting?",ko:"회의에 참석할 거야?"}});
W("ban","동사·명사","금지하다, 금지",2,{f:"bans banned banning",e:{en:"Smoking is banned here.",ko:"여기선 흡연이 금지야."}});
W("carbon","명사","탄소",2,{f:"carbons",e:{en:"We need to reduce carbon emissions.",ko:"탄소 배출을 줄여야 해."}});
W("declare","동사","선언하다, 신고하다",2,{f:"declares declared declaring",e:{en:"Do you have anything to declare?",ko:"신고할 물건 있으세요?"}});
W("depth","명사","깊이",2,{f:"depths",e:{en:"We discussed it in depth.",ko:"우리는 그걸 깊이 논의했어."}});
W("deputy","명사","부(副)-, 대리",2,{f:"deputies",e:{en:"She's the deputy manager.",ko:"그녀는 부매니저야."}});
W("earn","동사","벌다",2,{f:"earns earned earning",e:{en:"How much do you earn a month?",ko:"한 달에 얼마 벌어?"}});
W("electronic","형용사","전자의",2,{e:{en:"Turn off all electronic devices.",ko:"모든 전자 기기를 꺼 주세요."}});
W("error","명사","오류",2,{f:"errors",e:{en:"There's an error on the screen.",ko:"화면에 오류가 떴어."}});
W("existence","명사","존재",2,{f:"existences",e:{en:"I didn't know of its existence.",ko:"그런 게 있는지도 몰랐어."}});
W("expression","명사","표현, 표정",2,{f:"expressions",e:{en:"That's a common expression.",ko:"그건 흔히 쓰는 표현이야."}});
W("factory","명사","공장",2,{f:"factories",e:{en:"My dad works in a factory.",ko:"아빠는 공장에서 일하셔."}});
W("interior","명사·형용사","실내(의)",2,{f:"interiors",e:{en:"I love the interior of this café.",ko:"이 카페 인테리어가 정말 좋아."}});
W("joy","명사","기쁨",2,{f:"joys",e:{en:"Her baby brings her so much joy.",ko:"아기가 그녀에게 큰 기쁨을 줘."}});
W("legislation","명사","법률, 입법",2,{f:"legislations",e:{en:"The new legislation starts next year.",ko:"새 법은 내년에 시행돼."}});
W("maintenance","명사","유지 보수",2,{f:"",e:{en:"The elevator is under maintenance.",ko:"엘리베이터 점검 중이에요."}});
W("mate","명사","친구, 동료",2,{f:"mates",e:{en:"He's my old school mate.",ko:"그는 내 학교 동창이야."}});
W("origin","명사","기원, 출신",2,{f:"origins",e:{en:"What's the origin of this word?",ko:"이 단어의 기원이 뭐야?"}});
W("panel","명사","패널, 위원단",2,{f:"panels",e:{en:"She was on a panel at the conference.",ko:"그녀는 학회에서 패널로 참석했어."}});
W("personality","명사","성격",2,{f:"personalities",e:{en:"She has a great personality.",ko:"그녀는 성격이 정말 좋아."}});
W("relief","명사","안도, 완화",2,{f:"reliefs",e:{en:"What a relief!",ko:"정말 다행이다!"}});
W("resistance","명사","저항",2,{f:"resistances",e:{en:"There was some resistance to the change.",ko:"변화에 대한 저항이 좀 있었어."}});
W("rice","명사","쌀, 밥",2,{f:"rices",e:{en:"Would you like rice or noodles?",ko:"밥으로 하실래요, 국수로 하실래요?"}});
W("somewhat","부사","어느 정도",2,{e:{en:"I'm somewhat tired.",ko:"어느 정도 피곤해."}});
W("surely","부사","분명히",2,{e:{en:"Surely you're joking.",ko:"설마 농담이지."}});
W("absolute","형용사","완전한",2,{e:{en:"It was an absolute disaster.",ko:"완전히 엉망이었어."}});
W("baseball","명사","야구",2,{f:"baseballs",e:{en:"Do you want to watch a baseball game?",ko:"야구 경기 볼래?"}});
W("cable","명사","케이블",2,{f:"cables",e:{en:"I need a longer charging cable.",ko:"더 긴 충전 케이블이 필요해."}});
W("calm","형용사·동사","침착한, 진정시키다",2,{f:"calms calmed calming",e:{en:"Stay calm and wait here.",ko:"침착하게 여기서 기다려."}});
W("championship","명사","선수권 대회",2,{f:"championships",e:{en:"They won the championship.",ko:"그들은 선수권 대회에서 우승했어."}});
W("constant","형용사","끊임없는",2,{e:{en:"The constant noise is driving me crazy.",ko:"끊임없는 소음 때문에 미치겠어."}});
W("dumb","형용사","멍청한",2,{e:{en:"That was a dumb mistake.",ko:"바보 같은 실수였어."}});
W("empire","명사","제국",2,{f:"empires",e:{en:"The Roman Empire lasted for centuries.",ko:"로마 제국은 수백 년 동안 이어졌어."}});
W("expansion","명사","확장",2,{f:"expansions",e:{en:"The company is planning an expansion.",ko:"회사가 확장을 계획 중이야."}});
W("heavily","부사","심하게, 많이",2,{e:{en:"It rained heavily all night.",ko:"밤새 비가 많이 왔어."}});
W("hide","동사","숨다, 숨기다",2,{f:"hid hidden hides hiding",e:{en:"Where did you hide the key?",ko:"열쇠 어디 숨겼어?"}});
W("incident","명사","사건",2,{f:"incidents",e:{en:"There was an incident at the station.",ko:"역에서 사건이 있었어."}});
W("politician","명사","정치인",2,{f:"politicians",e:{en:"He became a politician after law school.",ko:"그는 로스쿨 졸업 후 정치인이 됐어."}});
W("quit","동사","그만두다",2,{f:"quitting quits quiting",e:{en:"I quit my job last week.",ko:"지난주에 일을 그만뒀어."}});
W("refuse","동사","거절하다",2,{f:"refuses refused refusing",e:{en:"He refused to answer.",ko:"그는 대답을 거부했어."}});
W("significantly","부사","상당히",2,{e:{en:"Prices have increased significantly.",ko:"가격이 상당히 올랐어."}});
W("widely","부사","널리",2,{e:{en:"The app is widely used.",ko:"그 앱은 널리 쓰여."}});
W("worldwide","부사·형용사","전 세계적으로",2,{e:{en:"The song became popular worldwide.",ko:"그 노래는 전 세계적으로 인기를 끌었어."}});
W("anniversary","명사","기념일",2,{f:"anniversaries",e:{en:"Today is our wedding anniversary.",ko:"오늘은 우리 결혼기념일이야."}});
W("attractive","형용사","매력적인",2,{e:{en:"The offer is very attractive.",ko:"그 제안은 아주 매력적이야."}});
W("bike","명사","자전거",2,{f:"bikes",e:{en:"I ride my bike to school.",ko:"자전거 타고 학교에 가."}});
W("cake","명사","케이크",2,{f:"cakes",e:{en:"Who wants a piece of cake?",ko:"케이크 먹을 사람?"}});
W("closely","부사","자세히, 밀접하게",2,{e:{en:"Listen closely.",ko:"잘 들어 봐."}});
W("contest","명사","대회",2,{f:"contests",e:{en:"She won the photo contest.",ko:"그녀는 사진 대회에서 우승했어."}});
W("hardly","부사","거의 ~않다",2,{e:{en:"I can hardly hear you.",ko:"네 말이 거의 안 들려."}});
W("hat","명사","모자",2,{f:"hats",e:{en:"Don't forget your hat.",ko:"모자 잊지 마."}});
W("height","명사","키, 높이",2,{f:"heights",e:{en:"What's your height?",ko:"키가 몇이에요?"}});
W("officially","부사","공식적으로",2,{e:{en:"We're officially on vacation!",ko:"우리 공식적으로 휴가야!"}});
W("pound","명사","파운드",2,{f:"pounds",e:{en:"I lost five pounds.",ko:"5파운드 빠졌어."}});
W("princess","명사","공주",2,{f:"princesses",e:{en:"My daughter wants to be a princess.",ko:"딸이 공주가 되고 싶대."}});
W("raw","형용사","날것의",2,{e:{en:"Do you eat raw fish?",ko:"회 먹어?"}});
W("reform","명사·동사","개혁, 개혁하다",2,{f:"reforms reformed reforming",e:{en:"The school needs reform.",ko:"학교는 개혁이 필요해."}});
W("respond","동사","응답하다",2,{f:"responds responded responding",e:{en:"She hasn't responded yet.",ko:"그녀가 아직 답장을 안 했어."}});
W("retirement","명사","은퇴",2,{f:"retirements",e:{en:"He's enjoying his retirement.",ko:"그는 은퇴 생활을 즐기고 있어."}});
W("sample","명사","샘플, 견본",2,{f:"samples",e:{en:"Can I try a sample?",ko:"맛보기 하나 먹어 봐도 돼요?"}});
W("secondary","형용사","부차적인, 중등의",2,{e:{en:"Price is a secondary concern.",ko:"가격은 부차적인 문제야."}});
W("solar","형용사","태양의",2,{e:{en:"We installed solar panels.",ko:"우리는 태양광 패널을 설치했어."}});
W("somehow","부사","어떻게든, 왠지",2,{e:{en:"Somehow, we made it on time.",ko:"어떻게든 제시간에 도착했어."}});
W("suffer","동사","고통받다",2,{f:"suffers suffered suffering",e:{en:"He suffers from back pain.",ko:"그는 허리 통증에 시달려."}});
W("ultimate","형용사","궁극적인, 최고의",2,{e:{en:"It's the ultimate road trip.",ko:"최고의 자동차 여행이야."}});
W("unknown","형용사","알려지지 않은",2,{e:{en:"The cause is still unknown.",ko:"원인은 아직 알려지지 않았어."}});
W("attach","동사","첨부하다",2,{f:"attaches attached attaching",e:{en:"I've attached the file.",ko:"파일 첨부했어요."}});
W("automatically","부사","자동으로",2,{e:{en:"The door opens automatically.",ko:"문이 자동으로 열려."}});
W("blind","형용사","눈먼",2,{e:{en:"My grandpa is almost blind.",ko:"할아버지는 거의 앞을 못 보셔."}});
W("brief","형용사","짧은",2,{e:{en:"Let's keep the meeting brief.",ko:"회의는 짧게 하자."}});
W("engage","동사","참여시키다, 관여하다",2,{f:"engages engaged engaging",e:{en:"The teacher tries to engage every student.",ko:"선생님은 모든 학생을 참여시키려고 해."}});
W("external","형용사","외부의",2,{e:{en:"We hired an external consultant.",ko:"외부 컨설턴트를 고용했어."}});
W("fantasy","명사","공상, 판타지",2,{f:"fantasies",e:{en:"I love fantasy novels.",ko:"판타지 소설 좋아해."}});
W("immediate","형용사","즉각적인",2,{e:{en:"We need an immediate answer.",ko:"즉시 답이 필요해."}});
W("introduction","명사","소개, 도입",2,{f:"introductions",e:{en:"Thanks for the introduction.",ko:"소개해 줘서 고마워."}});
W("license","명사","면허",2,{f:"licenses",e:{en:"Do you have a driver's license?",ko:"운전면허 있어?"}});
W("pilot","명사","조종사",2,{f:"pilots",e:{en:"The pilot announced a delay.",ko:"기장이 지연을 알렸어."}});
W("pink","형용사","분홍색의",2,{e:{en:"She painted her room pink.",ko:"그녀는 방을 분홍색으로 칠했어."}});
W("presidential","형용사","대통령의",2,{e:{en:"The presidential election is next year.",ko:"대통령 선거는 내년이야."}});
W("principal","명사·형용사","교장, 주요한",2,{f:"principals",e:{en:"The principal called my parents.",ko:"교장 선생님이 부모님께 전화하셨어."}});
W("regularly","부사","규칙적으로",2,{e:{en:"I exercise regularly.",ko:"규칙적으로 운동해."}});
W("singer","명사","가수",2,{f:"singers",e:{en:"She's my favorite singer.",ko:"그녀는 내가 제일 좋아하는 가수야."}});
W("steam","명사","증기, 김",2,{f:"steams",e:{en:"Let off some steam at the gym.",ko:"헬스장에서 스트레스 좀 풀어."}});
W("survive","동사","살아남다",2,{f:"survives survived surviving",e:{en:"We survived the long flight.",ko:"긴 비행을 무사히 버텼어."}});
W("tall","형용사","키가 큰",2,{e:{en:"He's really tall.",ko:"그는 정말 키가 커."}});
W("theater","명사","극장",3,{f:"theaters",e:{en:"Let's go to the theater tonight.",ko:"오늘 밤 극장 가자."}});
W("witness","명사·동사","목격자, 목격하다",2,{f:"witnesses witnessed witnessing",e:{en:"Did anyone witness the accident?",ko:"사고 목격한 사람 있어요?"}});
W("adopt","동사","입양하다, 채택하다",2,{f:"adopts adopted adopting",e:{en:"They adopted a dog.",ko:"그들은 개를 입양했어."}});
W("campus","명사","캠퍼스",2,{f:"campuses",e:{en:"Do you live on campus?",ko:"캠퍼스 안에 살아?"}});
W("cap","명사","모자, 뚜껑",2,{f:"caps",e:{en:"Put the cap back on the pen.",ko:"펜 뚜껑 다시 닫아."}});
W("childhood","명사","어린 시절",2,{f:"childhoods",e:{en:"I had a happy childhood.",ko:"행복한 어린 시절을 보냈어."}});
W("clinical","형용사","임상의",2,{e:{en:"They're running clinical trials.",ko:"임상 시험을 진행 중이야."}});
W("comedy","명사","코미디",2,{f:"comedies",e:{en:"Let's watch a comedy tonight.",ko:"오늘 밤엔 코미디 보자."}});
W("comparison","명사","비교",2,{f:"comparisons",e:{en:"There's no comparison.",ko:"비교가 안 돼."}});
W("defeat","동사·명사","이기다, 패배",2,{f:"defeats defeated defeating",e:{en:"They defeated us easily.",ko:"그들은 우리를 쉽게 이겼어."}});
W("democracy","명사","민주주의",2,{f:"democracies",e:{en:"Voting is part of democracy.",ko:"투표는 민주주의의 일부야."}});
W("entitle","동사","자격을 주다",2,{f:"entitles entitled entitling",e:{en:"You're entitled to a refund.",ko:"환불받을 자격이 있어요."}});
W("exact","형용사","정확한",2,{e:{en:"What's the exact time?",ko:"정확한 시간이 몇 시야?"}});
W("expose","동사","노출시키다, 폭로하다",2,{f:"exposes exposed exposing",e:{en:"Don't expose your skin to the sun too long.",ko:"햇볕에 피부를 너무 오래 노출하지 마."}});
W("injure","동사","다치게 하다",2,{f:"injures injured injuring",e:{en:"He injured his back lifting boxes.",ko:"그는 상자를 들다가 허리를 다쳤어."}});
W("musical","명사·형용사","뮤지컬, 음악의",2,{f:"musicals",e:{en:"We saw a musical on Broadway.",ko:"브로드웨이에서 뮤지컬을 봤어."}});
W("oppose","동사","반대하다",2,{f:"opposes opposed opposing",e:{en:"Many people oppose the plan.",ko:"많은 사람이 그 계획에 반대해."}});
W("organize","동사","정리하다, 준비하다",2,{f:"organizes organized organizing",e:{en:"I need to organize my closet.",ko:"옷장 정리해야 해."}});
W("plastic","명사·형용사","플라스틱(의)",2,{f:"plastics",e:{en:"Do you need a plastic bag?",ko:"비닐봉지 필요하세요?"}});
W("swear","동사","맹세하다, 욕하다",2,{f:"swore sworn swears swearing",e:{en:"I swear I didn't do it.",ko:"맹세코 내가 안 했어."}});
W("technique","명사","기법",2,{f:"techniques",e:{en:"Practice your breathing technique.",ko:"호흡법을 연습해 봐."}});
W("tie","명사·동사","넥타이, 묶다",2,{f:"ties tied tying",e:{en:"You don't need to wear a tie.",ko:"넥타이는 안 매도 돼."}});
W("trend","명사","유행",2,{f:"trends",e:{en:"It's the latest fashion trend.",ko:"최신 유행이야."}});
W("valuable","형용사","귀중한",2,{e:{en:"Don't leave valuable items in the car.",ko:"차에 귀중품을 두지 마세요."}});
W("wealth","명사","부, 재산",2,{f:"",e:{en:"Health is more important than wealth.",ko:"건강이 재산보다 중요해."}});
W("wise","형용사","현명한",2,{e:{en:"That was a wise decision.",ko:"현명한 결정이었어."}});
W("aged","형용사","~세의",2,{e:{en:"Children aged five and under are free.",ko:"5세 이하 어린이는 무료예요."}});
W("approval","명사","승인",2,{f:"approvals",e:{en:"I need my manager's approval.",ko:"매니저 승인이 필요해."}});
W("aspect","명사","측면",2,{f:"aspects",e:{en:"Consider every aspect of the problem.",ko:"문제의 모든 측면을 생각해 봐."}});
W("bread","명사","빵",2,{f:"breads",e:{en:"I bought some fresh bread.",ko:"갓 구운 빵을 샀어."}});
W("convention","명사","대회, 관습",2,{f:"conventions",e:{en:"We're going to a comic convention.",ko:"만화 박람회에 가."}});
W("engineer","명사","엔지니어",2,{f:"engineers",e:{en:"My sister is a software engineer.",ko:"언니는 소프트웨어 엔지니어야."}});
W("equivalent","명사·형용사","상응하는 것",2,{f:"equivalents",e:{en:"Is there a Korean equivalent?",ko:"한국어로 비슷한 말이 있어?"}});
W("gang","명사","무리, 패거리",2,{f:"gangs",e:{en:"The whole gang is coming tonight.",ko:"오늘 밤 다들 와."}});
W("inner","형용사","내부의",3,{e:{en:"Find your inner peace.",ko:"마음의 평화를 찾아."}});
W("lift","동사·명사","들어 올리다, 태워 줌",3,{f:"lifts lifted lifting",e:{en:"Can you give me a lift?",ko:"좀 태워 줄 수 있어?"}});
W("monthly","형용사","매달의",3,{e:{en:"What's the monthly fee?",ko:"월 요금이 얼마예요?"}});
W("outstanding","형용사","뛰어난, 미지불의",3,{e:{en:"Her work is outstanding.",ko:"그녀의 작업은 뛰어나."}});
W("permission","명사","허락",3,{f:"permissions",e:{en:"You need permission to park here.",ko:"여기 주차하려면 허가가 필요해."}});
W("regulation","명사","규정",3,{f:"regulations",e:{en:"Safety regulations are strict here.",ko:"여기는 안전 규정이 엄격해."}});
W("scientist","명사","과학자",3,{f:"scientists",e:{en:"She wants to be a scientist.",ko:"그녀는 과학자가 되고 싶어 해."}});
W("shoulder","명사","어깨",3,{f:"shoulders",e:{en:"My shoulder hurts.",ko:"어깨가 아파."}});
W("tradition","명사","전통",3,{f:"traditions",e:{en:"It's a family tradition.",ko:"그건 우리 집 전통이야."}});
W("barely","부사","간신히",3,{e:{en:"I barely slept last night.",ko:"어젯밤에 거의 못 잤어."}});
W("chocolate","명사","초콜릿",3,{f:"chocolates",e:{en:"I can't resist chocolate.",ko:"초콜릿은 못 참아."}});
W("coal","명사","석탄",3,{f:"coals",e:{en:"The plant still burns coal.",ko:"그 발전소는 아직 석탄을 때."}});
W("effectively","부사","효과적으로",3,{e:{en:"We need to communicate more effectively.",ko:"더 효과적으로 소통해야 해."}});
W("extensive","형용사","광범위한",3,{e:{en:"The hotel has extensive gardens.",ko:"그 호텔엔 넓은 정원이 있어."}});
W("formation","명사","형성, 대형",3,{f:"formations",e:{en:"The birds flew in formation.",ko:"새들이 대형을 지어 날았어."}});
W("highway","명사","고속도로",3,{f:"highways",e:{en:"Traffic on the highway is terrible.",ko:"고속도로가 엄청 막혀."}});
W("historic","형용사","역사적으로 중요한",3,{e:{en:"It was a historic moment.",ko:"역사적인 순간이었어."}});
W("hunt","동사","사냥하다, 찾아다니다",3,{f:"hunts hunted hunting",e:{en:"I'm hunting for a new apartment.",ko:"새집을 찾아다니고 있어."}});
W("improvement","명사","개선",3,{f:"improvements",e:{en:"There's been a big improvement.",ko:"많이 나아졌어."}});
W("inch","명사","인치",3,{f:"inches",e:{en:"The screen is six inches wide.",ko:"화면은 6인치야."}});
W("initially","부사","처음에는",3,{e:{en:"Initially, I didn't like it.",ko:"처음엔 별로였어."}});
W("jury","명사","배심원단",3,{f:"juries",e:{en:"The jury reached a verdict.",ko:"배심원단이 평결을 내렸어."}});
W("korean","형용사·명사","한국의, 한국어",3,{f:"koreans",e:{en:"Can you speak Korean?",ko:"한국어 할 줄 알아요?"}});
W("monster","명사","괴물",3,{f:"monsters",e:{en:"The kids are scared of monsters.",ko:"아이들은 괴물을 무서워해."}});
W("obtain","동사","얻다",3,{f:"obtains obtained obtaining",e:{en:"You need to obtain a visa first.",ko:"먼저 비자를 받아야 해."}});
W("olympic","형용사","올림픽의",3,{e:{en:"She's an Olympic swimmer.",ko:"그녀는 올림픽 수영 선수야."}});
W("philosophy","명사","철학",3,{f:"philosophies",e:{en:"What's your philosophy on life?",ko:"인생관이 뭐야?"}});
W("pride","명사","자부심",3,{f:"prides",e:{en:"She takes pride in her work.",ko:"그녀는 자기 일에 자부심이 있어."}});
W("settlement","명사","합의, 정착지",3,{f:"settlements",e:{en:"They reached a settlement.",ko:"그들은 합의에 이르렀어."}});
W("smell","동사·명사","냄새가 나다, 냄새",3,{f:"smells smelled smelling",e:{en:"Something smells good!",ko:"뭔가 냄새 좋다!"}});
W("surround","동사","둘러싸다",3,{f:"surrounds surrounded surrounding",e:{en:"The house is surrounded by trees.",ko:"그 집은 나무로 둘러싸여 있어."}});
W("universal","형용사","보편적인",3,{e:{en:"Music is a universal language.",ko:"음악은 세계 공용어야."}});
W("vast","형용사","방대한",3,{e:{en:"The park is vast.",ko:"공원이 엄청 넓어."}});
W("visitor","명사","방문객",3,{f:"visitors",e:{en:"The museum gets many visitors.",ko:"그 박물관엔 방문객이 많아."}});
W("auto","형용사·명사","자동의, 자동차",3,{f:"autos",e:{en:"Turn on auto mode.",ko:"자동 모드를 켜."}});
W("consistent","형용사","일관된",3,{e:{en:"Try to be consistent with your practice.",ko:"꾸준하게 연습해 봐."}});
W("meanwhile","부사","그동안에",3,{e:{en:"Meanwhile, I'll make some coffee.",ko:"그동안 커피 좀 탈게."}});
W("naturally","부사","자연스럽게, 당연히",3,{e:{en:"Just act naturally.",ko:"그냥 자연스럽게 행동해."}});
W("necessarily","부사","반드시",3,{e:{en:"Expensive isn't necessarily better.",ko:"비싸다고 꼭 좋은 건 아니야."}});
W("pants","명사","바지",3,{f:"",e:{en:"These pants are too long.",ko:"이 바지 너무 길어."}});
W("partnership","명사","협력, 동업",3,{f:"partnerships",e:{en:"We formed a partnership.",ko:"우리는 동업 관계를 맺었어."}});
W("percentage","명사","비율",3,{f:"percentages",e:{en:"What percentage of students passed?",ko:"학생 몇 퍼센트가 통과했어?"}});
W("practical","형용사","실용적인",3,{e:{en:"That's a practical idea.",ko:"그건 실용적인 생각이야."}});
W("primarily","부사","주로",3,{e:{en:"The app is primarily for students.",ko:"그 앱은 주로 학생용이야."}});
W("regardless","부사","~와 상관없이",3,{e:{en:"We'll go regardless of the weather.",ko:"날씨와 상관없이 갈 거야."}});
W("relative","명사·형용사","친척, 상대적인",3,{f:"relatives",e:{en:"I'm staying with relatives.",ko:"친척 집에 머물고 있어."}});
W("rescue","동사·명사","구조하다, 구조",3,{f:"rescues rescued rescuing",e:{en:"The firefighters rescued the cat.",ko:"소방관들이 고양이를 구조했어."}});
W("stable","형용사","안정된",3,{e:{en:"His condition is stable now.",ko:"그의 상태는 이제 안정적이야."}});
W("temporary","형용사","임시의",3,{e:{en:"It's only a temporary job.",ko:"그건 임시직일 뿐이야."}});
W("trick","명사·동사","속임수, 비결",3,{f:"tricks tricked tricking",e:{en:"What's the trick to making good rice?",ko:"밥을 맛있게 짓는 비결이 뭐야?"}});
W("audio","명사","음성, 오디오",3,{f:"audios",e:{en:"The audio is too quiet.",ko:"소리가 너무 작아."}});
W("bone","명사","뼈",3,{f:"bones",e:{en:"He broke a bone in his hand.",ko:"그는 손뼈가 부러졌어."}});
W("circuit","명사","회로, 순회",3,{f:"circuits",e:{en:"There's a problem with the circuit.",ko:"회로에 문제가 있어."}});
W("clothing","명사","의류",3,{f:"clothings",e:{en:"The store sells outdoor clothing.",ko:"그 가게는 아웃도어 의류를 팔아."}});
W("complicated","형용사","복잡한",3,{e:{en:"It's complicated.",ko:"복잡해."}});
W("confuse","동사","혼동하다, 헷갈리게 하다",3,{f:"confuses confused confusing",e:{en:"I always confuse those two words.",ko:"그 두 단어는 늘 헷갈려."}});
W("consequence","명사","결과",3,{f:"consequences",e:{en:"Think about the consequences.",ko:"결과를 생각해 봐."}});
W("defend","동사","방어하다",3,{f:"defends defended defending",e:{en:"You don't have to defend yourself.",ko:"변명할 필요 없어."}});
W("everyday","형용사","일상의",3,{e:{en:"These are everyday expressions.",ko:"이건 일상 표현이야."}});
W("format","명사","형식",3,{f:"formats",e:{en:"What format should the file be in?",ko:"파일은 어떤 형식이어야 해요?"}});
W("harm","명사·동사","해, 해치다",3,{f:"harms harmed harming",e:{en:"There's no harm in asking.",ko:"물어봐서 손해 볼 건 없어."}});
W("household","명사·형용사","가정(의)",3,{f:"households",e:{en:"We share the household chores.",ko:"우리는 집안일을 나눠서 해."}});
W("immigration","명사","이민, 출입국 심사",3,{f:"immigrations",e:{en:"We waited an hour at immigration.",ko:"출입국 심사에서 한 시간 기다렸어."}});
W("impressive","형용사","인상적인",3,{e:{en:"Your English is impressive.",ko:"네 영어 실력 인상적이야."}});
W("killer","명사·형용사","살인자, 엄청난",3,{f:"killers",e:{en:"This song is a killer.",ko:"이 노래 끝내줘."}});
W("lesson","명사","수업, 교훈",3,{f:"lessons",e:{en:"I learned my lesson.",ko:"교훈을 얻었어."}});
W("membership","명사","회원 자격",3,{f:"memberships",e:{en:"How much is a gym membership?",ko:"헬스장 회원권 얼마예요?"}});
W("mirror","명사","거울",3,{f:"mirrors",e:{en:"Look in the mirror.",ko:"거울 좀 봐."}});
W("parking","명사","주차",3,{f:"",e:{en:"Is there free parking?",ko:"무료 주차 돼요?"}});
W("proposal","명사","제안, 청혼",3,{f:"proposals",e:{en:"She accepted his proposal.",ko:"그녀는 그의 청혼을 받아들였어."}});
W("recognition","명사","인정, 인식",3,{f:"recognitions",e:{en:"She deserves more recognition.",ko:"그녀는 더 인정받아야 해."}});
W("reputation","명사","평판",3,{f:"reputations",e:{en:"The restaurant has a good reputation.",ko:"그 식당은 평판이 좋아."}});
W("shortly","부사","곧",3,{e:{en:"The doctor will see you shortly.",ko:"의사 선생님이 곧 봐 드릴 거예요."}});
W("strongly","부사","강하게",3,{e:{en:"I strongly disagree.",ko:"나는 강하게 반대해."}});
W("tear","명사·동사","눈물, 찢다",3,{f:"tore tears teared tearing",e:{en:"She had tears in her eyes.",ko:"그녀의 눈에 눈물이 고였어."}});
W("accuse","동사","비난하다, 고발하다",3,{f:"accuses accused accusing",e:{en:"Are you accusing me of lying?",ko:"내가 거짓말했다는 거야?"}});
W("adventure","명사","모험",3,{f:"adventures",e:{en:"Traveling alone was a real adventure.",ko:"혼자 여행은 진짜 모험이었어."}});
W("assessment","명사","평가",3,{f:"assessments",e:{en:"We'll do a quick assessment first.",ko:"먼저 간단히 평가할게요."}});
W("awful","형용사","끔찍한",3,{e:{en:"The weather was awful.",ko:"날씨가 끔찍했어."}});
W("bedroom","명사","침실",3,{f:"bedrooms",e:{en:"The apartment has two bedrooms.",ko:"그 집은 방이 두 개야."}});
W("belief","명사","믿음",3,{f:"beliefs",e:{en:"It's a common belief.",ko:"흔히들 그렇게 믿어."}});
W("bind","동사","묶다",3,{f:"bound binds binding",e:{en:"We're bound by the contract.",ko:"우리는 계약에 묶여 있어."}});
W("carefully","부사","조심스럽게",3,{e:{en:"Drive carefully.",ko:"조심해서 운전해."}});
W("closing","명사·형용사","폐점, 마지막의",3,{f:"closings",e:{en:"What's the closing time?",ko:"문 닫는 시간이 언제예요?"}});
W("contrast","명사","대조",3,{f:"contrasts",e:{en:"In contrast, the second room was huge.",ko:"반면 두 번째 방은 엄청 컸어."}});
W("elsewhere","부사","다른 곳에서",3,{e:{en:"Let's look elsewhere.",ko:"다른 데 찾아보자."}});
W("founder","명사","창립자",3,{f:"founders",e:{en:"She's the founder of the company.",ko:"그녀는 그 회사의 창립자야."}});
W("hill","명사","언덕",3,{f:"hills",e:{en:"The house is at the top of the hill.",ko:"그 집은 언덕 꼭대기에 있어."}});
W("hip","명사·형용사","엉덩이, 힙한",3,{f:"hips",e:{en:"This neighborhood is really hip.",ko:"이 동네 정말 힙해."}});
W("infrastructure","명사","기반 시설",3,{f:"infrastructures",e:{en:"The city needs better infrastructure.",ko:"그 도시는 기반 시설이 더 필요해."}});
W("loose","형용사","헐렁한, 느슨한",3,{e:{en:"These pants are a bit loose.",ko:"이 바지 좀 헐렁해."}});
W("moral","형용사·명사","도덕적인, 교훈",3,{f:"morals",e:{en:"What's the moral of the story?",ko:"그 이야기의 교훈이 뭐야?"}});
W("offensive","형용사","불쾌한",3,{e:{en:"That joke was offensive.",ko:"그 농담은 불쾌했어."}});
W("poverty","명사","가난",3,{f:"",e:{en:"Many families live in poverty.",ko:"많은 가정이 가난하게 살아."}});
W("qualify","동사","자격을 얻다",3,{f:"qualified qualifies qualifying",e:{en:"You qualify for a discount.",ko:"할인 대상이에요."}});
W("railway","명사","철도",3,{f:"railways",e:{en:"The railway station is nearby.",ko:"기차역이 근처에 있어."}});
W("ridiculous","형용사","터무니없는",3,{e:{en:"That price is ridiculous.",ko:"그 가격 말도 안 돼."}});
W("server","명사","서버, 종업원",3,{f:"servers",e:{en:"The server is down.",ko:"서버가 다운됐어."}});
W("shock","명사","충격",3,{f:"shocks",e:{en:"The news came as a shock.",ko:"그 소식은 충격이었어."}});
W("silence","명사","침묵",3,{f:"silences",e:{en:"There was an awkward silence.",ko:"어색한 침묵이 흘렀어."}});
W("superior","형용사·명사","우수한, 상사",3,{f:"superiors",e:{en:"I need to ask my superior.",ko:"상사에게 물어봐야 해요."}});
W("supporter","명사","지지자",3,{f:"supporters",e:{en:"He's a big supporter of the team.",ko:"그는 그 팀의 열성 팬이야."}});
W("thick","형용사","두꺼운",3,{e:{en:"This book is really thick.",ko:"이 책 정말 두꺼워."}});
W("ton","명사","톤, (a ton of) 아주 많은",3,{f:"tons",e:{en:"I have a ton of work.",ko:"일이 산더미야."}});
W("transition","명사","전환",3,{f:"transitions",e:{en:"The transition was smooth.",ko:"전환이 순조로웠어."}});
W("violent","형용사","폭력적인",3,{e:{en:"The movie is too violent for kids.",ko:"그 영화는 아이들에겐 너무 폭력적이야."}});
W("voter","명사","유권자",3,{f:"voters",e:{en:"Voters are tired of promises.",ko:"유권자들은 공약에 지쳤어."}});
W("acid","명사","산",3,{f:"acids",e:{en:"Lemon juice contains acid.",ko:"레몬즙엔 산이 들어 있어."}});
W("actress","명사","여배우",3,{f:"actresses",e:{en:"She's a famous actress.",ko:"그녀는 유명한 배우야."}});
W("administrative","형용사","행정의",3,{e:{en:"There's a lot of administrative work.",ko:"행정 업무가 많아."}});
W("alongside","전치사","~와 함께",3,{e:{en:"I worked alongside great people.",ko:"훌륭한 사람들과 함께 일했어."}});
W("angel","명사","천사",3,{f:"angels",e:{en:"You're an angel!",ko:"넌 천사야!"}});
W("anxiety","명사","불안",3,{f:"anxieties",e:{en:"I get anxiety before speaking in public.",ko:"사람들 앞에서 말하기 전에 불안해져."}});
W("bonus","명사","보너스",3,{f:"bonuses",e:{en:"We got a bonus this year.",ko:"올해 보너스를 받았어."}});
W("charity","명사","자선 단체",3,{f:"charities",e:{en:"She donates to charity every month.",ko:"그녀는 매달 자선 단체에 기부해."}});
W("curious","형용사","궁금한, 호기심 많은",3,{e:{en:"I'm just curious.",ko:"그냥 궁금해서."}});
W("encourage","동사","격려하다",3,{f:"encourages encouraged encouraging",e:{en:"My teacher encouraged me to try.",ko:"선생님이 해 보라고 격려해 주셨어."}});
W("enforcement","명사","집행, 단속",3,{f:"enforcements",e:{en:"Law enforcement arrived quickly.",ko:"경찰이 금방 도착했어."}});
W("flash","명사","섬광, 플래시",3,{f:"flashes",e:{en:"Please don't use flash.",ko:"플래시는 쓰지 마세요."}});
W("formula","명사","공식",3,{f:"formulas",e:{en:"There's no magic formula.",ko:"마법 같은 공식은 없어."}});
W("fort","명사","요새",3,{f:"forts",e:{en:"We visited an old fort.",ko:"오래된 요새를 방문했어."}});
W("gray","형용사","회색의",3,{e:{en:"It's a gray, rainy day.",ko:"흐리고 비 오는 날이야."}});
W("gross","형용사","역겨운",3,{e:{en:"That's so gross!",ko:"진짜 역겹다!"}});
W("inform","동사","알리다",3,{f:"informs informed informing",e:{en:"Please inform us of any changes.",ko:"변경 사항이 있으면 알려 주세요."}});
W("innocent","형용사","무죄의, 순진한",3,{e:{en:"He's innocent.",ko:"그는 무죄야."}});
W("mystery","명사","미스터리",3,{f:"mysteries",e:{en:"It's a mystery to me.",ko:"나도 도무지 모르겠어."}});
W("palace","명사","궁전",3,{f:"palaces",e:{en:"We toured the royal palace.",ko:"왕궁을 둘러봤어."}});
W("penalty","명사","벌금, 페널티",3,{f:"penalties",e:{en:"There's a penalty for late payment.",ko:"연체하면 벌금이 있어."}});
W("protest","명사·동사","시위, 항의하다",3,{f:"protests protested protesting",e:{en:"There was a protest downtown.",ko:"시내에서 시위가 있었어."}});
W("publication","명사","출판물",3,{f:"publications",e:{en:"The publication date is next month.",ko:"출간일은 다음 달이야."}});
W("rating","명사","평점",3,{f:"ratings",e:{en:"The app has a high rating.",ko:"그 앱은 평점이 높아."}});
W("respectively","부사","각각",3,{e:{en:"They are 20 and 25, respectively.",ko:"그들은 각각 20살, 25살이야."}});
W("silent","형용사","조용한",3,{e:{en:"Please keep your phone on silent.",ko:"폰은 무음으로 해 주세요."}});
W("successfully","부사","성공적으로",3,{e:{en:"We successfully finished the project.",ko:"프로젝트를 성공적으로 끝냈어."}});
W("uncle","명사","삼촌",3,{f:"uncles",e:{en:"My uncle lives in Canada.",ko:"삼촌은 캐나다에 사셔."}});
W("unusual","형용사","특이한",3,{e:{en:"It's unusual for him to be late.",ko:"그가 늦는 건 드문 일이야."}});
W("arrival","명사","도착",3,{f:"arrivals",e:{en:"What's your arrival time?",ko:"도착 시간이 언제예요?"}});
W("assault","명사","폭행",3,{f:"assaults",e:{en:"He was charged with assault.",ko:"그는 폭행 혐의로 기소됐어."}});
W("awareness","명사","인식",3,{f:"",e:{en:"We need to raise awareness.",ko:"인식을 높여야 해."}});
W("badly","부사","심하게, 서툴게",3,{e:{en:"I need a vacation badly.",ko:"휴가가 너무 필요해."}});
W("bath","명사","목욕",3,{f:"baths",e:{en:"I'm going to take a hot bath.",ko:"뜨거운 물에 목욕할 거야."}});
W("capture","동사","포착하다, 사로잡다",3,{f:"captures captured capturing",e:{en:"This photo captures the moment perfectly.",ko:"이 사진이 그 순간을 완벽하게 담았어."}});
W("chase","동사","쫓다",3,{f:"chases chased chasing",e:{en:"Don't chase the cat.",ko:"고양이 쫓지 마."}});
W("component","명사","부품, 요소",3,{f:"components",e:{en:"It's an important component.",ko:"그건 중요한 요소야."}});
W("concrete","형용사·명사","구체적인, 콘크리트",3,{f:"concretes",e:{en:"Can you give me a concrete example?",ko:"구체적인 예를 들어 줄래?"}});
W("deeply","부사","깊이",3,{e:{en:"I'm deeply sorry.",ko:"깊이 사과드려요."}});
W("explanation","명사","설명",3,{f:"explanations",e:{en:"Thanks for the clear explanation.",ko:"명확하게 설명해 줘서 고마워."}});
W("exposure","명사","노출",3,{f:"exposures",e:{en:"Too much sun exposure is bad for your skin.",ko:"햇볕에 너무 많이 노출되면 피부에 안 좋아."}});
W("fiction","명사","소설, 허구",3,{f:"fictions",e:{en:"I prefer fiction to nonfiction.",ko:"논픽션보다 소설이 좋아."}});
W("guarantee","동사·명사","보장하다, 보증",3,{f:"guarantees guaranteed guaranteeing",e:{en:"I can't guarantee it'll work.",ko:"그게 될 거라고 장담은 못 해."}});
W("happiness","명사","행복",3,{f:"",e:{en:"Money can't buy happiness.",ko:"돈으로 행복을 살 순 없어."}});
W("horrible","형용사","끔찍한",3,{e:{en:"I had a horrible dream.",ko:"끔찍한 꿈을 꿨어."}});
W("legend","명사","전설",3,{f:"legends",e:{en:"He's a legend in the music world.",ko:"그는 음악계의 전설이야."}});
W("passion","명사","열정",3,{f:"passions",e:{en:"Cooking is my passion.",ko:"요리는 내 열정이야."}});
W("producer","명사","제작자",3,{f:"producers",e:{en:"She's a TV producer.",ko:"그녀는 TV 프로듀서야."}});
W("rank","명사·동사","순위, 순위를 매기다",3,{f:"ranks ranked ranking",e:{en:"The school ranks among the top ten.",ko:"그 학교는 상위 10위 안에 들어."}});
W("replacement","명사","교체(품)",3,{f:"replacements",e:{en:"Can I get a replacement?",ko:"교환품 받을 수 있어요?"}});
W("retire","동사","은퇴하다",3,{f:"retires retired retiring",e:{en:"My dad retired last year.",ko:"아빠는 작년에 은퇴하셨어."}});
W("sand","명사","모래",3,{f:"sands",e:{en:"There's sand in my shoes.",ko:"신발에 모래가 들어갔어."}});
W("shadow","명사","그림자",3,{f:"shadows",e:{en:"The tree casts a long shadow.",ko:"나무가 긴 그림자를 드리워."}});
W("tape","명사","테이프",3,{f:"tapes",e:{en:"Do you have any tape?",ko:"테이프 있어?"}});
W("wage","명사","임금",3,{f:"wages",e:{en:"The minimum wage went up.",ko:"최저 임금이 올랐어."}});
W("avenue","명사","대로",3,{f:"avenues",e:{en:"The store is on Fifth Avenue.",ko:"그 가게는 5번가에 있어."}});
W("clock","명사","시계",3,{f:"clocks",e:{en:"The clock is five minutes fast.",ko:"시계가 5분 빨라."}});
W("commissioner","명사","위원, 국장",3,{f:"commissioners",e:{en:"The commissioner made a statement.",ko:"위원장이 성명을 발표했어."}});
W("commitment","명사","헌신, 약속",3,{f:"commitments",e:{en:"It's a big commitment.",ko:"그건 큰 결심이 필요한 일이야."}});
W("confident","형용사","자신 있는",3,{e:{en:"I feel more confident now.",ko:"이제 더 자신 있어."}});
W("custom","명사·형용사","관습, 맞춤의",3,{f:"customs",e:{en:"It's a local custom.",ko:"그건 그 지역 관습이야."}});
W("deny","동사","부인하다",3,{f:"denied denies denying",e:{en:"He denied everything.",ko:"그는 모든 걸 부인했어."}});
W("farmer","명사","농부",3,{f:"farmers",e:{en:"My grandfather was a farmer.",ko:"할아버지는 농부셨어."}});
W("horror","명사","공포",3,{f:"horrors",e:{en:"I don't watch horror movies.",ko:"공포 영화는 안 봐."}});
W("label","명사","라벨, 상표",3,{f:"labels",e:{en:"Read the label carefully.",ko:"라벨을 꼼꼼히 읽어."}});
W("naked","형용사","벌거벗은",3,{e:{en:"You can't see it with the naked eye.",ko:"맨눈으로는 안 보여."}});
W("output","명사","산출, 출력",3,{f:"outputs",e:{en:"Our output doubled this year.",ko:"올해 생산량이 두 배가 됐어."}});
W("pitch","명사","음높이, 투구, 홍보",3,{f:"pitches",e:{en:"She gave a great sales pitch.",ko:"그녀는 멋진 판매 홍보를 했어."}});
W("plain","형용사","평범한, 무늬 없는",3,{e:{en:"I'd like a plain white T-shirt.",ko:"무늬 없는 흰 티셔츠 주세요."}});
W("rear","형용사·명사","뒤쪽(의)",3,{f:"rears",e:{en:"Please use the rear entrance.",ko:"뒷문을 이용해 주세요."}});
W("romantic","형용사","낭만적인",3,{e:{en:"What a romantic dinner!",ko:"정말 낭만적인 저녁이다!"}});
W("strategic","형용사","전략적인",3,{e:{en:"It was a strategic decision.",ko:"그건 전략적인 결정이었어."}});
W("welfare","명사","복지",3,{f:"",e:{en:"Animal welfare matters to me.",ko:"동물 복지는 나에게 중요해."}});
W("wire","명사","전선",3,{f:"wires",e:{en:"Don't touch that wire.",ko:"저 전선 만지지 마."}});
W("afterwards","부사","나중에",3,{e:{en:"Let's grab dinner afterwards.",ko:"끝나고 저녁 먹자."}});
W("alright","형용사·부사","괜찮은",3,{e:{en:"Is everything alright?",ko:"다 괜찮아?"}});
W("anger","명사","분노",3,{f:"angers",e:{en:"He couldn't hide his anger.",ko:"그는 화를 숨기지 못했어."}});
W("architecture","명사","건축",3,{f:"architectures",e:{en:"I love the architecture in this city.",ko:"이 도시의 건축이 정말 좋아."}});
W("assist","동사","돕다",3,{f:"assists assisted assisting",e:{en:"How can I assist you?",ko:"무엇을 도와드릴까요?"}});
W("behalf","명사","(on behalf of) ~을 대신하여",3,{f:"",e:{en:"I'm calling on behalf of my manager.",ko:"매니저를 대신해 전화드렸어요."}});
W("ceremony","명사","의식, 식",3,{f:"ceremonies",e:{en:"The ceremony starts at two.",ko:"식은 2시에 시작해."}});
W("cop","명사","(구어) 경찰",3,{f:"cops",e:{en:"A cop stopped me for speeding.",ko:"과속으로 경찰한테 걸렸어."}});
W("diamond","명사","다이아몬드",3,{f:"diamonds",e:{en:"It's a diamond ring.",ko:"다이아몬드 반지야."}});
W("disappoint","동사","실망시키다",3,{f:"disappoints disappointing",e:{en:"I don't want to disappoint you.",ko:"널 실망시키고 싶지 않아."}});
W("electrical","형용사","전기의",3,{e:{en:"There's an electrical problem.",ko:"전기 문제가 있어."}});
W("employ","동사","고용하다",3,{f:"employs employed employing",e:{en:"The company employs 200 people.",ko:"그 회사는 200명을 고용하고 있어."}});
W("essentially","부사","본질적으로",3,{e:{en:"It's essentially the same thing.",ko:"본질적으로 같은 거야."}});
W("establishment","명사","기관, 시설",3,{f:"establishments",e:{en:"It's a family-run establishment.",ko:"가족이 운영하는 가게야."}});
W("ghost","명사","유령",3,{f:"ghosts",e:{en:"Do you believe in ghosts?",ko:"유령을 믿어?"}});
W("lab","명사","실험실",3,{f:"labs",e:{en:"She works in a lab.",ko:"그녀는 실험실에서 일해."}});
W("newly","부사","새로",3,{e:{en:"They're newly married.",ko:"그들은 신혼이야."}});
W("odd","형용사","이상한, 홀수의",3,{e:{en:"That's odd.",ko:"그거 이상하네."}});
W("ordinary","형용사","평범한",3,{e:{en:"It was just an ordinary day.",ko:"그냥 평범한 하루였어."}});
W("participate","동사","참여하다",3,{f:"participates participated participating",e:{en:"Everyone should participate.",ko:"모두 참여해야 해."}});
W("prayer","명사","기도",3,{f:"prayers",e:{en:"Our thoughts and prayers are with you.",ko:"당신을 위해 기도할게요."}});
W("rarely","부사","거의 ~않다",3,{e:{en:"I rarely eat out.",ko:"외식은 거의 안 해."}});
W("soil","명사","흙",3,{f:"soils",e:{en:"Plants need good soil.",ko:"식물에겐 좋은 흙이 필요해."}});
W("solve","동사","해결하다",3,{f:"solves solved solving",e:{en:"We solved the problem together.",ko:"우리는 함께 문제를 해결했어."}});
W("ugly","형용사","못생긴",3,{e:{en:"That sweater is so ugly.",ko:"저 스웨터 진짜 못생겼다."}});
W("boost","동사·명사","높이다, 활력",3,{f:"boosts boosted boosting",e:{en:"Coffee gives me a boost.",ko:"커피 마시면 힘이 나."}});
W("deck","명사","갑판, 데크",3,{f:"decks",e:{en:"Let's have dinner on the deck.",ko:"데크에서 저녁 먹자."}});
W("dragon","명사","용",3,{f:"dragons",e:{en:"My son loves dragons.",ko:"아들이 용을 정말 좋아해."}});
W("dramatic","형용사","극적인",3,{e:{en:"There was a dramatic change.",ko:"극적인 변화가 있었어."}});
W("dust","명사","먼지",3,{f:"dusts",e:{en:"The shelves are covered in dust.",ko:"선반이 먼지로 덮여 있어."}});
W("evolution","명사","진화",3,{f:"evolutions",e:{en:"It's the next step in the evolution of phones.",ko:"폰 진화의 다음 단계야."}});
W("hire","동사","고용하다, 빌리다",3,{f:"hires hired hiring",e:{en:"We're hiring new staff.",ko:"새 직원을 뽑고 있어."}});
W("illness","명사","병",3,{f:"illnesses",e:{en:"She recovered from a long illness.",ko:"그녀는 오랜 병에서 회복했어."}});
W("inspiration","명사","영감",3,{f:"inspirations",e:{en:"Where do you get your inspiration?",ko:"영감을 어디서 얻어?"}});
W("knife","명사","칼",3,{f:"knives knifes",e:{en:"Be careful with that knife.",ko:"그 칼 조심해."}});
W("minority","명사","소수",3,{f:"minorities",e:{en:"Only a minority agreed.",ko:"소수만 동의했어."}});
W("promotion","명사","승진, 판촉",3,{f:"promotions",e:{en:"Congratulations on your promotion!",ko:"승진 축하해!"}});
W("rail","명사","철도, 난간",3,{f:"rails",e:{en:"Hold on to the rail.",ko:"난간을 잡아."}});
W("reader","명사","독자",3,{f:"readers",e:{en:"She's a big reader.",ko:"그녀는 책을 많이 읽어."}});
W("root","명사","뿌리",3,{f:"roots",e:{en:"We need to find the root of the problem.",ko:"문제의 근원을 찾아야 해."}});
W("telephone","명사","전화",3,{f:"telephones",e:{en:"May I use your telephone?",ko:"전화 좀 써도 될까요?"}});
W("abandon","동사","버리다, 포기하다",3,{f:"abandons abandoned abandoning",e:{en:"They abandoned the plan.",ko:"그들은 계획을 포기했어."}});
W("acquire","동사","얻다, 인수하다",3,{f:"acquires acquiring",e:{en:"She wants to acquire new skills.",ko:"그녀는 새 기술을 익히고 싶어 해."}});
W("annoying","형용사","짜증 나는",3,{e:{en:"That noise is so annoying.",ko:"저 소리 진짜 짜증 나."}});
W("bid","명사·동사","입찰, 응찰하다",3,{f:"bids bidding",e:{en:"They made a bid for the house.",ko:"그들은 그 집에 입찰했어."}});
W("bury","동사","묻다",3,{f:"buried buries burying",e:{en:"The dog buried its bone.",ko:"개가 뼈를 묻었어."}});
W("butter","명사","버터",3,{f:"butters",e:{en:"Can you pass the butter?",ko:"버터 좀 건네줄래?"}});
W("congratulations","명사","축하해",3,{f:"",e:{en:"Congratulations on your new job!",ko:"새 직장 축하해!"}});
W("convince","동사","설득하다, 확신시키다",3,{f:"convinces convincing",e:{en:"It's hard to convince him.",ko:"그를 설득하기는 어려워."}});
W("decent","형용사","괜찮은, 적당한",3,{e:{en:"The food was decent.",ko:"음식은 괜찮았어."}});
W("decline","동사·명사","거절하다, 감소",3,{f:"declines declined declining",e:{en:"I had to decline the invitation.",ko:"초대를 거절해야 했어."}});
W("downtown","부사·명사","시내(에)",3,{f:"downtowns",e:{en:"Let's go downtown tonight.",ko:"오늘 밤 시내 가자."}});
W("elite","형용사","엘리트의",3,{e:{en:"She went to an elite university.",ko:"그녀는 명문대에 다녔어."}});
W("forth","부사","앞으로, (back and forth) 왔다 갔다",3,{e:{en:"We went back and forth about it.",ko:"그 문제로 왔다 갔다 했어."}});
W("insane","형용사","미친, 엄청난",3,{e:{en:"The traffic was insane.",ko:"차가 미친 듯이 막혔어."}});
W("install","동사","설치하다",3,{f:"installs installed installing",e:{en:"I need to install the app.",ko:"앱을 설치해야 해."}});
W("layer","명사","층, 겹",3,{f:"layers",e:{en:"Wear layers; it gets cold.",ko:"추워지니까 겹쳐 입어."}});
W("nurse","명사","간호사",3,{f:"nurses",e:{en:"The nurse will take your temperature.",ko:"간호사가 체온을 잴 거예요."}});
W("organic","형용사","유기농의",3,{e:{en:"I buy organic vegetables.",ko:"유기농 채소를 사."}});
W("participant","명사","참가자",3,{f:"participants",e:{en:"All participants get a certificate.",ko:"모든 참가자는 수료증을 받아."}});
W("poetry","명사","시",3,{f:"",e:{en:"She writes poetry.",ko:"그녀는 시를 써."}});
W("pot","명사","냄비, 화분",3,{f:"pots",e:{en:"Put the pot on the stove.",ko:"냄비를 레인지 위에 올려."}});
W("pray","동사","기도하다",3,{f:"prays prayed praying",e:{en:"I'll pray for you.",ko:"널 위해 기도할게."}});
W("recall","동사","기억해 내다",3,{f:"recalls recalled recalling",e:{en:"I don't recall saying that.",ko:"그렇게 말한 기억이 없어."}});
W("sake","명사","(for the sake of) ~을 위해",3,{f:"sakes",e:{en:"Do it for your own sake.",ko:"너 자신을 위해 해."}});
W("sheet","명사","시트, 한 장",3,{f:"sheets",e:{en:"Can I have a sheet of paper?",ko:"종이 한 장 주실래요?"}});
W("spiritual","형용사","정신적인",3,{e:{en:"It was a spiritual experience.",ko:"영적인 경험이었어."}});
W("sudden","형용사","갑작스러운",3,{e:{en:"It was a sudden decision.",ko:"갑작스러운 결정이었어."}});
W("assign","동사","배정하다",3,{f:"assigns assigned assigning",e:{en:"The teacher assigned us homework.",ko:"선생님이 숙제를 내주셨어."}});
W("bench","명사","벤치",3,{f:"benches",e:{en:"Let's sit on that bench.",ko:"저 벤치에 앉자."}});
W("bother","동사","귀찮게 하다",3,{f:"bothers bothered bothering",e:{en:"Sorry to bother you.",ko:"귀찮게 해서 미안해요."}});
W("compete","동사","경쟁하다",3,{f:"competes competed competing",e:{en:"We compete with bigger companies.",ko:"우리는 더 큰 회사들과 경쟁해."}});
W("consist","동사","(consist of) ~로 구성되다",3,{f:"consists consisted consisting",e:{en:"The team consists of five people.",ko:"팀은 다섯 명으로 구성돼."}});
W("contribute","동사","기여하다",3,{f:"contributes contributed contributing",e:{en:"Everyone contributed to the project.",ko:"모두가 프로젝트에 기여했어."}});
W("critic","명사","비평가",3,{f:"critics",e:{en:"The critics loved the movie.",ko:"비평가들이 그 영화를 극찬했어."}});
W("disaster","명사","재난, 엉망",3,{f:"disasters",e:{en:"The party was a total disaster.",ko:"파티는 완전히 엉망이었어."}});
W("entrance","명사","입구",3,{f:"entrances",e:{en:"Meet me at the main entrance.",ko:"정문에서 만나."}});
W("equally","부사","똑같이",3,{e:{en:"Split it equally.",ko:"똑같이 나눠."}});
W("fitness","명사","건강, 체력",3,{f:"",e:{en:"I'm working on my fitness.",ko:"체력을 기르는 중이야."}});
W("friendship","명사","우정",3,{f:"friendships",e:{en:"Our friendship means a lot to me.",ko:"우리 우정은 나에게 아주 소중해."}});
W("idiot","명사","바보",3,{f:"idiots",e:{en:"I felt like an idiot.",ko:"바보가 된 기분이었어."}});
W("intense","형용사","강렬한",3,{e:{en:"The workout was really intense.",ko:"운동이 정말 빡셌어."}});
W("makeup","명사","화장",3,{f:"makeups",e:{en:"She doesn't wear makeup.",ko:"그녀는 화장을 안 해."}});
W("mortgage","명사","주택 담보 대출",3,{f:"mortgages",e:{en:"We're still paying off the mortgage.",ko:"아직 주택 대출을 갚고 있어."}});
W("narrative","명사","이야기, 서사",3,{f:"narratives",e:{en:"The narrative is easy to follow.",ko:"이야기를 따라가기 쉬워."}});
W("observe","동사","관찰하다",3,{f:"observes observed observing",e:{en:"Just observe and learn.",ko:"그냥 지켜보면서 배워."}});
W("occasionally","부사","가끔",3,{e:{en:"I occasionally eat meat.",ko:"가끔 고기를 먹어."}});
W("pan","명사","팬, 프라이팬",3,{f:"pans",e:{en:"Heat some oil in a pan.",ko:"팬에 기름을 조금 두르고 데워."}});
W("physics","명사","물리학",3,{f:"",e:{en:"Physics was my hardest subject.",ko:"물리가 제일 어려운 과목이었어."}});
W("potentially","부사","잠재적으로",3,{e:{en:"This could potentially save us time.",ko:"이게 시간을 아껴 줄 수도 있어."}});
W("reduction","명사","감소, 할인",3,{f:"reductions",e:{en:"There's a price reduction this week.",ko:"이번 주에 가격 인하가 있어."}});
W("reflect","동사","반영하다, 되돌아보다",3,{f:"reflects reflected reflecting",e:{en:"Take some time to reflect.",ko:"잠시 되돌아볼 시간을 가져."}});
W("researcher","명사","연구원",3,{f:"researchers",e:{en:"She's a researcher at the university.",ko:"그녀는 대학교 연구원이야."}});
W("silly","형용사","어리석은, 유치한",3,{e:{en:"Don't be silly.",ko:"바보같이 굴지 마."}});
W("subsequent","형용사","그 이후의",3,{e:{en:"Subsequent meetings were shorter.",ko:"그 뒤 회의들은 더 짧았어."}});
W("translation","명사","번역",3,{f:"translations",e:{en:"Is there an English translation?",ko:"영어 번역본 있어요?"}});
W("visible","형용사","보이는",3,{e:{en:"The mountain is visible from here.",ko:"여기서 그 산이 보여."}});
W("amendment","명사","수정안",3,{f:"amendments",e:{en:"They made an amendment to the contract.",ko:"그들은 계약서를 수정했어."}});
W("belong","동사","~에 속하다",3,{f:"belongs belonged belonging",e:{en:"Does this bag belong to you?",ko:"이 가방 네 거야?"}});
W("commonly","부사","흔히",3,{e:{en:"It's commonly used in daily life.",ko:"일상에서 흔히 써."}});
W("efficiency","명사","효율",3,{f:"efficiencies",e:{en:"We need to improve efficiency.",ko:"효율을 높여야 해."}});
W("enterprise","명사","기업",3,{f:"enterprises",e:{en:"It's a small enterprise.",ko:"작은 기업이야."}});
W("experiment","명사·동사","실험, 실험하다",3,{f:"experiments experimented experimenting",e:{en:"Let's try a little experiment.",ko:"작은 실험을 해 보자."}});
W("grass","명사","풀, 잔디",3,{f:"grasses",e:{en:"Keep off the grass.",ko:"잔디에 들어가지 마세요."}});
W("hence","부사","그러므로",3,{e:{en:"He was sick, hence his absence.",ko:"그가 아파서 결석한 거야."}});
W("journalist","명사","기자",3,{f:"journalists",e:{en:"She's a journalist for a newspaper.",ko:"그녀는 신문 기자야."}});
W("mill","명사","방앗간, 공장",3,{f:"mills",e:{en:"There's an old mill by the river.",ko:"강가에 오래된 방앗간이 있어."}});
W("occasion","명사","경우, 행사",3,{f:"occasions",e:{en:"It's a special occasion.",ko:"특별한 날이야."}});
W("passenger","명사","승객",3,{f:"passengers",e:{en:"All passengers must show their tickets.",ko:"모든 승객은 표를 보여 주셔야 해요."}});
W("possession","명사","소유물",3,{f:"possessions",e:{en:"He lost all his possessions in the fire.",ko:"그는 화재로 가진 걸 다 잃었어."}});
W("rapid","형용사","빠른",3,{e:{en:"There's been rapid growth.",ko:"빠른 성장이 있었어."}});
W("sixth","형용사","여섯 번째의",3,{e:{en:"We live on the sixth floor.",ko:"우리는 6층에 살아."}});
W("spin","동사","돌다, 회전시키다",3,{f:"spun spinning spins",e:{en:"My head is spinning.",ko:"머리가 빙빙 돌아."}});
W("suitable","형용사","적합한",3,{e:{en:"Is this movie suitable for kids?",ko:"이 영화 아이들이 봐도 돼?"}});
W("vital","형용사","필수적인",3,{e:{en:"Water is vital for life.",ko:"물은 생명에 필수야."}});
W("agriculture","명사","농업",3,{f:"",e:{en:"The region depends on agriculture.",ko:"그 지역은 농업에 의존해."}});
W("allege","동사","주장하다(증거 없이)",3,{f:"alleges alleged alleging",e:{en:"They allege that he stole the money.",ko:"그들은 그가 돈을 훔쳤다고 주장해."}});
W("commerce","명사","상업",3,{f:"",e:{en:"Online commerce is growing fast.",ko:"온라인 상거래가 빠르게 늘고 있어."}});
W("creek","명사","개울",3,{f:"creeks",e:{en:"We walked along the creek.",ko:"개울을 따라 걸었어."}});
W("currency","명사","통화, 화폐",3,{f:"currencies",e:{en:"What currency do they use there?",ko:"거기선 어떤 화폐를 써?"}});
W("emotion","명사","감정",3,{f:"emotions",e:{en:"She hid her emotions well.",ko:"그녀는 감정을 잘 숨겼어."}});
W("exhibition","명사","전시회",3,{f:"exhibitions",e:{en:"There's a photo exhibition downtown.",ko:"시내에서 사진 전시회를 해."}});
W("fraud","명사","사기",3,{f:"frauds",e:{en:"This is clearly fraud.",ko:"이건 명백한 사기야."}});
W("genuine","형용사","진짜의, 진심의",3,{e:{en:"Is this genuine leather?",ko:"이거 진짜 가죽이에요?"}});
W("honey","명사","꿀, 자기(호칭)",3,{f:"honeys",e:{en:"Add a little honey to your tea.",ko:"차에 꿀을 조금 넣어."}});
W("hook","명사","고리, 갈고리",3,{f:"hooks",e:{en:"Hang your coat on the hook.",ko:"코트는 고리에 걸어."}});
W("hunter","명사","사냥꾼",3,{f:"hunters",e:{en:"He's a bargain hunter.",ko:"그는 할인 상품 사냥꾼이야."}});
W("immigrant","명사","이민자",3,{f:"immigrants",e:{en:"My grandparents were immigrants.",ko:"우리 조부모님은 이민자셨어."}});
W("instruction","명사","설명, 지시",3,{f:"instructions",e:{en:"Follow the instructions carefully.",ko:"설명을 잘 따라 해."}});
W("legacy","명사","유산",3,{f:"legacies",e:{en:"Her legacy will live on.",ko:"그녀의 업적은 계속 남을 거야."}});
W("merely","부사","단지",3,{e:{en:"It was merely a suggestion.",ko:"그냥 제안이었을 뿐이야."}});
W("prisoner","명사","죄수",3,{f:"prisoners",e:{en:"The prisoner escaped last night.",ko:"그 죄수가 어젯밤 탈출했어."}});
W("programming","명사","프로그래밍",3,{f:"",e:{en:"I'm learning programming.",ko:"프로그래밍을 배우고 있어."}});
W("ratio","명사","비율",3,{f:"ratios",e:{en:"The student-teacher ratio is low.",ko:"교사 1명당 학생 수가 적어."}});
W("regret","동사·명사","후회하다, 후회",3,{f:"regrets regretted regretting",e:{en:"I don't regret anything.",ko:"아무것도 후회하지 않아."}});
W("reject","동사","거절하다",3,{f:"rejects rejected rejecting",e:{en:"They rejected my application.",ko:"그들은 내 지원서를 탈락시켰어."}});
W("remind","동사","상기시키다",3,{f:"reminds reminded reminding",e:{en:"Remind me to call her.",ko:"그녀한테 전화하라고 나한테 말해 줘."}});
W("resort","명사","휴양지, (last resort) 최후의 수단",3,{f:"resorts",e:{en:"We stayed at a beach resort.",ko:"해변 리조트에 묵었어."}});
W("reverse","동사·형용사","뒤집다, 반대의",3,{f:"reverses reversed reversing",e:{en:"Put the car in reverse.",ko:"차를 후진 기어에 넣어."}});
W("scary","형용사","무서운",3,{e:{en:"That movie was really scary.",ko:"그 영화 정말 무서웠어."}});
W("seed","명사","씨앗",3,{f:"seeds",e:{en:"Plant the seeds in spring.",ko:"봄에 씨앗을 심어."}});
W("sin","명사","죄",3,{f:"sins",e:{en:"Wasting food is a sin.",ko:"음식을 버리는 건 죄야."}});
W("summary","명사","요약",3,{f:"summaries",e:{en:"Can you give me a quick summary?",ko:"간단히 요약해 줄래?"}});
W("survival","명사","생존",3,{f:"survivals",e:{en:"It's a survival game.",ko:"그건 생존 게임이야."}});
W("ward","명사","병동",3,{f:"wards",e:{en:"She's in the children's ward.",ko:"그녀는 소아 병동에 있어."}});
W("asleep","형용사","잠든",3,{e:{en:"The baby is asleep.",ko:"아기가 잠들었어."}});
W("automatic","형용사","자동의",3,{e:{en:"Is this car automatic?",ko:"이 차 자동이에요?"}});
W("consent","명사·동사","동의, 동의하다",3,{f:"consents consented consenting",e:{en:"You need your parents' consent.",ko:"부모님 동의가 필요해."}});
W("daddy","명사","아빠",3,{f:"daddies",e:{en:"Daddy, look at this!",ko:"아빠, 이거 봐!"}});
W("destruction","명사","파괴",3,{f:"destructions",e:{en:"The storm caused a lot of destruction.",ko:"폭풍이 큰 피해를 남겼어."}});
W("divorce","명사·동사","이혼, 이혼하다",3,{f:"divorces divorced divorcing",e:{en:"They got divorced last year.",ko:"그들은 작년에 이혼했어."}});
W("extraordinary","형용사","비범한, 놀라운",3,{e:{en:"She's an extraordinary person.",ko:"그녀는 비범한 사람이야."}});
W("fate","명사","운명",3,{f:"fates",e:{en:"Maybe it was fate.",ko:"아마 운명이었나 봐."}});
W("frequency","명사","빈도",3,{f:"frequencies",e:{en:"The frequency of buses is low at night.",ko:"밤엔 버스 배차 간격이 길어."}});
W("gene","명사","유전자",3,{f:"genes",e:{en:"It runs in our genes.",ko:"그건 우리 집안 내력이야."}});
W("glory","명사","영광",3,{f:"glories",e:{en:"They returned in glory.",ko:"그들은 영광스럽게 돌아왔어."}});
W("headquarters","명사","본사",3,{f:"",e:{en:"The company's headquarters is in Seoul.",ko:"그 회사 본사는 서울에 있어."}});
W("heritage","명사","유산",3,{f:"heritages",e:{en:"It's a world heritage site.",ko:"그곳은 세계 문화유산이야."}});
W("initiative","명사","계획, 주도권",3,{f:"initiatives",e:{en:"She took the initiative.",ko:"그녀가 먼저 나섰어."}});
W("landscape","명사","풍경",3,{f:"landscapes",e:{en:"The landscape here is beautiful.",ko:"여기 풍경이 아름다워."}});
W("logic","명사","논리",3,{f:"logics",e:{en:"I don't follow your logic.",ko:"네 논리를 이해 못 하겠어."}});
W("objective","명사·형용사","목표, 객관적인",3,{f:"objectives",e:{en:"Try to be objective.",ko:"객관적으로 보려고 해 봐."}});
W("residence","명사","거주지",3,{f:"residences",e:{en:"This is a private residence.",ko:"여기는 개인 주택이에요."}});
W("roughly","부사","대략",3,{e:{en:"It costs roughly fifty dollars.",ko:"대략 50달러야."}});
W("script","명사","대본",3,{f:"scripts",e:{en:"The actors read the script together.",ko:"배우들이 함께 대본을 읽었어."}});
W("threaten","동사","위협하다",3,{f:"threatens threatened threatening",e:{en:"He threatened to quit.",ko:"그는 그만두겠다고 으름장을 놨어."}});
W("tube","명사","관, 튜브",3,{f:"tubes",e:{en:"I need a tube of toothpaste.",ko:"치약 하나 필요해."}});
W("banking","명사","은행 업무",3,{f:"",e:{en:"I do all my banking online.",ko:"은행 업무는 다 온라인으로 해."}});
W("chemistry","명사","화학, 궁합",3,{f:"chemistries",e:{en:"They have great chemistry.",ko:"그 둘은 케미가 좋아."}});
W("conclude","동사","결론짓다",3,{f:"concludes concluded concluding",e:{en:"We concluded that it was too risky.",ko:"너무 위험하다고 결론 내렸어."}});
W("consumption","명사","소비",3,{f:"consumptions",e:{en:"Energy consumption is rising.",ko:"에너지 소비가 늘고 있어."}});
W("corruption","명사","부패",3,{f:"corruptions",e:{en:"The country has a corruption problem.",ko:"그 나라는 부패 문제가 있어."}});
W("cotton","명사","면",3,{f:"cottons",e:{en:"This shirt is 100% cotton.",ko:"이 셔츠는 면 100%야."}});
W("dozen","명사","12개, 다스",3,{f:"dozens",e:{en:"I bought a dozen eggs.",ko:"달걀 한 판(12개)을 샀어."}});
W("epic","형용사","장대한, 끝내주는",3,{e:{en:"That was an epic trip.",ko:"진짜 끝내주는 여행이었어."}});
W("exception","명사","예외",3,{f:"exceptions",e:{en:"There are no exceptions.",ko:"예외는 없어."}});
W("expand","동사","확장하다",3,{f:"expands expanded expanding",e:{en:"We plan to expand next year.",ko:"내년에 확장할 계획이야."}});
W("gorgeous","형용사","아주 아름다운",3,{e:{en:"You look gorgeous!",ko:"너 정말 예쁘다!"}});
W("impression","명사","인상",3,{f:"impressions",e:{en:"She made a good first impression.",ko:"그녀는 좋은 첫인상을 남겼어."}});
W("indicate","동사","나타내다",3,{f:"indicates indicated indicating",e:{en:"The sign indicates the exit.",ko:"그 표지판이 출구를 알려 줘."}});
W("input","명사","의견, 입력",3,{f:"inputs",e:{en:"Thanks for your input.",ko:"의견 줘서 고마워."}});
W("knock","동사","두드리다",3,{f:"knocks knocked knocking",e:{en:"Please knock before entering.",ko:"들어오기 전에 노크해 주세요."}});
W("leather","명사","가죽",3,{f:"leathers",e:{en:"I want a leather jacket.",ko:"가죽 재킷을 갖고 싶어."}});
W("lip","명사","입술",3,{f:"lips",e:{en:"My lips are dry.",ko:"입술이 텄어."}});
W("luxury","명사","사치, 호화",3,{f:"luxuries",e:{en:"It's a luxury hotel.",ko:"고급 호텔이야."}});
W("lyrics","명사","가사",3,{f:"",e:{en:"I don't know the lyrics.",ko:"가사를 몰라."}});
W("manufacturer","명사","제조사",3,{f:"manufacturers",e:{en:"Contact the manufacturer for repairs.",ko:"수리는 제조사에 문의하세요."}});
W("outcome","명사","결과",3,{f:"outcomes",e:{en:"We're happy with the outcome.",ko:"결과에 만족해."}});
W("removal","명사","제거",3,{f:"removals",e:{en:"Trash removal is on Mondays.",ko:"쓰레기 수거는 월요일이야."}});
W("reporter","명사","기자",3,{f:"reporters",e:{en:"A reporter asked her a question.",ko:"기자가 그녀에게 질문했어."}});
W("scream","동사","소리 지르다",3,{f:"screams screamed screaming",e:{en:"Don't scream!",ko:"소리 지르지 마!"}});
W("sequence","명사","순서",3,{f:"sequences",e:{en:"Put the pictures in the right sequence.",ko:"그림을 올바른 순서로 놓아 봐."}});
W("absence","명사","부재, 결석",3,{f:"absences",e:{en:"Who's in charge in my absence?",ko:"나 없는 동안 누가 담당이야?"}});
W("agricultural","형용사","농업의",3,{e:{en:"It's mainly an agricultural area.",ko:"주로 농업 지역이야."}});
W("athlete","명사","운동선수",3,{f:"athletes",e:{en:"She's a professional athlete.",ko:"그녀는 프로 운동선수야."}});
W("bull","명사","황소",3,{f:"bulls",e:{en:"He's like a bull in a china shop.",ko:"그는 정말 덜렁대."}});
W("contribution","명사","기여",3,{f:"contributions",e:{en:"Thanks for your contribution.",ko:"기여해 줘서 고마워."}});
W("ease","명사·동사","쉬움, 덜어 주다",3,{f:"eases eased easing",e:{en:"She passed the test with ease.",ko:"그녀는 시험을 쉽게 통과했어."}});
W("flood","명사·동사","홍수, 넘치다",3,{f:"floods flooded flooding",e:{en:"The street flooded after the rain.",ko:"비가 온 뒤 거리가 물에 잠겼어."}});
W("generate","동사","만들어 내다",3,{f:"generates generated generating",e:{en:"The event generated a lot of interest.",ko:"그 행사는 많은 관심을 끌었어."}});
W("genetic","형용사","유전의",3,{e:{en:"It's a genetic condition.",ko:"유전 질환이야."}});
W("instant","형용사","즉각적인, 즉석의",3,{e:{en:"I'll have instant noodles.",ko:"라면 먹을래."}});
W("investor","명사","투자자",3,{f:"investors",e:{en:"We're looking for investors.",ko:"투자자를 찾고 있어."}});
W("liberty","명사","자유",3,{f:"liberties",e:{en:"I took the liberty of ordering for you.",ko:"실례지만 네 것도 주문해 뒀어."}});
W("minister","명사","장관, 목사",3,{f:"ministers",e:{en:"The minister gave a speech.",ko:"장관이 연설을 했어."}});
W("monitor","명사·동사","모니터, 감시하다",3,{f:"monitors monitored monitoring",e:{en:"The doctor will monitor your condition.",ko:"의사가 상태를 지켜볼 거예요."}});
W("photograph","명사","사진",3,{f:"photographs",e:{en:"Can I take a photograph here?",ko:"여기서 사진 찍어도 돼요?"}});
W("progressive","형용사","진보적인, 점진적인",3,{e:{en:"The company has progressive policies.",ko:"그 회사는 진보적인 정책을 갖고 있어."}});
W("punishment","명사","처벌",3,{f:"punishments",e:{en:"The punishment was too harsh.",ko:"처벌이 너무 가혹했어."}});
W("rally","명사·동사","집회, 다시 힘을 모으다",3,{f:"rallies rallied rallying",e:{en:"There's a rally in the square.",ko:"광장에서 집회가 있어."}});
W("rapidly","부사","빠르게",3,{e:{en:"The city is changing rapidly.",ko:"도시가 빠르게 변하고 있어."}});
W("representation","명사","표현, 대표",3,{f:"representations",e:{en:"Women need more representation.",ko:"여성의 대표성이 더 필요해."}});
W("sum","명사","합계, 금액",3,{f:"sums",e:{en:"That's a large sum of money.",ko:"그건 큰돈이야."}});
W("swing","동사·명사","흔들다, 그네",3,{f:"swung swings swinging",e:{en:"The kids are on the swings.",ko:"아이들이 그네를 타고 있어."}});
W("tail","명사","꼬리",3,{f:"tails",e:{en:"The dog wagged its tail.",ko:"개가 꼬리를 흔들었어."}});
W("twin","명사","쌍둥이",3,{f:"twins",e:{en:"She has a twin sister.",ko:"그녀는 쌍둥이 자매가 있어."}});
W("upcoming","형용사","다가오는",3,{e:{en:"Are you ready for the upcoming exam?",ko:"다가오는 시험 준비됐어?"}});
W("veteran","명사","참전 용사, 베테랑",3,{f:"veterans",e:{en:"He's a veteran teacher.",ko:"그는 베테랑 교사야."}});
W("alert","형용사·명사","경계하는, 경보",3,{f:"alerts",e:{en:"Stay alert while driving.",ko:"운전할 땐 정신 차려."}});
W("arena","명사","경기장",3,{f:"arenas",e:{en:"The concert is at the arena.",ko:"콘서트는 경기장에서 해."}});
W("boom","명사","호황, 쾅",3,{f:"booms",e:{en:"There was a boom in online shopping.",ko:"온라인 쇼핑이 호황이었어."}});
W("boot","명사","부츠",3,{f:"boots",e:{en:"I need new winter boots.",ko:"새 겨울 부츠가 필요해."}});
W("brave","형용사","용감한",3,{e:{en:"That was very brave of you.",ko:"정말 용감했어."}});
W("column","명사","칼럼, 기둥",3,{f:"columns",e:{en:"I read her column every week.",ko:"매주 그녀의 칼럼을 읽어."}});
W("composition","명사","구성, 작문",3,{f:"compositions",e:{en:"The composition of the photo is great.",ko:"사진 구도가 좋아."}});
W("conservation","명사","보존",3,{f:"conservations",e:{en:"They work in wildlife conservation.",ko:"그들은 야생 동물 보호 일을 해."}});
W("constitutional","형용사","헌법의",3,{e:{en:"It's a constitutional right.",ko:"그건 헌법상의 권리야."}});
W("density","명사","밀도",3,{f:"densities",e:{en:"The city has a high population density.",ko:"그 도시는 인구 밀도가 높아."}});
W("difficulty","명사","어려움",3,{f:"difficulties",e:{en:"I had difficulty finding the place.",ko:"그곳을 찾는 데 애먹었어."}});
W("ethnic","형용사","민족의",3,{e:{en:"I love trying ethnic food.",ko:"여러 나라 음식 먹어 보는 걸 좋아해."}});
W("expense","명사","비용",3,{f:"expenses",e:{en:"Travel expenses are covered.",ko:"출장 경비는 지원돼요."}});
W("fleet","명사","함대, 차량 무리",3,{f:"fleets",e:{en:"The company has a fleet of trucks.",ko:"그 회사는 트럭을 여러 대 갖고 있어."}});
W("fundamental","형용사","근본적인",3,{e:{en:"There's a fundamental problem.",ko:"근본적인 문제가 있어."}});
W("genius","명사","천재",3,{f:"geniuses",e:{en:"You're a genius!",ko:"너 천재다!"}});
W("greatly","부사","크게",3,{e:{en:"I greatly appreciate your help.",ko:"도와주셔서 정말 감사해요."}});
W("guidance","명사","지도, 안내",3,{f:"",e:{en:"Thanks for your guidance.",ko:"이끌어 줘서 고마워요."}});
W("infection","명사","감염",3,{f:"infections",e:{en:"The cut got an infection.",ko:"상처가 감염됐어."}});
W("intention","명사","의도",3,{f:"intentions",e:{en:"I had no intention of hurting you.",ko:"널 상처 줄 의도는 없었어."}});
W("joke","명사·동사","농담, 농담하다",3,{f:"jokes joked joking",e:{en:"It was just a joke.",ko:"그냥 농담이었어."}});
W("participation","명사","참여",3,{f:"participations",e:{en:"Thanks for your participation.",ko:"참여해 주셔서 감사합니다."}});
W("precious","형용사","귀중한",3,{e:{en:"Time is precious.",ko:"시간은 소중해."}});
W("pregnancy","명사","임신",3,{f:"pregnancies",e:{en:"She had an easy pregnancy.",ko:"그녀는 임신 기간을 순탄하게 보냈어."}});
W("pretend","동사","~인 척하다",3,{f:"pretends pretended pretending",e:{en:"Don't pretend you didn't see me.",ko:"나 못 본 척하지 마."}});
W("radical","형용사","급진적인, 근본적인",3,{e:{en:"We need a radical change.",ko:"근본적인 변화가 필요해."}});
W("residential","형용사","주거의",3,{e:{en:"It's a quiet residential area.",ko:"조용한 주택가야."}});
W("reward","명사·동사","보상, 보상하다",3,{f:"rewards rewarded rewarding",e:{en:"Treat yourself as a reward.",ko:"보상으로 너 자신에게 선물해."}});
W("satellite","명사","위성",3,{f:"satellites",e:{en:"The satellite was launched yesterday.",ko:"어제 위성이 발사됐어."}});
W("shake","동사","흔들다",3,{f:"shook shaken shakes shaked shaking",e:{en:"Shake the bottle before using.",ko:"쓰기 전에 병을 흔들어."}});
W("shore","명사","해안",3,{f:"shores",e:{en:"We walked along the shore.",ko:"해안을 따라 걸었어."}});
W("substantial","형용사","상당한",3,{e:{en:"It was a substantial amount of money.",ko:"상당한 금액이었어."}});
W("teen","명사","10대",3,{f:"teens",e:{en:"She started singing in her teens.",ko:"그녀는 10대 때 노래를 시작했어."}});
W("transmission","명사","전송, 변속기",3,{f:"transmissions",e:{en:"The car needs a new transmission.",ko:"그 차는 변속기를 새로 갈아야 해."}});
W("uniform","명사","유니폼, 교복",3,{f:"uniforms",e:{en:"Students wear uniforms here.",ko:"여기 학생들은 교복을 입어."}});
W("wildlife","명사","야생 생물",3,{f:"",e:{en:"The park is full of wildlife.",ko:"그 공원엔 야생 동물이 많아."}});
W("wooden","형용사","나무로 된",3,{e:{en:"We bought a wooden table.",ko:"나무 식탁을 샀어."}});
W("aggressive","형용사","공격적인",3,{e:{en:"That dog is aggressive.",ko:"저 개는 사나워."}});
W("apparent","형용사","분명한",3,{e:{en:"It soon became apparent that he was lying.",ko:"그가 거짓말하고 있다는 게 곧 분명해졌어."}});
W("blast","명사","폭발, 아주 즐거운 시간",3,{f:"blasts",e:{en:"We had a blast at the party.",ko:"파티에서 엄청 재밌게 놀았어."}});
W("courage","명사","용기",3,{f:"",e:{en:"It takes courage to say no.",ko:"거절하는 데는 용기가 필요해."}});
W("desperate","형용사","절박한",3,{e:{en:"I'm desperate for a coffee.",ko:"커피가 너무 마시고 싶어."}});
W("diversity","명사","다양성",3,{f:"diversities",e:{en:"The city is known for its diversity.",ko:"그 도시는 다양성으로 유명해."}});
W("faculty","명사","교수진, 능력",3,{f:"faculties",e:{en:"She joined the faculty last year.",ko:"그녀는 작년에 교수진에 합류했어."}});
W("fighter","명사","투사, 전사",3,{f:"fighters",e:{en:"She's a real fighter.",ko:"그녀는 진짜 투사야."}});
W("frozen","형용사","얼어붙은, 냉동된",3,{e:{en:"I bought some frozen pizza.",ko:"냉동 피자를 샀어."}});
W("humanity","명사","인류, 인간성",3,{f:"humanities",e:{en:"It restored my faith in humanity.",ko:"덕분에 사람에 대한 믿음을 되찾았어."}});
W("innovation","명사","혁신",3,{f:"innovations",e:{en:"The company is known for innovation.",ko:"그 회사는 혁신으로 유명해."}});
W("instrument","명사","악기, 도구",3,{f:"instruments",e:{en:"Do you play an instrument?",ko:"악기 연주해?"}});
W("manual","명사·형용사","설명서, 수동의",3,{f:"manuals",e:{en:"Read the manual first.",ko:"먼저 설명서를 읽어."}});
W("nursing","명사","간호",3,{f:"",e:{en:"She studied nursing.",ko:"그녀는 간호학을 전공했어."}});
W("occupy","동사","차지하다",3,{f:"occupied occupies occupying",e:{en:"Is this seat occupied?",ko:"이 자리 주인 있어요?"}});
W("ongoing","형용사","진행 중인",3,{e:{en:"The investigation is ongoing.",ko:"조사가 진행 중이야."}});
W("operator","명사","교환원, 운영자",3,{f:"operators",e:{en:"Ask the operator for help.",ko:"교환원에게 도움을 요청해."}});
W("painful","형용사","고통스러운",3,{e:{en:"The injury was painful.",ko:"부상이 아팠어."}});
W("preparation","명사","준비",3,{f:"preparations",e:{en:"Good preparation is the key.",ko:"철저한 준비가 핵심이야."}});
W("punch","동사·명사","주먹으로 치다, 펀치",3,{f:"punches punched punching",e:{en:"He punched the wall.",ko:"그는 벽을 주먹으로 쳤어."}});
W("purple","형용사","보라색의",3,{e:{en:"She dyed her hair purple.",ko:"그녀는 머리를 보라색으로 염색했어."}});
W("railroad","명사","철도",3,{f:"railroads",e:{en:"The railroad runs along the coast.",ko:"철도가 해안을 따라 나 있어."}});
W("registration","명사","등록",3,{f:"registrations",e:{en:"Registration closes on Friday.",ko:"등록은 금요일에 마감해."}});
W("romance","명사","연애, 로맨스",3,{f:"romances",e:{en:"It's a summer romance.",ko:"여름날의 연애야."}});
W("sufficient","형용사","충분한",3,{e:{en:"Is this sufficient?",ko:"이거면 충분해?"}});
W("suspend","동사","중단하다, 정지시키다",3,{f:"suspends suspended suspending",e:{en:"Classes were suspended because of the snow.",ko:"눈 때문에 수업이 중단됐어."}});
W("tissue","명사","휴지, 조직",3,{f:"tissues",e:{en:"Do you have a tissue?",ko:"휴지 있어?"}});
W("trailer","명사","예고편, 트레일러",3,{f:"trailers",e:{en:"Have you seen the trailer?",ko:"예고편 봤어?"}});
W("underground","형용사·부사","지하의",3,{e:{en:"There's an underground parking lot.",ko:"지하 주차장이 있어."}});
W("versus","전치사","~대",3,{e:{en:"It's Korea versus Japan tonight.",ko:"오늘 밤 한국 대 일본 경기야."}});
W("virtual","형용사","가상의",3,{e:{en:"We had a virtual meeting.",ko:"화상 회의를 했어."}});
W("wound","명사","상처",3,{f:"wounds",e:{en:"Clean the wound carefully.",ko:"상처를 조심해서 소독해."}});
W("announcement","명사","발표",3,{f:"announcements",e:{en:"I have an announcement to make.",ko:"발표할 게 있어요."}});
W("arrange","동사","정리하다, 준비하다",3,{f:"arranges arranged arranging",e:{en:"I'll arrange a meeting.",ko:"회의를 잡을게."}});
W("attract","동사","끌어들이다",3,{f:"attracts attracted attracting",e:{en:"The festival attracts many tourists.",ko:"그 축제는 관광객을 많이 끌어모아."}});
W("chip","명사","칩, 감자칩",3,{f:"chips",e:{en:"Pass me the chips.",ko:"감자칩 좀 건네줘."}});
W("dare","동사","감히 ~하다",3,{f:"dares dared daring",e:{en:"Don't you dare tell anyone.",ko:"누구한테 말하기만 해 봐."}});
W("database","명사","데이터베이스",3,{f:"databases",e:{en:"Your details are in our database.",ko:"고객님 정보가 저희 데이터베이스에 있어요."}});
W("discrimination","명사","차별",3,{f:"discriminations",e:{en:"There's no place for discrimination here.",ko:"여기선 차별이 용납되지 않아."}});
W("disorder","명사","장애, 무질서",3,{f:"disorders",e:{en:"He has a sleep disorder.",ko:"그는 수면 장애가 있어."}});
W("distribute","동사","나누어 주다",3,{f:"distributes distributed distributing",e:{en:"Please distribute these handouts.",ko:"이 유인물 좀 나눠 주세요."}});
W("district","명사","지구, 구역",3,{f:"districts",e:{en:"It's the shopping district.",ko:"거기는 쇼핑 구역이야."}});
W("documentary","명사","다큐멘터리",3,{f:"documentaries",e:{en:"I watched a documentary about the ocean.",ko:"바다에 관한 다큐멘터리를 봤어."}});
W("domain","명사","영역, 도메인",3,{f:"domains",e:{en:"That's outside my domain.",ko:"그건 내 분야가 아니야."}});
W("dynamic","형용사","역동적인",3,{e:{en:"It's a dynamic city.",ko:"역동적인 도시야."}});
W("edit","동사","편집하다",3,{f:"edits edited editing",e:{en:"Can you edit my essay?",ko:"내 에세이 좀 고쳐 줄래?"}});
W("engagement","명사","약혼, 참여",3,{f:"engagements",e:{en:"They announced their engagement.",ko:"그들은 약혼을 발표했어."}});
W("explore","동사","탐험하다, 둘러보다",3,{f:"explores explored exploring",e:{en:"Let's explore the old town.",ko:"구시가지를 둘러보자."}});
W("footage","명사","영상",3,{f:"footages",e:{en:"The police checked the camera footage.",ko:"경찰이 카메라 영상을 확인했어."}});
W("grave","명사·형용사","무덤, 심각한",3,{f:"graves",e:{en:"We visited my grandfather's grave.",ko:"할아버지 산소에 다녀왔어."}});
W("implementation","명사","시행",3,{f:"implementations",e:{en:"The implementation will take months.",ko:"시행까지 몇 달이 걸려."}});
W("investigate","동사","조사하다",3,{f:"investigates investigated investigating",e:{en:"The police are investigating the case.",ko:"경찰이 그 사건을 조사하고 있어."}});
W("jazz","명사","재즈",3,{f:"",e:{en:"I love listening to jazz.",ko:"재즈 듣는 걸 좋아해."}});
W("laboratory","명사","실험실",3,{f:"laboratories",e:{en:"She works in a laboratory.",ko:"그녀는 실험실에서 일해."}});
W("literary","형용사","문학의",3,{e:{en:"She won a literary prize.",ko:"그녀는 문학상을 받았어."}});
W("midnight","명사","자정",3,{f:"midnights",e:{en:"The store is open until midnight.",ko:"그 가게는 자정까지 열어."}});
W("praise","명사·동사","칭찬, 칭찬하다",3,{f:"praises praised praising",e:{en:"The teacher praised her work.",ko:"선생님이 그녀의 작품을 칭찬하셨어."}});
W("psychology","명사","심리학",3,{f:"psychologies",e:{en:"She majored in psychology.",ko:"그녀는 심리학을 전공했어."}});
W("restriction","명사","제한",3,{f:"restrictions",e:{en:"There are restrictions on luggage size.",ko:"짐 크기에 제한이 있어."}});
W("rocket","명사·동사","로켓, 급등하다",3,{f:"rocketed rockets",e:{en:"Prices have rocketed.",ko:"가격이 치솟았어."}});
W("ruin","동사·명사","망치다, 폐허",3,{f:"ruins ruined ruining",e:{en:"The rain ruined our picnic.",ko:"비 때문에 소풍을 망쳤어."}});
W("stability","명사","안정",3,{f:"",e:{en:"I want job stability.",ko:"직업 안정성을 원해."}});
W("steady","형용사","꾸준한, 안정된",3,{e:{en:"She has a steady job.",ko:"그녀는 안정적인 직장이 있어."}});
W("symbol","명사","상징",3,{f:"symbols",e:{en:"The dove is a symbol of peace.",ko:"비둘기는 평화의 상징이야."}});
W("terminal","명사","터미널",3,{f:"terminals",e:{en:"Which terminal is your flight?",ko:"비행기 몇 번 터미널이야?"}});
W("treaty","명사","조약",3,{f:"treaties",e:{en:"The two countries signed a treaty.",ko:"두 나라가 조약에 서명했어."}});
W("triple","형용사·동사","세 배의, 세 배가 되다",3,{f:"triples tripled tripling",e:{en:"Prices have tripled.",ko:"가격이 세 배가 됐어."}});
W("unlikely","형용사","~할 것 같지 않은",3,{e:{en:"It's unlikely to rain today.",ko:"오늘 비가 올 것 같지 않아."}});
W("bat","명사","방망이, 박쥐",3,{f:"bats",e:{en:"He swung the bat.",ko:"그가 방망이를 휘둘렀어."}});
W("bow","동사","절하다, 고개 숙이다",3,{f:"bows bowed bowing",e:{en:"In Korea, people bow to elders.",ko:"한국에선 어른께 고개 숙여 인사해."}});
W("cape","명사","망토, 곶",3,{f:"capes",e:{en:"The kid wore a superhero cape.",ko:"아이가 슈퍼히어로 망토를 둘렀어."}});
W("collective","형용사","집단의, 공동의",3,{e:{en:"It was a collective decision.",ko:"그건 공동의 결정이었어."}});
W("cooperation","명사","협력",3,{f:"cooperations",e:{en:"Thanks for your cooperation.",ko:"협조해 주셔서 감사합니다."}});
W("craft","명사","공예, 기술",3,{f:"crafts",e:{en:"She sells her crafts online.",ko:"그녀는 공예품을 온라인으로 팔아."}});
W("darkness","명사","어둠",3,{f:"",e:{en:"The room was in complete darkness.",ko:"방이 완전히 깜깜했어."}});
W("enable","동사","가능하게 하다",3,{f:"enables enabled enabling",e:{en:"This app enables you to study anywhere.",ko:"이 앱으로 어디서든 공부할 수 있어."}});
W("equity","명사","공정, 자기 자본",3,{f:"equities",e:{en:"We believe in equity and fairness.",ko:"우리는 공정성과 공평함을 믿어."}});
W("fortune","명사","행운, 거금",3,{f:"fortunes",e:{en:"It cost a fortune.",ko:"그거 엄청 비쌌어."}});
W("goodbye","감탄사·명사","안녕(헤어질 때)",3,{f:"goodbyes",e:{en:"I didn't get to say goodbye.",ko:"작별 인사를 못 했어."}});
W("hardware","명사","하드웨어, 철물",3,{f:"",e:{en:"I bought nails at the hardware store.",ko:"철물점에서 못을 샀어."}});
W("intellectual","형용사","지적인",3,{e:{en:"She's very intellectual.",ko:"그녀는 아주 지적이야."}});
W("involvement","명사","관여, 참여",3,{f:"involvements",e:{en:"Thanks for your involvement.",ko:"참여해 주셔서 감사해요."}});
W("nut","명사","견과",3,{f:"nuts",e:{en:"I'm allergic to nuts.",ko:"견과류 알레르기가 있어."}});
W("partly","부사","부분적으로",3,{e:{en:"It was partly my fault.",ko:"부분적으로 내 잘못이었어."}});
W("petition","명사","청원",3,{f:"petitions",e:{en:"Sign the petition online.",ko:"온라인으로 청원에 서명해."}});
W("phrase","명사","구절, 표현",3,{f:"phrases",e:{en:"What does this phrase mean?",ko:"이 표현은 무슨 뜻이에요?"}});
W("physically","부사","신체적으로",3,{e:{en:"I'm physically tired but happy.",ko:"몸은 피곤하지만 행복해."}});
W("rat","명사","쥐",3,{f:"rats",e:{en:"I saw a rat in the subway.",ko:"지하철에서 쥐를 봤어."}});
W("regime","명사","정권, 요법",3,{f:"regimes",e:{en:"She follows a strict exercise regime.",ko:"그녀는 엄격한 운동 계획을 지켜."}});
W("seal","동사·명사","봉하다, 물개",3,{f:"seals sealed sealing",e:{en:"Seal the envelope.",ko:"봉투를 봉해."}});
W("similarly","부사","마찬가지로",3,{e:{en:"Similarly, prices went up in other cities.",ko:"마찬가지로 다른 도시에서도 가격이 올랐어."}});
W("slide","동사·명사","미끄러지다, 미끄럼틀",3,{f:"slid slides sliding",e:{en:"The kids love the slide.",ko:"아이들은 미끄럼틀을 좋아해."}});
W("stem","명사·동사","줄기, 비롯되다",3,{f:"stems stemmed stemming",e:{en:"The problem stems from poor planning.",ko:"문제는 부실한 계획에서 비롯됐어."}});
W("summit","명사","정상, 정상 회담",3,{f:"summits",e:{en:"We reached the summit at noon.",ko:"정오에 정상에 도착했어."}});
W("tiger","명사","호랑이",3,{f:"tigers",e:{en:"The tiger is sleeping.",ko:"호랑이가 자고 있어."}});
W("toy","명사","장난감",3,{f:"toys",e:{en:"The kids are playing with their toys.",ko:"아이들이 장난감을 갖고 놀아."}});
W("warrior","명사","전사",3,{f:"warriors",e:{en:"She's a weekend warrior at the gym.",ko:"그녀는 주말에만 헬스장을 불태우는 사람이야."}});
W("wisdom","명사","지혜",3,{f:"wisdoms",e:{en:"Thanks for your words of wisdom.",ko:"지혜로운 말 고마워."}});
W("accounting","명사","회계",3,{f:"",e:{en:"She works in accounting.",ko:"그녀는 회계팀에서 일해."}});
W("awkward","형용사","어색한",3,{e:{en:"There was an awkward silence.",ko:"어색한 침묵이 흘렀어."}});
W("beast","명사","짐승",3,{f:"beasts",e:{en:"It's a beast of a car.",ko:"그 차 괴물 같아."}});
W("beef","명사","소고기",3,{f:"beefs",e:{en:"I'll have the beef, please.",ko:"소고기로 할게요."}});
W("candy","명사","사탕",3,{f:"candies",e:{en:"Don't eat too much candy.",ko:"사탕 너무 많이 먹지 마."}});
W("carrier","명사","운송업체, 통신사",3,{f:"carriers",e:{en:"Which carrier do you use?",ko:"어느 통신사 써?"}});
W("celebration","명사","축하, 기념행사",3,{f:"celebrations",e:{en:"Let's have a celebration!",ko:"축하 파티 하자!"}});
W("celebrity","명사","유명인",3,{f:"celebrities",e:{en:"She saw a celebrity at the airport.",ko:"그녀는 공항에서 연예인을 봤어."}});
W("certificate","명사","증명서",3,{f:"certificates",e:{en:"You'll get a certificate at the end.",ko:"마지막에 수료증을 받을 거예요."}});
W("clay","명사","점토",3,{f:"clays",e:{en:"The kids made animals out of clay.",ko:"아이들이 점토로 동물을 만들었어."}});
W("colleague","명사","동료",3,{f:"colleagues",e:{en:"She's my colleague.",ko:"그녀는 내 동료야."}});
W("construct","동사","건설하다",3,{f:"constructs constructed constructing",e:{en:"They're constructing a new bridge.",ko:"새 다리를 짓고 있어."}});
W("default","명사","기본값",3,{f:"defaults",e:{en:"Reset it to the default settings.",ko:"기본 설정으로 되돌려."}});
W("derive","동사","얻다, 유래하다",3,{f:"derives derived deriving",e:{en:"The word is derived from Latin.",ko:"그 단어는 라틴어에서 왔어."}});
W("dialogue","명사","대화",3,{f:"dialogues",e:{en:"We need an open dialogue.",ko:"열린 대화가 필요해."}});
W("disable","동사","비활성화하다",3,{f:"disables disabled disabling",e:{en:"How do I disable notifications?",ko:"알림은 어떻게 꺼?"}});
W("distinct","형용사","뚜렷한",3,{e:{en:"There's a distinct smell of coffee.",ko:"커피 냄새가 확 나."}});
W("educate","동사","교육하다",3,{f:"educates educated educating",e:{en:"We need to educate people about recycling.",ko:"사람들에게 재활용 교육을 해야 해."}});
W("eligible","형용사","자격이 있는",3,{e:{en:"You're eligible for a discount.",ko:"할인 대상이에요."}});
W("execution","명사","실행, 처형",3,{f:"executions",e:{en:"The idea is good, but the execution was poor.",ko:"아이디어는 좋은데 실행이 부족했어."}});
W("fool","명사·동사","바보, 속이다",3,{f:"fools fooled fooling",e:{en:"Don't be a fool.",ko:"바보같이 굴지 마."}});
W("framework","명사","틀, 체계",3,{f:"frameworks",e:{en:"We need a clear framework.",ko:"명확한 틀이 필요해."}});
W("franchise","명사","가맹점, 프랜차이즈",3,{f:"franchises",e:{en:"He owns a coffee franchise.",ko:"그는 커피 가맹점을 운영해."}});
W("integrate","동사","통합하다",3,{f:"integrates integrated integrating",e:{en:"It's hard to integrate into a new culture.",ko:"새 문화에 녹아드는 건 어려워."}});
W("intelligent","형용사","똑똑한",3,{e:{en:"She's an intelligent student.",ko:"그녀는 똑똑한 학생이야."}});
W("interaction","명사","상호작용",3,{f:"interactions",e:{en:"I enjoy the interaction with customers.",ko:"손님들과 소통하는 게 즐거워."}});
W("lighting","명사","조명",3,{f:"lightings",e:{en:"The lighting in this room is perfect.",ko:"이 방 조명이 완벽해."}});
W("mall","명사","쇼핑몰",3,{f:"malls",e:{en:"Let's go to the mall.",ko:"쇼핑몰 가자."}});
W("overseas","부사·형용사","해외로, 해외의",3,{e:{en:"She's studying overseas.",ko:"그녀는 해외에서 공부하고 있어."}});
W("recommendation","명사","추천",3,{f:"recommendations",e:{en:"Thanks for the recommendation.",ko:"추천해 줘서 고마워."}});
W("relax","동사","쉬다, 긴장을 풀다",3,{f:"relaxes relaxed relaxing",e:{en:"Just relax and enjoy it.",ko:"그냥 편하게 즐겨."}});
W("rely","동사","의지하다",3,{f:"relied relies relying",e:{en:"You can rely on me.",ko:"나한테 의지해도 돼."}});
W("remarkable","형용사","놀라운",3,{e:{en:"She made remarkable progress.",ko:"그녀는 놀라운 발전을 했어."}});
W("sacrifice","명사·동사","희생, 희생하다",3,{f:"sacrifices sacrificed sacrificing",e:{en:"My parents made a lot of sacrifices.",ko:"부모님이 많은 걸 희생하셨어."}});
W("succeed","동사","성공하다",3,{f:"succeeds succeeded succeeding",e:{en:"I hope you succeed.",ko:"네가 성공하길 바라."}});
W("tale","명사","이야기",3,{f:"tales",e:{en:"It's an old folk tale.",ko:"오래된 민담이야."}});
W("volunteer","명사·동사","자원봉사자, 자원하다",3,{f:"volunteers volunteered volunteering",e:{en:"I volunteer at an animal shelter.",ko:"동물 보호소에서 봉사해."}});
W("worship","동사","숭배하다, 예배하다",3,{f:"worships worshiped worshiping",e:{en:"They worship at the old church.",ko:"그들은 오래된 교회에서 예배를 드려."}});
W("worthy","형용사","~할 가치가 있는",3,{e:{en:"It's a worthy cause.",ko:"가치 있는 일이야."}});
W("characteristic","명사·형용사","특징, 특유의",3,{f:"characteristics",e:{en:"Patience is her best characteristic.",ko:"인내심이 그녀의 가장 좋은 특징이야."}});
W("collaboration","명사","협업",3,{f:"collaborations",e:{en:"It was a great collaboration.",ko:"훌륭한 협업이었어."}});
W("consideration","명사","고려, 배려",3,{f:"considerations",e:{en:"Thanks for your consideration.",ko:"배려해 주셔서 감사합니다."}});
W("crucial","형용사","결정적인",3,{e:{en:"Sleep is crucial for learning.",ko:"잠은 학습에 결정적이야."}});
W("daughter","명사","딸",3,{f:"daughters",e:{en:"Their daughter is five.",ko:"그 집 딸은 다섯 살이야."}});
W("dependent","형용사","의존하는",3,{e:{en:"He's still dependent on his parents.",ko:"그는 아직 부모님께 의존해."}});
W("equip","동사","갖추다",3,{f:"equipped equips equiped equipping",e:{en:"The kitchen is fully equipped.",ko:"부엌에 모든 게 갖춰져 있어."}});
W("experimental","형용사","실험적인",3,{e:{en:"It's an experimental treatment.",ko:"그건 실험적인 치료법이야."}});
W("filter","명사·동사","필터, 거르다",3,{f:"filters filtered filtering",e:{en:"I used a filter on this photo.",ko:"이 사진에 필터를 썼어."}});
W("galaxy","명사","은하",3,{f:"galaxies",e:{en:"Our galaxy has billions of stars.",ko:"우리 은하에는 수십억 개의 별이 있어."}});
W("intent","명사","의도",3,{f:"intents",e:{en:"That wasn't my intent.",ko:"그게 내 의도는 아니었어."}});
W("judgment","명사","판단",3,{f:"judgments",e:{en:"Use your best judgment.",ko:"최선의 판단을 해."}});
W("knight","명사","기사",3,{f:"knights",e:{en:"He's like a knight in shining armor.",ko:"그는 백마 탄 왕자 같아."}});
W("logo","명사","로고",3,{f:"logos",e:{en:"I like their new logo.",ko:"그들의 새 로고가 마음에 들어."}});
W("mature","형용사","성숙한, 숙성된",3,{e:{en:"She's very mature for her age.",ko:"그녀는 나이에 비해 아주 성숙해."}});
W("peaceful","형용사","평화로운",3,{e:{en:"It's so peaceful here.",ko:"여기 정말 평화롭다."}});
W("photographer","명사","사진작가",3,{f:"photographers",e:{en:"We hired a wedding photographer.",ko:"결혼식 사진작가를 고용했어."}});
W("pin","명사·동사","핀, 고정하다",3,{f:"pins pinned pinning",e:{en:"Pin the message to the top.",ko:"메시지를 맨 위에 고정해."}});
W("publicly","부사","공개적으로",3,{e:{en:"He apologized publicly.",ko:"그는 공개적으로 사과했어."}});
W("pump","명사·동사","펌프, 퍼 올리다",3,{f:"pumps pumped pumping",e:{en:"Is there an air pump nearby?",ko:"근처에 공기 펌프 있어요?"}});
W("revenge","명사","복수",3,{f:"revenges",e:{en:"It's a revenge movie.",ko:"복수 영화야."}});
W("satisfy","동사","만족시키다",3,{f:"satisfied satisfies satisfying",e:{en:"Are you satisfied with the result?",ko:"결과에 만족해?"}});
/* the vocabulary course walks this list in frequency order */
const VOCAB_ORDER = ["time", "new", "people", "good", "make", "think", "back", "go", "way", "really", "work", "year", "day", "take", "never", "life", "world", "down", "great", "last", "love", "man", "home", "long", "look", "use", "come", "part", "state", "always", "find", "help", "high", "little", "old", "thing", "game", "place", "school", "next", "end", "show", "big", "feel", "sure", "team", "ever", "family", "keep", "money", "free", "second", "away", "leave", "number", "city", "lot", "name", "night", "play", "company", "do", "few", "real", "call", "different", "set", "however", "government", "group", "public", "top", "woman", "business", "care", "start", "system", "week", "already", "case", "person", "today", "change", "enough", "full", "live", "point", "read", "tell", "bad", "hard", "mean", "once", "support", "include", "music", "power", "stop", "water", "base", "believe", "head", "small", "white", "far", "job", "side", "try", "actually", "later", "line", "order", "party", "run", "service", "country", "open", "season", "thank", "child", "general", "area", "black", "follow", "law", "together", "war", "whole", "car", "face", "kind", "maybe", "president", "story", "course", "health", "hope", "important", "least", "news", "able", "early", "friend", "information", "local", "post", "video", "young", "ago", "social", "talk", "court", "fact", "guy", "half", "hand", "level", "mind", "often", "single", "become", "body", "control", "death", "food", "hour", "office", "pay", "problem", "south", "true", "almost", "history", "large", "lose", "research", "room", "several", "university", "win", "wrong", "else", "girl", "matter", "pretty", "remember", "air", "bit", "hit", "nice", "probably", "understand", "class", "close", "idea", "past", "possible", "cause", "due", "happy", "human", "member", "month", "move", "question", "wait", "ask", "community", "late", "north", "special", "watch", "either", "future", "light", "low", "morning", "police", "short", "stay", "age", "buy", "deal", "rather", "reason", "red", "report", "soon", "third", "turn", "check", "development", "form", "heart", "minute", "act", "fire", "fun", "major", "medium", "phone", "player", "art", "build", "easy", "market", "plan", "political", "quite", "available", "education", "final", "former", "front", "kid", "list", "ready", "sometimes", "son", "street", "bring", "college", "current", "example", "experience", "hear", "meet", "program", "type", "baby", "chance", "process", "song", "study", "word", "action", "clear", "self", "student", "cost", "cut", "field", "hold", "instead", "main", "moment", "mother", "road", "seem", "town", "energy", "fight", "fine", "force", "issue", "price", "rest", "result", "space", "summer", "term", "wife", "beautiful", "date", "kill", "land", "miss", "project", "shoot", "site", "strong", "account", "especially", "eye", "parent", "period", "position", "similar", "total", "above", "club", "common", "die", "film", "happen", "lead", "likely", "military", "perfect", "personal", "security", "share", "tv", "couple", "dead", "industry", "online", "private", "return", "right", "sense", "test", "view", "break", "british", "event", "middle", "present", "sorry", "train", "wish", "answer", "boy", "design", "finally", "gold", "guess", "interest", "king", "learn", "policy", "society", "add", "alone", "average", "certain", "church", "hot", "medical", "movie", "original", "performance", "press", "receive", "role", "send", "worth", "bill", "book", "cool", "director", "exactly", "ground", "meeting", "provide", "relationship", "sound", "source", "usually", "value", "evidence", "official", "production", "rate", "round", "save", "stand", "stuff", "tax", "amount", "blue", "drive", "eat", "fall", "fast", "federal", "league", "management", "match", "picture", "size", "step", "trust", "central", "forward", "key", "mom", "page", "range", "review", "science", "trade", "various", "attention", "brother", "character", "chief", "football", "hate", "natural", "property", "quality", "style", "vote", "amazing", "blood", "complete", "dog", "economic", "involve", "language", "oil", "relate", "serious", "stage", "title", "article", "attack", "bear", "decide", "decision", "enjoy", "entire", "french", "perhaps", "poor", "release", "situation", "technology", "website", "write", "choice", "code", "consider", "continue", "cover", "currently", "door", "election", "financial", "foreign", "hair", "increase", "legal", "pick", "race", "sign", "simple", "simply", "staff", "union", "walk", "bed", "begin", "career", "crazy", "daily", "difficult", "figure", "hospital", "loss", "modern", "paper", "popular", "publish", "safe", "version", "voice", "army", "earth", "forget", "goal", "huge", "internet", "listen", "practice", "rule", "sea", "sir", "success", "access", "create", "deep", "offer", "pass", "professional", "risk", "sleep", "table", "truth", "ball", "card", "dark", "note", "percent", "piece", "product", "recent", "straight", "visit", "wall", "allow", "culture", "fan", "growth", "marry", "officer", "pain", "respect", "response", "river", "rock", "speak", "specific", "tonight", "album", "century", "charge", "cold", "effect", "funny", "limit", "network", "peace", "recently", "require", "sale", "spend", "store", "tomorrow", "track", "weight", "addition", "ahead", "beat", "capital", "committee", "conference", "difference", "double", "expect", "gas", "island", "normal", "population", "potential", "pressure", "radio", "station", "text", "treatment", "western", "campaign", "certainly", "completely", "content", "credit", "cross", "describe", "female", "focus", "husband", "ice", "individual", "interesting", "join", "message", "mile", "nearly", "particular", "previous", "quickly", "region", "section", "sort", "speed", "travel", "contact", "drop", "fair", "foot", "link", "positive", "throughout", "tour", "welcome", "absolutely", "additional", "condition", "extra", "immediately", "nature", "quick", "sell", "significant", "agree", "clean", "computer", "construction", "episode", "favorite", "income", "justice", "manager", "movement", "safety", "scene", "statement", "ability", "announce", "coach", "collection", "definitely", "heavy", "knowledge", "particularly", "search", "subject", "wide", "author", "claim", "dad", "develop", "fear", "fit", "generally", "german", "hotel", "interested", "judge", "leader", "letter", "material", "opportunity", "regular", "secretary", "sister", "unit", "worker", "annual", "anymore", "bar", "battle", "brain", "contract", "degree", "feature", "finish", "floor", "grow", "hurt", "image", "insurance", "majority", "opinion", "physical", "reach", "sport", "stupid", "successful", "active", "administration", "approach", "australian", "cancer", "civil", "dance", "defense", "direction", "independent", "master", "none", "ship", "stock", "weekend", "wonder", "worst", "awesome", "band", "cash", "commercial", "compare", "effort", "imagine", "impact", "lack", "multiple", "operation", "organization", "protect", "secret", "senior", "spring", "wear", "activity", "address", "analysis", "anyway", "choose", "color", "competition", "detail", "direct", "dream", "literally", "luck", "marriage", "necessary", "patient", "resource", "rich", "skin", "suppose", "sweet", "thus", "touch", "yesterday", "catch", "damage", "directly", "disease", "doctor", "doubt", "drink", "establish", "fish", "glad", "machine", "notice", "overall", "record", "sit", "trip", "associate", "basic", "captain", "carry", "crime", "effective", "explain", "fully", "highly", "male", "plant", "reality", "winter", "advice", "agreement", "award", "block", "challenge", "comment", "equipment", "eventually", "nation", "otherwise", "primary", "purpose", "responsible", "shop", "sick", "teacher", "theory", "agency", "avoid", "camera", "cell", "drug", "economy", "environment", "mission", "pop", "produce", "status", "therefore", "trial", "truly", "weather", "application", "coffee", "complex", "division", "evening", "flight", "freedom", "heat", "interview", "library", "locate", "location", "murder", "star", "accept", "actual", "appear", "attempt", "channel", "distance", "exchange", "fat", "glass", "northern", "powerful", "prior", "protection", "religious", "ride", "serve", "slow", "speech", "traffic", "tree", "wonderful", "animal", "benefit", "bottom", "demand", "engine", "famous", "investment", "lie", "partner", "raise", "sad", "solution", "square", "structure", "traditional", "twice", "wind", "worry", "brand", "bus", "cent", "count", "critical", "fourth", "fresh", "mental", "mention", "mostly", "mouth", "photo", "previously", "realize", "remain", "scale", "score", "separate", "smart", "surface", "throw", "totally", "wedding", "arm", "budget", "click", "estate", "fail", "faith", "fashion", "fund", "generation", "metal", "profile", "pull", "push", "rise", "seat", "target", "village", "agent", "apply", "authority", "basis", "draw", "dude", "employee", "enter", "ex", "gain", "memory", "ring", "silver", "soul", "spread", "supply", "waste", "weird", "adult", "apparently", "artist", "chairman", "engineering", "grade", "healthy", "method", "obviously", "option", "prison", "stone", "strength", "user", "wild", "window", "winner", "arrive", "bag", "camp", "cast", "correct", "dangerous", "extremely", "firm", "handle", "improve", "indeed", "negative", "prevent", "remove", "television", "trouble", "advantage", "apart", "aware", "cat", "customer", "dinner", "dollar", "fifth", "function", "gift", "impossible", "influence", "item", "marketing", "progress", "proud", "shut", "standard", "wood", "background", "birth", "concept", "copy", "dear", "garden", "host", "housing", "labor", "leadership", "length", "lucky", "possibly", "prove", "rare", "skill", "software", "thousand", "tough", "ad", "alive", "apple", "balance", "birthday", "boss", "connection", "dress", "fellow", "horse", "magic", "manage", "map", "net", "request", "vehicle", "volume", "wake", "aid", "beauty", "busy", "concern", "conversation", "corner", "cultural", "driver", "exist", "farm", "file", "fix", "fly", "guide", "investigation", "operate", "responsibility", "roll", "slightly", "suggest", "surprise", "thought", "treat", "unique", "variety", "violence", "weapon", "youth", "appreciate", "discover", "dry", "edge", "evil", "excite", "forever", "injury", "iron", "lovely", "mad", "magazine", "model", "parliament", "prepare", "reference", "religion", "strategy", "wine", "audience", "blog", "core", "democratic", "description", "excellent", "guard", "honest", "medicine", "mountain", "nuclear", "port", "presence", "reaction", "reduce", "solid", "spanish", "stress", "taste", "tea", "victory", "afternoon", "assistant", "citizen", "classic", "emergency", "entirely", "failure", "festival", "flat", "fuel", "house", "initial", "introduce", "kick", "mail", "massive", "pair", "plane", "plenty", "proper", "quarter", "regional", "session", "shape", "sky", "teach", "transfer", "upper", "useful", "willing", "zone", "accident", "advance", "alternative", "boat", "capacity", "cheap", "climate", "discussion", "duty", "feeling", "governor", "industrial", "joint", "mix", "path", "promise", "propose", "purchase", "rain", "steel", "terrible", "tired", "vice", "warm", "afraid", "beer", "border", "command", "crew", "crowd", "element", "enemy", "ensure", "environmental", "fill", "forest", "intelligence", "intend", "moon", "profit", "proof", "soldier", "suit", "appearance", "attorney", "bank", "behavior", "chair", "debt", "domestic", "expensive", "historical", "honestly", "honor", "jump", "launch", "minimum", "native", "originally", "suddenly", "survey", "update", "writer", "yellow", "ancient", "combine", "communication", "connect", "contain", "download", "email", "exercise", "express", "flow", "girlfriend", "hero", "illegal", "loan", "perform", "planet", "restaurant", "select", "soft", "stick", "sugar", "surprised", "transport", "affair", "appeal", "appropriate", "confirm", "device", "drama", "entry", "era", "factor", "feed", "golden", "grant", "hop", "lawyer", "leg", "measure", "mistake", "platform", "pool", "regard", "relation", "route", "schedule", "scientific", "shoe", "smoke", "testing", "abuse", "angry", "candidate", "comfortable", "discuss", "emotional", "facility", "fox", "gun", "hole", "holiday", "internal", "laugh", "liberal", "lunch", "milk", "pack", "payment", "relatively", "sector", "snow", "storm", "strike", "studio", "weak", "actor", "apartment", "chain", "chapter", "commit", "confidence", "cook", "cute", "equal", "fake", "finance", "identity", "journey", "kitchen", "maintain", "numerous", "owner", "quiet", "reveal", "specifically", "split", "task", "urban", "affect", "aircraft", "approve", "approximately", "argument", "arrest", "conflict", "corporate", "debate", "determine", "distribution", "document", "escape", "extend", "fault", "flower", "friendly", "lady", "million", "mixed", "phase", "properly", "pure", "requirement", "resident", "revenue", "secure", "smile", "strange", "talent", "temperature", "troop", "truck", "basically", "besides", "bird", "blame", "chicken", "collect", "context", "coverage", "display", "elect", "false", "identify", "incredible", "inspire", "meat", "ministry", "mode", "neck", "novel", "obvious", "shirt", "shot", "slowly", "stadium", "surgery", "trading", "vision", "champion", "cream", "crisis", "deliver", "editor", "estimate", "giant", "jail", "kingdom", "literature", "mayor", "minor", "opposite", "selection", "signal", "struggle", "theme", "tiny", "typically", "unfortunately", "usual", "wave", "alcohol", "breakfast", "bright", "capable", "combination", "conservative", "desire", "destroy", "draft", "drunk", "familiar", "guilty", "hundred", "largely", "recommend", "refer", "relevant", "seek", "ticket", "unable", "upset", "wing", "bomb", "creative", "cycle", "educational", "entertainment", "extreme", "hang", "info", "mainly", "newspaper", "offering", "paint", "republic", "reserve", "row", "salt", "scar", "switch", "territory", "threat", "appoint", "aside", "assistance", "bell", "blow", "bond", "boyfriend", "careful", "circumstance", "corporation", "cry", "danger", "delivery", "deserve", "empty", "folk", "gender", "instance", "motion", "prize", "reasonable", "register", "resolution", "rural", "sing", "tool", "typical", "universe", "warn", "admit", "attitude", "branch", "conduct", "decade", "dedicate", "definition", "favor", "flag", "frame", "guest", "independence", "institution", "kiss", "load", "plot", "possibility", "random", "recovery", "rent", "replace", "represent", "sentence", "tooth", "tip", "academic", "accurate", "achieve", "afford", "assume", "bottle", "bunch", "category", "chat", "competitive", "fruit", "index", "lane", "mess", "normally", "occur", "opposition", "permanent", "personally", "pleasure", "prefer", "representative", "scheme", "shift", "storage", "tank", "tend", "tight", "transportation", "ultimately", "yard", "asset", "basketball", "combat", "constitution", "consumer", "creation", "define", "depend", "depression", "employment", "exclusive", "excuse", "expert", "frequently", "golf", "grace", "hopefully", "importance", "latter", "manufacture", "mining", "object", "pattern", "personnel", "perspective", "pregnant", "premier", "promote", "revolution", "severe", "tournament", "victim", "attend", "ban", "carbon", "crash", "declare", "depth", "deputy", "dirty", "earn", "electronic", "error", "existence", "expression", "factory", "interior", "joy", "legislation", "maintenance", "mate", "nearby", "origin", "panel", "personality", "plate", "relief", "resistance", "retail", "rice", "roof", "somewhat", "surely", "absolute", "advertise", "baseball", "bathroom", "cable", "calm", "championship", "client", "constant", "dumb", "empire", "expansion", "heavily", "hide", "incident", "politician", "print", "quit", "refuse", "sight", "significantly", "widely", "worldwide", "anniversary", "attractive", "bike", "broad", "burn", "cake", "closely", "constantly", "contest", "fee", "hardly", "hat", "height", "invite", "loud", "officially", "portion", "pound", "princess", "raw", "reform", "respond", "retirement", "sample", "secondary", "solar", "somehow", "suffer", "ultimate", "unknown", "attach", "automatically", "battery", "blind", "brief", "chest", "engage", "external", "fantasy", "grab", "immediate", "introduction", "license", "pilot", "pink", "presidential", "principal", "recognize", "regularly", "shipping", "singer", "steam", "survive", "tall", "therapy", "witness", "adopt", "aim", "campus", "cap", "childhood", "clinical", "comedy", "comparison", "defeat", "democracy", "entitle", "exact", "expose", "injure", "lock", "musical", "nose", "oppose", "organize", "plastic", "suspect", "swear", "technique", "tie", "trend", "valuable", "wealth", "wise", "aged", "approval", "aspect", "bread", "convention", "egg", "engineer", "equivalent", "fairly", "finger", "gang", "graduate", "inner", "lift", "mark", "monthly", "neighborhood", "outstanding", "permission", "regulation", "reply", "rid", "scientist", "shoulder", "shower", "tradition", "wheel", "appointment", "barely", "celebrate", "chocolate", "coal", "criticism", "effectively", "extensive", "formation", "highway", "historic", "hunt", "improvement", "inch", "initially", "jury", "korean", "monster", "obtain", "olympic", "philosophy", "pride", "repeat", "rough", "settlement", "smell", "speaker", "surround", "topic", "universal", "vast", "visitor", "auto", "consistent", "guitar", "ignore", "meal", "meanwhile", "naturally", "necessarily", "partnership", "percentage", "pocket", "practical", "primarily", "regardless", "relative", "rescue", "rush", "sharp", "soccer", "stable", "symptom", "temporary", "trick", "audio", "bone", "circuit", "clothing", "complicated", "confuse", "consequence", "defend", "divide", "everyday", "extent", "fishing", "format", "gap", "harm", "household", "immigration", "impressive", "killer", "lesson", "membership", "mirror", "parking", "proposal", "recognition", "reputation", "shortly", "strongly", "tear", "thin", "accuse", "adventure", "argue", "assessment", "atmosphere", "awful", "bedroom", "belief", "bind", "carefully", "closing", "cloud", "contrast", "elsewhere", "extension", "founder", "gear", "hill", "hip", "infrastructure", "loose", "moral", "offensive", "package", "poverty", "qualify", "railway", "ridiculous", "sensitive", "server", "shock", "silence", "superior", "supporter", "thick", "ton", "transition", "violent", "voter", "wash", "acid", "actress", "administrative", "alongside", "angel", "anxiety", "bonus", "charity", "curious", "encourage", "enforcement", "flash", "formal", "formula", "fort", "gray", "gross", "hungry", "inform", "innocent", "math", "mystery", "palace", "penalty", "pet", "photography", "protest", "publication", "rating", "respectively", "silent", "successfully", "trail", "uncle", "unusual", "arrival", "assault", "awareness", "badly", "bath", "capture", "chase", "component", "concrete", "deeply", "expectation", "explanation", "exposure", "fiction", "guarantee", "happiness", "horrible", "ideal", "legend", "mood", "muscle", "passion", "procedure", "producer", "rank", "replacement", "retire", "sand", "settle", "shadow", "tag", "tape", "wage", "avenue", "clock", "commissioner", "commitment", "confident", "custom", "deny", "desk", "electricity", "farmer", "helpful", "horror", "label", "naked", "output", "pitch", "plain", "rear", "romantic", "strategic", "swim", "welfare", "wire", "afterwards", "alright", "anger", "architecture", "assist", "behalf", "center", "ceremony", "comic", "cop", "designer", "diamond", "disappoint", "efficient", "electrical", "employ", "essentially", "establishment", "ghost", "lab", "nervous", "newly", "odd", "ordinary", "participate", "prayer", "principle", "rarely", "soil", "solve", "stomach", "trash", "ugly", "boost", "comfort", "crack", "deck", "dragon", "dramatic", "dust", "evolution", "hire", "illness", "inspiration", "knife", "lately", "minority", "priority", "promotion", "rail", "reader", "remote", "repair", "root", "steal", "telephone", "abandon", "acquire", "annoying", "bid", "bury", "butter", "conclusion", "convince", "decent", "decline", "delay", "downtown", "elite", "forth", "insane", "layer", "nurse", "organic", "ownership", "participant", "poetry", "pot", "pray", "recall", "sake", "sheet", "spiritual", "sudden", "vacation", "abroad", "assign", "bench", "bother", "compete", "consist", "contribute", "critic", "disaster", "entrance", "equally", "fitness", "friendship", "idiot", "intense", "lifetime", "makeup", "mortgage", "narrative", "narrow", "observe", "occasionally", "pan", "physics", "potentially", "reduction", "reflect", "researcher", "silly", "subsequent", "translation", "visible", "amendment", "belong", "commonly", "efficiency", "enterprise", "experiment", "grass", "hence", "increasingly", "incredibly", "journalist", "mill", "occasion", "pace", "passenger", "pen", "possession", "rapid", "sixth", "spin", "suitable", "valid", "vital", "agriculture", "allege", "commerce", "creek", "currency", "emotion", "exhibition", "fraud", "genuine", "honey", "hook", "hunter", "immigrant", "instruction", "legacy", "log", "merely", "prisoner", "programming", "ratio", "regret", "reject", "remind", "resort", "reverse", "routine", "scary", "seed", "sin", "spell", "summary", "survival", "sword", "tongue", "ward", "achievement", "asleep", "automatic", "coat", "consent", "daddy", "destruction", "divorce", "ear", "extraordinary", "fate", "frequency", "gene", "glory", "heritage", "initiative", "landscape", "logic", "objective", "privacy", "residence", "roughly", "salary", "script", "threaten", "tube", "app", "banking", "chemistry", "conclude", "consumption", "corruption", "cotton", "discount", "dozen", "epic", "exception", "exit", "expand", "fancy", "gorgeous", "grateful", "impression", "indicate", "input", "knock", "leather", "lip", "luxury", "manufacturer", "outcome", "removal", "reporter", "scream", "sequence", "stretch", "tennis", "theater", "absence", "agricultural", "athlete", "box", "bull", "contribution", "ease", "flood", "generate", "genetic", "impress", "instant", "investor", "liberty", "minister", "monitor", "photograph", "progressive", "punishment", "rally", "rapidly", "representation", "sum", "swing", "tail", "twin", "upcoming", "veteran", "alert", "arena", "boom", "boot", "brave", "column", "compensation", "composition", "conservation", "constitutional", "density", "difficulty", "ethnic", "expense", "fleet", "fundamental", "genius", "greatly", "guidance", "infection", "intention", "joke", "knee", "park", "participation", "precious", "pregnancy", "pretend", "radical", "residential", "reward", "satellite", "shake", "shore", "spot", "substantial", "teen", "transmission", "trap", "uniform", "wildlife", "wooden", "aggressive", "apparent", "blast", "courage", "cure", "desperate", "diversity", "faculty", "feedback", "fighter", "frozen", "humanity", "innovation", "instrument", "invest", "jacket", "manual", "nursing", "occupy", "ongoing", "operator", "painful", "preparation", "punch", "purple", "railroad", "registration", "romance", "submit", "sufficient", "suspend", "tissue", "trailer", "underground", "versus", "virtual", "wound", "announcement", "arrange", "attract", "bite", "board", "chip", "dare", "database", "discrimination", "disorder", "distribute", "district", "documentary", "domain", "dynamic", "edit", "engagement", "explore", "footage", "grave", "implementation", "investigate", "jazz", "laboratory", "literary", "midnight", "piano", "praise", "presentation", "psychology", "restriction", "rocket", "ruin", "stability", "steady", "symbol", "terminal", "toilet", "treaty", "triple", "unlikely", "agenda", "bat", "bow", "calendar", "cape", "collective", "cooperation", "craft", "darkness", "devil", "enable", "equity", "fortune", "gate", "goodbye", "hardware", "intellectual", "involvement", "nut", "partly", "petition", "phrase", "physically", "rat", "regime", "sauce", "seal", "similarly", "slide", "stem", "summit", "throat", "tiger", "toy", "warrior", "wisdom", "accounting", "awkward", "beast", "beef", "candy", "carrier", "celebration", "celebrity", "certificate", "cite", "clay", "colleague", "construct", "default", "derive", "dialogue", "disable", "distinct", "drag", "educate", "eligible", "execution", "follower", "fool", "framework", "franchise", "furniture", "integrate", "intelligent", "interaction", "jet", "lifestyle", "lighting", "loop", "mall", "overseas", "recommendation", "recover", "relax", "reliable", "rely", "remarkable", "sacrifice", "succeed", "tale", "volunteer", "worship", "worthy", "alarm", "breathe", "characteristic", "collaboration", "consideration", "crucial", "daughter", "dependent", "equip", "experimental", "filter", "galaxy", "highlight", "intent", "judgment", "knight", "logo", "mature", "peaceful", "photographer", "pin", "prevention", "publicly", "pump", "revenge", "satisfy"];

/* American IPA from the CMU Pronouncing Dictionary (heteronyms set by part of speech) */
const IPA = {"account":"/əˈkaʊnt/","ad":"/æd/","adapt":"/əˈdæpt/","address":"/ˈædres/","advocate":"/ˈædvəkət/","afraid":"/əˈfreɪd/","ages":"/ˈeɪdʒəz/","ago":"/əˈɡoʊ/","agree":"/əˈɡri/","airport":"/ˈerˌpɔrt/","allergic":"/əˈlɜrdʒɪk/","allergy":"/ˈælərdʒi/","ambulance":"/ˈæmbjələns/","americano":"/əˌmerɪˈkɑnoʊ/","ankle":"/ˈæŋkəl/","answer":"/ˈænsər/","anything":"/ˈeniˌθɪŋ/","anyway":"/ˈeniˌweɪ/","app":"/æp/","appointment":"/əˈpɔɪntmənt/","appreciate":"/əˈpriʃiˌeɪt/","approach":"/əˈproʊtʃ/","around":"/əˈraʊnd/","arrive":"/əˈraɪv/","ask":"/æsk/","assignment":"/əˈsaɪnmənt/","back":"/bæk/","bad":"/bæd/","bag":"/bæɡ/","bail":"/beɪl/","bake":"/beɪk/","bargain":"/ˈbɑrɡən/","base":"/beɪs/","beat":"/bit/","bed":"/bed/","behind":"/bɪˈhaɪnd/","believe":"/bɪˈliv/","bell":"/bel/","best":"/best/","better":"/ˈbetər/","between":"/bɪˈtwin/","big":"/bɪɡ/","bill":"/bɪl/","bit":"/bɪt/","bite":"/baɪt/","black":"/blæk/","blessing":"/ˈblesɪŋ/","blue":"/blu/","book":"/bʊk/","borrow":"/ˈbɑˌroʊ/","break":"/breɪk/","breakfast":"/ˈbrekfəst/","bright":"/braɪt/","brush":"/brʌʃ/","build":"/bɪld/","burnt":"/bɜrnt/","bus":"/bʌs/","busy":"/ˈbɪzi/","buy":"/baɪ/","cafe":"/kəˈfeɪ/","call":"/kɔl/","camera":"/ˈkæmərə/","camp":"/kæmp/","cancel":"/ˈkænsəl/","card":"/kɑrd/","carousel":"/ˈkerəˌsel/","cash":"/kæʃ/","cashier":"/kæˈʃɪr/","catch":"/kætʃ/","celebrate":"/ˈseləˌbreɪt/","change":"/tʃeɪndʒ/","channel":"/ˈtʃænəl/","charge":"/tʃɑrdʒ/","charger":"/ˈtʃɑrdʒər/","chat":"/tʃæt/","cheap":"/tʃip/","check":"/tʃek/","checkup":"/ˈtʃeˌkʌp/","chef":"/ʃef/","chord":"/kɔrd/","chore":"/tʃɔr/","circle":"/ˈsɜrkəl/","clarify":"/ˈklerəˌfaɪ/","class":"/klæs/","clean":"/klin/","clear":"/klɪr/","click":"/klɪk/","close":"/kloʊz/","coffee":"/ˈkɑfi/","cold":"/koʊld/","come":"/kʌm/","comment":"/ˈkɑment/","complain":"/kəmˈpleɪn/","complaint":"/kəmˈpleɪnt/","compliment":"/ˈkɑmpləment/","connect":"/kəˈnekt/","consider":"/kənˈsɪdər/","conversation":"/ˌkɑnvərˈseɪʃən/","convinced":"/kənˈvɪnst/","cook":"/kʊk/","couch":"/kaʊtʃ/","cough":"/kɑf/","counter":"/ˈkaʊntər/","couple":"/ˈkʌpəl/","cover":"/ˈkʌvər/","cram":"/kræm/","crash":"/kræʃ/","cup":"/kʌp/","curate":"/ˈkjʊrət/","cut":"/kʌt/","damage":"/ˈdæmədʒ/","date":"/deɪt/","day":"/deɪ/","deadline":"/ˈdedˌlaɪn/","deal":"/dil/","declutter":"/diˈklʌtər/","delay":"/dɪˈleɪ/","delicious":"/dɪˈlɪʃəs/","deposit":"/dəˈpɑzɪt/","detour":"/ˈditʊr/","detox":"/ˈdiˌtɑks/","devil":"/ˈdevəl/","die":"/daɪ/","difference":"/ˈdɪfərəns/","different":"/ˈdɪfərənt/","digital":"/ˈdɪdʒətəl/","dinner":"/ˈdɪnər/","direct":"/dəˈrekt/","disagree":"/dɪsəˈɡri/","disappointed":"/ˌdɪsəˈpɔɪntɪd/","discount":"/ˈdɪskaʊnt/","disguise":"/dɪsˈɡaɪz/","dish":"/dɪʃ/","distance":"/ˈdɪstəns/","divide":"/dɪˈvaɪd/","dizzy":"/ˈdɪzi/","do":"/du/","doctor":"/ˈdɑktər/","dog":"/dɔɡ/","doomscrolling":"/ˈdumˌskroʊlɪŋ/","door":"/dɔr/","down":"/daʊn/","draw":"/drɔ/","driver":"/ˈdraɪvər/","due":"/du/","ear":"/ir/","early":"/ˈɜrli/","easy":"/ˈizi/","eat":"/it/","economics":"/ˌekəˈnɑmɪks/","effect":"/ɪˈfekt/","elaborate":"/ɪˈlæbəˌreɪt/","email":"/iˈmeɪl/","english":"/ˈɪŋɡlɪʃ/","essay":"/ˈeseɪ/","evenly":"/ˈivənli/","everyone":"/ˈevriˌwʌn/","everything":"/ˈevriˌθɪŋ/","exam":"/ɪɡˈzæm/","example":"/ɪɡˈzæmpəl/","exchange":"/ɪksˈtʃeɪndʒ/","explain":"/ɪkˈspleɪn/","extension":"/ɪkˈstenʃən/","eye":"/aɪ/","fan":"/fæn/","far":"/fɑr/","feed":"/fid/","feedback":"/ˈfidˌbæk/","feel":"/fil/","feeling":"/ˈfilɪŋ/","fence":"/fens/","fever":"/ˈfivər/","few":"/fju/","file":"/faɪl/","finally":"/ˈfaɪnəli/","find":"/faɪnd/","fit":"/fɪt/","fix":"/fɪks/","flight":"/flaɪt/","fly":"/flaɪ/","follow":"/ˈfɑloʊ/","food":"/fud/","foodie":"/ˈfudi/","forget":"/fərˈɡet/","form":"/fɔrm/","forward":"/ˈfɔrwərd/","free":"/fri/","freeze":"/friz/","freezing":"/ˈfrizɪŋ/","friday":"/ˈfraɪdeɪ/","friend":"/frend/","front":"/frʌnt/","full":"/fʊl/","fun":"/fʌn/","funny":"/ˈfʌni/","game":"/ɡeɪm/","gift":"/ɡɪft/","go":"/ɡoʊ/","good":"/ɡʊd/","grab":"/ɡræb/","grain":"/ɡreɪn/","grammar":"/ˈɡræmər/","great":"/ɡreɪt/","group":"/ɡrup/","guest":"/ɡest/","guilty":"/ˈɡɪlti/","guitar":"/ɡɪˈtɑr/","gym":"/dʒɪm/","hand":"/hænd/","happy":"/ˈhæpi/","head":"/hed/","headache":"/ˈheˌdeɪk/","hear":"/hir/","heart":"/hɑrt/","heater":"/ˈhitər/","help":"/help/","hike":"/haɪk/","hobby":"/ˈhɑbi/","hold":"/hoʊld/","home":"/hoʊm/","homework":"/ˈhoʊmˌwɜrk/","honest":"/ˈɑnəst/","honestly":"/ˈɑnəstli/","hooked":"/hʊkt/","hot":"/hɑt/","hour":"/ˈaʊər/","hungry":"/ˈhʌŋɡri/","hurt":"/hɜrt/","ice":"/aɪs/","impulse":"/ˈɪmpəls/","include":"/ˌɪnˈklud/","insurance":"/ˌɪnˈʃʊrəns/","internet":"/ˈɪntərˌnet/","item":"/ˈaɪtəm/","jacket":"/ˈdʒækət/","jet":"/dʒet/","job":"/dʒɑb/","join":"/dʒɔɪn/","keep":"/kip/","key":"/ki/","kind":"/kaɪnd/","lag":"/læɡ/","landlord":"/ˈlændˌlɔrd/","last":"/læst/","late":"/leɪt/","lately":"/ˈleɪtli/","later":"/ˈleɪtər/","launch":"/lɔntʃ/","laundry":"/ˈlɔndri/","lead":"/lid/","leak":"/lik/","learn":"/lɜrn/","lease":"/lis/","leave":"/liv/","lecture":"/ˈlektʃər/","leftovers":"/ˈlefˌtoʊvərz/","light":"/laɪt/","link":"/lɪŋk/","little":"/ˈlɪtəl/","local":"/ˈloʊkəl/","lock":"/lɑk/","long":"/lɔŋ/","look":"/lʊk/","lost":"/lɔst/","lot":"/lɑt/","loud":"/laʊd/","love":"/lʌv/","luggage":"/ˈlʌɡədʒ/","machine":"/məˈʃin/","major":"/ˈmeɪdʒər/","make":"/meɪk/","manager":"/ˈmænədʒər/","map":"/mæp/","marketing":"/ˈmɑrkətɪŋ/","match":"/mætʃ/","meal":"/mil/","mean":"/min/","media":"/ˈmidiə/","medicine":"/ˈmedəsən/","medium":"/ˈmidiəm/","meet":"/mit/","meeting":"/ˈmitɪŋ/","mend":"/mend/","menu":"/ˈmenju/","message":"/ˈmesədʒ/","mild":"/maɪld/","milk":"/mɪlk/","minute":"/ˈmɪnɪt/","miss":"/mɪs/","mistake":"/mɪˈsteɪk/","mixed":"/mɪkst/","moment":"/ˈmoʊmənt/","mood":"/mud/","moon":"/mun/","morning":"/ˈmɔrnɪŋ/","move":"/muv/","movie":"/ˈmuvi/","music":"/ˈmjuzɪk/","mute":"/mjut/","name":"/neɪm/","negotiate":"/nəˈɡoʊʃiˌeɪt/","negotiation":"/nɪˌɡoʊʃiˈeɪʃən/","neighbor":"/ˈneɪbər/","nerve":"/nɜrv/","nervous":"/ˈnɜrvəs/","new":"/nu/","next":"/nekst/","nice":"/naɪs/","night":"/naɪt/","noise":"/nɔɪz/","noon":"/nun/","notch":"/nɑtʃ/","nothing":"/ˈnʌθɪŋ/","number":"/ˈnʌmbər/","offline":"/ˈɔˌflaɪn/","often":"/ˈɔfən/","online":"/ˈɔnˌlaɪn/","open":"/ˈoʊpən/","opinion":"/əˈpɪnjən/","option":"/ˈɑpʃən/","order":"/ˈɔrdər/","outside":"/ˈaʊtˈsaɪd/","overhear":"/ˈoʊvərˈhir/","overnight":"/ˈoʊvərˈnaɪt/","overwhelmed":"/ˌoʊvərˈwelmd/","pack":"/pæk/","package":"/ˈpækədʒ/","page":"/peɪdʒ/","pain":"/peɪn/","paper":"/ˈpeɪpər/","pass":"/pæs/","password":"/ˈpæˌswɜrd/","path":"/pæθ/","patience":"/ˈpeɪʃəns/","pay":"/peɪ/","peanut":"/ˈpinət/","pen":"/pen/","pencil":"/ˈpensəl/","penicillin":"/ˌpenəˈsɪlən/","people":"/ˈpipəl/","perfect":"/ˈpɜrfɪkt/","pharmacy":"/ˈfɑrməsi/","phone":"/foʊn/","photo":"/ˈfoʊˌtoʊ/","photography":"/fəˈtɑɡrəfi/","pick":"/pɪk/","picture":"/ˈpɪktʃər/","pill":"/pɪl/","pipe":"/paɪp/","place":"/pleɪs/","plan":"/plæn/","plant":"/plænt/","plate":"/pleɪt/","platform":"/ˈplætˌfɔrm/","play":"/pleɪ/","pleasure":"/ˈpleʒər/","point":"/pɔɪnt/","poisoning":"/ˈpɔɪzənɪŋ/","policy":"/ˈpɑləsi/","possible":"/ˈpɑsəbəl/","post":"/poʊst/","practice":"/ˈpræktəs/","prescription":"/prəˈskrɪpʃən/","price":"/praɪs/","private":"/ˈpraɪvət/","professionally":"/prəˈfeʃənəli/","project":"/ˈprɑdʒekt/","pronunciation":"/proʊˌnʌnsiˈeɪʃən/","properly":"/ˈprɑpərli/","propose":"/prəˈpoʊz/","push":"/pʊʃ/","question":"/ˈkwestʃən/","quickly":"/ˈkwɪkli/","quite":"/kwaɪt/","range":"/reɪndʒ/","rather":"/ˈræðər/","read":"/rid/","ready":"/ˈredi/","real":"/ril/","really":"/ˈrɪli/","receipt":"/rɪˈsit/","recharge":"/riˈtʃɑrdʒ/","recommend":"/ˌrekəˈmend/","recover":"/rɪˈkʌvər/","refill":"/ˈrifɪl/","refund":"/ˈrifʌnd/","reinvent":"/ˌriɪnˈvent/","renew":"/rɪˈnu/","rent":"/rent/","request":"/rɪˈkwest/","reschedule":"/riˈskedʒul/","reservation":"/ˌrezərˈveɪʃən/","restroom":"/ˈreˌstrum/","return":"/rɪˈtɜrn/","right":"/raɪt/","ring":"/rɪŋ/","rip":"/rɪp/","room":"/rum/","run":"/rʌn/","rusty":"/ˈrʌsti/","sad":"/sæd/","sale":"/seɪl/","salt":"/sɔlt/","sauce":"/sɔs/","save":"/seɪv/","schedule":"/ˈskedʒul/","scope":"/skoʊp/","screen":"/skrin/","seat":"/sit/","second":"/ˈsekənd/","section":"/ˈsekʃən/","seem":"/sim/","semester":"/səˈmestər/","send":"/send/","sense":"/sens/","serious":"/ˈsɪriəs/","service":"/ˈsɜrvəs/","share":"/ʃer/","shoe":"/ʃu/","shop":"/ʃɑp/","short":"/ʃɔrt/","shot":"/ʃɑt/","show":"/ʃoʊ/","sick":"/sɪk/","side":"/saɪd/","sign":"/saɪn/","since":"/sɪns/","sink":"/sɪŋk/","size":"/saɪz/","sleep":"/slip/","slow":"/sloʊ/","slowly":"/ˈsloʊli/","small":"/smɔl/","sneeze":"/sniz/","soccer":"/ˈsɑkər/","social":"/ˈsoʊʃəl/","someday":"/ˈsʌmˌdeɪ/","someone":"/ˈsʌmˌwʌn/","something":"/ˈsʌmθɪŋ/","sometime":"/ˈsʌmˌtaɪm/","soon":"/sun/","sore":"/sɔr/","sorry":"/ˈsɑri/","sound":"/saʊnd/","speak":"/spik/","speaker":"/ˈspikər/","special":"/ˈspeʃəl/","spell":"/spel/","spend":"/spend/","spicy":"/ˈspaɪsi/","split":"/splɪt/","splurge":"/splɜrdʒ/","spot":"/spɑt/","sprain":"/spreɪn/","stand":"/stænd/","start":"/stɑrt/","station":"/ˈsteɪʃən/","steak":"/steɪk/","stock":"/stɑk/","stomach":"/ˈstʌmək/","stop":"/stɑp/","store":"/stɔr/","story":"/ˈstɔri/","strength":"/streŋkθ/","stretch":"/stretʃ/","strike":"/straɪk/","student":"/ˈstudənt/","study":"/ˈstʌdi/","subtitle":"/ˈsʌbˌtaɪtəl/","sugar":"/ˈʃʊɡər/","sunday":"/ˈsʌnˌdeɪ/","sure":"/ʃʊr/","swallow":"/ˈswɑloʊ/","swamped":"/swɔmpt/","swim":"/swɪm/","symptom":"/ˈsɪmptəm/","table":"/ˈteɪbəl/","tag":"/tæɡ/","take":"/teɪk/","talk":"/tɔk/","taxi":"/ˈtæksi/","tea":"/ti/","terrible":"/ˈterəbəl/","test":"/test/","text":"/tekst/","textbook":"/ˈtekstˌbʊk/","thank":"/θæŋk/","thin":"/θɪn/","thing":"/θɪŋ/","think":"/θɪŋk/","throat":"/θroʊt/","through":"/θru/","thursday":"/ˈθɜrzˌdeɪ/","ticket":"/ˈtɪkət/","time":"/taɪm/","tired":"/ˈtaɪərd/","today":"/təˈdeɪ/","toilet":"/ˈtɔɪlət/","tomorrow":"/təˈmɑroʊ/","tonight":"/təˈnaɪt/","top":"/tɑp/","torn":"/tɔrn/","total":"/ˈtoʊtəl/","touch":"/tʌtʃ/","train":"/treɪn/","transfer":"/trænsˈfɜr/","trash":"/træʃ/","troll":"/troʊl/","trouble":"/ˈtrʌbəl/","try":"/traɪ/","turn":"/tɜrn/","twice":"/twaɪs/","twist":"/twɪst/","understand":"/ˌʌndərˈstænd/","unsubscribe":"/ənsəbˈskraɪb/","until":"/ənˈtɪl/","unwind":"/ənˈwaɪnd/","update":"/ʌpˈdeɪt/","upgrade":"/ˈʌpɡreɪd/","utilities":"/juˈtɪlətiz/","vacation":"/veɪˈkeɪʃən/","vegetarian":"/ˌvedʒəˈteˌriən/","video":"/ˈvɪdioʊ/","viral":"/ˈvaɪrəl/","wait":"/weɪt/","walk":"/wɔk/","warranty":"/ˈwɔrənti/","wash":"/wɑʃ/","watch":"/wɑtʃ/","water":"/ˈwɔtər/","way":"/weɪ/","weather":"/ˈweðər/","week":"/wik/","weekend":"/ˈwiˌkend/","weird":"/wɪrd/","wheel":"/wil/","whose":"/huz/","window":"/ˈwɪndoʊ/","wine":"/waɪn/","within":"/wɪˈðɪn/","without":"/wɪˈθaʊt/","word":"/wɜrd/","work":"/wɜrk/","world":"/wɜrld/","worried":"/ˈwʌrid/","worry":"/ˈwʌri/","worth":"/wɜrθ/","wrap":"/ræp/","wrong":"/rɔŋ/","year":"/jɪr/","yoga":"/ˈjoʊɡə/"};
/* phase 3 headwords (tools/ipa.py) */
Object.assign(IPA, {"decide":"/dɪˈsaɪd/","able":"/ˈeɪbəl/","abroad":"/əˈbrɔd/","absent":"/ˈæbsənt/","accidentally":"/ˌæksəˈdentəli/","ace":"/eɪs/","add":"/æd/","affect":"/əˈfekt/","afternoon":"/ˌæftərˈnun/","agenda":"/əˈdʒendə/","air":"/er/","alarm":"/əˈlɑrm/","alcohol":"/ˈælkəˌhɑl/","algorithm":"/ˈælɡəˌrɪðəm/","allow":"/əˈlaʊ/","almost":"/ˈɔlˌmoʊst/","alone":"/əˈloʊn/","always":"/ˈɔlˌweɪz/","amazing":"/əˈmeɪzɪŋ/","angry":"/ˈæŋɡri/","annoyed":"/əˈnɔɪd/","antibiotic":"/ˌæntibaɪˈɑtɪk/","anyone":"/ˈeniˌwʌn/","apartment":"/əˈpɑrtmənt/","apologize":"/əˈpɑləˌdʒaɪz/","apply":"/əˈplaɪ/","argument":"/ˈɑrɡjəmənt/","arm":"/ɑrm/","audience":"/ˈɑdiəns/","authentication":"/ɔˌθentəˈkeɪʃən/","available":"/əˈveɪləbəl/","avoid":"/əˈvɔɪd/","away":"/əˈweɪ/","balance":"/ˈbæləns/","ballpark":"/ˈbɔlˌpɑrk/","bandage":"/ˈbændɪdʒ/","bathroom":"/ˈbæˌθrum/","battery":"/ˈbætəri/","beach":"/bitʃ/","bearings":"/ˈberɪŋz/","because":"/bɪˈkɔz/","beside":"/bɪˈsaɪd/","binge":"/bɪndʒ/","biology":"/baɪˈɑlədʒi/","bleed":"/blid/","blog":"/blɔɡ/","blood":"/blʌd/","blow":"/bloʊ/","board":"/bɔrd/","boat":"/boʊt/","bored":"/bɔrd/","box":"/bɑks/","brand":"/brænd/","breathe":"/brið/","bring":"/brɪŋ/","budget":"/ˈbʌdʒɪt/","buffer":"/ˈbʌfər/","bug":"/bʌɡ/","business":"/ˈbɪznəs/","bye":"/baɪ/","cache":"/kæʃ/","calendar":"/ˈkæləndər/","car":"/kɑr/","care":"/ker/","careful":"/ˈkerfəl/","carpet":"/ˈkɑrpət/","case":"/keɪs/","casual":"/ˈkæʒəwəl/","cat":"/kæt/","center":"/ˈsentər/","challenge":"/ˈtʃæləndʒ/","chamber":"/ˈtʃeɪmbər/","chance":"/tʃæns/","checkout":"/ˈtʃekˌaʊt/","cheer":"/tʃɪr/","cite":"/saɪt/","city":"/ˈsɪti/","clearance":"/ˈklɪrəns/","clickbait":"/ˈklɪkˌbeɪt/","clog":"/klɑɡ/","closer":"/ˈkloʊsər/","cloud":"/klaʊd/","club":"/klʌb/","coat":"/koʊt/","coincidence":"/koʊˈɪnsɪdəns/","color":"/ˈkʌlər/","comic":"/ˈkɑmɪk/","commit":"/kəˈmɪt/","company":"/ˈkʌmpəˌni/","compare":"/kəmˈper/","compensate":"/ˈkɑmpənˌseɪt/","competitive":"/kəmˈpetətɪv/","complement":"/ˈkɑmpləmənt/","completely":"/kəmˈplitli/","concert":"/ˈkɑnsərt/","conditioning":"/kənˈdɪʃənɪŋ/","confirm":"/kənˈfɜrm/","constructive":"/kənˈstrʌktɪv/","cool":"/kul/","coupon":"/ˈkuˌpɔn/","crack":"/kræk/","crave":"/kreɪv/","criticism":"/ˈkrɪtɪˌsɪzəm/","crowd":"/kraʊd/","curve":"/kɜrv/","dabble":"/ˈdæbəl/","dance":"/dæns/","decaf":"/ˈdiˌkæf/","defective":"/dɪˈfektɪv/","delete":"/dɪˈlit/","deliver":"/dɪˈlɪvər/","delivery":"/dɪˈlɪvəri/","dentist":"/ˈdentəst/","depend":"/dɪˈpend/","designer":"/dɪˈzaɪnər/","desk":"/desk/","dessert":"/dɪˈzɜrt/","detail":"/dɪˈteɪl/","dial":"/ˈdaɪəl/","direction":"/dəˈrekʃən/","dirty":"/ˈdɜrti/","discussion":"/dɪˈskʌʃən/","dishwasher":"/ˈdɪʃˌwɑʃər/","dm":"/ˌdiˈem/","dose":"/doʊs/","double":"/ˈdʌbəl/","download":"/ˈdaʊnˌloʊd/","drag":"/dræɡ/","drink":"/drɪŋk/","drop":"/drɑp/","drowsy":"/ˈdraʊzi/","dull":"/dʌl/","during":"/ˈdʊrɪŋ/","dutch":"/dʌtʃ/","echo":"/ˈekoʊ/","edged":"/edʒd/","effortless":"/ˈefərtləs/","egg":"/eɡ/","electricity":"/ɪˌlekˈtrɪsəti/","else":"/els/","empty":"/ˈempti/","end":"/end/","energy":"/ˈenərdʒi/","enjoy":"/ˌenˈdʒɔɪ/","enough":"/ɪˈnʌf/","ever":"/ˈevər/","exactly":"/ɪɡˈzæktli/","excited":"/ɪkˈsaɪtəd/","excuse":"/ɪkˈskjuz/","exhausted":"/ɪɡˈzɔstɪd/","exit":"/ˈeɡzɪt/","expect":"/ɪkˈspekt/","expensive":"/ɪkˈspensɪv/","experience":"/ɪkˈspɪriəns/","extend":"/ɪkˈstend/","extra":"/ˈekstrə/","face":"/feɪs/","factor":"/ˈfæktər/","fail":"/feɪl/","fair":"/fer/","fake":"/feɪk/","fall":"/fɔl/","familiar":"/fəˈmɪljər/","family":"/ˈfæməli/","fast":"/fæst/","faucet":"/ˈfɔsət/","fault":"/fɔlt/","favorite":"/ˈfeɪvərɪt/","fed":"/fed/","fee":"/fi/","festival":"/ˈfestəvəl/","figure":"/ˈfɪɡjər/","fill":"/fɪl/","final":"/ˈfaɪnəl/","fine":"/faɪn/","finger":"/ˈfɪŋɡər/","finish":"/ˈfɪnɪʃ/","fishing":"/ˈfɪʃɪŋ/","five":"/faɪv/","fixer":"/ˈfɪksər/","flavor":"/ˈfleɪvər/","flu":"/flu/","follower":"/ˈfɑloʊər/","foot":"/fʊt/","four":"/fɔr/","fresh":"/freʃ/","fridge":"/frɪdʒ/","fries":"/fraɪz/","furniture":"/ˈfɜrnɪtʃər/","gate":"/ɡeɪt/","give":"/ɡɪv/","glad":"/ɡlæd/","grade":"/ɡreɪd/","grateful":"/ˈɡreɪtfəl/","groceries":"/ˈɡroʊsəriz/","ground":"/ɡraʊnd/","hack":"/hæk/","half":"/hæf/","halfway":"/ˈhæfˈweɪ/","hang":"/hæŋ/","happen":"/ˈhæpən/","hard":"/hɑrd/","hate":"/heɪt/","headline":"/ˈhedˌlaɪn/","heat":"/hit/","hello":"/həˈloʊ/","high":"/haɪ/","himself":"/hɪmˈself/","hole":"/hoʊl/","homebody":"/ˈhoʊmˌbɑdi/","hospital":"/ˈhɑˌspɪtəl/","hotel":"/hoʊˈtel/","house":"/haʊs/","huge":"/hjudʒ/","idea":"/aɪˈdiə/","influencer":"/ˈɪnfluənsər/","inside":"/ˌɪnˈsaɪd/","installment":"/ˌɪnˈstɔlmənt/","instead":"/ˌɪnˈsted/","interest":"/ˈɪntrəst/","interrupt":"/ˌɪntəˈrʌpt/","itchy":"/ˈɪtʃi/","kid":"/kɪd/","knee":"/ni/","knit":"/nɪt/","korea":"/kəˈriə/","laid":"/leɪd/","laptop":"/ˈlæpˌtɑp/","large":"/lɑrdʒ/","latte":"/ˈlɑteɪ/","layover":"/ˈleɪˌoʊvər/","leg":"/leɡ/","library":"/ˈlaɪbreˌri/","lifestyle":"/ˈlaɪfˌstaɪl/","lifetime":"/ˈlaɪfˌtaɪm/","limit":"/ˈlɪmət/","line":"/laɪn/","listen":"/ˈlɪsən/","listener":"/ˈlɪsənər/","live":"/lɪv/","livestream":"/ˈlaɪvˌstrim/","load":"/loʊd/","log":"/lɔɡ/","loop":"/lup/","lose":"/luz/","low":"/loʊ/","lunch":"/lʌntʃ/","lunchtime":"/ˈlʌntʃˌtaɪm/","main":"/meɪn/","marathon":"/ˈmerəˌθɑn/","math":"/mæθ/","medication":"/ˌmedəˈkeɪʃən/","memory":"/ˈmeməri/","mention":"/ˈmenʃən/","mess":"/mes/","mind":"/maɪnd/","mold":"/moʊld/","mom":"/mɑm/","monday":"/ˈmʌndi/","money":"/ˈmʌni/","month":"/mʌnθ/","motivated":"/ˈmoʊtəˌveɪtəd/","muscle":"/ˈmʌsəl/","museum":"/mjuˈziəm/","nap":"/næp/","napkin":"/ˈnæpkɪn/","nature":"/ˈneɪtʃər/","near":"/nɪr/","nearby":"/ˈnɪrˈbaɪ/","needle":"/ˈnidəl/","neighborhood":"/ˈneɪbərˌhʊd/","neither":"/ˈniðər/","never":"/ˈnevər/","news":"/nuz/","nighter":"/ˈnaɪtər/","nightmare":"/ˈnaɪtˌmer/","nine":"/naɪn/","nobody":"/ˈnoʊˌbɑˌdi/","nose":"/noʊz/","note":"/noʊt/","notice":"/ˈnoʊtəs/","notification":"/ˌnoʊtəfəˈkeɪʃən/","oat":"/oʊt/","obsessed":"/əbˈsest/","office":"/ˈɔfɪs/","okay":"/ˌoʊˈkeɪ/","once":"/wʌns/","onion":"/ˈʌnjən/","opportunity":"/ˌɑpərˈtunəti/","outdoors":"/ˈaʊtˈdɔrz/","overcharge":"/ˌoʊvərˈtʃɑrdʒ/","overcook":"/ˌoʊvərˈkʊk/","overrate":"/ˌoʊvərˈreɪt/","overshare":"/ˌoʊvərˈʃer/","paint":"/peɪnt/","painting":"/ˈpeɪntɪŋ/","park":"/pɑrk/","party":"/ˈpɑrti/","passport":"/ˈpæˌspɔrt/","pasta":"/ˈpɑstə/","pdf":"/ˌpidiˈef/","perfectionist":"/pərˈfekʃənəst/","person":"/ˈpɜrsən/","personally":"/ˈpɜrsənəli/","pet":"/pet/","phishing":"/ˈfɪʃɪŋ/","piano":"/piˈænoʊ/","pleasantly":"/ˈplezəntli/","plumber":"/ˈplʌmər/","podcast":"/ˈpɑdˌkæst/","pop":"/pɑp/","popular":"/ˈpɑpjələr/","portion":"/ˈpɔrʃən/","potential":"/pəˈtenʃəl/","prefer":"/prəˈfɜr/","presentation":"/ˌprezənˈteɪʃən/","pressure":"/ˈpreʃər/","pretty":"/ˈprɪti/","pricey":"/ˈpraɪsi/","print":"/prɪnt/","printer":"/ˈprɪntər/","prioritize":"/praɪˈɔrəˌtaɪz/","privacy":"/ˈpraɪvəsi/","probably":"/ˈprɑbəˌbli/","problem":"/ˈprɑbləm/","procrastinate":"/prəˈkræstəˌneɪt/","professor":"/prəˈfesər/","proud":"/praʊd/","pull":"/pʊl/","quality":"/ˈkwɑləti/","quick":"/kwɪk/","quiet":"/ˈkwaɪət/","rabbit":"/ˈræbət/","rain":"/reɪn/","rash":"/ræʃ/","rearrange":"/ˌriəˈreɪndʒ/","reception":"/rɪˈsepʃən/","recognize":"/ˈrekəɡˌnaɪz/","recur":"/rɪˈkɜr/","recycling":"/riˈsaɪkəlɪŋ/","relationship":"/rɪˈleɪʃənˌʃɪp/","relieve":"/rɪˈliv/","relieved":"/rɪˈlivd/","relocate":"/ˌriˈloʊkeɪt/","remote":"/rɪˈmoʊt/","repair":"/rɪˈper/","repeat":"/rɪˈpit/","rephrase":"/riˈfreɪz/","reply":"/rɪˈplaɪ/","report":"/riˈpɔrt/","reset":"/riˈset/","resource":"/ˈrisɔrs/","respect":"/rɪˈspekt/","respectfully":"/rɪˈspektfəli/","rest":"/rest/","restaurant":"/ˈrestəˌrɑnt/","result":"/rɪˈzʌlt/","rich":"/rɪtʃ/","roommate":"/ˈruˌmeɪt/","round":"/raʊnd/","route":"/rut/","rule":"/rul/","runny":"/ˈrʌni/","safe":"/seɪf/","salad":"/ˈsæləd/","salary":"/ˈsæləri/","saturday":"/ˈsætərdi/","scared":"/skerd/","scenic":"/ˈsinɪk/","scholarship":"/ˈskɑlərˌʃɪp/","selfie":"/ˈselfi/","sell":"/sel/","sensitive":"/ˈsensətɪv/","seoul":"/soʊl/","series":"/ˈsɪriz/","set":"/set/","setting":"/ˈsetɪŋ/","settle":"/ˈsetəl/","sharp":"/ʃɑrp/","ship":"/ʃɪp/","shipping":"/ˈʃɪpɪŋ/","shirt":"/ʃɜrt/","shoestring":"/ˈʃuˌstrɪŋ/","shower":"/ˈʃaʊər/","shut":"/ʃʌt/","sidetrack":"/ˈsaɪdˌtræk/","sight":"/saɪt/","sim":"/sɪm/","simple":"/ˈsɪmpəl/","sing":"/sɪŋ/","sit":"/sɪt/","situation":"/ˌsɪtʃuˈeɪʃən/","six":"/sɪks/","ski":"/ski/","skin":"/skɪn/","smoke":"/smoʊk/","somewhere":"/ˈsʌmˌwer/","song":"/sɔŋ/","source":"/sɔrs/","spare":"/sper/","sport":"/spɔrt/","spread":"/spred/","squeamish":"/ˈskwimɪʃ/","squeeze":"/skwiz/","stay":"/steɪ/","steal":"/stil/","steep":"/stip/","step":"/step/","straw":"/strɔ/","stream":"/strim/","stress":"/stres/","stressed":"/strest/","struggle":"/ˈstrʌɡəl/","stuck":"/stʌk/","stuff":"/stʌf/","stuffy":"/ˈstʌfi/","style":"/staɪl/","sugarcoat":"/ˈʃʊɡərˌkoʊt/","suggest":"/səˈdʒest/","summer":"/ˈsʌmər/","surgery":"/ˈsɜrdʒəri/","surprise":"/sərˈpraɪz/","surprised":"/sərˈpraɪzd/","swap":"/swɑp/","sweet":"/swit/","swelling":"/ˈswelɪŋ/","switch":"/swɪtʃ/","sword":"/sɔrd/","tailor":"/ˈteɪlər/","takeout":"/ˈteɪˌkaʊt/","talker":"/ˈtɔkər/","teach":"/titʃ/","tell":"/tel/","tend":"/tend/","tennis":"/ˈtenəs/","tentative":"/ˈtentətɪv/","term":"/tɜrm/","therapeutic":"/ˌθerəˈpjutɪk/","thesis":"/ˈθisəs/","thought":"/θɔt/","throw":"/θroʊ/","tight":"/taɪt/","tip":"/tɪp/","together":"/təˈɡeðər/","tongue":"/tʌŋ/","toothache":"/ˈtuθˌeɪk/","tourist":"/ˈtʊrəst/","towel":"/ˈtaʊəl/","track":"/træk/","traffic":"/ˈtræfɪk/","trap":"/træp/","travel":"/ˈtrævəl/","treat":"/trit/","treatment":"/ˈtritmənt/","trip":"/trɪp/","tuesday":"/ˈtuzdi/","tv":"/ˌtiˈvi/","twelve":"/twelv/","unless":"/ənˈles/","upper":"/ˈʌpər/","urgent":"/ˈɜrdʒənt/","use":"/juz/","usual":"/ˈjuʒəwəl/","usually":"/ˈjuʒuəli/","vacuum":"/ˈvækjum/","violin":"/vaɪəˈlɪn/","voice":"/vɔɪs/","waive":"/weɪv/","wake":"/weɪk/","wall":"/wɔl/","wallet":"/ˈwɔlət/","warm":"/wɔrm/","washable":"/ˈwɑʃəbəl/","weakness":"/ˈwiknəs/","website":"/ˈwebˌsaɪt/","weigh":"/weɪ/","weight":"/weɪt/","welcome":"/ˈwelkəm/","whether":"/ˈweðər/","while":"/waɪl/","wit":"/wɪt/","worse":"/wɜrs/","write":"/raɪt/","yesterday":"/ˈjestərˌdeɪ/","zipper":"/ˈzɪpər/"});
/* phase 4 headwords (tools/ipa.py) */
Object.assign(IPA, {"bookstore":"/ˈbʊkˌstɔr/","humidity":"/hjuˈmɪdəti/","aback":"/əˈbæk/","accent":"/əkˈsent/","accommodate":"/əˈkɑməˌdeɪt/","achievement":"/əˈtʃivmənt/","acquired":"/əˈkwaɪərd/","act":"/ækt/","addictive":"/əˈdɪktɪv/","admit":"/ədˈmɪt/","advance":"/ədˈvæns/","advertise":"/ˈædvərˌtaɪz/","age":"/eɪdʒ/","ahead":"/əˈhed/","aim":"/eɪm/","along":"/əˈlɔŋ/","already":"/ɔlˈredi/","ambitious":"/æmˈbɪʃəs/","amplify":"/ˈæmpləˌfaɪ/","apology":"/əˈpɑləˌdʒi/","area":"/ˈeriə/","argue":"/ˈɑrɡju/","aside":"/əˈsaɪd/","assistant":"/əˈsɪstənt/","assumption":"/əˈsʌmpʃən/","atmosphere":"/ˈætməsˌfɪr/","author":"/ˈɔθər/","availability":"/əˌveɪləˈbɪləti/","barring":"/ˈbɑrɪŋ/","become":"/bɪˈkʌm/","begin":"/bɪˈɡɪn/","benefit":"/ˈbenəfɪt/","blunt":"/blʌnt/","blur":"/blɜr/","bog":"/bɑɡ/","bookshop":"/ˈbʊkˌʃɑp/","brain":"/breɪn/","broad":"/brɔd/","broaden":"/ˈbrɔdən/","browse":"/braʊz/","brunch":"/brʌntʃ/","burn":"/bɜrn/","caffeine":"/kæˈfin/","capacity":"/kəˈpæsəti/","cause":"/kɑz/","cell":"/sel/","changer":"/ˈtʃeɪndʒər/","character":"/ˈkerɪktər/","chest":"/tʃest/","chronic":"/ˈkrɑnɪk/","circumstance":"/ˈsɜrkəmˌstæns/","claim":"/kleɪm/","client":"/ˈklaɪənt/","clutter":"/ˈklʌtər/","coach":"/koʊtʃ/","coherently":"/koʊˈhirəntli/","collect":"/kəˈlekt/","comfort":"/ˈkʌmfərt/","common":"/ˈkɑmən/","compensation":"/ˌkɑmpənˈseɪʃən/","concern":"/kənˈsɜrn/","conclusion":"/kənˈkluʒən/","condition":"/kənˈdɪʃən/","conference":"/ˈkɑnfərəns/","connection":"/kəˈnekʃən/","constantly":"/ˈkɑnstəntli/","context":"/ˈkɑntekst/","convenient":"/kənˈvinjənt/","coordinate":"/koʊˈɔrdənət/","correct":"/kəˈrekt/","cost":"/kɑst/","cozy":"/ˈkoʊzi/","cramped":"/kræmpt/","creative":"/kriˈeɪtɪv/","cross":"/krɔs/","cure":"/kjʊr/","curse":"/kɜrs/","customer":"/ˈkʌstəmər/","damp":"/dæmp/","data":"/ˈdeɪtə/","debate":"/dəˈbeɪt/","decision":"/dɪˈsɪʒən/","dermatologist":"/ˌdɜrməˈtɑlədʒɪst/","description":"/dɪˈskrɪpʃən/","diet":"/ˈdaɪət/","disappear":"/ˌdɪsəˈpɪr/","discuss":"/dɪˈskʌs/","distort":"/dɪˈstɔrt/","dosage":"/ˈdoʊsədʒ/","downs":"/daʊnz/","draft":"/dræft/","drug":"/drʌɡ/","economy":"/ɪˈkɑnəmi/","efficient":"/ɪˈfɪʃənt/","eight":"/eɪt/","eleven":"/ɪˈlevən/","entirely":"/ɪnˈtaɪərli/","environment":"/ɪnˈvaɪrənmənt/","escalate":"/ˈeskəˌleɪt/","estimate":"/ˈestəmət/","evening":"/ˈivnɪŋ/","evidence":"/ˈevədəns/","exercise":"/ˈeksərˌsaɪz/","expectation":"/ˌekspekˈteɪʃən/","extent":"/ɪkˈstent/","fact":"/fækt/","fairly":"/ˈferli/","false":"/fɔls/","fancy":"/ˈfænsi/","fascinating":"/ˈfæsəˌneɪtɪŋ/","faulty":"/ˈfɔlti/","fifteen":"/fɪfˈtin/","flag":"/flæɡ/","flare":"/fler/","flexibility":"/ˌfleksəˈbɪləti/","flexible":"/ˈfleksəbəl/","focus":"/ˈfoʊkəs/","force":"/fɔrs/","formal":"/ˈfɔrməl/","frankly":"/ˈfræŋkli/","freak":"/frik/","fully":"/ˈfʊli/","fuss":"/fʌs/","gap":"/ɡæp/","garage":"/ɡəˈrɑʒ/","gear":"/ɡɪr/","given":"/ˈɡɪvən/","gluten":"/ˈɡlutən/","gradually":"/ˈɡrædʒuəli/","graduate":"/ˈɡrædʒəwət/","grounding":"/ˈɡraʊndɪŋ/","hassle":"/ˈhæsəl/","helpful":"/ˈhelpfəl/","highlight":"/ˈhaɪˌlaɪt/","hit":"/hɪt/","hope":"/hoʊp/","hopelessly":"/ˈhoʊpləsli/","hustle":"/ˈhʌsəl/","hype":"/haɪp/","ideal":"/aɪˈdil/","ignore":"/ˌɪɡˈnɔr/","impact":"/ˌɪmˈpækt/","impersonal":"/ˌɪmˈpɜrsənəl/","impossible":"/ˌɪmˈpɑsəbəl/","impress":"/ˌɪmˈpres/","improve":"/ˌɪmˈpruv/","inadequate":"/ˌɪˈnædəkwət/","inclined":"/ˌɪnˈklaɪnd/","increasingly":"/ɪnˈkrisɪŋli/","incredibly":"/ɪnˈkredəbli/","insensitive":"/ˌɪnˈsensətɪv/","intentional":"/ˌɪnˈtenʃənəl/","intermittent":"/ˌɪntərˈmɪtənt/","introduce":"/ˌɪntrəˈdus/","invest":"/ˌɪnˈvest/","invite":"/ˌɪnˈvaɪt/","issue":"/ˈɪʃu/","itinerary":"/aɪˈtɪnəˌreri/","jack":"/dʒæk/","jump":"/dʒʌmp/","justify":"/ˈdʒʌstəˌfaɪ/","keen":"/kin/","knockoff":"/ˈnɑkˌɔf/","league":"/liɡ/","leeway":"/ˈliˌweɪ/","level":"/ˈlevəl/","liking":"/ˈlaɪkɪŋ/","linger":"/ˈlɪŋɡər/","list":"/lɪst/","location":"/loʊˈkeɪʃən/","lodge":"/lɑdʒ/","lovely":"/ˈlʌvli/","loyal":"/ˈlɔɪəl/","manage":"/ˈmænədʒ/","manipulate":"/məˈnɪpjəˌleɪt/","mark":"/mɑrk/","master":"/ˈmæstər/","matter":"/ˈmætər/","memorize":"/ˈmeməˌraɪz/","merit":"/ˈmerət/","methodology":"/ˌmeθəˈdɑlədʒi/","mindful":"/ˈmaɪndfəl/","minimum":"/ˈmɪnəməm/","mix":"/mɪks/","model":"/ˈmɑdəl/","nag":"/næɡ/","narrow":"/ˈneroʊ/","neat":"/nit/","non":"/nɑn/","none":"/nʌn/","novelty":"/ˈnɑvəlti/","obsession":"/əbˈseʃən/","offer":"/ˈɔfər/","opener":"/ˈoʊpənər/","others":"/ˈʌðərz/","otherwise":"/ˈʌðərˌwaɪz/","outline":"/ˈaʊtˌlaɪn/","outrage":"/ˈaʊˌtreɪdʒ/","outweigh":"/aʊtˈweɪ/","overpriced":"/ˈoʊvərˌpraɪst/","overreact":"/ˈoʊvərriˈækt/","oversee":"/ˈoʊvərˌsi/","owl":"/aʊl/","owner":"/ˈoʊnər/","ownership":"/ˈoʊnərˌʃɪp/","pace":"/peɪs/","pairing":"/ˈperɪŋ/","part":"/pɑrt/","past":"/pæst/","peak":"/pik/","perspective":"/pərˈspektɪv/","pile":"/paɪl/","plateau":"/plæˈtoʊ/","pleasant":"/ˈplezənt/","pocket":"/ˈpɑkət/","possibility":"/ˌpɑsəˈbɪləˌti/","possibly":"/ˈpɑsəbli/","postpone":"/poʊstˈpoʊn/","prescribe":"/prəˈskraɪb/","prevention":"/prɪˈvenʃən/","previous":"/ˈpriviəs/","principle":"/ˈprɪnsəpəl/","priority":"/praɪˈɔrəti/","procedure":"/prəˈsidʒər/","process":"/ˈprɑˌses/","promise":"/ˈprɑməs/","proper":"/ˈprɑpər/","provided":"/prəˈvaɪdɪd/","provoke":"/prəˈvoʊk/","pushy":"/ˈpʊʃi/","put":"/pʊt/","quote":"/kwoʊt/","raise":"/reɪz/","reach":"/ritʃ/","realize":"/ˈriəˌlaɪz/","reassess":"/riəˈses/","reconfirm":"/ˌrikənˈfɜrm/","recovery":"/rɪˈkʌvri/","redecorate":"/riˈdekəˌreɪt/","rediscover":"/ridɪˈskʌvər/","referral":"/rɪˈfʌrəl/","reflection":"/rɪˈflekʃən/","regular":"/ˈreɡjələr/","related":"/rɪˈleɪtɪd/","reliable":"/rɪˈlaɪəbəl/","remember":"/rɪˈmembər/","renovation":"/ˌrenəˈveɪʃən/","research":"/riˈsɜrtʃ/","responsible":"/riˈspɑnsəbəl/","retail":"/ˈriˌteɪl/","review":"/ˌriˈvju/","revisit":"/riˈvɪzɪt/","rid":"/rɪd/","risk":"/rɪsk/","road":"/roʊd/","role":"/roʊl/","rollercoaster":"/ˈroʊlərˌkoʊstər/","rollout":"/ˈroʊˌlaʊt/","roof":"/ruf/","rough":"/rʌf/","routine":"/ruˈtin/","rush":"/rʌʃ/","say":"/seɪ/","school":"/skul/","season":"/ˈsizən/","secondhand":"/ˈsekəndˌhænd/","see":"/si/","separately":"/ˈsepərətli/","serve":"/sɜrv/","skip":"/skɪp/","soak":"/soʊk/","solo":"/ˈsoʊˌloʊ/","sort":"/sɔrt/","spark":"/spɑrk/","sparkling":"/ˈspɑrklɪŋ/","specialist":"/ˈspeʃələst/","specific":"/spəˈsɪfɪk/","spur":"/spɜr/","statistics":"/stəˈtɪstɪks/","stick":"/stɪk/","sting":"/stɪŋ/","streamline":"/ˈstrimˌlaɪn/","structure":"/ˈstrʌktʃər/","subject":"/səbˈdʒekt/","submit":"/səbˈmɪt/","subtle":"/ˈsʌtəl/","success":"/səkˈses/","suggestion":"/səˈdʒestʃən/","summarize":"/ˈsʌməˌraɪz/","surprisingly":"/sərˈpraɪzɪŋli/","suspect":"/səˈspekt/","tackle":"/ˈtækəl/","tangible":"/ˈtændʒəbəl/","taste":"/teɪst/","tasting":"/ˈteɪstɪŋ/","team":"/tim/","technology":"/tekˈnɑlədʒi/","therapy":"/ˈθerəpi/","thread":"/θred/","thrilled":"/θrɪld/","thrive":"/θraɪv/","timeline":"/ˈtaɪmlaɪn/","tone":"/toʊn/","topic":"/ˈtɑpɪk/","toward":"/təˈwɔrd/","town":"/taʊn/","trade":"/treɪd/","trail":"/treɪl/","trek":"/trek/","tricky":"/ˈtrɪki/","understated":"/ˌʌndərˈsteɪtɪd/","unfollow":"/ʌnˈfɑloʊ/","ups":"/ʌps/","valid":"/ˈvælɪd/","view":"/vju/","wary":"/ˈweri/","wear":"/wer/","whatever":"/ˌwʌˈtevər/","whenever":"/weˈnevər/","whim":"/wɪm/","whole":"/hoʊl/","willing":"/ˈwɪlɪŋ/","winter":"/ˈwɪntər/","wish":"/wɪʃ/","wonder":"/ˈwʌndər/","zone":"/zoʊn/"});
/* phase 5 headwords (tools/ipa.py) */
Object.assign(IPA, {"abandon":"/əˈbændən/","ability":"/əˈbɪləˌti/","above":"/əˈbʌv/","absence":"/ˈæbsəns/","absolute":"/ˈæbsəˌlut/","absolutely":"/ˌæbsəˈlutli/","abuse":"/əˈbjus/","academic":"/ˌækəˈdemɪk/","accept":"/ækˈsept/","access":"/ˈækˌses/","accident":"/ˈæksədənt/","according":"/əˈkɔrdɪŋ/","accounting":"/əˈkaʊntɪŋ/","accurate":"/ˈækjərət/","accuse":"/əˈkjuz/","achieve":"/əˈtʃiv/","acid":"/ˈæsəd/","acquire":"/əˈkwaɪər/","action":"/ˈækʃən/","active":"/ˈæktɪv/","activity":"/ækˈtɪvəti/","actor":"/ˈæktər/","actress":"/ˈæktrəs/","actual":"/ˈæktʃəwəl/","actually":"/ˈækˌtʃuəli/","addition":"/əˈdɪʃən/","additional":"/əˈdɪʃənəl/","administration":"/ædˌmɪnɪˈstreɪʃən/","administrative":"/ədˈmɪnəˌstreɪtɪv/","adopt":"/əˈdɑpt/","adult":"/əˈdʌlt/","advantage":"/ædˈvæntɪdʒ/","adventure":"/ædˈventʃər/","advice":"/ædˈvaɪs/","affair":"/əˈfer/","afford":"/əˈfɔrd/","afterwards":"/ˈæftərwərdz/","aged":"/eɪdʒd/","agency":"/ˈeɪdʒənsi/","agent":"/ˈeɪdʒənt/","aggressive":"/əˈɡresɪv/","agreement":"/əˈɡrimənt/","agricultural":"/ˌæɡrəˈkʌltʃərəl/","agriculture":"/ˈæɡrɪˌkʌltʃər/","aid":"/eɪd/","aircraft":"/ˈerˌkræft/","album":"/ˈælbəm/","alert":"/əˈlɜrt/","alive":"/əˈlaɪv/","allege":"/əˈledʒ/","alongside":"/əˈlɔŋˈsaɪd/","alright":"/ˌɔlˈraɪt/","alternative":"/ɔlˈtɜrnətɪv/","amendment":"/əˈmendmənt/","amount":"/əˈmaʊnt/","analysis":"/əˈnæləsəs/","ancient":"/ˈeɪntʃənt/","angel":"/ˈeɪndʒəl/","anger":"/ˈæŋɡər/","animal":"/ˈænəməl/","anniversary":"/ˌænəˈvɜrsəri/","announce":"/əˈnaʊns/","announcement":"/əˈnaʊnsmənt/","annoying":"/əˈnɔɪɪŋ/","annual":"/ˈænjuəl/","anxiety":"/æŋˈzaɪəti/","anymore":"/ˌeniˈmɔr/","apart":"/əˈpɑrt/","apparent":"/əˈperənt/","apparently":"/əˈperəntli/","appeal":"/əˈpil/","appear":"/əˈpɪr/","appearance":"/əˈpɪrəns/","apple":"/ˈæpəl/","application":"/ˌæpləˈkeɪʃən/","appoint":"/əˈpɔɪnt/","appropriate":"/əˈproʊpriət/","approval":"/əˈpruvəl/","approve":"/əˈpruv/","approximately":"/əˈprɑksəmətli/","architecture":"/ˈɑrkəˌtektʃər/","arena":"/əˈrinə/","army":"/ˈɑrmi/","arrange":"/əˈreɪndʒ/","arrest":"/əˈrest/","arrival":"/əˈraɪvəl/","art":"/ɑrt/","article":"/ˈɑrtəkəl/","artist":"/ˈɑrtəst/","asleep":"/əˈslip/","aspect":"/ˈæˌspekt/","assault":"/əˈsɔlt/","assessment":"/əˈsesmənt/","asset":"/ˈæˌset/","assign":"/əˈsaɪn/","assist":"/əˈsɪst/","assistance":"/əˈsɪstəns/","associate":"/əˈsoʊʃiˌeɪt/","assume":"/əˈsum/","athlete":"/ˈæθˌlit/","attach":"/əˈtætʃ/","attack":"/əˈtæk/","attempt":"/əˈtempt/","attend":"/əˈtend/","attention":"/əˈtenʃən/","attitude":"/ˈætəˌtud/","attorney":"/əˈtɜrni/","attract":"/əˈtrækt/","attractive":"/əˈtræktɪv/","audio":"/ˈɑdiˌoʊ/","australian":"/ɔˈstreɪljən/","authority":"/əˈθɔrəti/","auto":"/ˈɔtoʊ/","automatic":"/ˌɔtəˈmætɪk/","automatically":"/ˌɔtəˈmætɪkli/","avenue":"/ˈævəˌnu/","average":"/ˈævərɪdʒ/","award":"/əˈwɔrd/","aware":"/əˈwer/","awareness":"/əˈwernəs/","awesome":"/ˈɑsəm/","awful":"/ˈɑfəl/","awkward":"/ˈɑkwərd/","baby":"/ˈbeɪbi/","background":"/ˈbækˌɡraʊnd/","badly":"/ˈbædli/","ball":"/bɔl/","ban":"/bæn/","band":"/bænd/","bank":"/bæŋk/","banking":"/ˈbæŋkɪŋ/","bar":"/bɑr/","barely":"/ˈberli/","baseball":"/ˈbeɪsˈbɔl/","basic":"/ˈbeɪsɪk/","basically":"/ˈbeɪsɪkli/","basis":"/ˈbeɪsəs/","basketball":"/ˈbæskətˌbɔl/","bat":"/bæt/","bath":"/bæθ/","battle":"/ˈbætəl/","bear":"/ber/","beast":"/bist/","beautiful":"/ˈbjutəfəl/","beauty":"/ˈbjuti/","bedroom":"/ˈbeˌdrum/","beef":"/bif/","beer":"/bɪr/","behalf":"/bɪˈhæf/","behavior":"/bɪˈheɪvjər/","belief":"/bɪˈlif/","belong":"/bɪˈlɔŋ/","bench":"/bentʃ/","besides":"/bɪˈsaɪdz/","bid":"/bɪd/","bike":"/baɪk/","bind":"/baɪnd/","bird":"/bɜrd/","birth":"/bɜrθ/","birthday":"/ˈbɜrθˌdeɪ/","blame":"/bleɪm/","blast":"/blæst/","blind":"/blaɪnd/","block":"/blɑk/","body":"/ˈbɑdi/","bomb":"/bɑm/","bond":"/bɑnd/","bone":"/boʊn/","bonus":"/ˈboʊnəs/","boom":"/bum/","boost":"/bust/","boot":"/but/","border":"/ˈbɔrdər/","boss":"/bɑs/","bother":"/ˈbɑðər/","bottle":"/ˈbɑtəl/","bottom":"/ˈbɑtəm/","bow":"/baʊ/","boy":"/bɔɪ/","boyfriend":"/ˈbɔɪˌfrend/","branch":"/bræntʃ/","brave":"/breɪv/","bread":"/bred/","brief":"/brif/","british":"/ˈbrɪtɪʃ/","brother":"/ˈbrʌðər/","bull":"/bʊl/","bunch":"/bʌntʃ/","bury":"/ˈberi/","butter":"/ˈbʌtər/","cable":"/ˈkeɪbəl/","cake":"/keɪk/","calm":"/kɑm/","campaign":"/kæmˈpeɪn/","campus":"/ˈkæmpəs/","cancer":"/ˈkænsər/","candidate":"/ˈkændədeɪt/","candy":"/ˈkændi/","cap":"/kæp/","capable":"/ˈkeɪpəbəl/","cape":"/keɪp/","capital":"/ˈkæpətəl/","captain":"/ˈkæptən/","capture":"/ˈkæptʃər/","carbon":"/ˈkɑrbən/","career":"/kəˈrɪr/","carefully":"/ˈkerfəli/","carrier":"/ˈkæriər/","carry":"/ˈkæri/","cast":"/kæst/","category":"/ˈkætəˌɡɔri/","celebration":"/ˌseləˈbreɪʃən/","celebrity":"/səˈlebrɪti/","cent":"/sent/","central":"/ˈsentrəl/","century":"/ˈsentʃəri/","ceremony":"/ˈserəˌmoʊni/","certain":"/ˈsɜrtən/","certainly":"/ˈsɜrtənli/","certificate":"/sərˈtɪfɪkət/","chain":"/tʃeɪn/","chair":"/tʃer/","chairman":"/ˈtʃermən/","champion":"/ˈtʃæmpiən/","championship":"/ˈtʃæmpiənˌʃɪp/","chapter":"/ˈtʃæptər/","characteristic":"/ˌkerəktəˈrɪstɪk/","charity":"/ˈtʃerɪti/","chase":"/tʃeɪs/","chemistry":"/ˈkeməstri/","chicken":"/ˈtʃɪkən/","chief":"/tʃif/","child":"/tʃaɪld/","childhood":"/ˈtʃaɪldˌhʊd/","chip":"/tʃɪp/","chocolate":"/ˈtʃɔklət/","choice":"/tʃɔɪs/","choose":"/tʃuz/","church":"/tʃɜrtʃ/","circuit":"/ˈsɜrkət/","citizen":"/ˈsɪtəzən/","civil":"/ˈsɪvəl/","classic":"/ˈklæsɪk/","clay":"/kleɪ/","climate":"/ˈklaɪmət/","clinical":"/ˈklɪnəkəl/","clock":"/klɑk/","closely":"/ˈkloʊsli/","closing":"/ˈkloʊzɪŋ/","clothes":"/kloʊðz/","clothing":"/ˈkloʊðɪŋ/","coal":"/koʊl/","code":"/koʊd/","collaboration":"/kəˌlæbəˈreɪʃən/","colleague":"/ˈkɑliɡ/","collection":"/kəˈlekʃən/","collective":"/kəˈlektɪv/","college":"/ˈkɑlɪdʒ/","column":"/ˈkɑləm/","combat":"/kəmˈbæt/","combination":"/ˌkɑmbəˈneɪʃən/","combine":"/ˈkɑmbaɪn/","comedy":"/ˈkɑmədi/","comfortable":"/ˈkʌmfərtəbəl/","command":"/kəˈmænd/","commerce":"/ˈkɑmərs/","commercial":"/kəˈmɜrʃəl/","commissioner":"/kəˈmɪʃənər/","commitment":"/kəˈmɪtmənt/","committee":"/kəˈmɪti/","commonly":"/ˈkɑmənli/","communication":"/kəˌmjunəˈkeɪʃən/","community":"/kəˈmjunəti/","comparison":"/kəmˈperəsən/","compete":"/kəmˈpit/","competition":"/ˌkɑmpəˈtɪʃən/","complete":"/kəmˈplit/","complex":"/ˈkɑmpleks/","complicated":"/ˈkɑmpləˌkeɪtəd/","component":"/kəmˈpoʊnənt/","composition":"/ˌkɑmpəˈzɪʃən/","computer":"/kəmˈpjutər/","concept":"/ˈkɑnsept/","conclude":"/kənˈklud/","concrete":"/kənˈkrit/","conduct":"/kənˈdʌkt/","confidence":"/ˈkɑnfədəns/","confident":"/ˈkɑnfədənt/","conflict":"/ˈkɑnflɪkt/","confuse":"/kənˈfjuz/","congratulations":"/kənˌɡrætʃəˈleɪʃənz/","consent":"/kənˈsent/","consequence":"/ˈkɑnsəkwəns/","conservation":"/ˌkɑnsərˈveɪʃən/","conservative":"/kənˈsɜrvətɪv/","consideration":"/kənˌsɪdəˈreɪʃən/","consist":"/kənˈsɪst/","consistent":"/kənˈsɪstənt/","constant":"/ˈkɑnstənt/","constitution":"/ˌkɑnstəˈtuʃən/","constitutional":"/ˌkɑnstəˈtuʃənəl/","construct":"/kənˈstrʌkt/","construction":"/kənˈstrʌkʃən/","consumer":"/kənˈsumər/","consumption":"/kənˈsʌmpʃən/","contact":"/ˈkɑnˌtækt/","contain":"/kənˈteɪn/","content":"/ˈkɑntent/","contest":"/ˈkɑntest/","continue":"/kənˈtɪnju/","contract":"/ˈkɑnˌtrækt/","contrast":"/ˈkɑntræst/","contribute":"/kənˈtrɪbjut/","contribution":"/ˌkɑntrəˈbjuʃən/","control":"/kənˈtroʊl/","convention":"/kənˈvenʃən/","convince":"/kənˈvɪns/","cooperation":"/koʊˌɑpəˈreɪʃən/","cop":"/kɑp/","copy":"/ˈkɑpi/","core":"/kɔr/","corner":"/ˈkɔrnər/","corporate":"/ˈkɔrpərət/","corporation":"/ˌkɔrpəˈreɪʃən/","corruption":"/kəˈrʌpʃən/","cotton":"/ˈkɑtən/","count":"/kaʊnt/","country":"/ˈkʌntri/","courage":"/ˈkʌrədʒ/","course":"/kɔrs/","court":"/kɔrt/","coverage":"/ˈkʌvərədʒ/","craft":"/kræft/","crazy":"/ˈkreɪzi/","cream":"/krim/","create":"/kriˈeɪt/","creation":"/kriˈeɪʃən/","credit":"/ˈkredət/","creek":"/krik/","crew":"/kru/","crime":"/kraɪm/","crisis":"/ˈkraɪsəs/","critic":"/ˈkrɪtɪk/","critical":"/ˈkrɪtɪkəl/","crucial":"/ˈkruʃəl/","cry":"/kraɪ/","cultural":"/ˈkʌltʃərəl/","culture":"/ˈkʌltʃər/","curious":"/ˈkjʊriəs/","currency":"/ˈkʌrənsi/","current":"/ˈkʌrənt/","currently":"/ˈkʌrəntli/","custom":"/ˈkʌstəm/","cute":"/kjut/","cycle":"/ˈsaɪkəl/","dad":"/dæd/","daddy":"/ˈdædi/","daily":"/ˈdeɪli/","danger":"/ˈdeɪndʒər/","dangerous":"/ˈdeɪndʒərəs/","dare":"/der/","dark":"/dɑrk/","darkness":"/ˈdɑrknəs/","database":"/ˈdeɪtəˌbeɪs/","daughter":"/ˈdɔtər/","dead":"/ded/","dear":"/dɪr/","death":"/deθ/","debt":"/det/","decade":"/deˈkeɪd/","decent":"/ˈdisənt/","deck":"/dek/","declare":"/dɪˈkler/","decline":"/dɪˈklaɪn/","dedicate":"/ˈdedəˌkeɪt/","deep":"/dip/","deeply":"/ˈdipli/","default":"/dɪˈfɔlt/","defeat":"/dɪˈfit/","defend":"/dɪˈfend/","defense":"/dɪˈfens/","define":"/dɪˈfaɪn/","definitely":"/ˈdefənətli/","definition":"/ˌdefəˈnɪʃən/","degree":"/dɪˈɡri/","demand":"/dɪˈmænd/","democracy":"/dɪˈmɑkrəsi/","democratic":"/ˌdeməˈkrætɪk/","density":"/ˈdensəti/","deny":"/dɪˈnaɪ/","dependent":"/dɪˈpendənt/","depression":"/dɪˈpreʃən/","depth":"/depθ/","deputy":"/ˈdepjəti/","derive":"/dəˈraɪv/","describe":"/dɪˈskraɪb/","deserve":"/dɪˈzɜrv/","design":"/dɪˈzaɪn/","desire":"/dɪˈzaɪər/","desperate":"/ˈdesprɪt/","destroy":"/dɪˈstrɔɪ/","destruction":"/dɪˈstrʌkʃən/","determine":"/dəˈtɜrmən/","develop":"/dɪˈveləp/","development":"/dɪˈveləpmənt/","device":"/dɪˈvaɪs/","dialogue":"/ˈdaɪəˌlɔɡ/","diamond":"/ˈdaɪmənd/","difficult":"/ˈdɪfəkəlt/","difficulty":"/ˈdɪfəkəlti/","directly":"/dəˈrektli/","director":"/dəˈrektər/","disable":"/dɪˈseɪbəl/","disappoint":"/ˌdɪsəˈpɔɪnt/","disaster":"/dɪˈzæstər/","discover":"/dɪˈskʌvər/","discrimination":"/dɪˌskrɪməˈneɪʃən/","disease":"/dɪˈziz/","disorder":"/dɪˈsɔrdər/","display":"/dɪˈspleɪ/","distinct":"/dɪˈstɪŋkt/","distribute":"/dɪˈstrɪbjut/","distribution":"/ˌdɪstrəˈbjuʃən/","district":"/ˈdɪstrɪkt/","diversity":"/dɪˈvɜrsɪti/","division":"/dɪˈvɪʒən/","divorce":"/dɪˈvɔrs/","document":"/ˈdɑkjəment/","documentary":"/ˌdɑkjəˈmentəri/","dollar":"/ˈdɑlər/","domain":"/doʊˈmeɪn/","domestic":"/dəˈmestɪk/","doubt":"/daʊt/","downtown":"/ˈdaʊnˈtaʊn/","dozen":"/ˈdʌzən/","dragon":"/ˈdræɡən/","drama":"/ˈdrɑmə/","dramatic":"/drəˈmætɪk/","dream":"/drim/","dress":"/dres/","drive":"/draɪv/","drunk":"/drʌŋk/","dry":"/draɪ/","dude":"/dud/","dumb":"/dʌm/","dust":"/dʌst/","duty":"/ˈduti/","dynamic":"/daɪˈnæmɪk/","earn":"/ɜrn/","earth":"/ɜrθ/","ease":"/iz/","economic":"/ˌekəˈnɑmɪk/","edge":"/edʒ/","edit":"/ˈedət/","editor":"/ˈedətər/","educate":"/ˈedʒəˌkeɪt/","education":"/ˌedʒəˈkeɪʃən/","educational":"/ˌedʒəˈkeɪʃənəl/","effective":"/ɪˈfektɪv/","effectively":"/ɪˈfektɪvli/","efficiency":"/ɪˈfɪʃənsi/","effort":"/ˈefərt/","either":"/ˈiðər/","elect":"/ɪˈlekt/","election":"/ɪˈlekʃən/","electrical":"/ɪˈlektrɪkəl/","electronic":"/ˌɪˌlekˈtrɑnɪk/","element":"/ˈeləmənt/","eligible":"/ˈelədʒəbəl/","elite":"/ɪˈlit/","elsewhere":"/ˈelˌswer/","emergency":"/ɪˈmɜrdʒənsi/","emotion":"/ɪˈmoʊʃən/","emotional":"/ɪˈmoʊʃənəl/","empire":"/ˈempaɪər/","employ":"/emˈplɔɪ/","employee":"/emˈplɔɪi/","employment":"/emˈplɔɪmənt/","enable":"/eˈneɪbəl/","encourage":"/enˈkʌrɪdʒ/","enemy":"/ˈenəmi/","enforcement":"/enˈfɔrsmənt/","engage":"/enˈɡeɪdʒ/","engagement":"/enˈɡeɪdʒmənt/","engine":"/ˈendʒən/","engineer":"/ˈendʒəˈnɪr/","engineering":"/ˈendʒəˈnɪrɪŋ/","ensure":"/enˈʃʊr/","enter":"/ˈentər/","enterprise":"/ˈentərˌpraɪz/","entertainment":"/ˌentərˈteɪnmənt/","entire":"/ɪnˈtaɪər/","entitle":"/enˈtaɪtəl/","entrance":"/ˈentrəns/","entry":"/ˈentri/","environmental":"/ɪnˌvaɪrənˈmentəl/","epic":"/ˈepɪk/","episode":"/ˈepəˌsoʊd/","equal":"/ˈikwəl/","equally":"/ˈikwəli/","equip":"/ɪˈkwɪp/","equipment":"/ɪˈkwɪpmənt/","equity":"/ˈekwəti/","equivalent":"/ɪˈkwɪvələnt/","era":"/ˈerə/","error":"/ˈerər/","escape":"/ɪˈskeɪp/","especially":"/əˈspeʃli/","essentially":"/eˈsenʃəli/","establish":"/ɪˈstæblɪʃ/","establishment":"/ɪˈstæblɪʃmənt/","estate":"/ɪˈsteɪt/","ethnic":"/ˈeθnɪk/","event":"/ɪˈvent/","eventually":"/ɪˈventʃəwəli/","everyday":"/ˈevriˈdeɪ/","evil":"/ˈivəl/","evolution":"/ˌevəˈluʃən/","ex":"/eks/","exact":"/ɪɡˈzækt/","excellent":"/ˈeksələnt/","exception":"/ɪkˈsepʃən/","excite":"/ɪkˈsaɪt/","exclusive":"/ɪksˈklusɪv/","execution":"/ˌeksəˈkjuʃən/","exhibition":"/ˌeksəˈbɪʃən/","exist":"/ɪɡˈzɪst/","existence":"/eɡˈzɪstəns/","expand":"/ɪkˈspænd/","expansion":"/ɪkˈspænʃən/","expense":"/ɪkˈspens/","experiment":"/ɪkˈsperəmənt/","experimental":"/ɪkˌsperɪˈmentəl/","expert":"/ˈekspərt/","explanation":"/ˌekspləˈneɪʃən/","explore":"/ɪkˈsplɔr/","expose":"/ɪkˈspoʊz/","exposure":"/ɪkˈspoʊʒər/","express":"/ɪkˈspres/","expression":"/ɪkˈspreʃən/","extensive":"/ɪkˈstensɪv/","external":"/ɪkˈstɜrnəl/","extraordinary":"/ˌekstrəˈɔrdəˌneri/","extreme":"/ekˈstrim/","extremely":"/ekˈstrimli/","facility":"/fəˈsɪlɪti/","factory":"/ˈfæktəri/","faculty":"/ˈfækəlti/","failure":"/ˈfeɪljər/","faith":"/feɪθ/","famous":"/ˈfeɪməs/","fantasy":"/ˈfæntəsi/","farm":"/fɑrm/","farmer":"/ˈfɑrmər/","fashion":"/ˈfæʃən/","fat":"/fæt/","fate":"/feɪt/","favor":"/ˈfeɪvər/","fear":"/fɪr/","feature":"/ˈfitʃər/","federal":"/ˈfedərəl/","fellow":"/ˈfeloʊ/","female":"/ˈfiˌmeɪl/","fiction":"/ˈfɪkʃən/","field":"/fild/","fifth":"/fɪfθ/","fight":"/faɪt/","fighter":"/ˈfaɪtər/","film":"/fɪlm/","filter":"/ˈfɪltər/","finance":"/fəˈnæns/","financial":"/fəˈnænʃəl/","fire":"/ˈfaɪər/","firm":"/fɜrm/","fish":"/fɪʃ/","fitness":"/ˈfɪtnəs/","flash":"/flæʃ/","flat":"/flæt/","fleet":"/flit/","flood":"/flʌd/","floor":"/flɔr/","flow":"/floʊ/","flower":"/ˈflaʊər/","folk":"/foʊk/","fool":"/ful/","footage":"/ˈfʊtɪdʒ/","football":"/ˈfʊtˌbɔl/","foreign":"/ˈfɔrən/","forest":"/ˈfɔrəst/","forever":"/fəˈrevər/","format":"/ˈfɔrˌmæt/","formation":"/fɔrˈmeɪʃən/","former":"/ˈfɔrmər/","formula":"/ˈfɔrmjələ/","fort":"/fɔrt/","forth":"/fɔrθ/","fortune":"/ˈfɔrtʃən/","founder":"/ˈfaʊndər/","fourth":"/fɔrθ/","fox":"/fɑks/","frame":"/freɪm/","framework":"/ˈfreɪmˌwɜrk/","franchise":"/ˈfrænˌtʃaɪz/","fraud":"/frɔd/","freedom":"/ˈfridəm/","french":"/frentʃ/","frequency":"/ˈfrikwənsi/","frequently":"/ˈfrikwəntli/","friendly":"/ˈfrendli/","friendship":"/ˈfrendʃɪp/","frozen":"/ˈfroʊzən/","fruit":"/frut/","fuel":"/ˈfjuəl/","function":"/ˈfʌŋkʃən/","fund":"/fʌnd/","fundamental":"/ˌfʌndəˈmentəl/","future":"/ˈfjutʃər/","gain":"/ɡeɪn/","galaxy":"/ˈɡæləksi/","gang":"/ɡæŋ/","garden":"/ˈɡɑrdən/","gas":"/ɡæs/","gender":"/ˈdʒendər/","gene":"/dʒin/","general":"/ˈdʒenərəl/","generally":"/ˈdʒenərəli/","generate":"/ˈdʒenəˌreɪt/","generation":"/ˌdʒenəˈreɪʃən/","genetic":"/dʒəˈnetɪk/","genius":"/ˈdʒinjəs/","genuine":"/ˈdʒenjəwən/","german":"/ˈdʒɜrmən/","ghost":"/ɡoʊst/","giant":"/ˈdʒaɪənt/","girl":"/ɡɜrl/","girlfriend":"/ˈɡɜrlˌfrend/","glass":"/ɡlæs/","glory":"/ˈɡlɔri/","goal":"/ɡoʊl/","gold":"/ɡoʊld/","golden":"/ˈɡoʊldən/","golf":"/ɡɑlf/","goodbye":"/ˌɡʊdˈbaɪ/","gorgeous":"/ˈɡɔrdʒəs/","government":"/ˈɡʌvərmənt/","governor":"/ˈɡʌvərnər/","grace":"/ɡreɪs/","grant":"/ɡrænt/","grass":"/ɡræs/","grave":"/ɡreɪv/","gray":"/ɡreɪ/","greatly":"/ˈɡreɪtli/","gross":"/ɡroʊs/","grow":"/ɡroʊ/","growth":"/ɡroʊθ/","guarantee":"/ˌɡerənˈti/","guard":"/ɡɑrd/","guess":"/ɡes/","guidance":"/ˈɡaɪdəns/","guide":"/ɡaɪd/","gun":"/ɡʌn/","guy":"/ɡaɪ/","hair":"/her/","handle":"/ˈhændəl/","happiness":"/ˈhæpinəs/","hardly":"/ˈhɑrdli/","hardware":"/ˈhɑrˌdwer/","harm":"/hɑrm/","hat":"/hæt/","headquarters":"/ˈhedˌkwɔrtərz/","health":"/helθ/","healthy":"/ˈhelθi/","heavily":"/ˈhevəli/","heavy":"/ˈhevi/","height":"/haɪt/","hence":"/hens/","heritage":"/ˈherətədʒ/","hero":"/ˈhɪroʊ/","hide":"/haɪd/","highly":"/ˈhaɪli/","highway":"/ˈhaɪˌweɪ/","hill":"/hɪl/","hip":"/hɪp/","hire":"/ˈhaɪər/","historic":"/hɪˈstɔrɪk/","historical":"/hɪˈstɔrɪkəl/","history":"/ˈhɪstəri/","holiday":"/ˈhɑləˌdeɪ/","honey":"/ˈhʌni/","honor":"/ˈɑnər/","hook":"/hʊk/","hop":"/hɑp/","hopefully":"/ˈhoʊpfəli/","horrible":"/ˈhɔrəbəl/","horror":"/ˈhɔrər/","horse":"/hɔrs/","host":"/hoʊst/","household":"/ˈhaʊsˌhoʊld/","housing":"/ˈhaʊzɪŋ/","however":"/ˌhaʊˈevər/","human":"/ˈhjumən/","humanity":"/hjuˈmænɪti/","hundred":"/ˈhʌndrəd/","hunt":"/hʌnt/","hunter":"/ˈhʌntər/","husband":"/ˈhʌzbənd/","identify":"/aɪˈdentəˌfaɪ/","identity":"/aɪˈdentɪˌti/","idiot":"/ˈɪˌdiət/","illegal":"/ˌɪˈliɡəl/","illness":"/ˈɪlnəs/","image":"/ˈɪmədʒ/","imagine":"/ˌɪˈmædʒən/","immediate":"/ˌɪˈmiˌdiət/","immediately":"/ˌɪˈmiˌdiətli/","immigrant":"/ˈɪməɡrənt/","immigration":"/ˌɪməˈɡreɪʃən/","implementation":"/ˌɪmpləmenˈteɪʃən/","importance":"/ˌɪmˈpɔrtəns/","important":"/ˌɪmˈpɔrtənt/","impression":"/ˌɪmˈpreʃən/","impressive":"/ˌɪmˈpresɪv/","improvement":"/ˌɪmˈpruvmənt/","inch":"/ɪntʃ/","incident":"/ˈɪnsədənt/","income":"/ˈɪnˌkʌm/","increase":"/ˌɪnˈkris/","incredible":"/ˌɪnˈkredəbəl/","indeed":"/ˌɪnˈdid/","independence":"/ˌɪndɪˈpendəns/","independent":"/ˌɪndɪˈpendənt/","index":"/ˈɪndeks/","indicate":"/ˈɪndəˌkeɪt/","individual":"/ˌɪndəˈvɪdʒəwəl/","industrial":"/ˌɪnˈdʌstriəl/","industry":"/ˈɪndəstri/","infection":"/ˌɪnˈfekʃən/","influence":"/ˈɪnfluəns/","info":"/ˈɪnfoʊ/","inform":"/ˌɪnˈfɔrm/","information":"/ˌɪnfərˈmeɪʃən/","infrastructure":"/ˌɪnfrəˈstrʌktʃər/","initial":"/ˌɪˈnɪʃəl/","initially":"/ˌɪˈnɪʃəli/","initiative":"/ˌɪˈnɪʃətɪv/","injure":"/ˈɪndʒər/","injury":"/ˈɪndʒəri/","inner":"/ˈɪnər/","innocent":"/ˈɪnəsənt/","innovation":"/ˌɪnəˈveɪʃən/","input":"/ˈɪnˌpʊt/","insane":"/ˌɪnˈseɪn/","inspiration":"/ˌɪnspəˈreɪʃən/","inspire":"/ˌɪnˈspaɪr/","install":"/ˌɪnˈstɔl/","instance":"/ˈɪnstəns/","instant":"/ˈɪnstənt/","institution":"/ˌɪnstɪˈtuʃən/","instruction":"/ˌɪnˈstrʌkʃən/","instrument":"/ˈɪnstrəmənt/","integrate":"/ˈɪntəˌɡreɪt/","intellectual":"/ˌɪntəˈlektʃuəl/","intelligence":"/ˌɪnˈtelədʒəns/","intelligent":"/ˌɪnˈtelədʒənt/","intend":"/ˌɪnˈtend/","intense":"/ˌɪnˈtens/","intent":"/ˌɪnˈtent/","intention":"/ˌɪnˈtentʃən/","interaction":"/ˌɪntəˈrækʃən/","interested":"/ˈɪntrəstɪd/","interesting":"/ˈɪntrəstɪŋ/","interior":"/ˌɪnˈtɪriər/","internal":"/ˌɪnˈtɜrnəl/","interview":"/ˈɪntərˌvju/","introduction":"/ˌɪntrəˈdʌkʃən/","investigate":"/ˌɪnˈvestəˌɡeɪt/","investigation":"/ˌɪnˌvestəˈɡeɪʃən/","investment":"/ˌɪnˈvestmənt/","investor":"/ˌɪnˈvestər/","involve":"/ˌɪnˈvɑlv/","involvement":"/ˌɪnˈvɑlvmənt/","iron":"/ˈaɪərn/","island":"/ˈaɪlənd/","jail":"/dʒeɪl/","jazz":"/dʒæz/","joint":"/dʒɔɪnt/","joke":"/dʒoʊk/","journalist":"/ˈdʒɜrnələst/","journey":"/ˈdʒɜrni/","joy":"/dʒɔɪ/","judge":"/dʒʌdʒ/","judgment":"/ˈdʒʌdʒmənt/","jury":"/ˈdʒʊri/","justice":"/ˈdʒʌstəs/","kick":"/kɪk/","kill":"/kɪl/","killer":"/ˈkɪlər/","king":"/kɪŋ/","kingdom":"/ˈkɪŋdəm/","kiss":"/kɪs/","kitchen":"/ˈkɪtʃən/","knife":"/naɪf/","knight":"/naɪt/","knock":"/nɑk/","knowledge":"/ˈnɑlədʒ/","korean":"/ˌkɔˈriən/","lab":"/læb/","label":"/ˈleɪbəl/","labor":"/ˈleɪbər/","laboratory":"/ˈlæbrəˌtɔri/","lack":"/læk/","lady":"/ˈleɪdi/","land":"/lænd/","landscape":"/ˈlændˌskeɪp/","lane":"/leɪn/","language":"/ˈlæŋɡwədʒ/","largely":"/ˈlɑrdʒli/","latter":"/ˈlætər/","laugh":"/læf/","law":"/lɔ/","lawyer":"/ˈlɔjər/","layer":"/ˈleɪər/","leader":"/ˈlidər/","leadership":"/ˈlidərˌʃɪp/","least":"/list/","leather":"/ˈleðər/","legacy":"/ˈleɡəsi/","legal":"/ˈliɡəl/","legend":"/ˈledʒənd/","legislation":"/ˌledʒəˈsleɪʃən/","length":"/leŋkθ/","lesson":"/ˈlesən/","letter":"/ˈletər/","liberal":"/ˈlɪˌbʌrəl/","liberty":"/ˈlɪbərˌti/","license":"/ˈlaɪsəns/","lie":"/laɪ/","life":"/laɪf/","lift":"/lɪft/","lighting":"/ˈlaɪtɪŋ/","likely":"/ˈlaɪkli/","lip":"/lɪp/","literally":"/ˈlɪtərəli/","literary":"/ˈlɪtəˌreri/","literature":"/ˈlɪtərətʃər/","loan":"/loʊn/","locate":"/ˈloʊˌkeɪt/","logic":"/ˈlɑdʒɪk/","logo":"/ˈloʊɡoʊ/","loose":"/lus/","loss":"/lɔs/","luck":"/lʌk/","lucky":"/ˈlʌki/","luxury":"/ˈlʌɡʒəri/","lyrics":"/ˈlɪrɪks/","mad":"/mæd/","magazine":"/ˈmæɡəˌzin/","magic":"/ˈmædʒɪk/","mail":"/meɪl/","mainly":"/ˈmeɪnli/","maintain":"/meɪnˈteɪn/","maintenance":"/ˈmeɪntənəns/","majority":"/məˈdʒɔrəti/","makeup":"/ˈmeɪˌkʌp/","male":"/meɪl/","mall":"/mɔl/","man":"/mæn/","management":"/ˈmænədʒmənt/","manual":"/ˈmænjuəl/","manufacture":"/ˌmænjəˈfæktʃər/","manufacturer":"/ˌmænjəˈfæktʃərər/","market":"/ˈmɑrkət/","marriage":"/ˈmerɪdʒ/","marry":"/ˈmeri/","massive":"/ˈmæsɪv/","mate":"/meɪt/","material":"/məˈtɪriəl/","mature":"/məˈtʃʊr/","maybe":"/ˈmeɪbi/","mayor":"/ˈmeɪər/","meanwhile":"/ˈminˌwaɪl/","measure":"/ˈmeʒər/","meat":"/mit/","medical":"/ˈmedəkəl/","member":"/ˈmembər/","membership":"/ˈmembərˌʃɪp/","mental":"/ˈmentəl/","merely":"/ˈmɪrli/","metal":"/ˈmetəl/","method":"/ˈmeθəd/","middle":"/ˈmɪdəl/","midnight":"/ˈmɪdˌnaɪt/","mile":"/maɪl/","military":"/ˈmɪləˌteri/","mill":"/mɪl/","million":"/ˈmɪljən/","mining":"/ˈmaɪnɪŋ/","minister":"/ˈmɪnəstər/","ministry":"/ˈmɪnəstri/","minor":"/ˈmaɪnər/","minority":"/maɪˈnɔrəti/","mirror":"/ˈmɪrər/","mission":"/ˈmɪʃən/","mode":"/moʊd/","modern":"/ˈmɑdərn/","monitor":"/ˈmɑnətər/","monster":"/ˈmɑnstər/","monthly":"/ˈmʌnθli/","moral":"/ˈmɔrəl/","mortgage":"/ˈmɔrɡədʒ/","mostly":"/ˈmoʊstli/","mother":"/ˈmʌðər/","motion":"/ˈmoʊʃən/","mountain":"/ˈmaʊntən/","mouth":"/maʊθ/","movement":"/ˈmuvmənt/","multiple":"/ˈmʌltəpəl/","murder":"/ˈmɜrdər/","musical":"/ˈmjuzɪkəl/","mystery":"/ˈmɪstəri/","naked":"/ˈneɪkəd/","narrative":"/ˈnærətɪv/","nation":"/ˈneɪʃən/","native":"/ˈneɪtɪv/","natural":"/ˈnætʃərəl/","naturally":"/ˈnætʃərəli/","nearly":"/ˈnɪrli/","necessarily":"/ˌnesəˈserəli/","necessary":"/ˈnesəˌseri/","neck":"/nek/","negative":"/ˈneɡətɪv/","net":"/net/","network":"/ˈneˌtwɜrk/","newly":"/ˈnuli/","newspaper":"/ˈnuzˌpeɪpər/","normal":"/ˈnɔrməl/","normally":"/ˈnɔrməli/","north":"/nɔrθ/","northern":"/ˈnɔrðərn/","novel":"/ˈnɑvəl/","nuclear":"/ˈnukliər/","numerous":"/ˈnumərəs/","nurse":"/nɜrs/","nursing":"/ˈnɜrsɪŋ/","nut":"/nʌt/","object":"/əbˈdʒekt/","objective":"/əbˈdʒektɪv/","observe":"/əbˈzɜrv/","obtain":"/əbˈteɪn/","obvious":"/ˈɑbviəs/","obviously":"/ˈɑbviəsli/","occasion":"/əˈkeɪʒən/","occasionally":"/əˈkeɪʒənəli/","occupy":"/ˈɑkjəˌpaɪ/","occur":"/əˈkɜr/","odd":"/ɑd/","offensive":"/əˈfensɪv/","offering":"/ˈɔfərɪŋ/","officer":"/ˈɔfəsər/","official":"/əˈfɪʃəl/","officially":"/əˈfɪʃəli/","oil":"/ɔɪl/","old":"/oʊld/","olympic":"/oʊˈlɪmpɪk/","ongoing":"/ˈɑnˌɡoʊɪŋ/","operate":"/ˈɑpəˌreɪt/","operation":"/ˌɑpəˈreɪʃən/","operator":"/ˈɑpəˌreɪtər/","oppose":"/əˈpoʊz/","opposite":"/ˈɑpəzət/","opposition":"/ˌɑpəˈzɪʃən/","ordinary":"/ˈɔrdəˌneri/","organic":"/ɔrˈɡænɪk/","organization":"/ˌɔrɡənəˈzeɪʃən/","organize":"/ˈɔrɡəˌnaɪz/","origin":"/ˈɔrədʒən/","original":"/əˈrɪdʒənəl/","originally":"/əˈrɪdʒənəli/","outcome":"/ˈaʊtˌkʌm/","output":"/ˈaʊtˌpʊt/","outstanding":"/ˌaʊtˈstændɪŋ/","overall":"/ˈoʊvəˌrɔl/","overseas":"/ˈoʊvərˈsiz/","painful":"/ˈpeɪnfəl/","pair":"/per/","palace":"/ˈpæləs/","pan":"/pæn/","panel":"/ˈpænəl/","pants":"/pænts/","parent":"/ˈperənt/","parking":"/ˈpɑrkɪŋ/","parliament":"/ˈpɑrləmənt/","participant":"/pɑrˈtɪsəpənt/","participate":"/pɑrˈtɪsəˌpeɪt/","participation":"/pɑrˌtɪsəˈpeɪʃən/","particular":"/pərˈtɪkjələr/","particularly":"/ˌpɑrˈtɪkjələrli/","partly":"/ˈpɑrtli/","partner":"/ˈpɑrtnər/","partnership":"/ˈpɑrtnərˌʃɪp/","passenger":"/ˈpæsəndʒər/","passion":"/ˈpæʃən/","patient":"/ˈpeɪʃənt/","pattern":"/ˈpætərn/","payment":"/ˈpeɪmənt/","peace":"/pis/","peaceful":"/ˈpisfəl/","penalty":"/ˈpenəlti/","percent":"/pərˈsent/","percentage":"/pərˈsentədʒ/","perform":"/pərˈfɔrm/","performance":"/pərˈfɔrməns/","perhaps":"/pərˈhæps/","period":"/ˈpɪriəd/","permanent":"/ˈpɜrmənənt/","permission":"/pərˈmɪʃən/","personal":"/ˈpɜrsɪnəl/","personality":"/ˌpɜrsəˈnælɪti/","personnel":"/ˌpɜrsəˈnel/","petition":"/pəˈtɪʃən/","phase":"/feɪz/","philosophy":"/fəˈlɑsəfi/","photograph":"/ˈfoʊtəˌɡræf/","photographer":"/fəˈtɑɡrəfər/","phrase":"/freɪz/","physical":"/ˈfɪzɪkəl/","physically":"/ˈfɪzɪkəli/","physics":"/ˈfɪzɪks/","piece":"/pis/","pilot":"/ˈpaɪlət/","pin":"/pɪn/","pink":"/pɪŋk/","pitch":"/pɪtʃ/","plain":"/pleɪn/","plane":"/pleɪn/","planet":"/ˈplænət/","plastic":"/ˈplæstɪk/","player":"/ˈpleɪər/","plenty":"/ˈplenti/","plot":"/plɑt/","poetry":"/ˈpoʊətri/","police":"/pəˈlis/","political":"/pəˈlɪtəkəl/","politician":"/ˌpɑləˈtɪʃən/","politics":"/ˈpɑləˌtɪks/","pool":"/pul/","poor":"/pur/","population":"/ˌpɑpjəˈleɪʃən/","port":"/pɔrt/","position":"/pəˈzɪʃən/","positive":"/ˈpɑzətɪv/","possession":"/pəˈzeʃən/","pot":"/pɑt/","potentially":"/pəˈtenʃəli/","pound":"/paʊnd/","poverty":"/ˈpɑvərti/","power":"/ˈpaʊər/","powerful":"/ˈpaʊərfəl/","practical":"/ˈpræktəkəl/","praise":"/preɪz/","pray":"/preɪ/","prayer":"/prer/","precious":"/ˈpreʃəs/","pregnancy":"/ˈpreɡnənsi/","pregnant":"/ˈpreɡnənt/","premier":"/preˈmɪr/","preparation":"/ˌprepəˈreɪʃən/","prepare":"/priˈper/","presence":"/ˈprezəns/","present":"/ˈprezənt/","president":"/ˈprezəˌdent/","presidential":"/ˌprezəˈdenʃəl/","press":"/pres/","pretend":"/priˈtend/","prevent":"/prɪˈvent/","previously":"/ˈpriviəsli/","pride":"/praɪd/","primarily":"/praɪˈmerəli/","primary":"/ˈpraɪˌmeri/","princess":"/ˈprɪnses/","principal":"/ˈprɪnsəpəl/","prior":"/ˈpraɪər/","prison":"/ˈprɪzən/","prisoner":"/ˈprɪzənər/","prize":"/praɪz/","produce":"/prəˈdus/","producer":"/prəˈdusər/","product":"/ˈprɑdəkt/","production":"/prəˈdʌkʃən/","professional":"/prəˈfeʃənəl/","profile":"/ˈproʊˌfaɪl/","profit":"/ˈprɑfət/","program":"/ˈproʊˌɡræm/","programming":"/ˈproʊˌɡræmɪŋ/","progress":"/ˈprɑˌɡres/","progressive":"/prəˈɡresɪv/","promote":"/prəˈmoʊt/","promotion":"/prəˈmoʊʃən/","proof":"/pruf/","property":"/ˈprɑpərti/","proposal":"/prəˈpoʊzəl/","protect":"/prəˈtekt/","protection":"/prəˈtekʃən/","protest":"/ˈproʊˌtest/","prove":"/pruv/","provide":"/prəˈvaɪd/","psychology":"/saɪˈkɑlədʒi/","public":"/ˈpʌblɪk/","publication":"/ˌpʌblɪˈkeɪʃən/","publicly":"/ˈpʌblɪkli/","publish":"/ˈpʌblɪʃ/","pump":"/pʌmp/","punch":"/pʌntʃ/","punishment":"/ˈpʌnɪʃmənt/","purchase":"/ˈpɜrtʃəs/","pure":"/pjʊr/","purple":"/ˈpɜrpəl/","purpose":"/ˈpɜrpəs/","qualify":"/ˈkwɑləˌfaɪ/","quarter":"/ˈkwɔrtər/","quit":"/kwɪt/","race":"/reɪs/","radical":"/ˈrædəkəl/","radio":"/ˈreɪdiˌoʊ/","rail":"/reɪl/","railroad":"/ˈreɪlˌroʊd/","railway":"/ˈreɪlˌweɪ/","rally":"/ˈræli/","random":"/ˈrændəm/","rank":"/ræŋk/","rapid":"/ˈræpəd/","rapidly":"/ˈræpədli/","rare":"/rer/","rarely":"/ˈrerli/","rat":"/ræt/","rate":"/reɪt/","rating":"/ˈreɪtɪŋ/","ratio":"/ˈreɪʃiˌoʊ/","raw":"/rɑ/","reaction":"/riˈækʃən/","reader":"/ˈridər/","reality":"/ˌriˈæləˌti/","rear":"/rɪr/","reason":"/ˈrizən/","reasonable":"/ˈrizənəbəl/","recall":"/ˈriˌkɔl/","receive":"/rəˈsiv/","recent":"/ˈrisənt/","recently":"/ˈrisəntli/","recognition":"/ˌrekəɡˈnɪʃən/","recommendation":"/ˌrekəmənˈdeɪʃən/","record":"/ˈrekərd/","red":"/red/","reduce":"/rəˈdus/","reduction":"/rəˈdʌkʃən/","refer":"/rəˈfɜr/","reference":"/ˈrefərəns/","reflect":"/rɪˈflekt/","reform":"/rəˈfɔrm/","refuse":"/rəˈfjuz/","regard":"/rɪˈɡɑrd/","regardless":"/rəˈɡɑrdləs/","regime":"/rəˈʒim/","region":"/ˈridʒən/","regional":"/ˈridʒənəl/","register":"/ˈredʒɪstər/","registration":"/ˌredʒɪˈstreɪʃən/","regret":"/rəˈɡret/","regularly":"/ˈreɡjələrli/","regulation":"/ˌreɡjəˈleɪʃən/","reject":"/rɪˈdʒekt/","relate":"/rɪˈleɪt/","relation":"/riˈleɪʃən/","relative":"/ˈrelətɪv/","relatively":"/ˈrelətɪvli/","relax":"/rɪˈlæks/","release":"/riˈlis/","relevant":"/ˈreləvənt/","relief":"/rɪˈlif/","religion":"/rɪˈlɪdʒən/","religious":"/rɪˈlɪdʒəs/","rely":"/rɪˈlaɪ/","remain":"/rɪˈmeɪn/","remarkable":"/rɪˈmɑrkəbəl/","remind":"/riˈmaɪnd/","removal":"/rɪˈmuvəl/","remove":"/riˈmuv/","replace":"/ˌriˈpleɪs/","replacement":"/rɪˈpleɪsmənt/","reporter":"/rɪˈpɔrtər/","represent":"/ˌreprɪˈzent/","representation":"/ˌreprəzenˈteɪʃən/","representative":"/ˌreprəˈzentətɪv/","republic":"/riˈpʌblək/","reputation":"/ˌrepjəˈteɪʃən/","require":"/ˌriˈkwaɪər/","requirement":"/rɪˈkwaɪrmənt/","rescue":"/ˈreskju/","researcher":"/ˈrisərtʃər/","reserve":"/rɪˈzɜrv/","residence":"/ˈrezɪdəns/","resident":"/ˈrezɪdənt/","residential":"/ˌrezɪˈdenʃəl/","resistance":"/rɪˈzɪstəns/","resolution":"/ˌrezəˈluʃən/","resort":"/rɪˈzɔrt/","respectively":"/rɪˈspektɪvli/","respond":"/rɪˈspɑnd/","response":"/rɪˈspɑns/","responsibility":"/riˌspɑnsəˈbɪləti/","restriction":"/riˈstrɪkʃən/","retire":"/rɪˈtaɪr/","retirement":"/riˈtaɪərmənt/","reveal":"/rɪˈvil/","revenge":"/riˈvendʒ/","revenue":"/ˈrevəˌnu/","reverse":"/rɪˈvɜrs/","revolution":"/ˌrevəˈluʃən/","reward":"/rɪˈwɔrd/","rice":"/raɪs/","ride":"/raɪd/","ridiculous":"/rɪˈdɪkjələs/","rise":"/raɪz/","river":"/ˈrɪvər/","rock":"/rɑk/","rocket":"/ˈrɑkət/","roll":"/roʊl/","romance":"/roʊˈmæns/","romantic":"/roʊˈmæntɪk/","root":"/rut/","roughly":"/ˈrʌfli/","row":"/roʊ/","ruin":"/ˈruən/","rural":"/ˈrʊrəl/","sacrifice":"/ˈsækrəˌfaɪs/","safety":"/ˈseɪfti/","sake":"/seɪk/","sample":"/ˈsæmpəl/","sand":"/sænd/","satellite":"/ˈsætəˌlaɪt/","satisfy":"/ˈsætəsˌfaɪ/","scale":"/skeɪl/","scar":"/skɑr/","scary":"/ˈskeri/","scene":"/sin/","scheme":"/skim/","science":"/ˈsaɪəns/","scientific":"/ˌsaɪənˈtɪfɪk/","scientist":"/ˈsaɪəntɪst/","score":"/skɔr/","scream":"/skrim/","script":"/skrɪpt/","sea":"/si/","seal":"/sil/","search":"/sɜrtʃ/","secondary":"/ˈsekənˌderi/","secret":"/ˈsikrət/","secretary":"/ˈsekrəˌteri/","sector":"/ˈsektər/","secure":"/sɪˈkjʊr/","security":"/sɪˈkjʊrəti/","seed":"/sid/","seek":"/sik/","select":"/səˈlekt/","selection":"/səˈlekʃən/","self":"/self/","senior":"/ˈsinjər/","sentence":"/ˈsentəns/","separate":"/ˈsepərət/","sequence":"/ˈsikwəns/","server":"/ˈsɜrvər/","session":"/ˈseʃən/","settlement":"/ˈsetəlmənt/","several":"/ˈsevrəl/","severe":"/səˈvɪr/","shadow":"/ˈʃæˌdoʊ/","shake":"/ʃeɪk/","shape":"/ʃeɪp/","sheet":"/ʃit/","shift":"/ʃɪft/","shock":"/ʃɑk/","shoot":"/ʃut/","shore":"/ʃɔr/","shortly":"/ˈʃɔrtli/","shoulder":"/ˈʃoʊldər/","signal":"/ˈsɪɡnəl/","significant":"/səɡˈnɪfɪkənt/","significantly":"/sɪɡˈnɪfɪkəntli/","silence":"/ˈsaɪləns/","silent":"/ˈsaɪlənt/","silly":"/ˈsɪli/","silver":"/ˈsɪlvər/","similar":"/ˈsɪmələr/","similarly":"/ˈsɪmələrli/","simply":"/ˈsɪmpli/","sin":"/sɪn/","singer":"/ˈsɪŋər/","single":"/ˈsɪŋɡəl/","sir":"/sɜr/","sister":"/ˈsɪstər/","site":"/saɪt/","sixth":"/sɪksθ/","skill":"/skɪl/","sky":"/skaɪ/","slide":"/slaɪd/","slightly":"/ˈslaɪtli/","smart":"/smɑrt/","smell":"/smel/","smile":"/smaɪl/","snow":"/snoʊ/","society":"/səˈsaɪəti/","soft":"/sɑft/","software":"/ˈsɔfˌtwer/","soil":"/sɔɪl/","solar":"/ˈsoʊlər/","soldier":"/ˈsoʊldʒər/","solid":"/ˈsɑləd/","solution":"/səˈluʃən/","solve":"/sɑlv/","somehow":"/ˈsʌmˌhaʊ/","sometimes":"/səmˈtaɪmz/","somewhat":"/ˈsʌmˈwʌt/","son":"/sʌn/","soul":"/soʊl/","south":"/saʊθ/","space":"/speɪs/","spanish":"/ˈspænɪʃ/","specifically":"/spəˈsɪfɪkli/","speech":"/spitʃ/","speed":"/spid/","spin":"/spɪn/","spiritual":"/ˈspɪrɪˌtʃuəl/","spring":"/sprɪŋ/","square":"/skwer/","stability":"/stəˈbɪlɪti/","stable":"/ˈsteɪbəl/","stadium":"/ˈsteɪdiəm/","staff":"/stæf/","stage":"/steɪdʒ/","standard":"/ˈstændərd/","star":"/stɑr/","state":"/steɪt/","statement":"/ˈsteɪtmənt/","status":"/ˈstætəs/","steady":"/ˈstedi/","steam":"/stim/","steel":"/stil/","stem":"/stem/","stone":"/stoʊn/","storage":"/ˈstɔrədʒ/","storm":"/stɔrm/","straight":"/streɪt/","strange":"/streɪndʒ/","strategic":"/strəˈtidʒɪk/","strategy":"/ˈstrætədʒi/","street":"/strit/","strong":"/strɔŋ/","strongly":"/ˈstrɔŋli/","studio":"/ˈstudiˌoʊ/","stupid":"/ˈstupəd/","subsequent":"/ˈsʌbsəkwənt/","substantial":"/səbˈstænʃəl/","succeed":"/səkˈsid/","successful":"/səkˈsesfəl/","successfully":"/səkˈsesfəli/","sudden":"/ˈsʌdən/","suddenly":"/ˈsʌdənli/","suffer":"/ˈsʌfər/","sufficient":"/səˈfɪʃənt/","suit":"/sut/","suitable":"/ˈsutəbəl/","sum":"/sʌm/","summary":"/ˈsʌməri/","summit":"/ˈsʌmət/","superior":"/suˈpɪriər/","supply":"/səˈplaɪ/","support":"/səˈpɔrt/","supporter":"/səˈpɔrtər/","suppose":"/səˈpoʊz/","surely":"/ˈʃʊrli/","surface":"/ˈsɜrfəs/","surround":"/səˈraʊnd/","survey":"/ˈsɜrveɪ/","survival":"/sərˈvaɪvəl/","survive":"/sərˈvaɪv/","suspend":"/səˈspend/","swear":"/swer/","swing":"/swɪŋ/","symbol":"/ˈsɪmbəl/","system":"/ˈsɪstəm/","tail":"/teɪl/","tale":"/teɪl/","talent":"/ˈtælənt/","tall":"/tɔl/","tank":"/tæŋk/","tape":"/teɪp/","target":"/ˈtɑrɡət/","task":"/tæsk/","tax":"/tæks/","teacher":"/ˈtitʃər/","tear":"/tɪr/","technique":"/tekˈnik/","teen":"/tin/","telephone":"/ˈteləˌfoʊn/","television":"/ˈteləˌvɪʒən/","temperature":"/ˈtemprətʃər/","temporary":"/ˈtempəˌreri/","terminal":"/ˈtɜrmənəl/","territory":"/ˈterɪˌtɔri/","testing":"/ˈtestɪŋ/","theater":"/ˈθiətər/","theme":"/θim/","theory":"/ˈθɪri/","therefore":"/ˈðerˌfɔr/","thick":"/θɪk/","third":"/θɜrd/","thousand":"/ˈθaʊzənd/","threat":"/θret/","threaten":"/ˈθretən/","throughout":"/θruˈaʊt/","thus":"/ðʌs/","tie":"/taɪ/","tiger":"/ˈtaɪɡər/","tiny":"/ˈtaɪni/","tissue":"/ˈtɪsˌju/","title":"/ˈtaɪtəl/","ton":"/tʌn/","tool":"/tul/","tooth":"/tuθ/","totally":"/ˈtoʊtəli/","tough":"/tʌf/","tour":"/tʊr/","tournament":"/ˈtʊrnəmənt/","toy":"/tɔɪ/","trading":"/ˈtreɪdɪŋ/","tradition":"/trəˈdɪʃən/","traditional":"/trəˈdɪʃənəl/","trailer":"/ˈtreɪlər/","transition":"/trænˈzɪʃən/","translation":"/trænzˈleɪʃən/","transmission":"/trænˈsmɪʃən/","transport":"/trænˈspɔrt/","transportation":"/ˌtrænspərˈteɪʃən/","treaty":"/ˈtriti/","tree":"/tri/","trend":"/trend/","trial":"/ˈtraɪəl/","trick":"/trɪk/","triple":"/ˈtrɪpəl/","troop":"/trup/","truck":"/trʌk/","true":"/tru/","truly":"/ˈtruli/","trust":"/trʌst/","truth":"/truθ/","tube":"/tub/","twin":"/twɪn/","type":"/taɪp/","typical":"/ˈtɪpəkəl/","typically":"/ˈtɪpɪkli/","ugly":"/ˈʌɡli/","ultimate":"/ˈʌltəmət/","ultimately":"/ˈʌltəmətli/","unable":"/əˈneɪbəl/","uncle":"/ˈʌŋkəl/","underground":"/ˈʌndərˌɡraʊnd/","unfortunately":"/ənˈfɔrtʃənətli/","uniform":"/ˈjunəˌfɔrm/","union":"/ˈjunjən/","unique":"/juˈnik/","unit":"/ˈjunət/","universal":"/ˌjunəˈvɜrsəl/","universe":"/ˈjunəˌvɜrs/","university":"/ˌjunəˈvɜrsəti/","unknown":"/ənˈnoʊn/","unlikely":"/ənˈlaɪkli/","unusual":"/ənˈjuˌʒuəl/","upcoming":"/ˈʌpˌkʌmɪŋ/","upset":"/əpˈset/","urban":"/ˈɜrbən/","useful":"/ˈjusfəl/","user":"/ˈjuzər/","valuable":"/ˈvæljəbəl/","value":"/ˈvælju/","variety":"/vəˈraɪəti/","various":"/ˈveriəs/","vast":"/væst/","vehicle":"/ˈvihɪkəl/","version":"/ˈvɜrʒən/","versus":"/ˈvɜrsəs/","veteran":"/ˈvetərən/","vice":"/vaɪs/","victim":"/ˈvɪktəm/","victory":"/ˈvɪktəri/","village":"/ˈvɪlədʒ/","violence":"/ˈvaɪələns/","violent":"/ˈvaɪələnt/","virtual":"/ˈvɜrtʃuəl/","visible":"/ˈvɪzəbəl/","vision":"/ˈvɪʒən/","visit":"/ˈvɪzɪt/","visitor":"/ˈvɪzɪtər/","vital":"/ˈvaɪtəl/","volume":"/ˈvɑljum/","volunteer":"/ˌvɑlənˈtɪr/","vote":"/voʊt/","voter":"/ˈvoʊtər/","wage":"/weɪdʒ/","war":"/wɔr/","ward":"/wɔrd/","warn":"/wɔrn/","warrior":"/ˈwɔriər/","waste":"/weɪst/","wave":"/weɪv/","weak":"/wik/","wealth":"/welθ/","weapon":"/ˈwepən/","wedding":"/ˈwedɪŋ/","welfare":"/ˈwelˌfer/","western":"/ˈwestərn/","white":"/waɪt/","wide":"/waɪd/","widely":"/ˈwaɪdli/","wife":"/waɪf/","wild":"/waɪld/","wildlife":"/ˈwaɪldˌlaɪf/","win":"/wɪn/","wind":"/waɪnd/","wing":"/wɪŋ/","winner":"/ˈwɪnər/","wire":"/ˈwaɪər/","wisdom":"/ˈwɪzdəm/","wise":"/waɪz/","witness":"/ˈwɪtnəs/","woman":"/ˈwʊmən/","wonderful":"/ˈwʌndərfəl/","wood":"/wʊd/","wooden":"/ˈwʊdən/","worker":"/ˈwɜrkər/","worldwide":"/ˈwɜrlˈdwaɪd/","worship":"/ˈwɜrʃəp/","worst":"/wɜrst/","worthy":"/ˈwɜrði/","wound":"/wund/","writer":"/ˈraɪtər/","yard":"/jɑrd/","yellow":"/ˈjeloʊ/","young":"/jʌŋ/","youth":"/juθ/"});
for (const [w, i] of Object.entries(IPA)) if (WORDS[w]) WORDS[w].ipa = i;
