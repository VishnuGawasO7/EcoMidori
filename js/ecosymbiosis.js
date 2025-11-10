// EcoSymbiosis Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page-specific functionality
    initEcoSymbiosisPage();
});

function initEcoSymbiosisPage() {
    // Initialize flow diagram interactions
    initFlowDiagram();
    
    // Initialize timeline animations
    initTimeline();
    
    // Initialize map interactions
    initMap();
    
    // Initialize quiz functionality
    initQuiz();
    
    // Add scroll animations for specific elements
    initScrollAnimations();
}

function initFlowDiagram() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = this.getAttribute('data-step');
            highlightConnectedSteps(stepNumber);
        });
        
        step.addEventListener('mouseleave', function() {
            resetStepHighlights();
        });
    });
    
    function highlightConnectedSteps(stepNumber) {
        // Highlight corresponding steps in both columns
        const correspondingSteps = document.querySelectorAll(`[data-step="${stepNumber}"]`);
        
        correspondingSteps.forEach(step => {
            step.style.transform = 'scale(1.05)';
            step.style.zIndex = '10';
            step.querySelector('.step-content').style.background = 'var(--green-50)';
            step.querySelector('.step-content').style.borderColor = 'var(--green-300)';
        });
        
        // Highlight connection lines
        const lines = document.querySelectorAll('.connection-lines .line');
        lines.forEach(line => {
            if (line.classList.contains(`line-${stepNumber}`)) {
                line.style.background = 'var(--green-400)';
                line.style.height = '3px';
            }
        });
    }
    
    function resetStepHighlights() {
        const allSteps = document.querySelectorAll('.flow-step');
        
        allSteps.forEach(step => {
            step.style.transform = 'scale(1)';
            step.style.zIndex = '1';
            step.querySelector('.step-content').style.background = '';
            step.querySelector('.step-content').style.borderColor = '';
        });
        
        const lines = document.querySelectorAll('.connection-lines .line');
        lines.forEach(line => {
            line.style.background = '';
            line.style.height = '';
        });
    }
}

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add click handlers for timeline items to show more details
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        
        content.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.transform = 'scale(1.02)';
                this.style.zIndex = '5';
            } else {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            }
        });
    });
}

function initMap() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            showProjectDetails(project);
        });
    });
    
    function showProjectDetails(project) {
        // In a real implementation, this would show a modal with project details
        // For now, we'll just show an alert
        const projectTitles = {
            'Parye Compost': 'Parye Community Compost Initiative',
            'Coastal Cleanup': 'Marine Plastic Upcycling Project',
            'AgriTech Hub': 'Sustainable Agriculture Innovation Hub'
        };
        
        alert(`Project: ${projectTitles[project]}\n\nThis would open a detailed project view with images, timeline, impact metrics, and implementation details.`);
    }
}



// Quiz Functionality
function initQuiz() {
    const startBtn = document.getElementById('start-quiz');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const reviewBtn = document.getElementById('review-answers');
    const retakeBtn = document.getElementById('retake-quiz');
    
    let currentQuestion = 0;
    let userAnswers = [];
    let quizData = [];
    
    // Load quiz data
    fetch('../data/quiz.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            // Filter for EcoSymbiosis relevant questions or use all
            // For now, we'll use questions 3, 4, 5, 6, 9 specifically about EcoSymbiosis
            const relevantIds = [3, 4, 5, 6, 9];
            quizData = data.filter(q => relevantIds.includes(q.id));
            userAnswers = new Array(quizData.length).fill(null);
        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
            // Fallback to embedded questions
            quizData = getFallbackQuizData();
            userAnswers = new Array(quizData.length).fill(null);
        });
    
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
    retakeBtn.addEventListener('click', retakeQuiz);
    
    function startQuiz() {
        document.querySelector('.quiz-intro').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        showQuestion(0);
    }
    
    function showQuestion(index) {
        currentQuestion = index;
        const question = quizData[index];
        
        // Update progress
        const progress = ((index + 1) / quizData.length) * 100;
        document.getElementById('quiz-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `Question ${index + 1} of ${quizData.length}`;
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Update options
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            if (userAnswers[index] === optionIndex) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <div class="option-marker">${String.fromCharCode(65 + optionIndex)}</div>
                <div class="option-text">${option}</div>
            `;
            
            optionElement.addEventListener('click', () => selectOption(optionIndex));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.style.display = index < quizData.length - 1 ? 'block' : 'none';
        submitBtn.style.display = index === quizData.length - 1 ? 'block' : 'none';
    }
    
    function selectOption(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;
        
        // Update UI
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            if (index === optionIndex) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }
    
    function showPreviousQuestion() {
        if (currentQuestion > 0) {
            showQuestion(currentQuestion - 1);
        }
    }
    
    function showNextQuestion() {
        if (currentQuestion < quizData.length - 1) {
            showQuestion(currentQuestion + 1);
        }
    }
    
    function submitQuiz() {
        // Calculate score
        let score = 0;
        quizData.forEach((question, index) => {
            if (userAnswers[index] === question.answerIndex) {
                score++;
            }
        });
        
        // Display results
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        const percent = (score / quizData.length) * 100;
        document.getElementById('score-percent').textContent = `${percent}%`;
        document.getElementById('score-text').textContent = `${score} / ${quizData.length}`;
        
        // Animate score circle
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.background = `conic-gradient(var(--green-500) ${percent}%, var(--neutral-200) ${percent}%)`;
    }
    
    function reviewAnswers() {
        // Implementation for review mode
        alert('Review mode would show each question with your answer and the correct answer with explanation.');
        // This would be a more complex implementation showing each question
    }
    
    function retakeQuiz() {
        userAnswers = new Array(quizData.length).fill(null);
        document.getElementById('quiz-results').style.display = 'none';
        document.querySelector('.quiz-intro').style.display = 'block';
    }
    
    function getFallbackQuizData() {
        return [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
                question: "What is Extended Producer Responsibility (EPR)?",
                options: [
                    "A consumer tax",
                    "A policy that holds producers responsible for end-of-life disposal of products",
                    "A marketing strategy",
                    "A manufacturing process"
                ],
                answerIndex: 1,
                explanation: "EPR requires producers to manage and finance the collection, recycling, or disposal of products they put on the market."
            },
            {
                id: 4,
                question: "Which of these activities is an example of circular practice?",
                options: [
                    "Designing a product with unrecyclable mixed materials",
                    "Setting up a take-back and remanufacturing program",
                    "Increasing single-use plastic packaging",
                    "Making products that cannot be repaired"
                ],
                answerIndex: 1,
                explanation: "Take-back and remanufacturing keeps materials circulating, reducing resource extraction and waste."
            },
            {
                id: 5,
                question: "Which is a key challenge for green entrepreneurs in India?",
                options: [
                    "Lack of challenges",
                    "Access to early-stage funding and supportive infrastructure",
                    "Too much government funding",
                    "No market demand for sustainable products"
                ],
                answerIndex: 1,
                explanation: "A common barrier is access to funding, infrastructure, and market channels specific to sustainable innovations."
            }
        ];
    }
}



// Add some custom styles for the quiz
const quizStyles = `
    .question-container h4 {
        margin-bottom: 1.5rem;
        color: var(--green-700);
    }
    
    .options-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .option-label {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: var(--bg-light);
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .option-label:hover {
        background: var(--green-50);
        border-color: var(--green-300);
    }
    
    .option-label input[type="radio"] {
        margin-right: 1rem;
    }
    
    .option-text {
        flex: 1;
    }
    
    .result-item {
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        border-left: 4px solid;
    }
    
    .result-item.correct {
        background: var(--green-50);
        border-left-color: var(--green-500);
    }
    
    .result-item.incorrect {
        background: var(--red-50);
        border-left-color: var(--red-500);
    }
    
    .result-item h5 {
        margin: 0 0 1rem 0;
        color: var(--green-700);
    }
    
    .user-answer, .correct-answer, .explanation {
        margin-bottom: 0.5rem;
    }
    
    .score-display {
        text-align: center;
        margin: 2rem 0;
    }
    
    .score-circle {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, var(--green-400), var(--green-600));
        border-radius: 50%;
        color: white;
        box-shadow: var(--shadow-md);
    }
    
    .score-percentage {
        font-size: 2rem;
        font-weight: 700;
    }
    
    .score-text {
        font-size: 0.8rem;
        opacity: 0.9;
    }
    
    .results-actions {
        text-align: center;
        margin-top: 2rem;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = quizStyles;
document.head.appendChild(styleSheet);