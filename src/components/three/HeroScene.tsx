"use client";

import { useRef, useMemo, Component, Suspense, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────
   Module-level mouse tracking.
   Canvas at z-0 can't receive pointer events because
   HTML text sits at z-10. We read mouse from window instead.
   ───────────────────────────────────────────────────── */
const pointer = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

/* ─── Error Boundary — catches Canvas crashes gracefully ─── */
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* ─── Interactive Core Sphere — GPU distortion, mouse-reactive ─── */
function CoreSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;

    // Smooth mouse tracking
    smooth.current.x += (pointer.x - smooth.current.x) * 0.025;
    smooth.current.y += (pointer.y - smooth.current.y) * 0.025;

    mesh.current.rotation.y = smooth.current.x * 0.35 + t * 0.06;
    mesh.current.rotation.x = -smooth.current.y * 0.25 + Math.sin(t * 0.2) * 0.04;
    mesh.current.rotation.z = Math.sin(t * 0.15) * 0.02;

    // Gentle breathing scale
    const breath = 1 + Math.sin(t * 0.8) * 0.015;
    mesh.current.scale.setScalar(breath);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.35}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          roughness={0.03}
          metalness={1}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
      {/* Glass shell */}
      <mesh scale={1.15}>
        <icosahedronGeometry args={[1, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0}
          metalness={0}
          transparent
          opacity={0.03}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

/* ─── Orbital Rings — tilt toward mouse ─── */
function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (group.current) {
      group.current.rotation.x +=
        (pointer.y * 0.15 - group.current.rotation.x) * 0.015;
      group.current.rotation.y +=
        (pointer.x * 0.15 - group.current.rotation.y) * 0.015;
    }

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.06;
      ring1.current.rotation.x =
        Math.PI / 5 + Math.sin(t * 0.12) * 0.04;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.04;
      ring2.current.rotation.x =
        -Math.PI / 3.5 + Math.cos(t * 0.09) * 0.03;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.02;
      ring3.current.rotation.y =
        Math.PI / 2.5 + Math.sin(t * 0.07) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.008, 8, 128]} />
        <meshPhysicalMaterial
          color="#e0e0e0"
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.35}
          clearcoat={1}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.3, 0.006, 8, 128]} />
        <meshPhysicalMaterial
          color="#d0d0d0"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.22}
          clearcoat={1}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.9, 0.004, 8, 128]} />
        <meshPhysicalMaterial
          color="#c0c0c0"
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.12}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbiting Satellites — small geometric shapes ─── */
function Satellites() {
  const group = useRef<THREE.Group>(null);

  const satellites = useMemo(
    () => [
      { radius: 2.0, speed: 0.18, offset: 0, y: 0.3, scale: 0.09 },
      {
        radius: 2.0,
        speed: 0.18,
        offset: Math.PI * 0.67,
        y: -0.2,
        scale: 0.07,
      },
      {
        radius: 2.0,
        speed: 0.18,
        offset: Math.PI * 1.33,
        y: 0.1,
        scale: 0.08,
      },
      { radius: 3.0, speed: -0.1, offset: 0.5, y: 0.55, scale: 0.055 },
      { radius: 3.0, speed: -0.1, offset: 2.6, y: -0.45, scale: 0.045 },
      { radius: 3.0, speed: -0.1, offset: 4.7, y: 0.35, scale: 0.05 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    group.current.children.forEach((child, i) => {
      const s = satellites[i];
      if (!s) return;
      const angle = t * s.speed + s.offset;
      child.position.x = Math.cos(angle) * s.radius;
      child.position.z = Math.sin(angle) * s.radius * 0.5;
      child.position.y = s.y + Math.sin(t * 0.5 + s.offset) * 0.18;
      child.rotation.x = t * 0.4 + s.offset;
      child.rotation.y = t * 0.25;
    });
  });

  const shapes = ["oct", "box", "tet", "oct", "box", "tet"] as const;

  return (
    <group ref={group}>
      {satellites.map((s, i) => (
        <mesh key={i} scale={s.scale}>
          {shapes[i] === "oct" && <octahedronGeometry args={[1, 0]} />}
          {shapes[i] === "box" && <boxGeometry args={[1, 1, 1]} />}
          {shapes[i] === "tet" && <tetrahedronGeometry args={[1, 0]} />}
          <meshPhysicalMaterial
            color="#F0F0F0"
            roughness={0.04}
            metalness={0.95}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Particle Field ─── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = Math.sin(t * 0.04) * 0.025;
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
        size={0.015}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Scene Root with Scroll + Mouse Reactivity ─── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Scroll reactivity — scale down and drift away
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(scrollY / vh, 1);
    const eased = progress * progress;
    groupRef.current.scale.setScalar(1 - eased * 0.4);
    groupRef.current.position.y = -eased * 1.8;
    groupRef.current.rotation.y = eased * 0.5;

    // Smooth mouse parallax
    const tx = pointer.x * 0.3;
    const ty = pointer.y * 0.3;
    smooth.current.x += (tx - smooth.current.x) * 0.018;
    smooth.current.y += (ty - smooth.current.y) * 0.018;
    groupRef.current.position.x = smooth.current.x;
  });

  return (
    <group ref={groupRef}>
      <CoreSphere />
      <OrbitalRings />
      <Satellites />
      <ParticleField />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <SceneErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.2, 5], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
          }}
        >
          {/* Pure lighting — NO Environment preset (async HDR load was crashing Canvas) */}
          <ambientLight intensity={0.4} />
          <hemisphereLight args={["#ffffff", "#444444", 0.3]} />
          <directionalLight position={[5, 8, 5]} intensity={1.4} />
          <directionalLight
            position={[-4, 3, -3]}
            intensity={0.5}
            color="#e8e8f0"
          />
          <pointLight
            position={[0, -3, 3]}
            intensity={0.35}
            color="#ffffff"
          />
          <pointLight
            position={[0, 4, 0]}
            intensity={0.25}
            color="#f0f0ff"
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
