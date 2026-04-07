/**
 * Custom Hat & Millinery Studio — script.js (Redesign)
 * Premium Luxury Interactivity & UI Logic
 */

/* ============================================================
   1. CORE INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initNavbar();
  initMobileMenu(); // New Mobile Menu Logic
  initScrollAnimations();
  initBackToTop();
  initHeroParallax();
  initAuthFeatures();
});

/* ============================================================
   2. THEME ENGINE (Dark / Light)
   ============================================================ */
const THEME_KEY = 'hms_premium_theme';

function initTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(storedTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  // Update UI indicators
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const icon = btn.querySelector('.theme-icon') || btn;
    const label = btn.querySelector('.theme-label');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  });
}

/* ============================================================
   3. DIRECTION ENGINE (RTL / LTR)
   ============================================================ */
const DIR_KEY = 'hms_premium_dir';

function initDirection() {
  const storedDir = localStorage.getItem(DIR_KEY) || 'ltr';
  applyDirection(storedDir);

  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const target = current === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(target);
    });
  });
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem(DIR_KEY, dir);

  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    const label = btn.querySelector('.rtl-label');
    if (label) label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    
    // Optional: Add active class or change icon/style based on direction
    if (dir === 'rtl') {
      btn.classList.add('active-rtl');
    } else {
      btn.classList.remove('active-rtl');
    }
  });
}

/* ============================================================
   4. MOBILE MENU ENGINE (Hamburger Toggle)
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('active');
    
    if (isOpen) {
      // Close Menu
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = ''; // Re-enable scroll
    } else {
      // Open Menu
      hamburger.classList.add('active');
      navLinks.classList.add('mobile-active');
      document.body.style.overflow = 'hidden'; // Disable background scroll
    }
  });

  // Close menu when clicking links
  document.querySelectorAll('.nav-link-luxury').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && navLinks.classList.contains('mobile-active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   4. NAVBAR LOGIC
   ============================================================ */
function initNavbar() {
  const nav = document.querySelector('.luxury-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Active Link Tracking
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-luxury').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   5. SCROLL ANIMATIONS (Reveal on Scroll)
   ============================================================ */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================================
   6. HERO PARALLAX & LOADER
   ============================================================ */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Banner img animation removed per request
  // heroBg.classList.add('loaded');

  /*
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    heroBg.style.transform = `scale(1.05) translateY(${scrollPos * 0.3}px)`;
  }, { passive: true });
  */
}

/* ============================================================
   7. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   8. PAGE LOADER (Hidden after load)
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }
});
/* ============================================================
   9. AUTHENTICATION FEATURES (Password Toggle)
   ============================================================ */
function initAuthFeatures() {
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const wrapper = toggle.closest('.password-wrapper');
      const input = wrapper ? wrapper.querySelector('input') : null;
      if (!input) return;

      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);

      // Update icon
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
      }
    });
  });
}
