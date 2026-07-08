import type { Metadata } from 'next';
import './globals.css';

const title = 'あなたはどの王妃？恋愛タイプ診断';
const description =
  '全30問のリアル恋愛シチュエーションに答えると、ヨーロッパ王室の華やかな王妃12人のうち誰かに着地する女性向け心理テスト診断。すべて無料。';
const siteUrl = 'https://love-queen-quiz.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
