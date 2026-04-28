import React from "react";
import { SectionCard } from "@/components/ui/stat-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MediaDisciplinaChartProps {
  data: any[];
}

export function MediaDisciplinaChart({ data }: MediaDisciplinaChartProps) {
  return (
    <SectionCard title="Média por Disciplina">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="disciplina" tick={{ fontSize: 11, fill: "rgba(240,240,248,0.6)" }} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "rgba(240,240,248,0.6)" }} />
            <Tooltip
              contentStyle={{
                background: "#1a1a2c",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "#f0f0f8",
              }}
            />
            <Bar dataKey="media" name="Média" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.media >= 7 ? "#4ade80" : entry.media >= 5 ? "#fbbf24" : "#e5244a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
