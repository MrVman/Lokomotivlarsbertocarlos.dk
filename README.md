# Lokomotiv Larsbertocarlos

Statisk hjemmeside til [lokomotivlarsbertocarlos.dk](https://lokomotivlarsbertocarlos.dk) — klar til **Cloudflare Pages** (gratis). Ren HTML, CSS og lidt JavaScript. Ingen React, ingen build-step.

Klubben: amatørfodbold i DAI Region Hovedstaden, Valby Idrætspark, stiftet 9. december 2016. Instagram: [@larsbertocarlos](https://www.instagram.com/larsbertocarlos/).

## Indhold

- Forside med Instagram-gitter (placeholder indtil widget sættes)
- Om klubben + Hall of Fame + historiske trøjer
- Hold (kun navne offentligt)
- Kampe / resultater / stilling (DAI iframe-plads)
- Kalender (Google Calendar-plads)
- Galleri, sponsorer, bliv medlem, shop-struktur
- Privatliv + cookies
- Lukket medlemsportal: numre/licenser, dokumenter, Holdsport, opslagstavle, bøder

**Vedligehold:** ret `js/config.js` og `js/data.js`. Gem. Deploy.

## Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Connect to Git**
2. Vælg dette repository
3. Production branch: `main`
4. Framework preset: **None**
5. Build command: *(tom)*
6. Build output directory: `/`
7. **Save and Deploy**
8. Custom domains → `lokomotivlarsbertocarlos.dk` og `www`

## Konfiguration

| Fil | Hvad |
|---|---|
| `js/config.js` | Mail, Instagram, Calendar-ID, DAI, Holdsport, medlemskode |
| `js/data.js` | Spillere, kampe, events, galleri, bøder |
| `assets/` | Logo og egne billeder |

Standard medlemskode: `llc2016` — **skift den** før siden er offentlig.

## Lokal forhåndsvisning

```bash
python3 -m http.server 8080
```

Åbn http://localhost:8080
