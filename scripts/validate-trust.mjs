import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const redirects = new Set(JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).redirects.map((item) => item.source));
const provenance = JSON.parse(fs.readFileSync(path.join(root, 'content-provenance.json'), 'utf8'));
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

function jsonLd(html, file) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return blocks.map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${path.relative(root, file)} has invalid JSON-LD: ${error.message}`);
      return null;
    }
  }).filter(Boolean);
}

const pages = walk(root).filter((file) => file.endsWith('index.html'));
const routes = new Set(pages.map(routeFor));
const classified = Object.values(provenance.classifications).flat();

if (new Set(classified).size !== classified.length) failures.push('content-provenance.json classifies at least one route more than once.');
for (const route of routes) if (!classified.includes(route)) failures.push(`Unclassified route: ${route}`);
for (const route of classified) if (!routes.has(route)) failures.push(`Classification references a missing route: ${route}`);

for (const file of pages) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, 'utf8');
  const schema = jsonLd(html, file);
  const schemaText = JSON.stringify(schema);
  const hasReviewedBy = /"reviewedBy"/i.test(schemaText);
  const hasVisibleReview = /Reviewed by/i.test(html);
  const recordMatch = html.match(/<script[^>]+id=["']expert-review-record["'][^>]*>([\s\S]*?)<\/script>/i);

  if (/Independent vacation rental|independent discovery resource|We do not accept payment for rankings/i.test(html)) {
    failures.push(`${route} contains an unsupported independence/ranking claim.`);
  }

  if (!redirects.has(route)) {
    const organization = schema.find((item) => item['@type'] === 'Organization');
    if (!organization || organization['@id'] !== provenance.publisher.id) {
      failures.push(`${route} is missing the canonical Organization entity ID.`);
    }
  }

  if (hasReviewedBy !== hasVisibleReview) {
    failures.push(`${route} has mismatched visible review attribution and reviewedBy schema.`);
  }

  if (hasReviewedBy || hasVisibleReview || recordMatch) {
    if (!recordMatch) {
      failures.push(`${route} claims expert review without #expert-review-record.`);
      continue;
    }
    let record;
    try {
      record = JSON.parse(recordMatch[1]);
    } catch (error) {
      failures.push(`${route} has an invalid expert review record: ${error.message}`);
      continue;
    }
    const required = [
      record.status === 'completed',
      record.reviewId,
      record.reviewedAt,
      record.pageRevision,
      record.reviewScope,
      record.reviewer?.name,
      record.reviewer?.title,
      record.reviewer?.profileUrl,
      Array.isArray(record.sourceChecks) && record.sourceChecks.length > 0
    ];
    if (required.some((value) => !value)) failures.push(`${route} has an incomplete expert review record.`);
    if (!/class=["'][^"']*expert-review-attribution/.test(html)) failures.push(`${route} lacks a visible .expert-review-attribution block.`);
    if (record.reviewer?.profileUrl?.startsWith('/experts/')) {
      const reviewerPath = path.join(root, record.reviewer.profileUrl.replace(/^\//, ''), 'index.html');
      if (!fs.existsSync(reviewerPath)) failures.push(`${route} references a missing reviewer profile: ${record.reviewer.profileUrl}`);
    }
  }
}

const comparisonRoutes = Object.keys(provenance.primarySources)
  .filter((key) => key !== 'avrenor')
  .map((key) => `/compare/${key}-vs-avrenor/`);

for (const route of comparisonRoutes) {
  const file = route === '/' ? path.join(root, 'index.html') : path.join(root, route.slice(1), 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const schema = jsonLd(html, file);
  if (!schema.some((item) => item['@type'] === 'Article')) failures.push(`${route} is missing Article schema.`);
  if (!html.includes('class="evidence-panel"')) failures.push(`${route} is missing its visible primary-source panel.`);
  const vendor = route.match(/^\/compare\/([^/]+)-vs-avrenor\/$/)?.[1];
  for (const key of [vendor, 'avrenor']) {
    const source = provenance.primarySources[key]?.url;
    if (!source || !html.includes(`href="${source}"`)) failures.push(`${route} is missing the official ${key} source.`);
  }
}

if (provenance.expertReview.reviewedRoutes.length !== 0 || provenance.expertReview.publicReviewerProfiles.length !== 0) {
  failures.push('Provenance declares a reviewer or reviewed route although no verified review relationship exists.');
}

if (failures.length) {
  console.error(`Trust validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Trust validation passed: ${pages.length} HTML routes classified; no unsupported expert-review claims found.`);
