import { useRef } from 'react';
import * as THREE from 'three';
import type { Bullet as BulletType } from '../../stores/gameStore';

interface BulletProps {
  bullet: BulletType;
}

export function Bullet({ bullet }: BulletProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={bullet.position}>
      {/* Main bullet */}
      <mesh ref={meshRef}>
        <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffaa00"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Bullet trail */}
      <mesh position={[0, -0.2, 0]}>
        <coneGeometry args={[0.04, 0.3, 8]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff3300"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glow light */}
      <pointLight color="#ffaa00" intensity={0.5} distance={1} />
    </group>
  );
}

