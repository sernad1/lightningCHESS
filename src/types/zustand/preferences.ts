export type ViewMode = "2D" | "3D";
export type PreferredSide = "white" | "black" | "random";
export type PreferredGameMode = "bullet" | "blitz" | "rapid" | "classical" | "chess960";


export interface BoardTheme {
  name: string;
  lightSquare: string;
  darkSquare: string;
  boardFrame: string;
}

export interface PieceTheme {
  name: string;
  whitePrimary: string;
  blackPrimary: string;
}

export interface PreferencesStore {
  viewMode: ViewMode;
  preferedSide: PreferredSide;
  preferedGameMode: PreferredGameMode;
  boardTheme: BoardTheme;
  pieceTheme: PieceTheme;
  isMuted: boolean;
  sfxVolume: number;
  musicVolume: number;
  actions: {
    setViewMode: (viewMode: ViewMode) => void;
    setPreferedSide: (preferedSide: PreferredSide) => void;
    setPreferedGameMode: (preferedGameMode: PreferredGameMode) => void;
    setBoardTheme: (boardTheme: Partial<BoardTheme>) => void;
    setPieceTheme: (pieceTheme: Partial<PieceTheme>) => void;
    hydrateThemes: (themes: { boardTheme?: BoardTheme; pieceTheme?: PieceTheme }) => void;
    toggleMute: () => void;
    setSfxVolume: (sfxVolume: number) => void;
    setMusicVolume: (musicVolume: number) => void;
  };
}