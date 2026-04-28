"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";

export default function Mural() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role);

  useEffect(() => {
    if (user?.role) {
      router.replace(`/mural/${user.role}`);
    }
  }, [router, user]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: isDark ? "#0c0c14" : "#f2f7ff",
      }}
    >
      <CircularProgress sx={{ color: accent || (isDark ? "#b266ff" : "#1c4f82") }} />
    </Box>
  );
}
