// Always start at top on initial load — ignore any URL hash from a previous click.
(() => {
   if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
   if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
   }
   window.scrollTo(0, 0);
})();

// Eyebrow hairlines: grow from 0 → full width when each label scrolls into view.
(() => {
   if (!('IntersectionObserver' in window)) {
      // Fallback: just show all lines as fully grown
      document.querySelectorAll('.eyebrow').forEach((eb) => eb.classList.add('is-visible'));
      return;
   }

   const eyebrows = document.querySelectorAll('.eyebrow');
   const io = new IntersectionObserver(
      (entries) => {
         for (const entry of entries) {
            if (entry.isIntersecting) {
               entry.target.classList.add('is-visible');
               io.unobserve(entry.target);
            }
         }
      },
      // Trigger slightly before the eyebrow is fully on screen
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
   );

   for (const eb of eyebrows) io.observe(eb);
})();

// Blueprint pill dots: light up sequentially when the section reaches mid-viewport.
(() => {
   const blueprint = document.querySelector('.blueprint');
   if (!blueprint || !('IntersectionObserver' in window)) return;

   const io = new IntersectionObserver(
      (entries) => {
         for (const entry of entries) {
            if (entry.isIntersecting) {
               entry.target.classList.add('is-lit');
               io.unobserve(entry.target);
            }
         }
      },
      // Trigger when the section's center crosses the viewport's center band
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
   );
   io.observe(blueprint);
})();

// Mobile nav toggle + active-item sync (click + scroll-spy).
(() => {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (!menu) return;

  const links = Array.from(menu.querySelectorAll('a[href^="#"]'));

  // -- Mobile open/close --
  const setOpen = (open) => {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };
  if (toggle) {
    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
    // Close when tapping/clicking outside the menu and toggle
    document.addEventListener('click', (e) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
  }

  // -- Active state --
  const setActive = (href) => {
    for (const a of links) {
      a.classList.toggle('is-active', a.getAttribute('href') === href);
    }
  };

  // While the page is smooth-scrolling to a clicked destination, the scroll-spy
  // would otherwise briefly flag whichever section it passes through. Suppress
  // updates for ~1s after a click.
  let navLockUntil = 0;

  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    setActive(a.getAttribute('href'));
    setOpen(false);
    navLockUntil = Date.now() + 1000;
  });

  // -- Scroll-spy: keep active in sync with whichever section dominates the viewport --
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const visibility = new Map();

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibility.set(entry.target.id, entry.intersectionRatio);
      }
      if (Date.now() < navLockUntil) return; // user clicked recently — let smooth-scroll finish
      let bestId = null;
      let bestRatio = 0;
      for (const [id, ratio] of visibility) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      }
      if (bestId && bestRatio > 0) setActive('#' + bestId);
    }, {
      // Account for fixed nav at top; consider the middle band of viewport
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    for (const s of sections) io.observe(s);
  }
})();
