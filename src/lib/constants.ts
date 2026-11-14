import { BoardTheme, PieceTheme } from "@/types/zustand/preferences";

export const PIECE_MODELS: Record<string, string> = {
  pawn: "/assets/models/pawn.glb",
  rook: "/assets/models/rook.glb",
  /*
  knight: "/assets/models/knight.glb",
  bishop: "/assets/models/bishop.glb",
  queen: "/assets/models/queen.glb",
  king: "/assets/models/king.glb",
  */
};


export const DEFAULT_BOARD_THEME: BoardTheme = { name: "Classic Wood", lightSquare: "#f0d9b5", 
  darkSquare: "#b58863", boardFrame: "#5c3a21"};
export const DEFAULT_PIECE_THEME: PieceTheme = { name: "Classic Ivory & Ebony", whitePrimary: "#f8fafc", blackPrimary: "#334155"};
