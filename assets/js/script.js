'use strict';

/* ============================================
   ANTONY MUTWIRI — PREMIUM PORTFOLIO SCRIPTS
   ============================================ */

/**
 * Header scroll effect
 */
const header = document.querySelector('[data-header]');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

/**
 * Mobile navigation toggle
 */
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('.navbar');

if (navToggleBtn) {
  navToggleBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    // Toggle new mobile taskbar state
    document.body.classList.toggle('taskbar-open');
  });
}

// Close mobile nav on link click
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', () => {
    // Close mobile taskbar when a link is clicked
    navToggleBtn?.classList.remove('active');
    document.body.classList.remove('taskbar-open');
  });
});

/**
 * Active nav link highlighting
 */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (href === 'index.html' && currentPage === '')) {
    link.classList.add('active');
  }
});

/**
 * Scroll reveal animations
 */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/**
 * Skill bars animation
 */
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillObserver.observe(item));

/**
 * Counter animation for stats
 */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function update() {
    start += increment;
    if (start < target) {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '+');
      requestAnimationFrame(update);
    } else {
      el.textContent = target + (el.dataset.suffix || '+');
    }
  }
  
  update();
}

const statNumbers = document.querySelectorAll('[data-counter]');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.counter);
      animateCounter(entry.target, target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

/**
 * Back to top button
 */
const backTopBtn = document.querySelector('[data-back-to-top]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backTopBtn?.classList.add('visible');
  } else {
    backTopBtn?.classList.remove('visible');
  }
});

if (backTopBtn) {
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Magnetic button effect
 */
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;
  
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  wrap.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/**
 * Typing effect for hero
 */
function initTypingEffect() {
  const el = document.querySelector('[data-typing]');
  if (!el) return;
  
  const text = el.dataset.typing;
  const speed = parseInt(el.dataset.typingSpeed) || 80;
  let i = 0;
  
  el.textContent = '';
  el.classList.add('typing-cursor');
  
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Start typing after a short delay
setTimeout(initTypingEffect, 500);

/**
 * Particle background (lightweight)
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 30;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}

initParticles();

/**
 * Parallax effect for images
 */
document.querySelectorAll('[data-parallax]').forEach(el => {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * parseFloat(el.dataset.parallax) * 0.1;
    el.style.transform = `translateY(${rate}px)`;
  });
});

/**
 * Download CV
 */
function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/MWITI ANTONY MUTWIRI cv.pdf';
  link.download = 'MWITI ANTONY MUTWIRI cv.pdf';
  link.click();
}