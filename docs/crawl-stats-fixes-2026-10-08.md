# Crawl Stats fixes — October 8, 2026

Internal document (excluded from deployment by `.vercelignore`).

## Done in the repo
- `/favicon.ico` was a 404 (4 hits in GSC Crawl Stats). Added `favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png` at the site root and a `<link rel="icon">` set on all 77 served pages via `scripts/seo-codemod.mjs` (idempotent).
- `www.vacationrentalpms.com` appears nowhere in the repo (grep = 0). Internal links are root-relative, canonicals/sitemap/robots are apex. The repo cannot cause www crawling.
- `/airbnb-software-for-2-5-properties/` already 301s to `/airbnb-software-for-2-4-properties/` in `vercel.json`, and no page links to it.

## Needs the Vercel dashboard (not changeable from the repo)
- Project Settings → Domains: `www.vacationrentalpms.com` must be set to redirect (301/308) to `vacationrentalpms.com`, and `vacationrentalpms.com` must be the production domain with no redirect back to www. A host rule in `vercel.json` was removed in 35f012a because it can loop if the apex redirects to www.
- Check the Sept 21–22 www 404s in the deployment/runtime logs for that window.

## Verify after deploy
    curl -sI http://www.vacationrentalpms.com/ https://www.vacationrentalpms.com/ http://vacationrentalpms.com/   # single 301 -> https://vacationrentalpms.com/
    curl -sI https://vacationrentalpms.com/favicon.ico                                                          # 200
Then resubmit the sitemap in GSC and re-check Crawl Stats in 7–14 days.
