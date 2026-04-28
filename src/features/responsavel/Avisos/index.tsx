"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { mockNotices } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { ACCENT, getTheme, noticeTypeLabels, FilterTipo } from "./utils";
import { AvisosHeader, AvisosList, ModalNovoComunicado } from "./components";

// Componente principal
export default function Avisos() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const role = user?.role as UserRole;
  const pageTheme = useMemo(() => getTheme(isDark), [isDark]);

  const canSend = role === "professor" || role === "gestor";
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTipo, setFilterTipo] = useState<FilterTipo>("todos");

  // Filtra avisos pelo destinatário do perfil atual
  const baseNotices = mockNotices.filter(
    (n) => n.destinatarios.includes(role) || canSend
  );

  const displayNotices =
    filterTipo === "todos"
      ? baseNotices
      : baseNotices.filter((n) => n.tipo === filterTipo);

  return (
    <ThemeProvider theme={pageTheme}>
      <DashboardLayout>
        {modalOpen && canSend && (
          <ModalNovoComunicado
            isDark={isDark}
            role={role}
            onClose={() => setModalOpen(false)}
          />
        )}

        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <AvisosHeader isDark={isDark} role={role} />

            {/* AVISOS SECTION */}
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    fontSize: "1.1rem",
                    color: ACCENT,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
                  Avisos Importantes
                </Typography>
                {canSend && (
                  <Box
                    onClick={() => setModalOpen(true)}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: ACCENT,
                      color: "white",
                      borderRadius: 1.5,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      "&:hover": { opacity: 0.9 },
                    }}
                  >
                    Novo Comunicado
                  </Box>
                )}
              </Box>

              {/* Filtro */}
              <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                {(["todos", "prova", "reuniao", "atividade", "geral"] as FilterTipo[]).map(
                  (t) => (
                    <Chip
                      key={t}
                      label={t === "todos" ? "Todos" : noticeTypeLabels[t]}
                      onClick={() => setFilterTipo(t)}
                      variant={filterTipo === t ? "filled" : "outlined"}
                      sx={{
                        bgcolor: filterTipo === t ? ACCENT : "transparent",
                        color: filterTipo === t ? "#f0f0f8" : (isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)"),
                        borderColor: filterTipo === t ? ACCENT : (isDark ? "rgba(255,255,255,0.15)" : "rgba(15,39,71,0.18)"),
                        fontWeight: 600,
                      }}
                    />
                  )
                )}
              </Box>

              <AvisosList isDark={isDark} notices={displayNotices} canSend={canSend} />
            </Paper>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}


export * from "./components";
export * from "./services";
export * from "./utils";
