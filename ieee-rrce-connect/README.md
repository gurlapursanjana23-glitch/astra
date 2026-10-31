# IEEE RRCE CONNECTS

> **"Connecting Minds. Inspiring Innovation. Engineering the Future."**  
> **Official Student Branch Chapter • IEEE Bangalore Section (STB64091)**  
> **RajaRajeswari College of Engineering (RRCE), Bengaluru, Karnataka**

---

## 🌟 Overview & Institutional Upgrades

**IEEE RRCE CONNECTS** is the upgraded digital platform representing the **IEEE Student Branch at RajaRajeswari College of Engineering (RRCE)**, chartered under the globally renowned **IEEE Bangalore Section (Region 10 – Asia Pacific)**.

This upgrade transitions the website to a **clean, institutional, IEEE technology-focused aesthetic** utilizing:
1. **Official Dual Logos**:
   - **Rajarajeswari College of Engineering (RRCE) Official Logo** (`assets/rrce-college-logo.png`).
   - **IEEE Official Logo** (`assets/ieee-official-logo.png`).
   - Both logos are maintained as separate files, preserved with their exact original proportions and aspect ratios, with zero cropping, distortion, or artificial recreation.
2. **Institutional IEEE Color Palette**:
   - **Primary:** IEEE Blue (`#006699` / `#004d73`)
   - **Dark Navy:** Institutional Navy (`#071B33`)
   - **Accent:** Warm Gold / Amber (`#F5A623`)
   - **Background:** Light Executive Surface (`#F4F7FA` & `#FFFFFF`)
   - **Text:** Slate Primary (`#071B33` & `#475569`)
3. **Authentic Real-World Photography**:
   - Replaced all conceptual images with **authentic, high-resolution photographs** across all sections:
     - **Events:** Real collegiate hackathon tables, university robotics laboratories, engineering auditoriums, design sprints, and electronic prototyping.
     - **Innovations:** Real engineering hardware, autonomous rovers, biomedical imaging setups, and embedded IoT breadboards.
     - **Gallery:** Genuine collegiate workshop collaboration, soldering labs, student presentations to panels, and volunteer committees.

---

## 🌐 Localhost Access Links

The local development server is actively running:

👉 **[http://localhost:5500/](http://localhost:5500/)**  
*(Alternative IP address: [http://127.0.0.1:5500/](http://127.0.0.1:5500/))*

> **Folder Mirror:** You can also access the subfolder at [http://localhost:5500/ieee-rrce-connect/](http://localhost:5500/ieee-rrce-connect/).

---

## 🚀 Running with VS Code Live Server

1. Open Visual Studio Code.
2. Select **File** > **Open Folder...** and choose:
   `c:\Users\HP\Documents\ASTRA WEBSITE IEEE`
3. If not already installed, install the **Live Server** extension by Ritwick Dey from the VS Code Extensions panel (`Ctrl + Shift + X`).
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your browser will automatically open:
   👉 **`http://127.0.0.1:5500/`** or **`http://localhost:5500/`**.

---

## 🧭 Navigation Structure

- **Home (`#home`)**: Full hero section with institutional branding, welcome message, call-to-actions, and live branch impact metrics.
- **About Us (`#about`)**: Introduction to IEEE, IEEE Bangalore Section, RRCE Student Branch, vision & mission, and four core pillars.
- **Events (`#events`)**: Interactive searchable and filterable catalog with modal registration, digital entry pass generation, and "My Registrations" view.
- **Technical Chapters (`#chapters`)**: Confirmed student societies (Computer Society, WIE, Robotics & Automation, Signal Processing, Industry Applications).
- **Innovations (`#innovations`)**: Student engineering prototypes (Orion-7 Autonomous Rover, BioVision AI, AeroMesh IoT Node, QuantumKey TLS) + working project submission modal.
- **Opportunities (`#opportunities`)**: Centralized board for internships, hackathons, research grants, and scholarships with official application links and clear DEMO/VERIFIED tagging.
- **Gallery (`#gallery`)**: Authentic photo showcase with interactive lightbox modal (prev, next, and keyboard navigation).
- **Contact (`#contact`)**: Campus info, RRCE Mysore Road address, verified correspondence email, working Contact form and star-rated Feedback form.

---

## 📁 Project Directory Structure

```
c:\Users\HP\Documents\ASTRA WEBSITE IEEE\
│
├── index.html                 # Semantic HTML5 Master Document (Dual Logos & Navigation)
│
├── css/
│   ├── style.css              # IEEE Institutional Stylesheet & Color Tokens
│   └── responsive.css         # Breakpoint Media Queries (1440px, 768px, 430px, 375px)
│
├── js/
│   ├── main.js                # Navigation, Hamburger, Global Search & Lightbox Modal
│   ├── events.js              # Event Management, Search, Filters, Registration & Tickets
│   ├── opportunities.js       # Opportunity Hub, Deadlines, Bookmarking & Portal Redirects
│   └── dashboard.js           # Live Metrics Animation, Innovations Showcase & Form Handlers
│
├── assets/
│   ├── rrce-college-logo.png  # Official RRCE College Logo (Exact uploaded image)
│   ├── ieee-official-logo.png # Official IEEE Logo (Exact uploaded image)
│   ├── images/
│   │   ├── hero_tech.jpg             # High-Tech Global Communications Network
│   │   ├── event_hackathon.jpg       # Authentic College Hackathon Coding Arena
│   │   ├── event_robotics.jpg        # Authentic Robotics Engineering Laboratory
│   │   ├── event_conference.jpg      # Authentic Engineering Keynote Auditorium
│   │   ├── event_webdesign.jpg       # Authentic Web Architecture & UI/UX Lab
│   │   ├── event_coding.jpg          # Authentic Multi-Monitor Coding Workstation
│   │   ├── event_vlsi.jpg            # Authentic Semiconductor & VLSI Hardware
│   │   ├── proj_rover.jpg            # Authentic Autonomous Terrain Rover Prototype
│   │   ├── proj_ai.jpg               # Authentic Medical Diagnostic AI Workstation
│   │   ├── proj_iot.jpg              # Authentic IoT Microcontroller Breadboard
│   │   ├── proj_quantum.jpg          # Authentic Optics / Quantum Computing Lab
│   │   ├── gallery_discussion.jpg    # Authentic Student Technical Collaboration
│   │   ├── gallery_presentation.jpg  # Authentic Collegiate Project Presentation
│   │   ├── gallery_soldering.jpg     # Authentic Electronics Circuit Soldering
│   │   └── gallery_group.jpg         # Authentic IEEE Student Branch Committee
│   └── icons/
│
├── ieee-rrce-connect/         # Mirrored copy of entire project structure
└── README.md                  # Institutional Documentation & Setup Guide
```

---

## 📱 Responsive Testing Coverage

The layout is tested and validated for zero horizontal overflow:
- **Desktop (1440px)**: Balanced two-logo header lockup, multi-column cards, full-width hero with stats strip.
- **Tablet (768px)**: Optimized grid cards, accessible navigation, balanced image aspect ratios with `object-fit: cover`.
- **Mobile (430px & 375px)**: Compact dual-logo scaling (without distortion or overlapping), functional sliding hamburger drawer, single-column forms and cards.
