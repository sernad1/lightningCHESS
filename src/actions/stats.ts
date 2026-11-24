"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export interface UserStatsResponse {
  summary: {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
    solvedPuzzles: number;
  };
  outcomeChart: {
    key: "wins" | "draws" | "losses";
    label: string;
    value: number;
    color: string;
  }[];
  colorChart: {
    side: string;
    wins: number;
    draws: number;
    losses: number;
  }[];
  modeChart: {
    mode: string;
    played: number;
    won: number;
  }[];
}

export async function getUserStatsAction(): Promise<UserStatsResponse | null> {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      wins: true,
      losses: true,
      draws: true,
      _count: {
        select: { solvedPuzzles: true },
      },
      gamesAsWhite: {
        where: { status: "COMPLETED" },
        select: { result: true, timeControlMode: true },
      },
      gamesAsBlack: {
        where: { status: "COMPLETED" },
        select: { result: true, timeControlMode: true },
      },
    },
  });

  if (!user) return null;

  let whiteWins = 0;
  let whiteDraws = 0;
  let whiteLosses = 0;

  for (const game of user.gamesAsWhite) {
    if (game.result === "WHITE_WIN") whiteWins++;
    else if (game.result === "DRAW") whiteDraws++;
    else if (game.result === "BLACK_WIN") whiteLosses++;
  }

  let blackWins = 0;
  let blackDraws = 0;
  let blackLosses = 0;

  for (const game of user.gamesAsBlack) {
    if (game.result === "BLACK_WIN") blackWins++;
    else if (game.result === "DRAW") blackDraws++;
    else if (game.result === "WHITE_WIN") blackLosses++;
  }

  const completedGamesCount =
    user.gamesAsWhite.length + user.gamesAsBlack.length;
  const userRecordCount = user.wins + user.losses + user.draws;

  const wins = completedGamesCount > 0 ? whiteWins + blackWins : user.wins;
  const draws = completedGamesCount > 0 ? whiteDraws + blackDraws : user.draws;
  const losses =
    completedGamesCount > 0 ? whiteLosses + blackLosses : user.losses;
  const totalGames = Math.max(completedGamesCount, userRecordCount);
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  const modeStatsMap: Record<string, { played: number; won: number }> = {
    BULLET: { played: 0, won: 0 },
    BLITZ: { played: 0, won: 0 },
    RAPID: { played: 0, won: 0 },
    CLASSICAL: { played: 0, won: 0 },
    CHESS960: { played: 0, won: 0 },
  };

  for (const game of user.gamesAsWhite) {
    if (modeStatsMap[game.timeControlMode]) {
      modeStatsMap[game.timeControlMode].played++;
      if (game.result === "WHITE_WIN") {
        modeStatsMap[game.timeControlMode].won++;
      }
    }
  }

  for (const game of user.gamesAsBlack) {
    if (modeStatsMap[game.timeControlMode]) {
      modeStatsMap[game.timeControlMode].played++;
      if (game.result === "BLACK_WIN") {
        modeStatsMap[game.timeControlMode].won++;
      }
    }
  }

  return {
    summary: {
      totalGames,
      wins,
      losses,
      draws,
      winRate,
      solvedPuzzles: user._count.solvedPuzzles,
    },
    outcomeChart: [
      { key: "wins", label: "Wygrane", value: wins, color: "#9dc88d" },
      { key: "draws", label: "Remisy", value: draws, color: "#f1b24a" },
      { key: "losses", label: "Przegrane", value: losses, color: "#f87171" },
    ],
    colorChart: [
      {
        side: "Białe",
        wins: whiteWins,
        draws: whiteDraws,
        losses: whiteLosses,
      },
      {
        side: "Czarne",
        wins: blackWins,
        draws: blackDraws,
        losses: blackLosses,
      },
    ],
    modeChart: Object.entries(modeStatsMap).map(([mode, stats]) => ({
      mode,
      played: stats.played,
      won: stats.won,
    })),
  };
}
