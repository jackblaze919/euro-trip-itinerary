import React, { useEffect, useMemo, useState } from 'react';
import {
  ITINERARY,
  CITIES,
  TRIP,
} from './data/itinerary.js';
import CitySelector from './components/CitySelector.jsx';
import CategoryFilters from './components/CategoryFilters.jsx';
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

const ROUTE = ['budapest', 'salzburg', 'munich', 'amsterdam'];

// ─── Tiny inline route line: dotted gold curve between city codes ──────
function RouteStrip({ activeCity, onPick }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-px"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(201,161,74,0.55) 0, rgba(201,161,74,0.55) 4px, transparent 4px, transparent 8px)',
          backgroundSize: '8px 1px',
        }}
      />
      <div className="relative flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {ROUTE.map((id) => {
          const c = CITIES.find((x) => x.id === id);
          const active = activeCity === id;
          return (
            <button
              key={id}
              onClick={() => onPick(id)}
              className={
                'shrink-0 inline-flex flex-col items-center px-2.5 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-widest border transition tnum ' +
                (active
                  ? 'bg-gold-500 border-gold-500 text-navy-950'
                  : 'bg-navy-900 border-cream-100/15 text-cream-100/75 hover:border-cream-100/35')
              }
            >
              <span>{c.code}</span>
              <span className="text-[8px] mt-0.5 opacity-70 normal-case tracking-wider">
                {c.shortDates.replace(' May', '')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const today = getTripToday();
  const [tab, setTab] = useState('overview');
  const [activeCity, setActiveCity] = useState('budapest');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [reserveOnly, setReserveOnly] = useState(false);
  const [under25, setUnder25] = useState(false);
  const [toast, setToast] = useState(null);

  const [favs, toggleFav] = useStoredSet('et:favs');
  const [hidden, toggleHide] = useStoredSet('et:hidden');
  const [checked, toggleCheck] = useStoredSet('et:checked');
  const [bookChecked, toggleBookChecked] = useStoredSet('et:bookings');

  const storage = { favs, toggleFav, hidden, toggleHide, checked, toggleCheck };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ITINERARY.filter((c) => {
      if (tab === 'cities' && c.city !== activeCity) return false;
      if (category !== 'all') {
        if (category === 'bookings') {
          if (!(c.reserve && c.reserve.toLowerCase().startsWith('yes')) && !c.priority) return false;
        } else if (category === 'warnings') {
          if (!c.foodWarning) return false;
        } else if (c.category !== category) return false;
      }
      if (reserveOnly && !(c.reserve && c.reserve.toLowerCase().startsWith('yes'))) return false;
      if (under25) {
        const m = (c.price || '').match(/€\s*(\d+)/);
        if (!m) return false;
        if (parseInt(m[1], 10) > 25) return false;
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
  }, [tab, activeCity, category, search, reserveOnly, under25]);

  const byDate = useMemo(() => {
    const m = new Map();
    for (const c of filtered) {
      if (!m.has(c.date)) m.set(c.date, []);
      m.get(c.date).push(c);
    }
    for (const arr of m.values()) arr.sort((a, b) => a.time.localeCompare(b.time));
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const tonight = useMemo(() => {
    const todays = ITINERARY
      .filter((c) => c.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5);
    const upcoming = todays.find((c) => c.time >= hhmm) || todays[todays.length - 1];
    return { all: todays, next: upcoming };
  }, [today]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  async function copyDay(date) {
    const dayCards = ITINERARY
      .filter((c) => c.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
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

  // ─── Sub-views ────────────────────────────────────────────────
  const renderOverview = () => (
    <div className="space-y-5 px-4">
      {/* Hero — boutique-magazine feel */}
      <div className="relative overflow-hidden rounded-2xl panel-strong p-5 pt-6">
        <div className="absolute inset-0 -z-10 bg-atlas opacity-100" />

        <div className="text-[10px] uppercase tracking-[0.28em] text-gold-400 font-semibold">
          Spring · 2026
        </div>
        <h1 className="font-display text-[34px] sm:text-[38px] leading-[1.05] font-semibold text-cream-50 mt-1.5">
          Euro Trip<br/>Itinerary
        </h1>
        <div className="text-[13px] text-cream-100/70 mt-2 font-display italic">
          Budapest <span className="text-gold-400">→</span> Salzburg <span className="text-gold-400">→</span> Munich <span className="text-gold-400">→</span> Amsterdam
        </div>

        <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-cream-100/55 uppercase tracking-widest">
          <span className="tnum">May 7 – 16</span>
          <span className="text-gold-500">·</span>
          <span className="tnum">{ITINERARY.length} stops</span>
        </div>

        <div className="gold-rule mt-5" />

        <div className="mt-4">
          <RouteStrip activeCity={activeCity} onPick={(id) => { setTab('cities'); setActiveCity(id); }} />
        </div>
      </div>

      {/* Up next */}
      {tonight.next && (
        <div className="panel rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">
                Up Next
              </div>
              <div className="font-display text-[20px] font-semibold leading-tight text-cream-50 mt-1">
                {tonight.next.title}
              </div>
              <div className="text-[12px] text-cream-100/55 mt-0.5 tnum">
                {tonight.next.time} · {tonight.next.location}
              </div>
            </div>
            <div className="shrink-0 font-display text-[28px] tnum text-gold-400 leading-none pulse-gold rounded-full px-1">
              {tonight.next.time.split(':')[0]}
            </div>
          </div>
          {tonight.next.musicFit && (
            <div className="mt-2.5 text-[12px] text-burgundy-400 italic">
              {tonight.next.musicFit}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <MapLinkButton url={tonight.next.mapUrl} compact />
            <button
              onClick={() => copyDay(today)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream-100/15 bg-transparent hover:border-cream-100/35 text-[11px] px-2.5 py-1 text-cream-100/75"
            >
              ❏ Copy today's plan
            </button>
          </div>
        </div>
      )}

      {/* Best music nights */}
      <div className="panel rounded-2xl p-4">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-[18px] font-semibold text-cream-50">Best Music Nights</h2>
          <span className="text-[10px] uppercase tracking-widest text-cream-100/45">For our taste</span>
        </div>
        <ul className="space-y-2 text-[13px]">
          <li className="flex gap-3">
            <span className="font-display text-burgundy-400 tnum text-[14px] w-16 shrink-0">Sat 09</span>
            <span className="text-cream-100/85">Pavilon Kert sunset → Pontoon · <span className="text-cream-100/55">Budapest</span></span>
          </li>
          <li className="flex gap-3">
            <span className="font-display text-burgundy-400 tnum text-[14px] w-16 shrink-0">Sun 10</span>
            <span className="text-cream-100/85">Sunday Sundown @ Pontoon · <span className="text-cream-100/55">Budapest</span></span>
          </li>
          <li className="flex gap-3">
            <span className="font-display text-gold-400 tnum text-[14px] w-16 shrink-0">Fri 15</span>
            <span className="text-cream-50 font-medium">Brighter Days @ The Loft · <span className="text-cream-100/55 font-normal">Amsterdam</span> <span className="text-gold-400">★</span></span>
          </li>
          <li className="flex gap-3">
            <span className="font-display text-cream-100/55 tnum text-[14px] w-16 shrink-0">Backup</span>
            <span className="text-cream-100/70">Disco Dolly · <span className="text-cream-100/55">Amsterdam</span></span>
          </li>
        </ul>
      </div>

      {/* Best beer */}
      <div className="panel rounded-2xl p-4">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-[18px] font-semibold text-cream-50">Best Beer Stops</h2>
          <span className="text-[10px] uppercase tracking-widest text-cream-100/45">7 picks</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[12px]">
          {[
            ['Élesztőház', 'Budapest'],
            ['FIRST Craft Beer & BBQ', 'Budapest'],
            ['Stiegl-Brauwelt', 'Salzburg'],
            ['Augustiner Bräustübl', 'Salzburg'],
            ['Augustiner-Keller', 'Munich'],
            ['Hofbräuhaus', 'Munich'],
            ['Brouwerij \'t IJ', 'Amsterdam'],
          ].map(([name, city]) => (
            <span
              key={name}
              className="border border-gold-500/35 bg-gold-500/8 rounded-full px-2.5 py-1 text-cream-100/90"
            >
              <span className="font-medium">{name}</span>
              <span className="text-cream-100/45"> · {city}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Book These Now */}
      <Checklist checked={bookChecked} onToggle={toggleBookChecked} />
    </div>
  );

  const renderToday = () => (
    <div className="space-y-4 px-4">
      <div className="panel-strong rounded-2xl p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-semibold">Today</div>
        <div className="font-display text-[22px] font-semibold leading-tight text-cream-50 mt-1">
          {tonight.all[0]?.dayLabel || 'Trip starts soon'}
        </div>
        <div className="text-[11px] text-cream-100/55 tnum mt-0.5">
          {tonight.all.length} stops planned
        </div>
        <button
          onClick={() => copyDay(today)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-500 text-navy-950 text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 hover:bg-gold-400"
        >
          ❏ Copy today's plan
        </button>
      </div>

      {tonight.all.length > 0 ? (
        <TimelineDay
          date={today}
          dayLabel={tonight.all[0].dayLabel}
          cards={tonight.all}
          isToday
          storage={storage}
          onCopyDay={copyDay}
        />
      ) : (
        <div className="text-cream-100/55 text-sm italic">Nothing scheduled for today.</div>
      )}
    </div>
  );

  const renderCities = () => {
    const c = CITIES.find((x) => x.id === activeCity);
    return (
      <div className="space-y-5">
        <CitySelector activeCity={activeCity} onPick={setActiveCity} />

        <div className="px-4">
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

        <div className="px-4 space-y-3">
          <SearchBar value={search} onChange={setSearch} placeholder={`Search in ${c.name}…`} />
          <CategoryFilters activeCategory={category} onPick={setCategory} />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setReserveOnly((v) => !v)}
              className={
                'rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest font-semibold border transition ' +
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
                'rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest font-semibold border transition ' +
                (under25
                  ? 'bg-sage-500/20 border-sage-400/55 text-sage-400'
                  : 'bg-transparent border-cream-100/15 text-cream-100/65 hover:border-cream-100/35')
              }
            >
              Under €25
            </button>
          </div>
        </div>

        <div className="px-4 space-y-5">
          {byDate.length === 0 ? (
            <div className="text-cream-100/45 text-sm italic">No items match your filters.</div>
          ) : (
            byDate.map(([date, cards]) => (
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

        <div className="px-4">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-[18px] font-semibold text-cream-50">Best of {c.name}</h2>
            <span className="text-[10px] uppercase tracking-widest text-cream-100/45">Curated</span>
          </div>
          <BestOfPanel cityId={activeCity} />
        </div>
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
                  <div className="shrink-0 w-[58px] pr-2 border-r border-cream-100/8">
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
      {/* Background atlas wash */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-atlas opacity-90" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-navy-900" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 safe-top backdrop-blur-md bg-navy-900/80 border-b border-cream-100/8">
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
          <div className="text-[10px] uppercase tracking-widest rounded-full border border-cream-100/12 bg-navy-800/60 px-2 py-1 text-cream-100/65 tnum">
            {ITINERARY.length} stops
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md py-4 space-y-2">
        {tab === 'overview' && renderOverview()}
        {tab === 'today'    && renderToday()}
        {tab === 'cities'   && renderCities()}
        {tab === 'bookings' && renderBookings()}
        {tab === 'favs'     && renderFavs()}
      </main>

      <StickyNav active={tab} onChange={setTab} />

      {toast && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 rounded-full bg-cream-50 text-navy-950 text-xs font-semibold px-4 py-2 shadow-soft">
          {toast}
        </div>
      )}
    </div>
  );
}
