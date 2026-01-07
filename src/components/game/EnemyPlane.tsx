import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Enemy } from '../../stores/gameStore';

interface EnemyPlaneProps {
  enemy: Enemy;
}

export function EnemyPlane({ enemy }: EnemyPlaneProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    // Update position from store
    meshRef.current.position.set(...enemy.position);
    
    // Slight wobble animation
    meshRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.1;
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.002) * 0.05;
  });

  if (enemy.isHit) return null;

  const color = enemy.experience.color;

  return (
    <group ref={meshRef} position={enemy.position}>
      {/* Company name label */}
      <Text
        position={[0, 1.2, 0]}
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
        position={[0, 0.85, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {enemy.experience.role}
      </Text>

      {/* Enemy plane body - facing down (towards player) */}
      <group rotation={[0, 0, Math.PI]}>
        {/* Main fuselage */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 1.4, 0.35]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Cockpit (enemy - red tinted) */}
        <mesh position={[0, 0.25, 0.18]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#ff4444" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Wings - larger, more aggressive */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2, 0.35, 0.12]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Wing tips */}
        <mesh position={[-1, -0.1, 0.1]}>
          <boxGeometry args={[0.15, 0.2, 0.25]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[1, -0.1, 0.1]}>
          <boxGeometry args={[0.15, 0.2, 0.25]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Tail */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[0.7, 0.2, 0.1]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Vertical stabilizer */}
        <mesh position={[0, -0.55, 0.15]}>
          <boxGeometry args={[0.1, 0.3, 0.25]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Engines - glowing */}
        <mesh position={[-0.5, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.5, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Glowing aura */}
      <pointLight color={color} intensity={1} distance={3} />
    </group>
  );
}

