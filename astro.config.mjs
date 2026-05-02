import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chirakkalcode.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  output: 'static',
  build: {
    assets: 'assets',
  },
  server: {
    port: 4321,
  },
});
