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
W("dutch","형용사","네덜란드의",3,{s: "go Dutch(각자 내기)는 네덜란드 사람이 각자 계산한다는 옛 영어권의 고정관념에서 왔어요."});
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
W("tip","명사","끝, (tip of my tongue) 혀끝",1);
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
W("load","동사","불러오다, 로딩되다",2,{f: "loading"});
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
W("pop","동사","(pop up) 갑자기 뜨다",2,{f: "popping"});
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
W("blow","동사","(blow up) 폭발적으로 퍼지다",1,{f: "blew"});
W("factor","명사","요소, (two-factor) 2단계",2);
W("authentication","명사","인증",3,{p: "authentic=진짜인|ation=~것", s: "진짜인지 확인하는 것."});
W("livestream","명사","라이브 방송",3,{p: "live=실시간|stream=흐름"});
F("draw","drew");
W("audience","명사","청중, 시청자",2,{p: "audi=듣다|ence=~것", s: "소리를 듣는 사람들."});
W("relationship","명사","관계",1,{p: "relation=관계|ship=~상태"});
W("shower","명사","샤워",1);
W("nighter","명사","(all-nighter) 밤샘",3,{s: "all-nighter = 밤(night)을 통째로(all) 새우는 것."});

/* American IPA from the CMU Pronouncing Dictionary (heteronyms set by part of speech) */
const IPA = {"account":"/əˈkaʊnt/","ad":"/æd/","adapt":"/əˈdæpt/","address":"/ˈædres/","advocate":"/ˈædvəkət/","afraid":"/əˈfreɪd/","ages":"/ˈeɪdʒəz/","ago":"/əˈɡoʊ/","agree":"/əˈɡri/","airport":"/ˈerˌpɔrt/","allergic":"/əˈlɜrdʒɪk/","allergy":"/ˈælərdʒi/","ambulance":"/ˈæmbjələns/","americano":"/əˌmerɪˈkɑnoʊ/","ankle":"/ˈæŋkəl/","answer":"/ˈænsər/","anything":"/ˈeniˌθɪŋ/","anyway":"/ˈeniˌweɪ/","app":"/æp/","appointment":"/əˈpɔɪntmənt/","appreciate":"/əˈpriʃiˌeɪt/","approach":"/əˈproʊtʃ/","around":"/əˈraʊnd/","arrive":"/əˈraɪv/","ask":"/æsk/","assignment":"/əˈsaɪnmənt/","back":"/bæk/","bad":"/bæd/","bag":"/bæɡ/","bail":"/beɪl/","bake":"/beɪk/","bargain":"/ˈbɑrɡən/","base":"/beɪs/","beat":"/bit/","bed":"/bed/","behind":"/bɪˈhaɪnd/","believe":"/bɪˈliv/","bell":"/bel/","best":"/best/","better":"/ˈbetər/","between":"/bɪˈtwin/","big":"/bɪɡ/","bill":"/bɪl/","bit":"/bɪt/","bite":"/baɪt/","black":"/blæk/","blessing":"/ˈblesɪŋ/","blue":"/blu/","book":"/bʊk/","borrow":"/ˈbɑˌroʊ/","break":"/breɪk/","breakfast":"/ˈbrekfəst/","bright":"/braɪt/","brush":"/brʌʃ/","build":"/bɪld/","burnt":"/bɜrnt/","bus":"/bʌs/","busy":"/ˈbɪzi/","buy":"/baɪ/","cafe":"/kəˈfeɪ/","call":"/kɔl/","camera":"/ˈkæmərə/","camp":"/kæmp/","cancel":"/ˈkænsəl/","card":"/kɑrd/","carousel":"/ˈkerəˌsel/","cash":"/kæʃ/","cashier":"/kæˈʃɪr/","catch":"/kætʃ/","celebrate":"/ˈseləˌbreɪt/","change":"/tʃeɪndʒ/","channel":"/ˈtʃænəl/","charge":"/tʃɑrdʒ/","charger":"/ˈtʃɑrdʒər/","chat":"/tʃæt/","cheap":"/tʃip/","check":"/tʃek/","checkup":"/ˈtʃeˌkʌp/","chef":"/ʃef/","chord":"/kɔrd/","chore":"/tʃɔr/","circle":"/ˈsɜrkəl/","clarify":"/ˈklerəˌfaɪ/","class":"/klæs/","clean":"/klin/","clear":"/klɪr/","click":"/klɪk/","close":"/kloʊz/","coffee":"/ˈkɑfi/","cold":"/koʊld/","come":"/kʌm/","comment":"/ˈkɑment/","complain":"/kəmˈpleɪn/","complaint":"/kəmˈpleɪnt/","compliment":"/ˈkɑmpləment/","connect":"/kəˈnekt/","consider":"/kənˈsɪdər/","conversation":"/ˌkɑnvərˈseɪʃən/","convinced":"/kənˈvɪnst/","cook":"/kʊk/","couch":"/kaʊtʃ/","cough":"/kɑf/","counter":"/ˈkaʊntər/","couple":"/ˈkʌpəl/","cover":"/ˈkʌvər/","cram":"/kræm/","crash":"/kræʃ/","cup":"/kʌp/","curate":"/ˈkjʊrət/","cut":"/kʌt/","damage":"/ˈdæmədʒ/","date":"/deɪt/","day":"/deɪ/","deadline":"/ˈdedˌlaɪn/","deal":"/dil/","declutter":"/diˈklʌtər/","delay":"/dɪˈleɪ/","delicious":"/dɪˈlɪʃəs/","deposit":"/dəˈpɑzɪt/","detour":"/ˈditʊr/","detox":"/ˈdiˌtɑks/","devil":"/ˈdevəl/","die":"/daɪ/","difference":"/ˈdɪfərəns/","different":"/ˈdɪfərənt/","digital":"/ˈdɪdʒətəl/","dinner":"/ˈdɪnər/","direct":"/dəˈrekt/","disagree":"/dɪsəˈɡri/","disappointed":"/ˌdɪsəˈpɔɪntɪd/","discount":"/ˈdɪskaʊnt/","disguise":"/dɪsˈɡaɪz/","dish":"/dɪʃ/","distance":"/ˈdɪstəns/","divide":"/dɪˈvaɪd/","dizzy":"/ˈdɪzi/","do":"/du/","doctor":"/ˈdɑktər/","dog":"/dɔɡ/","doomscrolling":"/ˈdumˌskroʊlɪŋ/","door":"/dɔr/","down":"/daʊn/","draw":"/drɔ/","driver":"/ˈdraɪvər/","due":"/du/","ear":"/ir/","early":"/ˈɜrli/","easy":"/ˈizi/","eat":"/it/","economics":"/ˌekəˈnɑmɪks/","effect":"/ɪˈfekt/","elaborate":"/ɪˈlæbəˌreɪt/","email":"/iˈmeɪl/","english":"/ˈɪŋɡlɪʃ/","essay":"/ˈeseɪ/","evenly":"/ˈivənli/","everyone":"/ˈevriˌwʌn/","everything":"/ˈevriˌθɪŋ/","exam":"/ɪɡˈzæm/","example":"/ɪɡˈzæmpəl/","exchange":"/ɪksˈtʃeɪndʒ/","explain":"/ɪkˈspleɪn/","extension":"/ɪkˈstenʃən/","eye":"/aɪ/","fan":"/fæn/","far":"/fɑr/","feed":"/fid/","feedback":"/ˈfidˌbæk/","feel":"/fil/","feeling":"/ˈfilɪŋ/","fence":"/fens/","fever":"/ˈfivər/","few":"/fju/","file":"/faɪl/","finally":"/ˈfaɪnəli/","find":"/faɪnd/","fit":"/fɪt/","fix":"/fɪks/","flight":"/flaɪt/","fly":"/flaɪ/","follow":"/ˈfɑloʊ/","food":"/fud/","foodie":"/ˈfudi/","forget":"/fərˈɡet/","form":"/fɔrm/","forward":"/ˈfɔrwərd/","free":"/fri/","freeze":"/friz/","freezing":"/ˈfrizɪŋ/","friday":"/ˈfraɪdeɪ/","friend":"/frend/","front":"/frʌnt/","full":"/fʊl/","fun":"/fʌn/","funny":"/ˈfʌni/","game":"/ɡeɪm/","gift":"/ɡɪft/","go":"/ɡoʊ/","good":"/ɡʊd/","grab":"/ɡræb/","grain":"/ɡreɪn/","grammar":"/ˈɡræmər/","great":"/ɡreɪt/","group":"/ɡrup/","guest":"/ɡest/","guilty":"/ˈɡɪlti/","guitar":"/ɡɪˈtɑr/","gym":"/dʒɪm/","hand":"/hænd/","happy":"/ˈhæpi/","head":"/hed/","headache":"/ˈheˌdeɪk/","hear":"/hir/","heart":"/hɑrt/","heater":"/ˈhitər/","help":"/help/","hike":"/haɪk/","hobby":"/ˈhɑbi/","hold":"/hoʊld/","home":"/hoʊm/","homework":"/ˈhoʊmˌwɜrk/","honest":"/ˈɑnəst/","honestly":"/ˈɑnəstli/","hooked":"/hʊkt/","hot":"/hɑt/","hour":"/ˈaʊər/","hungry":"/ˈhʌŋɡri/","hurt":"/hɜrt/","ice":"/aɪs/","impulse":"/ˈɪmpəls/","include":"/ˌɪnˈklud/","insurance":"/ˌɪnˈʃʊrəns/","internet":"/ˈɪntərˌnet/","item":"/ˈaɪtəm/","jacket":"/ˈdʒækət/","jet":"/dʒet/","job":"/dʒɑb/","join":"/dʒɔɪn/","keep":"/kip/","key":"/ki/","kind":"/kaɪnd/","lag":"/læɡ/","landlord":"/ˈlændˌlɔrd/","last":"/læst/","late":"/leɪt/","lately":"/ˈleɪtli/","later":"/ˈleɪtər/","launch":"/lɔntʃ/","laundry":"/ˈlɔndri/","lead":"/lid/","leak":"/lik/","learn":"/lɜrn/","lease":"/lis/","leave":"/liv/","lecture":"/ˈlektʃər/","leftovers":"/ˈlefˌtoʊvərz/","light":"/laɪt/","link":"/lɪŋk/","little":"/ˈlɪtəl/","local":"/ˈloʊkəl/","lock":"/lɑk/","long":"/lɔŋ/","look":"/lʊk/","lost":"/lɔst/","lot":"/lɑt/","loud":"/laʊd/","love":"/lʌv/","luggage":"/ˈlʌɡədʒ/","machine":"/məˈʃin/","major":"/ˈmeɪdʒər/","make":"/meɪk/","manager":"/ˈmænədʒər/","map":"/mæp/","marketing":"/ˈmɑrkətɪŋ/","match":"/mætʃ/","meal":"/mil/","mean":"/min/","media":"/ˈmidiə/","medicine":"/ˈmedəsən/","medium":"/ˈmidiəm/","meet":"/mit/","meeting":"/ˈmitɪŋ/","mend":"/mend/","menu":"/ˈmenju/","message":"/ˈmesədʒ/","mild":"/maɪld/","milk":"/mɪlk/","minute":"/ˈmɪnɪt/","miss":"/mɪs/","mistake":"/mɪˈsteɪk/","mixed":"/mɪkst/","moment":"/ˈmoʊmənt/","mood":"/mud/","moon":"/mun/","morning":"/ˈmɔrnɪŋ/","move":"/muv/","movie":"/ˈmuvi/","music":"/ˈmjuzɪk/","mute":"/mjut/","name":"/neɪm/","negotiate":"/nəˈɡoʊʃiˌeɪt/","negotiation":"/nɪˌɡoʊʃiˈeɪʃən/","neighbor":"/ˈneɪbər/","nerve":"/nɜrv/","nervous":"/ˈnɜrvəs/","new":"/nu/","next":"/nekst/","nice":"/naɪs/","night":"/naɪt/","noise":"/nɔɪz/","noon":"/nun/","notch":"/nɑtʃ/","nothing":"/ˈnʌθɪŋ/","number":"/ˈnʌmbər/","offline":"/ˈɔˌflaɪn/","often":"/ˈɔfən/","online":"/ˈɔnˌlaɪn/","open":"/ˈoʊpən/","opinion":"/əˈpɪnjən/","option":"/ˈɑpʃən/","order":"/ˈɔrdər/","outside":"/ˈaʊtˈsaɪd/","overhear":"/ˈoʊvərˈhir/","overnight":"/ˈoʊvərˈnaɪt/","overwhelmed":"/ˌoʊvərˈwelmd/","pack":"/pæk/","package":"/ˈpækədʒ/","page":"/peɪdʒ/","pain":"/peɪn/","paper":"/ˈpeɪpər/","pass":"/pæs/","password":"/ˈpæˌswɜrd/","path":"/pæθ/","patience":"/ˈpeɪʃəns/","pay":"/peɪ/","peanut":"/ˈpinət/","pen":"/pen/","pencil":"/ˈpensəl/","penicillin":"/ˌpenəˈsɪlən/","people":"/ˈpipəl/","perfect":"/ˈpɜrfɪkt/","pharmacy":"/ˈfɑrməsi/","phone":"/foʊn/","photo":"/ˈfoʊˌtoʊ/","photography":"/fəˈtɑɡrəfi/","pick":"/pɪk/","picture":"/ˈpɪktʃər/","pill":"/pɪl/","pipe":"/paɪp/","place":"/pleɪs/","plan":"/plæn/","plant":"/plænt/","plate":"/pleɪt/","platform":"/ˈplætˌfɔrm/","play":"/pleɪ/","pleasure":"/ˈpleʒər/","point":"/pɔɪnt/","poisoning":"/ˈpɔɪzənɪŋ/","policy":"/ˈpɑləsi/","possible":"/ˈpɑsəbəl/","post":"/poʊst/","practice":"/ˈpræktəs/","prescription":"/prəˈskrɪpʃən/","price":"/praɪs/","private":"/ˈpraɪvət/","professionally":"/prəˈfeʃənəli/","project":"/ˈprɑdʒekt/","pronunciation":"/proʊˌnʌnsiˈeɪʃən/","properly":"/ˈprɑpərli/","propose":"/prəˈpoʊz/","push":"/pʊʃ/","question":"/ˈkwestʃən/","quickly":"/ˈkwɪkli/","quite":"/kwaɪt/","range":"/reɪndʒ/","rather":"/ˈræðər/","read":"/rid/","ready":"/ˈredi/","real":"/ril/","really":"/ˈrɪli/","receipt":"/rɪˈsit/","recharge":"/riˈtʃɑrdʒ/","recommend":"/ˌrekəˈmend/","recover":"/rɪˈkʌvər/","refill":"/ˈrifɪl/","refund":"/ˈrifʌnd/","reinvent":"/ˌriɪnˈvent/","renew":"/rɪˈnu/","rent":"/rent/","request":"/rɪˈkwest/","reschedule":"/riˈskedʒul/","reservation":"/ˌrezərˈveɪʃən/","restroom":"/ˈreˌstrum/","return":"/rɪˈtɜrn/","right":"/raɪt/","ring":"/rɪŋ/","rip":"/rɪp/","room":"/rum/","run":"/rʌn/","rusty":"/ˈrʌsti/","sad":"/sæd/","sale":"/seɪl/","salt":"/sɔlt/","sauce":"/sɔs/","save":"/seɪv/","schedule":"/ˈskedʒul/","scope":"/skoʊp/","screen":"/skrin/","seat":"/sit/","second":"/ˈsekənd/","section":"/ˈsekʃən/","seem":"/sim/","semester":"/səˈmestər/","send":"/send/","sense":"/sens/","serious":"/ˈsɪriəs/","service":"/ˈsɜrvəs/","share":"/ʃer/","shoe":"/ʃu/","shop":"/ʃɑp/","short":"/ʃɔrt/","shot":"/ʃɑt/","show":"/ʃoʊ/","sick":"/sɪk/","side":"/saɪd/","sign":"/saɪn/","since":"/sɪns/","sink":"/sɪŋk/","size":"/saɪz/","sleep":"/slip/","slow":"/sloʊ/","slowly":"/ˈsloʊli/","small":"/smɔl/","sneeze":"/sniz/","soccer":"/ˈsɑkər/","social":"/ˈsoʊʃəl/","someday":"/ˈsʌmˌdeɪ/","someone":"/ˈsʌmˌwʌn/","something":"/ˈsʌmθɪŋ/","sometime":"/ˈsʌmˌtaɪm/","soon":"/sun/","sore":"/sɔr/","sorry":"/ˈsɑri/","sound":"/saʊnd/","speak":"/spik/","speaker":"/ˈspikər/","special":"/ˈspeʃəl/","spell":"/spel/","spend":"/spend/","spicy":"/ˈspaɪsi/","split":"/splɪt/","splurge":"/splɜrdʒ/","spot":"/spɑt/","sprain":"/spreɪn/","stand":"/stænd/","start":"/stɑrt/","station":"/ˈsteɪʃən/","steak":"/steɪk/","stock":"/stɑk/","stomach":"/ˈstʌmək/","stop":"/stɑp/","store":"/stɔr/","story":"/ˈstɔri/","strength":"/streŋkθ/","stretch":"/stretʃ/","strike":"/straɪk/","student":"/ˈstudənt/","study":"/ˈstʌdi/","subtitle":"/ˈsʌbˌtaɪtəl/","sugar":"/ˈʃʊɡər/","sunday":"/ˈsʌnˌdeɪ/","sure":"/ʃʊr/","swallow":"/ˈswɑloʊ/","swamped":"/swɔmpt/","swim":"/swɪm/","symptom":"/ˈsɪmptəm/","table":"/ˈteɪbəl/","tag":"/tæɡ/","take":"/teɪk/","talk":"/tɔk/","taxi":"/ˈtæksi/","tea":"/ti/","terrible":"/ˈterəbəl/","test":"/test/","text":"/tekst/","textbook":"/ˈtekstˌbʊk/","thank":"/θæŋk/","thin":"/θɪn/","thing":"/θɪŋ/","think":"/θɪŋk/","throat":"/θroʊt/","through":"/θru/","thursday":"/ˈθɜrzˌdeɪ/","ticket":"/ˈtɪkət/","time":"/taɪm/","tired":"/ˈtaɪərd/","today":"/təˈdeɪ/","toilet":"/ˈtɔɪlət/","tomorrow":"/təˈmɑroʊ/","tonight":"/təˈnaɪt/","top":"/tɑp/","torn":"/tɔrn/","total":"/ˈtoʊtəl/","touch":"/tʌtʃ/","train":"/treɪn/","transfer":"/trænsˈfɜr/","trash":"/træʃ/","troll":"/troʊl/","trouble":"/ˈtrʌbəl/","try":"/traɪ/","turn":"/tɜrn/","twice":"/twaɪs/","twist":"/twɪst/","understand":"/ˌʌndərˈstænd/","unsubscribe":"/ənsəbˈskraɪb/","until":"/ənˈtɪl/","unwind":"/ənˈwaɪnd/","update":"/ʌpˈdeɪt/","upgrade":"/ˈʌpɡreɪd/","utilities":"/juˈtɪlətiz/","vacation":"/veɪˈkeɪʃən/","vegetarian":"/ˌvedʒəˈteˌriən/","video":"/ˈvɪdioʊ/","viral":"/ˈvaɪrəl/","wait":"/weɪt/","walk":"/wɔk/","warranty":"/ˈwɔrənti/","wash":"/wɑʃ/","watch":"/wɑtʃ/","water":"/ˈwɔtər/","way":"/weɪ/","weather":"/ˈweðər/","week":"/wik/","weekend":"/ˈwiˌkend/","weird":"/wɪrd/","wheel":"/wil/","whose":"/huz/","window":"/ˈwɪndoʊ/","wine":"/waɪn/","within":"/wɪˈðɪn/","without":"/wɪˈθaʊt/","word":"/wɜrd/","work":"/wɜrk/","world":"/wɜrld/","worried":"/ˈwʌrid/","worry":"/ˈwʌri/","worth":"/wɜrθ/","wrap":"/ræp/","wrong":"/rɔŋ/","year":"/jɪr/","yoga":"/ˈjoʊɡə/"};
/* phase 3 headwords (tools/ipa.py) */
Object.assign(IPA, {"decide":"/dɪˈsaɪd/","able":"/ˈeɪbəl/","abroad":"/əˈbrɔd/","absent":"/ˈæbsənt/","accidentally":"/ˌæksəˈdentəli/","ace":"/eɪs/","add":"/æd/","affect":"/əˈfekt/","afternoon":"/ˌæftərˈnun/","agenda":"/əˈdʒendə/","air":"/er/","alarm":"/əˈlɑrm/","alcohol":"/ˈælkəˌhɑl/","algorithm":"/ˈælɡəˌrɪðəm/","allow":"/əˈlaʊ/","almost":"/ˈɔlˌmoʊst/","alone":"/əˈloʊn/","always":"/ˈɔlˌweɪz/","amazing":"/əˈmeɪzɪŋ/","angry":"/ˈæŋɡri/","annoyed":"/əˈnɔɪd/","antibiotic":"/ˌæntibaɪˈɑtɪk/","anyone":"/ˈeniˌwʌn/","apartment":"/əˈpɑrtmənt/","apologize":"/əˈpɑləˌdʒaɪz/","apply":"/əˈplaɪ/","argument":"/ˈɑrɡjəmənt/","arm":"/ɑrm/","audience":"/ˈɑdiəns/","authentication":"/ɔˌθentəˈkeɪʃən/","available":"/əˈveɪləbəl/","avoid":"/əˈvɔɪd/","away":"/əˈweɪ/","balance":"/ˈbæləns/","ballpark":"/ˈbɔlˌpɑrk/","bandage":"/ˈbændɪdʒ/","bathroom":"/ˈbæˌθrum/","battery":"/ˈbætəri/","beach":"/bitʃ/","bearings":"/ˈberɪŋz/","because":"/bɪˈkɔz/","beside":"/bɪˈsaɪd/","binge":"/bɪndʒ/","biology":"/baɪˈɑlədʒi/","bleed":"/blid/","blog":"/blɔɡ/","blood":"/blʌd/","blow":"/bloʊ/","board":"/bɔrd/","boat":"/boʊt/","bored":"/bɔrd/","box":"/bɑks/","brand":"/brænd/","breathe":"/brið/","bring":"/brɪŋ/","budget":"/ˈbʌdʒɪt/","buffer":"/ˈbʌfər/","bug":"/bʌɡ/","business":"/ˈbɪznəs/","bye":"/baɪ/","cache":"/kæʃ/","calendar":"/ˈkæləndər/","car":"/kɑr/","care":"/ker/","careful":"/ˈkerfəl/","carpet":"/ˈkɑrpət/","case":"/keɪs/","casual":"/ˈkæʒəwəl/","cat":"/kæt/","center":"/ˈsentər/","challenge":"/ˈtʃæləndʒ/","chamber":"/ˈtʃeɪmbər/","chance":"/tʃæns/","checkout":"/ˈtʃekˌaʊt/","cheer":"/tʃɪr/","cite":"/saɪt/","city":"/ˈsɪti/","clearance":"/ˈklɪrəns/","clickbait":"/ˈklɪkˌbeɪt/","clog":"/klɑɡ/","closer":"/ˈkloʊsər/","cloud":"/klaʊd/","club":"/klʌb/","coat":"/koʊt/","coincidence":"/koʊˈɪnsɪdəns/","color":"/ˈkʌlər/","comic":"/ˈkɑmɪk/","commit":"/kəˈmɪt/","company":"/ˈkʌmpəˌni/","compare":"/kəmˈper/","compensate":"/ˈkɑmpənˌseɪt/","competitive":"/kəmˈpetətɪv/","complement":"/ˈkɑmpləmənt/","completely":"/kəmˈplitli/","concert":"/ˈkɑnsərt/","conditioning":"/kənˈdɪʃənɪŋ/","confirm":"/kənˈfɜrm/","constructive":"/kənˈstrʌktɪv/","cool":"/kul/","coupon":"/ˈkuˌpɔn/","crack":"/kræk/","crave":"/kreɪv/","criticism":"/ˈkrɪtɪˌsɪzəm/","crowd":"/kraʊd/","curve":"/kɜrv/","dabble":"/ˈdæbəl/","dance":"/dæns/","decaf":"/ˈdiˌkæf/","defective":"/dɪˈfektɪv/","delete":"/dɪˈlit/","deliver":"/dɪˈlɪvər/","delivery":"/dɪˈlɪvəri/","dentist":"/ˈdentəst/","depend":"/dɪˈpend/","designer":"/dɪˈzaɪnər/","desk":"/desk/","dessert":"/dɪˈzɜrt/","detail":"/dɪˈteɪl/","dial":"/ˈdaɪəl/","direction":"/dəˈrekʃən/","dirty":"/ˈdɜrti/","discussion":"/dɪˈskʌʃən/","dishwasher":"/ˈdɪʃˌwɑʃər/","dm":"/ˌdiˈem/","dose":"/doʊs/","double":"/ˈdʌbəl/","download":"/ˈdaʊnˌloʊd/","drag":"/dræɡ/","drink":"/drɪŋk/","drop":"/drɑp/","drowsy":"/ˈdraʊzi/","dull":"/dʌl/","during":"/ˈdʊrɪŋ/","dutch":"/dʌtʃ/","echo":"/ˈekoʊ/","edged":"/edʒd/","effortless":"/ˈefərtləs/","egg":"/eɡ/","electricity":"/ɪˌlekˈtrɪsəti/","else":"/els/","empty":"/ˈempti/","end":"/end/","energy":"/ˈenərdʒi/","enjoy":"/ˌenˈdʒɔɪ/","enough":"/ɪˈnʌf/","ever":"/ˈevər/","exactly":"/ɪɡˈzæktli/","excited":"/ɪkˈsaɪtəd/","excuse":"/ɪkˈskjuz/","exhausted":"/ɪɡˈzɔstɪd/","exit":"/ˈeɡzɪt/","expect":"/ɪkˈspekt/","expensive":"/ɪkˈspensɪv/","experience":"/ɪkˈspɪriəns/","extend":"/ɪkˈstend/","extra":"/ˈekstrə/","face":"/feɪs/","factor":"/ˈfæktər/","fail":"/feɪl/","fair":"/fer/","fake":"/feɪk/","fall":"/fɔl/","familiar":"/fəˈmɪljər/","family":"/ˈfæməli/","fast":"/fæst/","faucet":"/ˈfɔsət/","fault":"/fɔlt/","favorite":"/ˈfeɪvərɪt/","fed":"/fed/","fee":"/fi/","festival":"/ˈfestəvəl/","figure":"/ˈfɪɡjər/","fill":"/fɪl/","final":"/ˈfaɪnəl/","fine":"/faɪn/","finger":"/ˈfɪŋɡər/","finish":"/ˈfɪnɪʃ/","fishing":"/ˈfɪʃɪŋ/","five":"/faɪv/","fixer":"/ˈfɪksər/","flavor":"/ˈfleɪvər/","flu":"/flu/","follower":"/ˈfɑloʊər/","foot":"/fʊt/","four":"/fɔr/","fresh":"/freʃ/","fridge":"/frɪdʒ/","fries":"/fraɪz/","furniture":"/ˈfɜrnɪtʃər/","gate":"/ɡeɪt/","give":"/ɡɪv/","glad":"/ɡlæd/","grade":"/ɡreɪd/","grateful":"/ˈɡreɪtfəl/","groceries":"/ˈɡroʊsəriz/","ground":"/ɡraʊnd/","hack":"/hæk/","half":"/hæf/","halfway":"/ˈhæfˈweɪ/","hang":"/hæŋ/","happen":"/ˈhæpən/","hard":"/hɑrd/","hate":"/heɪt/","headline":"/ˈhedˌlaɪn/","heat":"/hit/","hello":"/həˈloʊ/","high":"/haɪ/","himself":"/hɪmˈself/","hole":"/hoʊl/","homebody":"/ˈhoʊmˌbɑdi/","hospital":"/ˈhɑˌspɪtəl/","hotel":"/hoʊˈtel/","house":"/haʊs/","huge":"/hjudʒ/","idea":"/aɪˈdiə/","influencer":"/ˈɪnfluənsər/","inside":"/ˌɪnˈsaɪd/","installment":"/ˌɪnˈstɔlmənt/","instead":"/ˌɪnˈsted/","interest":"/ˈɪntrəst/","interrupt":"/ˌɪntəˈrʌpt/","itchy":"/ˈɪtʃi/","kid":"/kɪd/","knee":"/ni/","knit":"/nɪt/","korea":"/kəˈriə/","laid":"/leɪd/","laptop":"/ˈlæpˌtɑp/","large":"/lɑrdʒ/","latte":"/ˈlɑteɪ/","layover":"/ˈleɪˌoʊvər/","leg":"/leɡ/","library":"/ˈlaɪbreˌri/","lifestyle":"/ˈlaɪfˌstaɪl/","lifetime":"/ˈlaɪfˌtaɪm/","limit":"/ˈlɪmət/","line":"/laɪn/","listen":"/ˈlɪsən/","listener":"/ˈlɪsənər/","live":"/lɪv/","livestream":"/ˈlaɪvˌstrim/","load":"/loʊd/","log":"/lɔɡ/","loop":"/lup/","lose":"/luz/","low":"/loʊ/","lunch":"/lʌntʃ/","lunchtime":"/ˈlʌntʃˌtaɪm/","main":"/meɪn/","marathon":"/ˈmerəˌθɑn/","math":"/mæθ/","medication":"/ˌmedəˈkeɪʃən/","memory":"/ˈmeməri/","mention":"/ˈmenʃən/","mess":"/mes/","mind":"/maɪnd/","mold":"/moʊld/","mom":"/mɑm/","monday":"/ˈmʌndi/","money":"/ˈmʌni/","month":"/mʌnθ/","motivated":"/ˈmoʊtəˌveɪtəd/","muscle":"/ˈmʌsəl/","museum":"/mjuˈziəm/","nap":"/næp/","napkin":"/ˈnæpkɪn/","nature":"/ˈneɪtʃər/","near":"/nɪr/","nearby":"/ˈnɪrˈbaɪ/","needle":"/ˈnidəl/","neighborhood":"/ˈneɪbərˌhʊd/","neither":"/ˈniðər/","never":"/ˈnevər/","news":"/nuz/","nighter":"/ˈnaɪtər/","nightmare":"/ˈnaɪtˌmer/","nine":"/naɪn/","nobody":"/ˈnoʊˌbɑˌdi/","nose":"/noʊz/","note":"/noʊt/","notice":"/ˈnoʊtəs/","notification":"/ˌnoʊtəfəˈkeɪʃən/","oat":"/oʊt/","obsessed":"/əbˈsest/","office":"/ˈɔfɪs/","okay":"/ˌoʊˈkeɪ/","once":"/wʌns/","onion":"/ˈʌnjən/","opportunity":"/ˌɑpərˈtunəti/","outdoors":"/ˈaʊtˈdɔrz/","overcharge":"/ˌoʊvərˈtʃɑrdʒ/","overcook":"/ˌoʊvərˈkʊk/","overrate":"/ˌoʊvərˈreɪt/","overshare":"/ˌoʊvərˈʃer/","paint":"/peɪnt/","painting":"/ˈpeɪntɪŋ/","park":"/pɑrk/","party":"/ˈpɑrti/","passport":"/ˈpæˌspɔrt/","pasta":"/ˈpɑstə/","pdf":"/ˌpidiˈef/","perfectionist":"/pərˈfekʃənəst/","person":"/ˈpɜrsən/","personally":"/ˈpɜrsənəli/","pet":"/pet/","phishing":"/ˈfɪʃɪŋ/","piano":"/piˈænoʊ/","pleasantly":"/ˈplezəntli/","plumber":"/ˈplʌmər/","podcast":"/ˈpɑdˌkæst/","pop":"/pɑp/","popular":"/ˈpɑpjələr/","portion":"/ˈpɔrʃən/","potential":"/pəˈtenʃəl/","prefer":"/prəˈfɜr/","presentation":"/ˌprezənˈteɪʃən/","pressure":"/ˈpreʃər/","pretty":"/ˈprɪti/","pricey":"/ˈpraɪsi/","print":"/prɪnt/","printer":"/ˈprɪntər/","prioritize":"/praɪˈɔrəˌtaɪz/","privacy":"/ˈpraɪvəsi/","probably":"/ˈprɑbəˌbli/","problem":"/ˈprɑbləm/","procrastinate":"/prəˈkræstəˌneɪt/","professor":"/prəˈfesər/","proud":"/praʊd/","pull":"/pʊl/","quality":"/ˈkwɑləti/","quick":"/kwɪk/","quiet":"/ˈkwaɪət/","rabbit":"/ˈræbət/","rain":"/reɪn/","rash":"/ræʃ/","rearrange":"/ˌriəˈreɪndʒ/","reception":"/rɪˈsepʃən/","recognize":"/ˈrekəɡˌnaɪz/","recur":"/rɪˈkɜr/","recycling":"/riˈsaɪkəlɪŋ/","relationship":"/rɪˈleɪʃənˌʃɪp/","relieve":"/rɪˈliv/","relieved":"/rɪˈlivd/","relocate":"/ˌriˈloʊkeɪt/","remote":"/rɪˈmoʊt/","repair":"/rɪˈper/","repeat":"/rɪˈpit/","rephrase":"/riˈfreɪz/","reply":"/rɪˈplaɪ/","report":"/riˈpɔrt/","reset":"/riˈset/","resource":"/ˈrisɔrs/","respect":"/rɪˈspekt/","respectfully":"/rɪˈspektfəli/","rest":"/rest/","restaurant":"/ˈrestəˌrɑnt/","result":"/rɪˈzʌlt/","rich":"/rɪtʃ/","roommate":"/ˈruˌmeɪt/","round":"/raʊnd/","route":"/rut/","rule":"/rul/","runny":"/ˈrʌni/","safe":"/seɪf/","salad":"/ˈsæləd/","salary":"/ˈsæləri/","saturday":"/ˈsætərdi/","scared":"/skerd/","scenic":"/ˈsinɪk/","scholarship":"/ˈskɑlərˌʃɪp/","selfie":"/ˈselfi/","sell":"/sel/","sensitive":"/ˈsensətɪv/","seoul":"/soʊl/","series":"/ˈsɪriz/","set":"/set/","setting":"/ˈsetɪŋ/","settle":"/ˈsetəl/","sharp":"/ʃɑrp/","ship":"/ʃɪp/","shipping":"/ˈʃɪpɪŋ/","shirt":"/ʃɜrt/","shoestring":"/ˈʃuˌstrɪŋ/","shower":"/ˈʃaʊər/","shut":"/ʃʌt/","sidetrack":"/ˈsaɪdˌtræk/","sight":"/saɪt/","sim":"/sɪm/","simple":"/ˈsɪmpəl/","sing":"/sɪŋ/","sit":"/sɪt/","situation":"/ˌsɪtʃuˈeɪʃən/","six":"/sɪks/","ski":"/ski/","skin":"/skɪn/","smoke":"/smoʊk/","somewhere":"/ˈsʌmˌwer/","song":"/sɔŋ/","source":"/sɔrs/","spare":"/sper/","sport":"/spɔrt/","spread":"/spred/","squeamish":"/ˈskwimɪʃ/","squeeze":"/skwiz/","stay":"/steɪ/","steal":"/stil/","steep":"/stip/","step":"/step/","straw":"/strɔ/","stream":"/strim/","stress":"/stres/","stressed":"/strest/","struggle":"/ˈstrʌɡəl/","stuck":"/stʌk/","stuff":"/stʌf/","stuffy":"/ˈstʌfi/","style":"/staɪl/","sugarcoat":"/ˈʃʊɡərˌkoʊt/","suggest":"/səˈdʒest/","summer":"/ˈsʌmər/","surgery":"/ˈsɜrdʒəri/","surprise":"/sərˈpraɪz/","surprised":"/sərˈpraɪzd/","swap":"/swɑp/","sweet":"/swit/","swelling":"/ˈswelɪŋ/","switch":"/swɪtʃ/","sword":"/sɔrd/","tailor":"/ˈteɪlər/","takeout":"/ˈteɪˌkaʊt/","talker":"/ˈtɔkər/","teach":"/titʃ/","tell":"/tel/","tend":"/tend/","tennis":"/ˈtenəs/","tentative":"/ˈtentətɪv/","term":"/tɜrm/","therapeutic":"/ˌθerəˈpjutɪk/","thesis":"/ˈθisəs/","thought":"/θɔt/","throw":"/θroʊ/","tight":"/taɪt/","tip":"/tɪp/","together":"/təˈɡeðər/","tongue":"/tʌŋ/","toothache":"/ˈtuθˌeɪk/","tourist":"/ˈtʊrəst/","towel":"/ˈtaʊəl/","track":"/træk/","traffic":"/ˈtræfɪk/","trap":"/træp/","travel":"/ˈtrævəl/","treat":"/trit/","treatment":"/ˈtritmənt/","trip":"/trɪp/","tuesday":"/ˈtuzdi/","tv":"/ˌtiˈvi/","twelve":"/twelv/","unless":"/ənˈles/","upper":"/ˈʌpər/","urgent":"/ˈɜrdʒənt/","use":"/juz/","usual":"/ˈjuʒəwəl/","usually":"/ˈjuʒuəli/","vacuum":"/ˈvækjum/","violin":"/vaɪəˈlɪn/","voice":"/vɔɪs/","waive":"/weɪv/","wake":"/weɪk/","wall":"/wɔl/","wallet":"/ˈwɔlət/","warm":"/wɔrm/","washable":"/ˈwɑʃəbəl/","weakness":"/ˈwiknəs/","website":"/ˈwebˌsaɪt/","weigh":"/weɪ/","weight":"/weɪt/","welcome":"/ˈwelkəm/","whether":"/ˈweðər/","while":"/waɪl/","wit":"/wɪt/","worse":"/wɜrs/","write":"/raɪt/","yesterday":"/ˈjestərˌdeɪ/","zipper":"/ˈzɪpər/"});
for (const [w, i] of Object.entries(IPA)) if (WORDS[w]) WORDS[w].ipa = i;
