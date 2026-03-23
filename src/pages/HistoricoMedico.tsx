"use client";

// ============================================================
// WebSchool — Histórico Médico
// Design: Academic Warmth — Cards informativos com ícones
// ============================================================

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
import { mockMedicalRecord } from "@/lib/mockData";
import { AlertTriangle, FileText, Phone, Info, Heart } from "lucide-react";

const ACCENT = "#DC2626";

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

export default function HistoricoMedico() {
  const record = mockMedicalRecord;
  const contato = record.contatoEmergencia;

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <Heart size={20} color="white" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    Histórico Médico
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Informações de saúde e contato de emergência.
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            <Grid container spacing={3} mb={5}>
              {[
                {
                  title: "Alergias",
                  value: record.alergias.length,
                  subtitle: "Registradas",
                  icon: <AlertTriangle size={16} color="#991B1B" />,
                  color: "#FEE2E2",
                  textColor: "#991B1B",
                },
                {
                  title: "Laudos",
                  value: record.laudos.length,
                  subtitle: "Documentos médicos",
                  icon: <FileText size={16} color="#1D4ED8" />,
                  color: "#DBEAFE",
                  textColor: "#1D4ED8",
                },
                {
                  title: "Contato",
                  value: contato?.nome?.split(" ")[0] ?? "-",
                  subtitle: contato?.parentesco ?? "Sem vínculo",
                  icon: <Phone size={16} color="#92400E" />,
                  color: "#FEF3C7",
                  textColor: "#92400E",
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
                        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.12)",
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

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: ACCENT, mb: 2 }}>
                    Alergias
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {record.alergias.length === 0 ? (
                      <Typography variant="body2" color="#666">Nenhuma alergia registrada.</Typography>
                    ) : (
                      record.alergias.map((alergia, idx) => (
                        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: "#FEF2F2", border: "1px solid #FECACA" }}>
                          <AlertTriangle size={18} className="text-red-600" />
                          <Typography variant="body2" fontWeight={700} color="#991B1B">{alergia}</Typography>
                          <Chip label="Alergia" size="small" sx={{ ml: "auto", bgcolor: "#FEE2E2", color: "#991B1B", fontWeight: 700 }} />
                        </Box>
                      ))
                    )}
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: ACCENT, mb: 2 }}>
                    Contato de Emergência
                  </Typography>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#FFFBEB", border: "1px solid #FDE68A" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Avatar sx={{ bgcolor: "#B45309" }}>{contato.nome.charAt(0)}</Avatar>
                      <Box>
                        <Typography fontWeight={700}>{contato.nome}</Typography>
                        <Typography variant="body2" color="#666">{contato.parentesco}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, bgcolor: "white", borderRadius: 2, border: "1px solid #FDE68A" }}>
                      <Phone size={16} className="text-amber-700" />
                      <Typography variant="body2" fontWeight={700}>{contato.telefone}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: ACCENT, mb: 2 }}>
                    Laudos Médicos
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {record.laudos.length === 0 ? (
                      <Typography variant="body2" color="#666">Nenhum laudo registrado.</Typography>
                    ) : (
                      record.laudos.map((laudo, idx) => (
                        <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, p: 1.5, borderRadius: 2, border: "1px solid #E5E7EB", "&:hover": { bgcolor: "#FAFAFA" } }}>
                          <FileText size={18} className="text-blue-600 mt-0.5" />
                          <Typography variant="body2" color="#1C1917">{laudo}</Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "1.05rem", color: ACCENT, mb: 2 }}>
                    Observações Médicas
                  </Typography>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#EFF6FF", border: "1px solid #BFDBFE", display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <Info size={18} className="text-blue-600 mt-0.5" />
                    <Typography variant="body2" color="#1C1917">{record.observacoes}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Paper sx={{ mt: 3, p: 2, bgcolor: "#1C191708", border: "1px solid #1C19171A" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Heart size={18} className="text-[#1C1917]/40 mt-0.5" />
                <Typography variant="caption" color="#4B5563">
                  As informações médicas são confidenciais e acessíveis apenas ao aluno, responsáveis autorizados e gestores escolares.
                  Em caso de emergência, entre em contato imediatamente com o responsável indicado acima.
                </Typography>
              </Box>
            </Paper>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
