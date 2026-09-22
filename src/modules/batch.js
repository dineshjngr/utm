import { buildUTMUrl } from './builder.js';
import { DEFAULT_PRESETS } from './presets.js';

/**
 * Bulk / Matrix UTM Generator Module
 */

export const BATCH_CHANNELS = DEFAULT_PRESETS.slice(0, 10).map(p => ({
  id: p.id,
  name: p.name,
  source: p.source,
  medium: p.medium,
  checked: ['google-cpc', 'meta-feed', 'linkedin-sponsored', 'email-newsletter'].includes(p.id)
}));

export function generateBatchMatrix({ urls, campaign, term, content, channels, options = {} }) {
  if (!urls || urls.length === 0) return [];
  if (!channels || channels.length === 0) return [];

  const results = [];

  for (const rawUrl of urls) {
    const trimmedUrl = rawUrl.trim();
    if (!trimmedUrl) continue;

    for (const ch of channels) {
      const buildResult = buildUTMUrl({
        baseUrl: trimmedUrl,
        source: ch.source,
        medium: ch.medium,
        campaign: campaign || 'campaign',
        term: term || '',
        content: content || ch.content || ''
      }, options);

      if (buildResult.isValid) {
        results.push({
          id: 'batch_' + Math.random().toString(36).substring(2, 9),
          channelName: ch.name,
          source: ch.source,
          medium: ch.medium,
          campaign: campaign || '',
          baseUrl: trimmedUrl,
          url: buildResult.url
        });
      }
    }
  }

  return results;
}

export function exportBatchToCSV(batchResults) {
  if (!batchResults || batchResults.length === 0) return null;

  const headers = ['Channel Name', 'Source', 'Medium', 'Campaign', 'Base URL', 'Final UTM URL'];
  const rows = batchResults.map(r => [
    `"${(r.channelName || '').replace(/"/g, '""')}"`,
    `"${(r.source || '').replace(/"/g, '""')}"`,
    `"${(r.medium || '').replace(/"/g, '""')}"`,
    `"${(r.campaign || '').replace(/"/g, '""')}"`,
    `"${(r.baseUrl || '').replace(/"/g, '""')}"`,
    `"${(r.url || '').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function exportBatchToTSV(batchResults) {
  if (!batchResults || batchResults.length === 0) return null;

  const headers = ['Channel Name', 'Source', 'Medium', 'Campaign', 'Base URL', 'Final UTM URL'];
  const rows = batchResults.map(r => [
    r.channelName || '',
    r.source || '',
    r.medium || '',
    r.campaign || '',
    r.baseUrl || '',
    r.url || ''
  ]);

  return [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
}
