import { redirect } from "next/navigation";
import { Swords, Target, Trophy, Puzzle } from "lucide-react";
import { getUserStatsAction } from "@/actions/stats";
import OutcomePieChart from "@/components/stats/OutcomePieChart";
import ColorBarChart from "@/components/stats/ColorBarChart";

export default async function StatsView() {
  const stats = await getUserStatsAction();

  if (!stats) {
    redirect("/");
  }

  const { summary, outcomeChart, colorChart } = stats;

  return (
    <div className="max-w-5xl mx-auto min-h-full space-y-8 text-main-white pb-20 md:pb-10">
      <header className="border-b border-main-dark/60 pb-5">
        <h1 className="text-3xl font-bold text-main-white">Statystyki</h1>
        <p className="text-sm text-main-light mt-1">
          Podsumowanie Twoich partii i postępów w grze
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-main-light">
            <span className="text-xs font-medium uppercase tracking-wider">
              Rozegrane partie
            </span>
            <Swords className="w-5 h-5 text-main-accent" />
          </div>
          <p className="text-3xl font-bold text-main-white">
            {summary.totalGames}
          </p>
          <p className="text-xs text-main-light/80">Zakończone gry</p>
        </div>

        <div className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-main-light">
            <span className="text-xs font-medium uppercase tracking-wider">
              Win Rate
            </span>
            <Target className="w-5 h-5 text-main-accent" />
          </div>
          <p className="text-3xl font-bold text-main-white">
            {summary.winRate}%
          </p>
          <p className="text-xs text-main-light/80">
            {summary.wins}W / {summary.draws}D / {summary.losses}L
          </p>
        </div>

        <div className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-main-light">
            <span className="text-xs font-medium uppercase tracking-wider">
              Wygrane
            </span>
            <Trophy className="w-5 h-5 text-main-accent" />
          </div>
          <p className="text-3xl font-bold text-main-white">{summary.wins}</p>
          <p className="text-xs text-main-light/80">Łączna liczba zwycięstw</p>
        </div>

        <div className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-main-light">
            <span className="text-xs font-medium uppercase tracking-wider">
              Zagadki
            </span>
            <Puzzle className="w-5 h-5 text-main-accent" />
          </div>
          <p className="text-3xl font-bold text-main-white">
            {summary.solvedPuzzles}
          </p>
          <p className="text-xs text-main-light/80">Rozwiązane zadania</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OutcomePieChart
            data={outcomeChart}
            hasGames={summary.totalGames > 0}
          />
          <ColorBarChart data={colorChart} />
        </div>
      </div>
    </div>
  );
}
