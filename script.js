document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. Initialize Lucide Icons ──
  lucide.createIcons();

  // ── 2. Mobile Menu Navigation Drawer ──
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const openDrawer = () => {
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawer.classList.add('translate-x-0');
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('translate-x-0');
    mobileDrawer.classList.add('translate-x-full');
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', openDrawer);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeDrawer);
  }

  // Close drawer if clicking outside on page
  document.addEventListener('click', (e) => {
    if (mobileDrawer && !mobileDrawer.classList.contains('translate-x-full')) {
      if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // ── 3. Scroll Reveal intersection observer ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => revealObserver.observe(el));

  // ── 4. Navbar Scroll Style & Active Links Tracking ──
  const navLinks = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'certifications', 'contact'];
  const navbar = document.getElementById('navbar');

  const handleNavbarHighlight = () => {
    // Styling switch on scroll
    if (window.scrollY > 20) {
      navbar.classList.remove('py-6', 'bg-transparent');
      navbar.classList.add('py-4', 'bg-[#050505]/80', 'backdrop-blur-md', 'border-b', 'border-purple-500/10');
    } else {
      navbar.classList.remove('py-4', 'bg-[#050505]/80', 'backdrop-blur-md', 'border-b', 'border-purple-500/10');
      navbar.classList.add('py-6', 'bg-transparent');
    }

    // Determine active section link
    const scrollPosition = window.scrollY + 150;
    let currentSection = 'home';

    for (const sectionId of navLinks) {
      const section = document.getElementById(sectionId);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = sectionId;
          break;
        }
      }
    }

    // Update Desktop Navigation states
    document.querySelectorAll('#navbar .hidden.md\\:flex a[data-section]').forEach(link => {
      const sec = link.getAttribute('data-section');
      const indicator = link.querySelector('.active-indicator');
      if (sec === currentSection) {
        link.classList.remove('text-gray-400');
        link.classList.add('text-white', 'font-semibold');
        if (indicator) indicator.classList.remove('hidden');
      } else {
        link.classList.remove('text-white', 'font-semibold');
        link.classList.add('text-gray-400');
        if (indicator) indicator.classList.add('hidden');
      }
    });

    // Update Mobile Drawer navigation states
    document.querySelectorAll('#mobile-drawer a[data-section]').forEach(link => {
      const sec = link.getAttribute('data-section');
      if (sec === currentSection) {
        link.classList.remove('text-gray-400');
        link.classList.add('text-purple-neon', 'font-semibold');
      } else {
        link.classList.remove('text-purple-neon', 'font-semibold');
        link.classList.add('text-gray-400');
      }
    });
  };

  window.addEventListener('scroll', handleNavbarHighlight);
  handleNavbarHighlight(); // run on page load

  // ── 5. Smooth Scroll Offset Click Handler ──
  const triggers = document.querySelectorAll('.nav-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const href = trigger.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Close drawer if click comes from mobile link
        closeDrawer();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll to top button action
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ── 6. About Me interactive tab switcher ──
  const tabData = {
    profile: {
      title: 'Analytical Profile',
      text: 'I approach challenges with a structured, data-first mindset. Rather than relying on guesswork, I believe in uncovering patterns, cleaning away the noise, and extracting actionable intelligence that drives real-world value. My background combines foundational Information Technology concepts with specialized data modeling and business analysis techniques.',
      icon: 'brain'
    },
    interests: {
      title: 'Technical Interests',
      text: 'I am deeply fascinated by predictive analytics, machine learning, and advanced dashboard storytelling. I enjoy exploring how modern algorithms can forecast trends, and how clean visual hierarchies in Power BI and Tableau can make complex data clear and accessible to decision-makers of all backgrounds.',
      icon: 'code-2'
    },
    goals: {
      title: 'Career Aspirations',
      text: 'My goal is to bridge the gap between engineering and business analytics as a Data Scientist. I aspire to design robust data pipelines, engineer accurate statistical models, and work within cross-functional teams to solve challenging, high-impact problems across global industries.',
      icon: 'trending-up'
    }
  };

  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTab = btn.getAttribute('data-tab');
      
      // Toggle button highlights
      tabButtons.forEach(b => {
        if (b.getAttribute('data-tab') === activeTab) {
          b.classList.add('bg-purple-neon', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.3)]');
          b.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-white/5');
        } else {
          b.classList.remove('bg-purple-neon', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.3)]');
          b.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-white/5');
        }
      });

      // Update card content
      const detailsText = document.getElementById('about-card-text');
      const detailsTitle = document.getElementById('about-card-title');
      const detailsIcon = document.getElementById('about-card-icon');
      
      if (detailsText && detailsTitle && detailsIcon) {
        detailsTitle.textContent = tabData[activeTab].title;
        detailsText.textContent = tabData[activeTab].text;
        detailsIcon.setAttribute('data-lucide', tabData[activeTab].icon);
        
        // Refresh icons inside card
        lucide.createIcons();
      }
    });
  });

  // ── 7. Simulated Real-time SVG Chart Update ──
  let chartData = [40, 55, 45, 60, 75, 65, 80];
  const xCoords = [0, 66, 133, 200, 266, 333, 400];

  const updateLiveChart = () => {
    // Shift data
    chartData.shift();
    const lastVal = chartData[chartData.length - 1];
    const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
    const nextVal = Math.max(30, Math.min(95, lastVal + change));
    chartData.push(nextVal);

    // Build path formulas
    let areaD = `M 0 150 L 0 ${150 - chartData[0]}`;
    let lineD = `M 0 ${150 - chartData[0]}`;

    for (let i = 1; i < 7; i++) {
      areaD += ` L ${xCoords[i]} ${150 - chartData[i]}`;
      lineD += ` L ${xCoords[i]} ${150 - chartData[i]}`;
    }

    areaD += ` L 400 150 Z`;

    const areaPath = document.getElementById('chart-area-path');
    const linePath = document.getElementById('chart-line-path');

    if (areaPath && linePath) {
      areaPath.setAttribute('d', areaD);
      linePath.setAttribute('d', lineD);
    }

    // Update circles positions
    const circles = document.querySelectorAll('#chart-dots-group circle');
    if (circles.length >= 8) {
      for (let i = 0; i < 7; i++) {
        circles[i].setAttribute('cy', 150 - chartData[i]);
      }
      // circles[7] is the active ping overlay circle on the last point
      circles[7].setAttribute('cy', 150 - chartData[6]);
      circles[7].style.transformOrigin = `400px ${150 - chartData[6]}px`;
    }
  };

  // Run graph simulation feed
  setInterval(updateLiveChart, 2500);

  // ── 8. Form Validation & Submission ──
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('success-banner');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitIcon = document.getElementById('submit-icon');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorEmailText = document.getElementById('error-email-text');
  const errorMessage = document.getElementById('error-message');

  // Input listeners to clear errors on typing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('border-rose-500');
      nameInput.classList.add('border-white/10');
      errorName.classList.add('hidden');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('border-rose-500');
      emailInput.classList.add('border-white/10');
      errorEmail.classList.add('hidden');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      messageInput.classList.remove('border-rose-500');
      messageInput.classList.add('border-white/10');
      errorMessage.classList.add('hidden');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('border-rose-500');
        nameInput.classList.remove('border-white/10');
        errorName.classList.remove('hidden');
        isValid = false;
      }

      // Validate email
      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        emailInput.classList.add('border-rose-500');
        emailInput.classList.remove('border-white/10');
        errorEmailText.textContent = 'Email is required';
        errorEmail.classList.remove('hidden');
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
        emailInput.classList.add('border-rose-500');
        emailInput.classList.remove('border-white/10');
        errorEmailText.textContent = 'Email is invalid';
        errorEmail.classList.remove('hidden');
        isValid = false;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('border-rose-500');
        messageInput.classList.remove('border-white/10');
        errorMessage.classList.remove('hidden');
        isValid = false;
      }

      if (!isValid) return;

      // Submission simulation
      submitBtn.disabled = true;
      submitBtn.classList.add('from-purple-neon/50', 'to-violet-neon/50');
      submitText.textContent = 'Sending Message...';
      submitIcon.setAttribute('data-lucide', 'loader-2');
      // Adding spin class to loader icon
      const spinnerIcon = submitBtn.querySelector('i');
      if (spinnerIcon) spinnerIcon.classList.add('animate-spin');
      
      lucide.createIcons();

      setTimeout(() => {
        // Reset states
        submitBtn.disabled = false;
        submitBtn.classList.remove('from-purple-neon/50', 'to-violet-neon/50');
        submitText.textContent = 'Send Message';
        submitIcon.setAttribute('data-lucide', 'send');
        
        lucide.createIcons();

        // Show success alert
        successBanner.classList.remove('hidden');
        
        // Reset fields
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // Clear banner after 5 seconds
        setTimeout(() => {
          successBanner.classList.add('hidden');
        }, 5000);

      }, 1500);
    });
  }

  // ── 9. Set Current Year in Footer ──
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
