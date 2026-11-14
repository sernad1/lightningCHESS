import { PreferredSide, PreferredGameMode, ViewMode, BoardTheme, PieceTheme, PreferencesStore} from "@/types/zustand/preferences";
import { DEFAULT_BOARD_THEME, DEFAULT_PIECE_THEME } from "@/lib/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({ viewMode: "2D", preferedSide: "random", preferedGameMode: "rapid",
      boardTheme: DEFAULT_BOARD_THEME, pieceTheme: DEFAULT_PIECE_THEME, isMuted: true,
      sfxVolume: 0.5, musicVolume: 0.2,
      actions: {
        setViewMode: (viewMode: ViewMode) => set({ viewMode }),
        setPreferedSide: (preferedSide: PreferredSide) => set({ preferedSide }),
        setPreferedGameMode: (preferedGameMode: PreferredGameMode) => set({ preferedGameMode }),
        setBoardTheme: (partialTheme: Partial<BoardTheme>) => set((state) => ({ boardTheme: { ...state.boardTheme, ...partialTheme }})),
        setPieceTheme: (partialTheme: Partial<PieceTheme>) => set((state) => ({ pieceTheme: { ...state.pieceTheme, ...partialTheme }})),
        hydrateThemes: ({ boardTheme, pieceTheme }) => set((state) => ({ boardTheme: boardTheme ?? state.boardTheme, pieceTheme: pieceTheme ?? state.pieceTheme})),
        toggleMute: () => set((prev) => ({ isMuted: !prev.isMuted })),
        setSfxVolume: (sfxVolume: number) => set({ sfxVolume }),
        setMusicVolume: (musicVolume: number) => set({ musicVolume }),
      },
    }),
    {
      name: "user-preferences",
      version: 3,
      partialize: ({ actions, ...persistedData }) => persistedData,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Partial<PreferencesStore>;
        if (version < 3) return { ...state, boardTheme: DEFAULT_BOARD_THEME, pieceTheme: DEFAULT_PIECE_THEME};
        return state;
      },
    }
  )
);

export const usePreferredViewMode = () => usePreferencesStore((state) => state.viewMode);
export const usePreferredSide = () => usePreferencesStore((state) => state.preferedSide);
export const usePreferredGameMode = () => usePreferencesStore((state) => state.preferedGameMode);
export const usePreferredBoardTheme = () => usePreferencesStore((state) => state.boardTheme);
export const usePreferredPieceTheme = () => usePreferencesStore((state) => state.pieceTheme);
export const usePreferredIsMuted = () => usePreferencesStore((state) => state.isMuted);
export const usePreferredSfxVolume = () => usePreferencesStore((state) => state.sfxVolume);
export const usePreferredMusicVolume = () => usePreferencesStore((state) => state.musicVolume);
export const usePreferencesActions = () => usePreferencesStore((state) => state.actions);