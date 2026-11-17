import { PIECE_THEME_PICKERS_UI, PIECE_THEMES } from "@/lib/constants";
import { usePreferencesActions, usePreferredPieceTheme } from "@/stores/usePreferencesStore";
import { PieceColorField } from "@/types/zustand/preferences";

interface PieceThemePickerProps {
    onPieceColorChange: (field: PieceColorField, hex: string) => void
}

export function PieceThemePicker({onPieceColorChange}: PieceThemePickerProps){
    const pieceTheme = usePreferredPieceTheme();
    const { setPieceTheme } = usePreferencesActions();

    return (
        <section className="bg-main-darkest/80 border border-main-dark/60 p-6 rounded-2xl space-y-6 shadow-lg">
          <h2 className="text-xl font-semibold text-main-accent">Motyw bierek</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-main-light">Gotowe zestawy</label>
            <div className="flex flex-wrap gap-2">
              {PIECE_THEMES.map((preset) => {
                const isSelected = pieceTheme.name === preset.name;
                return (
                  <button key={preset.name} type="button" onClick={() => setPieceTheme(preset)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                      isSelected ? "bg-main-dark border-main-accent text-main-white font-medium shadow-sm"
                        : "bg-main-darkest border-main-dark/70 text-main-light hover:border-main-light hover:text-main-white"}`}>
                    <span className="w-3.5 h-3.5 rounded-full border border-main-white/30"
                      style={{ backgroundColor: preset.whitePrimary }}/>
                    <span className="w-3.5 h-3.5 rounded-full border border-main-white/30"
                      style={{ backgroundColor: preset.blackPrimary }}/>
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-main-light">Nazwa zestawu bierek</label>
            <input type="text" value={pieceTheme.name} onChange={(e) => setPieceTheme({ name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-main-darkest text-main-white border border-main-dark/80 rounded-xl focus:outline-none focus:border-main-accent transition-colors"/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PIECE_THEME_PICKERS_UI.map(({ key, label }) => (
              <label key={key}
                className="flex flex-col gap-2 bg-main-darkest p-3 rounded-xl border border-main-dark/70 hover:border-main-light/60 transition-colors cursor-pointer">
                <span className="text-xs text-main-light">{label}</span>
                <input type="color" value={pieceTheme[key]}
                  onChange={(e) => onPieceColorChange(key, e.target.value)}
                  className="w-full h-9 rounded cursor-pointer bg-transparent"/>
                <span className="text-[11px] font-mono uppercase text-main-light/80">{pieceTheme[key]}</span>
              </label>
            ))}
          </div>
        </section>
    )
}