import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDHeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Metallic Hex Weight Plate / Gym Core
    const plateGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.35, 6);
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.rotation.x = Math.PI / 3;
    plate.rotation.z = Math.PI / 6;
    mainGroup.add(plate);

    // 2. Outer Red Glow Ring (Torus)
    const torusGeo = new THREE.TorusGeometry(2.6, 0.04, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xe50914,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.rotation.x = Math.PI / 3;
    mainGroup.add(ring);

    // 3. Inner Concentric Ring
    const innerRingGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 60);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 3;
    mainGroup.add(innerRing);

    // 4. Subtle Floating Kinetic Particles
    const particleCount = 70;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xe50914,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const redRimLight = new THREE.PointLight(0xe50914, 3, 20);
    redRimLight.position.set(4, -3, 3);
    scene.add(redRimLight);

    const studioLight = new THREE.DirectionalLight(0xffffff, 1.2);
    studioLight.position.set(-3, 5, 4);
    scene.add(studioLight);

    // Mouse tilt tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.45;
      targetY = (e.clientY / innerHeight - 0.5) * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow rotation
        plate.rotation.y = elapsedTime * 0.25;
        ring.rotation.z = -elapsedTime * 0.15;
        particles.rotation.y = elapsedTime * 0.03;

        // Smooth mouse damping
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        mainGroup.rotation.y = currentX;
        mainGroup.rotation.x = currentY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      plateGeometry.dispose();
      plateMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-75 md:opacity-90 overflow-hidden"
      aria-hidden="true"
    />
  );
};
