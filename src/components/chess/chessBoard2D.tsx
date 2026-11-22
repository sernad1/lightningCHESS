"use client";

import React, { useMemo } from "react";
import { Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { PIECE_UNICODES } from "@/lib/constants";
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
  const customPieces = useMemo(() => {
  const pieceComponents: Record<string, () => React.JSX.Element> = {};
  const pieceNames: Record<string, string> = {K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight", P: "pawn"};

  Object.keys(PIECE_UNICODES).forEach((code) => {
    const isWhite = code.startsWith("w");
    const color = isWhite ? pieceTheme.whitePrimary : pieceTheme.blackPrimary;
    const pieceName = pieceNames[code[1]];
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    pieceComponents[code] = () => (
      <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
        <defs>
          <filter id={`piece-filter-${code}`} colorInterpolationFilters="sRGB">
			      <feColorMatrix in="gray" type="matrix" values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}/>
          </filter>
        </defs>

        <image href={`/assets/icons/${pieceName}.svg`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" filter={`url(#piece-filter-${code})`}/>
      </svg>
    );
  });

    return pieceComponents;
  }, [pieceTheme]);

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
