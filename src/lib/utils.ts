import { ChessPiece } from "@/types/chess";

export { cn } from "cn"

export default function getRowAndColumn(address: string){
	const column = address[0];
	const row = parseInt(address[1], 10);
	return {row, column};
}

export function getChessPieceModelCoords(square: string): [x: float, y: float, z: float]{
	const rank = parseInt(square[1]);	

	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const ranks = [1, 2, 3, 4, 5, 6, 7, 8];

	const fileIdx = files.indexOf(square[0]);
	return [fileIdx - 3.5, 0, rank - 4.5];		
}

export function getStandardPieceSet(){
	const pieceSet: ChessPiece[] = [];

	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

	files.forEach((file, _) => {
		pieceSet.push({
			id: `w-pawn-${file}`,
			type: "pawn",
			color: "white",
			square: `${file}2`
		});

		pieceSet.push({
			id: `b-pawn-${file}`,
			type: "pawn",
			color: "black",
			square: `${file}7`
		});
	});

	pieceSet.push({id: "w-rook-a", type: "rook", color: "white", square: "a1"});
	pieceSet.push({id: "w-rook-h", type: "rook", color: "white", square: "h1"});
	pieceSet.push({id: "b-rook-a", type: "rook", color: "black", square: "a8"});
	pieceSet.push({id: "b-rook-h", type: "rook", color: "black", square: "h8"});

	pieceSet.push({id: "w-knight-b", type: "knight", color: "white", square: "b1"});
	pieceSet.push({id: "w-knight-g", type: "knight", color: "white", square: "g1"});
	pieceSet.push({id: "b-knight-b", type: "knight", color: "black", square: "b8"});
	pieceSet.push({id: "b-knight-g", type: "knight", color: "black", square: "g8"});

	pieceSet.push({id: "w-bishop-c", type: "bishop", color: "white", square: "c1"});
	pieceSet.push({id: "w-bishop-f", type: "bishop", color: "white", square: "f1"});
	pieceSet.push({id: "b-bishop-c", type: "bishop", color: "black", square: "c8"});
	pieceSet.push({id: "b-bishop-f", type: "bishop", color: "black", square: "f8"});

	pieceSet.push({id: "w-queen-d", type: "queen", color: "white", square: "d1"});
	pieceSet.push({id: "b-queen-d", type: "queen", color: "black", square: "d8"});
	
	pieceSet.push({id: "w-king-e", type: "king", color: "white", square: "e1"});
	pieceSet.push({id: "b-king-e", type: "king", color: "black", square: "e8"});

	return pieceSet;
}
