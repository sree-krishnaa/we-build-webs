/* ══════════════════════════════════════════
   WE BUILD WEBS — script.js
   ══════════════════════════════════════════ */

'use strict';

/* ─── Page Loader ──────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ─── Custom Cursor ────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth lagging ring
(function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// Expand cursor on interactive elements
const interactives = 'a, button, [data-cursor]';
document.addEventListener('mouseover', e => {
  if (e.target.closest(interactives)) {
    cursor.classList.add('expanded');
    cursorRing.classList.add('expanded');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(interactives)) {
    cursor.classList.remove('expanded');
    cursorRing.classList.remove('expanded');
  }
});

/* ─── Navbar: Scroll & Active Link ─────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled shadow
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active section highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + current
    );
  });
}, { passive: true });

/* ─── Mobile Menu ──────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Scroll Reveal ─────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || 0);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, delay);
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ─── Accordion ─────────────────────────────── */
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    const item   = head.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* ─── Hero Visual Parallax ─────────────────── */
const heroVisual = document.querySelector('.hero-visual');
const phoneFrame = document.getElementById('phoneFrame');

if (heroVisual && phoneFrame) {
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth  - 0.5) * 16;
    const dy = (e.clientY / window.innerHeight - 0.5) * 10;
    heroVisual.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  // Slight tilt on phone hover
  phoneFrame.addEventListener('mousemove', e => {
    const rect = phoneFrame.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top  + rect.height / 2;
    const rotX = ((e.clientY - cy) / rect.height) * -10;
    const rotY = ((e.clientX - cx) / rect.width)  *  10;
    phoneFrame.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  phoneFrame.addEventListener('mouseleave', () => {
    phoneFrame.style.transform = '';
  });
}

/* ─── Shoot Tag Easter Egg ─────────────────── */
const shootTag = document.getElementById('shootTag');
if (shootTag) {
  let clicked = false;
  shootTag.addEventListener('click', () => {
    if (clicked) return;
    clicked = true;
    shootTag.textContent = '🕷 THWIP!';
    shootTag.style.background = 'var(--accent)';
    shootTag.style.color       = '#fff';
    setTimeout(() => {
      shootTag.textContent = 'CLICK TO WEB SHOOT';
      shootTag.style.background = '#fff';
      shootTag.style.color       = 'var(--accent)';
      clicked = false;
    }, 1400);
  });
}

/* ─── Animated Counters ─────────────────────── */
function animateCounter(el, target, suffix) {
  let start     = 0;
  const duration = 1200;
  const step      = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count);
    const suffix = el.innerHTML.match(/<span>(.*?)<\/span>/)?.[1] || '';
    if (!isNaN(target)) {
      animateCounter(el, target, `<span>${suffix}</span>`);
    }
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  counterObserver.observe(el);
});

/* ─── Contact Form Feedback ─────────────────── */
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-input');
    let hasContent = false;
    inputs.forEach(input => {
      if (input.value.trim()) hasContent = true;
    });

    if (!hasContent) {
      // Shake effect
      const box = document.querySelector('.contact-box');
      box.style.animation = 'none';
      void box.offsetHeight;
      box.style.animation = 'shake 0.4s ease';
      return;
    }

    // Success state
    submitBtn.innerHTML = '✓ Message Sent!';
    submitBtn.style.background    = '#22c55e';
    submitBtn.style.pointerEvents = 'none';
    setTimeout(() => {
      submitBtn.innerHTML = 'Let\'s Talk <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      submitBtn.style.background    = '#fff';
      submitBtn.style.pointerEvents = '';
      inputs.forEach(input => { input.value = ''; });
    }, 2500);
  });
}

/* ─── Shake Animation (added via JS) ─────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

/* ─── Smooth Nav Scroll (offset fix) ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Ticker: Pause on Hover (CSS handles it,
       but also clone for seamless loop) ─────── */
const ticker = document.querySelector('.ticker');
if (ticker) {
  // Ensure seamless infinite scroll
  const clone = ticker.cloneNode(true);
  ticker.parentNode.appendChild(clone);
}
if ('ontouchstart' in window) {
  document.getElementById('cursor').style.display = 'none';
  document.getElementById('cursor-ring').style.display = 'none';
  document.body.style.cursor = 'auto';
}