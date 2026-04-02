"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y += 0.002;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
      wireRef.current.rotation.y -= 0.001;
      wireRef.current.rotation.z += 0.0015;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Inner solid with low opacity */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#F7F7F7"
            transparent
            opacity={0.05}
            roughness={0.5}
          />
        </mesh>
        {/* Outer wireframe */}
        <lineSegments ref={wireRef}>
          <edgesGeometry
            args={[new THREE.IcosahedronGeometry(1.5, 1)]}
          />
          <lineBasicMaterial color="#F7F7F7" transparent opacity={0.15} />
        </lineSegments>
      </group>
    </Float>
  );
}

export default function SkillsScene() {
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
        <WireframeIcosahedron />
      </Canvas>
    </div>
  );
}
