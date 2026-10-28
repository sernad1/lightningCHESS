"use client";

import {ChessPiece} from "@/types/chess";

interface ChessBoard2DProps {
	pieces: ChessPiece[];
	onSquareClick?: (square: string) => void;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

export default function ChessBoard2D({pieces, onSquareClick}: ChessBoard2DProps){
	const getPieceAtSquare = (square: string) => {
		return pieces.find((p) => p.square === square);
	}

	return (
		<div className="grid grid-cols-8 grid-rows-8 w-[720px] h-[720px] max-w-full aspect-square border-4 border-amber-900 rounded-lg shadow-2xl overflow-hidden">
			{RANKS.map((rank, rIdx) => FILES.map((file, fIdx) => {
				const square = `${file}${rank}`;
				const isDark = (rIdx + fIdx) % 2 === 1;
				const piece = getPieceAtSquare(square);

				return (
					<div key={square} onClick={() => onSquareClick?.(square)} className={`flex items-center justify-center relative cursor-pointer select-none transition-colors ${isDark ? "bg-amber-800 text-amber-100" : "bg-amber-200 text-amber-900"}`}>
						<span className="absolute bottom-0.5 right-1 text-[9px] opacity-30 font-mono"> {/*Temporary*/}
							{square}
						</span>

						{piece && (
							<div className="text-4xl filter drop-shadow-md transition-transform hover:scale-110">
								{getPieceSymbol(piece)}
							</div>
						)}
					</div>
				);
			}))}
		</div>
	);
}

function getPieceSymbol(piece: ChessPiece){
	const symbols: Record<string, Record<string, string>> = {
		white: { pawn: "♙", rook: "♖", knight: "♘", bishop: "♗", queen: "♕", king: "♔" },
    	black: { pawn: "♟", rook: "♜", knight: "♞", bishop: "♝", queen: "♛", king: "♚" }
	};
	return symbols[piece.color]?.[piece.type] || "";
}
