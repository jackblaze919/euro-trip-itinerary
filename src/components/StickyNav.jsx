import React from 'react';

const TABS = [
  { id: 'today',     label: 'Today',   glyph: '✦' },
  { id: 'cities',    label: 'Cities',  glyph: '◇' },
  { id: 'bookings',  label: 'Book',    glyph: '✓' },
  { id: 'favs',      label: 'Saved',   glyph: '★' },
];

export default function StickyNav({ active, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 safe-bottom px-3 pt-2">
      <div className="mx-auto max-w-md rounded-2xl border border-cream-100/10 bg-navy-900/85 backdrop-blur-xl flex items-stretch justify-between px-1 py-1 shadow-soft">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-[10px] tracking-wider uppercase transition active:scale-[0.97] ' +
                (isActive
                  ? 'text-gold-400'
                  : 'text-cream-100/55 hover:text-cream-100/85')
              }
              aria-current={isActive ? 'page' : undefined}
            >
              <span aria-hidden className="text-[15px] leading-none">{t.glyph}</span>
              <span className={isActive ? 'font-semibold' : ''}>{t.label}</span>
              <span
                className={
                  'mt-0.5 h-[2px] w-5 rounded-full transition ' +
                  (isActive ? 'bg-gold-500' : 'bg-transparent')
                }
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
