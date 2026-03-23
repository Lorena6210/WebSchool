"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  BookOutlined,
  AssignmentOutlined,
  NotificationsNoneOutlined,
  School,
} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { mockActivities, mockExams, mockClassStudents, mockNotices } from "@/lib/mockData";
import { toast } from "sonner";

const ACCENT = "#166534";

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

// Modal para criar atividade
function ModalCriarAtividade({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    titulo: "",
    disciplina: "",
    descricao: "",
    dataEntrega: "",
  });

  const handleSubmit = () => {
    if (!form.titulo || !form.disciplina) {
      toast.error("Preencha título e disciplina.");
      return;
    }
    toast.success("Atividade criada com sucesso!");
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#1A1A1A" }}>
        Nova Atividade
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            fullWidth
            size="small"
          />
          <TextField
            label="Disciplina"
            value={form.disciplina}
            onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
            fullWidth
            size="small"
          />
          <TextField
            label="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            fullWidth
            multiline
            rows={2}
            size="small"
          />
          <TextField
            label="Data de Entrega"
            type="date"
            value={form.dataEntrega}
            onChange={(e) => setForm({ ...form, dataEntrega: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Box
          onClick={onClose}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            border: "1px solid #E5E7EB",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: "#F9F9F9" },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Cancelar
          </Typography>
        </Box>
        <Box
          onClick={handleSubmit}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            bgcolor: ACCENT,
            color: "white",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Salvar
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

// Modal para criar prova
function ModalCriarProva({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    titulo: "",
    disciplina: "",
    data: "",
    horario: "",
  });

  const handleSubmit = () => {
    if (!form.titulo || !form.disciplina || !form.data) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    toast.success("Prova criada com sucesso!");
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#1A1A1A" }}>
        Criar Prova
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            fullWidth
            size="small"
          />
          <TextField
            label="Disciplina"
            value={form.disciplina}
            onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
            fullWidth
            size="small"
          />
          <TextField
            label="Data"
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Horário"
            type="time"
            value={form.horario}
            onChange={(e) => setForm({ ...form, horario: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Box
          onClick={onClose}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            border: "1px solid #E5E7EB",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: "#F9F9F9" },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Cancelar
          </Typography>
        </Box>
        <Box
          onClick={handleSubmit}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            bgcolor: ACCENT,
            color: "white",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Salvar
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default function DashboardProfessor() {
  const { user } = useAuth();
  const [modalAtividade, setModalAtividade] = useState(false);
  const [modalProva, setModalProva] = useState(false);

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Bom dia"
      : today.getHours() < 18
      ? "Boa tarde"
      : "Boa noite";

  const turma = user?.turma ?? "9º A";
  const disciplinas = user?.disciplinas ?? ["Matemática"];

  // Estatísticas
  const totalActivities = mockActivities.length;
  const totalExams = mockExams.length;
  const avgGrade =
    mockClassStudents.length > 0
      ? mockClassStudents.reduce((sum, s) => sum + (s.media ?? 0), 0) /
        mockClassStudents.length
      : 0;

  // Dados para exibir
  const recentActivities = mockActivities.slice(0, 4);
  const nextExams = mockExams.slice(0, 3);
  const myNotices = mockNotices.slice(0, 2);

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

  const statCards = [
    {
      title: "Atividades",
      value: totalActivities,
      subtitle: "Criadas",
      icon: <BookOutlined />,
      color: "#D1FAE5",
      textColor: "#065F46",
    },
    {
      title: "Provas",
      value: totalExams,
      subtitle: "Agendadas",
      icon: <AssignmentOutlined />,
      color: "#FEF9C3",
      textColor: "#92400E",
    },
    {
      title: "Média Turma",
      value: avgGrade.toFixed(1),
      subtitle: "Todos os alunos",
      icon: <BookOutlined />,
      color: "#E0E7FF",
      textColor: "#4338CA",
    },
    {
      title: "Alunos",
      value: mockClassStudents.length,
      subtitle: `Turma ${turma}`,
      icon: <School />,
      color: "#F3E5F5",
      textColor: "#6B21A8",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        {modalAtividade && (
          <ModalCriarAtividade onClose={() => setModalAtividade(false)} />
        )}
        {modalProva && <ModalCriarProva onClose={() => setModalProva(false)} />}

        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
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
                    Turma {turma} · {disciplinas.join(", ")}
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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 3,
                mb: 5,
              }}
            >
              {statCards.map((card, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(22, 101, 52, 0.15)",
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
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color="#1A1A1A"
                    >
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* MAIN GRID */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
                gap: 4,
              }}
            >
              {/* Atividades Recentes */}
              <Paper sx={{ p: 4, height: "fit-content" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography sx={sectionTitle}>
                    <BookOutlined sx={{ fontSize: 20 }} />
                    Atividades Recentes
                  </Typography>
                  <Box
                    onClick={() => setModalAtividade(true)}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: ACCENT,
                      color: "white",
                      borderRadius: 1.5,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      "&:hover": { opacity: 0.9 },
                    }}
                  >
                    Nova Atividade
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {recentActivities.map((activity) => (
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
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor:
                              activity.status === "pendente"
                                ? "#F59E0B"
                                : "#10B981",
                          }}
                        />
                        <Box>
                          <Typography
                            fontWeight="bold"
                            variant="body1"
                            color="#1A1A1A"
                          >
                            {activity.titulo}
                          </Typography>
                          <Typography variant="body2" color="#757575">
                            {activity.disciplina}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Chip
                          label={
                            activity.status.charAt(0).toUpperCase() +
                            activity.status.slice(1)
                          }
                          size="small"
                          sx={{
                            bgcolor:
                              activity.status === "pendente"
                                ? "#FEF3C7"
                                : "#D1FAE5",
                            color:
                              activity.status === "pendente"
                                ? "#92400E"
                                : "#166534",
                            fontWeight: 600,
                            height: 32,
                          }}
                        />
                        <Typography variant="caption" color="#888">
                          {activity.dataEntrega}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Coluna Lateral */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: "100%",
                }}
              >
                {/* Próximas Provas */}
                <Paper sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography sx={sectionTitle}>
                      <AssignmentOutlined sx={{ fontSize: 20 }} />
                      Próximas Provas
                    </Typography>
                    <Box
                      onClick={() => setModalProva(true)}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        bgcolor: ACCENT,
                        color: "white",
                        borderRadius: 1,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "&:hover": { opacity: 0.9 },
                      }}
                    >
                      Nova
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {nextExams.map((exam) => (
                      <Box
                        key={exam.id}
                        sx={{
                          p: 2,
                          bgcolor: "#FEF9C3",
                          borderRadius: 2,
                          border: "1px solid #FDE68A",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="#92400E"
                          fontWeight="bold"
                          textTransform="uppercase"
                          fontSize="0.75rem"
                        >
                          {exam.disciplina}
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          variant="body1"
                          color="#1A1A1A"
                          mb={0.5}
                        >
                          {exam.titulo}
                        </Typography>
                        <Box mt={1} display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={exam.data}
                            size="small"
                            sx={{
                              bgcolor: "white",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />
                          <Typography variant="caption" color="#666">
                            {exam.horario}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                {/* Avisos */}
                <Paper sx={{ p: 3, flex: 1 }}>
                  <Typography sx={sectionTitle}>
                    <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
                    Avisos
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {myNotices.map((notice) => (
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
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={ACCENT}
                          >
                            {notice.tipo}
                          </Typography>
                          <Typography variant="caption" color="#999">
                            {notice.data}
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
              </Box>
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
