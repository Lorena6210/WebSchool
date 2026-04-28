"use client";

import React from "react";
import { Box, Container, Grid, ThemeProvider } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { mockUsers, mockCalendarEvents, mockNotices } from "@/lib/mockData";
import { DashboardGestorHeader } from "./components/DashboardGestorHeader";
import { RecentNoticesCard } from "./components/RecentNoticesCard";
import { SchoolInfoCard } from "./components/SchoolInfoCard";
import { TurmasBarChartCard } from "./components/TurmasBarChartCard";
import { UpcomingEventsCard } from "./components/UpcomingEventsCard";
import { ACCENT, getDashboardGestorTheme, turmasData } from "./utils";

export default function DashboardGestor() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = ACCENT;

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Bom dia"
      : today.getHours() < 18
      ? "Boa tarde"
      : "Boa noite";

  const totalAlunos = turmasData.reduce((acc, t) => acc + t.alunos, 0);
  const totalProfessores = mockUsers.filter((u) => u.role === "professor").length;
  const totalTurmas = turmasData.length;

  // Eventos próximos
  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 3);

  // Avisos recentes
  const recentNotices = [...mockNotices]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);

  const mediaEscolar = (
    turmasData.reduce((acc, turma) => acc + turma.mediaGeral, 0) / turmasData.length
  ).toFixed(1);

  return (
    <ThemeProvider theme={getDashboardGestorTheme(isDark)}>
      <DashboardLayout>
        <Box
          sx={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            bgcolor: "#ffffff",
            minHeight: "100vh",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <DashboardGestorHeader
              accent={accent}
              greeting={greeting}
              firstName={user?.nome.split(" ")[0] ?? "Gestor"}
            />

            {/* CHARTS */}
            <Grid container spacing={4} mb={5}>
              {/* Alunos por Turma */}
              <Grid size={{ xs: 12, lg: 6.5 }}>
                <TurmasBarChartCard accent={accent} data={[...turmasData]} />
              </Grid>

            </Grid>


            {/* BOTTOM SECTIONS */}
            <Grid container spacing={4}>
              {/* Próximos Eventos */}
              <Grid size={{ xs: 12, lg: 8 }}>
                <Box sx={{ mb: 5 }}>
                  <UpcomingEventsCard accent={accent} events={upcomingEvents} />
                </Box>

                {/* Info Card */}
                <Box>
                  <SchoolInfoCard
                    accent={accent}
                    totalTurmas={totalTurmas}
                    totalAlunos={totalAlunos}
                    totalProfessores={totalProfessores}
                    mediaEscolar={mediaEscolar}
                  />
                </Box>
              </Grid>

              {/* Avisos Recentes */}
              <Grid size={{ xs: 12, lg: 4 }}>
                <RecentNoticesCard accent={accent} notices={recentNotices} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
