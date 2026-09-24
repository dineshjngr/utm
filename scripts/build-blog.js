import fs from 'fs';
import path from 'path';
import { blogPosts, getRelatedPosts, getCategoryById } from '../src/data/blog-posts.js';
import { blogCategories } from '../src/data/blog-categories.js';
import { renderHeader, renderFooter } from './shared-layout.js';

const rootDir = path.resolve(import.meta.dirname, '..');

// Helper to escape HTML attributes
function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatPublishedDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
}

function formatUpdatedDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', timeZone: 'UTC'
  });
}

// Helper to extract FAQ questions and answers from article HTML
function extractFaqSchema(contentHtml) {
  if (!contentHtml) return null;
  const faqRegex = /<div class="faq-item">([\s\S]*?)<\/div>/gi;
  const questions = [];
  let match;
  while ((match = faqRegex.exec(contentHtml)) !== null) {
    const block = match[1];
    const qMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const pMatches = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    if (qMatch && pMatches.length > 0) {
      const qText = qMatch[1].replace(/<[^>]+>/g, '').trim();
      const aText = pMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).join(' ');
      if (qText && aText) {
        questions.push({
          "@type": "Question",
          "name": qText,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": aText
          }
        });
      }
    }
  }

  if (questions.length === 0) return null;

  return {
    "@type": "FAQPage",
    "mainEntity": questions
  };
}

// Generate Individual Article Page HTML
function renderArticlePage(post) {
  const category = getCategoryById(post.category);
  const related = getRelatedPosts(post, 3);
  const canonicalUrl = `https://utmcraft.com/${post.slug}/`;
  const imageUrl = `https://utmcraft.com${post.featuredImage}`;

  // Structured Data: BlogPosting & BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "headline": post.title,
        "description": post.description,
        "image": imageUrl,
        "datePublished": post.datePublished,
        "dateModified": post.dateModified,
        "reviewedBy": {
          "@type": "Organization",
          "name": "UTMCraft Editorial Team",
          "url": "https://utmcraft.com/"
        },
        "citation": (post.references || []).map(ref => ({
          "@type": "CreativeWork",
          "name": ref.title,
          "url": ref.url
        })),
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role,
          "url": post.author.url
        },
        "publisher": {
          "@type": "Organization",
          "name": "UTMCraft",
          "url": "https://utmcraft.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://utmcraft.com/utmcraft-logo-light.png"
          }
        },
        "mainEntityOfPage": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://utmcraft.com/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://utmcraft.com/blog/" },
          { "@type": "ListItem", "position": 3, "name": category.name, "item": `https://utmcraft.com/blog/${category.slug}/` },
          { "@type": "ListItem", "position": 4, "name": post.title, "item": canonicalUrl }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://utmcraft.com/#organization",
        "name": "UTMCraft",
        "url": "https://utmcraft.com/",
        "logo": "https://utmcraft.com/utmcraft-logo-light.png",
        "email": "contact@utmcraft.com"
      }
    ]
  };

  const faqSchema = extractFaqSchema(post.contentHtml);
  if (faqSchema) {
    jsonLd['@graph'].push(faqSchema);
  }

  // Sticky TOC List items
  const tocItems = post.tableOfContents.map(item => `
    <li>
      <a href="#${item.id}" class="toc-link">${escapeAttr(item.title)}</a>
    </li>
  `).join('');

  // Related Cards HTML - Generous Banner Showcase Cards
  const relatedCards = related.map(rel => {
    const relCat = getCategoryById(rel.category);
    return `
    <a href="/${rel.slug}/" class="post-card related-post-card">
      <div class="post-card-thumb-wrap">
        <img src="${rel.featuredImage}" alt="${escapeAttr(rel.featuredImageAlt)}" class="post-card-thumb" width="1200" height="630" loading="lazy">
      </div>
      <div class="post-card-content">
        <div class="post-card-header">
          <span class="post-card-category">${relCat ? relCat.badge : 'Guide'}</span>
          <span class="post-card-readtime">${rel.readingTime}</span>
        </div>
        <h4 class="post-card-title">${escapeAttr(rel.title)}</h4>
        <p class="post-card-excerpt">${escapeAttr(rel.description)}</p>
        <div class="post-card-footer">
          <span>Read Guide →</span>
            <span>Published ${formatPublishedDate(rel.datePublished)}</span>
        </div>
      </div>
    </a>`;
  }).join('');

  // References list HTML
  const referencesHtml = post.references && post.references.length > 0 ? `
    <section class="article-references" id="article-sources">
      <h3>Sources &amp; Authoritative References</h3>
      <ul class="references-list">
        ${post.references.map(ref => `
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <a href="${ref.url}" target="_blank" rel="noopener">${escapeAttr(ref.title)}</a>
            <span class="ref-publisher">(${escapeAttr(ref.publisher)})</span>
          </li>
        `).join('')}
      </ul>
    </section>
  ` : '';

  const sourceLinks = [...new Map((post.references || []).map(ref => [ref.publisher, ref])).values()]
    .map(ref => `<a href="${escapeAttr(ref.url)}" target="_blank" rel="noopener">${escapeAttr(ref.publisher)}</a>`)
    .join(', ');
  const editorialCredits = `<div class="article-editorial-credits" aria-label="Article authorship and sources">
      <p><strong>Reviewed by</strong> UTMCraft Editorial Team</p>
      <p><strong>Last reviewed</strong> <time datetime="${post.dateModified}">${escapeAttr(post.reviewedDate)}</time></p>
      <p><strong>Sources</strong> ${sourceLinks} <a class="article-source-details" href="#article-sources">Full references</a></p>
    </div>`;

  // Contextual tool link for the end of each guide
  const toolCtaHtml = post.toolCta ? `
    <aside class="article-tool-cta" aria-label="Related tool">
      <div class="article-tool-cta-inner">
        <div class="article-tool-cta-content">
          <p class="article-tool-cta-label">Related tool</p>
          <h3 class="article-tool-cta-title">${escapeAttr(post.toolCta.title)}</h3>
          <p class="article-tool-cta-desc">${escapeAttr(post.toolCta.description)}</p>
        </div>
        <div class="article-tool-cta-action">
          <a href="${post.toolCta.link}" class="article-tool-cta-btn">
            <span>${escapeAttr(post.toolCta.buttonText || 'Build this with UTMCraft')}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>
    </aside>
  `.trim() : '';

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <script type="module" src="/src/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeAttr(post.seoTitle)}</title>
  <meta name="description" content="${escapeAttr(post.description)}">
  <meta name="keywords" content="${escapeAttr(post.primaryKeyword + ', ' + post.secondaryKeywords.join(', '))}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

  <!-- Open Graph / Social -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(post.seoTitle)}">
  <meta property="og:description" content="${escapeAttr(post.description)}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="article:published_time" content="${post.datePublished}">
  <meta property="article:modified_time" content="${post.dateModified}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${escapeAttr(post.seoTitle)}">
  <meta name="twitter:description" content="${escapeAttr(post.description)}">
  <meta name="twitter:image" content="${imageUrl}">

  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles.css">
  <link rel="stylesheet" href="/src/blog.css">
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png">

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body data-page="blog-post">
  <!-- Reading Progress Indicator -->
  <div id="reading-progress" aria-hidden="true"></div>

  <a class="skip-link" href="#main-content">Skip to content</a>

  ${renderHeader('blog')}

  <div class="app-container">
    <!-- Breadcrumb -->
    <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li class="separator">/</li>
        <li><a href="/blog/">Guides</a></li>
        <li class="separator">/</li>
        <li><a href="/blog/${category.slug}/">${category.name}</a></li>
        <li class="separator">/</li>
        <li class="current" aria-current="page">${escapeAttr(post.title)}</li>
      </ol>
    </nav>

    <!-- Main Article Layout -->
    <main id="main-content" class="blog-article-layout">
      <!-- Article Content Column -->
      <article class="article-main-column">
        <header class="article-header">
          <a href="/blog/${category.slug}/" class="article-category-badge">
            ${category.badge}
          </a>

          <h1 class="article-title">${escapeAttr(post.title)}</h1>
          <p class="article-description">${escapeAttr(post.description)}</p>
          <div class="article-meta-top">
            <span class="article-date">Updated ${formatUpdatedDate(post.dateModified)}</span>
            <span class="article-meta-bullet">•</span>
            <span class="article-reading-time">${post.readingTime}</span>
            <span class="article-meta-bullet">•</span>
            <span class="article-author-byline">Written by <a href="${escapeAttr(post.author.url)}">${escapeAttr(post.author.name)}</a></span>
          </div>
          ${editorialCredits}

          <!-- Featured Hero Image -->
          <div class="article-featured-image">
            <img src="${post.featuredImage}" alt="${escapeAttr(post.featuredImageAlt)}" width="1200" height="630" fetchpriority="high">
          </div>
        </header>

        <!-- Mobile Table of Contents Accordion -->
        <details class="mobile-toc">
          <summary>Table of Contents</summary>
          <ol>
            ${tocItems}
          </ol>
        </details>

        <!-- Main Prose Body -->
        <div class="article-prose">
          ${post.contentHtml}

          ${referencesHtml}

          <!-- Author Box -->
          <div class="article-author-card">
            <div class="author-avatar" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="author-info">
              <h4>${escapeAttr(post.author.name)}</h4>
              <div class="author-role">${escapeAttr(post.author.role)}</div>
              <p class="author-bio">Specializing in digital marketing measurement, multi-touch attribution architecture, and enterprise tracking governance across GA4, Google Ads, Meta, and modern CRM stacks.</p>
            </div>
          </div>
        </div>

${toolCtaHtml}

        <!-- Related Guides Grid -->
        <section class="related-articles-section">
          <h3>Related Measurement Guides</h3>
          <div class="related-articles-grid">
            ${relatedCards}
          </div>
        </section>
      </article>

      <!-- Desktop Sticky Table of Contents Sidebar -->
      <aside class="blog-sidebar">
        <div class="toc-card">
          <div class="toc-heading">Table of Contents</div>
          <ul class="toc-list">
            ${tocItems}
          </ul>
        </div>
      </aside>
    </main>

    ${renderFooter()}
  </div>

  <script type="module" src="/src/blog.js"></script>
</body>
</html>`;
}

// Generate Category Archive Page HTML
function renderCategoryPage(category) {
  const posts = blogPosts.filter(p => p.category === category.id);
  const pillar = posts.find(p => p.isPillar) || posts[0];
  const supporting = posts.filter(p => p.slug !== pillar?.slug);
  const canonicalUrl = `https://utmcraft.com/blog/${category.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        "url": canonicalUrl,
        "name": `${category.name} Guides & Taxonomy | UTMCraft`,
        "description": category.description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://utmcraft.com/#website",
          "name": "UTMCraft",
          "url": "https://utmcraft.com/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://utmcraft.com/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://utmcraft.com/blog/" },
          { "@type": "ListItem", "position": 3, "name": category.name, "item": canonicalUrl }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://utmcraft.com/#organization",
        "name": "UTMCraft",
        "url": "https://utmcraft.com/",
        "logo": "https://utmcraft.com/utmcraft-logo-light.png"
      }
    ]
  };

  const supportingCards = supporting.map(post => `
    <a href="/${post.slug}/" class="post-card">
      <div class="post-card-thumb-wrap">
        <img src="${post.featuredImage}" alt="${escapeAttr(post.featuredImageAlt)}" class="post-card-thumb" width="1200" height="630" loading="lazy">
      </div>
      <div class="post-card-content">
        <div class="post-card-header">
          <span class="post-card-category">${category.badge}</span>
          <span class="post-card-readtime">${post.readingTime}</span>
        </div>
        <h3 class="post-card-title">${escapeAttr(post.title)}</h3>
        <p class="post-card-excerpt">${escapeAttr(post.description)}</p>
        <div class="post-card-footer">
          <span>Read Guide →</span>
          <span>Published ${formatPublishedDate(post.datePublished)}</span>
        </div>
      </div>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeAttr(category.name)} Guides &amp; Taxonomy | UTMCraft</title>
  <script type="module" src="/src/theme.js"></script>
  <meta name="description" content="${escapeAttr(category.description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(category.name)} Guides &amp; Taxonomy | UTMCraft">
  <meta property="og:description" content="${escapeAttr(category.description)}">
  <meta property="og:image" content="https://utmcraft.com/og-image.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(category.name)} Guides &amp; Taxonomy | UTMCraft">
  <meta name="twitter:description" content="${escapeAttr(category.description)}">
  <meta name="twitter:image" content="https://utmcraft.com/og-image.png">

  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles.css">
  <link rel="stylesheet" href="/src/blog.css">
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png">

  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body data-page="blog-category">
  <a class="skip-link" href="#main-content">Skip to content</a>

  ${renderHeader('blog')}

  <div class="app-container">
    <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li class="separator">/</li>
        <li><a href="/blog/">Guides</a></li>
        <li class="separator">/</li>
        <li class="current" aria-current="page">${category.name}</li>
      </ol>
    </nav>

    <header class="blog-hero">
      <div style="display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
        <span class="article-category-badge">${category.badge}</span>
      </div>
      <h1 class="blog-hero-title">${category.name}</h1>
      <p class="blog-hero-subtitle">${escapeAttr(category.description)}</p>
    </header>

    <main id="main-content">
      ${pillar ? `
      <!-- Highlighted Category Pillar Guide -->
      <a href="/${pillar.slug}/" class="featured-pillar-card">
        <div class="featured-pillar-image">
          <img src="${pillar.featuredImage}" alt="${escapeAttr(pillar.featuredImageAlt)}" width="1200" height="630" fetchpriority="high">
        </div>
        <div class="featured-pillar-content">
          <span class="featured-pillar-badge">Core Pillar Guide</span>
          <h2 class="featured-pillar-title">${escapeAttr(pillar.title)}</h2>
          <p class="featured-pillar-desc">${escapeAttr(pillar.description)}</p>
          <div class="featured-pillar-footer">
            <span>${pillar.readingTime}</span>
            <span>•</span>
            <span>Published ${formatPublishedDate(pillar.datePublished)}</span>
          </div>
        </div>
      </a>
      ` : ''}

      <div style="margin: 2.5rem 0 1.25rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em;">Supporting Cluster Guides</h2>
      </div>

      <div class="posts-grid">
        ${supportingCards}
      </div>
    </main>

    ${renderFooter()}
  </div>

  <script type="module" src="/src/blog.js"></script>
</body>
</html>`;
}

// Generate Main Blog Index Page HTML
function renderBlogIndexPage() {
  const canonicalUrl = `https://utmcraft.com/blog/`;
  const pillar = blogPosts.find(p => p.slug === 'utm-strategy-guide') || blogPosts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        "url": canonicalUrl,
        "name": "Campaign Tracking, Taxonomy & GA4 Attribution Guides | UTMCraft",
        "description": "In-depth guides on UTM parameters, campaign naming taxonomy, GA4 attribution, Google Ads ValueTrack, Meta dynamic tracking, and marketing measurement.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://utmcraft.com/#website",
          "name": "UTMCraft",
          "url": "https://utmcraft.com/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://utmcraft.com/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": canonicalUrl }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://utmcraft.com/#organization",
        "name": "UTMCraft",
        "url": "https://utmcraft.com/",
        "logo": "https://utmcraft.com/utmcraft-logo-light.png"
      }
    ]
  };

  const categoryPills = blogCategories.map(cat => `
    <li>
      <a href="/blog/${cat.slug}/" class="category-pill-btn">${cat.name}</a>
    </li>
  `).join('');

  const postCards = blogPosts.map(post => {
    const cat = getCategoryById(post.category);
    return `
    <a href="/${post.slug}/" class="post-card">
      <div class="post-card-thumb-wrap">
        <img src="${post.featuredImage}" alt="${escapeAttr(post.featuredImageAlt)}" class="post-card-thumb" width="1200" height="630" loading="lazy">
      </div>
      <div class="post-card-content">
        <div class="post-card-header">
          <span class="post-card-category">${cat ? cat.badge : 'Guide'}</span>
          <span class="post-card-readtime">${post.readingTime}</span>
        </div>
        <h3 class="post-card-title">${escapeAttr(post.title)}</h3>
        <p class="post-card-excerpt">${escapeAttr(post.description)}</p>
        <div class="post-card-footer">
          <span>Read Guide →</span>
          <span>Published ${formatPublishedDate(post.datePublished)}</span>
        </div>
      </div>
    </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Campaign Tracking, Taxonomy &amp; GA4 Attribution Guides | UTMCraft</title>
  <script type="module" src="/src/theme.js"></script>
  <meta name="description" content="In-depth guides on UTM parameters, campaign naming taxonomy, GA4 attribution, Google Ads ValueTrack, Meta dynamic tracking, and marketing measurement.">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="Campaign Tracking &amp; GA4 Attribution Guides | UTMCraft">
  <meta property="og:description" content="Master UTM authoring, campaign taxonomy, GA4 attribution, ad tracking templates, and marketing measurement.">
  <meta property="og:image" content="https://utmcraft.com/og-image.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Campaign Tracking &amp; GA4 Attribution Guides | UTMCraft">
  <meta name="twitter:description" content="Master UTM authoring, campaign taxonomy, GA4 attribution, ad tracking templates, and marketing measurement.">
  <meta name="twitter:image" content="https://utmcraft.com/og-image.png">

  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles.css">
  <link rel="stylesheet" href="/src/blog.css">
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png">

  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body data-page="blog-index">
  <a class="skip-link" href="#main-content">Skip to content</a>

  ${renderHeader('blog')}

  <div class="app-container">
    <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li class="separator">/</li>
        <li class="current" aria-current="page">Guides &amp; Blog</li>
      </ol>
    </nav>

    <header class="blog-hero">
      <h1 class="blog-hero-title">Campaign Tracking &amp; Attribution Knowledgebase</h1>
      <p class="blog-hero-subtitle">Field-tested guides on UTM authoring, campaign taxonomy, GA4 channel grouping, ad network tracking templates, and marketing measurement.</p>
    </header>

    <!-- Filter & Search Toolbar -->
    <div class="blog-filter-bar">
      <ul class="category-pills-list">
        <li><a href="/blog/" class="category-pill-btn active">All Topics</a></li>
        ${categoryPills}
      </ul>

      <div class="blog-search-wrap">
        <svg class="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" id="blog-search-input" class="blog-search-input" placeholder="Search guides &amp; topics..." aria-label="Search guides">
      </div>
    </div>

    <main id="main-content">
      ${pillar ? `
      <!-- Featured Pillar Guide -->
      <a href="/${pillar.slug}/" class="featured-pillar-card">
        <div class="featured-pillar-image">
          <img src="${pillar.featuredImage}" alt="${escapeAttr(pillar.featuredImageAlt)}" width="1200" height="630" fetchpriority="high">
        </div>
        <div class="featured-pillar-content">
          <span class="featured-pillar-badge">Featured Strategic Pillar</span>
          <h2 class="featured-pillar-title">${escapeAttr(pillar.title)}</h2>
          <p class="featured-pillar-desc">${escapeAttr(pillar.description)}</p>
          <div class="featured-pillar-footer">
            <span>${pillar.readingTime}</span>
            <span>•</span>
            <span>Published ${formatPublishedDate(pillar.datePublished)}</span>
          </div>
        </div>
      </a>
      ` : ''}

      <div style="margin: 2.5rem 0 1.25rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em;">All Practical Tracking Guides (${blogPosts.length})</h2>
      </div>

      <!-- Live Search Empty State -->
      <div id="blog-empty-state" style="display: none; padding: 3rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-card); border: 1px solid var(--border-card); margin-bottom: 3rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">No matching guides found</h3>
        <p style="color: var(--text-secondary); margin: 0;">Try searching for parameters like "cpc", "gclid", "meta", "linkedin", or "unassigned".</p>
      </div>

      <div class="posts-grid">
        ${postCards}
      </div>
    </main>

    ${renderFooter()}
  </div>

  <script type="module" src="/src/blog.js"></script>
</body>
</html>`;
}

// Update public/sitemap.xml
function updateSitemap() {
  const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
  const now = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: 'https://utmcraft.com/', lastmod: '2026-09-24', priority: '1.0', changefreq: 'weekly' },
    { loc: 'https://utmcraft.com/bulk-utm-builder/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/campaign-url-builder/', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-checker/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-parameters/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-naming-conventions/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/ga4-default-channel-grouping/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-builder/google-ads/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-builder/facebook/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/utm-builder/linkedin/', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/terms.html', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/privacy.html', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/about/', lastmod: '2026-09-24', priority: '0.6', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/contact/', priority: '0.6', changefreq: 'monthly' },
    { loc: 'https://utmcraft.com/blog/', priority: '0.9', changefreq: 'weekly' }
  ];

  const categoryUrls = blogCategories.map(cat => ({
    loc: `https://utmcraft.com/blog/${cat.slug}/`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const postUrls = blogPosts.map(post => ({
    loc: `https://utmcraft.com/${post.slug}/`,
    priority: post.isPillar ? '0.85' : '0.75',
    changefreq: 'monthly',
    lastmod: post.dateModified || now
  }));

  const allUrls = [...staticUrls, ...categoryUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Updated sitemap with ${allUrls.length} total URLs.`);
}

// Generate README.md index for blog/posts directory
function generatePostsReadme(blogPostsDir) {
  const readmePath = path.join(blogPostsDir, 'README.md');
  let md = `# UTMCraft Blog Articles Directory\n\n`;
  md += `All ${blogPosts.length} active production guides are organized in this directory as individual HTML files.\n\n`;
  md += `## URL Architecture & Routing Governance\n\n`;
  md += `- **Source File:** \`blog/posts/[slug].html\`\n`;
  md += `- **Production Canonical URL:** \`https://utmcraft.com/[slug]/\` (flat URL, no category in slug)\n`;
  md += `- **Category Hubs:** \`https://utmcraft.com/blog/[category-slug]/\`\n`;
  md += `- **Blog Homepage:** \`https://utmcraft.com/blog/\`\n\n`;
  md += `Both the Vite development server and the production build automatically route requests for \`/[slug]/\` and \`/blog/[slug]/\` to these files without broken links.\n\n`;
  md += `## Complete Article Roster\n\n`;
  md += `| Category | Type | Title | File | Canonical URL |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;

  for (const cat of blogCategories) {
    const posts = blogPosts.filter(p => p.category === cat.id);
    for (const post of posts) {
      const type = post.isPillar ? '**Pillar**' : 'Supporting';
      md += `| ${cat.name} | ${type} | ${post.title} | \`${post.slug}.html\` | [/${post.slug}/](https://utmcraft.com/${post.slug}/) |\n`;
    }
  }

  fs.writeFileSync(readmePath, md, 'utf8');
}

export function buildBlog() {
  const activeSlugs = new Set(blogPosts.map(post => post.slug));
  for (const file of fs.readdirSync(path.join(rootDir, 'blog', 'posts'))) {
    if (!file.endsWith('.html') || file === 'index.html') continue;
    const slug = file.slice(0, -5);
    if (!activeSlugs.has(slug)) fs.unlinkSync(path.join(rootDir, 'blog', 'posts', file));
  }

  console.log(`Building blog system...`);

  const blogPostsDir = path.join(rootDir, 'blog', 'posts');
  if (!fs.existsSync(blogPostsDir)) {
    fs.mkdirSync(blogPostsDir, { recursive: true });
  }

  // Clean up legacy flat directories in root if they exist
  for (const post of blogPosts) {
    const legacyDir = path.join(rootDir, post.slug);
    if (fs.existsSync(legacyDir)) {
      fs.rmSync(legacyDir, { recursive: true, force: true });
    }
  }

  // 1. Build article pages: blog/posts/[slug].html
  for (const post of blogPosts) {
    const postFilePath = path.join(blogPostsDir, `${post.slug}.html`);
    const html = renderArticlePage(post);
    fs.writeFileSync(postFilePath, html, 'utf8');
  }
  console.log(`Generated ${blogPosts.length} article files in blog/posts/.`);

  // Create blog/posts/index.html redirect to /blog/
  const postsIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/blog/">
  <link rel="canonical" href="https://utmcraft.com/blog/">
  <title>Redirecting to UTMCraft Guides...</title>
</head>
<body>
  <p>Redirecting to <a href="/blog/">UTMCraft Guides</a>...</p>
  <script>window.location.replace('/blog/');</script>
</body>
</html>`;
  fs.writeFileSync(path.join(blogPostsDir, 'index.html'), postsIndexHtml, 'utf8');

  // Generate directory README index
  generatePostsReadme(blogPostsDir);

  // 2. Build 10 Category Archive Pages: blog/[category-slug]/index.html
  for (const cat of blogCategories) {
    const catDir = path.join(rootDir, 'blog', cat.slug);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    const html = renderCategoryPage(cat);
    fs.writeFileSync(path.join(catDir, 'index.html'), html, 'utf8');
  }
  console.log(`Generated ${blogCategories.length} category archive pages.`);

  // 3. Build Main Blog Page: blog/index.html
  const blogDir = path.join(rootDir, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  const blogIndexHtml = renderBlogIndexPage();
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf8');
  console.log(`Generated main blog page at blog/index.html.`);

  // 4. Update Sitemap
  updateSitemap();
  console.log(`Blog build completed successfully!`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildBlog();
}
