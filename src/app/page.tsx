// ============================================================
// WebSchool — Home Page (Next.js 14+)
// Redireciona para login se não autenticado
// ============================================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else {
        // Redireciona direto para o mural do perfil
        router.replace(`/mural/${user.role}`);
      }
    }
  }, [user, isLoading, router]);

  // Tela de carregamento com Material UI
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#FDFAF5",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
