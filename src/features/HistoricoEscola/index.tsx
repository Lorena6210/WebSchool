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
import { mockGrades } from "@/lib/mockData";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";

const ACCENT = "#e5244a";

const getTheme = (isDark: boolean) => createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
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

export default function HistoricoEscola() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role) || ACCENT;

  const mediaGeral =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.media ?? 0), 0) / mockGrades.length
      : 0;

  const frequenciaMedia =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.frequencia ?? 0), 0) / mockGrades.length
      : 0;

  const acimaDaMedia = mockGrades.filter((item) => (item.media ?? 0) >= 7).length;
  const textPrimary = isDark ? "#f0f0f8" : "#0f2747";
  const textSecondary = isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)";
  const textMuted = isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.52)";
  const tableHeaderBg = isDark ? "#1a1a2c" : "#eef5ff";

  return (
    <ThemeProvider theme={getTheme(isDark)}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: accent, width: 48, height: 48, boxShadow: `0 0 16px ${accent}66` }}>
                  <GraduationCap size={20} color="white" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={textPrimary}>
                    Historico Escolar
                  </Typography>
                  <Typography variant="body1" color={textSecondary}>
                    Resumo academico do periodo atual.
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: accent, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            <Grid container spacing={3} mb={4}>
              {[
                {
                  title: "Media Geral",
                  value: mediaGeral.toFixed(2),
                  subtitle: "Desempenho consolidado",
                  icon: <TrendingUp size={16} color="#60a5fa" />,
                  color: "rgba(96,165,250,0.15)",
                  textColor: "#60a5fa",
                },
                {
                  title: "Disciplinas",
                  value: mockGrades.length,
                  subtitle: "No periodo atual",
                  icon: <BookOpen size={16} color={accent} />,
                  color: `${accent}26`,
                  textColor: accent,
                },
                {
                  title: "Aprovacoes Parciais",
                  value: `${acimaDaMedia}/${mockGrades.length}`,
                  subtitle: `Frequencia media ${frequenciaMedia.toFixed(0)}%`,
                  icon: <CheckCircle2 size={16} color="#4ade80" />,
                  color: "rgba(74,222,128,0.15)",
                  textColor: "#4ade80",
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
                        boxShadow: `0 10px 25px ${accent}40`,
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
                          color: textMuted,
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
                      <Typography variant="h4" fontWeight="bold" color={textPrimary}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color={textSecondary}>
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Paper sx={{ p: 0, overflow: "hidden" }}>
              <Box sx={{ p: 3, pb: 2 }}>
                <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: accent }}>
                  Tabela de desempenho
                </Typography>
                <Typography variant="body2" color={textSecondary} sx={{ mt: 0.5 }}>
                  Notas, frequencia e status por disciplina.
                </Typography>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: tableHeaderBg }}>
                      <TableCell sx={{ fontWeight: 700, color: textMuted, borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.1)" }}>Disciplina</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: "center", color: textMuted, borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.1)" }}>Media</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: "center", color: textMuted, borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.1)" }}>Frequencia</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: "center", color: textMuted, borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.1)" }}>Status</TableCell>
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
                            bgcolor: idx % 2 ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(15,39,71,0.03)") : "transparent",
                            "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.06)" },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: textPrimary, borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)" }}>{item.disciplina}</TableCell>
                          <TableCell sx={{ textAlign: "center", fontWeight: 700, color: textPrimary, borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)" }}>
                            {media.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: textSecondary, borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)" }}>{freq}%</TableCell>
                          <TableCell sx={{ textAlign: "center", borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)" }}>
                            <Chip
                              size="small"
                              label={aprovado ? "Aprovado" : "Em risco"}
                              sx={{
                                bgcolor: aprovado ? "rgba(74,222,128,0.15)" : `${accent}26`,
                                color: aprovado ? "#4ade80" : accent,
                                fontWeight: 700,
                                border: "none",
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
  );
}
