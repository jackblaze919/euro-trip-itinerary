import React from 'react';

export default function MapLinkButton({ url, label = 'Open in Maps', compact = false }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 text-sky-200 ' +
        'hover:bg-sky-500/20 transition active:scale-[0.98] ' +
        (compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs font-medium')
      }
    >
      <span aria-hidden>📍</span>
      <span>{label}</span>
    </a>
  );
}
