export type ViewMode = "2D" | "3D";
export type PreferredSide = "white" | "black" | "random";
export type PreferredGameMode = "bullet" | "blitz" | "rapid" | "classical" | "chess960";

export type PreferencesStore = {
    viewMode: ViewMode;
    preferedSide: PreferredSide;
    preferedGameMode: PreferredGameMode
    boardTheme: string;
    pieceTheme: string;
    isMuted: boolean;
    sfxVolume: number;
    musicVolume: number;
    actions: {
        setViewMode: (viewMode: ViewMode) => void;
        setPreferedSide: (preferedSide: PreferredSide) => void;
        setPreferedGameMode: (preferedGameMode: PreferredGameMode) => void;
        setBoardTheme: (boardTheme: string) => void;
        setPieceTheme: (pieceTheme: string) => void;
        toggleMute: () => void;
        setSfxVolume: (sfxVolume: number) => void;
        setMusicVolume: (musicVolume: number) => void;
    }

}