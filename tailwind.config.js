/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#08080c',
          800: '#0e0e15',
          700: '#16161f',
          600: '#1d1d2a',
          500: '#262635',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(120, 90, 255, 0.45)',
      },
      backgroundImage: {
        'aurora':
          'radial-gradient(at 0% 0%, rgba(255,90,140,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(120,90,255,0.20) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(0,200,180,0.15) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
