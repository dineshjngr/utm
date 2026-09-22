/**
 * GA4 Default Channel Grouping & Taxonomy Engine
 */

export const GA4_CHANNEL_RULES = [
  {
    channel: 'Paid Search',
    description: 'Traffic from search engines via paid ads (Google Ads, Bing Ads, Baidu).',
    sourceCondition: 'Matches a list of search sites (google, bing, yahoo, baidu, duckduckgo...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*)$',
    recommendedMedium: 'cpc',
    example: 'utm_source=google&utm_medium=cpc',
    icon: 'search',
    color: '#4285F4'
  },
  {
    channel: 'Paid Social',
    description: 'Traffic from social platforms via paid campaigns or sponsored posts.',
    sourceCondition: 'Matches social sites (facebook, instagram, linkedin, twitter, tiktok, pinterest...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*|paid_social)$',
    recommendedMedium: 'paid_social',
    example: 'utm_source=facebook&utm_medium=paid_social',
    icon: 'share-2',
    color: '#1877F2'
  },
  {
    channel: 'Organic Social',
    description: 'Traffic from unpaid social media posts, profile bios, and link-in-bio tools.',
    sourceCondition: 'Matches social sites (facebook, instagram, linkedin, twitter, tiktok, youtube...)',
    mediumCondition: 'Matches regex: ^(social|social-network|social-media|sm|social_post)$ or is empty',
    recommendedMedium: 'social',
    example: 'utm_source=linkedin&utm_medium=social',
    icon: 'heart',
    color: '#10B981'
  },
  {
    channel: 'Email',
    description: 'Traffic driven from email marketing campaigns, newsletters, and lifecycle drip sequences.',
    sourceCondition: 'Any email service or newsletter identifier',
    mediumCondition: 'Matches regex: ^(.*email.*|e-mail|e_mail|newsletter)$',
    recommendedMedium: 'email',
    example: 'utm_source=newsletter&utm_medium=email',
    icon: 'mail',
    color: '#F59E0B'
  },
  {
    channel: 'Affiliates',
    description: 'Traffic from affiliate networks, influencer referral links, or coupon sites.',
    sourceCondition: 'Partner, creator, or affiliate network name',
    mediumCondition: 'Matches regex: ^(.*affiliate.*|aff)$',
    recommendedMedium: 'affiliate',
    example: 'utm_source=influencer_jen&utm_medium=affiliate',
    icon: 'users',
    color: '#8B5CF6'
  },
  {
    channel: 'Referral',
    description: 'Traffic from external web links, review sites, and partner blogs.',
    sourceCondition: 'External domain or blog',
    mediumCondition: 'Matches regex: ^(.*referral.*|app|link)$ or empty',
    recommendedMedium: 'referral',
    example: 'utm_source=techcrunch&utm_medium=referral',
    icon: 'external-link',
    color: '#06B6D4'
  },
  {
    channel: 'Paid Video',
    description: 'Traffic from video streaming ad formats (YouTube In-Stream, Vimeo, Twitch).',
    sourceCondition: 'Matches video platforms (youtube, vimeo, twitch, dailymotion...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*)$',
    recommendedMedium: 'cpc',
    example: 'utm_source=youtube&utm_medium=cpc',
    icon: 'video',
    color: '#EF4444'
  },
  {
    channel: 'Display',
    description: 'Traffic from programmatic display banners, GDN, and image placements.',
    sourceCondition: 'Ad network or publisher',
    mediumCondition: 'Matches regex: ^(display|banner|expandable|interstitial|cpm)$',
    recommendedMedium: 'display',
    example: 'utm_source=gdn&utm_medium=display',
    icon: 'image',
    color: '#EC4899'
  }
];

export const GOLDEN_RULES = [
  {
    title: '1. Strict Lowercase Only',
    desc: 'Google Analytics is case-sensitive! `utm_source=Google` and `utm_source=google` are reported as two completely separate sources in reports. Standardize on lowercase everywhere.',
    severity: 'critical'
  },
  {
    title: '2. Never Use Spaces',
    desc: 'Spaces turn into messy `%20` or `+` in URLs. Use hyphens (`-`) or underscores (`_`) uniformly across your marketing team.',
    severity: 'high'
  },
  {
    title: '3. Never Use UTMs on Internal Site Links',
    desc: 'Using UTMs on links within your own domain (e.g. from homepage to pricing) completely restarts the GA4 user session and wipes out the original marketing attribution attribution!',
    severity: 'critical'
  },
  {
    title: '4. Align Medium with GA4 Channel Grouping',
    desc: 'Always use standard mediums (`cpc`, `email`, `social`, `paid_social`, `affiliate`, `display`) so GA4 automatically categorizes your traffic into the right reports.',
    severity: 'high'
  },
  {
    title: '5. Structure Campaign Names with Delimiters',
    desc: 'Adopt a formula like `[product]_[geo]_[objective]_[date]`. For example: `saas_us_leadgen_2025q3`. This allows easy slicing in Looker Studio and BigQuery.',
    severity: 'medium'
  }
];

/**
 * Evaluates the quality and health of UTM parameters
 */
export function auditUTM(params) {
  const issues = [];
  const suggestions = [];
  let score = 100;

  const { baseUrl, source, medium, campaign, term, content } = params;

  if (!baseUrl) {
    issues.push({ level: 'error', field: 'baseUrl', message: 'Target website URL is required.' });
    score -= 40;
  } else {
    try {
      const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
      if (!url.hostname || !url.hostname.includes('.')) {
        issues.push({ level: 'warning', field: 'baseUrl', message: 'URL appears to have an invalid hostname.' });
        score -= 10;
      }
    } catch {
      issues.push({ level: 'error', field: 'baseUrl', message: 'Invalid URL format.' });
      score -= 30;
    }
  }

  if (!source) {
    issues.push({ level: 'error', field: 'utm_source', message: 'Missing utm_source (required by GA4).' });
    score -= 25;
  } else {
    if (/[A-Z]/.test(source)) {
      issues.push({ level: 'warning', field: 'utm_source', message: 'Source contains uppercase letters. Use lowercase to avoid split GA4 rows.' });
      score -= 5;
    }
    if (/\s/.test(source)) {
      issues.push({ level: 'warning', field: 'utm_source', message: 'Source contains spaces. Use hyphens or underscores instead.' });
      score -= 5;
    }
  }

  if (!medium) {
    issues.push({ level: 'error', field: 'utm_medium', message: 'Missing utm_medium (required by GA4).' });
    score -= 25;
  } else {
    if (/[A-Z]/.test(medium)) {
      issues.push({ level: 'warning', field: 'utm_medium', message: 'Medium contains uppercase letters.' });
      score -= 5;
    }
    if (/\s/.test(medium)) {
      issues.push({ level: 'warning', field: 'utm_medium', message: 'Medium contains spaces.' });
      score -= 5;
    }

    // Check GA4 match
    const ga4Matches = GA4_CHANNEL_RULES.some(rule => {
      const regex = new RegExp(rule.mediumCondition.replace('Matches regex: ', ''), 'i');
      return regex.test(medium);
    });

    if (!ga4Matches && medium !== 'qr_code') {
      suggestions.push({
        field: 'utm_medium',
        message: `Medium "${medium}" may not match GA4 default channel groupings. Consider using: cpc, paid_social, social, email, affiliate, or display.`
      });
      score -= 5;
    }
  }

  if (!campaign) {
    issues.push({ level: 'error', field: 'utm_campaign', message: 'Missing utm_campaign (strongly recommended for attribution).' });
    score -= 15;
  } else {
    if (/[A-Z]/.test(campaign)) {
      suggestions.push({ field: 'utm_campaign', message: 'Campaign has uppercase letters. Lowercase is recommended for consistency.' });
    }
    if (/\s/.test(campaign)) {
      issues.push({ level: 'warning', field: 'utm_campaign', message: 'Campaign contains spaces. We recommend replacing with hyphens or underscores.' });
      score -= 5;
    }
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    issues,
    suggestions,
    isReady: score >= 70 && !issues.some(i => i.level === 'error')
  };
}
