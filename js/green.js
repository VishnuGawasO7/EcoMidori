// green.js - Green Entrepreneurship page specific JavaScript

class GreenEntrepreneurshipPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupStatsCounters();
        this.setupCharts();
        this.setupQuiz();
        this.setupProjectModal();
        this.setupInteractiveElements();
    }

    // Stats counters animation
    setupStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-card .stat-number');
        let counted = false;

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        const chartsSection = document.querySelector('.charts-section');
        if (chartsSection) {
            countObserver.observe(chartsSection);
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-card .stat-number');
        
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

    // Charts setup
    setupCharts() {
        this.createSectorChart();
        this.createRecoveryChart();
    }

    createSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx) return;

        // Simple chart implementation without Chart.js
        const chartData = [30, 25, 20, 15, 10];
        const chartLabels = ['Waste Management', 'Renewable Energy', 'Agritech', 'Sustainable Packaging', 'Green Services'];
        const colors = ['#4caf50', '#8bc34a', '#cddc39', '#ffc107', '#ff9800'];

        const chartHtml = chartData.map((value, index) => `
            <div class="chart-item">
                <div class="chart-bar" style="height: ${value * 2}px; background: ${colors[index]}"></div>
                <div class="chart-label">${chartLabels[index]}</div>
                <div class="chart-value">${value}%</div>
            </div>
        `).join('');

        ctx.innerHTML = `
            <div class="simple-chart">
                ${chartHtml}
            </div>
        `;
    }

    createRecoveryChart() {
        const ctx = document.getElementById('recoveryChart');
        if (!ctx) return;

        const chartData = [
            { project: 'Parye Compost', value: 65 },
            { project: 'Coastal Cleanup', value: 72 },
            { project: 'Banana Fiber Pack', value: 55 }
        ];

        const chartHtml = chartData.map(item => `
            <div class="recovery-item">
                <div class="recovery-project">${item.project}</div>
                <div class="recovery-bar">
                    <div class="recovery-fill" style="width: ${item.value}%"></div>
                </div>
                <div class="recovery-value">${item.value}%</div>
            </div>
        `).join('');

        ctx.innerHTML = `
            <div class="simple-recovery-chart">
                ${chartHtml}
            </div>
        `;
    }

    // Quiz functionality - Simplified version
    setupQuiz() {
        this.quizData = [
            {
                id: 1,
                question: "What is the primary goal of green entrepreneurship?",
                options: [
                    "Maximizing short-term profits only",
                    "Developing businesses that create environmental and social value",
                    "Exporting goods at low cost",
                    "Replacing traditional education systems"
                ],
                answerIndex: 1,
                explanation: "Green entrepreneurship focuses on creating businesses that produce positive environmental and social outcomes while remaining economically viable."
            },
            {
                id: 2,
                question: "Which of the following best describes a circular economy?",
                options: [
                    "A system where items are used once and discarded",
                    "An economy that eliminates waste through reuse, repair, and recycling",
                    "An economy based on continuous consumption",
                    "A system that ignores product design"
                ],
                answerIndex: 1,
                explanation: "A circular economy designs waste out of systems and keeps materials in use through reuse, repair, remanufacture, and recycling."
            },
            {
                id: 3,
                question: "EcoSymbiosis refers to:",
                options: [
                    "Competition between green companies",
                    "A collaborative relationship where entrepreneurship supports circular systems and vice versa",
                    "A type of invasive plant species",
                    "A government tax"
                ],
                answerIndex: 1,
                explanation: "EcoSymbiosis is the interplay where green startups use circular principles, and circular systems enable entrepreneurial models."
            },
            {
                id: 4,
                question: "Which business model is common in circular economies?",
                options: [
                    "Product-as-a-service",
                    "One-time sale with no support",
                    "Price increase every year",
                    "Never repairing products"
                ],
                answerIndex: 0,
                explanation: "Product-as-a-service encourages reuse and longer product lifetimes by retaining ownership and responsibility for returns and maintenance."
            },
            {
                id: 5,
                question: "What is Extended Producer Responsibility (EPR)?",
                options: [
                    "A consumer tax",
                    "A policy that holds producers responsible for end-of-life disposal of products",
                    "A marketing strategy",
                    "A manufacturing process"
                ],
                answerIndex: 1,
                explanation: "EPR requires producers to manage and finance the collection, recycling, or disposal of products they put on the market."
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
                resultsMessage.textContent = "Excellent! You have a strong understanding of green entrepreneurship concepts.";
            } else if (percentage >= 60) {
                resultsMessage.textContent = "Good job! You have a solid foundation in green entrepreneurship principles.";
            } else {
                resultsMessage.textContent = "Keep learning! Review the concepts and try again to improve your score.";
            }
        }
    }

    retakeQuiz() {
        document.querySelector('.quiz-results').style.display = 'none';
        document.querySelector('.quiz-intro').style.display = 'block';
        this.quizStarted = false;
    }

    // Project submission modal
    setupProjectModal() {
        const submitBtn = document.getElementById('submit-project-btn');
        const modal = document.getElementById('project-modal');
        const closeBtn = document.getElementById('modal-close');
        const cancelBtn = document.getElementById('cancel-project');
        const form = document.getElementById('project-form');

        if (submitBtn && modal) {
            submitBtn.addEventListener('click', () => {
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
                this.handleProjectSubmission(form);
                closeModal();
            });
        }
    }

    handleProjectSubmission(form) {
        const formData = new FormData(form);
        const projectData = {
            name: formData.get('project-name'),
            description: formData.get('project-description'),
            location: formData.get('project-location'),
            contact: formData.get('project-contact')
        };

        // Show success message
        this.showNotification('Thank you for submitting your project! We will review it and get back to you soon.', 'success');
        form.reset();
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
        const cards = document.querySelectorAll('.benefit-card, .type-card, .model-card, .project-detail-card');
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
    window.greenPage = new GreenEntrepreneurshipPage();
});