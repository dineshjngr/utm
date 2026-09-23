import { defineConfig } from 'vite';
import { resolve, relative, join, sep } from 'path';
import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { blogPosts } from './src/data/blog-posts.js';

function findHtmlInputs(dir, baseDir = dir) {
  let results = {};
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      Object.assign(results, findHtmlInputs(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const relPath = relative(baseDir, fullPath);
      const landingPagesPrefix = `landing-pages${sep}`;
      const routePath = relPath.startsWith(landingPagesPrefix)
        ? relPath.slice(landingPagesPrefix.length)
        : relPath;
      let key = routePath.replace(/\.html$/, '').replace(/\/index$/, '').replace(/^index$/, 'main');
      results[key] = resolve(baseDir, fullPath);
    }
  }
  return results;
}

// Custom plugin to ensure URLs don't break in dev server and production dist
function blogUrlRoutingPlugin() {
  const postSlugs = new Set(blogPosts.map(p => p.slug));

  return {
    name: 'blog-url-routing',

    // 1. Dev Server: smoothly rewrite /[slug] and /blog/[slug] to /blog/posts/[slug].html
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const [requestPath, query = ''] = req.url.split('?');
        const pathname = requestPath.replace(/\/$/, ''); // strip trailing slash
        const querySuffix = query ? `?${query}` : '';

        const landingRoute = pathname.replace(/^\//, '');
        if (landingPageRoutes.has(landingRoute)) {
          req.url = `/landing-pages/${landingRoute}/index.html` + querySuffix;
          return next();
        }

        // Extract candidate slug: handle /slug or /blog/slug or /blog/posts/slug
        const cleanSlug = pathname.replace(/^\//, '').replace(/^blog\/posts\//, '').replace(/^blog\//, '');

        if (cleanSlug && postSlugs.has(cleanSlug)) {
          const postFile = resolve(import.meta.dirname, 'blog', 'posts', `${cleanSlug}.html`);
          if (existsSync(postFile)) {
            req.url = `/blog/posts/${cleanSlug}.html` + querySuffix;
          }
        }
        next();
      });
    },

    // 2. Production Build: emit canonical flat article and landing routes.
    closeBundle() {
      const distDir = resolve(import.meta.dirname, 'dist');
      const distBlogPostsDir = join(distDir, 'blog', 'posts');

      if (!existsSync(distDir) || !existsSync(distBlogPostsDir)) return;

      for (const post of blogPosts) {
        const bundledHtmlPath = join(distBlogPostsDir, `${post.slug}.html`);
        if (!existsSync(bundledHtmlPath)) continue;

        const htmlContent = readFileSync(bundledHtmlPath, 'utf8');

        // Output flat directory: dist/[slug]/index.html (https://utmcraft.com/[slug]/)
        const flatDir = join(distDir, post.slug);
        if (!existsSync(flatDir)) {
          mkdirSync(flatDir, { recursive: true });
        }
        writeFileSync(join(flatDir, 'index.html'), htmlContent, 'utf8');

      }

      // Keep the source organized under landing-pages/ without changing public URLs.
      for (const route of landingPageRoutes) {
        const sourceHtml = join(distDir, 'landing-pages', route, 'index.html');
        const publicHtml = join(distDir, route, 'index.html');
        if (!existsSync(sourceHtml)) continue;
        mkdirSync(join(distDir, route), { recursive: true });
        copyFileSync(sourceHtml, publicHtml);
      }
      const builtNotFound = join(distDir, 'public', '404.html');
      if (existsSync(builtNotFound)) {
        copyFileSync(builtNotFound, join(distDir, '404.html'));
      }
      console.log(`[blog-url-routing] Generated canonical production routes in dist/ for all ${blogPosts.length} articles.`);
    }
  };
}

const htmlInputs = findHtmlInputs(import.meta.dirname);
const landingPageRoutes = new Set(
  Object.entries(htmlInputs)
    .filter(([, filePath]) => filePath.includes(`${sep}landing-pages${sep}`))
    .map(([route]) => route)
);

export default defineConfig({
  plugins: [
    blogUrlRoutingPlugin()
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs
    }
  },
  server: {
    port: 3333,
    open: false
  },
  preview: {
    port: 3333
  }
});
