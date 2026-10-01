# Bharath S. R — Anti-Gravity Data Universe Portfolio

An ultra-premium, futuristic personal portfolio website engineered for **Bharath S. R**, a final-year Information Technology student specializing in **Data Analytics & Business Intelligence**.

Built with a bespoke **"Anti-Gravity Data Universe"** aesthetic, featuring real-time 3D WebGL rendering, physics-inspired zero-gravity floating UI, interactive data visualization pipelines, and live in-card telemetry dashboards.

---

## 🚀 Live Preview & Local Execution

### Option 1: PowerShell Local Server (Included)
Run the provided lightweight local server:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Option 2: Direct Browser Launch
Because this website is crafted with modern standard HTML5, Vanilla CSS, and JavaScript (ES6+), you can also simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Brave, or Firefox.

### Option 3: Deploy to the Web (1-Click)
- **GitHub Pages**: Push this repository to GitHub, go to **Settings → Pages**, and select `Deploy from a branch (main / root)`.
- **Vercel / Netlify**: Drag-and-drop the portfolio folder directly into the dashboard for an instant worldwide CDN deployment with custom domain support.

---

## 🌌 Architectural Highlights

### 1. 3D WebGL Anti-Gravity Hero Centerpiece (`js/three-scene.js`)
- **Transparent Frosted Glass Data Core**: Dynamic 3D Icosahedron/Sphere geometry with refractive glass physics.
- **Orbital Telemetry Rings**: Dual glowing cyan and violet orbits carrying moving data packets.
- **Interconnected Neural Mesh**: 38 floating data nodes connected with real-time glowing line segments.
- **Orbiting 3D Mini Bar Chart**: 3D data bars revolving smoothly in zero gravity.
- **Gravitational Mouse Parallax**: Smooth damping and inertia that tilts the 3D core in response to cursor movement.

### 2. Interactive 3D Skill Celestial Ecosystem (`js/skills-ecosystem.js`)
- Replaces static progress bars with a dynamic celestial network.
- Central pulsing core: **`DATA ANALYTICS`**.
- 12 orbiting skill nodes: `Python`, `SQL`, `Power BI`, `Tableau`, `Excel`, `Pandas`, `NumPy`, `Matplotlib`, `Data Cleaning`, `Exploratory Data Analysis`, `Data Visualization`, `Git/GitHub`.
- Category filters (`All`, `Languages & DB`, `BI & Dashboards`, `Data Science`, `Visualization`, `Workflow`).
- Real-time Canvas line drawing and interactive detail inspector drawer with code syntax snippets.

### 3. Flagship Project: Employee Attrition & Retention Dashboard (`js/project-dashboards.js`)
- Includes an **interactive in-card dashboard preview**:
  - Filterable department tabs (`All Depts`, `R&D`, `Sales`, `Human Resources`).
  - Dynamic KPI cards with live rate calculations and benchmark comparisons.
  - Interactive turnover driver bars with animated risk distributions.

### 4. "DATA → INSIGHT" 5-Stage Transformation Pipeline (`js/data-pipeline.js`)
- Visualizes Bharath's end-to-end analytical workflow:
  1. `RAW DATA` (Chaotic streaming unformatted data stream, nulls, noise)
  2. `CLEANING & PREP` (Imputation, deduplication, schema normalization)
  3. `ANALYSIS & MODELING` (Statistical distributions, correlation matrix, hypothesis testing)
  4. `VISUALIZATION` (High-dimensional multi-axis Canvas chart with interactive crosshair)
  5. `INSIGHTS & DECISIONS` (Executive recommendations, ROI uplift, automated triggers)

### 5. Holographic 3D ID Profile Card
- 3D perspective mouse tilt with dynamic sheen reflection.
- Holographic scanline animation.
- Three glowing tags: `"IT STUDENT"`, `"DATA ANALYTICS"`, `"PROBLEM SOLVING"`.

### 6. Analyst Telemetry Console (Terminal) (`js/terminal.js`)
- Interactive command-line terminal for recruiters and tech leads.
- Try commands: `help`, `skills`, `projects`, `education`, `stats`, `contact`, `resume`, `clear`.

### 7. Zero-Dependency Ambient Soundscape (`js/main.js`)
- Built using the native **Web Audio API** (no external audio files needed).
- Fully toggleable via the speaker icon in the navigation bar.

---

## 📁 Repository Structure

```
portfolio/
├── index.html               # Semantic HTML5 markup, accessibility & SEO tags
├── serve.ps1                # Lightweight PowerShell .NET static HTTP server
├── README.md                # Documentation & deployment guide
├── css/
│   ├── style.css            # Design tokens, typography, dark space aesthetic, glassmorphism
│   └── components.css       # Navigation, Hero, Skills stage, Projects, Pipeline, Terminal, Modals
└── js/
    ├── anti-gravity.js      # Physics loop, magnetic cursor, 3D card tilt, space dust canvas
    ├── three-scene.js       # Three.js 3D WebGL floating data intelligence system
    ├── skills-ecosystem.js  # Interactive 3D skill network & line-drawing canvas
    ├── project-dashboards.js # Live interactive mini dashboards (Attrition, RFM, Supply Chain)
    ├── data-pipeline.js     # DATA → INSIGHT 5-stage transformation sequence
    ├── terminal.js          # Interactive analyst command terminal
    └── main.js              # Web Audio synthesizer, scrollspy, contact form, modal handlers
```

---

## 🎨 Customizing Content

- **Contact Email**: Update `bharath.analytics@outlook.com` in `index.html` and `js/terminal.js` with your active email address.
- **Social Links**: Replace placeholder links for LinkedIn and GitHub in `index.html`.
- **Resume**: Replace the modal summary or link a direct PDF file into the download button.
