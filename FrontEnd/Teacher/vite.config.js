import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Must match what you use in your imports
      '@Global': path.resolve(__dirname, '../global')
    }
  }
});