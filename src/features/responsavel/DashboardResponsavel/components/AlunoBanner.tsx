import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { Badge } from "@/components/ui/stat-card";

interface AlunoBannerProps {
  isDark: boolean;
  accent: string;
  alunoVinculado: any;
  turmaAluno: string;
}

export function AlunoBanner({ isDark, accent, alunoVinculado, turmaAluno }: AlunoBannerProps) {
  if (!alunoVinculado) return null;

  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        bgcolor: isDark ? "#12121e" : "#ffffff",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: `${accent}55`,
          transform: "translateY(-2px)",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(15,39,71,0.14)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: accent,
            fontWeight: 700,
            boxShadow: `0 0 16px ${accent}66`,
          }}
        >
          {alunoVinculado.avatarInitials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Typography fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"}>
            {alunoVinculado.nome}
          </Typography>
          <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>
            RA: {alunoVinculado.ra} - Turma: {turmaAluno}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Badge color={accent}>Aluno Vinculado</Badge>
          </Box>
        </Box>
        <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.55)"}>
          Você é responsável por este aluno
        </Typography>
      </Box>
    </Paper>
  );
}
