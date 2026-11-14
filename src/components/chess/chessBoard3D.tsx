"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ChessBoardModel } from "@/components/chess/scene/chessBoardModel";
import { ChessPieceModel } from "@/components/chess/scene/chessPieceModel";
import { SceneEnvironment } from "@/components/chess/scene/sceneEnvironment";
import { getChessPieceModelCoords, getPiecesFromFen } from "@/lib/utils";
import { PIECE_MODELS } from "@/lib/constants";
import { useGameFen } from "@/stores/useGameStore";
import { usePieceTextures } from "@/hooks/usePieceTextures";

interface ChessBoard3DProps {
  onSquareClick?: (square: string) => void;
}

export default function ChessBoard3D({ onSquareClick }: ChessBoard3DProps) {
  const fen = useGameFen();
  const pieces = useMemo(() => getPiecesFromFen(fen), [fen]);
  const textures = usePieceTextures();

  return (
    <div className="w-full h-full border border-border rounded-lg flex items-center justify-center bg-slate-950 text-slate-200">
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 12, 8], fov: 50 }} frameloop="demand">
          <SceneEnvironment />
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

          <ChessBoardModel
            coords={[0, -0.5, 0]}
            size={[10, 1, 10]}
            onSquareClick={onSquareClick}
          />

          {pieces.map((piece) => (
            <ChessPieceModel
              key={`${piece.color}-${piece.type}-${piece.square}`}
              modelPath={PIECE_MODELS[piece.type] || ""}
              coords={getChessPieceModelCoords(piece.square)}
              texture={piece.color === "w" ? textures.white : textures.black}
              scale={0.5}
              onClick={() => onSquareClick?.(piece.square)}
            />
          ))}
        </Canvas>
      </Suspense>
    </div>
  );
}