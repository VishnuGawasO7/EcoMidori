// dropdown.js - Enhanced Dropdown Navigation
(function () {
  'use strict';

  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (!toggle || !menu) return;

      // Toggle dropdown
      function toggleDropdown() {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.setAttribute('data-visible', !isExpanded);
      }

      // Close dropdown
      function closeDropdown() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('data-visible', 'false');
      }

      // Event listeners
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          closeDropdown();
        }
      });

      // Close when pressing Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          closeDropdown();
          toggle.focus();
        }
      });

      // Handle mobile menu integration
      const mobileMenu = document.querySelector('.main-nav');
      if (mobileMenu) {
        // Close dropdown when mobile menu closes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              if (!mobileMenu.classList.contains('active')) {
                closeDropdown();
              }
            }
          });
        });

        observer.observe(mobileMenu, { attributes: true });
      }

      // Enhanced hover for desktop
      if (window.innerWidth > 900) {
        dropdown.addEventListener('mouseenter', () => {
          toggle.setAttribute('aria-expanded', 'true');
          menu.setAttribute('data-visible', 'true');
        });

        dropdown.addEventListener('mouseleave', () => {
          // Small delay to allow moving cursor to dropdown
          setTimeout(() => {
            if (!dropdown.matches(':hover')) {
              closeDropdown();
            }
          }, 100);
        });
      }
    });

    // Close all dropdowns when window resizes (mobile/desktop switch)
    window.addEventListener('resize', () => {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (toggle && menu) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('data-visible', 'false');
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();