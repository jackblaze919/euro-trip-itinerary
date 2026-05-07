import React, { useState } from 'react';
import ItineraryCard from './ItineraryCard.jsx';

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function TimelineDay({
  date,
  dayLabel,
  cards,
  isToday,
  defaultOpen = true,
  storage,
  onCopyDay,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const visible = cards.filter((c) => !storage.hidden.has(c.id));
  const totalDone = cards.filter((c) => storage.checked.has(c.id)).length;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 flex items-center gap-3 text-left"
        >
          <div
            className={
              'shrink-0 rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest border tnum ' +
              (isToday
                ? 'bg-gold-500 text-navy-950 border-gold-500 pulse-gold'
                : 'bg-navy-800/60 border-cream-100/10 text-cream-100/75')
            }
          >
            {isToday ? 'Today' : fmtDate(date)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-[16px] font-semibold leading-tight text-cream-50 truncate">
              {dayLabel}
            </div>
            <div className="text-[11px] text-cream-100/45 tnum">
              {visible.length} stops · {totalDone}/{cards.length} done
            </div>
          </div>
          <div className="shrink-0 text-cream-100/35 text-sm">{open ? '−' : '+'}</div>
        </button>
        <button
          onClick={() => onCopyDay(date)}
          title="Copy today's plan"
          className="shrink-0 inline-flex items-center gap-1 rounded-full border border-cream-100/10 bg-navy-800/60 hover:border-cream-100/30 text-[11px] px-2.5 py-1.5 text-cream-100/75"
        >
          ❏ Copy
        </button>
      </div>

      {open && (
        <div className="relative pl-4">
          {/* timeline rail — clean solid hairline, aligned to pin centers */}
          <div
            className="absolute left-[7px] top-3 bottom-3 w-px"
            style={{ background: 'rgba(201,161,74,0.35)' }}
            aria-hidden
          />
          <div className="space-y-3">
            {visible.map((c) => (
              <div key={c.id} className="relative">
                <span
                  className="absolute -left-[12px] top-[22px] w-2 h-2 rounded-full ring-2 ring-navy-900"
                  style={{ background: '#c9a14a' }}
                  aria-hidden
                />
                <ItineraryCard
                  card={c}
                  isFav={storage.favs.has(c.id)}
                  isHidden={storage.hidden.has(c.id)}
                  isChecked={storage.checked.has(c.id)}
                  onToggleFav={storage.toggleFav}
                  onToggleHide={storage.toggleHide}
                  onToggleCheck={storage.toggleCheck}
                />
              </div>
            ))}
            {visible.length === 0 && (
              <div className="text-xs text-cream-100/40 italic px-1 py-2">All items hidden for this day.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
