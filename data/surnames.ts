/**
 * 성씨 관용 표기 테이블.
 *
 * - 성씨 표기는 이 파일에서만 관리한다(lib/romanize는 규칙 표기만 계산).
 * - common 배열은 실제 여권에서 많이 쓰이는 순서로 적습니다. 첫 항목이 가장 흔한 표기.
 * - slug는 성씨 페이지 URL(/surname/[slug])이며 서로 겹치지 않아야 합니다.
 * - note는 성씨 페이지의 고유 설명입니다. 표기 선택에 참고가 될 사실만 적습니다.
 *
 * 순서 근거: 외교부 여권 발급 통계에 기반한 성씨 영문 표기 빈도(언론 공개 자료) 및
 * 일반적으로 알려진 관용 표기. 정확한 비율은 공개 시점마다 달라 숫자는 싣지 않습니다.
 */

export interface SurnameEntry {
  /** 한글 성 */
  hangul: string;
  /** URL slug */
  slug: string;
  /** 많이 쓰는 영문 표기, 빈도 높은 순 */
  common: string[];
  /** 성씨 페이지에 쓰는 고유 설명 */
  note: string;
}

export const SURNAMES: readonly SurnameEntry[] = [
  { hangul: "김", slug: "kim", common: ["Kim", "Gim"], note: "여권의 거의 전부가 Kim을 씁니다. 규칙 표기 Gim은 가족 중 이미 Kim으로 발급받은 사람이 있으면 피하는 것이 좋습니다." },
  { hangul: "이", slug: "lee", common: ["Lee", "Yi", "Rhee", "Li"], note: "규칙대로 적으면 I 한 글자가 되어 영문 이름으로 어색하기 때문에 Lee가 압도적으로 많습니다. Yi는 학술·문화계에서, Rhee는 일부 집안에서 씁니다." },
  { hangul: "박", slug: "park", common: ["Park", "Pak", "Bak"], note: "Park이 대부분입니다. 영어 단어 park와 겹쳐 발음이 쉬운 반면, 규칙 표기 Bak은 해외에서 '박'에 가깝게 읽힙니다." },
  { hangul: "최", slug: "choi", common: ["Choi", "Choe"], note: "Choi가 압도적입니다. 다만 영어권에서 '초이'로 읽히는 경우가 많아, 발음을 중시하면 규칙 표기 Choe를 고려할 수 있습니다." },
  { hangul: "정", slug: "jung", common: ["Jung", "Jeong", "Chung"], note: "Jung과 규칙 표기 Jeong이 비슷하게 많이 쓰이며, 과거 세대에는 Chung도 흔합니다. 가족 간 표기가 갈리기 쉬운 성씨입니다." },
  { hangul: "강", slug: "kang", common: ["Kang", "Gang"], note: "Kang이 대부분입니다. 규칙 표기 Gang은 영어 단어 gang(패거리)과 겹쳐 꺼리는 사람이 많습니다." },
  { hangul: "조", slug: "cho", common: ["Cho", "Jo", "Joe"], note: "Cho가 많고 규칙 표기 Jo도 꽤 쓰입니다. 주(Joo)·추(Choo)와 구별되도록 가족 표기를 통일하는 것이 중요합니다." },
  { hangul: "윤", slug: "yoon", common: ["Yoon", "Yun", "Youn"], note: "Yoon과 규칙 표기 Yun이 비슷하게 쓰입니다. 연(Yeon/Youn)과 혼동되지 않도록 주의합니다." },
  { hangul: "장", slug: "jang", common: ["Jang", "Chang"], note: "규칙 표기 Jang이 가장 많고, Chang은 과거 표기법의 영향으로 남아 있습니다. 창(Chang)씨와 겹칠 수 있습니다." },
  { hangul: "임", slug: "lim", common: ["Lim", "Im", "Yim", "Rim"], note: "Lim이 가장 많습니다. 규칙 표기 Im은 영어권에서 I'm으로 읽히기 쉬워 피하는 경우가 있고, 림(Rim)과 한자 본관이 같은 집안도 있습니다." },
  { hangul: "한", slug: "han", common: ["Han", "Hahn"], note: "규칙 표기와 관용 표기가 Han으로 같습니다. 드물게 독일식 Hahn을 씁니다." },
  { hangul: "오", slug: "oh", common: ["Oh", "O"], note: "규칙 표기는 O 한 글자지만 거의 모두 Oh를 씁니다. 한 글자 성은 전산 입력 시 오류가 생기기도 합니다." },
  { hangul: "서", slug: "seo", common: ["Seo", "Suh", "Sur"], note: "규칙 표기 Seo가 가장 많고 Suh가 그 다음입니다. Seo는 영어권에서 '세오'로 읽히기도 합니다." },
  { hangul: "신", slug: "shin", common: ["Shin", "Sin"], note: "Shin이 대부분입니다. 규칙 표기 Sin은 영어 단어 sin(죄)과 겹쳐 거의 쓰지 않습니다." },
  { hangul: "권", slug: "kwon", common: ["Kwon", "Gwon", "Kweon"], note: "Kwon이 대부분입니다. 규칙 표기 Gwon은 드뭅니다." },
  { hangul: "황", slug: "hwang", common: ["Hwang", "Whang"], note: "규칙 표기와 관용 표기가 Hwang으로 같습니다. 드물게 Whang을 씁니다." },
  { hangul: "안", slug: "ahn", common: ["Ahn", "An"], note: "Ahn과 규칙 표기 An이 비슷하게 쓰입니다. An은 영어 부정관사와 같아 Ahn을 택하는 경우가 많습니다." },
  { hangul: "송", slug: "song", common: ["Song"], note: "규칙 표기와 관용 표기가 Song으로 같습니다. 영어 단어 song과 같아 외국인도 쉽게 읽습니다." },
  { hangul: "전", slug: "jeon", common: ["Jeon", "Jun", "Chun", "Chon"], note: "규칙 표기 Jeon이 가장 많고 Jun, Chun이 뒤를 잇습니다. Jun은 이름 '준'과, Chun은 천(Chun)씨와 겹칩니다." },
  { hangul: "홍", slug: "hong", common: ["Hong"], note: "규칙 표기와 관용 표기가 Hong으로 같습니다." },
  { hangul: "유", slug: "yoo", common: ["Yoo", "Yu", "You", "Ryu"], note: "Yoo가 가장 많고 규칙 표기 Yu도 많이 씁니다. You는 영어 단어와 같아 읽기 쉽지만 어색하게 느끼는 사람도 있습니다. 류(柳)씨 중 '유'로 쓰는 집안도 있습니다." },
  { hangul: "고", slug: "ko", common: ["Ko", "Go", "Koh"], note: "Ko가 가장 많고 규칙 표기 Go도 많습니다. Go는 영어 동사와 같아 피하는 경우가 있습니다." },
  { hangul: "문", slug: "moon", common: ["Moon", "Mun"], note: "Moon이 대부분입니다. 규칙 표기 Mun은 드뭅니다." },
  { hangul: "양", slug: "yang", common: ["Yang"], note: "규칙 표기와 관용 표기가 Yang으로 같습니다." },
  { hangul: "손", slug: "son", common: ["Son", "Sohn"], note: "규칙 표기 Son이 가장 많고 Sohn도 꽤 쓰입니다. Son은 영어 단어 son(아들)과 같습니다." },
  { hangul: "배", slug: "bae", common: ["Bae", "Pae"], note: "규칙 표기 Bae가 대부분입니다." },
  { hangul: "백", slug: "baek", common: ["Baek", "Back", "Paik", "Baik"], note: "규칙 표기 Baek이 가장 많고 Back, Paik도 쓰입니다. Back은 영어 단어와 같아 읽기 쉽습니다." },
  { hangul: "허", slug: "heo", common: ["Heo", "Huh", "Hur", "Her"], note: "규칙 표기 Heo와 Huh가 비슷하게 쓰입니다. Her는 영어 단어와 겹쳐 피하는 편입니다." },
  { hangul: "남", slug: "nam", common: ["Nam"], note: "규칙 표기와 관용 표기가 Nam으로 같습니다." },
  { hangul: "심", slug: "shim", common: ["Shim", "Sim"], note: "Shim이 가장 많고 규칙 표기 Sim도 쓰입니다. 신(Shin)과 비슷하게 ㅅ을 sh로 적는 관행입니다." },
  { hangul: "노", slug: "noh", common: ["Noh", "No", "Roh", "Ro"], note: "Noh가 가장 많습니다. 규칙 표기 No는 영어 단어와 같아 피하는 사람이 많고, 한자 원음을 살린 Roh도 쓰입니다." },
  { hangul: "하", slug: "ha", common: ["Ha"], note: "규칙 표기와 관용 표기가 Ha로 같습니다." },
  { hangul: "곽", slug: "kwak", common: ["Kwak", "Gwak", "Kwag"], note: "Kwak이 대부분입니다. 규칙 표기 Gwak은 드뭅니다." },
  { hangul: "성", slug: "sung", common: ["Sung", "Seong"], note: "Sung이 가장 많고 규칙 표기 Seong도 적지 않습니다. 송(Song)·선(Sun)과 구별해야 합니다." },
  { hangul: "차", slug: "cha", common: ["Cha"], note: "규칙 표기와 관용 표기가 Cha로 같습니다." },
  { hangul: "주", slug: "joo", common: ["Joo", "Ju", "Chu", "Choo"], note: "Joo가 가장 많고 규칙 표기 Ju도 쓰입니다. Chu, Choo는 추씨와 겹칩니다." },
  { hangul: "우", slug: "woo", common: ["Woo", "U", "Wu"], note: "규칙 표기는 U 한 글자지만 거의 모두 Woo를 씁니다." },
  { hangul: "구", slug: "koo", common: ["Koo", "Ku", "Gu", "Goo"], note: "Koo가 가장 많습니다. 규칙 표기 Gu는 드뭅니다." },
  { hangul: "민", slug: "min", common: ["Min"], note: "규칙 표기와 관용 표기가 Min으로 같습니다." },
  { hangul: "류", slug: "ryu", common: ["Ryu", "Yoo", "Yu", "Ryoo"], note: "규칙 표기 Ryu가 가장 많습니다. 두음법칙에 따라 '유'로 읽는 집안은 Yoo/Yu를 쓰기도 하므로 가족 표기를 꼭 확인합니다." },
  { hangul: "나", slug: "na", common: ["Na", "Ra", "Nah"], note: "규칙 표기 Na가 대부분입니다. 한자 원음(羅)을 살린 Ra도 쓰입니다." },
  { hangul: "진", slug: "jin", common: ["Jin", "Chin"], note: "규칙 표기 Jin이 대부분입니다." },
  { hangul: "지", slug: "ji", common: ["Ji", "Jee", "Chi"], note: "규칙 표기 Ji가 대부분입니다." },
  { hangul: "엄", slug: "um", common: ["Um", "Eom", "Uhm", "Eum"], note: "Um이 가장 많고 규칙 표기 Eom도 쓰입니다. 음(Eum)씨와 겹칠 수 있습니다." },
  { hangul: "채", slug: "chae", common: ["Chae", "Chai"], note: "규칙 표기 Chae가 대부분입니다." },
  { hangul: "원", slug: "won", common: ["Won"], note: "규칙 표기와 관용 표기가 Won으로 같습니다." },
  { hangul: "천", slug: "chun", common: ["Chun", "Cheon"], note: "Chun이 가장 많고 규칙 표기 Cheon도 많습니다. 전(Chun)씨와 겹칠 수 있습니다." },
  { hangul: "방", slug: "bang", common: ["Bang", "Pang"], note: "규칙 표기 Bang이 대부분입니다." },
  { hangul: "공", slug: "kong", common: ["Kong", "Gong"], note: "Kong과 규칙 표기 Gong이 비슷하게 쓰입니다." },
  { hangul: "현", slug: "hyun", common: ["Hyun", "Hyeon"], note: "Hyun이 대부분입니다. 규칙 표기 Hyeon은 드뭅니다." },
  { hangul: "함", slug: "ham", common: ["Ham"], note: "규칙 표기와 관용 표기가 Ham으로 같습니다." },
  { hangul: "변", slug: "byun", common: ["Byun", "Byeon", "Byon"], note: "Byun이 가장 많고 규칙 표기 Byeon도 쓰입니다." },
  { hangul: "염", slug: "yeom", common: ["Yeom", "Youm", "Yum"], note: "규칙 표기 Yeom이 가장 많습니다. Yum은 영어 단어와 겹칩니다." },
  { hangul: "여", slug: "yeo", common: ["Yeo", "Yuh"], note: "규칙 표기 Yeo가 대부분입니다." },
  { hangul: "추", slug: "choo", common: ["Choo", "Chu"], note: "Choo와 규칙 표기 Chu가 비슷하게 쓰입니다. 주(Joo/Chu)씨와 겹칠 수 있습니다." },
  { hangul: "도", slug: "do", common: ["Do", "Doh"], note: "규칙 표기 Do가 대부분입니다. 영어 동사와 같아 Doh를 택하는 경우도 있습니다." },
  { hangul: "소", slug: "so", common: ["So", "Soh"], note: "규칙 표기 So가 대부분입니다." },
  { hangul: "석", slug: "seok", common: ["Seok", "Suk"], note: "규칙 표기 Seok이 가장 많고 Suk도 쓰입니다." },
  { hangul: "선", slug: "sun", common: ["Sun", "Seon"], note: "Sun이 가장 많고 규칙 표기 Seon도 쓰입니다. 성(Sung)·순(Soon)과 구별해야 합니다." },
  { hangul: "설", slug: "seol", common: ["Seol", "Sul"], note: "규칙 표기 Seol이 가장 많고 Sul도 쓰입니다." },
  { hangul: "마", slug: "ma", common: ["Ma"], note: "규칙 표기와 관용 표기가 Ma로 같습니다." },
  { hangul: "길", slug: "gil", common: ["Gil", "Kil"], note: "규칙 표기 Gil이 가장 많습니다." },
  { hangul: "연", slug: "yeon", common: ["Yeon", "Youn", "Yun"], note: "규칙 표기 Yeon이 가장 많습니다. 윤(Yun)과 겹치지 않도록 주의합니다." },
  { hangul: "위", slug: "wi", common: ["Wi", "Wee"], note: "규칙 표기 Wi가 가장 많습니다. 영어권에서는 Wee가 읽기 쉽습니다." },
  { hangul: "표", slug: "pyo", common: ["Pyo"], note: "규칙 표기와 관용 표기가 Pyo로 같습니다." },
  { hangul: "명", slug: "myung", common: ["Myung", "Myeong"], note: "Myung이 가장 많고 규칙 표기 Myeong도 쓰입니다." },
  { hangul: "기", slug: "ki", common: ["Ki", "Gi"], note: "Ki가 가장 많습니다. 규칙 표기 Gi는 드뭅니다." },
  { hangul: "반", slug: "ban", common: ["Ban", "Bahn"], note: "규칙 표기 Ban이 대부분입니다. 영어 단어 ban과 겹쳐 Bahn을 쓰는 경우도 있습니다." },
  { hangul: "왕", slug: "wang", common: ["Wang"], note: "규칙 표기와 관용 표기가 Wang으로 같습니다." },
  { hangul: "금", slug: "keum", common: ["Keum", "Geum", "Kum"], note: "Keum이 가장 많고 규칙 표기 Geum도 쓰입니다." },
  { hangul: "옥", slug: "ok", common: ["Ok", "Oak"], note: "규칙 표기 Ok이 대부분입니다. 영어 OK와 같아 Oak을 택하는 경우도 있습니다." },
  { hangul: "육", slug: "yook", common: ["Yook", "Yuk"], note: "Yook과 규칙 표기 Yuk이 비슷하게 쓰입니다." },
  { hangul: "인", slug: "in", common: ["In", "Ihn"], note: "규칙 표기 In이 대부분입니다. 영어 전치사와 같아 Ihn을 쓰는 경우도 있습니다." },
  { hangul: "맹", slug: "maeng", common: ["Maeng"], note: "규칙 표기와 관용 표기가 Maeng으로 같습니다." },
  { hangul: "제", slug: "je", common: ["Je", "Jae"], note: "규칙 표기 Je가 가장 많습니다." },
  { hangul: "모", slug: "mo", common: ["Mo"], note: "규칙 표기와 관용 표기가 Mo로 같습니다." },
  { hangul: "남궁", slug: "namgung", common: ["Namgung", "Namkoong", "Namkung"], note: "두 음절 성씨입니다. 규칙 표기 Namgung이 가장 많으며, 띄어 쓰지 않고 한 단어로 적습니다." },
  { hangul: "탁", slug: "tak", common: ["Tak", "Tark"], note: "규칙 표기 Tak이 대부분입니다." },
  { hangul: "국", slug: "kook", common: ["Kook", "Guk", "Kuk"], note: "Kook이 가장 많습니다. 규칙 표기 Guk은 드뭅니다." },
  { hangul: "어", slug: "eo", common: ["Eo", "Uh"], note: "규칙 표기 Eo가 가장 많습니다." },
  { hangul: "은", slug: "eun", common: ["Eun", "Un"], note: "규칙 표기 Eun이 대부분입니다." },
  { hangul: "편", slug: "pyeon", common: ["Pyeon", "Pyun"], note: "규칙 표기 Pyeon이 가장 많습니다." },
  { hangul: "용", slug: "yong", common: ["Yong"], note: "규칙 표기와 관용 표기가 Yong으로 같습니다." },
  { hangul: "예", slug: "ye", common: ["Ye", "Yea"], note: "규칙 표기 Ye가 대부분입니다." },
  { hangul: "경", slug: "kyung", common: ["Kyung", "Gyeong", "Kyoung"], note: "Kyung이 가장 많습니다. 규칙 표기 Gyeong은 드뭅니다." },
  { hangul: "봉", slug: "bong", common: ["Bong"], note: "규칙 표기와 관용 표기가 Bong으로 같습니다." },
  { hangul: "사", slug: "sa", common: ["Sa"], note: "규칙 표기와 관용 표기가 Sa로 같습니다." },
  { hangul: "부", slug: "boo", common: ["Boo", "Bu"], note: "Boo가 가장 많고 규칙 표기 Bu도 쓰입니다." },
  { hangul: "황보", slug: "hwangbo", common: ["Hwangbo"], note: "두 음절 성씨입니다. 규칙 표기와 관용 표기가 Hwangbo로 같으며 한 단어로 적습니다." },
  { hangul: "가", slug: "ga", common: ["Ga", "Ka"], note: "규칙 표기 Ga가 가장 많습니다." },
  { hangul: "복", slug: "bok", common: ["Bok", "Pok"], note: "규칙 표기 Bok이 대부분입니다." },
  { hangul: "태", slug: "tae", common: ["Tae"], note: "규칙 표기와 관용 표기가 Tae로 같습니다." },
  { hangul: "목", slug: "mok", common: ["Mok", "Mock"], note: "규칙 표기 Mok이 대부분입니다." },
  { hangul: "형", slug: "hyung", common: ["Hyung", "Hyeong"], note: "Hyung이 가장 많고 규칙 표기 Hyeong도 쓰입니다." },
  { hangul: "피", slug: "pi", common: ["Pi", "Pee"], note: "규칙 표기 Pi가 대부분입니다." },
  { hangul: "두", slug: "doo", common: ["Doo", "Du"], note: "Doo가 가장 많고 규칙 표기 Du도 쓰입니다." },
  { hangul: "감", slug: "kam", common: ["Kam", "Gam"], note: "Kam과 규칙 표기 Gam이 비슷하게 쓰입니다." },
  { hangul: "음", slug: "eum", common: ["Eum", "Um"], note: "규칙 표기 Eum이 가장 많습니다. 엄(Um)씨와 겹칠 수 있습니다." },
  { hangul: "빈", slug: "bin", common: ["Bin", "Been"], note: "규칙 표기 Bin이 대부분입니다. 영어 단어 bin과 같아 Been을 쓰는 경우도 있습니다." },
  { hangul: "동", slug: "dong", common: ["Dong"], note: "규칙 표기와 관용 표기가 Dong으로 같습니다." },
  { hangul: "온", slug: "on", common: ["On", "Ohn"], note: "규칙 표기 On이 대부분입니다. 영어 전치사와 같아 Ohn을 쓰는 경우도 있습니다." },
  { hangul: "호", slug: "ho", common: ["Ho"], note: "규칙 표기와 관용 표기가 Ho로 같습니다." },
  { hangul: "범", slug: "beom", common: ["Beom", "Bum"], note: "규칙 표기 Beom이 가장 많습니다. Bum은 영어 속어와 겹쳐 피하는 편입니다." },
  { hangul: "선우", slug: "sunwoo", common: ["Sunwoo", "Seonwoo", "Seonu"], note: "두 음절 성씨입니다. Sunwoo가 가장 많고, 규칙 표기 Seonu는 드뭅니다. 한 단어로 적습니다." },
  { hangul: "사공", slug: "sagong", common: ["Sagong"], note: "두 음절 성씨입니다. 규칙 표기와 관용 표기가 Sagong으로 같습니다." },
  { hangul: "제갈", slug: "jegal", common: ["Jegal"], note: "두 음절 성씨입니다. 규칙 표기와 관용 표기가 Jegal로 같습니다." },
  { hangul: "독고", slug: "dokgo", common: ["Dokgo", "Dokko"], note: "두 음절 성씨입니다. 규칙 표기 Dokgo가 가장 많습니다." },
  { hangul: "서문", slug: "seomun", common: ["Seomun", "Seomoon"], note: "두 음절 성씨입니다. 규칙 표기 Seomun이 가장 많습니다." },
];

const BY_HANGUL = new Map(SURNAMES.map((s) => [s.hangul, s]));
const BY_SLUG = new Map(SURNAMES.map((s) => [s.slug, s]));

export function findSurnameByHangul(hangul: string): SurnameEntry | undefined {
  return BY_HANGUL.get(hangul);
}

export function findSurnameBySlug(slug: string): SurnameEntry | undefined {
  return BY_SLUG.get(slug);
}
