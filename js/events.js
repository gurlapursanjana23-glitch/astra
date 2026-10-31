/**
 * IEEE RRCE CONNECTS - Events & Workshops Module
 * Handles Event Catalog, Category Filters, Search, Modal Registration, LocalStorage Persistence & Pass Generation
 */

const defaultEvents = [
  {
    id: 'evt-101',
    name: 'CodeNova 2026: 24-Hour National Collegiate Hackathon',
    category: 'hackathons',
    categoryLabel: 'Hackathon',
    date: 'Nov 28 - 29, 2026',
    time: '09:00 AM IST (24h)',
    venue: 'RRCE Central Computing Center & Innovation Lab',
    status: 'filling-fast',
    statusLabel: 'Filling Fast',
    image: 'assets/images/event_hackathon.jpg',
    description: 'Build production-ready solutions for Smart Cities, Healthcare AI, and Sustainable Clean Tech in an intensive 24-hour sprint. Mentorship by IEEE Bangalore Section experts with a ₹50,000 cash pool.',
    tags: ['Team: 2-4', 'Cash Prize', 'Mentorship', 'Certificates']
  },
  {
    id: 'evt-102',
    name: 'Hands-on Bootcamp: Autonomous Robotics & ROS 2 Navigation',
    category: 'workshops',
    categoryLabel: 'Technical Workshop',
    date: 'Dec 05, 2026',
    time: '10:00 AM - 04:30 PM IST',
    venue: 'Robotics & Automation Lab, Mech-Tech Block 204',
    status: 'open',
    statusLabel: 'Open',
    image: 'assets/images/event_robotics.jpg',
    description: 'Learn Robot Operating System 2 (ROS 2), LiDAR-based 2D SLAM algorithms, and trajectory planning with physical hardware kits. Conducted in partnership with IEEE RAS Chapter.',
    tags: ['Hardware Kits Provided', 'Beginner to Advanced', 'IEEE RAS']
  },
  {
    id: 'evt-103',
    name: 'Interface 2026: Modern Web Architecture & UI/UX Sprint',
    category: 'web-designing',
    categoryLabel: 'Web Designing',
    date: 'Dec 12, 2026',
    time: '02:00 PM - 06:00 PM IST',
    venue: 'CSE Department Lab 3 & Hybrid Online',
    status: 'open',
    statusLabel: 'Open',
    image: 'assets/images/event_webdesign.jpg',
    description: 'Compete in a 4-hour rapid interface design & front-end implementation sprint. Theme announced on the spot. Judged on accessibility, performance, and responsive elegance.',
    tags: ['Individual / Duo', 'Figma to Code', 'Swag Kits']
  },
  {
    id: 'evt-104',
    name: 'AlgoStrike: Inter-College Speed Coding Championship',
    category: 'coding',
    categoryLabel: 'Coding Contest',
    date: 'Dec 18, 2026',
    time: '11:00 AM - 02:00 PM IST',
    venue: 'Online Arena via HackerRank Platform',
    status: 'open',
    statusLabel: 'Open',
    image: 'assets/images/event_coding.jpg',
    description: 'Solve algorithmic challenges, dynamic programming puzzles, and graph theory problems under strict time constraints. High-ranking participants earn IEEE CS badges.',
    tags: ['C++ / Java / Python', 'National Leaderboard', 'Global Badges']
  },
  {
    id: 'evt-105',
    name: 'Distinguished Keynote: Frontiers in Quantum Computing & Edge AI',
    category: 'guest-lectures',
    categoryLabel: 'Guest Lecture',
    date: 'Jan 08, 2027',
    time: '03:00 PM - 05:00 PM IST',
    venue: 'Dr. A.P.J. Abdul Kalam Auditorium, RRCE',
    status: 'open',
    statusLabel: 'Open',
    image: 'assets/images/event_conference.jpg',
    description: 'An interactive seminar by Senior IEEE Fellow & Principal Research Scientist on quantum supremacy, qubits error mitigation, and decentralized Edge computing architectures.',
    tags: ['IEEE Senior Fellow', 'Q&A Session', 'High Tea']
  },
  {
    id: 'evt-106',
    name: 'Industry Seminar: Semiconductor Fab & VLSI Architecture Horizons',
    category: 'seminars',
    categoryLabel: 'Seminar',
    date: 'Jan 22, 2027',
    time: '10:30 AM - 01:30 PM IST',
    venue: 'ECE Seminar Hall, 4th Floor',
    status: 'open',
    statusLabel: 'Open',
    image: 'assets/images/event_vlsi.jpg',
    description: 'Explore the semiconductor fabrication ecosystem in India, chip design methodologies, RISC-V advancements, and career trajectories in microelectronics.',
    tags: ['VLSI / Embedded', 'Industry Networking', 'Career Guidance']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initEventsManager();
});

function initEventsManager() {
  const eventsGrid = document.getElementById('eventsGrid');
  const searchInput = document.getElementById('eventSearchInput');
  const filterButtons = document.querySelectorAll('.event-filter-btn');
  const myRegistrationsBtn = document.getElementById('myRegistrationsBtn');
  const myRegModal = document.getElementById('myRegistrationsModal');
  const regForm = document.getElementById('eventRegistrationForm');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderEvents() {
    if (!eventsGrid) return;

    const filtered = defaultEvents.filter(evt => {
      const matchesCat = activeCategory === 'all' || evt.category === activeCategory;
      const matchesSearch = evt.name.toLowerCase().includes(searchQuery) ||
                            evt.description.toLowerCase().includes(searchQuery) ||
                            evt.venue.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      eventsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <i class="fas fa-calendar-times" style="font-size: 2.2rem; color: var(--primary); margin-bottom: 12px;"></i>
          <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--navy);">No Events Found</h4>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 6px auto 0;">No scheduled sessions match your current filter or search criteria. Try choosing another category.</p>
        </div>
      `;
      return;
    }

    eventsGrid.innerHTML = filtered.map(evt => `
      <article class="event-card" data-category="${evt.category}">
        <div class="event-card-media">
          <img src="${evt.image}" alt="${evt.name} - IEEE RRCE Activity" loading="lazy">
          <div class="event-badge-overlay">
            <span class="badge-tag">${evt.categoryLabel}</span>
            <span class="badge-status ${evt.status}">${evt.statusLabel}</span>
          </div>
        </div>

        <div class="event-card-content">
          <div class="event-meta">
            <span class="event-meta-item"><i class="far fa-calendar-alt" style="color: var(--primary);"></i> ${evt.date}</span>
            <span class="event-meta-item"><i class="far fa-clock" style="color: var(--primary);"></i> ${evt.time}</span>
          </div>

          <h3 class="event-title">${evt.name}</h3>
          <p class="event-description">${evt.description}</p>

          <div class="event-venue">
            <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
            <span>${evt.venue}</span>
          </div>

          <div class="event-card-actions">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Official RRCE Activity</span>
            <button class="btn btn-primary btn-sm" onclick="openEventRegistration('${evt.id}')">
              <i class="fas fa-ticket-alt"></i> Register Now
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderEvents();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderEvents();
    });
  }

  renderEvents();
  updateMyRegistrationsBadge();

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleEventRegistrationSubmit();
    });
  }

  if (myRegistrationsBtn && myRegModal) {
    myRegistrationsBtn.addEventListener('click', () => {
      renderMyRegistrationsList();
      myRegModal.classList.add('active');
    });
  }
}

window.openEventRegistration = function(eventId) {
  const event = defaultEvents.find(e => e.id === eventId);
  if (!event) return;

  const modal = document.getElementById('eventRegModal');
  const eventIdInput = document.getElementById('regEventId');
  const eventNameDisplay = document.getElementById('regEventNameDisplay');
  const eventDateDisplay = document.getElementById('regEventDateDisplay');

  if (eventIdInput) eventIdInput.value = event.id;
  if (eventNameDisplay) eventNameDisplay.textContent = event.name;
  if (eventDateDisplay) eventDateDisplay.textContent = `${event.date} • ${event.time} • ${event.venue}`;

  if (modal) {
    modal.classList.add('active');
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
};

function handleEventRegistrationSubmit() {
  const eventId = document.getElementById('regEventId').value;
  const name = document.getElementById('regStudentName').value.trim();
  const email = document.getElementById('regStudentEmail').value.trim();
  const usn = document.getElementById('regStudentUsn').value.trim();
  const dept = document.getElementById('regStudentDept').value;
  const sem = document.getElementById('regStudentSem').value;
  const phone = document.getElementById('regStudentPhone').value.trim();

  if (!name || !email || !dept || !sem || !phone) {
    showToast('Validation Error', 'Please complete all required registration fields.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Invalid Email', 'Please enter a valid student email address.', 'error');
    return;
  }

  const event = defaultEvents.find(e => e.id === eventId);
  const eventName = event ? event.name : 'IEEE RRCE Event';

  let registrations = JSON.parse(localStorage.getItem('ieee_event_registrations') || '[]');

  const isDuplicate = registrations.some(r => r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase());
  if (isDuplicate) {
    showToast('Already Registered', 'You have already registered for this event with this email address.', 'error');
    return;
  }

  const passCode = `IEEE-RRCE-${Math.floor(1000 + Math.random() * 9000)}`;

  const newReg = {
    passCode,
    eventId,
    eventName,
    name,
    email,
    usn: usn || 'First Year (Pending)',
    dept,
    sem,
    phone,
    timestamp: new Date().toISOString()
  };

  registrations.push(newReg);
  localStorage.setItem('ieee_event_registrations', JSON.stringify(registrations));

  closeModal('eventRegModal');

  const form = document.getElementById('eventRegistrationForm');
  if (form) form.reset();

  showToast('Registration Confirmed!', `You have secured your pass for ${eventName}.`, 'success');

  showDigitalTicketModal(newReg, event);
  updateMyRegistrationsBadge();

  if (window.updateDashboardDynamicStats) {
    window.updateDashboardDynamicStats();
  }
}

function showDigitalTicketModal(reg, event) {
  const modal = document.getElementById('digitalTicketModal');
  if (!modal) return;

  const content = document.getElementById('digitalTicketContent');
  if (content) {
    content.innerHTML = `
      <div class="ticket-pass-box">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--primary); font-weight: 700;">
          IEEE RRCE CONNECTS • Official Event Pass
        </div>
        <div class="ticket-id">${reg.passCode}</div>
        <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-bottom: 6px;">${reg.eventName}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
          <i class="far fa-calendar-check" style="color: var(--primary);"></i> ${event ? event.date : 'Scheduled Session'} | ${event ? event.venue : 'RRCE Campus'}
        </p>

        <div style="background: #FFFFFF; border: 1px solid var(--border-subtle); padding: 16px; border-radius: var(--radius-sm); text-align: left; font-size: 0.88rem; display: flex; flex-direction: column; gap: 8px;">
          <div><strong style="color: var(--navy);">Attendee Name:</strong> ${reg.name}</div>
          <div><strong style="color: var(--navy);">USN:</strong> ${reg.usn}</div>
          <div><strong style="color: var(--navy);">Department:</strong> ${reg.dept} (Semester ${reg.sem})</div>
          <div><strong style="color: var(--navy);">Email:</strong> ${reg.email}</div>
          <div><strong style="color: var(--navy);">Pass Status:</strong> <span style="color: #16A34A; font-weight: 700;">Active & Verified</span></div>
        </div>

        <div style="margin-top: 16px; font-size: 0.78rem; color: var(--text-muted);">
          Please present this entry pass at the branch verification registration desk on event day.
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function updateMyRegistrationsBadge() {
  const badge = document.getElementById('myRegCountBadge');
  const registrations = JSON.parse(localStorage.getItem('ieee_event_registrations') || '[]');
  if (badge) {
    badge.textContent = registrations.length;
    badge.style.display = registrations.length > 0 ? 'inline-block' : 'none';
  }
}

function renderMyRegistrationsList() {
  const container = document.getElementById('myRegistrationsList');
  if (!container) return;

  const registrations = JSON.parse(localStorage.getItem('ieee_event_registrations') || '[]');

  if (registrations.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i class="fas fa-ticket-alt" style="font-size: 2.2rem; color: var(--primary); margin-bottom: 10px;"></i>
        <h4 style="color: var(--navy); font-size: 1.15rem;">No Event Registrations Yet</h4>
        <p style="font-size: 0.9rem; margin-top: 4px;">Explore upcoming technical workshops, hackathons, and lectures to register.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = registrations.map((r, idx) => `
    <div style="background: var(--bg-main); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">${r.passCode}</span>
        <h4 style="font-size: 1rem; color: var(--navy); margin: 3px 0;">${r.eventName}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Attendee: ${r.name} (${r.usn}) • Dept: ${r.dept}</p>
      </div>
      <button class="btn btn-outline btn-sm" onclick="cancelRegistration(${idx})" style="color: #DC2626; border-color: rgba(220, 38, 38, 0.3);">
        <i class="fas fa-times"></i> Cancel
      </button>
    </div>
  `).join('');
}

window.cancelRegistration = function(index) {
  let registrations = JSON.parse(localStorage.getItem('ieee_event_registrations') || '[]');
  if (registrations[index]) {
    const cancelled = registrations.splice(index, 1)[0];
    localStorage.setItem('ieee_event_registrations', JSON.stringify(registrations));
    renderMyRegistrationsList();
    updateMyRegistrationsBadge();
    showToast('Registration Cancelled', `Cancelled entry for ${cancelled.eventName}`, 'info');

    if (window.updateDashboardDynamicStats) {
      window.updateDashboardDynamicStats();
    }
  }
};
