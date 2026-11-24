"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGameStoreActions } from "@/stores/useGameStore";

type MatchTypeOption = "ONLINE" | "VS_AI";
type TimeControlOption = "BULLET" | "BLITZ" | "RAPID";
type ColorOption = "w" | "b" | "random";

const TIME_MODES: { id: TimeControlOption; label: string; time: string }[] = [
  { id: "BULLET", label: "Bullet", time: "1 min" },
  { id: "BLITZ", label: "Blitz", time: "3 min" },
  { id: "RAPID", label: "Rapid", time: "10 min" },
];

export function GameSetupCard() {
  const router = useRouter();
  const { initGame } = useGameStoreActions();

  const [matchType, setMatchType] = useState<MatchTypeOption>("VS_AI");
  const [timeControl, setTimeControl] = useState<TimeControlOption>("RAPID");
  const [colorPreference, setColorPreference] = useState<ColorOption>("random");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = () => {
    const timeMsMap: Record<TimeControlOption, number> = {
      BULLET: 60 * 1000,
      BLITZ: 3 * 60 * 1000,
      RAPID: 10 * 60 * 1000,
    };

    initGame({
      id: `local-${Date.now()}`,
      matchType,
      timeControlMode: timeControl,
      timeMs: timeMsMap[timeControl],
    });

    router.push("/play");
  };

  return (
    <div className="w-full max-w-xl space-y-7 text-main-white">
      {/* 1. Przeciwnik - nowoczesny przełącznik (Segmented Control) */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold uppercase tracking-wider text-main-light/70">
          Przeciwnik
        </span>
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-main-dark/40">
          <button
            type="button"
            onClick={() => setMatchType("ONLINE")}
            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              matchType === "ONLINE"
                ? "bg-main-accent text-main-darkest shadow-sm"
                : "text-main-light hover:text-main-white"
            }`}
          >
            Gra Online
          </button>
          <button
            type="button"
            onClick={() => setMatchType("VS_AI")}
            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              matchType === "VS_AI"
                ? "bg-main-accent text-main-darkest shadow-sm"
                : "text-main-light hover:text-main-white"
            }`}
          >
            Przeciwko botowi
          </button>
        </div>
      </div>

      {/* 2. Tryb gry - czyste, płaskie kafelki bez ciężkich obramowań */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold uppercase tracking-wider text-main-light/70">
          Tempo gry
        </span>
        <div className="grid grid-cols-3 gap-3">
          {TIME_MODES.map((mode) => {
            const isActive = timeControl === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setTimeControl(mode.id)}
                className={`py-4 px-3 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isActive
                    ? "bg-main-dark text-main-white ring-2 ring-main-accent"
                    : "bg-main-dark/35 text-main-light hover:bg-main-dark/60 hover:text-main-white"
                }`}
              >
                <span className="font-bold text-base">{mode.label}</span>
                <span
                  className={`text-xs mt-0.5 ${
                    isActive
                      ? "text-main-accent font-medium"
                      : "text-main-light/70"
                  }`}
                >
                  {mode.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Twoja strona - przełącznik z subtelnymi kropkami kolorów */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold uppercase tracking-wider text-main-light/70">
          Twoja strona
        </span>
        <div className="grid grid-cols-3 p-1.5 rounded-2xl bg-main-dark/40 gap-1.5">
          <button
            type="button"
            onClick={() => setColorPreference("w")}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              colorPreference === "w"
                ? "bg-main-white text-main-darkest shadow-sm"
                : "text-main-light hover:text-main-white"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-main-white border border-main-darkest/20" />
            Białe
          </button>

          <button
            type="button"
            onClick={() => setColorPreference("random")}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              colorPreference === "random"
                ? "bg-main-dark text-main-white ring-1 ring-main-accent shadow-sm"
                : "text-main-light hover:text-main-white"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-main-white to-main-darkest border border-main-light/40" />
            Losowo
          </button>

          <button
            type="button"
            onClick={() => setColorPreference("b")}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              colorPreference === "b"
                ? "bg-main-darkest text-main-white ring-1 ring-main-light/40 shadow-sm"
                : "text-main-light hover:text-main-white"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-main-darkest border border-main-light/40" />
            Czarne
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-medium">
          {error}
        </div>
      )}

      {/* 4. Przycisk Graj */}
      <Button
        type="button"
        onClick={handleStartGame}
        disabled={isLoading}
        className="w-full bg-main-accent hover:bg-main-accent/90 active:scale-[0.99] text-main-darkest font-bold text-base py-6 rounded-2xl shadow-lg shadow-main-accent/15 transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Tworzenie partii..." : "Graj"}
      </Button>
    </div>
  );
}
