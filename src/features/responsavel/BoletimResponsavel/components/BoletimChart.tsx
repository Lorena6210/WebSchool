import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ACCENT } from "../utils";

interface BoletimChartProps {
  chartData: any[];
}

export function BoletimChart({ chartData }: BoletimChartProps) {
  return (
    <Paper sx={{ p: 2.5, height: "100%" }}>
      <Typography fontWeight={700} color="#f0f0f8" mb={0.5}>
        Grafico comparativo
      </Typography>
      <Typography variant="body2" color="rgba(240,240,248,0.6)" mb={2}>
        Media e frequencia por disciplina.
      </Typography>

      <Box sx={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -12, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="disciplina"
              tick={{ fill: "rgba(240,240,248,0.6)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "rgba(240,240,248,0.6)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1a2c",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#f0f0f8",
              }}
              formatter={(value: number, name: string, item: any) => {
                if (name === "Frequencia") {
                  return [
                    `${item.payload?.frequenciaOriginal ?? 0}%`,
                    "Frequencia",
                  ];
                }
                return [value, "Media"];
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "rgba(240,240,248,0.6)" }}>{value}</span>
              )}
            />
            <Bar
              dataKey="media"
              name="Media"
              fill={ACCENT}
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="frequenciaEscalada"
              name="Frequencia"
              fill="#4ade80"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="rgba(240,240,248,0.45)">
        Obs: frequencia exibida no grafico em escala 0-10 para comparacao
        visual com a media.
      </Typography>
    </Paper>
  );
}
