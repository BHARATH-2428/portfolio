/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * Interactive 3D Skill Ecosystem (Celestial Node Network)
 */

(function () {
  'use strict';

  const SKILLS_DATA = [
    {
      id: 'python',
      name: 'Python',
      category: 'languages',
      catLabel: 'Core Language',
      proficiency: 92,
      desc: 'Primary language for statistical computing, automated ETL scripts, data wrangling, and predictive modeling.',
      snippet: 'import pandas as pd\nimport numpy as np\ndf = pd.read_csv("telemetry.csv")\ninsights = df.groupby("cluster").agg({"retention": "mean"})',
      angle: 30,
      radius: 200,
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'languages',
      catLabel: 'Database Querying',
      proficiency: 95,
      desc: 'Advanced relational data querying, CTEs, window functions (ROW_NUMBER, DENSE_RANK), joins, and indexing.',
      snippet: 'WITH CohortMetrics AS (\n  SELECT user_id, DATE_TRUNC("month", signup_date) as cohort,\n  SUM(amount) OVER (PARTITION BY user_id) as total_spend\n  FROM transactions\n)',
      angle: 85,
      radius: 235,
    },
    {
      id: 'powerbi',
      name: 'Power BI',
      category: 'bi',
      catLabel: 'Business Intelligence',
      proficiency: 90,
      desc: 'Interactive executive reporting, DAX measures, Star schema data modeling, and automated KPI drill-downs.',
      snippet: 'Attrition Rate = \nDIVIDE(\n  CALCULATE(COUNT(Employees[ID]), Employees[Left] = "Yes"),\n  COUNT(Employees[ID])\n)',
      angle: 140,
      radius: 195,
    },
    {
      id: 'tableau',
      name: 'Tableau',
      category: 'bi',
      catLabel: 'Data Storytelling',
      proficiency: 88,
      desc: 'High-impact interactive dashboards, custom LOD expressions, geographic mapping, and story-point presentations.',
      snippet: '{ FIXED [Customer Segment] : AVG([Customer Lifetime Value]) }',
      angle: 190,
      radius: 220,
    },
    {
      id: 'excel',
      name: 'Advanced Excel',
      category: 'bi',
      catLabel: 'Spreadsheet Analytics',
      proficiency: 92,
      desc: 'PivotTables, XLOOKUP, Power Query for rapid data ingestion, dynamic array formulas, and financial scenarios.',
      snippet: '=XLOOKUP(A2, Employees!A:A, Employees!F:F, "Not Found", 0)',
      angle: 235,
      radius: 210,
    },
    {
      id: 'pandas',
      name: 'Pandas',
      category: 'ds',
      catLabel: 'Data Manipulation',
      proficiency: 94,
      desc: 'Vectorized operations, DataFrame reshaping (melt, pivot_table), handling missing values, and time series resampling.',
      snippet: 'df["rolling_30d"] = df.set_index("date")["revenue"].rolling("30D").mean()',
      angle: 280,
      radius: 230,
    },
    {
      id: 'numpy',
      name: 'NumPy',
      category: 'ds',
      catLabel: 'Numerical Computing',
      proficiency: 90,
      desc: 'Multidimensional array manipulation, linear algebra operations, matrix transformations, and probabilistic sampling.',
      snippet: 'covariance_matrix = np.cov(matrix, rowvar=False)\neigenvalues, eigenvectors = np.linalg.eig(covariance_matrix)',
      angle: 325,
      radius: 215,
    },
    {
      id: 'matplotlib',
      name: 'Matplotlib',
      category: 'vis',
      catLabel: 'Scientific Plotting',
      proficiency: 87,
      desc: 'Custom publication-ready visualizations, subplots, distribution curves, and correlation heatmaps.',
      snippet: 'fig, ax = plt.subplots(figsize=(10, 6))\nax.scatter(x, y, c=clusters, cmap="viridis", alpha=0.7)\nplt.tight_layout()',
      angle: 55,
      radius: 160,
    },
    {
      id: 'cleaning',
      name: 'Data Cleaning',
      category: 'ds',
      catLabel: 'Data Quality & Prep',
      proficiency: 95,
      desc: 'Systematic outlier detection (IQR & Z-score), missing value imputation, type casting, and deduplication workflows.',
      snippet: 'q1, q3 = np.percentile(df["tenure"], [25, 75])\niqr = q3 - q1\ndf_clean = df[~((df["tenure"] < q1 - 1.5*iqr) | (df["tenure"] > q3 + 1.5*iqr))]',
      angle: 110,
      radius: 170,
    },
    {
      id: 'eda',
      name: 'EDA',
      category: 'ds',
      catLabel: 'Exploratory Analysis',
      proficiency: 93,
      desc: 'Univariate and bivariate statistical exploration, hypothesis testing, identifying correlation patterns and anomalies.',
      snippet: 'corr = df.corr(method="pearson")\nsns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f")',
      angle: 165,
      radius: 165,
    },
    {
      id: 'dataviz',
      name: 'Data Visualization',
      category: 'vis',
      catLabel: 'Visual Encoding',
      proficiency: 91,
      desc: 'Applying visual perception principles, cognitive load reduction, effective color palettes, and dashboard design standards.',
      snippet: 'Visual Hierarchy: Primary KPI Focus -> Trend Comparison -> Contextual Granularity',
      angle: 255,
      radius: 175,
    },
    {
      id: 'git',
      name: 'Git / GitHub',
      category: 'tools',
      catLabel: 'Version Control',
      proficiency: 88,
      desc: 'Collaborative development, branching workflows, pull requests, project tracking, and reproducible analysis repos.',
      snippet: 'git checkout -b feature/attrition-model\ngit commit -m "feat: implement random forest classifier"\ngit push origin feature/attrition-model',
      angle: 305,
      radius: 170,
    },
  ];

  function initSkillsEcosystem() {
    const stage = document.querySelector('.skills-ecosystem-stage');
    const container = document.querySelector('.skills-nodes-container');
    const canvas = document.getElementById('skills-network-canvas');
    const detailCard = document.querySelector('.skill-detail-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!stage || !container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = stage.clientWidth);
    let height = (canvas.height = stage.clientHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = stage.clientWidth;
      height = canvas.height = stage.clientHeight;
      updateNodePositions();
    });

    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const nodes = [];

    // Instantiate Node Elements
    SKILLS_DATA.forEach((skill) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'skill-node';
      nodeEl.dataset.id = skill.id;
      nodeEl.dataset.category = skill.category;

      const dot = document.createElement('div');
      dot.className = 'skill-node-dot';
      nodeEl.appendChild(dot);

      const label = document.createElement('span');
      label.textContent = skill.name;
      nodeEl.appendChild(label);

      container.appendChild(nodeEl);

      const nodeObj = {
        el: nodeEl,
        data: skill,
        baseAngle: (skill.angle * Math.PI) / 180,
        radius: skill.radius,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        isHovered: false,
        isActive: false,
      };
      nodes.push(nodeObj);

      // Node Event Listeners
      nodeEl.addEventListener('mouseenter', () => {
        nodes.forEach((n) => (n.isActive = false));
        nodeObj.isActive = true;
        nodeObj.isHovered = true;
        showSkillDetail(skill);
      });

      nodeEl.addEventListener('mouseleave', () => {
        nodeObj.isHovered = false;
      });

      nodeEl.addEventListener('click', () => {
        nodes.forEach((n) => (n.isActive = false));
        nodeObj.isActive = true;
        showSkillDetail(skill);
      });
    });

    function showSkillDetail(skill) {
      if (!detailCard) return;
      detailCard.querySelector('.detail-name').textContent = skill.name;
      detailCard.querySelector('.detail-category-tag').textContent = skill.catLabel;
      detailCard.querySelector('.detail-desc').textContent = skill.desc;
      detailCard.querySelector('.detail-meter-pct').textContent = `${skill.proficiency}%`;
      detailCard.querySelector('.detail-meter-fill').style.width = `${skill.proficiency}%`;
      detailCard.querySelector('.detail-snippet').textContent = skill.snippet;

      detailCard.classList.add('visible');
    }

    // Default select Python
    showSkillDetail(SKILLS_DATA[0]);

    // Position Nodes Mathematically Around Center
    function updateNodePositions() {
      const cX = centerX();
      const cY = centerY();
      const scale = Math.min(width / 750, 1.15);

      nodes.forEach((node) => {
        const rad = node.radius * scale;
        const currentAngle = node.baseAngle + Date.now() * 0.00012; // slow celestial drift
        const targetX = cX + Math.cos(currentAngle) * rad;
        const targetY = cY + Math.sin(currentAngle) * rad * 0.85; // elliptical depth

        // Physics displacement when hovered
        if (!node.isHovered) {
          node.x += (targetX - node.x) * 0.1;
          node.y += (targetY - node.y) * 0.1;
        }

        node.el.style.left = `${node.x}px`;
        node.el.style.top = `${node.y}px`;
        node.el.style.transform = `translate(-50%, -50%) ${node.isActive ? 'scale(1.15)' : 'scale(1)'}`;
      });
    }

    // Gravitational pull toward mouse when hovering stage
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      nodes.forEach((node) => {
        const dx = mX - node.x;
        const dy = mY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          node.x += (dx / dist) * force * 15;
          node.y += (dy / dist) * force * 15;
        }
      });
    });

    // Draw Dynamic Neural Links between Center & Nodes on Canvas
    function drawNetwork() {
      ctx.clearRect(0, 0, width, height);
      const cX = centerX();
      const cY = centerY();

      updateNodePositions();

      // Orbital guide rings
      ctx.beginPath();
      ctx.ellipse(cX, cY, 175 * Math.min(width / 750, 1.15), 150 * Math.min(width / 750, 1.15), 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cX, cY, 235 * Math.min(width / 750, 1.15), 200 * Math.min(width / 750, 1.15), 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw connection lines from Core to each Node
      nodes.forEach((node) => {
        const isHighlight = node.isActive || node.isHovered;

        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.lineTo(node.x, node.y);

        if (isHighlight) {
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 12;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Inter-node connections (triangulation between nearby nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0.04, 0.25 - dist / 600)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawNetwork);
    }
    drawNetwork();

    // Filter Chips Handlers
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        nodes.forEach((node) => {
          if (filter === 'all' || node.data.category === filter) {
            node.el.style.opacity = '1';
            node.el.style.pointerEvents = 'auto';
            node.el.style.filter = 'none';
          } else {
            node.el.style.opacity = '0.2';
            node.el.style.pointerEvents = 'none';
            node.el.style.filter = 'grayscale(100%)';
          }
        });
      });
    });
  }

  window.addEventListener('DOMContentLoaded', initSkillsEcosystem);
})();
