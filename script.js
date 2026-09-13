document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#mainNav');
  const backTop = document.querySelector('#backTop');
  const revealItems = document.querySelectorAll('.reveal');
  const reservationForm = document.querySelector('#reservationForm');
  const formFeedback = document.querySelector('#formFeedback');
  const contactForm = document.querySelector('#contactForm');
  const contactFeedback = document.querySelector('#contactFeedback');

  if (reservationForm) {
    reservationForm.action = 'reservation.php';
    reservationForm.method = 'post';
  }
  if (contactForm) {
    contactForm.action = 'contact.php';
    contactForm.method = 'post';
  }

  const statusMessage = new URLSearchParams(window.location.search).get('status');
  if (statusMessage) {
    const feedback = window.location.hash === '#contact' ? contactFeedback : formFeedback;
    if (feedback) {
      feedback.textContent = statusMessage;
      feedback.classList.add('success');
    }
  }

  const updateScrollState = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.querySelectorAll('.navbar .nav-link, .navbar .btn').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('#navContent');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  reservationForm?.addEventListener('submit', (event) => {
    if (reservationForm.action.endsWith('reservation.php')) {
      return;
    }
    event.preventDefault();
    const formData = new FormData(reservationForm);
    const activity = formData.get('activity');
    formFeedback.textContent = `Merci ${formData.get('name')} ! Votre demande pour ${activity.toLowerCase()} a bien été envoyée.`;
    formFeedback.classList.add('success');
    reservationForm.reset();
  });

  contactForm?.addEventListener('submit', (event) => {
    if (contactForm.action.endsWith('contact.php')) {
      return;
    }
    event.preventDefault();
    const formData = new FormData(contactForm);
    contactFeedback.textContent = `Merci ${formData.get('contactName')} ! Votre message a bien été envoyé.`;
    contactFeedback.classList.add('success');
    contactForm.reset();
  });
});
