# CatalogFix website v2

New 4-page site built from `CATALOGFIX_WEBSITE_BRIEF.md` (the brief's 3 pages plus Services, added Oct 2026). **The brief is the source of truth for copy** — read it before changing any wording, and don't add claims it doesn't make.

## Where things are

```
docs/                    ← GitHub Pages publishes this folder only (it's the "public" folder)
├── index.html           Home
├── who-we-are.html      Who We Are (jump menu: who / different / what)
├── services.html        Services (every service in detail; see "Services page" below)
├── team.html            Our Team
├── links.html           /links: social links page for the QR code (not in the menu)
├── values.html          /values: mission, vision, core values (footer link, opens in a new tab)
├── privacy.html         /privacy: privacy policy (footer link, opens in a new tab)
├── qr/                  QR codes for /links (generated; see below)
├── .nojekyll
└── assets/
    ├── styles.css       all styling, shared by every page
    ├── site.js          CONFIG block at the top + shared behaviour
    ├── motion.css/js    animations (all pages except /links)
    ├── og-image.jpg     1200×630 share image (copied from the live site repo)
    ├── team/            team photos, 320×320 JPEG
    ├── logo-icon.png, logo-wordmark.png   (copied from the live site repo)
    └── favicon.png, apple-touch-icon.png
scripts/make-qr.swift    regenerates docs/qr/ (not published)
CATALOGFIX_WEBSITE_BRIEF.md   ← brief (not published on the site)
```

Plain HTML/CSS/JS. No build step. A page's file name is its address: GitHub Pages serves `/team` from `team.html` (query strings kept), so `links.html` is `/links`. Header, contact section and footer are repeated in each of the four main HTML files (Home, Who We Are, Services, Our Team) — **change all four** when editing them.

Preview: https://admin-catalogfix.github.io/catalogfix-site-v2/ (Pages source: `main` branch, `/docs`).

## Things to fill in — `docs/assets/site.js` CONFIG

| Setting | Effect while empty |
|---|---|
| `auditFormUrl` | Set to the Jotform "CatalogFix Audit Form" (form 262799242505060), which follows brief §8. If emptied, every "Get a free audit" button opens an email instead |
| `socials` | LinkedIn, Facebook, Instagram, Threads, TikTok, YouTube, X. Shown as icons in the contact section ("Follow us", 4-across grid) and as full-width buttons on /links. Add a network with one line; icons exist for all seven (anything else gets a link icon). Also update the `<noscript>` fallback list in links.html. Carl replaced the brief's WhatsApp QR with socials in Oct 2026 |

## /links page and QR code (Oct 2026)

- `links.html` = one page with every social profile, for people scanning the QR. It has the same header and footer as the main pages (Carl, 21 Oct 2026; the footer leaves out the QR, which would point to this page), then one button per network (rendered from `CONFIG.socials`). Not in the menu. `noindex`, with Open Graph tags pointing at catalogfix.com.
- The footer's "Our values" and "Privacy policy" links are navy with an orange underline, so they read as links (Carl, 21 Oct 2026).
- The **footer** of the four main pages shows the QR (`qr/qr-links.svg`, 96px) instead of social icons, linking to `links.html` ("Scan or tap to follow us").
- QR target: `https://catalogfix.com/links?src=qr`. It only works once catalogfix.com serves this site. `?src=qr` is only counted once an analytics tool is added (none installed yet).
- Regenerate: `swift scripts/make-qr.swift` (Mac, no installs; edit `targetURL` at the top). It writes `docs/qr/qr-links.svg`, `qr-links.png` (1000×1000), and `qr-links-icon.*` (CF icon in the centre). It then decodes the PNGs with Apple Vision and exits non-zero if they don't match. Settings: level H, Medium Navy #223F5A on white, 4-module border.
| `emailRot13` | ROT13 of the contact email (currently admin@catalogfix.com). Never put the plain address in HTML or meta tags |

## Placeholders still on the pages (brief §9 open items)

- **Reviews** — three real, client-approved quotes on Home: Jens Vogel (Wildfang, the full-width lead), Joe Woody (Wickers), Max N. (Amazon International Manager, Warrior; from his LinkedIn recommendation). Roles: Jens = Managing Director, Joe = Owner. Keep quotes **word for word** — never edit, trim or write review text without the client's OK. Logos live in `docs/assets/clients/`, trimmed from Carl's "Client logo" folder with a stdlib PNG trimmer (no PIL on Carl's Mac), resized to 120px tall.

## "Who we work with" (Home and Who We Are)

Each client shows its **logo** above category · marketplaces · service (Carl, Oct 2026). Carl is sending the preview to every brand for approval before the site goes live — **Duke and Livingood had not approved logo use as of 13 Oct 2026**; remove a logo if a brand says no. Keep both pages' lists identical.

| Client (internal only) | On the site |
|---|---|
| 001 Wildfang Pet | Pet brand · Amazon US, CA, UK, EU, AU, JP · Walmart · eBay · Full account management |
| 005 Duke Defense | Personal defense brand · Amazon US · Full account management |
| 004 Livingood Daily | Supplement brand · Amazon US · Walmart US · Catalog & SEO, listing fixes |
| 002 Wickers Sports | Sports apparel brand · Amazon US · Advertising |
| 003 Warrior (formerly KBF Enterprises) | Supplement brand · Amazon EU · Advertising |
- **Team** (built 20 Oct 2026, everyone agreed to be listed): Carl as the featured founder (Founder & Account Director), then John Edward Manulat (Head of Growth · Catalog & SEO), Thea Nin Lachica (Walmart Account Manager), Kathleen Malicdem and Aiko Lemeric (Catalog & SEO), Julia Cruz (Design & content), Shalee Gernandizo (Advertising/PPC). Each has a photo (`docs/assets/team/<first name>.jpg`, 320×320 JPEG, from their LinkedIn photo), a short bio and a LinkedIn link. Bios use only facts from the person's own LinkedIn profile and never name former employers. Add someone new only after they agree (brief §7).
- **"Many of us came from agencies"** — confirmed by Carl, 20 Oct 2026 (five of the seven came from agencies), and now on Who We Are.
- **Extra services** (account health & appeals, Brand Registry, category ungating, Vine): decided Oct 2026. They're on the Services page, not in the short "What we do" summary.

## Rules from the brief that are easy to break

- Light design only. Brand colours only (see brief §2). `#DDE3EA` is for lines/borders, never text. No gradients, shadows, patterns, emoji icons, green checkmarks.
- Font: Helvetica Neue stack. The logo's typeface is only in the logo image.
- Banned words: stewardship, compounding, world-class, game-changing, cutting-edge.
- Never say "no account manager" or "weekly" reports (say "regular"). Don't centre on Slack.
- Carl's wording (Oct 2026): **"Not your typical agency"** replaces "not an agency". Use it only as a contrast, never as the intro. It's the eyebrow of the comparison section, whose headline is "CatalogFix is **built for the long term.**" (highlight in Deep Orange via `.hl`) and lead "A typical agency runs on a churn-driven model."
- Menu and footer order (Carl, 21 Oct 2026): Home · Services · Who We Are · Our Team.
- Who We Are "What changes when you work with us" (Carl, 21 Oct 2026) replaces the brief's §6.2 list with three points: You talk to the person doing the work / We find problems before they cost you / We fix the cause, not the symptom. Each has a general "What this means for you" box. Keep the boxes free of client names and stories, since Carl wants these points to speak to any brand. Fees and honest calls were dropped here because Home and Carl's bio already cover them.
- No separate mission, vision or values sections (decided 21 Oct 2026). The mission is already the first line of Who We Are, and the three points above do the job of values.
- Who We Are headline breaks after the comma ("Direct expert support,<br> as part of your team."), per Carl.
- Who We Are story (Carl, 21 Oct 2026): the mission sentence sits large on the left under the orange line, and the rest of the story is on the right. The big "10–15" stat was removed and shouldn't come back: on its own, clients read it as CatalogFix's own clients-per-person number. The figure stays only inside the paragraph about agencies.
- Home section order (Oct 2026): hero → Who we work with → What we do (services; same copy as Who We Are) → How we work → comparison → reviews → contact.
- "What we do" layout (approved by Carl, 17 Oct 2026): compact on purpose. Headline and intro side by side, the four services in one row (2 on tablet, 1 on phone), and "Full account management" as a Medium Navy bar underneath, the section's only navy. Same markup on Home and Who We Are; keep them identical.
- Home "How we work" (approved by Carl, Oct 2026): heading "Simple from the start.", three steps **Audit / Work / Report** (the brief's steps minus "Match"), joined by a thin orange arrow line. It merges the brief with the live site's tone — don't swap in the live site's "Reach Out / We Assess / We Get to Work" copy.
- Comparison table: header row in Medium Navy (#223F5A) with white text, CatalogFix header cell orange with navy text (Carl's chosen 'sparing' use of navy). Rows tint on hover (mouse only). Column order: CatalogFix, Agency, Direct hire, Freelancer. Each row has a one-line description (`.cmp-desc`). Fee row wording is deliberate: Carl may renegotiate fees after big results, so never promise fees won't rise — the point is they aren't tied to sales and any change is agreed first.
- **Process: propose copy and layout to Carl and get his OK before building or pushing changes.**
- Buttons use Dark Navy text on orange (white on orange is too low-contrast to read comfortably).

## Services page (approved by Carl, 20 Oct 2026)

`services.html` exists because Amazon's Solution Provider Portal (SPP) rejected Carl's application. The website must show a **detailed description of service offerings**, **core offerings, benefits and expertise**, and **success stories with credentials and client testimonials**.
- Every part of the service description Carl gave Amazon must stay on this page, so a reviewer can match the two: listings and catalog (creation, variations, error fixes), Amazon SEO (keyword research, listing optimization), PPC (Sponsored Products, Brands, Display), creatives (images, A+ Content, Brand Store), FBA reimbursement claims, account health, Seller Support cases, reporting.
- Reports are **"regular"**, never "weekly" (Carl, 20 Oct 2026), here and everywhere else.
- Seven rows: Catalog & SEO · Design & content · Advertising · Reimbursements · Account health & Seller Support · Brand Registry, ungating & Vine · Full account management (navy panel). Then "One fix, or ongoing support" (with the pricing line Carl approved) and the contact section.
- The jump links (Catalog & SEO · Design & content · …) stay pinned under the menu while you scroll the services, on tablet and up (Carl, 21 Oct 2026). They sit in `.jump-bar` inside the services section (not in the page header) so they let go when the services end. `position: sticky`. The bar is Medium Navy with white links (Carl, 21 Oct 2026), like the comparison table's pinned header: on this site navy means "this part stays put". site.js measures the bar's height (`--jump-h`) so jump targets land below it when the links wrap to two lines, and marks the service you're reading (`aria-current`, white with an orange underline). Phones: same navy, but not pinned (four lines is too tall) and nothing highlighted.
- Vine says "enrolling eligible products" only. Never "review strategy", since Amazon is strict about anything that sounds like influencing reviews.
- Home and Who We Are keep the short "What we do" summary, linking here ("See every service in detail →").
- Team page expertise: done (20 Oct 2026).
- Still to do for SPP: **credentials**, since none are on the site yet. The relevant certifications have expired (Carl's Amazon Ads Advanced Retail, Jan 2025; Thea's Walmart Connect, Dec 2024), so don't list them. Add a credentials line per person once they renew or take free Amazon Ads / Walmart Connect certifications. **2–3 case studies** with real numbers and each client's OK. Then move catalogfix.com to this site before reapplying.

## Motion (approved by Carl, Oct 2026)

All three pages load `assets/motion.css` + `assets/motion.js`, plus a one-line head script that adds `.motion-ready` (so the hero doesn't flash before animating). Everything is off for reduced-motion visitors, and hidden starting states only apply to classes the scripts add.
- **Home hero:** supplement listing suppressed for medical claims. It loops every 11s: arrow draws, after card rises, three notes appear, holds, replays.
- **Home process:** the line draws slowly through 01 → 02 → 03 and each step circle turns orange as it arrives. Loops every 9s once scrolled into view.
- **What we do (Home, Who We Are):** once, when scrolled into view, the four services rise one after another, each orange line draws in, and the navy bar arrives last (~1s). Doesn't loop.
- **Home extras:** the orange arrow underline under "built for the long term." draws once; the stars beside "Reviews" wave every 4.5s.
- **Every page:** sections below the fold fade up once; the contact arrow (wide screens) sweeps in once; button arrows nudge on hover.
- **Rejected by Carl:** a faint rotating logo circle behind the comparison headline. Don't bring it back. Keep motion meaningful (arrows, progress), at most one moving thing per section.

The comparison table header stays pinned under the menu on tablet and up (styles.css). It needs no ancestor with `overflow: hidden`.

## Our values and Privacy policy (21 Oct 2026)

- Carl wanted mission, vision and values kept off the main pages but still available, so they live on a standalone page, `values.html`. Both it and `privacy.html` are linked from the footer of the four main pages ("© CatalogFix · Our values · Privacy policy") and open in a new tab. Both pages have the normal site header and menu (Carl, 21 Oct 2026) and use the `.doc-*` styles. Privacy is one 760px column. Values uses the full width.
- **Values page content is Carl's own wording (21 Oct 2026). Keep it word for word.** It covers his mission ("Our aim is to give clients direct expert support from people who actually do the work…"), his vision ("…build and protect a team of seasoned Amazon specialists…"), and seven values: Transparency First, Expert-Led Execution, Ownership & Accountability, Respect for Time & Talent, Partnership Not Transaction, Straightforward Communication, Long-Term Mindset. Each value has a description and a bold takeaway line.
- His original design used a serif font in orange. The page follows the brand guide instead: Helvetica Neue, navy headings, orange numbers and icons. The seven icons are inline SVG line icons (orange stroke 1.6, same style as the social icons), drawn to match his concepts: eye, award ribbon, shield with tick, stopwatch with heart, handshake, speech bubbles, rising chart.
- **Keep the privacy policy true to what the site actually does.** It lists the audit form's fields (name, email, WhatsApp, brand, marketplaces, product, issue, details, who handles Amazon), email and Google Calendar bookings, Jotform and Google Workspace as processors, and no cookies, analytics or tracking. If any of those change (a form field, a new tool, analytics added), update the policy and its "Last updated" date in the same change.
- Carl's choices: business name is just "CatalogFix", based in Iloilo. No mailing list or marketing emails. Audit requests and emails are kept on file with no deletion schedule, and deleted on request. Requests are answered within 30 days. The Philippine Data Privacy Act / GDPR line was drafted by Claude, **not reviewed by a lawyer**. Carl knows and accepted the draft.

## Before moving catalogfix.com to this site (only when Carl approves)

0. Confirm every brand in "Who we work with" and the reviews has approved its logo and wording.

1. Remove `<meta name="robots" content="noindex, nofollow">` from all six pages (the four main pages, plus values and privacy).
2. Add canonical URLs, Open Graph tags, a `sitemap.xml` and `robots.txt` in `docs/` (the old site's versions are a good starting point). Add the social links as `sameAs` in the Organization structured data. Don't add review/star-rating structured data: the five stars beside "Reviews" are decorative, not a collected rating.
3. Add `docs/CNAME` containing `catalogfix.com`, and remove the custom domain from the `catalogfix-website` repo's Pages settings first — a domain can only be attached to one repo.
4. Update the Google Search Console sitemap to the new pages.
5. After catalogfix.com/links works: add the links page to the Jotform thank-you message (and the confirmation email, if it is set up), as a tappable link, plus optionally the QR for desktop visitors. Propose the wording to Carl first, then re-sync the Jotform → Google Sheet if the form changes.
