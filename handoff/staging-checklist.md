# Staging → Production Checklist

Things to verify/configure before going live.

## Pre-staging (dev)

- [ ] Swap `<meta name="robots" content="index, follow">` for `noindex, nofollow` while in staging
- [ ] Verify `<link rel="canonical">` temporarily points at the staging URL
- [ ] Confirm `.env` was NOT committed (already in `.gitignore`)
- [ ] Figma token from `.env` has been revoked (`Figma → Settings → Security`)

## Pre-prod (handoff)

- [ ] Every field in `seo-checklist.csv` is set to `APPROVED`
- [ ] Every alt text in `image-alt-text.csv` has been reviewed and applied in `index.html`
- [ ] Heading texts in `headings-checklist.csv` are approved
- [ ] `og-image.png` (1200×630) is created and lives in `/assets/`
- [ ] Favicon files created (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`) and placed in `/assets/` or `/`
- [ ] Switch robots back to `index, follow` in prod
- [ ] Switch canonical to the prod URL

## Performance / loading

- [ ] Hero LCP < 2.5s — test in [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Work case images are optimized (each PNG is currently 600KB–3MB — recommend running `imagemin` or converting to WebP)
- [ ] Spline 3D scene either preloads cleanly or has a graceful fallback

## Forms / backend

- [ ] Contact form: team wires up the endpoint (Formspree, Netlify Forms, or in-house backend)
- [ ] Production contact email: `kevin@sjdesignstudio.com` (confirm with Kevin)

## Analytics / tracking

- [ ] Choose and install analytics (GA4, Plausible, Fathom, etc.) — not currently configured
- [ ] Cookie banner if using cookie-based analytics (LGPD/GDPR)
- [ ] Tracked events:
  - [ ] Click on the "See how we clone excellence" button (hero CTA)
  - [ ] Click on the "Request Your 10× Audit" button (blueprint CTA)
  - [ ] Click on the email in the connect section

## Final accessibility pass

Run before the prod deploy:

- [ ] Lighthouse Accessibility ≥ 95
- [ ] axe DevTools — 0 critical/serious issues
- [ ] Full keyboard navigation works end-to-end
- [ ] VoiceOver / NVDA tests pass
- [ ] Contrast checker run on every color/background pair
- [ ] Reduced motion: compare with and without `prefers-reduced-motion: reduce` toggled

## Hosting / DNS

- [ ] Domain configured and SSL active
- [ ] Redirect `www` → root (or vice versa)
- [ ] HTTPS enforced
- [ ] HSTS header (caching)
- [ ] Compression (gzip/brotli) enabled at the host
- [ ] Cache headers configured for `/assets/*` (long max-age)

## Mobile

- [ ] Tested on real iPhone (Safari iOS) and Android (Chrome) — not just DevTools
- [ ] Spline scene disabled on mobile (already configured via `matchMedia(min-width: 900px)`)
- [ ] Touch interactions work (nav burger, pill hover — note hover does not fire on touch, by design)
