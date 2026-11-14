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
export const BOARD_THEMES: BoardTheme[] = [ DEFAULT_BOARD_THEME,
  { name: "Emerald Tournament", lightSquare: "#eeeed2", darkSquare: "#769656", boardFrame: "#2d401e"},
  { name: "Cyberpunk Neon", lightSquare: "#2e1065", darkSquare: "#090d16", boardFrame: "#701a75"},
];

export const PIECE_THEMES: PieceTheme[] = [
  DEFAULT_PIECE_THEME,
  { name: "Royal Gold & Obsidian", whitePrimary: "#fef08a", blackPrimary: "#312e81"},
  { name: "Minimalist Matte", whitePrimary: "#ffffff", blackPrimary: "#18181b"},
];