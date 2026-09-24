export const blogCategories = [
  {
    id: 'utm-strategy',
    name: 'UTM Strategy & Governance',
    slug: 'utm-strategy',
    pillarSlug: 'utm-strategy-guide',
    description: 'Frameworks, naming conventions, and governance standards for maintaining clean, scalable campaign tracking across teams and agencies.',
    badge: 'Governance',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  },
  {
    id: 'utm-parameters',
    name: 'UTM Parameters',
    slug: 'utm-parameters',
    pillarSlug: 'ga4-utm-parameters-guide',
    description: 'In-depth technical guides for every standard and GA4-specific UTM parameter, syntax rules, case sensitivity, and URL encoding.',
    badge: 'Taxonomy',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  {
    id: 'ga4-attribution',
    name: 'GA4 Attribution & Troubleshooting',
    slug: 'ga4-attribution',
    pillarSlug: 'ga4-utm-troubleshooting-guide',
    description: 'Diagnose and fix missing UTMs, Unassigned traffic, Direct traffic spikes, (not set) parameters, redirect drops, and session attribution issues.',
    badge: 'Diagnostics',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  },
  {
    id: 'google-ads',
    name: 'Google Ads Tracking',
    slug: 'google-ads',
    pillarSlug: 'google-ads-utm-guide',
    description: 'ValueTrack parameters, tracking templates, final URL suffixes, auto-tagging vs UTMs, GCLID handling, and Google Ads to GA4 attribution.',
    badge: 'Paid Search',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Tracking',
    slug: 'meta-ads',
    pillarSlug: 'meta-ads-utm-guide',
    description: 'Facebook and Instagram campaign tracking, dynamic URL parameters, fbclid vs UTMs, placement tracking, and Meta vs GA4 attribution.',
    badge: 'Paid Social',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads Tracking',
    slug: 'linkedin-ads',
    pillarSlug: 'linkedin-ads-utm-guide',
    description: 'B2B tracking with LinkedIn dynamic parameters (CAMPAIGN_ID, AD_SET_ID, AD_ID), Sponsored Content attribution, and hierarchy setup.',
    badge: 'B2B Ads',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
  },
  {
    id: 'email-tracking',
    name: 'Email Marketing Tracking',
    slug: 'email-tracking',
    pillarSlug: 'email-utm-guide',
    description: 'UTM tracking for newsletters, automated flows, ESP link wrappers, anti-spam security bots, and email channel taxonomy.',
    badge: 'Email',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
  },
  {
    id: 'organic-social-pr',
    name: 'Organic Social, Influencer, PR & Partnerships',
    slug: 'organic-social-pr',
    pillarSlug: 'non-paid-marketing-utm-tracking',
    description: 'Track non-paid channels including social bios, YouTube descriptions, creator sponsorships, promo codes, PR, and partner webinars.',
    badge: 'Non-Paid',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    id: 'offline-qr',
    name: 'Offline & QR Tracking',
    slug: 'offline-qr',
    pillarSlug: 'offline-qr-utm-tracking',
    description: 'Bridge physical marketing touchpoints to digital analytics with QR codes, vanity URLs, print tracking, and event attribution.',
    badge: 'Offline',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  },
  {
    id: 'utm-operations',
    name: 'UTM Operations, Automation & QA',
    slug: 'utm-operations',
    pillarSlug: 'utm-operations-workflow',
    description: 'Operationalize attribution with bulk generation, hidden form field capture, CRM synchronization (HubSpot/Salesforce), and first/last-touch tracking.',
    badge: 'Operations',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  },
  {
    id: 'utm-mistakes',
    name: 'UTM Mistakes & Tracking Audits',
    slug: 'utm-mistakes',
    pillarSlug: 'utm-tracking-mistakes',
    description: 'Diagnose common UTM tracking mistakes, broken attribution traps, naming errors, and field-tested fixes to safeguard your GA4 reports and ad spend.',
    badge: 'Mistakes & QA',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  }
];
