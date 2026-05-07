import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ITINERARY, BUDAPEST_HOME_BASE } from '../data/itinerary.js';

const CAT_COLORS = {
  food:      '#d6b366',
  beer:      '#c9a14a',
  daytime:   '#7da38e',
  nightlife: '#a8525a',
  travel:    '#8aa3c2',
  recovery:  '#9aab9a',
};

// Map shows the unique places (de-duped by lat/lng) so that the same Pontoon
// appearing twice in the timeline doesn't render two stacked pins.
function uniquePlaces(items) {
  const seen = new Map();
  for (const c of items) {
    if (typeof c.lat !== 'number' || typeof c.lng !== 'number') continue;
    const key = `${c.lat.toFixed(4)},${c.lng.toFixed(4)}`;
    if (!seen.has(key)) seen.set(key, c);
  }
  return [...seen.values()];
}

export default function BudapestMap() {
  const places = useMemo(
    () => uniquePlaces(ITINERARY.filter((c) => c.city === 'budapest')),
    []
  );

  const center = [BUDAPEST_HOME_BASE.lat, BUDAPEST_HOME_BASE.lng];

  // Bounds = hostel + every pin, with a small padding so nothing hugs the edge.
  const bounds = useMemo(() => {
    const lats = [BUDAPEST_HOME_BASE.lat, ...places.map((p) => p.lat)];
    const lngs = [BUDAPEST_HOME_BASE.lng, ...places.map((p) => p.lng)];
    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }, [places]);

  return (
    <div className="rounded-2xl overflow-hidden border border-cream-100/15 bg-navy-800/40">
      <div className="px-4 pt-3 pb-2 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Budapest map</div>
          <div className="font-display text-[15px] text-cream-50 leading-tight">
            Base: {BUDAPEST_HOME_BASE.shortName}
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-cream-100/45">
          {places.length} pins
        </div>
      </div>
      <div style={{ height: 280, width: '100%' }}>
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [24, 24] }}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', background: '#0b1320' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Hostel anchor pin — gold, larger, white border for visibility */}
          <CircleMarker
            center={center}
            radius={12}
            pathOptions={{
              fillColor: '#c9a14a',
              fillOpacity: 1,
              color: '#fbf6e9',
              weight: 2,
            }}
            bubblingMouseEvents={false}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={0.95} permanent={false}>
              <strong>{BUDAPEST_HOME_BASE.shortName}</strong> · home base
            </Tooltip>
            <Popup>
              <div style={{ fontSize: 12, lineHeight: 1.35 }}>
                <strong>{BUDAPEST_HOME_BASE.name}</strong>
                <br />
                {BUDAPEST_HOME_BASE.address}
                <br />
                <em>Home base</em>
              </div>
            </Popup>
          </CircleMarker>

          {/* Category-colored pins */}
          {places.map((c) => {
            const color = CAT_COLORS[c.category] || '#cbb287';
            const km = c.distanceFromHostelKm;
            const min = c.walkMinutesFromHostel;
            return (
              <CircleMarker
                key={c.id}
                center={[c.lat, c.lng]}
                radius={9}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.95,
                  color: '#0b1320',
                  weight: 1.5,
                }}
                bubblingMouseEvents={false}
              >
                <Popup>
                  <div style={{ fontSize: 12, lineHeight: 1.4, minWidth: 160 }}>
                    <strong>{c.title}</strong>
                    <br />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 10, color: color }}>
                      {c.category}
                    </span>
                    <br />
                    {km != null && (
                      <span>
                        {km < 0.7
                          ? `${min} min walk from hostel`
                          : `${km.toFixed(1)} km · ${min} min walk`}
                      </span>
                    )}
                    <br />
                    <a href={c.mapUrl} target="_blank" rel="noopener noreferrer">
                      Open in Maps ↗
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
      <div className="px-4 py-2 text-[10px] text-cream-100/45">
        Tap a pin for distance + Open-in-Maps link.
      </div>
    </div>
  );
}
