import { PreferredSide, PreferredGameMode, ViewMode, PreferencesStore } from "@/types/zustand/preferences";
import { create } from "zustand";
import { persist } from "zustand/middleware"


export const usePreferencesStore = create<PreferencesStore>()(persist((set) => ({
    viewMode: '2D',
    preferedSide: 'random',
    preferedGameMode: 'rapid',
    boardTheme: 'classic',
    pieceTheme: 'classic',
    isMuted: true,
    sfxVolume: 0.5,
    musicVolume: 0.2,
    actions: {
        setViewMode: (viewMode: ViewMode) => set({viewMode}),
        setPreferedSide: (preferedSide: PreferredSide) => set({preferedSide}),
        setPreferedGameMode: (preferedGameMode: PreferredGameMode) => set({preferedGameMode}),
        setBoardTheme: (boardTheme: string) => set({boardTheme}),
        setPieceTheme: (pieceTheme: string) => set({pieceTheme}),
        toggleMute: () => set((prev) => ({isMuted: !prev.isMuted})),
        setSfxVolume: (sfxVolume: number) => set({sfxVolume}),
        setMusicVolume: (musicVolume: number) => set({musicVolume})
    },
    }), 
    {
        name: "user-preferences",
        partialize: ({actions, ...persistedData}) => persistedData 
    }))

export const usePreferredViewMode = () => usePreferencesStore((state) => state.viewMode);
export const usePreferredSide = () => usePreferencesStore((state) => state.preferedSide);
export const usePreferredGameMode = () => usePreferencesStore((state) => state.preferedGameMode);
export const usePreferredBoardTheme = () => usePreferencesStore((state) => state.boardTheme);
export const usePreferredPieceTheme = () => usePreferencesStore((state) => state.pieceTheme);
export const usePreferredIsMuted = () => usePreferencesStore((state) => state.isMuted);
export const usePreferredSfxVolume = () => usePreferencesStore((state) => state.sfxVolume);
export const usePreferredMusicVolume = () => usePreferencesStore((state) => state.musicVolume);
export const usePreferencesActions = () => usePreferencesStore((state) => state.actions);
