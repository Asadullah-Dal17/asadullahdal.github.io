document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Theme toggle with persistence
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // Typing animation for subtitle from provided list
    const subtitle = document.querySelector('.typing-subtitle');
    const typingSpan = document.querySelector('span.typing-animation[data-strings]');
    let typingList = ["Computer Vision Developer ", "Junior Elementary School Teacher ", "AI Solutions Provider ", "Content Creator "];
    if (typingSpan && typingSpan.dataset.strings) {
        try {
            typingList = JSON.parse(typingSpan.dataset.strings.replace(/'/g, '"'));
        } catch (e) {}
    }
    let typingIndex = 0;
    let charIndex = 0;
    let typingForward = true;

    function typeSubtitle() {
        const current = typingList[typingIndex];
        if (typingForward) {
            if (charIndex < current.length) {
                subtitle.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeSubtitle, 90);
            } else {
                typingForward = false;
                subtitle.classList.add('blink');
                setTimeout(typeSubtitle, 1600);
            }
        } else {
            if (charIndex > 0) {
                subtitle.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeSubtitle, 40);
            } else {
                typingForward = true;
                typingIndex = (typingIndex + 1) % typingList.length;
                subtitle.classList.remove('blink');
                setTimeout(typeSubtitle, 400);
            }
        }
    }
    setTimeout(typeSubtitle, 800);

    // Intersection Observer for slide-up animations
    const slideUpElements = document.querySelectorAll('.slide-up');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    slideUpElements.forEach(element => {
        observer.observe(element);
    });

    // Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                progress.style.width = progress.dataset.percent + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Project filtering with keyboard support
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                // Remove both hidden and active classes first
                card.classList.remove('active');
                if (filter === 'all' || (card.dataset.tags && card.dataset.tags.split(',').map(t => t.trim()).includes(filter))) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.add('active'), 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });

        // Keyboard support for filter buttons
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.querySelector(`#${trigger.dataset.modalTarget}`);
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            modal.querySelector('.modal-close').focus();
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard support for back-to-top button
    backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Budget slider - fix initial display
    const budgetInput = document.querySelector('#budget');
    const budgetDisplay = document.querySelector('#budgetDisplay');
    if (budgetInput && budgetDisplay) {
        budgetDisplay.textContent = `$${budgetInput.value}`;
        budgetInput.addEventListener('input', () => {
            budgetDisplay.textContent = `$${budgetInput.value}`;
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        function validateField(field) {
            const errorElement = document.getElementById(field.id + 'Error');
            let isValid = true;
            let errorMessage = '';

            // Remove previous error state
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
            if (errorElement) errorElement.textContent = '';

            // Validate based on field type
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (field.id === 'message' && field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }

            if (!isValid) {
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
                if (errorElement) errorElement.textContent = errorMessage;
            }

            return isValid;
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showMessage('Please fix the errors in the form', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                projectType: document.getElementById('project-type').value,
                budget: document.getElementById('budget').value,
                contactMethod: document.querySelector('input[name="contact-method"]:checked').value,
                message: document.getElementById('message').value
            };

            // Use mailto as fallback (can be replaced with Formspree, EmailJS, etc.)
            try {
                const subject = encodeURIComponent(`Portfolio Contact: ${formData.projectType}`);
                const body = encodeURIComponent(
                    `Name: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Project Type: ${formData.projectType}\n` +
                    `Budget: $${formData.budget}\n` +
                    `Preferred Contact: ${formData.contactMethod}\n\n` +
                    `Message:\n${formData.message}`
                );
                
                // For now, use mailto (you can replace this with a service like Formspree)
                window.location.href = `mailto:asadullah92c@gmail.com?subject=${subject}&body=${body}`;
                
                // Show success message
                setTimeout(() => {
                    showMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    budgetDisplay.textContent = '$200';
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                }, 500);
            } catch (error) {
                showMessage('There was an error sending your message. Please try again or email me directly.', 'error');
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });

        function showMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.setAttribute('role', 'alert');
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});