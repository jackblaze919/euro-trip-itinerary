import React, { useEffect, useMemo, useState } from 'react';
import {
  ITINERARY,
  CITIES,
  BOOK_NOW,
  TRIP,
} from './data/itinerary.js';
import CitySelector from './components/CitySelector.jsx';
import TimelineDay from './components/TimelineDay.jsx';
import Checklist from './components/Checklist.jsx';
import BestOfPanel from './components/BestOfPanel.jsx';
import SearchBar from './components/SearchBar.jsx';
import StickyNav from './components/StickyNav.jsx';
import MapLinkButton from './components/MapLinkButton.jsx';
import CityMotif from './components/CityMotif.jsx';

function getTripToday() {
  const start = new Date(TRIP.startDate + 'T00:00:00');
  const end = new Date(TRIP.endDate + 'T23:59:59');
  const now = new Date();
  if (now >= start && now <= end) return now.toISOString().slice(0, 10);
  return TRIP.startDate;
}

function useStoredSet(key) {
  const [set, setSet] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify([...set])); } catch {}
  }, [key, set]);
  const toggle = (id) =>
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return [set, toggle];
}

const CITY_CATEGORIES = [
  { id: 'plan',      label: 'Plan',      hint: 'All stops by day' },
  { id: 'food',      label: 'Food',      hint: 'Eat here' },
  { id: 'beer',      label: 'Beer',      hint: 'Drink here' },
  { id: 'nightlife', label: 'Nightlife', hint: 'Dance here' },
  { id: 'mustbook',  label: 'Must Book', hint: 'Reserve / ticketed' },
];

export default function App() {
  const today = getTripToday();
  const [tab, setTab] = useState('today');
  const [activeCity, setActiveCity] = useState(null); // null = show 4 city cards; otherwise drilled in
  const [cityCategory, setCityCategory] = useState('plan');
  const [refineOpen, setRefineOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [reserveOnly, setReserveOnly] = useState(false);
  const [under25, setUnder25] = useState(false);
  const [toast, setToast] = useState(null);

  const [favs, toggleFav] = useStoredSet('et:favs');
  const [checked, toggleCheck] = useStoredSet('et:checked');
  const [bookChecked, toggleBookChecked] = useStoredSet('et:bookings');

  const storage = { favs, toggleFav, checked, toggleCheck };

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  async function copyDay(date) {
    const dayCards = ITINERARY
      .filter((c) => c.date === date)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    if (!dayCards.length) return;
    const lines = [
      `${dayCards[0].dayLabel} — Euro Trip`,
      '',
      ...dayCards.map(
        (c) =>
          `• ${c.time} · ${c.title}${c.location ? ` (${c.location})` : ''}` +
          (c.price ? ` — ${c.price}` : '') +
          (c.reserve ? ` · Reserve: ${c.reserve}` : '')
      ),
    ];
    const text = lines.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      showToast('Day copied to clipboard');
    } catch {
      showToast('Copy failed — long-press to select');
    }
  }

  async function shareTrip() {
    const url = window.location.href;
    const data = {
      title: 'Euro Trip Itinerary',
      text: 'Our Euro Trip itinerary — May 7–16',
      url,
    };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch (e) { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Trip link copied');
    } catch {
      showToast('Copy failed — share manually');
    }
  }

  // ─── Today helpers ────────────────────────────────────────────
  const todayCards = useMemo(
    () => ITINERARY
      .filter((c) => c.date === today)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [today]
  );

  const upNext = useMemo(() => {
    if (!todayCards.length) return null;
    const now = new Date();
    const nowSort = now.getHours() * 100 + now.getMinutes();
    return todayCards.find((c) => c.sortOrder >= nowSort) || todayCards[todayCards.length - 1];
  }, [todayCards]);

  const tonightItems = useMemo(
    () => todayCards.filter((c) => c.category === 'nightlife'),
    [todayCards]
  );

  const mustBookSoon = useMemo(() => {
    // Open priority cards in next 4 days that need reservation
    const todayD = new Date(today + 'T00:00:00');
    const horizon = new Date(todayD); horizon.setDate(horizon.getDate() + 4);
    return ITINERARY
      .filter((c) => {
        const d = new Date(c.date + 'T00:00:00');
        if (d < todayD || d > horizon) return false;
        if (!c.priority) return false;
        if (checked.has(c.id)) return false;
        return true;
      })
      .sort((a, b) => a.startKey.localeCompare(b.startKey))
      .slice(0, 4);
  }, [today, checked]);

  // ─── Cities filtering ─────────────────────────────────────────
  const filteredCityCards = useMemo(() => {
    if (!activeCity) return [];
    const q = search.trim().toLowerCase();
    return ITINERARY.filter((c) => {
      if (c.city !== activeCity) return false;

      // Top-level category tile filter
      if (cityCategory !== 'plan') {
        if (cityCategory === 'mustbook') {
          if (!c.priority) return false;
        } else if (c.category !== cityCategory) {
          return false;
        }
      }

      // Refine
      if (reserveOnly && !(c.reserve && c.reserve.toLowerCase().startsWith('yes'))) return false;
      if (under25) {
        if (c.isFree) {
          // Allow
        } else if (c.priceMaxEUR == null || c.priceMaxEUR > 25) {
          return false;
        }
      }
      if (q) {
        const hay = [
          c.title, c.location, c.description, c.city, c.category,
          ...(c.safeOrder || []), ...(c.avoidOrder || []),
          c.musicFit, c.bookingHint,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeCity, cityCategory, search, reserveOnly, under25]);

  const filteredByDate = useMemo(() => {
    const m = new Map();
    for (const c of filteredCityCards) {
      if (!m.has(c.date)) m.set(c.date, []);
      m.get(c.date).push(c);
    }
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCityCards]);

  // ─── Sub-views ────────────────────────────────────────────────
  const renderToday = () => (
    <div className="space-y-4 px-4">
      {/* Today header */}
      <div className="panel-strong rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-atlas opacity-90" />
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">Today</div>
        <div className="font-display text-[24px] font-semibold leading-tight text-cream-50 mt-1">
          {todayCards[0]?.dayLabel || 'Trip starts soon'}
        </div>
        <div className="text-[12px] text-cream-100/55 tnum mt-0.5">
          {todayCards.length} stops planned
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={shareTrip}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full bg-gold-500 text-navy-950 text-[12px] font-semibold uppercase tracking-widest px-4 hover:bg-gold-400 active:scale-[0.98] transition"
          >
            ↗ Share trip link
          </button>
          <button
            onClick={() => copyDay(today)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border border-cream-100/20 bg-navy-800/50 hover:border-cream-100/40 text-[12px] font-semibold uppercase tracking-widest px-4 text-cream-100/85 active:scale-[0.98] transition"
          >
            ❏ Copy today
          </button>
        </div>
      </div>

      {/* Up Next */}
      {upNext && (
        <button
          onClick={() => {
            // Scroll the corresponding card into view by clicking it open
            const el = document.getElementById('today-' + upNext.id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="w-full text-left panel rounded-2xl p-4 transition active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">Up Next</div>
              <div className="font-display text-[20px] font-semibold leading-tight text-cream-50 mt-1 truncate">
                {upNext.title}
              </div>
              <div className="text-[12px] text-cream-100/55 mt-0.5 tnum">
                {upNext.time} · {upNext.location}
              </div>
            </div>
            <div className="shrink-0 font-display text-[28px] tnum text-gold-400 leading-none">
              {upNext.time.split(':')[0]}
            </div>
          </div>
        </button>
      )}

      {/* Tonight (if any nightlife today) */}
      {tonightItems.length > 0 && (
        <div className="panel rounded-2xl p-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-display text-[18px] font-semibold text-cream-50">Tonight</h2>
            <span className="text-[10px] uppercase tracking-widest text-burgundy-400">After dark</span>
          </div>
          <ul className="space-y-2 text-[13px]">
            {tonightItems.map((c) => (
              <li key={c.id} className="flex gap-3">
                <span className="font-display tnum text-burgundy-400 text-[14px] w-12 shrink-0">{c.time}</span>
                <span className="text-cream-100/85">
                  {c.title}
                  {c.musicFit && (
                    <span className="block text-[11px] text-cream-100/55 italic mt-0.5">{c.musicFit}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Today's Timeline */}
      {todayCards.length > 0 ? (
        <div id="today-timeline">
          <TimelineDay
            date={today}
            dayLabel={todayCards[0].dayLabel}
            cards={todayCards}
            isToday
            storage={storage}
            onCopyDay={copyDay}
          />
        </div>
      ) : (
        <div className="text-cream-100/55 text-sm italic">Nothing scheduled for today.</div>
      )}

      {/* Must Book Soon */}
      {mustBookSoon.length > 0 && (
        <div className="panel rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-[18px] font-semibold text-cream-50">Must Book Soon</h2>
            <button
              onClick={() => setTab('bookings')}
              className="inline-flex items-center min-h-[36px] rounded-full border border-gold-500/35 bg-gold-500/10 px-3 text-[10px] uppercase tracking-widest text-gold-400 hover:border-gold-500/60 active:scale-[0.98] transition"
            >
              All bookings →
            </button>
          </div>
          <ul className="space-y-1.5 text-[13px]">
            {mustBookSoon.map((c) => {
              const d = new Date(c.date + 'T00:00:00');
              const lbl = d.toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="font-display tnum text-gold-400 text-[13px] w-12 shrink-0 uppercase tracking-wider">{lbl}</span>
                  <span className="text-cream-100/85 flex-1 truncate">{c.title}</span>
                  <span className="text-[10px] text-cream-100/50 tnum shrink-0">{c.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  const renderCities = () => {
    if (!activeCity) {
      // Just show the 4 city cards
      return (
        <div className="space-y-4">
          <div className="px-4">
            <div className="font-display text-[22px] font-semibold text-cream-50">Pick a city</div>
            <div className="text-[12px] text-cream-100/55 mt-0.5">Tap to open the city hub.</div>
          </div>
          <CitySelector activeCity={activeCity} onPick={(id) => { setActiveCity(id); setCityCategory('plan'); }} />
        </div>
      );
    }

    const c = CITIES.find((x) => x.id === activeCity);
    return (
      <div className="space-y-4">
        {/* City header */}
        <div className="px-4">
          <button
            onClick={() => setActiveCity(null)}
            className="inline-flex items-center gap-1 min-h-[40px] rounded-full border border-cream-100/15 bg-navy-800/50 hover:border-cream-100/35 text-[11px] uppercase tracking-widest font-semibold text-cream-100/75 px-3 mb-3 active:scale-[0.98] transition"
          >
            <span aria-hidden>←</span> All cities
          </button>
          <div className="panel-strong rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-90">
              <CityMotif motif={c.motif} size={42} color={c.accentHex} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: c.accentHex }}>
              {c.code} · {c.country}
            </div>
            <div className="font-display text-[28px] leading-tight font-semibold text-cream-50 mt-1">
              {c.name}
            </div>
            <div className="text-[12px] text-cream-100/55 tnum mt-0.5">
              {c.dates} · {c.nights} night{c.nights > 1 ? 's' : ''}
            </div>
            <div className="text-[13px] text-cream-100/75 mt-2 font-display italic">
              {c.tagline}
            </div>
            <div
              className="absolute left-0 right-0 bottom-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c.accentHex}88, transparent)` }}
            />
          </div>
        </div>

        {/* Category tiles */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {CITY_CATEGORIES.map((tile) => {
              const active = cityCategory === tile.id;
              return (
                <button
                  key={tile.id}
                  onClick={() => setCityCategory(tile.id)}
                  className={
                    'shrink-0 rounded-xl px-3.5 py-2.5 text-left border transition active:scale-[0.99] ' +
                    (active
                      ? 'bg-cream-50 text-navy-900 border-cream-50 shadow-soft'
                      : 'bg-transparent text-cream-100/75 border-cream-100/15 hover:border-cream-100/35')
                  }
                  style={{ minWidth: 110 }}
                >
                  <div className={'font-display text-[16px] font-semibold leading-none ' + (active ? '' : 'text-cream-50')}>
                    {tile.label}
                  </div>
                  <div className={'text-[10px] uppercase tracking-widest mt-1.5 ' + (active ? 'text-navy-900/60' : 'text-cream-100/45')}>
                    {tile.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Refine collapse */}
        <div className="px-4">
          {(() => {
            const activeCount = (search ? 1 : 0) + (reserveOnly ? 1 : 0) + (under25 ? 1 : 0);
            return (
              <button
                onClick={() => setRefineOpen((v) => !v)}
                className={
                  'w-full inline-flex items-center justify-between gap-2 rounded-xl border min-h-[48px] px-4 transition active:scale-[0.99] ' +
                  (refineOpen || activeCount
                    ? 'border-gold-500/40 bg-gold-500/10 text-gold-400'
                    : 'border-cream-100/15 bg-navy-800/50 text-cream-100/80 hover:border-cream-100/30')
                }
              >
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="text-[14px] leading-none">⌥</span>
                  <span className="uppercase tracking-widest font-semibold text-[12px]">
                    Search & filter
                  </span>
                  {activeCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center text-[10px] font-bold tnum bg-gold-500 text-navy-950 rounded-full w-5 h-5">
                      {activeCount}
                    </span>
                  )}
                </span>
                <span className="text-base leading-none">{refineOpen ? '−' : '+'}</span>
              </button>
            );
          })()}
          {refineOpen && (
            <div className="mt-3 space-y-3">
              <SearchBar value={search} onChange={setSearch} placeholder={`Search in ${c.name}…`} />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setReserveOnly((v) => !v)}
                  className={
                    'inline-flex items-center min-h-[40px] rounded-full px-4 text-[11px] uppercase tracking-widest font-semibold border transition active:scale-[0.98] ' +
                    (reserveOnly
                      ? 'bg-burgundy-500/20 border-burgundy-400/55 text-burgundy-400'
                      : 'bg-transparent border-cream-100/15 text-cream-100/65 hover:border-cream-100/35')
                  }
                >
                  Reserve required
                </button>
                <button
                  onClick={() => setUnder25((v) => !v)}
                  className={
                    'inline-flex items-center min-h-[40px] rounded-full px-4 text-[11px] uppercase tracking-widest font-semibold border transition active:scale-[0.98] ' +
                    (under25
                      ? 'bg-sage-500/20 border-sage-400/55 text-sage-400'
                      : 'bg-transparent border-cream-100/15 text-cream-100/65 hover:border-cream-100/35')
                  }
                >
                  Under €25
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtered timeline */}
        <div className="px-4 space-y-5">
          {filteredByDate.length === 0 ? (
            <div className="text-cream-100/45 text-sm italic">No items match your filters.</div>
          ) : (
            filteredByDate.map(([date, cards]) => (
              <TimelineDay
                key={date}
                date={date}
                dayLabel={cards[0].dayLabel}
                cards={cards}
                isToday={date === today}
                storage={storage}
                onCopyDay={copyDay}
              />
            ))
          )}
        </div>

        {/* Best of (only on Plan tile to reduce clutter) */}
        {cityCategory === 'plan' && (
          <div className="px-4 pt-2">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-[18px] font-semibold text-cream-50">Best of {c.name}</h2>
              <span className="text-[10px] uppercase tracking-widest text-cream-100/45">Curated</span>
            </div>
            <BestOfPanel cityId={activeCity} />
          </div>
        )}
      </div>
    );
  };

  const renderBookings = () => (
    <div className="px-4 space-y-4">
      <div className="panel-strong rounded-2xl p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">Pre-trip checklist</div>
        <div className="font-display text-[22px] font-semibold leading-tight text-cream-50 mt-1">
          Lock these in now
        </div>
        <div className="text-[12px] text-cream-100/55 mt-1.5">
          Saved on your phone via localStorage. Tap to check off as you book.
        </div>
      </div>
      <Checklist checked={bookChecked} onToggle={toggleBookChecked} />
    </div>
  );

  const renderFavs = () => {
    const favCards = ITINERARY.filter((c) => favs.has(c.id));
    return (
      <div className="px-4 space-y-3">
        <div className="panel-strong rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">Saved favorites</div>
          <div className="font-display text-[22px] font-semibold leading-tight text-cream-50 mt-1">
            {favCards.length} item{favCards.length !== 1 ? 's' : ''}
          </div>
          <div className="text-[12px] text-cream-100/55 mt-1">Tap ☆ on any card to save it here.</div>
        </div>
        {favCards.length === 0 ? (
          <div className="text-cream-100/45 text-sm italic">No favorites yet.</div>
        ) : (
          <div className="space-y-3">
            {favCards.map((c) => (
              <div key={c.id} className="panel rounded-xl p-3.5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-[68px]">
                    <div className="font-display text-[22px] font-semibold leading-none tnum text-cream-50">{c.time}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream-100/40 mt-1">{c.category}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold leading-snug text-cream-50">{c.title}</div>
                    <div className="text-[12px] text-cream-100/55">{c.dayLabel}</div>
                    <div className="text-[12px] text-cream-100/55">{c.location}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <MapLinkButton url={c.mapUrl} compact />
                      <button
                        onClick={() => toggleFav(c.id)}
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] border bg-transparent border-cream-100/15 text-cream-100/65 hover:border-cream-100/35"
                      >
                        Remove ☆
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-full pb-28">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-atlas opacity-90" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-navy-900" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 safe-top backdrop-blur-md bg-navy-900/80 border-b border-cream-100/10">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-gold-500/50 flex items-center justify-center text-gold-400 text-[14px] font-display">
            ✈
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-[0.28em] text-gold-400 font-semibold">Euro Trip</div>
            <div className="font-display text-[14px] font-semibold leading-tight text-cream-50 truncate">
              May 7 – 16, 2026
            </div>
          </div>
          <button
            onClick={shareTrip}
            title="Share trip link"
            className="text-[10px] uppercase tracking-widest rounded-full border border-cream-100/15 bg-navy-800/60 hover:border-gold-500/50 px-2.5 py-1 text-cream-100/75"
          >
            Share ↗
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md py-4 space-y-2">
        {tab === 'today'    && renderToday()}
        {tab === 'cities'   && renderCities()}
        {tab === 'bookings' && renderBookings()}
        {tab === 'favs'     && renderFavs()}
      </main>

      <StickyNav active={tab} onChange={(t) => { setTab(t); if (t === 'cities') { /* keep activeCity */ } }} />

      {toast && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 rounded-full bg-cream-50 text-navy-950 text-xs font-semibold px-4 py-2 shadow-soft">
          {toast}
        </div>
      )}
    </div>
  );
}
