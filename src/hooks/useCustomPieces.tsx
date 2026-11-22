import React, { useMemo } from "react";

interface PieceColors {
  whitePrimary: string;
  blackPrimary: string;
}

const PIECE_NAMES: Record<string, string> = { K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight", P: "pawn"};
const PIECE_SIDES = ["w", "b"] as const;

function hexToRgb(color: string): [number, number, number] {
  const hex = color.replace("#", "");
  return [ parseInt(hex.substring(0, 2), 16) / 255, parseInt(hex.substring(2, 4), 16) / 255, parseInt(hex.substring(4, 6), 16) / 255];
}

export function useCustomPieces({ whitePrimary, blackPrimary }: PieceColors) {
  return useMemo(() => {
    const pieceComponents: Record<string, () => React.JSX.Element> = {};

    PIECE_SIDES.forEach((side) => {
      const [r, g, b] = hexToRgb(side === "w" ? whitePrimary : blackPrimary);

      Object.entries(PIECE_NAMES).forEach(([key, pieceName]) => {
        const code = `${side}${key}`;

        pieceComponents[code] = () => (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
            <defs>
              <filter id={`piece-filter-${code}`} colorInterpolationFilters="sRGB">
                <feColorMatrix in="gray" type="matrix" values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}/>
              </filter>
            </defs>

            <image href={`/assets/icons/${pieceName}.svg`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
              filter={`url(#piece-filter-${code})`}/>
          </svg>
        );
      });
    });

    return pieceComponents;
  }, [whitePrimary, blackPrimary]);
}