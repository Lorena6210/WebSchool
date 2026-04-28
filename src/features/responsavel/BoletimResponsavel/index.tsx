"use client";

import {
  Box,
  Container,
  Grid,
  ThemeProvider,
} from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { mockGrades } from "@/lib/mockData";
import { useAuth } from "@/lib/context/AuthContext";
import {
  theme,
  getMediaGeral,
  getFrequenciaMedia,
  getFinalRows,
  getChartData,
} from "./utils";
import {
  BoletimHeader,
  BoletimStats,
  BoletimTable,
  BoletimChart,
} from "./components";

export default function BoletimResponsavel() {
  const { user } = useAuth();
  const studentName = "Lucas Ferreira";
  const studentClass = "9º A";

  const mediaGeral = getMediaGeral(mockGrades);
  const frequenciaMedia = getFrequenciaMedia(mockGrades);

  const focusRows = ["Matemática", "Português"];
  const finalRows = getFinalRows(mockGrades, focusRows);
  const chartData = getChartData(finalRows);

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <BoletimHeader
              studentName={studentName}
              studentClass={studentClass}
            />

            <BoletimStats
              mediaGeral={mediaGeral}
              frequenciaMedia={frequenciaMedia}
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <BoletimTable finalRows={finalRows} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <BoletimChart chartData={chartData} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}

