/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * Main Application Coordinator & Interactive Audio Synthesizer
 */

(function () {
  'use strict';

  // 1. Zero-Dependency Web Audio API Sound Synthesizer
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = false;
    }

    init() {
      if (!this.ctx && typeof AudioContext !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    toggle() {
      this.init();
      this.enabled = !this.enabled;
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.enabled;
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.04) {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Safe fail
      }
    }

    click() {
      this.playTone(880, 'sine', 0.05, 0.03);
    }

    blip() {
      this.playTone(1200, 'triangle', 0.04, 0.02);
    }

    success() {
      if (!this.enabled || !this.ctx) return;
      this.playTone(523.25, 'sine', 0.1, 0.04);
      setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.04), 80);
      setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.05), 160);
    }
  }

  const sfx = new SoundFX();

  // 2. Audio Toggle UI Binding
  function initAudioToggle() {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isEnabled = sfx.toggle();
      btn.innerHTML = isEnabled
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

      if (isEnabled) {
        sfx.success();
        showToast('Futuristic Soundscape: Enabled');
      } else {
        showToast('Soundscape: Muted');
      }
    });

    // Attach sound to interactive buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('button, .btn, .nav-item a, .skill-node, .dept-tab-btn, .filter-btn')) {
        sfx.click();
      }
    });
  }

  // 3. Navbar Sticky Shrink & Scrollspy Active Link
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item a');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Shrink navbar
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scrollspy
      let currentSection = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // 4. Mobile Menu Drawer Toggle
  function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');

    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('mobile-open');
      });
    });
  }

  // 5. Toast Notifications
  function showToast(msg, duration = 3500) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-primary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span style="font-size: 0.88rem; font-weight: 600; color: #ffffff;">${msg}</span>
    `;

    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }
  window.showToast = showToast;

  // 6. Contact Form Submission Handling
  function initContactForm() {
    const form = document.getElementById('uplink-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', 3000);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>Encrypting &amp; Transmitting...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        form.reset();
        sfx.success();
        showToast('Uplink Transmitted! Bharath will review your message promptly.', 4500);
      }, 1000);
    });
  }

  // 7. Modals (Resume & Certificate Preview)
  function initModals() {
    // Resume Modal Triggers
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
    const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

    openResumeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (resumeModal) resumeModal.classList.add('active');
      });
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target === btn || btn.classList.contains('modal-close-btn')) {
          document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('active'));
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('active'));
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initAudioToggle();
    initNavbarScroll();
    initMobileMenu();
    initContactForm();
    initModals();
  });
})();
