import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Info } from "lucide-react";

export function ObservacoesMedicasCard({ isDark, accent, observacoes }: { isDark: boolean; accent: string; observacoes?: string }) {
  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: accent, mb: 2 }}>
        Observações Médicas
      </Typography>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${accent}1a`, border: `1px solid ${accent}40`, display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <Info size={18} color={accent} style={{ marginTop: 2 }} />
        <Typography variant="body2" color={isDark ? "#f0f0f8" : "#0f2747"}>{observacoes || "Nenhuma observação."}</Typography>
      </Box>
    </Paper>
  );
}
