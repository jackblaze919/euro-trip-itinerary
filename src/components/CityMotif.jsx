import React from 'react';

// Compact line-art icons evoking each city — thin strokes, antique-map feel.
export default function CityMotif({ motif, size = 28, color = '#c9a14a' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (motif === 'thermal') {
    // Concentric ripples + steam — Budapest baths
    return (
      <svg {...common} aria-hidden>
        <path d="M3 22c2 0 2 -2 4 -2s2 2 4 2 2 -2 4 -2 2 2 4 2 2 -2 4 -2 2 2 4 2 2 -2 4 -2" />
        <path d="M3 26c2 0 2 -2 4 -2s2 2 4 2 2 -2 4 -2 2 2 4 2 2 -2 4 -2 2 2 4 2 2 -2 4 -2" opacity="0.7" />
        <path d="M11 12c0 -2 2 -2 2 -4" opacity="0.7" />
        <path d="M16 10c0 -2 2 -2 2 -4" />
        <path d="M21 12c0 -2 2 -2 2 -4" opacity="0.7" />
      </svg>
    );
  }

  if (motif === 'alpine') {
    // Mountain peaks — Salzburg
    return (
      <svg {...common} aria-hidden>
        <path d="M3 25 L11 12 L16 19 L22 9 L29 25 Z" />
        <path d="M9 15 L11 12 L13 15" opacity="0.6" />
        <path d="M20 12 L22 9 L24 12" opacity="0.6" />
      </svg>
    );
  }

  if (motif === 'stein') {
    // Beer stein with handle — Munich
    return (
      <svg {...common} aria-hidden>
        <rect x="9" y="9" width="12" height="17" rx="1.5" />
        <path d="M21 13h3a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-3" />
        <path d="M9 14h12" opacity="0.6" />
        <path d="M11 7c1 -1 2 -1 2 -2" opacity="0.7" />
        <path d="M15 7c1 -1 2 -1 2 -2" opacity="0.7" />
        <path d="M19 7c1 -1 2 -1 2 -2" opacity="0.7" />
      </svg>
    );
  }

  if (motif === 'canal') {
    // Gabled canal house silhouette + waves — Amsterdam
    return (
      <svg {...common} aria-hidden>
        <path d="M5 22 L5 12 L9 8 L13 12 L13 22 Z" />
        <path d="M14 22 L14 14 L17 11 L20 14 L20 22 Z" />
        <path d="M21 22 L21 13 L24 10 L27 13 L27 22 Z" />
        <path d="M3 26c2 0 2 -2 4 -2s2 2 4 2 2 -2 4 -2 2 2 4 2 2 -2 4 -2 2 2 4 2" opacity="0.7" />
      </svg>
    );
  }

  return null;
}
