import React from 'react';
import { BEST_OF, FALLBACKS } from '../data/itinerary.js';

const SECTIONS = [
  { key: 'food',      label: 'Food',      hint: 'Eat here' },
  { key: 'beer',      label: 'Beer',      hint: 'Drink here' },
  { key: 'nightlife', label: 'Nightlife', hint: 'Dance here' },
  { key: 'daytime',   label: 'Daytime',   hint: 'See here' },
  { key: 'avoid',     label: 'Avoid',     hint: '' },
];

export default function BestOfPanel({ cityId }) {
  const data = BEST_OF[cityId];
  const fb = FALLBACKS[cityId];
  if (!data) return null;
  return (
    <div className="space-y-3">
      {SECTIONS.map((s) => {
        const items = data[s.key];
        if (!items?.length) return null;
        const isAvoid = s.key === 'avoid';
        return (
          <div key={s.key} className="panel rounded-xl p-3.5">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-[15px] font-semibold text-cream-50">
                {s.label}
              </h3>
              <span className={'text-[10px] uppercase tracking-widest ' + (isAvoid ? 'text-burgundy-400' : 'text-cream-100/45')}>
                {s.hint}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((it) => (
                <span
                  key={it}
                  className={
                    'text-[12px] border rounded-full px-2.5 py-1 ' +
                    (isAvoid
                      ? 'border-burgundy-400/35 bg-burgundy-500/8 text-cream-100/85'
                      : 'border-cream-100/15 bg-navy-700/40 text-cream-100/85')
                  }
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {fb && (
        <div className="panel rounded-xl p-3.5">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-display text-[15px] font-semibold text-cream-50">
              Emergency Fallbacks
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-cream-100/45">If plan A fails</span>
          </div>
          <div className="space-y-2">
            {Object.entries(fb).map(([k, vs]) => (
              <div key={k}>
                <div className="text-[10px] uppercase tracking-widest text-cream-100/45 mb-1">{k}</div>
                <div className="flex flex-wrap gap-1.5">
                  {vs.map((v) => (
                    <span key={v} className="text-[12px] border rounded-full px-2.5 py-1 bg-navy-700/40 border-cream-100/12 text-cream-100/80">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
