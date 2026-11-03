import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.02);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lights: Red, Violet, Purple & Crisp White
    const ambientLight = new THREE.AmbientLight(0x0e0618, 1.8);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xef4444, 4.0, 45); // Crimson
    redLight.position.set(14, 8, 10);
    scene.add(redLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3.5, 45); // Violet / Purple
    purpleLight.position.set(-14, -8, 8);
    scene.add(purpleLight);

    const whiteLight = new THREE.PointLight(0xffffff, 2.0, 50); // Radiant White
    whiteLight.position.set(0, 16, 12);
    scene.add(whiteLight);

    // 3. 3D Background Cursed Artifacts
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Materials
    const darkLacqueredMat = new THREE.MeshPhysicalMaterial({
      color: 0x08080c,
      emissive: 0x1a0614,
      emissiveIntensity: 0.25,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    const crimsonWireMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const purpleWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    // Object 1: Cursed Domain Octahedron (Left Background)
    const geo1 = new THREE.OctahedronGeometry(3.6, 1);
    const mesh1 = new THREE.Mesh(geo1, darkLacqueredMat);
    const wire1 = new THREE.Mesh(geo1, crimsonWireMat);
    const group1 = new THREE.Group();
    group1.add(mesh1);
    group1.add(wire1);
    group1.position.set(-14, 4, -8);
    objectsGroup.add(group1);

    // Object 2: Torus Knot Limitless Lattice (Right Background)
    const geo2 = new THREE.TorusKnotGeometry(2.4, 0.55, 100, 20);
    const mesh2 = new THREE.Mesh(geo2, darkLacqueredMat);
    const wire2 = new THREE.Mesh(geo2, purpleWireMat);
    const group2 = new THREE.Group();
    group2.add(mesh2);
    group2.add(wire2);
    group2.position.set(15, 6, -10);
    objectsGroup.add(group2);

    // Object 3: Floating Cleave Slash Rings
    const ring1Geo = new THREE.TorusGeometry(6.5, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.set(15, 6, -10);
    objectsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8.0, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.position.set(-14, 4, -8);
    objectsGroup.add(ring2);

    // 4. JJK Cursed Energy Particles (Red, Violet, Purple, White)
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xef4444), // Sukuna Crimson
      new THREE.Color(0xdc2626), // Blood Red
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xa855f7), // Hollow Purple
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0xffffff), // Radiant White
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 90;
      positions[i3 + 1] = (Math.random() - 0.5) * 90;
      positions[i3 + 2] = (Math.random() - 0.5) * 70;

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = 0.02 + Math.random() * 0.04;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement Listener
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (event.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Group & Camera Inertia
      camera.position.x = mouseRef.current.x * 2.2;
      camera.position.y = -mouseRef.current.y * 1.8;
      camera.lookAt(0, 0, 0);

      // Rotate objects
      group1.rotation.x = elapsedTime * 0.14;
      group1.rotation.y = elapsedTime * 0.18;

      group2.rotation.x = elapsedTime * 0.2;
      group2.rotation.y = elapsedTime * 0.16;
      group2.rotation.z = elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.x = -elapsedTime * 0.25;

      // Rise and swirl particles like cursed energy flames
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += velocities[i3 + 1];

        if (posArray[i3 + 1] > 45) {
          posArray[i3 + 1] = -45;
          posArray[i3] = (Math.random() - 0.5) * 90;
          posArray[i3 + 2] = (Math.random() - 0.5) * 70;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
