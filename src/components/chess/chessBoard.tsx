"use client";

import { usePreferredViewMode } from "@/stores/usePreferencesStore";
import { useGameFen, useGameMoveTurn, useGameStoreActions} from "@/stores/useGameStore";
import { useSquareClick } from "@/hooks/useSquareClick";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

export default function ChessBoard() {
  const viewMode = usePreferredViewMode();
  const fen = useGameFen();
  const turn = useGameMoveTurn();
  const { makeMove } = useGameStoreActions();
  const { selectedSquare, handleSquareClick } = useSquareClick({fen, turn, makeMove});

  return (
    <div className="relative w-full h-full">
      {viewMode === "2D" ? (
        <ChessBoard2D selectedSquare={selectedSquare} onSquareClick={handleSquareClick} />
      ) : (
        <ChessBoard3D selectedSquare={selectedSquare} onSquareClick={handleSquareClick} />
      )}
    </div>
  );
}
