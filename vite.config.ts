import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['favicon.svg'], manifest: { name: 'Atelier Project Desk', short_name: 'Atelier', description: 'A planning workspace for independent creative studios.', theme_color: '#17231e', background_color: '#17231e', display: 'standalone', start_url: '/', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { globPatterns: ['**/*.{js,css,html,svg,woff2}'] } })],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true }
});
