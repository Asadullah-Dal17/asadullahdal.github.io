document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle
  const toggleBtn = document.getElementById('darkModeToggle');
  const icon = document.getElementById('darkModeIcon');

  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedPref = localStorage.getItem('darkMode');

  // Set initial mode
  if (storedPref === null) {
    setDarkMode(prefersDark);
  } else {
    setDarkMode(storedPref === '1');
  }

  function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    icon.className = on ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('darkMode', on ? '1' : '0');
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });

  // Typing animation
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    const strings = JSON.parse(typingElement.getAttribute('data-strings'));
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

  // Project filtering
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
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Smooth scrolling for anchor links
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
        }
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to a server
      console.log('Form submitted:', data);

      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .testimonial-card');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll('.timeline-item, .project-card, .skill-category, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
