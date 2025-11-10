// universal.js - Global JavaScript for EcoMidori

class EcoMidoriApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all global functionality
        this.setupTheme();
        this.setupLoadingScreen();
        this.setupHeaderFunctionality();
        this.setupScrollEffects();
        this.setupCustomCursor();
        this.setupIntersectionObserver();
        this.setupGlobalEventListeners();
    }

// Theme Management
setupTheme() {
    this.themeToggles = document.querySelectorAll('.theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    this.applyTheme(this.currentTheme);
    
    if (this.themeToggles.length) {
        this.themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleTheme());
        });
    }
}

applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update ALL toggle icons
    this.themeToggles?.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    });
}

toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
}


    // Enhanced Loading Screen
    setupLoadingScreen() {
        this.loadingScreen = document.getElementById('loading-screen');
        
        if (this.loadingScreen) {
            // Create additional floating leaves
            this.createFloatingLeaves();
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        this.loadingScreen.style.display = 'none';
                    }, 500);
                }, 1500);
            });

            // Fallback
            setTimeout(() => {
                if (this.loadingScreen.style.display !== 'none') {
                    this.loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        this.loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 4000);
        }
    }

    createFloatingLeaves() {
        const leafContainer = document.querySelector('.leaf-float-animation');
        if (!leafContainer) return;

        for (let i = 0; i < 3; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            leaf.style.animationDelay = `-${i}s`;
            leafContainer.appendChild(leaf);
        }
    }

    // Enhanced Header Functionality
    setupHeaderFunctionality() {
        this.header = document.getElementById('header');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.mainNav = document.querySelector('.main-nav');
        this.navOverlay = document.querySelector('.nav-overlay');
        
        this.initMobileMenu();
        this.initDropdowns();
    }

    // Mobile Menu Functionality
    initMobileMenu() {
        if (!this.menuToggle || !this.mainNav) return;

        let lastFocusedBeforeOpen = null;

        const openMenu = () => {
            this.menuToggle.setAttribute('aria-expanded', 'true');
            this.mainNav.classList.add('active');
            if (this.navOverlay) this.navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            lastFocusedBeforeOpen = document.activeElement;
            const focusable = this.focusableElements(this.mainNav);
            if (focusable.length) focusable[0].focus();

            document.addEventListener('keydown', trapFocus);
        };

        const closeMenu = () => {
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.mainNav.classList.remove('active');
            if (this.navOverlay) this.navOverlay.classList.remove('active');
            document.body.style.overflow = '';

            if (lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
                lastFocusedBeforeOpen.focus();
            } else {
                this.menuToggle.focus();
            }

            document.removeEventListener('keydown', trapFocus);
            
            // Close all dropdowns when closing mobile menu
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.setAttribute('data-visible', 'false');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
        };

        const toggleMenu = () => {
            const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) closeMenu(); else openMenu();
        };

        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;
            const focusable = this.focusableElements(this.mainNav);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
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
        };

        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', closeMenu);
        }

        // Close mobile menu when clicking on links
        const navLinks = this.mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }

    // Dropdown Functionality
    initDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;

            const toggleDropdown = () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                menu.setAttribute('data-visible', !isExpanded);
            };

            const closeDropdown = () => {
                toggle.setAttribute('aria-expanded', 'false');
                menu.setAttribute('data-visible', 'false');
            };

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.innerWidth <= 900) {
                    toggleDropdown();
                }
            });

            // Desktop hover
            if (window.innerWidth > 900) {
                dropdown.addEventListener('mouseenter', () => {
                    toggle.setAttribute('aria-expanded', 'true');
                    menu.setAttribute('data-visible', 'true');
                });

                dropdown.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            closeDropdown();
                        }
                    }, 100);
                });
            }

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    closeDropdown();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                    closeDropdown();
                    toggle.focus();
                }
            });
        });

        // Close dropdowns on window resize
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

    // Utility function for focusable elements
    focusableElements(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetParent !== null);
    }

    // Scroll Effects
    setupScrollEffects() {
        this.lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Header scroll effect
        if (this.header) {
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }

        this.lastScrollY = currentScrollY;
    }

    // Enhanced Custom Cursor
    setupCustomCursor() {
        this.cursor = document.getElementById('custom-cursor');
        
        if (this.cursor && window.matchMedia('(pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                this.moveCursor(e);
            });

            this.setupCursorInteractions();
            this.setupCursorClickEffect();
        } else if (this.cursor) {
            this.cursor.style.display = 'none';
        }
    }

    moveCursor(e) {
        if (this.cursor) {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        }
    }

    setupCursorInteractions() {
        // Add hover effects to interactive elements
        const interactiveElements = [
            'button',
            'a',
            '.btn',
            '.topic-card',
            '.project-card',
            '.social-link',
            '.theme-toggle',
            '.carousel-btn',
            '.dropdown-toggle',
            '.nav-link'
        ].join(',');

        const elements = document.querySelectorAll(interactiveElements);

        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.cursor) this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                if (this.cursor) this.cursor.classList.remove('hover');
            });
        });
    }

    setupCursorClickEffect() {
        document.addEventListener('mousedown', () => {
            if (this.cursor) this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            if (this.cursor) this.cursor.classList.remove('click');
        });
    }

    // Intersection Observer for Scroll Animations
    setupIntersectionObserver() {
        const revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            revealElements.forEach(element => {
                element.classList.add('active');
            });
        }
    }

    // Global Event Listeners
    setupGlobalEventListeners() {
        // Handle Escape key for modals and mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });

        // Handle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
    }

    handleEscapeKey() {
        // Close mobile menu if open
        if (this.mainNav && this.mainNav.classList.contains('active')) {
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.mainNav.classList.remove('active');
            if (this.navOverlay) this.navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.setAttribute('data-visible', 'false');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    }

    handleResize() {
        // Close mobile menu on resize to larger screens
        if (window.innerWidth > 900 && this.mainNav) {
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.mainNav.classList.remove('active');
            if (this.navOverlay) this.navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleFormSubmit(e) {
        const form = e.target;
        
        // Client-side validation for newsletter form
        if (form.id === 'newsletter-form') {
            e.preventDefault();
            this.handleNewsletterSubmit(form);
        }
    }

    handleNewsletterSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Thank you for subscribing!', 'success');
        form.reset();
        
        // In a real implementation, you would send this to your backend
        console.log('Newsletter subscription:', email);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            this.addNotificationStyles();
        }

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    addNotificationStyles() {
        const styles = `
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: var(--space-md) var(--space-lg);
                    box-shadow: var(--shadow-xl);
                    transform: translateX(400px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 10000;
                    max-width: 400px;
                }
                
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .notification-success {
                    border-left: 4px solid var(--green-500);
                }
                
                .notification-error {
                    border-left: 4px solid #f44336;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: var(--space-xs);
                    position: absolute;
                    top: var(--space-sm);
                    right: var(--space-sm);
                }
                
                .notification-close:hover {
                    color: var(--text-primary);
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Counter Animation
    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Utility function to format numbers
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ecoMidoriApp = new EcoMidoriApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcoMidoriApp;
}