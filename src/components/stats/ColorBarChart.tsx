"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { UserStatsResponse } from "@/actions/stats";
import { CHART_TOOLTIP_STYLE } from "./ChartConfig";

interface ColorBarChartProps {
  data: UserStatsResponse["colorChart"];
}

export default function ColorBarChart({ data }: ColorBarChartProps) {
  return (
    <section className="bg-main-darkest/80 border border-main-dark/60 rounded-2xl p-6 shadow-lg flex flex-col">
      <h2 className="text-xl font-semibold text-main-accent mb-1">
        Skuteczność według koloru
      </h2>
      <p className="text-xs text-main-light mb-4">
        Porównanie wyników białymi i czarnymi bierkami
      </p>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4d774e"
              opacity={0.3}
            />
            <XAxis dataKey="side" stroke="#9dc88d" />
            <YAxis allowDecimals={false} stroke="#9dc88d" />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend />
            <Bar
              dataKey="wins"
              name="Wygrane"
              fill="#9dc88d"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="draws"
              name="Remisy"
              fill="#f1b24a"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="losses"
              name="Przegrane"
              fill="#f87171"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
