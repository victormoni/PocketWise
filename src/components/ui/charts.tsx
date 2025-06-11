"use client";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface IChartData {
  category: string;
  amount: number;
}

export function ChartComponent({ data }: { data: IChartData[] }) {
  return (
    <div className="h-full w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
