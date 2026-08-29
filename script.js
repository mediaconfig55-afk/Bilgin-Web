/* ============ NAV: scroll state + mobile toggle ============ */
const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============ Cursor glow ============ */
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
}, { passive: true });

/* ============ Card tilt effect ============ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
  });
});

/* ============ Scroll reveal ============ */
const revealTargets = document.querySelectorAll('.project-card, .skill-chip, .about-visual, .focus-item');
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform += ' translateY(24px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
});
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => io.observe(el));

/* ============================================================
   THREE.JS HERO SCENE — rotating wireframe core + orbiting
   code blocks + starfield particles (neon purple/cyan/pink)
   ============================================================ */
(function initHeroScene(){
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth, height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0.6, 8.5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  // ---- Lighting ----
  const ambient = new THREE.AmbientLight(0x1a1030, 1.6);
  scene.add(ambient);

  const purpleLight = new THREE.PointLight(0x8b5cf6, 3.4, 22, 2);
  purpleLight.position.set(4, 3, 4);
  scene.add(purpleLight);

  const cyanLight = new THREE.PointLight(0x22d3ee, 2.6, 22, 2);
  cyanLight.position.set(-4, -2, 3);
  scene.add(cyanLight);

  const pinkLight = new THREE.PointLight(0xec4899, 1.4, 18, 2);
  pinkLight.position.set(0, -3, -3);
  scene.add(pinkLight);

  // ---- Core group ----
  const coreGroup = new THREE.Group();

  // outer wireframe icosahedron
  const wireGeo = new THREE.IcosahedronGeometry(1.9, 1);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.55 });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  coreGroup.add(wireMesh);

  // inner glowing solid icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x2a1a4a, metalness: 0.6, roughness: 0.25,
    emissive: 0x8b5cf6, emissiveIntensity: 0.35
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // secondary thin wireframe shell
  const shellGeo = new THREE.IcosahedronGeometry(2.5, 0);
  const shellMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.18 });
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  coreGroup.add(shellMesh);

  scene.add(coreGroup);

  // ---- Orbiting code blocks ----
  const orbitGroup = new THREE.Group();
  const blockColors = [0x8b5cf6, 0x22d3ee, 0xec4899];
  const blockData = [];
  const blockCount = 9;
  for (let i = 0; i < blockCount; i++) {
    const size = 0.16 + Math.random() * 0.14;
    const geo = Math.random() > 0.5
      ? new THREE.BoxGeometry(size, size, size)
      : new THREE.OctahedronGeometry(size, 0);
    const color = blockColors[i % blockColors.length];
    const mat = new THREE.MeshStandardMaterial({
      color, metalness: 0.4, roughness: 0.3, emissive: color, emissiveIntensity: 0.6
    });
    const mesh = new THREE.Mesh(geo, mat);
    const radius = 3.0 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi) * 0.55,
      radius * Math.sin(phi) * Math.sin(theta)
    );
    orbitGroup.add(mesh);
    blockData.push({
      mesh, radius, theta, phi,
      speed: 0.12 + Math.random() * 0.18,
      spin: 0.4 + Math.random() * 0.6
    });
  }
  scene.add(orbitGroup);

  // ---- Starfield particles ----
  const starCount = 300;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 24;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xcabbff, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  scene.add(starPoints);

  // ---- Mouse parallax ----
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    coreGroup.rotation.y = t * 0.18 + mouseX * 0.35;
    coreGroup.rotation.x = Math.sin(t * 0.25) * 0.08 + mouseY * 0.12;
    shellMesh.rotation.y = -t * 0.06;
    shellMesh.rotation.x = t * 0.04;

    blockData.forEach(b => {
      b.theta += 0.0016 * (b.speed * 4);
      const r = b.radius + Math.sin(t * b.speed + b.phi) * 0.15;
      b.mesh.position.set(
        r * Math.sin(b.phi) * Math.cos(b.theta),
        r * Math.cos(b.phi) * 0.55 + Math.sin(t * b.speed) * 0.2,
        r * Math.sin(b.phi) * Math.sin(b.theta)
      );
      b.mesh.rotation.x += 0.006 * b.spin;
      b.mesh.rotation.y += 0.008 * b.spin;
    });
    orbitGroup.rotation.y = t * 0.03;

    starPoints.rotation.y = t * 0.008;

    purpleLight.intensity = 3.2 + Math.sin(t * 1.3) * 0.4;
    cyanLight.intensity = 2.4 + Math.cos(t * 1.1) * 0.3;

    camera.position.x = mouseX * 0.7;
    camera.position.y = 0.6 - mouseY * 0.35;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
