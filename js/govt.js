// govt.js - Page-specific JavaScript for Government Policies

document.addEventListener('DOMContentLoaded', function() {
    // Initialize policy page functionality
    initPolicyFilters();
    initViewToggle();
    initPolicyCards();
    initSubscriptionModal();
    initScrollAnimations();
});

// Policy Data for Card View
const policyData = [
    {
        id: 1,
        category: 'waste',
        title: 'Extended Producer Responsibility',
        description: 'Management of plastic waste and e-waste',
        levels: {
            central: {
                title: 'Plastic Waste Management Rules, 2016',
                description: 'Extended Producer Responsibility for plastic packaging',
                status: 'Implemented'
            },
            state: {
                title: 'Goa Non-Biodegradable Garbage Act',
                description: 'Ban on certain plastic products',
                status: 'Implemented'
            },
            global: {
                title: 'EU Circular Economy Package',
                description: 'Comprehensive EPR framework',
                status: 'Global Standard'
            }
        },
        status: 'Active'
    },
    {
        id: 2,
        category: 'energy',
        title: 'Renewable Energy',
        description: 'Solar and clean energy adoption',
        levels: {
            central: {
                title: 'National Solar Mission',
                description: '100 GW solar capacity target by 2022',
                status: 'Implemented'
            },
            state: {
                title: 'Goa Solar Policy 2017',
                description: 'Promoting rooftop solar installations',
                status: 'Implemented'
            },
            global: {
                title: 'Germany\'s Energiewende',
                description: 'Renewable energy transition program',
                status: 'Global Standard'
            }
        },
        status: 'Active'
    },
    {
        id: 3,
        category: 'startup',
        title: 'Green Startup Funding',
        description: 'Financial support for eco-enterprises',
        levels: {
            central: {
                title: 'Startup India',
                description: 'Fund of funds for startups',
                status: 'Implemented'
            },
            state: {
                title: 'Goa Startup Policy',
                description: 'Seed funding and incubation support',
                status: 'Implemented'
            },
            global: {
                title: 'EU Green Deal',
                description: 'Funding for sustainable startups',
                status: 'Global Standard'
            }
        },
        status: 'Active'
    },
    {
        id: 4,
        category: 'research',
        title: 'R&D Incentives',
        description: 'Research and development support',
        levels: {
            central: {
                title: 'DSIR Recognition',
                description: 'Tax benefits for R&D units',
                status: 'Implemented'
            },
            state: {
                title: 'Goa Innovation Council',
                description: 'Support for research initiatives',
                status: 'In Progress'
            },
            global: {
                title: 'Horizon Europe',
                description: 'EU research and innovation funding',
                status: 'Global Standard'
            }
        },
        status: 'Planned'
    },
    {
        id: 5,
        category: 'waste',
        title: 'Circular Economy',
        description: 'Waste to wealth initiatives',
        levels: {
            central: {
                title: 'Draft National Resource Efficiency Policy',
                description: 'Promoting circular business models',
                status: 'Draft Stage'
            },
            state: {
                title: 'Goa Solid Waste Management Policy',
                description: 'Waste segregation and processing',
                status: 'Implemented'
            },
            global: {
                title: 'Netherlands Circular Economy 2050',
                description: 'Comprehensive circular economy roadmap',
                status: 'Global Standard'
            }
        },
        status: 'Draft'
    }
];

// Policy Filtering
function initPolicyFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const tableRows = document.querySelectorAll('.policy-comparison-table tbody tr');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            
            // Filter table rows
            tableRows.forEach(row => {
                if (category === 'all' || row.getAttribute('data-category') === category) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Also filter cards if in card view
            if (document.querySelector('.card-view').classList.contains('active')) {
                filterPolicyCards(category);
            }
        });
    });
}

// View Toggle (Table vs Cards)
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const views = document.querySelectorAll('.comparison-view');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            views.forEach(view => view.classList.remove('active'));
            document.querySelector(`.${viewType}-view`).classList.add('active');
            
            // Initialize cards if switching to card view
            if (viewType === 'cards') {
                renderPolicyCards();
            }
        });
    });
}

// Policy Cards Rendering
function initPolicyCards() {
    // Cards will be rendered when switching to card view
}

function renderPolicyCards() {
    const cardsContainer = document.querySelector('.policy-cards-grid');
    const activeCategory = document.querySelector('.filter-tab.active').getAttribute('data-category');
    
    let filteredData = policyData;
    if (activeCategory !== 'all') {
        filteredData = policyData.filter(policy => policy.category === activeCategory);
    }
    
    cardsContainer.innerHTML = filteredData.map(policy => `
        <div class="policy-card" data-category="${policy.category}">
            <div class="policy-card-header">
                <h3 class="policy-card-title">${policy.title}</h3>
                <p class="policy-card-desc">${policy.description}</p>
            </div>
            <div class="policy-card-body">
                <div class="policy-level">
                    <div class="policy-level-title">
                        <i class="fas fa-building"></i>
                        Central Government
                    </div>
                    <div class="policy-level-content">
                        <h5>${policy.levels.central.title}</h5>
                        <p>${policy.levels.central.description}</p>
                        <span class="policy-tag">${policy.levels.central.status}</span>
                    </div>
                </div>
                
                <div class="policy-level">
                    <div class="policy-level-title">
                        <i class="fas fa-map-marker-alt"></i>
                        State Government (Goa)
                    </div>
                    <div class="policy-level-content">
                        <h5>${policy.levels.state.title}</h5>
                        <p>${policy.levels.state.description}</p>
                        <span class="policy-tag">${policy.levels.state.status}</span>
                    </div>
                </div>
                
                <div class="policy-level">
                    <div class="policy-level-title">
                        <i class="fas fa-globe"></i>
                        Global Best Practices
                    </div>
                    <div class="policy-level-content">
                        <h5>${policy.levels.global.title}</h5>
                        <p>${policy.levels.global.description}</p>
                        <span class="policy-tag global">${policy.levels.global.status}</span>
                    </div>
                </div>
                
                <div class="policy-status">
                    <span class="status-indicator ${getStatusClass(policy.status)}">${policy.status}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterPolicyCards(category) {
    const cards = document.querySelectorAll('.policy-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function getStatusClass(status) {
    const statusMap = {
        'Active': 'active',
        'Planned': 'planned',
        'Draft': 'draft',
        'Expected': 'expected',
        'Proposed': 'proposed',
        'Vision': 'vision'
    };
    return statusMap[status] || 'active';
}

// Subscription Modal
function initSubscriptionModal() {
    const subscribeBtn = document.getElementById('subscribe-policy');
    const modal = document.getElementById('subscription-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('subscription-cancel');
    const form = document.getElementById('policy-subscription-form');

    // Open modal
    subscribeBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const subscriptionData = {
            name: formData.get('subscriber-name'),
            email: formData.get('subscriber-email'),
            interests: formData.getAll('interest')
        };
        
        // In a real application, you would send this data to a server
        console.log('Subscription data:', subscriptionData);
        
        // Show success message
        showNotification('Successfully subscribed to policy updates!', 'success');
        
        // Reset form and close modal
        form.reset();
        closeModal();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-light);
                border-radius: var(--radius-lg);
                padding: var(--space-md);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: var(--space-md);
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid var(--green-500);
            }
            
            .notification-error {
                border-left: 4px solid var(--red-500);
            }
            
            .notification-warning {
                border-left: 4px solid var(--yellow-500);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--text-muted);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.highlight-card, .challenge-card, .resource-category, .timeline-item');
    
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

// Export functions for global access if needed
window.filterPolicyCards = filterPolicyCards;
window.renderPolicyCards = renderPolicyCards;