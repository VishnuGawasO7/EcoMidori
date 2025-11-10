// about.js - Page-specific JavaScript for About page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initCounterAnimation();
    initTimelineAnimations();
    
    // Add any page-specific interactions
    initCreatorCardInteractions();
});

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.mission-card, .stat-item, .team-card, .future-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                animateCounter(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            element.classList.add('animated');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Creator Card Interactions
function initCreatorCardInteractions() {
    const creatorCard = document.querySelector('.creator-card');
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (creatorCard) {
        // Add hover effect to creator card
        creatorCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        creatorCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    }
    
    // Enhanced social link interactions
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact link interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.querySelector('i').className.includes('envelope') ? 'email' : 'phone';
            const value = this.textContent.trim();
            
            // Show success message
            showNotification(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard!`);
            
            // In a real implementation, you would copy to clipboard
            console.log(`${type}: ${value}`);
        });
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--green-500);
        color: white;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced mobile menu for about page
function initMobileEnhancements() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add click to expand functionality for mobile timeline
    if (window.innerWidth <= 768) {
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const details = item.querySelector('.timeline-details');
            
            if (details) {
                content.style.cursor = 'pointer';
                content.addEventListener('click', function() {
                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
                    this.classList.toggle('expanded');
                });
                
                // Initially hide details on mobile
                details.style.display = 'none';
            }
        });
    }
}

// Initialize mobile enhancements
initMobileEnhancements();

// Add resize listener for mobile enhancements
window.addEventListener('resize', initMobileEnhancements);

// Smooth scrolling for anchor links
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

// Add loading state for images (if any real images are added later)
function enhanceImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading animation
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '0';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image enhancements
enhanceImages();