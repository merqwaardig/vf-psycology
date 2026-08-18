/* =============================================================================
   VF PSYCHOLOGY — main.js
   -----------------------------------------------------------------------------
   Loaded with `defer`, so it never blocks rendering.

   Five small behaviours, one named function each:
     1. markJsAvailable()  — adds .js to <html> so CSS can arm JS-only effects
     2. initNavToggle()    — mobile menu open/close
     3. initStickyHeader() — shadow on the header once the page scrolls
     4. initAccordion()    — FAQ open/close, one panel at a time
     5. initFormValidation() — inline, accessible validation on the contact form
     6. initReveal()       — fade/rise sections into view

   Everything is feature-detected and every function exits quietly if the
   markup it needs isn't on the current page. Nothing here is required for
   the site to work: with JS off, the nav links are still reachable, the FAQ
   panels are open, and the form falls back to native browser validation.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     1. markJsAvailable
     The reveal-on-scroll CSS only arms itself under `.js`. Without this class
     the content is visible by default, which is the correct no-JS fallback.
     -------------------------------------------------------------------------- */
  function markJsAvailable() {
    document.documentElement.classList.add('js');
  }

  /* ---------------------------------------------------------------------------
     2. initNavToggle
     Toggles the mobile nav panel. Closes on Escape and when a link is used,
     and returns focus to the button so keyboard users don't get stranded.
     -------------------------------------------------------------------------- */
  function initNavToggle() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.querySelector('[data-nav-panel]');

    if (!toggle || !panel) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      panel.classList.toggle('is-open', isOpen);
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      toggle.focus();
    });

    // The panel is a mobile-only affordance. If the viewport grows past the
    // desktop breakpoint while it's open, drop the state so it doesn't
    // linger as an invisible open panel.
    if (typeof window.matchMedia === 'function') {
      var desktop = window.matchMedia('(min-width: 900px)');
      var onChange = function (event) {
        if (event.matches) setOpen(false);
      };
      // addEventListener on MediaQueryList is unsupported in older Safari.
      if (typeof desktop.addEventListener === 'function') {
        desktop.addEventListener('change', onChange);
      } else if (typeof desktop.addListener === 'function') {
        desktop.addListener(onChange);
      }
    }
  }

  /* ---------------------------------------------------------------------------
     3. initStickyHeader
     Adds .is-stuck once the page has scrolled, which draws the header's
     bottom border and shadow. Uses an IntersectionObserver on a sentinel
     element rather than a scroll listener, so there's no per-frame work.
     -------------------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    // Fallback for browsers without IntersectionObserver: a throttled
    // scroll check. Rare enough that the cost doesn't matter.
    if (!('IntersectionObserver' in window)) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          header.classList.toggle('is-stuck', window.scrollY > 8);
          ticking = false;
        });
      }, { passive: true });
      return;
    }

    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    document.body.prepend(sentinel);

    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------------------------------------------------------------------------
     4. initAccordion
     FAQ. Panels ship in the HTML without [hidden] so they're readable when
     JS is off; this function closes them on load and wires the triggers.
     Opening one closes the others — six questions is enough to scan.
     -------------------------------------------------------------------------- */
  function initAccordion() {
    var accordions = document.querySelectorAll('[data-accordion]');
    if (!accordions.length) return;

    Array.prototype.forEach.call(accordions, function (accordion) {
      var triggers = accordion.querySelectorAll('[data-accordion-trigger]');

      Array.prototype.forEach.call(triggers, function (trigger) {
        var panel = document.getElementById(
          trigger.getAttribute('aria-controls')
        );
        if (!panel) return;

        // Collapse everything now that we know JS is running.
        trigger.setAttribute('aria-expanded', 'false');
        panel.hidden = true;

        trigger.addEventListener('click', function () {
          var willOpen = trigger.getAttribute('aria-expanded') !== 'true';

          Array.prototype.forEach.call(triggers, function (other) {
            var otherPanel = document.getElementById(
              other.getAttribute('aria-controls')
            );
            if (!otherPanel) return;
            other.setAttribute('aria-expanded', 'false');
            otherPanel.hidden = true;
          });

          trigger.setAttribute('aria-expanded', String(willOpen));
          panel.hidden = !willOpen;
        });
      });
    });
  }

  /* ---------------------------------------------------------------------------
     5. initFormValidation
     Progressive enhancement over native validation: same rules, friendlier
     messages, announced in place via aria-describedby + aria-invalid.
     Focus moves to the first invalid field so nobody has to hunt for it.
     -------------------------------------------------------------------------- */
  function initFormValidation() {
    var form = document.querySelector('[data-validate]');
    if (!form) return;

    // Take over from the browser's own bubbles, which we can't style
    // or place next to the field.
    form.setAttribute('novalidate', 'novalidate');

    var messages = {
      valueMissing: 'This field is required.',
      typeMismatch: 'Please check this address — it looks incomplete.',
      tooShort: 'Please add a little more detail.'
    };

    function messageFor(field) {
      var v = field.validity;
      if (v.valueMissing) {
        return field.type === 'checkbox'
          ? 'Please tick this box to continue.'
          : messages.valueMissing;
      }
      if (v.typeMismatch) return messages.typeMismatch;
      if (v.tooShort) return messages.tooShort;
      return field.validationMessage || 'Please check this field.';
    }

    function errorNodeFor(field) {
      var id = field.getAttribute('aria-describedby');
      return id ? document.getElementById(id.split(' ').pop()) : null;
    }

    function validateField(field) {
      var errorNode = errorNodeFor(field);
      var isValid = field.checkValidity();

      field.setAttribute('aria-invalid', String(!isValid));
      if (errorNode) errorNode.textContent = isValid ? '' : messageFor(field);

      return isValid;
    }

    var fields = form.querySelectorAll('input, textarea, select');

    Array.prototype.forEach.call(fields, function (field) {
      // Validate on blur, then live-correct once the field has been touched.
      field.addEventListener('blur', function () {
        validateField(field);
      });

      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      var firstInvalid = null;

      Array.prototype.forEach.call(fields, function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        event.preventDefault();
        firstInvalid.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     6. initReveal
     Fades and lifts elements marked .reveal as they enter the viewport.
     Skipped entirely when the visitor prefers reduced motion, and skipped
     when IntersectionObserver is missing — in both cases .reveal elements
     are already visible, because the CSS only hides them under `.js`.
     -------------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    var prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    Array.prototype.forEach.call(targets, function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------------
     Boot
     -------------------------------------------------------------------------- */
  markJsAvailable();
  initNavToggle();
  initStickyHeader();
  initAccordion();
  initFormValidation();
  initReveal();
})();
