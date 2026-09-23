import { blogCategories } from './blog-categories.js';
import { utmStrategyPosts } from './posts/utm-strategy.js';
import { utmParametersPosts } from './posts/utm-parameters.js';
import { ga4AttributionPosts } from './posts/ga4-attribution.js';
import { googleAdsPosts } from './posts/google-ads.js';
import { metaAdsPosts } from './posts/meta-ads.js';
import { linkedinAdsPosts } from './posts/linkedin-ads.js';
import { emailTrackingPosts } from './posts/email-tracking.js';
import { organicSocialPrPosts } from './posts/organic-social-pr.js';
import { offlineQrPosts } from './posts/offline-qr.js';
import { utmOperationsPosts } from './posts/utm-operations.js';

export const blogPosts = [
  ...utmStrategyPosts,
  ...utmParametersPosts,
  ...ga4AttributionPosts,
  ...googleAdsPosts,
  ...metaAdsPosts,
  ...linkedinAdsPosts,
  ...emailTrackingPosts,
  ...organicSocialPrPosts,
  ...offlineQrPosts,
  ...utmOperationsPosts
];

export function getPostBySlug(slug) {
  return blogPosts.find(p => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
  return blogPosts.filter(p => p.category === categorySlug);
}

export function getPillarPostForCategory(categorySlug) {
  return blogPosts.find(p => p.category === categorySlug && p.isPillar);
}

export function getPillarPosts() {
  return blogPosts.filter(p => p.isPillar);
}

export function getCategoryById(categoryId) {
  return blogCategories.find(c => c.id === categoryId);
}

export function getRelatedPosts(currentPost, limit = 3) {
  // If specific relatedSlugs are defined on the post, look them up
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const specific = currentPost.relatedSlugs
      .map(slug => getPostBySlug(slug))
      .filter(Boolean)
      .slice(0, limit);
    if (specific.length >= limit) return specific;
  }

  // Otherwise, find posts in the same category
  const sameCat = blogPosts.filter(
    p => p.category === currentPost.category && p.slug !== currentPost.slug
  );

  // If still need more, fallback to pillar posts of other categories
  const otherPosts = blogPosts.filter(
    p => p.category !== currentPost.category && p.slug !== currentPost.slug
  );

  return [...sameCat, ...otherPosts].slice(0, limit);
}
