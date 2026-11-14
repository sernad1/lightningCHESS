import React, { useRef, useEffect, useMemo } from "react";
import { ThreeEvent, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec3 uLightDir;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float diff = max(dot(vNormal, normalize(uLightDir)), 0.35);
    gl_FragColor = vec4(texColor.rgb * diff, 1.0);
  }
`;

function createPieceShaderMaterial(texture: THREE.CanvasTexture) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: texture },
      uLightDir: { value: new THREE.Vector3(7, 8, -8) },
    },
  });
}

interface ChessPieceModelProps {
  coords: [number, number, number];
  modelPath: string;
  texture: THREE.CanvasTexture;
  scale?: number;
  onClick?: () => void;
}

export function ChessPieceModel({ coords, modelPath, texture, scale = 1, onClick}: ChessPieceModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  const shaderMaterial = useMemo(() => createPieceShaderMaterial(texture), [texture]);

  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
          onClick?.();
  }

  useEffect(() => {
    invalidate();
    return () => shaderMaterial.dispose();
  }, [coords, shaderMaterial, invalidate]);

  if (!modelPath) {
    return (
      <mesh position={coords} material={shaderMaterial} castShadow receiveShadow onClick={(e) => handleMeshClick(e)}>
        <boxGeometry args={[0.6, 0.8, 0.6]} />
      </mesh>
    );
  }

  return (
    <LoadedPieceModel groupRef={groupRef} coords={coords} modelPath={modelPath} shaderMaterial={shaderMaterial}
      scale={scale} onClick={onClick}/>
  );
}

function LoadedPieceModel({ groupRef, coords, modelPath, shaderMaterial, scale, onClick}: {
  groupRef: React.RefObject<THREE.Group | null>;
  coords: [number, number, number];
  modelPath: string;
  shaderMaterial: THREE.ShaderMaterial;
  scale: number;
  onClick?: () => void;
}) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { invalidate } = useThree();

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = shaderMaterial;
      }
    });

    return clone;
  }, [gltf.scene, shaderMaterial]);

  useEffect(() => {
    invalidate();
  }, [coords, clonedScene, invalidate]);

  return (
    <group
      ref={groupRef}
      position={coords}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <primitive object={clonedScene} scale={[scale, scale, scale]} />
    </group>
  );
}