import React, { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface ChessPieceModelProps {
	coords: [number, number, number];
	modelPath: string;
	scale?: number;
}

export function ChessPieceModel({ coords, modelPath, scale = 1 }: ChessPieceModelProps) {
	const groupRef = useRef<THREE.Group>(null);
	const { invalidate } = useThree();

	if (!modelPath) {
        return (
            <mesh ref={groupRef as any} position={coords} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.8, 0.6]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>
        );
    }

	return (
        <LoadedPieceModel 
            groupRef={groupRef} 
            coords={coords} 
            modelPath={modelPath} 
            scale={scale} 
        />
    );
}

function LoadedPieceModel({ groupRef, coords, modelPath, scale }:{ 
	    groupRef: React.RefObject<THREE.Group>; 
	    coords: [number, number, number]; 
	    modelPath: string; 
	    scale: number; 
	}){

    const gltf = useLoader(GLTFLoader, modelPath);
	const { invalidate } = useThree();
    
    const clonedScene = React.useMemo(() => {
      const clone = gltf.scene.clone(true);
      
      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      return clone;
    }, [gltf.scene]);

	useEffect(() => {
		invalidate();
	}, [invalidate]);
    
    return (
      <group ref={groupRef} position={coords}>
        <primitive object={clonedScene} scale={[scale, scale, scale]} />
      </group>
    );
}
