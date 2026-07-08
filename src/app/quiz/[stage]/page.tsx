'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStageQuestions } from '@/data/questions';
import { loadSession, saveSession } from '@/lib/session';
import type { Answer } from '@/lib/diagnose';

export default function QuizStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stage = parseInt(stageStr, 10);
  const router = useRouter();
  const stageQuestions = getStageQuestions(stage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageAnswers, setStageAnswers] = useState<Answer[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!stageQuestions.length || isNaN(stage)) {
      router.replace('/quiz/1');
    }
  }, [stage, stageQuestions.length, router]);

  const question = stageQuestions[currentIndex];
  if (!question) return null;

  const progress = (currentIndex / stageQuestions.length) * 100;

  const handleAnswer = (score: number, label: string) => {
    if (selectedLabel !== null) return;
    setSelectedLabel(label);

    const newAnswer: Answer = { questionId: question.id, axis: question.axis, score, stage };
    const newStageAnswers = [...stageAnswers, newAnswer];

    setTimeout(() => {
      if (currentIndex === stageQuestions.length - 1) {
        // Save to session
        const session = loadSession();
        // Remove any existing answers for this stage
        const otherAnswers = session.answers.filter(a => a.stage !== stage);
        session.answers = [...otherAnswers, ...newStageAnswers];
        if (!session.completedStages.includes(stage)) {
          session.completedStages.push(stage);
        }
        saveSession(session);
        router.push(`/result/${stage}`);
      } else {
        setStageAnswers(newStageAnswers);
        setCurrentIndex(currentIndex + 1);
        setSelectedLabel(null);
      }
    }, 400);
  };

  const stageLabel = stage === 3 ? '深層診断' : `ステージ${stage}`;
  // Stage 3 swaps the gold accent for ruby to signal "going deeper" while
  // staying in the same jewel-tone family as the rest of the site.
  const isDeep = stage === 3;
  const accent = isDeep ? '#e0115f' : '#d4af37';
  const accentSoft = isDeep ? 'rgba(224,17,95,0.5)' : 'rgba(212,175,55,0.5)';

  return (
    <main className="min-h-dvh flex flex-col bg-gradient-to-b from-[#24101f] via-[#3d0f2b] to-[#1f0a1f]">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-black/30">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: isDeep
              ? 'linear-gradient(90deg, #e0115f, #d4af37, #e0115f)'
              : 'linear-gradient(90deg, #9c7a2e, #f4e2a1, #9c7a2e)',
            boxShadow: `0 0 10px 1px ${accentSoft}`,
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-xs font-medium tracking-wide" style={{ color: isDeep ? '#f3a9c3' : '#f4e2a1' }}>
          {stageLabel} Q{currentIndex + 1} / {stageQuestions.length}
        </span>
        <div className="flex gap-1.5">
          {stageQuestions.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i <= currentIndex ? accent : 'rgba(255,255,255,0.15)',
                transform: i === currentIndex ? 'scale(1.25)' : undefined,
                boxShadow: i <= currentIndex ? `0 0 6px 1px ${accentSoft}` : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* Stage badge */}
      {isDeep && (
        <div className="mx-5 mb-2">
          <div className="bg-gradient-to-r from-[#e0115f] via-[#8b1a3a] to-[#e0115f] text-amber-50 text-xs font-bold text-center py-1.5 px-4 rounded-full inline-block shadow-[0_0_16px_2px_rgba(224,17,95,0.6)] border border-amber-300/30">
            ✨ 深層診断 — 恋愛の本質を探る
          </div>
        </div>
      )}

      {/* Question card */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
        <div key={currentIndex} className="w-full max-w-sm animate-fade-in-up">
          <div
            className="rounded-2xl p-6 mb-5 backdrop-blur-sm bg-black/30 border"
            style={{ borderColor: `${accent}66`, boxShadow: `0 0 24px -8px ${accentSoft}` }}
          >
            <p className="text-xs font-medium mb-3 tracking-wide" style={{ color: accent }}>
              QUESTION {currentIndex + 1}
            </p>
            <p className="text-base font-bold leading-relaxed text-amber-50">
              {question.text}
            </p>
          </div>
          <div className="space-y-3">
            {question.choices.map((choice) => {
              const isSelected = selectedLabel === choice.label;
              return (
                <button
                  key={choice.label}
                  onClick={() => handleAnswer(choice.score, choice.label)}
                  disabled={selectedLabel !== null}
                  className={`w-full text-left rounded-xl border transition-all duration-200 bg-black/20 ${
                    isSelected ? 'scale-[0.98]' : 'active:scale-[0.98]'
                  } ${selectedLabel !== null && !isSelected ? 'opacity-50' : ''}`}
                  style={{
                    borderColor: isSelected ? accent : `${accent}40`,
                    boxShadow: isSelected ? `0 0 20px 2px ${accentSoft}` : undefined,
                    backgroundColor: isSelected ? `${accent}1a` : undefined,
                  }}
                >
                  <div className="flex items-start gap-3 p-4">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors border"
                      style={{
                        backgroundColor: isSelected ? accent : `${accent}22`,
                        color: isSelected ? '#1a0a12' : accent,
                        borderColor: `${accent}66`,
                      }}
                    >
                      {choice.label}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5 text-amber-50/90">
                      {choice.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
