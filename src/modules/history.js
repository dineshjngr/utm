/**
 * Local History & Bookmarks Module
 */

const HISTORY_STORAGE_KEY = 'utm_campaign_history_v1';
const MAX_HISTORY_ITEMS = 150;

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

export function saveToHistory(item) {
  if (!item || !item.url) return;

  const history = getHistory();
  // Check if identical URL was just added recently to avoid duplicate flood
  const existingIdx = history.findIndex(h => h.url === item.url);
  if (existingIdx !== -1) {
    // Bring to top and update timestamp
    const existing = history.splice(existingIdx, 1)[0];
    existing.timestamp = Date.now();
    if (item.shortUrl) existing.shortUrl = item.shortUrl;
    history.unshift(existing);
  } else {
    const newEntry = {
      id: 'h_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      url: item.url,
      shortUrl: item.shortUrl || '',
      baseUrl: item.baseUrl || '',
      source: item.source || '',
      medium: item.medium || '',
      campaign: item.campaign || '',
      term: item.term || '',
      content: item.content || '',
      customParams: item.customParams || {},
      starred: false,
      timestamp: Date.now()
    };
    history.unshift(newEntry);
  }

  if (history.length > MAX_HISTORY_ITEMS) {
    history.length = MAX_HISTORY_ITEMS;
  }

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function toggleStarHistory(id) {
  const history = getHistory();
  const target = history.find(h => h.id === id);
  if (target) {
    target.starred = !target.starred;
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }
  return history;
}

export function deleteHistoryItem(id) {
  const history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function clearAllHistory() {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
  return [];
}

export function exportHistoryToCSV() {
  const history = getHistory();
  if (history.length === 0) return null;

  const headers = ['Date', 'Final Tracked URL', 'Short URL', 'Base URL', 'Source', 'Medium', 'Campaign', 'Term', 'Content'];
  const rows = history.map(item => [
    new Date(item.timestamp).toISOString(),
    `"${(item.url || '').replace(/"/g, '""')}"`,
    `"${(item.shortUrl || '').replace(/"/g, '""')}"`,
    `"${(item.baseUrl || '').replace(/"/g, '""')}"`,
    `"${(item.source || '').replace(/"/g, '""')}"`,
    `"${(item.medium || '').replace(/"/g, '""')}"`,
    `"${(item.campaign || '').replace(/"/g, '""')}"`,
    `"${(item.term || '').replace(/"/g, '""')}"`,
    `"${(item.content || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  return csvContent;
}

export function exportHistoryToJSON() {
  const history = getHistory();
  return JSON.stringify(history, null, 2);
}
