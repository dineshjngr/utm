// Shared behavior for every page that uses the site header.
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navigation = document.querySelector('#site-navigation');

if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    navigation.querySelectorAll('.nav-dropdown.is-open').forEach(dropdown => {
      dropdown.classList.remove('is-open');
      dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  };

  menuToggle.addEventListener('click', () => {
    const open = !navigation.classList.contains('mobile-open');
    navigation.classList.toggle('mobile-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('mobile-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 1025px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
}

// Page views are configured once from this shared module, including on articles.
const measurementId = 'G-50Y9TRD8EH';
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', measurementId);

const googleTag = document.createElement('script');
googleTag.async = true;
googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
document.head.append(googleTag);
