"use client";

import React, { useState } from "react";
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
import { mockActivities } from "@/lib/mockData";
import { School, BookOutlined, AssignmentOutlined, NotificationsNoneOutlined } from "@mui/icons-material";

type FilterType = "todos" | "pendente" | "entregue" | "atrasado";
const ACCENT = "#6B21A8";
const ACCENT_LIGHT = "#F3E5F5";

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
  const [filter, setFilter] = useState<FilterType>("todos");

  const pendingCount = mockActivities.filter((a) => a.status === "pendente").length;
  const deliveredCount = mockActivities.filter((a) => a.status === "entregue").length;
  const lateCount = mockActivities.filter((a) => a.status === "atrasado").length;

  const filtered =
    filter === "todos"
      ? mockActivities
      : mockActivities.filter((a) => a.status === filter);

  const statusConfig: Record<Exclude<FilterType, "todos">, { color: string; bg: string; label: string }> = {
    entregue: {
      color: "#166534",
      bg: "#DCFCE7",
      label: "Entregue",
    },
    atrasado: {
      color: "#DC2626",
      bg: "#FEE2E2",
      label: "Atrasado",
    },
    pendente: {
      color: "#B45309",
      bg: "#FEF3C7",
      label: "Pendente",
    },
  };

  const greeting = "Atividades da turma";

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <School sx={{ color: "white" }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    {greeting}
                  </Typography>
                  <Typography variant="body1" color="#666">
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
                  color: "#FDE68A",
                  textColor: "#92400E",
                },
                {
                  title: "Atividades Entregues",
                  value: deliveredCount,
                  subtitle: "Concluídas",
                  icon: <AssignmentOutlined />,
                  color: "#D1FAE5",
                  textColor: "#065F46",
                },
                {
                  title: "Atividades em Atraso",
                  value: lateCount,
                  subtitle: "Requer atenção",
                  icon: <NotificationsNoneOutlined />,
                  color: "#FEE2E2",
                  textColor: "#991B1B",
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
                        boxShadow: "0 10px 25px rgba(107, 33, 168, 0.15)",
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
                          color: card.textColor,
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>

                    <Box mt={2}>
                      <Typography variant="h3" fontWeight="bold" color="#1A1A1A">
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
                    bgcolor: filter === item ? ACCENT : "#fff",
                    color: filter === item ? "#fff" : "#666",
                    border: "1px solid",
                    borderColor: filter === item ? ACCENT : "#E5E7EB",
                    "&:hover": {
                      bgcolor: filter === item ? ACCENT : ACCENT_LIGHT,
                    },
                  }}
                />
              ))}
            </Box>

            <Paper sx={{ p: 4 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  fontSize: "1.1rem",
                  color: ACCENT,
                  mb: 2,
                }}
              >
                Lista de Atividades
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filtered.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography color="#666">Nenhuma atividade encontrada.</Typography>
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
                          bgcolor: "white",
                          border: "1px solid #eee",
                          transition: "background 0.2s",
                          "&:hover": { bgcolor: "#FAFAFA" },
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: config.color }} />
                          <Box>
                            <Typography fontWeight="bold" variant="body1" color="#1A1A1A">
                              {activity.titulo}
                            </Typography>
                            <Typography variant="body2" color="#757575">
                              {activity.disciplina}
                            </Typography>
                            <Typography variant="caption" color="#999">
                              Turma {activity.turma} • Prof. {activity.professorNome}
                            </Typography>
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
                            }}
                          />
                          {activity.nota ? (
                            <Typography variant="caption" color="#166534" fontWeight={700}>
                              Nota: {activity.nota}
                            </Typography>
                          ) : null}
                          <Typography variant="caption" color="#888">
                            {activity.dataEntrega}
                          </Typography>
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
