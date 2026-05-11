// Memorial Website Interactive Features with Firebase Integration
console.log("script.js loaded");

// Global flags to prevent duplicate initialization
let isInitialized = false;
let isModalInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    
    // Prevent duplicate initialization
    if (isInitialized) {
        console.log("Already initialized, skipping...");
        return;
    }
    
    // Initialize modals immediately
    if (!isModalInitialized) {
        initUploadModals();
        isModalInitialized = true;
    }

    // i18n + rituals run as soon as DOM is ready
    if (window.I18n) I18n.init();
    if (window.Rituals) Rituals.init();

    // Mobile nav wiring (no Firebase needed)
    initMobileNav();
    initShantiMode();
    initWhatsAppShare();

    // Wait for Firebase to initialize
    setTimeout(() => {
        if (window.db) {
            console.log("Firebase DB detected");
            initVisitorTracking();
            initCandleLighting();
            initPhotoSlideshow();
            initMemoryWall();
            initLightbox();
            initScrollToTop();
            initAnimations();
            initLoveCounter();
            initNowRemembering();
            isInitialized = true;
        } else {
            console.error('Firebase not initialized');
            showNotification('Database connection error. Please refresh the page.', 'error');
        }
    }, 1000);
    
    // Add floating bokeh particles to animated background
    const bg = document.querySelector('.animated-bg');
    if (bg) {
        for (let i = 0; i < 12; i++) {
            const bokeh = document.createElement('div');
            bokeh.className = 'bokeh';
            const size = Math.random() * 60 + 40;
            bokeh.style.width = `${size}px`;
            bokeh.style.height = `${size}px`;
            bokeh.style.left = `${Math.random() * 100}%`;
            bokeh.style.top = `${Math.random() * 100}%`;
            bokeh.style.background = `radial-gradient(circle, #fffbe6 0%, #ffe066 60%, transparent 100%)`;
            bokeh.style.animationDuration = `${12 + Math.random() * 8}s`;
            bg.appendChild(bokeh);
        }
    }
});

// Visitor Tracking with Geolocation
function initVisitorTracking() {
    const totalVisitorsElement = document.getElementById('totalVisitors');
    const countriesCountElement = document.getElementById('countriesCount');
    const citiesCountElement = document.getElementById('citiesCount');

    let visitorData = {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Get visitor's IP and location
    async function getVisitorLocation() {
        try {
            // Use a free IP geolocation service
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            visitorData = {
                ...visitorData,
                ip: data.ip,
                country: data.country_name,
                countryCode: data.country_code,
                region: data.region,
                city: data.city,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone
            };

            // Store visitor data in Firebase
            await db.collection('visitors').add(visitorData);
            
            // Update visitor statistics
            updateVisitorStats();
            
        } catch (error) {
            console.error('Error getting visitor location:', error);
            // Store basic visitor data without location
            visitorData.ip = 'Unknown';
            await db.collection('visitors').add(visitorData);
            updateVisitorStats();
        }
    }

    // Update visitor statistics
    async function updateVisitorStats() {
        try {
            const visitorsSnapshot = await db.collection('visitors').get();
            const totalVisitors = visitorsSnapshot.size;
            
            // Count unique countries and cities
            const countries = new Set();
            const cities = new Set();
            
            visitorsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.country) countries.add(data.country);
                if (data.city) cities.add(data.city);
            });

            // Animate the numbers
            animateNumber(totalVisitorsElement, totalVisitors);
            animateNumber(countriesCountElement, countries.size);
            animateNumber(citiesCountElement, cities.size);
            
        } catch (error) {
            console.error('Error updating visitor stats:', error);
        }
    }

    // Animate number counting
    function animateNumber(element, finalValue) {
        const startValue = 0;
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, 16);
    }

    // Initialize visitor tracking
    getVisitorLocation();

    // Update stats every 30 seconds
    setInterval(updateVisitorStats, 30000);
}

// Candle Lighting Feature with Firebase
function initCandleLighting() {
    const candleContainer = document.getElementById('candleContainer');
    const totalCandlesElement = document.getElementById('totalCandles');
    
    let candles = [];
    let candleFormInitialized = false;
    
    // Listen for real-time updates
    db.collection('candles')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            candles = [];
            
            // Clear container
            candleContainer.innerHTML = '';
            
            // Add candles lit label back
            const candlesLitLabel = document.createElement('div');
            candlesLitLabel.className = 'candles-lit-label';
            candlesLitLabel.id = 'candlesLitLabel';
            candlesLitLabel.innerHTML = `<i class="fas fa-fire"></i> <span id="totalCandles">${snapshot.size}</span>`;
            candleContainer.appendChild(candlesLitLabel);
            
            snapshot.forEach((doc) => {
                const candle = { id: doc.id, ...doc.data() };
                candles.push(candle);
                addCandleToDisplay(candle);
            });
            
            updateCandleStats();
        }, (error) => {
            console.error('Error listening to candles:', error);
            showNotification('Error loading candles. Please refresh.', 'error');
        });
    
    function addCandleToDisplay(candle) {
        const candleElement = document.createElement('div');
        candleElement.className = 'candle';
        candleElement.innerHTML = `
            <div class="candle-flame"></div>
            <div class="candle-body"></div>
            <div class="candle-name">${candle.name}</div>
        `;
        
        // Add click event to show message
        if (candle.message) {
            candleElement.addEventListener('click', () => {
                showNotification(candle.message, 'info');
            });
            candleElement.style.cursor = 'pointer';
        }
        
        candleContainer.appendChild(candleElement);
    }
    
    function updateCandleStats() {
        if (totalCandlesElement) {
            totalCandlesElement.textContent = candles.length;
        }
    }
}

// Photo Slideshow Feature with Firebase
function initPhotoSlideshow() {
    const slideshowImage = document.getElementById('slideshowImage');
    const slideshowCaption = document.getElementById('slideshowCaption');
    const slideshowPrev = document.getElementById('slideshowPrev');
    const slideshowNext = document.getElementById('slideshowNext');
    const slideshowContainer = document.getElementById('slideshowContainer');

    // Touch gesture variables for photo slideshow
    let photoStartX = 0;
    let photoEndX = 0;
    let isPhotoDragging = false;

    let photos = [];
    let currentPhoto = 0;
    let photoInterval = null;

    function showPhoto(index) {
        if (photos.length === 0) {
            slideshowImage.src = 'images/2d6eaf51-e621-47d3-bd3d-56a6b2aedb59.jpg';
            slideshowCaption.innerHTML = 'A precious memory';
            return;
        }
        currentPhoto = (index + photos.length) % photos.length;
        const photo = photos[currentPhoto];
        slideshowImage.src = photo.src;
        updateSlideshowCaption(photo);
    }

    function nextPhoto() {
        showPhoto(currentPhoto + 1);
    }

    function prevPhoto() {
        showPhoto(currentPhoto - 1);
    }

    function startPhotoSlideshow() {
        if (photoInterval) clearInterval(photoInterval);
        photoInterval = setInterval(nextPhoto, 5000);
    }

    // Touch gesture handlers for photo slideshow
    slideshowContainer.addEventListener('touchstart', function(e) {
        photoStartX = e.touches[0].clientX;
        isPhotoDragging = true;
        if (photoInterval) clearInterval(photoInterval);
    });

    slideshowContainer.addEventListener('touchmove', function(e) {
        if (!isPhotoDragging) return;
        e.preventDefault();
        photoEndX = e.touches[0].clientX;
    });

    slideshowContainer.addEventListener('touchend', function(e) {
        if (!isPhotoDragging) return;
        isPhotoDragging = false;
        
        const diffX = photoStartX - photoEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swipe left - next photo
                nextPhoto();
            } else {
                // Swipe right - previous photo
                prevPhoto();
            }
        }
        
        startPhotoSlideshow();
    });

    slideshowPrev.addEventListener('click', () => {
        prevPhoto();
        startPhotoSlideshow();
    });

    slideshowNext.addEventListener('click', () => {
        nextPhoto();
        startPhotoSlideshow();
    });

    // Listen for real-time updates
    db.collection('photos')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            photos = [];
            snapshot.forEach((doc) => {
                const photo = { id: doc.id, ...doc.data() };
                photos.push(photo);
            });
            
            if (photos.length > 0) {
                showPhoto(0);
                startPhotoSlideshow();
            }
        }, (error) => {
            console.error('Error listening to photos:', error);
            showNotification('Error loading photos. Please refresh.', 'error');
        });

    // Initialize with default photo
    showPhoto(0);
}

// Memory Wall Feature with Firebase
function initMemoryWall() {
    const memoryForm = document.getElementById('memoryForm');
    const memorySlideshowContent = document.getElementById('memorySlideshowContent');
    const memorySlideshowPrev = document.getElementById('memorySlideshowPrev');
    const memorySlideshowNext = document.getElementById('memorySlideshowNext');
    const memorySlideshowContainer = document.getElementById('memorySlideshowContainer');
    const totalMemoriesElement = document.getElementById('totalMemories');

    // Touch gesture variables for memory slideshow
    let memoryStartX = 0;
    let memoryEndX = 0;
    let isMemoryDragging = false;

    let rawMemories = []; // always newest-first from Firestore
    let memories = [];
    let currentMemory = 0;
    let memoryInterval = null;
    let memorySortOrder = 'newest';

    function showMemory(index) {
        if (memories.length === 0) {
            memorySlideshowContent.innerHTML = '<div class="memory-text">No memories yet. Be the first to share one!</div>';
            return;
        }
        currentMemory = (index + memories.length) % memories.length;
        const memory = memories[currentMemory];
        const relationshipTag = memory.relationship
            ? `<span class="memory-relationship">${memory.relationship}</span>` : '';
        const timeStr = memory.timestamp ? formatTimeOfDay(memory.timestamp) : '';
        memorySlideshowContent.innerHTML = `
            <div class="memory-text">"${escapeHtml(memory.message)}"</div>
            <div class="memory-meta">
                ${memory.name ? `<span>— ${escapeHtml(memory.name)}</span>` : ''}
                ${relationshipTag}
                ${timeStr ? `<span class="memory-time">${timeStr}</span>` : ''}
            </div>
        `;
    }

    function nextMemory() {
        showMemory(currentMemory + 1);
    }
    function prevMemory() {
        showMemory(currentMemory - 1);
    }
    function startMemorySlideshow() {
        if (memoryInterval) clearInterval(memoryInterval);
        memoryInterval = setInterval(nextMemory, 5000);
    }

    // Touch gesture handlers for memory slideshow
    memorySlideshowContainer.addEventListener('touchstart', function(e) {
        memoryStartX = e.touches[0].clientX;
        isMemoryDragging = true;
        if (memoryInterval) clearInterval(memoryInterval);
    });

    memorySlideshowContainer.addEventListener('touchmove', function(e) {
        if (!isMemoryDragging) return;
        e.preventDefault();
        memoryEndX = e.touches[0].clientX;
    });

    memorySlideshowContainer.addEventListener('touchend', function(e) {
        if (!isMemoryDragging) return;
        isMemoryDragging = false;
        
        const diffX = memoryStartX - memoryEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swipe left - next memory
                nextMemory();
            } else {
                // Swipe right - previous memory
                prevMemory();
            }
        }
        
        startMemorySlideshow();
    });

    memorySlideshowPrev.addEventListener('click', () => {
        prevMemory();
        startMemorySlideshow();
    });
    memorySlideshowNext.addEventListener('click', () => {
        nextMemory();
        startMemorySlideshow();
    });

    function applySortOrder() {
        memories = memorySortOrder === 'oldest' ? [...rawMemories].reverse() : [...rawMemories];
    }

    // Listen for real-time updates
    db.collection('memories')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            rawMemories = [];
            snapshot.forEach((doc) => rawMemories.push({ id: doc.id, ...doc.data() }));
            applySortOrder();
            showMemory(0);
            updateMemoryStats(memories.length);
            startMemorySlideshow();
        }, (error) => {
            console.error('Error listening to memories:', error);
            memorySlideshowContent.innerHTML = '<div class="memory-text">Error loading memories. Please refresh.</div>';
        });

    // Sort bar
    document.querySelectorAll('.memory-sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.memory-sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            memorySortOrder = btn.dataset.sort;
            applySortOrder();
            currentMemory = 0;
            showMemory(0);
        });
    });

    function updateMemoryStats(count) {
        totalMemoriesElement.textContent = count;
    }
    function formatDate(timestamp) {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

function formatTimeOfDay(timestamp) {
    if (!timestamp || !timestamp.toDate) return '';
    const date = timestamp.toDate();
    const h = date.getHours();
    if (h >= 5 && h < 12) return '🌅 morning';
    if (h >= 12 && h < 17) return '☀️ afternoon';
    if (h >= 17 && h < 21) return '🌆 evening';
    return '🌙 night';
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Lightbox Feature
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    function openLightbox(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Make lightbox globally accessible
    window.openLightbox = openLightbox;
}

// Scroll to Top Feature
function initScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    `;

    document.body.appendChild(scrollToTop);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll-to-top button
    scrollToTop.addEventListener('mouseenter', () => {
        scrollToTop.style.transform = 'scale(1.1)';
        scrollToTop.style.background = '#2980b9';
    });

    scrollToTop.addEventListener('mouseleave', () => {
        scrollToTop.style.transform = 'scale(1)';
        scrollToTop.style.background = '#3498db';
    });
}

// Animation Features
function initAnimations() {
    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            sectionObserver.observe(section);
        });

        // Observe other animated elements
        animatedElements.forEach(element => {
            sectionObserver.observe(element);
        });
    }

    // Add staggered animations to cards and items
    function animateCards() {
        const cards = document.querySelectorAll('.memory-card, .gallery-item, .candle');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in');
            }, index * 100);
        });
    }

    // Add hover animations to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .slideshow-arrow, .candle, .gallery-item');
    interactiveElements.forEach(element => {
        element.classList.add('hover-lift');
    });

    // Add glow effect to buttons
    const buttons = document.querySelectorAll('.btn-light-candle, .btn-upload, .btn-add-memory');
    buttons.forEach(button => {
        button.classList.add('btn-animated', 'hover-glow');
    });

    // Animate stats numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue);
            }, 30);
        });
    }

    // Trigger animations when page loads
    setTimeout(() => {
        animateCards();
        animateStats();
    }, 500);

    // Re-trigger animations when new content is added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const newCards = mutation.target.querySelectorAll('.memory-card, .gallery-item, .candle');
                newCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-fade-in');
                    }, index * 100);
                });
            }
        });
    });

    // Observe the main content areas
    const contentAreas = document.querySelectorAll('.candle-container, .gallery-grid, .memory-slideshow-container');
    contentAreas.forEach(area => {
        observer.observe(area, { childList: true, subtree: true });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Modal logic for FABs (photo, memory, candle)
function initUploadModals() {
    // Photo upload modal
    const fabPhoto = document.getElementById('fabPhotoUpload');
    const photoModal = document.getElementById('photoUploadModal');
    const closePhoto = document.getElementById('closePhotoUploadModal');
    let photoUploadInitialized = false;
    
    if (fabPhoto && photoModal && closePhoto) {
        fabPhoto.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                photoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                if (!photoUploadInitialized) {
                    initializePhotoUpload();
                    photoUploadInitialized = true;
                }
            } catch (error) {
                console.error('Error opening photo modal:', error);
                showNotification('Error opening upload form. Please try again.', 'error');
            }
        });
        
        closePhoto.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                photoModal.style.display = 'none';
                document.body.style.overflow = '';
            } catch (error) {
                console.error('Error closing photo modal:', error);
            }
        });
        
        photoModal.addEventListener('click', (e) => {
            if (e.target === photoModal) {
                try {
                    photoModal.style.display = 'none';
                    document.body.style.overflow = '';
                } catch (error) {
                    console.error('Error closing photo modal:', error);
                }
            }
        });
    }
    
    // Memory upload modal
    const fabMemory = document.getElementById('fabMemoryUpload');
    const memoryModal = document.getElementById('memoryUploadModal');
    const closeMemory = document.getElementById('closeMemoryUploadModal');
    let memoryUploadInitialized = false;
    
    if (fabMemory && memoryModal && closeMemory) {
        fabMemory.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                memoryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                if (!memoryUploadInitialized) {
                    initializeMemoryUpload();
                    memoryUploadInitialized = true;
                }
            } catch (error) {
                console.error('Error opening memory modal:', error);
                showNotification('Error opening memory form. Please try again.', 'error');
            }
        });
        
        closeMemory.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                memoryModal.style.display = 'none';
                document.body.style.overflow = '';
            } catch (error) {
                console.error('Error closing memory modal:', error);
            }
        });
        
        memoryModal.addEventListener('click', (e) => {
            if (e.target === memoryModal) {
                try {
                    memoryModal.style.display = 'none';
                    document.body.style.overflow = '';
                } catch (error) {
                    console.error('Error closing memory modal:', error);
                }
            }
        });
    }
    
    // Candle lighting modal
    const fabCandle = document.getElementById('fabCandleLight');
    const candleModal = document.getElementById('candleLightModal');
    const closeCandle = document.getElementById('closeCandleLightModal');
    let candleUploadInitialized = false;
    
    if (fabCandle && candleModal && closeCandle) {
        fabCandle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                candleModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                if (!candleUploadInitialized) {
                    initializeCandleUpload();
                    candleUploadInitialized = true;
                }
            } catch (error) {
                console.error('Error opening candle modal:', error);
                showNotification('Error opening candle form. Please try again.', 'error');
            }
        });
        
        closeCandle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                candleModal.style.display = 'none';
                document.body.style.overflow = '';
            } catch (error) {
                console.error('Error closing candle modal:', error);
            }
        });
        
        candleModal.addEventListener('click', (e) => {
            if (e.target === candleModal) {
                try {
                    candleModal.style.display = 'none';
                    document.body.style.overflow = '';
                } catch (error) {
                    console.error('Error closing candle modal:', error);
                }
            }
        });
    }
}

// Initialize photo upload functionality
function initializePhotoUpload() {
    const photoForm = document.getElementById('photoUploadForm');
    const photoFile = document.getElementById('photoFile');
    const uploadPreview = document.getElementById('uploadPreview');
    const removePreview = document.getElementById('removePreview');
    
    console.log('Initializing photo upload...', { photoForm, photoFile, uploadPreview, removePreview });
    
    if (photoForm && photoFile) {
        photoFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            console.log('File selected:', file);
            if (file) {
                if (file.size > 10 * 1024 * 1024) { // Increased limit to 10MB for compression
                    showNotification('Photo must be smaller than 10MB for processing.', 'error');
                    photoFile.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log('File read successfully');
                    if (uploadPreview) {
                        const previewImage = uploadPreview.querySelector('img');
                        if (previewImage) {
                            previewImage.src = e.target.result;
                        }
                        uploadPreview.style.display = 'block';
                    }
                };
                reader.onerror = function(error) {
                    console.error('Error reading file:', error);
                    showNotification('Error reading photo file. Please try again.', 'error');
                };
                reader.readAsDataURL(file);
            }
        });
        
        if (removePreview) {
            removePreview.addEventListener('click', function() {
                if (uploadPreview && photoFile) {
                    uploadPreview.style.display = 'none';
                    photoFile.value = '';
                }
            });
        }
        
        photoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Photo form submitted');
            
            const file = photoFile.files[0];
            const caption = document.getElementById('photoCaption').value.trim();
            const author = document.getElementById('photoAuthor').value.trim();
            
            console.log('Form data:', { file, caption, author });
            
            if (!file) {
                showNotification('Please select a photo to upload.', 'error');
                return;
            }
            
            if (!window.db) {
                console.error('Firebase database not available');
                showNotification('Database connection error. Please refresh the page.', 'error');
                return;
            }
            
            const submitBtn = photoForm.querySelector('.btn-upload');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Compress and resize image before upload
            compressAndResizeImage(file, 1024, 0.8, function(compressedDataUrl) {
                if (!compressedDataUrl) {
                    showNotification('Failed to process image. Please try a smaller image.', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                console.log('Image compressed successfully');
                const photo = {
                    src: compressedDataUrl,
                    caption: caption,
                    author: author,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    fileName: file.name,
                    fileSize: file.size
                };
                
                console.log('Photo object created:', photo);
                
                db.collection('photos').add(photo)
                    .then((docRef) => {
                        console.log('Photo uploaded successfully with ID:', docRef.id);
                        photoForm.reset();
                        if (uploadPreview) uploadPreview.style.display = 'none';
                        showNotification('Photo uploaded successfully! 📸', 'success');
                    })
                    .catch((error) => {
                        console.error('Error uploading photo:', error);
                        showNotification(`Error uploading photo: ${error.message}`, 'error');
                    })
                    .finally(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            });
        });
    } else {
        console.error('Photo form elements not found:', { photoForm, photoFile });
    }
}

// Image compression and resizing function
function compressAndResizeImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to data URL with compression
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            
            // Check if compressed size is reasonable (under 1MB)
            const base64Length = compressedDataUrl.length;
            const sizeInBytes = Math.ceil((base64Length * 3) / 4);
            const sizeInMB = sizeInBytes / (1024 * 1024);
            
            console.log(`Original size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
            console.log(`Compressed size: ${sizeInMB.toFixed(2)}MB`);
            
            if (sizeInMB > 1) {
                // Try with lower quality
                const lowerQuality = quality * 0.7;
                if (lowerQuality > 0.3) {
                    console.log(`Trying with lower quality: ${lowerQuality}`);
                    compressAndResizeImage(file, maxWidth, lowerQuality, callback);
                    return;
                } else {
                    console.error('Image too large even after compression');
                    callback(null);
                    return;
                }
            }
            
            callback(compressedDataUrl);
        };
        
        img.onerror = function() {
            console.error('Error loading image for compression');
            callback(null);
        };
        
        img.src = e.target.result;
    };
    
    reader.onerror = function() {
        console.error('Error reading file for compression');
        callback(null);
    };
    
    reader.readAsDataURL(file);
}

// Initialize memory upload functionality
function initializeMemoryUpload() {
    const memoryForm = document.getElementById('memoryForm');
    if (memoryForm) {
        memoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('memoryName').value.trim();
            const message = document.getElementById('memoryMessage').value.trim();
            const relationshipEl = document.getElementById('memoryRelationship');
            const relationship = relationshipEl ? relationshipEl.value : '';

            if (!name || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const submitBtn = memoryForm.querySelector('.btn-add-memory');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Offering...';
            submitBtn.disabled = true;

            const memory = {
                name: name,
                message: message,
                relationship: relationship,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            db.collection('memories').add(memory)
                .then(() => {
                    memoryForm.reset();
                    showOfferingReceipt(name);
                })
                .catch((error) => {
                    console.error('Error adding memory:', error);
                    showNotification('Error sharing memory. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

function showOfferingReceipt(name) {
    const modal = document.getElementById('memoryUploadModal');
    const receiptText = window.I18n ? window.I18n.t('memory.receipt')
        : `Your memory has been placed on the wall. Neha's family will see this.`;
    const receipt = document.createElement('div');
    receipt.className = 'offering-receipt';
    receipt.innerHTML = `<i class="fas fa-paper-plane"></i> ${receiptText}`;
    const form = document.getElementById('memoryForm');
    if (form) form.insertAdjacentElement('afterend', receipt);
    setTimeout(() => {
        receipt.remove();
        if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
    }, 3000);
}

// Initialize candle upload functionality
function initializeCandleUpload() {
    const candleForm = document.getElementById('candleForm');
    console.log('Initializing candle upload...', { candleForm });
    
    if (candleForm) {
        // Remove any existing event listeners to prevent duplicates
        const newForm = candleForm.cloneNode(true);
        candleForm.parentNode.replaceChild(newForm, candleForm);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Candle form submitted');
            
            const name = document.getElementById('candleName').value.trim();
            const message = document.getElementById('candleMessage').value.trim();
            
            console.log('Candle form data:', { name, message });
            
            if (!name) {
                showNotification('Please enter your name.', 'error');
                return;
            }
            
            if (!window.db) {
                console.error('Firebase database not available');
                showNotification('Database connection error. Please refresh the page.', 'error');
                return;
            }
            
            const submitBtn = newForm.querySelector('.btn-light-candle');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lighting...';
            submitBtn.disabled = true;
            
            const candle = {
                name: name,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            console.log('Candle object created:', candle);
            
            db.collection('candles').add(candle)
                .then((docRef) => {
                    console.log('Candle lit successfully with ID:', docRef.id);
                    newForm.reset();
                    showNotification('Candle lit successfully! 🕯️', 'success');
                })
                .catch((error) => {
                    console.error('Error adding candle:', error);
                    showNotification(`Error lighting candle: ${error.message}`, 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    } else {
        console.error('Candle form not found');
    }
}

// Update slideshow caption rendering
function updateSlideshowCaption(photo) {
  const captionDiv = document.getElementById('slideshowCaption');
  captionDiv.innerHTML =
    `<span>${photo.caption ? escapeHtml(photo.caption) : ''}</span>` +
    (photo.author ? `<span class="caption-author">${escapeHtml(photo.author)}</span>` : '');
}

// --- Mobile Bottom Nav ---
function initMobileNav() {
    const mobileNavCandle = document.getElementById('mobileNavCandle');
    const mobileNavPhoto = document.getElementById('mobileNavPhoto');
    const mobileNavMemory = document.getElementById('mobileNavMemory');
    const fabCandle = document.getElementById('fabCandleLight');
    const fabPhoto = document.getElementById('fabPhotoUpload');
    const fabMemory = document.getElementById('fabMemoryUpload');

    if (mobileNavCandle && fabCandle) mobileNavCandle.addEventListener('click', () => fabCandle.click());
    if (mobileNavPhoto && fabPhoto) mobileNavPhoto.addEventListener('click', () => fabPhoto.click());
    if (mobileNavMemory && fabMemory) mobileNavMemory.addEventListener('click', () => fabMemory.click());
}

// --- Shanti Mode ---
function initShantiMode() {
    const btn = document.getElementById('shantiToggle');
    if (!btn) return;
    const stored = localStorage.getItem('neha_shanti');
    if (stored === '1') document.body.classList.add('shanti-mode');

    btn.addEventListener('click', () => {
        const on = document.body.classList.toggle('shanti-mode');
        localStorage.setItem('neha_shanti', on ? '1' : '0');
    });
}

// --- Love Counter (candles + memories) ---
function initLoveCounter() {
    const counterEl = document.getElementById('loveCounterNumber');
    if (!counterEl) return;

    function update() {
        Promise.all([
            db.collection('candles').get(),
            db.collection('memories').get()
        ]).then(([candles, memories]) => {
            const total = candles.size + memories.size;
            counterEl.textContent = total.toLocaleString();
        }).catch(() => {});
    }
    update();
    setInterval(update, 60000);
}

// --- Now Remembering (live presence via .info/connected) ---
function initNowRemembering() {
    const el = document.getElementById('nowRemembering');
    const countEl = document.getElementById('nowRememberingCount');
    if (!el || !countEl) return;

    // Use Firestore presence collection
    const presenceRef = db.collection('presence');
    const myDoc = presenceRef.doc();
    myDoc.set({ online: true, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
        .catch(() => {});

    presenceRef.where('online', '==', true).onSnapshot((snap) => {
        const count = snap.size;
        if (count > 1) {
            countEl.textContent = count;
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    }, () => {});

    // Clean up on unload
    window.addEventListener('beforeunload', () => {
        myDoc.delete().catch(() => {});
    });
}

// --- WhatsApp Share ---
function initWhatsAppShare() {
    const btn = document.getElementById('whatsappShareBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const lang = window.I18n ? window.I18n.getLang() : 'en';
        const msg = window.I18n ? window.I18n.t('share.whatsapp.message') : "Come remember Neha Tomar with us:";
        const url = 'https://vaibhavfrenz.github.io/neha-memorial/';
        const text = encodeURIComponent(`${msg} ${url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener');
    });
}
