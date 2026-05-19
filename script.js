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

// Hero parallax balls (mobile/tablet only). Each ball translates on both
// axes proportional to how far the user has scrolled past the top of the
// hero — data-speed-x / data-speed-y (px) set the max displacement at full
// hero scroll. Positive = right / down, negative = left / up.
(() => {
   const hero = document.querySelector('.hero');
   const balls = document.querySelectorAll('.hero__ball');
   if (!hero || !balls.length) return;
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   if (window.matchMedia('(min-width: 900px)').matches) return;

   let ticking = false;
   const update = () => {
      const rect = hero.getBoundingClientRect();
      // 0 when hero top is at viewport top, 1 once we've scrolled a full
      // hero-height past it. Clamp so balls don't keep drifting offscreen.
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      balls.forEach((ball) => {
         const sx = parseFloat(ball.dataset.speedX) || 0;
         const sy = parseFloat(ball.dataset.speedY) || 0;
         ball.style.transform =
            `translate3d(${progress * sx}px, ${progress * sy}px, 0)`;
      });
      ticking = false;
   };

   window.addEventListener(
      'scroll',
      () => {
         if (ticking) return;
         requestAnimationFrame(update);
         ticking = true;
      },
      { passive: true },
   );
   update();
})();

// FAQ accordion: single-open, ARIA pattern (button + aria-expanded).
// Height is animated explicitly via Web Animations API (open: 0 →
// scrollHeight, close: scrollHeight → 0) so the transition is reliable in
// both directions every time. Class .is-expanded is toggled at the right
// moment so the post-animation static height comes from CSS, not inline.
(() => {
   const items = Array.from(document.querySelectorAll('.faq__item'));
   if (!items.length) return;

   const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
   ).matches;
   const DURATION = reducedMotion ? 0 : 320;
   const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

   const setBtn = (item, expanded) => {
      const btn = item.querySelector('.faq__q');
      if (btn) btn.setAttribute('aria-expanded', String(expanded));
   };

   const open = (item) => {
      const a = item.querySelector('.faq__a');
      if (!a) return;
      // Add the class first so CSS-controlled height becomes "auto" — then
      // measure scrollHeight and animate from 0 up to it. WAAPI overrides
      // height inline only during the animation; after onfinish the
      // element's height reverts to CSS (auto / natural).
      item.classList.add('is-expanded');
      setBtn(item, true);
      if (DURATION === 0) return;
      const target = a.scrollHeight;
      if (item._anim) item._anim.cancel();
      item._anim = a.animate(
         [{ height: '0px' }, { height: target + 'px' }],
         { duration: DURATION, easing: EASING },
      );
      item._anim.onfinish = () => {
         item._anim = null;
      };
   };

   const close = (item) => {
      const a = item.querySelector('.faq__a');
      if (!a) return;
      setBtn(item, false);
      if (DURATION === 0) {
         item.classList.remove('is-expanded');
         return;
      }
      // Measure current natural height before stripping .is-expanded — once
      // we remove the class, CSS forces height: 0 and scrollHeight collapses.
      const start = a.scrollHeight;
      if (item._anim) item._anim.cancel();
      item._anim = a.animate(
         [{ height: start + 'px' }, { height: '0px' }],
         { duration: DURATION, easing: EASING },
      );
      item._anim.onfinish = () => {
         item.classList.remove('is-expanded');
         item._anim = null;
      };
   };

   items.forEach((item) => {
      const btn = item.querySelector('.faq__q');
      if (!btn) return;
      btn.addEventListener('click', () => {
         const isOpen = item.classList.contains('is-expanded');
         if (isOpen) {
            close(item);
            return;
         }
         // Accordion: close every other open item before opening this one
         items.forEach((other) => {
            if (other !== item && other.classList.contains('is-expanded')) {
               close(other);
            }
         });
         open(item);
      });
   });
})();

// Mobile nav toggle + active-item sync (click + scroll-spy) + desktop
// sliding pill (the white indicator that follows the hovered/active link).
(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  const pill = document.querySelector('.nav__pill');
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

  // -- Sliding pill (desktop only — hidden via CSS on mobile) --
  const getActiveLink = () =>
    menu.querySelector('a.is-active') || links[0];

  const movePillTo = (link) => {
    if (!pill || !nav || !link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    pill.style.width = linkRect.width + 'px';
    pill.style.height = linkRect.height + 'px';
    pill.style.transform =
      `translate(${linkRect.left - navRect.left}px, ${linkRect.top - navRect.top}px)`;
    for (const a of links) a.classList.toggle('is-covered', a === link);
  };

  const syncPill = () => movePillTo(getActiveLink());

  if (pill) {
    // Initial position — wait for fonts/layout to settle before reading rects.
    const init = () => {
      syncPill();
      pill.classList.add('is-ready');
    };
    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init);

    // Slide to whichever link is being hovered, snap back to active on leave.
    for (const link of links) {
      link.addEventListener('mouseenter', () => movePillTo(link));
      link.addEventListener('focus', () => movePillTo(link));
    }
    menu.addEventListener('mouseleave', syncPill);
    window.addEventListener('resize', syncPill);
  }

  // -- Active state --
  const setActive = (href) => {
    for (const a of links) {
      a.classList.toggle('is-active', a.getAttribute('href') === href);
    }
    syncPill();
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

// Contact form: submit via fetch to Web3Forms, show toast on success/failure.
(() => {
   const form = document.getElementById('contact-form');
   if (!form) return;

   const ICONS = {
      success:
         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
      error:
         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
   };

   let toastEl = null;
   let toastIconEl = null;
   let toastTextEl = null;
   let toastTimer = null;
   const showToast = (message, type) => {
      if (!toastEl) {
         toastEl = document.createElement('div');
         toastEl.className = 'toast';
         toastEl.setAttribute('role', 'status');
         toastEl.setAttribute('aria-live', 'polite');
         toastIconEl = document.createElement('span');
         toastIconEl.className = 'toast__icon';
         toastTextEl = document.createElement('span');
         toastTextEl.className = 'toast__text';
         toastEl.append(toastIconEl, toastTextEl);
         toastEl.addEventListener('click', () => toastEl.classList.remove('is-visible'));
         document.body.appendChild(toastEl);
      }
      const variant = type === 'success' ? 'success' : 'error';
      toastTextEl.textContent = message;
      toastIconEl.innerHTML = ICONS[variant];
      toastEl.classList.remove('toast--success', 'toast--error');
      toastEl.classList.add('toast--' + variant);
      // Force reflow so the transition runs even when toast was already visible
      void toastEl.offsetWidth;
      toastEl.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 5000);
   };

   const submitBtn = form.querySelector('button[type="submit"]');
   form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      try {
         const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(form),
         });
         const data = await res.json().catch(() => ({}));
         if (res.ok && data.success) {
            showToast('Message sent — we’ll be in touch shortly.', 'success');
            form.reset();
            if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
               window.hcaptcha.reset();
            }
         } else {
            showToast(data.message || 'Could not send. Please try again.', 'error');
         }
      } catch {
         showToast('Network error. Please try again.', 'error');
      } finally {
         if (submitBtn) submitBtn.disabled = false;
      }
   });
})();
