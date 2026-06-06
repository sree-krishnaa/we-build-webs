/* ===================================================
   KRISH PORTFOLIO — script.js  (cleaned & optimised)
=================================================== */

/* ---- Custom Cursor (desktop / pointer devices only) ---- */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (window.matchMedia('(pointer: fine)').matches && cursor && cursorDot) {
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  (function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .acc-head, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'translate(-50%, -50%) scale(1.6)';
      cursor.style.background  = 'rgba(230,51,41,0.15)';
      cursor.style.borderColor = 'var(--red)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
      cursor.style.background  = 'transparent';
      cursor.style.borderColor = 'var(--red)';
    });
  });
}

/* ---- Navbar scroll + active link ---- */
const navbar = document.getElementById('navbar');

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
  highlightWords();
  heroParallax();
}, { passive: true });

/* ---- Mobile menu toggle ---- */
const menuBtn  = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    menuBtn.textContent = open ? '✕' : '☰';
    menuBtn.setAttribute('aria-label', open ? 'Close Menu' : 'Open Menu');
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });
}

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll(
  '.project-card, .why-card, .step, .tl-item, .acc-item, .hero-tags, .about-stat'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
});

new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 }).observe
  ? (() => {
      const ro = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.12 });
      revealEls.forEach(el => ro.observe(el));
    })()
  : revealEls.forEach(el => el.classList.add('visible')); // fallback

/* ---- Statement word highlight on scroll ---- */
const statementSection = document.querySelector('.statement-section');
const words = document.querySelectorAll('.statement-text .word');

function highlightWords() {
  if (!statementSection) return;
  const rect     = statementSection.getBoundingClientRect();
  const progress = 1 - rect.bottom / (window.innerHeight + rect.height);
  const highlight = Math.floor(progress * words.length * 1.4);
  words.forEach((w, i) => {
    if (w.classList.contains('dim')) {
      w.style.color = i < highlight ? 'rgba(255,255,255,0.7)' : '';
    }
  });
}

/* ---- 3D Tilt on project cards (pointer devices only) ---- */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease'; });
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6;
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

/* ---- Accordion ---- */
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item     = head.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

/* ---- Character eye tracking (pointer only) ---- */
const heroSection  = document.querySelector('.hero');
const heroCharacter = document.querySelector('.hero-character');

if (heroSection && heroCharacter && window.matchMedia('(pointer: fine)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    heroCharacter.style.transform = `translate(${x}px, ${y}px) rotateY(${x * 0.4}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroCharacter.style.transform = '';
  });
}

/* ---- Pager clock ---- */
const pagerTime = document.getElementById('pager-time');
function updatePagerClock() {
  if (!pagerTime) return;
  const now  = new Date();
  let h      = now.getHours();
  const m    = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  pagerTime.textContent = `${h}:${m} ${ampm}`;
}
updatePagerClock();
setInterval(updatePagerClock, 60000);

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Hero parallax ---- */
const heroBgText = document.querySelector('.hero-bg-text');
const heroText   = document.querySelector('.hero-text');
function heroParallax() {
  const scroll = window.scrollY;
  if (heroBgText) heroBgText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.3}px))`;
  if (heroText)   heroText.style.transform   = `translateY(${scroll * 0.15}px)`;
}

/* ---- Ticker pause on hover ---- */
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
  ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });
}

/* ---- Intersection animations ---- */
// Work big title
const workBigTitle = document.querySelector('.work-big-title');
if (workBigTitle) {
  workBigTitle.style.cssText += 'opacity:0;transform:scale(0.8);transition:opacity 0.8s ease,transform 0.8s cubic-bezier(0.175,0.885,0.32,1.275)';
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { workBigTitle.style.opacity='1'; workBigTitle.style.transform='scale(1)'; }
  }, { threshold: 0.3 }).observe(workBigTitle);
}

// About big title
const aboutBig = document.querySelector('.about-big');
if (aboutBig) {
  aboutBig.style.cssText += 'opacity:0;transform:translateX(-40px);transition:opacity 0.8s ease,transform 0.8s ease';
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { aboutBig.style.opacity='1'; aboutBig.style.transform='translateX(0)'; }
  }, { threshold: 0.3 }).observe(aboutBig);
}

// Services big title
const servicesBig = document.querySelector('.services-big');
if (servicesBig) {
  servicesBig.style.cssText += 'opacity:0;transform:translateX(-40px);transition:opacity 0.8s ease,transform 0.8s ease';
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { servicesBig.style.opacity='1'; servicesBig.style.transform='translateX(0)'; }
  }, { threshold: 0.3 }).observe(servicesBig);
}

// Timeline dots
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = 'scale(1.4)';
      setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 300);
    }
  });
}, { threshold: 1 });
document.querySelectorAll('.tl-dot').forEach(dot => {
  dot.style.transition = 'transform 0.3s ease';
  tlObserver.observe(dot);
});

// Process steps
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('show', e.isIntersecting);
  });
}, { threshold: 0.2 });
document.querySelectorAll('.process-section .step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.12}s`;
  processObserver.observe(step);
});

/* ---- Pager screen flicker ---- */
const pagerScreen = document.querySelector('.pager-screen');
if (pagerScreen) {
  setInterval(() => {
    pagerScreen.style.opacity = '0.85';
    setTimeout(() => { pagerScreen.style.opacity = '1'; }, 80);
  }, 4000);
}

/* ---- Form submit ---- */
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    const inputs   = document.querySelectorAll('.form-input');
    const hasValue = [...inputs].some(inp => inp.value.trim());
    if (hasValue) {
      formSubmit.textContent = 'Message Sent! ✓';
      formSubmit.style.background = '#22c55e';
      setTimeout(() => {
        formSubmit.textContent = 'Send Project Details ↗';
        formSubmit.style.background = '';
        inputs.forEach(inp => inp.value = '');
      }, 3000);
    }
  });
}

/* ---- Page load entrance ---- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});

/* ---- Console branding ---- */
console.log('%c KRISH_AGENT 🔴 ', 'background:#E63329;color:white;font-size:18px;padding:8px 16px;border-radius:4px;font-family:monospace;');
console.log('%c Built with ❤️ by Krishnaa ', 'color:#E63329;font-size:12px;');