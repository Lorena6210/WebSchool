"use client";

import { Box, Divider, Paper, Typography } from "@mui/material";
import { sectionTitleSx } from "../../utils";

type SchoolInfoCardProps = {
  accent: string;
  totalTurmas: number;
  totalAlunos: number;
  totalProfessores: number;
  mediaEscolar: string;
};

export function SchoolInfoCard({
  accent,
  totalTurmas,
  totalAlunos,
  totalProfessores,
  mediaEscolar,
}: SchoolInfoCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "#ffffff",
        border: "1px solid rgba(15,39,71,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: `${accent}66`,
          transform: "translateY(-2px)",
          boxShadow: "0 8px 22px rgba(15,39,71,0.16)",
        },
      }}
    >
      <Typography sx={sectionTitleSx(accent)}>Informações da Escola</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="rgba(15,39,71,0.7)">
            Turmas Ativas:
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={accent}>
            {totalTurmas}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="rgba(15,39,71,0.7)">
            Total de Alunos:
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={accent}>
            {totalAlunos}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(15,39,71,0.12)" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="rgba(15,39,71,0.7)">
            Professores:
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={accent}>
            {totalProfessores}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="rgba(15,39,71,0.7)">
            Média Escolar:
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={accent}>
            {mediaEscolar}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
