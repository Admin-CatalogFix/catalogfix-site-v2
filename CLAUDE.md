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
| `auditFormUrl` | Set to the Jotform "CatalogFix Audit Form" (form 262799242505060), which follows brief §8. If emptied, every "Get a free audit" button opens an email instead |
| `whatsappNumber` (digits + country code) | QR box and mobile link show a "coming soon" note. When set, the QR code is generated automatically |
| `emailRot13` | ROT13 of the contact email (currently admin@catalogfix.com). Never put the plain address in HTML or meta tags |

## Placeholders still on the pages (brief §9 open items)

- **Reviews** — three real, client-approved quotes on Home: Jens Vogel (Wildfang, the full-width lead), Joe Woody (Wickers), Max N. (Amazon International Manager, Warrior; from his LinkedIn recommendation). Keep them **word for word** — never edit, trim or write review text without the client's OK. Roles for Jens and Joe are still missing. Logos live in `docs/assets/clients/` (trimmed from Carl's "Client logo" folder; Duke and Livingood logos are deliberately not in the repo because they aren't shown).

## "Who we work with" (Home and Who We Are)

Carl's decision (Oct 2026): **no client names or logos** in this list, so it needs no brand approval. Each client is described by category · marketplaces · service. Only the reviews name a client (Wildfang, Wickers, Warrior). Keep both pages' lists identical.

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
- Carl's wording (Oct 2026): **"Not your typical agency"** replaces "not an agency". Use it only as a contrast (it heads the comparison section, with "A typical agency runs on a churn-driven model. We're built for the long term."), never as the intro.
- Home "The process" is the live site's three steps (Reach Out / We Assess / We Get to Work), not the brief's four. Two phrases from the live copy were left out on purpose: "not through an account manager" (breaks the rule above) and "no contact form purgatory" (contradicts the free-audit form).
- Buttons use Dark Navy text on orange (white on orange is too low-contrast to read comfortably).

## Before moving catalogfix.com to this site (only when Carl approves)

1. Remove `<meta name="robots" content="noindex, nofollow">` from all three pages.
2. Add canonical URLs, Open Graph tags, a `sitemap.xml` and `robots.txt` in `docs/` (the old site's versions are a good starting point).
3. Add `docs/CNAME` containing `catalogfix.com`, and remove the custom domain from the `catalogfix-website` repo's Pages settings first — a domain can only be attached to one repo.
4. Update the Google Search Console sitemap to the new pages.
