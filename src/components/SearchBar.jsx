import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search venue, city, food…' }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-100/45 text-sm">⌕</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        inputMode="search"
        className="w-full rounded-xl bg-navy-800/60 border border-cream-100/12 pl-9 pr-9 py-2.5 text-[13px] text-cream-50 placeholder:text-cream-100/35 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-cream-100/50 hover:text-cream-100 px-2 py-1 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
