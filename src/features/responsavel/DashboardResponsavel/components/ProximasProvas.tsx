import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { AssignmentOutlined } from "@mui/icons-material";
import { getSectionTitle } from "../utils";

interface ProximasProvasProps {
  isDark: boolean;
  accent: string;
  upcomingExams: any[];
}

export function ProximasProvas({ isDark, accent, upcomingExams }: ProximasProvasProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography sx={getSectionTitle(accent, isDark)}>
        <AssignmentOutlined sx={{ fontSize: 20 }} />
        Próximas Provas
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {upcomingExams.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>
            Nenhuma prova agendada
          </p>
        ) : (
          upcomingExams.slice(0, 3).map((exam) => (
            <Box
              key={exam.id}
              sx={{
                p: 2,
                bgcolor: isDark ? `${accent}14` : `${accent}10`,
                borderRadius: 2,
                border: `1px solid ${accent}40`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: isDark ? `${accent}22` : `${accent}18`,
                  borderColor: `${accent}66`,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  p: 1,
                  opacity: 0.12,
                  color: accent,
                }}
              >
                <AssignmentOutlined />
              </Box>
              <Typography
                variant="body2"
                color={accent}
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="0.75rem"
              >
                {exam.disciplina}
              </Typography>
              <Typography fontWeight="bold" variant="body1" color={isDark ? "#f0f0f8" : "#0f2747"} mb={0.5}>
                {exam.titulo}
              </Typography>
              <Box mt={1} display="flex" alignItems="center" gap={1}>
                <Chip
                  label={new Date(exam.data).toLocaleDateString("pt-BR")}
                  size="small"
                  sx={{
                    bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.08)",
                    color: isDark ? "#f0f0f8" : "#0f2747",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                  }}
                />
                <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)"}>
                  {exam.horario}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}
