import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { blogPosts, getCategoryById } from '../src/data/blog-posts.js';
import { blogCategories } from '../src/data/blog-categories.js';

const rootDir = path.resolve(import.meta.dirname, '..');

test('Blog Data Integrity: all active articles have required fields and no duplicates', () => {
  assert.equal(blogPosts.length, 33, 'Should have exactly 33 active articles');
  assert.equal(blogCategories.length, 10, 'Should have exactly 10 categories');

  const slugs = new Set();
  const titles = new Set();
  const seoTitles = new Set();
  const descriptions = new Set();
  const catIds = new Set(blogCategories.map(c => c.id));

  for (const post of blogPosts) {
    // Unique Slug
    assert.ok(post.slug, `Post must have a slug: ${post.title}`);
    assert.ok(!slugs.has(post.slug), `Duplicate slug detected: ${post.slug}`);
    slugs.add(post.slug);

    // Unique Title & SEO Title
    assert.ok(post.title, `Post must have a title: ${post.slug}`);
    assert.ok(!titles.has(post.title), `Duplicate title detected: ${post.title}`);
    titles.add(post.title);

    assert.ok(post.seoTitle, `Post must have an seoTitle: ${post.slug}`);
    assert.ok(!seoTitles.has(post.seoTitle), `Duplicate seoTitle: ${post.seoTitle}`);
    seoTitles.add(post.seoTitle);

    // Unique and substantive Description
    assert.ok(post.description, `Post must have a description: ${post.slug}`);
    assert.ok(post.description.length >= 60, `Description too short: ${post.slug} (${post.description.length} chars)`);
    assert.ok(!descriptions.has(post.description), `Duplicate description: ${post.slug}`);
    descriptions.add(post.description);

    // Valid Category
    assert.ok(catIds.has(post.category), `Invalid category "${post.category}" in post: ${post.slug}`);

    // Author
    assert.equal(post.author.name, 'DJ', `Author must be DJ in: ${post.slug}`);

    // Dates
    assert.ok(post.datePublished, `Missing datePublished: ${post.slug}`);
    assert.ok(post.dateModified, `Missing dateModified: ${post.slug}`);
    assert.ok(post.reviewedDate, `Missing reviewedDate: ${post.slug}`);
    assert.ok(post.readingTime, `Missing readingTime: ${post.slug}`);

    // Featured Image
    assert.ok(post.featuredImage, `Missing featuredImage: ${post.slug}`);
    assert.ok(post.featuredImageAlt, `Missing featuredImageAlt: ${post.slug}`);
    const imgPath = path.join(rootDir, 'public', post.featuredImage);
    assert.ok(fs.existsSync(imgPath), `Featured image file does not exist on disk: ${imgPath}`);

    // Table of contents
    assert.ok(Array.isArray(post.tableOfContents), `TOC must be array: ${post.slug}`);
    assert.ok(post.tableOfContents.length >= 3, `TOC must have at least 3 entries: ${post.slug}`);

    // Substantive HTML Content
    assert.ok(post.contentHtml.length > 500, `Post content too short: ${post.slug}`);
  }
});

test('Category Data Integrity: all 10 categories have pillars and valid slugs', () => {
  for (const cat of blogCategories) {
    assert.ok(cat.id, 'Category must have id');
    assert.ok(cat.name, 'Category must have name');
    assert.ok(cat.slug, 'Category must have slug');
    assert.ok(cat.description, 'Category must have description');
    assert.ok(cat.pillarSlug, `Category ${cat.id} must define pillarSlug`);

    // Verify pillar post exists and is marked isPillar
    const pillarPost = blogPosts.find(p => p.slug === cat.pillarSlug);
    assert.ok(pillarPost, `Pillar post ${cat.pillarSlug} not found for category ${cat.id}`);
    assert.equal(pillarPost.isPillar, true, `Post ${cat.pillarSlug} must have isPillar: true`);
    assert.equal(pillarPost.category, cat.id, `Pillar post ${cat.pillarSlug} category mismatch`);
  }
});

test('Generated HTML Files: All active articles are in blog/posts/[slug].html and root is clean', () => {
  for (const post of blogPosts) {
    // 1. Must exist in dedicated blog/posts folder
    const postFilePath = path.join(rootDir, 'blog', 'posts', `${post.slug}.html`);
    assert.ok(fs.existsSync(postFilePath), `Article file does not exist in blog/posts/: ${postFilePath}`);

    // 2. Root directory must NOT contain legacy post folders
    const legacyRootDir = path.join(rootDir, post.slug);
    assert.ok(!fs.existsSync(legacyRootDir), `Legacy post folder must not clutter root: ${legacyRootDir}`);

    const html = fs.readFileSync(postFilePath, 'utf8');

    // Single H1 check
    const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
    assert.equal(h1Matches.length, 1, `Post ${post.slug} must have exactly one <h1>. Found: ${h1Matches.length}`);

    // Canonical tag verification (flat URL)
    const expectedCanonical = `https://utmcraft.com/${post.slug}/`;
    assert.ok(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `Post ${post.slug} missing or incorrect canonical tag`);

    // BlogPosting JSON-LD schema
    assert.ok(html.includes('"@type": "BlogPosting"'), `Post ${post.slug} missing BlogPosting schema`);
    assert.ok(html.includes('"headline":'), `Post ${post.slug} missing headline in schema`);
    assert.ok(html.includes('"publisher":'), `Post ${post.slug} missing publisher in schema`);
    assert.ok(html.includes('"name": "UTMCraft"'), `Post ${post.slug} publisher must be UTMCraft`);
    assert.ok(html.includes('"@type": "BreadcrumbList"'), `Post ${post.slug} missing BreadcrumbList schema`);

    // Reading progress element
    assert.ok(html.includes('id="reading-progress"'), `Post ${post.slug} missing reading-progress bar`);

    // Featured image attributes
    assert.ok(html.includes('width="1200"'), `Post ${post.slug} image missing width`);
    assert.ok(html.includes('height="630"'), `Post ${post.slug} image missing height`);
    assert.ok(html.includes(`alt="${post.featuredImageAlt}"`), `Post ${post.slug} image missing alt attribute`);

    // Navigation and Footer present
    assert.ok(html.includes('class="app-header"'), `Post ${post.slug} missing app-header`);
    assert.ok(html.includes('class="app-footer"'), `Post ${post.slug} missing app-footer`);
  }
});

test('Generated Category Pages: All 10 category pages exist with BreadcrumbList schema', () => {
  for (const cat of blogCategories) {
    const catFilePath = path.join(rootDir, 'blog', cat.slug, 'index.html');
    assert.ok(fs.existsSync(catFilePath), `Category file does not exist: ${catFilePath}`);

    const html = fs.readFileSync(catFilePath, 'utf8');

    const expectedCanonical = `https://utmcraft.com/blog/${cat.slug}/`;
    assert.ok(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `Category ${cat.slug} missing canonical`);
    assert.ok(html.includes('"@type": "BreadcrumbList"'), `Category ${cat.slug} missing BreadcrumbList schema`);

    const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
    assert.equal(h1Matches.length, 1, `Category ${cat.slug} must have exactly one <h1>`);
  }
});

test('Blog Homepage: /blog/ exists with search, filter pills, and valid structure', () => {
  const blogFilePath = path.join(rootDir, 'blog', 'index.html');
  assert.ok(fs.existsSync(blogFilePath), 'Main blog index.html must exist');

  const html = fs.readFileSync(blogFilePath, 'utf8');
  assert.ok(html.includes('<link rel="canonical" href="https://utmcraft.com/blog/">'), 'Blog index missing canonical');
  assert.ok(html.includes('id="blog-search-input"'), 'Blog index missing search field');
  assert.ok(html.includes('class="category-pills-list"'), 'Blog index missing category filter pills');

  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
  assert.equal(h1Matches.length, 1, 'Blog index must have exactly one <h1>');
});

test('XML Sitemap: Includes all 35 articles, 10 categories, and blog index with utmcraft.com domain', () => {
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml must exist');

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  assert.ok(xml.includes('<loc>https://utmcraft.com/blog/</loc>'), 'Sitemap missing /blog/');

  for (const cat of blogCategories) {
    assert.ok(xml.includes(`<loc>https://utmcraft.com/blog/${cat.slug}/</loc>`), `Sitemap missing category: ${cat.slug}`);
  }

  for (const post of blogPosts) {
    assert.ok(xml.includes(`<loc>https://utmcraft.com/${post.slug}/</loc>`), `Sitemap missing post: ${post.slug}`);
  }
});

test('Internal Link Integrity: all internal links across all 35 articles point to valid local pages', () => {
  const linkRegex = /href="(\/[^"#?]*)[#?]?/g;
  const brokenLinks = [];

  // Known root files/directories that resolve in production
  const validKnownPrefixes = [
    '/',
    '/bulk-utm-builder/',
    '/campaign-url-builder/',
    '/utm-checker/',
    '/utm-parameters/',
    '/utm-naming-conventions/',
    '/ga4-default-channel-grouping/',
    '/utm-builder/google-ads/',
    '/utm-builder/facebook/',
    '/utm-builder/linkedin/',
    '/terms.html',
    '/privacy.html',
    '/about/',
    '/about.html',
    '/contact/',
    '/contact.html',
    '/sitemap.xml',
    '/blog/'
  ];

  for (const post of blogPosts) {
    const postFilePath = path.join(rootDir, 'blog', 'posts', `${post.slug}.html`);
    const html = fs.readFileSync(postFilePath, 'utf8');
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const target = match[1];

      // If it's a known root link, ok
      if (validKnownPrefixes.includes(target) || validKnownPrefixes.includes(target + '/')) continue;

      // If it's a category link
      if (target.startsWith('/blog/')) {
        const catSlug = target.replace(/^\/blog\//, '').replace(/\/$/, '');
        if (blogCategories.some(c => c.slug === catSlug)) continue;
      }

      // If it's a blog post link
      const postSlug = target.replace(/^\//, '').replace(/\/$/, '');
      if (blogPosts.some(p => p.slug === postSlug)) continue;

      // Check if file exists on disk (root, blog/posts, or public static asset)
      const localRel = target.replace(/^\//, '');
      const directFile = path.join(rootDir, localRel);
      const postHtmlFile = path.join(rootDir, 'blog', 'posts', `${localRel}.html`);
      const publicFile = path.join(rootDir, 'public', localRel);
      if (fs.existsSync(directFile) || fs.existsSync(postHtmlFile) || fs.existsSync(publicFile)) continue;

      brokenLinks.push({ post: post.slug, target });
    }
  }

  assert.equal(brokenLinks.length, 0, `Found broken internal links: ${JSON.stringify(brokenLinks, null, 2)}`);
});

test('Production Build Dual Routing: dist/ has flat post directory and blog subpath for all active articles', () => {
  const distDir = path.join(rootDir, 'dist');
  if (!fs.existsSync(distDir)) return; // Skipped if dist has not been built yet

  for (const post of blogPosts) {
    const flatIndex = path.join(distDir, post.slug, 'index.html');
    const blogIndex = path.join(distDir, 'blog', post.slug, 'index.html');
    const postsHtml = path.join(distDir, 'blog', 'posts', `${post.slug}.html`);

    assert.ok(fs.existsSync(flatIndex), `Missing flat production route: ${flatIndex}`);
    assert.ok(fs.existsSync(blogIndex), `Missing blog subpath route: ${blogIndex}`);
    assert.ok(fs.existsSync(postsHtml), `Missing bundled posts file: ${postsHtml}`);
  }
});
