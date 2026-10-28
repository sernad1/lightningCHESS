"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ChessPiece } from "@/types/chess";
import { ChessBoardModel } from "@/components/chess/scene/chessBoardModel";
import { ChessPieceModel } from "@/components/chess/scene/chessPieceModel"
import { SceneEnvironment } from "@/components/chess/scene/sceneEnvironment";

interface ChessBoard3DProps {
	pieces: ChessPiece[];
}

// frameloop="demand" stops rendering frames continuously, only render new frame when prop changes, camera moves, or something triggers an update explicitly //
export default function ChessBoard3D({pieces}: ChessBoard3DProps){
	return (
		<div className="w-[720px] h-[720px] border border-border rounded-lg flex items-center justify-center bg-slate-950 text-slate-200">
			<Canvas shadows camera={{position: [-12, 7, 0], fov: 60}} frameloop="demand">
				<SceneEnvironment/>
				<ambientLight intensity={0.2}/>
				<directionalLight castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} position={[0, 10, 0]} intensity={2}/>
				<ChessBoardModel coords={[0, -1, 0]} size={[10, 1, 10]}/>	
				<ChessPieceModel coords={[-4.5, 0, 4.5]} size={[1, 1, 1]}/>
				<ChessPieceModel coords={[-4.5, 0, -4.5]} size={[1, 1, 1]}/>
				<ChessPieceModel coords={[4.5, 0, 4.5]} size={[1, 1, 1]}/>
				<ChessPieceModel coords={[4.5, 0, -4.5]} size={[1, 1, 1]}/>
			</Canvas>	
    	</div>
	);
}
