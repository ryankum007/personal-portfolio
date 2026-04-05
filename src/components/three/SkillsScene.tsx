"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const techNames = [
  "Python", "Java", "React", "Node.js", "TypeScript", "SQL",
  "Docker", "AWS", "C++", "Spring", "Git", "PostgreSQL",
  "Swift", "Angular", "TensorFlow", "Flask",
];

/* Floating plane that bounces off boundaries */
function BouncingPlane({
  initialPos,
  velocity,
  size,
  opacity,
}: {
  initialPos: [number, number, number];
  velocity: [number, number];
  size: [number, number];
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const vel = useRef({ x: velocity[0], y: velocity[1] });
  const pos = useRef({ x: initialPos[0], y: initialPos[1] });
  const boundsX = 4.5;
  const boundsY = 3.5;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const clamped = Math.min(delta, 0.05);

    pos.current.x += vel.current.x * clamped * 60;
    pos.current.y += vel.current.y * clamped * 60;

    if (pos.current.x > boundsX || pos.current.x < -boundsX) {
      vel.current.x *= -1;
      pos.current.x = Math.max(-boundsX, Math.min(boundsX, pos.current.x));
    }
    if (pos.current.y > boundsY || pos.current.y < -boundsY) {
      vel.current.y *= -1;
      pos.current.y = Math.max(-boundsY, Math.min(boundsY, pos.current.y));
    }

    ref.current.position.x = pos.current.x;
    ref.current.position.y = pos.current.y;

    const t = state.clock.elapsedTime;
    ref.current.rotation.z += 0.0008;
    ref.current.rotation.x = Math.sin(t * 0.2 + initialPos[0]) * 0.15;
    ref.current.rotation.y = Math.cos(t * 0.15 + initialPos[1]) * 0.1;
  });

  return (
    <mesh ref={ref} position={initialPos}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color="#F7F7F7"
        roughness={0.35}
        metalness={0.6}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function LogoElements() {
  const logos = useMemo(() => {
    return techNames.map((_, i) => {
      const angle = (i / techNames.length) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      return {
        pos: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -1 - Math.random() * 2,
        ] as [number, number, number],
        vel: [
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
        ] as [number, number],
        size: [
          0.35 + Math.random() * 0.55,
          0.2 + Math.random() * 0.3,
        ] as [number, number],
        opacity: 0.04 + Math.random() * 0.08,
      };
    });
  }, []);

  return (
    <group>
      {logos.map((logo, i) => (
        <BouncingPlane
          key={i}
          initialPos={logo.pos}
          velocity={logo.vel}
          size={logo.size}
          opacity={logo.opacity}
        />
      ))}
    </group>
  );
}

export default function SkillsScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.8 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-3, -2, 3]} intensity={0.2} />
        <LogoElements />
      </Canvas>
    </div>
  );
}
