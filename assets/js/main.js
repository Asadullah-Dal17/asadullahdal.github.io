document.addEventListener('DOMContentLoaded', () => {
  // === Dark Mode Toggle ===
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // Persist dark mode preference in localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  } else {
    console.warn('Dark mode toggle element (#darkModeToggle) not found.');
  }

  // === Skills Animation ===
  const skillMeters = document.querySelectorAll('.skill-meter');
  if (skillMeters.length === 0) {
    console.warn('No .skill-meter elements found in the DOM.');
  } else {
    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      skillMeters.forEach(meter => meter.classList.add('active'));
      console.warn('IntersectionObserver not supported, using fallback animation.');
    } else {
      const skillsObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null, // Use viewport
          rootMargin: '0px',
          threshold: 0.2 // Trigger when 20% visible
        }
      );
      skillMeters.forEach(meter => skillsObserver.observe(meter));
      console.log('Skills observer initialized');
    }
  }

  // === Project Filters ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
          }
        });
      });
    });
  } else {
    console.warn('No .filter-btn elements found for project filtering.');
  }

  // === Project Demo Modal ===
  const projectLinks = document.querySelectorAll('.project-link.demo');
  const modal = document.querySelector('.project-demo-modal');
  const closeModal = document.querySelector('.close-modal');
  if (projectLinks.length > 0 && modal && closeModal) {
    projectLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const videoUrl = link.dataset.video;
        const title = link.dataset.title;
        const description = link.dataset.description;
        
        // Update modal content
        const videoContainer = modal.querySelector('.video-container');
        const demoTitle = modal.querySelector('.demo-title');
        const demoDescription = modal.querySelector('.demo-description');
        
        if (videoContainer && demoTitle && demoDescription) {
          videoContainer.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
          demoTitle.textContent = title;
          demoDescription.textContent = description;
          modal.style.display = 'block';
        } else {
          console.warn('Modal content elements missing.');
        }
      });
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      const videoContainer = modal.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.innerHTML = ''; // Clear iframe to stop video
      }
    });

    // Close modal on click outside
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        const videoContainer = modal.querySelector('.video-container');
        if (videoContainer) {
          videoContainer.innerHTML = '';
        }
      }
    });
  } else {
    console.warn('Project modal elements missing.');
  }

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  } else {
    console.warn('Mobile menu elements (.menu-toggle or .nav-links) not found.');
  }

  // === FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          // Close all other FAQs
          faqItems.forEach(i => i.classList.remove('active'));
          // Toggle current FAQ
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  } else {
    console.warn('No .faq-item elements found.');
  }

  // === Contact Form Submission ===
  const contactForm = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // Simulate form submission
      if (formSuccess) {
        formSuccess.style.display = 'flex';
        contactForm.reset();
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 3000);
      } else {
        console.warn('Form success message element (.form-success) not found.');
      }
    });
  } else {
    console.warn('Contact form (.contact-form) not found.');
  }

  // === Smooth Scroll for Navigation Links ===
  const navLinksItems = document.querySelectorAll('.nav-link');
  if (navLinksItems.length > 0) {
    navLinksItems.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          if (navLinks) {
            navLinks.classList.remove('active');
          }
        }
      });
    });
  } else {
    console.warn('No .nav-link elements found.');
  }

  // === Animation on Scroll for Other Sections ===
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
  if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    animatedElements.forEach(element => animationObserver.observe(element));
  }
});