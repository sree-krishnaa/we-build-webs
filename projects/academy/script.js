/* =============================================
   ARCHITECT PORTFOLIO — script.js
   Handles: nav scroll, scroll-reveal,
            counter animation, mobile menu,
            form submit, parallax hover
   ============================================= */

(function () {
  'use strict';

  /* ---- Helpers ---- */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


  /* ================================================
     1. NAV — shrink on scroll
     ================================================ */
  const nav = qs('#nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ================================================
     2. MOBILE NAV TOGGLE
     ================================================ */
  const navToggle = qs('#navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a link is clicked
  qsa('.nav-links a, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ================================================
     3. SCROLL-REVEAL (IntersectionObserver)
     ================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = qsa('.reveal', entry.target.parentElement);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.08}s`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  qsa('.reveal').forEach(el => revealObserver.observe(el));


  /* ================================================
     4. COUNTER ANIMATION
     ================================================ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  qsa('.stat-num').forEach(el => counterObserver.observe(el));


  /* ================================================
     5. HERO SPHERE — subtle mouse parallax
     ================================================ */
  const heroSphere = qs('.hero-sphere');
  if (heroSphere) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;   // -1 … 1
      const dy = (e.clientY - cy) / cy;
      heroSphere.style.transform =
        `translate(${dx * 18}px, ${dy * 12}px)`;
    }, { passive: true });
  }


  /* ================================================
     6. GEO BLOCKS — staggered hover tilt
     ================================================ */
  const geoBlocks = qsa('.geo-block');
  geoBlocks.forEach((block, i) => {
    block.addEventListener('mouseenter', () => {
      block.style.transform = `translateY(-8px) rotate(${(i % 2 === 0 ? 1 : -1) * 2}deg)`;
      block.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1)';
    });
    block.addEventListener('mouseleave', () => {
      block.style.transform = '';
    });
  });


  /* ================================================
     7. PORTFOLIO CARDS — subtle 3-D tilt on hover
     ================================================ */
  const projCards = qsa('.proj-card');
  projCards.forEach(card => {
    const thumb = qs('.proj-thumb', card);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;  // -1 … 1
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      thumb.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      thumb.style.transform = '';
      thumb.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => {
      thumb.style.transition = 'transform 0.1s linear';
    });
  });


  /* ================================================
     8. PHILOSOPHY SPHERE — scroll-driven rotation
     ================================================ */
  const philoSection = qs('.philosophy');
  const philoArcs    = qsa('.philo-arc');

  if (philoSection && philoArcs.length) {
    window.addEventListener('scroll', () => {
      const rect = philoSection.getBoundingClientRect();
      const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
      const angle = progress * 20;
      philoArcs.forEach((arc, i) => {
        arc.style.transform = `translateX(-50%) rotate(${angle + i * 3}deg)`;
      });
    }, { passive: true });
  }


  /* ================================================
     9. COLOR STRIPES — interactive expand
     ================================================ */
  const stripes = qsa('.color-stripe');
  stripes.forEach(stripe => {
    stripe.addEventListener('mouseenter', () => {
      stripes.forEach(s => {
        s.style.flex = s === stripe ? '4' : '0.6';
        s.style.transition = 'flex 0.4s cubic-bezier(0.16,1,0.3,1)';
      });
    });
  });

  qs('.about-color-block')?.addEventListener('mouseleave', () => {
    stripes.forEach(s => { s.style.flex = '1'; });
  });


  /* ================================================
     10. CONTACT FORM — fake submit with animation
     ================================================ */
  const form        = qs('#contactForm');
  const formSuccess = qs('#formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = qs('button[type="submit"]', form);

      // Loading state
      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.background = 'var(--terra)';

      setTimeout(() => {
        btn.style.display = 'none';
        formSuccess.classList.add('visible');
        form.reset();
      }, 1400);
    });
  }


  /* ================================================
     11. SMOOTH SCROLL — native + fallback offset
         (accounts for fixed nav height)
     ================================================ */
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav.getBoundingClientRect().height;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ================================================
     12. HERO SPHERE ARCS — entrance stagger
         (re-triggers if user scrolls back to top)
     ================================================ */
  const heroSection = qs('.hero');
  const heroArcs    = qsa('.sphere-arc');
  let arcAnimated   = false;

  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !arcAnimated) {
        arcAnimated = true;
        heroArcs.forEach((arc, i) => {
          arc.style.animationDelay = `${0.1 + i * 0.12}s`;
          arc.style.animationPlayState = 'running';
        });
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) heroObserver.observe(heroSection);


  /* ================================================
     13. ACTIVE NAV HIGHLIGHT on scroll
     ================================================ */
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--green)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ================================================
     14. PAGE LOAD — fade in body
     ================================================ */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();