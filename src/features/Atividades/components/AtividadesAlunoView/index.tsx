"use client";

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { mockActivities } from "@/lib/mockData";
import { School, BookOutlined, AssignmentOutlined, NotificationsNoneOutlined } from "@mui/icons-material";

type FilterType = "todos" | "pendente" | "entregue" | "atrasado";
const ACCENT = "#e5244a";
const ACCENT_LIGHT = "rgba(229,36,74,0.15)";

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
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(15,39,71,0.12)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.82rem",
        },
      },
    },
  },
});

export default function AtividadesAlunoView() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const [filter, setFilter] = useState<FilterType>("todos");
  const pageTheme = useMemo(() => getTheme(isDark), [isDark]);

  const pendingCount = mockActivities.filter((a) => a.status === "pendente").length;
  const deliveredCount = mockActivities.filter((a) => a.status === "entregue").length;
  const lateCount = mockActivities.filter((a) => a.status === "atrasado").length;

  const filtered =
    filter === "todos"
      ? mockActivities
      : mockActivities.filter((a) => a.status === filter);

  const statusConfig: Record<Exclude<FilterType, "todos">, { color: string; bg: string; label: string }> = {
    entregue: { color: "#4ade80", bg: "rgba(74,222,128,0.15)", label: "Entregue" },
    atrasado: { color: "#f87171", bg: "rgba(248,113,113,0.15)", label: "Atrasado" },
    pendente: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)", label: "Pendente" },
  };

  const greeting = "Atividades da turma";
  const titleColor = isDark ? "#f0f0f8" : "#0f2747";
  const subtitleColor = isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)";
  const subtleText = isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.5)";
  const cardSurface = isDark ? "#1a1a2c" : "#f7faff";
  const cardHoverSurface = isDark ? "#20203a" : "#eef5ff";
  const neutralChipBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)";
  const neutralChipBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,39,71,0.16)";

  return (
    <ThemeProvider theme={pageTheme}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48, boxShadow: "0 0 20px rgba(229,36,74,0.35)" }}>
                  <School sx={{ color: "white" }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={titleColor}>
                    {greeting}
                  </Typography>
                  <Typography variant="body1" color={subtitleColor}>
                    {user?.nome?.split(" ")[0]}, acompanhe suas atividades e prazos de entrega.
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            <Grid container spacing={3} mb={5}>
              {[
                {
                  title: "Atividades Pendentes",
                  value: pendingCount,
                  subtitle: "Para entregar",
                  icon: <BookOutlined />,
                  color: "rgba(251,191,36,0.12)",
                  textColor: "#fbbf24",
                },
                {
                  title: "Atividades Entregues",
                  value: deliveredCount,
                  subtitle: "Concluídas",
                  icon: <AssignmentOutlined />,
                  color: "rgba(74,222,128,0.12)",
                  textColor: "#4ade80",
                },
                {
                  title: "Atividades em Atraso",
                  value: lateCount,
                  subtitle: "Requer atenção",
                  icon: <NotificationsNoneOutlined />,
                  color: "rgba(248,113,113,0.12)",
                  textColor: "#f87171",
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
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        borderColor: "rgba(229,36,74,0.3)",
                      },
                      position: "relative",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box position="absolute" left={0} top={0} bottom={0} sx={{ width: "4px", borderRadius: "8px 0 0 8px" }} bgcolor={card.textColor} />
                      <Typography
                        variant="overline"
                        sx={{
                          fontWeight: 700,
                          letterSpacing: 1,
                          color: subtleText,
                          textTransform: "uppercase",
                          fontSize: "0.75rem",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: card.color, display: "flex", alignItems: "center", justifyContent: "center", color: card.textColor }}>
                        {card.icon}
                      </Box>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h3" fontWeight="bold" color={titleColor}>{card.value}</Typography>
                      <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)"}>{card.subtitle}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {(["todos", "pendente", "entregue", "atrasado"] as FilterType[]).map((item) => (
                <Chip
                  key={item}
                  label={item === "todos" ? "Todos" : item}
                  clickable
                  onClick={() => setFilter(item)}
                  sx={{
                    px: 1,
                    textTransform: "capitalize",
                    color: filter === item ? "#fff" : subtitleColor,
                    border: "1px solid",
                    borderColor: filter === item ? ACCENT : neutralChipBorder,
                    bgcolor: filter === item ? ACCENT : neutralChipBg,
                    "&:hover": { bgcolor: filter === item ? ACCENT : ACCENT_LIGHT },
                  }}
                />
              ))}
            </Box>

            <Paper sx={{ p: 4 }}>
              <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.1rem", color: ACCENT, mb: 2 }}>
                Lista de Atividades
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filtered.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography color={subtleText}>Nenhuma atividade encontrada.</Typography>
                  </Box>
                ) : (
                  filtered.map((activity) => {
                    const config = statusConfig[activity.status as Exclude<FilterType, "todos">];
                    return (
                      <Box
                        key={activity.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 2,
                          borderRadius: 2,
                          bgcolor: cardSurface,
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: cardHoverSurface,
                            borderColor: "rgba(229,36,74,0.2)",
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: config.color }} />
                          <Box>
                            <Typography fontWeight="bold" variant="body1" color={titleColor}>{activity.titulo}</Typography>
                            <Typography variant="body2" color={subtitleColor}>{activity.disciplina}</Typography>
                            <Typography variant="caption" color={subtleText}>Turma {activity.turma} • Prof. {activity.professorNome}</Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Chip
                            label={config.label}
                            size="small"
                            sx={{
                              bgcolor: config.bg,
                              color: config.color,
                              fontWeight: 600,
                              height: 30,
                              border: `1px solid ${config.color}44`,
                            }}
                          />
                          {activity.nota ? (
                            <Typography variant="caption" color="#4ade80" fontWeight={700}>Nota: {activity.nota}</Typography>
                          ) : null}
                          <Typography variant="caption" color={subtleText}>{activity.dataEntrega}</Typography>
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Paper>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
