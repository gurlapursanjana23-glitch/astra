/**
 * IEEE RRCE CONNECTS - Dashboard, Innovations & Forms Module
 * Handles Dynamic Statistics Counters, Chart Animations, Student Project Submissions,
 * Working Membership Enquiry, Contact, and Feedback Forms with LocalStorage.
 */

// Default Base Projects with Authentic Engineering Prototypes
const defaultProjects = [
  {
    id: 'proj-1',
    name: 'Orion-7: Autonomous Terrain Exploration Rover',
    category: 'robotics',
    categoryLabel: 'Robotics & Mechatronics',
    techStack: ['ROS 2', 'LiDAR SLAM', 'C++', 'Python', 'ESP32'],
    image: 'assets/images/proj_rover.jpg',
    description: 'An all-terrain hex-wheel autonomous rover equipped with solid-state LiDAR, stereo depth cameras, and onboard neural compute for obstacle avoidance in hazardous environments.',
    team: 'Pavan R., Nayana K., Gagan S. (Dept. of ECE & ME)',
    award: 'Winner: Inter-Collegiate Robotics Cup 2026'
  },
  {
    id: 'proj-2',
    name: 'BioVision AI: Real-time Retinal Pathology Screening',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    techStack: ['PyTorch', 'Vision Transformer', 'FastAPI', 'ONNX', 'WebRTC'],
    image: 'assets/images/proj_ai.jpg',
    description: 'A deep-learning assistive diagnostic pipeline detecting diabetic retinopathy and macular edema from fundus photography with 98.4% validation AUC.',
    team: 'Harshith M., Ananya B. (Dept. of AI&DS)',
    award: 'Best Technical Paper: IEEE Bangalore Section Colloquium'
  },
  {
    id: 'proj-3',
    name: 'AeroMesh: Decentralized IoT Sensor Telemetry Node',
    category: 'iot',
    categoryLabel: 'Internet of Things',
    techStack: ['LoRaWAN', 'FreeRTOS', 'MQTT', 'Rust', 'Docker'],
    image: 'assets/images/proj_iot.jpg',
    description: 'A fault-tolerant mesh communication node for multi-sensor environmental telemetry operations enabling ad-hoc packet routing without cellular infrastructure.',
    team: 'Kiran Kumar, Sneha P. (Dept. of CSE & ISE)',
    award: 'Smart India Hackathon Finalist'
  },
  {
    id: 'proj-4',
    name: 'QuantumKey: Post-Quantum TLS Protocol Simulator',
    category: 'emerging',
    categoryLabel: 'Emerging Technologies',
    techStack: ['Qiskit', 'Kyber-512', 'Python', 'WebAssembly'],
    image: 'assets/images/proj_quantum.jpg',
    description: 'Benchmarking lattice-based post-quantum cryptography algorithms for low-latency browser handshakes resilient against Grover and Shor quantum attacks.',
    team: 'Aditya Rao (Dept. of ISE)',
    award: 'IEEE Student Research Grantee'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initDashboardMetrics();
  initProjectsShowcase();
  initMembershipForm();
  initContactAndFeedback();
});

/* ==========================================================================
   1. Dashboard Dynamic Metrics & Counters
   ========================================================================== */
function initDashboardMetrics() {
  window.updateDashboardDynamicStats = function() {
    const userRegs = JSON.parse(localStorage.getItem('ieee_event_registrations') || '[]');
    const userProjects = JSON.parse(localStorage.getItem('ieee_student_projects') || '[]');
    const userEnquiries = JSON.parse(localStorage.getItem('ieee_membership_enquiries') || '[]');

    const totalEvents = 42;
    const workshopsConducted = 26;
    const studentParticipation = 520 + (userRegs.length * 3) + userEnquiries.length;
    const projectsShowcased = defaultProjects.length + userProjects.length;
    const studentAchievements = 18;

    animateCounter('dashTotalEvents', totalEvents);
    animateCounter('dashWorkshops', workshopsConducted);
    animateCounter('dashParticipation', studentParticipation);
    animateCounter('dashProjects', projectsShowcased);
    animateCounter('dashAchievements', studentAchievements);
  };

  const statsSection = document.getElementById('dashboard');
  if (statsSection) {
    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          window.updateDashboardDynamicStats();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(statsSection);
  }
}

function animateCounter(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const duration = 1500;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + easeOut * (targetValue - start));

    el.textContent = current + '+';

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = targetValue + (targetValue > 100 ? '+' : '');
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   2. Innovations & Student Projects Showcase
   ========================================================================== */
function initProjectsShowcase() {
  const grid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const submitProjectBtn = document.getElementById('submitProjectBtn');
  const projectModal = document.getElementById('submitProjectModal');
  const projectForm = document.getElementById('projectSubmissionForm');

  let activeCategory = 'all';

  function getAllProjects() {
    const userProjects = JSON.parse(localStorage.getItem('ieee_student_projects') || '[]');
    return [...userProjects, ...defaultProjects];
  }

  function renderProjects() {
    if (!grid) return;

    const all = getAllProjects();
    const filtered = activeCategory === 'all'
      ? all
      : all.filter(p => p.category === activeCategory);

    grid.innerHTML = filtered.map(p => `
      <article class="project-card">
        <div class="project-image-box">
          <img src="${p.image}" alt="${p.name} - IEEE RRCE Student Prototype" loading="lazy">
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${p.techStack.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="project-team-lead">
            <strong>Student Team:</strong> ${p.team}
            ${p.award ? `<div style="color: var(--primary); font-size: 0.8rem; margin-top: 4px; font-weight:600;"><i class="fas fa-trophy"></i> ${p.award}</div>` : ''}
          </div>
          <button class="btn btn-outline btn-sm" onclick="viewProjectDetails('${p.id}')">
            <i class="fas fa-eye"></i> View Project Case Study
          </button>
        </div>
      </article>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProjects();
    });
  });

  if (submitProjectBtn && projectModal) {
    submitProjectBtn.addEventListener('click', () => {
      projectModal.classList.add('active');
    });
  }

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('projTitle').value.trim();
      const category = document.getElementById('projCategory').value;
      const techStack = document.getElementById('projTech').value.split(',').map(s => s.trim()).filter(Boolean);
      const description = document.getElementById('projDesc').value.trim();
      const team = document.getElementById('projTeam').value.trim();
      const link = document.getElementById('projLink').value.trim();

      if (!title || !category || !techStack.length || !description || !team) {
        showToast('Validation Error', 'Please complete all project showcase fields.', 'error');
        return;
      }

      const newProject = {
        id: `user-proj-${Date.now()}`,
        name: title,
        category,
        categoryLabel: category.toUpperCase(),
        techStack,
        image: 'assets/images/proj_rover.jpg',
        description,
        team,
        award: 'Student Branch Showcase Feature',
        demoLink: link
      };

      const userProjects = JSON.parse(localStorage.getItem('ieee_student_projects') || '[]');
      userProjects.unshift(newProject);
      localStorage.setItem('ieee_student_projects', JSON.stringify(userProjects));

      closeModal('submitProjectModal');
      projectForm.reset();

      renderProjects();
      showToast('Project Published!', `"${title}" has been published to IEEE RRCE Innovations showcase.`, 'success');

      if (window.updateDashboardDynamicStats) {
        window.updateDashboardDynamicStats();
      }
    });
  }

  renderProjects();
}

window.viewProjectDetails = function(projId) {
  const userProjects = JSON.parse(localStorage.getItem('ieee_student_projects') || '[]');
  const all = [...userProjects, ...defaultProjects];
  const proj = all.find(p => p.id === projId);
  if (!proj) return;

  const modal = document.getElementById('projectDetailModal');
  const content = document.getElementById('projectDetailContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="project-tag" style="color:var(--primary);">${proj.categoryLabel || proj.category.toUpperCase()}</span>
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--navy); margin: 10px 0 6px 0;">${proj.name}</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem;">Engineered by: <strong style="color: var(--navy);">${proj.team}</strong></p>
    </div>

    <div style="height: 220px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
      <img src="${proj.image}" alt="${proj.name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div style="margin-bottom: 18px;">
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Architecture & Technical Implementation</h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">${proj.description}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Hardware / Software Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${proj.techStack.map(t => `<span class="project-tag" style="background: var(--bg-main);">${t}</span>`).join('')}
      </div>
    </div>

    ${proj.award ? `
      <div style="background: #FFFBEB; border-left: 3px solid var(--accent); padding: 12px 16px; border-radius: 4px; margin-bottom: 24px; font-size: 0.88rem; color: #92400E;">
        <i class="fas fa-award"></i> <strong>Recognition:</strong> ${proj.award}
      </div>
    ` : ''}

    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <button class="btn btn-outline" onclick="closeModal('projectDetailModal')">Close</button>
      ${proj.demoLink ? `<a href="${proj.demoLink}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Open Project Source</a>` : ''}
    </div>
  `;

  modal.classList.add('active');
};

/* ==========================================================================
   3. Membership Enquiry Form Handling
   ========================================================================== */
function initMembershipForm() {
  const form = document.getElementById('membershipEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('memName').value.trim();
    const usn = document.getElementById('memUsn').value.trim();
    const dept = document.getElementById('memDept').value;
    const year = document.getElementById('memYear').value;
    const email = document.getElementById('memEmail').value.trim();
    const phone = document.getElementById('memPhone').value.trim();

    if (!name || !dept || !year || !email || !phone) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      showToast('Invalid Phone Number', 'Please enter a valid contact phone number.', 'error');
      return;
    }

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      name,
      usn: usn || 'First Year (Pending)',
      dept,
      year,
      email,
      phone,
      timestamp: new Date().toISOString()
    };

    const enquiries = JSON.parse(localStorage.getItem('ieee_membership_enquiries') || '[]');
    enquiries.push(newEnquiry);
    localStorage.setItem('ieee_membership_enquiries', JSON.stringify(enquiries));

    form.reset();

    showToast('Enquiry Submitted!', `Thank you, ${name}. An IEEE RRCE coordinator will reach out to guide you through registration.`, 'success');

    if (window.updateDashboardDynamicStats) {
      window.updateDashboardDynamicStats();
    }
  });
}

/* ==========================================================================
   4. Contact and Feedback Forms Handling
   ========================================================================== */
function initContactAndFeedback() {
  const tabBtns = document.querySelectorAll('.form-tabs .tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  const starIcons = document.querySelectorAll('#feedbackStarRating i');
  let selectedRating = 5;

  starIcons.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      starIcons.forEach((s, idx) => {
        if (idx < selectedRating) {
          s.classList.add('active', 'fas');
          s.classList.remove('far');
        } else {
          s.classList.remove('active', 'fas');
          s.classList.add('far');
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Required Fields', 'Please complete your name, email, subject, and message.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Invalid Email', 'Please provide a valid email.', 'error');
        return;
      }

      const contactMsg = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      };

      const messages = JSON.parse(localStorage.getItem('ieee_contact_messages') || '[]');
      messages.push(contactMsg);
      localStorage.setItem('ieee_contact_messages', JSON.stringify(messages));

      contactForm.reset();
      showToast('Message Sent', 'Thank you for contacting IEEE RRCE Student Branch. We will reply shortly.', 'success');
    });
  }

  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('feedbackName').value.trim();
      const suggestions = document.getElementById('feedbackSuggestions').value.trim();

      if (!name || !suggestions) {
        showToast('Required Fields', 'Please provide your name and suggestions.', 'error');
        return;
      }

      const feedback = {
        id: `fb-${Date.now()}`,
        name,
        rating: selectedRating,
        suggestions,
        timestamp: new Date().toISOString()
      };

      const feedbacks = JSON.parse(localStorage.getItem('ieee_feedback_submissions') || '[]');
      feedbacks.push(feedback);
      localStorage.setItem('ieee_feedback_submissions', JSON.stringify(feedbacks));

      feedbackForm.reset();
      showToast('Feedback Received', `Thank you for rating us ${selectedRating}/5 stars. Your feedback is appreciated!`, 'success');
    });
  }
}
