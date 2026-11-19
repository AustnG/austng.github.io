// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://austng.github.io',
  // Flat files (resume.html, lost.html) so GitHub Pages serves both /lost and /lost.html.
  // Printed QR stickers point at /lost: do not change this setting.
  build: { format: 'file' },
  trailingSlash: 'never',
  devToolbar: { enabled: false },
});
