import React from 'react';
import { CITIES } from '../data/itinerary.js';

export default function CitySelector({ activeCity, onPick }) {
  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-3">
        {CITIES.map((c) => {
          const active = activeCity === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={
                'relative overflow-hidden rounded-2xl p-4 text-left transition active:scale-[0.98] ' +
                (active
                  ? 'ring-2 ring-white/40 shadow-glow'
                  : 'ring-1 ring-white/10')
              }
            >
              <div
                className={
                  'absolute inset-0 -z-10 bg-gradient-to-br opacity-90 ' + c.accent
                }
              />
              <div className="absolute inset-0 -z-10 bg-ink-800/60" />
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden>{c.flag}</span>
                <span className={'text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ' + c.chip}>
                  {c.nights}n
                </span>
              </div>
              <div className="mt-3">
                <div className="text-lg font-semibold leading-tight">{c.name}</div>
                <div className="text-[11px] text-white/60">{c.dates}</div>
                <div className="text-[11px] text-white/50 mt-2 line-clamp-2">{c.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
