import { Paper, Typography } from "@mui/material";
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

type ChartDataRow = {
  disciplina: string;
  media: number;
  frequenciaEscalada: number;
  frequenciaOriginal: number;
};

type BoletimPerformanceChartProps = {
  isDark: boolean;
  accent: string;
  data: ChartDataRow[];
};

export default function BoletimPerformanceChart({ isDark, accent, data }: BoletimPerformanceChartProps) {
  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"} mb={2}>
        Desempenho por Disciplina
      </Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={24} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.12)"} />
          <XAxis dataKey="disciplina" tick={{ fontSize: 12, fill: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)" }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)" }} />
          <Tooltip
            contentStyle={{
              background: isDark ? "#1a1a2c" : "#f7faff",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
              borderRadius: "8px",
              color: isDark ? "#f0f0f8" : "#0f2747",
            }}
            formatter={(value, name) => {
              if (name === "frequenciaEscalada") {
                return [`${Number(value) * 10}%`, "Frequência"];
              }

              return [value, "Média"];
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.68)" }}>
                {value === "frequenciaEscalada" ? "Frequência (÷10)" : "Média"}
              </span>
            )}
          />
          <Bar dataKey="media" fill={accent} radius={[4, 4, 0, 0]} />
          <Bar dataKey="frequenciaEscalada" fill="rgba(74,222,128,0.7)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
