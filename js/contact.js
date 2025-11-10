// contact.js - Page-specific JavaScript for Contact Us

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form functionality
    initContactForm();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize map interactions
    initMapInteractions();
    
    // Add scroll animations
    initScrollAnimations();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const successClose = document.getElementById('success-close');
    const successOk = document.getElementById('success-ok');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        addRealTimeValidation();
    }

    // Modal close handlers
    if (successClose && successOk) {
        successClose.addEventListener('click', closeSuccessModal);
        successOk.addEventListener('click', closeSuccessModal);
        
        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('show')) {
                closeSuccessModal();
            }
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            const formData = new FormData(contactForm);
            const submissionData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success modal
                showSuccessModal();
                
                // Reset form
                contactForm.reset();
                clearValidationErrors();
                
                // Log submission (in real app, this would be an API call)
                console.log('Form submission:', submissionData);
                
            }, 1500);
        }
    }

    function validateForm() {
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Clear previous errors
        clearValidationErrors();
        
        // Validate name
        const name = formData.get('name');
        if (!name || name.trim().length < 2) {
            showError('name', 'Please enter your full name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        const subject = formData.get('subject');
        if (!subject) {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        const message = formData.get('message');
        if (!message || message.trim().length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }

    function addRealTimeValidation() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
            
            // Real-time validation for text inputs
            if (input.type !== 'select-one') {
                input.addEventListener('input', function() {
                    if (this.value.trim().length > 0) {
                        clearFieldError(this);
                    }
                });
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        clearFieldError(field);
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    showError(fieldName, 'Name must be at least 2 characters');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    showError(fieldName, 'Please select a subject');
                    return false;
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    showError(fieldName, 'Message must be at least 10 characters');
                    return false;
                }
                break;
        }
        
        return true;
    }

    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
        }
    }

    function clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
        }
    }

    function clearValidationErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const errorFields = document.querySelectorAll('.form-group.error');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }

    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Map Interactions
function initMapInteractions() {
    // Add loading state to map iframe
    const mapIframe = document.querySelector('.map-embed iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Initial opacity for fade-in effect
        mapIframe.style.opacity = '0';
        mapIframe.style.transition = 'opacity 0.5s ease';
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.contact-item, .faq-item, .info-item');
    
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

// Enhanced form interactions
function enhanceFormInteractions() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add character counter for message
    const messageTextarea = form.querySelector('#message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = 'text-align: right; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;';
        messageTextarea.parentNode.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count} characters`;
            
            if (count > 500) {
                charCounter.style.color = '#dc2626';
            } else if (count > 300) {
                charCounter.style.color = '#d97706';
            } else {
                charCounter.style.color = 'var(--text-muted)';
            }
        });
    }
    
    // Add subject-specific placeholders
    const subjectSelect = form.querySelector('#subject');
    const messageField = form.querySelector('#message');
    
    if (subjectSelect && messageField) {
        const placeholders = {
            collaboration: 'Tell us about your project idea and how you\'d like to collaborate...',
            volunteer: 'What skills or time can you contribute? What interests you about volunteering with us?',
            partnership: 'Tell us about your organization and potential partnership opportunities...',
            education: 'What educational program are you interested in? School level and student count...',
            general: 'How can we help you? Please share your questions or concerns...',
            feedback: 'We value your feedback! Please share your thoughts and suggestions...'
        };
        
        subjectSelect.addEventListener('change', function() {
            const placeholder = placeholders[this.value] || 'Tell us about your project, question, or how you\'d like to collaborate...';
            messageField.placeholder = placeholder;
        });
    }
}

// Initialize enhanced form interactions
enhanceFormInteractions();

// Add keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    const activeFaq = document.querySelector('.faq-item.active');
    
    if (activeFaq && (e.key === 'Escape' || e.key === 'Enter')) {
        activeFaq.classList.remove('active');
    }
});