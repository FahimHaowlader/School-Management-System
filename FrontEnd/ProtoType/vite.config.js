import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';



export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Must match what you use in your imports
      '@Global': path.resolve(__dirname, '../global')
    }
  }
});