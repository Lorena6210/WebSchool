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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { mockNotices, mockClassStudents } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { toast } from "sonner";

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

const noticeTypeColors: Record<string, string> = {
  prova: "#FEF9C3",
  reuniao: "#E0E7FF",
  atividade: "#D1FAE5",
  geral: "#F3E5F5",
};

const noticeTypeColorsText: Record<string, string> = {
  prova: "#92400E",
  reuniao: "#4338CA",
  atividade: "#065F46",
  geral: "#6B21A8",
};

const noticeTypeLabels: Record<string, string> = {
  prova: "Prova",
  reuniao: "Reunião",
  atividade: "Atividade",
  geral: "Geral",
};

type FilterTipo = "todos" | "prova" | "reuniao" | "atividade" | "geral";

// Modal de novo comunicado (professor / gestor)
function ModalNovoComunicado({
  role,
  onClose,
}: {
  role: UserRole;
  onClose: () => void;
}) {
  const isGestor = role === "gestor";
  const [form, setForm] = useState({
    titulo: "",
    mensagem: "",
    tipo: "geral",
    alunoFalta: "",
  });

  const tiposDisponiveis = isGestor
    ? ["geral", "prova", "reuniao", "atividade"]
    : ["geral", "atividade"];

  const handleSubmit = () => {
    if (!form.titulo || !form.mensagem) {
      toast.error("Preencha título e mensagem.");
      return;
    }
    toast.success(
      form.alunoFalta
        ? `Aviso de falta enviado para responsável e gestor!`
        : "Comunicado enviado com sucesso!"
    );
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#1A1A1A" }}>
        {isGestor ? "Novo Comunicado" : "Novo Comunicado / Aviso"}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!isGestor && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: "#FEF3C7",
                border: "1px solid #FDE68A",
                borderRadius: 1.5,
                fontSize: "0.875rem",
                color: "#92400E",
              }}
            >
              ⚠️ Professores podem comunicar e avisar, mas não agendar reuniões.
            </Box>
          )}

          <FormControl fullWidth size="small">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              label="Tipo"
            >
              {tiposDisponiveis.map((t) => (
                <MenuItem key={t} value={t}>
                  {noticeTypeLabels[t]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            fullWidth
            size="small"
          />

          <TextField
            label="Mensagem"
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            fullWidth
            multiline
            rows={3}
            size="small"
          />

          {!isGestor && (
            <FormControl fullWidth size="small">
              <InputLabel>Aluno (opcional)</InputLabel>
              <Select
                value={form.alunoFalta}
                onChange={(e) => setForm({ ...form, alunoFalta: e.target.value })}
                label="Aluno (opcional)"
              >
                <MenuItem value="">— Sem aluno específico —</MenuItem>
                {mockClassStudents.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
            Enviar
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

// Componente principal
export default function Avisos() {
  const { user } = useAuth();
  const role = user?.role as UserRole;

  const canSend = role === "professor" || role === "gestor";
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTipo, setFilterTipo] = useState<FilterTipo>("todos");

  // Filtra avisos pelo destinatário do perfil atual
  const baseNotices = mockNotices.filter(
    (n) => n.destinatarios.includes(role) || canSend
  );

  const displayNotices =
    filterTipo === "todos"
      ? baseNotices
      : baseNotices.filter((n) => n.tipo === filterTipo);

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        {modalOpen && canSend && (
          <ModalNovoComunicado
            role={role}
            onClose={() => setModalOpen(false)}
          />
        )}

        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            {/* HEADER */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <NotificationsNoneOutlined sx={{ color: "white" }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    Avisos e Comunicados
                  </Typography>
                  <Typography variant="body1" color="#666">
                    {role === "responsavel"
                      ? "Comunicados da escola sobre seu filho(a)"
                      : role === "professor"
                      ? "Envie comunicados e avisos de falta"
                      : "Gerencie todos os comunicados da escola"}
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

            {/* AVISOS SECTION */}
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    fontSize: "1.1rem",
                    color: ACCENT,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
                  Avisos Importantes
                </Typography>
                {canSend && (
                  <Box
                    onClick={() => setModalOpen(true)}
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
                    Novo Comunicado
                  </Box>
                )}
              </Box>

              {/* Filtro */}
              <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                {(["todos", "prova", "reuniao", "atividade", "geral"] as FilterTipo[]).map(
                  (t) => (
                    <Chip
                      key={t}
                      label={t === "todos" ? "Todos" : noticeTypeLabels[t]}
                      onClick={() => setFilterTipo(t)}
                      variant={filterTipo === t ? "filled" : "outlined"}
                      sx={{
                        bgcolor:
                          filterTipo === t ? ACCENT : "transparent",
                        color: filterTipo === t ? "white" : "#666",
                        borderColor:
                          filterTipo === t ? ACCENT : "#E5E7EB",
                        fontWeight: 600,
                      }}
                    />
                  )
                )}
              </Box>

              {/* Lista de avisos */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {displayNotices.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <NotificationsNoneOutlined
                      sx={{
                        fontSize: 48,
                        color: "#D1D5DB",
                        mb: 1,
                      }}
                    />
                    <Typography color="#999">
                      Nenhum aviso encontrado
                    </Typography>
                  </Box>
                ) : (
                  displayNotices.map((notice) => (
                    <Box
                      key={notice.id}
                      sx={{
                        p: 2,
                        bgcolor: noticeTypeColors[notice.tipo],
                        borderRadius: 2,
                        border: `1px solid ${noticeTypeColorsText[notice.tipo]}20`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: noticeTypeColorsText[notice.tipo],
                        },
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
                          color={noticeTypeColorsText[notice.tipo]}
                          textTransform="uppercase"
                          fontSize="0.75rem"
                        >
                          {noticeTypeLabels[notice.tipo]}
                        </Typography>
                        <Typography variant="caption" color="#999">
                          {new Date(notice.data).toLocaleDateString(
                            "pt-BR"
                          )}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        mb={0.5}
                        color="#1A1A1A"
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
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "0.75rem",
                          color: "#666",
                        }}
                      >
                        <span>Por: {notice.autorNome}</span>
                        {canSend && (
                          <>
                            <span>•</span>
                            <span>
                              Para:{" "}
                              {notice.destinatarios.join(", ")}
                            </span>
                          </>
                        )}
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
