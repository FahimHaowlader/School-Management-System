import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Must match what you use in your imports
      '@Global': path.resolve(__dirname, '../global')
    }
  }
});