/**
 * Build-Step: rendert /cv-print/ aus dem fertigen `dist/` zu cv.pdf.
 * Läuft NACH `astro build` und schreibt das PDF nach dist/cv.pdf, sodass
 * es beim Pages-Deploy mit ausgeliefert wird.
 */
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, statSync } from 'node:fs';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const PORT = 4322;
const BASE = '/portfolio';
const PRINT_PATH = `${BASE}/cv-print/`;
const OUT_PDF = path.join(distDir, 'cv.pdf');

if (!existsSync(distDir)) {
  console.error(`dist/ fehlt — bitte zuerst "astro build" laufen lassen.`);
  process.exit(1);
}

console.log('[pdf] Spawning static server on dist/');
const serve = sirv(distDir, { etag: true, dev: false, single: false });
const server = http.createServer((req, res) => {
  // Astro builds mit base "/portfolio" — sirv serviert ab /, also strip prefix
  if (req.url && req.url.startsWith(BASE)) {
    req.url = req.url.slice(BASE.length) || '/';
  }
  serve(req, res);
});
await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`[pdf] Serving on http://localhost:${PORT}${BASE}/`);

console.log('[pdf] Launching headless Chromium');
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();

// Fonts brauchen sauberes Print-Media-Emulieren + Wartezeit
await page.emulateMediaType('print');

const url = `http://localhost:${PORT}${PRINT_PATH}`;
console.log(`[pdf] Navigating to ${url}`);
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });

// Sicherstellen dass alle Web-Fonts geladen sind bevor PDF gerendert wird
await page.evaluate(async () => {
  // @ts-ignore
  await document.fonts.ready;
});

console.log('[pdf] Rendering A4 PDF');
await page.pdf({
  path: OUT_PDF,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
});

await browser.close();
server.close();

const sizeKb = Math.round(statSync(OUT_PDF).size / 1024);
console.log(`[pdf] ✔ Geschrieben: dist/cv.pdf (${sizeKb} KB)`);
if (sizeKb > 500) {
  console.warn(`[pdf] ⚠ PDF >500KB — prüfen ob Fonts/Images zu gross sind`);
}
