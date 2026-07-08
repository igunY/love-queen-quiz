# あなたはどの王妃？恋愛タイプ診断

現代のリアルな恋愛シチュ10問に答えると、ヨーロッパ王室の華やかな王妃（12人）のうち1人に着地する女性向け心理テスト診断アプリです。

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## 画面構成

| パス | 内容 |
|------|------|
| `/` | トップ（サービス紹介 + 診断開始ボタン） |
| `/quiz` | 質問画面（10問・1問ずつ・進捗バー） |
| `/result` | 結果画面（王妃名・説明・5軸レーダーチャート） |

## 技術スタック

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Recharts（レーダーチャート）
- 状態管理: クライアントのみ（localStorage）

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx        # トップ
│   ├── quiz/page.tsx   # 質問画面
│   └── result/page.tsx # 結果画面
├── components/
│   └── QueenRadarChart.tsx
├── data/
│   ├── questions.ts    # 10問データ（5軸 × 2問）
│   └── queens.ts       # 12人の王妃データ＋説明文
└── lib/
    └── diagnose.ts     # 純粋関数：スコア集計・ユークリッド距離・着地判定
```

## 診断ロジック

5軸（情熱/依存/直感/直球/尽くされ）を各 `-4 〜 +4` で集計し、12人の王妃の軸ベクトルとのユークリッド距離が最小の王妃に着地します。
ロジックは `lib/diagnose.ts` に純粋関数として独立しており、ステージ2以降の追加に対応できる設計です。

---

## (Original Next.js README)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
