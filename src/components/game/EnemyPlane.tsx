import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Enemy } from "../../stores/gameStore";

// Preload the enemy plane model
useGLTF.preload("/models/enemy-plane.glb");

interface EnemyPlaneProps {
  enemy: Enemy;
}

export function EnemyPlane({ enemy }: EnemyPlaneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/enemy-plane.glb");

  useFrame(() => {
    if (!meshRef.current) return;

    // Update position from store
    meshRef.current.position.set(...enemy.position);

    // Slight wobble animation
    // meshRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.1;
  });

  if (enemy.isHit) return null;

  const color = enemy.experience.color;

  return (
    <group ref={meshRef} position={enemy.position}>
      {/* Company name label */}
      <Text
        position={[0, 1.5, 1]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {enemy.experience.company}
      </Text>

      {/* Role subtitle */}
      <Text
        position={[0, 1.15, 1]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {enemy.experience.role}
      </Text>

      {/* Enemy plane 3D model */}
      <primitive
        object={scene.clone()}
        scale={1}
        rotation={[-1.5, 0, Math.PI]}
        position={[2, 0, 0]}
      />

      {/* Glowing aura */}
      <pointLight color={color} intensity={1} distance={3} />
    </group>
  );
}
