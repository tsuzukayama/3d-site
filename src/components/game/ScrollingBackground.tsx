import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Create cloud positions
const cloudPositions = Array.from({ length: 20 }, (_, i) => ({
  x: (Math.random() - 0.5) * 12,
  y: (i / 20) * 20 - 5,
  z: -2 - Math.random() * 3,
  scale: 0.3 + Math.random() * 0.5,
}));

export function ScrollingBackground() {
  const cloudsRef = useRef<THREE.Group>(null);
  const oceanRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud) => {
        cloud.position.y -= delta * 1;
        if (cloud.position.y < -10) {
          cloud.position.y = 10;
          cloud.position.x = (Math.random() - 0.5) * 12;
        }
      });
    }

    if (oceanRef.current) {
      const material = oceanRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value += delta;
      }
    }
  });

  return (
    <>
      {/* Ocean/Ground plane */}
      <mesh
        ref={oceanRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
      >
        <planeGeometry args={[50, 50, 32, 32]} />
        <shaderMaterial
          uniforms={{
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color("#0a3d62") },
            uColor2: { value: new THREE.Color("#1e5f8a") },
          }}
          vertexShader={`
            uniform float uTime;
            varying vec2 vUv;
            varying float vWave;
            
            void main() {
              vUv = uv;
              vec3 pos = position;
              float wave = sin(pos.x * 0.5 + uTime) * 0.3 + sin(pos.y * 0.3 + uTime * 0.7) * 0.2;
              pos.z += wave;
              vWave = wave;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            varying float vWave;
            
            void main() {
              vec3 color = mix(uColor1, uColor2, vUv.y + vWave * 0.3);
              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>

      {/* Clouds */}
      <group ref={cloudsRef}>
        {cloudPositions.map((pos, i) => (
          <Cloud key={i} position={[pos.x, pos.y, pos.z]} scale={pos.scale} />
        ))}
      </group>

      {/* Distant islands/terrain for parallax */}
      <mesh position={[-8, 0, -8]} rotation={[-Math.PI / 4, 0.3, 0]}>
        <coneGeometry args={[2, 3, 6]} />
        <meshStandardMaterial color="#2d5a3d" flatShading />
      </mesh>
      <mesh position={[9, -1, -10]} rotation={[-Math.PI / 4, -0.2, 0]}>
        <coneGeometry args={[1.5, 2.5, 5]} />
        <meshStandardMaterial color="#3d6a4d" flatShading />
      </mesh>
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
          opacity={0.8}
          flatShading
        />
      </mesh>
      <mesh position={[0.8, -0.2, 0]}>
        <sphereGeometry args={[0.7, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          flatShading
        />
      </mesh>
      <mesh position={[-0.7, -0.1, 0.2]}>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          flatShading
        />
      </mesh>
    </group>
  );
}
