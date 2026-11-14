"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { usePreferredPieceTheme } from "@/stores/usePreferencesStore";

function generateSolidCanvasTexture(hexColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 4;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, 4, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function usePieceTextures() {
  const { whitePrimary, blackPrimary } = usePreferredPieceTheme();
  const textures = useMemo(() => ({ white: generateSolidCanvasTexture(whitePrimary), black: generateSolidCanvasTexture(blackPrimary)}),
    [whitePrimary, blackPrimary]
  );

  useEffect(() => {
    return () => {
      textures.white.dispose();
      textures.black.dispose();
    };
  }, [textures]);

  return textures;
}