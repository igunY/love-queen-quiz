import type { AxisScores } from './diagnose';

type Tier = 'high' | 'mid' | 'low';

function tier(value: number): Tier {
  if (value >= 0.7) return 'high';
  if (value <= -0.7) return 'low';
  return 'mid';
}

export interface DeepProfile {
  jealousy: string;
  breakup: string;
  marriage: string;
  expression: string;
}

// axis1: 安定(-2)⇔情熱(+2) — 感情の燃え上がり方、別れの引きずり方
const AXIS1_BREAKUP: Record<Tier, string> = {
  high: '恋に落ちると全身全霊で燃え上がるタイプ。元恋人との連絡や思い出にもナイーブに反応してしまい、別れた後もなかなか気持ちを切り替えられない一途さがあります。次の恋に進むには、自分のペースでしっかり気持ちに区切りをつける時間が必要です。',
  mid: '熱くなりすぎず冷めすぎず、感情と理性のバランスが取れたタイプ。別れの痛みを感じつつも引きずり過ぎず、ちょうどいいペースで気持ちを整理していけます。',
  low: '感情の波に振り回されにくく、動じない安定感の持ち主。万一別れることになっても、時間をかけて着実に前を向ける芯の強さがあり、案外早く新しい一歩を踏み出せます。',
};

// axis2: 自立(-2)⇔依存(+2) — 独占欲・連絡頻度への不安
const AXIS2_JEALOUSY: Record<Tier, string> = {
  high: '大切な人には常に「自分だけを見ていてほしい」という気持ちが強く出るタイプ。連絡が途絶えると不安になりやすく、独占欲の強さが恋の情熱の裏返しになっています。',
  mid: '適度な距離感を保ちながらも、気になる瞬間には素直に不安を口にできるタイプ。独占欲はありつつも、相手の自由も尊重できるバランス感覚を持っています。',
  low: '相手を信じて自由を尊重できる自立したタイプ。連絡が少ない時間があっても大きく動揺せず、お互いのペースを大事にできる余裕があります。',
};

// axis3: 慎重(-2)⇔直感(+2) — 信頼を築くスピード
const AXIS3_TRUST: Record<Tier, string> = {
  high: '第一印象や直感を信じて一気に心を開くタイプ。一度好きになると疑うことを知らずまっすぐ信頼を寄せる分、裏切られたときのショックは人一倍大きいかもしれません。',
  mid: '直感と慎重さをバランスよく使い分けながら、少しずつ信頼関係を積み重ねていくタイプです。',
  low: '簡単には心を開かず、時間をかけて相手を見極める慎重派。信頼を積み重ねてから深く愛するタイプなので、根拠のない不安に振り回されることは少なめです。',
};

// axis2 (marriage view) + axis5: 尽くす(-2)⇔尽くされたい(+2) — 結婚観・共依存度
const AXIS2_MARRIAGE: Record<Tier, string> = {
  high: '結婚後もパートナーとの一体感を強く求めるタイプ。常にそばにいたい、生活のすべてを共有したいという気持ちが強く、深い絆を築ける一方で共依存にならない距離感の確認も大切です。',
  mid: 'お互いのペースを尊重しながらも、必要な時にはしっかり寄り添える、バランス型の結婚観の持ち主です。',
  low: '精神的にも生活面でも自立した関係を好むタイプ。それぞれの時間や価値観を尊重し合うことが、長く続く結婚生活の秘訣だと考えています。',
};

const AXIS5_PARTNERSHIP: Record<Tier, string> = {
  high: 'パートナーには「自分を最優先にしてほしい」という気持ちが強く、愛され上手。受け止めてもらうことで安心できるタイプです。',
  mid: '尽くすことと尽くされることのバランスが取れた、対等なパートナーシップを自然に築けるタイプです。',
  low: '自分から愛情を注ぎ、相手を支えることに喜びを感じる献身的なタイプ。尽くしすぎて疲れてしまわないよう、たまには甘えることも大切です。',
};

// axis4: 駆け引き(-2)⇔直球(+2) — 愛情表現の素直さ
const AXIS4_EXPRESSION: Record<Tier, string> = {
  high: '好きという気持ちをストレートに言葉にできる素直さの持ち主。駆け引きよりも本音でぶつかる恋愛スタイルが、相手との信頼を深めます。喧嘩をしてもその場でしっかり話し合い、感情を溜め込みません。',
  mid: '素直さと駆け引きを状況に応じて使い分けられる、バランスの取れた愛情表現の持ち主です。',
  low: '気持ちをすぐには見せない、駆け引き上手なタイプ。恋愛経験に裏打ちされた余裕が魅力ですが、たまには素直な言葉やリアクションで伝えると、相手はもっと安心できます。',
};

export function buildDeepProfile(normalized: AxisScores): DeepProfile {
  const t1 = tier(normalized.axis1);
  const t2 = tier(normalized.axis2);
  const t3 = tier(normalized.axis3);
  const t4 = tier(normalized.axis4);
  const t5 = tier(normalized.axis5);

  return {
    jealousy: `${AXIS2_JEALOUSY[t2]}${AXIS3_TRUST[t3]}`,
    breakup: AXIS1_BREAKUP[t1],
    marriage: `${AXIS2_MARRIAGE[t2]}${AXIS5_PARTNERSHIP[t5]}`,
    expression: AXIS4_EXPRESSION[t4],
  };
}
