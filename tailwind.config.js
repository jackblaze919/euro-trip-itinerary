/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy / charcoal background
        navy: {
          950: '#070b13',
          900: '#0b1320',
          800: '#0f1b2c',
          700: '#152538',
          600: '#1c2f47',
          500: '#264159',
        },
        // Warm cream / parchment
        cream: {
          50:  '#fbf6e9',
          100: '#f5ecd6',
          200: '#ecdfba',
          300: '#dccea0',
          400: '#c6b483',
        },
        // Muted gold accents
        gold: {
          400: '#d6b366',
          500: '#c9a14a',
          600: '#b08a3e',
          700: '#8c6d2f',
        },
        // Burgundy for warnings / "must book"
        burgundy: {
          400: '#a8525a',
          500: '#8b3a44',
          600: '#6f2d36',
          700: '#552028',
        },
        // Sage for "safe / done"
        sage: {
          400: '#7da38e',
          500: '#5e8772',
          600: '#476957',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif:   ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
      },
      boxShadow: {
        boarding: '0 8px 24px -10px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.25)',
        soft: '0 2px 6px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        // Subtle warm vignette behind the navy
        atlas:
          'radial-gradient(at 12% 0%, rgba(201,161,74,0.10) 0px, transparent 45%), radial-gradient(at 100% 0%, rgba(139,58,68,0.08) 0px, transparent 55%), radial-gradient(at 50% 100%, rgba(126,163,142,0.06) 0px, transparent 60%)',
        // Faint paper grain texture
        paper:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.94  0 0 0 0 0.90  0 0 0 0 0.78  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        ticketPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(214, 179, 102, 0.45)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(214, 179, 102, 0)' },
        },
      },
      animation: {
        ticket: 'ticketPulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
