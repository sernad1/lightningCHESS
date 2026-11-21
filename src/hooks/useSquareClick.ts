import { useState, useCallback } from "react";
import { Chess, Square } from "chess.js";
import { CurrentMoveTurn, PromotionPiece } from "@/types/zustand/game";

interface UseSquareClickProps {
  fen: string;
  turn: CurrentMoveTurn;
  disabled?: boolean;
  makeMove: (from: Square, to: Square, promotion?: PromotionPiece) => boolean;
}

export function useSquareClick({ fen, turn, disabled = false, makeMove}: UseSquareClickProps) {
  const [selection, setSelection] = useState<{ fen: string; square: Square } | null>(null);
  const selectedSquare = !disabled && selection?.fen === fen ? selection.square : null;
  const handleSquareClick = useCallback((square: Square) => {
      if (disabled) return;

      const board = new Chess(fen);
      const clickedPiece = board.get(square);

      if (!selectedSquare) {
        if (clickedPiece && clickedPiece.color === turn) setSelection({ fen, square });
        return;
      }

      if (selectedSquare === square) {
        setSelection(null);
        return;
      }

      const moved = makeMove(selectedSquare, square, "q");

      if (moved) setSelection(null);
      else if (clickedPiece && clickedPiece.color === turn) setSelection({ fen, square });
      else setSelection(null);
    },
    [fen, turn, disabled, selectedSquare, makeMove]
  );

  const clearSelection = useCallback(() => { setSelection(null)}, []);

  return { selectedSquare, handleSquareClick, clearSelection};
}