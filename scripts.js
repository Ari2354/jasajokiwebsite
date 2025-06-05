// Full updated scripts.js with all functionality and fixed regex

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // FAQ toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('p').style.display = 'none';
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('p').style.display = 'block';
      }
    });
  });

  // Contact form validation and submission
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Semua field harus diisi.';
      formMessage.style.color = 'red';
      return;
    }

    if (!validateEmail(email)) {
      formMessage.textContent = 'Email tidak valid.';
      formMessage.style.color = 'red';
      return;
    }

    // Simulate form submission
    formMessage.style.color = '#2a9d8f';
    formMessage.textContent = 'Mengirim pesan...';

    setTimeout(() => {
      formMessage.textContent = 'Pesan berhasil dikirim. Terima kasih!';
      form.reset();
    }, 1500);
  });

  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email.toLowerCase());
  }

  // Navigation toggle for mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('primary-navigation');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('open');
    });
  }

  // Dropdown keyboard accessibility and toggle for mobile
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const dropdownToggle = dropdown.querySelector('a');
    dropdownToggle.addEventListener('click', e => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', !expanded);
        dropdown.classList.toggle('open');
      }
    });

    dropdown.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && window.innerWidth <= 960) {
        e.preventDefault();
        const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', !expanded);
        dropdown.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        dropdownToggle.setAttribute('aria-expanded', false);
        dropdown.classList.remove('open');
        dropdownToggle.focus();
      }
    });
  }
});
