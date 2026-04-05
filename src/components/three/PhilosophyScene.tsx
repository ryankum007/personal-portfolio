"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Ink drop — a sphere that slowly expands, fades, and resets ─── */
function InkDrop({
  delay,
  basePos,
  maxScale,
}: {
  delay: number;
  basePos: [number, number, number];
  maxScale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const cycle = 10;
    const t = ((state.clock.elapsedTime + delay) % cycle) / cycle;

    if (t < 0.8) {
      const progress = t / 0.8;
      const ease = 1 - Math.pow(1 - progress, 3);
      ref.current.scale.setScalar(ease * maxScale);
      matRef.current.opacity = 0.06 * (1 - progress * 0.8);
    } else {
      const fadeProgress = (t - 0.8) / 0.2;
      matRef.current.opacity = 0.06 * 0.2 * (1 - fadeProgress);
    }
  });

  return (
    <mesh ref={ref} position={basePos} scale={0} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.015, 16, 64]} />
      <meshBasicMaterial
        ref={matRef}
        color="#101010"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Flowing ink lines — curves that draw themselves ─── */
function InkStroke({
  points,
  speed,
  delay,
  thickness,
}: {
  points: THREE.Vector3[];
  speed: number;
  delay: number;
  thickness: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const { fullGeo, curve } = useMemo(() => {
    const c = new THREE.CatmullRomCurve3(points);
    const g = new THREE.TubeGeometry(c, 64, thickness, 6, false);
    return { fullGeo: g, curve: c };
  }, [points, thickness]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + delay;
    // Gentle undulation
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    ref.current.position.y = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <mesh ref={ref} geometry={fullGeo}>
      <meshBasicMaterial
        color="#101010"
        transparent
        opacity={0.025}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Quill nib / pen tip — abstract writing instrument ─── */
function PenNib() {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  // Trail positions
  const trailCount = 40;
  const trailPositions = useMemo(
    () => new Float32Array(trailCount * 3).fill(0),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Pen follows mouse with lag
    const mx = pointer.x * viewport.width * 0.35;
    const my = pointer.y * viewport.height * 0.35;
    groupRef.current.position.x +=
      (mx - groupRef.current.position.x) * 0.04;
    groupRef.current.position.y +=
      (my - groupRef.current.position.y) * 0.04;

    // Subtle writing wobble
    groupRef.current.rotation.z =
      -0.4 + Math.sin(t * 2) * 0.05;

    // Update trail — shift all positions, add current pos at front
    if (trailRef.current) {
      const pos = trailRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = trailCount - 1; i > 0; i--) {
        trailPositions[i * 3] = trailPositions[(i - 1) * 3];
        trailPositions[i * 3 + 1] = trailPositions[(i - 1) * 3 + 1];
        trailPositions[i * 3 + 2] = trailPositions[(i - 1) * 3 + 2];
      }
      trailPositions[0] = groupRef.current.position.x;
      trailPositions[1] = groupRef.current.position.y;
      trailPositions[2] = 0;
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      {/* The pen nib */}
      <group ref={groupRef} position={[0, 0, 0.5]}>
        {/* Nib body — elongated cone */}
        <mesh rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.025, 0.3, 6]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.08}
          />
        </mesh>
        {/* Nib tip — tiny sphere */}
        <mesh position={[0.06, -0.15, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial
            color="#101010"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>

      {/* Ink trail following the pen */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
            count={trailCount}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#101010"
          size={0.015}
          transparent
          opacity={0.08}
          sizeAttenuation
        />
      </points>
    </>
  );
}

/* ─── Floating ink particles ─── */
function InkMotes() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#101010"
        size={0.02}
        transparent
        opacity={0.07}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Scene composition ─── */
function PhilosophyElements() {
  // Organic calligraphic ink strokes in the background
  const strokes = useMemo(
    () => [
      {
        points: [
          new THREE.Vector3(-4, 2.5, -4),
          new THREE.Vector3(-2, 2, -3.5),
          new THREE.Vector3(0, 2.8, -4),
          new THREE.Vector3(2.5, 2.3, -3.8),
          new THREE.Vector3(4.5, 3, -4),
        ],
        speed: 0.15,
        delay: 0,
        thickness: 0.006,
      },
      {
        points: [
          new THREE.Vector3(-3.5, -0.5, -4.5),
          new THREE.Vector3(-1, 0.2, -4),
          new THREE.Vector3(1.5, -0.3, -4.2),
          new THREE.Vector3(3, 0.5, -4.5),
          new THREE.Vector3(5, -0.2, -4),
        ],
        speed: 0.12,
        delay: 2,
        thickness: 0.005,
      },
      {
        points: [
          new THREE.Vector3(-5, -2.5, -4),
          new THREE.Vector3(-2.5, -2, -4.3),
          new THREE.Vector3(0, -2.8, -4.5),
          new THREE.Vector3(2, -2.3, -4),
          new THREE.Vector3(4, -3, -4.2),
        ],
        speed: 0.1,
        delay: 4,
        thickness: 0.004,
      },
    ],
    []
  );

  return (
    <>
      {/* Ink ripple rings — expand and fade like ink dropped on water */}
      <InkDrop delay={0} basePos={[-2, 0.8, -4]} maxScale={1.2} />
      <InkDrop delay={3.3} basePos={[2.5, -0.8, -5]} maxScale={1.5} />
      <InkDrop delay={6.6} basePos={[0.5, 1.8, -4.5]} maxScale={1.0} />
      <InkDrop delay={5} basePos={[-0.5, -1.5, -5.5]} maxScale={0.8} />

      {/* Calligraphic ink strokes */}
      <Float speed={0.08} rotationIntensity={0.008} floatIntensity={0.02}>
        {strokes.map((s, i) => (
          <InkStroke key={i} {...s} />
        ))}
      </Float>

      {/* Interactive pen nib that follows mouse */}
      <PenNib />

      {/* Atmospheric particles */}
      <InkMotes />
    </>
  );
}

export default function PhilosophyScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <PhilosophyElements />
      </Canvas>
    </div>
  );
}
