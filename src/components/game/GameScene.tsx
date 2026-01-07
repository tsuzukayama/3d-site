import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PlayerPlane } from './PlayerPlane';
import { EnemyPlane } from './EnemyPlane';
import { Bullet } from './Bullet';
import { Explosion } from './Explosion';
import { ScrollingBackground } from './ScrollingBackground';
import { useGameStore } from '../../stores/gameStore';

const SPAWN_INTERVAL = 4; // seconds between spawns
const HIT_RADIUS = 0.8;

function GameLogic() {
  const lastSpawnTime = useRef(0);
  const {
    isPlaying,
    isPaused,
    gameTime,
    bullets,
    enemies,
    spawnedCount,
    updateGameTime,
    updateEnemyPositions,
    updateBulletPositions,
    spawnEnemy,
    hitEnemy,
    addExplosion,
    removeBullet,
    setSelectedExperience,
  } = useGameStore();

  useFrame((_, delta) => {
    if (!isPlaying || isPaused) return;

    // Update game time
    updateGameTime(delta);

    // Spawn enemies
    if (gameTime - lastSpawnTime.current > SPAWN_INTERVAL && spawnedCount < 4) {
      spawnEnemy();
      lastSpawnTime.current = gameTime;
    }

    // Update positions
    updateEnemyPositions(delta);
    updateBulletPositions(delta);

    // Collision detection
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (enemy.isHit) return;

        const bulletPos = new THREE.Vector3(...bullet.position);
        const enemyPos = new THREE.Vector3(...enemy.position);
        const distance = bulletPos.distanceTo(enemyPos);

        if (distance < HIT_RADIUS) {
          hitEnemy(enemy.id);
          removeBullet(bullet.id);
          addExplosion(enemy.position);
          setSelectedExperience(enemy.experience);
        }
      });
    });
  });

  return null;
}

function Scene() {
  const { camera } = useThree();
  const { bullets, enemies, explosions, isPlaying } = useGameStore();

  useEffect(() => {
    // Set up orthographic-like perspective for arcade feel
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />

      {/* Background */}
      <ScrollingBackground />

      {/* Game entities */}
      {isPlaying && (
        <>
          <PlayerPlane />

          {enemies.map((enemy) => (
            <EnemyPlane key={enemy.id} enemy={enemy} />
          ))}

          {bullets.map((bullet) => (
            <Bullet key={bullet.id} bullet={bullet} />
          ))}

          {explosions.map((explosion) => (
            <Explosion
              key={explosion.id}
              id={explosion.id}
              position={explosion.position}
            />
          ))}
        </>
      )}

      {/* Game logic hook */}
      <GameLogic />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

export function GameScene() {
  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 10] }}
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #1a2a4a 100%)' }}
    >
      <Scene />
    </Canvas>
  );
}

