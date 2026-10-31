/**
 * IEEE RRCE CONNECTS - Main Application Logic
 * Handles Sticky Navbar, Mobile Hamburger, Global Search, Lightbox Modal, Toast Notifications, and Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGlobalSearch();
  initBackToTop();
  initLightbox();
});

/* ==========================================================================
   1. Sticky Navbar, Scrollspy & Mobile Hamburger Drawer
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky shadow adjustment on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Scrollspy: update active nav item
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 110;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
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
}

/* ==========================================================================
   2. Global Search Modal (Ctrl + K / Search Icon)
   ========================================================================== */
function initGlobalSearch() {
  const searchBtn = document.getElementById('globalSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('globalSearchInput');
  const searchClose = document.getElementById('searchModalClose');
  const searchResults = document.getElementById('globalSearchResults');

  const searchableIndex = [
    { type: 'Event', title: 'CodeNova 2026 National Collegiate Hackathon', category: 'Hackathons', link: '#events' },
    { type: 'Event', title: 'Hands-on Bootcamp: Autonomous Robotics & ROS 2', category: 'Workshops', link: '#events' },
    { type: 'Event', title: 'Interface 2026: Web Architecture & UI/UX Sprint', category: 'Web Designing', link: '#events' },
    { type: 'Event', title: 'AlgoStrike: Speed Coding Championship', category: 'Coding', link: '#events' },
    { type: 'Event', title: 'Distinguished Keynote: Quantum Computing & Edge AI', category: 'Guest Lectures', link: '#events' },
    { type: 'Chapter', title: 'IEEE Computer Society (CS)', category: 'Technical Society', link: '#chapters' },
    { type: 'Chapter', title: 'Women in Engineering (WIE)', category: 'Affinity Group', link: '#chapters' },
    { type: 'Chapter', title: 'Robotics and Automation Society (RAS)', category: 'Technical Society', link: '#chapters' },
    { type: 'Chapter', title: 'Signal Processing Society (SPS)', category: 'Technical Society', link: '#chapters' },
    { type: 'Chapter', title: 'Industry Applications Society (IAS)', category: 'Technical Society', link: '#chapters' },
    { type: 'Opportunity', title: 'Richard E. Merwin Student Scholarship', category: 'Scholarships', link: '#opportunities' },
    { type: 'Opportunity', title: 'IEEEXtreme 19.0 Global Hackathon', category: 'Hackathons', link: '#opportunities' },
    { type: 'Opportunity', title: 'Edge AI Research Internship Bangalore', category: 'Internships', link: '#opportunities' },
    { type: 'Innovation', title: 'Orion-7 Autonomous Exploration Rover', category: 'Robotics & IoT', link: '#innovations' },
    { type: 'Innovation', title: 'BioVision AI Real-time Pathology Engine', category: 'Artificial Intelligence', link: '#innovations' },
    { type: 'Section', title: 'About IEEE & RRCE Student Branch', category: 'About Us', link: '#about' },
    { type: 'Section', title: 'Student Membership Benefits & Enquiry', category: 'Membership', link: '#membership' },
    { type: 'Section', title: 'Branch Impact Analytics & Accolades', category: 'Achievements', link: '#dashboard' }
  ];

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        renderResults('');
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderResults(e.target.value.trim().toLowerCase());
    });
  }

  function renderResults(query) {
    if (!searchResults) return;

    const filtered = query === ''
      ? searchableIndex.slice(0, 5)
      : searchableIndex.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );

    if (filtered.length === 0) {
      searchResults.innerHTML = `
        <div style="text-align:center; padding: 24px; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 1.8rem; margin-bottom: 8px; color: var(--primary);"></i>
          <p>No matching events, opportunities or projects found.</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = filtered.map(item => `
      <div class="search-result-item" onclick="navigateTo('${item.link}')" style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-radius:var(--radius-md); background:var(--bg-main); border:1px solid var(--border-subtle); cursor:pointer; margin-bottom:8px;">
        <div>
          <span style="font-size:0.75rem; color:var(--primary); font-weight:700; text-transform:uppercase;">${item.type} • ${item.category}</span>
          <h4 style="font-size:0.95rem; font-weight:600; color:var(--navy); margin-top:2px;">${item.title}</h4>
        </div>
        <i class="fas fa-arrow-right" style="color:var(--text-muted); font-size:0.85rem;"></i>
      </div>
    `).join('');
  }
}

window.navigateTo = function(link) {
  const searchModal = document.getElementById('searchModal');
  if (searchModal) searchModal.classList.remove('active');
  const target = document.querySelector(link);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   3. Toast Notification System
   ========================================================================== */
window.showToast = function(title, message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success'
    ? 'fa-check-circle'
    : type === 'error'
    ? 'fa-exclamation-circle'
    : 'fa-info-circle';

  toast.innerHTML = `
    <i class="fas ${iconClass} toast-icon"></i>
    <div class="toast-body">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
    <button class="toast-close-btn" aria-label="Close notification">&times;</button>
  `;

  toast.querySelector('.toast-close-btn').addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4200);
};

/* ==========================================================================
   4. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. Authentic Gallery Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDate = document.getElementById('lightboxDate');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightboxModal) return;

  let currentIndex = 0;
  const items = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src') || item.querySelector('img').src,
    title: item.getAttribute('data-title') || 'IEEE RRCE Activity Showcase',
    category: item.getAttribute('data-category') || 'Branch Activities'
  }));

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = items[currentIndex];
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDate) lightboxDate.textContent = `${item.category} • Photo ${currentIndex + 1} of ${items.length}`;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateLightbox();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateLightbox();
    });
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateLightbox();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % items.length;
      updateLightbox();
    }
  });

  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
