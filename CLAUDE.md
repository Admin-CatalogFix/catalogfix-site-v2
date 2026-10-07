# CatalogFix website v2

New 3-page site built from `CATALOGFIX_WEBSITE_BRIEF.md`. **The brief is the source of truth for copy** — read it before changing any wording, and don't add claims it doesn't make.

## Where things are

```
docs/                    ← GitHub Pages publishes this folder only
├── index.html           Home
├── who-we-are.html      Who We Are (jump menu: who / different / what)
├── team.html            Our Team
├── .nojekyll
└── assets/
    ├── styles.css       all styling, shared by every page
    ├── site.js          CONFIG block at the top + shared behaviour
    ├── logo-icon.png, logo-wordmark.png   (copied from the live site repo)
    └── favicon.png, apple-touch-icon.png
CATALOGFIX_WEBSITE_BRIEF.md   ← brief (not published on the site)
```

Plain HTML/CSS/JS. No build step. Header, contact section and footer are repeated in each of the three HTML files — **change all three** when editing them.

Preview: https://admin-catalogfix.github.io/catalogfix-site-v2/ (Pages source: `main` branch, `/docs`).

## Things to fill in — `docs/assets/site.js` CONFIG

| Setting | Effect while empty |
|---|---|
| `auditFormUrl` | Every "Get a free audit" button opens an email to the contact address instead |
| `whatsappNumber` (digits + country code) | QR box and mobile link show a "coming soon" note. When set, the QR code is generated automatically |
| `emailRot13` | ROT13 of the contact email (currently admin@catalogfix.com). Never put the plain address in HTML or meta tags |

## Placeholders still on the pages (brief §9 open items)

- **Client logos** — names shown as text in the "Brands we work with" strip (Home and Who We Are). Swap each `<li>` text for an `<img>`.
- **Reviews** — two blocks marked PLACEHOLDER on Home. Carl supplies quote, name, role, brand logo. Never write review text.
- **Team** — only Carl is listed. Add each person only after they've agreed to be listed (brief §7). Copy a placeholder `<li>`, remove `is-placeholder`.
- **"Many of us came from agencies"** — Who We Are uses the safe fallback "Our founder came from agencies." until Carl confirms (HTML comment marks the spot).
- **Extra services** (account health & appeals, Brand Registry, category ungating, Vine) — left off "What we do" until Carl decides.

## Rules from the brief that are easy to break

- Light design only. Brand colours only (see brief §2). `#DDE3EA` is for lines/borders, never text. No gradients, shadows, patterns, emoji icons, green checkmarks.
- Font: Helvetica Neue stack. The logo's typeface is only in the logo image.
- Banned words: stewardship, compounding, world-class, game-changing, cutting-edge.
- Never say "no account manager" or "weekly" reports (say "regular"). Don't lead with "not an agency". Don't centre on Slack.
- Buttons use Dark Navy text on orange (white on orange is too low-contrast to read comfortably).

## Before moving catalogfix.com to this site (only when Carl approves)

1. Remove `<meta name="robots" content="noindex, nofollow">` from all three pages.
2. Add canonical URLs, Open Graph tags, a `sitemap.xml` and `robots.txt` in `docs/` (the old site's versions are a good starting point).
3. Add `docs/CNAME` containing `catalogfix.com`, and remove the custom domain from the `catalogfix-website` repo's Pages settings first — a domain can only be attached to one repo.
4. Update the Google Search Console sitemap to the new pages.
