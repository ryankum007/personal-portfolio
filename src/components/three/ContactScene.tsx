"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.rotation.y += 0.002;

    // Subtle mouse tracking
    const targetX = (state.pointer.x * viewport.width) / 10;
    const targetY = (state.pointer.y * viewport.height) / 10;
    mouse.current.x += (targetX - mouse.current.x) * 0.03;
    mouse.current.y += (targetY - mouse.current.y) * 0.03;
    meshRef.current.position.x = mouse.current.x;
    meshRef.current.position.y = mouse.current.y;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#101010"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </Float>
  );
}

export default function ContactScene() {
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={0.6} />
        <MorphingBlob />
      </Canvas>
    </div>
  );
}
