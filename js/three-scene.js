/**
 * BHARATH S. R — ANTI-GRAVITY DATA UNIVERSE
 * 3D WebGL Floating Data Intelligence System (Three.js)
 */

(function () {
  'use strict';

  function initThreeHero() {
    const container = document.getElementById('hero-3d-wrapper');
    const canvas = document.getElementById('hero-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') {
      console.warn('Three.js or hero container not found; skipping 3D initialization.');
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Pivot Group for Gravitational Rotation
    const coreSystemGroup = new THREE.Group();
    scene.add(coreSystemGroup);

    // 2. Centerpiece: 3D Transparent Glass Data Sphere
    // Inner pulsing nucleus
    const innerNucleusGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const innerNucleusMat = new THREE.MeshPhongMaterial({
      color: 0x00f2fe,
      emissive: 0x006699,
      specular: 0xffffff,
      shininess: 90,
      transparent: true,
      opacity: 0.35,
      wireframe: false,
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    coreSystemGroup.add(innerNucleus);

    // Outer Frosted Glass Lattice Core
    const glassSphereGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const glassSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.5,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      reflectivity: 0.9,
      clearcoat: 1.0,
      wireframe: false,
    });
    const glassSphere = new THREE.Mesh(glassSphereGeo, glassSphereMat);
    coreSystemGroup.add(glassSphere);

    // Wireframe Grid Cage
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeCage = new THREE.Mesh(glassSphereGeo, wireframeMat);
    coreSystemGroup.add(wireframeCage);

    // 3. Floating Data Nodes Connected with Lines
    const nodeCount = 38;
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const nodeAltMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    const nodesGroup = new THREE.Group();
    const nodePositions = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 4.2 + (Math.random() - 0.5) * 1.2;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeMesh = new THREE.Mesh(nodeGeo, i % 3 === 0 ? nodeAltMat : nodeMat);
      nodeMesh.position.set(x, y, z);
      nodesGroup.add(nodeMesh);

      nodePositions.push(new THREE.Vector3(x, y, z));
    }
    coreSystemGroup.add(nodesGroup);

    // Connected Neural Lines between nearby nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.22,
    });

    const linePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 3.2) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeometry, lineMat);
    coreSystemGroup.add(networkLines);

    // 4. Orbiting Rings with Data Packets
    const ringGroup = new THREE.Group();

    // Ring 1 - Cyan primary orbit
    const ring1Geo = new THREE.TorusGeometry(5.6, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - Violet secondary orbit
    const ring2Geo = new THREE.TorusGeometry(6.6, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    coreSystemGroup.add(ringGroup);

    // 5. Orbiting 3D Mini Bar Chart Simulation
    const miniChartGroup = new THREE.Group();
    const barCount = 7;
    const barGeo = new THREE.BoxGeometry(0.14, 0.6, 0.14);
    for (let i = 0; i < barCount; i++) {
      const heightScale = 0.5 + Math.random() * 1.5;
      const bMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f5a0 : 0x00f2fe,
        transparent: true,
        opacity: 0.85,
      });
      const bar = new THREE.Mesh(barGeo, bMat);
      bar.scale.y = heightScale;
      bar.position.set((i - barCount / 2) * 0.28, heightScale * 0.3, 0);
      miniChartGroup.add(bar);
    }
    miniChartGroup.position.set(5.2, 1.8, 0);
    coreSystemGroup.add(miniChartGroup);

    // 6. Zero-Gravity Particle Swarm (Data Dust)
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 4.0 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);

      // Cyan / Violet / Emerald gradient
      const randColor = Math.random();
      if (randColor < 0.6) {
        particleColors[i] = 0.0;
        particleColors[i + 1] = 0.95;
        particleColors[i + 2] = 1.0;
      } else if (randColor < 0.85) {
        particleColors[i] = 0.65;
        particleColors[i + 1] = 0.33;
        particleColors[i + 2] = 0.97;
      } else {
        particleColors[i] = 0.0;
        particleColors[i + 1] = 0.96;
        particleColors[i + 2] = 0.63;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    coreSystemGroup.add(particleField);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1e3a, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 3.0);
    rimLight.position.set(-10, -10, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x00f5a0, 2.0, 25);
    fillLight.position.set(0, 0, 5);
    scene.add(fillLight);

    // 8. Interactive Mouse Movement & Parallax Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const inHeroArea = e.clientY < window.innerHeight;

      if (inHeroArea) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.35;
      }
    });

    // 9. Animation Loop with Physics & Zero-Gravity Oscillations
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Gravitational Damping
      coreSystemGroup.rotation.y += (targetRotY - coreSystemGroup.rotation.y) * 0.05 + 0.003;
      coreSystemGroup.rotation.x += (targetRotX - coreSystemGroup.rotation.x) * 0.05;

      // Zero-gravity bobbing
      coreSystemGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.35;

      // Pulse inner sphere
      const pulseScale = 1 + Math.sin(elapsedTime * 2.2) * 0.06;
      innerNucleus.scale.set(pulseScale, pulseScale, pulseScale);

      // Rotate glass cage
      glassSphere.rotation.y = elapsedTime * 0.12;
      glassSphere.rotation.z = elapsedTime * 0.08;
      wireframeCage.rotation.y = elapsedTime * 0.12;
      wireframeCage.rotation.z = elapsedTime * 0.08;

      // Rotate orbital rings
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Orbit mini chart around core
      const orbitAngle = elapsedTime * 0.5;
      miniChartGroup.position.x = Math.cos(orbitAngle) * 5.4;
      miniChartGroup.position.z = Math.sin(orbitAngle) * 5.4;
      miniChartGroup.rotation.y = -orbitAngle;

      // Slowly rotate particle dust
      particleField.rotation.y = elapsedTime * 0.04;
      particleField.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      renderer.render(scene, camera);
    }
    animate();

    // 10. Responsive Resizing
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    // If Three.js is loaded asynchronously, poll or init
    if (typeof THREE !== 'undefined') {
      initThreeHero();
    } else {
      window.addEventListener('load', initThreeHero);
    }
  });
})();
