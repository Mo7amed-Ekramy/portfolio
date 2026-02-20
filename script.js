/* ============================================================
   PORTFOLIO JAVASCRIPT
   Mohamed Ekramy | Interactive Logic
   ============================================================ */

/* ------ Typed Text Effect ------ */
const phrases = [
  'Software Engineer',
  'React Developer',
  'Problem Solver',
  'Full-Stack Enthusiast',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 800);
});

/* ------ Navbar: Scroll & Active Links ------ */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNavbar() {
  // Scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section highlight
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ------ Mobile Hamburger ------ */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
  document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

// Close on link click
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ------ Scroll Reveal Animation ------ */
const revealElements = document.querySelectorAll(
  '.skill-category, .project-card, .timeline-card, .lang-card, .contact-card, .about-grid, .about-facts, .projects-more'
);

// Add reveal class dynamically
revealElements.forEach((el) => {
  el.classList.add('reveal');
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => observer.observe(el));

/* ------ Stagger delay for grid items ------ */
function applyStagger(selector, delayStep = 80) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * delayStep}ms`;
  });
}

applyStagger('.skill-category', 80);
applyStagger('.contact-card', 80);
applyStagger('.lang-card', 60);
applyStagger('.timeline-card', 100);

/* ------ Smooth active link on scroll (enhanced) ------ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ------ Parallax glow effect on hero ------ */
const glow1 = document.querySelector('.hero-glow-1');
const glow2 = document.querySelector('.hero-glow-2');

document.addEventListener('mousemove', (e) => {
  if (!glow1 || !glow2) return;
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glow1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  glow2.style.transform = `translate(${-x * 15}px, ${-y * 15}px)`;
});

/* ------ Skill tag hover ripple ------ */
document.querySelectorAll('.skill-tag').forEach((tag) => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => { tag.style.transform = ''; }, 150);
  });
});

/* ------ Nav logo easter egg ------ */
const navLogo = document.querySelector('.nav-logo');
let clickCount = 0;
navLogo.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= 5) {
    clickCount = 0;
    document.documentElement.style.setProperty('--accent-primary', '#10b981');
    document.documentElement.style.setProperty('--accent-secondary', '#34d399');
    setTimeout(() => {
      document.documentElement.style.removeProperty('--accent-primary');
      document.documentElement.style.removeProperty('--accent-secondary');
    }, 3000);
  }
});

/* ------ Year in footer ------ */
const footerYear = document.querySelector('.footer-text');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}
