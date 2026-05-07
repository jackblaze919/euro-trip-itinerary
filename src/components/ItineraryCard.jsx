import React, { useState } from 'react';
import MapLinkButton from './MapLinkButton.jsx';

const CAT_META = {
  food:      { emoji: '🍽',  label: 'Food',      color: 'bg-amber-500/15 text-amber-200 border-amber-400/30' },
  beer:      { emoji: '🍺',  label: 'Beer',      color: 'bg-yellow-500/15 text-yellow-200 border-yellow-400/30' },
  daytime:   { emoji: '🏛',  label: 'Daytime',   color: 'bg-sky-500/15 text-sky-200 border-sky-400/30' },
  nightlife: { emoji: '🎧',  label: 'Nightlife', color: 'bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/30' },
  travel:    { emoji: '🚆',  label: 'Travel',    color: 'bg-indigo-500/15 text-indigo-200 border-indigo-400/30' },
  recovery:  { emoji: '🛌',  label: 'Recovery',  color: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' },
};

function ReserveBadge({ value }) {
  if (!value) return null;
  const v = value.toLowerCase();
  let cls = 'bg-white/10 text-white/80 border-white/15';
  let icon = 'ℹ️';
  if (v.startsWith('yes')) {
    cls = 'bg-rose-500/15 text-rose-200 border-rose-400/40';
    icon = '✅';
  } else if (v.startsWith('recommend') || v.startsWith('maybe') || v.includes('optional') || v.includes('limited')) {
    cls = 'bg-orange-500/15 text-orange-200 border-orange-400/40';
    icon = '⚠️';
  } else if (v.startsWith('no')) {
    cls = 'bg-white/5 text-white/60 border-white/15';
    icon = '–';
  } else if (v.includes('done')) {
    cls = 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40';
    icon = '✓';
  }
  return (
    <span className={'inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 ' + cls}>
      <span aria-hidden>{icon}</span>
      Reserve · {value}
    </span>
  );
}

export default function ItineraryCard({ card, isFav, isHidden, isChecked, onToggleFav, onToggleHide, onToggleCheck }) {
  const meta = CAT_META[card.category] || { emoji: '•', label: card.category, color: 'bg-white/5 text-white/70 border-white/10' };
  const [open, setOpen] = useState(false);

  const reserveYes = (card.reserve || '').toLowerCase().startsWith('yes');

  return (
    <div
      className={
        'group glass rounded-2xl overflow-hidden transition ' +
        (isHidden ? 'opacity-40 ' : '') +
        (card.priority ? 'ring-1 ring-fuchsia-400/30 ' : '')
      }
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-3 flex items-start gap-3"
      >
        <div className="flex flex-col items-center w-12 shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-white/50">Time</div>
          <div className="text-sm font-bold tabular-nums">{card.time}</div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className={'inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 ' + meta.color}>
              <span aria-hidden>{meta.emoji}</span> {meta.label}
            </span>
            {card.foodWarning && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 bg-rose-500/15 text-rose-200 border-rose-400/40">
                ⚠️ Food rules
              </span>
            )}
            {card.priority && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/40">
                ★ Priority
              </span>
            )}
            <ReserveBadge value={card.reserve} />
          </div>

          <div className="text-[15px] font-semibold leading-snug">{card.title}</div>
          <div className="text-[12px] text-white/60 mt-0.5">{card.location}</div>
          <div className="text-[12px] text-white/70 mt-0.5">
            <span className="text-white/40">€ </span>{card.price}
          </div>
        </div>

        <div className="shrink-0 self-center text-white/40 text-lg">
          {open ? '▾' : '▸'}
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="px-3 pb-3 -mt-1 space-y-3 text-sm">
          {card.description && (
            <p className="text-white/80 leading-relaxed">{card.description}</p>
          )}

          {card.musicFit && (
            <div className="rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/10 p-2.5 text-fuchsia-100 text-[13px]">
              <span className="font-semibold mr-1">🎧 Music fit:</span>
              {card.musicFit}
            </div>
          )}

          {card.safeOrder?.length > 0 && (
            <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/5 p-2.5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-200 mb-1">✅ Safe order</div>
              <ul className="text-[13px] text-emerald-50/90 list-disc list-inside space-y-0.5">
                {card.safeOrder.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          )}

          {card.avoidOrder?.length > 0 && (
            <div className="rounded-lg border border-rose-400/30 bg-rose-500/5 p-2.5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-rose-200 mb-1">⚠️ Avoid</div>
              <ul className="text-[13px] text-rose-50/90 list-disc list-inside space-y-0.5">
                {card.avoidOrder.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          )}

          {card.bookingHint && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-white/70 mb-1">📋 Booking</div>
              <div className="text-[13px] text-white/80">{card.bookingHint}</div>
              {card.bookingUrl && (
                <a
                  href={card.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 rounded-full bg-white text-ink-900 text-xs font-semibold px-3 py-1.5 hover:bg-white/90"
                >
                  🔗 Find booking
                </a>
              )}
            </div>
          )}

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <MapLinkButton url={card.mapUrl} />

            <button
              onClick={() => onToggleCheck(card.id)}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-[0.98] border ' +
                (isChecked
                  ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40'
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10')
              }
            >
              {isChecked ? '✓ Done' : '○ Mark done'}
            </button>

            <button
              onClick={() => onToggleFav(card.id)}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-[0.98] border ' +
                (isFav
                  ? 'bg-pink-500/20 text-pink-100 border-pink-400/40'
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10')
              }
            >
              {isFav ? '★ Saved' : '☆ Save'}
            </button>

            <button
              onClick={() => onToggleHide(card.id)}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-[0.98] border ' +
                (isHidden
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10')
              }
            >
              {isHidden ? '↺ Unhide' : '✕ Skip'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
