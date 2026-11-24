"use client";

import React, { useMemo } from "react";
import { Move, Square } from "chess.js";
import { useCustomPieces } from "@/hooks/useCustomPieces";
import { Chessboard } from "react-chessboard";
import { useGameFen, useGameStoreActions } from "@/stores/useGameStore";
import { usePreferredBoardTheme, usePreferredPieceTheme} from "@/stores/usePreferencesStore";

interface ChessBoard2DProps {
  isBoardFlipped: boolean;
  selectedSquare?: Square | null;
  possibleMoves?: Move[]
  onSquareClick?: (square: Square) => void;
}

export default function ChessBoard2D({ isBoardFlipped, selectedSquare, possibleMoves = [], onSquareClick}: ChessBoard2DProps) {
  const fen = useGameFen();
  const { makeMove } = useGameStoreActions();
  const boardTheme = usePreferredBoardTheme();
  const pieceTheme = usePreferredPieceTheme();
  const customPieces = useCustomPieces(pieceTheme);

  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    if (selectedSquare) styles[selectedSquare] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
    
    possibleMoves.forEach((move) => {styles[move.to] = { backgroundImage: move.captured
          ? "radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.35) 75%, transparent 75%)"
          : "radial-gradient(circle, rgba(0, 0, 0, 0.3) 20%, transparent 20%)",
      };
    });

    return styles;
  }, [selectedSquare, possibleMoves]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[min(100%,calc(100dvh-14rem))] md:max-w-[min(100%,calc(100dvh-8rem))] aspect-square rounded-md sm:rounded-lg shadow-2xl overflow-hidden border-4 sm:border-8 touch-none"
        style={{ borderColor: boardTheme.boardFrame }}>
        <Chessboard options={{ position: fen, pieces: customPieces, boardOrientation: isBoardFlipped ? "black" : "white", 
          lightSquareStyle: { backgroundColor: boardTheme.lightSquare }, darkSquareStyle: { backgroundColor: boardTheme.darkSquare }, 
          squareStyles: squareStyles,
            
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              if (!targetSquare || sourceSquare === targetSquare) return false;
              return makeMove(sourceSquare, targetSquare, "q");
            },

            onSquareClick: ({ square }) => { onSquareClick?.(square as Square)},
          }}
        />
      </div>
    </div>
  );
}
