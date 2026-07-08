'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { diagnose, type DiagnosisResult } from '@/lib/diagnose';
import { buildDeepProfile } from '@/lib/deepProfile';
import { loadSession, clearSession } from '@/lib/session';

const QueenRadarChart = dynamic(() => import('@/components/QueenRadarChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center text-amber-200/60 text-sm">
      チャートを読み込み中...
    </div>
  ),
});

const AXIS_LABELS = [
  { key: 'axis1', low: '安定', high: '情熱' },
  { key: 'axis2', low: '自立', high: '依存' },
  { key: 'axis3', low: '慎重', high: '直感' },
  { key: 'axis4', low: '駆け引き', high: '直球' },
  { key: 'axis5', low: '尽くす', high: '尽くされ' },
];

export default function ResultStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stage = parseInt(stageStr, 10);
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const session = loadSession();
    if (!session.completedStages.includes(stage)) {
      router.replace(`/quiz/${stage}`);
      return;
    }
    // Use answers from all completed stages up to this one
    const relevantAnswers = session.answers.filter(a => a.stage <= stage);
    if (relevantAnswers.length === 0) {
      router.replace('/quiz/1');
      return;
    }
    setResult(diagnose(relevantAnswers));
  }, [stage, router]);

  const handleRestart = () => {
    clearSession();
    router.push('/quiz/1');
  };

  const handleShareX = () => {
    if (!result) return;
    const shareUrl = 'https://love-queen-quiz.vercel.app/';
    const text = `私の恋愛タイプは「${result.queen.name}」でした${result.queen.emoji}\nマッチ度${result.confidence}%\n\n#どの王妃 #恋愛タイプ診断`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intent, 'share-x', 'width=600,height=500,noopener');
  };

  if (!result) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#24101f] via-[#3d0f2b] to-[#1f0a1f]">
        <p className="text-amber-200/80 animate-pulse">診断中...</p>
      </main>
    );
  }

  const { queen, axisScores, confidence } = result;
  const stageLabel = stage === 1 ? 'ステージ1' : stage === 2 ? 'ステージ2' : '深層診断';
  const gem = queen.gemColor;

  return (
    <main className="min-h-dvh flex flex-col bg-gradient-to-b from-[#24101f] via-[#3d0f2b] to-[#1f0a1f] pb-12">
      {/* Header ribbon */}
      <div className="w-full bg-gradient-to-r from-[#9c7a2e] via-[#f4e2a1] to-[#9c7a2e] text-[#2a0f14] text-center py-2 text-xs font-bold tracking-widest">
        {stageLabel}診断完了 ✦ あなたの恋愛タイプが判明しました
      </div>

      <div className="max-w-sm mx-auto w-full px-5 mt-6 flex flex-col gap-6 animate-fade-in-up">

        {/* Stage indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all"
              style={
                s < stage
                  ? { backgroundColor: '#d4af37', borderColor: '#d4af37', color: '#2a0f14' }
                  : s === stage
                  ? { backgroundColor: 'transparent', borderColor: '#d4af37', color: '#f4e2a1' }
                  : { backgroundColor: 'transparent', borderColor: 'rgba(212,175,55,0.25)', color: 'rgba(244,226,161,0.35)' }
              }
            >
              {s < stage ? '✓' : s}
            </div>
          ))}
        </div>

        {/* Queen card */}
        <div
          className="rounded-3xl overflow-hidden bg-black/30 backdrop-blur-sm border"
          style={{ borderColor: `${gem}66`, boxShadow: `0 0 40px -12px ${gem}66` }}
        >
          <div className="h-2" style={{ background: `linear-gradient(90deg, ${gem}, #d4af37, ${gem})` }} />
          <div className="p-6 text-center">
            <div className="text-7xl mb-3 drop-shadow-[0_0_16px_rgba(212,175,55,0.5)]">{queen.emoji}</div>
            <p className="text-xs tracking-widest mb-1 font-medium" style={{ color: gem }}>あなたは</p>
            <h1 className="text-2xl font-bold leading-tight mb-0.5 text-gold-gradient">{queen.name}</h1>
            <p className="text-sm text-amber-100/60 font-light mb-1">{queen.nameEn}</p>
            <p className="text-xs font-medium mb-4" style={{ color: gem }}>💎 {queen.gem}タイプ</p>
            <div className="h-px bg-gradient-to-r from-transparent to-transparent mb-4" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${gem}66, transparent)` }} />
            <p className="text-sm text-amber-50/80 leading-relaxed text-left">{queen.description}</p>
          </div>
        </div>

        {/* Confidence badge */}
        <div className="flex items-center gap-3 bg-black/25 rounded-2xl border border-amber-400/25 p-4">
          <div className="text-2xl">🎯</div>
          <div>
            <p className="text-xs text-amber-200/70 font-medium">
              {stage === 1 ? 'マッチ度' : stage === 2 ? '確信度（精度UP）' : '最終確信度'}
            </p>
            <p className="text-lg font-bold text-gold-gradient">{confidence}%</p>
          </div>
          <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${confidence}%`, background: 'linear-gradient(90deg, #9c7a2e, #f4e2a1)' }}
            />
          </div>
        </div>

        {/* Stage 2+ deeper analysis note */}
        {stage >= 2 && (
          <div className="bg-black/20 border border-amber-400/25 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-1 text-amber-200">✨ {stage === 2 ? 'ステージ1+2の総合分析' : '全3ステージ・深層分析'}</p>
            <p className="text-xs text-amber-100/70 leading-relaxed">
              {stage === 2
                ? '20問の回答から精度が向上しました。確信度が高いほど、あなたの恋愛タイプが確定的です。'
                : '恋愛の深層（嫉妬・別れ方・結婚観・愛情表現）まで含めた30問の総合診断です。'}
            </p>
          </div>
        )}

        {/* Radar chart */}
        <div className="bg-black/25 backdrop-blur-sm rounded-3xl border border-amber-400/25 p-5">
          <h2 className="text-sm font-bold text-center mb-1 text-amber-100">あなたの恋愛タイプ分析</h2>
          <p className="text-xs text-amber-200/60 text-center mb-4">5軸レーダーチャート</p>
          <QueenRadarChart axisScores={axisScores} queen={queen} />
          <div className="mt-4 space-y-2">
            {AXIS_LABELS.map(({ key, low, high }) => {
              const score = axisScores[key as keyof typeof axisScores];
              // Display bar based on raw score normalized to questions answered
              const maxScore = stage * 4; // 2 questions per axis per stage * max score 2
              const pct = ((score + maxScore) / (maxScore * 2)) * 100;
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="text-amber-200/60 w-12 text-right shrink-0">{low}</span>
                  <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: 'linear-gradient(90deg, #9c7a2e, #f4e2a1)' }}
                    />
                  </div>
                  <span className="text-amber-100 w-12 shrink-0">{high}</span>
                  <span className="text-amber-200/60 w-8 text-right shrink-0 font-mono">
                    {score > 0 ? `+${score}` : score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next stage CTA */}
        {stage === 1 && (
          <div className="bg-black/25 border-2 border-amber-400/30 rounded-3xl p-5 text-center">
            <p className="text-xs text-amber-300/80 font-medium tracking-wide mb-1">🔍 もっと深く知りたい?</p>
            <h3 className="text-base font-bold text-amber-100 mb-2">ステージ2でさらに精度UP</h3>
            <p className="text-xs text-amber-100/70 mb-4 leading-relaxed">
              別角度の10問に答えると確信度が上がり、<br />より正確なあなたの王妃タイプが判明します。
            </p>
            <Link
              href="/quiz/2"
              className="block w-full py-3.5 bg-gradient-to-r from-[#9c7a2e] via-[#f4e2a1] to-[#9c7a2e] text-[#2a0f14] text-center rounded-2xl font-bold text-sm shadow-lg shadow-black/40 border border-amber-200/40 active:scale-95 transition-transform"
            >
              ステージ2へ進む（無料）→
            </Link>
          </div>
        )}

        {stage === 2 && (
          <div className="bg-black/25 border-2 rounded-3xl p-5 text-center" style={{ borderColor: 'rgba(224,17,95,0.4)' }}>
            <div className="text-3xl mb-2">👑</div>
            <p className="text-xs font-medium tracking-wide mb-1" style={{ color: '#f3a9c3' }}>まだ終わりじゃない</p>
            <h3 className="text-base font-bold text-amber-100 mb-2">深層心理をさらに知る（ステージ3）</h3>
            <p className="text-xs text-amber-100/70 mb-4 leading-relaxed">
              嫉妬・別れ方・結婚観・愛情表現——<br />
              恋愛の深層を探る10問に答えると、<br />
              <span className="font-bold text-amber-100">あなただけの深層プロフィール</span>が完成します。
            </p>
            <Link
              href="/quiz/3"
              className="block w-full py-3.5 text-center rounded-2xl font-bold text-sm shadow-lg shadow-black/40 border border-rose-200/30 active:scale-95 transition-transform text-amber-50"
              style={{ background: 'linear-gradient(90deg, #e0115f, #8b1a3a, #e0115f)' }}
            >
              深層心理をさらに知る（無料）→
            </Link>
          </div>
        )}

        {stage === 3 && (() => {
          const profile = buildDeepProfile(result.normalized);
          const sections = [
            { icon: '💢', title: '嫉妬・独占欲のパターン', body: profile.jealousy },
            { icon: '💔', title: '別れ方・傷つき方', body: profile.breakup },
            { icon: '💍', title: '結婚観・共依存度', body: profile.marriage },
            { icon: '💬', title: '愛情表現の素直さ', body: profile.expression },
          ];
          return (
            <div className="bg-black/25 border rounded-2xl p-4 space-y-4" style={{ borderColor: 'rgba(224,17,95,0.35)' }}>
              <p className="text-xs font-bold" style={{ color: '#f3a9c3' }}>✨ {queen.name}タイプの深層プロフィール</p>
              {sections.map(({ icon, title, body }) => (
                <div key={title}>
                  <p className="text-sm font-bold text-amber-100 mb-1 flex items-center gap-1.5">
                    <span>{icon}</span>{title}
                  </p>
                  <p className="text-xs text-amber-100/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleShareX}
            className="w-full py-4 rounded-2xl border border-amber-400/30 bg-black text-white font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xで結果をシェアする
          </button>
          <button
            onClick={handleRestart}
            className="block w-full py-4 text-center rounded-2xl border-2 border-amber-400/40 text-amber-200 font-bold text-sm active:scale-95 transition-transform bg-black/20"
          >
            最初からやり直す
          </button>
          <Link href="/" className="block w-full py-3 text-center rounded-2xl text-amber-200/60 text-sm">
            トップに戻る
          </Link>
        </div>

        <p className="text-xs text-amber-100/30 text-center">
          ※ 本診断はエンターテインメント目的です。
        </p>
      </div>
    </main>
  );
}
