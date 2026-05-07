import React from 'react';
import { CITIES } from '../data/itinerary.js';
import CityMotif from './CityMotif.jsx';

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
                'relative overflow-hidden rounded-2xl p-4 text-left transition active:scale-[0.99] ' +
                'border ' +
                (active
                  ? 'border-gold-500/60 bg-navy-700/60 shadow-soft'
                  : 'border-white/10 bg-navy-800/50 hover:bg-navy-700/50')
              }
              style={
                active
                  ? { boxShadow: `inset 0 0 0 1px ${c.accentSoft}, 0 8px 22px -16px ${c.accentHex}` }
                  : undefined
              }
            >
              {/* corner motif */}
              <div className="absolute right-3 top-3 opacity-80">
                <CityMotif motif={c.motif} size={26} color={c.accentHex} />
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="font-display text-[10px] tracking-widest uppercase"
                  style={{ color: c.accentHex }}
                >
                  {c.code}
                </span>
                <span className="text-[10px] text-cream-100/40">·</span>
                <span className="text-[10px] uppercase tracking-wider text-cream-100/55">
                  {c.nights}n
                </span>
              </div>

              <div className="mt-2.5">
                <div className="font-display text-[22px] font-semibold leading-tight text-cream-50">
                  {c.name}
                </div>
                <div className="text-[11px] tnum text-cream-100/55 mt-0.5">{c.shortDates}</div>
              </div>

              <div className="mt-3 text-[12px] leading-snug text-cream-100/70 line-clamp-2">
                {c.tagline}
              </div>

              {/* hairline accent at bottom */}
              <div
                className="mt-3 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c.accentHex}55, transparent)`,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
