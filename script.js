/* ===================================================
   KRISH PORTFOLIO — script.js  (refactored + animated)
=================================================== */

/* ---- Utility ---- */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const isPointerFine = window.matchMedia('(pointer: fine)').matches;

/* ---- Page load entrance ---- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});

/* ---- Custom Cursor (desktop / pointer devices only) ---- */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (isPointerFine && cursor && cursorDot) {
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
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

  qsa('a, button, .acc-head, [data-tilt]').forEach(el => {
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
  const sections = qsa('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  qsa('.nav-link').forEach(link => {
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
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });
}

/* ---- Scroll Reveal ---- */
const revealEls = qsa('.project-card, .why-card, .step, .tl-item, .acc-item, .hero-tags, .about-stat');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Statement word highlight on scroll ---- */
const statementSection = qs('.statement-section');
const words = qsa('.statement-text .word');

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
if (isPointerFine) {
  qsa('[data-tilt]').forEach(card => {
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
qsa('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item     = head.parentElement;
    const isActive = item.classList.contains('active');
    qsa('.acc-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

/* ---- Character eye tracking (pointer only) ---- */
const heroSection   = qs('.hero');
const heroCharacter = qs('.hero-character');

if (heroSection && heroCharacter && isPointerFine) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    heroCharacter.style.transform = `translate(${x}px, ${y}px) rotateY(${x * 0.4}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroCharacter.style.transform = '';
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  // Batman transition for contact links
  if (link.classList.contains('contact-nav-link')) {
    e.preventDefault();
    triggerBatTransition(() => {
      const target = qs(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }

  const target = qs(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ---- Hero parallax ---- */
const heroBgText = qs('.hero-bg-text');
const heroText   = qs('.hero-text');
function heroParallax() {
  const scroll = window.scrollY;
  if (heroBgText) heroBgText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.3}px))`;
  if (heroText)   heroText.style.transform   = `translateY(${scroll * 0.15}px)`;
}

/* ---- Ticker pause on hover ---- */
const ticker = qs('.ticker');
if (ticker) {
  ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
  ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });
}

/* ---- Intersection animations ---- */
function animateOnIntersect(selector, styles, threshold = 0.3) {
  const el = qs(selector);
  if (!el) return;
  Object.assign(el.style, { opacity: '0', transition: 'opacity 0.8s ease, transform 0.8s ease', ...styles.from });
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) Object.assign(el.style, styles.to);
  }, { threshold }).observe(el);
}
animateOnIntersect('.work-big-title', { from: { transform: 'scale(0.8)' }, to: { opacity: '1', transform: 'scale(1)' } });
animateOnIntersect('.about-big',     { from: { transform: 'translateX(-40px)' }, to: { opacity: '1', transform: 'translateX(0)' } });
animateOnIntersect('.services-big',  { from: { transform: 'translateX(-40px)' }, to: { opacity: '1', transform: 'translateX(0)' } });

// Timeline dots
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = 'scale(1.4)';
      setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 300);
    }
  });
}, { threshold: 1 });
qsa('.tl-dot').forEach(dot => { dot.style.transition = 'transform 0.3s ease'; tlObserver.observe(dot); });

// Process steps
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.classList.toggle('show', e.isIntersecting));
}, { threshold: 0.2 });
qsa('.process-section .step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.12}s`;
  processObserver.observe(step);
});

/* ---- Form submit feedback ---- */
const formSubmit = qs('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    const inputs   = qsa('.form-input');
    const hasValue = inputs.some(inp => inp.value.trim());
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

/* ================================================================
   BATMAN BAT SWARM TRANSITION
   Creates a swarm of SVG bats that fly R→L across the screen,
   then reveals the contact section and clears.
================================================================ */

const batOverlay = document.getElementById('bat-overlay');
const batSvg     = document.getElementById('bat-svg');

// Single bat path (simplified silhouette)
function batPath(x, y, scale) {
  const s = scale;
  return `
    <g transform="translate(${x},${y}) scale(${s})" class="bat-unit">
      <path d="
        M 0 0
        C -8 -6, -20 -10, -30 -5
        C -24 -5, -18 -2, -14 4
        C -10 2, -5 0, 0 0
        C 5 0, 10 2, 14 4
        C 18 -2, 24 -5, 30 -5
        C 20 -10, 8 -6, 0 0 Z
      " fill="rgba(0,0,0,0.85)"/>
      <path d="M 0 0 C -2 4, -4 8, -6 10 C -2 8, 0 6, 0 0 C 0 6, 2 8, 6 10 C 4 8, 2 4, 0 0 Z" fill="rgba(0,0,0,0.7)"/>
    </g>`;
}

function createBatSwarm() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const count = 28;
  const bats = [];

  for (let i = 0; i < count; i++) {
    const startX = vw + 60 + Math.random() * 300;
    const startY = Math.random() * vh;
    const scale  = 0.6 + Math.random() * 0.8;
    const id     = `bat-${i}`;

    bats.push({ id, startX, startY, scale });
  }

  // Inject all bats
  batSvg.innerHTML = bats.map(b => `<g id="${b.id}">${batPath(b.startX, b.startY, b.scale)}</g>`).join('');

  return bats;
}

function triggerBatTransition(onComplete) {
  if (!batOverlay) { onComplete && onComplete(); return; }

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onComplete && onComplete();
    return;
  }

  batOverlay.classList.add('active');
  const bats = createBatSwarm();
  const vw   = window.innerWidth;
  const duration = 1400; // ms for a bat to cross screen
  const start    = performance.now();
  let completed  = false;

  // Use WAAPI for GPU-composited transforms
  bats.forEach((b, i) => {
    const el    = document.getElementById(b.id);
    if (!el) return;
    const delay     = i * 55;
    const endX      = -80 - Math.random() * 200;
    const wobbleY   = (Math.random() - 0.5) * 140;
    const wobbleX   = b.startX + (endX - b.startX);
    const endY      = b.startY + wobbleY;
    const wingFlap  = 0.6 + Math.random() * 0.4; // scale flap

    // Flapping via scaleY oscillation
    el.animate([
      { transform: `translate(${b.startX}px, ${b.startY}px) scale(${b.scale})` },
      { transform: `translate(${b.startX + (endX - b.startX) * 0.25}px, ${b.startY - 20}px) scale(${b.scale * 1.0}) scaleY(${wingFlap})` },
      { transform: `translate(${b.startX + (endX - b.startX) * 0.5}px, ${b.startY + 10}px) scale(${b.scale}) scaleY(1)` },
      { transform: `translate(${b.startX + (endX - b.startX) * 0.75}px, ${endY - 15}px) scale(${b.scale}) scaleY(${wingFlap})` },
      { transform: `translate(${endX}px, ${endY}px) scale(${b.scale})` }
    ], {
      duration: duration + Math.random() * 400,
      delay,
      easing: 'ease-in',
      fill: 'forwards'
    });
  });

  // When last bat finishes, scroll and clean up
  const lastDelay = (bats.length - 1) * 55 + duration + 400;
  setTimeout(() => {
    if (!completed) {
      completed = true;
      onComplete && onComplete();
      // Fade out overlay
      batOverlay.style.transition = 'opacity 0.5s ease';
      batOverlay.style.opacity = '0';
      setTimeout(() => {
        batOverlay.classList.remove('active');
        batOverlay.style.opacity = '';
        batOverlay.style.transition = '';
        batSvg.innerHTML = '';
      }, 500);
    }
  }, lastDelay);

  // Halfway through, trigger scroll
  setTimeout(() => {
    onComplete && onComplete();
    completed = true;
  }, lastDelay * 0.45);
}

/* ---- Console branding ---- */
console.log('%c KRISH_AGENT 🔴 ', 'background:#E63329;color:white;font-size:18px;padding:8px 16px;border-radius:4px;font-family:monospace;');
console.log('%c Built with ❤️ by Krishnaa ', 'color:#E63329;font-size:12px;');

/* ================================================================
   AMBIENT BATS — contact section canvas animation
   Bats continuously fly right→left across the contact section
   when the section is visible.
================================================================ */
(function initAmbientBats() {
  const canvas  = document.getElementById('ambientBatsCanvas');
  const section = document.getElementById('contact');
  if (!canvas || !section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, bats = [], running = false, rafId = null;

  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }

  function createBat(immediate) {
    const scale = 0.4 + Math.random() * 0.7;
    return {
      x: immediate ? Math.random() * W : W + 60 + Math.random() * 300,
      y: H * 0.05 + Math.random() * H * 0.75,
      vx: -(1.2 + Math.random() * 1.6) * (scale * 0.9),
      vy: (Math.random() - 0.5) * 0.4,
      scale,
      flap: Math.random() * Math.PI * 2,
      flapSpeed: 0.12 + Math.random() * 0.1,
      alpha: 0.12 + Math.random() * 0.18,
    };
  }

  function drawBat(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(b.scale, b.scale);
    // Wing flap via vertical scale
    const wingY = Math.sin(b.flap) * 0.45 + 0.55;
    ctx.scale(1, wingY);
    ctx.globalAlpha = b.alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    ctx.beginPath();
    // Left wing
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-8, -6, -20, -10, -30, -5);
    ctx.bezierCurveTo(-24, -5, -18, -2, -14, 4);
    ctx.bezierCurveTo(-10, 2, -5, 0, 0, 0);
    // Right wing
    ctx.bezierCurveTo(5, 0, 10, 2, 14, 4);
    ctx.bezierCurveTo(18, -2, 24, -5, 30, -5);
    ctx.bezierCurveTo(20, -10, 8, -6, 0, 0);
    ctx.closePath();
    ctx.fill();
    // Body tail
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-2, 4, -4, 8, -5, 11);
    ctx.bezierCurveTo(-2, 8, 0, 6, 0, 0);
    ctx.bezierCurveTo(0, 6, 2, 8, 5, 11);
    ctx.bezierCurveTo(4, 8, 2, 4, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    bats.forEach(b => {
      b.x     += b.vx;
      b.y     += b.vy;
      b.flap  += b.flapSpeed;
      // Gentle sine drift
      b.y += Math.sin(b.flap * 0.5) * 0.3;
      drawBat(b);
    });

    // Remove off-screen bats and spawn new ones
    bats = bats.filter(b => b.x > -100);
    if (bats.length < 14) bats.push(createBat(false));

    rafId = requestAnimationFrame(tick);
  }

  function startBats() {
    if (running) return;
    running = true;
    resize();
    // Pre-populate with bats already on screen
    for (let i = 0; i < 10; i++) bats.push(createBat(true));
    tick();
  }

  function stopBats() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    ctx.clearRect(0, 0, W, H);
    bats = [];
  }

  // Start/stop based on section visibility
  const batObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) startBats();
    else stopBats();
  }, { threshold: 0.05 });

  batObserver.observe(section);
  window.addEventListener('resize', () => { if (running) resize(); });
})();