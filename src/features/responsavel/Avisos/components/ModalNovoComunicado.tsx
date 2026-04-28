import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import { mockClassStudents } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { ACCENT, noticeTypeLabels } from "../utils";

export function ModalNovoComunicado({
  isDark,
  role,
  onClose,
}: {
  isDark: boolean;
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

  const modalBg = isDark ? "#12121e" : "#ffffff";
  const fieldBg = isDark ? "#1a1a2c" : "#f7faff";
  const fieldBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,39,71,0.18)";
  const textPrimary = isDark ? "#f0f0f8" : "#0f2747";
  const textSecondary = isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)";

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
      <DialogTitle sx={{ fontWeight: 700, color: textPrimary, bgcolor: modalBg }}>
        {isGestor ? "Novo Comunicado" : "Novo Comunicado / Aviso"}
      </DialogTitle>
      <DialogContent sx={{ pt: 2, bgcolor: modalBg }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!isGestor && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.3)",
                borderRadius: 1.5,
                fontSize: "0.875rem",
                color: "#fbbf24",
              }}
            >
              ⚠️ Professores podem comunicar e avisar, mas não agendar reuniões.
            </Box>
          )}

          <FormControl fullWidth size="small">
            <InputLabel sx={{ color: textSecondary }}>Tipo</InputLabel>
            <Select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              label="Tipo"
              sx={{
                bgcolor: fieldBg,
                color: textPrimary,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: fieldBorder },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(229,36,74,0.4)" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e5244a" },
              }}
            >
              {tiposDisponiveis.map((t) => (
                <MenuItem key={t} value={t} sx={{ bgcolor: fieldBg, color: textPrimary, "&:hover": { bgcolor: "rgba(229,36,74,0.1)" } }}>
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
            InputLabelProps={{ sx: { color: textSecondary } }}
            sx={{
              "& .MuiInputBase-root": { bgcolor: fieldBg, color: textPrimary },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: fieldBorder },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(229,36,74,0.4)" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e5244a" },
            }}
          />

          <TextField
            label="Mensagem"
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            fullWidth
            multiline
            rows={3}
            size="small"
            InputLabelProps={{ sx: { color: textSecondary } }}
            sx={{
              "& .MuiInputBase-root": { bgcolor: fieldBg, color: textPrimary },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: fieldBorder },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(229,36,74,0.4)" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e5244a" },
            }}
          />

          {!isGestor && (
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: textSecondary }}>Aluno (opcional)</InputLabel>
              <Select
                value={form.alunoFalta}
                onChange={(e) => setForm({ ...form, alunoFalta: e.target.value })}
                label="Aluno (opcional)"
                sx={{
                  bgcolor: fieldBg,
                  color: textPrimary,
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: fieldBorder },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(229,36,74,0.4)" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e5244a" },
                }}
              >
                <MenuItem value="" sx={{ bgcolor: fieldBg, color: textSecondary }}>— Sem aluno específico —</MenuItem>
                {mockClassStudents.map((s) => (
                  <MenuItem key={s.id} value={s.id} sx={{ bgcolor: fieldBg, color: textPrimary, "&:hover": { bgcolor: "rgba(229,36,74,0.1)" } }}>
                    {s.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1, bgcolor: modalBg, borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)" }}>
        <Box
          onClick={onClose}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.18)",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,39,71,0.06)" },
          }}
        >
          <Typography variant="body2" fontWeight={600} color={isDark ? "rgba(240,240,248,0.7)" : "rgba(15,39,71,0.7)"}>
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
            color: "#f0f0f8",
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Typography variant="body2" fontWeight={600} color="#f0f0f8">
            Enviar
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
