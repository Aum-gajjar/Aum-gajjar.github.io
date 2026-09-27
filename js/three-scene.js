/* ==========================================================================
   THREE.JS 3D SCENES // AUM GAJJAR PORTFOLIO
   ========================================================================== */

(function() {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GLOBAL 3D AMBIENT BACKGROUND SCENE (ALL PAGES & SECTIONS)
  // --------------------------------------------------------------------------
  if (typeof THREE !== 'undefined') {
    // Look for existing container or create a global fixed background canvas
    let bgContainer = document.getElementById('global-three-canvas') || document.getElementById('three-canvas-container');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.id = 'global-three-canvas';
      document.body.prepend(bgContainer);
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bgContainer.appendChild(renderer.domElement);

    // Theme Color Configuration with calibrated light-mode visibility
    function getThemeColors() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return {
        isLight: isLight,
        particleBase: isLight ? new THREE.Color('#0284c7') : new THREE.Color('#38bdf8'),
        particleAccent: isLight ? new THREE.Color('#2563eb') : new THREE.Color('#67e8f9'),
        cubeWire: isLight ? 0x0284c7 : 0x38bdf8,
        cubeFace: isLight ? 0xbae6fd : 0x0c2448,
        particleOpacity: isLight ? 0.35 : 0.28,
        cubeWireOpacity: isLight ? 0.40 : 0.32,
        cubeFaceOpacity: isLight ? 0.16 : 0.20
      };
    }

    let currentTheme = getThemeColors();

    // ------------------------------------------------------------------------
    // A. Global Particle Field
    // ------------------------------------------------------------------------
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const origPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 35 - 5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      origPositions[i * 3] = x;
      origPositions[i * 3 + 1] = y;
      origPositions[i * 3 + 2] = z;

      const pColor = (i % 4 === 0) ? currentTheme.particleAccent : currentTheme.particleBase;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.10,
      vertexColors: true,
      transparent: true,
      opacity: currentTheme.particleOpacity,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // ------------------------------------------------------------------------
    // B. Floating Repelling 3D Micro-Cubes Scattered Everywhere
    // ------------------------------------------------------------------------
    const cubeGroup = new THREE.Group();
    const cubeCount = 42;
    const cubes = [];

    const cubeGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const cubeEdgesGeo = new THREE.EdgesGeometry(cubeGeo);

    for (let c = 0; c < cubeCount; c++) {
      const cubeMat = new THREE.MeshBasicMaterial({
        color: currentTheme.cubeFace,
        transparent: true,
        opacity: currentTheme.cubeFaceOpacity,
        wireframe: false
      });
      const edgeMat = new THREE.LineBasicMaterial({
        color: currentTheme.cubeWire,
        transparent: true,
        opacity: currentTheme.cubeWireOpacity,
        linewidth: 1.5
      });

      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      const wire = new THREE.LineSegments(cubeEdgesGeo, edgeMat);
      mesh.add(wire);

      // Distribute evenly and randomly across wide viewport & depth
      const posX = (Math.random() - 0.5) * 55;
      const posY = (Math.random() - 0.5) * 40;
      const posZ = (Math.random() - 0.5) * 30 - 6;

      const scale = 0.35 + Math.random() * 0.65;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(posX, posY, posZ);

      mesh.userData = {
        origX: posX,
        origY: posY,
        origZ: posZ,
        vx: 0,
        vy: 0,
        vz: 0,
        rotSpeedX: (Math.random() - 0.5) * 0.010,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.0010 + Math.random() * 0.0016,
        floatOffset: Math.random() * Math.PI * 2,
        cubeMat: cubeMat,
        edgeMat: edgeMat
      };

      cubeGroup.add(mesh);
      cubes.push(mesh);
    }
    scene.add(cubeGroup);

    camera.position.z = 26;

    // ------------------------------------------------------------------------
    // C. Global Mouse Tracking & Raycasting for Repulsion
    // ------------------------------------------------------------------------
    const mouseWorld = new THREE.Vector3(999, 999, 0);
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(999, 999);
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onPointerMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNDC.set(x, y);

      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(planeZ0, mouseWorld);
    }

    function onPointerLeave() {
      mouseWorld.set(999, 999, 0);
      mouseNDC.set(999, 999);
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });

    // ------------------------------------------------------------------------
    // D. Theme Switcher Dynamic Observer
    // ------------------------------------------------------------------------
    function updateThemeStyles() {
      currentTheme = getThemeColors();
      particleMaterial.opacity = currentTheme.particleOpacity;

      for (let i = 0; i < particleCount; i++) {
        const pColor = (i % 4 === 0) ? currentTheme.particleAccent : currentTheme.particleBase;
        colors[i * 3] = pColor.r;
        colors[i * 3 + 1] = pColor.g;
        colors[i * 3 + 2] = pColor.b;
      }
      geometry.attributes.color.needsUpdate = true;

      cubes.forEach(cube => {
        cube.userData.cubeMat.color.setHex(currentTheme.cubeFace);
        cube.userData.cubeMat.opacity = currentTheme.cubeFaceOpacity;
        cube.userData.edgeMat.color.setHex(currentTheme.cubeWire);
        cube.userData.edgeMat.opacity = currentTheme.cubeWireOpacity;
      });
    }

    const themeObserver = new MutationObserver(() => {
      updateThemeStyles();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // ------------------------------------------------------------------------
    // E. Animation Loop with Repulsion Physics & Parallax Scroll
    // ------------------------------------------------------------------------
    let clock = 0;

    function animateGlobalScene() {
      requestAnimationFrame(animateGlobalScene);
      clock += 0.01;

      // Gentle ambient rotation
      particleSystem.rotation.y += 0.0004;
      particleSystem.rotation.x += 0.0002;

      // Parallax scroll depth adjustment
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      camera.position.y = -(scrollY * 0.006);

      // Physics on Floating Cubes (Repulsion + Spring Return)
      cubes.forEach(cube => {
        cube.rotation.x += cube.userData.rotSpeedX;
        cube.rotation.y += cube.userData.rotSpeedY;

        const targetY = cube.userData.origY + Math.sin(clock * 1.5 + cube.userData.floatOffset) * 0.5;
        const targetX = cube.userData.origX;
        const targetZ = cube.userData.origZ;

        // Mouse Repulsion Force
        if (mouseWorld.x < 900) {
          const dx = cube.position.x - mouseWorld.x;
          const dy = (cube.position.y - camera.position.y) - mouseWorld.y;
          const distSq = dx * dx + dy * dy;
          const repelRadiusSq = 49; // radius of ~7 units

          if (distSq < repelRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 7.0) * 0.32;
            cube.userData.vx += (dx / dist) * force;
            cube.userData.vy += (dy / dist) * force;
            cube.userData.vz += force * 0.15;
          }
        }

        // Spring Physics & Damping
        cube.userData.vx += (targetX - cube.position.x) * 0.04;
        cube.userData.vy += (targetY - cube.position.y) * 0.04;
        cube.userData.vz += (targetZ - cube.position.z) * 0.04;

        cube.userData.vx *= 0.88;
        cube.userData.vy *= 0.88;
        cube.userData.vz *= 0.88;

        cube.position.x += cube.userData.vx;
        cube.position.y += cube.userData.vy;
        cube.position.z += cube.userData.vz;
      });

      // Physics on Particles (Dispersal around cursor)
      const posArray = geometry.attributes.position.array;
      if (mouseWorld.x < 900) {
        for (let i = 0; i < particleCount; i += 2) {
          const px = posArray[i * 3];
          const py = posArray[i * 3 + 1] - camera.position.y;
          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 20 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 4.5) * 0.07;
            velocities[i * 3] += (dx / dist) * force;
            velocities[i * 3 + 1] += (dy / dist) * force;
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        velocities[i * 3] += (origPositions[i * 3] - posArray[i * 3]) * 0.03;
        velocities[i * 3 + 1] += (origPositions[i * 3 + 1] - posArray[i * 3 + 1]) * 0.03;
        velocities[i * 3 + 2] += (origPositions[i * 3 + 2] - posArray[i * 3 + 2]) * 0.03;

        velocities[i * 3] *= 0.88;
        velocities[i * 3 + 1] *= 0.88;
        velocities[i * 3 + 2] *= 0.88;

        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animateGlobalScene();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
        if (typeof THREE.SRGBColorSpace !== 'undefined') {
          tex.colorSpace = THREE.SRGBColorSpace;
        } else if (typeof THREE.sRGBEncoding !== 'undefined') {
          tex.encoding = THREE.sRGBEncoding;
        }
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
