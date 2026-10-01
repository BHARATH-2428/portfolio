/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * Interactive Analyst Command Console (Terminal)
 */

(function () {
  'use strict';

  function initTerminal() {
    const screen = document.getElementById('terminal-screen');
    const input = document.getElementById('terminal-input');
    if (!screen || !input) return;

    const COMMANDS = {
      help: () => [
        'Available Telemetry Commands:',
        '  <span class="mono" style="color:var(--cyan-primary)">skills</span>      - List core technical stack & analytical competencies',
        '  <span class="mono" style="color:var(--cyan-primary)">projects</span>    - List featured data analytics repositories',
        '  <span class="mono" style="color:var(--cyan-primary)">education</span>   - Display academic background and graduation timeline',
        '  <span class="mono" style="color:var(--cyan-primary)">contact</span>     - View communication endpoints and email uplink',
        '  <span class="mono" style="color:var(--cyan-primary)">resume</span>      - Open interactive resume preview modal',
        '  <span class="mono" style="color:var(--cyan-primary)">stats</span>       - Display real-time data universe metrics',
        '  <span class="mono" style="color:var(--cyan-primary)">clear</span>       - Clear console output stream',
      ],
      skills: () => [
        'Core Analytical Competencies:',
        '  • Languages & DBs: Python (Pandas, NumPy, Scikit-learn), SQL (PostgreSQL, MySQL)',
        '  • BI & Storytelling: Microsoft Power BI, Tableau, Advanced Excel, DAX',
        '  • Methodologies: Exploratory Data Analysis (EDA), Statistical Hypothesis Testing, Data Cleaning',
        '  • Tooling: Git, GitHub, VS Code, Jupyter Notebooks',
      ],
      projects: () => [
        'Featured Analytics Repositories:',
        '  1. [ATTRITION] Employee Turnover Drivers & Predictive Retention Dashboard',
        '  2. [RFM-SEGMENT] E-Commerce Customer Lifetime Value & Behavioral Cohorts',
        '  3. [SUPPLY-CHAIN] Regional Logistics OTIF Delivery Bottleneck Optimizer',
        'Type "open attrition" or click the project cards above for live interactive dashboards.',
      ],
      education: () => [
        'Academic Background:',
        '  • Degree: Bachelor of Technology / Engineering in Information Technology (Final Year)',
        '  • Focus: Data Analytics & Enterprise Business Intelligence',
        '  • Expected Graduation: 2026',
        '  • Status: Actively interviewing for Data Analyst & BI Specialist roles',
      ],
      contact: () => [
        'Direct Communication Uplink:',
        '  • Email: bharath.analytics@outlook.com',
        '  • LinkedIn: linkedin.com/in/bharath-sr',
        '  • GitHub: github.com/bharath-sr',
        '  • Location: India (Open to Remote & On-Site)',
      ],
      resume: () => {
        const resumeModal = document.getElementById('resume-modal');
        if (resumeModal) resumeModal.classList.add('active');
        return ['Initiating resume preview stream...'];
      },
      stats: () => [
        'System Telemetry Readout:',
        '  • Rows Cleaned & Reshaped: 120,000+',
        '  • Models Evaluated: Random Forest, Logistic Reg, K-Means Clustering',
        '  • Visual Encodings Built: 15+ Interactive Power BI & Tableau Dashboards',
        '  • Zero-Gravity Physics Loop: Operational (60 FPS)',
      ],
      clear: () => {
        screen.innerHTML = '';
        return [];
      },
    };

    function appendLine(text, className = 'output') {
      const line = document.createElement('div');
      line.className = `term-line ${className}`;
      line.innerHTML = text;
      screen.appendChild(line);
      screen.scrollTop = screen.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = input.value.trim();
        input.value = '';
        if (!rawCmd) return;

        appendLine(`bharath@data-core:~$ ${rawCmd}`, 'user-cmd');

        const cmdKey = rawCmd.toLowerCase();
        if (COMMANDS[cmdKey]) {
          const results = COMMANDS[cmdKey]();
          results.forEach((res) => appendLine(res, 'output'));
        } else {
          appendLine(`Command not found: "${rawCmd}". Type <span style="color:var(--cyan-primary)">help</span> for available commands.`, 'output');
        }
      }
    });
  }

  window.addEventListener('DOMContentLoaded', initTerminal);
})();
