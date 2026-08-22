/* ==========================================================================
   THREE.JS 3D SCENES // AUM GAJJAR PORTFOLIO
   ========================================================================== */

(function() {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. HERO 3D PARTICLE & CLUSTERING VISUALIZER
  // --------------------------------------------------------------------------
  const heroContainer = document.getElementById('three-canvas-container');
  if (heroContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      heroContainer.clientWidth / (heroContainer.clientHeight || 500),
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight || 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroContainer.appendChild(renderer.domElement);

    const particleCount = 1600;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorWhite = new THREE.Color('#ffffff');
    const colorSysBlue = new THREE.Color('#00A3FF');
    const colorMuted = new THREE.Color('#334155');

    for (let i = 0; i < particleCount; i++) {
      const r = 11 * Math.random();
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;

      colors[i * 3] = colorWhite.r;
      colors[i * 3 + 1] = colorWhite.g;
      colors[i * 3 + 2] = colorWhite.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    camera.position.z = 24;

    let isClustered = false;
    let clusterProgress = 1;

    function getThemeColors() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return {
        base: isLight ? new THREE.Color('#3b82f6') : new THREE.Color('#ffffff'),
        active: isLight ? new THREE.Color('#0284c7') : new THREE.Color('#00A3FF'),
        muted: isLight ? new THREE.Color('#94a3b8') : new THREE.Color('#334155')
      };
    }

    function updateParticleColors() {
      const themeColors = getThemeColors();
      for (let i = 0; i < particleCount; i++) {
        let targetColor;
        if (!isClustered) {
          targetColor = themeColors.base;
        } else {
          const isHighRisk = colors[i * 3] === colorSysBlue.r && colors[i * 3 + 1] === colorSysBlue.g;
          targetColor = isHighRisk ? themeColors.active : themeColors.muted;
        }
        colors[i * 3] = targetColor.r;
        colors[i * 3 + 1] = targetColor.g;
        colors[i * 3 + 2] = targetColor.b;
      }
      geometry.attributes.color.needsUpdate = true;
    }

    // Observe theme changes
    const themeObserver = new MutationObserver(() => {
      updateParticleColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const clusterBtn = document.getElementById('cluster-btn');
    if (clusterBtn) {
      clusterBtn.addEventListener('click', () => {
        isClustered = !isClustered;
        clusterProgress = 0;
        clusterBtn.innerHTML = isClustered 
          ? `[ RESET DATASET DISTRIBUTION ]` 
          : `[ RUN XGBoost CLUSTERING ]`;

        const themeColors = getThemeColors();

        for (let i = 0; i < particleCount; i++) {
          const isHighRisk = Math.random() > 0.65;
          const centerX = isHighRisk ? 7.5 : -7.5;
          const centerY = isHighRisk ? 2.5 : -2.5;

          const r = isClustered ? 4.2 * Math.random() : 11 * Math.random();
          const theta = 2 * Math.PI * Math.random();
          const phi = Math.acos(2 * Math.random() - 1);

          targetPositions[i * 3] = (isClustered ? centerX : 0) + r * Math.sin(phi) * Math.cos(theta);
          targetPositions[i * 3 + 1] = (isClustered ? centerY : 0) + r * Math.sin(phi) * Math.sin(theta);
          targetPositions[i * 3 + 2] = r * Math.cos(phi);

          const targetColor = isClustered 
            ? (isHighRisk ? themeColors.active : themeColors.muted) 
            : themeColors.base;

          colors[i * 3] = targetColor.r;
          colors[i * 3 + 1] = targetColor.g;
          colors[i * 3 + 2] = targetColor.b;
        }
        geometry.attributes.color.needsUpdate = true;
      });
    }

    function animateHeroScene() {
      requestAnimationFrame(animateHeroScene);

      particleSystem.rotation.y += 0.0018;
      particleSystem.rotation.x += 0.0008;

      if (clusterProgress < 1) {
        clusterProgress += 0.025;
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < pos.length; i++) {
          pos[i] += (targetPositions[i] - pos[i]) * 0.08;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }
    animateHeroScene();

    window.addEventListener('resize', () => {
      if (heroContainer.clientWidth > 0 && heroContainer.clientHeight > 0) {
        camera.aspect = heroContainer.clientWidth / heroContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. 3D PROFILE BADGE / AVATAR
  // --------------------------------------------------------------------------
  const avContainer = document.getElementById('avatar-3d-container');
  if (avContainer && typeof THREE !== 'undefined') {
    const avScene = new THREE.Scene();
    const avCamera = new THREE.PerspectiveCamera(45, avContainer.clientWidth / (avContainer.clientHeight || 250), 0.1, 100);
    const avRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    avRenderer.setSize(avContainer.clientWidth, avContainer.clientHeight || 250);
    avRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    avContainer.appendChild(avRenderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    
    // Load actual LinkedIn Profile Picture with fallback
    const profileTexture = textureLoader.load(
      'assets/profile.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
      },
      undefined,
      (err) => {
        console.warn('Profile image load fallback to avatar-placeholder.svg', err);
      }
    );

    // Create 3D Badge (BoxGeometry)
    const avGeometry = new THREE.BoxGeometry(2.7, 2.7, 0.16);
    
    // Materials for the 6 faces: [right, left, top, bottom, front, back]
    const matSide = new THREE.MeshBasicMaterial({ color: 0x00A3FF, wireframe: false });
    const matSideWire = new THREE.MeshBasicMaterial({ color: 0x00A3FF, wireframe: true });
    const matFront = new THREE.MeshBasicMaterial({ 
      map: profileTexture, 
      color: 0xffffff,
      transparent: false 
    });
    const matBack = new THREE.MeshBasicMaterial({ 
      color: 0x081326, 
      wireframe: false 
    });

    const avMaterials = [matSide, matSide, matSideWire, matSideWire, matFront, matBack];
    const avMesh = new THREE.Mesh(avGeometry, avMaterials);
    avScene.add(avMesh);

    // Subtle edge highlight
    const edgeGeo = new THREE.EdgesGeometry(avGeometry);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x00A3FF, linewidth: 2 });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    avMesh.add(edgeLines);

    avCamera.position.z = 4.6;

    let targetRotX = 0;
    let targetRotY = 0;

    avContainer.addEventListener('mousemove', (e) => {
      const rect = avContainer.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / avContainer.clientWidth) * 2 - 1;
      const ny = -((e.clientY - rect.top) / avContainer.clientHeight) * 2 + 1;
      targetRotY = nx * 0.75;
      targetRotX = -ny * 0.55;
    });

    avContainer.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });

    function animateAvatar() {
      requestAnimationFrame(animateAvatar);
      
      avMesh.rotation.y += (targetRotY - avMesh.rotation.y) * 0.08 + 0.003;
      avMesh.rotation.x += (targetRotX - avMesh.rotation.x) * 0.08;
      avMesh.position.y = Math.sin(Date.now() * 0.0025) * 0.07;

      avRenderer.render(avScene, avCamera);
    }
    animateAvatar();

    window.addEventListener('resize', () => {
      if (avContainer.clientWidth > 0 && avContainer.clientHeight > 0) {
        avCamera.aspect = avContainer.clientWidth / avContainer.clientHeight;
        avCamera.updateProjectionMatrix();
        avRenderer.setSize(avContainer.clientWidth, avContainer.clientHeight);
      }
    });
  }
})();
