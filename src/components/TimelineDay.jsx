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
              'shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider border ' +
              (isToday
                ? 'bg-pink-500 text-white border-pink-400 pulse-pink'
                : 'bg-white/5 border-white/10 text-white/80')
            }
          >
            {isToday ? 'Today' : fmtDate(date)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold leading-tight truncate">{dayLabel}</div>
            <div className="text-[11px] text-white/50">
              {visible.length} stops · {totalDone}/{cards.length} done
            </div>
          </div>
          <div className="shrink-0 text-white/40">{open ? '▾' : '▸'}</div>
        </button>
        <button
          onClick={() => onCopyDay(date)}
          title="Copy today's plan"
          className="shrink-0 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] px-2.5 py-1.5"
        >
          📋 Copy
        </button>
      </div>

      {open && (
        <div className="relative pl-3">
          {/* timeline rail */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
          <div className="space-y-3">
            {visible.map((c) => (
              <div key={c.id} className="relative">
                <span className="absolute -left-[7px] top-5 w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-ink-900" />
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
              <div className="text-xs text-white/40 italic px-1 py-2">All items hidden for this day.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
