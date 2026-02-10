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
      width={"97.74%"}
      minW="100px"
      marginTop="-8px"
      marginLeft="-7.8px"
      fontFamily="Inter, Arial, sans-serif"
      background="linear-gradient(120deg, #0dae6d 0%, #cfdef3 100%)"
    >
      <Navbar usuario={usuario} menuItems={menuItems} />
      <Box
        sx={{
          flex: 1,
          p: "32px 24px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // maxWidth:"1024px",
          width: "100%",
          // height:"90vh",
          background: "linear-gradient(to bottom right, #dbeafe, #fce7f3, #fef3c7)",
        }}
      >
        {titulo ? (
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
            {titulo || null}
          </Typography>
        ) : (
          <></>
        )}
        {children}
      </Box>
    </Box>
  );
}
