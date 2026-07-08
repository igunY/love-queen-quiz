import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TITLE_LINE_1 = 'あなたはどの王妃？';
const TITLE_LINE_2 = '恋愛タイプ診断';

// Fetches a Google Font subset containing only the glyphs we actually use,
// so we don't have to bundle a full CJK font file (which runs to tens of MB).
async function loadGoogleFont(text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=${encodeURIComponent(text)}`
    )
  ).text();
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error('Font URL not found in Google Fonts CSS response');
  const res = await fetch(match[1]);
  return res.arrayBuffer();
}

export default async function OpengraphImage() {
  const fontData = await loadGoogleFont(TITLE_LINE_1 + TITLE_LINE_2 + '恋愛心理テスト');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom, #24101f, #3d0f2b, #1f0a1f)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(192,38,211,0.25)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.18)',
            filter: 'blur(60px)',
          }}
        />
        <div style={{ display: 'flex', fontSize: 96, marginBottom: 8 }}>👑</div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontFamily: 'Noto Serif JP',
            fontWeight: 700,
            color: '#f4e2a1',
            marginBottom: 8,
          }}
        >
          {TITLE_LINE_1}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontFamily: 'Noto Serif JP',
            fontWeight: 700,
            color: '#e8b4c8',
            marginBottom: 32,
          }}
        >
          {TITLE_LINE_2}
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 56 }}>
          {['🌹', '🦋', '👑', '💐', '💎', '🔥'].map((e) => (
            <div key={e} style={{ display: 'flex' }}>{e}</div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Noto Serif JP', data: fontData, style: 'normal', weight: 700 }],
    }
  );
}
