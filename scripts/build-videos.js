import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { videos } from '../src/data/videos.js';
import { renderHeader, renderFooter } from './shared-layout.js';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://utmcraft.com';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderWatchPage(video) {
  const url = origin + video.watchPath;
  const thumbnailUrl = origin + video.thumbnailPath;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': url, url,
        name: video.title, description: video.description,
        mainEntity: { '@id': `${url}#video` }
      },
      {
        '@type': 'VideoObject', '@id': `${url}#video`,
        name: video.title, description: video.description,
        thumbnailUrl: [thumbnailUrl], uploadDate: video.uploadDate,
        duration: video.duration, contentUrl: origin + video.contentPath,
        url, mainEntityOfPage: { '@id': url },
        creditText: 'Google Ads',
        isBasedOn: video.sourceUrl
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${origin}/blog/` },
          { '@type': 'ListItem', position: 3, name: video.title, item: url }
        ]
      }
    ]
  };
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(video.title)} | UTMCraft</title>
  <meta name="description" content="${escape(video.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1">
  <meta property="og:type" content="video.other">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${escape(video.title)}">
  <meta property="og:description" content="${escape(video.description)}">
  <meta property="og:image" content="${thumbnailUrl}">
  <meta property="og:video" content="${origin + video.contentPath}">
  <meta property="og:video:type" content="video/mp4">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(video.title)}">
  <meta name="twitter:description" content="${escape(video.description)}">
  <meta name="twitter:image" content="${thumbnailUrl}">
  <link rel="stylesheet" href="/src/styles.css">
  <link rel="stylesheet" href="/src/blog.css">
  <link rel="icon" type="image/png" href="/favicon.png">
  <script type="module" src="/src/theme.js"></script>
  <script type="application/ld+json">${JSON.stringify(graph, null, 2).replaceAll('<', '\\u003c')}</script>
</head>
<body data-page="video-watch">
  <a class="skip-link" href="#main-content">Skip to video</a>
  ${renderHeader('guides')}
  <div class="app-container">
    <main id="main-content" class="video-watch">
      <h1>${escape(video.title)}</h1>
      <video width="1920" height="1080" class="video-watch-player" controls playsinline preload="metadata" poster="${video.thumbnailPath}" aria-label="${escape(video.title)}">
        <source src="${video.contentPath}" type="video/mp4">
        Your browser does not support embedded video. <a href="${video.contentPath}">Download the video</a>.
      </video>
      <p class="video-watch-credit">${video.durationSeconds}-second clip · Source: <a href="${video.sourceUrl}" target="_blank" rel="noopener noreferrer">Google Ads</a></p>
      <p>${escape(video.description)}</p>
      <p><a href="/${video.articleSlug}/">Read the DSA to AI Max migration timeline and checklist →</a></p>
      <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
        <ol><li><a href="/">Home</a></li><li class="separator" aria-hidden="true">/</li><li><a href="/blog/">Guides</a></li><li class="separator" aria-hidden="true">/</li><li aria-current="page">DSA to AI Max video</li></ol>
      </nav>
    </main>
    ${renderFooter()}
  </div>
</body>
</html>`;
}

export function buildVideos() {
  for (const video of videos) {
    const directory = join(root, 'landing-pages', video.watchPath);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, 'index.html'), renderWatchPage(video));
  }
  console.log(`Generated ${videos.length} video watch page(s).`);
}
if (import.meta.url === `file://${process.argv[1]}`) buildVideos();
