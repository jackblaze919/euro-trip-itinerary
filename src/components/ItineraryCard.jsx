import React, { useState } from 'react';
import MapLinkButton from './MapLinkButton.jsx';

const CAT_META = {
  food:      { dot: '#d6b366', label: 'Food'      },
  beer:      { dot: '#c9a14a', label: 'Beer'      },
  daytime:   { dot: '#7da38e', label: 'Daytime'   },
  nightlife: { dot: '#a8525a', label: 'Nightlife' },
  travel:    { dot: '#8aa3c2', label: 'Travel'    },
  recovery:  { dot: '#9aab9a', label: 'Recovery'  },
};

function ReserveChip({ value }) {
  if (!value) return null;
  const v = value.toLowerCase();
  let cls = 'border-cream-100/15 text-cream-100/65';
  let label = `Reserve · ${value}`;
  if (v.startsWith('yes')) {
    cls = 'border-burgundy-400/50 text-burgundy-400 bg-burgundy-500/10';
  } else if (v.startsWith('recommend') || v.startsWith('maybe') || v.includes('optional') || v.includes('limited')) {
    cls = 'border-gold-500/45 text-gold-400 bg-gold-500/10';
  } else if (v.includes('done')) {
    cls = 'border-sage-400/45 text-sage-400 bg-sage-500/10';
  } else if (v.startsWith('no')) {
    cls = 'border-cream-100/15 text-cream-100/55';
    label = 'Walk-in';
  }
  return (
    <span className={'inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 ' + cls}>
      {label}
    </span>
  );
}

export default function ItineraryCard({ card, isFav, isChecked, onToggleFav, onToggleCheck }) {
  const meta = CAT_META[card.category] || { dot: '#a89c7a', label: card.category };
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        'group panel rounded-xl overflow-hidden transition ' +
        (card.priority ? 'shadow-[inset_0_0_0_1px_rgba(201,161,74,0.30)] ' : '')
      }
    >
      {/* Header row — minimal: time, category dot, title, location, price, reserve */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-3.5 py-3 flex items-start gap-3"
      >
        {/* Time, prominent serif */}
        <div className="shrink-0 w-[68px]">
          <div className="font-display text-[24px] font-semibold leading-none tnum text-cream-50">
            {card.time}
          </div>
          <div className="text-[9px] uppercase tracking-widest text-cream-100/40 mt-1.5 flex items-center gap-1">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: meta.dot }}
              aria-hidden
            />
            {meta.label}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold leading-snug text-cream-50">
            {card.title}
          </div>
          <div className="text-[12px] text-cream-100/55 mt-0.5 truncate">{card.location}</div>

          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className="text-[11px] text-cream-100/70 tnum">
              <span className="text-cream-100/40">€</span> {card.price}
            </span>
            <span className="text-cream-100/15">·</span>
            <ReserveChip value={card.reserve} />
          </div>
        </div>

        <div className="shrink-0 self-center text-cream-100/35 text-sm pl-1">
          {open ? '−' : '+'}
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="px-3.5 pb-3.5 -mt-1 space-y-3 text-[13px]">
          <div className="hairline" />

          {/* Secondary chips moved into expanded view */}
          {(card.foodWarning || card.priority) && (
            <div className="flex flex-wrap gap-1.5">
              {card.foodWarning && (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 border-burgundy-400/50 text-burgundy-400 bg-burgundy-500/10">
                  ⚠ Food warning
                </span>
              )}
              {card.priority && (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5 border-gold-500/50 text-gold-400 bg-gold-500/10">
                  ★ Priority
                </span>
              )}
            </div>
          )}

          {card.description && (
            <p className="text-cream-100/80 leading-relaxed">{card.description}</p>
          )}

          {card.musicFit && (
            <div className="rounded-lg border border-burgundy-400/30 bg-burgundy-500/5 p-2.5 text-cream-100/85">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-burgundy-400 mb-1">Music fit</div>
              <div>{card.musicFit}</div>
            </div>
          )}

          {card.safeOrder?.length > 0 && (
            <div className="rounded-lg border border-sage-400/25 bg-sage-500/5 p-2.5">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-sage-400 mb-1">Safe order</div>
              <div className="flex flex-wrap gap-1">
                {card.safeOrder.map((s) => (
                  <span key={s} className="text-[11px] rounded-full px-2 py-0.5 bg-sage-500/10 text-cream-100/85 border border-sage-400/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {card.avoidOrder?.length > 0 && (
            <div className="rounded-lg border border-burgundy-400/30 bg-burgundy-500/5 p-2.5">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-burgundy-400 mb-1">Avoid</div>
              <div className="flex flex-wrap gap-1">
                {card.avoidOrder.map((s) => (
                  <span key={s} className="text-[11px] rounded-full px-2 py-0.5 bg-burgundy-500/10 text-cream-100/85 border border-burgundy-400/25">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {card.bookingHint && (
            <div className="rounded-lg border border-gold-500/25 bg-gold-500/10 p-2.5">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-gold-400 mb-1">Booking</div>
              <div className="text-cream-100/85">{card.bookingHint}</div>
              {card.bookingUrl && (
                <a
                  href={card.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 rounded-full bg-gold-500 text-navy-950 text-[11px] font-semibold px-3 py-1.5 hover:bg-gold-400"
                >
                  Find booking ↗
                </a>
              )}
            </div>
          )}

          {/* Action row — only Open in Maps, Mark done, Save */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <MapLinkButton url={card.mapUrl} compact />

            <button
              onClick={() => onToggleCheck(card.id)}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-[0.98] border ' +
                (isChecked
                  ? 'bg-sage-500/15 text-sage-400 border-sage-400/40'
                  : 'bg-transparent text-cream-100/65 border-cream-100/15 hover:border-cream-100/35')
              }
            >
              {isChecked ? '✓ Done' : '○ Mark done'}
            </button>

            <button
              onClick={() => onToggleFav(card.id)}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-[0.98] border ' +
                (isFav
                  ? 'bg-gold-500/15 text-gold-400 border-gold-500/40'
                  : 'bg-transparent text-cream-100/65 border-cream-100/15 hover:border-cream-100/35')
              }
            >
              {isFav ? '★ Saved' : '☆ Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
