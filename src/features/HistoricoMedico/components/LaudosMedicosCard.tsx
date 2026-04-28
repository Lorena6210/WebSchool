import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { FileText } from "lucide-react";

export function LaudosMedicosCard({ isDark, accent, laudos }: { isDark: boolean; accent: string; laudos: string[] }) {
  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: accent, mb: 2 }}>
        Laudos Médicos
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {laudos.length === 0 ? (
          <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>Nenhum laudo registrado.</Typography>
        ) : (
          laudos.map((laudo: string, idx: number) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, p: 1.5, borderRadius: 2, border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)", "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.04)" } }}>
              <FileText size={18} color={accent} style={{ marginTop: 2 }} />
              <Typography variant="body2" color={isDark ? "#f0f0f8" : "#0f2747"}>{laudo}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}
