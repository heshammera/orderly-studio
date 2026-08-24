"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HybridOrbProps {
  scrollProgress?: number;
}

const HybridOrbMesh: React.FC<HybridOrbProps> = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  // 4,200 particles with dual chaos/order coordinates
  const { positions, chaosPositions, orderPositions, colors } = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const chaosPos = new Float32Array(count * 3);
    const orderPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cBlue = new THREE.Color("#2B6CFF");
    const cViolet = new THREE.Color("#7C3AED");
    const cCoral = new THREE.Color("#E8614A");
    const cWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      // 1. Order positions: Structured nested orbital shells
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.sqrt(count * Math.PI) * theta;
      const rOrder = 2.1 + (Math.random() - 0.5) * 0.35;

      const ox = rOrder * Math.sin(theta) * Math.cos(phi);
      const oy = rOrder * Math.sin(theta) * Math.sin(phi);
      const oz = rOrder * Math.cos(theta);

      orderPos[i * 3] = ox;
      orderPos[i * 3 + 1] = oy;
      orderPos[i * 3 + 2] = oz;

      // 2. Chaos positions: Turbulent organic cloud
      const rChaos = 2.8 + (Math.random() - 0.5) * 1.5;
      const cTheta = Math.random() * Math.PI * 2;
      const cPhi = Math.random() * Math.PI;

      chaosPos[i * 3] = rChaos * Math.sin(cPhi) * Math.cos(cTheta) + (Math.random() - 0.5);
      chaosPos[i * 3 + 1] = rChaos * Math.sin(cPhi) * Math.sin(cTheta) + (Math.random() - 0.5);
      chaosPos[i * 3 + 2] = rChaos * Math.cos(cPhi) + (Math.random() - 0.5);

      // Initial blend starts towards order with organic movement
      pos[i * 3] = ox;
      pos[i * 3 + 1] = oy;
      pos[i * 3 + 2] = oz;

      // Color variation across the spectrum
      const randC = Math.random();
      let color = cBlue;
      if (randC > 0.82) color = cWhite;
      else if (randC > 0.60) color = cViolet;
      else if (randC > 0.45) color = cCoral;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return {
      positions: pos,
      chaosPositions: chaosPos,
      orderPositions: orderPos,
      colors: col,
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const curX = (e.clientX / window.innerWidth - 0.5) * 2;
      const curY = -(e.clientY / window.innerHeight - 0.5) * 2;

      // Calculate velocity
      mouse.current.vx = curX - mouse.current.lastX;
      mouse.current.vy = curY - mouse.current.lastY;
      mouse.current.lastX = curX;
      mouse.current.lastY = curY;

      mouse.current.targetX = curX;
      mouse.current.targetY = curY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth dampening
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

    // Mouse velocity adds turbulence
    const speed = Math.sqrt(mouse.current.vx * mouse.current.vx + mouse.current.vy * mouse.current.vy);
    const turbulence = Math.min(speed * 3, 0.4);

    // Dynamic rotation responding to cursor and organic drift
    pointsRef.current.rotation.y += delta * 0.22 + mouse.current.x * 0.03 + turbulence * 0.1;
    pointsRef.current.rotation.x += delta * 0.12 + mouse.current.y * 0.03;
    pointsRef.current.rotation.z += delta * 0.06;

    // Pulse scale subtly
    const time = state.clock.getElapsedTime();
    const scale = 1.0 + Math.sin(time * 1.5) * 0.03;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const OrbCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) return <div className={`w-full h-full ${className}`} />;

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-engineering-blue via-engineering-violet to-creative-coral blur-3xl opacity-30 animate-pulse" />
        <div className="absolute w-48 h-48 rounded-full border border-white/20 animate-spin [animation-duration:15s]" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} role="presentation" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <HybridOrbMesh />
      </Canvas>
    </div>
  );
};
