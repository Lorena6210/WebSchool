import React from "react";
import { Box, Typography } from "@mui/material";
import BasePage from "@/components/BasePage";

export default function ResponsavelPage({ usuario }: any) {
  return (
    <BasePage usuario={usuario} titulo="Área do Responsável">
      <Box sx={{ width: "100%", maxWidth: 1024 }}>
        <Typography variant="h6">Olá, {usuario.Nome}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Aqui você verá as informações do aluno, atividades e calendário.
        </Typography>
      </Box>
    </BasePage>
  );
}
