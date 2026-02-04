import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "@/components/Sidebar/views";
import { getMenuByRole } from "@/components/Sidebar";
import { useRouter } from "next/router";

interface BasePageProps {
  usuario: any;
  titulo: string;
  children: React.ReactNode;
}

export default function BasePage({ usuario, titulo, children }: BasePageProps) {
  const router = useRouter();
  const menuItems = getMenuByRole(usuario.Role, router);

  return (
    <Box
      sx={{
        width: "210vh",
        minHeight: "99.9vh",
        position: "static",
        mx: "auto",
        mt: "-10px",
        fontFamily: "Inter, Arial, sans-serif",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        display: "flex",
      }}
    >
      <Navbar usuario={usuario} menuItems={menuItems} />
      <Box
        sx={{
          flex: 1,
          p: "32px 24px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            background: "linear-gradient(90deg, #4CAF50 60%, #38b6ff 100%)",
            color: "white",
            p: "18px 32px",
            borderRadius: "16px",
            mb: "32px",
            fontWeight: 700,
            boxShadow: "0 4px 24px rgba(56,182,255,0.10)",
          }}
        >
          {titulo}
        </Typography>

        {children}
      </Box>
    </Box>
  );
}
