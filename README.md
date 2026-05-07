# Europe Trip · May 2026

Mobile-first interactive itinerary for 4 guys traveling Berlin → Budapest → Salzburg → Munich → Amsterdam, May 7 – May 16, 2026.

Built with **Vite + React + TailwindCSS**. Static, no backend, no API keys.

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

## Deploy

### Vercel
```bash
npx vercel --prod
```
Vercel auto-detects Vite. Output dir: `dist`. Build command: `npm run build`.

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```
Or drag-and-drop the `dist/` folder onto the Netlify dashboard.

### GitHub Pages
```bash
npm run build
# push the dist/ folder to a gh-pages branch
```

## What's inside

- **Overview** — route timeline, "Up next" card, food rules, music taste, best beer/nightlife, full Book These Now checklist.
- **Today** — only today's stops, with a one-tap "Copy today's plan" button.
- **Cities** — Budapest, Salzburg, Munich, Amsterdam. Tap into a city for category filters, search, reserve-only / under-€25 toggles, day-by-day expandable timeline, Best Of and Emergency Fallbacks.
- **Book** — pre-trip booking checklist, persisted to `localStorage`.
- **Saved** — your starred items.

## State persistence

Stored in `localStorage` keys:

- `et:favs` — saved cards
- `et:hidden` — skipped cards
- `et:checked` — cards marked done
- `et:bookings` — book-these-now checkboxes

Clear them in DevTools → Application → Local Storage if you want a fresh start.

## Files

```
src/
  App.jsx
  main.jsx
  index.css
  data/
    itinerary.js          # all cards, best-of, fallbacks, book-now
  components/
    CitySelector.jsx
    CategoryFilters.jsx
    TimelineDay.jsx
    ItineraryCard.jsx
    Checklist.jsx
    BestOfPanel.jsx
    SearchBar.jsx
    StickyNav.jsx
    MapLinkButton.jsx
```
