"use client";

import { usePreferredViewMode } from "@/stores/usePreferencesStore";
import { useGameFen, useGameMoveTurn, useGameStatus, useGameStoreActions} from "@/stores/useGameStore";
import { useSquareClick } from "@/hooks/useSquareClick";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

interface ChessBoardProps {
  boardFlipped: boolean;
}

export default function ChessBoard({boardFlipped}: ChessBoardProps) {
  const viewMode = usePreferredViewMode();
  const fen = useGameFen();
  const turn = useGameMoveTurn();
  const status = useGameStatus();
  const { makeMove } = useGameStoreActions();
  const { selectedSquare, possibleMoves, handleSquareClick } = useSquareClick({ fen, turn, disabled: status !== "IN_PROGRESS", makeMove});

  return (
    <div className="relative w-full h-full">
      {viewMode === "2D" ? (
        <ChessBoard2D isBoardFlipped={boardFlipped} possibleMoves={possibleMoves} selectedSquare={selectedSquare} onSquareClick={handleSquareClick}/>
      ) : (
        <ChessBoard3D viewFromOpposite={boardFlipped} selectedSquare={selectedSquare} onSquareClick={handleSquareClick}/>
      )}
    </div>
  );
}