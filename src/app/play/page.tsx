"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChessBoard from "@/components/chess/chessBoard";
import GameOverModal from "@/components/chess/gameOverModal";
import { Button } from "@/components/ui/button";
import {
  useGameBlackTime,
  useGameEndingReason,
  useGameMoveTurn,
  useGamePgn,
  useGameResult,
  useGameStatus,
  useGameStoreActions,
  useGameWhiteTime,
} from "@/stores/useGameStore";
import {
  usePreferredViewMode,
  usePreferencesActions,
} from "@/stores/usePreferencesStore";

export default function ChessPage() {
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
  const pgn = useGamePgn();
  const status = useGameStatus();
  const result = useGameResult();
  const endingReason = useGameEndingReason();
  const turn = useGameMoveTurn();
  const whiteTimeMs = useGameWhiteTime();
  const blackTimeMs = useGameBlackTime();
  const { initGame, resetGame, setClocks, endGame } = useGameStoreActions();
  const viewMode = usePreferredViewMode();
  const { setViewMode } = usePreferencesActions();

  const isGameOver = status === "COMPLETED";
  const cleanMoves = pgn
    ? pgn
        .replace(/\[[^\]]*\]\s*/g, "")
        .replace(/\*$/, "")
        .trim()
    : "";

  const movePairs = cleanMoves
    ? cleanMoves
        .split(/\d+\.\s*/)
        .filter(Boolean)
        .map((pair, index) => {
          const [white, black] = pair.trim().split(/\s+/);
          return { number: index + 1, white: white || "", black: black || "" };
        })
    : [];

  const isBlackActive = !isGameOver && turn === "b";
  const isWhiteActive = !isGameOver && turn === "w";

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (status === "WAITING") {
      initGame({ id: "local-session" });
    }
  }, [status, initGame]);

  useEffect(() => {
    if (status !== "IN_PROGRESS") return;

    const interval = setInterval(() => {
      if (turn === "w") {
        if (whiteTimeMs <= 1000) {
          setClocks(0, blackTimeMs);
          endGame("BLACK_WIN", "COMPLETED", "Koniec czasu białych");
        } else {
          setClocks(whiteTimeMs - 1000, blackTimeMs);
        }
      } else {
        if (blackTimeMs <= 1000) {
          setClocks(whiteTimeMs, 0);
          endGame("WHITE_WIN", "COMPLETED", "Koniec czasu czarnych");
        } else {
          setClocks(whiteTimeMs, blackTimeMs - 1000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, turn, whiteTimeMs, blackTimeMs, setClocks, endGame]);

  const handleBoardSideToggle = () => setIsBoardFlipped((prev) => !prev);

  const handleResign = () => {
    if (isGameOver) return;
    endGame(
      turn === "w" ? "BLACK_WIN" : "WHITE_WIN",
      "COMPLETED",
      turn === "w" ? "Białe poddały partię" : "Czarne poddały partię",
    );
  };

  return (
    <div className="min-h-full w-full bg-main-darkest text-main-white flex flex-col lg:flex-row items-center xl:items-stretch justify-center gap-6 p-4 sm:p-6 pb-20 md:pb-6">
      {isGameOver && <GameOverModal />}

      {/* LEWA STRONA: Szachownica + Paski graczy */}
      <div className="flex flex-col justify-center items-center w-full max-w-[min(100%,540px)] xl:max-w-[min(100%,calc(100dvh-15rem))] gap-2.5">
        {/* Pasek Czarnych */}
        <div
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all duration-200 ${
            isBlackActive || result === "BLACK_WIN"
              ? "bg-main-dark/65 ring-1 ring-main-accent shadow-sm"
              : "bg-main-dark/30"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-main-darkest flex items-center justify-center text-sm text-main-white">
              ♚
            </div>
            <span className="font-semibold text-sm text-main-white">
              Czarne
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {isBlackActive && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-main-accent text-main-darkest">
                Ruch
              </span>
            )}
            {isGameOver && result === "BLACK_WIN" && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-main-accent text-main-darkest">
                Wygrana
              </span>
            )}
            {isGameOver && result === "DRAW" && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-main-dark text-main-light">
                Remis
              </span>
            )}
            <span
              className={`font-mono text-sm font-bold px-3 py-1 rounded-lg ${
                isBlackActive
                  ? "bg-main-darkest text-main-white ring-1 ring-main-accent/60"
                  : "bg-main-darkest/60 text-main-light"
              }`}
            >
              {formatTime(blackTimeMs)}
            </span>
          </div>
        </div>

        {/* Szachownica */}
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <ChessBoard boardFlipped={isBoardFlipped} />
        </div>

        {/* Pasek Białych */}
        <div
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all duration-200 ${
            isWhiteActive || result === "WHITE_WIN"
              ? "bg-main-dark/65 ring-1 ring-main-accent shadow-sm"
              : "bg-main-dark/30"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-main-white text-main-darkest flex items-center justify-center text-sm font-bold">
              ♔
            </div>
            <span className="font-semibold text-sm text-main-white">Białe</span>
          </div>

          <div className="flex items-center gap-2.5">
            {isWhiteActive && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-main-accent text-main-darkest">
                Ruch
              </span>
            )}
            {isGameOver && result === "WHITE_WIN" && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-main-accent text-main-darkest">
                Wygrana
              </span>
            )}
            {isGameOver && result === "DRAW" && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-main-dark text-main-light">
                Remis
              </span>
            )}
            <span
              className={`font-mono text-sm font-bold px-3 py-1 rounded-lg ${
                isWhiteActive
                  ? "bg-main-darkest text-main-white ring-1 ring-main-accent/60"
                  : "bg-main-darkest/60 text-main-light"
              }`}
            >
              {formatTime(whiteTimeMs)}
            </span>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA: Panel boczny */}
      <aside className="w-full max-w-[min(92vw,640px)] lg:w-96 lg:max-w-none flex flex-col justify-between rounded-2xl bg-main-dark/30 border border-main-dark/60 shadow-xl overflow-hidden">
        {/* Nagłówek i status tury */}
        <div className="p-4 sm:p-5 bg-main-dark/40 border-b border-main-dark/60 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg tracking-tight text-main-white">
              Partia Szachowa
            </h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-main-darkest text-main-light uppercase tracking-wider">
              {viewMode}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-main-darkest/80">
            <span className="text-xs uppercase tracking-wider text-main-light/80 font-semibold shrink-0">
              {isGameOver ? "Koniec partii" : "Aktualny ruch"}
            </span>

            {isGameOver ? (
              <span className="text-sm font-bold text-main-accent text-right">
                {endingReason || "Partia zakończona"}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    turn === "w"
                      ? "bg-main-white"
                      : "bg-main-darkest ring-1 ring-main-light"
                  }`}
                />
                <span className="text-sm font-bold text-main-white">
                  {turn === "w" ? "Chodzą Biali" : "Chodzą Czarni"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Historia ruchów */}
        <div className="flex-1 flex flex-col p-4 sm:p-5 min-h-[180px] lg:min-h-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-main-light/80 mb-2.5">
            Historia ruchów
          </span>

          <div className="flex-1 w-full rounded-xl bg-main-darkest/70 text-sm font-mono text-main-white overflow-y-auto">
            {movePairs.length > 0 ? (
              <div className="divide-y divide-main-dark/40">
                {movePairs.map((m) => (
                  <div
                    key={m.number}
                    className="grid grid-cols-[2.5rem_1fr_1fr] items-center px-3 py-2 hover:bg-main-dark/30 transition-colors"
                  >
                    <span className="text-main-light/60 text-xs">
                      {m.number}.
                    </span>
                    <span className="font-semibold text-main-white">
                      {m.white}
                    </span>
                    <span className="font-semibold text-main-light">
                      {m.black}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 text-main-light/50 italic">
                Brak wykonanych ruchów. Rozpocznij partię białymi.
              </div>
            )}
          </div>
        </div>

        {/* Przyciski akcji */}
        <div className="p-4 sm:p-5 bg-main-dark/35 border-t border-main-dark/60 space-y-2.5">
          <Button
            type="button"
            variant="default"
            className="w-full bg-main-accent hover:bg-main-accent/90 active:scale-[0.99] text-main-darkest font-bold py-5 rounded-xl shadow-md transition-all cursor-pointer"
            onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}
          >
            Przełącz na widok {viewMode === "2D" ? "3D" : "2D"}
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="ghost"
              className="w-full bg-main-dark/50 hover:bg-main-dark text-main-light hover:text-main-white font-medium py-5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
              onClick={resetGame}
            >
              Resetuj
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full bg-main-dark/50 hover:bg-main-dark text-main-light hover:text-main-white font-medium py-5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
              onClick={handleBoardSideToggle}
            >
              Odwróć
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isGameOver}
              className="w-full bg-red-950/40 hover:bg-red-900/60 text-red-200 hover:text-white font-medium py-5 rounded-xl transition-all cursor-pointer disabled:opacity-40 text-xs sm:text-sm"
              onClick={handleResign}
            >
              Poddaj się
            </Button>
          </div>

          <Link href="/settings" className="block w-full">
            <Button
              type="button"
              variant="ghost"
              className="w-full bg-main-darkest/60 hover:bg-main-dark/60 text-main-light hover:text-main-white text-xs font-semibold py-4 rounded-xl transition-all cursor-pointer"
            >
              Zmień motyw szachownicy
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
