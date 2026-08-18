# VF Psychology — website (v2: live-site copy)

Static site. Semantic HTML5, one CSS file, one small JS file. No framework, no
build step, no package manager, no dependencies. Open `index.html` in a browser
and it runs.

**This folder (`HTML-v2`) is a copy of the original build (`HTML/`) with all
copy replaced by the text of the current live site, www.vf-psychology.nl.**
Design, structure, CSS and JS are unchanged. What changed:

- All texts now come from the live Squarespace site (home, about, methodology,
  services, FAQs, testimonials, book-an-appointment).
- Real details filled in: name (Valeria Verhaar Flores, MSc), SPS-NIP no.
  245010, SKJ no. 160029073, founded February 2020, e-mail
  vf.psychology@gmail.com, phone 06-38136116, social links.
- Booking: the Calendly widget from the live site is embedded on
  `contact.html#book` (free 30-minute intake). No published rates — fees are
  discussed during the intake, exactly as on the live site.
- New page `testimonials.html` with all 14 testimonials (EN + ES); three of
  them also appear on the homepage. Added to nav, footer and sitemap.
- Still to fill in: KvK and VAT number, city, the privacy statement's
  processors, and the form endpoint. The logo will be delivered separately.

```
index.html          Home — hero, recognition, mission & approach, how I can
                    help, about preview, therapeutic process, testimonials,
                    FAQ (13 questions), CTA, footer
about.html          About, credentials, VF-Psychology, experience, approach
services.html       Six service blocks + fees & reimbursement (PGB)
testimonials.html   All client testimonials, in English and Spanish
contact.html        Calendly booking embed, contact form, direct details
privacy.html        GDPR privacy statement scaffold
assets/css/style.css
assets/js/main.js
assets/img/         Photography
assets/fonts/       Webfonts (see § Fonts — the two .woff2 files go here)
sitemap.xml
robots.txt
```

---

## Before launch

Nothing here is optional. The site is complete; these are the things only you
can fill in.

1. **Testimonials.** The quotes on `index.html` and `testimonials.html` are
   the real ones from the live site, with the first names and countries used
   there. Make sure each client has consented to being quoted on the new site.
2. **Fill in every `[BRACKETED]` value.** KvK and VAT number, city, and the
   privacy statement's processors. Find them all with:
   ```bash
   grep -rn "\[[A-Z]" --include="*.html" .
   ```
3. **Complete the privacy statement.** It is a scaffold, not legal advice. It
   needs your actual processors (video platform, records system, email host,
   booking tool) and a review by someone qualified. Delete the draft warning
   banner at the top once it's done.
4. **Wire up the contact form.** See § Wiring up the form below. Right now it
   validates but does not send.
5. **Booking calendar.** The Calendly inline widget from the live site is
   already embedded in `contact.html`. Keep `id="book"` on that section —
   every CTA on every page links to it. Calendly loads a third-party script;
   it is named in the privacy statement, and if you add a cookie banner, gate
   the script behind it.
6. **Drop in the fonts and the logo.** See § Fonts. The logo is delivered
   separately; it replaces the two `<span>`s inside `<a class="logo">` in the
   header and footer of every page.
7. **Set the real domain.** If it isn't `vf-psychology.nl`, update the `<link
   rel="canonical">` and `og:url` on all five pages, plus `sitemap.xml` and
   `robots.txt`.
8. **Decide about analytics.** The GA4/GTM placeholder is commented out in
   `<head>` on `index.html`. Under the GDPR you need consent before setting
   analytics cookies — either run GA4 cookieless or add a consent banner.

---

## The token system

Everything visual comes from custom properties declared once at the top of
`assets/css/style.css`, in `@layer tokens`. There are no hex values and no px
values anywhere else in the file. Change a token, and every component that uses
it changes with it.

The layers are declared in this order, which is also the order they cascade in:

```
tokens → reset → base → layout → components → utilities
```

Because the order is declared up front, you can add a rule anywhere in the file
and it still lands in the right layer. A `utilities` rule always beats a
`components` rule, regardless of specificity. This is why the file contains no
`!important`.

### Changing the accent colour

The accent is four tokens. Swap them and the buttons, icons, links, focus
tints, step numbers and accent bands all follow.

```css
--c-accent-700: #2E4639;  /* hover / pressed          */
--c-accent-600: #3B5A49;  /* primary buttons          */
--c-accent-500: #4E7360;  /* icons, rules             */
--c-accent-100: #DCE6DF;  /* tinted backgrounds       */
```

A ready-made terracotta set sits directly below them, commented out. Comment out
the sage block, uncomment terracotta, done.

If you pick your own colour: `--c-accent-600` must reach **4.5:1 against white**,
because white button text sits on it. The current sage is 8.1:1, so there's
plenty of headroom. Check any replacement before you commit to it.

### Changing any other colour

Two sets of tokens, and the distinction matters:

- The **ramps** (`--c-sand-*`, `--c-ink-*`, `--c-accent-*`) are raw colours.
- The **semantic aliases** (`--bg-page`, `--text-body`, `--border-subtle`, …)
  are what the components actually reference.

To retheme, repoint the aliases. To adjust one shade everywhere it's used,
change the ramp. Never write a raw colour into a component rule.

### Changing type

Two families, both set as tokens:

```css
--font-display: "Fraunces", …;   /* headings */
--font-body:    "Inter", …;      /* everything else */
```

The scale is fluid — every step is a `clamp()` that interpolates between a
375px value and a 1200px value, so there are no font-size media queries
anywhere. To make all text larger, raise the middle (`vw`) term. To make the
scale more dramatic, raise the maximum values only.

Body text is `--fs-base`, which resolves to 17px on mobile and 18px on desktop.
Don't take it below 17px on mobile.

### Changing spacing and rhythm

`--sp-3xs` through `--sp-3xl` is a 4px-based scale on roughly a 1.5 ratio. Two
tokens do most of the visible work:

- `--section-y` — vertical padding on every `.section`. Raise it for an airier
  page, lower it for a denser one. One change, whole site.
- `--gutter` — horizontal page padding, also fluid.

### Radii, shadows, motion

`--r-xs` … `--r-pill` for corners. `--sh-xs` … `--sh-lg` for shadows, all
warm-tinted rather than neutral grey — a grey shadow on a sand background looks
dirty. `--dur-*` and `--ease-out` for motion; all three durations collapse to
`0ms` automatically under `prefers-reduced-motion: reduce`, so honouring that
setting needs no extra work when you add an animation.

---

## Reordering, removing and adding sections

Every band on every page is one block, wrapped like this:

```html
<!-- =======================================================================
     PROCESS — three steps
     ==================================================================== -->
<section class="section section--alt section--process">
  <div class="container">
    …
  </div>
</section>
```

Cut the whole block, including its comment banner, and paste it elsewhere. Any
order works. Spacing lives on `.section`, not on the components inside, so
nothing collapses or doubles up when you move things.

Background variants, applied as a second class on `.section`:

| Class              | Effect                                     |
|--------------------|--------------------------------------------|
| *(none)*           | Page background (off-white)                |
| `.section--alt`    | Warm sand band                             |
| `.section--tint`   | Accent tint band                           |
| `.section--invert` | Deep ink band; buttons and text auto-invert |

Alternate `.section--alt` with plain sections as you reorder, so two identical
backgrounds don't end up adjacent.

To delete a section: delete the block. Nothing else references it, with two
exceptions — `#faq` on the homepage and `#book` on the contact page are linked
from the footer and from every CTA. If you remove either, update those links.

---

## The JavaScript

`assets/js/main.js` is loaded with `defer`, so it never blocks rendering. Six
named functions, one behaviour each:

| Function              | What it does                                          |
|-----------------------|-------------------------------------------------------|
| `markJsAvailable()`   | Adds `.js` to `<html>` so CSS can arm JS-only effects |
| `initNavToggle()`     | Mobile menu, with Escape-to-close                     |
| `initStickyHeader()`  | Header shadow once the page scrolls                   |
| `initAccordion()`     | FAQ, one panel open at a time                         |
| `initFormValidation()`| Inline validation with accessible error messages      |
| `initReveal()`        | Fade and rise sections into view                      |

Each one exits quietly if the markup it needs isn't on the page, so the same
file serves all five pages. Nothing is required: with JS off, the nav links are
still reachable, the FAQ panels are open and readable, and the form falls back
to the browser's own validation.

Hooks are `data-` attributes, not classes, so restyling never breaks behaviour:
`data-header`, `data-nav-toggle`, `data-nav-panel`, `data-accordion`,
`data-accordion-trigger`, `data-validate`.

### Reveal on scroll

Add `class="reveal"` to any element to have it fade and rise into view. It's
skipped entirely for visitors who prefer reduced motion, and the CSS only hides
`.reveal` elements when `.js` is present — so nothing can ever get stuck
invisible.

---

## Wiring up the form

`contact.html` contains a working, validating form with no backend. Point it at
a handler:

```html
<form class="form" method="post" action="https://formspree.io/f/YOUR-ID"
      data-validate novalidate>
```

Any handler works — Formspree, Netlify Forms, Basin, or your own endpoint.

Two things to keep in mind. The form asks people why they're getting in touch,
so the answers may contain health information: pick a processor that will sign
a data processing agreement and stores data in the EEA, and list it in the
privacy statement. And add a honeypot or the handler's own spam protection —
the form has none, deliberately, because every option ties you to a specific
service.

---

## Fonts

The site expects two self-hosted variable fonts:

```
assets/fonts/fraunces-variable.woff2   → headings
assets/fonts/inter-variable.woff2      → body
```

Both are open source (SIL Open Font License). Download the variable `.woff2`
from Google Fonts or the projects' own repositories, latin subset, and drop them
in with exactly those filenames. Nothing else needs changing.

They are deliberately **self-hosted rather than loaded from Google Fonts**: no
third-party request, no render-blocking stylesheet, and no personal data (IP
addresses) sent to a third party without consent, which German and Dutch
regulators have taken a dim view of.

Until those two files exist, the site falls back to system faces — Iowan Old
Style or Georgia for headings, the system UI sans for body. It looks slightly
different and entirely fine. If you decide to stay on system fonts permanently,
delete the two `<link rel="preload">` lines in each page's `<head>` and the two
`@font-face` blocks in the base layer.

---

## Photography

Three photo slots, each marked in the HTML with a comment saying what it is and
what aspect ratio it needs.

| Where                        | File                              | Ratio | Minimum   |
|------------------------------|-----------------------------------|-------|-----------|
| Homepage hero                | `assets/img/valeria-portrait.jpg` | 4:5   | 800×1000  |
| Homepage about preview       | same file, square crop            | 1:1   | 700×700   |
| About page                   | same file, or a second frame      | 4:5   | 800×1000  |
| Social sharing (OG image)    | `assets/img/og-default.jpg`       | 1.91:1| 1200×630  |

All three currently point at the same portrait. Ideally the about page gets a
different frame so the two pages don't repeat themselves.

Every `<img>` already carries `width`, `height` and `alt`. Below-the-fold images
carry `loading="lazy"`; the hero carries `fetchpriority="high"` instead, because
lazy-loading the largest visible element hurts the Largest Contentful Paint
score. Keep it that way.

Export at around 1600px on the long edge, quality 80. If you want the last bit
of performance, save `.webp` alongside and wrap each `<img>` in a `<picture>`.

The favicon block in `index.html` is commented out — uncomment it once you have
the files.

---

## Accessibility

Built in, and worth not undoing:

- Contrast ≥ 4.5:1 on all body text. `--c-ink-300` is 4.0:1 and is marked in the
  tokens as non-text only — use it for rules and icons, never for words.
- One visible focus style, defined once on `:focus-visible` in the base layer,
  inherited everywhere. The focus colour is deliberately *not* the accent, so it
  stays visible on top of accent-coloured surfaces.
- Tap targets are at least 48×48px. That's why `.btn` has a `min-height`, and
  why nav links are `flex` with a minimum height rather than plain inline links.
- One `<h1>` per page, headings in order, real landmarks
  (`header`/`nav`/`main`/`section`/`footer`), and a skip link.
- `prefers-reduced-motion` collapses every duration token to zero and disables
  smooth scrolling and the reveal animation.
- Form errors are announced in place via `aria-describedby` + `role="alert"`,
  and focus moves to the first invalid field on submit.

---

## Browser support

Modern evergreen browsers. The two features with the shortest history are CSS
`@layer` (Chrome/Edge/Firefox/Safari, since early 2022) and `text-wrap: balance`
(purely cosmetic — older browsers just wrap normally). Everything else is
long-established. IE is not supported and won't be.
