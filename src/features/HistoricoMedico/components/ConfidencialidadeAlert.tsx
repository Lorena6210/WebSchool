import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { Heart } from "lucide-react";

export function ConfidencialidadeAlert({ isDark, accent }: { isDark: boolean; accent: string }) {
  return (
    <Paper sx={{ mt: 3, p: 2, bgcolor: `${accent}14`, border: `1px solid ${accent}40` }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <Heart size={18} color={accent} style={{ marginTop: 2 }} />
        <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>
          As informações médicas são confidenciais e acessíveis apenas ao aluno, responsáveis autorizados e gestores escolares.
          Em caso de emergência, entre em contato imediatamente com o responsável indicado acima.
        </Typography>
      </Box>
    </Paper>
  );
}
