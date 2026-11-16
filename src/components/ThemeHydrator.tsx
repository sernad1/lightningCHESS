"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserThemesAction } from "@/actions/preferences";
import { usePreferencesActions } from "@/stores/usePreferencesStore";

export default function ThemeHydrator() {
  const { status } = useSession();
  const { setBoardTheme, setPieceTheme } = usePreferencesActions();

  useEffect(() => {
    if (status !== "authenticated") return;

    getUserThemesAction().then((themes) => {
      if (themes?.boardTheme) setBoardTheme(themes.boardTheme);
      if (themes?.pieceTheme) setPieceTheme(themes.pieceTheme);
    });
  }, [status, setBoardTheme, setPieceTheme]);

  return null;
}
