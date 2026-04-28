"use client";

import { Avatar, Box, Divider, Typography } from "@mui/material";
import { School } from "@mui/icons-material";

type DashboardGestorHeaderProps = {
  accent: string;
  greeting: string;
  firstName: string;
};

export function DashboardGestorHeader({ accent, greeting, firstName }: DashboardGestorHeaderProps) {
  return (
    <Box
      sx={{
        mb: 5,
        pt: 4,
        position: "relative",
        borderRadius: 3,
        background: "linear-gradient(135deg, #0f2747 0%, #123a6b 45%, #0f2747 100%)",
        p: 4,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
    >
      {/* Floating decorative orbs — right side */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: 60,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          animation: "imageFloat 4s ease-in-out infinite",
          "@keyframes imageFloat": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 15,
          right: 170,
          width: 55,
          height: 55,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          animation: "imageFloat 4s ease-in-out infinite",
          animationDelay: "1s",
          "@keyframes imageFloat": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          right: 110,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
          animation: "imageFloat 4s ease-in-out infinite",
          animationDelay: "2s",
          "@keyframes imageFloat": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)",
          animation: "imageFloat 4s ease-in-out infinite",
          animationDelay: "3s",
          "@keyframes imageFloat": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar
          sx={{
            bgcolor: "rgba(255,255,255,0.16)",
            width: 48,
            height: 48,
            border: "2px solid rgba(255,255,255,0.32)",
          }}
        >
          <School sx={{ color: "#ffffff" }} />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#f0f0f8">
            {greeting}, {firstName}!
          </Typography>
          <Typography variant="body1" color="rgba(240,240,248,0.6)">
            Visão geral da escola - todos os dados em um lugar
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: accent,
          width: "100px",
          mt: 2,
          borderBottomWidth: "2px",
          boxShadow: "0 0 8px rgba(255,255,255,0.45)",
        }}
      />
    </Box>
  );
}
