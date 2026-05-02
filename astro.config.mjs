import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Domain / Base
 * --------------------------------------------------------------------------
 * Wenn Custom Domain (fesin.dev) aktiv ist:
 *   site: 'https://fesin.dev', base: '/'
 * Solange noch chirakkalcode.github.io/portfolio/:
 *   site: 'https://chirakkalcode.github.io', base: '/portfolio'
 *
 * Umschalten via Env: SITE=apex npm run build
 */
const isApex = process.env.SITE === 'apex';

export default defineConfig({
  site: isApex ? 'https://fesin.dev' : 'https://chirakkalcode.github.io',
  base: isApex ? '/' : '/portfolio',
  trailingSlash: 'always',
  output: 'static',
  build: { assets: 'assets' },
  server: { port: 4321 },
  integrations: [
    sitemap({
      // og-image und cv-print sind interne Routen — nicht in sitemap.xml
      filter: (page) => !page.includes('/og-image/') && !page.includes('/cv-print/'),
    }),
  ],
});
