import { buildUTMUrl, getHighlightedUrlHtml } from './modules/builder.js';
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
import { GA4_CHANNEL_RULES, GOLDEN_RULES, auditUTM } from './modules/taxonomy.js';
import { BATCH_CHANNELS, generateBatchMatrix, exportBatchToCSV, exportBatchToTSV } from './modules/batch.js';
import { deconstructUrl } from './modules/inspector.js';

// =========================================================
// APPLICATION STATE
// =========================================================
const state = {
  theme: localStorage.getItem('utmc_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  activeTab: 'tab-builder',
  single: {
    baseUrl: 'https://example.com/landing',
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
    trimSpaces: true
  },
  currentGeneratedUrl: '',
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
  toast.innerHTML = `<span style="font-weight: 700; font-size: 1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
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
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
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
      switchTab(tabs[nextIndex].getAttribute('data-tab'));
    });
  });

  const initialTab = Object.entries(TAB_META)
    .find(([, meta]) => `#${meta.slug}` === window.location.hash)?.[0];
  switchTab(initialTab || 'tab-builder', { updateUrl: false });

  window.addEventListener('hashchange', () => {
    const matchingTab = Object.entries(TAB_META)
      .find(([, meta]) => `#${meta.slug}` === window.location.hash)?.[0];
    if (matchingTab) switchTab(matchingTab, { updateUrl: false });
  });
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
  state.activeTab = tabId;

  document.querySelectorAll('.nav-tab').forEach(btn => {
    const isCurrent = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isCurrent);
    btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    btn.tabIndex = isCurrent ? 0 : -1;
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    const isCurrent = pane.id === tabId;
    pane.classList.toggle('active', isCurrent);
    pane.hidden = !isCurrent;
  });

  const meta = TAB_META[tabId];
  if (meta) {
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

  // Initial populate from state
  inputBaseUrl.value = state.single.baseUrl;
  inputSource.value = state.single.source;
  inputMedium.value = state.single.medium;
  inputCampaign.value = state.single.campaign;
  inputTerm.value = state.single.term;
  inputContent.value = state.single.content;
  inputUtmId.value = state.single.utmId;

  // Real-time recalculation listener
  const formInputs = [
    inputBaseUrl, inputSource, inputMedium, inputCampaign, 
    inputTerm, inputContent, inputUtmId
  ];

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
  clearUrlBtn.addEventListener('click', () => {
    inputBaseUrl.value = '';
    checkUrlForExistingUtms('');
    readSingleInputs();
    recalculateSingleUrl();
    inputBaseUrl.focus();
    showToast('Destination URL cleared', 'info');
  });

  // Rules toggles
  ruleLowercase.addEventListener('change', () => {
    state.options.lowercase = ruleLowercase.checked;
    recalculateSingleUrl();
  });
  ruleSpace.addEventListener('change', () => {
    state.options.spaceReplacement = ruleSpace.value;
    recalculateSingleUrl();
  });
  ruleProtocol.addEventListener('change', () => {
    state.options.autoProtocol = ruleProtocol.checked;
    recalculateSingleUrl();
  });
  ruleDuplicate.addEventListener('change', () => {
    state.options.stripDuplicateUtms = ruleDuplicate.checked;
    recalculateSingleUrl();
  });

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
  copyBtn.addEventListener('click', handleCopyUrl);

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
  testBtn.addEventListener('click', () => {
    if (state.currentGeneratedUrl) {
      window.open(state.currentGeneratedUrl, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Please enter a valid URL first', 'error');
    }
  });

  // Action: Save to History
  const saveBtn = document.getElementById('btn-save-history');
  saveBtn.addEventListener('click', () => {
    if (!state.currentGeneratedUrl) {
      showToast('No valid URL to save', 'error');
      return;
    }
    saveToHistory({
      url: state.currentGeneratedUrl,
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

  // Action: Reset Form
  const resetBtn = document.getElementById('btn-reset-form');
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
    recalculateSingleUrl();
    showToast('Form reset', 'info');
  });

  const clearPresetBtn = document.getElementById('btn-clear-preset');
  clearPresetBtn.addEventListener('click', clearActivePreset);

  // Collapsible Rules Accordion
  const rulesToggle = document.getElementById('toggle-rules-btn');
  const rulesBody = document.getElementById('rules-body');
  const rulesArrow = document.getElementById('rules-toggle-arrow');
  rulesToggle.addEventListener('click', () => {
    const isOpen = rulesBody.classList.toggle('open');
    rulesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    rulesArrow.textContent = isOpen ? '▲' : '▼';
  });

  // Custom Param button
  const addParamBtn = document.getElementById('btn-add-custom-param');
  addParamBtn.addEventListener('click', () => {
    state.single.customParams.push({ key: '', value: '' });
    renderCustomParams();
  });

  // QR Code actions
  const downloadQrBtn = document.getElementById('btn-download-qr');
  const downloadQrSvgBtn = document.getElementById('btn-download-qr-svg');
  const copyQrBtn = document.getElementById('btn-copy-qr');
  const qrCanvas = document.getElementById('qr-canvas');

  downloadQrBtn.addEventListener('click', () => {
    if (state.currentGeneratedUrl) {
      downloadQRCode(qrCanvas, `${state.single.campaign || 'campaign'}-qr.png`);
      showToast('QR Code downloaded as PNG!', 'success');
    }
  });

  if (downloadQrSvgBtn) {
    downloadQrSvgBtn.addEventListener('click', () => {
      if (state.currentGeneratedUrl) {
        downloadQRCodeSVG(state.currentGeneratedUrl, `${state.single.campaign || 'campaign'}-qr.svg`);
        showToast('QR Code downloaded as vector SVG!', 'success');
      }
    });
  }

  copyQrBtn.addEventListener('click', async () => {
    if (!state.currentGeneratedUrl) return;
    try {
      await copyQRCodeImage(qrCanvas);
      showToast('QR Code copied to clipboard!', 'success');
    } catch {
      showToast('Could not copy image directly. Try downloading instead.', 'error');
    }
  });

  // Initial presets & calculate
  renderPresetChips();
  recalculateSingleUrl();
}

function readSingleInputs() {
  state.single.baseUrl = document.getElementById('input-base-url').value;
  state.single.source = document.getElementById('input-utm-source').value;
  state.single.medium = document.getElementById('input-utm-medium').value;
  state.single.campaign = document.getElementById('input-utm-campaign').value;
  state.single.term = document.getElementById('input-utm-term').value;
  state.single.content = document.getElementById('input-utm-content').value;
  state.single.utmId = document.getElementById('input-utm-id').value;
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

    updateQRCode();
  } else {
    state.currentGeneratedUrl = '';
    outputBox.innerHTML = `<span class="url-placeholder">${result.error || 'Enter destination URL...'}</span>`;
    charCountEl.textContent = '0 chars';
    statusPill.textContent = 'Incomplete';
    statusPill.className = 'score-badge low';
  }

  updateScorecard();
}

function updateQRCode() {
  const qrCanvas = document.getElementById('qr-canvas');
  if (!qrCanvas) return;

  const url = state.currentGeneratedUrl || state.single.baseUrl || 'https://example.com';
  renderQRCode(qrCanvas, url, {
    darkColor: '#0f172a',
    lightColor: '#ffffff'
  });
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
          <div class="audit-msg ${i.level}">
            <span>${i.level === 'error' ? '✕' : '⚠'}</span>
            <span>${i.message}</span>
          </div>
        `),
        ...audit.suggestions.map(s => `
          <div class="audit-msg suggestion">
            <span>•</span>
            <span>${s.message}</span>
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
      copyBtnText.textContent = 'Copy UTM URL';
    }, 1800);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    showToast('Failed to copy to clipboard', 'error');
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
      <span>${p.name}</span>
    `;

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
    row.innerHTML = `
      <input type="text" class="form-input custom-param-key" placeholder="Parameter Key (e.g. ref, partner)" value="${param.key}" aria-label="Custom parameter key">
      <input type="text" class="form-input custom-param-val" placeholder="Value (e.g. 12345)" value="${param.value}" aria-label="Custom parameter value">
      <button type="button" class="btn-remove-param" title="Remove parameter" aria-label="Remove parameter">✕</button>
    `;

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
      <span>${ch.name}</span>
    `;

    label.querySelector('input').addEventListener('change', (e) => {
      ch.checked = e.target.checked;
    });

    grid.appendChild(label);
  });

  // Select all / deselect all
  document.getElementById('batch-select-all').addEventListener('click', () => {
    BATCH_CHANNELS.forEach(ch => ch.checked = true);
    grid.querySelectorAll('input').forEach(input => input.checked = true);
  });

  document.getElementById('batch-deselect-all').addEventListener('click', () => {
    BATCH_CHANNELS.forEach(ch => ch.checked = false);
    grid.querySelectorAll('input').forEach(input => input.checked = false);
  });

  // Generate Matrix Button
  const generateBtn = document.getElementById('btn-generate-batch');
  generateBtn.addEventListener('click', handleGenerateBatch);

  // Batch actions
  document.getElementById('btn-batch-copy-all').addEventListener('click', handleBatchCopyAll);
  const copyTsvBtn = document.getElementById('btn-batch-copy-tsv');
  if (copyTsvBtn) {
    copyTsvBtn.addEventListener('click', handleBatchCopyTSV);
  }
  document.getElementById('btn-batch-download-csv').addEventListener('click', handleBatchDownloadCSV);
  document.getElementById('btn-batch-save-history').addEventListener('click', handleBatchSaveHistory);
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
      <td><strong>${item.channelName}</strong></td>
      <td><span class="mini-badge" style="color: #38bdf8;">${item.source}</span></td>
      <td><span class="mini-badge" style="color: #34d399;">${item.medium}</span></td>
      <td>${item.campaign || '<span style="color: var(--text-muted);">-</span>'}</td>
      <td class="url-cell" title="${item.url}">${item.url}</td>
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

  loadBtn.addEventListener('click', () => {
    if (!currentInspected) return;

    // Load into Single Builder
    document.getElementById('input-base-url').value = currentInspected.baseUrl;
    document.getElementById('input-utm-source').value = currentInspected.utmParams['utm_source'] || '';
    document.getElementById('input-utm-medium').value = currentInspected.utmParams['utm_medium'] || '';
    document.getElementById('input-utm-campaign').value = currentInspected.utmParams['utm_campaign'] || '';
    document.getElementById('input-utm-term').value = currentInspected.utmParams['utm_term'] || '';
    document.getElementById('input-utm-content').value = currentInspected.utmParams['utm_content'] || '';
    document.getElementById('input-utm-id').value = currentInspected.utmParams['utm_id'] || '';

    readSingleInputs();
    recalculateSingleUrl();
    switchTab('tab-builder');
    showToast('Loaded inspected link into Builder for editing!', 'info');
  });
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
      ...data.audit.issues.map(i => `<div class="audit-msg ${i.level}"><span>${i.level === 'error' ? '❌' : '⚠️'}</span> <span>${i.message}</span></div>`),
      ...data.audit.suggestions.map(s => `<div class="audit-msg suggestion"><span>💡</span> <span>${s.message}</span></div>`)
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
  const otherKeys = Object.keys(data.otherParams);
  if (otherKeys.length > 0) {
    otherKeys.forEach(k => {
      cards.push({
        key: k,
        val: data.otherParams[k],
        note: 'Non-UTM query parameter'
      });
    });
  }

  cardsGrid.innerHTML = cards.map(c => `
    <div class="param-inspector-card">
      <div class="param-key-header">
        <span class="param-key-tag">${c.key}</span>
      </div>
      <div class="param-value-box">${c.val}</div>
      <div class="param-explanation">${c.note}</div>
    </div>
  `).join('');
}

// =========================================================
// GA4 TAXONOMY GUIDE & FORMULA BUILDER
// =========================================================
function initTaxonomyGuide() {
  const cardsGrid = document.getElementById('taxonomy-cards-grid');
  if (cardsGrid) {
    cardsGrid.innerHTML = GA4_CHANNEL_RULES.map(rule => `
      <div class="taxonomy-card">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="channel-rule-badge" style="background: ${rule.color}20; color: ${rule.color};">${rule.channel}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Recommended: <strong>${rule.recommendedMedium}</strong></span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">${rule.description}</p>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Example UTMs:</span>
          <div class="rule-code-snippet">${rule.example}</div>
        </div>
      </div>
    `).join('');
  }

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

  prodIn.value = 'saas';
  objIn.value = 'leadgen';
  geoIn.value = 'us';
  timeIn.value = '2025q3';

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

    return `
      <div class="history-item-row" data-history-id="${item.id}">
        <div class="history-info">
          <div class="history-campaign-title">
            <span>${item.campaign || 'Untitled Campaign'}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">• ${dateStr}</span>
          </div>
          <div class="history-badges">
            <span class="mini-badge" style="color: #38bdf8;">${item.source || 'no-source'}</span>
            <span class="mini-badge" style="color: #34d399;">${item.medium || 'no-medium'}</span>
            ${item.term ? `<span class="mini-badge" style="color: #c084fc;">term: ${item.term}</span>` : ''}
          </div>
          <div class="history-url-text" title="${item.url}">${item.url}</div>
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

    row.querySelector('.btn-hist-load').addEventListener('click', () => {
      document.getElementById('input-base-url').value = item.baseUrl || '';
      document.getElementById('input-utm-source').value = item.source || '';
      document.getElementById('input-utm-medium').value = item.medium || '';
      document.getElementById('input-utm-campaign').value = item.campaign || '';
      document.getElementById('input-utm-term').value = item.term || '';
      document.getElementById('input-utm-content').value = item.content || '';
      readSingleInputs();
      recalculateSingleUrl();
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

  document.getElementById('btn-history-export-csv').addEventListener('click', () => {
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

  document.getElementById('btn-history-export-json').addEventListener('click', () => {
    const json = exportHistoryToJSON();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utm-campaign-history-${Date.now()}.json`;
    link.click();
    showToast('Exported campaign history JSON!', 'success');
  });

  document.getElementById('btn-history-clear').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearAllHistory();
      renderHistoryView();
      showToast('All history cleared', 'info');
    }
  });
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

  // Shortcuts modal
  const openShortcutsBtn = document.getElementById('btn-shortcuts');
  const shortcutsModal = document.getElementById('modal-shortcuts');

  if (openShortcutsBtn && shortcutsModal) {
    openShortcutsBtn.addEventListener('click', () => {
      shortcutsModal.classList.add('open');
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

  // Global Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    // Esc closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }

    // ? opens shortcuts modal if not typing in input
    if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      shortcutsModal.classList.add('open');
    }

    // Cmd/Ctrl + Enter copies generated URL
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCopyUrl();
    }

    // Tab numbers 1-5 when not typing
    if (['1', '2', '3', '4', '5'].includes(e.key) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      const tabIds = ['tab-builder', 'tab-batch', 'tab-inspector', 'tab-taxonomy', 'tab-history'];
      const targetTab = tabIds[parseInt(e.key, 10) - 1];
      if (targetTab) switchTab(targetTab);
    }
  });
}

// =========================================================
// BOOTSTRAP INITIALIZATION
// =========================================================
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initSingleBuilder();
  initBatchGenerator();
  initInspector();
  initTaxonomyGuide();
  initHistoryControls();
  initModals();
  updateHistoryBadge();
});
