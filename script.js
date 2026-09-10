document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  document.querySelectorAll('.menu-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelector('.menu-tab.active').classList.remove('active');
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.menu-item').forEach((item) => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  const navigation = document.getElementById('navigation');
  document.querySelectorAll('.nav-link, .navbar-brand').forEach((link) => {
    link.addEventListener('click', () => {
      if (navigation.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navigation).hide();
      }
    });
  });

  const bookingForm = document.getElementById('bookingForm');
  const formMessage = document.getElementById('formMessage');
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    formMessage.textContent = `Merci ${name || 'à vous'} ! Votre demande est bien enregistrée. Nous vous recontactons très vite au 0814 880 530.`;
    formMessage.classList.add('show');
    bookingForm.reset();
  });

  const galleryModalImage = document.getElementById('galleryModalImage');
  document.querySelectorAll('.gallery-image').forEach((image) => {
    image.addEventListener('click', () => {
      galleryModalImage.src = image.dataset.image;
    });
  });
});
