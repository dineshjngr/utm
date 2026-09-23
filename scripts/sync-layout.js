import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { renderHeader, renderFooter } from './shared-layout.js';

const root = join(import.meta.dirname, '..');
const headerPattern = /<header class="app-header">[\s\S]*?<\/header>/;
const footerPattern = /<footer class="app-footer">[\s\S]*?<\/footer>/;
const excluded = new Set(['.git', '.codex', '.agents', 'node_modules', 'dist']);
const checkOnly = process.argv.includes('--check');

function* htmlFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield fullPath;
  }
}

function activeNav(path) {
  if (path === 'index.html' || path.includes('campaign-url-builder/') || path.includes('bulk-utm-builder/') || path.includes('utm-builder/')) return 'builder';
  if (path.includes('utm-checker/')) return 'checker';
  if (path.startsWith('blog/') || path.includes('utm-parameters/') || path.includes('utm-naming-conventions/') || path.includes('ga4-default-channel-grouping/')) return 'guides';
  return '';
}

const changed = [];
let checked = 0;
for (const file of htmlFiles(root)) {
  const before = readFileSync(file, 'utf8');
  const path = relative(root, file).replaceAll('\\', '/');
  if (path === 'blog/posts/index.html') continue; // Instant redirect, not a content page.
  checked++;
  if (!headerPattern.test(before) || !footerPattern.test(before)) {
    throw new Error(`Missing shared header or footer: ${path}`);
  }
  const app = before.includes('id="btn-shortcuts"');
  const after = before
    .replace(headerPattern, renderHeader(activeNav(path), { app }))
    .replace(footerPattern, renderFooter());
  if (after !== before) {
    if (!checkOnly) writeFileSync(file, after);
    changed.push(path);
  }
}

if (checkOnly && changed.length) {
  console.error(`Shared layout differs in ${changed.length} HTML files:\n${changed.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`${checkOnly ? 'Checked' : 'Synchronized'} shared header and footer across ${checked} content pages (${changed.length} ${checkOnly ? 'different' : 'updated'}).`);
}
