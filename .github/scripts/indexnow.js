#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const https = require('https');

const HOST = 'vacationrentalpms.com';
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log('INDEXNOW_KEY not set — skipping IndexNow submission.');
  process.exit(0);
}

// Changed files between last two commits
let diff;
try {
  diff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' }).trim();
} catch {
  // First commit or shallow clone — submit nothing
  console.log('Could not diff commits, skipping.');
  process.exit(0);
}

const urls = [];
for (const file of diff.split('\n')) {
  if (!file.endsWith('.html')) continue;
  // pricing/index.html  -> https://vacationrentalpms.com/pricing/
  // index.html          -> https://vacationrentalpms.com/
  let path = file.replace(/\/index\.html$/, '/').replace(/^index\.html$/, '');
  urls.push(`https://${HOST}/${path}`);
}

if (urls.length === 0) {
  console.log('No HTML changes — nothing to submit to IndexNow.');
  process.exit(0);
}

console.log('Submitting to IndexNow:', urls);

const body = JSON.stringify({ host: HOST, key: KEY, urlList: urls });

const req = https.request(
  {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
    },
  },
  (res) => {
    console.log(`IndexNow response: ${res.statusCode}`);
    if (res.statusCode >= 400) process.exit(1);
  }
);

req.on('error', (err) => {
  console.error('IndexNow request failed:', err.message);
  process.exit(1);
});

req.write(body);
req.end();
