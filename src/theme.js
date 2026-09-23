try {
  const savedTheme = localStorage.getItem('utmc_theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));
} catch {
  // Storage can be unavailable in hardened browsing modes; light is the HTML default.
}
