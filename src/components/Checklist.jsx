import React from 'react';
import { BOOK_NOW } from '../data/itinerary.js';

export default function Checklist({ checked, onToggle, compact = false }) {
  const total = BOOK_NOW.length;
  const done = BOOK_NOW.filter((b) => checked.has(b.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className={'glass rounded-2xl p-4 ' + (compact ? '' : '')}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-white/60">Book These Now</div>
          <div className="text-base font-semibold">{done} / {total} locked in</div>
        </div>
        <div className="text-2xl">{pct === 100 ? '🎉' : '🛎️'}</div>
      </div>

      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 transition-all"
          style={{ width: pct + '%' }}
        />
      </div>

      <ul className="space-y-1.5">
        {BOOK_NOW.map((b) => {
          const isDone = checked.has(b.id);
          return (
            <li key={b.id} className="flex items-center gap-2">
              <button
                onClick={() => onToggle(b.id)}
                className={
                  'shrink-0 w-5 h-5 rounded-md border flex items-center justify-center text-[11px] ' +
                  (isDone
                    ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-100'
                    : 'border-white/20 text-transparent hover:border-white/40')
                }
                aria-label={isDone ? 'Mark not done' : 'Mark done'}
              >
                ✓
              </button>
              <div className="flex-1 min-w-0">
                <div className={'text-[13px] leading-tight ' + (isDone ? 'line-through text-white/40' : 'text-white/90')}>
                  {b.label}
                </div>
                <div className="text-[10px] text-white/40">{b.when}</div>
              </div>
              {b.url && (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[10px] uppercase tracking-wider rounded-full px-2 py-1 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                >
                  Open ↗
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
