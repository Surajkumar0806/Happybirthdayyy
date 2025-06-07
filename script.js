// --- Element Selectors ---
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const hintTrigger = document.querySelector('.hint-trigger');
const hintBox = document.querySelector('.hint-box');
const whatsInMyHeartPage = document.getElementById('whats-in-my-heart-page');
const itsAllYouPage = document.getElementById('its-all-you-page');
const photoGalleryPage = document.getElementById('photo-gallery-page');
const thankYouPage = document.getElementById('thank-you-page');
const dateConfirmationPage = document.getElementById('date-confirmation-page'); // Now the choice page

// NEW BUTTONS AND PAGES FOR DATE CHOICES
const goToFinalMessageButton = document.getElementById('go-to-final-message');
const planDateButton = document.getElementById('plan-date-button');
const lowkeyRomanticButton = document.getElementById('lowkey-romantic-button');
const classyAestheticButton = document.getElementById('classy-aesthetic-button');
const lowkeyRomanticDayPage = document.getElementById('lowkey-romantic-day-page');
const classyAestheticDayPage = document.getElementById('classy-aesthetic-day-page');

// Gallery elements
const galleryContainer = document.getElementById('gallery-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const dialSound = document.getElementById('dialSound');


// --- Utility Functions ---
function hideAllSections() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
}

function showSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('active');
        section.scrollTop = 0; // Scroll to top when showing a new section
    }
}

// --- Page Content and Logic ---

// Gallery Slides Data
const gallerySlides = [
    { id: 'hike-cutie-patotie', title: 'Cutie Patotie', previewImage: 'assets/srushti-photos/cutie1.jpg' },
    { id: 'hike-goofy-gorgeous', title: 'Goofy Gorgeous', previewImage: 'assets/srushti-photos/goofy1.jpg' },
    { id: 'hike-hot-spicy', title: 'Hot and Spicy Hottie Alert', previewImage: 'assets/srushti-photos/hot1.jpg' },
    { id: 'hike-smarty-pants', title: 'Smarty Pants', previewImage: 'assets/srushti-photos/smart1.jpg' },
    { id: 'hike-elegant-princess', title: 'Elegant Princess', previewImage: 'assets/srushti-photos/elegant1.jpg' },
    { id: 'hike-all-time-favorites', title: 'All Time Favorites', previewImage: 'assets/srushti-photos/fav1.jpg' },
    { id: 'hike-shh-hot-drool', title: '🤫🥵🤤', previewImage: 'assets/srushti-photos/secret1.jpg' },
    { id: 'hike-green-saree', title: 'The Green Saree 😌', previewImage: 'assets/srushti-photos/green_saree1.jpg' }
];

// Dynamically create gallery slides
function createGallerySlides() {
    galleryContainer.innerHTML = ''; // Clear existing content
    gallerySlides.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('gallery-slide');
        slideDiv.setAttribute('data-target', slide.id);

        const img = document.createElement('img');
        img.src = slide.previewImage;
        img.alt = slide.title + ' Preview';

        const titleP = document.createElement('p');
        titleP.textContent = slide.title;

        slideDiv.appendChild(img);
        slideDiv.appendChild(titleP);
        galleryContainer.appendChild(slideDiv);
    });

    // Attach click listeners to new slides
    document.querySelectorAll('.gallery-slide').forEach(slide => {
        slide.addEventListener('click', (event) => {
            const targetId = event.currentTarget.getAttribute('data-target');
            showSection(targetId);
            if (dialSound) dialSound.play(); // Play sound when clicking a memory
        });
    });
}

// --- Event Listeners ---

// Login Button
if (loginButton) {
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Updated Username: "Most Beautiful Birthday Girl"
        // Password: "Srushti"
        if (username === 'Most Beautiful Birthday Girl' && password === 'Srushti') {
            loginError.textContent = '';
            showSection('whats-in-my-heart-page');
        } else {
            loginError.textContent = 'Incorrect username or password. Please try again, my love!';
        }
    });
}

// "Wanna know what's in my heartttt?" page click/enter
if (whatsInMyHeartPage) {
    whatsInMyHeartPage.addEventListener('click', () => {
        showSection('its-all-you-page');
    });
    whatsInMyHeartPage.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            showSection('its-all-you-page');
        }
    });
}

// "It's all youuuu" page click/enter
if (itsAllYouPage) {
    itsAllYouPage.addEventListener('click', () => {
        showSection('photo-gallery-page');
        createGallerySlides(); // Populate gallery when showing the page
    });
    itsAllYouPage.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            showSection('photo-gallery-page');
            createGallerySlides(); // Populate gallery when showing the page
        }
    });
}


// Gallery navigation arrows (Drag and Click)
let isDragging = false;
let startX;
let scrollLeft;

if (galleryContainer) {
    galleryContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        galleryContainer.classList.add('dragging');
        startX = e.pageX - galleryContainer.offsetLeft;
        scrollLeft = galleryContainer.scrollLeft;
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        galleryContainer.classList.remove('dragging');
    });

    galleryContainer.addEventListener('mouseup', () => {
        isDragging = false;
        galleryContainer.classList.remove('dragging');
    });

    galleryContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - galleryContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplier for faster scroll
        galleryContainer.scrollLeft = scrollLeft - walk;
    });
}


if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        galleryContainer.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll by width of one slide
    });
}

if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        galleryContainer.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll by width of one slide
    });
}

// Go to Final Message Button
if (goToFinalMessageButton) {
    goToFinalMessageButton.addEventListener('click', () => {
        showSection('thank-you-page');
    });
}

// Plan Date Button (from Thank You page to Date Choice page)
if (planDateButton) {
    planDateButton.addEventListener('click', () => {
        showSection('date-confirmation-page'); // This now leads to the choice page
    });
}

// NEW: Date Choice Buttons
if (lowkeyRomanticButton) {
    lowkeyRomanticButton.addEventListener('click', () => {
        showSection('lowkey-romantic-day-page');
    });
}

if (classyAestheticButton) {
    classyAestheticButton.addEventListener('click', () => {
        showSection('classy-aesthetic-day-page');
    });
}

// Back to Gallery buttons (for individual slides)
document.querySelectorAll('.back-to-gallery').forEach(button => {
    button.addEventListener('click', () => {
        showSection('photo-gallery-page');
    });
});

// Slideshow logic for individual slides
function setupSlideshow(slideshowId) {
    const slideshowInner = document.getElementById(slideshowId);
    if (!slideshowInner) return;

    const photos = slideshowInner.querySelectorAll('.slideshow-photo');
    let currentPhotoIndex = 0;
    let autoPlayInterval;

    function showPhoto(index) {
        photos.forEach((photo, i) => {
            if (i === index) {
                photo.classList.add('active');
            } else {
                photo.classList.remove('active');
            }
        });
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(currentPhotoIndex);
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        showPhoto(currentPhotoIndex);
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval); // Clear any existing interval
        autoPlayInterval = setInterval(nextPhoto, 3000); // Change photo every 3 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }

    // Attach event listeners for this specific slideshow
    const container = slideshowInner.closest('.photo-slideshow-container');
    if (container) {
        const prevButton = container.querySelector('.prev-photo');
        const nextButton = container.querySelector('.next-photo');
        const toggleButton = container.querySelector('.toggle-auto-slideshow');

        if (prevButton) prevButton.addEventListener('click', prevPhoto);
        if (nextButton) nextButton.addEventListener('click', nextPhoto);
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                if (autoPlayInterval) {
                    stopAutoPlay();
                    toggleButton.textContent = 'Auto Play';
                } else {
                    startAutoPlay();
                    toggleButton.textContent = 'Stop Auto Play';
                }
            });
        }
    }

    showPhoto(currentPhotoIndex); // Show the first photo initially
}

// Call setupSlideshow for each individual slide section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSlideshow('slideshow-cutie-patotie');
    setupSlideshow('slideshow-goofy-gorgeous');
    setupSlideshow('slideshow-hot-spicy');
    setupSlideshow('slideshow-smarty-pants');
    setupSlideshow('slideshow-elegant-princess');
    setupSlideshow('slideshow-all-time-favorites');
    setupSlideshow('slideshow-shh-hot-drool');
    setupSlideshow('slideshow-green-saree');
});

// IMPORTANT: Form submission via FormSubmit.co is handled directly by the HTML form's 'action' attribute.
// The JavaScript event listener for form submission has been removed for this reason.
// No JavaScript needed here for form submission if using FormSubmit.co.