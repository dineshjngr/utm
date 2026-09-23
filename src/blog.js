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
  const cards = document.querySelectorAll('.post-card');
  const emptyState = document.getElementById('blog-empty-state');
  if (!searchInput || cards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('.post-card-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.post-card-excerpt')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.post-card-category')?.textContent.toLowerCase() || '';

      const match = title.includes(query) || excerpt.includes(query) || category.includes(query);
      if (match) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
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
