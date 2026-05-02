# Custom Domain Setup — fesin.dev

Step-by-Step. Macht das Portfolio von `chirakkalcode.github.io/portfolio/` zu `https://fesin.dev/`.

---

## 1. Domain kaufen

**Empfehlung: `fesin.dev` über Cloudflare Registrar**

| Option | Preis | Warum |
|---|---|---|
| **fesin.dev @ Cloudflare** ✅ | ~12 USD/Jahr (at-cost, kein Markup) | Cloudflare verkauft .dev zum Selbstkostenpreis. Free DNS, free SSL, free DDoS, keine Lock-in. |
| fesin.dev @ Namecheap | ~17 USD/Jahr | Backup falls Cloudflare nicht geht. |
| fesin.ch @ Infomaniak | ~CHF 14/Jahr | Wenn .ch wichtiger als .dev. Aber: .dev signalisiert Developer. |

**Kosten klar:** ~12 USD/Jahr (~10 CHF/Jahr). Kein Folge-Abo.

**Schritt:**
1. Account auf https://dash.cloudflare.com erstellen
2. Domains → Register Domains → "fesin.dev" suchen → kaufen
3. Wenn `fesin.dev` weg ist: `fesin.ch` über Infomaniak ODER `chirakkal.dev` als Fallback

---

## 2. DNS-Records setzen

Cloudflare Dashboard → fesin.dev → DNS → Records → Add record

**Apex (`fesin.dev` → GitHub Pages):**

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| A | `@` | `185.199.108.153` | DNS only (graue Wolke!) | Auto |
| A | `@` | `185.199.109.153` | DNS only | Auto |
| A | `@` | `185.199.110.153` | DNS only | Auto |
| A | `@` | `185.199.111.153` | DNS only | Auto |
| AAAA | `@` | `2606:50c0:8000::153` | DNS only | Auto |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only | Auto |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only | Auto |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only | Auto |

**WWW Subdomain (`www.fesin.dev` → Apex):**

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `www` | `chirakkalcode.github.io` | DNS only | Auto |

⚠️ **Wichtig: Cloudflare-Proxy AUS** (graue Wolke statt orange). GitHub Pages SSL funktioniert nicht durch Cloudflare-Proxy.

DNS-Propagation prüfen:
```bash
dig fesin.dev +short          # → muss 185.199.x.x zeigen
dig www.fesin.dev +short      # → muss chirakkalcode.github.io zeigen
```

---

## 3. CNAME-Datei im Repo

✅ Schon erledigt — `public/CNAME` enthält:
```
fesin.dev
```

Diese Datei wird beim Build nach `dist/CNAME` kopiert. GitHub Pages liest sie und kennt damit die Custom Domain.

---

## 4. Astro-Config umstellen

Die App läuft aktuell unter `/portfolio`. Sobald die Domain steht, muss base auf `/` umgestellt werden.

**Option A — permanent umstellen (sobald Domain live):**

In `astro.config.mjs` ist schon eine Env-Variable vorbereitet:
```bash
SITE=apex npm run build
```
→ baut mit `site: 'https://fesin.dev'` und `base: '/'`.

**Option B — fix in der GitHub Action** (`.github/workflows/deploy.yml`):
```yaml
- name: Build site + assets
  env:
    SITE: apex
  run: npm run build
```

Dann commit + push, Action baut korrekt.

---

## 5. GitHub Pages Custom Domain aktivieren

GitHub → Repo `portfolio` → Settings → Pages:

1. Custom domain: `fesin.dev` eintragen → Save
2. GitHub macht DNS-Check (~1 Min). Grüner Haken = OK.
3. **HTTPS-Force** Checkbox aktivieren (erscheint nach ~10 Min wenn Cert ausgestellt).

Wenn DNS-Check fehlschlägt:
- Warten (DNS-Propagation kann 1h dauern, manchmal länger)
- Mit `dig` prüfen ob Records korrekt sind
- Cloudflare-Proxy WIRKLICH AUS (graue Wolke)

---

## 6. Verifizieren

Nach 5–30 Min:
```bash
curl -I https://fesin.dev/         # → HTTP/2 200
curl -I https://www.fesin.dev/     # → 301 redirect zu fesin.dev
curl -I https://fesin.dev/cv.pdf   # → application/pdf
```

LinkedIn-Share-Vorschau testen:
- https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Ffesin.dev%2F

---

## Troubleshooting

| Problem | Lösung |
|---|---|
| `NotServedByPagesError` | Custom Domain noch nicht in GitHub Pages eingetragen |
| `DNS_PROBE_FINISHED_NXDOMAIN` | DNS-Propagation noch nicht durch — warten oder `dig` checken |
| `ERR_SSL_PROTOCOL_ERROR` | HTTPS-Force zu früh aktiviert. Warten bis Cert da ist. |
| Cloudflare Error 521 | Proxy ist orange — auf grau (DNS only) stellen |
| Bilder/CSS 404 | `base` in `astro.config.mjs` nicht auf `/` umgestellt |
