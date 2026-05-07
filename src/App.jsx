import React, { useEffect, useMemo, useState } from 'react';
import {
  ITINERARY,
  CITIES,
  BOOK_NOW,
  FOOD_RULES,
  MUSIC_TASTE,
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

// Today is fixed for the trip context (May 7, 2026 — departure day).
// We use the real "today" if it's within the trip window, else default to start date.
function getTripToday() {
  const start = new Date(TRIP.startDate + 'T00:00:00');
  const end = new Date(TRIP.endDate + 'T23:59:59');
  const now = new Date();
  if (now >= start && now <= end) {
    return now.toISOString().slice(0, 10);
  }
  return TRIP.startDate;
}

// localStorage hook for Set<string>
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
    try {
      localStorage.setItem(key, JSON.stringify([...set]));
    } catch {}
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

  const storage = {
    favs, toggleFav,
    hidden, toggleHide,
    checked, toggleCheck,
  };

  // Filter the itinerary based on current state
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

  // Group by date
  const byDate = useMemo(() => {
    const m = new Map();
    for (const c of filtered) {
      if (!m.has(c.date)) m.set(c.date, []);
      m.get(c.date).push(c);
    }
    for (const arr of m.values()) {
      arr.sort((a, b) => a.time.localeCompare(b.time));
    }
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  // Tonight / next up
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
      `${dayCards[0].dayLabel} — Europe trip`,
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
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-5 glass-strong">
        <div className="absolute inset-0 -z-10 bg-aurora opacity-90" />
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Trip · {TRIP.party}</div>
        <h1 className="text-2xl font-extrabold leading-tight mt-1">
          Berlin → Budapest → Salzburg → Munich → Amsterdam
        </h1>
        <div className="text-sm text-white/70 mt-1">May 7 – May 16, 2026</div>

        {/* route timeline */}
        <div className="mt-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {ROUTE.map((id, i) => {
            const c = CITIES.find((x) => x.id === id);
            return (
              <React.Fragment key={id}>
                <button
                  onClick={() => { setTab('cities'); setActiveCity(id); }}
                  className={
                    'shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition ' +
                    (activeCity === id
                      ? 'bg-white text-ink-900 border-white'
                      : 'bg-white/5 border-white/10 text-white/85 hover:bg-white/10')
                  }
                >
                  <span aria-hidden>{c.flag}</span>
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-[10px] opacity-70">{c.dates.split('–')[0].trim().split(' ')[1]}–{c.dates.split('–')[1]?.trim().split(' ')[1]}</span>
                </button>
                {i < ROUTE.length - 1 && (
                  <span className="text-white/30 px-0.5">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Tonight / Next up */}
      {tonight.next && (
        <div className="glass-strong rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-pink-300">Up next</div>
              <div className="text-base font-semibold mt-0.5">{tonight.next.title}</div>
              <div className="text-[12px] text-white/60">
                {tonight.next.time} · {tonight.next.location}
              </div>
            </div>
            <span className="text-2xl pulse-pink rounded-full">⚡</span>
          </div>
          {tonight.next.musicFit && (
            <div className="mt-2 text-[12px] text-fuchsia-200">{tonight.next.musicFit}</div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <MapLinkButton url={tonight.next.mapUrl} />
            <button
              onClick={() => copyDay(today)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs px-3 py-1.5"
            >
              📋 Copy today's plan
            </button>
          </div>
        </div>
      )}

      {/* Best nightlife picks */}
      <div className="glass rounded-2xl p-4">
        <div className="text-[11px] uppercase tracking-wider text-white/60 mb-2">🎧 Best music nights</div>
        <ul className="space-y-1.5 text-sm">
          <li>• <b>Sat May 9</b> · Pavilon Kert sunset → Pontoon · Budapest</li>
          <li>• <b>Sun May 10</b> · Sunday Sundown @ Pontoon · Budapest</li>
          <li>• <b>Fri May 15</b> · Brighter Days @ The Loft · Amsterdam ⭐</li>
          <li>• Backup: Disco Dolly · Amsterdam</li>
        </ul>
      </div>

      {/* Best beer */}
      <div className="glass rounded-2xl p-4">
        <div className="text-[11px] uppercase tracking-wider text-white/60 mb-2">🍺 Best beer stops</div>
        <div className="flex flex-wrap gap-1.5 text-[12px]">
          {[
            'Élesztőház · Budapest',
            'FIRST Craft Beer & BBQ · Budapest',
            'Stiegl-Brauwelt · Salzburg',
            'Augustiner Bräustübl · Salzburg',
            'Augustiner-Keller · Munich',
            'Hofbräuhaus · Munich',
            'Brouwerij \'t IJ · Amsterdam',
          ].map((b) => (
            <span key={b} className="border border-yellow-400/25 bg-yellow-500/10 text-yellow-100 rounded-full px-2.5 py-1">{b}</span>
          ))}
        </div>
      </div>

      {/* Food rules */}
      <div className="glass rounded-2xl p-4">
        <div className="text-[11px] uppercase tracking-wider text-white/60 mb-2">⚠️ Food rules</div>
        <ul className="space-y-1 text-[13px] text-rose-100/90">
          {FOOD_RULES.map((r) => <li key={r}>• {r}</li>)}
        </ul>
      </div>

      {/* Music taste */}
      <div className="glass rounded-2xl p-4">
        <div className="text-[11px] uppercase tracking-wider text-white/60 mb-2">🎵 Music taste</div>
        <div className="text-[12px] mb-1.5"><span className="text-emerald-300 font-semibold">Yes:</span> {MUSIC_TASTE.yes.join(', ')}</div>
        <div className="text-[12px]"><span className="text-rose-300 font-semibold">No:</span> {MUSIC_TASTE.no.join(', ')}</div>
      </div>

      {/* Quick book-now */}
      <Checklist checked={bookChecked} onToggle={toggleBookChecked} />
    </div>
  );

  const renderToday = () => (
    <div className="space-y-4 px-4">
      <div className="glass-strong rounded-2xl p-4">
        <div className="text-[10px] uppercase tracking-wider text-pink-300">Today</div>
        <div className="text-lg font-semibold">{tonight.all[0]?.dayLabel || 'Trip starts soon'}</div>
        <div className="text-[12px] text-white/60">{tonight.all.length} stops planned</div>
        <button
          onClick={() => copyDay(today)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white text-ink-900 text-xs font-semibold px-3 py-1.5"
        >
          📋 Copy today's plan
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
        <div className="text-white/60 text-sm italic">Nothing scheduled for today.</div>
      )}
    </div>
  );

  const renderCities = () => {
    const c = CITIES.find((x) => x.id === activeCity);
    return (
      <div className="space-y-5">
        <CitySelector activeCity={activeCity} onPick={setActiveCity} />

        <div className="px-4">
          <div className="glass-strong rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.flag}</span>
              <div className="flex-1">
                <div className="text-xl font-bold leading-tight">{c.name}</div>
                <div className="text-[12px] text-white/60">{c.dates} · {c.nights} night{c.nights > 1 ? 's' : ''}</div>
              </div>
            </div>
            <div className="text-[13px] text-white/70 mt-2">{c.tagline}</div>
          </div>
        </div>

        <div className="px-4 space-y-3">
          <SearchBar value={search} onChange={setSearch} placeholder={`Search in ${c.name}…`} />
          <CategoryFilters activeCategory={category} onPick={setCategory} />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setReserveOnly((v) => !v)}
              className={
                'rounded-full px-3 py-1.5 text-[12px] border transition ' +
                (reserveOnly
                  ? 'bg-rose-500/20 border-rose-400/40 text-rose-100'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10')
              }
            >
              ✅ Reserve required
            </button>
            <button
              onClick={() => setUnder25((v) => !v)}
              className={
                'rounded-full px-3 py-1.5 text-[12px] border transition ' +
                (under25
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10')
              }
            >
              💸 Under €25
            </button>
          </div>
        </div>

        <div className="px-4 space-y-5">
          {byDate.length === 0 ? (
            <div className="text-white/50 text-sm italic">No items match your filters.</div>
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
          <h2 className="text-sm font-semibold text-white/80 mb-2 mt-2">Best of {c.name}</h2>
          <BestOfPanel cityId={activeCity} />
        </div>
      </div>
    );
  };

  const renderBookings = () => (
    <div className="px-4 space-y-4">
      <div className="glass-strong rounded-2xl p-4">
        <div className="text-[10px] uppercase tracking-wider text-white/60">Pre-trip checklist</div>
        <div className="text-base font-semibold">Lock these in now</div>
        <div className="text-[12px] text-white/60 mt-1">
          Saved to your phone with localStorage. Tap to check off as you book.
        </div>
      </div>
      <Checklist checked={bookChecked} onToggle={toggleBookChecked} />
    </div>
  );

  const renderFavs = () => {
    const favCards = ITINERARY.filter((c) => favs.has(c.id));
    return (
      <div className="px-4 space-y-3">
        <div className="glass-strong rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-wider text-white/60">Saved favorites</div>
          <div className="text-base font-semibold">{favCards.length} item{favCards.length !== 1 ? 's' : ''}</div>
          <div className="text-[12px] text-white/60 mt-1">Tap ☆ on any card to save it here.</div>
        </div>
        {favCards.length === 0 ? (
          <div className="text-white/50 text-sm italic">No favorites yet.</div>
        ) : (
          <div className="space-y-3">
            {favCards.map((c) => (
              <div key={c.id} className="glass rounded-2xl p-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 shrink-0 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Time</div>
                    <div className="text-sm font-bold tabular-nums">{c.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold leading-snug">{c.title}</div>
                    <div className="text-[12px] text-white/60">{c.dayLabel}</div>
                    <div className="text-[12px] text-white/60">{c.location}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <MapLinkButton url={c.mapUrl} compact />
                      <button
                        onClick={() => toggleFav(c.id)}
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] border bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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
      {/* Background aura */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-60" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-ink-900" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 safe-top backdrop-blur-md bg-ink-900/70 border-b border-white/5">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-3">
          <div className="text-xl">✈️</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Europe Trip</div>
            <div className="text-sm font-semibold truncate">May 7 – 16, 2026 · {TRIP.party}</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
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
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 rounded-full bg-white text-ink-900 text-xs font-semibold px-4 py-2 shadow-glow">
          {toast}
        </div>
      )}
    </div>
  );
}
