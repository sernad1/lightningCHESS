export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'black' | 'white';

export interface ChessPiece {
	id: string;
	type: PieceType;
	color: PieceColor;
	square: string;
	modelPath?: string; // 3D
	imagePath?: string; // 2D
}

export interface ChessBoardState {
	pieces: ChessPiece[];
	capturedPieces: ChessPiece[];
	turn: PieceColor;
	viewMode: "2d" | "3d";
}
