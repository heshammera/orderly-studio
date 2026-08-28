"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { WorldId } from "./WorldCanvas";

interface ThreeWorldCanvasProps {
  worldId: WorldId;
  opacity?: number;
}

export const ThreeWorldCanvas: React.FC<ThreeWorldCanvasProps> = ({
  worldId,
  opacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, prevX: 0, prevY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Initialize Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. World Specific Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Dynamic animation hooks stored in an array
    const updateCallbacks: ((time: number, delta: number) => void)[] = [];

    // Ambient + Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.0);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight.position.set(0, 0, 8);
    scene.add(pointLight);

    // 3. Build 3D World Geometry based on WorldId
    switch (worldId) {
      /* ──────────────────────────────────────────────────────────
         WORLD 01: UI / UX — SPATIAL GLASS PRISM & LAYERED HOLO-PANELS
      ────────────────────────────────────────────────────────── */
      case "uiux": {
        scene.fog = new THREE.FogExp2(0x0a0618, 0.025);
        pointLight.color.setHex(0xc084fc);

        // Infinite Grid Floor
        const gridHelper = new THREE.GridHelper(60, 40, 0x8b5cf6, 0x3b0764);
        gridHelper.position.y = -6;
        worldGroup.add(gridHelper);

        // Center Floating Glass Prism Cube
        const prismGeo = new THREE.BoxGeometry(4.5, 5.5, 0.4);
        const prismMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.85,
          opacity: 1,
          transparent: true,
          roughness: 0.15,
          ior: 1.5,
          thickness: 1.5,
          specularIntensity: 1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        });
        const prismMesh = new THREE.Mesh(prismGeo, prismMat);
        worldGroup.add(prismMesh);

        // Glowing Wireframe Edge on the Prism
        const prismEdges = new THREE.EdgesGeometry(prismGeo);
        const prismLineMat = new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2 });
        const prismLine = new THREE.LineSegments(prismEdges, prismLineMat);
        prismMesh.add(prismLine);

        // Layered 3D Floating Interface Cards in Z-Space
        const cardGeo = new THREE.PlaneGeometry(3.2, 1.8);
        const cardPositions = [
          { pos: [-4.2, 2.5, -2], rot: [0, 0.25, -0.05], color: 0x818cf8 },
          { pos: [4.2, 2.0, -1.5], rot: [0, -0.25, 0.05], color: 0xc084fc },
          { pos: [-3.8, -2.5, 1.5], rot: [0, 0.3, 0.05], color: 0x38bdf8 },
          { pos: [4.0, -2.2, 1.8], rot: [0, -0.3, -0.05], color: 0xec4899 },
          { pos: [0, 4.2, -3], rot: [0.2, 0, 0], color: 0xa855f7 },
        ];

        const cards: THREE.Mesh[] = [];
        cardPositions.forEach((cp) => {
          const cardMat = new THREE.MeshStandardMaterial({
            color: cp.color,
            transparent: true,
            opacity: 0.35,
            roughness: 0.2,
            metalness: 0.8,
            side: THREE.DoubleSide,
          });
          const cardMesh = new THREE.Mesh(cardGeo, cardMat);
          cardMesh.position.set(cp.pos[0], cp.pos[1], cp.pos[2]);
          cardMesh.rotation.set(cp.rot[0], cp.rot[1], cp.rot[2]);

          const cardEdge = new THREE.LineSegments(
            new THREE.EdgesGeometry(cardGeo),
            new THREE.LineBasicMaterial({ color: cp.color })
          );
          cardMesh.add(cardEdge);
          worldGroup.add(cardMesh);
          cards.push(cardMesh);
        });

        // 3D Glass Particle Motes
        const motesGeo = new THREE.BufferGeometry();
        const motesCount = 400;
        const motesPos = new Float32Array(motesCount * 3);
        for (let i = 0; i < motesCount * 3; i += 3) {
          motesPos[i] = (Math.random() - 0.5) * 35;
          motesPos[i + 1] = (Math.random() - 0.5) * 25;
          motesPos[i + 2] = (Math.random() - 0.5) * 30;
        }
        motesGeo.setAttribute("position", new THREE.BufferAttribute(motesPos, 3));
        const motesMat = new THREE.PointsMaterial({
          color: 0xc084fc,
          size: 0.12,
          transparent: true,
          opacity: 0.7,
        });
        const motesPoints = new THREE.Points(motesGeo, motesMat);
        worldGroup.add(motesPoints);

        updateCallbacks.push((time) => {
          prismMesh.rotation.y = Math.sin(time * 0.4) * 0.3;
          prismMesh.rotation.x = Math.cos(time * 0.3) * 0.15;
          prismMesh.position.y = Math.sin(time * 0.8) * 0.3;

          cards.forEach((c, idx) => {
            c.position.y += Math.sin(time * 1.2 + idx) * 0.005;
            c.rotation.z += Math.cos(time * 0.8 + idx) * 0.002;
          });

          motesPoints.rotation.y = time * 0.03;
        });
        break;
      }

      /* ──────────────────────────────────────────────────────────
         WORLD 02: SOFTWARE ENGINEERING & SAAS — QUANTUM CYBER MATRIX
      ────────────────────────────────────────────────────────── */
      case "engineering":
      case "saas": {
        scene.fog = new THREE.FogExp2(0x010514, 0.028);
        pointLight.color.setHex(0x38bdf8);

        // Cyber Grid with glow
        const cyberGrid = new THREE.GridHelper(70, 50, 0x0284c7, 0x082f49);
        cyberGrid.position.y = -7;
        worldGroup.add(cyberGrid);

        // Quantum Processor Core: Nested Rotating Wireframes
        const coreGroup = new THREE.Group();
        worldGroup.add(coreGroup);

        // 1. Inner Plasma Sphere
        const plasmaGeo = new THREE.SphereGeometry(1.6, 32, 32);
        const plasmaMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: false });
        const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
        coreGroup.add(plasmaMesh);

        // 2. Mid Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(2.8, 1);
        const icoMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          wireframe: true,
          emissive: 0x0369a1,
          emissiveIntensity: 0.8,
        });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        coreGroup.add(icoMesh);

        // 3. Outer Dodecahedron Cage
        const dodecGeo = new THREE.DodecahedronGeometry(4.2, 0);
        const dodecEdges = new THREE.EdgesGeometry(dodecGeo);
        const dodecLines = new THREE.LineSegments(
          dodecEdges,
          new THREE.LineBasicMaterial({ color: 0x7dd3fc, linewidth: 2 })
        );
        coreGroup.add(dodecLines);

        // Orbiting Data Nodes (Cubes)
        const cubeCount = 28;
        const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          metalness: 0.9,
          roughness: 0.1,
        });
        const cubes: THREE.Mesh[] = [];

        for (let i = 0; i < cubeCount; i++) {
          const cMesh = new THREE.Mesh(cubeGeo, cubeMat);
          worldGroup.add(cMesh);
          cubes.push(cMesh);
        }

        // 3D Streaming Matrix Code Particles
        const streamCount = 1200;
        const streamGeo = new THREE.BufferGeometry();
        const streamPos = new Float32Array(streamCount * 3);
        for (let i = 0; i < streamCount * 3; i += 3) {
          streamPos[i] = (Math.random() - 0.5) * 40;
          streamPos[i + 1] = (Math.random() - 0.5) * 35;
          streamPos[i + 2] = (Math.random() - 0.5) * 40;
        }
        streamGeo.setAttribute("position", new THREE.BufferAttribute(streamPos, 3));
        const streamMat = new THREE.PointsMaterial({
          color: 0x38bdf8,
          size: 0.15,
          transparent: true,
          opacity: 0.85,
        });
        const streamPoints = new THREE.Points(streamGeo, streamMat);
        worldGroup.add(streamPoints);

        updateCallbacks.push((time) => {
          coreGroup.rotation.y = time * 0.5;
          coreGroup.rotation.x = time * 0.3;
          dodecLines.rotation.y = -time * 0.6;
          icoMesh.rotation.z = time * 0.4;

          const scale = 1 + Math.sin(time * 3) * 0.08;
          plasmaMesh.scale.set(scale, scale, scale);

          cubes.forEach((c, idx) => {
            const angle = time * 0.8 + (idx / cubeCount) * Math.PI * 2;
            const radius = 6.5 + Math.sin(time * 1.5 + idx) * 1.2;
            const yOffset = Math.sin(time * 1.2 + idx * 0.5) * 3.5;
            c.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
            c.rotation.x = time * 2 + idx;
            c.rotation.y = time * 2;
          });

          streamPoints.rotation.y = time * 0.04;
        });
        break;
      }

      /* ──────────────────────────────────────────────────────────
         WORLD 03: BRAND IDENTITY — 3D METAMORPHIC GOLD LIQUID SCULPTURE
      ────────────────────────────────────────────────────────── */
      case "branding":
      case "packaging": {
        scene.fog = new THREE.FogExp2(0x0f0802, 0.025);
        pointLight.color.setHex(0xfbbf24);

        // Centerpiece: Luxurious 3D Gold Torus Knot Sculpture
        const goldGeo = new THREE.TorusKnotGeometry(2.6, 0.75, 180, 32, 2, 3);
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xd97706,
          metalness: 0.95,
          roughness: 0.12,
          emissive: 0x78350f,
          emissiveIntensity: 0.4,
        });
        const goldMesh = new THREE.Mesh(goldGeo, goldMat);
        worldGroup.add(goldMesh);

        // Outer Metallic Gold Halo Rings
        const haloGeo1 = new THREE.TorusGeometry(6.2, 0.04, 16, 100);
        const haloMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
        const halo1 = new THREE.Mesh(haloGeo1, haloMat);
        worldGroup.add(halo1);

        const haloGeo2 = new THREE.TorusGeometry(7.5, 0.03, 16, 100);
        const halo2 = new THREE.Mesh(haloGeo2, haloMat);
        halo2.rotation.x = Math.PI / 3;
        worldGroup.add(halo2);

        // Celestial Gold Dust Galaxy
        const dustCount = 900;
        const dustGeo = new THREE.BufferGeometry();
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount * 3; i += 3) {
          const r = 4 + Math.random() * 14;
          const theta = Math.random() * Math.PI * 2;
          const phi = (Math.random() - 0.5) * 1.8;
          dustPos[i] = r * Math.cos(theta);
          dustPos[i + 1] = r * Math.sin(phi) * 2.5;
          dustPos[i + 2] = r * Math.sin(theta);
        }
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
        const dustPoints = new THREE.Points(
          dustGeo,
          new THREE.PointsMaterial({ color: 0xfef08a, size: 0.14, transparent: true, opacity: 0.85 })
        );
        worldGroup.add(dustPoints);

        updateCallbacks.push((time) => {
          goldMesh.rotation.x = time * 0.35;
          goldMesh.rotation.y = time * 0.45;
          goldMesh.position.y = Math.sin(time * 0.7) * 0.4;

          halo1.rotation.z = time * 0.2;
          halo1.rotation.y = time * 0.15;
          halo2.rotation.x = Math.PI / 3 + Math.sin(time * 0.3) * 0.2;
          halo2.rotation.z = -time * 0.25;

          dustPoints.rotation.y = time * 0.05;
        });
        break;
      }

      /* ──────────────────────────────────────────────────────────
         WORLD 04: AI & NEURAL AUTOMATION — 3D SYNAPTIC NEURAL CLUSTER
      ────────────────────────────────────────────────────────── */
      case "ai": {
        scene.fog = new THREE.FogExp2(0x060014, 0.025);
        pointLight.color.setHex(0xa855f7);

        const nodeCount = 55;
        const neuralNodes: { mesh: THREE.Mesh; pos: THREE.Vector3 }[] = [];
        const nodeGeo = new THREE.SphereGeometry(0.25, 16, 16);

        for (let i = 0; i < nodeCount; i++) {
          const r = 3 + Math.random() * 5.5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const pos = new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          );

          const isCore = Math.random() > 0.7;
          const nodeMat = new THREE.MeshStandardMaterial({
            color: isCore ? 0xec4899 : 0xa855f7,
            emissive: isCore ? 0xdb2777 : 0x7e22ce,
            emissiveIntensity: 1.2,
          });
          const nMesh = new THREE.Mesh(nodeGeo, nodeMat);
          nMesh.position.copy(pos);
          worldGroup.add(nMesh);
          neuralNodes.push({ mesh: nMesh, pos });
        }

        // Synaptic Lines between close nodes
        const linePositions: number[] = [];
        for (let a = 0; a < nodeCount; a++) {
          for (let b = a + 1; b < nodeCount; b++) {
            const dist = neuralNodes[a].pos.distanceTo(neuralNodes[b].pos);
            if (dist < 4.2) {
              linePositions.push(
                neuralNodes[a].pos.x, neuralNodes[a].pos.y, neuralNodes[a].pos.z,
                neuralNodes[b].pos.x, neuralNodes[b].pos.y, neuralNodes[b].pos.z
              );
            }
          }
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.35,
        });
        const synapses = new THREE.LineSegments(lineGeo, lineMat);
        worldGroup.add(synapses);

        // Core Quantum AI Orb
        const coreOrb = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true })
        );
        worldGroup.add(coreOrb);

        // Nebula Cosmic Dust
        const nebulaGeo = new THREE.BufferGeometry();
        const nebulaCount = 1000;
        const nebulaPos = new Float32Array(nebulaCount * 3);
        for (let i = 0; i < nebulaCount * 3; i += 3) {
          nebulaPos[i] = (Math.random() - 0.5) * 35;
          nebulaPos[i + 1] = (Math.random() - 0.5) * 35;
          nebulaPos[i + 2] = (Math.random() - 0.5) * 35;
        }
        nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
        const nebulaPoints = new THREE.Points(
          nebulaGeo,
          new THREE.PointsMaterial({ color: 0xd8b4fe, size: 0.12, transparent: true, opacity: 0.75 })
        );
        worldGroup.add(nebulaPoints);

        updateCallbacks.push((time) => {
          worldGroup.rotation.y = time * 0.15;
          worldGroup.rotation.x = Math.sin(time * 0.1) * 0.2;
          coreOrb.rotation.y = -time * 0.5;
          nebulaPoints.rotation.y = time * 0.02;
        });
        break;
      }

      /* ──────────────────────────────────────────────────────────
         WORLD 05: MOTION DESIGN & 3D — KINETIC GYROSCOPIC HYPER-ENGINE
      ────────────────────────────────────────────────────────── */
      case "motion": {
        scene.fog = new THREE.FogExp2(0x0a010c, 0.025);
        pointLight.color.setHex(0xf43f5e);

        const gyroGroup = new THREE.Group();
        worldGroup.add(gyroGroup);

        // 4 Nested Gyro Rings
        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(4.8, 0.12, 16, 80),
          new THREE.MeshStandardMaterial({ color: 0xf43f5e, metalness: 0.9, roughness: 0.15 })
        );
        gyroGroup.add(ring1);

        const ring2 = new THREE.Mesh(
          new THREE.TorusGeometry(3.8, 0.1, 16, 80),
          new THREE.MeshStandardMaterial({ color: 0xfb7185, metalness: 0.9, roughness: 0.15 })
        );
        gyroGroup.add(ring2);

        const ring3 = new THREE.Mesh(
          new THREE.TorusGeometry(2.8, 0.08, 16, 80),
          new THREE.MeshStandardMaterial({ color: 0xfd9898, metalness: 0.9, roughness: 0.15 })
        );
        gyroGroup.add(ring3);

        // Centerpiece: 3D Crystal Octahedron Core
        const crystalMesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.6, 0),
          new THREE.MeshStandardMaterial({
            color: 0xf43f5e,
            emissive: 0x9f1239,
            emissiveIntensity: 0.8,
            metalness: 0.9,
            roughness: 0.1,
          })
        );
        gyroGroup.add(crystalMesh);

        // Orbiting Anamorphic Frame Guides
        const frameGeo = new THREE.BoxGeometry(10, 6, 0.02);
        const frameEdges = new THREE.EdgesGeometry(frameGeo);
        const frameLines = new THREE.LineSegments(
          frameEdges,
          new THREE.LineBasicMaterial({ color: 0xfae8ff, transparent: true, opacity: 0.25 })
        );
        worldGroup.add(frameLines);

        updateCallbacks.push((time) => {
          ring1.rotation.x = time * 0.8;
          ring2.rotation.y = time * 1.1;
          ring3.rotation.z = time * 1.4;
          crystalMesh.rotation.x = time * 0.5;
          crystalMesh.rotation.y = time * 0.7;
          frameLines.rotation.z = Math.sin(time * 0.2) * 0.05;
        });
        break;
      }

      /* ──────────────────────────────────────────────────────────
         WORLD 06: DIGITAL MARKETING & GROWTH — 3D HOLOGRAPHIC DATA GLOBE
      ────────────────────────────────────────────────────────── */
      case "marketing":
      case "ecommerce":
      default: {
        scene.fog = new THREE.FogExp2(0x011308, 0.025);
        pointLight.color.setHex(0x34d399);

        // 3D Wireframe Hologram Globe
        const globeGeo = new THREE.SphereGeometry(3.5, 32, 32);
        const globeMat = new THREE.MeshStandardMaterial({
          color: 0x059669,
          wireframe: true,
          emissive: 0x064e3b,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.75,
        });
        const globeMesh = new THREE.Mesh(globeGeo, globeMat);
        worldGroup.add(globeMesh);

        // 3D Data Skyscraper Bars sprouting from the globe
        const barGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
        const barMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
        const cityBars: THREE.Mesh[] = [];

        for (let i = 0; i < 35; i++) {
          const bMesh = new THREE.Mesh(barGeo, barMat);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const dir = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
          );
          bMesh.position.copy(dir.clone().multiplyScalar(3.5 + 0.9));
          bMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          globeMesh.add(bMesh);
          cityBars.push(bMesh);
        }

        // Orbiting Satellite Growth Rings
        const satRing = new THREE.Mesh(
          new THREE.TorusGeometry(6.2, 0.03, 16, 100),
          new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
        );
        satRing.rotation.x = Math.PI / 4;
        worldGroup.add(satRing);

        // Data Stream Particles
        const growthCount = 700;
        const growthGeo = new THREE.BufferGeometry();
        const growthPos = new Float32Array(growthCount * 3);
        for (let i = 0; i < growthCount * 3; i += 3) {
          growthPos[i] = (Math.random() - 0.5) * 35;
          growthPos[i + 1] = (Math.random() - 0.5) * 25;
          growthPos[i + 2] = (Math.random() - 0.5) * 35;
        }
        growthGeo.setAttribute("position", new THREE.BufferAttribute(growthPos, 3));
        const growthPoints = new THREE.Points(
          growthGeo,
          new THREE.PointsMaterial({ color: 0xa7f3d0, size: 0.12, transparent: true, opacity: 0.8 })
        );
        worldGroup.add(growthPoints);

        updateCallbacks.push((time) => {
          globeMesh.rotation.y = time * 0.35;
          satRing.rotation.z = time * 0.2;
          growthPoints.rotation.y = time * 0.03;
        });
        break;
      }
    }

    // 4. Mouse / Drag Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (mouse.isDown) {
        const deltaX = e.clientX - mouse.prevX;
        const deltaY = e.clientY - mouse.prevY;
        worldGroup.rotation.y += deltaX * 0.006;
        worldGroup.rotation.x += deltaY * 0.006;
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouse = mouseRef.current;
        if (mouse.isDown) {
          const deltaX = touch.clientX - mouse.prevX;
          const deltaY = touch.clientY - mouse.prevY;
          worldGroup.rotation.y += deltaX * 0.008;
          worldGroup.rotation.x += deltaY * 0.008;
          mouse.prevX = touch.clientX;
          mouse.prevY = touch.clientY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.isDown = true;
        mouseRef.current.prevX = e.touches[0].clientX;
        mouseRef.current.prevY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    // 5. Resize Listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop (60 FPS)
    let prevTime = performance.now();
    const animate = (timeNow: number) => {
      const delta = (timeNow - prevTime) / 1000;
      prevTime = timeNow;
      const totalTime = timeNow / 1000;

      // Smooth camera parallax
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 2.5;
      camera.position.y = -mouse.y * 2.5;
      camera.lookAt(0, 0, 0);

      // Execute world updates
      updateCallbacks.forEach((cb) => cb(totalTime, delta));

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [worldId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ opacity }}
    />
  );
};
