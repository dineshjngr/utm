// Metadata for the locally hosted clip, first published on UTMCraft on September 28.
export const videos = [{
  slug: 'google-dsa-ai-max',
  title: 'DSA to AI Max: Google Ads Settings Demo',
  description: 'Watch Google’s six-second demo of the campaign settings transition from Dynamic Search Ads to AI Max, then read the migration timeline and checklist.',
  contentPath: '/blog/videos/google-dsa-ai-max-panel.mp4',
  thumbnailPath: '/blog/images/google-dsa-ai-max-video.webp',
  uploadDate: '2026-09-28T00:00:00Z',
  dateModified: '2026-10-03',
  duration: 'PT6.033S',
  durationSeconds: 6,
  sourceUrl: 'https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/',
  articleSlug: 'google-dsa-ai-max-migration-2027',
  get watchPath() { return `/videos/${this.slug}/`; }
}];
