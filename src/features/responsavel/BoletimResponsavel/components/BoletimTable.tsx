import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { ACCENT } from "../utils";

interface BoletimTableProps {
  finalRows: any[];
}

export function BoletimTable({ finalRows }: BoletimTableProps) {
  return (
    <Paper sx={{ overflow: "hidden", height: "100%" }}>
      <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Typography fontWeight={700} color="#f0f0f8">
          Tabela de desempenho
        </Typography>
        <Typography variant="body2" color="rgba(240,240,248,0.6)">
          Comparativo de disciplinas principais.
        </Typography>
      </Box>

      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <colgroup>
          <col style={{ width: "34%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "26%" }} />
        </colgroup>
        <thead style={{ backgroundColor: "#1a1a2c" }}>
          <tr>
            <th
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
                textAlign: "left",
                padding: "12px 16px",
                color: "rgba(240,240,248,0.45)",
              }}
            >
              Disciplina
            </th>
            <th
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
                textAlign: "center",
                padding: "12px 16px",
                color: "rgba(240,240,248,0.45)",
              }}
            >
              Media
            </th>
            <th
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
                textAlign: "center",
                padding: "12px 16px",
                color: "rgba(240,240,248,0.45)",
              }}
            >
              Frequencia
            </th>
            <th
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
                textAlign: "center",
                padding: "12px 16px",
                color: "rgba(240,240,248,0.45)",
              }}
            >
              Situacao
            </th>
          </tr>
        </thead>
        <tbody>
          {finalRows.map((grade, index) => (
            <tr
              key={grade.disciplina}
              style={{
                backgroundColor: index % 2 === 0 ? "#12121e" : "rgba(255,255,255,0.02)",
              }}
            >
              <td style={{ padding: "12px 16px", color: "#f0f0f8" }}>{grade.disciplina}</td>
              <td style={{ textAlign: "center", padding: "18px 16px" }}>
                <span style={{ color: ACCENT, fontWeight: 600 }}>
                  {grade.media?.toFixed(2) ?? "-"}
                </span>
              </td>
              <td style={{ padding: "12px 16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 6,
                      borderRadius: 999,
                      bgcolor: "rgba(255,255,255,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${grade.frequencia}%`,
                        height: "100%",
                        bgcolor: "#4ade80",
                      }}
                    />
                  </Box>
                  <span style={{ fontWeight: 600, color: "#4ade80" }}>
                    {grade.frequencia}%
                  </span>
                </Box>
              </td>
              <td style={{ textAlign: "center", padding: "12px 16px" }}>
                <Chip
                  label={grade.situacao}
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    minWidth: 92,
                    bgcolor:
                      grade.situacao === "aprovado"
                        ? "rgba(74,222,128,0.15)"
                        : grade.situacao === "reprovado"
                        ? "rgba(229,36,74,0.15)"
                        : "rgba(251,191,36,0.15)",
                    color:
                      grade.situacao === "aprovado"
                        ? "#4ade80"
                        : grade.situacao === "reprovado"
                        ? "#e5244a"
                        : "#fbbf24",
                    fontWeight: 700,
                    border: "none",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
