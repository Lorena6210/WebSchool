"use client";

import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMemo } from "react";
import { School } from "@mui/icons-material";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import { mockGrades } from "@/lib/mockData";
import BoletimHeader from "./components/BoletimHeader";
import BoletimPerformanceChart from "./components/BoletimPerformancesChart";
import BoletimPerformanceTable from "./components/BoletimPerformanceTable";
import BoletimStatsCards from "./components/BoletimStatsCards";
import { ACCENT, getBoletimStats } from "./utils";

const getTheme = (isDark: boolean) => createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: isDark ? "#12121e" : "#ffffff",
          boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(15,39,71,0.12)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
        },
      },
    },
  },
});

export default function BoletimAlunoView() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role) || ACCENT;
  const canLaunchGrades = user?.role === "professor" || user?.role === "gestor";
  const pageTheme = useMemo(() => getTheme(isDark), [isDark]);
  const { finalRows, chartData, summaryCards } = getBoletimStats(mockGrades);

  return (
    <ThemeProvider theme={pageTheme}>
      <DashboardLayout>
        <Box
          sx={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            bgcolor: isDark ? "#0c0c14" : "#f2f7ff",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <BoletimHeader
              isDark={isDark}
              accent={accent}
              title={canLaunchGrades ? "Lançar Notas" : "Boletim"}
              subtitle={canLaunchGrades ? "Atualize notas e frequencia por disciplina." : "Consulte notas, frequencia e situacao por disciplina."}
              icon={<School sx={{ color: isDark ? "#f0f0f8" : "#ffffff" }} />}
              action={
                canLaunchGrades ? (
                  <button
                    onClick={() => toast.info("Fluxo de lançamento completo será conectado ao backend.")}
                    className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all active:translate-y-0.5"
                    style={{
                      backgroundColor: accent,
                      color: "#f0f0f8",
                      border: `1px solid ${accent}88`,
                      boxShadow: `0 0 12px ${accent}66`,
                    }}
                  >
                    <Plus size={16} /> Lançar Nota
                  </button>
                ) : undefined
              }
            />

            <BoletimStatsCards
              isDark={isDark}
              cards={summaryCards}
              hoverShadow={isDark ? "0 10px 25px rgba(229,36,74,0.25)" : "0 10px 25px rgba(15,39,71,0.16)"}
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <BoletimPerformanceTable isDark={isDark} rows={finalRows} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <BoletimPerformanceChart isDark={isDark} accent={accent} data={chartData} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
