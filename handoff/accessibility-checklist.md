# Accessibility Checklist

Current a11y status of the site. Marked with ✅ (done), ⏳ (in progress or draft), ❌ (pending).

---

## 1. Semantic structure

- ✅ `<!doctype html>` declared
- ✅ `<html lang="en">` declared (review if site goes multilingual)
- ✅ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used semantically
- ✅ Heading hierarchy: 1 × h1, h2 per section, h3 inside cases/works
- ⏳ The "connect" section has no `<h2>` (only an eyebrow + email). Add one for screen readers (see `headings-checklist.csv`)

## 2. Keyboard navigation

- ✅ All links and buttons are native (no `<div onclick>`)
- ✅ Skip link at the top (hidden until focused) — jumps straight to `<main>`
- ✅ `:focus-visible` applied to `.btn` and nav menu links
- ⏳ Verify tab order across all sections (manual QA: hit Tab repeatedly from the top)
- ⏳ Mobile hamburger menu: closes with Escape ✅, closes on outside click ✅, but still needs a pure-keyboard test (Tab + Enter)

## 3. ARIA and attributes

- ✅ `<nav aria-label="Primary">`
- ✅ `<a class="brand" aria-label="SJ Design Studio — home">`
- ✅ `.nav__toggle` has `aria-expanded`, `aria-controls`, and `<span class="sr-only">Menu</span>`
- ✅ `.connect__send` has `aria-label="Send email to kevin@sjdesignstudio.com"`
- ✅ Decorative images use `aria-hidden="true"` on the wrapper or `alt=""` on the `<img>`
- ⏳ `<canvas id="hero-3d">` — wrapper has `aria-hidden="true"`, but the canvas itself might receive keyboard focus (Spline behavior?). Test: Tab to the canvas and check that focus doesn't get trapped.

## 4. Alternative text

- ⏳ Every image currently has `alt=""`. The **copywriting team must fill in** alt texts per `image-alt-text.csv`.
- ✅ Purely decorative images (paper-plane icon, AI+Human diagram) stay with `alt=""` + `aria-hidden`.

## 5. Color contrast

- ⏳ Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) on these pairs:
  - `--ink-on-dark` (#fff) on `--bg-dark` (#0d0d0b) → ~20:1 ✅ (AAA)
  - `--ink-on-dark-muted` (#b2b0aa) on `--bg-dark` → ~11:1 ✅ (AAA)
  - `--ink-on-dark-faint` (#c2bfb8) on `--bg-dark` → ~13:1 ✅ (AAA)
  - `--gold` (#e7d6a6) on `--bg-dark` → ~13:1 ✅ (AAA)
  - `--ink-on-light` (#0d0d0b) on `--bg-light` (#f4f4f4) → ~17:1 ✅ (AAA)
  - `--ink-on-light-muted` (#75736f) on `--bg-light` → ~5:1 ✅ (AA, fails AAA)
  - `--gold-deep` (#9c7f41) on `--bg-light` → ~4:1 ⚠️ Fails AAA, passes AA large-text only
- ⚠️ The **stat captions** ("hours recovered weekly", italic) use `--gold-deep` on the light background. At 24px (h3-ish) they qualify as "large text" per WCAG and pass AA. If the size shrinks on mobile, they may fail.
- ⏳ Verify the captions on real mobile devices inside case cards.

## 6. Motion and animation

- ✅ All animations respect `@media (prefers-reduced-motion: reduce)`:
  - Eyebrow hairline grow → `transform: none`
  - Pill dots breathe + light-up → `animation: none`
  - Pill hover translateY → `transform: none`
  - Case dot hover scale → covered by the global reduced-motion reset
- ✅ Global reset at the bottom of the CSS zeroes every transition and animation to `0.01ms` for users who prefer reduced motion
- ✅ HTML smooth scroll → `auto` on mobile (≤720px)

## 7. Forms and inputs

- ❌ The contact form was removed (it wasn't in the Figma design). When the team adds it back:
  - Every `<input>` needs an associated `<label for="...">`
  - Error messages should use `aria-describedby` pointing to the error element
  - Required fields use `required` + `aria-required="true"` (redundant but safe)
  - Use appropriate `autocomplete` on each field (`name`, `email`, `organization`)

## 8. Focus

- ✅ `:focus-visible` on `.btn`, `.nav__menu a`, `.brand`, `.connect__email`, `.connect__send` (verify all have it — see styles.css)
- ⏳ Custom outlines need sufficient contrast (`outline: 2px solid var(--gold)`)
- ✅ Skip link surfaces visually when keyboard-focused

## 9. Screen-reader landmarks

- ✅ `<main>` wraps the primary content
- ✅ `<nav aria-label="Primary">` identifies the navigation
- ✅ `<footer>` identifies the footer
- ⏳ Consider adding `aria-labelledby` on each `<section>` pointing to that section's h2 (optional; aids landmark navigation)

## 10. Manual tests before deploy

- [ ] Tab through the entire page, top to bottom, and verify:
  - [ ] Focus is visible on every interactive element
  - [ ] Tab order is logical (top → bottom, left → right)
  - [ ] No "ghost" elements (visible but unfocusable, or focusable but invisible)
- [ ] Test with VoiceOver (Mac) or NVDA (Windows): the page hierarchy should be understandable by audio alone
- [ ] Test with `Cmd+`/`Cmd-` (zoom up to 200%) — layout should not break
- [ ] Run Lighthouse → Accessibility tab (target: 95+)
- [ ] Run `axe DevTools` extension and clear all critical/serious issues

## 11. Performance / accessibility intersections

- ⏳ The Spline 3D scene in the hero is heavy (WebGL + retina rendering) — verify with DevTools → Performance that it doesn't block interaction during first paint
- ⏳ Preload critical fonts (Inter 300) with `<link rel="preload">` if hero LCP is sluggish
