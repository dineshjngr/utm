// Shared behavior for every page that uses the site header.
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navigation = document.querySelector('#site-navigation');
const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

function closeDropdowns(except = null) {
  dropdowns.forEach(dropdown => {
    if (dropdown === except) return;
    dropdown.classList.remove('is-open');
    dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
  });
}

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.nav-dropdown-toggle');
  button?.addEventListener('click', () => {
    const open = !dropdown.classList.contains('is-open');
    closeDropdowns(dropdown);
    dropdown.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openDropdown = dropdowns.find(dropdown => dropdown.classList.contains('is-open'));
  if (openDropdown) {
    closeDropdowns();
    openDropdown.querySelector('.nav-dropdown-toggle')?.focus();
  }
});

if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    closeDropdowns();
  };

  menuToggle.addEventListener('click', event => {
    const open = !navigation.classList.contains('mobile-open');
    navigation.classList.toggle('mobile-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open && event.detail === 0) navigation.querySelector('button, a')?.focus();
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
