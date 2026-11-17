import { BOARD_THEME_PICKERS_UI, BOARD_THEMES, PIECE_UNICODES } from "@/lib/constants";
import { usePreferencesActions, usePreferredBoardTheme, usePreferredPieceTheme } from "@/stores/usePreferencesStore";
import { BoardColorField } from "@/types/zustand/preferences";

interface BoardThemePickerProps {
    onBoardColorChange: (field: BoardColorField, hex: string) => void;
}

export function BoardThemePicker({onBoardColorChange}:BoardThemePickerProps){
    const boardTheme = usePreferredBoardTheme();
    const pieceTheme = usePreferredPieceTheme();
    const { setBoardTheme} = usePreferencesActions();


    return(
        <section className="bg-main-darkest/80 border border-main-dark/60 p-6 rounded-2xl space-y-6 shadow-lg">
            <h2 className="text-xl font-semibold text-main-accent">Motyw szachownicy</h2>

            <div className="space-y-2">
            <label className="block text-sm font-medium text-main-light">Gotowe zestawy</label>

            <div className="flex flex-wrap gap-2">
                {BOARD_THEMES.map((preset) => {
                const isSelected = boardTheme.name === preset.name;
                return (
                    <button key={preset.name} type="button" onClick={() => setBoardTheme(preset)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                        isSelected ? "bg-main-dark border-main-accent text-main-white font-medium shadow-sm"
                        : "bg-main-darkest border-main-dark/70 text-main-light hover:border-main-light hover:text-main-white"}`}>
                    <span className="w-3.5 h-3.5 rounded-sm border border-main-white/30"
                        style={{ backgroundColor: preset.lightSquare }}/>
                    <span className="w-3.5 h-3.5 rounded-sm border border-main-white/30"
                        style={{ backgroundColor: preset.darkSquare }}/>
                    {preset.name}
                    </button>
                );
                })}
            </div>
            </div>

            <div className="space-y-1.5">
            <label className="block text-sm font-medium text-main-light">Nazwa motywu</label>
            <input type="text" value={boardTheme.name} onChange={(e) => setBoardTheme({ name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-main-darkest text-main-white border border-main-dark/80 rounded-xl focus:outline-none focus:border-main-accent transition-colors"/>
            </div>

            <div className="grid grid-cols-3 gap-3">
            {BOARD_THEME_PICKERS_UI.map(({ key, label }) => (
                <label key={key} className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
                <span className="text-xs text-main-light">{label}</span>
                <input type="color" value={boardTheme[key]} onChange={(e) => onBoardColorChange(key, e.target.value)}
                    className="w-full h-9 rounded cursor-pointer bg-transparent"/>
                <span className="text-[11px] font-mono uppercase text-main-light/80">{boardTheme[key]}</span>
                </label>
            ))}
            </div>

            <div className="flex flex-col items-center pt-2">
            <span className="text-xs text-main-light mb-2">Podgląd na żywo</span>
            <div className="p-2.5 rounded-xl shadow-lg border border-main-dark/50"
                style={{ backgroundColor: boardTheme.boardFrame }}>
                <div className="grid grid-cols-4 grid-rows-4 w-44 h-44 rounded overflow-hidden">
                {Array.from({ length: 16 }).map((_, i) => {
                    const row = Math.floor(i / 4);
                    const col = i % 4;
                    const isLight = (row + col) % 2 === 0;
                    return (
                    <div key={i}
                        style={{ backgroundColor: isLight ? boardTheme.lightSquare : boardTheme.darkSquare}}
                        className="flex items-center justify-center text-2xl select-none">
                        {i === 5 && (
                        <span style={{ color: pieceTheme.blackPrimary, WebkitTextStroke: "1px rgba(255,255,255,0.25)"}}>
                            {PIECE_UNICODES.bN}
                        </span>
                        )}
                        {i === 10 && (
                        <span style={{ color: pieceTheme.whitePrimary, WebkitTextStroke: "1px rgba(0,0,0,0.45)"}}>
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
    )
}