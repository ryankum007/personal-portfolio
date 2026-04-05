"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─── */
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: string;
  location: string;
  link?: string;
}

interface BranchData {
  event: TimelineEvent;
  curve: THREE.CatmullRomCurve3;
  side: "top" | "bottom";
  tipPosition: THREE.Vector3;
  trunkX: number;
}

/* ─── Generate horizontal tree geometry ─── */
function generateTree(events: TimelineEvent[]) {
  const trunkLength = events.length * 1.0 + 2;
  const branches: BranchData[] = [];

  // Trunk curve — subtle wave along X axis (left to right)
  const trunkPoints = [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(trunkLength * 0.25, 0.06, 0.03),
    new THREE.Vector3(trunkLength * 0.5, -0.04, -0.02),
    new THREE.Vector3(trunkLength * 0.75, 0.03, 0.01),
    new THREE.Vector3(trunkLength, 0, 0),
  ];
  const trunkCurve = new THREE.CatmullRomCurve3(trunkPoints);

  events.forEach((event, i) => {
    const t = (i + 1) / (events.length + 1);
    const trunkPoint = trunkCurve.getPointAt(t);
    const side: "top" | "bottom" = i % 2 === 0 ? "top" : "bottom";
    const sideMultiplier = side === "top" ? 1 : -1;

    const branchLen = 2.8 + Math.sin(i * 1.7) * 0.4;

    // Organic branch — arcs up/down with slight X drift
    const mid1 = new THREE.Vector3(
      trunkPoint.x + 0.1 + Math.sin(i * 0.8) * 0.08,
      trunkPoint.y + sideMultiplier * branchLen * 0.35,
      trunkPoint.z + Math.cos(i * 1.2) * 0.08
    );
    const mid2 = new THREE.Vector3(
      trunkPoint.x + 0.2 + Math.sin(i * 1.1) * 0.1,
      trunkPoint.y + sideMultiplier * branchLen * 0.7,
      trunkPoint.z + Math.sin(i * 0.9) * 0.06
    );
    const tip = new THREE.Vector3(
      trunkPoint.x + 0.25 + Math.cos(i * 0.6) * 0.08,
      trunkPoint.y + sideMultiplier * branchLen,
      trunkPoint.z
    );

    const branchCurve = new THREE.CatmullRomCurve3([
      trunkPoint.clone(),
      mid1,
      mid2,
      tip,
    ]);

    branches.push({
      event,
      curve: branchCurve,
      side,
      tipPosition: tip,
      trunkX: trunkPoint.x,
    });
  });

  return { trunkCurve, trunkLength, branches };
}

/* ─── Trunk mesh (tapered left-to-right) ─── */
function Trunk({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geometry = useMemo(() => {
    const segments = 60;
    const radial = 8;
    const frames = curve.computeFrenetFrames(segments, false);
    const verts: number[] = [];
    const norms: number[] = [];
    const uvArr: number[] = [];
    const idx: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const pos = curve.getPointAt(t);
      const N = frames.normals[i];
      const B = frames.binormals[i];
      const r = 0.12 * (1 - t * 0.55);

      for (let j = 0; j <= radial; j++) {
        const a = (j / radial) * Math.PI * 2;
        const s = Math.sin(a);
        const c = Math.cos(a);
        const nx = c * N.x + s * B.x;
        const ny = c * N.y + s * B.y;
        const nz = c * N.z + s * B.z;
        verts.push(pos.x + r * nx, pos.y + r * ny, pos.z + r * nz);
        norms.push(nx, ny, nz);
        uvArr.push(t, j / radial);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < radial; j++) {
        const a = i * (radial + 1) + j;
        const b = (i + 1) * (radial + 1) + j;
        const c2 = (i + 1) * (radial + 1) + (j + 1);
        const d = i * (radial + 1) + (j + 1);
        idx.push(a, b, d, b, c2, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setIndex(idx);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(norms, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvArr, 2));
    return geo;
  }, [curve]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#1a1a1a" roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

/* ─── Branch with interactive node ─── */
function Branch({
  data,
  index,
  selectedIndex,
  onSelect,
}: {
  data: BranchData;
  index: number;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
}) {
  const nodeRef = useRef<THREE.Mesh>(null);
  const isSelected = selectedIndex === index;
  const isTop = data.side === "top";

  const geometry = useMemo(
    () => new THREE.TubeGeometry(data.curve, 16, 0.035, 6, false),
    [data.curve]
  );

  useFrame((state) => {
    if (!nodeRef.current) return;
    if (isSelected) {
      nodeRef.current.scale.setScalar(
        1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      );
    } else {
      const cur = nodeRef.current.scale.x;
      nodeRef.current.scale.setScalar(cur + (1 - cur) * 0.1);
    }
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Node sphere at tip */}
      <mesh
        ref={nodeRef}
        position={data.tipPosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[isSelected ? 0.15 : 0.1, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#F7F7F7" : "#1a1a1a"}
          roughness={0.3}
          metalness={0.5}
          emissive={isSelected ? "#ffffff" : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {/* Year label — above or below tip */}
      <Html
        position={[
          data.tipPosition.x,
          data.tipPosition.y + (isTop ? 0.28 : -0.28),
          data.tipPosition.z,
        ]}
        center
        style={{
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sofia), sans-serif",
            fontSize: "0.5rem",
            fontWeight: 700,
            color: isSelected ? "#101010" : "rgba(16,16,16,0.25)",
            letterSpacing: "0.1em",
            transition: "color 0.3s",
          }}
        >
          {data.event.year}
        </span>
      </Html>

      {/* Small leaf dots along branch */}
      {[0.55, 0.72, 0.88].map((t, li) => {
        const p = data.curve.getPointAt(t);
        return (
          <mesh
            key={li}
            position={[p.x, p.y + (isTop ? 0.04 : -0.04), p.z]}
            scale={0.03 + li * 0.007}
          >
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.7}
              transparent
              opacity={0.1 + li * 0.03}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Roots at left end ─── */
function Roots() {
  const roots = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const spread = (i / 4 - 0.5) * 1.4;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.5, 0, 0),
        new THREE.Vector3(
          -1 - Math.random() * 0.3,
          spread * 0.5,
          Math.sin(i * 1.5) * 0.3
        ),
        new THREE.Vector3(
          -1.5 - Math.random() * 0.4,
          spread,
          Math.sin(i * 1.5) * 0.4
        ),
      ]);
      return new THREE.TubeGeometry(curve, 10, 0.025 - i * 0.003, 5, false);
    });
  }, []);

  return (
    <group>
      {roots.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Leaf geometry (shared) ─── */
function useLeafGeo() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.1, 0.16, 0.06, 0.32, 0, 0.44);
    shape.bezierCurveTo(-0.06, 0.32, -0.1, 0.16, 0, 0);
    const geo = new THREE.ShapeGeometry(shape);
    geo.center();
    return geo;
  }, []);
}

/* ─── Single interactive leaf ─── */
function InteractiveLeaf({
  basePosition,
  leafGeo,
  scale,
  speed,
  offset,
}: {
  basePosition: THREE.Vector3;
  leafGeo: THREE.ShapeGeometry;
  scale: number;
  speed: number;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const vel = useRef(new THREE.Vector3());
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Base floating motion
    const fx = basePosition.x + Math.sin(t * speed * 0.4 + offset) * 0.6;
    const fy = basePosition.y + Math.sin(t * speed * 0.7 + offset) * 0.4;
    const fz = basePosition.z + Math.cos(t * speed * 0.3 + offset) * 0.2;

    // Convert pointer to approximate world position
    const mx = pointer.x * viewport.width * 0.5 + state.camera.position.x;
    const my = pointer.y * viewport.height * 0.5 + state.camera.position.y;

    // Mouse repulsion
    const dx = fx + vel.current.x - mx;
    const dy = fy + vel.current.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 3.5) {
      const force = ((3.5 - dist) / 3.5) * 0.04;
      vel.current.x += (dx / (dist + 0.01)) * force;
      vel.current.y += (dy / (dist + 0.01)) * force;
    }

    // Damping
    vel.current.multiplyScalar(0.96);

    meshRef.current.position.set(
      fx + vel.current.x,
      fy + vel.current.y,
      fz + vel.current.z
    );

    // Tumbling rotation
    meshRef.current.rotation.x = t * speed * 0.2 + offset;
    meshRef.current.rotation.y = t * speed * 0.35 + offset * 2;
    meshRef.current.rotation.z = t * speed * 0.15;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={leafGeo}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        // Give a kick when hovered
        vel.current.set(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          0
        );
      }}
    >
      <meshStandardMaterial
        color="#1a1a1a"
        transparent
        opacity={0.18}
        roughness={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Floating leaves (interactive) ─── */
function FloatingLeaves({ trunkLength }: { trunkLength: number }) {
  const leafGeo = useLeafGeo();
  const count = 40;

  const leafData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.05) * (trunkLength + 8),
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4
      ),
      speed: 0.08 + Math.random() * 0.14,
      offset: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.45,
    }));
  }, [trunkLength]);

  return (
    <group>
      {leafData.map((leaf, i) => (
        <InteractiveLeaf
          key={i}
          basePosition={leaf.position}
          leafGeo={leafGeo}
          scale={leaf.scale}
          speed={leaf.speed}
          offset={leaf.offset}
        />
      ))}
    </group>
  );
}

/* ─── Camera controller ─── */
function CameraController({
  trunkLength,
  selectedBranch,
}: {
  trunkLength: number;
  selectedBranch: BranchData | null;
}) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: trunkLength / 2, y: 1, z: 14 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = (e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  useEffect(() => {
    if (selectedBranch) {
      // Gentle shift toward selected branch — minimal zoom to keep card visible
      target.current = {
        x: selectedBranch.tipPosition.x * 0.6 + (trunkLength / 2) * 0.4,
        y: 1,
        z: 13.5,
      };
    } else {
      target.current = { x: trunkLength / 2, y: 1, z: 14 };
    }
  }, [selectedBranch, trunkLength]);

  useFrame(() => {
    const tgt = target.current;
    const mx = mouse.current.x * 0.6;
    const my = mouse.current.y * -0.3;
    camera.position.x += (tgt.x + mx - camera.position.x) * 0.03;
    camera.position.y += (tgt.y + my - camera.position.y) * 0.03;
    camera.position.z += (tgt.z - camera.position.z) * 0.03;
    camera.lookAt(camera.position.x, 0, 0);
  });

  return null;
}

/* ─── Main scene ─── */
function TreeScene({
  events,
  onEventSelect,
}: {
  events: TimelineEvent[];
  onEventSelect: (e: TimelineEvent | null) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { trunkCurve, trunkLength, branches } = useMemo(
    () => generateTree(events),
    [events]
  );

  const handleSelect = useCallback((i: number) => {
    setSelectedIndex((prev) => (prev === i ? null : i));
  }, []);

  // Sync selection to parent HTML overlay
  useEffect(() => {
    onEventSelect(
      selectedIndex !== null ? branches[selectedIndex]?.event ?? null : null
    );
  }, [selectedIndex, branches, onEventSelect]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 8, 5]} intensity={0.7} />
      <directionalLight position={[-5, 3, -3]} intensity={0.25} />

      <CameraController
        trunkLength={trunkLength}
        selectedBranch={selectedIndex !== null ? branches[selectedIndex] : null}
      />

      {/* Click background to deselect */}
      <mesh
        position={[trunkLength / 2, 0, -5]}
        onClick={() => setSelectedIndex(null)}
        visible={false}
      >
        <planeGeometry args={[50, 30]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Float speed={0.3} rotationIntensity={0.005} floatIntensity={0.03}>
        <group>
          <Trunk curve={trunkCurve} />
          <Roots />

          {branches.map((b, i) => (
            <Branch
              key={i}
              data={b}
              index={i}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
            />
          ))}

          {/* Canopy at right end */}
          <mesh position={[trunkLength + 0.3, 0, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.7}
              transparent
              opacity={0.06}
            />
          </mesh>
        </group>
      </Float>

      <FloatingLeaves trunkLength={trunkLength} />
    </>
  );
}

/* ─── Exported component ─── */
export default function TimelineTree({ events }: { events: TimelineEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const handleEventSelect = useCallback((event: TimelineEvent | null) => {
    setSelectedEvent(event);
  }, []);

  return (
    <div className="relative h-[clamp(600px,75vh,950px)] w-full">
      <Canvas
        camera={{ position: [10, 1, 14], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <TreeScene events={events} onEventSelect={handleEventSelect} />
      </Canvas>

      {/* Selected event info — HTML overlay outside canvas */}
      {selectedEvent && (
        <div
          className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 animate-[fadeSlideUp_0.3s_ease-out]"
        >
          <div className="w-[min(460px,90vw)] border border-dark/10 bg-[#F7F7F7] p-6 shadow-[0_16px_60px_rgba(16,16,16,0.15)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-dark/40">
                {selectedEvent.type} / {selectedEvent.year}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex h-6 w-6 items-center justify-center text-dark/30 transition-colors hover:text-dark/70"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="mb-1 h-[1px] w-12 bg-dark/10" />
            <h3 className="mt-3 font-display text-[1.3rem] font-bold leading-tight text-dark">
              {selectedEvent.title}
            </h3>
            <p className="mt-1.5 font-body text-[0.75rem] text-dark/40">
              {selectedEvent.location}
            </p>
            <p className="mt-3 font-body text-[0.85rem] leading-[1.7] text-dark/55">
              {selectedEvent.description}
            </p>
            {selectedEvent.link && (
              <a
                href={selectedEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-body text-[0.7rem] font-semibold text-dark/45 underline underline-offset-2 transition-colors hover:text-dark/70"
              >
                Visit
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 7L7 1M7 1H3M7 1V5" stroke="currentColor" strokeWidth="1" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {!selectedEvent && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-dark/25">
            click a node to explore
          </span>
        </div>
      )}
    </div>
  );
}
