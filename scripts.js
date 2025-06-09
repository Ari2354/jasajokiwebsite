document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollReveal();
    initSmoothScroll();
    initMobileNav();
    initContactForm();
    initPortfolioHover();
    initServiceModal();
    initAuthForms();
});

// Service Modal
function initServiceModal() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('closeModal');
    const showModalBtn = document.getElementById('showServiceModal');
    
    // Show modal immediately on page load
    if (modal) {
        modal.classList.add('show');
        modal.focus();
    }
    
    // Show modal on Layanan click
    if (showModalBtn && modal) {
        showModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            modal.focus();
        });
    }
    
    // Close modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
    }
}

// Authentication Forms
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Store auth token
                localStorage.setItem('authToken', 'sample-token');
                
                // Redirect to order page
                window.location.href = '/order.html';
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Validate form
                if (!validateRegistrationForm(data)) {
                    return;
                }
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Store auth token
                localStorage.setItem('authToken', 'sample-token');
                
                // Redirect to order page
                window.location.href = '/order.html';
            } catch (error) {
                console.error('Registration failed:', error);
            }
        });
    }
}

// Form Validation
function validateRegistrationForm(data) {
    let isValid = true;
    const errors = [];
    
    if (!data.name?.trim()) {
        errors.push('Nama harus diisi');
        isValid = false;
    }
    
    if (!data.newEmail?.trim()) {
        errors.push('Email harus diisi');
        isValid = false;
    } else if (!isValidEmail(data.newEmail)) {
        errors.push('Format email tidak valid');
        isValid = false;
    }
    
    if (!data.newPassword?.trim()) {
        errors.push('Password harus diisi');
        isValid = false;
    } else if (data.newPassword.length < 6) {
        errors.push('Password minimal 6 karakter');
        isValid = false;
    }
    
    if (!data.phone?.trim()) {
        errors.push('Nomor WhatsApp harus diisi');
        isValid = false;
    }
    
    if (!isValid) {
        showFormMessage(errors.join('<br>'), 'error');
    }
    
    return isValid;
}

// Scroll Reveal Animation with Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '-50px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add specific animation class based on data attribute
                const effect = entry.target.dataset.effect;
                if (effect) {
                    entry.target.classList.add(`animate-${effect}`);
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        element.classList.add('opacity-0');
        revealObserver.observe(element);
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (!mobileMenu?.classList.contains('hidden')) {
                    closeMenuHandler();
                }
            }
        });
    });
}

// Enhanced Mobile Navigation
function initMobileNav() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenuContent = mobileMenu?.querySelector('div');
    const mobileServiceBtn = document.getElementById('mobileServiceBtn');
    const serviceModal = document.getElementById('serviceModal');
    
    function toggleMenu(show) {
        const menuContent = mobileMenu.querySelector('.mobile-menu-content');
        
        if (show) {
            document.body.style.overflow = 'hidden';
            mobileMenu.classList.remove('hidden');
            // Force a reflow to ensure the transition works
            mobileMenu.offsetHeight;
            menuContent.classList.remove('translate-x-full');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            document.body.style.overflow = '';
            menuContent.classList.add('translate-x-full');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            const onTransitionEnd = () => {
                if (menuContent.classList.contains('translate-x-full')) {
                    mobileMenu.classList.add('hidden');
                }
                menuContent.removeEventListener('transitionend', onTransitionEnd);
            };
            
            menuContent.addEventListener('transitionend', onTransitionEnd);
        }
    }

    function openMenu() {
        toggleMenu(true);
    }
    
    function closeMenuHandler() {
        toggleMenu(false);
    }
    
    if (menuToggle && mobileMenu && closeMenu) {
        // Toggle menu
        menuToggle.addEventListener('click', openMenu);
        
        // Close menu
        closeMenu.addEventListener('click', closeMenuHandler);
        
        // Close on backdrop click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenuHandler();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenuHandler();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                closeMenuHandler();
            }
        });
        
        // Mobile service button
        if (mobileServiceBtn && serviceModal) {
            mobileServiceBtn.addEventListener('click', () => {
                closeMenuHandler(); // Close mobile menu first
                setTimeout(() => {
                    serviceModal.classList.add('show'); // Then show service modal
                }, 300);
            });
        }
        
        // Make closeMenuHandler available globally
        window.closeMenuHandler = closeMenuHandler;
    }
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        const originalButtonText = submitButton.innerHTML;
        const loadingSpinner = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mengirim...
        `;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            ['input', 'blur'].forEach(eventType => {
                input.addEventListener(eventType, () => validateInput(input));
            });
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            formMessage.textContent = '';
            formMessage.className = '';
            
            // Validate all inputs
            const isValid = Array.from(inputs).every(input => validateInput(input));
            
            if (!isValid) {
                showFormMessage('Mohon periksa kembali form anda', 'error');
                return;
            }
            
            submitButton.disabled = true;
            submitButton.innerHTML = loadingSpinner;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showFormMessage('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
                form.reset();
                
                inputs.forEach(input => {
                    input.classList.remove('border-green-500', 'border-red-500');
                    const errorElement = input.parentElement.querySelector('.error-message');
                    if (errorElement) errorElement.remove();
                });
                
            } catch (error) {
                showFormMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
}

// Form validation helper functions
function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) errorElement.remove();
    
    let isValid = true;
    let errorMessage = '';
    
    switch(input.type) {
        case 'email':
            if (!input.value) {
                errorMessage = 'Email harus diisi';
                isValid = false;
            } else if (!isValidEmail(input.value)) {
                errorMessage = 'Format email tidak valid';
                isValid = false;
            }
            break;
        case 'text':
            if (!input.value.trim()) {
                errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} harus diisi`;
                isValid = false;
            }
            break;
        case 'textarea':
            if (!input.value.trim()) {
                errorMessage = 'Pesan harus diisi';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        input.classList.add('border-red-500');
        input.classList.remove('border-green-500');
        const error = document.createElement('p');
        error.className = 'error-message text-red-500 text-sm mt-1';
        error.textContent = errorMessage;
        input.parentElement.appendChild(error);
    } else {
        input.classList.add('border-green-500');
        input.classList.remove('border-red-500');
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.innerHTML = message;
    formMessage.className = `form-message ${type} text-center py-2`;
    formMessage.style.color = type === 'success' ? 'var(--color-primary)' : '#e76f51';
}

// Portfolio Hover Effects
function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            ['mouseenter', 'focus'].forEach(event => {
                item.addEventListener(event, () => {
                    overlay.style.opacity = '1';
                });
            });
            
            ['mouseleave', 'blur'].forEach(event => {
                item.addEventListener(event, () => {
                    overlay.style.opacity = '0';
                });
            });
        }
    });
}
