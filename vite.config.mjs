import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',   // 👈 Correct for relative paths
  build: {
    // Other build configurations...
    assetsDir: 'assets', // Explicitly set asset directory
  },
});
