import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { blogPosts, mergedBlogPostRedirects } from '../src/data/blog-posts.js';

const root = join(import.meta.dirname, '..');
const landingPages = join(root, 'landing-pages');
const routes = [];

function collectRoutes(directory, prefix = '') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const route = `${prefix}${entry.name}`;
    const nested = join(directory, entry.name);
    if (readdirSync(nested).includes('index.html')) routes.push(route);
    collectRoutes(nested, `${route}/`);
  }
}

collectRoutes(landingPages);

const redirects = [
  ['/about.html', '/about/'],
  ['/contact.html', '/contact/'],
  ['/blog/posts/', '/blog/'],
  ['/blog/posts/index.html', '/blog/'],
];

for (const route of routes.sort()) {
  redirects.push([`/landing-pages/${route}`, `/${route}/`]);
  redirects.push([`/landing-pages/${route}/`, `/${route}/`]);
  redirects.push([`/landing-pages/${route}/index.html`, `/${route}/`]);
}

for (const { slug } of blogPosts) {
  redirects.push([`/blog/${slug}`, `/${slug}/`]);
  redirects.push([`/blog/${slug}/`, `/${slug}/`]);
  redirects.push([`/blog/${slug}/index.html`, `/${slug}/`]);
  redirects.push([`/blog/posts/${slug}.html`, `/${slug}/`]);
}

for (const [oldSlug, destinationSlug] of Object.entries(mergedBlogPostRedirects)) {
  redirects.push([`/${oldSlug}`, `/${destinationSlug}/`]);
  redirects.push([`/${oldSlug}/`, `/${destinationSlug}/`]);
  redirects.push([`/blog/${oldSlug}`, `/${destinationSlug}/`]);
  redirects.push([`/blog/${oldSlug}/`, `/${destinationSlug}/`]);
  redirects.push([`/blog/${oldSlug}/index.html`, `/${destinationSlug}/`]);
  redirects.push([`/blog/posts/${oldSlug}.html`, `/${destinationSlug}/`]);
}

// Hostinger serves the production domain with Apache.
const apachePath = join(root, 'public', '.htaccess');
const apache = readFileSync(apachePath, 'utf8');
const startMarker = '# BEGIN GENERATED CANONICAL REDIRECTS';
const endMarker = '# END GENERATED CANONICAL REDIRECTS';
const start = apache.indexOf(startMarker);
const end = apache.indexOf(endMarker);
if (start < 0 || end < start) throw new Error('Missing canonical redirect markers in public/.htaccess');
const apacheRules = redirects.map(([source, destination]) => {
  const pattern = source.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return `RewriteRule ^${pattern}$ ${destination} [R=301,L]`;
});
const replacement = `${startMarker}\n${apacheRules.join('\n')}\n${endMarker}`;
writeFileSync(apachePath, apache.slice(0, start) + replacement + apache.slice(end + endMarker.length));
console.log(`Generated ${redirects.length} canonical redirects for Apache.`);
