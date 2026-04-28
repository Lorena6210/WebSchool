"use client";

// ============================================================
// WebSchool — Mural do Responsável
// Design: Academic Warmth — cor âncora: laranja-âmbar #B45309
// ============================================================

import React from "react";
import { Box, Container, Grid, ThemeProvider } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import { mockGrades } from "@/lib/mockData";
import { getTheme, getGreeting, getDashboardData } from "./utils";
import {
  MuralHeader,
  AlunoBanner,
  MuralStats,
  BoletimResumo,
  ProximosEventos,
  ProximasProvas,
  AvisosImportantes,
} from "./components";

export default function ResponsavelMural() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role);

  const greeting = getGreeting();
  const userName = user?.nome || "Responsável";
  const {
    alunoVinculado,
    turmaAluno,
    avgGrade,
    avgFrequency,
    reuniaoNotices,
    allMyNotices,
    upcomingExams,
    upcomingEvents,
  } = getDashboardData(user);

  return (
    <ThemeProvider theme={getTheme(isDark)}>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif", bgcolor: isDark ? "#0c0c14" : "#f2f7ff", minHeight: "100vh" }}>
          <Container maxWidth="lg">
            <MuralHeader
              isDark={isDark}
              accent={accent}
              greeting={greeting}
              userName={userName}
              alunoVinculado={alunoVinculado}
              turmaAluno={turmaAluno}
            />

            <AlunoBanner
              isDark={isDark}
              accent={accent}
              alunoVinculado={alunoVinculado}
              turmaAluno={turmaAluno}
            />w

            <MuralStats
              isDark={isDark}
              accent={accent}
              avgGrade={avgGrade}
              avgFrequency={avgFrequency}
              upcomingExamsCount={upcomingExams.length}
              turmaAluno={turmaAluno}
              reuniaoNoticesCount={reuniaoNotices.length}
            />

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <BoletimResumo
                  isDark={isDark}
                  accent={accent}
                  alunoVinculado={alunoVinculado}
                  mockGrades={mockGrades}
                />
                
                <Box mt={3}>
                  <ProximosEventos isDark={isDark} accent={accent} upcomingEvents={upcomingEvents} />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, lg: 4 }}>
                <ProximasProvas isDark={isDark} accent={accent} upcomingExams={upcomingExams} />
                <AvisosImportantes isDark={isDark} accent={accent} allMyNotices={allMyNotices} />
              </Grid>
            </Grid>
          </Container>
        </Box>
    </ThemeProvider>
  );
}