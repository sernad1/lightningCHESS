"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  usePreferredBoardTheme,
  usePreferredPieceTheme,
  usePreferencesActions,
} from "@/stores/usePreferencesStore";
import { BOARD_THEMES, PIECE_THEMES, PIECE_UNICODES } from "@/lib/constants";
import { saveUserThemesAction } from "@/actions/preferences";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import SignOutButton from "@/components/sign-out-button";

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();

  const boardTheme = usePreferredBoardTheme();
  const pieceTheme = usePreferredPieceTheme();
  const { setBoardTheme, setPieceTheme } = usePreferencesActions();

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const lastHydratedRef = useRef<{ white?: string; black?: string }>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    const raw = pieceTheme as typeof pieceTheme & {
      whiteColor?: string;
      blackColor?: string;
    };
    const updates: Partial<typeof pieceTheme> = {};

    if (raw.whiteColor && raw.whiteColor !== lastHydratedRef.current.white) {
      lastHydratedRef.current.white = raw.whiteColor;
      updates.whitePrimary = raw.whiteColor;
    }
    if (raw.blackColor && raw.blackColor !== lastHydratedRef.current.black) {
      lastHydratedRef.current.black = raw.blackColor;
      updates.blackPrimary = raw.blackColor;
    }

    if (Object.keys(updates).length > 0) {
      setPieceTheme(updates);
    }
  }, [pieceTheme, setPieceTheme]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const boardPayload = {
      name: boardTheme.name.trim() || "Custom Board",
      lightSquare: boardTheme.lightSquare.trim(),
      darkSquare: boardTheme.darkSquare.trim(),
      boardFrame: boardTheme.boardFrame.trim(),
    };

    const piecePayload = {
      ...pieceTheme,
      name: pieceTheme.name.trim() || "Custom Pieces",
      whiteColor: pieceTheme.whitePrimary.trim(),
      blackColor: pieceTheme.blackPrimary.trim(),
    };

    const res = await saveUserThemesAction(boardPayload, piecePayload);

    if (!res.success) {
      setStatusMessage({
        type: "error",
        text: res.error || "Nie udało się zapisać ustawień.",
      });
    } else {
      setStatusMessage({
        type: "success",
        text: "Motywy zostały zapisane na Twoim koncie!",
      });
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto min-h-full space-y-10 text-main-white pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-main-dark/60 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-main-white">Ustawienia</h1>
          <p className="text-sm text-main-light mt-1">
            Dostosuj wygląd szachownicy oraz zarządzaj swoim kontem.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-main-accent hover:bg-main-accent/90 active:scale-[0.98] text-main-darkest font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          {isSaving ? "Zapisywanie..." : "Zapisz motywy"}
        </button>
      </header>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-medium border ${
            statusMessage.type === "success"
              ? "bg-main-dark/40 border-main-light text-main-white"
              : "bg-red-950/60 border-red-500/50 text-red-200"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-main-darkest/80 border border-main-dark/60 p-6 rounded-2xl space-y-6 shadow-lg">
          <h2 className="text-xl font-semibold text-main-accent">
            Motyw szachownicy
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-main-light">
              Gotowe zestawy
            </label>
            <div className="flex flex-wrap gap-2">
              {BOARD_THEMES.map((preset) => {
                const isSelected = boardTheme.name === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setBoardTheme(preset)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-main-dark border-main-accent text-main-white font-medium shadow-sm"
                        : "bg-main-darkest border-main-dark/70 text-main-light hover:border-main-light hover:text-main-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-main-white/30"
                      style={{ backgroundColor: preset.lightSquare }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-main-white/30"
                      style={{ backgroundColor: preset.darkSquare }}
                    />
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-main-light">
              Nazwa motywu
            </label>
            <input
              type="text"
              value={boardTheme.name}
              onChange={(e) => setBoardTheme({ name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-main-darkest text-main-white border border-main-dark/80 rounded-xl focus:outline-none focus:border-main-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
              <span className="text-xs text-main-light">Jasne pola</span>
              <input
                type="color"
                value={boardTheme.lightSquare}
                onChange={(e) => setBoardTheme({ lightSquare: e.target.value })}
                className="w-full h-9 rounded cursor-pointer bg-transparent"
              />
            </label>

            <label className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
              <span className="text-xs text-main-light">Ciemne pola</span>
              <input
                type="color"
                value={boardTheme.darkSquare}
                onChange={(e) => setBoardTheme({ darkSquare: e.target.value })}
                className="w-full h-9 rounded cursor-pointer bg-transparent"
              />
            </label>

            <label className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
              <span className="text-xs text-main-light">Ramka</span>
              <input
                type="color"
                value={boardTheme.boardFrame}
                onChange={(e) => setBoardTheme({ boardFrame: e.target.value })}
                className="w-full h-9 rounded cursor-pointer bg-transparent"
              />
            </label>
          </div>

          <div className="flex flex-col items-center pt-2">
            <span className="text-xs text-main-light mb-2">
              Podgląd na żywo
            </span>
            <div
              className="p-2.5 rounded-xl shadow-lg border border-main-dark/50"
              style={{ backgroundColor: boardTheme.boardFrame }}
            >
              <div className="grid grid-cols-4 grid-rows-4 w-44 h-44 rounded overflow-hidden">
                {Array.from({ length: 16 }).map((_, i) => {
                  const row = Math.floor(i / 4);
                  const col = i % 4;
                  const isLight = (row + col) % 2 === 0;
                  return (
                    <div
                      key={i}
                      style={{
                        backgroundColor: isLight
                          ? boardTheme.lightSquare
                          : boardTheme.darkSquare,
                      }}
                      className="flex items-center justify-center text-2xl select-none"
                    >
                      {i === 5 && (
                        <span style={{ color: pieceTheme.blackPrimary }}>
                          {PIECE_UNICODES.bN}
                        </span>
                      )}
                      {i === 10 && (
                        <span style={{ color: pieceTheme.whitePrimary }}>
                          {PIECE_UNICODES.wQ}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-main-darkest/80 border border-main-dark/60 p-6 rounded-2xl space-y-6 shadow-lg">
          <h2 className="text-xl font-semibold text-main-accent">
            Motyw bierek
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-main-light">
              Gotowe zestawy
            </label>
            <div className="flex flex-wrap gap-2">
              {PIECE_THEMES.map((preset) => {
                const isSelected = pieceTheme.name === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setPieceTheme(preset)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-main-dark border-main-accent text-main-white font-medium shadow-sm"
                        : "bg-main-darkest border-main-dark/70 text-main-light hover:border-main-light hover:text-main-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-main-white/30"
                      style={{ backgroundColor: preset.whitePrimary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-main-white/30"
                      style={{ backgroundColor: preset.blackPrimary }}
                    />
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-main-light">
              Nazwa zestawu bierek
            </label>
            <input
              type="text"
              value={pieceTheme.name}
              onChange={(e) => setPieceTheme({ name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-main-darkest text-main-white border border-main-dark/80 rounded-xl focus:outline-none focus:border-main-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
              <span className="text-xs text-main-light">Białe bierki</span>
              <input
                type="color"
                value={pieceTheme.whitePrimary}
                onChange={(e) =>
                  setPieceTheme({ whitePrimary: e.target.value })
                }
                className="w-full h-9 rounded cursor-pointer bg-transparent"
              />
            </label>

            <label className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
              <span className="text-xs text-main-light">Czarne bierki</span>
              <input
                type="color"
                value={pieceTheme.blackPrimary}
                onChange={(e) =>
                  setPieceTheme({ blackPrimary: e.target.value })
                }
                className="w-full h-9 rounded cursor-pointer bg-transparent"
              />
            </label>
          </div>
        </section>
      </div>

      <section className="space-y-4 pt-6 border-t border-main-dark/60">
        <h2 className="text-xl font-semibold text-main-white">
          Ustawienia konta
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-main-white">Sesja</h3>
              <p className="text-sm text-main-light">
                Wyloguj się z bieżącej sesji na tym urządzeniu.
              </p>
            </div>
            <div>
              <SignOutButton />
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-red-400">
                Usuwanie konta
              </h3>
              <p className="text-sm text-main-white/80">
                Trwałe usunięcie konta i powiązanych z nim danych.
              </p>
            </div>
            <div>
              <DeleteAccountButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
