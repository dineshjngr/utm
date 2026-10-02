import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { videos } from '../src/data/videos.js';

const root = resolve(import.meta.dirname, '..');

test('Watch pages expose a playable primary video and matching discovery metadata', () => {
  const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
  for (const video of videos) {
    const canonical = `https://utmcraft.com${video.watchPath}`;
    const html = readFileSync(join(root, 'landing-pages', video.watchPath, 'index.html'), 'utf8');
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const schema = graph.find(item => item['@type'] === 'VideoObject');
    const page = graph.find(item => item['@type'] === 'WebPage');
    assert.equal(page.mainEntity['@id'], schema['@id']);
    assert.equal(schema.contentUrl, `https://utmcraft.com${video.contentPath}`);
    assert.equal(schema.thumbnailUrl[0], `https://utmcraft.com${video.thumbnailPath}`);
    assert.ok(!schema.embedUrl, 'An MP4 file must not be described as an embeddable player URL');
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`));
    assert.ok(html.includes(`poster="${video.thumbnailPath}"`));
    assert.ok(html.includes(`<source src="${video.contentPath}" type="video/mp4">`));
    assert.equal((html.match(/<video\b/g) || []).length, 1);
    assert.ok(html.indexOf('<video ') < html.indexOf('class="video-watch-credit"'));
    for (const asset of [video.contentPath, video.thumbnailPath]) {
      assert.ok(existsSync(join(root, 'public', asset)), `Missing media asset: ${asset}`);
    }
    const entry = sitemap.match(/<url>[\s\S]*?<\/url>/g).find(item => item.includes(`<loc>${canonical}</loc>`));
    assert.ok(entry, 'Sitemap must use the canonical watch page URL');
    assert.ok(entry.includes(`<video:content_loc>${schema.contentUrl}</video:content_loc>`));
    assert.ok(entry.includes(`<video:thumbnail_loc>${schema.thumbnailUrl[0]}</video:thumbnail_loc>`));
    assert.ok(entry.includes(`<video:publication_date>${schema.uploadDate}</video:publication_date>`));
    const article = readFileSync(join(root, 'blog/posts', `${video.articleSlug}.html`), 'utf8');
    assert.ok(article.includes(`href="${video.watchPath}"`), 'The article must link to the watch page');
    if (existsSync(join(root, 'dist'))) {
      assert.ok(existsSync(join(root, 'dist', video.watchPath, 'index.html')), 'Watch page must resolve at its canonical production route');
    }
  }
});
