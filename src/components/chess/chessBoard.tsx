"use client";

import { usePreferredViewMode } from "@/stores/usePreferencesStore";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

interface ChessBoardProps {
  selectedSquare?: string | null;
  onSquareClick?: (square: string) => void;
}

export default function ChessBoard({ selectedSquare, onSquareClick}: ChessBoardProps) {
  const viewMode = usePreferredViewMode();

  return (
    <div className="relative w-[850px] h-[850px] max-w-full aspect-square">
      <div className={viewMode === "2D" ? "w-full h-full block" : "hidden"}>
        <ChessBoard2D selectedSquare={selectedSquare} onSquareClick={onSquareClick}/>
      </div>
      <div className={viewMode === "3D" ? "w-full h-full block" : "hidden"}>
        <ChessBoard3D onSquareClick={onSquareClick}/>
      </div>
    </div>
  );
}