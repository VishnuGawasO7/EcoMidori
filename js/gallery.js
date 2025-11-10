// gallery.js - Page-specific JavaScript for Gallery

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all gallery functionality
    initFeaturedSlider();
    initGalleryFilter();
    initMasonryGrid();
    initLightbox();
    initContributionModal();
    initStatistics();
    
    // Add scroll animations
    initScrollAnimations();
});

// Sample gallery data
const galleryData = [
    {
        id: 1,
        title: "Community Composting Workshop",
        description: "Students and community members learning about organic waste management and composting techniques at Shri Bhumika School.",
        category: "projects",
        date: "2024-03-15",
        location: "Parye, Sattari",
        image: "compost-workshop.jpg",
        featured: true
    },
    {
        id: 2,
        title: "Goa Coastal Cleanup",
        description: "Volunteers collecting plastic waste from Morjim Beach during our monthly coastal cleanup drive.",
        category: "awareness",
        date: "2024-03-08",
        location: "Morjim Beach, Goa",
        image: "coastal-cleanup.jpg",
        featured: true
    },
    {
        id: 3,
        title: "Organic School Garden",
        description: "Students tending to the organic vegetable garden, learning about sustainable agriculture practices.",
        category: "projects",
        date: "2024-02-20",
        location: "Shri Bhumika School",
        image: "school-garden.jpg",
        featured: false
    },
    {
        id: 4,
        title: "Western Ghats Biodiversity",
        description: "Rich biodiversity of the Western Ghats near Parye, showcasing the natural heritage we're working to protect.",
        category: "nature",
        date: "2024-02-10",
        location: "Western Ghats, Goa",
        image: "western-ghats.jpg",
        featured: false
    },
    {
        id: 5,
        title: "Environmental Awareness Camp",
        description: "Interactive session with local children about environmental conservation and sustainable living.",
        category: "events",
        date: "2024-01-25",
        location: "Parye Community Center",
        image: "awareness-camp.jpg",
        featured: false
    },
    {
        id: 6,
        title: "Sustainable Packaging Workshop",
        description: "Entrepreneurs learning to create eco-friendly packaging from banana leaves and recycled materials.",
        category: "projects",
        date: "2024-01-18",
        location: "Panaji, Goa",
        image: "packaging-workshop.jpg",
        featured: false
    },
    {
        id: 7,
        title: "Monsoon Forest",
        description: "Lush green forests of Goa during monsoon season, highlighting the importance of forest conservation.",
        category: "nature",
        date: "2023-12-05",
        location: "Bhagwan Mahavir Sanctuary",
        image: "monsoon-forest.jpg",
        featured: false
    },
    {
        id: 8,
        title: "Waste Segregation Training",
        description: "Community training session on proper waste segregation and recycling practices.",
        category: "awareness",
        date: "2023-11-30",
        location: "Parye Village",
        image: "waste-training.jpg",
        featured: false
    },
    {
        id: 9,
        title: "Green Entrepreneurship Meet",
        description: "Networking event for green entrepreneurs to share ideas and collaborate on sustainable projects.",
        category: "events",
        date: "2023-11-15",
        location: "Mapusa, Goa",
        image: "entrepreneur-meet.jpg",
        featured: false
    },
    {
        id: 10,
        title: "River Conservation Activity",
        description: "Students learning about river ecosystems and participating in river bank cleaning activities.",
        category: "awareness",
        date: "2023-10-28",
        location: "Mhadei River, Goa",
        image: "river-conservation.jpg",
        featured: false
    },
    {
        id: 11,
        title: "Traditional Farming Methods",
        description: "Documenting traditional sustainable farming practices still used in rural Goa.",
        category: "nature",
        date: "2023-10-15",
        location: "Sattari, Goa",
        image: "traditional-farming.jpg",
        featured: false
    },
    {
        id: 12,
        title: "Eco-Friendly Products Exhibition",
        description: "Showcasing products made from upcycled materials and sustainable resources by local artisans.",
        category: "events",
        date: "2023-09-22",
        location: "Vasco da Gama, Goa",
        image: "eco-products.jpg",
        featured: false
    }
];

// Featured Slider Functionality
function initFeaturedSlider() {
    const slides = document.querySelectorAll('.featured-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoSlideInterval;

    // Start autoplay
    startAutoSlide();

    // Navigation event listeners
    prevBtn.addEventListener('click', showPreviousSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Filter links in slides
    document.querySelectorAll('[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
            document.getElementById('gallery-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function showSlide(index) {
        // Update current slide
        currentSlide = (index + slides.length) % slides.length;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Reset autoplay
        resetAutoSlide();
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showNextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }

    // Pause autoplay on hover
    const sliderWrapper = document.querySelector('.featured-slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });

    window.setActiveFilter = function(filter) {
        activeFilter = filter;
        
        // Update active button
        filterButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-filter') === filter);
        });
        
        // Filter gallery items
        filterGalleryItems();
    };
}

function filterGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (activeFilter === 'all' || category === activeFilter) {
            item.style.display = 'block';
            // Add animation
            item.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Masonry Grid Functionality
function initMasonryGrid() {
    const grid = document.getElementById('masonry-grid');
    const loadMoreBtn = document.getElementById('load-more');
    let visibleItems = 8; // Initial number of items to show
    let allItems = [];

    // Generate initial gallery items
    generateGalleryItems();

    // Load more functionality
    loadMoreBtn.addEventListener('click', loadMoreItems);

    function generateGalleryItems() {
        grid.innerHTML = '';
        allItems = [];
        
        galleryData.forEach((item, index) => {
            const galleryItem = createGalleryItem(item, index);
            allItems.push(galleryItem);
            
            if (index < visibleItems) {
                grid.appendChild(galleryItem);
            }
        });
        
        updateLoadMoreButton();
    }

    function createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = `gallery-item reveal`;
        div.setAttribute('data-category', item.category);
        div.setAttribute('data-index', index);
        
        // Add delay for staggered animation
        div.style.animationDelay = `${(index % 8) * 0.1}s`;
        
        div.innerHTML = `
            <div class="gallery-item-image">
                <div class="image-placeholder ${item.category}">
                    <i class="fas fa-${getCategoryIcon(item.category)}"></i>
                    <span>${item.title}</span>
                </div>
            </div>
            <div class="gallery-item-content">
                <h4 class="gallery-item-title">${item.title}</h4>
                <p class="gallery-item-description">${item.description}</p>
                <div class="gallery-item-meta">
                    <span class="gallery-item-category">${getCategoryName(item.category)}</span>
                    <span class="gallery-item-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(item.date)}
                    </span>
                </div>
            </div>
        `;
        
        // Add click event for lightbox
        div.addEventListener('click', () => openLightbox(index));
        
        return div;
    }

    function loadMoreItems() {
        const currentCount = document.querySelectorAll('.gallery-item[style*="display: block"]').length;
        const nextItems = allItems.slice(currentCount, currentCount + 4);
        
        nextItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(item);
        });
        
        updateLoadMoreButton();
        
        // Scroll to newly loaded items
        if (nextItems.length > 0) {
            nextItems[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    function updateLoadMoreButton() {
        const visibleCount = document.querySelectorAll('.gallery-item[style*="display: block"]').length;
        if (visibleCount >= allItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    // Helper functions
    function getCategoryIcon(category) {
        const icons = {
            'nature': 'tree',
            'projects': 'project-diagram',
            'events': 'calendar-alt',
            'awareness': 'bullhorn'
        };
        return icons[category] || 'image';
    }

    function getCategoryName(category) {
        const names = {
            'nature': 'Nature',
            'projects': 'Projects',
            'events': 'Events',
            'awareness': 'Awareness'
        };
        return names[category] || 'Other';
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxDate = document.getElementById('lightbox-date');
    const lightboxLocation = document.getElementById('lightbox-location');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const downloadBtn = document.getElementById('lightbox-download');
    const loader = document.querySelector('.lightbox-loader');

    let currentImageIndex = 0;

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    downloadBtn.addEventListener('click', downloadImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Close lightbox when clicking on backdrop
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    window.openLightbox = function(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = galleryData[currentImageIndex];
        
        // Show loader
        loader.classList.add('active');
        lightboxImage.style.opacity = '0';
        
        // Simulate image loading
        setTimeout(() => {
            // In a real implementation, you would load the actual image here
            lightboxImage.src = `../images/gallery/${item.image}`;
            lightboxImage.alt = item.title;
            
            lightboxImage.onload = function() {
                loader.classList.remove('active');
                lightboxImage.style.opacity = '1';
            };
            
            lightboxImage.onerror = function() {
                loader.classList.remove('active');
                // Use placeholder if image fails to load
                lightboxImage.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f9f0"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="18" fill="%234caf50">Image not available</text></svg>';
                lightboxImage.style.opacity = '1';
            };
        }, 500);
        
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        lightboxCategory.textContent = getCategoryName(item.category);
        lightboxDate.textContent = formatDate(item.date);
        lightboxLocation.textContent = item.location;
    }

    function downloadImage() {
        const item = galleryData[currentImageIndex];
        const link = document.createElement('a');
        link.href = `../images/gallery/${item.image}`;
        link.download = `EcoMidori-${item.title.replace(/\s+/g, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Contribution Modal Functionality
function initContributionModal() {
    const modal = document.getElementById('contribution-modal');
    const openBtn = document.getElementById('contribute-photos');
    const closeBtn = document.getElementById('contribution-close');
    const cancelBtn = document.getElementById('contribution-cancel');
    const form = document.getElementById('contribution-form');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('photo-upload');
    const uploadPreview = document.getElementById('upload-preview');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--green-500)';
        uploadArea.style.background = 'var(--green-50)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-light)';
        uploadArea.style.background = '';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-light)';
        uploadArea.style.background = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // In a real application, you would send this data to a server
        console.log('Contribution submitted:', {
            name: formData.get('contributor-name'),
            email: formData.get('contributor-email'),
            category: formData.get('photo-category'),
            title: formData.get('photo-title'),
            description: formData.get('photo-description'),
            location: formData.get('photo-location'),
            file: formData.get('photo-upload')
        });
        
        // Show success message
        alert('Thank you for your contribution! We will review your photo and add it to our gallery soon.');
        
        // Reset form and close modal
        form.reset();
        uploadPreview.classList.remove('active');
        uploadPreview.innerHTML = '';
        closeModal();
    });

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function handleFileSelect(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPG, PNG, WebP)');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            uploadPreview.classList.add('active');
        };
        reader.readAsDataURL(file);
    }
}

// Statistics Animation
function initStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.gallery-item, .stat-card, .action-card');
    
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