import React, { useRef, useEffect, useMemo } from "react";
import { useLoader, useThree, ThreeEvent } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { BOARD_MODEL } from "@/lib/constants";
import { useChessBoardTexture } from "@/hooks/useChessBoardTexture";
import { usePreferredBoardTheme } from "@/stores/usePreferencesStore";

interface ChessBoardModelProps {
  coords: [number, number, number];
  scale?: number;
  onSquareClick?: (square: string) => void;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

export function ChessBoardModel({ coords, scale = 1, onSquareClick }: ChessBoardModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  const gltf = useLoader(GLTFLoader, BOARD_MODEL);
  const boardTexture = useChessBoardTexture(1024);
  const theme = usePreferredBoardTheme();

  const frameScene= useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.material = new THREE.MeshStandardMaterial({
		  color: theme.boardFrame,
          roughness: 0.6,
          metalness: 0.1,
        });
		mesh.material.needsUpdate = true;
      }
    });

    return clone;
  }, [gltf.scene]);

  useEffect(() => {
    invalidate();
  }, [coords, frameScene, invalidate]);

  const handleSurfaceClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!onSquareClick) return;

    const uv = e.uv;
    if (!uv) return;

    const fileIdx = Math.floor(uv.x * 8);
    const rankIdx = Math.floor(uv.y * 8);

    if (fileIdx >= 0 && fileIdx < 8 && rankIdx >= 0 && rankIdx < 8) {
      const file = FILES[fileIdx];
      const rank = RANKS[rankIdx];
      onSquareClick?.(`${file}${rank}`);
    }
  };

  return (
    <group
      ref={groupRef}
      position={coords}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
	{/* Main board model */}
      <primitive object={frameScene} scale={[scale, scale, scale]} />

	{/* Thin square surface on top of board */}
	  <mesh
	  	position={[coords[0], 0.45, coords[2]]}
		rotation={[-Math.PI / 2, 0, 0]}
		receiveShadow
		onClick={handleSurfaceClick}>
		<planeGeometry args={[8, 8]} />
		<meshStandardMaterial
			map={boardTexture}
			roughness={0.3}
			metalness={0.05}
		/>
	  </mesh>
    </group>
  );
}
