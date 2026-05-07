import React from 'react';
import { BOOK_NOW } from '../data/itinerary.js';

const TIER_META = {
  must:        { label: 'Must',        cls: 'bg-burgundy-500/20 text-burgundy-400 border-burgundy-400/50' },
  recommended: { label: 'Recommended', cls: 'bg-gold-500/15 text-gold-400 border-gold-500/45' },
  optional:    { label: 'Optional',    cls: 'bg-navy-700/60 text-cream-100/65 border-cream-100/15' },
};

export default function Checklist({ checked, onToggle }) {
  const total = BOOK_NOW.length;
  const done = BOOK_NOW.filter((b) => checked.has(b.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="paper rounded-2xl p-4 sm:p-5">
      {/* Header — like a boarding-pass top */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-burgundy-600">Pre-trip</div>
          <div className="font-display text-[22px] leading-tight font-semibold text-[#1d1a14]">
            Book These Now
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[28px] leading-none tnum text-[#1d1a14] font-semibold">
            {done}<span className="text-[#1d1a14]/40 text-[20px]"> / {total}</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#1d1a14]/55">locked in</div>
        </div>
      </div>

      <div className="h-1.5 mt-3 w-full rounded-full bg-[#1d1a14]/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: pct + '%',
            background: 'linear-gradient(90deg, #c9a14a, #b08a3e)',
            transition: 'width 240ms ease',
          }}
        />
      </div>

      <div className="my-4 stub" />

      <ul className="space-y-2">
        {BOOK_NOW.map((b) => {
          const isDone = checked.has(b.id);
          const tier = TIER_META[b.tier] || TIER_META.optional;
          return (
            <li
              key={b.id}
              className={
                'flex items-center gap-3 rounded-lg border px-2.5 py-2 transition ' +
                (isDone
                  ? 'bg-[#1d1a14]/5 border-[#1d1a14]/10 opacity-65'
                  : 'bg-[#fbf6e9] border-[#1d1a14]/10')
              }
            >
              <button
                onClick={() => onToggle(b.id)}
                className={
                  'shrink-0 w-5 h-5 rounded-md border flex items-center justify-center text-[12px] transition ' +
                  (isDone
                    ? 'bg-[#5e8772] border-[#5e8772] text-white'
                    : 'bg-white border-[#1d1a14]/25 text-transparent hover:border-[#1d1a14]/55')
                }
                aria-label={isDone ? 'Mark not done' : 'Mark done'}
              >
                ✓
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={'inline-flex items-center text-[9px] uppercase tracking-widest font-bold border rounded-full px-1.5 py-0.5 ' + tier.cls}>
                    {tier.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#1d1a14]/55 tnum">{b.when}</span>
                </div>
                <div className={'text-[13px] leading-snug ' + (isDone ? 'line-through text-[#1d1a14]/45' : 'text-[#1d1a14]')}>
                  {b.label}
                </div>
              </div>

              {b.url && (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[10px] uppercase tracking-widest font-semibold rounded-full px-2.5 py-1 bg-[#1d1a14] text-cream-50 hover:bg-[#0e0c08]"
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
