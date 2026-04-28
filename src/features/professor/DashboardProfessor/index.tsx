"use client";

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  AssignmentOutlined,
  BookOutlined,
  NotificationsNoneOutlined,
  School,
} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import { mockActivities, mockClassStudents, mockExams, mockNotices } from "@/lib/mockData";
import { toast } from "sonner";

const DEFAULT_ACCENT = "#059669";

const getDashboardTheme = (isDark: boolean, accent: string) =>
  createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.35)" : "0 4px 20px rgba(15,39,71,0.12)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
            backgroundColor: isDark ? "#12121e" : "#ffffff",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? "#12121e" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              color: isDark ? "#f0f0f8" : "#0f2747",
              "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,39,71,0.16)" },
              "&:hover fieldset": { borderColor: `${accent}66` },
              "&.Mui-focused fieldset": { borderColor: accent },
            },
            "& .MuiInputLabel-root": { color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.62)" },
            "& .MuiInputLabel-root.Mui-focused": { color: accent },
          },
        },
      },
    },
  });

type ModalProps = {
  onClose: () => void;
  isDark: boolean;
  accent: string;
};

function ModalCriarAtividade({ onClose, isDark, accent }: ModalProps) {
  const [form, setForm] = useState({
    titulo: "",
    disciplina: "",
    descricao: "",
    dataEntrega: "",
  });

  const handleSubmit = () => {
    if (!form.titulo || !form.disciplina) {
      toast.error("Preencha titulo e disciplina.");
      return;
    }
    toast.success("Atividade criada com sucesso!");
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: isDark ? "#f0f0f8" : "#0f2747" }}>
        Nova Atividade
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Titulo"
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
            label="Descricao"
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
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.2)",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.05)" },
          }}
        >
          <Typography variant="body2" fontWeight={600} color={isDark ? "#f0f0f8" : "#0f2747"}>
            Cancelar
          </Typography>
        </Box>
        <Box
          onClick={handleSubmit}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
            color: "#f0f0f8",
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

function ModalCriarProva({ onClose, isDark, accent }: ModalProps) {
  const [form, setForm] = useState({
    titulo: "",
    disciplina: "",
    data: "",
    horario: "",
  });

  const handleSubmit = () => {
    if (!form.titulo || !form.disciplina || !form.data) {
      toast.error("Preencha todos os campos obrigatorios.");
      return;
    }
    toast.success("Prova criada com sucesso!");
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: isDark ? "#f0f0f8" : "#0f2747" }}>
        Criar Prova
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Titulo"
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
            label="Horario"
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
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.2)",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.05)" },
          }}
        >
          <Typography variant="body2" fontWeight={600} color={isDark ? "#f0f0f8" : "#0f2747"}>
            Cancelar
          </Typography>
        </Box>
        <Box
          onClick={handleSubmit}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
            color: "#f0f0f8",
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
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role) || DEFAULT_ACCENT;

  const [modalAtividade, setModalAtividade] = useState(false);
  const [modalProva, setModalProva] = useState(false);

  const pageTheme = useMemo(() => getDashboardTheme(isDark, accent), [isDark, accent]);

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Bom dia"
      : today.getHours() < 18
        ? "Boa tarde"
        : "Boa noite";

  const turma = user?.turma ?? "9o A";
  const disciplinas = user?.disciplinas ?? ["Matematica"];

  const totalActivities = mockActivities.length;
  const totalExams = mockExams.length;
  const avgGrade =
    mockClassStudents.length > 0
      ? mockClassStudents.reduce((sum, s) => sum + (s.media ?? 0), 0) / mockClassStudents.length
      : 0;

  const recentActivities = mockActivities.slice(0, 4);
  const nextExams = mockExams.slice(0, 3);
  const myNotices = mockNotices.slice(0, 2);

  const textPrimary = isDark ? "#f0f0f8" : "#0f2747";
  const textSecondary = isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.68)";
  const textMuted = isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.55)";

  const sectionTitle = {
    fontWeight: 700,
    letterSpacing: "0.05em",
    fontSize: "1.05rem",
    color: accent,
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
      color: `${accent}22`,
      textColor: accent,
    },
    {
      title: "Provas",
      value: totalExams,
      subtitle: "Agendadas",
      icon: <AssignmentOutlined />,
      color: "rgba(245,158,11,0.15)",
      textColor: "#F59E0B",
    },
    {
      title: "Media Turma",
      value: avgGrade.toFixed(1),
      subtitle: "Todos os alunos",
      icon: <BookOutlined />,
      color: "rgba(99,102,241,0.15)",
      textColor: "#818CF8",
    },
    {
      title: "Alunos",
      value: mockClassStudents.length,
      subtitle: `Turma ${turma}`,
      icon: <School />,
      color: "rgba(168,85,247,0.15)",
      textColor: "#C084FC",
    },
  ];

  return (
    <ThemeProvider theme={pageTheme}>
      <DashboardLayout>
        {modalAtividade && (
          <ModalCriarAtividade
            isDark={isDark}
            accent={accent}
            onClose={() => setModalAtividade(false)}
          />
        )}
        {modalProva && (
          <ModalCriarProva
            isDark={isDark}
            accent={accent}
            onClose={() => setModalProva(false)}
          />
        )}

        <Box
          sx={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            bgcolor: isDark ? "#0c0c14" : "#f2f7ff",
            minHeight: "100vh",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: accent, width: 48, height: 48, boxShadow: `0 0 18px ${accent}66` }}>
                  <School sx={{ color: "#ffffff" }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={textPrimary}>
                    {greeting}, {user?.nome.split(" ")[0]}!
                  </Typography>
                  <Typography variant="body1" color={textSecondary}>
                    Turma {turma} · {disciplinas.join(", ")}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: accent, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

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
                      transform: "translateY(-2px)",
                      boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 28px rgba(15,39,71,0.18)",
                      borderColor: `${accent}4d`,
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
                      sx={{ width: "4px", borderRadius: "16px 0 0 16px" }}
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
                        color: card.textColor,
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography variant="h3" fontWeight="bold" color={textPrimary}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color={textSecondary}>
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 4 }}>
              <Paper sx={{ p: 4, height: "fit-content" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography sx={sectionTitle}>
                    <BookOutlined sx={{ fontSize: 20 }} />
                    Atividades Recentes
                  </Typography>
                  <Box
                    onClick={() => setModalAtividade(true)}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: accent,
                      color: "#f0f0f8",
                      borderRadius: 1.5,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      border: `1px solid ${accent}88`,
                      boxShadow: `0 0 10px ${accent}55`,
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
                        bgcolor: isDark ? "#1a1a2c" : "#f7faff",
                        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: `${accent}4d`,
                          transform: "translateY(-2px)",
                          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15,39,71,0.16)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: activity.status === "pendente" ? "#F59E0B" : "#10B981",
                          }}
                        />
                        <Box>
                          <Typography fontWeight="bold" variant="body1" color={textPrimary}>
                            {activity.titulo}
                          </Typography>
                          <Typography variant="body2" color={textSecondary}>
                            {activity.disciplina}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Chip
                          label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          size="small"
                          sx={{
                            bgcolor:
                              activity.status === "pendente"
                                ? "rgba(245,158,11,0.15)"
                                : "rgba(16,185,129,0.15)",
                            color: activity.status === "pendente" ? "#F59E0B" : "#10B981",
                            fontWeight: 600,
                            height: 32,
                            border: "1px solid",
                            borderColor:
                              activity.status === "pendente"
                                ? "rgba(245,158,11,0.3)"
                                : "rgba(16,185,129,0.3)",
                          }}
                        />
                        <Typography variant="caption" color={textMuted}>
                          {activity.dataEntrega}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography sx={sectionTitle}>
                      <AssignmentOutlined sx={{ fontSize: 20 }} />
                      Proximas Provas
                    </Typography>
                    <Box
                      onClick={() => setModalProva(true)}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        bgcolor: accent,
                        color: "#f0f0f8",
                        borderRadius: 1,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        border: `1px solid ${accent}88`,
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
                          bgcolor: "rgba(245,158,11,0.08)",
                          borderRadius: 2,
                          border: "1px solid rgba(245,158,11,0.2)",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "rgba(245,158,11,0.4)",
                            transform: "translateY(-2px)",
                            boxShadow: isDark ? "0 8px 28px rgba(0,0,0,0.35)" : "0 8px 20px rgba(15,39,71,0.12)",
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="#F59E0B"
                          fontWeight="bold"
                          textTransform="uppercase"
                          fontSize="0.75rem"
                        >
                          {exam.disciplina}
                        </Typography>
                        <Typography fontWeight="bold" variant="body1" color={textPrimary} mb={0.5}>
                          {exam.titulo}
                        </Typography>
                        <Box mt={1} display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={exam.data}
                            size="small"
                            sx={{
                              bgcolor: "rgba(245,158,11,0.12)",
                              color: "#F59E0B",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              border: "1px solid rgba(245,158,11,0.25)",
                            }}
                          />
                          <Typography variant="caption" color={textSecondary}>
                            {exam.horario}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>

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
                          bgcolor: isDark ? "#1a1a2c" : "#f7faff",
                          borderRadius: 2,
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: `${accent}4d`,
                            transform: "translateY(-2px)",
                            boxShadow: isDark ? "0 8px 28px rgba(0,0,0,0.35)" : "0 8px 20px rgba(15,39,71,0.12)",
                          },
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="caption" fontWeight="bold" color={accent}>
                            {notice.tipo}
                          </Typography>
                          <Typography variant="caption" color={textMuted}>
                            {notice.data}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold" mb={0.5} color={textPrimary}>
                          {notice.titulo}
                        </Typography>
                        {notice.mensagem && (
                          <Typography
                            variant="body2"
                            color={textSecondary}
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
