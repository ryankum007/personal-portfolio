"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Realistic glider shape — high-aspect-ratio wings, tapered fuselage, T-tail, canopy ─── */
function Glider({
  position,
  scale,
  speed,
  bankAngle,
  orbitRadius,
  orbitOffset,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  bankAngle: number;
  orbitRadius: number;
  orbitOffset: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const matProps = useMemo(
    () => ({
      color: "#F7F7F7",
      roughness: 0.15,
      metalness: 0.9,
      transparent: true,
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + orbitOffset;

    // Elliptical flight path
    ref.current.position.x = position[0] + Math.sin(t) * orbitRadius;
    ref.current.position.z = position[2] + Math.cos(t) * (orbitRadius * 0.5);
    ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.25;

    // Bank into turns — the defining motion of a glider
    ref.current.rotation.z = Math.sin(t) * bankAngle;
    // Nose follows flight path
    ref.current.rotation.y = -t + Math.PI * 0.5;
    // Subtle pitch oscillation
    ref.current.rotation.x = Math.sin(t * 1.5) * 0.06;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Fuselage — long, slender, tapered */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.045, 1.6, 12]} />
        <meshStandardMaterial {...matProps} opacity={0.2} />
      </mesh>

      {/* Nose — smooth cone */}
      <mesh position={[0, 0, -0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.025, 0.25, 12]} />
        <meshStandardMaterial {...matProps} opacity={0.18} />
      </mesh>

      {/* Canopy — glass bubble on top */}
      <mesh position={[0, 0.04, -0.35]}>
        <sphereGeometry args={[0.045, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#F7F7F7"
          roughness={0.05}
          metalness={1}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Main wings — long, high-aspect-ratio */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[3.0, 0.015, 0.18]} />
        <meshStandardMaterial {...matProps} opacity={0.16} />
      </mesh>

      {/* Wing tips — slight upward curve (simplified) */}
      <mesh position={[1.52, 0.04, -0.15]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.12, 0.015, 0.12]} />
        <meshStandardMaterial {...matProps} opacity={0.12} />
      </mesh>
      <mesh position={[-1.52, 0.04, -0.15]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.12, 0.015, 0.12]} />
        <meshStandardMaterial {...matProps} opacity={0.12} />
      </mesh>

      {/* Vertical stabilizer (tail fin) */}
      <mesh position={[0, 0.12, 0.72]}>
        <boxGeometry args={[0.012, 0.25, 0.2]} />
        <meshStandardMaterial {...matProps} opacity={0.14} />
      </mesh>

      {/* Horizontal stabilizer (T-tail — sits on top of vertical) */}
      <mesh position={[0, 0.24, 0.72]}>
        <boxGeometry args={[0.55, 0.01, 0.1]} />
        <meshStandardMaterial {...matProps} opacity={0.13} />
      </mesh>

      {/* Subtle belly line for depth */}
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 1.2, 4]} />
        <meshStandardMaterial color="#F7F7F7" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

/* ─── Wispy cloud/atmosphere particles ─── */
function AtmosphereParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F7F7F7"
        size={0.02}
        transparent
        opacity={0.05}
        sizeAttenuation
      />
    </points>
  );
}

function AboutElements() {
  const gliders = useMemo(
    () => [
      {
        pos: [1.2, 0.5, -1] as [number, number, number],
        scale: 0.7,
        speed: 0.2,
        bank: 0.3,
        orbit: 2.8,
        offset: 0,
      },
      {
        pos: [-1.5, -0.2, -2] as [number, number, number],
        scale: 0.5,
        speed: 0.25,
        bank: 0.25,
        orbit: 2.2,
        offset: Math.PI * 0.8,
      },
      {
        pos: [0.3, 1.2, -1.5] as [number, number, number],
        scale: 0.4,
        speed: 0.3,
        bank: 0.2,
        orbit: 1.8,
        offset: Math.PI * 1.5,
      },
    ],
    []
  );

  return (
    <Float speed={0.2} rotationIntensity={0.03} floatIntensity={0.08}>
      <group>
        {gliders.map((g, i) => (
          <Glider
            key={i}
            position={g.pos}
            scale={g.scale}
            speed={g.speed}
            bankAngle={g.bank}
            orbitRadius={g.orbit}
            orbitOffset={g.offset}
          />
        ))}
        <AtmosphereParticles />
      </group>
    </Float>
  );
}

export default function AboutScene() {
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.5} />
        <directionalLight position={[-3, 2, -4]} intensity={0.15} />
        <AboutElements />
      </Canvas>
    </div>
  );
}
