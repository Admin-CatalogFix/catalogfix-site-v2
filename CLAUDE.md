# CatalogFix website v2

New 3-page site built from `CATALOGFIX_WEBSITE_BRIEF.md`. **The brief is the source of truth for copy** — read it before changing any wording, and don't add claims it doesn't make.

## Where things are

```
docs/                    ← GitHub Pages publishes this folder only (it's the "public" folder)
├── index.html           Home
├── who-we-are.html      Who We Are (jump menu: who / different / what)
├── team.html            Our Team
├── links.html           /links: social links page for the QR code (not in the menu)
├── qr/                  QR codes for /links (generated; see below)
├── .nojekyll
└── assets/
    ├── styles.css       all styling, shared by every page
    ├── site.js          CONFIG block at the top + shared behaviour
    ├── motion.css/js    animations (all pages except /links)
    ├── og-image.jpg     1200×630 share image (copied from the live site repo)
    ├── logo-icon.png, logo-wordmark.png   (copied from the live site repo)
    └── favicon.png, apple-touch-icon.png
scripts/make-qr.swift    regenerates docs/qr/ (not published)
CATALOGFIX_WEBSITE_BRIEF.md   ← brief (not published on the site)
```

Plain HTML/CSS/JS. No build step. A page's file name is its address: GitHub Pages serves `/team` from `team.html` (query strings kept), so `links.html` is `/links`. Header, contact section and footer are repeated in each of the three main HTML files — **change all three** when editing them.

Preview: https://admin-catalogfix.github.io/catalogfix-site-v2/ (Pages source: `main` branch, `/docs`).

## Things to fill in — `docs/assets/site.js` CONFIG

| Setting | Effect while empty |
|---|---|
| `auditFormUrl` | Set to the Jotform "CatalogFix Audit Form" (form 262799242505060), which follows brief §8. If emptied, every "Get a free audit" button opens an email instead |
| `socials` | LinkedIn, Facebook, Instagram, Threads, TikTok, YouTube, X. Shown as icons in the contact section ("Follow us", 4-across grid) and as full-width buttons on /links. Add a network with one line; icons exist for all seven (anything else gets a link icon). Also update the `<noscript>` fallback list in links.html. Carl replaced the brief's WhatsApp QR with socials in Oct 2026 |

## /links page and QR code (Oct 2026)

- `links.html` = one page with every social profile, for people scanning the QR. Logo, then one button per network (rendered from `CONFIG.socials`). Not in the menu. `noindex`, with Open Graph tags pointing at catalogfix.com.
- The **footer** of the three main pages shows the QR (`qr/qr-links.svg`, 96px) instead of social icons, linking to `links.html` ("Scan or tap to follow us").
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
- **Team** — only Carl is listed. Add each person only after they've agreed to be listed (brief §7). Copy a placeholder `<li>`, remove `is-placeholder`.
- **"Many of us came from agencies"** — Who We Are uses the safe fallback "Our founder came from agencies." until Carl confirms (HTML comment marks the spot).
- **Extra services** (account health & appeals, Brand Registry, category ungating, Vine) — left off "What we do" until Carl decides.

## Rules from the brief that are easy to break

- Light design only. Brand colours only (see brief §2). `#DDE3EA` is for lines/borders, never text. No gradients, shadows, patterns, emoji icons, green checkmarks.
- Font: Helvetica Neue stack. The logo's typeface is only in the logo image.
- Banned words: stewardship, compounding, world-class, game-changing, cutting-edge.
- Never say "no account manager" or "weekly" reports (say "regular"). Don't centre on Slack.
- Carl's wording (Oct 2026): **"Not your typical agency"** replaces "not an agency". Use it only as a contrast, never as the intro. It's the eyebrow of the comparison section, whose headline is "CatalogFix is **built for the long term.**" (highlight in Deep Orange via `.hl`) and lead "A typical agency runs on a churn-driven model."
- Home section order (Oct 2026): hero → Who we work with → What we do (services; same copy as Who We Are) → How we work → comparison → reviews → contact.
- Home "How we work" (approved by Carl, Oct 2026): heading "Simple from the start.", three steps **Audit / Work / Report** (the brief's steps minus "Match"), joined by a thin orange arrow line. It merges the brief with the live site's tone — don't swap in the live site's "Reach Out / We Assess / We Get to Work" copy.
- Comparison table: header row in Medium Navy (#223F5A) with white text, CatalogFix header cell orange with navy text (Carl's chosen 'sparing' use of navy). Rows tint on hover (mouse only). Column order: CatalogFix, Agency, Direct hire, Freelancer. Each row has a one-line description (`.cmp-desc`). Fee row wording is deliberate: Carl may renegotiate fees after big results, so never promise fees won't rise — the point is they aren't tied to sales and any change is agreed first.
- **Process: propose copy and layout to Carl and get his OK before building or pushing changes.**
- Buttons use Dark Navy text on orange (white on orange is too low-contrast to read comfortably).

## Motion (approved by Carl, Oct 2026)

All three pages load `assets/motion.css` + `assets/motion.js`, plus a one-line head script that adds `.motion-ready` (so the hero doesn't flash before animating). Everything is off for reduced-motion visitors, and hidden starting states only apply to classes the scripts add.
- **Home hero:** supplement listing suppressed for medical claims. It loops every 11s: arrow draws, after card rises, three notes appear, holds, replays.
- **Home process:** the line draws slowly through 01 → 02 → 03 and each step circle turns orange as it arrives. Loops every 9s once scrolled into view.
- **Home extras:** the orange arrow underline under "built for the long term." draws once; the stars beside "Reviews" wave every 4.5s.
- **Every page:** sections below the fold fade up once; the contact arrow (wide screens) sweeps in once; button arrows nudge on hover.
- **Rejected by Carl:** a faint rotating logo circle behind the comparison headline. Don't bring it back. Keep motion meaningful (arrows, progress), at most one moving thing per section.

The comparison table header stays pinned under the menu on tablet and up (styles.css). It needs no ancestor with `overflow: hidden`.

## Before moving catalogfix.com to this site (only when Carl approves)

0. Confirm every brand in "Who we work with" and the reviews has approved its logo and wording.

1. Remove `<meta name="robots" content="noindex, nofollow">` from all three pages.
2. Add canonical URLs, Open Graph tags, a `sitemap.xml` and `robots.txt` in `docs/` (the old site's versions are a good starting point). Add the social links as `sameAs` in the Organization structured data. Don't add review/star-rating structured data: the five stars beside "Reviews" are decorative, not a collected rating.
3. Add `docs/CNAME` containing `catalogfix.com`, and remove the custom domain from the `catalogfix-website` repo's Pages settings first — a domain can only be attached to one repo.
4. Update the Google Search Console sitemap to the new pages.
5. After catalogfix.com/links works: add the links page to the Jotform thank-you message (and the confirmation email, if it is set up), as a tappable link, plus optionally the QR for desktop visitors. Propose the wording to Carl first, then re-sync the Jotform → Google Sheet if the form changes.
