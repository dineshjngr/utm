/**
 * UTMCraft Blog Client-Side Interactivity
 * Reading Progress, TOC ScrollSpy, Code Copying, Client-Side Search
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initTableOfContents();
  initCopyCodeButtons();
  initBlogSearch();
  initThemeToggle();
});

// 1. Reading Progress Bar (Progressive Enhancement Fallback)
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  // If CSS animation-timeline is not supported, calculate manually
  if (!window.CSS || !CSS.supports('animation-timeline: scroll()')) {
    window.addEventListener('scroll', () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }, { passive: true });
  }
}

// 2. Sticky Desktop Table of Contents Scrollspy
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = Array.from(document.querySelectorAll('.article-prose h2[id], .article-prose h3[id]'));
  if (tocLinks.length === 0 || headings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  headings.forEach(h => observer.observe(h));
}

// 3. 1-Click Code & Snippet Copying
function initCopyCodeButtons() {
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      let textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy || textToCopy === 'utm_capture_script') {
        const pre = btn.closest('.code-block-wrap')?.querySelector('pre code');
        if (pre) textToCopy = pre.innerText;
      }

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    });
  });
}

// 4. Instant Client-Side Search for Blog Home & Category Pages
function initBlogSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const cards = Array.from(document.querySelectorAll('body[data-page="blog-index"] .post-card'));
  const emptyState = document.getElementById('blog-empty-state');
  if (cards.length === 0) return;

  const pageSize = 12;
  const postsGrid = cards[0].parentElement;
  if (!postsGrid) return;

  const pagination = document.createElement('nav');
  pagination.className = 'blog-pagination';
  pagination.setAttribute('aria-label', 'Blog pages');
  postsGrid.insertAdjacentElement('afterend', pagination);

  let currentPage = Math.max(1, Number.parseInt(new URLSearchParams(window.location.search).get('page'), 10) || 1);

  function getMatchingCards() {
    const query = searchInput?.value.trim().toLowerCase() || '';
    return cards.filter(card => {
      const title = card.querySelector('.post-card-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.post-card-excerpt')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.post-card-category')?.textContent.toLowerCase() || '';
      return title.includes(query) || excerpt.includes(query) || category.includes(query);
    });
  }

  function renderPage() {
    const matchingCards = getMatchingCards();
    const pageCount = Math.max(1, Math.ceil(matchingCards.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * pageSize;
    const pageCards = new Set(matchingCards.slice(start, start + pageSize));

    cards.forEach(card => {
      card.style.display = pageCards.has(card) ? 'flex' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = matchingCards.length === 0 ? 'block' : 'none';
    }

    pagination.replaceChildren();
    if (matchingCards.length <= pageSize) return;

    const summary = document.createElement('p');
    summary.className = 'blog-pagination-summary';
    summary.textContent = `Showing ${start + 1}–${Math.min(start + pageSize, matchingCards.length)} of ${matchingCards.length} guides`;
    pagination.append(summary);

    const links = document.createElement('div');
    links.className = 'blog-pagination-links';
    pagination.append(links);

    function addPageLink(label, page, { current = false, disabled = false, ariaLabel } = {}) {
      const link = document.createElement('a');
      link.className = 'blog-pagination-link';
      link.textContent = label;
      link.href = page === 1 ? window.location.pathname : `${window.location.pathname}?page=${page}`;
      if (current) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-current');
      }
      if (disabled) {
        link.setAttribute('aria-disabled', 'true');
        link.tabIndex = -1;
        link.classList.add('is-disabled');
        link.addEventListener('click', event => event.preventDefault());
      }
      if (ariaLabel) link.setAttribute('aria-label', ariaLabel);
      links.append(link);
    }

    addPageLink('Previous', Math.max(1, currentPage - 1), { disabled: currentPage === 1, ariaLabel: 'Previous page' });
    for (let page = 1; page <= pageCount; page++) {
      addPageLink(String(page), page, { current: page === currentPage, ariaLabel: `Page ${page}` });
    }
    addPageLink('Next', Math.min(pageCount, currentPage + 1), { disabled: currentPage === pageCount, ariaLabel: 'Next page' });
  }

  searchInput?.addEventListener('input', () => {
    currentPage = 1;
    window.history.replaceState({}, '', window.location.pathname);
    renderPage();
  });

  renderPage();
}

// 5. Theme Toggle Synchronization
function initThemeToggle() {
  const themeToggle = document.getElementById('btn-theme-toggle');
  if (!themeToggle) return;

  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');

  function updateIcons(isDark) {
    if (moonIcon && sunIcon) {
      moonIcon.style.display = isDark ? 'none' : 'block';
      sunIcon.style.display = isDark ? 'block' : 'none';
    }
  }

  // Initial state check
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateIcons(currentTheme === 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('utmc_theme', nextTheme);
    updateIcons(!isDark);
  });
}
