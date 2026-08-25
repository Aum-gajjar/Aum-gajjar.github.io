/* ==========================================================================
   AUM GAJJAR // GLOBAL APP & NAVIGATION CONTROLLER
   ========================================================================== */

(function() {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT)
  // --------------------------------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlRoot = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlRoot.setAttribute('data-theme', 'light');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '☀️';
        btn.setAttribute('title', 'Switch to Dark Mode');
      });
    } else {
      htmlRoot.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '🌙';
        btn.setAttribute('title', 'Switch to Light Mode');
      });
    }
    localStorage.setItem('aum_portfolio_theme', theme);
  }

  window.toggleAppTheme = function() {
    const isLight = htmlRoot.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  };

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', window.toggleAppTheme);
  });

  // Load saved preference
  const savedTheme = localStorage.getItem('aum_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  // --------------------------------------------------------------------------
  // 2. ACTIVE NAVIGATION HIGHLIGHTER (MULTI-PAGE)
  // --------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --------------------------------------------------------------------------
  // 4. LIVE TELEMETRY PUNCH-CARD
  // --------------------------------------------------------------------------
  const punchCardContainer = document.getElementById('punch-card');
  if (punchCardContainer) {
    punchCardContainer.innerHTML = '';
    const activityLevels = [
      1, 2, 0, 3, 2, 1, 0,
      2, 3, 3, 1, 2, 0, 1,
      3, 2, 3, 3, 2, 1, 2,
      2, 3, 1, 2, 3, 2, 3
    ];

    activityLevels.forEach((lvl, i) => {
      const cell = document.createElement('div');
      cell.className = 'punch-cell';
      if (lvl === 1) cell.classList.add('lvl-1');
      else if (lvl === 2) cell.classList.add('lvl-2');
      else if (lvl === 3) cell.classList.add('lvl-3');
      
      cell.setAttribute('title', `Day ${i + 1}: ${lvl === 0 ? 'No queries' : lvl * 4 + ' queries & commits'}`);
      punchCardContainer.appendChild(cell);
    });
  }

  // --------------------------------------------------------------------------
  // 5. COPY TO CLIPBOARD HELPER (WITH ROBUST FALLBACK)
  // --------------------------------------------------------------------------
  window.copyToClipboard = function(text, elementId) {
    function showSuccess() {
      const el = document.getElementById(elementId);
      if (el) {
        const originalText = el.innerHTML;
        el.innerHTML = `✔ Copied!`;
        el.style.borderColor = 'var(--accent-primary)';
        el.style.color = 'var(--accent-primary)';
        
        setTimeout(() => {
          el.innerHTML = originalText;
          el.style.borderColor = '';
          el.style.color = '';
        }, 2000);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(() => {
        fallbackCopy(text, showSuccess);
      });
    } else {
      fallbackCopy(text, showSuccess);
    }

    function fallbackCopy(str, cb) {
      const textArea = document.createElement('textarea');
      textArea.value = str;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        cb();
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM HANDLER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.innerHTML = `<span style="color: var(--accent-danger);">Please fill in all required fields.</span>`;
        }
        return;
      }

      if (formFeedback) {
        formFeedback.innerHTML = `<span style="color: var(--accent-primary);">Connecting to mail client...</span>`;
      }

      setTimeout(() => {
        const mailtoUrl = `mailto:aumgajjar456@gmail.com?subject=${encodeURIComponent(`Data Analyst Opportunity / Inquiry from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;

        if (formFeedback) {
          formFeedback.innerHTML = `<span style="color: var(--accent-success);">✔ Mail transmission initialized! You can also email directly at <a href="mailto:aumgajjar456@gmail.com" class="text-accent underline font-semibold">aumgajjar456@gmail.com</a></span>`;
        }
        contactForm.reset();
      }, 500);
    });
  }

  // --------------------------------------------------------------------------
  // 7. LIGHTBOX MODAL HANDLER
  // --------------------------------------------------------------------------
  window.openMediaModal = function(src, title) {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-dialog" onclick="event.stopPropagation()">
          <div class="lightbox-header">
            <div class="font-heading font-bold text-white text-sm" id="lightbox-title">Credential Verification</div>
            <button class="lightbox-close" onclick="closeMediaModal()" aria-label="Close Preview">&times;</button>
          </div>
          <div class="lightbox-body">
            <img id="lightbox-img" src="" alt="Certificate / Award Preview">
          </div>
        </div>
      `;
      modal.addEventListener('click', window.closeMediaModal);
      document.body.appendChild(modal);
    }

    const modalTitle = document.getElementById('lightbox-title');
    const modalImg = document.getElementById('lightbox-img');
    if (modalTitle) modalTitle.textContent = title || 'Credential Verification';
    if (modalImg) modalImg.src = src;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeMediaModal = function() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeMediaModal();
    }
  });

})();
