import { create } from 'zustand'
import { Chess } from 'chess.js'
import { GameStore } from '@/types/zustand/game';

const chess = new Chess()

export const useGameStore = create<GameStore>()((set, get) => ({
  id: null,
  matchType: "ONLINE",
  timeControlMode: "RAPID",
  status: "WAITING",
  result: null,
  fen: chess.fen(),
  pgn: "",
  turn: chess.turn(),
  whiteTimeMs: 600000,
  blackTimeMs: 600000,

  actions: {
    initGame: ({ id, matchType = "ONLINE", timeControlMode = "RAPID", timeMs = 600000, fen }) => {
      if (fen) chess.load(fen);
      else chess.reset();

      set({ id, matchType, timeControlMode, status: "IN_PROGRESS", result: null, fen: chess.fen(),
        pgn: chess.pgn(), turn: chess.turn(), whiteTimeMs: timeMs, blackTimeMs: timeMs});
    },
    makeMove: (from, to, promotion = "q") => {
      if (get().status !== "IN_PROGRESS") return false;

      try {
        const move = chess.move({ from, to, promotion });
        if (!move) return false;

        const isOver = chess.isGameOver();
        let result: GameStore["result"] = null;

        if (isOver) result = chess.isCheckmate() ? (chess.turn() === "w" ? "BLACK_WIN" : "WHITE_WIN") : "DRAW";
        

        set({ fen: chess.fen(), pgn: chess.pgn(), turn: chess.turn(), status: isOver ? "COMPLETED" : "IN_PROGRESS", result});

        return true;
      } 
      catch {
        return false;
      }
    },
    setClocks: (whiteTimeMs, blackTimeMs) => set({ whiteTimeMs, blackTimeMs }),
    endGame: (result, status = "COMPLETED") => set({ status, result }),
    resetGame: () => {
        chess.reset();
        set({ id: null, status: "WAITING", result: null, fen: chess.fen(), pgn: "", turn: chess.turn(), whiteTimeMs: 600000, blackTimeMs: 600000});
    },
  },
}));

export const useGameId = () => useGameStore((state) => state.id);
export const useGameMatchType = () => useGameStore((state) => state.matchType);
export const useGameTimeControlMode = () => useGameStore((state) => state.timeControlMode);
export const useGameStatus = () => useGameStore((state) => state.status);
export const useGameResult = () => useGameStore((state) => state.result);
export const useGamePgn = () => useGameStore((state) => state.pgn);
export const useGameFen = () => useGameStore((state) => state.fen);
export const useGameMoveTurn = () => useGameStore((state) => state.turn);
export const useGameWhiteTimer = () => useGameStore((state) => state.whiteTimeMs);
export const useGameBlackTime = () => useGameStore((state) => state.blackTimeMs);
export const useGameStoreActions = () => useGameStore((state) => state.actions);