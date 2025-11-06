// mobile-menu.js
// Handles mobile menu, theme toggle, and audio toggle (with persistence)

(function () {
  'use strict';

  const THEME_KEY = 'eco_theme';
  const AUDIO_KEY = 'eco_audio';

  function applyTheme(theme) {
    const root = document.documentElement;
    if (!root) return;
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    updateThemeIcons();
  }

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function updateThemeIcons() {
    const isLight = document.documentElement.classList.contains('light-theme');
    document.querySelectorAll('.theme-toggle .control-icon').forEach(el => {
      el.textContent = isLight ? '☀️' : '🌙';
    });
  }

  function applyAudioState(isPlaying) {
    const audio = document.getElementById('ambientAudio');
    if (!audio) {
      // still update UI state even if there's no audio element
      document.querySelectorAll('.audio-toggle').forEach(btn => {
        btn.classList.toggle('muted', !isPlaying);
      });
      try { localStorage.setItem(AUDIO_KEY, isPlaying ? 'on' : 'off'); } catch (e) {}
      return;
    }

    if (isPlaying) {
      // try to play, but handle autoplay rejection gracefully
      audio.play().then(() => {
        document.querySelectorAll('.audio-toggle').forEach(btn => btn.classList.remove('muted'));
      }).catch(() => {
        // can't autoplay — still reflect chosen state in UI but audio may remain paused
        document.querySelectorAll('.audio-toggle').forEach(btn => btn.classList.remove('muted'));
      });
    } else {
      audio.pause();
      document.querySelectorAll('.audio-toggle').forEach(btn => btn.classList.add('muted'));
    }
    try { localStorage.setItem(AUDIO_KEY, isPlaying ? 'on' : 'off'); } catch (e) {}
  }

  function getStoredAudioState() {
    try { return localStorage.getItem(AUDIO_KEY); } catch (e) { return null; }
  }

  // small helper: find focusable elements inside container
  function focusableElements(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.offsetParent !== null);
  }

  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const menuClose = document.querySelector('.menu-close');
    const navLinks = document.querySelectorAll('.main-nav a');
    const themeBtns = document.querySelectorAll('.theme-toggle');
    const audioBtns = document.querySelectorAll('.audio-toggle');
    const mainContent = document.getElementById('main');

    // init theme/audio even if menu elements missing
    initThemeAndAudio(themeBtns, audioBtns);

    if (!menuToggle || !mainNav) return;

    let lastFocusedBeforeOpen = null;

    function openMenu() {
      menuToggle.setAttribute('aria-expanded', 'true');
      mainNav.classList.add('active');
      if (navOverlay) navOverlay.classList.add('active');
      if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'hidden';

      // focus management
      lastFocusedBeforeOpen = document.activeElement;
      const focusable = focusableElements(mainNav);
      if (focusable.length) focusable[0].focus();

      // trap focus inside nav
      document.addEventListener('keydown', trapFocus);
    }

    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      if (mainContent) mainContent.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = '';

      // restore focus
      if (lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
        lastFocusedBeforeOpen.focus();
      } else {
        menuToggle.focus();
      }

      document.removeEventListener('keydown', trapFocus);
    }

    function toggleMenu() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu(); else openMenu();
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusable = focusableElements(mainNav);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) { // shift + tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links (for single page navigation)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (window.innerWidth <= 900) {
          // let mobile-menu handle anchor scrolling timing (same behavior as before)
          if (href.startsWith('#')) {
            // allow normal smooth scroll handlers in script.js to run — only close here
            closeMenu();
          } else {
            // external/page link — close menu immediately (so navigation is not blocked)
            closeMenu();
          }
        }
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close menu on window resize (if resizing to desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  function initThemeAndAudio(themeBtns, audioBtns) {
    // Theme initialization
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme); // this also updates icons

    // Attach theme toggle buttons (desktop + mobile)
    if (themeBtns && themeBtns.length) {
      themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const isLight = document.documentElement.classList.contains('light-theme');
          applyTheme(isLight ? 'dark' : 'light');
        });
      });
    }

    // Audio initialization
    const audioStored = getStoredAudioState();
    const defaultAudioOn = audioStored ? (audioStored === 'on') : true;
    applyAudioState(defaultAudioOn);

    if (audioBtns && audioBtns.length) {
      audioBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const currentlyMuted = btn.classList.contains('muted');
          const willPlay = currentlyMuted; // if currently muted -> will play
          applyAudioState(willPlay);
        });
      });
    }

    // When audio element ends/pauses externally, sync UI
    const audio = document.getElementById('ambientAudio');
    if (audio) {
      audio.addEventListener('play', () => document.querySelectorAll('.audio-toggle').forEach(b => b.classList.remove('muted')));
      audio.addEventListener('pause', () => document.querySelectorAll('.audio-toggle').forEach(b => b.classList.add('muted')));
    }
  }

  // Expose init function (safe to call multiple times)
  window.initMobileMenu = initMobileMenu;

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
