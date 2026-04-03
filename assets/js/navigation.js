/**
 * Bronwijs - Navigation (sticky header + mobile menu)
 */
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('main-nav');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var hamburgerTop = document.getElementById('hamburger-top');
  var hamburgerBottom = document.getElementById('hamburger-bottom');
  var menuOpen = false;

  // Sticky navigation on scroll
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Check initial state

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      menuOpen = !menuOpen;
      menuToggle.setAttribute('aria-expanded', menuOpen);

      if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        // Trigger reflow then animate
        mobileMenu.offsetHeight;
        mobileMenu.classList.remove('opacity-0', '-translate-y-2.5');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
        menuToggle.style.backgroundColor = 'rgba(74, 124, 89, 0.08)';
        hamburgerTop.classList.add('rotate-45', 'translate-y-[4px]');
        hamburgerBottom.classList.add('-rotate-45', '-translate-y-[4px]');
      } else {
        closeMenu();
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menuOpen = false;
        closeMenu();
      });
    });
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('opacity-0', '-translate-y-2.5');
    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    menuToggle.style.backgroundColor = 'transparent';
    hamburgerTop.classList.remove('rotate-45', 'translate-y-[4px]');
    hamburgerBottom.classList.remove('-rotate-45', '-translate-y-[4px]');
    // Hide after transition
    setTimeout(function () {
      if (!menuOpen) {
        mobileMenu.classList.add('hidden');
      }
    }, 300);
  }
});
