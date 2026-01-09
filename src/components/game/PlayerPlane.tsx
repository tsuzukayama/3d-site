import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useGameStore } from "../../stores/gameStore";
import { useGLTF } from "@react-three/drei";

const MOVE_SPEED = 8;
const BOUNDS = { x: 4, yMin: -4.5, yMax: 0 };
const SHOOT_COOLDOWN = 0.15;

useGLTF.preload("/models/player-plane.glb");

export function PlayerPlane() {
  const meshRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const lastShootTime = useRef(0);

  const { scene } = useGLTF("/models/player-plane.glb");

  const { isPlaying, isPaused, addBullet, setPlayerPosition } = useGameStore();

  const shoot = useCallback(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.position;

    const gunOffsetX = 0.15; // Adjust based on wing width

    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}`,
      position: [pos.x - gunOffsetX, pos.y, pos.z],
      velocity: [0, 15, 0],
    });
    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}-2`,
      position: [pos.x + gunOffsetX, pos.y, pos.z],
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

    // Shooting
    if (
      k.shoot &&
      state.clock.elapsedTime - lastShootTime.current > SHOOT_COOLDOWN
    ) {
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
    <group ref={meshRef} position={[0, 0, 0]} onClick={handleClick}>
      <primitive
        object={scene.clone()}
        scale={1}
        rotation={[1.5, 0, 0]}
        position={[-2, 0, 0]}
      />
    </group>
  );
}
