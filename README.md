# Euro Trip · May 2026

Mobile-first interactive itinerary for a Berlin → Budapest → Salzburg → Munich → Amsterdam trip, May 7 – May 15, 2026 (then on to Barcelona, not in this app).

Built with **Vite + React + TailwindCSS**. Static, no backend, no API keys.

Live: **https://jackblaze919.github.io/euro-trip-itinerary/**

## Run locally

```bash
npm install
npm run dev
```

Vite prints two URLs:

```
Local:   http://localhost:5173/
Network: http://192.168.x.x:5173/
```

## Open on your phone (same Wi-Fi)

1. Make sure your phone and laptop are on the same Wi-Fi network.
2. On the laptop, run `npm run dev` (the `--host` flag is already set in `package.json`).
3. On your phone, open the **Network** URL Vite prints (e.g. `http://192.168.1.42:5173/`).
4. In Safari on iOS, tap **Share → Add to Home Screen** to use it like an app.

If your phone can't reach the laptop, your Wi-Fi router has client isolation on. Either disable it, or use a USB tethered hotspot.

## Build for production

```bash
npm run build
```

Output is in `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

That runs [`scripts/deploy.sh`](scripts/deploy.sh): builds with the right `VITE_BASE`, drops a `.nojekyll` and SPA `404.html`, then force-pushes `dist/` to the `gh-pages` branch on `origin`. Pages is configured to serve from `gh-pages` branch root, so the new build is live within ~30 s.

## What's inside

The app has four tabs in the bottom nav: **Today**, **Cities**, **Book**, **Saved**.

- **Today** is the home screen. Today's day label and stop count, an "Up Next" card auto-pointing at the next stop based on current time, a "Tonight" section when the day has nightlife stops, the full day-by-day timeline, a "Must Book Soon" list of upcoming priority items, and a "Share trip link" button (uses `navigator.share`, falls back to clipboard).
- **Cities** opens to the four city cards (Budapest / Salzburg / Munich / Amsterdam). Tapping a city drills into a **City Hub**: compact city header with a city-specific motif, then category tiles — **Plan / Food / Beer / Nightlife / Must Book** — which filter the timeline below. Plan also shows a "Best of {city}" panel and emergency fallbacks. Search, "Reserve required" and "Under €25" toggles live behind a collapsed **Refine** button so the default view stays simple.
- **Book** is the pre-trip checklist (boarding-pass-style cream card) with priority chips: **Must / Recommended / Optional**.
- **Saved** is the list of cards you've starred (tap ☆ on any expanded card).

## Itinerary cards

Collapsed cards show only: time · category dot · title · location · price · reserve badge.
Expanded cards add: warning/priority chips, description, music fit, safe order, avoid, booking hint, and an action row with **Open in Maps**, **Mark done**, and **Save**.

## Sorting and price filtering

Each card has a `sortOrder` field. Late-night `00:00` stops that belong to the previous evening (e.g. Szimpla Kert on May 7 night) get `sortOrder: 2400` so they appear *after* the 22:30 stop instead of before the 16:00 flight.

Prices are stored as a display string (`price`) plus structured fields (`priceMinEUR`, `priceMaxEUR`, `isFree`) derived at module load. Filters read the structured fields — they do **not** parse the display text.

## State persistence

Stored in `localStorage`:

- `et:favs` — saved cards
- `et:checked` — cards marked done
- `et:bookings` — Book-These-Now checkboxes

(`et:hidden` is no longer written to — the Skip action was removed to prevent accidentally hiding items with no recovery path. Existing entries in `et:hidden` are ignored by the UI.)

Clear them in DevTools → Application → Local Storage to start fresh.

## Files

```
src/
  App.jsx
  main.jsx
  index.css
  data/
    itinerary.js          # cards, best-of, fallbacks, book-now,
                          #   + post-process: sortOrder, priceMinEUR/MaxEUR/isFree
  components/
    CitySelector.jsx      # 4-city grid (used inside Cities tab)
    CityMotif.jsx         # line-art icon per city (thermal/alpine/stein/canal)
    TimelineDay.jsx       # day section with timeline rail and pin dots
    ItineraryCard.jsx     # collapsed/expanded card
    Checklist.jsx         # boarding-pass-style Book These Now
    BestOfPanel.jsx       # "Best of {city}" + emergency fallbacks
    SearchBar.jsx         # search input (inside Refine)
    CategoryFilters.jsx   # legacy pill filters (kept but unused in current IA)
    StickyNav.jsx         # 4-tab bottom nav: Today/Cities/Book/Saved
    MapLinkButton.jsx     # "Open in Maps" link button
scripts/
  deploy.sh               # `npm run deploy` entry point
```
