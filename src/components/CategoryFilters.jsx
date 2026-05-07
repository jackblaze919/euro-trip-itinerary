import React from 'react';
import { CATEGORIES } from '../data/itinerary.js';

export default function CategoryFilters({ activeCategory, onPick }) {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
      <div className="flex gap-2 w-max">
        {CATEGORIES.map((c) => {
          const active = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={
                'shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-[0.98] ' +
                (active
                  ? 'bg-white text-ink-900 shadow-glow'
                  : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10')
              }
            >
              <span aria-hidden>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
