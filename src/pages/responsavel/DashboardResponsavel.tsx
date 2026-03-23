"use client";

// ============================================================
// WebSchool — Mural do Responsável
// Design: Academic Warmth — cor âncora: laranja-âmbar #B45309
// ============================================================

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
  AssignmentOutlined,
  EventNoteOutlined,
  MenuBookOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockGrades, mockExams, mockNotices, mockUsers, mockCalendarEvents } from "@/lib/mockData";
import { BarChart2, FileText, Bell, User, Users } from "lucide-react";

const ACCENT = "#B45309";

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

export default function ResponsavelMural() {
  const { user } = useAuth();

  // Busca o aluno vinculado ao responsável
  const alunoVinculado = mockUsers.find((u) => u.id === user?.alunoId);
  const turmaAluno = alunoVinculado?.turma ?? "—";

  const avgGrade =
    mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;
  const avgFrequency =
    mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length;

  const today = new Date();
  const greeting = today.getHours() < 12 ? "Bom dia" : today.getHours() < 18 ? "Boa tarde" : "Boa noite";

  // Avisos de reunião e gerais para este responsável
  const reuniaoNotices = mockNotices.filter(
    (n) => n.destinatarios.includes("responsavel") && n.tipo === "reuniao"
  );
  const allMyNotices = mockNotices.filter((n) => n.destinatarios.includes("responsavel"));

  // Próximas provas da turma do aluno
  const upcomingExams = mockExams
    .filter((e) => !turmaAluno || e.turma === turmaAluno)
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  // Próximos eventos do calendário ligados à turma
  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 4);

  const statCards = [
    {
      title: "Média Geral",
      value: avgGrade.toFixed(1),
      subtitle: "Todas as disciplinas",
      icon: <BarChart2 size={16} color="#155E75" />,
      color: "#CFFAFE",
      textColor: "#155E75",
    },
    {
      title: "Frequência Média",
      value: `${avgFrequency.toFixed(0)}%`,
      subtitle: "Presença nas aulas",
      icon: <User size={16} color="#166534" />,
      color: "#DCFCE7",
      textColor: "#166534",
    },
    {
      title: "Provas Próximas",
      value: upcomingExams.length,
      subtitle: `Turma ${turmaAluno}`,
      icon: <FileText size={16} color="#6B21A8" />,
      color: "#EDE9FE",
      textColor: "#6B21A8",
    },
    {
      title: "Reuniões",
      value: reuniaoNotices.length,
      subtitle: "Agendadas",
      icon: <Bell size={16} color="#1D4ED8" />,
      color: "#DBEAFE",
      textColor: "#1D4ED8",
    },
  ];

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
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <Users size={20} color="white" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    {greeting}, {user?.nome.split(" ")[0]}!
                  </Typography>
                  <Typography variant="body1" color="#666">
                    {alunoVinculado
                      ? `Acompanhando ${alunoVinculado.nome} - Turma ${turmaAluno}`
                      : "Painel do Responsável"}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            {alunoVinculado && (
              <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#6B21A8", fontWeight: 700 }}>
                    {alunoVinculado.avatarInitials}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 220 }}>
                    <Typography fontWeight={700} color="#1F2937">{alunoVinculado.nome}</Typography>
                    <Typography variant="body2" color="#6B7280">RA: {alunoVinculado.ra} - Turma: {turmaAluno}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Badge color="#6B21A8">Aluno Vinculado</Badge>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="#6B7280">Você é responsável por este aluno</Typography>
                </Box>
              </Paper>
            )}

            <Grid container spacing={3} mb={4}>
              {statCards.map((card) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
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
                        boxShadow: "0 10px 25px rgba(180, 83, 9, 0.12)",
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

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <Paper sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography sx={sectionTitle}>
                      <MenuBookOutlined sx={{ fontSize: 20 }} />
                      Boletim de {alunoVinculado?.nome ?? "Aluno"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: ACCENT, cursor: "pointer", fontWeight: 600 }}>
                      Ver todas
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {mockGrades.slice(0, 5).map((grade) => {
                      const media = grade.media || 0;
                      const statusBg = media >= 7 ? "#10B981" : media >= 5 ? "#F59E0B" : "#EF4444";
                      const status = media >= 7 ? "Aprovado" : media >= 5 ? "Recuperação" : "Reprovado";
                      const chipBg = media >= 7 ? "#D1FAE5" : media >= 5 ? "#FEF3C7" : "#FEE2E2";
                      const chipColor = media >= 7 ? "#166534" : media >= 5 ? "#92400E" : "#991B1B";

                      return (
                        <Box
                          key={grade.disciplina}
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
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: statusBg,
                              }}
                            />
                            <Box>
                              <Typography fontWeight="bold" variant="body1" color="#1A1A1A">
                                {grade.disciplina}
                              </Typography>
                              <Typography variant="body2" color="#757575">
                                Média: {media.toFixed(1)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box display="flex" alignItems="center" gap={2}>
                            <Chip
                              label={status}
                              size="small"
                              sx={{
                                bgcolor: chipBg,
                                color: chipColor,
                                fontWeight: 600,
                                height: 32,
                              }}
                            />
                            <Typography variant="caption" color="#888">
                              {grade.frequencia}%
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Paper>

                <Paper sx={{ p: 4 }}>
                  <Typography sx={sectionTitle}>
                    <EventNoteOutlined sx={{ fontSize: 20 }} />
                    Próximos Eventos da Turma
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {upcomingEvents.length === 0 ? (
                      <p className="text-sm text-[#6B7280] text-center py-4">Nenhum evento próximo</p>
                    ) : (
                      upcomingEvents.map((ev) => (
                        <Box
                          key={ev.id}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "white",
                            border: "1px solid #E5E7EB",
                            transition: "border-color 0.2s",
                            "&:hover": { borderColor: ACCENT },
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="caption" fontWeight="bold" color={ACCENT}>
                              {ev.tipo?.charAt(0).toUpperCase() + ev.tipo?.slice(1)}
                            </Typography>
                            <Typography variant="caption" color="#999">
                              {new Date(ev.data).toLocaleDateString("pt-BR")}
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="bold" mb={0.5}>
                            {ev.titulo}
                          </Typography>
                          <Typography variant="caption" color="#666">
                            {ev.horario}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 4 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography sx={sectionTitle}>
                    <AssignmentOutlined sx={{ fontSize: 20 }} />
                    Próximas Provas
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {upcomingExams.length === 0 ? (
                      <p className="text-sm text-[#6B7280] text-center py-4">Nenhuma prova agendada</p>
                    ) : (
                      upcomingExams.slice(0, 3).map((exam) => (
                        <Box
                          key={exam.id}
                          sx={{
                            p: 2,
                            bgcolor: "#FEY9C3",
                            borderRadius: 2,
                            border: "1px solid #FDE68A",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Box sx={{ position: "absolute", top: 0, right: 0, p: 1, opacity: 0.2 }}>
                            <AssignmentOutlined />
                          </Box>
                          <Typography variant="body2" color="#92400E" fontWeight="bold" textTransform="uppercase" fontSize="0.75rem">
                            {exam.disciplina}
                          </Typography>
                          <Typography fontWeight="bold" variant="body1" color="#1A1A1A" mb={0.5}>
                            {exam.titulo}
                          </Typography>
                          <Box mt={1} display="flex" alignItems="center" gap={1}>
                            <Chip
                              label={new Date(exam.data).toLocaleDateString("pt-BR")}
                              size="small"
                              sx={{ bgcolor: "white", fontWeight: 600, fontSize: "0.75rem" }}
                            />
                            <Typography variant="caption" color="#666">
                              {exam.horario}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </Paper>

                <Paper sx={{ p: 3, flex: 1 }}>
                  <Typography sx={sectionTitle}>
                    <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
                    Avisos Importantes
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {allMyNotices.length === 0 ? (
                      <p className="text-sm text-[#6B7280] text-center py-4">Nenhum aviso</p>
                    ) : (
                      allMyNotices.slice(0, 2).map((notice) => (
                        <Box
                          key={notice.id}
                          sx={{
                            p: 2,
                            bgcolor: "white",
                            borderRadius: 2,
                            border: "1px solid #E5E7EB",
                            cursor: "pointer",
                            transition: "border-color 0.2s",
                            "&:hover": { borderColor: ACCENT },
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="caption" fontWeight="bold" color={ACCENT}>
                              {notice.tipo?.charAt(0).toUpperCase() + notice.tipo?.slice(1)}
                            </Typography>
                            <Typography variant="caption" color="#999">
                              {new Date(notice.data).toLocaleDateString("pt-BR")}
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="bold" mb={0.5}>
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
                      ))
                    )}
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
