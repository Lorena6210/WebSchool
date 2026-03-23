"use client";

import React from "react";
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
import {
  School,
  GroupsOutlined,
  BookOutlined,
  AssignmentOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { mockUsers, mockActivities, mockExams, mockCalendarEvents, mockNotices } from "@/lib/mockData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ACCENT = "#3B4FD8";

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

// Mock data
const turmasData = [
  { turma: "6º A", alunos: 28, mediaGeral: 7.2, aprovados: 24 },
  { turma: "6º B", alunos: 30, mediaGeral: 6.8, aprovados: 22 },
  { turma: "7º A", alunos: 27, mediaGeral: 7.5, aprovados: 25 },
  { turma: "7º B", alunos: 29, mediaGeral: 6.5, aprovados: 20 },
  { turma: "8º A", alunos: 31, mediaGeral: 7.8, aprovados: 28 },
  { turma: "9º A", alunos: 32, mediaGeral: 7.3, aprovados: 27 },
];

const mediasPorBimestre = [
  { nome: "1º Bim", "6º A": 7.1, "7º A": 7.4, "8º A": 7.9, "9º A": 7.1 },
  { nome: "2º Bim", "6º A": 7.3, "7º A": 7.6, "8º A": 7.7, "9º A": 7.5 },
  { nome: "3º Bim", "6º A": 6.9, "7º A": 7.5, "8º A": 8.0, "9º A": 7.2 },
  { nome: "4º Bim", "6º A": 7.4, "7º A": 7.8, "8º A": 7.8, "9º A": 7.6 },
];

export default function DashboardGestor() {
  const { user } = useAuth();

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

  const sectionTitle = {
    fontWeight: 700,
    letterSpacing: "0.05em",
    fontSize: "1.1rem",
    color: ACCENT,
    mb: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Box sx={{ width: "170vh", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            {/* HEADER */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <School sx={{ color: "white" }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    {greeting}, {user?.nome.split(" ")[0]}!
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Visão geral da escola - todos os dados em um lugar
                  </Typography>
                </Box>
              </Box>
              <Divider
                sx={{
                  borderColor: ACCENT,
                  width: "100px",
                  mt: 2,
                  borderBottomWidth: "2px",
                }}
              />
            </Box>

            {/* TOP CARDS */}
            {/* <Grid container spacing={3} mb={5}>
              {[
                {
                  title: "Total de Alunos",
                  value: totalAlunos,
                  subtitle: `${totalTurmas} turmas ativas`,
                  icon: <GroupsOutlined />,
                  color: "#E0E7FF",
                  textColor: "#4338CA",
                },
                {
                  title: "Professores",
                  value: totalProfessores,
                  subtitle: "Corpo docente",
                  icon: <School />,
                  color: "#D1FAE5",
                  textColor: "#065F46",
                },
                {
                  title: "Atividades",
                  value: mockActivities.length,
                  subtitle: "Este bimestre",
                  icon: <BookOutlined />,
                  color: "#FEF9C3",
                  textColor: "#92400E",
                },
                {
                  title: "Provas",
                  value: mockExams.length,
                  subtitle: "Agendadas",
                  icon: <AssignmentOutlined />,
                  color: "#F3E5F5",
                  textColor: "#6B21A8",
                },
              ].map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
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
                        boxShadow: "0 10px 25px rgba(59, 79, 216, 0.15)",
                      },
                      position: "relative",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
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
            </Grid> */}

            {/* CHARTS */}
            <Grid container spacing={4} mb={5} size={13}>
              {/* Alunos por Turma */}
              <Grid item xs={12} lg={9}>
                <Paper sx={{ p: 4, width: "145vh", height: "100%"}}>
                  <Typography sx={sectionTitle}>
                    <GroupsOutlined sx={{ fontSize: 20 }} />
                    Alunos por Turma
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={turmasData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="turma"
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                      <Tooltip
                        contentStyle={{
                          background: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                        }}
                      />
                      <Bar
                        dataKey="alunos"
                        fill={ACCENT}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Média por Bimestre
              <Grid item xs={12} lg={6}>
                <Paper sx={{ p: 4 }}>
                  <Typography sx={sectionTitle}>
                    <TrendingUpOutlined sx={{ fontSize: 20 }} />
                    Média Geral por Turma (4 Bimestres)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mediasPorBimestre}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="nome"
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <YAxis
                        domain={[5, 10]}
                        tick={{ fontSize: 12, fill: "#666" }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="6º A"
                        stroke="#3B4FD8"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="7º A"
                        stroke="#166534"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="8º A"
                        stroke="#B45309"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="9º A"
                        stroke="#6B21A8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid> */}
            </Grid>

            {/* TURMA TABLE */}
            {/* <Paper sx={{ p: 4,  width:"100%"}} >
              <Typography sx={sectionTitle}>Resumo por Turma</Typography>
              <Box sx={{ overflowX: "auto" }}>
                <table style={{ width: "80%", fontSize: "0.875rem", height: "'50%" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Turma
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Alunos
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Média Geral
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Aprovados
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        % Aprovação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {turmasData.map((t) => (
                      <tr
                        key={t.turma}
                        style={{
                          borderBottom: "1px solid #E5E7EB",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#FAFAFA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <td
                          style={{
                            padding: "12px",
                            fontWeight: 700,
                            color: "#1A1A1A",
                          }}
                        >
                          {t.turma}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            color: "#666",
                          }}
                        >
                          {t.alunos}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 700,
                            color: t.mediaGeral >= 7 ? "#166534" : "#B45309",
                          }}
                        >
                          {t.mediaGeral.toFixed(1)}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            color: "#666",
                          }}
                        >
                          {t.aprovados}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 2,
                              py: 0.5,
                              bgcolor:
                                (t.aprovados / t.alunos) * 100 >= 80
                                  ? "#D1FAE5"
                                  : "#FEF9C3",
                              color:
                                (t.aprovados / t.alunos) * 100 >= 80
                                  ? "#065F46"
                                  : "#92400E",
                              borderRadius: 1.5,
                              fontWeight: 600,
                              fontSize: "0.875rem",
                            }}
                          >
                            {((t.aprovados / t.alunos) * 100).toFixed(0)}%
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Paper> */}

            {/* BOTTOM SECTIONS */}
            <Grid container spacing={4} size={3}>
              {/* Próximos Eventos */}
              <Grid item xs={12} lg={4} size={4} gap={2}>
                <Grid item marginBottom={5}>
                <Paper sx={{ p: 3,  display: "flex", flexDirection: "column" }}>
                  <Typography sx={sectionTitle}>
                    <AssignmentOutlined sx={{ fontSize: 20 }} />
                    Próximos Eventos
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {upcomingEvents.map((event) => (
                      <Box
                        key={event.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "white",
                          border: "1px solid #E5E7EB",
                          transition: "border-color 0.2s",
                          "&:hover": { borderColor: ACCENT },
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={1}
                        >
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={ACCENT}
                            textTransform="uppercase"
                          >
                            {event.tipo}
                          </Typography>
                          <Typography variant="caption" color="#999">
                            {new Date(event.data).toLocaleDateString("pt-BR")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          mb={1}
                        >
                          {event.titulo}
                        </Typography>
                        {event.turma && (
                          <Chip
                            label={event.turma}
                            size="small"
                            sx={{
                              bgcolor: ACCENT,
                              color: "white",
                              fontWeight: 600,
                              height: 24,
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
                </Grid>

               {/* Info Card */}
              <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 3, bgcolor: "#F8FAFC" }}>
                  <Typography sx={sectionTitle}>
                    Informações da Escola
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="#666">
                        Turmas Ativas:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={ACCENT}
                      >
                        {totalTurmas}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="#666">
                        Total de Alunos:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={ACCENT}
                      >
                        {totalAlunos}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="#666">
                        Professores:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={ACCENT}
                      >
                        {totalProfessores}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="#666">
                        Média Escolar:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={ACCENT}
                      >
                        {(
                          turmasData.reduce((acc, t) => acc + t.mediaGeral, 0) /
                          turmasData.length
                        ).toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              </Grid>

              {/* Avisos Recentes */}
              <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography sx={sectionTitle}>
                    Últimos Avisos Enviados
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {recentNotices.map((notice) => (
                      <Box
                        key={notice.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "white",
                          border: "1px solid #E5E7EB",
                          cursor: "pointer",
                          transition: "border-color 0.2s",
                          "&:hover": { borderColor: ACCENT },
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Chip
                            label={notice.tipo}
                            size="small"
                            sx={{
                              bgcolor: ACCENT,
                              color: "white",
                              fontWeight: 600,
                              height: 24,
                            }}
                          />
                          <Typography variant="caption" color="#999">
                            {new Date(notice.data).toLocaleDateString("pt-BR")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          mb={0.5}
                        >
                          {notice.titulo}
                        </Typography>
                        {notice.mensagem && (
                          <Typography
                            variant="body2"
                            color="#555"
                            sx={{
                              fontSize: "0.9rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {notice.mensagem}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
