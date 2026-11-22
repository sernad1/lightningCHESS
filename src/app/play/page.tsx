"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChessBoard from "@/components/chess/chessBoard";
import GameOverModal from "@/components/chess/gameOverModal";
import { Button } from "@/components/ui/button";
import { useGameEndingReason, useGameMoveTurn, useGamePgn, useGameResult, useGameStatus, useGameStoreActions} from "@/stores/useGameStore";
import { usePreferredViewMode, usePreferencesActions} from "@/stores/usePreferencesStore";

export default function ChessPage() {
  const [isBoardFlpped, setIsBoardFilpped] = useState(false);
  const pgn = useGamePgn();
  const status = useGameStatus();
  const result = useGameResult();
  const endingReason = useGameEndingReason();
  const turn = useGameMoveTurn();
  const { initGame, resetGame } = useGameStoreActions();
  const viewMode = usePreferredViewMode();
  const { setViewMode } = usePreferencesActions();
  const isGameOver = status === "COMPLETED";
  const cleanMoves = pgn ? pgn.replace(/\[[^\]]*\]\s*/g, "").replace(/\*$/, "").trim(): "";
  const isBlackActive = !isGameOver && turn === "b";
  const isWhiteActive = !isGameOver && turn === "w";

  useEffect(() => {
    if (status === "WAITING") {
      initGame({ id: "local-session" });
    }
  }, [status, initGame]);

  const handleBoardSideToggle = () => setIsBoardFilpped((prev) => !prev);

  return (
    <div className="min-h-full w-full bg-main-darkest text-main-white flex flex-col lg:flex-row items-center xl:items-stretch justify-center gap-6 p-4 sm:p-6 pb-20 md:pb-6">
      {isGameOver && <GameOverModal />}

      <div className="flex flex-col justify-center items-center w-full max-w-[min(100%,540px)] xl:max-w-[min(100%,calc(100dvh-15rem))] gap-3">
        <div className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-colors ${
            isBlackActive || result === "BLACK_WIN" ? "bg-main-dark/70 border-main-accent shadow-md" : "bg-main-dark/30 border-main-dark/60"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-main-darkest border border-main-dark flex items-center justify-center text-base text-main-white">
              ♚
            </div>
            <span className="font-semibold text-sm text-main-white">Czarne</span>
          </div>

          {isBlackActive && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-main-accent text-main-darkest">Ruch czarnych</span>
          )}
          {isGameOver && result === "BLACK_WIN" && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-600 text-white">Wygrana</span>
          )}
          {isGameOver && result === "DRAW" && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-main-dark text-main-light border border-main-light/30">Remis</span>
          )}
        </div>

        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <ChessBoard boardFlipped={isBoardFlpped}  />
        </div>

        <div className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-colors ${
            isWhiteActive || result === "WHITE_WIN" ? "bg-main-dark/70 border-main-accent shadow-md" : "bg-main-dark/30 border-main-dark/60"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-main-white text-main-darkest flex items-center justify-center text-base font-bold">
              ♔
            </div>
            <span className="font-semibold text-sm text-main-white">Białe</span>
          </div>

          {isWhiteActive && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-main-accent text-main-darkest">Ruch białych</span>
          )}
          {isGameOver && result === "WHITE_WIN" && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-600 text-white">Wygrana</span>
          )}
          {isGameOver && result === "DRAW" && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-main-dark text-main-light border border-main-light/30">Remis</span>
          )}
        </div>
      </div>

      <aside className="w-full max-w-[min(92vw,640px)] lg:w-96 lg:max-w-none flex flex-col justify-between rounded-2xl bg-main-dark/30 border border-main-dark/60 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 sm:p-5 bg-main-dark/50 border-b border-main-dark/60 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg tracking-tight text-main-white">Partia Szachowa</h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-main-darkest text-main-light border border-main-dark uppercase">
              {viewMode}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-main-darkest/90 border border-main-dark/60">
            <span className="text-xs uppercase tracking-wider text-main-light font-medium shrink-0">
              {isGameOver ? "Koniec partii:" : "Aktualny ruch:"}
            </span>

            {isGameOver ? (
              <span className="text-sm font-bold text-main-accent text-right">{endingReason || "Partia zakończona"}</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border ${turn === "w" ? "bg-main-white border-main-light" : "bg-main-darkest border-main-light"}`}/>
                <span className="text-sm font-bold text-main-white">{turn === "w" ? "Chodzą Biali" : "Chodzą Czarni"}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-5 min-h-[180px] lg:min-h-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-main-light mb-2">Historia ruchów</span>

          <div className="flex-1 w-full p-3.5 rounded-xl bg-main-darkest/80 text-sm font-mono text-main-white overflow-y-auto border border-main-dark/60 leading-relaxed">
            {cleanMoves ? (
              cleanMoves
            ) : (
              <span className="text-main-light/60 italic">Brak wykonanych ruchów. Rozpocznij partię białymi.</span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-main-dark/40 border-t border-main-dark/60 space-y-2.5">
          <Link href="/settings" className="block w-full">
            <Button type="button" variant="secondary"
              className="w-full bg-main-dark hover:bg-main-dark/80 text-main-white border border-main-light/30 font-semibold py-5 rounded-xl transition-all cursor-pointer">
              🎨 Zmień kolor szachownicy
            </Button>
          </Link>

          <Button type="button" variant="default" className="w-full bg-main-accent hover:bg-main-accent/90 active:scale-[0.98] text-main-darkest font-semibold py-5 rounded-xl shadow-md transition-all cursor-pointer"
            onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}>
            Przełącz na widok {viewMode === "2D" ? "3D" : "2D"}
          </Button>

          <Button type="button" variant="outline"
            className="w-full bg-transparent hover:bg-main-dark/60 text-main-light hover:text-main-white border-main-dark py-5 rounded-xl transition-all cursor-pointer"
            onClick={resetGame}>
            ↺ Resetuj szachownicę
          </Button>
          <Button type="button" variant="outline"
            className="w-full bg-transparent hover:bg-main-dark/60 text-main-light hover:text-main-white border-main-dark py-5 rounded-xl transition-all cursor-pointer"
            onClick={handleBoardSideToggle}>
            Odwróć szachownicę
          </Button>
        </div>
      </aside>
    </div>
  );
}