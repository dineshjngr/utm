import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUTMUrl, sanitizeValue } from '../src/modules/builder.js';
import { auditUTM } from '../src/modules/taxonomy.js';
import { deconstructUrl } from '../src/modules/inspector.js';
import { generateBatchMatrix, exportBatchToCSV, exportBatchToTSV } from '../src/modules/batch.js';

test('sanitizeValue should lowercase and replace spaces', () => {
  const result = sanitizeValue('Summer Sale 2025', { lowercase: true, spaceReplacement: '-' });
  assert.equal(result, 'summer-sale-2025');

  const underscore = sanitizeValue('Black Friday Deals', { lowercase: true, spaceReplacement: '_' });
  assert.equal(underscore, 'black_friday_deals');
});

test('buildUTMUrl should correctly construct URL with standard UTMs', () => {
  const result = buildUTMUrl({
    baseUrl: 'example.com/shop',
    source: 'Google',
    medium: 'CPC',
    campaign: 'Summer Sale',
    term: 'running shoes',
    content: 'hero banner'
  }, {
    lowercase: true,
    spaceReplacement: '-',
    autoProtocol: true,
    stripDuplicateUtms: true
  });

  assert.equal(result.isValid, true);
  assert.ok(result.url.startsWith('https://example.com/shop?'));
  
  const parsed = new URL(result.url);
  assert.equal(parsed.searchParams.get('utm_source'), 'google');
  assert.equal(parsed.searchParams.get('utm_medium'), 'cpc');
  assert.equal(parsed.searchParams.get('utm_campaign'), 'summer-sale');
  assert.equal(parsed.searchParams.get('utm_term'), 'running-shoes');
  assert.equal(parsed.searchParams.get('utm_content'), 'hero-banner');
});

test('buildUTMUrl should strip old UTMs and keep non-UTM parameters and hash', () => {
  const result = buildUTMUrl({
    baseUrl: 'https://example.com/pricing?ref=partner123&utm_source=old#details',
    source: 'newsletter',
    medium: 'email',
    campaign: 'welcome_series'
  }, {
    lowercase: true,
    spaceReplacement: '-',
    stripDuplicateUtms: true
  });

  assert.equal(result.isValid, true);
  const parsed = new URL(result.url);
  assert.equal(parsed.searchParams.get('ref'), 'partner123');
  assert.equal(parsed.searchParams.get('utm_source'), 'newsletter');
  assert.equal(parsed.searchParams.get('utm_medium'), 'email');
  assert.equal(parsed.hash, '#details');
});

test('buildUTMUrl should handle custom parameters', () => {
  const result = buildUTMUrl({
    baseUrl: 'https://example.com',
    source: 'affiliate',
    medium: 'affiliate',
    campaign: 'launch',
    customParams: [
      { key: 'aff_id', value: 'partner_99' },
      { key: 'discount_code', value: 'SAVE20' }
    ]
  }, { lowercase: true });

  const parsed = new URL(result.url);
  assert.equal(parsed.searchParams.get('aff_id'), 'partner_99');
  assert.equal(parsed.searchParams.get('discount_code'), 'save20');
});

test('auditUTM should identify missing parameters and give 100 for clean UTMs', () => {
  const cleanAudit = auditUTM({
    baseUrl: 'https://mysite.com',
    source: 'google',
    medium: 'cpc',
    campaign: 'summer_promo'
  });
  assert.equal(cleanAudit.score, 100);
  assert.equal(cleanAudit.isReady, true);

  const dirtyAudit = auditUTM({
    baseUrl: 'https://mysite.com',
    source: 'Google Ads',
    medium: 'unknown_medium',
    campaign: ''
  });
  assert.ok(dirtyAudit.score < 80);
  assert.ok(dirtyAudit.issues.some(i => i.field === 'utm_campaign'));
  assert.ok(dirtyAudit.suggestions.some(s => s.field === 'utm_medium'));
});

test('deconstructUrl should extract UTMs and query params accurately', () => {
  const inspected = deconstructUrl('https://store.com/checkout?utm_source=tiktok&utm_medium=paid_social&utm_campaign=viral_video&aff=creator12#payment');
  assert.equal(inspected.isValid, true);
  assert.equal(inspected.baseUrl, 'https://store.com/checkout');
  assert.equal(inspected.utmParams.utm_source, 'tiktok');
  assert.equal(inspected.utmParams.utm_medium, 'paid_social');
  assert.equal(inspected.otherParams.aff, 'creator12');
  assert.equal(inspected.hash, '#payment');
});

test('generateBatchMatrix and exportBatchToCSV should generate matrix for multiple channels', () => {
  const matrix = generateBatchMatrix({
    urls: ['https://site.com/productA', 'https://site.com/productB'],
    campaign: 'black_friday',
    channels: [
      { name: 'Google CPC', source: 'google', medium: 'cpc' },
      { name: 'Meta Ads', source: 'facebook', medium: 'paid_social' }
    ],
    options: { lowercase: true, spaceReplacement: '-' }
  });

  assert.equal(matrix.length, 4); // 2 URLs * 2 Channels
  const csv = exportBatchToCSV(matrix);
  assert.ok(csv.includes('Channel Name,Source,Medium,Campaign,Base URL,Final UTM URL'));
  assert.ok(csv.includes('"Google CPC","google","cpc"'));
  assert.ok(csv.includes('"Meta Ads","facebook","paid_social"'));

  const tsv = exportBatchToTSV(matrix);
  assert.ok(tsv.includes('Channel Name\tSource\tMedium\tCampaign\tBase URL\tFinal UTM URL'));
  assert.ok(tsv.includes('Google CPC\tgoogle\tcpc'));
});

test('buildUTMUrl should preserve ad network macro tokens like {keyword} and {{campaign.name}}', () => {
  const result = buildUTMUrl({
    baseUrl: 'https://mysite.com/landing',
    source: 'google',
    medium: 'cpc',
    campaign: '{{campaign.name}}',
    term: '{keyword}',
    content: '{matchtype}'
  });

  assert.equal(result.isValid, true);
  assert.ok(result.url.includes('utm_campaign={{campaign.name}}'));
  assert.ok(result.url.includes('utm_term={keyword}'));
  assert.ok(result.url.includes('utm_content={matchtype}'));
});

test('auditUTM should accurately accept standard GA4 mediums without false warnings', () => {
  const socialAudit = auditUTM({
    baseUrl: 'https://example.com',
    source: 'linkedin',
    medium: 'social',
    campaign: 'thought_leadership'
  });
  assert.equal(socialAudit.score, 100);
  assert.equal(socialAudit.suggestions.length, 0);

  const referralAudit = auditUTM({
    baseUrl: 'https://example.com',
    source: 'techcrunch',
    medium: 'referral',
    campaign: 'press_coverage'
  });
  assert.equal(referralAudit.score, 100);
  assert.equal(referralAudit.suggestions.length, 0);
});
