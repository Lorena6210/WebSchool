import React from "react";
import { Box, Typography } from "@mui/material";
import BasePage from "@/components/BasePage";

export default function GestorPage({ usuario }: any) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Gestor">
      <Box sx={{ width: "100%", maxWidth: 1024 }}>
        <Typography variant="h6">Olá, {usuario.Nome}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Aqui você pode gerenciar turmas, usuários e relatórios.
        </Typography>
      </Box>
    </BasePage>
  );
}
