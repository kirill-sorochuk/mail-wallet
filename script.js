/* Mail Кошелёк — Landing Page JS */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    const closeMenu = () => { mobileBtn.classList.remove('active'); mobileMenu.classList.remove('active'); document.body.style.overflow = ''; };
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) closeMenu(); });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 20, behavior: 'smooth' });
      }
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  function checkReveals() { reveals.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('visible'); }); }
  window.addEventListener('scroll', checkReveals, { passive: true });
  checkReveals();

  const counters = document.querySelectorAll('[data-count]');
  const animated = new Set();
  function animateCounters() {
    counters.forEach(counter => {
      if (animated.has(counter) || counter.getBoundingClientRect().top > window.innerHeight - 80) return;
      animated.add(counter);
      const target = parseInt(counter.dataset.count, 10);
      const suffix = counter.dataset.suffix || '';
      const prefix = counter.dataset.prefix || '';
      const start = performance.now();
      function update(now) {
        const p = Math.min((now - start) / 2000, 1);
        counter.textContent = prefix + Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString('ru-RU') + suffix;
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }
  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  document.querySelectorAll('.faq-item__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  document.querySelectorAll('.cards__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cards__tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  const heroVisual = document.querySelector('.hero__visual');
  if (heroVisual && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      heroVisual.style.transform = 'translate(' + ((e.clientX / window.innerWidth - 0.5) * 10) + 'px, ' + ((e.clientY / window.innerHeight - 0.5) * 10) + 'px)';
    });
  }
});
