"use client";

import { useState } from "react";
import ChessBoard from "@/components/chess/chessBoard";
import { ChessPiece } from "@/types/chess";
import { Button } from "@/components/ui/button";
import { getStandardPieceSet } from "@/lib/utils"

export default function ChessPage() {
  const [pieces, setPieces] = useState<ChessPiece[]>(getStandardPieceSet());
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const handleSquareClick = (square: string) => {
    console.log(`Clicked square: ${square}`);
    
    const clickedPiece = pieces.find((p) => p.square === square);

    if (clickedPiece) {
      setSelectedSquare(square);
    } else if (selectedSquare) {
      setPieces((prevPieces) =>
        prevPieces.map((p) =>
          p.square === selectedSquare ? { ...p, square } : p
        )
      );
      setSelectedSquare(null); 
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 p-6 bg-background">
      <div className="flex flex-col items-start gap-4 p-6 border border-border rounded-xl bg-card shadow-sm w-full md:w-72">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">Chess Game</h1>
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
            {viewMode} Mode
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {selectedSquare
            ? `Selected: ${selectedSquare}. Click a destination.`
            : "Click a piece to move."}
        </p>

        <Button
          variant="default"
          className="w-full mt-2"
          onClick={() => setViewMode(viewMode === "2d" ? "3d" : "2d")}
        >
          Switch to {viewMode === "2d" ? "3D" : "2D"} View
        </Button>
      </div>

      <div className="flex justify-center items-center">
        <ChessBoard
          pieces={pieces}
          viewMode={viewMode}
          onSquareClick={handleSquareClick}
        />
      </div>    </div>
  );
}
