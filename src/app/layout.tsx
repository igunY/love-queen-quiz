import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'あなたはどの王妃？恋愛タイプ診断',
  description:
    '10問のリアル恋愛シチュエーションに答えると、ヨーロッパ王室の華やかな王妃のうち誰かに着地する女性向け心理テスト診断。',
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
