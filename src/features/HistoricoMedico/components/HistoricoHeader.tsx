import React from "react";
import { Avatar, Box, Typography, Divider } from "@mui/material";
import { Heart } from "lucide-react";

export function HistoricoHeader({ isDark, accent }: { isDark: boolean; accent: string }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar sx={{ bgcolor: accent, width: 48, height: 48, boxShadow: `0 0 16px ${accent}66` }}>
          <Heart size={20} color="white" />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
            Histórico Médico
          </Typography>
          <Typography variant="body1" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>
            Informações de saúde e contato de emergência.
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: accent, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
    </Box>
  );
}
