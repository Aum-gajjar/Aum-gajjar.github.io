/* ==========================================================================
   APP CORE LOGIC // AUM GAJJAR DATA PORTFOLIO
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
  // 2. LIVE PUNCH-CARD (GITHUB COMMIT FREQUENCY SIMULATOR)
  // --------------------------------------------------------------------------
  const punchCardContainer = document.getElementById('punch-card');
  if (punchCardContainer) {
    punchCardContainer.innerHTML = '';
    // 28 days of activity
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
      
      cell.setAttribute('title', `Day ${i + 1}: ${lvl === 0 ? 'No commits' : lvl * 3 + ' commits/queries'}`);
      punchCardContainer.appendChild(cell);
    });
  }

  // --------------------------------------------------------------------------
  // 3. STICKY NAV SCROLL SPY & ACTIVE HIGHLIGHT
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation();

  // --------------------------------------------------------------------------
  // 4. MOBILE DRAWER MENU
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. LIVE BI DASHBOARDS TAB SWITCHER
  // --------------------------------------------------------------------------
  const dashTabs = document.querySelectorAll('.dash-tab-btn');
  const dashViews = document.querySelectorAll('.dash-view-content');
  const dashTitle = document.getElementById('active-dash-title');
  const dashDesc = document.getElementById('active-dash-desc');
  const dashBadge = document.getElementById('active-dash-badge');

  const dashMeta = {
    'dash-sales': {
      title: 'Executive Sales & Operations KPI Dashboard',
      desc: 'Enterprise Power BI report tracking 12 operational KPIs, revenue run rate, regional variance, and inventory turnover across 30,000 monthly transactions.',
      badge: 'Power BI // DirectQuery'
    },
    'dash-health': {
      title: 'Clinical Healthcare & 30-Day Readmission Analytics',
      desc: 'Comprehensive hospital analytics dashboard displaying patient cohort demographics, readmission risk heatmaps, and length-of-stay distribution.',
      badge: 'Tableau // Clinical Data'
    },
    'dash-supply': {
      title: 'Cloud ETL Telemetry & Logistics Pipeline Performance',
      desc: 'Real-time operational monitoring dashboard visualizing Amazon Athena query latency, S3 ingestion batch volumes, and daily anomaly flags.',
      badge: 'Power BI // AWS Athena'
    }
  };

  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      dashTabs.forEach(t => {
        t.classList.remove('btn-sys-solid');
        t.classList.add('btn-sys-secondary');
      });
      tab.classList.remove('btn-sys-secondary');
      tab.classList.add('btn-sys-solid');

      dashViews.forEach(v => {
        v.classList.add('hidden');
        if (v.id === target) {
          v.classList.remove('hidden');
        }
      });

      if (dashMeta[target]) {
        if (dashTitle) dashTitle.textContent = dashMeta[target].title;
        if (dashDesc) dashDesc.textContent = dashMeta[target].desc;
        if (dashBadge) dashBadge.textContent = dashMeta[target].badge;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. COPY TO CLIPBOARD HELPER
  // --------------------------------------------------------------------------
  window.copyToClipboard = function(text, elementId, defaultLabel) {
    navigator.clipboard.writeText(text).then(() => {
      const el = document.getElementById(elementId);
      if (el) {
        const originalText = el.innerHTML;
        el.innerHTML = `✔ COPIED!`;
        el.style.borderColor = 'var(--sys-blue)';
        el.style.color = 'var(--sys-blue)';
        
        setTimeout(() => {
          el.innerHTML = originalText;
          el.style.borderColor = '';
          el.style.color = '';
        }, 2000);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM HANDLER
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
          formFeedback.innerHTML = `<span style="color: var(--sys-accent-red);">[!] Please fill in all transmission fields.</span>`;
        }
        return;
      }

      // Simulate packet transmission and offer mailto
      if (formFeedback) {
        formFeedback.innerHTML = `<span style="color: var(--sys-blue);">[TRANSMITTING] Connecting to aumgajjar456@gmail.com...</span>`;
      }

      setTimeout(() => {
        const mailtoUrl = `mailto:aumgajjar456@gmail.com?subject=${encodeURIComponent(`Data Analyst Inquiry from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.location.href = mailtoUrl;

        if (formFeedback) {
          formFeedback.innerHTML = `<span style="color: var(--sys-accent-green);">✔ Packet initialized! Opening mail client. Or reach directly at <a href="mailto:aumgajjar456@gmail.com" style="color: var(--sys-blue); text-decoration: underline;">aumgajjar456@gmail.com</a></span>`;
        }
        contactForm.reset();
      }, 700);
    });
  }

})();
