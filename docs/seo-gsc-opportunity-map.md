# GSC query → URL opportunity map

Internal planning document (excluded from deployment by `.vercelignore`). Last updated 2026-10-01.

## Data and method

- Source: the 83 first-party Search Console queries supplied with the SEO brief (impressions only). The brief mentions a 227-query dataset; the rest were not supplied, and the property is not connected to the Supermetrics Search Console account, so no position or CTR data was available.
- Opportunity score (0–100) = `100 × sqrt(impressions / 84) × commercial intent × topical relevance × conversion value`. The current-ranking-opportunity factor was held at 1.0 for every query because no position data exists. Intent, relevance and conversion values are editorial judgments per cluster (0.3–1.0), not measurements.
- Treat the score as a prioritization aid only. Re-score with real position and CTR once Search Console data for this property is available.

| Query | Impr. | Target URL | Current URL | Action | Score | Notes |
|---|---:|---|---|---|---:|---|
| vrbo channel manager | 84 | /vrbo-channel-manager/ | /vrbo-pms-integration/ (301 → target) | CREATE + MERGE | 90 | P0. Existing 155-word integration page merged; no official-integration claim. |
| vacation rental pms | 68 | /vacation-rental-pms/ | homepage (re-scoped) | CREATE (pillar) + re-scope homepage | 81 | P0. One URL owns the head term; homepage became the site-wide resource hub. |
| vacation rental channel manager | 52 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 63 | P0. One canonical channel-manager URL for all variants. |
| airbnb pms | 37 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 60 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb management software | 35 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 58 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb property management software | 24 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 48 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb integrations | 36 | /airbnb-integrations/ | none | CREATE | 42 | P0 hub; spoke /airbnb-pms-integration/ keeps API-vs-iCal detail. |
| property management system for airbnb | 13 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 35 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| pms airbnb | 12 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 34 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| short term rental pms | 12 | /vacation-rental-pms/ | homepage (re-scoped) | CREATE (pillar) + re-scope homepage | 34 | P0. One URL owns the head term; homepage became the site-wide resource hub. |
| pms for vacation rentals | 12 | /vacation-rental-pms/ | homepage (re-scoped) | CREATE (pillar) + re-scope homepage | 34 | P0. One URL owns the head term; homepage became the site-wide resource hub. |
| pms channel manager | 20 | /pms-vs-channel-manager/ | /pms-vs-channel-manager/ | OPTIMIZE | 31 | P1. Matrix, decision tree and setups section; no second page to avoid cannibalization. |
| property management software for airbnb | 9 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 29 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb booking management software | 9 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 29 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| property management software airbnb | 8 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 28 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| best vacation rental software | 13 | /best-vacation-rental-software/ | same | OPTIMIZE | 25 | P1. Methodology and criteria page; no vendor rankings. |
| vacation rental software | 13 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 25 | P1. User decision: no new /vacation-rental-software/ URL. |
| best airbnb management software | 12 | /best-airbnb-management-software/ | same | OPTIMIZE | 24 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| channel manager pms | 12 | /pms-vs-channel-manager/ | /pms-vs-channel-manager/ | OPTIMIZE | 24 | P1. Matrix, decision tree and setups section; no second page to avoid cannibalization. |
| vacation rental channel manager software | 7 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 23 | P0. One canonical channel-manager URL for all variants. |
| vacation rental property management software | 10 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 22 | P1. User decision: no new /vacation-rental-software/ URL. |
| channel manager and pms | 10 | /pms-vs-channel-manager/ | /pms-vs-channel-manager/ | OPTIMIZE | 22 | P1. Matrix, decision tree and setups section; no second page to avoid cannibalization. |
| property management software for airbnb hosts | 5 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 22 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb crm | 5 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 22 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| best pms for vacation rentals | 7 | /guides/best-vacation-rental-pms/ | /guides/best-vacation-rental-pms/ | KEEP (internal links from pillar) | 21 | Pillar links here for "best pms" intent. |
| vacation rental channel managers | 6 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 21 | P0. One canonical channel-manager URL for all variants. |
| vacation rental channel management software | 5 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 20 | P0. One canonical channel-manager URL for all variants. |
| channel manager for vacation rentals | 5 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 20 | P0. One canonical channel-manager URL for all variants. |
| holiday rental channel manager | 5 | /vacation-rental-channel-manager/ | /vacation-rental-channel-manager/ | OPTIMIZE (major rewrite) | 20 | P0. One canonical channel-manager URL for all variants. |
| airbnb management software features | 4 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 20 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| pms for airbnb | 4 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 20 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| channel manager vrbo | 4 | /vrbo-channel-manager/ | /vrbo-pms-integration/ (301 → target) | CREATE + MERGE | 20 | P0. Existing 155-word integration page merged; no official-integration claim. |
| vacation pms | 4 | /vacation-rental-pms/ | homepage (re-scoped) | CREATE (pillar) + re-scope homepage | 20 | P0. One URL owns the head term; homepage became the site-wide resource hub. |
| airbnb software | 21 | /airbnb-software-stack/ | /airbnb-software-stack/ | OPTIMIZE | 19 | P0/P1. Generic "airbnb software" intent → tools by portfolio size. |
| vacation rental reservation system | 12 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 19 | P1. "Booking system" terminology added; no separate page. |
| vacation rental operations software | 7 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 19 | P1. User decision: no new /vacation-rental-software/ URL. |
| holiday rental management | 6 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 17 | P1. User decision: no new /vacation-rental-software/ URL. |
| vacation management system | 3 | /vacation-rental-pms/ | homepage (re-scoped) | CREATE (pillar) + re-scope homepage | 17 | P0. One URL owns the head term; homepage became the site-wide resource hub. |
| airbnb host management software | 3 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 17 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| advantages of an airbnb management software | 3 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 17 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb property management system | 3 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 17 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| airbnb management system | 3 | /airbnb-property-management-software/ | /airbnb-property-management-software/ | OPTIMIZE (major rewrite) | 17 | P0. Single Airbnb PMS URL; no /airbnb-pms/ or /airbnb-management-software/ duplicates. |
| vacation rental revenue management | 9 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 16 | P1. Pricing vs revenue strategy intents separated. |
| vacation rental software airbnb | 5 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 16 | P1. User decision: no new /vacation-rental-software/ URL. |
| best vacation rental management software | 5 | /best-vacation-rental-software/ | same | OPTIMIZE | 16 | P1. Methodology and criteria page; no vendor rankings. |
| best software for airbnb | 5 | /best-airbnb-management-software/ | same | OPTIMIZE | 16 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| vacation rental property software | 5 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 16 | P1. User decision: no new /vacation-rental-software/ URL. |
| property management system and channel manager | 5 | /pms-vs-channel-manager/ | /pms-vs-channel-manager/ | OPTIMIZE | 16 | P1. Matrix, decision tree and setups section; no second page to avoid cannibalization. |
| pms and channel manager | 5 | /pms-vs-channel-manager/ | /pms-vs-channel-manager/ | OPTIMIZE | 16 | P1. Matrix, decision tree and setups section; no second page to avoid cannibalization. |
| rental reservation software | 7 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 15 | P1. "Booking system" terminology added; no separate page. |
| vacation rental automation services | 11 | /vacation-rental-automation-software/ (+ /vacation-rental-task-management-software/) | same | OPTIMIZE | 14 | P1. Software-vs-services section addresses "automation services". |
| property management software vacation rentals | 4 | /vacation-rental-management-software/ (retitled "Vacation Rental Software") | /vacation-rental-management-software/ | OPTIMIZE | 14 | P1. User decision: no new /vacation-rental-software/ URL. |
| best airbnb automation software | 4 | /best-airbnb-management-software/ | same | OPTIMIZE | 14 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| best airbnb software | 4 | /best-airbnb-management-software/ | same | OPTIMIZE | 14 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| top vacation rental software | 4 | /best-vacation-rental-software/ | same | OPTIMIZE | 14 | P1. Methodology and criteria page; no vendor rankings. |
| best pms for short term rentals | 3 | /guides/best-vacation-rental-pms/ | /guides/best-vacation-rental-pms/ | KEEP (internal links from pillar) | 14 | Pillar links here for "best pms" intent. |
| vacation rental performance management | 6 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 13 | P1. Pricing vs revenue strategy intents separated. |
| vacation rental booking system | 5 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 12 | P1. "Booking system" terminology added; no separate page. |
| vacation rental pricing tool | 5 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 12 | P1. Pricing vs revenue strategy intents separated. |
| dynamic pricing for vacation rentals | 5 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 12 | P1. Pricing vs revenue strategy intents separated. |
| best airbnb property management software | 3 | /best-airbnb-management-software/ | same | OPTIMIZE | 12 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| best software for airbnb hosts | 3 | /best-airbnb-management-software/ | same | OPTIMIZE | 12 | P0/P1. Airbnb-specific "best" intent; links to Airbnb PMS and integrations to avoid overlap. |
| airbnb booking software | 5 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 11 | Booking-software section links to the Airbnb PMS page. |
| vacation rental pricing management | 4 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 11 | P1. Pricing vs revenue strategy intents separated. |
| vacation rental dynamic pricing | 4 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 11 | P1. Pricing vs revenue strategy intents separated. |
| guesty alternative | 3 | /guesty-alternative/ | /guesty-alternative/ | OPTIMIZE | 11 | P2. Neutral framework; no new plural URL. |
| software for airbnb | 6 | /airbnb-software-stack/ | /airbnb-software-stack/ | OPTIMIZE | 10 | P0/P1. Generic "airbnb software" intent → tools by portfolio size. |
| reservation software for vacation rentals | 3 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 10 | P1. "Booking system" terminology added; no separate page. |
| vacation rentals booking system | 3 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 10 | P1. "Booking system" terminology added; no separate page. |
| vacation rental reservation software | 3 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 10 | P1. "Booking system" terminology added; no separate page. |
| vacation rentals booking software | 3 | /vacation-rental-reservation-software/ | same | OPTIMIZE | 10 | P1. "Booking system" terminology added; no separate page. |
| vacation rental pricing software | 3 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 10 | P1. Pricing vs revenue strategy intents separated. |
| dynamic pricing software for vacation rentals | 3 | /dynamic-pricing-software-for-vacation-rentals/ (pricing); /vacation-rental-revenue-management-software/ (revenue) | same; /vacation-rental-pricing-software/ stays 301 | OPTIMIZE | 10 | P1. Pricing vs revenue strategy intents separated. |
| vacation rental automation | 5 | /vacation-rental-automation-software/ (+ /vacation-rental-task-management-software/) | same | OPTIMIZE | 9 | P1. Software-vs-services section addresses "automation services". |
| vacation rental software market | 10 | /vacation-rental-management-software/ | same | OPTIMIZE | 8 | Market section is neutral and carries no statistics. |
| task management for vacation rentals | 4 | /vacation-rental-automation-software/ (+ /vacation-rental-task-management-software/) | same | OPTIMIZE | 8 | P1. Software-vs-services section addresses "automation services". |
| short term rental automation | 3 | /vacation-rental-automation-software/ (+ /vacation-rental-task-management-software/) | same | OPTIMIZE | 7 | P1. Software-vs-services section addresses "automation services". |
| vacation rental software pricing | 6 | /vacation-rental-management-software/ | same | OPTIMIZE | 6 | Market section is neutral and carries no statistics. |
| vacation rental accounting | 5 | /vacation-rental-accounting-software/ | same | OPTIMIZE | 6 | P2. Payments covered as a section; no standalone payment-processing page. |
| vacation rental payment processing | 5 | /vacation-rental-accounting-software/ | same | OPTIMIZE | 6 | P2. Payments covered as a section; no standalone payment-processing page. |
| vacation rental accounting software | 4 | /vacation-rental-accounting-software/ | same | OPTIMIZE | 5 | P2. Payments covered as a section; no standalone payment-processing page. |
| vacation rental calendar | 3 | /vacation-rental-calendar-software/ | same | KEEP | 4 | Existing page matches. |
| bookipro pms integration | 14 | — | none | NO ACTION | 3 | Needs owner input: confirm what Bookipro is and that a real integration exists before any page. Do not claim an integration. |

## Cluster decisions (avoid cannibalization)

- **One URL per intent.** Airbnb PMS/management → `/airbnb-property-management-software/`; best Airbnb → `/best-airbnb-management-software/`; generic Airbnb software → `/airbnb-software-stack/`; Airbnb tools/connections → `/airbnb-integrations/`.
- **PMS pillar vs homepage:** `/vacation-rental-pms/` owns the head term; the homepage was re-scoped to a brand/resource hub that links into it.
- **Software category:** no new `/vacation-rental-software/` URL (user decision); `/vacation-rental-management-software/` was retitled and re-scoped.
- **Not created:** `/airbnb-pms/`, `/airbnb-management-software/`, `/vacation-rental-dynamic-pricing/`, `/vacation-rental-payment-processing/`, `/guesty-alternatives/`, `/vacation-rental-software/`, integration pages for unverified partners.
- **Merged:** `/vrbo-pms-integration/` → 301 → `/vrbo-channel-manager/`.
- **Needs input:** `bookipro pms integration` (14 impressions) and `integracja pricelabs z pms` (Polish) need a business decision before any page is built.
