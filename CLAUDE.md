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
| `socials` | LinkedIn, Facebook, Instagram, Threads, TikTok, YouTube, X, shown as icons in the contact section ("Follow us", 4-across grid) and footer of every page. Add a network with one line; icons exist for all seven (anything else gets a link icon). Carl replaced the brief's WhatsApp QR with socials in Oct 2026 |
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
- Home "How we work" (approved by Carl, Oct 2026): heading "Simple from the start.", three steps **Audit / Work / Report** (the brief's steps minus "Match"), joined by a thin orange arrow line. It merges the brief with the live site's tone — don't swap in the live site's "Reach Out / We Assess / We Get to Work" copy.
- Comparison table column order: CatalogFix, Agency, Direct hire, Freelancer. Each row has a one-line description (`.cmp-desc`). Fee row wording is deliberate: Carl may renegotiate fees after big results, so never promise fees won't rise — the point is they aren't tied to sales and any change is agreed first.
- **Process: propose copy and layout to Carl and get his OK before building or pushing changes.**
- Buttons use Dark Navy text on orange (white on orange is too low-contrast to read comfortably).

## Motion demo (proposal, not adopted yet)

`docs/motion-demo.html` is a copy of Home used to show Carl two proposals: the **supplement** version of the hero listing (suppressed for medical claims) and subtle motion (`assets/motion.css` + `assets/motion.js`, only linked from the demo). Motion: hero plays in once on load; process line and contact arrow draw when scrolled into view; sections below the fold fade up; the logo loop turns slowly behind the comparison headline. All of it is off for reduced-motion visitors. If Carl approves, port the hero SVG and the asset links into the real pages, then delete the demo page. If he rejects it, delete the demo and the two motion files.

## Before moving catalogfix.com to this site (only when Carl approves)

0. Confirm every brand in "Who we work with" and the reviews has approved its logo and wording.

1. Remove `<meta name="robots" content="noindex, nofollow">` from all three pages.
2. Add canonical URLs, Open Graph tags, a `sitemap.xml` and `robots.txt` in `docs/` (the old site's versions are a good starting point). Add the social links as `sameAs` in the Organization structured data. Don't add review/star-rating structured data: the five stars beside "Reviews" are decorative, not a collected rating.
3. Add `docs/CNAME` containing `catalogfix.com`, and remove the custom domain from the `catalogfix-website` repo's Pages settings first — a domain can only be attached to one repo.
4. Update the Google Search Console sitemap to the new pages.
