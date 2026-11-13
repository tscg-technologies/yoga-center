/**
 * YOGA CENTER - Interactive Vanilla JavaScript
 * Features: Mobile Nav, Sticky Header, Program Filters, FAQ Accordion,
 * Form Validation with friendly demo notifications, Back-to-Top, Scroll Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStickyHeader();
  initScrollAnimations();
  initFaqAccordion();
  initProgramFilters();
  initRegistrationForm();
  initContactForm();
  initBackToTop();
  initPreselectedProgram();
});

/* --- Mobile Navigation & Active Page --- */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --- Sticky Header Scroll Effect --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .pricing-card, .section-header, .testimonial-card');
  animatedElements.forEach(el => el.classList.add('fade-in-up'));

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs in the same container for clean accordion effect
      const parentContainer = item.closest('.faq-container');
      if (parentContainer) {
        parentContainer.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --- Program Category Filters --- */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-filter-item');

  if (!filterBtns.length || !programCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.add('appear');
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Preselect Program in URL for Registration Page --- */
function initPreselectedProgram() {
  const urlParams = new URLSearchParams(window.location.search);
  const programParam = urlParams.get('program');
  const selectElement = document.getElementById('reg-program');

  if (programParam && selectElement) {
    for (let i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].value.toLowerCase() === programParam.toLowerCase() ||
          selectElement.options[i].text.toLowerCase().includes(programParam.toLowerCase())) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  }
}

/* --- Registration Form Validation & Feedback --- */
function initRegistrationForm() {
  const regForm = document.getElementById('yoga-registration-form');
  if (!regForm) return;

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const phoneInput = document.getElementById('reg-phone');
    const programSelect = document.getElementById('reg-program');
    const dateInput = document.getElementById('reg-date');
    const alertBox = document.getElementById('reg-alert-box');

    // Reset error states
    regForm.querySelectorAll('.form-control').forEach(ctrl => ctrl.classList.remove('error'));
    if (alertBox) {
      alertBox.style.display = 'none';
      alertBox.className = 'alert-box';
    }

    // Name validation
    if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
      if (nameInput) nameInput.classList.add('error');
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) emailInput.classList.add('error');
      isValid = false;
    }

    // Phone validation (at least 8-10 digits)
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
      if (phoneInput) phoneInput.classList.add('error');
      isValid = false;
    }

    // Program selection
    if (!programSelect || !programSelect.value) {
      if (programSelect) programSelect.classList.add('error');
      isValid = false;
    }

    // Date validation
    if (!dateInput || !dateInput.value) {
      if (dateInput) dateInput.classList.add('error');
      isValid = false;
    }

    if (!isValid) {
      if (alertBox) {
        alertBox.className = 'alert-box alert-error';
        alertBox.innerHTML = '<strong>Please correct the highlighted fields:</strong> Ensure your name, valid email, phone number, program, and preferred start date are filled.';
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }

    // Friendly demonstration response
    const participantName = nameInput.value.trim();
    const selectedProgramText = programSelect.options[programSelect.selectedIndex].text;

    if (alertBox) {
      alertBox.className = 'alert-box alert-success';
      alertBox.innerHTML = `
        <strong>Thank you, ${participantName}!</strong><br>
        Your registration enquiry for <strong>"${selectedProgramText}"</strong> has been simulated successfully.<br>
        <small style="display:block; margin-top:0.4rem; opacity:0.9;">
          <em>* Demonstration Notice: This is a front-end preview. No data is stored or transmitted to external servers.</em>
        </small>
      `;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    regForm.reset();
  });
}

/* --- Contact Form Validation --- */
function initContactForm() {
  const contactForm = document.getElementById('yoga-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const alertBox = document.getElementById('contact-alert-box');

    // Reset error styling
    contactForm.querySelectorAll('.form-control').forEach(ctrl => ctrl.classList.remove('error'));

    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) nameInput.classList.add('error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) emailInput.classList.add('error');
      isValid = false;
    }

    if (!messageInput || messageInput.value.trim().length < 5) {
      if (messageInput) messageInput.classList.add('error');
      isValid = false;
    }

    if (!isValid) {
      if (alertBox) {
        alertBox.className = 'alert-box alert-error';
        alertBox.innerHTML = 'Please fill out your name, a valid email address, and your message.';
        alertBox.style.display = 'block';
      }
      return;
    }

    if (alertBox) {
      alertBox.className = 'alert-box alert-success';
      alertBox.innerHTML = `
        <strong>Message Received!</strong><br>
        Thank you for contacting YOGA CENTER. In a live system, our wellness coordinator would get in touch shortly.<br>
        <small><em>* Demonstration Notice: Frontend preview only.</em></small>
      `;
      alertBox.style.display = 'block';
    }

    contactForm.reset();
  });
}

/* --- Back to Top Button --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
