"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { UserStatsResponse } from "@/actions/stats";
import { CHART_TOOLTIP_STYLE } from "./ChartConfig";

interface OutcomePieChartProps {
  data: UserStatsResponse["outcomeChart"];
  hasGames: boolean;
}

export default function OutcomePieChart({
  data,
  hasGames,
}: OutcomePieChartProps) {
  return (
    <section className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-6 shadow-lg flex flex-col">
      <h2 className="text-xl font-semibold text-main-accent mb-1">
        Wyniki partii
      </h2>
      <p className="text-xs text-main-light mb-4">
        Proporcja wygranych, remisów i porażek
      </p>

      {!hasGames ? (
        <div className="flex-1 min-h-[260px] flex items-center justify-center text-sm text-main-light/70">
          Rozegraj pierwszą partię, aby zobaczyć wykres bilansu.
        </div>
      ) : (
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
