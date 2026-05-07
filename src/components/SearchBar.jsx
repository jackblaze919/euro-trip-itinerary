import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search venue, city, food…' }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">🔎</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        inputMode="search"
        className="w-full rounded-full bg-white/5 border border-white/10 pl-9 pr-9 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 px-2 py-1 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
