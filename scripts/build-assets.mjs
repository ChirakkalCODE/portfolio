/**
 * Build-Assets: PDF + OG-Image + Favicons
 * --------------------------------------------------------------------------
 * Läuft nach `astro build`.
 *
 *   1. Spawnt sirv auf dist/ (Port 4322)
 *   2. Puppeteer rendert /cv-print/ → dist/cv.pdf (A4)
 *   3. Puppeteer rendert /og-image/ → dist/og.png (1200x630)
 *   4. Sharp generiert apple-touch-icon, icon-192, icon-512 aus inline-SVG
 *   5. Schreibt manifest.webmanifest
 */
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, statSync, writeFileSync } from 'node:fs';
import sirv from 'sirv';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const PORT = 4322;
const isApex = process.env.SITE === 'apex';
const BASE = isApex ? '' : '/portfolio';

if (!existsSync(distDir)) {
  console.error('dist/ fehlt — bitte zuerst "astro build" laufen lassen.');
  process.exit(1);
}

// ============ 1. Static Server ============
console.log('[assets] Spawning sirv on dist/');
const serve = sirv(distDir, { etag: true, dev: false });
const server = http.createServer((req, res) => {
  if (BASE && req.url && req.url.startsWith(BASE)) {
    req.url = req.url.slice(BASE.length) || '/';
  }
  serve(req, res);
});
await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`[assets] Serving on http://localhost:${PORT}${BASE}/`);

// ============ 2. Headless Chromium ============
console.log('[assets] Launching headless Chromium');
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

// ============ PDF ============
{
  const page = await browser.newPage();
  await page.emulateMediaType('print');
  const url = `http://localhost:${PORT}${BASE}/cv-print/`;
  console.log(`[pdf] → ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  const out = path.join(distDir, 'cv.pdf');
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  await page.close();
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`[pdf] ✔ dist/cv.pdf (${kb} KB)`);
}

// ============ OG-Image ============
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const url = `http://localhost:${PORT}${BASE}/og-image/`;
  console.log(`[og] → ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  const out = path.join(distDir, 'og.png');
  await page.screenshot({
    path: out,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
    omitBackground: false,
  });
  await page.close();
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`[og] ✔ dist/og.png (${kb} KB)`);
}

await browser.close();
server.close();

// ============ 3. Favicons ============
console.log('[icons] Generating PWA icons via sharp');
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0A0A0F"/>
  <text x="50%" y="60%" font-family="Georgia, serif" font-size="288" font-style="italic" fill="#E8A87C" text-anchor="middle" dominant-baseline="middle">F</text>
</svg>`;
const iconBuf = Buffer.from(iconSvg);
for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  const out = path.join(distDir, name);
  await sharp(iconBuf, { density: 384 }).resize(size, size).png().toFile(out);
  console.log(`[icons] ✔ dist/${name}`);
}

// ============ 4. manifest.webmanifest ============
const manifest = {
  name: 'Fesin Chirakkal — Portfolio',
  short_name: 'Fesin',
  description: 'Lernender Informatiker, IMS Basel.',
  start_url: BASE ? `${BASE}/` : '/',
  scope: BASE ? `${BASE}/` : '/',
  display: 'standalone',
  background_color: '#0A0A0F',
  theme_color: '#0A0A0F',
  icons: [
    { src: `${BASE}/icon-192.png`.replace(/\/+/g, '/'), sizes: '192x192', type: 'image/png' },
    { src: `${BASE}/icon-512.png`.replace(/\/+/g, '/'), sizes: '512x512', type: 'image/png' },
  ],
};
writeFileSync(path.join(distDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('[manifest] ✔ dist/manifest.webmanifest');

console.log('[assets] All done.');
