import { BoardTheme, PieceTheme} from "@/types/zustand/preferences";
import { PieceSymbol } from "chess.js";

export const PIECE_MODELS: Partial<Record<PieceSymbol, string>> = {
  p: "/assets/models/pawn.glb",
  r: "/assets/models/rook.glb",
  n: "/assets/models/knight.glb",
  b: "/assets/models/bishop.glb",
  q: "/assets/models/queen.glb",
  k: "/assets/models/king.glb",
};

export const BOARD_MODEL: string = "/assets/models/board.glb";

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

export const PIECE_UNICODES: Record<string, string> = {
  wP: "♙", wR: "♖", wN: "♘", wB: "♗", wQ: "♕", wK: "♔",
  bP: "♟", bR: "♜", bN: "♞", bB: "♝", bQ: "♛", bK: "♚",
};


export const BOARD_THEME_PICKERS_UI = [
  { key: "lightSquare", label: "Jasne pola" },
  { key: "darkSquare", label: "Ciemne pola" },
  { key: "boardFrame", label: "Ramka" }
] as const

export const PIECE_THEME_PICKERS_UI = [
  { key: "whitePrimary", label: "Białe bierki" },
  { key: "blackPrimary", label: "Czarne bierki" },
] as const