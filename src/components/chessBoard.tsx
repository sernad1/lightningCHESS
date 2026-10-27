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
		<div className="flex justify-center items-center w-full p-4">
			{viewMode == "2d" ? (
				<ChessBoard2D pieces={pieces} onSquareClick={onSquareClick} />
			):(
				<ChessBoard3D pieces={pieces} />
			)}	
		</div>
	);
}
