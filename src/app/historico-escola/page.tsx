"use client";

import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { GraduationCap, TrendingUp, BookOpen, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { mockGrades } from "@/lib/mockData";

const ACCENT = "#0F766E";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.03)",
        },
      },
    },
  },
});

export default function HistoricoEscolaPage() {
  const mediaGeral =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.media ?? 0), 0) / mockGrades.length
      : 0;

  const frequenciaMedia =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.frequencia ?? 0), 0) / mockGrades.length
      : 0;

  const acimaDaMedia = mockGrades.filter((item) => (item.media ?? 0) >= 7).length;

  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel"]}>
      <ThemeProvider theme={theme}>
        <DashboardLayout>
          <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
            <Container maxWidth="lg">
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                    <GraduationCap size={20} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                      Historico Escolar
                    </Typography>
                    <Typography variant="body1" color="#666">
                      Resumo academico do periodo atual.
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
              </Box>

              <Grid container spacing={3} mb={4}>
                {[
                  {
                    title: "Media Geral",
                    value: mediaGeral.toFixed(2),
                    subtitle: "Desempenho consolidado",
                    icon: <TrendingUp size={16} color="#155E75" />,
                    color: "#CFFAFE",
                    textColor: "#155E75",
                  },
                  {
                    title: "Disciplinas",
                    value: mockGrades.length,
                    subtitle: "No periodo atual",
                    icon: <BookOpen size={16} color="#1E40AF" />,
                    color: "#DBEAFE",
                    textColor: "#1E40AF",
                  },
                  {
                    title: "Aprovacoes Parciais",
                    value: `${acimaDaMedia}/${mockGrades.length}`,
                    subtitle: `Frequencia media ${frequenciaMedia.toFixed(0)}%`,
                    icon: <CheckCircle2 size={16} color="#166534" />,
                    color: "#DCFCE7",
                    textColor: "#166534",
                  },
                ].map((card) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 25px rgba(15, 118, 110, 0.12)",
                        },
                        position: "relative",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box
                          position="absolute"
                          left={0}
                          top={0}
                          bottom={0}
                          sx={{ width: "8px" }}
                          bgcolor={card.textColor}
                        />
                        <Typography
                          variant="overline"
                          sx={{
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: "#888",
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: card.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {card.icon}
                        </Box>
                      </Box>

                      <Box mt={2}>
                        <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                          {card.value}
                        </Typography>
                        <Typography variant="body2" color="#666">
                          {card.subtitle}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Paper sx={{ p: 0, overflow: "hidden" }}>
                <Box sx={{ p: 3, pb: 2 }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: ACCENT }}>
                    Tabela de desempenho
                  </Typography>
                  <Typography variant="body2" color="#666" sx={{ mt: 0.5 }}>
                    Notas, frequencia e status por disciplina.
                  </Typography>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                        <TableCell sx={{ fontWeight: 700 }}>Disciplina</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Media</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Frequencia</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockGrades.map((item, idx) => {
                        const media = item.media ?? 0;
                        const freq = item.frequencia ?? 0;
                        const aprovado = media >= 7;

                        return (
                          <TableRow
                            key={`${item.disciplina}-${idx}`}
                            sx={{
                              bgcolor: idx % 2 ? "#FCFCFD" : "white",
                              "&:hover": { bgcolor: "#F8FAFC" },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 600 }}>{item.disciplina}</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: 700 }}>
                              {media.toFixed(2)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{freq}%</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <Chip
                                size="small"
                                label={aprovado ? "Aprovado" : "Em risco"}
                                sx={{
                                  bgcolor: aprovado ? "#DCFCE7" : "#FEE2E2",
                                  color: aprovado ? "#166534" : "#991B1B",
                                  fontWeight: 700,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
          </Box>
        </DashboardLayout>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
