/**
 * Channel Presets & Custom Presets Management
 */

export const DEFAULT_PRESETS = [
  {
    id: 'google-cpc',
    category: 'Search & PPC',
    name: 'Google Ads (Search)',
    icon: 'search',
    source: 'google',
    medium: 'cpc',
    defaultCampaign: 'search_intent',
    term: '{keyword}',
    content: 'responsive_search_ad',
    color: '#4285F4',
    badge: 'GA4 Paid Search'
  },
  {
    id: 'google-display',
    category: 'Display & Banner',
    name: 'Google Display Network',
    icon: 'layout',
    source: 'google',
    medium: 'display',
    defaultCampaign: 'retargeting_q4',
    term: '',
    content: 'banner_300x250',
    color: '#EA4335',
    badge: 'GA4 Display'
  },
  {
    id: 'meta-feed',
    category: 'Paid Social',
    name: 'Meta / Facebook Ads',
    icon: 'facebook',
    source: 'facebook',
    medium: 'paid_social',
    defaultCampaign: 'prospecting_feed',
    term: 'lookalike_top1pct',
    content: 'video_carousel_v1',
    color: '#1877F2',
    badge: 'GA4 Paid Social'
  },
  {
    id: 'instagram-story',
    category: 'Paid Social',
    name: 'Instagram Story / Reel Ad',
    icon: 'instagram',
    source: 'instagram',
    medium: 'paid_social',
    defaultCampaign: 'story_flash_sale',
    term: 'broad_mobile',
    content: 'vertical_video_swipeup',
    color: '#E1306C',
    badge: 'GA4 Paid Social'
  },
  {
    id: 'instagram-bio',
    category: 'Organic Social',
    name: 'Instagram Bio Link',
    icon: 'link-2',
    source: 'instagram',
    medium: 'social',
    defaultCampaign: 'bio_landing',
    term: '',
    content: 'linktree_button',
    color: '#C13584',
    badge: 'GA4 Organic Social'
  },
  {
    id: 'linkedin-sponsored',
    category: 'Paid Social',
    name: 'LinkedIn Sponsored Ad',
    icon: 'linkedin',
    source: 'linkedin',
    medium: 'paid_social',
    defaultCampaign: 'b2b_decision_makers',
    term: 'job_title_vp_marketing',
    content: 'single_image_ad',
    color: '#0A66C2',
    badge: 'GA4 Paid Social'
  },
  {
    id: 'linkedin-organic',
    category: 'Organic Social',
    name: 'LinkedIn Organic Post',
    icon: 'linkedin',
    source: 'linkedin',
    medium: 'social',
    defaultCampaign: 'thought_leadership',
    term: '',
    content: 'post_link',
    color: '#0077B5',
    badge: 'GA4 Organic Social'
  },
  {
    id: 'twitter-organic',
    category: 'Organic Social',
    name: 'X (Twitter) Post',
    icon: 'twitter',
    source: 'twitter',
    medium: 'social',
    defaultCampaign: 'community_update',
    term: '',
    content: 'tweet_thread_cta',
    color: '#1DA1F2',
    badge: 'GA4 Organic Social'
  },
  {
    id: 'tiktok-ads',
    category: 'Paid Social',
    name: 'TikTok Spark / In-Feed Ad',
    icon: 'music',
    source: 'tiktok',
    medium: 'paid_social',
    defaultCampaign: 'ugc_viral_challenge',
    term: 'genz_interest',
    content: 'creator_spark_01',
    color: '#00F2FE',
    badge: 'GA4 Paid Social'
  },
  {
    id: 'email-newsletter',
    category: 'Email & CRM',
    name: 'Weekly Newsletter',
    icon: 'mail',
    source: 'newsletter',
    medium: 'email',
    defaultCampaign: 'weekly_digest_issue42',
    term: 'subscribers',
    content: 'main_article_button',
    color: '#10B981',
    badge: 'GA4 Email'
  },
  {
    id: 'email-welcome',
    category: 'Email & CRM',
    name: 'Lifecycle / Welcome Email',
    icon: 'send',
    source: 'lifecycle',
    medium: 'email',
    defaultCampaign: 'onboarding_sequence',
    term: 'new_users',
    content: 'cta_step1',
    color: '#059669',
    badge: 'GA4 Email'
  },
  {
    id: 'youtube-desc',
    category: 'Video',
    name: 'YouTube Video Description',
    icon: 'youtube',
    source: 'youtube',
    medium: 'video',
    defaultCampaign: 'tutorial_demo',
    term: '',
    content: 'description_link',
    color: '#FF0000',
    badge: 'GA4 Video'
  },
  {
    id: 'affiliate-partner',
    category: 'Affiliate & Referral',
    name: 'Affiliate Partner Link',
    icon: 'users',
    source: 'partner_affiliate',
    medium: 'affiliate',
    defaultCampaign: 'creator_program',
    term: '{partner_id}',
    content: 'review_box',
    color: '#8B5CF6',
    badge: 'GA4 Affiliate'
  },
  {
    id: 'offline-qr',
    category: 'Print & Offline',
    name: 'Print Event QR Code',
    icon: 'qr-code',
    source: 'conference_booth',
    medium: 'qr_code',
    defaultCampaign: 'tech_summit_2025',
    term: 'booth_banner',
    content: 'brochure_back',
    color: '#F59E0B',
    badge: 'Custom Offline'
  },
  {
    id: 'reddit-ads',
    category: 'Paid Social',
    name: 'Reddit Promoted Post',
    icon: 'message-square',
    source: 'reddit',
    medium: 'paid_social',
    defaultCampaign: 'subreddit_targeting',
    term: 'r_webdev',
    content: 'headline_a',
    color: '#FF4500',
    badge: 'GA4 Paid Social'
  }
];

const CUSTOM_PRESETS_STORAGE_KEY = 'utm_custom_presets_v1';

export function getCustomPresets() {
  try {
    const raw = localStorage.getItem(CUSTOM_PRESETS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(p => p && typeof p === 'object' && typeof p.id === 'string')
      .map(p => ({
        id: p.id.slice(0, 100),
        name: String(p.name || '').slice(0, 100),
        source: String(p.source || '').slice(0, 200),
        medium: String(p.medium || '').slice(0, 200),
        defaultCampaign: String(p.defaultCampaign || '').slice(0, 200),
        term: String(p.term || '').slice(0, 200),
        content: String(p.content || '').slice(0, 200),
        color: /^#[\da-f]{6}$/i.test(p.color) ? p.color : '#6366f1',
        isCustom: true,
        category: 'Custom Presets',
        badge: 'User Custom'
      }));
  } catch (err) {
    console.error('Error loading custom presets:', err);
    return [];
  }
}

export function saveCustomPreset(preset) {
  const list = getCustomPresets();
  const id = 'custom_' + Date.now();
  const newPreset = {
    ...preset,
    id,
    isCustom: true,
    category: 'Custom Presets',
    badge: 'User Custom'
  };
  list.unshift(newPreset);
  localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(list));
  return newPreset;
}

export function deleteCustomPreset(id) {
  const list = getCustomPresets().filter(p => p.id !== id);
  localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function getAllPresets() {
  return [...getCustomPresets(), ...DEFAULT_PRESETS];
}
