const reveal = document.querySelectorAll('.reveal');

if (window.gsap) {
  gsap.to(reveal, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
  gsap.to('.orbit-core', { y: -12, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orbit-one', { rotation: 8, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orbit-two', { rotation: 43, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  document.querySelectorAll('.project-art').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      gsap.to(card.children, { x: x * 10, y: y * 10, duration: .5, overwrite: true });
    });
    card.addEventListener('mouseleave', () => gsap.to(card.children, { x: 0, y: 0, duration: .7 }));
  });
}

// A lightweight Three.js field adds depth when the optional CDN module is reachable.
import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js').then(({Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute}) => {
  const host = document.querySelector('#webgl');
  const scene = new Scene();
  const camera = new PerspectiveCamera(55, innerWidth / innerHeight, .1, 100);
  camera.position.z = 8;
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(innerWidth, innerHeight); host.appendChild(renderer.domElement);
  const positions = new Float32Array(180 * 3);
  for (let i = 0; i < positions.length; i += 3) { positions[i] = (Math.random() - .5) * 18; positions[i + 1] = (Math.random() - .5) * 10; positions[i + 2] = (Math.random() - .5) * 9; }
  const geometry = new BufferGeometry(); geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const points = new Points(geometry, new PointsMaterial({ color: 0xc9f46b, size: .018, transparent: true, opacity: .55 })); scene.add(points);
  const tick = () => { points.rotation.y += .00025; points.rotation.x = Math.sin(Date.now() * .00015) * .03; renderer.render(scene, camera); requestAnimationFrame(tick); }; tick();
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
}).catch(() => {});
