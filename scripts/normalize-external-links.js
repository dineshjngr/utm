import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

export function externalLinksInNewTabs(html) {
  return html.replace(/<a\b[^>]*>/gi, tag => {
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!href || !/^(https?:)?\/\//i.test(href)) return tag;
    let url;
    try { url = new URL(href, 'https://utmcraft.com/'); } catch { return tag; }
    if (['utmcraft.com', 'www.utmcraft.com'].includes(url.hostname)) return tag;
    const target = /\s+target\s*=\s*(["']).*?\1/i;
    tag = target.test(tag) ? tag.replace(target, ' target="_blank"') : tag.replace(/>$/, ' target="_blank">');
    const rel = /\s+rel\s*=\s*(["'])(.*?)\1/i;
    const tokens = new Set((tag.match(rel)?.[2] || '').split(/\s+/).filter(Boolean));
    tokens.add('noopener');
    const attr = ` rel="${[...tokens].join(' ')}"`;
    return rel.test(tag) ? tag.replace(rel, attr) : tag.replace(/>$/, `${attr}>`);
  });
}

function normalizeDirectory(directory) {
  let changed = 0;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'dist', 'drafts'].includes(entry.name)) continue;
    const file = join(directory, entry.name);
    if (entry.isDirectory()) changed += normalizeDirectory(file);
    else if (entry.name.endsWith('.html')) {
      const before = readFileSync(file, 'utf8');
      const after = externalLinksInNewTabs(before);
      if (after !== before) { writeFileSync(file, after); changed++; }
    }
  }
  return changed;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(`Updated external links across ${normalizeDirectory(resolve(import.meta.dirname, '..'))} HTML pages.`);
}
