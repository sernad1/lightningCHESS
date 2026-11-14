import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { usePreferredBoardTheme } from "@/stores/usePreferencesStore";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

interface ChessBoardModelProps {
  coords: [number, number, number];
  size: [number, number, number];
  onSquareClick?: (square: string) => void;
}

export function ChessBoardModel({ coords, size, onSquareClick }: ChessBoardModelProps) {
  const { invalidate } = useThree();
  const boardTheme = usePreferredBoardTheme();

  useEffect(() => {
    invalidate();
  }, [boardTheme, invalidate]);

  return (
    <group position={coords}>
      {/* Board Frame */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={boardTheme.boardFrame} />
      </mesh>

      {/* 64 Clickable Squares */}
      {RANKS.map((rank) =>
        FILES.map((file, fileIdx) => {
          const square = `${file}${rank}`;
          const isDark = (rank + fileIdx) % 2 === 0;
          const x = fileIdx - 3.5;
          const z = 4.5 - rank;

          return (
            <mesh
              key={square}
              receiveShadow
              position={[x, 0.46, z]}
              onClick={(e) => {
                e.stopPropagation();
                onSquareClick?.(square);
              }}
            >
              <boxGeometry args={[1, 0.1, 1]} />
              <meshStandardMaterial
                color={isDark ? boardTheme.darkSquare : boardTheme.lightSquare}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}