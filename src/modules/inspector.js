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
  if (!/^[a-z][a-z\d+.-]*:\/\//i.test(formatted)) {
    formatted = 'https://' + formatted;
  }

  try {
    const parsed = new URL(formatted);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Unsupported protocol');
    const utmParams = {};
    const otherParams = {};
    const allParams = Array.from(parsed.searchParams.entries());

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
      allParams,
      fullUrl: parsed.toString(),
      audit,
      totalParamsCount: allParams.length
    };
  } catch (err) {
    return {
      isValid: false,
      error: 'Invalid URL. Please enter a valid web address with domain and path.'
    };
  }
}
