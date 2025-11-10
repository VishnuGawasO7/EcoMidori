// sustainable.js - Page-specific JavaScript for Sustainable Development

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all SDG functionality
    initSDGSlider();
    initSDGGrid();
    initSDGQuiz();
    initViewToggle();
    initScrollAnimations();
});

// Complete SDG Data for all 17 goals
const sdgData = [
    {
        id: 1,
        title: "No Poverty",
        description: "End poverty in all its forms everywhere.",
        color: "#e5243b",
        icon: "fa-home",
        targets: [
            "Eradicate extreme poverty (less than $1.25 a day)",
            "Reduce poverty by at least half",
            "Implement social protection systems"
        ],
        fact: "As of 2015, 736 million people still lived on less than US$1.90 a day."
    },
    {
        id: 2,
        title: "Zero Hunger",
        description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
        color: "#DDA63A",
        icon: "fa-utensils",
        targets: [
            "End hunger and ensure access to food",
            "End all forms of malnutrition",
            "Double agricultural productivity"
        ],
        fact: "The number of undernourished people reached 821 million in 2017."
    },
    {
        id: 3,
        title: "Good Health and Well-being",
        description: "Ensure healthy lives and promote well-being for all at all ages.",
        color: "#4C9F38",
        icon: "fa-heartbeat",
        targets: [
            "Reduce maternal mortality",
            "End preventable deaths of newborns and children",
            "End epidemics of AIDS, tuberculosis, malaria"
        ],
        fact: "Every 2 seconds someone aged 30 to 70 years dies prematurely from noncommunicable diseases."
    },
    {
        id: 4,
        title: "Quality Education",
        description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
        color: "#C5192D",
        icon: "fa-graduation-cap",
        targets: [
            "Ensure free, equitable quality education",
            "Increase number of youth with relevant skills",
            "Build and upgrade inclusive schools"
        ],
        fact: "Over 265 million children are currently out of school."
    },
    {
        id: 5,
        title: "Gender Equality",
        description: "Achieve gender equality and empower all women and girls.",
        color: "#FF3A21",
        icon: "fa-venus",
        targets: [
            "End discrimination against women and girls",
            "Eliminate violence and harmful practices",
            "Ensure women's full participation in leadership"
        ],
        fact: "Women earn only 77 cents for every dollar that men get for the same work."
    },
    {
        id: 6,
        title: "Clean Water and Sanitation",
        description: "Ensure availability and sustainable management of water and sanitation for all.",
        color: "#26BDE2",
        icon: "fa-tint",
        targets: [
            "Achieve universal access to safe drinking water",
            "Achieve access to adequate sanitation",
            "Improve water quality and wastewater treatment"
        ],
        fact: "2.2 billion people lack safely managed drinking water services."
    },
    {
        id: 7,
        title: "Affordable and Clean Energy",
        description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
        color: "#FCC30B",
        icon: "fa-bolt",
        targets: [
            "Ensure universal access to modern energy",
            "Increase share of renewable energy",
            "Double global rate of energy efficiency improvement"
        ],
        fact: "13% of the global population still lacks access to modern electricity."
    },
    {
        id: 8,
        title: "Decent Work and Economic Growth",
        description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
        color: "#A21942",
        icon: "fa-briefcase",
        targets: [
            "Sustain per capita economic growth",
            "Achieve higher levels of economic productivity",
            "Promote development-oriented policies"
        ],
        fact: "61% of all workers worldwide were in informal employment in 2016."
    },
    {
        id: 9,
        title: "Industry, Innovation and Infrastructure",
        description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
        color: "#FD6925",
        icon: "fa-industry",
        targets: [
            "Develop quality, reliable infrastructure",
            "Promote inclusive and sustainable industrialization",
            "Enhance scientific research and innovation"
        ],
        fact: "16% of the world's population does not have access to mobile broadband networks."
    },
    {
        id: 10,
        title: "Reduced Inequality",
        description: "Reduce inequality within and among countries.",
        color: "#DD1367",
        icon: "fa-balance-scale",
        targets: [
            "Achieve income growth of bottom 40% of population",
            "Promote social, economic and political inclusion",
            "Ensure equal opportunity and reduce inequalities"
        ],
        fact: "The poorest 40% of the population earn less than 25% of global income."
    },
    {
        id: 11,
        title: "Sustainable Cities and Communities",
        description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
        color: "#FD9D24",
        icon: "fa-building",
        targets: [
            "Ensure access to adequate, safe housing",
            "Provide access to safe transport systems",
            "Enhance inclusive and sustainable urbanization"
        ],
        fact: "Half of humanity—3.5 billion people—lives in cities today."
    },
    {
        id: 12,
        title: "Responsible Consumption and Production",
        description: "Ensure sustainable consumption and production patterns.",
        color: "#BF8B2E",
        icon: "fa-recycle",
        targets: [
            "Implement sustainable consumption and production",
            "Achieve sustainable management of natural resources",
            "Reduce waste generation through prevention and reduction"
        ],
        fact: "If people worldwide switched to energy efficient lightbulbs, the world would save US$120 billion annually."
    },
    {
        id: 13,
        title: "Climate Action",
        description: "Take urgent action to combat climate change and its impacts.",
        color: "#3F7E44",
        icon: "fa-globe",
        targets: [
            "Strengthen resilience to climate-related hazards",
            "Integrate climate change measures into policies",
            "Improve education and awareness on climate change"
        ],
        fact: "From 1880 to 2012, average global temperature increased by 0.85°C."
    },
    {
        id: 14,
        title: "Life Below Water",
        description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
        color: "#0A97D9",
        icon: "fa-water",
        targets: [
            "Prevent and reduce marine pollution",
            "Manage and protect marine and coastal ecosystems",
            "Regulate harvesting and end overfishing"
        ],
        fact: "Ocean acidity has increased by 26% since the beginning of the industrial revolution."
    },
    {
        id: 15,
        title: "Life on Land",
        description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
        color: "#56C02B",
        icon: "fa-tree",
        targets: [
            "Ensure conservation of terrestrial ecosystems",
            "Promote sustainable forest management",
            "Combat desertification and restore degraded land"
        ],
        fact: "Around 1.6 billion people depend on forests for their livelihoods."
    },
    {
        id: 16,
        title: "Peace, Justice and Strong Institutions",
        description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
        color: "#00689D",
        icon: "fa-gavel",
        targets: [
            "Reduce violence and related death rates",
            "Promote the rule of law and ensure equal access to justice",
            "Develop effective, accountable and transparent institutions"
        ],
        fact: "Corruption, bribery, theft and tax evasion cost developing countries US$1.26 trillion per year."
    },
    {
        id: 17,
        title: "Partnerships for the Goals",
        description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
        color: "#19486A",
        icon: "fa-handshake",
        targets: [
            "Strengthen domestic resource mobilization",
            "Enhance international support for capacity-building",
            "Promote universal, rules-based trading system"
        ],
        fact: "Official development assistance stood at $147 billion in 2017."
    }
];

// SDG Slider Functionality
function initSDGSlider() {
    let currentSlide = 0;
    let autoPlayInterval;
    const slidesContainer = document.getElementById('sdg-slider-wrapper');
    const dotsContainer = document.getElementById('slider-dots');
    const totalSlides = sdgData.length;
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentSlideElement = document.getElementById('current-slide');
    const currentTitleElement = document.getElementById('current-title');
    const autoplayToggle = document.getElementById('autoplay-toggle');
    const autoplayIcon = autoplayToggle.querySelector('i');
    const autoplayText = autoplayToggle.querySelector('span');
    let isAutoPlaying = true;

    // Generate slides and dots
    generateSlides();
    generateDots();
    
    const slides = document.querySelectorAll('.sdg-slide');
    const dots = document.querySelectorAll('.slider-dot');

    // Start autoplay
    startAutoPlay();

    // Navigation event listeners
    prevBtn.addEventListener('click', showPreviousSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Autoplay toggle
    autoplayToggle.addEventListener('click', toggleAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPreviousSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoPlay();
        }
    });

    function generateSlides() {
        slidesContainer.innerHTML = '';
        
        sdgData.forEach((sdg, index) => {
            const slide = document.createElement('div');
            slide.className = `sdg-slide ${index === 0 ? 'active' : ''}`;
            slide.setAttribute('data-sdg', sdg.id);
            
            const lighterColor = lightenColor(sdg.color, 20);
            
            slide.innerHTML = `
                <div class="sdg-card">
                    <div class="sdg-header">
                        <div class="sdg-icon">
                            <span class="sdg-number">${sdg.id}</span>
                            <div class="sdg-color" style="background-color: ${sdg.color};"></div>
                        </div>
                        <h3 class="sdg-title">${sdg.title}</h3>
                    </div>
                    <div class="sdg-image">
                        <div class="image-placeholder" style="background: linear-gradient(135deg, ${sdg.color}, ${lighterColor});">
                            <i class="fas ${sdg.icon}"></i>
                        </div>
                    </div>
                    <div class="sdg-content">
                        <p class="sdg-description">${sdg.description}</p>
                        <div class="sdg-targets">
                            <h4>Key Targets:</h4>
                            <ul>
                                ${sdg.targets.map(target => `<li>${target}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="sdg-facts">
                            <p><strong>Did you know?</strong> ${sdg.fact}</p>
                        </div>
                    </div>
                </div>
            `;
            
            slidesContainer.appendChild(slide);
        });
    }

    function generateDots() {
        dotsContainer.innerHTML = '';
        
        sdgData.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('data-slide', index);
            dotsContainer.appendChild(dot);
        });
    }

function showSlide(index, direction = 'next') {
    const prevSlide = currentSlide;
    currentSlide = (index + totalSlides) % totalSlides;
    
    // Add swipe animation classes
    slides.forEach((slide, i) => {
        if (i === prevSlide) {
            slide.classList.remove('active');
            slide.classList.add(direction === 'next' ? 'swipe-left' : 'swipe-right');
        } else if (i === currentSlide) {
            slide.classList.remove('swipe-left', 'swipe-right');
            slide.classList.add('active');
        } else {
            slide.classList.remove('active', 'swipe-left', 'swipe-right');
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Update counter and title
    currentSlideElement.textContent = currentSlide + 1;
    currentTitleElement.textContent = sdgData[currentSlide].title;
    
    // Update button states
    updateButtonStates();
    
    // Reset autoplay
    resetAutoPlay();
}

function showNextSlide() {
    showSlide(currentSlide + 1, 'next');
}

function showPreviousSlide() {
    showSlide(currentSlide - 1, 'prev');
}


    function updateButtonStates() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (isAutoPlaying) {
                showNextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
    }

    function toggleAutoPlay() {
        isAutoPlaying = !isAutoPlaying;
        
        if (isAutoPlaying) {
            autoplayIcon.className = 'fas fa-pause';
            autoplayText.textContent = 'Pause Autoplay';
            resetAutoPlay();
        } else {
            autoplayIcon.className = 'fas fa-play';
            autoplayText.textContent = 'Play Autoplay';
            clearInterval(autoPlayInterval);
        }
        
        // Update aria-label for accessibility
        autoplayToggle.setAttribute('aria-label', isAutoPlaying ? 'Pause autoplay' : 'Play autoplay');
    }

    // Make showSlide available globally for grid navigation
    window.showSDGSlide = function(index) {
        showSlide(index);
        // Switch to slider view if in grid view
        const gridSection = document.getElementById('sdg-grid-section');
        const sliderSection = document.getElementById('sdg-slider');
        if (gridSection.style.display !== 'none') {
            gridSection.style.display = 'none';
            sliderSection.style.display = 'block';
            sliderSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// SDG Grid Functionality
function initSDGGrid() {
    const sdgGrid = document.getElementById('sdg-grid');
    
    if (!sdgGrid) return;
    
    // Clear existing content
    sdgGrid.innerHTML = '';
    
    // Create grid items for all SDGs
    sdgData.forEach(sdg => {
        const gridItem = document.createElement('div');
        gridItem.className = 'sdg-grid-item';
        gridItem.setAttribute('data-sdg', sdg.id);
        
        gridItem.innerHTML = `
            <div class="sdg-grid-header">
                <div class="sdg-grid-icon">
                    <span class="sdg-grid-number">${sdg.id}</span>
                    <div class="sdg-grid-color" style="background-color: ${sdg.color};"></div>
                </div>
                <h3 class="sdg-grid-title">${sdg.title}</h3>
            </div>
            <p class="sdg-grid-description">${sdg.description}</p>
        `;
        
        // Add click event to navigate to corresponding slide
        gridItem.addEventListener('click', () => {
            const slideIndex = sdg.id - 1;
            if (window.showSDGSlide) {
                window.showSDGSlide(slideIndex);
            }
        });
        
        sdgGrid.appendChild(gridItem);
    });
}

// View Toggle Functionality (Slider vs Grid)
function initViewToggle() {
    const viewAllBtn = document.getElementById('view-all-sdgs');
    const backToSliderBtn = document.getElementById('back-to-slider');
    const gridSection = document.getElementById('sdg-grid-section');
    const sliderSection = document.getElementById('sdg-slider');
    
    if (viewAllBtn && backToSliderBtn) {
        viewAllBtn.addEventListener('click', function() {
            sliderSection.style.display = 'none';
            gridSection.style.display = 'block';
            gridSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        backToSliderBtn.addEventListener('click', function() {
            gridSection.style.display = 'none';
            sliderSection.style.display = 'block';
            sliderSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// SDG Quiz Functionality
function initSDGQuiz() {
    const startQuizBtn = document.getElementById('start-sdg-quiz');
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            // For now, redirect to the Green Entrepreneurship page where the quiz is implemented
            // In a full implementation, we would create an SDG-specific quiz here
            window.location.href = 'green-entrepreneurship.html#quiz-section';
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.sdg-grid-item, .stat-card, .progress-item, .action-card');
    
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

// Helper function to lighten colors
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Touch support for mobile devices
function initTouchSupport() {
    const slider = document.querySelector('.sdg-slider');
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = startX;
            isSwiping = true;
            
            // Add transition none temporarily for smooth dragging
            slides.forEach(slide => {
                slide.style.transition = 'none';
            });
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            
            // Prevent vertical scrolling when swiping horizontally
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        });

        slider.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            const diff = currentX - startX;
            const swipeThreshold = 50;
            
            // Restore transitions
            slides.forEach(slide => {
                slide.style.transition = '';
            });
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe right - previous slide
                    showPreviousSlide();
                } else {
                    // Swipe left - next slide
                    showNextSlide();
                }
            }
            
            isSwiping = false;
        });
    }
}

// Initialize touch support
initTouchSupport();