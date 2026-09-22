/**
 * GA4 Default Channel Grouping & Taxonomy Engine
 */

export const GA4_CHANNEL_RULES = [
  {
    channel: 'Paid Search',
    category: 'paid',
    description: 'Traffic from search engines via paid ads (Google Ads, Bing Ads, Baidu, DuckDuckGo).',
    plainSummary: 'Paid clicks from keyword search campaigns.',
    sourceCondition: 'Matches search engine domains (google, bing, yahoo, baidu, duckduckgo...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*)$',
    mediumRegex: /^(.*cp.*|ppc|paid.*)$/i,
    recommendedMedium: 'cpc',
    example: 'utm_source=google&utm_medium=cpc&utm_campaign=brand_exact',
    commonMistake: 'Do not use "google_ads" or "paid_search" as medium. GA4 expects "cpc" or "ppc".',
    icon: 'search',
    color: '#4285F4'
  },
  {
    channel: 'Paid Social',
    category: 'paid',
    description: 'Traffic from social platforms via sponsored posts, boosted reels, and carousel ads.',
    plainSummary: 'Paid ads served within social media feeds and stories.',
    sourceCondition: 'Matches social platforms (facebook, instagram, linkedin, twitter, tiktok, pinterest, reddit...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*|paid_social)$',
    mediumRegex: /^(.*cp.*|ppc|paid.*|paid_social)$/i,
    recommendedMedium: 'paid_social',
    example: 'utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_promo',
    commonMistake: 'Do not use "social" for paid ads. Using "social" sends paid clicks into Organic Social!',
    icon: 'share-2',
    color: '#1877F2'
  },
  {
    channel: 'Organic Social',
    category: 'organic',
    description: 'Traffic from unpaid social posts, profile bios, creator mentions, and link-in-bio tools.',
    plainSummary: 'Free traffic from posts, stories, links in bio, and community shares.',
    sourceCondition: 'Matches social platforms (facebook, instagram, linkedin, twitter, tiktok, youtube, threads...)',
    mediumCondition: 'Matches regex: ^(social|social-network|social-media|sm|social_post)$',
    mediumRegex: /^(social|social-network|social-media|sm|social_post)$/i,
    recommendedMedium: 'social',
    example: 'utm_source=linkedin&utm_medium=social&utm_campaign=product_announcement',
    commonMistake: 'Do not use "post" or "bio" as medium without "social"; use "social" for medium and "bio" for content.',
    icon: 'heart',
    color: '#10B981'
  },
  {
    channel: 'Email',
    category: 'direct',
    description: 'Traffic driven from email newsletters, automated onboarding drips, and marketing blasts.',
    plainSummary: 'Subscribers clicking links inside broadcast emails and sequences.',
    sourceCondition: 'Email platform or newsletter name (mailchimp, klaviyo, hubspot, substack, convertkit...)',
    mediumCondition: 'Matches regex: ^(.*email.*|e-mail|e_mail|newsletter)$',
    mediumRegex: /^(.*email.*|e-mail|e_mail|newsletter)$/i,
    recommendedMedium: 'email',
    example: 'utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest_issue42',
    commonMistake: 'Do not invert source and medium (e.g. utm_source=email&utm_medium=mailchimp). Mailchimp is the source, email is the medium.',
    icon: 'mail',
    color: '#F59E0B'
  },
  {
    channel: 'Affiliates',
    category: 'paid',
    description: 'Traffic from partner publisher sites, creator affiliate links, reward portals, or coupon partners.',
    plainSummary: 'Commissioned partner links and creator promotions.',
    sourceCondition: 'Partner, creator, or affiliate network name (shareasale, cj, impact, creator_name)',
    mediumCondition: 'Matches regex: ^(.*affiliate.*|aff)$',
    mediumRegex: /^(.*affiliate.*|aff)$/i,
    recommendedMedium: 'affiliate',
    example: 'utm_source=techradar&utm_medium=affiliate&utm_campaign=review_guide',
    commonMistake: 'Using "partner" or "sponsor" as medium sends traffic to Referral or Unassigned. Use "affiliate".',
    icon: 'users',
    color: '#8B5CF6'
  },
  {
    channel: 'Referral',
    category: 'organic',
    description: 'Traffic from external blogs, PR publications, directory links, and partner sites.',
    plainSummary: 'Inbound links from external websites and blogs.',
    sourceCondition: 'External domain, publisher, or partner site name',
    mediumCondition: 'Matches regex: ^(.*referral.*|app|link)$',
    mediumRegex: /^(.*referral.*|app|link)$/i,
    recommendedMedium: 'referral',
    example: 'utm_source=techcrunch&utm_medium=referral&utm_campaign=series_a_coverage',
    commonMistake: 'Standard inbound links naturally track as referral without UTMs. Only add UTMs if you need custom campaign tracking.',
    icon: 'external-link',
    color: '#06B6D4'
  },
  {
    channel: 'Paid Video',
    category: 'paid',
    description: 'Traffic from video streaming ad formats (YouTube In-Stream, YouTube Shorts Ads, Vimeo, Twitch).',
    plainSummary: 'Paid video ad clicks and pre-roll promotions.',
    sourceCondition: 'Matches video platforms (youtube, vimeo, twitch, dailymotion...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*)$',
    mediumRegex: /^(.*cp.*|ppc|paid.*)$/i,
    recommendedMedium: 'cpc',
    example: 'utm_source=youtube&utm_medium=cpc&utm_campaign=demo_video_viewers',
    commonMistake: 'Do not use "video_ad" as medium. Use "cpc" with source "youtube".',
    icon: 'video',
    color: '#EF4444'
  },
  {
    channel: 'Organic Video',
    category: 'organic',
    description: 'Traffic from links placed in video descriptions, pinned comments, or profile cards.',
    plainSummary: 'Unpaid links placed inside YouTube/Vimeo video descriptions.',
    sourceCondition: 'Matches video platforms (youtube, vimeo, twitch, dailymotion...)',
    mediumCondition: 'Matches regex: ^(.*video.*)$',
    mediumRegex: /^(.*video.*)$/i,
    recommendedMedium: 'video',
    example: 'utm_source=youtube&utm_medium=video&utm_campaign=how_to_tutorial_desc',
    commonMistake: 'Using "social" for YouTube descriptions is okay, but "video" explicitly triggers Organic Video in GA4.',
    icon: 'play',
    color: '#DC2626'
  },
  {
    channel: 'Display',
    category: 'paid',
    description: 'Traffic from programmatic display banners, Google Display Network (GDN), and image placements.',
    plainSummary: 'Banner ads across websites, apps, and third-party publisher networks.',
    sourceCondition: 'Ad network, publisher, or exchange (gdn, doubleclick, criteo, taboola...)',
    mediumCondition: 'Matches regex: ^(display|banner|expandable|interstitial|cpm)$',
    mediumRegex: /^(display|banner|expandable|interstitial|cpm)$/i,
    recommendedMedium: 'display',
    example: 'utm_source=gdn&utm_medium=display&utm_campaign=retargeting_30d',
    commonMistake: 'Do not use "cpc" for display ads if you want them grouped under Display; use "display" or "banner".',
    icon: 'image',
    color: '#EC4899'
  },
  {
    channel: 'Paid Shopping',
    category: 'paid',
    description: 'Traffic from shopping feed ads (Google Shopping, Performance Max Shopping, Bing Shopping).',
    plainSummary: 'Product catalog ads showing prices and product images.',
    sourceCondition: 'Matches shopping engine domains (google, bing...)',
    mediumCondition: 'Matches regex: ^(.*cp.*|ppc|paid.*)$ with shopping campaign/feed',
    mediumRegex: /^(.*cp.*|ppc|paid.*|shopping)$/i,
    recommendedMedium: 'cpc',
    example: 'utm_source=google&utm_medium=cpc&utm_campaign=smart_shopping_sneakers',
    commonMistake: 'In Google Ads, auto-tagging handles shopping automatically. Only add manual UTMs if third-party tracking requires it.',
    icon: 'shopping-bag',
    color: '#059669'
  },
  {
    channel: 'SMS & Messaging',
    category: 'direct',
    description: 'Traffic driven from SMS text messages, WhatsApp broadcasts, and mobile notification channels.',
    plainSummary: 'Text messages and direct messaging apps sending traffic to mobile landing pages.',
    sourceCondition: 'SMS provider or channel (twilio, klaviyo, att, whatsapp, telegram)',
    mediumCondition: 'Matches regex: ^(sms|mms|text|whatsapp|telegram)$',
    mediumRegex: /^(sms|mms|text|whatsapp|telegram)$/i,
    recommendedMedium: 'sms',
    example: 'utm_source=klaviyo&utm_medium=sms&utm_campaign=flash_sale_vip',
    commonMistake: 'Avoid using generic "mobile" or "notification". Use "sms" so it classifies cleanly into SMS.',
    icon: 'message-square',
    color: '#14B8A6'
  },
  {
    channel: 'Audio / Podcast',
    category: 'paid',
    description: 'Traffic from podcast sponsorships, audio ads (Spotify, Pandora, iHeartMedia), and radio broadcasts.',
    plainSummary: 'Audio advertisements and host-read podcast promos with custom vanity URLs.',
    sourceCondition: 'Audio platform or podcast show name (spotify, pandora, timferriss, huberman)',
    mediumCondition: 'Matches regex: ^(audio|podcast|broadcast)$',
    mediumRegex: /^(audio|podcast|broadcast)$/i,
    recommendedMedium: 'audio',
    example: 'utm_source=huberman_lab&utm_medium=audio&utm_campaign=sleep_supplement',
    commonMistake: 'Audio ads usually pair best with a clean vanity short link (e.g. brand.com/sleep) that 301 redirects with these UTMs.',
    icon: 'volume-2',
    color: '#84CC16'
  },
  {
    channel: 'QR Code / Offline',
    category: 'offline',
    description: 'Traffic from physical print collateral, conference badges, product packaging, and billboard QR codes.',
    plainSummary: 'Scans from posters, packaging, event booths, and flyers.',
    sourceCondition: 'Physical placement or venue (nyc_billboard, package_insert, saastr_booth)',
    mediumCondition: 'Matches regex: ^(qr_code|qr|print|offline|flyer|brochure)$',
    mediumRegex: /^(qr_code|qr|print|offline|flyer|brochure)$/i,
    recommendedMedium: 'qr_code',
    example: 'utm_source=saastr_booth&utm_medium=qr_code&utm_campaign=event_discount',
    commonMistake: 'Always generate a high-contrast QR code and test scanning with both iOS and Android before mass printing.',
    icon: 'grid',
    color: '#6366F1'
  }
];

export const GA4_UNASSIGNED_FIXES = [
  {
    title: '1. Uppercase or TitleCase Lettering',
    symptom: 'utm_source=Google or utm_medium=Email',
    whyItBreaks: 'GA4 channel grouping rules evaluate source and medium with case sensitivity in standard tables. "Email" does not match the default regex rules for "email".',
    howToFix: 'Always force lowercase on every parameter. Use "google" and "email".',
    severity: 'high'
  },
  {
    title: '2. Inverted Source and Medium',
    symptom: 'utm_source=email&utm_medium=mailchimp',
    whyItBreaks: 'Source is WHERE the traffic came from (e.g. mailchimp), while Medium is HOW it got delivered (e.g. email). If inverted, GA4 will not recognize "mailchimp" as a known medium.',
    howToFix: 'Set utm_source=mailchimp and utm_medium=email. Always ask: "Is this the vehicle (medium) or the vendor (source)?"',
    severity: 'critical'
  },
  {
    title: '3. Custom or Invented Medium Values',
    symptom: 'utm_medium=social_influencer, utm_medium=promoted, utm_medium=blast',
    whyItBreaks: 'GA4 has a strictly defined list of recognized mediums for default channel grouping. Custom words that do not match the built-in regex fall straight into (Unassigned).',
    howToFix: 'Stick to standard mediums: cpc, paid_social, social, email, affiliate, referral, display. Put your custom specifics in utm_campaign or utm_content.',
    severity: 'critical'
  },
  {
    title: '4. Missing Required Parameters',
    symptom: 'Only utm_campaign provided, with no utm_source or utm_medium',
    whyItBreaks: 'GA4 channel grouping relies primarily on source and medium to classify visits. Without them, traffic defaults to Direct or Unassigned.',
    howToFix: 'Ensure every tagged URL contains at least utm_source and utm_medium, and preferably utm_campaign for full attribution.',
    severity: 'medium'
  }
];

export const CAMPAIGN_TAGGING_STEPS = [
  {
    step: '1',
    title: 'Destination URL',
    subtitle: 'Where the user lands',
    description: 'Start with the exact canonical landing page (e.g. https://yourbrand.com/pricing). Always verify the page returns HTTP 200 and preserves query parameters.',
    tip: 'Avoid trailing slash mismatches that trigger HTTP 301 redirects stripping UTM parameters.'
  },
  {
    step: '2',
    title: 'Source (utm_source)',
    subtitle: 'Who is sending the visitor',
    description: 'Identifies the platform, publisher, or vendor (e.g. google, facebook, newsletter, techcrunch, twilio). Always use lowercase.',
    tip: 'Use specific platform names rather than broad terms like "social" or "ad".'
  },
  {
    step: '3',
    title: 'Medium (utm_medium)',
    subtitle: 'The delivery vehicle',
    description: 'Tells GA4 what channel this belongs to. Must match GA4 standards: cpc, paid_social, social, email, affiliate, referral, display.',
    tip: 'Medium is the single most important parameter for GA4 Default Channel Grouping!'
  },
  {
    step: '4',
    title: 'Campaign (utm_campaign)',
    subtitle: 'The initiative or promo',
    description: 'Names your specific promotion, product launch, or audience target (e.g. saas_leadgen_us_2026q1). Separate components with underscores or hyphens.',
    tip: 'Use our standardized formula builder below to keep naming consistent across your entire team.'
  },
  {
    step: '5',
    title: 'Content & Term (Optional)',
    subtitle: 'Granular creative tracking',
    description: 'Use utm_content to differentiate ad variations, button placements, or creatives (e.g. hero_cta_blue vs hero_cta_green). Use utm_term for search keywords.',
    tip: 'Ad networks can auto-inject dynamic macros like {keyword} or {{ad.name}} here.'
  }
];

export const DOS_AND_DONTS = [
  {
    type: 'do',
    title: 'Standardize on Lowercase',
    desc: 'Always use lowercase for all UTM values. "Email" and "email" create fragmented split rows in your analytics reports.'
  },
  {
    type: 'do',
    title: 'Use Hyphens or Underscores for Spaces',
    desc: 'Spaces transform into ugly %20 or + in browsers. Use clean separators like hyphens (paid-social) or underscores (paid_social).'
  },
  {
    type: 'do',
    title: 'Document Team Naming Conventions',
    desc: 'Create a shared UTM taxonomy dictionary or use UTMCraft presets so everyone uses the exact same spelling.'
  },
  {
    type: 'do',
    title: 'Test Your Links Before Publishing',
    desc: 'Click your generated link and verify that the destination page loads properly and does not strip query parameters on redirect.'
  },
  {
    type: 'dont',
    title: 'NEVER Use UTMs on Internal Site Links',
    desc: 'Never put UTM tags on banners or links navigating inside your own website. Doing so overrides the original visitor attribution and inflates session counts.'
  },
  {
    type: 'dont',
    title: 'Never Invent Unsupported Mediums',
    desc: 'Avoid inventing mediums like "influencer_post" or "ad_blast". GA4 will not recognize them and will lump your traffic into (Unassigned).'
  },
  {
    type: 'dont',
    title: 'Never Put Sensitive Customer Data in UTMs',
    desc: 'Never include personal identifiable information (PII) like customer email addresses, names, or phone numbers in UTM parameters. This violates Google Analytics Terms of Service.'
  },
  {
    type: 'dont',
    title: 'Never Rely on Broken 301 Redirects',
    desc: 'Some shorteners or server redirects strip query parameters on 301/302 redirects. Always test that UTM tags survive the redirect.'
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
    desc: 'Using UTMs on links within your own domain (e.g. from homepage to pricing) can restart attribution and overwrite the original campaign source in your analytics reports.',
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
      if (rule.mediumRegex) {
        return rule.mediumRegex.test(medium);
      }
      return false;
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
