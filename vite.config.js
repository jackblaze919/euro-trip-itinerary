import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set GH Pages base path in CI; locally just serve from root.
const repoBase = process.env.VITE_BASE || '/';

export default defineConfig({
  plugins: [react()],
  base: repoBase,
  server: {
    host: true,
    port: 5173,
  },
});
