"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Track mouse for subtle reactivity
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle auto-rotation
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    meshRef.current.rotation.y += 0.003;

    // React to scroll — get scroll progress from CSS custom property
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Scale down and move as user scrolls past hero
    const heroProgress = Math.min(scrollY / window.innerHeight, 1);
    meshRef.current.scale.setScalar(1 - heroProgress * 0.4);
    meshRef.current.position.y = -heroProgress * 2;

    // Subtle mouse tracking
    const targetX = (state.pointer.x * viewport.width) / 8;
    const targetY = (state.pointer.y * viewport.height) / 8;
    mouse.current.x += (targetX - mouse.current.x) * 0.05;
    mouse.current.y += (targetY - mouse.current.y) * 0.05;
    meshRef.current.position.x = mouse.current.x;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <MeshDistortMaterial
          color="#F7F7F7"
          roughness={0.15}
          metalness={0.9}
          distort={0.25}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight
          position={[-3, -3, 2]}
          intensity={0.3}
          color="#F7F7F7"
        />
        <AbstractShape />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
