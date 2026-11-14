import { z } from "zod";

export const boardThemeSchema = z.object({
  name: z.string(),
  lightSquare: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  darkSquare: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  boardFrame: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const pieceThemeSchema = z.object({
  name: z.string(),
  whiteColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  blackColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export type BoardTheme = z.infer<typeof boardThemeSchema>;
export type PieceTheme = z.infer<typeof pieceThemeSchema>;