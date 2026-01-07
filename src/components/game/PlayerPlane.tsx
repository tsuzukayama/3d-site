import { useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameStore } from '../../stores/gameStore';

const MOVE_SPEED = 8;
const BOUNDS = { x: 4, yMin: -4.5, yMax: 0 };
const SHOOT_COOLDOWN = 0.15;

export function PlayerPlane() {
  const meshRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const lastShootTime = useRef(0);
  
  const { isPlaying, isPaused, addBullet, setPlayerPosition } = useGameStore();

  const shoot = useCallback(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.position;
    
    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}`,
      position: [pos.x - 0.3, pos.y + 0.5, pos.z],
      velocity: [0, 15, 0],
    });
    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}-2`,
      position: [pos.x + 0.3, pos.y + 0.5, pos.z],
      velocity: [0, 15, 0],
    });
  }, [addBullet]);

  useFrame((state, delta) => {
    if (!meshRef.current || !isPlaying || isPaused) return;

    const mesh = meshRef.current;
    const k = keys.current;

    // Movement
    let dx = 0;
    let dy = 0;

    if (k.left) dx -= MOVE_SPEED * delta;
    if (k.right) dx += MOVE_SPEED * delta;
    if (k.up) dy += MOVE_SPEED * delta;
    if (k.down) dy -= MOVE_SPEED * delta;

    mesh.position.x = THREE.MathUtils.clamp(
      mesh.position.x + dx,
      -BOUNDS.x,
      BOUNDS.x
    );
    mesh.position.y = THREE.MathUtils.clamp(
      mesh.position.y + dy,
      BOUNDS.yMin,
      BOUNDS.yMax
    );

    // Tilt based on movement
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -dx * 5, 0.1);
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, dy * 2, 0.1);

    // Shooting
    if (k.shoot && state.clock.elapsedTime - lastShootTime.current > SHOOT_COOLDOWN) {
      shoot();
      lastShootTime.current = state.clock.elapsedTime;
    }

    // Update store position for collision detection
    setPlayerPosition([mesh.position.x, mesh.position.y, mesh.position.z]);
  });

  // Click to shoot
  const handleClick = () => {
    if (isPlaying && !isPaused) {
      shoot();
    }
  };

  return (
    <group ref={meshRef} position={[0, -3, 0]} onClick={handleClick}>
      {/* Main fuselage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.3]} />
        <meshStandardMaterial color="#4a90d9" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.2, 0.15]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#87ceeb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wings */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.6, 0.3, 0.1]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Tail wing */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.08]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh position={[0, -0.45, 0.12]}>
        <boxGeometry args={[0.08, 0.25, 0.2]} />
        <meshStandardMaterial color="#2a6bb8" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Engine glow left */}
      <mesh position={[-0.15, -0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff3300" emissiveIntensity={2} />
      </mesh>

      {/* Engine glow right */}
      <mesh position={[0.15, -0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff3300" emissiveIntensity={2} />
      </mesh>

      {/* Propeller spinner */}
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

