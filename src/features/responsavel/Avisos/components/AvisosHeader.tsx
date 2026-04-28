import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import type { UserRole } from "@/types";
import { ACCENT } from "../utils";

interface AvisosHeaderProps {
  isDark: boolean;
  role: UserRole;
}

export function AvisosHeader({ isDark, role }: AvisosHeaderProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
          <NotificationsNoneOutlined sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
            Avisos e Comunicados
          </Typography>
          <Typography variant="body1" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)"}>
            {role === "responsavel"
              ? "Comunicados da escola sobre seu filho(a)"
              : role === "professor"
              ? "Envie comunicados e avisos de falta"
              : "Gerencie todos os comunicados da escola"}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: ACCENT,
          width: "100px",
          mt: 2,
          borderBottomWidth: "2px",
        }}
      />
    </Box>
  );
}
