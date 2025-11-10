// home.js - Home page specific JavaScript for EcoMidori

class HomePage {
    constructor() {
        this.init();
    }

    init() {

   this.setupHeroAnimations();
        this.setupAbstractBackground();
        this.setupTopicCards();
        this.setupStatsCounters();
        this.setupProjectsCarousel();
        this.setupNewsletterForm();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
    }

    // Enhanced Hero Animations
    setupHeroAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Create motto element if it doesn't exist
        if (!document.querySelector('.hero-motto')) {
            const motto = document.createElement('div');
            motto.className = 'hero-motto reveal';
            motto.textContent = 'Green ideas for a circular tomorrow';
            heroContent.insertBefore(motto, heroContent.firstChild);
        }

        // Animate hero elements with delays
        const heroElements = heroContent.children;
        Array.from(heroElements).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });

        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.classList.add('animate-in');
            }, 1500);
        }

        // Enhanced explore button functionality
        const exploreBtn = document.getElementById('explore-topics');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const coreTopics = document.getElementById('core-topics');
                if (coreTopics) {
                    coreTopics.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Abstract Background Animation
    setupAbstractBackground() {
        const abstractBg = document.querySelector('.abstract-background');
        if (!abstractBg) return;

        // Create additional abstract shapes
        const shapes = [
            { size: 400, color: 'green-400', top: -100, left: -100, delay: 0 },
            { size: 300, color: 'earth-400', top: '50%', right: -50, delay: -2 },
            { size: 350, color: 'green-300', bottom: -100, left: '30%', delay: -4 },
            { size: 250, color: 'earth-300', top: '20%', left: '60%', delay: -6 },
            { size: 200, color: 'green-200', top: '10%', right: '20%', delay: -1 },
            { size: 320, color: 'earth-200', bottom: '10%', right: '-50px', delay: -3 }
        ];

        shapes.forEach(shape => {
            const shapeEl = document.createElement('div');
            shapeEl.className = `abstract-shape shape-blob`;
            shapeEl.style.width = `${shape.size}px`;
            shapeEl.style.height = `${shape.size}px`;
            shapeEl.style.background = `var(--${shape.color})`;
            shapeEl.style.top = shape.top;
            shapeEl.style.left = shape.left;
            shapeEl.style.right = shape.right;
            shapeEl.style.bottom = shape.bottom;
            shapeEl.style.animationDelay = `${shape.delay}s`;
            
            abstractBg.appendChild(shapeEl);
        });
    }

    // Enhanced Topic Cards with better animations
    setupTopicCards() {
        const topicCards = document.querySelectorAll('.topic-card');
        
        topicCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    card.classList.add('flipped');
                    // Add subtle scale effect
                    card.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    card.classList.remove('flipped');
                    card.style.transform = 'scale(1)';
                }
            });

            // Enhanced touch support for mobile
            card.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    card.classList.toggle('flipped');
                }
            });
        });
    }

    // Hero Section Animations
    setupHeroAnimations() {
        // Animate hero elements on load
        const heroContent = document.querySelector('.hero-content');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('animate-in');
            }, 500);
        }

        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.classList.add('animate-in');
            }, 1000);
        }

        // Explore topics button functionality
        const exploreBtn = document.getElementById('explore-topics');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const coreTopics = document.getElementById('core-topics');
                if (coreTopics) {
                    coreTopics.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Topic Cards Flip Animation
    setupTopicCards() {
        const topicCards = document.querySelectorAll('.topic-card');
        
        topicCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) { // Only on desktop
                    card.classList.add('flipped');
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    card.classList.remove('flipped');
                }
            });

            // Touch support for mobile
            card.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    card.classList.toggle('flipped');
                }
            });
        });
    }

    // Animated Stats Counters
    setupStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let counted = false;

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            countObserver.observe(statsSection);
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            window.ecoMidoriApp.animateCounter(stat, target, 2000);
        });
    }

    // Projects Carousel
    setupProjectsCarousel() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselItems = document.querySelectorAll('.project-card');
        this.carouselDots = document.querySelectorAll('.carousel-dots .dot');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        
        if (!this.carouselTrack || !this.carouselItems.length) return;

        this.currentSlide = 0;
        this.slideCount = this.carouselItems.length;
        this.autoPlayInterval = null;

        this.initCarousel();
        this.startAutoPlay();
        this.setupCarouselEvents();
    }

    initCarousel() {
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.carouselTrack) return;

        const slideWidth = this.carouselItems[0].offsetWidth + 32; // card width + gap
        this.carouselTrack.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;

        // Update dots
        this.carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    setupCarouselEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }

        // Dot indicators
        this.carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });

        // Pause auto-play on hover
        const carousel = document.querySelector('.projects-carousel');
        if (carousel) {
            carousel.addEventListener('mouseover', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Touch swipe support
        this.setupTouchSwipe();
    }

    setupTouchSwipe() {
        if (!this.carouselTrack) return;

        let startX = 0;
        let currentX = 0;
        let isSwiping = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            this.stopAutoPlay();
        };

        const handleTouchMove = (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 10) { // Minimum swipe distance
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e) => {
            if (!isSwiping) return;
            
            const diff = startX - currentX;
            const swipeThreshold = 50;
            
            if (diff > swipeThreshold) {
                this.nextSlide();
            } else if (diff < -swipeThreshold) {
                this.prevSlide();
            }
            
            isSwiping = false;
            this.startAutoPlay();
        };

        // this.carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
        this.carouselTrack.addEventListener('touchmove', handleTouchMove, { passive: false });
        this.carouselTrack.addEventListener('touchend', handleTouchEnd);
    }

    // Newsletter Form
    setupNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        const input = form.querySelector('input[type="email"]');
        
        // Real-time validation
        input.addEventListener('input', (e) => {
            this.validateEmailInput(e.target);
        });

        // Enhanced submit handling
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmission(form);
        });
    }

    validateEmailInput(input) {
        const email = input.value.trim();
        const isValid = window.ecoMidoriApp.validateEmail(email);
        
        if (email === '') {
            input.classList.remove('valid', 'invalid');
        } else if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    }

    handleNewsletterSubmission(form) {
        const input = form.querySelector('input[type="email"]');
        const email = input.value.trim();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        if (!window.ecoMidoriApp.validateEmail(email)) {
            window.ecoMidoriApp.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            window.ecoMidoriApp.showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            input.classList.remove('valid', 'invalid');
            
            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }

    // Additional Scroll Animations
    setupScrollAnimations() {
        // Add reveal class to elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.topic-card, .stat-item, .why-card, .project-card, .section-header'
        );
        
        animateElements.forEach((element, index) => {
            element.classList.add('reveal', `reveal-delay-${(index % 4) + 1}`);
        });

        // Enhanced intersection observer with different thresholds
        if ('IntersectionObserver' in window) {
            const enhancedObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Add bounce effect for cards
                        if (entry.target.classList.contains('topic-card')) {
                            entry.target.style.animation = 'cardBounce 0.6s ease';
                        }
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(element => {
                enhancedObserver.observe(element);
            });
        }
    }
}

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.ecoMidoriApp) {
        window.homePage = new HomePage();
    } else {
        document.addEventListener('ecoMidoriReady', () => {
            window.homePage = new HomePage();
        });
    }
});

// Add CSS animation for card bounce
const style = document.createElement('style');
style.textContent = `
    @keyframes cardBounce {
        0% { transform: scale(0.8); opacity: 0; }
        60% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .topic-card {
        animation: cardBounce 0.6s ease-out;
    }
`;
document.head.appendChild(style);