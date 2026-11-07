"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ChessPiece } from "@/types/chess";
import { ChessBoardModel } from "@/components/chess/scene/chessBoardModel";
import { ChessPieceModel } from "@/components/chess/scene/chessPieceModel"
import { SceneEnvironment } from "@/components/chess/scene/sceneEnvironment";
import { getChessPieceModelCoords } from "@/lib/utils";
import { Suspense } from "react";
import { PIECE_MODELS } from "@/lib/constants";

interface ChessBoard3DProps {
	pieces: ChessPiece[];
}

// frameloop="demand" stops rendering frames continuously, only render new frame when prop changes, camera moves, or something triggers an update explicitly //
export default function ChessBoard3D({pieces}: ChessBoard3DProps){
	return (
		<div className="w-full h-full border border-border rounded-lg flex items-center justify-center bg-slate-950 text-slate-200">
			<Suspense fallback={null}>
				<Canvas shadows camera={{position: [0, 12, 12], fov: 45}} frameloop="demand">
					<SceneEnvironment/>
					<directionalLight 
						castShadow 
						shadow-mapSize-width={2048} 
						shadow-mapSize-height={2048} 
						shadow-camera-left={-7}
						shadow-camera-right={7}
						shadow-camera-top={7}
						shadow-camera-bottom={-7}
						shadow-camera-near={0.25}
						shadow-camera-far={25}
						shadow-bias={-0.0001}
						position={[7, 8, -8]} 
						intensity={0.5}
					/>

					<ChessBoardModel coords={[0, -0.5, 0]} size={[10, 1, 10]}/>	

					{
						// Change modelPath depending on piece type
						pieces.map((piece) => (
							<ChessPieceModel 
								key={piece.id} 
								modelPath={PIECE_MODELS[piece.type] || ""} 
								coords={getChessPieceModelCoords(piece.square)} 
								scale={0.5}
							/>
						))
					}
				</Canvas>	
			</Suspense>
    	</div>
	);
}
