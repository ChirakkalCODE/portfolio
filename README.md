# Portfolio — Fesin Chirakkal

**Live:** https://chirakkalcode.github.io/portfolio/
**PDF:** https://chirakkalcode.github.io/portfolio/cv.pdf

Single-Source-of-Truth Portfolio: Webseite + Lebenslauf-PDF werden aus
derselben TypeScript-Datei (`src/data/cv.ts`) generiert.

## Stack

- **Astro 5** — statisches Output, TypeScript-Daten nativ
- **Puppeteer** — rendert die Print-Page zu A4-PDF
- **GitHub Actions** — baut HTML + PDF, deployt nach Pages
- **Fonts:** Fraunces (Display), Geist (Body), JetBrains Mono (Mono)

## Lokal arbeiten

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:4321/portfolio/
npm run build    # → dist/ inkl. cv.pdf
npm run preview  # statisches Output prüfen
```

## Inhalte ändern

**Alle Texte** liegen in [`src/data/cv.ts`](src/data/cv.ts).
Eine Änderung dort landet beim nächsten Build sowohl auf der Webseite
als auch im PDF.

## Deployment

Push auf `main` → GitHub Action baut Site + PDF → Pages.
Erstmaliges Setup: Pages-Source auf "GitHub Actions" stellen.
