import { Canvas } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";

function Chip(props) {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.25, 1.2]} />
        <meshStandardMaterial color="#111" metalness={0.2} roughness={0.4} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`pL-${i}`} position={[-0.9, -0.15, -0.55 + i * (1.1 / 9)]}>
          <boxGeometry args={[0.12, 0.12, 0.05]} />
          <meshStandardMaterial color="#c9c9c9" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`pR-${i}`} position={[0.9, -0.15, -0.55 + i * (1.1 / 9)]}>
          <boxGeometry args={[0.12, 0.12, 0.05]} />
          <meshStandardMaterial color="#c9c9c9" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Board(props) {
  return (
    <mesh receiveShadow {...props}>
      <boxGeometry args={[6, 0.08, 4]} />
      <meshStandardMaterial color="#0a3d2e" roughness={0.8} />
    </mesh>
  );
}

function IOBar({ x = 0, z = 0 }) {
  return (
    <mesh position={[x, 0.25, z]} castShadow>
      <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      <meshStandardMaterial color="#9ad1ff" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="h-[56vh] md:h-[70vh] rounded-3xl overflow-hidden border dark:border-neutral-900">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [6, 4, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <PresentationControls global polar={[0.1, 1]} azimuth={[-0.6, 0.6]} speed={1.2} zoom={0.8}>
            <group>
              <Board position={[0, 0, 0]} />
              <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
                <Chip position={[0, 0.6, 0]} />
              </Float>
              <IOBar x={-2.3} z={-1.2} />
              <IOBar x={-1.9} z={-1.2} />
              <IOBar x={2.1} z={1.3} />
              <IOBar x={2.5} z={1.3} />
            </group>
          </PresentationControls>
          <Environment preset="city" />
          <ContactShadows opacity={0.3} blur={2.5} far={8} resolution={1024} />
        </Suspense>
      </Canvas>
    </div>
  );
}
