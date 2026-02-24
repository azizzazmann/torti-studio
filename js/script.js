document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with Spin Animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');

                // trigger spin when closing
                mobileMenuBtn.classList.add('active');

                setTimeout(() => {
                    mobileMenuBtn.classList.remove('active');
                }, 600);
            });
        });

    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery items (would normally come from a database)
    const galleryItems = [
        { img: 'hair-transformation.jpg', title: 'Hair Transformation' },
        { img: 'facial-treatment.jpg', title: 'Facial Treatment' },
        { img: 'bridal-makeup.jpg', title: 'Bridal Makeup' },
        { img: 'hair-coloring.jpg', title: 'Hair Coloring' },
        { img: 'skin-care.jpg', title: 'Skin Care' },
        { img: 'evening-makeup.jpg', title: 'Evening Makeup' }
    ];
    
    // Load gallery items
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="images/${item.img}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = 'Booking... <span class="loading-spinner"></span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
                
                // Reset form
                this.reset();
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Validate email
            if (!emailInput.value || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = 'Subscribing... <span class="loading-spinner"></span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset form
                this.reset();
            }, 1500);
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===== Sticky Contact Button Scroll Spin =====

let scrollTimer;

const stickyBtn = document.querySelector(".sticky-contact-btn");

window.addEventListener("scroll", () => {
  if (!stickyBtn) return;

  // add spinning class while scrolling
  stickyBtn.classList.add("scrolling");

  // reset timer every scroll event
  clearTimeout(scrollTimer);

  // remove spinning when scrolling stops
  scrollTimer = setTimeout(() => {
    stickyBtn.classList.remove("scrolling");
  }, 200); // adjust delay if you want smoother stop
});