"use client";

import { usePreferredViewMode } from "@/stores/usePreferencesStore";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

interface ChessBoardProps {
  selectedSquare?: string | null;
  onSquareClick?: (square: string) => void;
}

export default function ChessBoard({ selectedSquare, onSquareClick }: ChessBoardProps) {
  const viewMode = usePreferredViewMode();

  return (
    <div className="relative w-full h-full">
      {viewMode === "2D" ? (
        <ChessBoard2D selectedSquare={selectedSquare} onSquareClick={onSquareClick} />
      ) : (
        <ChessBoard3D onSquareClick={onSquareClick} />
      )}
    </div>
  );
}