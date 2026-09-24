import { buildUTMUrl, getHighlightedUrlHtml, sanitizeValue } from './modules/builder.js';
import { getAllPresets, saveCustomPreset, deleteCustomPreset } from './modules/presets.js';
import { renderQRCode, downloadQRCode, downloadQRCodeSVG, copyQRCodeImage } from './modules/qr.js';
import { 
  getHistory, 
  saveToHistory, 
  toggleStarHistory, 
  deleteHistoryItem, 
  clearAllHistory, 
  exportHistoryToCSV, 
  exportHistoryToJSON 
} from './modules/history.js';
import { 
  GA4_CHANNEL_RULES, 
  GA4_UNASSIGNED_FIXES, 
  CAMPAIGN_TAGGING_STEPS, 
  DOS_AND_DONTS, 
  GOLDEN_RULES, 
  auditUTM 
} from './modules/taxonomy.js';
import { BATCH_CHANNELS, generateBatchMatrix, exportBatchToCSV, exportBatchToTSV } from './modules/batch.js';
import { deconstructUrl } from './modules/inspector.js';
import { shortenUrl, calculateSavings } from './modules/shortener.js';

// =========================================================
// APPLICATION STATE
// =========================================================
const DESTINATION_STORAGE_KEY = 'utmc_destination_url';

const state = {
  theme: localStorage.getItem('utmc_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  activeTab: 'tab-builder',
  single: {
    baseUrl: localStorage.getItem(DESTINATION_STORAGE_KEY) || '',
    source: 'google',
    medium: 'cpc',
    campaign: 'summer_sale_2025',
    term: '',
    content: '',
    utmId: '',
    customParams: []
  },
  options: {
    lowercase: true,
    spaceReplacement: '-',
    autoProtocol: true,
    stripDuplicateUtms: true,
    trimSpaces: true,
    autoApplyFields: typeof localStorage !== 'undefined' && localStorage.getItem('utmc_rule_auto_apply') === 'true'
  },
  currentGeneratedUrl: '',
  shortUrl: '',
  shortUrlOriginal: '',
  qrTarget: 'full', // 'full' | 'short'
  qrGenerated: false,
  batchResults: [],
  activePresetId: null,
  filterStarred: false
};

// =========================================================
// TOAST NOTIFICATIONS
// =========================================================
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  const iconEl = document.createElement('span');
  iconEl.style.cssText = 'font-weight: 700; font-size: 1rem;';
  iconEl.textContent = icon;
  const messageEl = document.createElement('span');
  messageEl.textContent = message;
  toast.append(iconEl, messageEl);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function safeHttpUrl(value) {
  try { const url = new URL(String(value)); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}

// =========================================================
// THEME MANAGEMENT
// =========================================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcons();

  const toggleBtn = document.getElementById('btn-theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('utmc_theme', state.theme);
      updateThemeIcons();
      updateQRCode(); // Re-render QR with proper dark/light contrast
    });
  }
}

function updateThemeIcons() {
  const moon = document.getElementById('theme-icon-moon');
  const sun = document.getElementById('theme-icon-sun');
  if (moon && sun) {
    if (state.theme === 'light') {
      moon.style.display = 'block';
      sun.style.display = 'none';
    } else {
      moon.style.display = 'none';
      sun.style.display = 'block';
    }
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', state.theme === 'dark' ? '#09090b' : '#f8fafc');
  }
}

// =========================================================
// TAB NAVIGATION
// =========================================================
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.nav-tab'));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      const targetId = tab.getAttribute('data-tab');
      if (!targetId || !document.getElementById(targetId)) {
        // Let standard <a> link navigation proceed for cross-page links
        return;
      }
      e.preventDefault();
      switchTab(targetId);
    });

    tab.addEventListener('keydown', (event) => {
      const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!navigationKeys.includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      const targetId = tabs[nextIndex].getAttribute('data-tab');
      if (targetId && document.getElementById(targetId)) {
        switchTab(targetId);
      }
    });
  });

  // Top header nav links
  document.querySelectorAll('.nav-header-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-tab-target');
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        switchTab(targetId);
      }
    });
  });

  // Header "New Link" button
  const headerNewBtn = document.getElementById('btn-header-new');
  if (headerNewBtn) {
    headerNewBtn.addEventListener('click', () => {
      if (document.getElementById('tab-builder')) {
        switchTab('tab-builder');
      }
      const input = document.getElementById('input-base-url');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.location.href = '/campaign-url-builder/';
      }
    });
  }

  const isDedicatedPage = typeof document !== 'undefined' && !!document.body?.dataset?.page;
  const initialTab = isDedicatedPage
    ? (document.body.dataset.activeTab || 'tab-builder')
    : (Object.entries(TAB_META).find(([, meta]) => `#${meta.slug}` === window.location.hash)?.[0] || 'tab-builder');
  if (initialTab && document.getElementById(initialTab)) {
    switchTab(initialTab, { updateUrl: false });
  }

  if (!isDedicatedPage) {
    window.addEventListener('hashchange', () => {
      const matchingTab = Object.entries(TAB_META)
        .find(([, meta]) => `#${meta.slug}` === window.location.hash)?.[0];
      if (matchingTab) switchTab(matchingTab, { updateUrl: false });
    });
  }
}

const TAB_META = {
  'tab-builder': {
    slug: 'builder',
    title: 'Free UTM Builder & GA4 Campaign URL Generator | UTMCraft',
    description: 'Build GA4-ready UTM campaign URLs, apply channel presets, audit naming quality, and generate campaign QR codes.'
  },
  'tab-batch': {
    slug: 'bulk-generator',
    title: 'Bulk UTM Generator & Campaign URL Matrix | UTMCraft',
    description: 'Generate consistent UTM links across multiple landing pages and advertising channels, then copy or export the campaign matrix.'
  },
  'tab-inspector': {
    slug: 'utm-inspector',
    title: 'UTM Link Checker & URL Inspector | UTMCraft',
    description: 'Inspect campaign URLs, extract UTM parameters, audit GA4 compliance, and fix inconsistent tracking links in your browser.'
  },
  'tab-taxonomy': {
    slug: 'ga4-taxonomy',
    title: 'GA4 Channel Grouping & UTM Taxonomy Guide | UTMCraft',
    description: 'Learn consistent source and medium values for GA4 default channel grouping and build standardized campaign names.'
  },
  'tab-history': {
    slug: 'campaign-history',
    title: 'Campaign URL History & Export Tool | UTMCraft',
    description: 'Search, bookmark, and export UTM campaign URLs stored privately in your browser.'
  }
};

function switchTab(tabId, { updateUrl = true } = {}) {
  if (!tabId || !document.getElementById(tabId)) return;
  state.activeTab = tabId;

  document.querySelectorAll('.nav-tab[data-tab]').forEach(btn => {
    const isCurrent = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isCurrent);
    if (btn.tagName === 'BUTTON') {
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    } else if (isCurrent) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('.nav-header-link').forEach(link => {
    const isCurrent = link.getAttribute('data-tab-target') === tabId;
    link.classList.toggle('active', isCurrent);
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    const isCurrent = pane.id === tabId;
    pane.classList.toggle('active', isCurrent);
    pane.hidden = !isCurrent;
  });

  const isDedicatedPage = typeof document !== 'undefined' && !!document.body?.dataset?.page;
  const meta = TAB_META[tabId];
  if (meta && !isDedicatedPage) {
    const socialTitle = meta.title.replace(' | UTMCraft', '');
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', socialTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', socialTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);
    if (updateUrl) history.replaceState(null, '', `#${meta.slug}`);
  }

  if (tabId === 'tab-history') {
    renderHistoryView();
  }
}

// =========================================================
// SINGLE URL BUILDER CONTROLLER
// =========================================================
function initSingleBuilder() {
  // Elements
  const inputBaseUrl = document.getElementById('input-base-url');
  if (!inputBaseUrl) return;

  const inputSource = document.getElementById('input-utm-source');
  const inputMedium = document.getElementById('input-utm-medium');
  const inputCampaign = document.getElementById('input-utm-campaign');
  const inputTerm = document.getElementById('input-utm-term');
  const inputContent = document.getElementById('input-utm-content');
  const inputUtmId = document.getElementById('input-utm-id');

  // Rules elements
  const ruleLowercase = document.getElementById('rule-lowercase');
  const ruleSpace = document.getElementById('rule-space-replacement');
  const ruleProtocol = document.getElementById('rule-auto-protocol');
  const ruleDuplicate = document.getElementById('rule-strip-duplicate');
  const ruleAutoApply = document.getElementById('rule-auto-apply-fields');
  const btnApplyRules = document.getElementById('btn-apply-rules-to-fields');
  const btnResetRules = document.getElementById('btn-reset-rules-defaults');
  const previewDelimiter = document.getElementById('rules-delimiter-preview');

  // Initial populate from state
  if (inputBaseUrl) inputBaseUrl.value = state.single.baseUrl;
  if (inputSource) inputSource.value = state.single.source;
  if (inputMedium) inputMedium.value = state.single.medium;
  if (inputCampaign) inputCampaign.value = state.single.campaign;
  if (inputTerm) inputTerm.value = state.single.term;
  if (inputContent) inputContent.value = state.single.content;
  if (inputUtmId) inputUtmId.value = state.single.utmId;

  // Real-time recalculation listener
  const formInputs = [
    inputBaseUrl, inputSource, inputMedium, inputCampaign, 
    inputTerm, inputContent, inputUtmId
  ].filter(Boolean);

  formInputs.forEach(el => {
    el.addEventListener('input', () => {
      if (state.activePresetId && [inputSource, inputMedium, inputTerm, inputContent].includes(el)) {
        state.activePresetId = null;
        updatePresetChipSelection();
      }
      readSingleInputs();
      recalculateSingleUrl();
    });
  });

  function checkUrlForExistingUtms(rawVal) {
    const container = document.getElementById('detected-utms-container');
    if (!container) return;

    if (!rawVal || !rawVal.trim()) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    try {
      const testUrl = new URL(rawVal.startsWith('http') ? rawVal : `https://${rawVal}`);
      const utmKeys = Array.from(testUrl.searchParams.keys()).filter(k => k.toLowerCase().startsWith('utm_'));
      if (utmKeys.length > 0) {
        container.style.display = 'block';
        container.innerHTML = `
          <div class="detected-utms-alert">
            <span>⚡ Detected ${utmKeys.length} existing UTM tag${utmKeys.length > 1 ? 's' : ''} in URL</span>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" id="btn-extract-utms" class="btn btn-primary btn-sm">Extract into fields</button>
              <button type="button" id="btn-dismiss-utms" class="btn btn-ghost btn-sm" title="Dismiss">✕</button>
            </div>
          </div>
        `;

        const extractBtn = document.getElementById('btn-extract-utms');
        if (extractBtn) {
          extractBtn.addEventListener('click', () => {
            const cleanBase = `${testUrl.origin}${testUrl.pathname}`;
            inputBaseUrl.value = cleanBase;

            if (testUrl.searchParams.get('utm_source')) inputSource.value = testUrl.searchParams.get('utm_source');
            if (testUrl.searchParams.get('utm_medium')) inputMedium.value = testUrl.searchParams.get('utm_medium');
            if (testUrl.searchParams.get('utm_campaign')) inputCampaign.value = testUrl.searchParams.get('utm_campaign');
            if (testUrl.searchParams.get('utm_term')) inputTerm.value = testUrl.searchParams.get('utm_term');
            if (testUrl.searchParams.get('utm_content')) inputContent.value = testUrl.searchParams.get('utm_content');
            if (testUrl.searchParams.get('utm_id')) inputUtmId.value = testUrl.searchParams.get('utm_id');

            container.style.display = 'none';
            container.innerHTML = '';

            readSingleInputs();
            recalculateSingleUrl();
            showToast('Extracted UTM parameters into fields!', 'success');
          });
        }

        const dismissBtn = document.getElementById('btn-dismiss-utms');
        if (dismissBtn) {
          dismissBtn.addEventListener('click', () => {
            container.style.display = 'none';
            container.innerHTML = '';
          });
        }
      } else {
        container.style.display = 'none';
        container.innerHTML = '';
      }
    } catch {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }

  inputBaseUrl.addEventListener('input', () => {
    checkUrlForExistingUtms(inputBaseUrl.value);
  });
  inputBaseUrl.addEventListener('paste', () => {
    setTimeout(() => checkUrlForExistingUtms(inputBaseUrl.value), 50);
  });

  // Targeted clear action: leave campaign settings intact while changing the destination.
  const clearUrlBtn = document.getElementById('btn-clear-url');
  if (clearUrlBtn) {
    clearUrlBtn.addEventListener('click', () => {
      inputBaseUrl.value = '';
      checkUrlForExistingUtms('');
      readSingleInputs();
      recalculateSingleUrl();
      inputBaseUrl.focus();
      showToast('Destination URL cleared', 'info');
    });
  }

  // Rules badge and preview updater
  function updateRulesSummaryBadges() {
    const badgeCase = document.getElementById('badge-rule-case');
    const badgeSpace = document.getElementById('badge-rule-space');
    const badgeProto = document.getElementById('badge-rule-proto');
    const badgeClean = document.getElementById('badge-rule-clean');

    if (badgeCase) {
      const active = state.options.lowercase !== false;
      badgeCase.className = `rules-badge ${active ? 'is-active' : 'is-inactive'}`;
      badgeCase.textContent = active ? 'lowercase' : 'no-lowercase';
    }

    if (badgeSpace) {
      const repl = state.options.spaceReplacement;
      let display = 'delimiter: -';
      if (repl === '_') display = 'delimiter: _';
      else if (repl === '+') display = 'delimiter: +';
      else if (repl === '%20') display = 'delimiter: %20';
      else if (repl === 'none') display = 'delimiter: space';
      badgeSpace.className = 'rules-badge is-active';
      badgeSpace.textContent = display;
    }

    if (badgeProto) {
      const active = state.options.autoProtocol !== false;
      badgeProto.className = `rules-badge ${active ? 'is-active' : 'is-inactive'}`;
      badgeProto.textContent = active ? 'https://' : 'no-protocol';
    }

    if (badgeClean) {
      const active = state.options.stripDuplicateUtms !== false;
      badgeClean.className = `rules-badge ${active ? 'is-active' : 'is-inactive'}`;
      badgeClean.textContent = active ? 'strip utms' : 'keep utms';
    }

    if (previewDelimiter) {
      const sample = 'summer sale 2025';
      previewDelimiter.textContent = sanitizeValue(sample, state.options);
    }
  }

  // Apply active sanitization & formatting rules directly to form inputs
  function applyRulesToFields({ showFeedback = true } = {}) {
    const utmFields = [
      { el: inputSource, key: 'source' },
      { el: inputMedium, key: 'medium' },
      { el: inputCampaign, key: 'campaign' },
      { el: inputTerm, key: 'term' },
      { el: inputContent, key: 'content' },
      { el: inputUtmId, key: 'utmId' }
    ];

    const updatedElements = [];

    utmFields.forEach(({ el, key }) => {
      if (el && el.value.trim()) {
        const original = el.value;
        const cleaned = sanitizeValue(original, state.options);
        if (cleaned !== original) {
          el.value = cleaned;
          state.single[key] = cleaned;
          updatedElements.push(el);
        }
      }
    });

    // Sanitize custom parameters
    if (Array.isArray(state.single.customParams) && state.single.customParams.length > 0) {
      let customChanged = false;
      state.single.customParams.forEach(param => {
        if (param.value && param.value.trim()) {
          const original = param.value;
          const cleaned = sanitizeValue(original, state.options);
          if (cleaned !== original) {
            param.value = cleaned;
            customChanged = true;
          }
        }
      });
      if (customChanged) {
        renderCustomParams();
      }
    }

    // Sanitize destination URL
    if (inputBaseUrl && inputBaseUrl.value.trim()) {
      let val = inputBaseUrl.value.trim();
      const originalVal = val;
      if (state.options.autoProtocol !== false && !/^https?:\/\//i.test(val)) {
        val = `https://${val}`;
      }
      if (state.options.stripDuplicateUtms !== false) {
        try {
          const testBase = val.startsWith('http') ? val : `https://${val}`;
          const u = new URL(testBase);
          const keysToRemove = Array.from(u.searchParams.keys()).filter(k => k.toLowerCase().startsWith('utm_'));
          if (keysToRemove.length > 0) {
            keysToRemove.forEach(k => u.searchParams.delete(k));
            val = u.toString();
          }
        } catch {}
      }
      if (val !== originalVal) {
        inputBaseUrl.value = val;
        state.single.baseUrl = val;
        updatedElements.push(inputBaseUrl);
      }
    }

    readSingleInputs();
    recalculateSingleUrl();

    if (showFeedback) {
      const pulseTargets = updatedElements.length > 0 ? updatedElements : formInputs;
      pulseTargets.forEach(el => {
        if (!el) return;
        el.classList.remove('field-sanitized-pulse');
        void el.offsetWidth;
        el.classList.add('field-sanitized-pulse');
        setTimeout(() => el.classList.remove('field-sanitized-pulse'), 800);
      });

      const count = updatedElements.length;
      showToast(count > 0 
        ? `✨ Applied formatting rules to ${count} field${count > 1 ? 's' : ''}!`
        : '✨ Formatting rules verified (all fields already clean)!', 'success');
    }
  }

  // Auto-clean fields on blur if option is enabled
  const utmParamInputs = [inputSource, inputMedium, inputCampaign, inputTerm, inputContent, inputUtmId].filter(Boolean);
  utmParamInputs.forEach(el => {
    el.addEventListener('blur', () => {
      if (state.options.autoApplyFields && el.value.trim()) {
        const cleaned = sanitizeValue(el.value, state.options);
        if (cleaned !== el.value) {
          el.value = cleaned;
          readSingleInputs();
          recalculateSingleUrl();
          el.classList.remove('field-sanitized-pulse');
          void el.offsetWidth;
          el.classList.add('field-sanitized-pulse');
          setTimeout(() => el.classList.remove('field-sanitized-pulse'), 800);
        }
      }
    });
  });

  if (inputBaseUrl) {
    inputBaseUrl.addEventListener('blur', () => {
      if (state.options.autoApplyFields && inputBaseUrl.value.trim()) {
        let val = inputBaseUrl.value.trim();
        const originalVal = val;
        if (state.options.autoProtocol !== false && !/^https?:\/\//i.test(val)) {
          val = `https://${val}`;
        }
        if (val !== originalVal) {
          inputBaseUrl.value = val;
          readSingleInputs();
          recalculateSingleUrl();
          inputBaseUrl.classList.remove('field-sanitized-pulse');
          void inputBaseUrl.offsetWidth;
          inputBaseUrl.classList.add('field-sanitized-pulse');
          setTimeout(() => inputBaseUrl.classList.remove('field-sanitized-pulse'), 800);
        }
      }
    });
  }

  // Initial populate of rules controls
  if (ruleLowercase) ruleLowercase.checked = state.options.lowercase !== false;
  if (ruleSpace) ruleSpace.value = state.options.spaceReplacement || '-';
  if (ruleProtocol) ruleProtocol.checked = state.options.autoProtocol !== false;
  if (ruleDuplicate) ruleDuplicate.checked = state.options.stripDuplicateUtms !== false;
  if (ruleAutoApply) ruleAutoApply.checked = !!state.options.autoApplyFields;

  updateRulesSummaryBadges();

  if (btnApplyRules) {
    btnApplyRules.addEventListener('click', () => {
      applyRulesToFields({ showFeedback: true });
    });
  }

  if (ruleAutoApply) {
    ruleAutoApply.addEventListener('change', () => {
      state.options.autoApplyFields = ruleAutoApply.checked;
      try {
        localStorage.setItem('utmc_rule_auto_apply', String(ruleAutoApply.checked));
      } catch {}
      if (ruleAutoApply.checked) {
        applyRulesToFields({ showFeedback: true });
      }
    });
  }

  if (btnResetRules) {
    btnResetRules.addEventListener('click', () => {
      state.options.lowercase = true;
      state.options.spaceReplacement = '-';
      state.options.autoProtocol = true;
      state.options.stripDuplicateUtms = true;
      state.options.autoApplyFields = false;
      try {
        localStorage.removeItem('utmc_rule_auto_apply');
      } catch {}

      if (ruleLowercase) ruleLowercase.checked = true;
      if (ruleSpace) ruleSpace.value = '-';
      if (ruleProtocol) ruleProtocol.checked = true;
      if (ruleDuplicate) ruleDuplicate.checked = true;
      if (ruleAutoApply) ruleAutoApply.checked = false;

      updateRulesSummaryBadges();
      recalculateSingleUrl();
      showToast('Restored GA4 recommended formatting rules', 'info');
    });
  }

  // Rules toggles
  if (ruleLowercase) {
    ruleLowercase.addEventListener('change', () => {
      state.options.lowercase = ruleLowercase.checked;
      updateRulesSummaryBadges();
      recalculateSingleUrl();
      if (state.options.autoApplyFields) {
        applyRulesToFields({ showFeedback: false });
      }
    });
  }
  if (ruleSpace) {
    ruleSpace.addEventListener('change', () => {
      state.options.spaceReplacement = ruleSpace.value;
      updateRulesSummaryBadges();
      recalculateSingleUrl();
      if (state.options.autoApplyFields) {
        applyRulesToFields({ showFeedback: false });
      }
    });
  }
  if (ruleProtocol) {
    ruleProtocol.addEventListener('change', () => {
      state.options.autoProtocol = ruleProtocol.checked;
      updateRulesSummaryBadges();
      recalculateSingleUrl();
      if (state.options.autoApplyFields) {
        applyRulesToFields({ showFeedback: false });
      }
    });
  }
  if (ruleDuplicate) {
    ruleDuplicate.addEventListener('change', () => {
      state.options.stripDuplicateUtms = ruleDuplicate.checked;
      updateRulesSummaryBadges();
      recalculateSingleUrl();
      if (state.options.autoApplyFields) {
        applyRulesToFields({ showFeedback: false });
      }
    });
  }

  // Quick fill links
  document.querySelectorAll('.quick-url-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      inputBaseUrl.value = btn.getAttribute('data-url');
      checkUrlForExistingUtms(inputBaseUrl.value);
      readSingleInputs();
      recalculateSingleUrl();
      showToast('Destination URL filled!', 'info');
    });
  });

  // Action: Copy URL
  const copyBtn = document.getElementById('btn-copy-url');
  if (copyBtn) {
    copyBtn.addEventListener('click', handleCopyUrl);
  }

  // Click URL Output Box to copy or focus clicked param
  const outputBox = document.getElementById('url-output-box');
  if (outputBox) {
    outputBox.addEventListener('click', (e) => {
      const paramItem = e.target.closest('.url-param-item');
      if (paramItem) {
        const key = paramItem.getAttribute('data-param-key');
        const inputMap = {
          'utm_source': inputSource,
          'utm_medium': inputMedium,
          'utm_campaign': inputCampaign,
          'utm_term': inputTerm,
          'utm_content': inputContent,
          'utm_id': inputUtmId
        };
        const targetInput = inputMap[key];
        if (targetInput) {
          targetInput.focus();
          targetInput.select();
          return;
        }
      }
      handleCopyUrl();
    });
  }

  // Action: Test URL
  const testBtn = document.getElementById('btn-test-url');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      if (state.currentGeneratedUrl) {
        window.open(state.currentGeneratedUrl, '_blank', 'noopener,noreferrer');
      } else {
        showToast('Please enter a valid URL first', 'error');
      }
    });
  }

  // Action: Jump to QR code (Test • QR • Save)
  function jumpToQrCode() {
    if (!state.currentGeneratedUrl) {
      showToast('Please enter a destination URL first', 'error');
      return;
    }
    if (!state.qrGenerated) {
      generateActiveQRCode(false, false);
    }
    const qrSection = document.getElementById('qr-canvas')?.closest('.card');
    if (qrSection) {
      qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      qrSection.classList.remove('field-sanitized-pulse');
      void qrSection.offsetWidth;
      qrSection.classList.add('field-sanitized-pulse');
      setTimeout(() => qrSection.classList.remove('field-sanitized-pulse'), 1200);
    }
  }

  const jumpQrBtn = document.getElementById('btn-jump-qr');
  if (jumpQrBtn) {
    jumpQrBtn.addEventListener('click', jumpToQrCode);
  }

  // Mobile Sticky Bar Actions
  const mobileStickyCopyBtn = document.getElementById('btn-mobile-sticky-copy');
  if (mobileStickyCopyBtn) {
    mobileStickyCopyBtn.addEventListener('click', async () => {
      await handleCopyUrl();
      if (navigator.vibrate) {
        try { navigator.vibrate(35); } catch {}
      }
      const copyText = document.getElementById('btn-mobile-sticky-copy-text');
      if (copyText) {
        const origText = copyText.textContent;
        copyText.textContent = '✓ Copied!';
        setTimeout(() => {
          copyText.textContent = origText;
        }, 1800);
      }
    });
  }

  const mobileStickyTestBtn = document.getElementById('btn-mobile-sticky-test');
  if (mobileStickyTestBtn) {
    mobileStickyTestBtn.addEventListener('click', () => {
      if (state.currentGeneratedUrl) {
        window.open(state.currentGeneratedUrl, '_blank', 'noopener,noreferrer');
      } else {
        showToast('Please enter a valid URL first', 'error');
      }
    });
  }

  const mobileStickyQrBtn = document.getElementById('btn-mobile-sticky-qr');
  if (mobileStickyQrBtn) {
    mobileStickyQrBtn.addEventListener('click', jumpToQrCode);
  }

  // Action: Save to History
  const saveBtn = document.getElementById('btn-save-history');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (!state.currentGeneratedUrl) {
        showToast('No valid URL to save', 'error');
        return;
      }
    saveToHistory({
      url: state.currentGeneratedUrl,
      shortUrl: state.shortUrlOriginal === state.currentGeneratedUrl ? state.shortUrl : '',
      baseUrl: state.single.baseUrl,
      source: state.single.source,
      medium: state.single.medium,
      campaign: state.single.campaign,
      term: state.single.term,
      content: state.single.content,
      customParams: state.single.customParams
    });
    updateHistoryBadge();
    showToast('Saved link to Campaign History!', 'success');
    });
  }

  // Action: Shorten URL
  const shortenBtn = document.getElementById('btn-shorten-url');
  if (shortenBtn) {
    shortenBtn.addEventListener('click', handleShortenUrl);
  }

  // Action: Copy Short URL
  const copyShortBtn = document.getElementById('btn-copy-short-url');
  if (copyShortBtn) {
    copyShortBtn.addEventListener('click', handleCopyShortUrl);
  }

  // Action: Test Short URL
  const testShortBtn = document.getElementById('btn-test-short-url');
  if (testShortBtn) {
    testShortBtn.addEventListener('click', () => {
      if (state.shortUrl) {
        window.open(state.shortUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Action: Toggle Short URL in QR Code
  const qrShortBtn = document.getElementById('btn-short-url-qr');
  if (qrShortBtn) {
    qrShortBtn.addEventListener('click', handleToggleShortUrlQR);
  }

  // Action: Close Short URL Card
  const closeShortBtn = document.getElementById('btn-close-short-url');
  if (closeShortBtn) {
    closeShortBtn.addEventListener('click', handleCloseShortUrl);
  }

  // Action: Reset Form
  const resetBtn = document.getElementById('btn-reset-form');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      inputBaseUrl.value = '';
      inputSource.value = '';
      inputMedium.value = '';
      inputCampaign.value = '';
      inputTerm.value = '';
      inputContent.value = '';
      inputUtmId.value = '';
      state.single.customParams = [];
      renderCustomParams();
      state.activePresetId = null;
      updatePresetChipSelection();
      checkUrlForExistingUtms('');
      readSingleInputs();

      // Reset short URL & QR state
      state.shortUrl = '';
      state.shortUrlOriginal = '';
      const shortBox = document.getElementById('short-url-box');
      if (shortBox) shortBox.style.display = 'none';
      setQrTarget('full');

      recalculateSingleUrl();
      showToast('Form reset', 'info');
    });
  }

  const clearPresetBtn = document.getElementById('btn-clear-preset');
  if (clearPresetBtn) {
    clearPresetBtn.addEventListener('click', clearActivePreset);
  }

  const togglePresetsBtn = document.getElementById('btn-toggle-presets');
  const presetsList = document.getElementById('presets-chips-list');
  const presetContainer = document.getElementById('preset-chips-container');
  if (togglePresetsBtn && presetsList) {
    togglePresetsBtn.addEventListener('click', () => {
      const isCompact = presetsList.classList.toggle('is-compact');
      if (presetContainer) presetContainer.classList.toggle('is-compact', isCompact);
      togglePresetsBtn.setAttribute('aria-expanded', !isCompact);
      const textSpan = document.getElementById('preset-toggle-text');
      const icon = document.getElementById('preset-toggle-icon');
      if (textSpan) {
        textSpan.textContent = isCompact ? 'Show full (12)' : 'Show less';
      }
      if (icon) {
        icon.style.transform = isCompact ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  }

  // Collapsible Form Section Accordions (Optional Parameters & Advanced)
  const optToggleBtn = document.getElementById('toggle-optional-params-btn');
  const optBody = document.getElementById('optional-params-body') || document.getElementById('accordion-optional-body');
  const optArrow = document.getElementById('optional-toggle-arrow') || document.getElementById('toggle-optional-params-arrow');

  const advToggleBtn = document.getElementById('toggle-advanced-params-btn');
  const advBody = document.getElementById('advanced-params-body') || document.getElementById('accordion-advanced-body');
  const advArrow = document.getElementById('advanced-toggle-arrow') || document.getElementById('toggle-advanced-params-arrow');

  function toggleAccordion(btn, body, arrow) {
    if (!btn || !body) return;
    const isOpening = !body.classList.contains('open');
    body.classList.toggle('open', isOpening);
    btn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
    if (arrow) {
      arrow.textContent = isOpening ? '▲' : '▼';
    }
  }

  if (optToggleBtn && optBody) {
    optToggleBtn.addEventListener('click', () => toggleAccordion(optToggleBtn, optBody, optArrow));
  }

  if (advToggleBtn && advBody) {
    advToggleBtn.addEventListener('click', () => toggleAccordion(advToggleBtn, advBody, advArrow));
  }

  // Collapsible Rules Accordion
  const rulesToggle = document.getElementById('toggle-rules-btn');
  const rulesBody = document.getElementById('rules-body');
  const rulesArrow = document.getElementById('rules-toggle-arrow');
  if (rulesToggle && rulesBody) {
    rulesToggle.addEventListener('click', () => {
      const isOpen = rulesBody.classList.toggle('open');
      rulesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (rulesArrow) rulesArrow.textContent = isOpen ? '▲' : '▼';
    });
  }

  // Custom Param button
  const addParamBtn = document.getElementById('btn-add-custom-param');
  if (addParamBtn) {
    addParamBtn.addEventListener('click', () => {
      state.single.customParams.push({ key: '', value: '' });
      renderCustomParams();
    });
  }

  // QR Code actions & On-Demand Generator
  const downloadQrBtn = document.getElementById('btn-download-qr');
  const downloadQrSvgBtn = document.getElementById('btn-download-qr-svg');
  const copyQrBtn = document.getElementById('btn-copy-qr');
  const generateQrBtn = document.getElementById('btn-generate-qr');
  const regenQrBtn = document.getElementById('btn-regenerate-qr');
  const qrCanvas = document.getElementById('qr-canvas');

  if (generateQrBtn) {
    generateQrBtn.addEventListener('click', () => {
      generateActiveQRCode(true, false);
    });
  }

  if (regenQrBtn) {
    regenQrBtn.addEventListener('click', () => {
      generateActiveQRCode(true, true);
    });
  }

  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', () => {
      if (!state.qrGenerated) {
        generateActiveQRCode(false, false);
      }
      const activeUrl = (state.qrTarget === 'short' && state.shortUrl) ? state.shortUrl : state.currentGeneratedUrl;
      if (activeUrl) {
        const prefix = state.qrTarget === 'short' ? 'short-' : '';
        downloadQRCode(qrCanvas, `${state.single.campaign || 'campaign'}-${prefix}qr.png`);
        showToast(`QR Code (${state.qrTarget === 'short' ? 'Short URL' : 'Full URL'}) downloaded as PNG!`, 'success');
      }
    });
  }

  if (downloadQrSvgBtn) {
    downloadQrSvgBtn.addEventListener('click', () => {
      if (!state.qrGenerated) {
        generateActiveQRCode(false, false);
      }
      const activeUrl = (state.qrTarget === 'short' && state.shortUrl) ? state.shortUrl : state.currentGeneratedUrl;
      if (activeUrl) {
        const prefix = state.qrTarget === 'short' ? 'short-' : '';
        downloadQRCodeSVG(activeUrl, `${state.single.campaign || 'campaign'}-${prefix}qr.svg`);
        showToast(`QR Code (${state.qrTarget === 'short' ? 'Short URL' : 'Full URL'}) downloaded as vector SVG!`, 'success');
      }
    });
  }

  if (copyQrBtn) {
    copyQrBtn.addEventListener('click', async () => {
      if (!state.qrGenerated) {
        generateActiveQRCode(false, false);
      }
      if (!state.currentGeneratedUrl) return;
      try {
        await copyQRCodeImage(qrCanvas);
        showToast('QR Code copied to clipboard!', 'success');
      } catch {
        showToast('Could not copy image directly. Try downloading instead.', 'error');
      }
    });
  }

  // Initial presets & calculate
  renderPresetChips();
  recalculateSingleUrl();
}

function generateActiveQRCode(showToastMsg = false, isRegen = false) {
  const qrCanvas = document.getElementById('qr-canvas');
  const qrOverlay = document.getElementById('qr-generate-overlay');
  const regenQrBtn = document.getElementById('btn-regenerate-qr');
  const qrBadge = document.getElementById('qr-target-badge');
  if (!qrCanvas) return;

  const url = (state.qrTarget === 'short' && state.shortUrl)
    ? state.shortUrl
    : state.currentGeneratedUrl;
  if (!url) {
    showToast('Enter a destination URL before generating a QR code.', 'error');
    return;
  }

  state.qrGenerated = true;

  // Unblur canvas smoothly
  qrCanvas.classList.remove('is-blurred');
  if (qrOverlay) qrOverlay.classList.add('hidden');
  if (regenQrBtn) regenQrBtn.style.display = 'inline-flex';
  if (qrBadge) {
    qrBadge.textContent = state.qrTarget === 'short' ? '⚡ Short QR Active' : '● Active & Ready';
    qrBadge.style.color = 'var(--soft-green)';
  }

  renderQRCode(qrCanvas, url, {
    darkColor: '#182126',
    lightColor: '#ffffff'
  });

  if (showToastMsg) {
    showToast(isRegen ? 'QR Code refreshed for current URL!' : 'Unique working QR Code generated!', 'success');
  }
}

function readSingleInputs() {
  const bUrl = document.getElementById('input-base-url');
  const bSrc = document.getElementById('input-utm-source');
  const bMed = document.getElementById('input-utm-medium');
  const bCmp = document.getElementById('input-utm-campaign');
  const bTrm = document.getElementById('input-utm-term');
  const bCnt = document.getElementById('input-utm-content');
  const bId = document.getElementById('input-utm-id');

  if (bUrl) {
    state.single.baseUrl = bUrl.value;
    if (bUrl.value.trim()) {
      localStorage.setItem(DESTINATION_STORAGE_KEY, bUrl.value);
    } else {
      localStorage.removeItem(DESTINATION_STORAGE_KEY);
    }
  }
  if (bSrc) state.single.source = bSrc.value;
  if (bMed) state.single.medium = bMed.value;
  if (bCmp) state.single.campaign = bCmp.value;
  if (bTrm) state.single.term = bTrm.value;
  if (bCnt) state.single.content = bCnt.value;
  if (bId) state.single.utmId = bId.value;
}

function recalculateSingleUrl() {
  const result = buildUTMUrl(state.single, state.options);
  const outputBox = document.getElementById('url-output-box');
  const charCountEl = document.getElementById('url-char-count');
  const statusPill = document.getElementById('url-status-pill');
  const clearUrlBtn = document.getElementById('btn-clear-url');

  if (clearUrlBtn) {
    clearUrlBtn.disabled = !state.single.baseUrl.trim();
  }

  if (result.isValid) {
    state.currentGeneratedUrl = result.url;
    outputBox.innerHTML = getHighlightedUrlHtml(result.url);

    const length = result.url.length;
    charCountEl.textContent = `${length} chars`;
    charCountEl.classList.toggle('warning', length > 2000);

    statusPill.textContent = 'Ready';
    statusPill.className = 'score-badge high';

    // Invalidate previously shortened URL if parameters changed
    if (state.shortUrlOriginal && state.shortUrlOriginal !== state.currentGeneratedUrl) {
      state.shortUrl = '';
      state.shortUrlOriginal = '';
      const shortBox = document.getElementById('short-url-box');
      if (shortBox) shortBox.style.display = 'none';
      if (state.qrTarget === 'short') {
        setQrTarget('full');
      }
    }

    updateQRCode();
  } else {
    state.currentGeneratedUrl = '';
    outputBox.innerHTML = `<span class="url-placeholder">${result.error || 'Enter destination URL...'}</span>`;
    charCountEl.textContent = '0 chars';
    statusPill.textContent = 'Incomplete';
    statusPill.className = 'score-badge low';

    state.shortUrl = '';
    state.shortUrlOriginal = '';
    const shortBox = document.getElementById('short-url-box');
    if (shortBox) shortBox.style.display = 'none';
    if (state.qrTarget === 'short') {
      setQrTarget('full');
    }
  }

  // Update mobile sticky bottom copy bar
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const stickyUrlText = document.getElementById('mobile-sticky-url-text');
  if (stickyBar) {
    if (result.isValid) {
      stickyBar.classList.add('is-visible');
      document.body.classList.add('has-mobile-sticky-bar');
      if (stickyUrlText) {
        stickyUrlText.textContent = result.url;
      }
    } else {
      stickyBar.classList.remove('is-visible');
      document.body.classList.remove('has-mobile-sticky-bar');
    }
  }

  updateAccordionBadges();
  updateScorecard();
}

function updateAccordionBadges() {
  const optBadge = document.getElementById('badge-optional-count');
  const advBadge = document.getElementById('badge-advanced-count');

  if (optBadge) {
    let count = 0;
    if (state.single.term && state.single.term.trim()) count++;
    if (state.single.content && state.single.content.trim()) count++;
    if (state.single.utmId && state.single.utmId.trim()) count++;
    optBadge.textContent = count > 0 ? `${count} filled` : '0 filled';
    optBadge.classList.toggle('is-active', count > 0);
  }

  if (advBadge) {
    const customCount = Array.isArray(state.single.customParams) ? state.single.customParams.length : 0;
    const isModifiedRules = state.options.lowercase !== true || state.options.spaceReplacement !== '-' || state.options.autoProtocol !== true || state.options.stripDuplicateUtms !== true;
    if (customCount > 0) {
      advBadge.textContent = `${customCount} custom`;
      advBadge.classList.add('is-active');
    } else if (isModifiedRules) {
      advBadge.textContent = 'Custom rules';
      advBadge.classList.add('is-active');
    } else {
      advBadge.textContent = 'Standard';
      advBadge.classList.remove('is-active');
    }
  }
}

function updateQRCode() {
  const qrCanvas = document.getElementById('qr-canvas');
  if (!qrCanvas) return;

  const url = (state.qrTarget === 'short' && state.shortUrl)
    ? state.shortUrl
    : state.currentGeneratedUrl;

  if (!url) return;

  renderQRCode(qrCanvas, url, {
    darkColor: '#182126',
    lightColor: '#ffffff'
  });

  if (!state.qrGenerated) {
    qrCanvas.classList.add('is-blurred');
  } else {
    qrCanvas.classList.remove('is-blurred');
  }
}

function updateScorecard() {
  const audit = auditUTM(state.single);
  const scoreBadge = document.getElementById('score-number-badge');
  const progressBar = document.getElementById('score-progress-bar');
  const messagesContainer = document.getElementById('audit-messages-container');

  if (scoreBadge) {
    scoreBadge.textContent = `${audit.score} / 100`;
    let gradeClass = 'high';
    if (audit.score < 60) gradeClass = 'low';
    else if (audit.score < 85) gradeClass = 'medium';
    scoreBadge.className = `score-badge ${gradeClass}`;
  }

  if (progressBar) {
    progressBar.style.width = `${audit.score}%`;
  }

  if (messagesContainer) {
    if (audit.issues.length === 0 && audit.suggestions.length === 0) {
      messagesContainer.innerHTML = `
        <div class="audit-msg" style="color: var(--success); background: var(--success-subtle);">
          ✓ All parameters match GA4 standards.
        </div>
      `;
    } else {
      const listHtml = [
        ...audit.issues.map(i => `
          <div class="audit-msg ${escapeHtml(i.level)}">
            <span>${i.level === 'error' ? '✕' : '⚠'}</span>
            <span>${escapeHtml(i.message)}</span>
          </div>
        `),
        ...audit.suggestions.map(s => `
          <div class="audit-msg suggestion">
            <span>•</span>
            <span>${escapeHtml(s.message)}</span>
          </div>
        `)
      ].join('');
      messagesContainer.innerHTML = listHtml;
    }
  }
}

async function handleCopyUrl() {
  if (!state.currentGeneratedUrl) {
    showToast('No valid URL to copy. Please complete the form.', 'error');
    return;
  }

  try {
    await navigator.clipboard.writeText(state.currentGeneratedUrl);
    showToast('Copied to clipboard', 'success');

    // Auto-save to history on copy
    saveToHistory({
      url: state.currentGeneratedUrl,
      shortUrl: state.shortUrlOriginal === state.currentGeneratedUrl ? state.shortUrl : '',
      baseUrl: state.single.baseUrl,
      source: state.single.source,
      medium: state.single.medium,
      campaign: state.single.campaign,
      term: state.single.term,
      content: state.single.content,
      customParams: state.single.customParams
    });
    updateHistoryBadge();

    const copyBtnText = document.getElementById('btn-copy-text');
    copyBtnText.textContent = 'Copied!';
    setTimeout(() => {
      copyBtnText.textContent = 'Copy Campaign URL';
    }, 1800);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    showToast('Failed to copy to clipboard', 'error');
  }
}

// =========================================================
// URL SHORTENER CONTROLLER
// =========================================================
async function handleShortenUrl() {
  if (!state.currentGeneratedUrl) {
    showToast('Please enter a valid destination URL first', 'error');
    return;
  }

  const shortenBtn = document.getElementById('btn-shorten-url');
  const shortenText = document.getElementById('btn-shorten-text');

  // If already shortened for this current URL, display and copy
  if (state.shortUrl && state.shortUrlOriginal === state.currentGeneratedUrl) {
    displayShortUrlCard(state.shortUrl, state.currentGeneratedUrl);
    await handleCopyShortUrl();
    return;
  }

  if (shortenBtn) shortenBtn.disabled = true;
  if (shortenText) shortenText.textContent = 'Shortening...';

  try {
    const res = await shortenUrl(state.currentGeneratedUrl);
    if (res.success && res.shortUrl) {
      state.shortUrl = res.shortUrl;
      state.shortUrlOriginal = state.currentGeneratedUrl;

      displayShortUrlCard(res.shortUrl, state.currentGeneratedUrl);
      showToast('Short URL created!', 'success');

      // Update history entry with shortened URL
      saveToHistory({
        url: state.currentGeneratedUrl,
        shortUrl: res.shortUrl,
        baseUrl: state.single.baseUrl,
        source: state.single.source,
        medium: state.single.medium,
        campaign: state.single.campaign,
        term: state.single.term,
        content: state.single.content,
        customParams: state.single.customParams
      });
      updateHistoryBadge();
    } else {
      showToast(res.error || 'Failed to shorten URL. Try again.', 'error');
    }
  } catch (err) {
    console.error('Shorten error:', err);
    showToast('Network error while shortening URL', 'error');
  } finally {
    if (shortenBtn) shortenBtn.disabled = false;
    if (shortenText) shortenText.textContent = 'Shorten';
  }
}

function displayShortUrlCard(shortUrl, longUrl) {
  const shortBox = document.getElementById('short-url-box');
  const linkEl = document.getElementById('short-url-link');
  const savingsBadge = document.getElementById('short-url-savings-badge');
  if (!shortBox || !linkEl) return;

  linkEl.textContent = shortUrl;
  linkEl.href = shortUrl;

  const savings = calculateSavings(longUrl, shortUrl);
  if (savingsBadge) {
    savingsBadge.textContent = `-${savings.percentSaved}% (${savings.savedChars} chars saved)`;
  }

  shortBox.style.display = 'block';
}

async function handleCopyShortUrl() {
  if (!state.shortUrl) return;
  try {
    await navigator.clipboard.writeText(state.shortUrl);
    showToast('Short URL copied to clipboard!', 'success');
    const copyText = document.getElementById('btn-copy-short-text');
    if (copyText) {
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy';
      }, 1800);
    }
  } catch {
    showToast('Failed to copy to clipboard', 'error');
  }
}

function setQrTarget(target) {
  state.qrTarget = target;
  const qrShortBtn = document.getElementById('btn-short-url-qr');
  const qrShortLabel = document.getElementById('btn-short-url-qr-label');
  const qrBadge = document.getElementById('qr-target-badge');

  if (target === 'short') {
    if (qrShortBtn) qrShortBtn.classList.add('active');
    if (qrShortLabel) qrShortLabel.textContent = 'In QR ✓';
    if (qrBadge) qrBadge.textContent = '⚡ Short URL';
  } else {
    if (qrShortBtn) qrShortBtn.classList.remove('active');
    if (qrShortLabel) qrShortLabel.textContent = 'Use in QR';
    if (qrBadge) qrBadge.textContent = 'Full URL';
  }

  updateQRCode();
}

function handleToggleShortUrlQR() {
  if (!state.shortUrl) return;
  if (state.qrTarget === 'short') {
    setQrTarget('full');
    showToast('QR code switched to Full URL', 'info');
  } else {
    setQrTarget('short');
    showToast('QR code updated to Short URL!', 'success');
  }
}

function handleCloseShortUrl() {
  const shortBox = document.getElementById('short-url-box');
  if (shortBox) shortBox.style.display = 'none';
  if (state.qrTarget === 'short') {
    setQrTarget('full');
  }
}

// =========================================================
// PRESET CHIPS & CUSTOM PRESETS
// =========================================================
function renderPresetChips() {
  const container = document.getElementById('presets-chips-list');
  if (!container) return;

  const presets = getAllPresets();
  container.innerHTML = '';

  presets.forEach(p => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `preset-chip ${state.activePresetId === p.id ? 'active' : ''}`;
    chip.setAttribute('data-preset-id', p.id);
    chip.innerHTML = `
      <span class="preset-chip-dot" style="color: ${p.color || 'var(--primary)'}"></span>
      <span></span>
    `;
    chip.querySelector('span:last-child').textContent = p.name || 'Unnamed preset';

    if (p.isCustom) {
      const delBtn = document.createElement('span');
      delBtn.className = 'preset-chip-delete';
      delBtn.title = 'Delete custom preset';
      delBtn.setAttribute('aria-label', `Delete custom preset ${p.name}`);
      delBtn.textContent = '✕';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteCustomPreset(p.id);
        if (state.activePresetId === p.id) {
          state.activePresetId = null;
        }
        renderPresetChips();
        showToast(`Deleted custom preset "${p.name}"`, 'info');
      });
      chip.appendChild(delBtn);
    }

    chip.addEventListener('click', () => {
      applyPreset(p);
    });

    container.appendChild(chip);
  });
}

function applyPreset(preset) {
  state.activePresetId = preset.id;
  updatePresetChipSelection();

  document.getElementById('input-utm-source').value = preset.source || '';
  document.getElementById('input-utm-medium').value = preset.medium || '';
  if (preset.defaultCampaign && !document.getElementById('input-utm-campaign').value) {
    document.getElementById('input-utm-campaign').value = preset.defaultCampaign;
  }
  if (preset.term) {
    document.getElementById('input-utm-term').value = preset.term;
  }
  if (preset.content) {
    document.getElementById('input-utm-content').value = preset.content;
  }

  // If preset populates optional parameters, auto-expand the optional accordion so user sees them
  if (preset.term || preset.content) {
    const optBody = document.getElementById('optional-params-body') || document.getElementById('accordion-optional-body');
    const optToggleBtn = document.getElementById('toggle-optional-params-btn');
    const optArrow = document.getElementById('optional-toggle-arrow') || document.getElementById('toggle-optional-params-arrow');
    if (optBody && !optBody.classList.contains('open')) {
      optBody.classList.add('open');
      if (optToggleBtn) optToggleBtn.setAttribute('aria-expanded', 'true');
      if (optArrow) optArrow.textContent = '▲';
    }
  }

  readSingleInputs();
  recalculateSingleUrl();
  showToast(`Applied "${preset.name}" preset`, 'info');
}

function clearActivePreset() {
  if (!state.activePresetId) return;

  const preset = getAllPresets().find(item => item.id === state.activePresetId);
  const sourceInput = document.getElementById('input-utm-source');
  const mediumInput = document.getElementById('input-utm-medium');
  const campaignInput = document.getElementById('input-utm-campaign');
  const termInput = document.getElementById('input-utm-term');
  const contentInput = document.getElementById('input-utm-content');

  sourceInput.value = '';
  mediumInput.value = '';

  // Clear optional values only when they still match the preset. This preserves user edits.
  if (preset) {
    if (preset.defaultCampaign && campaignInput.value === preset.defaultCampaign) campaignInput.value = '';
    if (preset.term && termInput.value === preset.term) termInput.value = '';
    if (preset.content && contentInput.value === preset.content) contentInput.value = '';
  }

  state.activePresetId = null;
  updatePresetChipSelection();
  readSingleInputs();
  recalculateSingleUrl();
  showToast('Channel preset cleared', 'info');
}

function updatePresetChipSelection() {
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-preset-id') === state.activePresetId);
  });

  const clearPresetBtn = document.getElementById('btn-clear-preset');
  if (clearPresetBtn) {
    clearPresetBtn.disabled = !state.activePresetId;
  }
}

// Custom Parameters rendering
function renderCustomParams() {
  const container = document.getElementById('custom-params-container');
  if (!container) return;

  container.innerHTML = '';
  state.single.customParams.forEach((param, index) => {
    const row = document.createElement('div');
    row.className = 'custom-param-row';
    const keyInputEl = document.createElement('input');
    keyInputEl.type = 'text'; keyInputEl.className = 'form-input custom-param-key'; keyInputEl.placeholder = 'Parameter Key (e.g. ref, partner)'; keyInputEl.setAttribute('aria-label', 'Custom parameter key'); keyInputEl.value = param.key || '';
    const valInputEl = document.createElement('input');
    valInputEl.type = 'text'; valInputEl.className = 'form-input custom-param-val'; valInputEl.placeholder = 'Value (e.g. 12345)'; valInputEl.setAttribute('aria-label', 'Custom parameter value'); valInputEl.value = param.value || '';
    const removeBtnEl = document.createElement('button');
    removeBtnEl.type = 'button'; removeBtnEl.className = 'btn-remove-param'; removeBtnEl.title = 'Remove parameter'; removeBtnEl.setAttribute('aria-label', 'Remove parameter'); removeBtnEl.textContent = '✕';
    row.append(keyInputEl, valInputEl, removeBtnEl);

    const keyInput = row.querySelector('.custom-param-key');
    const valInput = row.querySelector('.custom-param-val');
    const removeBtn = row.querySelector('.btn-remove-param');

    keyInput.addEventListener('input', (e) => {
      param.key = e.target.value;
      recalculateSingleUrl();
    });

    valInput.addEventListener('input', (e) => {
      param.value = e.target.value;
      recalculateSingleUrl();
    });

    removeBtn.addEventListener('click', () => {
      state.single.customParams.splice(index, 1);
      renderCustomParams();
      recalculateSingleUrl();
    });

    container.appendChild(row);
  });
}

// =========================================================
// BULK / MATRIX GENERATOR
// =========================================================
function initBatchGenerator() {
  const grid = document.getElementById('batch-channels-grid');
  if (!grid) return;

  // Render channel cards
  grid.innerHTML = '';
  BATCH_CHANNELS.forEach(ch => {
    const label = document.createElement('label');
    label.className = 'channel-check-card';
    label.innerHTML = `
      <input type="checkbox" data-channel-id="${ch.id}" ${ch.checked ? 'checked' : ''}>
      <span></span>
    `;
    label.querySelector('span').textContent = ch.name;

    label.querySelector('input').addEventListener('change', (e) => {
      ch.checked = e.target.checked;
    });

    grid.appendChild(label);
  });

  // Select all / deselect all
  const selectAll = document.getElementById('batch-select-all');
  if (selectAll) {
    selectAll.addEventListener('click', () => {
      BATCH_CHANNELS.forEach(ch => ch.checked = true);
      grid.querySelectorAll('input').forEach(input => input.checked = true);
    });
  }

  const deselectAll = document.getElementById('batch-deselect-all');
  if (deselectAll) {
    deselectAll.addEventListener('click', () => {
      BATCH_CHANNELS.forEach(ch => ch.checked = false);
      grid.querySelectorAll('input').forEach(input => input.checked = false);
    });
  }

  // Generate Matrix Button
  const generateBtn = document.getElementById('btn-generate-batch');
  if (generateBtn) {
    generateBtn.addEventListener('click', handleGenerateBatch);
  }

  // Batch actions
  const copyAllBtn = document.getElementById('btn-batch-copy-all');
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', handleBatchCopyAll);
  }

  const copyTsvBtn = document.getElementById('btn-batch-copy-tsv');
  if (copyTsvBtn) {
    copyTsvBtn.addEventListener('click', handleBatchCopyTSV);
  }

  const downloadCsvBtn = document.getElementById('btn-batch-download-csv');
  if (downloadCsvBtn) {
    downloadCsvBtn.addEventListener('click', handleBatchDownloadCSV);
  }

  const saveHistoryBtn = document.getElementById('btn-batch-save-history');
  if (saveHistoryBtn) {
    saveHistoryBtn.addEventListener('click', handleBatchSaveHistory);
  }
}

function handleGenerateBatch() {
  const rawUrls = document.getElementById('batch-urls-input').value.split('\n');
  const campaign = document.getElementById('batch-campaign-input').value.trim();
  const term = document.getElementById('batch-term-input').value.trim();
  const content = document.getElementById('batch-content-input').value.trim();

  const selectedChannels = BATCH_CHANNELS.filter(c => c.checked);

  if (rawUrls.filter(u => u.trim()).length === 0) {
    showToast('Please enter at least one landing page URL', 'error');
    return;
  }

  if (selectedChannels.length === 0) {
    showToast('Please select at least one advertising channel', 'error');
    return;
  }

  const filledUrls = rawUrls.filter(u => u.trim());
  if (filledUrls.length > 100 || filledUrls.length * selectedChannels.length > 1000) {
    showToast('Bulk generation is limited to 100 landing pages and 1,000 total links per run.', 'error');
    return;
  }

  const results = generateBatchMatrix({
    urls: rawUrls,
    campaign,
    term,
    content,
    channels: selectedChannels,
    options: state.options
  });

  state.batchResults = results;
  renderBatchTable(results);

  if (results.length > 0) {
    document.getElementById('batch-results-section').style.display = 'block';
    showToast(`Generated ${results.length} campaign URLs!`, 'success');
  } else {
    showToast('No valid URLs generated. Check domain format.', 'error');
  }
}

function renderBatchTable(results) {
  const tbody = document.getElementById('batch-table-body');
  const countEl = document.getElementById('batch-total-count');
  countEl.textContent = results.length;
  tbody.innerHTML = '';

  results.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(item.channelName)}</strong></td>
      <td><span class="mini-badge" style="color: #38bdf8;">${escapeHtml(item.source)}</span></td>
      <td><span class="mini-badge" style="color: #34d399;">${escapeHtml(item.medium)}</span></td>
      <td>${escapeHtml(item.campaign || '-')}</td>
      <td class="url-cell" title="${escapeHtml(item.url)}">${escapeHtml(item.url)}</td>
      <td style="text-align: right; white-space: nowrap;">
        <button type="button" class="btn btn-secondary btn-sm btn-batch-row-copy" title="Copy URL">📋</button>
        <button type="button" class="btn btn-ghost btn-sm btn-batch-row-open" title="Open Link">↗</button>
      </td>
    `;

    tr.querySelector('.btn-batch-row-copy').addEventListener('click', async () => {
      await navigator.clipboard.writeText(item.url);
      showToast(`Copied ${item.channelName} URL!`, 'success');
    });

    tr.querySelector('.btn-batch-row-open').addEventListener('click', () => {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    });

    tbody.appendChild(tr);
  });
}

async function handleBatchCopyAll() {
  if (state.batchResults.length === 0) return;
  const allUrls = state.batchResults.map(r => r.url).join('\n');
  await navigator.clipboard.writeText(allUrls);
  showToast(`Copied all ${state.batchResults.length} URLs to clipboard!`, 'success');
}

async function handleBatchCopyTSV() {
  if (state.batchResults.length === 0) return;
  const tsv = exportBatchToTSV(state.batchResults);
  await navigator.clipboard.writeText(tsv);
  showToast(`Copied ${state.batchResults.length} rows for Google Sheets / Excel!`, 'success');
}

function handleBatchDownloadCSV() {
  if (state.batchResults.length === 0) return;
  const csvContent = exportBatchToCSV(state.batchResults);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `utm-matrix-${Date.now()}.csv`;
  link.click();
  showToast('Downloaded Campaign Matrix CSV!', 'success');
}

function handleBatchSaveHistory() {
  if (state.batchResults.length === 0) return;
  state.batchResults.forEach(r => {
    saveToHistory({
      url: r.url,
      baseUrl: r.baseUrl,
      source: r.source,
      medium: r.medium,
      campaign: r.campaign
    });
  });
  updateHistoryBadge();
  showToast(`Saved ${state.batchResults.length} URLs to History!`, 'success');
}

// =========================================================
// UTM INSPECTOR & DECONSTRUCTOR
// =========================================================
function initInspector() {
  const inspectBtn = document.getElementById('btn-inspect-url');
  const input = document.getElementById('inspector-input');
  const loadBtn = document.getElementById('btn-load-inspector-to-builder');
  if (!inspectBtn || !input) return;

  let currentInspected = null;

  inspectBtn.addEventListener('click', () => {
    const raw = input.value.trim();
    if (!raw) {
      showToast('Please paste a URL to inspect', 'error');
      return;
    }

    const result = deconstructUrl(raw);
    if (!result.isValid) {
      showToast(result.error, 'error');
      return;
    }

    currentInspected = result;
    renderInspection(result);
  });

  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      if (!currentInspected) return;

      const destinationInput = document.getElementById('input-base-url');
      if (destinationInput) destinationInput.value = currentInspected.fullUrl;
      const importedFields = {
        'input-utm-source': 'utm_source', 'input-utm-medium': 'utm_medium',
        'input-utm-campaign': 'utm_campaign', 'input-utm-term': 'utm_term',
        'input-utm-content': 'utm_content', 'input-utm-id': 'utm_id'
      };
      Object.entries(importedFields).forEach(([id, key]) => {
        const field = document.getElementById(id);
        if (field) field.value = currentInspected.utmParams[key] || '';
      });
      readSingleInputs();
      const stripOption = state.options.stripDuplicateUtms;
      state.options.stripDuplicateUtms = false;
      recalculateSingleUrl();
      state.options.stripDuplicateUtms = stripOption;
      switchTab('tab-builder');
      showToast('Loaded the complete inspected URL into the destination field. Existing query parameters are preserved.', 'info');
    });
  }
}

function renderInspection(data) {
  const outputContainer = document.getElementById('inspector-output-container');
  const scorePill = document.getElementById('inspector-score-pill');
  const issuesBox = document.getElementById('inspector-issues-box');
  const cardsGrid = document.getElementById('inspector-cards-grid');

  outputContainer.style.display = 'block';

  scorePill.textContent = `${data.audit.score} / 100 Quality Score`;
  scorePill.className = `score-badge ${data.audit.score < 70 ? 'low' : data.audit.score < 90 ? 'medium' : 'high'}`;

  // Issues and warnings
  if (data.audit.issues.length === 0 && data.audit.suggestions.length === 0) {
    issuesBox.innerHTML = `
      <div class="audit-msg" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald);">
        ✓ No errors or anti-patterns detected. URL is fully GA4 compliant.
      </div>
    `;
  } else {
    issuesBox.innerHTML = [
    ...data.audit.issues.map(i => `<div class="audit-msg ${escapeHtml(i.level)}"><span>${i.level === 'error' ? '❌' : '⚠️'}</span> <span>${escapeHtml(i.message)}</span></div>`),
    ...data.audit.suggestions.map(s => `<div class="audit-msg suggestion"><span>💡</span> <span>${escapeHtml(s.message)}</span></div>`)
    ].join('');
  }

  // Cards
  const cards = [
    { key: 'Base Destination URL', val: data.baseUrl, note: 'Landing page where traffic arrives' },
    { key: 'utm_source', val: data.utmParams['utm_source'] || '(Not set)', note: 'Traffic source identifier (e.g. google, meta)' },
    { key: 'utm_medium', val: data.utmParams['utm_medium'] || '(Not set)', note: 'Marketing medium (e.g. cpc, email, social)' },
    { key: 'utm_campaign', val: data.utmParams['utm_campaign'] || '(Not set)', note: 'Campaign name or launch objective' },
    { key: 'utm_term', val: data.utmParams['utm_term'] || '(Not set)', note: 'Keywords or audience targeting tag' },
    { key: 'utm_content', val: data.utmParams['utm_content'] || '(Not set)', note: 'Ad creative variation or CTA button identifier' },
    { key: 'utm_id', val: data.utmParams['utm_id'] || '(Not set)', note: 'GA4 Campaign ID' }
  ];

  // Other params
  const paramCounts = new Map();
  data.allParams.forEach(([key]) => {
    const normalized = key.toLowerCase();
    paramCounts.set(normalized, (paramCounts.get(normalized) || 0) + 1);
  });
  const paramSeen = new Map();
  data.allParams.forEach(([key, value]) => {
    const normalized = key.toLowerCase();
    const occurrence = (paramSeen.get(normalized) || 0) + 1;
    paramSeen.set(normalized, occurrence);
    const standardUtm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'].includes(normalized);
    if (standardUtm && paramCounts.get(normalized) === 1) return;
    const label = standardUtm ? `${key} (occurrence ${occurrence} of ${paramCounts.get(normalized)})` : (occurrence > 1 ? `${key} (duplicate ${occurrence})` : key);
    cards.push({ key: label, val: value, note: normalized.startsWith('utm_') ? 'Additional UTM query parameter' : 'Non-UTM query parameter' });
  });

  cardsGrid.innerHTML = cards.map(c => `
    <div class="param-inspector-card">
      <div class="param-key-header">
        <span class="param-key-tag">${escapeHtml(c.key)}</span>
      </div>
      <div class="param-value-box">${escapeHtml(c.val)}</div>
      <div class="param-explanation">${escapeHtml(c.note)}</div>
    </div>
  `).join('');
}

// =========================================================
// GA4 TAXONOMY GUIDE & FORMULA BUILDER
// =========================================================
function initTaxonomyGuide() {
  const cardsGrid = document.getElementById('taxonomy-cards-grid');
  if (!cardsGrid) return;
  const searchInput = document.getElementById('channel-search-input');
  const filterButtons = document.querySelectorAll('.channel-filter-btn');
  let currentCategory = 'all';

  function renderChannelCards() {
    if (!cardsGrid) return;
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    const filtered = GA4_CHANNEL_RULES.filter(rule => {
      const matchCat = currentCategory === 'all' || rule.category === currentCategory;
      if (!matchCat) return false;
      if (!query) return true;
      return (
        rule.channel.toLowerCase().includes(query) ||
        rule.recommendedMedium.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.example.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-secondary);">
          No matching GA4 channels found for "${escapeHtml(query)}". Try searching for "cpc", "email", or "social".
        </div>
      `;
      return;
    }

    cardsGrid.innerHTML = filtered.map(rule => `
      <div class="taxonomy-card">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
          <span class="channel-rule-badge" style="background: ${rule.color}20; color: ${rule.color};">${rule.channel}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Medium: <strong>${rule.recommendedMedium}</strong></span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-main); font-weight: 500; margin-top: 0.25rem;">${rule.plainSummary || ''}</p>
        <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">${rule.description}</p>
        <div style="margin-top: 0.25rem;">
          <span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Example UTM:</span>
          <div class="rule-example-row">
            <div class="rule-code-snippet" style="flex: 1;">${rule.example}</div>
            <button type="button" class="rule-copy-btn" data-copy="${rule.example}" title="Copy Example">Copy</button>
          </div>
        </div>
        ${rule.commonMistake ? `
          <div class="channel-mistake-hint">
            <strong>Avoid:</strong> <span>${rule.commonMistake}</span>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Attach copy buttons
    cardsGrid.querySelectorAll('.rule-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy');
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          showToast('Copied example UTM to clipboard!', 'info');
        } catch {
          showToast('Failed to copy', 'error');
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderChannelCards);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      renderChannelCards();
    });
  });

  renderChannelCards();

  // 5-Step Campaign Tagging Blueprint
  const taggingContainer = document.getElementById('tagging-steps-container');
  if (taggingContainer) {
    taggingContainer.innerHTML = CAMPAIGN_TAGGING_STEPS.map(s => `
      <div class="tagging-step-card">
        <span class="step-num-pill">${s.step}</span>
        <div class="step-card-title">${s.title}</div>
        <div class="step-card-subtitle">${s.subtitle}</div>
        <div class="step-card-desc">${s.description}</div>
        <div class="step-card-tip"><strong>Pro Tip:</strong> ${s.tip}</div>
      </div>
    `).join('');
  }

  // Unassigned Traffic Fixes
  const unassignedContainer = document.getElementById('unassigned-fixes-container');
  if (unassignedContainer) {
    unassignedContainer.innerHTML = GA4_UNASSIGNED_FIXES.map(f => `
      <div class="unassigned-card">
        <div class="unassigned-card-title">${f.title}</div>
        <div class="unassigned-symptom-tag">${f.symptom}</div>
        <p class="unassigned-fix-text" style="margin-bottom: 0.5rem;"><strong>Why it breaks:</strong> ${f.whyItBreaks}</p>
        <p class="unassigned-fix-text" style="color: var(--primary);"><strong>Fix:</strong> ${f.howToFix}</p>
      </div>
    `).join('');
  }

  // Do's and Don'ts Matrix
  const dosDontsContainer = document.getElementById('dos-donts-container');
  if (dosDontsContainer) {
    const dos = DOS_AND_DONTS.filter(d => d.type === 'do');
    const donts = DOS_AND_DONTS.filter(d => d.type === 'dont');
    dosDontsContainer.innerHTML = `
      <div class="dos-card">
        <h4 style="font-size: 1rem; font-weight: 600; color: #10B981; display: flex; align-items: center; gap: 6px;">
          <span>✅</span> Campaign Best Practices (Do)
        </h4>
        <ul class="rules-checklist">
          ${dos.map(d => `<li><strong>${d.title}</strong>${d.desc}</li>`).join('')}
        </ul>
      </div>
      <div class="donts-card">
        <h4 style="font-size: 1rem; font-weight: 600; color: #EF4444; display: flex; align-items: center; gap: 6px;">
          <span>❌</span> Costly Mistakes to Avoid (Don't)
        </h4>
        <ul class="rules-checklist">
          ${donts.map(d => `<li><strong>${d.title}</strong>${d.desc}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // The 5 Golden Rules
  const goldenContainer = document.getElementById('golden-rules-container');
  if (goldenContainer) {
    goldenContainer.innerHTML = GOLDEN_RULES.map(r => `
      <div class="golden-rule-item ${r.severity === 'critical' ? 'critical' : ''}">
        <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">${r.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">${r.desc}</p>
      </div>
    `).join('');
  }

  // Interactive Formula Generator
  const prodIn = document.getElementById('formula-product');
  const objIn = document.getElementById('formula-objective');
  const geoIn = document.getElementById('formula-geo');
  const timeIn = document.getElementById('formula-time');
  const resultDisplay = document.getElementById('formula-result-display');
  const useFormulaBtn = document.getElementById('btn-use-formula-in-builder');

  if (prodIn && objIn && geoIn && timeIn && resultDisplay && useFormulaBtn) {
    prodIn.value = 'saas';
    objIn.value = 'leadgen';
    geoIn.value = 'us';
    timeIn.value = '2026q1';

    function updateFormula() {
      const parts = [
        prodIn.value.trim().toLowerCase(),
        objIn.value.trim().toLowerCase(),
        geoIn.value.trim().toLowerCase(),
        timeIn.value.trim().toLowerCase()
      ].filter(Boolean);

      const formatted = parts.join('_') || 'campaign_name';
      resultDisplay.textContent = formatted;
      return formatted;
    }

    [prodIn, objIn, geoIn, timeIn].forEach(el => {
      el.addEventListener('input', updateFormula);
    });

    useFormulaBtn.addEventListener('click', () => {
      const formulaVal = updateFormula();
      document.getElementById('input-utm-campaign').value = formulaVal;
      readSingleInputs();
      recalculateSingleUrl();
      switchTab('tab-builder');
      showToast(`utm_campaign set to "${formulaVal}"!`, 'info');
    });
  }
}

// =========================================================
// CAMPAIGN HISTORY CONTROLLER
// =========================================================
function renderHistoryView() {
  const container = document.getElementById('history-items-container');
  const searchInput = document.getElementById('history-search-input');
  if (!container) return;

  const query = (searchInput ? searchInput.value : '').toLowerCase();
  const allHistory = getHistory();
  const filtered = allHistory.filter(item => {
    if (state.filterStarred && !item.starred) return false;
    if (!query) return true;
    return (
      (item.campaign && item.campaign.toLowerCase().includes(query)) ||
      (item.source && item.source.toLowerCase().includes(query)) ||
      (item.medium && item.medium.toLowerCase().includes(query)) ||
      (item.url && item.url.toLowerCase().includes(query))
    );
  });

  updateHistoryBadge();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${state.filterStarred ? 'No starred campaign links found' : 'No saved campaign links found'}</p>
        <p style="font-size: 0.85rem;">${state.filterStarred ? 'Star important links by clicking the star icon on any campaign.' : 'Generated and copied UTM URLs will automatically be logged here.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const shortUrl = safeHttpUrl(item.shortUrl);
    return `
      <div class="history-item-row" data-history-id="${escapeHtml(item.id)}">
        <div class="history-info">
          <div class="history-campaign-title">
            <span>${escapeHtml(item.campaign || 'Untitled Campaign')}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">• ${dateStr}</span>
          </div>
          <div class="history-badges">
            <span class="mini-badge" style="color: #38bdf8;">${escapeHtml(item.source || 'no-source')}</span>
            <span class="mini-badge" style="color: #34d399;">${escapeHtml(item.medium || 'no-medium')}</span>
            ${item.term ? `<span class="mini-badge" style="color: #c084fc;">term: ${escapeHtml(item.term)}</span>` : ''}
          </div>
          <div class="history-url-text" title="${escapeHtml(item.url)}">${escapeHtml(item.url)}</div>
          ${shortUrl ? `
            <div style="margin-top: 0.2rem; display: flex; align-items: center; gap: 0.5rem;">
              <a href="${escapeHtml(shortUrl)}" target="_blank" rel="noopener noreferrer" class="history-short-link" title="Open short link in new tab">⚡ ${escapeHtml(shortUrl)}</a>
              <button type="button" class="btn btn-ghost btn-sm btn-hist-copy-short" style="padding: 0 0.35rem; font-size: 0.7rem; min-height: 20px; line-height: 1;" title="Copy short link">Copy Short</button>
            </div>
          ` : ''}
        </div>

        <div class="history-actions">
          <button type="button" class="btn btn-ghost btn-sm btn-hist-star ${item.starred ? 'starred' : ''}" title="${item.starred ? 'Starred link (click to unstar)' : 'Star link'}" aria-label="Toggle star">${item.starred ? '★' : '☆'}</button>
          <button type="button" class="btn btn-secondary btn-sm btn-hist-copy" title="Copy URL" aria-label="Copy URL">📋</button>
          <button type="button" class="btn btn-secondary btn-sm btn-hist-load" title="Load into Builder" aria-label="Load into Builder">✏️</button>
          <button type="button" class="btn btn-ghost btn-sm btn-hist-delete" style="color: var(--accent-rose);" title="Delete" aria-label="Delete">🗑️</button>
        </div>
      </div>
    `;
  }).join('');

  // Wire row actions
  container.querySelectorAll('.history-item-row').forEach(row => {
    const id = row.getAttribute('data-history-id');
    const item = allHistory.find(h => h.id === id);
    if (!item) return;

    row.querySelector('.btn-hist-star').addEventListener('click', () => {
      toggleStarHistory(id);
      renderHistoryView();
    });

    row.querySelector('.btn-hist-copy').addEventListener('click', async () => {
      await navigator.clipboard.writeText(item.url);
      showToast('Copied history URL!', 'success');
    });

    const copyShortBtn = row.querySelector('.btn-hist-copy-short');
    if (copyShortBtn && item.shortUrl) {
      copyShortBtn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(item.shortUrl);
        showToast('Copied short URL!', 'success');
      });
    }

    row.querySelector('.btn-hist-load').addEventListener('click', () => {
      document.getElementById('input-base-url').value = item.baseUrl || '';
      document.getElementById('input-utm-source').value = item.source || '';
      document.getElementById('input-utm-medium').value = item.medium || '';
      document.getElementById('input-utm-campaign').value = item.campaign || '';
      document.getElementById('input-utm-term').value = item.term || '';
      document.getElementById('input-utm-content').value = item.content || '';
      readSingleInputs();
      recalculateSingleUrl();

      if (item.shortUrl && state.currentGeneratedUrl === item.url) {
        state.shortUrl = item.shortUrl;
        state.shortUrlOriginal = item.url;
        displayShortUrlCard(item.shortUrl, item.url);
      }

      switchTab('tab-builder');
      showToast('Loaded link into Builder!', 'info');
    });

    row.querySelector('.btn-hist-delete').addEventListener('click', () => {
      deleteHistoryItem(id);
      renderHistoryView();
      showToast('Deleted link from history', 'info');
    });
  });
}

function updateHistoryBadge() {
  const badge = document.getElementById('history-counter-badge');
  if (badge) {
    badge.textContent = getHistory().length;
  }
}

function initHistoryControls() {
  const searchInput = document.getElementById('history-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', renderHistoryView);
  }

  const filterStarredBtn = document.getElementById('btn-history-filter-starred');
  if (filterStarredBtn) {
    filterStarredBtn.addEventListener('click', () => {
      state.filterStarred = !state.filterStarred;
      filterStarredBtn.classList.toggle('active', state.filterStarred);
      renderHistoryView();
    });
  }

  const exportCsvBtn = document.getElementById('btn-history-export-csv');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const csv = exportHistoryToCSV();
      if (!csv) {
        showToast('History is empty', 'error');
        return;
      }
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `utm-campaign-history-${Date.now()}.csv`;
      link.click();
      showToast('Exported campaign history CSV!', 'success');
    });
  }

  const exportJsonBtn = document.getElementById('btn-history-export-json');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const json = exportHistoryToJSON();
      const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `utm-campaign-history-${Date.now()}.json`;
      link.click();
      showToast('Exported campaign history JSON!', 'success');
    });
  }

  const clearHistoryBtn = document.getElementById('btn-history-clear');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all history?')) {
        clearAllHistory();
        renderHistoryView();
        showToast('All history cleared', 'info');
      }
    });
  }
}

// =========================================================
// MODALS & SHORTCUTS
// =========================================================
function initModals() {
  // Preset modal
  const openPresetModalBtn = document.getElementById('btn-open-save-preset');
  const presetModal = document.getElementById('modal-save-preset');
  const formSavePreset = document.getElementById('form-save-preset');

  if (openPresetModalBtn && presetModal) {
    openPresetModalBtn.addEventListener('click', () => {
      document.getElementById('preset-source').value = state.single.source;
      document.getElementById('preset-medium').value = state.single.medium;
      document.getElementById('preset-campaign').value = state.single.campaign;
      presetModal.classList.add('open');
    });

    formSavePreset.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('preset-name').value.trim();
      const source = document.getElementById('preset-source').value.trim();
      const medium = document.getElementById('preset-medium').value.trim();
      const defaultCampaign = document.getElementById('preset-campaign').value.trim();

      if (!name || !source || !medium) return;

      saveCustomPreset({
        name,
        source,
        medium,
        defaultCampaign,
        color: '#6366f1'
      });

      renderPresetChips();
      presetModal.classList.remove('open');
      formSavePreset.reset();
      showToast(`Custom preset "${name}" saved!`, 'success');
    });
  }

  // Close modals
  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Escape closes open modals.
  window.addEventListener('keydown', (e) => {
    // Esc closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }

  });
}

// =========================================================
// FOOTER & QUICK-NAV LINK CONTROLLER
// =========================================================
function initFooterNavigation() {
  document.querySelectorAll('[data-switch-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetTab = link.getAttribute('data-switch-tab');
      const scrollToId = link.getAttribute('data-scroll-to');
      if (targetTab && document.getElementById(targetTab)) {
        e.preventDefault();
        switchTab(targetTab);
        if (scrollToId) {
          setTimeout(() => {
            const targetEl = document.getElementById(scrollToId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 60);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      // If targetTab is not on this page, do not preventDefault!
      // The browser will naturally follow the href="/" or other link URL.
    });
  });

}

// =========================================================
// PAGE OVERRIDES & MACRO TOKEN CHIPS
// =========================================================
function applyPageOverrides() {
  if (typeof document === 'undefined' || !document.body) return;
  const ds = document.body.dataset;
  if (ds.defaultBaseUrl) state.single.baseUrl = ds.defaultBaseUrl;
  if (ds.defaultSource) state.single.source = ds.defaultSource;
  if (ds.defaultMedium) state.single.medium = ds.defaultMedium;
  if (ds.defaultCampaign) state.single.campaign = ds.defaultCampaign;
  if (ds.defaultTerm) state.single.term = ds.defaultTerm;
  if (ds.defaultContent) state.single.content = ds.defaultContent;
  if (ds.defaultUtmId) state.single.utmId = ds.defaultUtmId;
  if (ds.activeTab) state.activeTab = ds.activeTab;
}

function initMacroChips() {
  document.querySelectorAll('.macro-chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-insert-target');
      const val = btn.getAttribute('data-insert-val');
      if (!targetId || !val) return; // Allow normal link navigation for anchor buttons!
      e.preventDefault();

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (!targetEl.value || targetEl.value === 'summer_sale_2025' || targetEl.value === 'search_intent') {
          targetEl.value = val;
        } else {
          if (!targetEl.value.includes(val)) {
            targetEl.value = `${targetEl.value}_${val}`;
          }
        }
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
        showToast(`Inserted ${val}`, 'info');
      }
    });
  });
}

// =========================================================
// BOOTSTRAP INITIALIZATION
// =========================================================
function initApp() {
  applyPageOverrides();
  initTheme();
  initTabs();
  initSingleBuilder();
  initBatchGenerator();
  initInspector();
  initTaxonomyGuide();
  initHistoryControls();
  initModals();
  initFooterNavigation();
  initMacroChips();
  updateHistoryBadge();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
