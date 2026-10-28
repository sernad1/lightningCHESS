import { useRef } from "react"; 
import { useThree } from "@react-three/fiber";

// invalidate forces r3f to render next frame, can be used with frameloop="demand" to render new frames only when something changes //
interface ChessPieceModelProps {
	coords: [number, number, number];
	size: [number, number, number];
}

export function ChessPieceModel({coords, size}: ChessPieceModelProps){
	const meshRef = useRef();

	const { invalidate } = useThree();

	return (
		<mesh castShadow receiveShadow ref={meshRef} position={coords}>
			<boxGeometry args={size}/>
			<meshStandardMaterial color="red"/>
		</mesh>
	);
}
