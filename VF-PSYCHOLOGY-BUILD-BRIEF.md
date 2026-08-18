# BUILD BRIEF — VF Psychology website rebuild (vf-psychology.nl)

## ROLE

You are a senior front-end designer/developer. Build a complete, production-ready
static website from scratch in semantic HTML5 + vanilla CSS + minimal vanilla JS.
No frameworks, no build step, no dependencies. It must run by opening `index.html`.

## THE CLIENT

VF Psychology — a solo online psychology practice serving international/expat
clients worldwide. Founder: clinical psychologist, MSc Child & Adolescent
Psychology (Leiden University, cum laude), BSc Psychology (Universidad Autónoma
de Chile, cum laude). Sessions are online, in English and Spanish.

Focus areas: anxiety, stress, burnout, emotional regulation, expat mental health,
life transitions, parenting and child/adolescent support.

## STRATEGIC GOAL

The current site reads as a generic template: it informs, but it does not convert.
The rebuild has one job — turn a stressed, sceptical visitor into a booked intake
call. Every section must either build trust or reduce friction toward booking.

- **Primary conversion:** "Book a free 20-minute intro call"
- **Secondary conversion:** contact form submission
- **Tertiary:** newsletter / resource download

## NON-NEGOTIABLE CONSTRAINTS

- Mobile-first. Write the base CSS for 375px, then layer up with `min-width`
  media queries at 640 / 900 / 1200px. Never desktop-down.
- Fully responsive, no horizontal scroll at any width from 320px to 1920px.
- Tap targets minimum 48×48px. Body text minimum 17px on mobile.
- WCAG 2.1 AA: contrast ≥ 4.5:1 on body text, visible `:focus-visible` states,
  correct heading order, alt text on every image, `prefers-reduced-motion` honoured.
- Lighthouse target: 95+ on all four categories. No render-blocking JS.
- Total page weight under 500KB excluding images. Lazy-load below-fold images.

## CODE ARCHITECTURE (important)

Modular and surgically editable — I must be able to change one element without
touching anything else.

- One CSS file, organised in clearly commented layers in this order:
  1. `@layer tokens` — all design tokens as CSS custom properties on `:root`
  2. `@layer reset`
  3. `@layer base` — typography, links, lists
  4. `@layer layout` — container, grid, section rhythm
  5. `@layer components` — `.btn`, `.card`, `.nav`, `.accordion`, `.form`, `.testimonial`
  6. `@layer utilities`
- Every colour, font size, space value, radius and shadow comes from a token.
  Zero hardcoded hex values or px values outside the token block.
- Fluid type scale using `clamp()`. Spacing scale on a consistent ratio.
- BEM-style class names. No inline styles. No `!important`.
- Each page section wrapped in `<section class="section section--[name]">` with a
  comment banner above it so sections can be reordered or removed cleanly.
- JS: one file, small, feature-detected, each behaviour in its own named function
  with a comment. Behaviours needed: mobile nav toggle, FAQ accordion,
  sticky header on scroll, form validation. Nothing else.

## DESIGN DIRECTION

Calm, warm, human, quietly premium. Think "a well-lit room, not a clinic."

Explicitly avoid: stock photos of people on couches, cliché lotus/brain/puzzle
icons, cold corporate blue, gradient blobs, generic SaaS-template layout.

- **Palette:** warm neutral base (sand, off-white, deep ink) with ONE grounded
  accent (deep sage or terracotta). Define it as tokens so I can swap it in one place.
- **Typography:** two families max. A humanist serif for headings, a clean sans for
  body — or a single well-chosen variable sans if the serif fights the tone.
  Generous line-height (1.65 body), max 68ch measure.
- **Layout:** strong vertical rhythm, real whitespace, asymmetry allowed.
  Content-first, image-supporting — never a full-bleed hero image with text on top.
- **Motion:** subtle only. Fade/rise on scroll at 200–300ms, ease-out. Nothing bouncy.

## PAGES AND SECTION STRUCTURE

Build these as separate HTML files sharing the same CSS/JS.

### index.html

1. **Header** — logo, nav, persistent "Book intro call" button (visible on mobile too)
2. **Hero** — one clear promise headline addressing the visitor's state, one
   subline naming who it's for, primary + secondary CTA, one trust line
   (credentials, languages, online worldwide)
3. **"Does this sound familiar?"** — 3–4 recognition statements, not a feature list.
   This is the empathy hook that makes them stay.
4. **How I work** — 3 pillars, evidence-based framing, no jargon dump
5. **Who I help** — expats/internationals, adults, children & adolescents, parents
6. **About preview** — photo, name, credentials, one paragraph, link to about.html
7. **Process** — 3 steps: free intro call → intake → sessions. Removes friction.
8. **Testimonials** — 3 cards, anonymised, with context (e.g. "Expat, Amsterdam")
9. **FAQ** — accordion, 6 questions covering cost, insurance/reimbursement,
   confidentiality, language, session length, online effectiveness
10. **Final CTA band** — single focused ask
11. **Footer** — contact, KvK/registration placeholders, privacy, socials

### about.html

Full story, training, therapeutic approach, personal note, CTA.

### services.html

Service blocks with clear "who this is for / what we do / what it costs" per
offering, plus rates table and reimbursement note.

### contact.html

Form (name, email, what brings you here, preferred language), direct email,
response-time promise, embedded booking placeholder.

### privacy.html

GDPR-compliant privacy statement scaffold.

## COPY

Write all copy yourself, in English, ready to publish. Rules:

- Second person, present tense, short sentences.
- Speak to the feeling first, the method second.
- No hype, no promises of outcomes, no "unlock your potential" language.
- No em-dash-heavy, list-of-three AI cadence. Vary sentence length.
- Every CTA is specific: "Book a free 20-minute call", never "Learn more".

## SEO & ANALYTICS

- Unique `<title>` (≤60 chars) and meta description (≤155) per page
- Open Graph + Twitter card tags
- JSON-LD: `Person` + `ProfessionalService` + `FAQPage` on the relevant pages
- Semantic landmarks: header / nav / main / section / article / aside / footer
- Descriptive internal link text, one `<h1>` per page
- Include `sitemap.xml` and `robots.txt`
- Leave a clearly commented placeholder block in `<head>` for GA4/GTM

## IMAGES

Use inline SVG for icons (no icon library). For photos use
`<img src="assets/img/[descriptive-name].jpg">` with `width`/`height` attributes,
`loading="lazy"`, and a comment listing exactly which photo goes where and at what
aspect ratio, so the client can drop in real photography later.

## DELIVERABLE

```
/index.html
/about.html
/services.html
/contact.html
/privacy.html
/assets/css/style.css
/assets/js/main.js
/sitemap.xml
/robots.txt
/README.md
```

The README explains the token system and how to change colours, fonts, spacing
and section order.

## PROCESS

Do not write code yet. First reply with:

1. Your design rationale in 5 bullets
2. The full token block (colours, type scale, spacing, radii)
3. The homepage hero headline in 3 variants

Wait for my approval, then build one file at a time.
