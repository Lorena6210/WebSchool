import React from "react";
import { SectionCard } from "@/components/ui/stat-card";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface SituacaoAlunosChartProps {
  data: any[];
}

export function SituacaoAlunosChart({ data }: SituacaoAlunosChartProps) {
  return (
    <SectionCard title="Situação dos Alunos — 9º A">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="#12121e" strokeWidth={2} />
              ))}
            </Pie>
            <Legend
              formatter={(value) => <span style={{ fontSize: "0.75rem", color: "rgba(240,240,248,0.7)" }}>{value}</span>}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1a2c",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "#f0f0f8",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
