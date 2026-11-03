import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCursedSlash, playHoverSound } from '../utils/audio';
import { Sparkles, Swords, Zap, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MalevolentShrine3DProps {
  onEnterWebsite?: () => void;
  isInitialPortal?: boolean;
  className?: string;
  enableWheelZoom?: boolean;
}

export type CursedAuraMode = 'crimson' | 'purple' | 'void' | 'blackflash';

export const MalevolentShrine3D: React.FC<MalevolentShrine3DProps> = ({
  className = 'w-full h-full min-h-[460px]',
  enableWheelZoom = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [auraMode, setAuraMode] = useState<CursedAuraMode>('crimson');
  const [slashTriggerCount, setSlashTriggerCount] = useState<number>(0);
  const [cleaveActive, setCleaveActive] = useState<boolean>(false);
  const [cursedOutput, setCursedOutput] = useState<number>(150);

  // References for dynamic 3D updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const slashPlanesRef = useRef<THREE.Mesh[]>([]);
  const pointLightsRef = useRef<{
    red1: THREE.PointLight;
    red2: THREE.PointLight;
    purple: THREE.PointLight;
    coreLight: THREE.PointLight;
    keyDirLight: THREE.DirectionalLight;
  } | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const shrineGroupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state
  const mouseRef = useRef({
    isDown: false,
    x: 0,
    y: 0,
    targetRotX: 0.12,
    targetRotY: 0,
    currentRotX: 0.12,
    currentRotY: 0,
    zoom: 22,
    targetZoom: 22,
  });

  // Handle aura switch in 3D
  const handleAuraChange = (mode: CursedAuraMode) => {
    setAuraMode(mode);
    playHoverSound(600, 0.04);

    if (!pointLightsRef.current) return;
    const { red1, red2, purple, coreLight } = pointLightsRef.current;

    if (mode === 'crimson') {
      red1.color.setHex(0xef4444);
      red2.color.setHex(0xdc2626);
      purple.color.setHex(0xa855f7);
      coreLight.color.setHex(0xff2222);
    } else if (mode === 'purple') {
      red1.color.setHex(0xa855f7);
      red2.color.setHex(0x8b5cf6);
      purple.color.setHex(0x6366f1);
      coreLight.color.setHex(0xc084fc);
    } else if (mode === 'void') {
      red1.color.setHex(0x3b82f6);
      red2.color.setHex(0x6366f1);
      purple.color.setHex(0x38bdf8);
      coreLight.color.setHex(0x60a5fa);
    } else if (mode === 'blackflash') {
      red1.color.setHex(0xff0033);
      red2.color.setHex(0xdc2626);
      purple.color.setHex(0xffffff);
      coreLight.color.setHex(0xff0000);
    }
  };

  const trigger3DSlash = () => {
    playCursedSlash();
    setCleaveActive(true);
    setSlashTriggerCount((prev) => prev + 1);
    setCursedOutput((prev) => Math.min(prev + 20, 200));

    setTimeout(() => {
      setCleaveActive(false);
    }, 450);
  };

  const handleZoomIn = () => {
    mouseRef.current.targetZoom = Math.max(12, mouseRef.current.targetZoom - 3);
    playHoverSound(500, 0.02);
  };

  const handleZoomOut = () => {
    mouseRef.current.targetZoom = Math.min(35, mouseRef.current.targetZoom + 3);
    playHoverSound(400, 0.02);
  };

  const handleResetCamera = () => {
    mouseRef.current.targetRotX = 0.12;
    mouseRef.current.targetRotY = 0;
    mouseRef.current.targetZoom = 22;
    playHoverSound(550, 0.02);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Very subtle fog to maintain deep contrast without washing out the shrine
    scene.fog = new THREE.FogExp2(0x050508, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      1000
    );
    camera.position.set(0, 4, 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. High-Visibility Studio Lighting
    // Ambient light - warm tone so shadows have rich depth rather than pitch black
    const ambientLight = new THREE.AmbientLight(0x381928, 2.2);
    scene.add(ambientLight);

    // Main Key Light - Crisp warm directional light from front-top
    const keyDirLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyDirLight.position.set(12, 18, 16);
    scene.add(keyDirLight);

    // Secondary Torii Crimson Directional Light
    const crimsonDirLight = new THREE.DirectionalLight(0xef4444, 2.5);
    crimsonDirLight.position.set(-15, 12, 10);
    scene.add(crimsonDirLight);

    // Violet Rim / Back Light to outline 3D contours
    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.8);
    rimLight.position.set(0, 15, -18);
    scene.add(rimLight);

    // Point lights for local cursed energy glow
    const redLight1 = new THREE.PointLight(0xef4444, 5.0, 35);
    redLight1.position.set(8, 6, 10);
    scene.add(redLight1);

    const redLight2 = new THREE.PointLight(0xdc2626, 4.5, 30);
    redLight2.position.set(-10, -2, 8);
    scene.add(redLight2);

    const purpleLight = new THREE.PointLight(0xa855f7, 4.0, 35);
    purpleLight.position.set(0, 12, 6);
    scene.add(purpleLight);

    // Inner Demonic Mouth Glow Light
    const coreLight = new THREE.PointLight(0xff2222, 6.0, 20);
    coreLight.position.set(0, -1.0, 1.5);
    scene.add(coreLight);

    pointLightsRef.current = {
      red1: redLight1,
      red2: redLight2,
      purple: purpleLight,
      coreLight,
      keyDirLight,
    };

    // 3. Shrine Group Hierarchy
    const shrineMasterGroup = new THREE.Group();
    scene.add(shrineMasterGroup);
    shrineGroupRef.current = shrineMasterGroup;

    // --- MATERIALS (Rich, High-Contrast, Authentic JJK Palette) ---
    // Vermilion Lacquered Wood (Main pillars, eaves, walls)
    const vermilionLacqueredMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x450a0a,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.25,
    });

    // Dark Aged Mahogany / Timber (Roof body, beams)
    const darkTimberMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.5,
      metalness: 0.3,
    });

    // Gleaming Gold Trims & Ridge Filigree
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.85,
    });

    // Glowing Crimson Cursed Edge (Horns, totems, eave tips)
    const crimsonGlowingMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.4,
    });

    // Glowing Purple Cursed Accent
    const purpleGlowingMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.4,
    });

    // Crisp Ivory Bone Material (Skulls, fangs)
    const ivoryBoneMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Cursed Blood Water (Reflective base pond)
    const bloodPoolMat = new THREE.MeshStandardMaterial({
      color: 0x450a0a,
      emissive: 0x2e0606,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.8,
    });

    // --- A. Base Altar / Mountain of Skulls ---
    // Blood Pond Base
    const basePondGeo = new THREE.CylinderGeometry(13, 15, 1.0, 32);
    const basePond = new THREE.Mesh(basePondGeo, bloodPoolMat);
    basePond.position.y = -6.2;
    shrineMasterGroup.add(basePond);

    // Glowing Altar Boundary Ring
    const altarRingGeo = new THREE.TorusGeometry(12.8, 0.15, 16, 64);
    const altarRing = new THREE.Mesh(altarRingGeo, crimsonGlowingMat);
    altarRing.rotation.x = Math.PI / 2;
    altarRing.position.y = -5.7;
    shrineMasterGroup.add(altarRing);

    // Tiered Stepped Altar Pedestals
    for (let i = 0; i < 4; i++) {
      const stepWidth = 9.5 - i * 1.4;
      const stepGeo = new THREE.BoxGeometry(stepWidth, 0.45, stepWidth);
      const stepMesh = new THREE.Mesh(stepGeo, vermilionLacqueredMat);
      stepMesh.position.y = -5.6 + i * 0.45;
      shrineMasterGroup.add(stepMesh);

      // Gold step edge accents
      const borderGeo = new THREE.BoxGeometry(stepWidth + 0.1, 0.1, stepWidth + 0.1);
      const borderMesh = new THREE.Mesh(borderGeo, goldTrimMat);
      borderMesh.position.y = -5.4 + i * 0.45;
      shrineMasterGroup.add(borderMesh);
    }

    // Mountain of Ivory Skulls with Glowing Crimson Eyes
    const skullGroup = new THREE.Group();
    const skullGeo = new THREE.SphereGeometry(0.38, 10, 10);
    const eyeSocketGeo = new THREE.SphereGeometry(0.09, 6, 6);
    const redEyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    for (let s = 0; s < 50; s++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.2 + Math.random() * 5.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -5.2 + Math.random() * 1.4;

      const singleSkull = new THREE.Mesh(skullGeo, ivoryBoneMat);
      singleSkull.scale.set(1, 1.25, 1);
      singleSkull.position.set(x, y, z);
      singleSkull.rotation.y = angle + Math.PI;

      // Glow eye sockets
      const eyeL = new THREE.Mesh(eyeSocketGeo, redEyeMat);
      eyeL.position.set(0.14, 0.1, 0.32);
      const eyeR = new THREE.Mesh(eyeSocketGeo, redEyeMat);
      eyeR.position.set(-0.14, 0.1, 0.32);
      singleSkull.add(eyeL);
      singleSkull.add(eyeR);

      skullGroup.add(singleSkull);
    }
    shrineMasterGroup.add(skullGroup);

    // --- B. Shrine Main Chamber & Torii Vermilion Columns ---
    const mainPillars = [
      [-2.6, -2.6],
      [2.6, -2.6],
      [-2.6, 2.6],
      [2.6, 2.6],
      [-3.4, 0],
      [3.4, 0],
    ];

    mainPillars.forEach(([px, pz]) => {
      const pillarGeo = new THREE.CylinderGeometry(0.32, 0.36, 5.8, 20);
      const pillar = new THREE.Mesh(pillarGeo, vermilionLacqueredMat);
      pillar.position.set(px, -1.3, pz);
      shrineMasterGroup.add(pillar);

      // Gold capital ring
      const goldRingGeo = new THREE.TorusGeometry(0.38, 0.08, 12, 24);
      const ringTop = new THREE.Mesh(goldRingGeo, goldTrimMat);
      ringTop.rotation.x = Math.PI / 2;
      ringTop.position.set(px, 1.4, pz);
      shrineMasterGroup.add(ringTop);

      const ringBot = new THREE.Mesh(goldRingGeo, goldTrimMat);
      ringBot.rotation.x = Math.PI / 2;
      ringBot.position.set(px, -3.8, pz);
      shrineMasterGroup.add(ringBot);
    });

    // Central Demonic Jaw / Mouth Chamber (Dark temple sanctum)
    const mouthBackingGeo = new THREE.BoxGeometry(4.4, 4.8, 4.4);
    const mouthBacking = new THREE.Mesh(mouthBackingGeo, darkTimberMat);
    mouthBacking.position.set(0, -1.3, 0);
    shrineMasterGroup.add(mouthBacking);

    // Temple Red Interior Shorter Pillars
    const innerPillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 4.2, 16);
    const innerP1 = new THREE.Mesh(innerPillarGeo, vermilionLacqueredMat);
    innerP1.position.set(-1.6, -1.3, 1.8);
    const innerP2 = new THREE.Mesh(innerPillarGeo, vermilionLacqueredMat);
    innerP2.position.set(1.6, -1.3, 1.8);
    shrineMasterGroup.add(innerP1);
    shrineMasterGroup.add(innerP2);

    // Sharp Ivory Demonic Fangs at the center entrance
    for (let f = 0; f < 6; f++) {
      const fangGeo = new THREE.ConeGeometry(0.2, 1.0, 10);
      
      // Upper Jaw Fangs pointing down
      const fangTop = new THREE.Mesh(fangGeo, ivoryBoneMat);
      fangTop.rotation.x = Math.PI;
      fangTop.position.set(-1.5 + f * 0.6, 0.7, 2.25);
      shrineMasterGroup.add(fangTop);

      // Lower Jaw Fangs pointing up
      const fangBottom = new THREE.Mesh(fangGeo, ivoryBoneMat);
      fangBottom.position.set(-1.5 + f * 0.6, -3.1, 2.25);
      shrineMasterGroup.add(fangBottom);
    }

    // Glowing Inner Cursed Core Sphere (Sukuna Cursed Heart)
    const coreGeo = new THREE.SphereGeometry(1.3, 28, 28);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff1e1e,
      emissive: 0xdc2626,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.3,
    });
    const cursedCore = new THREE.Mesh(coreGeo, coreMat);
    cursedCore.position.set(0, -1.2, 0.6);
    shrineMasterGroup.add(cursedCore);

    // Floating Concentric Cursed Rune Discs around the core
    const coreDiscGeo = new THREE.RingGeometry(1.6, 1.75, 32);
    const coreDiscMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const coreDisc = new THREE.Mesh(coreDiscGeo, coreDiscMat);
    coreDisc.position.set(0, -1.2, 0.6);
    shrineMasterGroup.add(coreDisc);

    // --- C. Multi-Tiered Pagoda Roofs with Golden Ridges & Horns ---
    // Tier 1 (Lower Eaves)
    const roof1Geo = new THREE.ConeGeometry(7.2, 2.4, 4);
    const roof1 = new THREE.Mesh(roof1Geo, vermilionLacqueredMat);
    roof1.position.y = 2.4;
    roof1.rotation.y = Math.PI / 4;
    roof1.scale.set(1.15, 0.55, 1.15);
    shrineMasterGroup.add(roof1);

    // Tier 1 Gold Ridge Caps
    const ridge1Geo = new THREE.TorusGeometry(5.2, 0.12, 8, 4);
    const ridge1 = new THREE.Mesh(ridge1Geo, goldTrimMat);
    ridge1.rotation.x = Math.PI / 2;
    ridge1.rotation.z = Math.PI / 4;
    ridge1.position.y = 1.8;
    shrineMasterGroup.add(ridge1);

    // Tier 2 (Upper Eaves)
    const roof2Geo = new THREE.ConeGeometry(5.2, 2.2, 4);
    const roof2 = new THREE.Mesh(roof2Geo, vermilionLacqueredMat);
    roof2.position.y = 4.3;
    roof2.rotation.y = Math.PI / 4;
    roof2.scale.set(1.1, 0.55, 1.1);
    shrineMasterGroup.add(roof2);

    // Tier 2 Gold Ridge Caps
    const ridge2Geo = new THREE.TorusGeometry(3.8, 0.1, 8, 4);
    const ridge2 = new THREE.Mesh(ridge2Geo, goldTrimMat);
    ridge2.rotation.x = Math.PI / 2;
    ridge2.rotation.z = Math.PI / 4;
    ridge2.position.y = 3.8;
    shrineMasterGroup.add(ridge2);

    // Giant Bull Horn Totems (Malevolent Shrine Iconic Silhouette)
    const hornGeo = new THREE.TorusGeometry(3.6, 0.28, 16, 48, Math.PI * 0.72);
    
    // Left Upper Horn
    const hornL1 = new THREE.Mesh(hornGeo, crimsonGlowingMat);
    hornL1.position.set(-2.4, 4.0, 0);
    hornL1.rotation.z = Math.PI * 0.76;
    shrineMasterGroup.add(hornL1);

    // Right Upper Horn
    const hornR1 = new THREE.Mesh(hornGeo, crimsonGlowingMat);
    hornR1.position.set(2.4, 4.0, 0);
    hornR1.rotation.z = -Math.PI * 0.24;
    hornR1.scale.x = -1;
    shrineMasterGroup.add(hornR1);

    // Forward Secondary Horns
    const hornF1 = new THREE.Mesh(hornGeo, purpleGlowingMat);
    hornF1.position.set(0, 4.4, 2.2);
    hornF1.rotation.x = Math.PI * 0.32;
    hornF1.rotation.y = Math.PI * 0.5;
    hornF1.scale.setScalar(0.75);
    shrineMasterGroup.add(hornF1);

    // Top Shrine Spire Totem
    const totemGeo = new THREE.OctahedronGeometry(1.0, 0);
    const totem = new THREE.Mesh(totemGeo, goldTrimMat);
    totem.position.y = 6.4;
    shrineMasterGroup.add(totem);

    const totemGlowRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.08, 12, 32),
      crimsonGlowingMat
    );
    totemGlowRing.rotation.x = Math.PI / 2;
    totemGlowRing.position.y = 6.4;
    shrineMasterGroup.add(totemGlowRing);

    // --- D. Floating Cleave & Dismantle Laser Slash Rings ---
    const ring1Geo = new THREE.TorusGeometry(8.8, 0.08, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.85,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    shrineMasterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(11.0, 0.06, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    shrineMasterGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(13.2, 0.05, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    shrineMasterGroup.add(ring3);

    // --- E. Slicing Cleave Planes (Triggered on slash) ---
    const slashPlanes: THREE.Mesh[] = [];
    const slashPlaneGeo = new THREE.PlaneGeometry(32, 0.2);
    for (let p = 0; p < 8; p++) {
      const slashMat = new THREE.MeshBasicMaterial({
        color: p % 2 === 0 ? 0xff2222 : 0xa855f7,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const slashMesh = new THREE.Mesh(slashPlaneGeo, slashMat);
      slashMesh.position.set(0, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8);
      slashMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(slashMesh);
      slashPlanes.push(slashMesh);
    }
    slashPlanesRef.current = slashPlanes;

    // --- F. Cursed Energy Particle Storm (Red, Violet, Purple, White) ---
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xef4444), // Sukuna Crimson
      new THREE.Color(0xdc2626), // Blood Red
      new THREE.Color(0xa855f7), // Hollow Purple
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xffffff), // Radiant White
      new THREE.Color(0xf59e0b), // Golden Spark
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 20;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 32;
      positions[i3 + 2] = Math.sin(angle) * radius;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = 0.035 + Math.random() * 0.06;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // --- Interactive Mouse Handlers (Clean, Non-blocking) ---
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current.isDown) return;
      const deltaX = e.clientX - mouseRef.current.x;
      const deltaY = e.clientY - mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      mouseRef.current.targetRotY += deltaX * 0.008;
      mouseRef.current.targetRotX = Math.max(-0.4, Math.min(0.6, mouseRef.current.targetRotX + deltaY * 0.008));
    };

    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    // Optional Wheel zoom ONLY if enableWheelZoom is explicitly enabled, without blocking normal page scroll
    const onWheel = (e: WheelEvent) => {
      if (!enableWheelZoom) return;
      // If user holds Shift/Ctrl or if explicitly requested in full-screen modal
      mouseRef.current.targetZoom = Math.max(12, Math.min(36, mouseRef.current.targetZoom + e.deltaY * 0.02));
    };

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        mouseRef.current.isDown = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!mouseRef.current.isDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;

      mouseRef.current.targetRotY += deltaX * 0.01;
      mouseRef.current.targetRotX = Math.max(-0.4, Math.min(0.6, mouseRef.current.targetRotX + deltaY * 0.01));
    };

    const onTouchEnd = () => {
      mouseRef.current.isDown = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    if (enableWheelZoom) {
      container.addEventListener('wheel', onWheel, { passive: true });
    }

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / (container.clientHeight || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera orbit lerp
      mouseRef.current.currentRotY += (mouseRef.current.targetRotY - mouseRef.current.currentRotY) * 0.06;
      mouseRef.current.currentRotX += (mouseRef.current.targetRotX - mouseRef.current.currentRotX) * 0.06;
      mouseRef.current.zoom += (mouseRef.current.targetZoom - mouseRef.current.zoom) * 0.08;

      const baseAngle = elapsedTime * 0.12 + mouseRef.current.currentRotY;
      camera.position.x = Math.sin(baseAngle) * mouseRef.current.zoom;
      camera.position.z = Math.cos(baseAngle) * mouseRef.current.zoom;
      camera.position.y = 2.5 + mouseRef.current.currentRotX * 16;
      camera.lookAt(0, 0.5, 0);

      // Pulse Cursed Core
      cursedCore.scale.setScalar(1 + Math.sin(elapsedTime * 4.5) * 0.1);
      coreDisc.rotation.z = -elapsedTime * 1.5;

      // Rotate Rings
      ring1.rotation.z = elapsedTime * 0.7;
      ring2.rotation.y = -elapsedTime * 0.5;
      ring3.rotation.x = elapsedTime * 0.4;

      // Floating Totem & Glow Ring
      totem.rotation.y = elapsedTime * 1.2;
      totemGlowRing.rotation.z = elapsedTime * 1.8;

      // Slicing Cleave planes animation
      slashPlanes.forEach((plane) => {
        const mat = plane.material as THREE.MeshBasicMaterial;
        if (mat.opacity > 0) {
          mat.opacity -= 0.04;
          plane.scale.x += 0.04;
        }
      });

      // Update Cursed Energy Particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += velocities[i3 + 1];

        if (posArray[i3 + 1] > 18) {
          posArray[i3 + 1] = -12;
          const angle = Math.random() * Math.PI * 2;
          const radius = 2 + Math.random() * 20;
          posArray[i3] = Math.cos(angle) * radius;
          posArray[i3 + 2] = Math.sin(angle) * radius;
        }

        const curX = posArray[i3];
        const curZ = posArray[i3 + 2];
        const currentAngle = Math.atan2(curZ, curX) + 0.012;
        const currentDist = Math.sqrt(curX * curX + curZ * curZ);
        posArray[i3] = Math.cos(currentAngle) * currentDist;
        posArray[i3 + 2] = Math.sin(currentAngle) * currentDist;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (enableWheelZoom) {
        container.removeEventListener('wheel', onWheel);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enableWheelZoom]);

  // Trigger slash planes whenever slashTriggerCount updates
  useEffect(() => {
    if (slashTriggerCount === 0) return;
    slashPlanesRef.current.forEach((plane) => {
      const mat = plane.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95;
      plane.scale.set(1, 1, 1);
      plane.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      plane.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
    });
  }, [slashTriggerCount]);

  return (
    <div className={`relative ${className} select-none overflow-hidden rounded-2xl bg-[#050508] border border-red-500/30 shadow-2xl shadow-red-950/40`}>
      {/* 3D WebGL Canvas Mounting Point */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Screen Cleave Flash FX */}
      {cleaveActive && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="absolute w-[180%] h-[3px] bg-gradient-to-r from-transparent via-red-500 to-white rotate-[-25deg] shadow-[0_0_25px_#ef4444] animate-pulse" />
          <div className="absolute w-[180%] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-white rotate-[35deg] shadow-[0_0_20px_#8b5cf6]" />
          <div className="absolute inset-0 bg-red-600/15 mix-blend-screen" />
        </div>
      )}

      {/* Top HUD for Domain Expansion */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10 gap-2">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-red-500/50 text-red-400 flex items-center gap-2 shadow-lg shadow-black">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              伏魔御廚子 &bull; MALEVOLENT SHRINE 3D
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Output: <strong className="text-red-400 font-bold">{cursedOutput}%</strong></span>
          </div>
        </div>

        {/* Aura Switcher */}
        <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-xl border border-zinc-800 text-xs font-mono">
          {(['crimson', 'purple', 'void', 'blackflash'] as CursedAuraMode[]).map((mode) => (
            <button
              key={mode}
              id={`shrine-aura-btn-${mode}`}
              onClick={() => handleAuraChange(mode)}
              className={`px-2.5 py-1 rounded-lg capitalize text-xs transition-all ${
                auraMode === mode
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/60'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {mode === 'crimson' && '🔴 Crimson'}
              {mode === 'purple' && '🟣 Purple'}
              {mode === 'void' && '🔵 Void'}
              {mode === 'blackflash' && '⚡ Flash'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Bottom Control Deck */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-10">
        
        {/* Helper Hint & Camera Zoom Buttons */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-mono text-zinc-300 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Click &amp; Drag to Orbit 3D Shrine</span>
          </div>

          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-zinc-800">
            <button
              id="shrine-zoom-in-btn"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              id="shrine-zoom-out-btn"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              id="shrine-reset-camera-btn"
              onClick={handleResetCamera}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            id="shrine-cleave-btn"
            onClick={trigger3DSlash}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-red-950/50 hover:scale-105 active:scale-95 transition-all border border-red-400/40"
          >
            <Swords className="w-4 h-4 text-white animate-pulse" />
            <span>Cast Cleave &amp; Dismantle (捌・解)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
