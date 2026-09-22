import { auditUTM } from './taxonomy.js';

/**
 * UTM Inspector / URL Deconstructor Module
 */

export function deconstructUrl(rawUrlString) {
  if (!rawUrlString || !rawUrlString.trim()) {
    return {
      isValid: false,
      error: 'Please enter a URL to inspect.'
    };
  }

  let formatted = rawUrlString.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = 'https://' + formatted;
  }

  try {
    const parsed = new URL(formatted);
    const utmParams = {};
    const otherParams = {};

    for (const [key, value] of parsed.searchParams.entries()) {
      const lowerKey = key.toLowerCase();
      if (lowerKey.startsWith('utm_')) {
        utmParams[lowerKey] = value;
      } else {
        otherParams[key] = value;
      }
    }

    const auditParams = {
      baseUrl: `${parsed.origin}${parsed.pathname}`,
      source: utmParams['utm_source'] || '',
      medium: utmParams['utm_medium'] || '',
      campaign: utmParams['utm_campaign'] || '',
      term: utmParams['utm_term'] || '',
      content: utmParams['utm_content'] || ''
    };

    const audit = auditUTM(auditParams);

    return {
      isValid: true,
      originalUrl: rawUrlString,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      baseUrl: `${parsed.origin}${parsed.pathname}`,
      hash: parsed.hash,
      utmParams,
      otherParams,
      audit,
      totalParamsCount: Array.from(parsed.searchParams.keys()).length
    };
  } catch (err) {
    return {
      isValid: false,
      error: 'Invalid URL. Please enter a valid web address with domain and path.'
    };
  }
}
