import React from 'react';

const TABS = [
  { id: 'overview',  label: 'Overview',  emoji: '🗺️' },
  { id: 'today',     label: 'Today',     emoji: '⚡' },
  { id: 'cities',    label: 'Cities',    emoji: '🏙️' },
  { id: 'bookings',  label: 'Book',      emoji: '✅' },
  { id: 'favs',      label: 'Saved',     emoji: '★' },
];

export default function StickyNav({ active, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 safe-bottom px-3 pt-2">
      <div className="mx-auto max-w-md glass-strong rounded-2xl flex items-stretch justify-between px-1 py-1 shadow-glow">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-[10px] font-medium transition active:scale-[0.97] ' +
                (isActive ? 'bg-white text-ink-900' : 'text-white/70 hover:bg-white/5')
              }
              aria-current={isActive ? 'page' : undefined}
            >
              <span aria-hidden className="text-base leading-none">{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
