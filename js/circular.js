// circular.js - Circular Economy page specific JavaScript

class CircularEconomyPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupStatsCounters();
        this.setupDiagramInteractions();
        this.setupQuiz();
        this.setupCircularIdeaModal();
        this.setupInteractiveElements();
        this.setupChecklist();
    }

    // Stats counters animation
    setupStatsCounters() {
        const statNumbers = document.querySelectorAll('.circular-stat .stat-number');
        let counted = false;

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        const dataSection = document.querySelector('.data-section');
        if (dataSection) {
            countObserver.observe(dataSection);
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.circular-stat .stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            this.animateCounter(stat, target, 1500);
        });
    }

    // Counter animation utility
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

    // Diagram interactions
    setupDiagramInteractions() {
        this.setupDiagramTabs();
        this.setupFlowStepInteractions();
        this.setupLoopItemInteractions();
    }

    setupDiagramTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    setupFlowStepInteractions() {
        const flowSteps = document.querySelectorAll('.flow-step');
        
        flowSteps.forEach(step => {
            step.addEventListener('click', () => {
                const stepNumber = step.getAttribute('data-step');
                this.showStepDetails(stepNumber);
            });
        });
    }

    showStepDetails(stepNumber) {
        const stepDetails = {
            '1': 'Extraction of virgin materials from the earth, causing habitat destruction and resource depletion.',
            '2': 'Energy-intensive manufacturing processes that generate pollution and greenhouse gases.',
            '3': 'Short product lifespans and low utilization rates in consumption patterns.',
            '4': 'Products end up in landfills or incinerators, wasting resources and causing pollution.'
        };

        this.showNotification(stepDetails[stepNumber], 'info');
    }

    setupLoopItemInteractions() {
        const loopItems = document.querySelectorAll('.loop-item');
        
        loopItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemType = item.getAttribute('data-item');
                this.showLoopItemDetails(itemType);
            });
        });
    }

    showLoopItemDetails(itemType) {
        const itemDetails = {
            'compost': 'Organic materials are broken down into nutrient-rich compost that returns to the soil.',
            'biogas': 'Anaerobic digestion converts organic waste into renewable energy and fertilizer.',
            'maintain': 'Regular maintenance extends product lifespan and reduces replacement needs.',
            'reuse': 'Products are used multiple times by the same or different users.',
            'refurbish': 'Products are repaired, updated, and restored to like-new condition.',
            'recycle': 'Materials are processed and transformed into new products.'
        };

        this.showNotification(itemDetails[itemType], 'info');
    }

    // Quiz functionality
    setupQuiz() {
        this.quizData = [
            {
                id: 1,
                question: "What is the main goal of a circular economy?",
                options: [
                    "To maximize production efficiency",
                    "To eliminate waste and keep materials in use",
                    "To reduce manufacturing costs",
                    "To increase product variety"
                ],
                answerIndex: 1,
                explanation: "The circular economy aims to design out waste and pollution, keep products and materials in use, and regenerate natural systems."
            },
            {
                id: 2,
                question: "Which of these is a key principle of circular economy?",
                options: [
                    "Planned obsolescence",
                    "Single-use products",
                    "Design for durability",
                    "Maximum resource extraction"
                ],
                answerIndex: 2,
                explanation: "Design for durability ensures products last longer and can be repaired, maintained, and upgraded."
            },
            {
                id: 3,
                question: "What does 'biological cycle' refer to in circular economy?",
                options: [
                    "The life cycle of electronic products",
                    "The process of returning nutrients to the soil",
                    "The manufacturing timeline",
                    "The consumer buying pattern"
                ],
                answerIndex: 1,
                explanation: "Biological cycles involve biodegradable materials that can safely return to the environment and regenerate natural systems."
            },
            {
                id: 4,
                question: "Which business model is aligned with circular economy?",
                options: [
                    "Sell as many products as possible",
                    "Product-as-a-service",
                    "Fast fashion",
                    "Disposable packaging"
                ],
                answerIndex: 1,
                explanation: "Product-as-a-service models focus on providing services rather than selling products, encouraging durability and reuse."
            },
            {
                id: 5,
                question: "What is the current global circularity percentage?",
                options: [
                    "25%",
                    "7%",
                    "50%",
                    "15%"
                ],
                answerIndex: 1,
                explanation: "Only 7.2% of the global economy is circular, meaning over 90% of materials are wasted after single use."
            }
        ];

        this.currentQuestion = 0;
        this.userAnswers = [];
        this.quizStarted = false;

        this.setupQuizEventListeners();
    }

    setupQuizEventListeners() {
        const startBtn = document.getElementById('start-quiz-btn');
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        const submitBtn = document.getElementById('submit-quiz');
        const retakeBtn = document.getElementById('retake-quiz');
        const reviewBtn = document.getElementById('review-answers');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }

        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.retakeQuiz());
        }

        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => this.reviewAnswers());
        }
    }

    startQuiz() {
        this.quizStarted = true;
        this.currentQuestion = 0;
        this.userAnswers = new Array(this.quizData.length).fill(null);

        document.querySelector('.quiz-intro').style.display = 'none';
        document.querySelector('.quiz-interface').style.display = 'block';
        
        this.showQuestion();
        this.updateProgress();
        this.updateNavigationButtons();
    }

    showQuestion() {
        const question = this.quizData[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        if (questionText) {
            questionText.textContent = question.question;
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                if (this.userAnswers[this.currentQuestion] === index) {
                    optionElement.classList.add('selected');
                }
                
                optionElement.innerHTML = `
                    <div class="option-index">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                `;
                
                optionElement.addEventListener('click', () => this.selectOption(index));
                optionsContainer.appendChild(optionElement);
            });
        }
    }

    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestion] = optionIndex;
        this.showQuestion();
        this.updateNavigationButtons();
    }

    nextQuestion() {
        if (this.currentQuestion < this.quizData.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
            this.updateProgress();
            this.updateNavigationButtons();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
            this.updateProgress();
            this.updateNavigationButtons();
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionElement = document.getElementById('current-question');
        
        if (progressFill) {
            const progress = ((this.currentQuestion + 1) / this.quizData.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentQuestionElement) {
            currentQuestionElement.textContent = this.currentQuestion + 1;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-quiz');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }

        if (nextBtn && submitBtn) {
            const isLastQuestion = this.currentQuestion === this.quizData.length - 1;
            nextBtn.style.display = isLastQuestion ? 'none' : 'flex';
            submitBtn.style.display = isLastQuestion ? 'flex' : 'none';
        }
    }

    submitQuiz() {
        let score = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.quizData[index].answerIndex) {
                score++;
            }
        });

        this.showResults(score);
    }

    showResults(score) {
        const percentage = Math.round((score / this.quizData.length) * 100);
        
        document.querySelector('.quiz-interface').style.display = 'none';
        document.querySelector('.quiz-results').style.display = 'block';
        
        document.getElementById('score-percentage').textContent = percentage;
        document.getElementById('score-text').textContent = `${score}/${this.quizData.length}`;
        
        const resultsMessage = document.getElementById('results-message');
        if (resultsMessage) {
            if (percentage >= 80) {
                resultsMessage.textContent = "Excellent! You have a strong understanding of circular economy principles.";
            } else if (percentage >= 60) {
                resultsMessage.textContent = "Good job! You have a solid foundation in circular economy concepts.";
            } else {
                resultsMessage.textContent = "Keep learning! Review the materials and try again to improve your score.";
            }
        }
    }

    retakeQuiz() {
        document.querySelector('.quiz-results').style.display = 'none';
        document.querySelector('.quiz-intro').style.display = 'block';
        this.quizStarted = false;
    }

    reviewAnswers() {
        document.querySelector('.quiz-results').style.display = 'none';
        document.querySelector('.quiz-review').style.display = 'block';
        
        this.showReviewQuestions();
    }

    showReviewQuestions() {
        const reviewContainer = document.getElementById('review-questions');
        if (!reviewContainer) return;

        reviewContainer.innerHTML = '';

        this.quizData.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.answerIndex;
            
            const reviewQuestion = document.createElement('div');
            reviewQuestion.className = 'review-question';
            
            let answerStatus = '';
            if (isCorrect) {
                answerStatus = '<div class="review-answer correct">✓ Correct Answer</div>';
            } else {
                answerStatus = `
                    <div class="review-answer incorrect">✗ Your Answer: ${question.options[userAnswer]}</div>
                    <div class="review-answer correct">✓ Correct Answer: ${question.options[question.answerIndex]}</div>
                `;
            }
            
            reviewQuestion.innerHTML = `
                <div class="review-question-header">
                    <div class="review-question-text">${index + 1}. ${question.question}</div>
                </div>
                ${answerStatus}
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            reviewContainer.appendChild(reviewQuestion);
        });
    }

    // Circular idea modal
    setupCircularIdeaModal() {
        const ideaBtn = document.getElementById('circular-idea-btn');
        const modal = document.getElementById('circular-idea-modal');
        const closeBtn = document.getElementById('circular-modal-close');
        const cancelBtn = document.getElementById('cancel-idea');
        const form = document.getElementById('circular-idea-form');

        if (ideaBtn && modal) {
            ideaBtn.addEventListener('click', () => {
                modal.classList.add('show');
            });
        }

        const closeModal = () => {
            modal.classList.remove('show');
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleIdeaSubmission(form);
                closeModal();
            });
        }
    }

    handleIdeaSubmission(form) {
        const formData = new FormData(form);
        const ideaData = {
            name: formData.get('idea-name'),
            description: formData.get('idea-description'),
            category: formData.get('idea-category'),
            location: formData.get('idea-location'),
            contact: formData.get('idea-contact')
        };

        // Show success message
        this.showNotification('Thank you for sharing your circular economy idea! We will review it and may contact you for further discussion.', 'success');
        form.reset();
    }

    // Checklist functionality
    setupChecklist() {
        const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        
        checklistItems.forEach(item => {
            item.addEventListener('change', (e) => {
                const label = e.target.nextElementSibling;
                if (e.target.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.7';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            });
        });
    }

    // Notification system
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

    // Additional interactive elements
    setupInteractiveElements() {
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

        // Add hover effects to cards
        const cards = document.querySelectorAll('.principle-card, .strategy-card, .case-study-card, .data-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.circularPage = new CircularEconomyPage();
});