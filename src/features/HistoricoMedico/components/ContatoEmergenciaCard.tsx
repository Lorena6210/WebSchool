import React from "react";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import { Phone } from "lucide-react";

export function ContatoEmergenciaCard({ isDark, accent, contato }: { isDark: boolean; accent: string; contato: any }) {
  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: accent, mb: 2 }}>
        Contato de Emergência
      </Typography>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${accent}1a`, border: `1px solid ${accent}40` }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Avatar sx={{ bgcolor: `${accent}2e`, color: accent }}>{contato.nome?.charAt(0) ?? "?"}</Avatar>
          <Box>
            <Typography fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"}>{contato.nome}</Typography>
            <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>{contato.parentesco}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.04)", borderRadius: 2, border: `1px solid ${accent}30` }}>
          <Phone size={16} color={accent} />
          <Typography variant="body2" fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"}>{contato.telefone}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
