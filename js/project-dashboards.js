/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * Interactive In-Card Project Dashboards & Telemetry Explorers
 */

(function () {
  'use strict';

  // 1. Employee Attrition Project Dataset & Logic
  const ATTRITION_DATA = {
    all: {
      rate: '16.1%',
      headcount: '1,470',
      tenure: '3.2 yrs',
      rateDelta: '+2.4% vs industry',
      drivers: [
        { label: 'Frequent Overtime Hours (>15h/wk)', pct: 84, level: 'high' },
        { label: 'Salary Stagnation in Tier 1/2', pct: 68, level: 'high' },
        { label: 'Commute Distance > 18 km', pct: 52, level: 'med' },
        { label: 'Tenure Vulnerability Window (Year 2)', pct: 41, level: 'med' },
        { label: 'Promotion Latency (>3.5 yrs)', pct: 28, level: 'low' },
      ],
    },
    rd: {
      rate: '13.8%',
      headcount: '961',
      tenure: '3.8 yrs',
      rateDelta: '-1.2% healthy',
      drivers: [
        { label: 'Sprint Fatigue & Overtime Workload', pct: 76, level: 'high' },
        { label: 'Limited Technical Lateral Mobility', pct: 58, level: 'med' },
        { label: 'Patent / Research Recognition Gap', pct: 44, level: 'med' },
        { label: 'Commute Distance > 18 km', pct: 36, level: 'low' },
        { label: 'Competitive Tech Offer Poaching', pct: 25, level: 'low' },
      ],
    },
    sales: {
      rate: '20.6%',
      headcount: '446',
      tenure: '2.4 yrs',
      rateDelta: '+6.1% critical risk',
      drivers: [
        { label: 'Quota Pressure & Commission Slump', pct: 92, level: 'high' },
        { label: 'Domestic Travel Fatigue (>40%)', pct: 81, level: 'high' },
        { label: 'Territory Reallocation Dissatisfaction', pct: 64, level: 'med' },
        { label: 'First-Year Rep Ramp Burnout', pct: 53, level: 'med' },
        { label: 'Base Pay Competitiveness', pct: 35, level: 'low' },
      ],
    },
    hr: {
      rate: '19.0%',
      headcount: '63',
      tenure: '2.9 yrs',
      rateDelta: '+4.5% elevated',
      drivers: [
        { label: 'Repetitive Manual Compliance Load', pct: 79, level: 'high' },
        { label: 'Department Leadership Reorganization', pct: 62, level: 'med' },
        { label: 'Career Growth Ceiling in SMB Unit', pct: 55, level: 'med' },
        { label: 'Competitive Agency Poaching', pct: 40, level: 'low' },
        { label: 'Tools Modernization Latency', pct: 22, level: 'low' },
      ],
    },
  };

  function initAttritionDashboard() {
    const tabs = document.querySelectorAll('.dept-tab-btn');
    const rateEl = document.getElementById('kpi-attrition-rate');
    const headcountEl = document.getElementById('kpi-headcount');
    const tenureEl = document.getElementById('kpi-tenure');
    const deltaEl = document.getElementById('kpi-rate-delta');
    const driversContainer = document.getElementById('attrition-drivers-list');

    if (!tabs.length || !rateEl || !driversContainer) return;

    function renderDept(deptKey) {
      const data = ATTRITION_DATA[deptKey] || ATTRITION_DATA.all;

      // Update KPI numbers
      rateEl.textContent = data.rate;
      headcountEl.textContent = data.headcount;
      tenureEl.textContent = data.tenure;

      if (deltaEl) {
        deltaEl.textContent = data.rateDelta;
        deltaEl.className = 'dash-kpi-delta ' + (data.rateDelta.includes('+') ? 'negative' : 'positive');
      }

      // Re-render driver bars
      driversContainer.innerHTML = '';
      data.drivers.forEach((driver) => {
        const item = document.createElement('div');
        item.className = 'driver-bar-item';

        item.innerHTML = `
          <div class="driver-bar-meta">
            <span>${driver.label}</span>
            <span class="mono">${driver.pct}%</span>
          </div>
          <div class="driver-track">
            <div class="driver-fill ${driver.level}" style="width: 0%"></div>
          </div>
        `;
        driversContainer.appendChild(item);

        // Animate width
        setTimeout(() => {
          const fill = item.querySelector('.driver-fill');
          if (fill) fill.style.width = `${driver.pct}%`;
        }, 50);
      });
    }

    // Tab Clicks
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const dept = tab.dataset.dept;
        renderDept(dept);
      });
    });

    // Default Render
    renderDept('all');
  }

  // 2. RFM Customer Segmentation Interactive Preview
  const RFM_DATA = {
    champions: { share: '14.8%', revenue: '54.2%', aov: '$342', strategy: 'VIP Retention, Early Access' },
    loyal: { share: '24.1%', revenue: '28.6%', aov: '$189', strategy: 'Upsell premium tier, loyalty points' },
    atrisk: { share: '32.5%', revenue: '12.4%', aov: '$94', strategy: 'Reactivation discount, win-back sequence' },
    hibernating: { share: '28.6%', revenue: '4.8%', aov: '$46', strategy: 'Low-cost automated email sweep' },
  };

  function initRfmMiniWidget() {
    const rTabs = document.querySelectorAll('.rfm-tab-btn');
    const shareEl = document.getElementById('rfm-share');
    const revEl = document.getElementById('rfm-rev');
    const stratEl = document.getElementById('rfm-strategy');

    if (!rTabs.length || !shareEl) return;

    rTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        rTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const segment = tab.dataset.segment;
        const d = RFM_DATA[segment];
        if (d) {
          shareEl.textContent = d.share;
          revEl.textContent = d.revenue;
          if (stratEl) stratEl.textContent = d.strategy;
        }
      });
    });
  }

  // 3. Supply Chain OTIF Logistics Interactive Preview
  const LOGISTICS_DATA = {
    north: { otif: '94.2%', leadtime: '1.8 Days', transitRisk: 'Low (0.8%)' },
    south: { otif: '88.5%', leadtime: '2.6 Days', transitRisk: 'Moderate (2.4%)' },
    east: { otif: '81.4%', leadtime: '3.4 Days', transitRisk: 'High (5.1% - Route 4 Bottleneck)' },
    west: { otif: '92.0%', leadtime: '2.1 Days', transitRisk: 'Low (1.1%)' },
  };

  function initLogisticsMiniWidget() {
    const lTabs = document.querySelectorAll('.logistics-tab-btn');
    const otifEl = document.getElementById('logistics-otif');
    const leadEl = document.getElementById('logistics-lead');
    const riskEl = document.getElementById('logistics-risk');

    if (!lTabs.length || !otifEl) return;

    lTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        lTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const region = tab.dataset.region;
        const d = LOGISTICS_DATA[region];
        if (d) {
          otifEl.textContent = d.otif;
          leadEl.textContent = d.leadtime;
          if (riskEl) riskEl.textContent = d.transitRisk;
        }
      });
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initAttritionDashboard();
    initRfmMiniWidget();
    initLogisticsMiniWidget();
  });
})();
