# Pitch Site — SJ Design Studio

Vanilla HTML/CSS/JS, single page, mobile-first responsive. No framework, no build step.

## Structure

```
index.html    ← semantic markup
styles.css    ← design tokens (CSS variables) + styles
script.js     ← nav toggle, scroll-spy, intersection observers
assets/       ← images, logo, icons
handoff/      ← SEO, a11y, and content checklists for the team
```

## Running locally

Just open `index.html` in a browser. For a local server (recommended to test fonts and module imports):

```
npx serve .
# or
python -m http.server 8000
```

## Fonts

All loaded via Google Fonts in `<head>`:

- **Inter** — display + body + buttons
- **JetBrains Mono** — eyebrows, labels, section markers
- **Roboto Serif** — body lede paragraphs
- **Newsreader** — stat captions (italic)
- **Just Me Again Down Here** — handwritten annotations
