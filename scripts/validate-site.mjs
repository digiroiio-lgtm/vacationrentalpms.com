import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirects = new Set(config.redirects.map((item) => item.source));
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFor(file) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  return relative === 'index.html' ? '/' : `/${relative.replace(/\/index\.html$/, '')}/`;
}

const pages = walk(root).filter((file) => file.endsWith('index.html'));
const routes = new Set(pages.map(routeFor));

for (const file of pages) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, 'utf8');
  if (!/^<!doctype html>/i.test(html)) failures.push(`${route} is missing an HTML doctype.`);
  if (!/<html[^>]+lang=["']en["']/i.test(html)) failures.push(`${route} is missing lang="en".`);
  if (!redirects.has(route)) {
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
    const expected = `https://vacationrentalpms.com${route}`;
    if (canonical !== expected) failures.push(`${route} canonical is ${canonical || 'missing'}; expected ${expected}.`);
  }

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split(/[?#]/)[0];
    if (/\.[a-z0-9]+$/i.test(clean)) {
      if (!fs.existsSync(path.join(root, clean.slice(1)))) failures.push(`${route} links to missing file ${clean}.`);
      continue;
    }
    const normalized = clean.endsWith('/') ? clean : `${clean}/`;
    if (!routes.has(normalized) && !redirects.has(normalized)) failures.push(`${route} links to missing route ${clean}.`);
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapRoutes = new Set([...sitemap.matchAll(/<loc>https:\/\/vacationrentalpms\.com([^<]*)<\/loc>/g)].map((match) => match[1] || '/'));
const expectedRoutes = new Set([...routes].filter((route) => !redirects.has(route)));
for (const route of expectedRoutes) if (!sitemapRoutes.has(route)) failures.push(`Sitemap is missing ${route}.`);
for (const route of sitemapRoutes) if (!expectedRoutes.has(route)) failures.push(`Sitemap contains missing or redirected route ${route}.`);

if (failures.length) {
  console.error(`Site validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site validation passed: ${pages.length} HTML routes, ${sitemapRoutes.size} canonical sitemap URLs and internal links checked.`);
