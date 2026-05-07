import React from 'react';
import { CATEGORIES } from '../data/itinerary.js';

export default function CategoryFilters({ activeCategory, onPick }) {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
      <div className="flex gap-1.5 w-max">
        {CATEGORIES.map((c) => {
          const active = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={
                'shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium transition border ' +
                (active
                  ? 'bg-cream-50 text-navy-900 border-cream-50 shadow-soft'
                  : 'bg-transparent text-cream-100/70 border-cream-100/15 hover:border-cream-100/30 hover:text-cream-100')
              }
            >
              <span aria-hidden className={active ? '' : 'opacity-70'}>{c.emoji}</span>
              <span className={active ? 'font-semibold' : ''}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
