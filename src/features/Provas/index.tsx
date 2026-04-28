"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useExams } from "@/hooks/useExams";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
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
import { AssignmentOutlined, Search, School, TimerOutlined } from "@mui/icons-material";
import { Plus } from "lucide-react";

const ACCENT_ALUNO = "#e5244a";

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

// ── Modal Criar Prova ────────────────────────────────────────
function ModalCriarProva({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const modalBg = isDark ? "#12121e" : "#ffffff";
  const fieldBg = isDark ? "#1a1a2c" : "#f7faff";
  const fieldBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(15,39,71,0.18)";
  const textPrimary = isDark ? "#f0f0f8" : "#0f2747";
  const textMuted = isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.56)";

  const [form, setForm] = useState({
    titulo: "", disciplina: "", conteudo: "", data: "", horario: "", sala: "", turma: "",
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="rounded-2xl p-6 w-full max-w-md"
        style={{
          backgroundColor: modalBg,
          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ fontFamily: "'Fraunces', serif", color: textPrimary }}
        >
          Nova Prova
        </h2>
        <div className="space-y-3">
          <input
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            placeholder="Título da prova"
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.disciplina}
              onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
              placeholder="Disciplina"
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
            />
            <input
              value={form.turma}
              onChange={(e) => setForm({ ...form, turma: e.target.value })}
              placeholder="Turma (ex: 9º A)"
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
            />
          </div>
          <textarea
            value={form.conteudo}
            onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
            placeholder="Conteúdo abordado"
            rows={2}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
            style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="text-xs uppercase tracking-wide"
                style={{ color: textMuted }}
              >
                Data
              </label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none"
                style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
              />
            </div>
            <div>
              <label
                className="text-xs uppercase tracking-wide"
                style={{ color: textMuted }}
              >
                Horário
              </label>
              <input
                type="time"
                value={form.horario}
                onChange={(e) => setForm({ ...form, horario: e.target.value })}
                className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none"
                style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
              />
            </div>
          </div>
          <input
            value={form.sala}
            onChange={(e) => setForm({ ...form, sala: e.target.value })}
            placeholder="Sala"
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ backgroundColor: fieldBg, border: `1px solid ${fieldBorder}`, color: textPrimary }}
          />
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => {
              if (!form.titulo || !form.data) { toast.error("Preencha título e data."); return; }
              toast.success("Prova criada com sucesso!");
              onClose();
            }}
            className="flex-1 font-semibold py-2 rounded-lg text-sm transition-all"
            style={{ backgroundColor: "#e5244a", color: "white" }}
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="flex-1 font-semibold py-2 rounded-lg text-sm transition-all"
            style={{
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.2)",
              color: isDark ? "rgba(240,240,248,0.7)" : "rgba(15,39,71,0.7)",
              backgroundColor: "transparent",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MainView() {
  const { exams, isLoading, error } = useExams();
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pageTheme = useMemo(() => getTheme(isDark), [isDark]);

  const canCreate = user?.role === "professor" || user?.role === "gestor";
  const isResponsavel = user?.role === "responsavel";

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filtered = exams.filter(
    (e) =>
      e.titulo.toLowerCase().includes(search.toLowerCase()) ||
      e.disciplina.toLowerCase().includes(search.toLowerCase()) ||
      (e.turma && e.turma.toLowerCase().includes(search.toLowerCase()))
  );

  const accentColor = getRoleAccent(user?.role) || ACCENT_ALUNO;
  const userFirstName = user?.nome?.split(" ")[0] ?? "";
  const upcomingExams = exams.filter((exam) => new Date(exam.data) >= new Date());
  const textPrimary = isDark ? "#f0f0f8" : "#0f2747";
  const textSecondary = isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)";
  const textMuted = isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.5)";
  const listBg = isDark ? "#1a1a2c" : "#f7faff";
  const listBgHover = isDark ? "#20203a" : "#eef5ff";
  const listBorder = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)";

  return (
    <ThemeProvider theme={pageTheme}>
      <DashboardLayout>
        {modalOpen && <ModalCriarProva isDark={isDark} onClose={() => setModalOpen(false)} />}
        <Box
          sx={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            bgcolor: isDark ? "#0c0c14" : "#f2f7ff",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: accentColor || ACCENT_ALUNO,
                      width: 48,
                      height: 48,
                      boxShadow: `0 0 20px ${accentColor}55`,
                    }}
                  >
                    <School sx={{ color: "white" }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color={textPrimary}>
                      Provas
                    </Typography>
                    <Typography variant="body1" color={textSecondary}>
                      {canCreate
                        ? `Gestão de provas${userFirstName ? `, ${userFirstName}` : ""}.`
                        : isResponsavel
                        ? "Provas agendadas para o seu filho(a)."
                        : "Suas próximas avaliações."}
                    </Typography>
                  </Box>
                </Box>

                {canCreate ? (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg text-sm transition-all"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 16px ${accentColor}44`,
                    }}
                  >
                    <Plus size={16} /> Nova Prova
                  </button>
                ) : null}
              </Box>
              <Divider sx={{ borderColor: accentColor, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            <Grid container spacing={3} mb={4}>
              {[
                {
                  title: "Total de Provas",
                  value: exams.length,
                  subtitle: "Cadastro geral",
                  icon: <AssignmentOutlined />,
                  color: "rgba(96,165,250,0.12)",
                  textColor: "#60a5fa",
                },
                {
                  title: "Próximas Provas",
                  value: upcomingExams.length,
                  subtitle: "Ainda não realizadas",
                  icon: <TimerOutlined />,
                  color: "rgba(251,191,36,0.12)",
                  textColor: "#fbbf24",
                },
                {
                  title: "Resultado da Busca",
                  value: filtered.length,
                  subtitle: "Itens filtrados",
                  icon: <Search />,
                  color: "rgba(74,222,128,0.12)",
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
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        borderColor: `${accentColor}4d`,
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
                        sx={{ width: "4px", borderRadius: "8px 0 0 8px" }}
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
                      <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)"}>
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Paper sx={{ p: 4 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  fontSize: "1.1rem",
                  color: accentColor,
                  mb: 2,
                }}
              >
                Lista de Provas
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {isLoading ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography color={textMuted}>Carregando provas...</Typography>
                  </Box>
                ) : filtered.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography color={textMuted}>Nenhuma prova encontrada.</Typography>
                  </Box>
                ) : (
                  filtered.map((exam) => (
                    <Box
                      key={exam.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: 2,
                        bgcolor: listBg,
                        border: listBorder,
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: listBgHover,
                          borderColor: `${accentColor}33`,
                        },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold" variant="body1" color={textPrimary}>
                          {exam.titulo}
                        </Typography>
                        <Box sx={{ mt: 0.7, display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip
                            label={exam.disciplina}
                            size="small"
                            sx={{ bgcolor: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}
                          />
                          {exam.turma ? (
                            <Chip
                              label={exam.turma}
                              size="small"
                              sx={{ bgcolor: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.25)" }}
                            />
                          ) : null}
                          <Chip
                            label={exam.horario}
                            size="small"
                            sx={{
                              bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)",
                              color: textSecondary,
                              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,39,71,0.18)",
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.35)" : "rgba(15,39,71,0.52)"}>
                          {new Date(exam.data).toLocaleDateString("pt-BR")} • Sala {exam.sala} • Prof. {exam.professorNome}
                        </Typography>
                        {exam.conteudo ? (
                          <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.55)" : "rgba(15,39,71,0.68)"} sx={{ mt: 0.5 }}>
                            {exam.conteudo}
                          </Typography>
                        ) : null}
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export * from "./components";
export * from "./services";
export * from "./utils";
