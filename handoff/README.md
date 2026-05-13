# Pitch Site — Handoff to Team

This folder contains everything the team needs to finalize SEO, accessibility, and content before the production deploy.

## Files

| File | For | Contents |
|---|---|---|
| `seo-checklist.csv` | SEO / Marketing | Meta tags, titles, descriptions, structured data — fields to review and fill in |
| `headings-checklist.csv` | SEO / Copywriting | Every H1/H2/H3 on the page with suggested final text and SEO notes |
| `image-alt-text.csv` | SEO / Copywriting | Inventory of every image with suggested alt text — team should review and refine |
| `social-media-assets.md` | Designer | Exact dimensions for OG image, favicons, social previews — with a copy-paste brief block |
| `accessibility-checklist.md` | Dev / QA | What's already implemented for a11y and what's still pending |
| `staging-checklist.md` | DevOps / QA | What to verify before publishing to staging/prod |

## How to fill the CSVs

Open them in Excel, Google Sheets, Numbers, or any spreadsheet editor. Fields marked `[REVIEW]` need team input; fields marked `[DRAFT]` have a proposed value that can be approved or changed.

Once reviewed:
1. Update the **Status** column to `APPROVED`
2. Apply the final values to `index.html` (for meta tags) and the `alt` attributes (for images)

## Current state of the site

- ✅ Semantic HTML5 (header, main, section, footer)
- ✅ Mobile responsive (clamp + breakpoints at 640/720/900px)
- ✅ Skip link at top (hidden until focused)
- ✅ ARIA labels on nav, brand, and menu toggle button
- ✅ Reduced motion respected in every animation
- ⏳ Alt texts (placeholders now — team to review)
- ⏳ SEO meta tags (current draft — team to approve)
- ⏳ Open Graph image (needs a 1200×630 image from the designer)
- ⏳ Favicon + Apple touch icon (not yet created)
- ❌ Contact form backend (form was removed — team to wire up when added back)
- ❌ Analytics (GA, Plausible, etc — not configured, team to set up)
