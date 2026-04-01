document.addEventListener('DOMContentLoaded', () => {

  // ── Hero colourway — cycle through 3 themes on each refresh ──
  const themes = ['dark', 'orange', 'light'];
  const stored = parseInt(localStorage.getItem('heroThemeIdx') ?? '-1');
  const next = (stored + 1) % themes.length;
  localStorage.setItem('heroThemeIdx', next);
  const hero = document.querySelector('.hero');
  if (hero && themes[next] !== 'dark') {
    hero.setAttribute('data-theme', themes[next]);
    document.body.setAttribute('data-hero-theme', themes[next]);
  }

  // ── Headshot parallax on scroll ───────────────────────────────
  const heroImg = document.querySelector('.hero-image-wrapper');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          heroImg.style.transform = `translateY(${scrolled * 0.18}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Animate hero title lines in on load ──────────────────────
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-title').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  });

  // ── Scroll reveal ─────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Stagger children ──────────────────────────────────────────
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stagger-child').forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 70);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.reveal-stagger').forEach(el => staggerObserver.observe(el));

});
