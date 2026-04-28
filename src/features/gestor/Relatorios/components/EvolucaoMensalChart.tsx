import React from "react";
import { SectionCard } from "@/components/ui/stat-card";
import { ACCENT } from "../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EvolucaoMensalChartProps {
  data: any[];
}

export function EvolucaoMensalChart({ data }: EvolucaoMensalChartProps) {
  return (
    <SectionCard title="Evolução Mensal — Média e Frequência">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "rgba(240,240,248,0.6)" }} />
            <YAxis yAxisId="left" domain={[0, 10]} tick={{ fontSize: 12, fill: "rgba(240,240,248,0.6)" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[80, 100]}
              tick={{ fontSize: 12, fill: "rgba(240,240,248,0.6)" }}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1a2c",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                color: "#f0f0f8",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="media"
              name="Média"
              stroke={ACCENT}
              strokeWidth={2.5}
              dot={{ fill: ACCENT, r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="frequencia"
              name="Frequência (%)"
              stroke="#4ade80"
              strokeWidth={2.5}
              dot={{ fill: "#4ade80", r: 4 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-3 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: "#e5244a" }} />
          <span className="text-xs" style={{ color: "rgba(240,240,248,0.6)" }}>Média (0–10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-0.5"
            style={{ borderTop: "2px dashed #4ade80", background: "none" }}
          />
          <span className="text-xs" style={{ color: "rgba(240,240,248,0.6)" }}>Frequência (%)</span>
        </div>
      </div>
    </SectionCard>
  );
}
