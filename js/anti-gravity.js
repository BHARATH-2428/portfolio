/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * Physics & Floating Interaction Engine
 */

(function () {
  'use strict';

  // Global cursor coordinate state
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    speed: 0.12,
  };

  // 1. Initialize Magnetic Zero-Gravity Custom Cursor
  function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.id = 'cursor-aura';

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    dot.id = 'cursor-core';

    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let curX = mouse.x;
    let curY = mouse.y;

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    function renderCursor() {
      curX += (mouse.targetX - curX) * mouse.speed;
      curY += (mouse.targetY - curY) * mouse.speed;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover detection for interactive targets
    const interactives = 'a, button, .tilt-card, .skill-node, .pipeline-step-item, .dept-tab-btn, .filter-btn, input, textarea';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactives)) {
        cursor.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactives)) {
        cursor.classList.remove('hovering');
      }
    });
  }

  // 2. 3D Tilt Cards with Specular Lighting & Gravity Reaction
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card, .holo-id-card, .telemetry-card');

    cards.forEach((card) => {
      // Ensure glare overlay exists
      if (!card.querySelector('.tilt-card-glare') && !card.classList.contains('holo-id-card')) {
        const glare = document.createElement('div');
        glare.className = 'tilt-card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        // Update glare coordinates
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // 3. Subtle Zero-Gravity Ambient Parallax Floating
  function initAmbientFloatParallax() {
    const floaters = document.querySelectorAll('.hero-floating-card, .telemetry-card, .ambient-orb');

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      floaters.forEach((el, idx) => {
        const factor = (idx % 3 + 1) * 12;
        const moveX = normX * factor;
        const moveY = normY * factor;
        el.style.setProperty('--parallax-x', `${moveX}px`);
        el.style.setProperty('--parallax-y', `${moveY}px`);
      });
    });
  }

  // 4. Background Starfield & Space Dust Particles Canvas
  function initSpaceBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'universe-stars-canvas';
    canvas.id = 'space-dust-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const numParticles = Math.min(100, Math.floor(window.innerWidth / 14));
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.35 - 0.05,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.4 ? '0, 242, 254' : '168, 85, 247',
      });
    }

    function animateSpaceDust() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
        ctx.fill();
      }

      requestAnimationFrame(animateSpaceDust);
    }
    animateSpaceDust();
  }

  // 5. Scroll Reveal Observer
  function initScrollReveals() {
    const revealTargets = document.querySelectorAll(
      '.section-header, .about-grid, .skills-ecosystem-stage, .project-card, .pipeline-container, .timeline-node, .cert-card, .contact-wrapper'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  // Self Initialization
  window.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initTiltCards();
    initAmbientFloatParallax();
    initSpaceBackground();
    initScrollReveals();
  });
})();
