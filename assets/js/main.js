// main.js - Complete with all functionality

document.addEventListener('DOMContentLoaded', function() {
  // =====================
  // Dark Mode Toggle
  // =====================
  const toggleBtn = document.getElementById('darkModeToggle');
  const icon = document.getElementById('darkModeIcon');

  // Check system preference and local storage
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedPref = localStorage.getItem('darkMode');

  // Set initial mode
  if (storedPref === null) {
    setDarkMode(prefersDark);
  } else {
    setDarkMode(storedPref === 'true');
  }

  // Function to set dark mode
  function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    icon.className = on ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('darkMode', on);

    // Update nav background based on mode
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.background = on ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
  }

  // Toggle button click handler
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });

  // Listen for system color scheme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('darkMode') === null) {
      setDarkMode(e.matches);
    }
  });

  // =====================
  // Typing Animation
  // =====================
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    const strings = ["Computer Vision Developer", "JEST Educator", "AI Solutions Provider", "OpenCV Specialist"];
    let currentString = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
      const fullTxt = strings[currentString];

      if (isDeleting) {
        typingElement.textContent = fullTxt.substring(0, charIndex--);
      } else {
        typingElement.textContent = fullTxt.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === fullTxt.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentString = (currentString + 1) % strings.length;
        setTimeout(type, 500);
      } else {
        const speed = isDeleting ? 50 : isEnd ? 100 : 150;
        setTimeout(type, speed);
      }
    }

    setTimeout(type, 1000);
  }

  // =====================
  // Project Filtering
  // =====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =====================
  // Smooth Scrolling
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          document.querySelector('.menu-toggle').classList.remove('active');
          document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // =====================
  // Mobile Menu Toggle
  // =====================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // =====================
  // Contact Form
  // =====================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Budget slider functionality
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');

    if (budgetRange && budgetValue) {
      budgetRange.addEventListener('input', () => {
        budgetValue.textContent = budgetRange.value;
      });
    }

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields');
        return;
      }

      // Here you would typically send the data to a server
      console.log('Form submitted:', data);

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your message! I will get back to you soon.</p>
      `;
      contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
      contactForm.reset();

      setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => successMsg.remove(), 300);
      }, 3000);
    });
  }

  // =====================
  // Testimonials Carousel
  // =====================
  const carousel = document.querySelector('.testimonials-carousel');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  if (carousel && prevBtn && nextBtn) {
    // Set up carousel navigation
    function updateCarousel() {
      const cardWidth = testimonialCards[0].offsetWidth + 24; // Include margin
      carousel.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        // Swipe left - next
        currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
      } else if (touchEndX > touchStartX + threshold) {
        // Swipe right - previous
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
        updateCarousel();
      }
    }
  }

  // =====================
  // Project Demo Modal
  // =====================
  const demoModal = document.querySelector('.project-demo-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const demoLinks = document.querySelectorAll('.project-link.demo');

  if (demoModal && closeModalBtn) {
    // Close modal
    closeModalBtn.addEventListener('click', () => {
      demoModal.style.display = 'none';
    });

    // Close when clicking outside modal content
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.style.display = 'none';
      }
    });

    // Handle demo links
    if (demoLinks) {
      demoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const projectCard = link.closest('.project-card');
          const projectTitle = projectCard.querySelector('.project-title').textContent;
          const projectDescription = projectCard.querySelector('.project-description').textContent;
          const demoUrl = link.getAttribute('href');
          const githubLink = projectCard.querySelector('.project-link.code').getAttribute('href');

          // Set modal content
          demoModal.querySelector('.demo-title').textContent = projectTitle;
          demoModal.querySelector('.demo-description').textContent = projectDescription;
          demoModal.querySelector('#demo-github-link').setAttribute('href', githubLink);

          // Set iframe source
          const videoUrl = demoUrl.includes('youtube.com')
            ? demoUrl.replace('watch?v=', 'embed/')
            : demoUrl;
          demoModal.querySelector('iframe').setAttribute('src', videoUrl);

          // Show modal
          demoModal.style.display = 'block';
        });
      });
    }
  }

  // =====================
  // Scroll Animations
  // =====================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.slide-up, .fade-in, .scale-in');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        const delay = element.style.getPropertyValue('--delay') || '0s';
        element.style.animationDelay = delay;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
      }
    });
  };

  // =====================
  // Metrics Counter
  // =====================
  const animateCounters = () => {
    const counters = document.querySelectorAll('.metric-value');
    const speed = 200;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Check if counters are in view
  const checkCounters = () => {
    const metricsSection = document.getElementById('metrics');
    if (metricsSection) {
      const metricsPosition = metricsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (metricsPosition < screenPosition) {
        animateCounters();
        window.removeEventListener('scroll', checkCounters);
      }
    }
  };

  // =====================
  // Skill Bars Animation
  // =====================
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  };

  // Check if skills section is in view
  const checkSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsPosition = skillsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (skillsPosition < screenPosition) {
        animateSkillBars();
        window.removeEventListener('scroll', checkSkills);
      }
    }
  };

  // =====================
  // Initialize Animations
  // =====================
  // Set initial state for animation
  document.querySelectorAll('.slide-up, .fade-in, .scale-in').forEach(el => {
    el.style.opacity = '0';

    if (el.classList.contains('slide-up')) {
      el.style.transform = 'translateY(30px)';
    } else if (el.classList.contains('scale-in')) {
      el.style.transform = 'scale(0.8)';
    }
  });

  // Run on load and scroll
  window.addEventListener('load', () => {
    animateOnScroll();
    checkCounters();
    checkSkills();
  });

  window.addEventListener('scroll', () => {
    animateOnScroll();
    checkCounters();
    checkSkills();
  });

  // =====================
  // Nav Link Hover Effects
  // =====================
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const span = link.querySelector('span');
      if (span) {
        span.style.transform = 'translateX(3px)';
      }
    });

    link.addEventListener('mouseleave', () => {
      const span = link.querySelector('span');
      if (span && !link.classList.contains('active')) {
        span.style.transform = 'translateX(0)';
      }
    });
  });

  // =====================
  // Tool Icon Animations
  // =====================
  const toolIcons = document.querySelectorAll('.tool-icon');
  toolIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      const title = icon.getAttribute('title');
      if (title) {
        // Add specific animations based on tool name
        const iconElement = icon.querySelector('i');
        switch(title) {
          case 'Python':
            iconElement.style.animation = 'spinIcon 0.8s';
            break;
          case 'OpenCV':
            iconElement.style.animation = 'pulseIcon 0.7s';
            break;
          case 'MediaPipe':
            iconElement.style.animation = 'floatIcon 1s infinite alternate';
            break;
          case 'TensorFlow':
            iconElement.style.animation = 'pulseIcon 0.7s infinite alternate';
            break;
        }
      }
    });

    icon.addEventListener('mouseleave', () => {
      const iconElement = icon.querySelector('i');
      iconElement.style.animation = '';
    });
  });
});
