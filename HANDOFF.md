# HANDOFF — VF Psychology website

Last updated: 28 August 2026
Repo: https://github.com/merqwaardig/vf-psycology (branch `main`)
Preview: https://vf-psycology.vercel.app (auto-deploys from `main`)
Future domain: https://vf-psychology.nl (currently still the old Squarespace site)

This document is the single place to look if you're picking this project up:
what it is, where everything lives, what's decided, what's still open, and
how to do the common tasks. Technical detail on the CSS/JS lives in
`README.md`; the original design brief is `VF-PSYCHOLOGY-BUILD-BRIEF.md`.

---

## 0. Session log — 28 August 2026 (all deployed to the Vercel preview)

- **Contact form works**: posts to FormSubmit → vf.psychology@gmail.com,
  honeypot, thank-you page. ⚠️ One-time activation e-mail still to click.
- **Booking changed to a free 10-minute call** (was: 30-min intake); the
  callout links to the form, which has a "What would you like?" select.
- **Services**: nav dropdown + seven per-service pages (incl. the brand-new
  **Pregnancy, Postpartum & Beyond** copy from the client); overview cards
  are teasers linking through. All in the sitemap.
- **Spanish site** under `/es/` — full translation (Latin American Spanish,
  tú/ustedes), EN↔ES switch in the header, hreflang, bilingual form
  validation, Spanish testimonials on the ES homepage. ⚠️ Needs Valeria's
  native review.
- **PGB temporarily hidden** everywhere (commented out, search "PGB" to
  restore).
- **Design**: pastel palette (mango/purple/green/yellow/blue tokens) on card
  icons, filled cards, step numbers, avatars; lilac recognition band with
  per-card accent edges; pastel-green FAQ (items same colour as the band);
  blurred woodland photo behind every CTA band; active nav item tinted sage,
  pastel hovers; homepage FAQ trimmed to 3 + "Show all" button.
- **Testimonials page**: carousel (scroll-snap + buttons), 5-star ratings,
  initials avatars (deliberately NO AI faces — deception risk; see § 6).
- **Media**: new about-page portrait (also in the homepage about preview);
  mobile hero shows the portrait + credentials directly under the headline.
- **GA4 live** (G-N6305CKK46) on all 28 pages, Consent Mode storage=denied
  (cookieless until a consent banner is added).
- **Footer**: BTW-id NL003190452B42 (VAT placeholder gone); TikTok
  @nina_psych added to socials + JSON-LD sameAs (⚠️ handle unverified —
  doesn't match Valeria's other handles).
- **Typography reviewed** (Lato / Source Sans Pro previews) — client chose
  to keep Fraunces + Inter.

---

## 1. What this is

A rebuild of the website of **VF Psychology**, the online psychology practice
of **Valeria Verhaar Flores, MSc** (clinical psychologist, child & adolescent
specialism, sessions in English and Spanish, Dutch for children).

- Static site: plain HTML + one CSS file + one small JS file. No framework,
  no build step, no dependencies. Open `index.html` and it works.
- Design: calm, warm, "well-lit room, not a clinic". Sand/off-white base,
  sage-green accent, Fraunces headings + Inter body (self-hosted, with system
  fallbacks until the font files are dropped in).
- **All copy is taken from the current live site (www.vf-psychology.nl)**,
  restructured into the new layout. Only the booking wording was changed on
  request: the site now offers a **free 10-minute call** (the old site said
  "free 30-minute intake").

History: a first build was made from the brief with invented copy (kept
locally as `../HTML/`, not in this repo). This repo is the second version
with the real content.

---

## 2. Files

```
index.html          Home: hero, "does this sound familiar", mission & approach,
                    how I can help, about preview, therapeutic process,
                    3 testimonials, FAQ (13 questions), CTA, footer
about.html          About Valeria, credentials, VF-Psychology, experience, approach
services.html       Service overview (7 cards) + fees & reimbursement (PGB)
individual-therapy.html, child-psychology.html, autism-therapy.html,
couple-counseling.html, expat-support.html, parent-guidance.html,
pregnancy-postpartum.html   One page per service (nav dropdown + overview cards link here)
testimonials.html   All 14 testimonials (English + Spanish)
contact.html        Booking block (#book), contact form (#contact-form), details
thank-you.html      Landing page after the form is sent (noindex)
privacy.html        GDPR privacy statement — SCAFFOLD, needs completing
assets/css/style.css   All styling, token-based (see README § The token system)
assets/js/main.js      Nav toggle, sticky header, FAQ accordion, form validation, reveal
assets/img/logo-mark.svg      Brain line-art used in header/footer logo
assets/img/logo-original.svg  The delivered logo, untouched (reference / OG image)
assets/img/valeria-portrait.jpg  Portrait used on home + about
assets/fonts/       EMPTY — drop fraunces-variable.woff2 + inter-variable.woff2 here
images/Valerria.jpg Same portrait as delivered (source file)
sitemap.xml, robots.txt
README.md           Technical manual (tokens, sections, JS, form, fonts, a11y)
VF-PSYCHOLOGY-BUILD-BRIEF.md   Original design brief
```

Header and footer are identical on every page (copy-pasted, no includes).
If you change them, change them on all 7 pages — a find-and-replace on the
block does it.

---

## 3. Facts baked into the site (source: live site + client)

| Item | Value | Where |
|---|---|---|
| Name | Valeria Verhaar Flores, MSc | everywhere |
| E-mail | vf.psychology@gmail.com | footer, contact, form destination |
| Phone | 06-38136116 (`tel:+31638136116`) | footer, contact, thank-you |
| KvK | 77411528 | footer all pages, privacy |
| SPS-NIP membership | 245010 | footer, about, JSON-LD |
| SKJ registration | 160029073 | footer, about, JSON-LD |
| Founded | February 2020 | about, JSON-LD |
| Languages | English & Spanish; Dutch for children | hero, FAQ, contact form |
| Socials | LinkedIn, Instagram, Facebook, X (real URLs) | footer, JSON-LD |
| Free call | 10 minutes, booked via the contact form | all CTAs |
| Fees | not published; discussed during the free call; no insurance. PGB mentions temporarily commented out (Aug 2026) on index.html + services.html — search "PGB" to restore | services, FAQ |
| Calendly | https://calendly.com/vf-psychology — embedded on the old site, **switched off here** (commented out in contact.html) | contact.html |

---

## 4. How things work

### Services dropdown & detail pages
"Services" in the nav is a dropdown (hover/focus on desktop, caret button on
mobile) listing the seven service pages plus "All services & fees". Each
service has its own page; the cards on services.html are short teasers that
link through. Service-page body text uses the .page-copy__* classes; the
dropdown is .nav__item--sub / .nav__sub in the CSS and initNavSub() in main.js.
Pregnancy, Postpartum & Beyond is new copy supplied by the client (Aug 2026);
the other six pages carry the live-site copy.

### Spanish version (/es/)
The whole site exists in Spanish under `/es/` — same filenames, same CSS/JS.
An "ES"/"EN" link in the header switches to the same page in the other
language. Every page carries hreflang tags (en / es / x-default) and both
languages are in `sitemap.xml`. Form validation messages are bilingual
(driven by the `lang` attribute); the Spanish contact form posts to the same
FormSubmit address with its own `_next` → `/es/thank-you.html` and its own
subject line. The Spanish homepage shows three Spanish testimonials;
`es/privacy.html` is a short notice linking to the English statement (the
binding version) — translate it fully once the English scaffold is final.
⚠️ The translations were machine-drafted by Claude (informal "tú", therapy
register): **Valeria must review them before the ES link goes live-live.**
Every future text change must be made in BOTH languages.

### Homepage FAQ
The FAQ shows only the first 3 questions; a "Show all N questions" button
(bilingual) reveals the rest. Without JS the full list is visible. Logic in
initFaqTrim() in main.js.

### Booking / CTAs
Every "Book a free 10-minute call" button on the site links to
`contact.html#book`. That section shows a green callout whose button jumps to
the form (`#contact-form`). The form has a "What would you like?" select
(default: *A free 10-minute call*).

To re-enable Calendly instead: in `contact.html`, remove the `<!-- -->`
around the Calendly block, delete the fallback callout below it. Nothing else
changes.

### Contact form → e-mail
The form posts to **FormSubmit** (`https://formsubmit.co/vf.psychology@gmail.com`).
No account, no key. Messages arrive as an e-mail (table layout, subject "New
message via the VF Psychology website", visitor's address as reply-to).
Honeypot field `_honey` filters bots; FormSubmit's captcha page is off.
After sending, the visitor lands on `thank-you.html`.

⚠️ **One-time activation still to do**: the first submission makes FormSubmit
send an activation e-mail to vf.psychology@gmail.com. Someone must click the
link in it. Until then nothing is delivered. → Submit the form once on the
live URL, then check that inbox (and spam).

⚠️ The redirect URL is hard-coded in a hidden field on `contact.html`:
`_next = https://vf-psycology.vercel.app/thank-you.html`. **Change it when the
domain moves to vf-psychology.nl.**

Note: FormSubmit is a free US forwarding service and is named in the privacy
statement. Because the message field may contain health information, a
processor with a DPA and EU storage (Formspree, Basin, own endpoint) is the
cleaner choice. Swapping is one attribute (`action=`) plus a privacy update.

### Logo
Header/footer logo = `<img>` of the brain mark + the wordmark as real text
("VF" in green Fraunces, "PSYCHOLOGY" in grey spaced uppercase) with a thin
divider in CSS. Visually equal to the delivered logo, but crisp and in the
site's own colours. Size via one token: `--logo-mark-h` (40 px).
`logo-original.svg` is the delivered file, unchanged.

### Design system
Everything visual is a CSS custom property in `@layer tokens` at the top of
`style.css`. Change the accent colour, fonts, spacing or section rhythm in one
place. Full explanation in `README.md`. Grids: `.u-grid-2` is capped at 2
columns (4 cards → 2×2, never 3+1), `.u-grid-3` auto-fits to 3.

### Deploy
Vercel is connected to the GitHub repo; every push to `main` deploys to
vf-psycology.vercel.app. There is no build step — Vercel just serves the
files. To go live on the real domain: add `vf-psychology.nl` in the Vercel
project, point DNS there, then do the domain checklist below.

---

## 5. Open items — CHECKLIST (tick as you go)

Details for each item are in the sections above (§ 4) or behind the grep
hints. Order within each block = priority.

### A. Before launch — content & legal
- [ ] **Activate FormSubmit** — submit the form once on the live URL, click
      the activation link in vf.psychology@gmail.com. Until then NOTHING is
      delivered. ← most important remaining step
- [ ] **Privacy statement** — fill every `[BRACKETED]` value in
      `privacy.html`, have it reviewed, remove the draft banner
- [ ] **City** — `"addressLocality": "[CITY]"` in the JSON-LD on `index.html`
- [ ] **Testimonials consent** — confirm all 14 clients are OK with being
      quoted, now with 5-star ratings attached
- [ ] **Testimonials language mix** — decide: the EN page currently shows all
      14 quotes (English AND Spanish mixed); same on the ES page. Option:
      show only same-language quotes per page, or sort own-language first,
      or keep the mix (a note on the page already explains it). One answer
      from the client, then ~30 min work
- [ ] **Spanish review by Valeria** — /es/ is Claude's draft (Latin American
      Spanish); native check before promoting the ES link
- [ ] **Verify TikTok handle** — footer links to @nina_psych; is that really
      the practice's account?
- [x] ~~VAT~~ — BTW-id NL003190452B42 in the footer (all 28 pages)

### B. Assets
- [ ] **Fonts** — drop `fraunces-variable.woff2` + `inter-variable.woff2`
      into `assets/fonts/` (exact names: README § Fonts)
- [ ] **Favicon** — favicon.svg + .ico + apple-touch-icon.png from the brain
      mark; uncomment the favicon block in every `<head>`
- [ ] **OG image** — `assets/img/og-default.jpg` (1200×630) for social shares
- [ ] **Extra photo** (nice-to-have) — hero and about now use different
      portraits; a third frame would add variety

### C. E-mail, domain & hosting
- [ ] **Create info@vf-psychology.nl** — then grep `vf.psychology@gmail.com`
      and replace everywhere (form action, footers, JSON-LD, privacy);
      FormSubmit re-activates on the new address
- [ ] **Move domain to Cloud86** — transfer vf-psychology.nl (+ mailbox);
      then point DNS at Vercel or upload the files to Cloud86
- [ ] **Domain-switch day** — update `_next` on both contact forms
      (EN + ES), test form + CTAs on the live domain; only then cancel
      Squarespace

### D. Analytics & search
- [ ] **Google Tag Manager** (optional) — GA4 already runs standalone; move
      it into GTM only if more tags are coming
- [ ] **Consent banner** (optional) — GA4 measures cookieless now; a banner
      firing `gtag('consent','update',{analytics_storage:'granted'})`
      enables full measurement
- [ ] **Search Console + Bing** — verify domain (DNS TXT via Cloud86),
      submit sitemap.xml, request indexing
- [ ] **llms.txt** — short plain-text practice description at the root for
      AI search; keep JSON-LD and `<lastmod>` current
- [x] ~~GA4~~ — G-N6305CKK46 live on all 28 pages (Consent Mode, cookieless)

---

## 6. Decisions made (so nobody re-litigates them)

- **Copy is the live site's copy**, not new marketing copy. Change texts only
  on the client's request.
- **Free 10-minute call, booked via the form** — replaces the 30-minute intake
  and the Calendly embed (client's decision, 18 Aug 2026). Calendly is kept
  in a comment for easy re-enable.
- **No published rates** — mirrors the live site; fees discussed on the call.
- **Logo as mark + text**, not one flat image — keeps it sharp and themable;
  the delivered file is preserved.
- **Repo root = this folder** (`HTML-v2`), not the parent project folder.
- **No framework, no build** — deliberately. Keep it that way; it's the reason
  a non-developer can edit it.

---

## 7. Common tasks

| Want to… | Do this |
|---|---|
| Change a text | Edit the HTML directly. Sections are marked with comment banners. |
| Change the accent colour | `style.css`, `@layer tokens`, the four `--c-accent-*` values (a terracotta set is ready-made, commented out). |
| Reorder / remove a homepage section | Cut/paste the whole `<section>` block incl. its comment banner. Alternate `.section--alt` so two identical backgrounds don't touch. |
| Change the destination e-mail of the form | `contact.html`, `action="https://formsubmit.co/…"` (FormSubmit will send a new activation mail). |
| Turn Calendly back on | See § 4 Booking. |
| Add a page | Copy `testimonials.html` (simplest page), keep header/footer, add it to the nav on all pages, footer, and `sitemap.xml`. |
| Preview locally | Just open `index.html`, or `python3 -m http.server 8765` in this folder and visit http://localhost:8765. |
| Ship | `git add -A && git commit -m "…" && git push` → Vercel deploys in ~30 s. |

---

## 8. Contacts

- Client: Valeria Verhaar Flores — vf.psychology@gmail.com — 06-38136116
- Repo owner / developer: merqwaardig (GitHub)
