// mobile-menu.js - Complete mobile menu with audio and theme toggles
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE MENU FUNCTIONALITY =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const menuClose = document.querySelector('.menu-close');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  // Mobile menu functions
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  }
  
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Mobile menu event listeners
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMenu);
    
    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }
    
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          const href = link.getAttribute('href');
          
          if (href && href.startsWith('#')) {
            e.preventDefault();
            closeMenu();
            
            setTimeout(() => {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }, 300);
          } else {
            closeMenu();
          }
        }
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mainNav.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ===== AUDIO TOGGLE FUNCTIONALITY =====
  const audioToggles = document.querySelectorAll('.audio-toggle');
  const ambientAudio = document.getElementById('ambientAudio');
  
  let isMuted = localStorage.getItem('audioMuted') === 'true';
  
  function toggleAudio() {
    if (isMuted) {
      // Unmute
      ambientAudio.muted = false;
      isMuted = false;
      audioToggles.forEach(btn => btn.classList.remove('muted'));
      localStorage.setItem('audioMuted', 'false');
      
      if (ambientAudio.paused) {
        ambientAudio.play().catch(e => {
          console.log('Audio play failed:', e);
        });
      }
    } else {
      // Mute
      ambientAudio.muted = true;
      isMuted = true;
      audioToggles.forEach(btn => btn.classList.add('muted'));
      localStorage.setItem('audioMuted', 'true');
    }
  }
  
  function initAudio() {
    if (!ambientAudio) return;
    
    // Set volume to comfortable level
    ambientAudio.volume = 0.3;
    
    if (isMuted) {
      ambientAudio.muted = true;
      audioToggles.forEach(btn => btn.classList.add('muted'));
    } else {
      ambientAudio.muted = false;
      audioToggles.forEach(btn => btn.classList.remove('muted'));
      
      // Try to autoplay (might be blocked by browser)
      ambientAudio.play().catch(e => {
        console.log('Autoplay blocked, waiting for user interaction');
        // Add a one-time click handler to start audio
        const startAudio = () => {
          ambientAudio.play();
          document.removeEventListener('click', startAudio);
        };
        document.addEventListener('click', startAudio);
      });
    }
  }
  
  // Audio event listeners
  audioToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleAudio);
  });
  
  // Initialize audio
  if (ambientAudio) {
    document.addEventListener('DOMContentLoaded', initAudio);
  }

  // ===== THEME TOGGLE FUNCTIONALITY =====
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const isLight = savedTheme === 'light';
  
  function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
      // Switch to dark theme
      document.body.classList.remove('light-theme');
      themeToggles.forEach(btn => {
        btn.querySelector('.control-icon').textContent = '🌙';
      });
      localStorage.setItem('theme', 'dark');
    } else {
      // Switch to light theme
      document.body.classList.add('light-theme');
      themeToggles.forEach(btn => {
        btn.querySelector('.control-icon').textContent = '☀️';
      });
      localStorage.setItem('theme', 'light');
    }
  }
  
  function initTheme() {
    if (isLight) {
      document.body.classList.add('light-theme');
      themeToggles.forEach(btn => {
        btn.querySelector('.control-icon').textContent = '☀️';
      });
    } else {
      document.body.classList.remove('light-theme');
      themeToggles.forEach(btn => {
        btn.querySelector('.control-icon').textContent = '🌙';
      });
    }
  }
  
  // Theme event listeners
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });
  
  // Initialize theme
  document.addEventListener('DOMContentLoaded', initTheme);

  // ===== HEADER SCROLL BEHAVIOR =====
  const header = document.getElementById('header');
  
  function onScroll() { 
    if (window.scrollY > 60) {
      header.classList.add('scrolled'); 
    } else {
      header.classList.remove('scrolled'); 
    }
  }
  
  if (header) {
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll(); // Initialize on load
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  document.querySelectorAll('.main-nav a, .link-cta, .btn.primary, .btn.outline').forEach(el => {
    el.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) { 
        e.preventDefault(); 
        const target = document.querySelector(href); 
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
          }); 
        }
      }
    });
  });

});