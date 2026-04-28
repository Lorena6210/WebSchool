import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { MenuBookOutlined } from "@mui/icons-material";
import { getSectionTitle } from "../utils";

interface BoletimResumoProps {
  isDark: boolean;
  accent: string;
  alunoVinculado: any;
  mockGrades: any[];
}

export function BoletimResumo({ isDark, accent, alunoVinculado, mockGrades }: BoletimResumoProps) {
  return (
    <Paper sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={getSectionTitle(accent, isDark)}>
          <MenuBookOutlined sx={{ fontSize: 20 }} />
          Boletim de {alunoVinculado?.nome ?? "Aluno"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: accent, cursor: "pointer", fontWeight: 600 }}
        >
          Ver todas
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {mockGrades.slice(0, 5).map((grade) => {
          const media = grade.media || 0;
          const statusBg =
            media >= 7 ? "#4ade80" : media >= 5 ? "#fbbf24" : "#f87171";
          const status =
            media >= 7
              ? "Aprovado"
              : media >= 5
              ? "Recuperação"
              : "Reprovado";
          const chipBg =
            media >= 7
              ? "rgba(74,222,128,0.15)"
              : media >= 5
              ? "rgba(251,191,36,0.15)"
              : "rgba(248,113,113,0.15)";
          const chipColor =
            media >= 7 ? "#4ade80" : media >= 5 ? "#fbbf24" : "#f87171";

          return (
            <Box
              key={grade.disciplina}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 2,
                bgcolor: isDark ? "#1a1a2c" : "#f8fbff",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: isDark ? "#20203a" : "#ffffff",
                  borderColor: `${accent}44`,
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: statusBg,
                  }}
                />
                <Box>
                  <Typography fontWeight="bold" variant="body1" color={isDark ? "#f0f0f8" : "#0f2747"}>
                    {grade.disciplina}
                  </Typography>
                  <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>
                    Média: {media.toFixed(1)}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  label={status}
                  size="small"
                  sx={{
                    bgcolor: chipBg,
                    color: chipColor,
                    fontWeight: 600,
                    height: 32,
                    border: `1px solid ${chipColor}44`,
                  }}
                />
                <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.3)" : "rgba(15,39,71,0.5)"}>
                  {grade.frequencia}%
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
