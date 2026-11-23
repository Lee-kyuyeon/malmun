/* 재잘 · 앵두의 여행: three seasons (sky by balloon, sea by submarine, space by rocket). Every landmark gives a postcard
   with an English idiom that fits the place. Meters come from learning (js/climb.js). */
const CLIMB_TOP = 800;
const CLIMB_SEASONS = [
  {id:"sky", t:"하늘 여행", ride:"열기구", unit:"m", up:true, sky:["#BFE6FF","#7FC4F5","#4A7FD1","#2B3F8F","#141B45"],
   end:{t:"달 정거장", e:"🌙", line:"달까지 왔어! 여기서 본 지구는 정말 작고 예뻐."},
   marks:[
    {m:40,  t:"지붕 위 고양이", e:"🐈", en:"a bird's-eye view", ko:"높은 곳에서 내려다본 전경", ex:"From up here, you get a bird's-eye view of the whole town.", exko:"여기서는 마을 전체가 한눈에 내려다보여."},
    {m:90,  t:"연 날리는 언덕", e:"🪁", en:"It's a breeze.", ko:"식은 죽 먹기야", ex:"Don't worry about the test. It's a breeze.", exko:"시험 걱정 마. 식은 죽 먹기야."},
    {m:150, t:"참새 전깃줄", e:"🐦", en:"A little bird told me.", ko:"누가 그러던데 (출처는 비밀)", ex:"A little bird told me it's your birthday.", exko:"누가 그러던데 오늘 네 생일이라며."},
    {m:220, t:"뭉게구름 놀이터", e:"☁️", en:"on cloud nine", ko:"너무 행복한", ex:"She's been on cloud nine since she got the job.", exko:"그녀는 합격하고 나서 구름 위를 걷는 기분이야."},
    {m:300, t:"무지개 다리", e:"🌈", en:"Every cloud has a silver lining.", ko:"나쁜 일에도 좋은 면이 있어", ex:"I missed the bus, but I met an old friend. Every cloud has a silver lining.", exko:"버스는 놓쳤지만 옛 친구를 만났어. 나쁜 일에도 좋은 면이 있네."},
    {m:390, t:"비행기 길", e:"✈️", en:"The sky's the limit.", ko:"한계는 없어", ex:"With your talent, the sky's the limit.", exko:"네 재능이라면 한계가 없어."},
    {m:490, t:"번개 구름", e:"⚡", en:"out of the blue", ko:"갑자기, 난데없이", ex:"He called me out of the blue last night.", exko:"어젯밤 그가 갑자기 전화했어."},
    {m:590, t:"오로라 커튼", e:"🌌", en:"have your head in the clouds", ko:"딴생각에 빠져 있다", ex:"Sorry, I had my head in the clouds. What did you say?", exko:"미안, 딴생각했어. 뭐라고 했어?"},
    {m:690, t:"별똥별 정류장", e:"🌠", en:"reach for the stars", ko:"큰 꿈을 향해 가다", ex:"Don't be afraid to reach for the stars.", exko:"큰 꿈을 꾸는 걸 두려워하지 마."},
    {m:800, t:"달 정거장", e:"🌙", en:"over the moon", ko:"날아갈 듯 기쁜", ex:"I was over the moon when I passed the exam.", exko:"시험에 붙었을 때 날아갈 듯 기뻤어."}]},
  {id:"sea", t:"바다 탐험", ride:"잠수함", unit:"m", up:false, sky:["#9BE3F0","#3FB5D6","#1C7FB5","#0F4C82","#06213F"],
   end:{t:"진주 궁전", e:"🦪", line:"바다 맨 밑에서 반짝이는 진주를 찾았어!"},
   marks:[
    {m:40,  t:"모래성 해변", e:"🏖️", en:"make waves", ko:"평지풍파를 일으키다", ex:"He's new, so he doesn't want to make waves.", exko:"그는 신입이라 분란을 일으키고 싶지 않아 해."},
    {m:90,  t:"해파리 숲", e:"🪼", en:"go with the flow", ko:"흐름에 맡기다", ex:"We didn't plan much. We just went with the flow.", exko:"계획은 별로 안 했어. 그냥 흐름에 맡겼지."},
    {m:150, t:"거북이 정류장", e:"🐢", en:"Slow and steady wins the race.", ko:"천천히 꾸준히가 이긴다", ex:"Five minutes a day is enough. Slow and steady wins the race.", exko:"하루 5분이면 충분해. 천천히 꾸준히가 이겨."},
    {m:220, t:"산호초 마을", e:"🐠", en:"There are plenty of fish in the sea.", ko:"좋은 사람은 또 있어", ex:"Forget him. There are plenty of fish in the sea.", exko:"그 사람은 잊어. 좋은 사람은 또 있어."},
    {m:300, t:"문어 도서관", e:"🐙", en:"a fish out of water", ko:"물 밖에 나온 물고기처럼 어색한", ex:"I felt like a fish out of water at the party.", exko:"그 파티에서 물 밖에 나온 물고기처럼 어색했어."},
    {m:390, t:"고래 노래방", e:"🐋", en:"have a whale of a time", ko:"엄청 즐거운 시간을 보내다", ex:"We had a whale of a time at the festival.", exko:"축제에서 정말 신나게 놀았어."},
    {m:490, t:"난파선", e:"⚓", en:"in the same boat", ko:"같은 처지인", ex:"Don't worry, we're all in the same boat.", exko:"걱정 마, 우리 다 같은 처지야."},
    {m:590, t:"빙산 아래", e:"🧊", en:"the tip of the iceberg", ko:"빙산의 일각", ex:"These problems are just the tip of the iceberg.", exko:"이 문제들은 빙산의 일각일 뿐이야."},
    {m:690, t:"해저 동굴", e:"🦑", en:"test the waters", ko:"분위기를 떠보다", ex:"Let's test the waters before we start selling.", exko:"팔기 전에 반응부터 떠보자."},
    {m:800, t:"진주 궁전", e:"🦪", en:"The world is your oyster.", ko:"세상은 네 것이야", ex:"You're young and free. The world is your oyster.", exko:"넌 젊고 자유로워. 세상은 네 거야."}]},
  {id:"space", t:"우주 비행", ride:"로켓", unit:"km", up:true, sky:["#2B3F8F","#1B2466","#120F45","#0A0828","#030312"],
   end:{t:"별 정원", e:"✨", line:"별 정원에 도착! 여기 있는 별 하나에 네 이름을 붙였어."},
   marks:[
    {m:40,  t:"발사대", e:"🚀", en:"It's not rocket science.", ko:"그렇게 어려운 거 아니야", ex:"Just press start. It's not rocket science.", exko:"그냥 시작 눌러. 그렇게 어려운 거 아니야."},
    {m:90,  t:"구름 위 위성", e:"🛰️", en:"down to earth", ko:"소탈한, 현실적인", ex:"She's famous, but she's very down to earth.", exko:"그녀는 유명하지만 아주 소탈해."},
    {m:150, t:"달 뒷면", e:"🌑", en:"once in a blue moon", ko:"아주 가끔", ex:"I eat fast food once in a blue moon.", exko:"패스트푸드는 아주 가끔 먹어."},
    {m:220, t:"화성 사막", e:"🪐", en:"out of this world", ko:"끝내주게 좋은", ex:"The cake was out of this world.", exko:"케이크가 끝내주게 맛있었어."},
    {m:300, t:"토성 고리", e:"💫", en:"go around in circles", ko:"제자리걸음하다", ex:"We're going around in circles. Let's decide.", exko:"제자리걸음이야. 이제 결정하자."},
    {m:390, t:"혜성 꼬리", e:"☄️", en:"shoot for the moon", ko:"크게 도전하다", ex:"Shoot for the moon. Even if you miss, you'll land among the stars.", exko:"크게 도전해. 실패해도 별들 사이에 내려앉을 거야."},
    {m:490, t:"멍때리는 별", e:"🌀", en:"space out", ko:"멍때리다", ex:"Sorry, I spaced out for a second.", exko:"미안, 잠깐 멍때렸어."},
    {m:590, t:"행운의 별자리", e:"⭐", en:"thank your lucky stars", ko:"천만다행으로 여기다", ex:"Thank your lucky stars nobody got hurt.", exko:"아무도 안 다친 걸 천만다행으로 여겨."},
    {m:690, t:"외계인 카페", e:"👽", en:"worlds apart", ko:"완전히 다른", ex:"My brother and I are worlds apart.", exko:"우리 형이랑 나는 완전히 달라."},
    {m:800, t:"별 정원", e:"✨", en:"a star is born", ko:"새로운 스타의 탄생", ex:"After her first show, everyone said a star is born.", exko:"첫 공연이 끝나자 다들 스타가 탄생했다고 했어."}]}
];
/* small surprises every 25 m between landmarks */
const CLIMB_EVENTS = [
  {id:"wind",   e:"🌬️", t:"순풍을 탔어!", d:"다음 10m는 두 배로 올라가."},
  {id:"cherry", e:"🍒", t:"새가 체리를 물어다 줬어!", d:"체리 +3"},
  {id:"hello",  e:"👋", t:"지나가던 친구가 인사했어", d:"\"Fancy meeting you here!\" (여기서 다 만나네!)"},
  {id:"snack",  e:"🍪", t:"간식 타임!", d:"앵두가 쿠키를 먹고 기운이 났어. 체리 +2"},
  {id:"photo",  e:"📸", t:"인생 사진 한 장", d:"\"Say cheese!\" 찰칵! 엽서첩에 사진이 들어갔어."},
  {id:"view",   e:"👀", t:"경치 감상", d:"\"What a view!\" (경치 끝내준다!)"}
];
