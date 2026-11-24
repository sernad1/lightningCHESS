import { GameResult } from "@prisma/client";
import { Chess } from "chess.js";
import { GameOverStatus } from "@/types/zustand/game";

export function getGameOverStatus(chess: Chess): GameOverStatus {

  if (!chess.isGameOver()) return { isOver: false };
  if (chess.isCheckmate()) {
    const result: GameResult = chess.turn() === "w" ? "BLACK_WIN" : "WHITE_WIN";
    const reason = result === "BLACK_WIN" ? "Czarne wygrały przez mat" : "Białe wygrały przez mat";

    return { isOver: true, result, reason };
  }
  if (chess.isStalemate())  return { isOver: true, result: "DRAW", reason: "Remis przez pat" };
  if (chess.isDrawByFiftyMoves()) return { isOver: true, result: "DRAW", reason: "Remis przez zasadę 50 ruchów" };
  if (chess.isThreefoldRepetition()) return { isOver: true, result: "DRAW", reason: "Remis przez powtórzenie pozycji" };
  if (chess.isInsufficientMaterial()) return { isOver: true, result: "DRAW", reason: "Remis przez brak materiału",
  }

  return { isOver: true, result: "DRAW", reason: "Draw" };
}