import Link from 'next/link';
import AdMaxSlot from '@/components/AdMaxSlot';

export default function TopPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-between bg-gradient-to-b from-[#24101f] via-[#3d0f2b] to-[#1f0a1f] px-4 py-10 relative overflow-hidden">
      {/* Subtle jewel glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full gap-6 relative">
        {/* Crown decoration */}
        <div className="text-6xl mb-2 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">👑</div>

        <div className="space-y-2">
          <p className="text-xs tracking-[0.25em] text-amber-300/80 font-medium uppercase">
            Love Psychology Test
          </p>
          <h1 className="text-2xl font-bold leading-snug text-gold-gradient">
            あなたの恋愛タイプは
            <br />
            <span className="text-3xl">どの王妃</span>
            ？
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-rose-100/80">
          LINEの既読、合コン、休日デート——
          <br />
          現代のリアルな恋愛シチュ30問に答えると
          <br />
          <span className="font-semibold text-amber-200">ヨーロッパ王室の華やかな王妃</span>の
          <br />
          誰かに着地します。
        </p>

        {/* Queen preview */}
        <div className="flex gap-3 text-3xl my-1">
          {['🌹', '🦋', '👑', '💐', '💎', '🔥'].map((e, i) => (
            <span
              key={i}
              className="opacity-70 hover:opacity-100 transition-opacity drop-shadow"
            >
              {e}
            </span>
          ))}
        </div>

        <div className="w-full space-y-3 mt-2">
          <Link
            href="/quiz"
            className="block w-full py-4 px-6 bg-gradient-to-r from-[#9c7a2e] via-[#f4e2a1] to-[#9c7a2e] text-[#2a0f14] text-center rounded-2xl font-bold text-lg shadow-lg shadow-black/40 border border-amber-200/50 active:scale-95 transition-transform"
          >
            診断をはじめる
          </Link>
          <p className="text-xs text-amber-200/60">全30問・すべて無料・約5分</p>
        </div>

        {/* Feature list */}
        <div className="w-full grid grid-cols-3 gap-2 mt-2">
          {[
            { icon: '✨', text: '12人の王妃' },
            { icon: '📊', text: '5軸分析' },
            { icon: '🆓', text: '30問すべて無料' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="bg-black/30 backdrop-blur-sm rounded-xl py-3 px-2 text-center border border-amber-400/30"
            >
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs text-amber-100/90 font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 w-full max-w-sm mx-auto text-center relative">
        <AdMaxSlot className="mb-4" />
        <p className="text-xs text-rose-200/40">
          ※ 本診断はエンターテインメント目的です。医学的・心理学的な診断ではありません。
        </p>
      </footer>
    </main>
  );
}
