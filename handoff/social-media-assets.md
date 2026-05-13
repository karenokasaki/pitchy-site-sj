# Social Media & OG Image Specs

Exact dimensions to request from the designer. These assets are **required** for the site to render correctly when shared on social media, messaging apps, or indexed by search engines.

---

## Open Graph image (Facebook, LinkedIn, WhatsApp, iMessage, Slack, Discord, Google Search)

| Parameter | Value |
|---|---|
| **Recommended dimensions** | **1200 × 630 px** |
| Aspect ratio | 1.91 : 1 |
| Minimum accepted | 600 × 315 px |
| Format | PNG (preferred for designs with text/logo) or JPG (for photography) |
| Max file size | ≤ 1 MB ideal, max 8 MB |
| Color space | sRGB |
| Resolution | 72 DPI (web standard) |
| **Suggested filename** | `og-image.png` (in `/assets/`) |

**Designer notes:**
- Text should be centered and legible at small thumbnail sizes (LinkedIn mobile renders at ~400px wide)
- Keep at least **60px of padding** from the edges (some platforms crop)
- The SJ logo can be included but shouldn't sit flush against the edges
- Colors should match the site (`#0d0d0b` dark background, `#e7d6a6` gold accent)
- **Avoid placing text near the bottom-right corner** (Facebook overlays a "Share" button there)

---

## Twitter / X image

| Parameter | Value |
|---|---|
| **Recommended dimensions** | **1200 × 675 px** (16:9) |
| Alternative | Can reuse the OG 1200×630 (Twitter crops it slightly) |
| Minimum | 300 × 157 px |
| Format | PNG, JPG, WebP |
| Max file size | ≤ 5 MB |
| **Suggested filename** | `twitter-image.png` (in `/assets/`) — optional if reusing OG |

**Notes:**
- The Twitter Card is configured as `summary_large_image` in `index.html`
- If reusing OG 1200×630, it renders cleanly — Twitter adjusts

---

## LinkedIn

LinkedIn uses the Open Graph image automatically. **No additional asset required** as long as the OG image follows the specs above.

LinkedIn crops to approximately 1.91:1, so 1200×630 renders perfectly.

---

## WhatsApp / iMessage / Slack / Discord

All use the Open Graph image. **No additional asset required**.

WhatsApp requires a **minimum of 300×200** to display any preview. 1200×630 covers it.

---

## Pinterest (optional — only if relevant)

| Parameter | Value |
|---|---|
| Recommended dimensions | 1000 × 1500 px (2:3 vertical) |
| Format | PNG, JPG |
| Max file size | ≤ 20 MB |
| **Suggested filename** | `pinterest-image.png` |

Pinterest also falls back to the OG image, but a dedicated vertical version performs better there. **Non-essential** unless Pinterest is a strategic channel.

---

## Favicon (browser tab, bookmarks)

| Size | Filename | Where it lives |
|---|---|---|
| **16×16 + 32×32 + 48×48** (multi-resolution ICO) | `favicon.ico` | Root `/` |
| **32×32** PNG | `favicon-32.png` | `/assets/` |
| **180×180** PNG (Apple Touch Icon) | `apple-touch-icon.png` | `/assets/` |

**Notes:**
- The `favicon.ico` is a multi-resolution file. Use [realfavicongenerator.net](https://realfavicongenerator.net) or similar to generate it
- The existing SJ logo (`assets/sj-logo.png`) works as the base — just resize to the targets above
- The Apple Touch Icon should have a solid background (`#0d0d0b`); iOS does not respect transparency

---

## PWA / Manifest (optional, low-priority)

Only needed if you want the site to be "installable" as an app on mobile.

| Size | Filename |
|---|---|
| 192×192 | `pwa-192.png` |
| 512×512 | `pwa-512.png` |

If you want to enable this, let the dev know — they'll create the `manifest.webmanifest` and link it in `<head>`.

---

## Summary: deliverables list for the designer

Copy-paste this block into the brief:

```
We need the following assets for the site (all PNG, sRGB, 72 DPI):

REQUIRED:
1. og-image.png        → 1200 × 630 px (Facebook/LinkedIn/WhatsApp share preview)
2. favicon.ico         → multi-resolution ICO (16, 32, 48 px)
3. favicon-32.png      → 32 × 32 px
4. apple-touch-icon.png → 180 × 180 px (solid background #0d0d0b)

OPTIONAL / FUTURE:
5. twitter-image.png   → 1200 × 675 px (dedicated version; otherwise reuse #1)
6. pinterest-image.png → 1000 × 1500 px (only if Pinterest is a channel)
7. pwa-192.png         → 192 × 192 px (only for installable app)
8. pwa-512.png         → 512 × 512 px (only for installable app)

Design notes:
- Colors: background #0d0d0b (dark) + accent #e7d6a6 (gold)
- Text centered, min 60px padding from edges (OG)
- SJ logo can appear but shouldn't sit flush against the edges
- Apple Touch Icon: solid background (no transparency)
```
