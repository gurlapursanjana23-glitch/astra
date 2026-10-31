/**
 * IEEE RRCE CONNECTS - Opportunity Hub Module
 * Centralized platform for Internships, Hackathons, Research, Scholarships, Competitions & Conferences
 */

const sampleOpportunities = [
  {
    id: 'opp-1',
    title: 'IEEE Computer Society Richard E. Merwin Student Scholarship',
    category: 'scholarships',
    categoryLabel: 'Scholarship',
    organization: 'IEEE Computer Society Global',
    badgeType: 'VERIFIED IEEE OPPORTUNITY',
    deadline: '2026-12-15',
    deadlineFormatted: 'Dec 15, 2026',
    daysLeft: 45,
    perks: '$1,000 USD Grant',
    eligibility: 'Active IEEE & IEEE-CS Student Members with GPA >= 2.5 / 4.0',
    description: 'Recognizes and rewards active student leaders who demonstrate exemplary technical involvement and volunteer contributions in IEEE Computer Society Student Branch Chapters.',
    applyUrl: 'https://www.computer.org/volunteering/awards/scholarships/merwin',
    location: 'Global / Virtual'
  },
  {
    id: 'opp-2',
    title: 'IEEEXtreme 19.0 Global 24-Hour Virtual Hackathon',
    category: 'hackathons',
    categoryLabel: 'Hackathon',
    organization: 'IEEE MGA Student Activities',
    badgeType: 'VERIFIED IEEE OPPORTUNITY',
    deadline: '2026-11-20',
    deadlineFormatted: 'Nov 20, 2026',
    daysLeft: 20,
    perks: 'Sponsored Trip to IEEE Conference & Tech Kits',
    eligibility: 'Teams of up to 3 active IEEE Student Members proctored by RRCE Branch Counselor',
    description: 'A global virtual challenge in which student branches worldwide compete against each other to solve a set of algorithmic problems within a continuous 24-hour window.',
    applyUrl: 'https://ieeextreme.org/',
    location: 'Worldwide Virtual Arena'
  },
  {
    id: 'opp-3',
    title: 'Summer Research Internship: Edge AI & Embedded Machine Learning',
    category: 'internships',
    categoryLabel: 'Internship',
    organization: 'IEEE Bangalore Section & Partner R&D Labs',
    badgeType: 'DEMO DATA - STUDENT SAMPLE',
    deadline: '2026-12-30',
    deadlineFormatted: 'Dec 30, 2026',
    daysLeft: 60,
    perks: '₹25,000 / month Stipend + Co-authorship in IEEE Paper',
    eligibility: 'Pre-final & Final year CSE/ISE/ECE students with PyTorch/TensorFlow and C++ expertise',
    description: 'Work alongside industry mentors on TinyML models deployed onto ARM Cortex-M microcontrollers for real-time acoustic anomaly detection and drone telemetry.',
    applyUrl: 'https://ieeebangalore.org/',
    location: 'Bengaluru Tech Corridor / Hybrid'
  },
  {
    id: 'opp-4',
    title: 'IEEE Region 10 Student Paper Presentation Contest 2026',
    category: 'research',
    categoryLabel: 'Research Opportunity',
    organization: 'IEEE Asia-Pacific (Region 10)',
    badgeType: 'VERIFIED IEEE OPPORTUNITY',
    deadline: '2027-01-15',
    deadlineFormatted: 'Jan 15, 2027',
    daysLeft: 76,
    perks: 'Publication in IEEE Xplore & Cash Awards',
    eligibility: 'Original undergraduate and postgraduate engineering research papers',
    description: 'Submit technical research in Sustainable Energy, Computer Vision, Signal Intelligence, or Robotics. Finalists present virtually to the Asia-Pacific IEEE panel.',
    applyUrl: 'https://www.ieeer10.org/',
    location: 'Region 10 / Virtual'
  },
  {
    id: 'opp-5',
    title: 'National Autonomous Robotics Cup: RoboSprint 2026',
    category: 'competitions',
    categoryLabel: 'Competition',
    organization: 'IEEE Robotics & Automation Society (RAS)',
    badgeType: 'DEMO DATA - STUDENT SAMPLE',
    deadline: '2026-11-25',
    deadlineFormatted: 'Nov 25, 2026',
    daysLeft: 25,
    perks: '₹1,00,000 Total Prize Pool',
    eligibility: 'Interdisciplinary college teams (2-5 members)',
    description: 'Design, fabricate, and program autonomous rovers capable of obstacle traversal, visual line tracking, and dynamic beacon discovery without manual interference.',
    applyUrl: 'https://www.ieee-ras.org/',
    location: 'Bengaluru, India'
  },
  {
    id: 'opp-6',
    title: 'IEEE WIE Leadership & Mentorship Fellowship 2026',
    category: 'workshops',
    categoryLabel: 'Fellowship',
    organization: 'IEEE Women in Engineering (WIE)',
    badgeType: 'VERIFIED IEEE OPPORTUNITY',
    deadline: '2026-12-10',
    deadlineFormatted: 'Dec 10, 2026',
    daysLeft: 40,
    perks: 'Executive 1-on-1 Mentorship & Funded Conference Passes',
    eligibility: 'Female undergraduate engineering students across all semesters',
    description: 'A dedicated 6-month mentorship initiative connecting women in STEM with senior engineering directors, leadership masterclasses, and executive project grants.',
    applyUrl: 'https://wie.ieee.org/',
    location: 'Bengaluru / Hybrid'
  },
  {
    id: 'opp-7',
    title: 'IEEE International Conference on Emerging Technologies (ICET 2027)',
    category: 'conferences',
    categoryLabel: 'Conference',
    organization: 'IEEE Bangalore Section & Technical Co-Sponsors',
    badgeType: 'DEMO DATA - STUDENT SAMPLE',
    deadline: '2027-02-05',
    deadlineFormatted: 'Feb 05, 2027',
    daysLeft: 97,
    perks: 'Scopus Indexed Proceedings & Student Travel Grants',
    eligibility: 'Student researchers, academicians, and startup innovators',
    description: 'Flagship conference convening world-class researchers in Generative AI, 6G Wireless communications, Cyber-Physical Systems, and Quantum Cryptography.',
    applyUrl: 'https://ieeebangalore.org/',
    location: 'Bengaluru Convention Hall'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initOpportunities();
});

function initOpportunities() {
  const oppGrid = document.getElementById('opportunitiesGrid');
  const searchInput = document.getElementById('oppSearchInput');
  const catFilter = document.getElementById('oppCategoryFilter');
  const deadlineFilter = document.getElementById('oppDeadlineFilter');
  const savedToggleBtn = document.getElementById('oppSavedToggleBtn');

  let activeCat = 'all';
  let activeDeadline = 'all';
  let searchQuery = '';
  let showOnlySaved = false;

  function renderOpportunities() {
    if (!oppGrid) return;

    const savedIds = JSON.parse(localStorage.getItem('ieee_saved_opportunities') || '[]');

    const filtered = sampleOpportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchQuery) ||
                            opp.organization.toLowerCase().includes(searchQuery) ||
                            opp.description.toLowerCase().includes(searchQuery) ||
                            opp.perks.toLowerCase().includes(searchQuery);

      const matchesCat = activeCat === 'all' || opp.category === activeCat;

      let matchesDeadline = true;
      if (activeDeadline === 'closing-soon') {
        matchesDeadline = opp.daysLeft <= 30;
      } else if (activeDeadline === 'grants') {
        matchesDeadline = opp.perks.includes('$') || opp.perks.includes('₹');
      }

      const matchesSaved = !showOnlySaved || savedIds.includes(opp.id);

      return matchesSearch && matchesCat && matchesDeadline && matchesSaved;
    });

    if (filtered.length === 0) {
      oppGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <i class="fas fa-briefcase" style="font-size: 2.2rem; color: var(--primary); margin-bottom: 12px;"></i>
          <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--navy);">No Opportunities Found</h4>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 6px auto 0;">
            ${showOnlySaved ? 'You have not bookmarked any opportunities yet. Click the bookmark icon on any card to save it.' : 'No opportunities match your current filters. Try adjusting your query.'}
          </p>
        </div>
      `;
      return;
    }

    oppGrid.innerHTML = filtered.map(opp => {
      const isSaved = savedIds.includes(opp.id);
      return `
        <article class="opp-card" data-category="${opp.category}">
          <div class="opp-card-header">
            <div>
              <span class="opp-type-badge">${opp.categoryLabel}</span>
              <span style="display:block; font-size: 0.68rem; font-weight:700; color:${opp.badgeType.includes('DEMO') ? '#D97706' : '#059669'}; margin-top:4px;">${opp.badgeType}</span>
            </div>
            <button class="opp-save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveOpportunity('${opp.id}')" title="${isSaved ? 'Remove from saved' : 'Save opportunity'}" aria-label="Save opportunity">
              <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
            </button>
          </div>

          <h3>${opp.title}</h3>
          <div class="opp-org-name">
            <i class="fas fa-building"></i> ${opp.organization}
          </div>

          <p>${opp.description}</p>

          <div class="opp-meta-box">
            <div class="opp-meta-col">
              <small>Deadline</small>
              <span style="color: ${opp.daysLeft <= 25 ? '#E65100' : 'var(--navy)'};">
                <i class="far fa-clock"></i> ${opp.deadlineFormatted} (${opp.daysLeft}d left)
              </span>
            </div>
            <div class="opp-meta-col">
              <small>Perk / Award</small>
              <span style="color: #059669;">${opp.perks.split('+')[0]}</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: auto;">
            <button class="btn btn-outline btn-sm" onclick="openOpportunityDetails('${opp.id}')" style="flex: 1;">
              <i class="fas fa-info-circle"></i> Details
            </button>
            <button class="btn btn-primary btn-sm" onclick="applyOpportunity('${opp.id}')" style="flex: 1;">
              <i class="fas fa-external-link-alt"></i> Apply Now
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderOpportunities();
    });
  }

  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      activeCat = e.target.value;
      renderOpportunities();
    });
  }

  if (deadlineFilter) {
    deadlineFilter.addEventListener('change', (e) => {
      activeDeadline = e.target.value;
      renderOpportunities();
    });
  }

  if (savedToggleBtn) {
    savedToggleBtn.addEventListener('click', () => {
      showOnlySaved = !showOnlySaved;
      savedToggleBtn.classList.toggle('active', showOnlySaved);
      if (showOnlySaved) {
        savedToggleBtn.innerHTML = '<i class="fas fa-bookmark"></i> Showing Saved';
      } else {
        savedToggleBtn.innerHTML = '<i class="far fa-bookmark"></i> View Saved';
      }
      renderOpportunities();
    });
  }

  renderOpportunities();
}

window.toggleSaveOpportunity = function(oppId) {
  let saved = JSON.parse(localStorage.getItem('ieee_saved_opportunities') || '[]');
  const opp = sampleOpportunities.find(o => o.id === oppId);
  const title = opp ? opp.title : 'Opportunity';

  if (saved.includes(oppId)) {
    saved = saved.filter(id => id !== oppId);
    localStorage.setItem('ieee_saved_opportunities', JSON.stringify(saved));
    showToast('Bookmark Removed', `Removed ${title} from saved items.`, 'info');
  } else {
    saved.push(oppId);
    localStorage.setItem('ieee_saved_opportunities', JSON.stringify(saved));
    showToast('Saved to Favourites', `Added ${title} to your opportunity shortlist.`, 'success');
  }

  const searchInput = document.getElementById('oppSearchInput');
  if (searchInput) searchInput.dispatchEvent(new Event('input'));
};

window.openOpportunityDetails = function(oppId) {
  const opp = sampleOpportunities.find(o => o.id === oppId);
  if (!opp) return;

  const modal = document.getElementById('opportunityDetailModal');
  const content = document.getElementById('oppModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="opp-type-badge">${opp.categoryLabel}</span>
      <span style="font-size:0.75rem; font-weight:700; color:${opp.badgeType.includes('DEMO') ? '#D97706' : '#059669'}; margin-left:8px;">${opp.badgeType}</span>
      <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--navy); margin: 12px 0 6px 0;">${opp.title}</h3>
      <div style="color: var(--primary); font-weight: 600; font-size: 0.95rem;">
        <i class="fas fa-building"></i> ${opp.organization} • <i class="fas fa-map-marker-alt"></i> ${opp.location}
      </div>
    </div>

    <div style="background: var(--bg-main); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <div>
        <small style="color: var(--text-muted); text-transform: uppercase; font-weight: 600; font-size: 0.72rem;">Application Deadline</small>
        <div style="font-weight: 700; color: var(--navy); margin-top: 2px;">
          <i class="far fa-calendar-alt" style="color: var(--primary);"></i> ${opp.deadlineFormatted}
        </div>
      </div>
      <div>
        <small style="color: var(--text-muted); text-transform: uppercase; font-weight: 600; font-size: 0.72rem;">Award / Grant Value</small>
        <div style="font-weight: 700; color: #059669; margin-top: 2px;">
          <i class="fas fa-gift"></i> ${opp.perks}
        </div>
      </div>
    </div>

    <div style="margin-bottom: 18px;">
      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: var(--navy);">Program Overview</h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">${opp.description}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: var(--navy);">Eligibility Requirements</h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; background: var(--bg-main); padding: 12px 16px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
        ${opp.eligibility}
      </p>
    </div>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="btn btn-outline" onclick="closeModal('opportunityDetailModal')">Close</button>
      <button class="btn btn-primary" onclick="applyOpportunity('${opp.id}')">
        <i class="fas fa-external-link-alt"></i> Proceed to Application
      </button>
    </div>
  `;

  modal.classList.add('active');
};

window.applyOpportunity = function(oppId) {
  const opp = sampleOpportunities.find(o => o.id === oppId);
  if (!opp) return;

  if (opp.applyUrl && opp.applyUrl !== '#') {
    window.open(opp.applyUrl, '_blank', 'noopener,noreferrer');
    showToast('Redirecting', `Opening official application portal for ${opp.organization}...`, 'info');
  } else {
    showToast('Application Portal', `RRCE internal endorsement portal is open for ${opp.title}. Contact IEEE Branch Counselor for nomination paperwork.`, 'info');
  }
};
