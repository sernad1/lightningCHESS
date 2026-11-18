"use client";

import React, { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { useGameFen, useGameStoreActions } from "@/stores/useGameStore";
import {
  usePreferredBoardTheme,
  usePreferredPieceTheme,
} from "@/stores/usePreferencesStore";
import { PromotionPiece } from "@/types/zustand/game";

interface ChessBoard2DProps {
  selectedSquare?: string | null;
  onSquareClick?: (square: string) => void;
}

const PIECE_UNICODES: Record<string, string> = {
  wP: "♙",
  wR: "♖",
  wN: "♘",
  wB: "♗",
  wQ: "♕",
  wK: "♔",
  bP: "♟",
  bR: "♜",
  bN: "♞",
  bB: "♝",
  bQ: "♛",
  bK: "♚",
};

export default function ChessBoard2D({
  selectedSquare,
  onSquareClick,
}: ChessBoard2DProps) {
  const fen = useGameFen();
  const { makeMove } = useGameStoreActions();
  const boardTheme = usePreferredBoardTheme();
  const pieceTheme = usePreferredPieceTheme();

  const customPieces = useMemo(() => {
    const pieceComponents: Record<string, () => React.JSX.Element> = {};

    Object.entries(PIECE_UNICODES).forEach(([code, symbol]) => {
      const isWhite = code.startsWith("w");
      const fill = isWhite ? pieceTheme.whitePrimary : pieceTheme.blackPrimary;
      const stroke = isWhite
        ? "rgba(0, 0, 0, 0.55)"
        : "rgba(255, 255, 255, 0.3)";

      pieceComponents[code] = () => (
        <svg
          viewBox="0 0 45 45"
          className="w-full h-full select-none pointer-events-none drop-shadow"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="34"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
            paintOrder="stroke"
          >
            {symbol}
          </text>
        </svg>
      );
    });

    return pieceComponents;
  }, [pieceTheme.whitePrimary, pieceTheme.blackPrimary]);

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="w-full max-w-[min(100%,calc(100dvh-14rem))] md:max-w-[min(100%,calc(100dvh-8rem))] aspect-square rounded-md sm:rounded-lg shadow-2xl overflow-hidden border-4 sm:border-8 touch-none"
        style={{ borderColor: boardTheme.boardFrame }}
      >
        <Chessboard
          options={{
            position: fen,
            pieces: customPieces,
            lightSquareStyle: { backgroundColor: boardTheme.lightSquare },
            darkSquareStyle: { backgroundColor: boardTheme.darkSquare },
            squareStyles: selectedSquare
              ? {
                  [selectedSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)",
                  },
                }
              : {},
            onPieceDrop: ({ sourceSquare, targetSquare, piece }) => {
              if (!targetSquare) return false;
              const promotion = (piece.pieceType[1]?.toLowerCase() ??
                "q") as PromotionPiece;
              return makeMove(sourceSquare, targetSquare, promotion);
            },
            onSquareClick: ({ square }) => {
              onSquareClick?.(square);
            },
          }}
        />
      </div>
    </div>
  );
}
