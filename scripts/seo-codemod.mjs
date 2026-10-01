// Sitewide SEO normalizer. Idempotent: safe to re-run after editing pages.
//   node scripts/seo-codemod.mjs          apply changes
//   node scripts/seo-codemod.mjs --check  report pages that would change (exit 1 if any)
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const check = process.argv.includes('--check');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirects = new Set(config.redirects.map((item) => item.source));

const NAV = [
  ['/vacation-rental-pms/', 'Vacation Rental PMS'],
  ['/vacation-rental-channel-manager/', 'Channel Manager'],
  ['/airbnb-integrations/', 'Integrations'],
  ['/best-vacation-rental-software/', 'Best Software'],
  ['/compare/', 'Compare'],
  ['/pricing/', 'Pricing'],
  ['/guides/', 'Guides']
];

const FOOTER = `<footer class="footer footer-expanded"><div class="container footer-grid"><div><a class="brand" href="/">VacationRentalPMS.com</a><p>Vacation rental software discovery and decision support.</p></div><div><strong>Core topics</strong><a href="/vacation-rental-pms/">Vacation Rental PMS</a><a href="/vacation-rental-channel-manager/">Vacation Rental Channel Manager</a><a href="/vrbo-channel-manager/">Vrbo Channel Manager</a><a href="/vacation-rental-management-software/">Vacation Rental Software</a><a href="/best-vacation-rental-software/">Best Vacation Rental Software</a></div><div><strong>Airbnb</strong><a href="/airbnb-property-management-software/">Airbnb PMS</a><a href="/best-airbnb-management-software/">Best Airbnb Management Software</a><a href="/airbnb-integrations/">Airbnb Integrations</a><a href="/airbnb-software-stack/">Airbnb Software by Portfolio</a></div><div><strong>Operations</strong><a href="/vacation-rental-reservation-software/">Reservation Software</a><a href="/dynamic-pricing-software-for-vacation-rentals/">Dynamic Pricing</a><a href="/vacation-rental-automation-software/">Automation</a><a href="/vacation-rental-accounting-software/">Accounting</a></div><div><strong>Decide</strong><a href="/pms-vs-channel-manager/">PMS vs Channel Manager</a><a href="/compare/">Compare PMS Software</a><a href="/guesty-alternative/">Guesty Alternative</a><a href="/pricing/">Pricing</a><a href="/guides/">All Guides</a></div></div><div class="container footer-bottom"><span>© <span id="year"></span> VacationRentalPMS.com</span></div></footer>`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (['.git', 'node_modules', 'dist', 'docs', 'scripts', '.github'].includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

const routeFor = (file) => {
  const rel = path.relative(root, file).split(path.sep).join('/');
  return rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '')}/`;
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function jsonLd(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
}

const visibleText = (html) => unesc(html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

function addFaq(html, route, notes) {
  const faq = jsonLd(html).find((b) => b['@type'] === 'FAQPage');
  if (!faq?.mainEntity?.length) return html;
  const text = visibleText(html);
  const missing = faq.mainEntity.filter((q) => !text.includes(q.name.slice(0, 40)));
  if (!missing.length) return html;
  if (/class=["']faq["']/.test(html)) {
    notes.push(`${route}: visible FAQ exists but ${missing.length} schema question(s) differ — fix by hand`);
    return html;
  }
  const items = faq.mainEntity.map((q) => `<details><summary>${esc(q.name)}</summary><p>${esc(q.acceptedAnswer.text)}</p></details>`).join('');
  const block = `<section class="faq-section" id="faq"><h2>Frequently asked questions</h2><div class="faq">${items}</div></section>`;
  if (/<div class="related"/.test(html)) return html.replace(/<div class="related"/, `${block}<div class="related"`);
  if (/<\/article>/.test(html)) return html.replace(/<\/article>/, `${block}</article>`);
  if (/<\/main>/.test(html)) return html.replace(/<\/main>/, `<section class="section"><div class="container narrow article">${block}</div></section></main>`);
  notes.push(`${route}: no insertion point for FAQ`);
  return html;
}

function addBreadcrumb(html, route, notes) {
  if (/class=["']breadcrumb["']/.test(html)) return html;
  const crumbs = jsonLd(html).find((b) => b['@type'] === 'BreadcrumbList');
  if (!crumbs || crumbs.itemListElement.length < 2) return html;
  const parts = crumbs.itemListElement.map((it, i, arr) => {
    const href = it.item.replace('https://vacationrentalpms.com', '');
    return i === arr.length - 1 ? esc(it.name) : `<a href="${href}">${esc(it.name)}</a>`;
  });
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join(' / ')}</nav>`;
  if (/<section class="guide-hero"><div class="container narrow">/.test(html)) {
    return html.replace(/(<section class="guide-hero"><div class="container narrow">)/, `$1${crumb}`);
  }
  if (/<article class="article">/.test(html)) return html.replace(/<article class="article">/, `<article class="article">${crumb}`);
  notes.push(`${route}: no breadcrumb insertion point`);
  return html;
}

function addSocial(html) {
  const title = unesc(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  const desc = unesc(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] || '').trim();
  const url = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (!title || !url) return html;
  const isArticle = jsonLd(html).some((b) => b['@type'] === 'Article');
  const tags = [
    ['og:title', title], ['og:description', desc], ['og:url', url],
    ['og:type', isArticle ? 'article' : 'website'], ['og:site_name', 'VacationRentalPMS.com']
  ].filter(([p]) => !new RegExp(`property=["']${p}["']`).test(html))
    .map(([p, c]) => `<meta property="${p}" content="${esc(c)}">`);
  for (const [n, c] of [['twitter:card', 'summary'], ['twitter:title', title], ['twitter:description', desc]]) {
    if (!new RegExp(`name=["']${n}["']`).test(html)) tags.push(`<meta name="${n}" content="${esc(c)}">`);
  }
  if (!/name=["']robots["']/.test(html)) tags.unshift('<meta name="robots" content="index,follow,max-image-preview:large">');
  if (!tags.length) return html;
  return html.replace(/(<link[^>]+rel=["']canonical["'][^>]*>)/i, `$1${tags.join('')}`);
}

function normalize(html, route, notes) {
  html = html.replace(/href="\/#(demo|compare)"/g, 'href="/compare/"');
  for (const r of config.redirects) {
    html = html.split(`href="${r.source}"`).join(`href="${r.destination}"`); // link straight to the destination, not through a 301
  }
  html = html.replace(/(<nav class="nav">)([\s\S]*?)(<\/nav>)/, (_m, open, inner, close) => {
    let button = inner.match(/<a class="button[^"]*"[^>]*>[\s\S]*?<\/a>/)?.[0] || '';
    if (/href="\/compare\/"/.test(button)) button = ''; // duplicate of the Compare link
    const links = NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
    return `${open}${links}${button}${close}`;
  });
  html = addSocial(html);
  html = addBreadcrumb(html, route, notes);
  html = addFaq(html, route, notes);
  if (/<footer[\s\S]*?<\/footer>/.test(html)) html = html.replace(/<footer[\s\S]*?<\/footer>/, FOOTER);
  else html = html.replace(/(<script src="[^"]*script\.js"><\/script>)?<\/body>/, `${FOOTER}$1</body>`);
  return html;
}

const notes = [];
const changed = [];
for (const file of walk(root).filter((f) => f.endsWith('index.html'))) {
  const route = routeFor(file);
  if (redirects.has(route)) continue; // redirect stubs are never served
  const before = fs.readFileSync(file, 'utf8');
  const after = normalize(before, route, notes);
  if (after !== before) {
    changed.push(route);
    if (!check) fs.writeFileSync(file, after);
  }
}
console.log(`${check ? 'Would change' : 'Changed'} ${changed.length} page(s).`);
for (const n of notes) console.log(`NOTE ${n}`);
if (check && changed.length) process.exit(1);
