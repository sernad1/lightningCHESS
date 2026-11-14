import { FENPiece } from "@/types/zustand/game";
import { Chess} from "chess.js";

export { cn } from "cn";

export function getPiecesFromFen(fen: string): FENPiece[] {
  return new Chess(fen).board().flat().filter((cell): cell is NonNullable<typeof cell> => cell !== null);
}

export function getChessPieceModelCoords(square: string): [x: number, y: number, z: number] {
  const rank = parseInt(square[1], 10);
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const fileIdx = files.indexOf(square[0]);

  return [fileIdx - 3.5, 0, 4.5 - rank];
}