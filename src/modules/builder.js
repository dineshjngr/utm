/**
 * Single URL Builder Core Logic & Syntax Highlighting
 */

export function sanitizeValue(value, options = {}) {
  if (!value) return '';
  let str = String(value);

  if (options.trimSpaces !== false) {
    str = str.trim();
  }

  if (options.lowercase) {
    // Ad platforms treat macro names as case-sensitive. Lowercase the
    // surrounding taxonomy while preserving {macro} and {{MACRO}} tokens.
    str = str
      .split(/(\{\{.*?\}\}|\{.*?\})/g)
      .map(part => part.startsWith('{') ? part : part.toLowerCase())
      .join('');
  }

  const spaceReplacer = options.spaceReplacement || '-';
  if (spaceReplacer !== 'none') {
    str = str.replace(/\s+/g, spaceReplacer);
  }

  return str;
}

export function buildUTMUrl(input, options = {}) {
  const {
    baseUrl = '',
    source = '',
    medium = '',
    campaign = '',
    term = '',
    content = '',
    utmId = '',
    customParams = []
  } = input;

  if (!baseUrl.trim()) {
    return {
      isValid: false,
      url: '',
      error: 'Please enter a target website URL'
    };
  }

  let fullUrlString = baseUrl.trim();
  if (options.autoProtocol !== false && !/^https?:\/\//i.test(fullUrlString)) {
    fullUrlString = 'https://' + fullUrlString;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(fullUrlString);
  } catch (err) {
    return {
      isValid: false,
      url: '',
      error: 'Invalid URL format. Please check the domain syntax.'
    };
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return { isValid: false, url: '', error: 'Only HTTP and HTTPS destination URLs are supported.' };
  }

  // Handle existing parameters: strip existing utm params if requested
  if (options.stripDuplicateUtms !== false) {
    const keysToRemove = [];
    for (const key of parsedUrl.searchParams.keys()) {
      if (key.toLowerCase().startsWith('utm_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => parsedUrl.searchParams.delete(k));
  }

  const cleanSource = sanitizeValue(source, options);
  const cleanMedium = sanitizeValue(medium, options);
  const cleanCampaign = sanitizeValue(campaign, options);
  const cleanTerm = sanitizeValue(term, options);
  const cleanContent = sanitizeValue(content, options);
  const cleanUtmId = sanitizeValue(utmId, options);

  const setUtm = (key, value) => {
    if (!value) return;
    if (options.stripDuplicateUtms === false) setLastParamPreservingDuplicates(parsedUrl.searchParams, key, value);
    else parsedUrl.searchParams.set(key, value);
  };
  setUtm('utm_source', cleanSource);
  setUtm('utm_medium', cleanMedium);
  setUtm('utm_campaign', cleanCampaign);
  setUtm('utm_id', cleanUtmId);
  setUtm('utm_term', cleanTerm);
  setUtm('utm_content', cleanContent);

  // Custom parameters
  if (Array.isArray(customParams)) {
    const seenKeys = new Set();
    for (const param of customParams) {
      if (param && param.key && param.key.trim() && param.value && param.value.trim()) {
        const cleanKey = sanitizeValue(param.key, { ...options, lowercase: false });
        const cleanVal = sanitizeValue(param.value, options);
        const normalizedKey = cleanKey.toLowerCase();
        if (normalizedKey.startsWith('utm_')) return {
          isValid: false, url: '', error: 'Custom parameter names cannot start with utm_; use the dedicated UTM fields.'
        };
        if (!seenKeys.has(normalizedKey)) parsedUrl.searchParams.set(cleanKey, cleanVal);
        seenKeys.add(normalizedKey);
      }
    }
  }

  let finalUrl = parsedUrl.toString();

  // Handle URL encoding for specific space replacement options:
  // URLSearchParams automatically encodes '+' as '%2B' and '%' as '%25'.
  // If the user intentionally chose '+' or '%20' as their space delimiter,
  // decode those specific tokens so the query string matches their exact choice.
  if (options.spaceReplacement === '+') {
    finalUrl = finalUrl.replace(/%2B/g, '+');
  } else if (options.spaceReplacement === '%20') {
    finalUrl = finalUrl.replace(/%2520/g, '%20');
  }

  // Preserve ad network dynamic macro tokens ({keyword}, {{campaign.name}})
  finalUrl = finalUrl
    .replace(/%7B%7B([^%]+)%7D%7D/g, '{{$1}}')
    .replace(/%7B([^%]+)%7D/g, '{$1}');

  return {
    isValid: true,
    url: finalUrl,
    parsed: parsedUrl,
    error: null
  };
}

function setLastParamPreservingDuplicates(params, key, value) {
  const entries = Array.from(params.entries());
  let lastIndex = -1;
  entries.forEach(([existingKey], index) => { if (existingKey === key) lastIndex = index; });
  if (lastIndex === -1) entries.push([key, value]);
  else entries[lastIndex][1] = value;
  while (params.size) params.delete(params.keys().next().value);
  entries.forEach(([entryKey, entryValue]) => params.append(entryKey, entryValue));
}

/**
 * Returns formatted HTML highlighting each parameter type for visual clarity
 */
export function getHighlightedUrlHtml(urlString) {
  if (!urlString) return '<span class="url-placeholder">Your tracked URL will appear here in real-time...</span>';

  try {
    const hashIndex = urlString.indexOf('#');
    const hash = hashIndex !== -1 ? urlString.slice(hashIndex) : '';
    const withoutHash = hashIndex !== -1 ? urlString.slice(0, hashIndex) : urlString;

    const qIndex = withoutHash.indexOf('?');
    const originAndPath = qIndex !== -1 ? withoutHash.slice(0, qIndex) : withoutHash;
    const rawQuery = qIndex !== -1 ? withoutHash.slice(qIndex + 1) : '';

    let html = `<span class="url-part-base">${escapeHtml(originAndPath)}</span>`;

    if (rawQuery) {
      html += `<span class="url-part-delimiter">?</span>`;
      const pairs = rawQuery.split('&');
      const parts = [];

      for (const pair of pairs) {
        if (!pair) continue;
        const eqIdx = pair.indexOf('=');
        const key = eqIdx !== -1 ? pair.slice(0, eqIdx) : pair;
        const val = eqIdx !== -1 ? pair.slice(eqIdx + 1) : '';

        let tagClass = 'url-param-custom';
        const lowerKey = key.toLowerCase();
        if (lowerKey === 'utm_source') tagClass = 'url-param-source';
        else if (lowerKey === 'utm_medium') tagClass = 'url-param-medium';
        else if (lowerKey === 'utm_campaign') tagClass = 'url-param-campaign';
        else if (lowerKey === 'utm_term') tagClass = 'url-param-term';
        else if (lowerKey === 'utm_content') tagClass = 'url-param-content';
        else if (lowerKey === 'utm_id') tagClass = 'url-param-id';

        parts.push(
          `<span class="url-param-item ${tagClass}" data-param-key="${escapeHtml(key)}" title="Click to edit ${escapeHtml(key)}">` +
            `<span class="url-param-key">${escapeHtml(key)}</span>` +
            `<span class="url-param-eq">=</span>` +
            `<span class="url-param-val">${escapeHtml(val)}</span>` +
          `</span>`
        );
      }

      html += parts.join('<span class="url-part-amp">&amp;</span>');
    }

    if (hash) {
      html += `<span class="url-part-hash">${escapeHtml(hash)}</span>`;
    }

    return html;
  } catch {
    return `<span class="url-plain">${escapeHtml(urlString)}</span>`;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
