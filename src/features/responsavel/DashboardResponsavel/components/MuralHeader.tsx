import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Users } from "lucide-react";

interface MuralHeaderProps {
  isDark: boolean;
  accent: string;
  greeting: string;
  userName: string;
  alunoVinculado: any;
  turmaAluno: string;
}

export function MuralHeader({ isDark, accent, greeting, userName, alunoVinculado, turmaAluno }: MuralHeaderProps) {
  return (
    <Box sx={{ mb: 5, position: "relative", overflow: "hidden" }}>
      {/* Floating decorative orbs */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: 60,
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: `${accent}12`,
          pointerEvents: "none",
          "@keyframes floatOrbA": {
            "0%, 100%": { transform: "translateY(0px) scale(1)" },
            "50%": { transform: "translateY(-14px) scale(1.06)" },
          },
          animation: "floatOrbA 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 145,
          width: 50,
          height: 50,
          borderRadius: "50%",
          bgcolor: `${accent}0a`,
          pointerEvents: "none",
          "@keyframes floatOrbB": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
          animation: "floatOrbB 8s ease-in-out infinite 1s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -10,
          right: 24,
          width: 28,
          height: 28,
          borderRadius: "50%",
          bgcolor: `${accent}0d`,
          pointerEvents: "none",
          "@keyframes floatOrbC": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-6px)" },
          },
          animation: "floatOrbC 5s ease-in-out infinite 0.5s",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar
          sx={{
            bgcolor: accent,
            width: 48,
            height: 48,
            boxShadow: `0 0 20px ${accent}66`,
          }}
        >
          <Users size={20} color="white" />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
            {greeting}, {userName.split(" ")[0]}!
          </Typography>
          <Typography variant="body1" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}>
            {alunoVinculado
              ? `Acompanhando ${alunoVinculado.nome} - Turma ${turmaAluno}`
              : "Painel do Responsável"}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: accent, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
    </Box>
  );
}
