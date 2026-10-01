/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * "DATA → INSIGHT" Interactive Transformation Pipeline
 */

(function () {
  'use strict';

  const STAGES = [
    {
      step: 1,
      name: 'RAW DATA',
      subtitle: 'Chaotic streaming ingestion, untyped schema, corrupted records & null values',
      statusText: 'STAGE 01 // INGESTION STREAM (124,500 ROWS)',
      type: 'raw',
      kpi1: { label: 'Missing / Nulls', val: '14.8%' },
      kpi2: { label: 'Schema Status', val: 'Unvalidated' },
      kpi3: { label: 'Entropy Index', val: 'High (0.87)' },
      contentHtml: `
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8; background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); line-height: 1.6; max-height: 220px; overflow-y: auto;">
          <div style="color: #64748b;">// Streaming uncleaned telemetry records...</div>
          <div>{"rec_id": 9042, "ts": "2026-09-28T14:22:01Z", "emp_id": "E-492", "ot_hrs": 24, "satisfaction": 0.42, "tenure_mo": 18, "status": "Active"}</div>
          <div style="color: #f87171; background: rgba(239, 68, 68, 0.1);">{"rec_id": 9043, "ts": null, "emp_id": "E-493", "ot_hrs": -99, "satisfaction": "N/A", "tenure_mo": null, "status": "ERROR"}  &lt;-- CORRUPT</div>
          <div>{"rec_id": 9044, "ts": "2026-09-28T14:22:03Z", "emp_id": "E-494", "ot_hrs": 8, "satisfaction": 0.88, "tenure_mo": 34, "status": "Active"}</div>
          <div style="color: #fbbf24; background: rgba(251, 191, 36, 0.08);">{"rec_id": 9044, "ts": "2026-09-28T14:22:03Z", "emp_id": "E-494", "ot_hrs": 8, "satisfaction": 0.88, "tenure_mo": 34, "status": "Active"}  &lt;-- DUPLICATE</div>
          <div>{"rec_id": 9045, "ts": "2026-09-28T14:22:07Z", "emp_id": "E-495", "ot_hrs": 31, "satisfaction": 0.31, "tenure_mo": 14, "status": "Voluntary_Exit"}</div>
        </div>
      `,
    },
    {
      step: 2,
      name: 'CLEANING & PREP',
      subtitle: 'IQR outlier pruning, median imputation, schema validation & deduplication',
      statusText: 'STAGE 02 // SANITIZATION & NORMALIZATION ENGINE',
      type: 'cleaning',
      kpi1: { label: 'Imputed Cells', val: '18,426' },
      kpi2: { label: 'Deduplicated', val: '2,140 rows' },
      kpi3: { label: 'Data Integrity', val: '99.98%' },
      contentHtml: `
        <div style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(0,0,0,0.5); padding: 18px; border-radius: 8px; border: 1px solid rgba(0, 242, 254, 0.2); line-height: 1.8;">
          <div style="color: var(--cyan-primary);">✔ Pipeline: Pandas & SQL Sanitization Pass</div>
          <div style="color: #cbd5e1;">[Step 1] Dropped 2,140 exact duplicate fingerprints via composite key (emp_id + ts)</div>
          <div style="color: #cbd5e1;">[Step 2] Median Imputation on tenure_mo (Grouped by JobRole & Dept) -> RMSE: 0.04</div>
          <div style="color: #cbd5e1;">[Step 3] Applied IQR filter on ot_hrs: Bounds [0, 45h], clamped anomalies</div>
          <div style="color: var(--emerald-primary); margin-top: 6px;">✔ Sanitization Complete: Schema normalized to 3NF Star Schema. 122,360 valid records.</div>
        </div>
      `,
    },
    {
      step: 3,
      name: 'ANALYSIS & MODELING',
      subtitle: 'Hypothesis testing, Pearson correlation matrix & random forest feature importance',
      statusText: 'STAGE 03 // STATISTICAL INFERENCE & ML SIGNIFICANCE',
      type: 'analysis',
      kpi1: { label: 'Leading Factor', val: 'Overtime (r=0.68)' },
      kpi2: { label: 'Model ROC-AUC', val: '0.912' },
      kpi3: { label: 'P-Value', val: '< 0.0001' },
      contentHtml: `
        <div style="font-family: var(--font-mono); font-size: 0.76rem; background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.25);">
          <div style="margin-bottom: 8px; color: var(--violet-primary); font-weight: 700;">FEATURE CORRELATION MATRIX (TARGET = ATTRITION)</div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; color: #94a3b8;">
            <span>Feature Dimension</span><span>Corr (r)</span><span>Significance</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 6px 0; color: #f87171;">
            <span>Weekly Overtime Hours</span><span>+0.68</span><span>p &lt; 0.0001 (Critical)</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 6px 0; color: #fbbf24;">
            <span>Tenure in Current Role (Y2 Cliff)</span><span>-0.54</span><span>p &lt; 0.001 (High)</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 6px 0; color: #38bdf8;">
            <span>Commute Distance (&gt;18km)</span><span>+0.41</span><span>p = 0.003 (Moderate)</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 6px 0; color: var(--emerald-primary);">
            <span>Stock Option Level &amp; Comp Band</span><span>-0.49</span><span>p &lt; 0.001 (Protective)</span>
          </div>
        </div>
      `,
    },
    {
      step: 4,
      name: 'VISUALIZATION',
      subtitle: 'Dynamic multi-axis trend encoding, interactive crosshairs & perceptual hierarchy',
      statusText: 'STAGE 04 // INTERACTIVE VISUAL ENCODING (LIVE CANVAS)',
      type: 'visualization',
      kpi1: { label: 'Visual Encoding', val: 'Multi-Axis Canvas' },
      kpi2: { label: 'Frame Rate', val: '60 FPS Smooth' },
      kpi3: { label: 'Cognitive Load', val: 'Optimized' },
      contentHtml: '', // Handled by dynamic canvas renderer
    },
    {
      step: 5,
      name: 'DECISIONS & INSIGHTS',
      subtitle: 'Translating analytical findings into boardroom strategy and measurable ROI',
      statusText: 'STAGE 05 // EXECUTIVE DECISION PLAYBOOK & FINANCIAL IMPACT',
      type: 'decisions',
      kpi1: { label: 'Projected Retention', val: '+28.4%' },
      kpi2: { label: 'Annual Cost Savings', val: '$420,000' },
      kpi3: { label: 'Implementation', val: 'Immediate' },
      contentHtml: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="padding: 14px; background: rgba(0, 245, 160, 0.06); border: 1px solid rgba(0, 245, 160, 0.25); border-radius: 8px;">
            <div style="font-weight: 700; color: var(--emerald-primary); font-size: 0.88rem; margin-bottom: 4px;">1. Operational Cap on Overtime Latency</div>
            <div style="font-size: 0.8rem; color: #cbd5e1;">Enforce mandatory 12h/week overtime ceiling in Sales & R&D; projected to reduce year-one voluntary departures by 34%.</div>
          </div>
          <div style="padding: 14px; background: rgba(0, 242, 254, 0.06); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px;">
            <div style="font-weight: 700; color: var(--cyan-primary); font-size: 0.88rem; margin-bottom: 4px;">2. Year-2 "Tenure Cliff" Career Growth Checkpoint</div>
            <div style="font-size: 0.8rem; color: #cbd5e1;">Introduce proactive mentorship and lateral project rotation at Month 18 before employees reach peak departure window.</div>
          </div>
          <div style="padding: 14px; background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 8px;">
            <div style="font-weight: 700; color: var(--violet-primary); font-size: 0.88rem; margin-bottom: 4px;">3. Flexible Hybrid Transit Subsidies</div>
            <div style="font-size: 0.8rem; color: #cbd5e1;">Offer 2 days WFH subsidy for employees commuting &gt;18km to neutralize distance friction.</div>
          </div>
        </div>
      `,
    },
  ];

  function initDataPipeline() {
    const stepItems = document.querySelectorAll('.pipeline-step-item');
    const statusTextEl = document.getElementById('pipeline-status-text');
    const dynamicContainer = document.getElementById('pipeline-dynamic-view');
    const kpi1Label = document.getElementById('pipe-kpi1-label');
    const kpi1Val = document.getElementById('pipe-kpi1-val');
    const kpi2Label = document.getElementById('pipe-kpi2-label');
    const kpi2Val = document.getElementById('pipe-kpi2-val');
    const kpi3Label = document.getElementById('pipe-kpi3-label');
    const kpi3Val = document.getElementById('pipe-kpi3-val');
    const chartCanvas = document.getElementById('pipeline-chart-canvas');

    if (!stepItems.length || !dynamicContainer) return;

    let currentStepIdx = 0;
    let chartAnimId = null;

    function renderStage(idx) {
      currentStepIdx = idx;
      const stage = STAGES[idx];

      // Update Active Stepper UI
      stepItems.forEach((item, i) => {
        if (i === idx) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update Header & KPIs
      if (statusTextEl) statusTextEl.textContent = stage.statusText;
      if (kpi1Label && kpi1Val) {
        kpi1Label.textContent = stage.kpi1.label;
        kpi1Val.textContent = stage.kpi1.val;
      }
      if (kpi2Label && kpi2Val) {
        kpi2Label.textContent = stage.kpi2.label;
        kpi2Val.textContent = stage.kpi2.val;
      }
      if (kpi3Label && kpi3Val) {
        kpi3Label.textContent = stage.kpi3.label;
        kpi3Val.textContent = stage.kpi3.val;
      }

      // Handle Canvas vs HTML
      if (stage.type === 'visualization') {
        dynamicContainer.innerHTML = '';
        if (chartCanvas) {
          chartCanvas.style.display = 'block';
          startChartAnimation();
        }
      } else {
        if (chartCanvas) {
          chartCanvas.style.display = 'none';
          if (chartAnimId) cancelAnimationFrame(chartAnimId);
        }
        dynamicContainer.innerHTML = stage.contentHtml;
      }
    }

    // Interactive Multi-Metric Chart Canvas Renderer
    function startChartAnimation() {
      if (!chartCanvas) return;
      const ctx = chartCanvas.getContext('2d');
      const width = (chartCanvas.width = chartCanvas.clientWidth || 500);
      const height = (chartCanvas.height = 240);

      let frame = 0;

      function renderFrame() {
        frame++;
        ctx.clearRect(0, 0, width, height);

        // Draw Grid Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let y = 30; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(30, y);
          ctx.lineTo(width - 20, y);
          ctx.stroke();
        }

        // Draw Smooth Curve 1: Retention Probability (Cyan)
        ctx.beginPath();
        const grad1 = ctx.createLinearGradient(0, 0, 0, height);
        grad1.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
        grad1.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

        ctx.moveTo(30, height - 40);
        for (let x = 30; x <= width - 20; x += 15) {
          const normX = (x - 30) / (width - 50);
          const y = height - 50 - Math.sin(normX * 4 + frame * 0.03) * 35 - normX * 40;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw Smooth Curve 2: Flight Risk / Overtime (Violet)
        ctx.beginPath();
        ctx.moveTo(30, height - 30);
        for (let x = 30; x <= width - 20; x += 15) {
          const normX = (x - 30) / (width - 50);
          const y = height - 40 - Math.cos(normX * 3.5 - frame * 0.025) * 45 + (1 - normX) * 30;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Animated Crosshair Indicator
        const crosshairX = 30 + ((frame * 1.5) % (width - 50));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(crosshairX, 20);
        ctx.lineTo(crosshairX, height - 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Interactive Legend
        ctx.font = '10px JetBrains Mono';
        ctx.fillStyle = '#00f2fe';
        ctx.fillText('● Retention Probability Index', 35, 25);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('● Cumulative Attrition Probability', 240, 25);

        chartAnimId = requestAnimationFrame(renderFrame);
      }
      renderFrame();
    }

    // Step Item Click Handlers
    stepItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        renderStage(idx);
      });
    });

    // Default Render
    renderStage(0);
  }

  window.addEventListener('DOMContentLoaded', initDataPipeline);
})();
