"use client";

import { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import ChessBoard from "@/components/chess/chessBoard";
import { Button } from "@/components/ui/button";
import { useGameFen, useGamePgn, useGameStatus, useGameMoveTurn, useGameStoreActions} from "@/stores/useGameStore";
import { usePreferredViewMode, usePreferencesActions} from "@/stores/usePreferencesStore";

export default function ChessPage() {
  const fen = useGameFen();
  const pgn = useGamePgn();
  const status = useGameStatus();
  const turn = useGameMoveTurn();
  const { initGame, makeMove, resetGame } = useGameStoreActions();
  const viewMode = usePreferredViewMode();
  const { setViewMode } = usePreferencesActions();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    if (status === "WAITING") {
      initGame({ id: "local-session", matchType: "VS_AI" });
    }
  }, [status, initGame]);

  const handleSquareClick = (square: string) => {
    const board = new Chess(fen);
    const clickedPiece = board.get(square as Square);

    if (!selectedSquare) {
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare(square);
      }
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    const moved = makeMove(selectedSquare, square, "q");
    if (moved) setSelectedSquare(null);
     else if (clickedPiece && clickedPiece.color === turn) {
      setSelectedSquare(square);
    } 
    else setSelectedSquare(null);
  };

  const handleBoardReset = () => {
    setSelectedSquare(null);
    resetGame();
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 p-6 bg-background">
      <div className="flex flex-col items-start gap-4 p-6 border border-border rounded-xl bg-card shadow-sm w-full md:w-72">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">Chess Game</h1>
          <div className="flex gap-2">
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
              {viewMode} Mode
            </span>
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
              Turn: {turn === "w" ? "White" : "Black"}
            </span>
          </div>
        </div>

        <div className="w-full p-2.5 rounded bg-muted/50 text-xs font-mono h-24 overflow-y-auto border border-border">
          {pgn || "No moves played yet."}
        </div>

        <Button variant="default" className="w-full" onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}>
          Switch to {viewMode === "2D" ? "3D" : "2D"} View
        </Button>

        <Button variant="outline" className="w-full" onClick={() => handleBoardReset()}>
          Reset Board
        </Button>
      </div>

      <div className="flex justify-center items-center">
        <ChessBoard selectedSquare={selectedSquare} onSquareClick={handleSquareClick}/>
      </div>
    </div>
  );
}