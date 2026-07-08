'use client';
import { useEffect, useRef, useState } from 'react';

// 忍者AdMax's tag renders itself via document.write at load time. Running
// that directly in a React-controlled page risks document.write wiping the
// whole app after hydration, so it's isolated inside its own iframe via
// srcDoc — a self-contained mini document the ad script can safely own.
const AD_TAG_SRC = 'https://adm.shinobi.jp/s/d32aaab65d51b51dac94db2f554b9516';

interface Props {
  className?: string;
}

export default function AdMaxSlot({ className = '' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const body = iframe.contentDocument?.body;
        if (body && body.scrollHeight > 0) setHeight(body.scrollHeight);
      } catch {
        // ignore — ad creative loaded a cross-origin frame we can't measure
      }
    };

    iframe.addEventListener('load', resize);
    const interval = setInterval(resize, 500);
    return () => {
      iframe.removeEventListener('load', resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={className}>
      <p className="text-[10px] text-center mb-1 tracking-[0.2em]" style={{ color: 'rgba(244,226,161,0.35)' }}>
        AD
      </p>
      <iframe
        ref={iframeRef}
        srcDoc={`<!DOCTYPE html><html><body style="margin:0;display:flex;justify-content:center;background:transparent;"><script src="${AD_TAG_SRC}"></script></body></html>`}
        style={{ width: '100%', height, border: 'none', display: 'block' }}
        scrolling="no"
        title="広告"
      />
    </div>
  );
}
