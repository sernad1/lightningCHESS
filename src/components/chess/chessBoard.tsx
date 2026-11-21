"use client";

import { usePreferredViewMode } from "@/stores/usePreferencesStore";
import { useGameFen, useGameMoveTurn, useGameStatus, useGameStoreActions} from "@/stores/useGameStore";
import { useSquareClick } from "@/hooks/useSquareClick";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

export default function ChessBoard() {
  const viewMode = usePreferredViewMode();
  const fen = useGameFen();
  const turn = useGameMoveTurn();
  const status = useGameStatus();
  const { makeMove } = useGameStoreActions();
  const { selectedSquare, handleSquareClick } = useSquareClick({ fen, turn, disabled: status !== "IN_PROGRESS", makeMove});

  return (
    <div className="relative w-full h-full">
      {viewMode === "2D" ? (
        <ChessBoard2D selectedSquare={selectedSquare} onSquareClick={handleSquareClick}/>
      ) : (
        <ChessBoard3D viewFromOpposite={true} selectedSquare={selectedSquare} onSquareClick={handleSquareClick}/>
      )}
    </div>
  );
}