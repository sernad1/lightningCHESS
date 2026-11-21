"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ChessBoardModel } from "@/components/chess/scene/chessBoardModel";
import { ChessPieceModel } from "@/components/chess/scene/chessPieceModel";
import { SceneEnvironment } from "@/components/chess/scene/sceneEnvironment";
import { getChessPieceModelCoords, getPiecesFromFen } from "@/lib/utils";
import { PIECE_MODELS } from "@/lib/constants";
import { useGameFen } from "@/stores/useGameStore";
import { usePreferredPieceTheme } from "@/stores/usePreferencesStore";
import { Square } from "chess.js";

interface ChessBoard3DProps {
  viewFromOpposite?: bool;
  selectedSquare?: string | null;
  onSquareClick?: (square: Square) => void;
}

export default function ChessBoard3D({ viewFromOpposite, selectedSquare, onSquareClick }: ChessBoard3DProps) {
  const fen = useGameFen();
  const pieces = useMemo(() => getPiecesFromFen(fen), [fen]);
  const {whitePrimary, blackPrimary} = usePreferredPieceTheme();

  return (
    <div className="w-full h-full border border-border rounded-lg flex items-center justify-center bg-slate-950 text-slate-200">
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: viewFromOpposite ? [0, 12, -8] : [0, 12, 8], fov: 45 }} frameloop="demand">
          <SceneEnvironment />

          <directionalLight castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8}
            shadow-camera-bottom={-8} shadow-camera-near={0.25} shadow-camera-far={30}
			      shadow-bias={-0.0005} shadow-normalBias={0.05} position={[7, 8, 7]} intensity={0.5}/>

          <ChessBoardModel coords={[0, -0.5, 0]}
            		onSquareClick={onSquareClick}/>

          {pieces.map((piece) => (
            <ChessPieceModel 
					key={`${piece.color}-${piece.type}-${piece.square}`}
              		modelPath={PIECE_MODELS[piece.type] || ""}
					coords={getChessPieceModelCoords(piece.square)}
			        pieceColor={piece.color === "w" ? whitePrimary : blackPrimary} 
					scale={0.5}
              		onPieceClick={() => onSquareClick?.(piece.square)}/>
          ))}
        </Canvas>
      </Suspense>
    </div>
  );
}
