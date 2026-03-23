"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useExams } from "@/hooks/useExams";
import { useAuth } from "@/lib/context/AuthContext";
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

const ACCENT_ALUNO = "#6B21A8";

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

// ── Modal Criar Prova ────────────────────────────────────────
function ModalCriarProva({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    titulo: "", disciplina: "", conteudo: "", data: "", horario: "", sala: "", turma: "",
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-6 w-full max-w-md" style={{ boxShadow: "6px 6px 0 #1C1917" }}>
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Nova Prova</h2>
        <div className="space-y-3">
          <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Título da prova" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B45309]" />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.disciplina} onChange={(e) => setForm({ ...form, disciplina: e.target.value })} placeholder="Disciplina" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B45309]" />
            <input value={form.turma} onChange={(e) => setForm({ ...form, turma: e.target.value })} placeholder="Turma (ex: 9º A)" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B45309]" />
          </div>
          <textarea value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} placeholder="Conteúdo abordado" rows={2} className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B45309] resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#1C1917]/50 uppercase tracking-wide">Data</label>
              <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#B45309]" />
            </div>
            <div>
              <label className="text-xs text-[#1C1917]/50 uppercase tracking-wide">Horário</label>
              <input type="time" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#B45309]" />
            </div>
          </div>
          <input value={form.sala} onChange={(e) => setForm({ ...form, sala: e.target.value })} placeholder="Sala" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B45309]" />
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => { if (!form.titulo || !form.data) { toast.error("Preencha título e data."); return; } toast.success("Prova criada com sucesso!"); onClose(); }} className="flex-1 bg-[#B45309] text-white font-semibold py-2 rounded-lg text-sm hover:bg-[#92400E] transition-all">Salvar</button>
          <button onClick={onClose} className="flex-1 border-2 border-[#1C1917]/20 text-[#1C1917] font-semibold py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default function MainView() {
  const { exams, isLoading, error } = useExams();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const accentColor = user?.role === "professor" ? "#166534" : user?.role === "gestor" ? "#3B4FD8" : "#6B21A8";
  const userFirstName = user?.nome?.split(" ")[0] ?? "";
  const upcomingExams = exams.filter((exam) => new Date(exam.data) >= new Date());

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        {modalOpen && <ModalCriarProva onClose={() => setModalOpen(false)} />}
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: accentColor || ACCENT_ALUNO, width: 48, height: 48 }}>
                    <School sx={{ color: "white" }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                      Provas
                    </Typography>
                    <Typography variant="body1" color="#666">
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
                    className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm transition-all active:translate-y-0.5"
                    style={{ backgroundColor: accentColor, boxShadow: "3px 3px 0px #1C1917" }}
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
                  color: "#E0E7FF",
                  textColor: "#4338CA",
                },
                {
                  title: "Próximas Provas",
                  value: upcomingExams.length,
                  subtitle: "Ainda não realizadas",
                  icon: <TimerOutlined />,
                  color: "#FEF3C7",
                  textColor: "#92400E",
                },
                {
                  title: "Resultado da Busca",
                  value: filtered.length,
                  subtitle: "Itens filtrados",
                  icon: <Search />,
                  color: "#D1FAE5",
                  textColor: "#065F46",
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

            {/* <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ position: "relative" }}>
                <Search sx={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por título, disciplina ou turma..."
                  className="w-full rounded-lg border border-[#1C1917]/20 bg-white py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none"
                />
              </Box>
            </Paper> */}

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
                    <Typography color="#666">Carregando provas...</Typography>
                  </Box>
                ) : filtered.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography color="#666">Nenhuma prova encontrada.</Typography>
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
                        bgcolor: "white",
                        border: "1px solid #eee",
                        transition: "background 0.2s",
                        "&:hover": { bgcolor: "#FAFAFA" },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold" variant="body1" color="#1A1A1A">
                          {exam.titulo}
                        </Typography>
                        <Box sx={{ mt: 0.7, display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip label={exam.disciplina} size="small" sx={{ bgcolor: "#FEF3C7", color: "#92400E" }} />
                          {exam.turma ? <Chip label={exam.turma} size="small" sx={{ bgcolor: "#E0E7FF", color: "#4338CA" }} /> : null}
                          <Chip label={exam.horario} size="small" sx={{ bgcolor: "#F3F4F6", color: "#4B5563" }} />
                        </Box>
                        <Typography variant="caption" color="#999">
                          {new Date(exam.data).toLocaleDateString("pt-BR")} • Sala {exam.sala} • Prof. {exam.professorNome}
                        </Typography>
                        {exam.conteudo ? (
                          <Typography variant="body2" color="#666" sx={{ mt: 0.5 }}>
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

