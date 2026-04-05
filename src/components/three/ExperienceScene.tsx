"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Floating document / paper pages */
function FloatingPage({
  position,
  rotation,
  speed,
  size,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  size: [number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
    ref.current.rotation.z = rotation[2] + Math.sin(t * speed * 0.7) * 0.05;
    ref.current.rotation.x = rotation[0] + Math.cos(t * speed * 0.5) * 0.03;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color="#F7F7F7"
        roughness={0.9}
        metalness={0}
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* Typewriter-style text line */
function TypewriterLine({
  position,
  width,
  delay,
}: {
  position: [number, number, number];
  width: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + delay) * 0.08;
    // Simulate text being typed — scale x grows
    const progress = Math.min(1, (Math.sin(t * 0.3 + delay * 2) + 1) / 2);
    ref.current.scale.x = 0.5 + progress * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[width, 0.015, 0.01]} />
      <meshStandardMaterial
        color="#F7F7F7"
        transparent
        opacity={0.08}
        roughness={0.5}
        metalness={0.3}
      />
    </mesh>
  );
}

function ExperienceElements() {
  const pages = useMemo(
    () => [
      { pos: [-2.5, 0.5, -2] as [number, number, number], rot: [0.1, 0.2, 0.05] as [number, number, number], speed: 0.3, size: [1.2, 1.6] as [number, number] },
      { pos: [2.8, -0.3, -1.5] as [number, number, number], rot: [-0.05, -0.3, -0.1] as [number, number, number], speed: 0.4, size: [1.0, 1.4] as [number, number] },
      { pos: [-1.5, -1.2, -2.5] as [number, number, number], rot: [0.15, 0.1, 0.08] as [number, number, number], speed: 0.35, size: [0.8, 1.1] as [number, number] },
      { pos: [1.5, 1.5, -3] as [number, number, number], rot: [-0.1, 0.15, -0.05] as [number, number, number], speed: 0.45, size: [1.1, 1.5] as [number, number] },
    ],
    []
  );

  const lines = useMemo(
    () => [
      { pos: [-2.5, 0.8, -1.8] as [number, number, number], width: 0.6, delay: 0 },
      { pos: [-2.5, 0.65, -1.8] as [number, number, number], width: 0.8, delay: 0.5 },
      { pos: [-2.5, 0.5, -1.8] as [number, number, number], width: 0.5, delay: 1 },
      { pos: [2.8, 0.0, -1.3] as [number, number, number], width: 0.7, delay: 1.5 },
      { pos: [2.8, -0.15, -1.3] as [number, number, number], width: 0.6, delay: 2 },
    ],
    []
  );

  return (
    <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
      <group>
        {pages.map((p, i) => (
          <FloatingPage key={`p-${i}`} position={p.pos} rotation={p.rot} speed={p.speed} size={p.size} />
        ))}
        {lines.map((l, i) => (
          <TypewriterLine key={`l-${i}`} position={l.pos} width={l.width} delay={l.delay} />
        ))}
      </group>
    </Float>
  );
}

export default function ExperienceScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.6 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <ExperienceElements />
      </Canvas>
    </div>
  );
}
