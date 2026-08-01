"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const positions: [number, number, number][] = [
  [-3.2, 0.9, 0],
  [-1.65, -0.55, 0.6],
  [0, 0.95, 0.2],
  [1.65, -0.5, 0.75],
  [3.2, 0.75, 0.1],
];

function Connector({ from, to, active }: { from: THREE.Vector3; to: THREE.Vector3; active: boolean }) {
  const direction = useMemo(() => to.clone().sub(from), [from, to]);
  const midpoint = useMemo(() => from.clone().add(to).multiplyScalar(0.5), [from, to]);
  const length = direction.length();
  const angle = Math.atan2(direction.y, direction.x);

  return (
    <mesh position={midpoint} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, active ? 0.045 : 0.018, 0.018]} />
      <meshBasicMaterial color={active ? "#ff6b52" : "#4f6570"} />
    </mesh>
  );
}

function RuntimeNode({ index, activeIndex, onSelect, reducedMotion }: { index: number; activeIndex: number; onSelect: (index: number) => void; reducedMotion: boolean }) {
  const active = index === activeIndex;
  const passed = index < activeIndex;
  const node = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!node.current) return;
    const pulse = active && !reducedMotion ? 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.045 : 1;
    node.current.scale.setScalar(pulse);
  });

  return (
    <group position={positions[index]}>
      <mesh ref={node} onClick={() => onSelect(index)}>
        {index === 2 ? <octahedronGeometry args={[0.57, 0]} /> : <boxGeometry args={[0.86, 0.86, 0.86]} />}
        <meshStandardMaterial
          color={active ? "#f1f4f3" : passed ? "#8bb7a2" : "#18272e"}
          emissive={active ? "#ff654f" : "#000000"}
          emissiveIntensity={active ? 0.48 : 0}
          metalness={0.18}
          roughness={0.42}
        />
      </mesh>
      <mesh scale={1.08}>
        {index === 2 ? <octahedronGeometry args={[0.57, 0]} /> : <boxGeometry args={[0.86, 0.86, 0.86]} />}
        <meshBasicMaterial color={active ? "#ff8a73" : "#6f8d9b"} wireframe transparent opacity={active ? 0.72 : 0.3} />
      </mesh>
    </group>
  );
}

function RuntimeGraph({ activeIndex, onSelect, reducedMotion }: { activeIndex: number; onSelect: (index: number) => void; reducedMotion: boolean }) {
  const graph = useRef<THREE.Group>(null);
  const vectors = useMemo(() => positions.map((position) => new THREE.Vector3(...position)), []);

  useFrame((state) => {
    if (!graph.current || reducedMotion) return;
    graph.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.23) * 0.09;
    graph.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.17) * 0.025;
  });

  return (
    <group ref={graph}>
      {vectors.slice(0, -1).map((from, index) => (
        <Connector key={index} from={from} to={vectors[index + 1]} active={index < activeIndex} />
      ))}
      {positions.map((_, index) => (
        <RuntimeNode key={index} index={index} activeIndex={activeIndex} onSelect={onSelect} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

export default function TopologyCanvas({ activeIndex, onSelect, reducedMotion }: { activeIndex: number; onSelect: (index: number) => void; reducedMotion: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.4, 8.4], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} color="#c8e5ef" />
      <pointLight position={[-4, -2, 3]} intensity={16} color="#ff654f" distance={8} />
      <RuntimeGraph activeIndex={activeIndex} onSelect={onSelect} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
