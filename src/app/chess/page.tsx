"use client";

import { useState } from "react";
import ChessBoard from "@/components/chessBoard";
import { ChessPiece } from "@/types/chess";
import { Button } from "@/components/ui/button";

// Demo, remove later !!!!! //
// Also, decide on what should id look like //
const initialPieces: ChessPiece[] = [
  { id: "w-king", type: "king", color: "white", square: "e1" },
  { id: "w-queen", type: "queen", color: "white", square: "d1" },
  { id: "w-pawn-e", type: "pawn", color: "white", square: "e2" },
  { id: "w-pawn-d", type: "pawn", color: "white", square: "d2" },
  
  { id: "b-king", type: "king", color: "black", square: "e8" },
  { id: "b-queen", type: "queen", color: "black", square: "d8" },
  { id: "b-pawn-e", type: "pawn", color: "black", square: "e7" },
  { id: "b-pawn-d", type: "pawn", color: "black", square: "d7" },
];

export default function ChessPage() {
  const [pieces, setPieces] = useState<ChessPiece[]>(initialPieces);
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-background">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Chess Game ({viewMode.toUpperCase()} Mode)</h1>
        <p className="text-sm text-muted-foreground">
          {selectedSquare ? `Selected: ${selectedSquare}. Click a destination.` : "Click a piece to move."}
        </p>

        <Button 
          variant="outline" 
          onClick={() => setViewMode(viewMode === "2d" ? "3d" : "2d")}
        >
          Switch to {viewMode === "2d" ? "3D" : "2D"} View
        </Button>
      </div>

      <ChessBoard 
        pieces={pieces} 
        viewMode={viewMode} 
        onSquareClick={handleSquareClick} 
      />
    </div>
  );
}
