import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import { AlertTriangle } from "lucide-react";

export function AlergiasCard({ isDark, accent, alergias }: { isDark: boolean; accent: string; alergias: string[] }) {
  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: accent, mb: 2 }}>
        Alergias
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {alergias.length === 0 ? (
          <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>Nenhuma alergia registrada.</Typography>
        ) : (
          alergias.map((alergia: string, idx: number) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: `${accent}1a`, border: `1px solid ${accent}40` }}>
              <AlertTriangle size={18} color={accent} />
              <Typography variant="body2" fontWeight={700} color={isDark ? "#f0f0f8" : "#0f2747"}>{alergia}</Typography>
              <Chip label="Alergia" size="small" sx={{ ml: "auto", bgcolor: `${accent}26`, color: accent, fontWeight: 700, border: "none" }} />
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}
