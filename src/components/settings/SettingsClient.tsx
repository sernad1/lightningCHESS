"use client";

import { useState } from "react";
import { usePreferredBoardTheme, usePreferredPieceTheme, usePreferencesActions} from "@/stores/usePreferencesStore";
import { BOARD_THEMES, PIECE_THEMES } from "@/lib/constants";
import { BoardColorField, BoardTheme, PieceTheme } from "@/types/zustand/preferences";
import { saveUserThemesAction } from "@/actions/preferences";
import { StatusMessage } from "@/types/navigation";
import { BoardThemePicker } from "./BoardThemePicker";
import { PieceThemePicker } from "./PieceThemePicker";
import { SettingsFooter } from "./SettingsFooter";

export default function SettingsClient() {
  const boardTheme = usePreferredBoardTheme();
  const pieceTheme = usePreferredPieceTheme();
  const { setBoardTheme, setPieceTheme } = usePreferencesActions();
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const handleBoardColorChange = ( field: BoardColorField, hex: string) => {
    const isPreset = BOARD_THEMES.some((preset) => preset.name === boardTheme.name);
    setBoardTheme({[field]: hex, ...(isPreset ? { name: "Custom Board" } : {})});
  };

  const handlePieceColorChange = (field: keyof Omit<PieceTheme, "name">, hex: string) => {
    const isPreset = PIECE_THEMES.some((preset) => preset.name === pieceTheme.name);
    setPieceTheme({[field]: hex, ...(isPreset ? { name: "Custom Pieces" } : {})});
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const boardPayload: BoardTheme = {
      name: boardTheme.name.trim() || "Custom Board",
      lightSquare: boardTheme.lightSquare.trim(),
      darkSquare: boardTheme.darkSquare.trim(),
      boardFrame: boardTheme.boardFrame.trim(),
    };

    const piecePayload: PieceTheme = {
      name: pieceTheme.name.trim() || "Custom Pieces",
      whitePrimary: pieceTheme.whitePrimary.trim(),
      blackPrimary: pieceTheme.blackPrimary.trim(),
    };

    const res = await saveUserThemesAction(boardPayload, piecePayload);

    if (!res.success) setStatusMessage({ type: "error", text: res.error || "Nie udało się zapisać ustawień."});
    else setStatusMessage({ type: "success", text: "Motywy zostały zapisane na Twoim koncie!"});

    setIsSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto min-h-full space-y-10 text-main-white pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-main-dark/60 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-main-white">Ustawienia</h1>
          <p className="text-sm text-main-light mt-1">Dostosuj wygląd szachownicy oraz zarządzaj swoim kontem.</p>
        </div>

        <button type="button" onClick={handleSave} disabled={isSaving}
          className="px-6 py-2.5 bg-main-accent hover:bg-main-accent/90 active:scale-[0.98] text-main-darkest font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer self-start sm:self-auto">
          {isSaving ? "Zapisywanie..." : "Zapisz motywy"}
        </button>
      </header>

      {statusMessage && (
        <div className={`p-4 rounded-xl text-sm font-medium border ${statusMessage.type === "success"
              ? "bg-main-dark/40 border-main-light text-main-white" : "bg-red-950/60 border-red-500/50 text-red-200"}`}>
          {statusMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BoardThemePicker onBoardColorChange={handleBoardColorChange}/>
        <PieceThemePicker onPieceColorChange={handlePieceColorChange}/>
      </div>

      <SettingsFooter/>
    </div>
  );
}