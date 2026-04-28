"use client";

// ============================================================
// WebSchool — Histórico Médico
// Design: Academic Warmth — Cards informativos com ícones
// ============================================================

import { Box, Container, Grid, ThemeProvider } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import { mockMedicalRecord } from "@/lib/mockData";
import { getHistoricoTheme, getHistoricoCards } from "./utils";
import {
  HistoricoHeader,
  HistoricoSummaryCards,
  AlergiasCard,
  ContatoEmergenciaCard,
  LaudosMedicosCard,
  ObservacoesMedicasCard,
  ConfidencialidadeAlert,
} from "./components";

export default function HistoricoMedico() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role);
  const record = mockMedicalRecord;
  const contato = record.contatoEmergencia;
  const summaryCards = getHistoricoCards(record, contato, user?.role);

  return (
    <ThemeProvider theme={getHistoricoTheme(isDark)}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <HistoricoHeader isDark={isDark} accent={accent} />

            <HistoricoSummaryCards isDark={isDark} cards={summaryCards} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <AlergiasCard isDark={isDark} accent={accent} alergias={record.alergias} />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <ContatoEmergenciaCard isDark={isDark} accent={accent} contato={contato} />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <LaudosMedicosCard isDark={isDark} accent={accent} laudos={record.laudos} />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <ObservacoesMedicasCard isDark={isDark} accent={accent} observacoes={record.observacoes} />
              </Grid>
            </Grid>

            <ConfidencialidadeAlert isDark={isDark} accent={accent} />
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}