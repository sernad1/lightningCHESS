import { useState, useCallback } from "react";
import { Chess, Square } from "chess.js";

interface UseChessSelectionProps {
  fen: string;
  turn: "w" | "b";
  makeMove: (
    from: Square,
    to: Square,
    promotion?: string
  ) => boolean;
}

export function useSquareClick({fen, turn, makeMove}: UseChessSelectionProps){
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const handleSquareClick = useCallback(
    (square: Square) => {
      const board = new Chess(fen);
      const clickedPiece = board.get(square);

      if(!selectedSquare){
        if(clickedPiece && clickedPiece.color === turn) setSelectedSquare(square);
        return;
      }

      if(selectedSquare === square){
        setSelectedSquare(null);
        return;
      }

      const moved = makeMove(selectedSquare, square, "q");

      if(moved){
        setSelectedSquare(null);
      }else if(clickedPiece && clickedPiece.color === turn){
        setSelectedSquare(square);
      }else{
        setSelectedSquare(null);
      }
    },
    [fen, turn, selectedSquare, makeMove]
  );

  const clearSelection = useCallback(() => {
    setSelectedSquare(null);
  }, []);

  return {
    selectedSquare,
    handleSquareClick,
    clearSelection,
  };
}
