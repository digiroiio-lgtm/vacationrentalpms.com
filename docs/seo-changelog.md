# SEO changelog — October 1, 2026

Internal document (excluded from deployment by `.vercelignore`). Companion to `docs/seo-gsc-opportunity-map.md`.

## What was found

- **59 of ~75 pages emitted FAQPage JSON-LD for questions that were not visible on the page.** Visible FAQ sections were generated from the existing JSON-LD answers, so markup and page now agree. `npm test` fails if they diverge again.
- **45 internal links pointed at `/#demo` and `/#compare` anchors that do not exist** on the homepage (CTA buttons such as "Get matched"). They now point to `/compare/`.
- **Mobile horizontal overflow** on every page containing a wide table (including the existing compare pages): the grid column `1fr` grew to the table's min-width. Fixed with `minmax(0,1fr)`.
- **No target pages** for the #1 and #5 GSC queries (`vrbo channel manager`, `airbnb integrations`) and no pillar for `vacation rental pms`.
- **OG tags on 12 pages, Twitter cards on none; 62 pages had no footer; navigation differed on almost every page.**
- `docs/` and `scripts/` were publicly deployed (output directory is the repo root).

## Technical changes

| Change | File | Reason |
|---|---|---|
| Idempotent normalizer: visible FAQ, OG/Twitter tags, breadcrumbs, standard nav and footer, dead-anchor fix, redirect-source links rewritten to destinations | `scripts/seo-codemod.mjs` | Single place to keep every page consistent; `npm test` runs it with `--check`. |
| `trailingSlash: true`; 301 `/vrbo-pms-integration/` → `/vrbo-channel-manager/` | `vercel.json` | Canonical slash form everywhere; merge instead of two Vrbo pages. |
| Deployment excludes `docs/`, `scripts/`, `README.md` | `.vercelignore` | Keep planning files private. (`/docs/expert-review-audit.md` was previously public.) |
| Crawler policy documented; still `Allow: /` | `robots.txt` | Nothing is blocked; no admin routes exist. |
| 3 URLs added, 1 removed; `lastmod` set to 2026-10-01 for pages whose content changed (all, because the footer/nav changed) | `sitemap.xml` | Strategic pages included; redirects excluded. |
| New checks: unique titles/descriptions, length limits, one H1, OG/Twitter present, FAQ visible, JSON-LD valid | `scripts/validate-site.mjs` | Prevent regressions. |
| New routes classified; merged route removed | `content-provenance.json` | Required by `validate-trust`. |
| Rewritten as a concise hub list | `llms.txt` | Supplemental discovery only. |
| Table/FAQ/flow styles and mobile overflow fix | `styles.css` | New components. |

## Pages created

| URL | Why it deserves its own page |
|---|---|
| `/vacation-rental-pms/` | Pillar for the 68-impression head term and its variants; the homepage was re-scoped so only one URL targets it. |
| `/vrbo-channel-manager/` | #1 GSC query (84 impressions); different intent from any existing page; replaces the thin `/vrbo-pms-integration/`. |
| `/airbnb-integrations/` | 36 impressions; ecosystem hub that none of the existing Airbnb pages covered; spokes keep detailed intents. |

## Pages merged or deliberately not created

- `/vrbo-pms-integration/` merged into `/vrbo-channel-manager/` (same intent).
- Not created: `/airbnb-pms/`, `/airbnb-management-software/` (same intent as `/airbnb-property-management-software/`); `/vacation-rental-software/` (user decision; handled by retitling `/vacation-rental-management-software/`); `/vacation-rental-dynamic-pricing/`, `/vacation-rental-payment-processing/`, `/guesty-alternatives/`; integration pages for unverified partners (Bookipro, etc.).

## Titles and H1s (before → after)

| URL | Title before | Title after | H1 changed |
|---|---|---|---|
| `/airbnb-pms-integration/` | Airbnb PMS Integration \| Vacation Rental PMS Connectivity Guide | Airbnb PMS Integration: API vs iCal Sync Explained | yes |
| `/airbnb-property-management-software/` | Airbnb Property Management Software \| Compare PMS Tools 2026 | Airbnb PMS: Property Management Software for Airbnb Hosts | yes |
| `/airbnb-software-stack/` | Airbnb Software Stack 2026 \| Tools by Portfolio Size | Airbnb Software for Hosts: Tools by Portfolio Size | no |
| `/best-airbnb-management-software/` | Best Airbnb Management Software in 2026 \| Buyer Guide | Best Airbnb Management Software: Compare by Portfolio Size | no |
| `/best-vacation-rental-software/` | Best Vacation Rental Software in 2026 \| Compare PMS Platforms | Best Vacation Rental Software: PMS & Channel Manager Comparison | no |
| `/dynamic-pricing-software-for-vacation-rentals/` | Dynamic Pricing Software for Vacation Rentals \| Buyer Guide | Dynamic Pricing for Vacation Rentals: Tools & How to Choose | no |
| `/guesty-alternative/` | Guesty Alternative \| Operations-First Vacation Rental PMS | Guesty Alternative: What to Compare Before You Switch PMS | no |
| `/` | Vacation Rental PMS \| Compare Software, Alternatives & Pricing | VacationRentalPMS.com: Vacation Rental Software Guides & Comparisons | yes |
| `/pms-vs-channel-manager/` | PMS vs Channel Manager \| Which Vacation Rental Software Do You Need? | PMS vs Channel Manager: Differences & When You Need Both | no |
| `/switch-vacation-rental-pms/` | Switch Vacation Rental PMS \| PMS Migration Checklist | Switch Vacation Rental PMS \| PMS Migration Checklist | no |
| `/vacation-rental-accounting-software/` | Vacation Rental Accounting Software \| PMS & Finance Workflows | Vacation Rental Accounting Software & Payment Processing | no |
| `/vacation-rental-automation-software/` | Vacation Rental Automation Software \| PMS Workflow Automation | Vacation Rental Automation: Workflows, Software & Services | no |
| `/vacation-rental-channel-manager/` | Vacation Rental Channel Manager \| Compare Software & Features | Vacation Rental Channel Manager: How It Works + Software Guide | yes |
| `/vacation-rental-management-software/` | Vacation Rental Management Software \| Compare PMS Platforms 2026 | Vacation Rental Software: Types, Features & How to Choose | yes |
| `/vacation-rental-pms-for-20-properties/` | Vacation Rental PMS for 20 Properties \| Software for Growing Portfolios | Vacation Rental PMS for 20 Properties \| Growing Portfolios | no |
| `/vacation-rental-reservation-software/` | Vacation Rental Reservation Software \| Booking Management | Vacation Rental Reservation & Booking Software Guide | no |
| `/vacation-rental-revenue-management-software/` | Vacation Rental Revenue Management Software \| 2026 Guide | Vacation Rental Revenue Management: Metrics & Strategy | no |
| `/vacation-rental-task-management-software/` | Vacation Rental Task Management Software \| Operations Tasks | Vacation Rental Task Management Software for Turnovers & Teams | no |

### Meta descriptions (after)

| URL | Description |
|---|---|
| `/airbnb-pms-integration/` | What an Airbnb PMS integration syncs, how API connections differ from iCal calendar sync, and what to verify before connecting a PMS or channel manager. |
| `/airbnb-property-management-software/` | What an Airbnb PMS does, the features to compare, Airbnb-only vs multi-channel setups and how to choose Airbnb management software by portfolio size. |
| `/airbnb-software-stack/` | Airbnb software for hosts: which tools to use at 1, 2–4, 5, 10, 20, 50 and 100+ properties, from lean setups to PMS-led stacks. |
| `/best-airbnb-management-software/` | Best Airbnb management software by portfolio size: what to compare in channel connectivity, messaging, automation, cleaning workflows, cost and PMS fit. |
| `/best-vacation-rental-software/` | How to compare the best vacation rental software: our criteria, a PMS and channel manager evaluation matrix, portfolio-size guidance and a shortlist process. |
| `/dynamic-pricing-software-for-vacation-rentals/` | Dynamic pricing software for vacation rentals: how it works, signals to evaluate, tool vs PMS workflow and how to choose a vacation rental pricing tool. |
| `/guesty-alternative/` | Looking for a Guesty alternative? A neutral framework to compare vacation rental PMS options by portfolio fit, workflows, cost and migration risk. |
| `/` | Guides, comparisons and decision tools for vacation rental software: PMS, channel managers, Airbnb and Vrbo integrations, pricing, automation and accounting. |
| `/pms-vs-channel-manager/` | PMS vs channel manager for vacation rentals: what each does, where they overlap, a side-by-side matrix and how to decide whether you need both. |
| `/switch-vacation-rental-pms/` | Planning to switch vacation rental PMS? Use this migration checklist for reservations, channels, property data, turnovers, teams, reporting and risk. |
| `/vacation-rental-accounting-software/` | Vacation rental accounting software and payment processing: PMS-to-accounting handoffs, expenses, owner reporting, guest payments and what to ask vendors. |
| `/vacation-rental-automation-software/` | Vacation rental automation explained: workflows to automate, software vs automation services, short-term rental automation maps and what to compare. |
| `/vacation-rental-channel-manager/` | How a vacation rental channel manager works, API vs iCal, key features to compare, and whether you need one separate from your PMS. |
| `/vacation-rental-management-software/` | Vacation rental software explained: PMS, channel manager, pricing, automation and accounting tools, how they fit together and how to choose by portfolio size. |
| `/vacation-rental-pms-for-20-properties/` | Compare vacation rental PMS software for a 20-property portfolio: the reservation, turnover, team, expense and performance workflows growing teams need. |
| `/vacation-rental-reservation-software/` | Vacation rental reservation and booking software: what a booking system manages, direct vs OTA bookings, key fields and how it connects to calendars and payments. |
| `/vacation-rental-revenue-management-software/` | Vacation rental revenue management: ADR, occupancy and RevPAR, how revenue strategy differs from dynamic pricing tools and what to compare in software. |
| `/vacation-rental-task-management-software/` | Vacation rental task management software: assign turnovers and operational tasks, track status and connect tasks to reservations and automation. |

### New pages: title and description

| URL | Title | Description |
|---|---|---|
| `/airbnb-integrations/` | Airbnb Integrations: PMS, Pricing, Accounting & Automation | Airbnb integrations explained: PMS, channel manager, pricing, messaging, accounting, automation and smart-lock tools, and how API and iCal connections differ. |
| `/vacation-rental-pms/` | Vacation Rental PMS: Software, Features & How to Choose | What a vacation rental PMS is, what it does, how it differs from a channel manager, and how to choose by portfolio size, channels and workflow. |
| `/vrbo-channel-manager/` | VRBO Channel Manager: Rates, Availability & Reservations | How a Vrbo channel manager syncs rates, availability and reservations, API vs iCal connections, PMS workflows and what to verify before you connect. |

## Facts that need human verification

- **Vrbo and Airbnb connectivity statements** on `/vrbo-channel-manager/`, `/airbnb-integrations/` and `/airbnb-pms-integration/` paraphrase Vrbo and Airbnb help material as summarized in search results on 2026-10-01. The environment blocked direct access to `help.vrbo.com` and `airbnb.com`, so those pages were not read in full. Open the listed source URLs and confirm the wording (Vrbo two-way connections can include rates, availability, guest data and content; Airbnb iCal sync refreshes periodically; Airbnb offers an API for authorized software partners).
- No vendor partner status (Vrbo Preferred Connectivity Partner, Airbnb partner programs) is claimed anywhere.
- The commercial relationship with Avrenor Stays is still undocumented in the repo; the new pages label Avrenor content as a product example and make no independence claim.
- `www` vs apex, HTTP → HTTPS and domain-level redirects are controlled in the Vercel domain settings and could not be verified from the repository. Check that exactly one host serves the site and that `www` 301-redirects to the canonical host.
- Page dates: `datePublished` for new pages is 2026-10-01; `dateModified` was set to 2026-10-01 on pages whose content changed.

## GEO / AI-search changes

- Every priority page opens with a standalone 40–70 word answer block (already the `speakable` target), followed by key takeaways.
- Question-style headings, comparison tables (PMS vs channel manager, API vs iCal, tool categories), ordered workflows and decision trees were added as extractable passages.
- Visible FAQ blocks now match FAQPage JSON-LD on all pages that carry it.
- Visible "Last reviewed" dates and labeled source sections where external facts appear.
- Consistent entity vocabulary: PMS, channel manager, Airbnb, Vrbo, system of record. Hub pages link down to spokes and spokes link up.
- `llms.txt` lists the canonical hubs.

## Remaining opportunities

- Confirm Bookipro and the Polish PriceLabs query before building anything.
- Once Search Console data for this property is connected, re-score with position and CTR and choose pages for deeper rewrites.
- Add primary-source citations to the other Category A pages in priority order.
- Verified individual integration pages only where the relationship is real and demand exists.
- An expert reviewer and editorial process, per `docs/expert-review-audit.md`, before any reviewer attribution.
