import { GameResult, GameStatus, MatchType, TimeControlMode } from "@prisma/client";
import { Color, PieceSymbol, Square } from "chess.js";

export type CurrentMoveTurn = "w" | "b"
export type PromotionPiece = "q" | "r" | "b" | "n";
export type FENPiece = { square: Square; type: PieceSymbol; color: Color } 

export type GameStore = {
    id: string | null;
    matchType: MatchType;
    timeControlMode: TimeControlMode;
    status: GameStatus;
    result: GameResult | null;
    fen: string;
    pgn: string;
    turn: CurrentMoveTurn;
    whiteTimeMs: number;
    blackTimeMs: number;

    actions: {
        initGame: (params: { id: string; matchType?: MatchType; timeControlMode?: TimeControlMode;
            timeMs?: number; fen?: string;}) => void;
        makeMove: (from: string, to: string, promotion?: PromotionPiece) => boolean
        setClocks: (whiteMs: number, blackMs: number) => void
        endGame: (result: GameResult, status?: GameStatus) => void
        resetGame: () => void
    }
}