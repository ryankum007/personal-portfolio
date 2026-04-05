"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Floating gear / cog shape */
function Gear({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z += speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.1;
  });

  // Gear made of a torus + teeth (small boxes around it)
  const teeth = useMemo(() => {
    const count = 8;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 0.45,
        y: Math.sin(angle) * 0.45,
        rot: angle,
      };
    });
  }, []);

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.35, 0.04, 8, 24]} />
        <meshStandardMaterial
          color="#101010"
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Inner hub */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
        <meshStandardMaterial
          color="#101010"
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.05}
        />
      </mesh>
      {/* Teeth */}
      {teeth.map((tooth, i) => (
        <mesh
          key={i}
          position={[tooth.x, tooth.y, 0]}
          rotation={[0, 0, tooth.rot]}
        >
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial
            color="#101010"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Floating code angle bracket */
function CodeBracket({
  position,
  delay,
  mirror,
}: {
  position: [number, number, number];
  delay: number;
  mirror?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.35 + delay) * 0.15;
    ref.current.rotation.y = Math.sin(t * 0.2 + delay) * 0.2;
  });

  const scaleX = mirror ? -1 : 1;

  return (
    <group ref={ref} position={position} scale={[scaleX, 1, 1]}>
      <mesh position={[0.12, 0.15, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.4, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#101010"
          transparent
          opacity={0.06}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[0.12, -0.15, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.4, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#101010"
          transparent
          opacity={0.06}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

function ProjectElements() {
  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
      <group>
        <Gear position={[-3, 1.5, -2]} scale={1.5} speed={0.003} />
        <Gear position={[3.5, -1, -3]} scale={1.2} speed={-0.004} />
        <Gear position={[-2, -1.5, -2.5]} scale={0.9} speed={0.005} />
        <Gear position={[2, 2, -3.5]} scale={1.8} speed={-0.002} />

        <CodeBracket position={[-2.5, 0, -1.5]} delay={0} />
        <CodeBracket position={[3, 0.5, -2]} delay={2} mirror />
        <CodeBracket position={[-1, -2, -2]} delay={4} />
        <CodeBracket position={[2.5, -1.5, -1.5]} delay={3} mirror />
      </group>
    </Float>
  );
}

export default function ProjectsScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <ProjectElements />
      </Canvas>
    </div>
  );
}
