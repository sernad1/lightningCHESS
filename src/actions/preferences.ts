"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { BoardTheme, PieceTheme} from "@/types/zustand/preferences";
import { boardThemeSchema, pieceThemeSchema } from "@/lib/validators/preferences";

export async function getUserThemesAction() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { boardTheme: true, pieceTheme: true },
  });

  if (!user) return null;

  const parsedBoard = boardThemeSchema.safeParse(user.boardTheme);
  const parsedPiece = pieceThemeSchema.safeParse(user.pieceTheme);

  return {
    boardTheme: parsedBoard.success ? parsedBoard.data : null,
    pieceTheme: parsedPiece.success ? parsedPiece.data : null,
  };
}

export async function saveUserThemesAction( boardTheme: BoardTheme, pieceTheme: PieceTheme) {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Not authenticated" };

  const parsedBoard = boardThemeSchema.safeParse(boardTheme);
  const parsedPiece = pieceThemeSchema.safeParse(pieceTheme);

  if (!parsedBoard.success || !parsedPiece.success) return { success: false, error: "Invalid theme format" };

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      boardTheme: parsedBoard.data,
      pieceTheme: parsedPiece.data,
    },
  });

  return { success: true };
}