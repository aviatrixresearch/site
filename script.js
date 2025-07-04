document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.expertise-item, .portfolio-item, .research-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            const yPos = -(scrollTop * speed * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Enhanced Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
    const formMessage = document.getElementById('formMessage');

    // Form validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateField = (fieldName, value, rules) => {
        const errorElement = document.getElementById(fieldName + 'Error');
        const field = document.querySelector(`[name="${fieldName}"]`);
        let isValid = true;
        let errorMessage = '';

        // Clear previous states
        if (field) {
            field.classList.remove('error', 'success');
        }
        if (errorElement) {
            errorElement.classList.remove('show');
        }

        // Required validation
        if (rules.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = `${rules.label} is required`;
        }
        // Email validation
        else if (rules.email && value && !validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Minimum length validation
        else if (rules.minLength && value && value.trim().length < rules.minLength) {
            isValid = false;
            errorMessage = `${rules.label} must be at least ${rules.minLength} characters`;
        }

        // Update UI
        if (!isValid && field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        } else if (value && value.trim() !== '' && field) {
            field.classList.add('success');
        }

        return isValid;
    };

    // Field configuration
    const formFields = [
        { name: 'name', label: 'Name', required: true, minLength: 2 },
        { name: 'email', label: 'Email', required: true, email: true },
        { name: 'organization', label: 'Organization', required: false },
        { name: 'message', label: 'Message', required: true, minLength: 10 }
    ];

    // Real-time validation
    formFields.forEach(fieldConfig => {
        const field = document.querySelector(`[name="${fieldConfig.name}"]`);
        if (field) {
            field.addEventListener('blur', () => {
                validateField(fieldConfig.name, field.value, fieldConfig);
            });
            
            // Clear errors on input
            field.addEventListener('input', () => {
                const errorElement = document.getElementById(fieldConfig.name + 'Error');
                if (errorElement && errorElement.classList.contains('show')) {
                    field.classList.remove('error');
                    errorElement.classList.remove('show');
                }
            });
        }
    });

    // Form submission with Formspree integration
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all fields
            let isFormValid = true;
            const formData = new FormData(contactForm);
            
            formFields.forEach(fieldConfig => {
                const value = formData.get(fieldConfig.name);
                const isValid = validateField(fieldConfig.name, value, fieldConfig);
                if (!isValid) isFormValid = false;
            });

            if (!isFormValid) {
                showFormMessage('Please correct the errors above', 'error');
                return;
            }

            // Show loading state
            if (submitBtn && btnText && btnLoading) {
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                btnLoading.style.display = 'flex';
            }
            hideFormMessage();

            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // Clear field states
                    formFields.forEach(fieldConfig => {
                        const field = document.querySelector(`[name="${fieldConfig.name}"]`);
                        if (field) {
                            field.classList.remove('error', 'success');
                        }
                        const errorElement = document.getElementById(fieldConfig.name + 'Error');
                        if (errorElement) {
                            errorElement.classList.remove('show');
                        }
                    });

                    // Also show notification
                    showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                showNotification('Error sending message. Please try again.', 'error');
            } finally {
                // Reset button state
                if (submitBtn && btnText && btnLoading) {
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                }
            }
        });
    }

    // Form message functions
    const showFormMessage = (message, type) => {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        formMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
        }
    };

    const hideFormMessage = () => {
        if (!formMessage) return;
        
        formMessage.classList.remove('show');
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 300);
    };

    // Legacy function kept for compatibility
    function isValidEmail(email) {
        return validateEmail(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #D4AF37, #F1D592)'};
            color: ${type === 'success' || type === 'error' ? 'white' : '#000000'};
            padding: 1rem 1.5rem;
            border-radius: 0;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
            border: 1px solid rgba(212, 175, 55, 0.5);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        let currentText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                currentText += originalText.charAt(i);
                heroSubtitle.textContent = currentText;
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(() => {
            heroSubtitle.textContent = '';
            typeWriter();
        }, 1000);
    }

    // Initialize AOS-like animations
    function initAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const animationType = element.getAttribute('data-animate');
            element.style.opacity = '0';
            
            switch(animationType) {
                case 'fadeIn':
                    element.style.opacity = '0';
                    break;
                case 'slideUp':
                    element.style.transform = 'translateY(50px)';
                    element.style.opacity = '0';
                    break;
                case 'slideLeft':
                    element.style.transform = 'translateX(-50px)';
                    element.style.opacity = '0';
                    break;
                case 'slideRight':
                    element.style.transform = 'translateX(50px)';
                    element.style.opacity = '0';
                    break;
            }
            
            element.style.transition = 'all 0.6s ease';
        });
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Additional scroll handling if needed
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    // Initialize animations
    initAnimations();
    
    console.log('Aviatrix Research Group website loaded successfully!');
}); 