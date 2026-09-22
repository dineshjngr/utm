/**
 * URL Shortener Service
 * Provides fast, client-side URL shortening with automatic fallback redundancy.
 */

/**
 * Shortens a long URL using reliable, CORS-compliant public shorteners.
 * Primary: da.gd (CORS enabled, no redirects on creation, clean 302s)
 * Fallback: clck.ru (CORS enabled, fast fallback)
 *
 * @param {string} longUrl - The full destination URL to shorten.
 * @param {Object} [options]
 * @param {number} [options.timeoutMs=6000] - Request timeout in milliseconds.
 * @param {Function} [options.fetchFn=window.fetch] - Custom fetch implementation for testing.
 * @returns {Promise<{ success: boolean, shortUrl?: string, originalUrl?: string, provider?: string, error?: string }>}
 */
export async function shortenUrl(longUrl, options = {}) {
  const trimmed = (longUrl || '').trim();
  if (!trimmed) {
    return { success: false, error: 'Please provide a valid URL to shorten.' };
  }

  let parsed;
  try {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) {
      parsed = new URL(trimmed);
    } else {
      parsed = new URL(`https://${trimmed}`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { success: false, error: 'Only HTTP and HTTPS URLs can be shortened.' };
    }
  } catch {
    return { success: false, error: 'Invalid URL format.' };
  }

  const timeoutMs = options.timeoutMs || 6000;
  const fetchFn = options.fetchFn || (typeof fetch !== 'undefined' ? fetch : null);

  if (!fetchFn) {
    return { success: false, error: 'Fetch API is not available in this environment.' };
  }

  // 1. Attempt Primary: da.gd
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const endpoint = `https://da.gd/s?url=${encodeURIComponent(trimmed)}`;

    const response = await fetchFn(endpoint, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timer);

    if (response.ok) {
      const text = (await response.text()).trim();
      if (text.startsWith('http://') || text.startsWith('https://')) {
        return {
          success: true,
          shortUrl: text,
          originalUrl: trimmed,
          provider: 'da.gd'
        };
      }
    }
  } catch (err) {
    // Primary failed, proceed to fallback
    console.warn('da.gd shortener failed, attempting fallback...', err);
  }

  // 2. Attempt Fallback 1: spoo.me (CORS enabled, clean 302 direct redirect)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetchFn('https://spoo.me/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ url: trimmed }),
      signal: controller.signal
    });
    clearTimeout(timer);

    if (response.ok) {
      const data = await response.json();
      if (data && data.short_url) {
        const shortHttps = data.short_url.replace(/^http:\/\//i, 'https://');
        return {
          success: true,
          shortUrl: shortHttps,
          originalUrl: trimmed,
          provider: 'spoo.me'
        };
      }
    }
  } catch (err) {
    console.warn('spoo.me shortener failed, attempting clck.ru...', err);
  }

  // 3. Attempt Fallback 2: clck.ru
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const endpoint = `https://clck.ru/--?url=${encodeURIComponent(trimmed)}`;

    const response = await fetchFn(endpoint, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timer);

    if (response.ok) {
      const text = (await response.text()).trim();
      if (text.startsWith('http://') || text.startsWith('https://')) {
        return {
          success: true,
          shortUrl: text,
          originalUrl: trimmed,
          provider: 'clck.ru'
        };
      }
    }
  } catch (err) {
    console.warn('clck.ru fallback shortener failed:', err);
  }

  return {
    success: false,
    error: 'Could not shorten URL. Please check your network connection and try again.'
  };
}

/**
 * Calculates character savings between long and short URLs.
 *
 * @param {string} originalUrl
 * @param {string} shortUrl
 * @returns {{ originalLen: number, shortLen: number, savedChars: number, percentSaved: number }}
 */
export function calculateSavings(originalUrl, shortUrl) {
  const originalLen = originalUrl ? originalUrl.length : 0;
  const shortLen = shortUrl ? shortUrl.length : 0;
  const savedChars = Math.max(0, originalLen - shortLen);
  const percentSaved = originalLen > 0 ? Math.round((savedChars / originalLen) * 100) : 0;

  return {
    originalLen,
    shortLen,
    savedChars,
    percentSaved
  };
}
