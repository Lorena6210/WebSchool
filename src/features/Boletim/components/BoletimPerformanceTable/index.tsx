import { Box, Paper, Typography } from "@mui/material";
import type { Grade } from "@/types";

type BoletimPerformanceTableProps = {
  isDark: boolean;
  rows: Grade[];
};

export default function BoletimPerformanceTable({ isDark, rows }: BoletimPerformanceTableProps) {
  return (
    <Paper sx={{ overflow: "hidden", height: "100%" }}>
      <Box sx={{ p: 2.5, borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)" }}>
        <Typography fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"}>
          Tabela de desempenho
        </Typography>
        <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.65)"}>
          Comparativo de disciplinas principais.
        </Typography>
      </Box>

      <table className="w-full table-fixed text-sm">
        <colgroup>
          <col style={{ width: "34%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <thead>
          <tr className="border-b" style={{ backgroundColor: isDark ? "#1a1a2c" : "#eef5ff", borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.1)" }}>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.56)" }}>
              Disciplina
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.56)" }}>
              Média
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.56)" }}>
              Freq.
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.56)" }}>
              Situação
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.disciplina} style={{ backgroundColor: idx % 2 === 0 ? (isDark ? "#12121e" : "#ffffff") : (isDark ? "#1a1a2c" : "#f7faff") }}>
              <td className="px-4 py-3 font-medium" style={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>{row.disciplina}</td>
              <td
                className="px-4 py-3 text-center font-bold"
                style={{ color: (row.media ?? 0) >= 7 ? "#4ade80" : "#e5244a" }}
              >
                {(row.media ?? 0).toFixed(1)}
              </td>
              <td className="px-4 py-3 text-center" style={{ color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.68)" }}>{row.frequencia}%</td>
              <td className="px-4 py-3 text-center">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: (row.media ?? 0) >= 7 ? "rgba(74,222,128,0.15)" : "rgba(229,36,74,0.15)",
                    color: (row.media ?? 0) >= 7 ? "#4ade80" : "#e5244a",
                  }}
                >
                  {(row.media ?? 0) >= 7 ? "Aprovado" : "Recuperação"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
