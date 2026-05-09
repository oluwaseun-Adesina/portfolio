/* =============================================
   NAVIGATION
   ============================================= */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* =============================================
   TYPED EFFECT
   ============================================= */
const words = ['web.', 'future.', 'people.', 'startups.'];
let wordIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = words[wordIndex];
  typedEl.textContent = deleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  let delay = deleting ? 60 : 110;

  if (!deleting && charIndex > current.length) {
    deleting = true;
    delay = 1800;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

/* =============================================
   GRID CANVAS BACKGROUND
   ============================================= */
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 60;
  ctx.strokeStyle = 'rgba(99,102,241,0.15)';
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= canvas.width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // dots at intersections
  ctx.fillStyle = 'rgba(99,102,241,0.3)';
  for (let x = 0; x <= canvas.width; x += size) {
    for (let y = 0; y <= canvas.height; y += size) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
drawGrid();

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve so bars animate every time
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* =============================================
   SMOOTH NAV LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* =============================================
   CONTACT FORM
   ============================================= */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    formSuccess.classList.add('visible');
    form.reset();
    setTimeout(() => {
      btn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon">→</span>';
      btn.disabled = false;
      formSuccess.classList.remove('visible');
    }, 4000);
  }, 1200);
});

/* =============================================
   FOOTER YEAR
   ============================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =============================================
   MOUSE PARALLAX ON HERO ORBS
   ============================================= */
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
