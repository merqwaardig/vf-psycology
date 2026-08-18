# HANDOFF — VF Psychology website

Last updated: 18 August 2026
Repo: https://github.com/merqwaardig/vf-psycology (branch `main`)
Preview: https://vf-psycology.vercel.app (auto-deploys from `main`)
Future domain: https://vf-psychology.nl (currently still the old Squarespace site)

This document is the single place to look if you're picking this project up:
what it is, where everything lives, what's decided, what's still open, and
how to do the common tasks. Technical detail on the CSS/JS lives in
`README.md`; the original design brief is `VF-PSYCHOLOGY-BUILD-BRIEF.md`.

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
services.html       6 service blocks + fees & reimbursement (PGB)
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
| Fees | not published; discussed during the free call; no insurance; PGB possible | services, FAQ |
| Calendly | https://calendly.com/vf-psychology — embedded on the old site, **switched off here** (commented out in contact.html) | contact.html |

---

## 4. How things work

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

## 5. Open items (in order of importance)

1. **Activate FormSubmit** — one test submission + click the activation link
   in vf.psychology@gmail.com. Without this the form goes nowhere.
2. **VAT number** — footer on all 7 pages still says `VAT [VAT NUMBER]`.
   Delete it if the practice is VAT-exempt/not registered.
3. **Privacy statement** — `privacy.html` is a scaffold with `[BRACKETED]`
   placeholders (address, processors: video platform, records system, e-mail
   host; retention periods; complaints procedure). Needs Valeria's real
   details and ideally a review by someone qualified. Remove the "draft"
   banner at the top when done.
4. **City** — `"addressLocality": "[CITY]"` in the JSON-LD on `index.html`.
5. **Fonts** — download Fraunces + Inter variable `.woff2` (Google Fonts,
   latin subset), drop into `assets/fonts/` with the exact filenames in
   README § Fonts. Until then system fonts are used (looks fine, slightly
   different).
6. **Photos** — hero, about-preview and about page all use the same portrait.
   A second frame for the about page would avoid the repeat. Also needed:
   `assets/img/og-default.jpg` (1200×630) for social sharing, and a favicon
   (block is commented out in each `<head>`).
7. **Testimonials consent** — the 14 quotes are the ones from the old site
   with the same first names + countries. Confirm each client is fine with
   them being reused.
8. **Domain move** — when going to vf-psychology.nl: update `_next` on the
   form (see above); canonical/og:url are already `vf-psychology.nl`, as are
   `sitemap.xml` and `robots.txt`.
9. **Analytics** — GA4/GTM placeholder is commented out in `index.html`
   `<head>`. GDPR: needs cookieless config or a consent banner.

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
