import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

interface ExplosionProps {
  id: string;
  position: [number, number, number];
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  color: THREE.Color;
}

export function Explosion({ id, position }: ExplosionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [particles] = useState<Particle[]>(() => {
    const p: Particle[] = [];
    const colors = ['#ff6600', '#ffaa00', '#ff3300', '#ffffff', '#ffff00'];

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const elevation = (Math.random() - 0.5) * 2;

      p.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed + elevation,
          (Math.random() - 0.5) * speed
        ),
        scale: 0.1 + Math.random() * 0.2,
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
      });
    }
    return p;
  });

  const [lifetime, setLifetime] = useState(0);
  const removeExplosion = useGameStore((state) => state.removeExplosion);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    setLifetime((prev) => prev + delta);

    // Update particle positions
    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      particle.velocity.multiplyScalar(0.95); // Drag
      particle.scale *= 0.97; // Shrink

      const mesh = groupRef.current?.children[i] as THREE.Mesh;
      if (mesh) {
        mesh.position.copy(particle.position);
        mesh.scale.setScalar(particle.scale * (1 - lifetime));
      }
    });

    // Remove after 1 second
    if (lifetime > 1) {
      removeExplosion(id);
    }
  });

  useEffect(() => {
    // Play sound effect here if needed
  }, []);

  const opacity = Math.max(0, 1 - lifetime);

  return (
    <group ref={groupRef} position={position}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={2}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}

      {/* Central flash */}
      <pointLight
        color="#ff6600"
        intensity={10 * (1 - lifetime)}
        distance={5}
      />
    </group>
  );
}

