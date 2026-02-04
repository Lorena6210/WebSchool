import React from "react";
import { Box, Typography } from "@mui/material";
import BasePage from "@/components/BasePage";

export default function ProfessorPage({ usuario }: any) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Professor">
      <Box sx={{ width: "100%", maxWidth: 1024 }}>
        <Typography variant="h6">Bem-vindo, {usuario.Nome}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Aqui você verá suas turmas, atividades e notas.
        </Typography>
      </Box>
    </BasePage>
  );
}
