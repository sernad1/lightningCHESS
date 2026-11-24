"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameEndingReason, useGameResult, useGameStoreActions} from "@/stores/useGameStore";

const RESULT_TITLES = {
  WHITE_WIN: "Wygrana Białych",
  BLACK_WIN: "Wygrana Czarnych",
  DRAW: "Remis",
} as const;

export default function GameOverModal() {
  const result = useGameResult();
  const endingReason = useGameEndingReason();
  const { resetGame } = useGameStoreActions();
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;
  const title = result ? RESULT_TITLES[result] : "Koniec partii";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4" onClick={() => setIsOpen(false)}>
      <div className="relative w-full max-w-sm rounded-2xl bg-main-darkest border border-main-dark p-6 shadow-2xl space-y-5 text-center" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Zamknij"
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg text-main-light hover:text-main-white hover:bg-main-dark/60 transition-colors cursor-pointer">
          ✕
        </button>

        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-main-accent">Koniec partii</span>
          <h2 className="text-2xl font-bold text-main-white">{title}</h2>
          <p className="text-sm text-main-light">{endingReason || "Partia została zakończona."}</p>
        </div>

        <div className="space-y-2.5 pt-1">
          <Button type="button" variant="default" className="w-full bg-main-accent hover:bg-main-accent/90 active:scale-[0.98] text-main-darkest font-semibold py-5 rounded-xl shadow-md transition-all cursor-pointer"
            onClick={resetGame}>
            ↺ Resetuj szachownicę
          </Button>

          <Button type="button" variant="outline" className="w-full bg-transparent hover:bg-main-dark/60 text-main-light hover:text-main-white border-main-dark py-5 rounded-xl transition-all cursor-pointer"
            onClick={() => setIsOpen(false)}>
            Zobacz planszę
          </Button>
        </div>
      </div>
    </div>
  );
}