import { create } from "zustand";
import {Chess, type Square, type Move, type PieceSymbol, type Color } from "chess.js" 

const chess = new Chess();

type GameStore = {
    fen: string;
}

export const useGameStore = create<GameStore>((set,get) => ({
    fen: ""
}));