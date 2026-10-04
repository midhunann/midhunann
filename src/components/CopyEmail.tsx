'use client';

import { useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/copy';
import { copyViaSelection, type FallbackDoc } from '@/lib/copy-fallback';
import { CheckIcon, CopyIcon } from './Icons';

type Status = 'idle' | 'copied' | 'failed';

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(email, {
      clipboard: typeof navigator === 'undefined' ? null : (navigator.clipboard ?? null),
      fallback: (text) => copyViaSelection(text, document as unknown as FallbackDoc),
    });
    setStatus(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), ok ? 2000 : 10000);
  };

  return (
    <>
      <button type="button" onClick={onClick} className="link tap gap-2">
        {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
        {status === 'copied' ? 'copied' : 'copy email'}
      </button>
      {status === 'failed' ? (
        <span className="text-sm text-muted">
          copy failed, the address is <span className="select-all text-ink">{email}</span>
        </span>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? 'email address copied' : status === 'failed' ? `copy failed, the address is ${email}` : ''}
      </span>
    </>
  );
}
