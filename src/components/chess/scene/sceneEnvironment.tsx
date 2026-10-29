import { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import * as THREE from 'three';

useLoader.preload(EXRLoader, "/assets/textures/env_map.exr");

export function SceneEnvironment(){
	const texture = useLoader(EXRLoader, "/assets/textures/env_map.exr");
	const { scene } = useThree();

	useEffect(() => {
		texture.mapping = THREE.EquirectangularReflectionMapping;	
		scene.environment = texture;
		scene.background = new THREE.Color("#303030");

		return () => {
			scene.environment = null;
			scene.background = null;
		};
	}, [scene, texture]
	);

	return null;
}
