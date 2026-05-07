import React from 'react';
import { BEST_OF, FALLBACKS } from '../data/itinerary.js';

const SECTIONS = [
  { key: 'food',      label: 'Best Food',      emoji: '🍽',  color: 'amber' },
  { key: 'beer',      label: 'Best Beer',      emoji: '🍺',  color: 'yellow' },
  { key: 'nightlife', label: 'Best Nightlife', emoji: '🎧',  color: 'fuchsia' },
  { key: 'daytime',   label: 'Best Daytime',   emoji: '🏛',  color: 'sky' },
  { key: 'avoid',     label: 'What to Avoid',  emoji: '⚠️', color: 'rose' },
];

const colorMap = {
  amber:   'bg-amber-500/10 text-amber-200 border-amber-400/25',
  yellow:  'bg-yellow-500/10 text-yellow-200 border-yellow-400/25',
  fuchsia: 'bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-400/25',
  sky:     'bg-sky-500/10 text-sky-200 border-sky-400/25',
  rose:    'bg-rose-500/10 text-rose-200 border-rose-400/25',
};

export default function BestOfPanel({ cityId }) {
  const data = BEST_OF[cityId];
  const fb = FALLBACKS[cityId];
  if (!data) return null;
  return (
    <div className="space-y-3">
      {SECTIONS.map((s) => {
        const items = data[s.key];
        if (!items?.length) return null;
        return (
          <div key={s.key} className="glass rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span aria-hidden className="text-base">{s.emoji}</span>
              <h3 className="text-sm font-semibold">{s.label}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((it) => (
                <span
                  key={it}
                  className={'text-[12px] border rounded-full px-2.5 py-1 ' + colorMap[s.color]}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {fb && (
        <div className="glass rounded-2xl p-3 border-dashed">
          <div className="flex items-center gap-2 mb-2">
            <span aria-hidden className="text-base">🛟</span>
            <h3 className="text-sm font-semibold">Emergency Fallbacks</h3>
          </div>
          <div className="space-y-2 text-[12px]">
            {Object.entries(fb).map(([k, vs]) => (
              <div key={k}>
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">If {k} plan fails</div>
                <div className="flex flex-wrap gap-1.5">
                  {vs.map((v) => (
                    <span key={v} className="border rounded-full px-2.5 py-1 bg-white/5 border-white/10 text-white/80">
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
