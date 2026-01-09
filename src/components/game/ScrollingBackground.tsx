import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Preload the terrain model
useGLTF.preload("/models/terrain.glb");

// Create cloud positions
const cloudPositions = Array.from({ length: 15 }, (_, i) => ({
  x: (Math.random() - 0.5) * 12,
  y: (i / 15) * 20 - 5,
  z: -1 - Math.random() * 2,
  scale: 0.2 + Math.random() * 0.3,
}));

export function ScrollingBackground() {
  const cloudsRef = useRef<THREE.Group>(null);
  const terrainRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/terrain.glb");

  useFrame((_, delta) => {
    // Animate clouds
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud) => {
        cloud.position.y -= delta * 0.8;
        if (cloud.position.y < -10) {
          cloud.position.y = 10;
          cloud.position.x = (Math.random() - 0.5) * 12;
        }
      });
    }

    // Scroll terrain downward for parallax effect
    if (terrainRef.current) {
      terrainRef.current.position.y -= delta * 1;
      // Reset position for infinite scrolling
      if (terrainRef.current.position.y < -30) {
        terrainRef.current.position.y = 0;
      }
    }
  });

  return (
    <>
      {/* Terrain background - scrolling ground */}
      <group ref={terrainRef}>
        {/* First terrain tile */}
        <primitive
          object={scene.clone()}
          scale={50}
          rotation={[0, 1, 1]}
          position={[-35, -15, -2]}
        />
        {/* Second terrain tile for seamless scrolling */}
        <primitive
          object={scene.clone()}
          scale={50}
          rotation={[0, 1, 1]}
          position={[-35, 20, -2]}
        />
      </group>

      {/* Clouds for atmosphere */}
      <group ref={cloudsRef}>
        {cloudPositions.map((pos, i) => (
          <Cloud key={i} position={[pos.x, pos.y, pos.z]} scale={pos.scale} />
        ))}
      </group>
    </>
  );
}

function Cloud({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          flatShading
        />
      </mesh>
      <mesh position={[0.8, -0.2, 0]}>
        <sphereGeometry args={[0.7, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          flatShading
        />
      </mesh>
      <mesh position={[-0.7, -0.1, 0.2]}>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          flatShading
        />
      </mesh>
    </group>
  );
}
