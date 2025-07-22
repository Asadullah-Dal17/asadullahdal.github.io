document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
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

    // Budget slider
    const budgetInput = document.querySelector('#budget');
    const budgetDisplay = document.querySelector('#budgetDisplay');
    budgetInput.addEventListener('input', () => {
        budgetDisplay.textContent = `$${budgetInput.value}`;
    });
});