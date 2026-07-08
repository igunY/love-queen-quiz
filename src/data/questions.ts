export interface Choice {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  score: number;
}

export interface Question {
  id: string;
  stage: number;
  axis: 1 | 2 | 3 | 4 | 5;
  text: string;
  choices: Choice[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    stage: 1,
    axis: 1,
    text: '気になる人ができた。最近の自分は——',
    choices: [
      { label: 'A', text: '通知が来てないかスマホを何度も見てしまう', score: 2 },
      { label: 'B', text: 'その人のことを考える時間が増えた', score: 1 },
      { label: 'C', text: '好きだけど、普段の生活はちゃんと回ってる', score: -1 },
      { label: 'D', text: '焦らず、ゆっくり距離を縮めればいいと思う', score: -2 },
    ],
  },
  {
    id: 'q2',
    stage: 1,
    axis: 1,
    text: '付き合うなら、どんな関係が理想?',
    choices: [
      { label: 'A', text: '一緒にいると毎日がドラマみたいに濃い関係', score: 2 },
      { label: 'B', text: 'ずっとドキドキしていられる関係', score: 1 },
      { label: 'C', text: '一緒にいて安心できる、楽な関係', score: -1 },
      { label: 'D', text: '友達みたいに自然体でいられる関係', score: -2 },
    ],
  },
  {
    id: 'q3',
    stage: 1,
    axis: 2,
    text: '好きな人から、まる一日返信がない。あなたは——',
    choices: [
      { label: 'A', text: '何かあった？と不安で他のことが手につかない', score: 2 },
      { label: 'B', text: '気になって、つい催促してしまいそう', score: 1 },
      { label: 'C', text: '忙しいんだろうな、と自分の予定を進める', score: -1 },
      { label: 'D', text: '言われるまで未読だったことに気づかないかも', score: -2 },
    ],
  },
  {
    id: 'q4',
    stage: 1,
    axis: 2,
    text: '恋人ができたら、休日の過ごし方は?',
    choices: [
      { label: 'A', text: 'できるだけ毎週会いたいし、連絡も多めがいい', score: 2 },
      { label: 'B', text: '会えるならなるべく一緒にいたい', score: 1 },
      { label: 'C', text: '月に数回ちゃんと会えれば十分', score: -1 },
      { label: 'D', text: '自分の趣味や友達との時間も大事にしたい', score: -2 },
    ],
  },
  {
    id: 'q5',
    stage: 1,
    axis: 3,
    text: '飲み会で「いいな」と思う人に出会った。次の行動は——',
    choices: [
      { label: 'A', text: 'その場で連絡先を交換し、すぐ会う約束をする', score: 2 },
      { label: 'B', text: '気になるから、自分からも連絡してみる', score: 1 },
      { label: 'C', text: '何度か話してから、ありかなしか考える', score: -1 },
      { label: 'D', text: 'しばらく相手を観察して、慎重に見極める', score: -2 },
    ],
  },
  {
    id: 'q6',
    stage: 1,
    axis: 3,
    text: 'まだ関係が浅い相手から、急に旅行に誘われた。あなたは——',
    choices: [
      { label: 'A', text: '楽しそう！とノリで即OKする', score: 2 },
      { label: 'B', text: '惹かれてるし、思い切って行ってみる', score: 1 },
      { label: 'C', text: '行きたいけど、早すぎないか一度考える', score: -1 },
      { label: 'D', text: 'まだ信用しきれないから様子を見て断る', score: -2 },
    ],
  },
  {
    id: 'q7',
    stage: 1,
    axis: 4,
    text: 'LINE中、会いたい気持ちが高まってきた。あなたは——',
    choices: [
      { label: 'A', text: '「会いたい」とストレートに送る', score: 2 },
      { label: 'B', text: '「今度ごはん行こうよ」とさりげなく誘う', score: 1 },
      { label: 'C', text: '相手が誘ってくるよう、それとなく匂わせる', score: -1 },
      { label: 'D', text: 'あえてそっけなくして、相手の出方を待つ', score: -2 },
    ],
  },
  {
    id: 'q8',
    stage: 1,
    axis: 4,
    text: '気になる人が他の異性と楽しそうに話している。あなたは——',
    choices: [
      { label: 'A', text: '後で本人に「ちょっと妬けた」と正直に言う', score: 2 },
      { label: 'B', text: 'さりげなく近づいて、自分の存在をアピール', score: 1 },
      { label: 'C', text: '気にしてないフリをして、余裕を見せる', score: -1 },
      { label: 'D', text: '自分も他の人と楽しそうにして見せる', score: -2 },
    ],
  },
  {
    id: 'q9',
    stage: 1,
    axis: 5,
    text: '恋愛で「幸せだな」と感じるのは——',
    choices: [
      { label: 'A', text: '相手が私を大事にして、甘やかしてくれるとき', score: 2 },
      { label: 'B', text: '相手が頼りがいを見せて、引っ張ってくれるとき', score: 1 },
      { label: 'C', text: '私のサポートで相手がうまくいったとき', score: -1 },
      { label: 'D', text: '相手のために何かしてあげて、喜ばれたとき', score: -2 },
    ],
  },
  {
    id: 'q10',
    stage: 1,
    axis: 5,
    text: '恋人の誕生日が近い。あなたの頭にあるのは——',
    choices: [
      { label: 'A', text: '自分もこのくらい祝ってほしいな、という期待', score: 2 },
      { label: 'B', text: 'どんなサプライズをしてくれるかな、という楽しみ', score: 1 },
      { label: 'C', text: '相手が本当に欲しいものは何か、というリサーチ', score: -1 },
      { label: 'D', text: '一日かけて喜ばせたい、という計画', score: -2 },
    ],
  },
  // ─── Stage 2 ───
  // Q11 | axis 1
  { id: 'q11', stage: 2, axis: 1, text: 'デートの帰り道、どんな気持ちで帰る？', choices: [
    { label: 'A', text: '次いつ会えるかと考えて、もう寂しい', score: 2 },
    { label: 'B', text: '楽しかったな、と余韻に浸る', score: 1 },
    { label: 'C', text: '充実した時間だった、と満足して帰る', score: -1 },
    { label: 'D', text: 'さて明日の準備でもするか、と切り替える', score: -2 },
  ]},
  // Q12 | axis 1
  { id: 'q12', stage: 2, axis: 1, text: '好きな人と映画を見た。エンドロールで——', choices: [
    { label: 'A', text: 'もう一本見たい、このまま一緒にいたいと思う', score: 2 },
    { label: 'B', text: '感動が冷めないうちに感想を語り合いたい', score: 1 },
    { label: 'C', text: '楽しかったな、と自分の感想を噛みしめる', score: -1 },
    { label: 'D', text: '疲れたから早く帰って休もうと思う', score: -2 },
  ]},
  // Q13 | axis 2
  { id: 'q13', stage: 2, axis: 2, text: '仕事でトラブルが起きた夜。あなたは——', choices: [
    { label: 'A', text: 'すぐ連絡して愚痴を聞いてもらいたい', score: 2 },
    { label: 'B', text: '気持ちが落ち着いたら少し話を聞いてほしい', score: 1 },
    { label: 'C', text: '自分で解決してから、あとで報告する', score: -1 },
    { label: 'D', text: '恋人に話すほどのことでもない、自分で処理する', score: -2 },
  ]},
  // Q14 | axis 2
  { id: 'q14', stage: 2, axis: 2, text: '相手が1週間出張に行く。あなたの本音は——', choices: [
    { label: 'A', text: '毎日電話したい、寂しくて耐えられる気がしない', score: 2 },
    { label: 'B', text: '向こうから連絡がくるたびに安心する', score: 1 },
    { label: 'C', text: 'お互い自分の時間にしよう、と前向きに考える', score: -1 },
    { label: 'D', text: 'たまにはゆっくり一人時間を楽しめてラッキー', score: -2 },
  ]},
  // Q15 | axis 3
  { id: 'q15', stage: 2, axis: 3, text: '初デートの場所選び。あなたは——', choices: [
    { label: 'A', text: '「なんとなく雰囲気よさそう」な場所に即決する', score: 2 },
    { label: 'B', text: '相手の好みを少しだけ確認してから決める', score: 1 },
    { label: 'C', text: '口コミを調べてから、無難なところを選ぶ', score: -1 },
    { label: 'D', text: '失敗したくないから、何軒もリサーチして決める', score: -2 },
  ]},
  // Q16 | axis 3
  { id: 'q16', stage: 2, axis: 3, text: '告白するかどうか迷っている。あなたは——', choices: [
    { label: 'A', text: '気持ちが抑えられなくなって、思い切って言う', score: 2 },
    { label: 'B', text: '「いける気がする」という感覚を信じて動く', score: 1 },
    { label: 'C', text: '脈ありサインをある程度確認してから動く', score: -1 },
    { label: 'D', text: '完全に好意を確信できるまで絶対に言えない', score: -2 },
  ]},
  // Q17 | axis 4
  { id: 'q17', stage: 2, axis: 4, text: '気になる人がSNSに旅行写真を載せた。あなたは——', choices: [
    { label: 'A', text: '「いいな、次は一緒に行きたい！」とすぐリプする', score: 2 },
    { label: 'B', text: 'いいねを押して、さりげなく食いつく', score: 1 },
    { label: 'C', text: '何も反応せず、次に会ったとき話題にしてみる', score: -1 },
    { label: 'D', text: 'わざと全スルーして、存在感を消す', score: -2 },
  ]},
  // Q18 | axis 4
  { id: 'q18', stage: 2, axis: 4, text: '久しぶりに会う約束の当日。あなたは——', choices: [
    { label: 'A', text: '「めちゃくちゃ楽しみにしてた！」とそのまま伝える', score: 2 },
    { label: 'B', text: 'テンション高めに会いに行く', score: 1 },
    { label: 'C', text: 'さりげなくおしゃれして、気づいてもらうのを待つ', score: -1 },
    { label: 'D', text: 'わざと少し遅れて、余裕があるように見せる', score: -2 },
  ]},
  // Q19 | axis 5
  { id: 'q19', stage: 2, axis: 5, text: '記念日の計画、どんなスタイルが好き?', choices: [
    { label: 'A', text: '全部相手に任せて、サプライズしてもらいたい', score: 2 },
    { label: 'B', text: '大まかには相手に決めてほしいけど希望も伝える', score: 1 },
    { label: 'C', text: '自分がメインで計画して、相手を喜ばせたい', score: -1 },
    { label: 'D', text: '全部自分で企画して完璧なサプライズをしたい', score: -2 },
  ]},
  // Q20 | axis 5
  { id: 'q20', stage: 2, axis: 5, text: '恋人が風邪をひいた。あなたは——', choices: [
    { label: 'A', text: '看病してほしいタイプなので、来てもらいたい', score: 2 },
    { label: 'B', text: '心配してくれているか、連絡が欲しい', score: 1 },
    { label: 'C', text: '相手のことが心配で、差し入れを持っていきたくなる', score: -1 },
    { label: 'D', text: '看病グッズを持って、一日そばにいてあげたい', score: -2 },
  ]},
  // ─── Stage 3 (deep) ───
  // Q21 | axis 1
  { id: 'q21', stage: 3, axis: 1, text: '恋人が元恋人と普通に連絡を取り合っているとわかった。あなたは——', choices: [
    { label: 'A', text: '怒りとも悲しみとも言えない感情が爆発する', score: 2 },
    { label: 'B', text: '嫌な気持ちを正直に打ち明けて話し合う', score: 1 },
    { label: 'C', text: '不安だけど、信じるしかないかと自分に言い聞かせる', score: -1 },
    { label: 'D', text: '特に気にならない、過去の人は過去の人', score: -2 },
  ]},
  // Q22 | axis 1
  { id: 'q22', stage: 3, axis: 1, text: 'もし恋人と別れることになったら——', choices: [
    { label: 'A', text: '立ち直れないくらい引きずる、しばらく廃人になりそう', score: 2 },
    { label: 'B', text: 'しばらく落ち込むけど、いつかは前向きになれる', score: 1 },
    { label: 'C', text: '悲しいけど、時間が経てばちゃんと切り替えられる', score: -1 },
    { label: 'D', text: '案外すぐ立ち直りそう、新しい出会いに期待する', score: -2 },
  ]},
  // Q23 | axis 2
  { id: 'q23', stage: 3, axis: 2, text: '相手が友達と朝まで飲んでいる夜。あなたは——', choices: [
    { label: 'A', text: '不安で眠れない、何度もLINEしてしまう', score: 2 },
    { label: 'B', text: '「帰ったら教えて」と一言送ってから待つ', score: 1 },
    { label: 'C', text: '楽しんできたらいい、自分も好きに過ごす', score: -1 },
    { label: 'D', text: 'まったく気にしない、それぞれの自由な時間', score: -2 },
  ]},
  // Q24 | axis 2
  { id: 'q24', stage: 3, axis: 2, text: '結婚したとしたら、生活のスタイルは?', choices: [
    { label: 'A', text: '四六時中一緒にいたい、常にそばにいてほしい', score: 2 },
    { label: 'B', text: 'できる限り一緒にいたい、基本は共有する生活', score: 1 },
    { label: 'C', text: 'お互いのペースを尊重しながら暮らしたい', score: -1 },
    { label: 'D', text: '精神的にも経済的にも完全に独立した関係がいい', score: -2 },
  ]},
  // Q25 | axis 3
  { id: 'q25', stage: 3, axis: 3, text: '過去の恋愛で傷ついた経験が今の恋愛に与えた影響は?', choices: [
    { label: 'A', text: 'あまり気にしない、傷ついた分だけ大胆になった', score: 2 },
    { label: 'B', text: '少し慎重になったけど、恋に臆病にはなっていない', score: 1 },
    { label: 'C', text: '以前より信用するまでに時間がかかるようになった', score: -1 },
    { label: 'D', text: '完全に信用できるまで、心を開かないようにしている', score: -2 },
  ]},
  // Q26 | axis 3
  { id: 'q26', stage: 3, axis: 3, text: '運命的な出会いを感じるとしたら、どんなとき?', choices: [
    { label: 'A', text: '目が合った瞬間、なんとなくビビッとくる', score: 2 },
    { label: 'B', text: '話していて「この人と合う」と感じたとき', score: 1 },
    { label: 'C', text: '何度も会うことになって、少しずつ気になりだした', score: -1 },
    { label: 'D', text: '長い時間をかけて相手の内面を知ってから感じる', score: -2 },
  ]},
  // Q27 | axis 4
  { id: 'q27', stage: 3, axis: 4, text: '恋人と大きな喧嘩をした。あなたは——', choices: [
    { label: 'A', text: '言いたいことを全部ぶつけて、その場で解決したい', score: 2 },
    { label: 'B', text: '感情的になりながらも、本心を伝えようとする', score: 1 },
    { label: 'C', text: '少し時間を置いてから、冷静に話し合いたい', score: -1 },
    { label: 'D', text: '直接言うのが苦手で、態度で示してしまいがち', score: -2 },
  ]},
  // Q28 | axis 4
  { id: 'q28', stage: 3, axis: 4, text: '恋人への愛情表現、自然にできる?', choices: [
    { label: 'A', text: '「好き」も「会いたい」もすぐ言える、むしろ言い過ぎるくらい', score: 2 },
    { label: 'B', text: '照れながらも、気持ちは素直に伝えられる', score: 1 },
    { label: 'C', text: '大切だという気持ちは行動で示す方が得意', score: -1 },
    { label: 'D', text: '恥ずかしくてなかなか言えない、察してほしいタイプ', score: -2 },
  ]},
  // Q29 | axis 5
  { id: 'q29', stage: 3, axis: 5, text: 'どんなふうに愛されたい?', choices: [
    { label: 'A', text: '何をするにも「あなたが一番」と感じさせてくれる愛し方', score: 2 },
    { label: 'B', text: '甘えさせてくれて、受け止めてくれる懐の深い愛し方', score: 1 },
    { label: 'C', text: '一緒に高め合い、お互いの夢を応援し合う関係', score: -1 },
    { label: 'D', text: '自分も全力で愛するから、同じように全力で返してほしい', score: -2 },
  ]},
  // Q30 | axis 5
  { id: 'q30', stage: 3, axis: 5, text: '将来のパートナーに求めることは?', choices: [
    { label: 'A', text: '私のことを最優先にしてくれること', score: 2 },
    { label: 'B', text: 'いつも私の気持ちに寄り添ってくれること', score: 1 },
    { label: 'C', text: '私も相手も、対等に助け合える関係', score: -1 },
    { label: 'D', text: '私が守り、支えることに幸せを感じる', score: -2 },
  ]},
];

export function getStageQuestions(stage: number): Question[] {
  return questions.filter(q => q.stage === stage);
}
