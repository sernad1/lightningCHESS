"use client";

import React from "react";
import {ChessPiece} from "@/types/chess";
import ChessBoard2D from "./chessBoard2D";
import ChessBoard3D from "./chessBoard3D";

interface ChessBoardProps {
	pieces: ChessPiece[];
	viewMode: "2d" | "3d";
	onSquareClick?: (square: string) => void;
}

export default function ChessBoard({pieces, viewMode, onSquareClick}: ChessBoardProps){
	return (
		<div className="relative w-[850px] h-[850px] max-w-full aspect-square">
			<div className={viewMode == "2d" ? "w-full h-full block" : "hidden"}>
				<ChessBoard2D pieces={pieces} onSquareClick={onSquareClick} />
			</div>
			<div className={viewMode == "3d" ? "w-full h-full block" : "hidden"}>
				<ChessBoard3D pieces={pieces} />
			</div>
		</div>
	);
}
