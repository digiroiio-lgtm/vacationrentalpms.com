# Expert Review and Industry Authority Audit

Audit date: 2026-09-22  
Scope: every existing HTML route in the repository

## Decision

**EXPERT REVIEWER REQUIRED — NOT YET IMPLEMENTED**

No reviewer profile, visible “Reviewed by” attribution, expert quotation or `reviewedBy` structured data has been added. The available candidate information for Sezer Yıldırır establishes a real person and LinkedIn profile, but does not establish vacation-rental operations, PMS implementation, multi-property management or a completed page-level review. Publishing him as a PMS expert would therefore be unsupported.

## Current trust and authority findings

- All 78 HTML routes were inventoried and classified in `content-provenance.json`.
- 64 decision-support routes are Category A: expert review is recommended before an expert attribution is displayed.
- 7 lower-risk explanatory routes are Category B: organizational author and editorial/source checks are sufficient.
- 7 hub, commercial or redirect routes are Category C: no expert review is needed.
- Article pages use VacationRentalPMS.com as the organizational author. A stable Organization `@id` now connects author and publisher references.
- Five vendor comparison pages previously lacked Article schema and primary-source citations.
- “Independent discovery” appeared sitewide while the site prominently promotes Avrenor Stays. Because the underlying commercial relationship is not documented in the repository, the unsupported independence wording was replaced with neutral discovery/decision-support wording.
- No public editorial-policy, review-policy or evidence-methodology page was created because the corresponding repeatable operating process is not yet evidenced.

## Category logic

### A. Expert review recommended

This class includes best-software pages, portfolio-size recommendations, PMS comparisons and alternatives, switching/migration guides, integrations, stack-replacement pages, pricing/value analysis and operational workflow recommendations. These pages make material fit, scale, migration, workflow or purchasing judgments.

The exact 64-URL list is the `A_expert_review_recommended` array in `content-provenance.json`.

### B. Author or editorial review sufficient

These seven pages are primarily explanatory or vendor-specific and do not need an expert badge when factual claims are checked:

- `/avrenor-stays-pricing/`
- `/guides/what-is-vacation-rental-pms/`
- `/vacation-rental-automation-software/`
- `/vacation-rental-calendar-software/`
- `/vacation-rental-guest-messaging-software/`
- `/vacation-rental-reservation-software/`
- `/vacation-rental-task-management-software/`

### C. No expert review needed

These seven routes are a homepage, navigation/category hubs, a commercial pricing page or redirect stubs:

- `/`
- `/compare/`
- `/guides/`
- `/pricing/`
- `/airbnb-software-for-2-5-properties/` (redirect)
- `/guides/pms-vs-channel-manager/` (redirect)
- `/vacation-rental-pricing-software/` (redirect)

## Reviewer qualification criteria

A reviewer must be a real, identifiable person with publicly verifiable experience in at least one relevant area: vacation-rental operations, short-term rental management, PMS implementation or migration, multi-property operations, channel/OTA management, revenue management, guest operations, property-management technology or operational software implementation.

Before publication, retain:

1. A verified professional profile or company biography.
2. The precise title that the evidence supports, without inflated specialist language.
3. A written relationship disclosure with VacationRentalPMS.com.
4. A dated page-level review record listing the material claims reviewed.
5. Reviewer approval of the final published version or a recorded list of accepted changes.

## What a completed expert review must cover

For Category A pages, the review record should address the claims that apply: portfolio-size fit, operating assumptions, automation, channel implications, owner reporting, permissions, revenue workflows, accounting handoffs, integrations, migration complexity, scalability, limitations and trade-offs.

The reviewer provides operational interpretation. Primary vendor sources establish whether a product feature or price exists.

## Evidence weaknesses and fixes

| Weakness | Status | Required next action |
| --- | --- | --- |
| Five comparison pages had no Article entity | Fixed | Keep Article author/publisher/date/source metadata current |
| Comparison claims had no visible primary-source section | Fixed for five core comparison pages | Recheck official sources whenever material claims change |
| Sitewide “independent” language was not supported by a documented relationship disclosure | Fixed in code | Publisher must document and disclose the exact Avrenor commercial/ownership relationship |
| No repeatable expert-review workflow exists | Open gap | Create review brief, claim checklist, sign-off record and refresh cadence |
| No qualified reviewer has been verified | Open gap | Verify a candidate against the criteria above before creating `/experts/[name]/` |
| Many non-comparison product claims remain uncited | Open gap | Add visible primary-source citations to Category A pages in priority order |
| Pricing and time-sensitive capability claims lack a refresh ledger | Open gap | Record source URL, checked date, claim owner and next review date |

## Implemented schema and component architecture

- Organization schema now uses `https://vacationrentalpms.com/#organization` as a stable entity identifier.
- Existing Article author and publisher properties reference that identifier.
- The five core comparison pages now include Article schema with publisher, author, dates and primary-source citations.
- No Person or `reviewedBy` entity is emitted.
- `script.js` contains a dormant, guarded attribution renderer. It renders only when a page deliberately supplies a completed review record with all required fields and an attribution target.
- `scripts/validate-trust.mjs` fails if visible review language and structured data disagree, if a review record is incomplete, or if a reviewer profile does not exist.

## TRUST PROCESS GAP

Do not publish `/editorial-policy/`, `/review-policy/` or `/evidence-methodology/` yet. First create and use the following operating process:

1. Assign a content owner and reviewer.
2. Export the page’s factual claims and recommendations into a review checklist.
3. Verify product facts against official documentation and record URLs/check dates.
4. Label factual statements, vendor claims, editorial analysis and expert interpretation.
5. Have the expert assess only the operational interpretation within their demonstrated scope.
6. Record requested corrections and final approval against the exact page revision.
7. Publish visible attribution, the expert profile and matching structured data together.
8. Set a refresh cadence for pricing, integrations and other changeable product facts.
9. Record corrections and commercial relationship changes.

Only after this process has been used on real pages should it be described publicly as site methodology.
