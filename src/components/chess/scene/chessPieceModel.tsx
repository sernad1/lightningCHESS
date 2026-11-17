import React, { useRef, useEffect, useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useBakedNoiseTexture } from "@/hooks/useBakedNoiseTexture";

interface ChessPieceModelProps {
  coords: [number, number, number];
  modelPath: string;
  scale?: number;
  pieceColor: string;
  onClick?: () => void;
}

export function ChessPieceModel({ coords, modelPath, scale = 1, pieceColor, onClick }: ChessPieceModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [coords, invalidate]);

  return (
    <LoadedPieceModel 
      groupRef={groupRef} 
      coords={coords} 
      modelPath={modelPath} 
      scale={scale} 
	  modelColor={pieceColor}
      onClick={onClick} 
    />
  );
}

function LoadedPieceModel({ groupRef, coords, modelPath, scale, modelColor, onClick }: {
  groupRef: React.RefObject<THREE.Group | null>;
  coords: [number, number, number];
  modelPath: string;
  scale: number;
  onClick?: () => void;
}) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { invalidate } = useThree();
  const noiseTexture = useBakedNoiseTexture(512);

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

		mesh.material = new THREE.MeshStandardMaterial({
			color: modelColor,
			roughness: 0.25,
			metalness: 0.1,
			roughnessMap: noiseTexture
		});
      }
    });

    return clone;
  }, [gltf.scene, noiseTexture]);

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
