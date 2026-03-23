"use client";

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
import { School, TrendingUp, BarChartOutlined } from "@mui/icons-material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { mockGrades } from "@/lib/mockData";

const ACCENT = "#6B21A8";

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

export default function BoletimAlunoView() {
  const mediaGeral =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.media ?? 0), 0) / mockGrades.length
      : 0;
  const frequenciaMedia =
    mockGrades.length > 0
      ? mockGrades.reduce((sum, item) => sum + (item.frequencia ?? 0), 0) / mockGrades.length
      : 0;

  const focusRows = ["Matemática", "Português"];
  const rowsForTable = mockGrades.filter((grade) => focusRows.includes(grade.disciplina));
  const finalRows = rowsForTable.length > 0 ? rowsForTable : mockGrades.slice(0, 2);

  const chartData = finalRows.map((row) => ({
    disciplina: row.disciplina,
    media: Number((row.media ?? 0).toFixed(2)),
    frequenciaEscalada: Number(((row.frequencia ?? 0) / 10).toFixed(2)),
    frequenciaOriginal: row.frequencia ?? 0,
  }));

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
                    Boletim
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Consulte notas, frequencia e situacao por disciplina.
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            <Grid container spacing={3} mb={5}>
              {[
                {
                  title: "Media Geral",
                  value: mediaGeral.toFixed(1),
                  subtitle: "Todas as disciplinas",
                  icon: <BarChartOutlined />,
                  color: "#E0E7FF",
                  textColor: "#4338CA",
                },
                {
                  title: "Frequencia Media",
                  value: `${frequenciaMedia.toFixed(0)}%`,
                  subtitle: "Presenca nas aulas",
                  icon: <TrendingUp />,
                  color: "#D1FAE5",
                  textColor: "#065F46",
                },
                {
                  title: "Disciplinas",
                  value: mockGrades.length,
                  subtitle: "No boletim atual",
                  icon: <School />,
                  color: "#F3E5F5",
                  textColor: ACCENT,
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

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ overflow: "hidden", height: "100%" }}>
                  <Box sx={{ p: 2.5, borderBottom: "1px solid #1C19171A" }}>
                    <Typography fontWeight={700} color="#1A1A1A">
                      Tabela de desempenho
                    </Typography>
                    <Typography variant="body2" color="#666">
                      Comparativo de disciplinas principais.
                    </Typography>
                  </Box>

                  <table className="w-full table-fixed text-sm">
                    <colgroup>
                      <col style={{ width: "34%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "22%" }} />
                      <col style={{ width: "26%" }} />
                    </colgroup>
                    <thead className="bg-[#F9F6F1] text-left text-[#1C1917]/70">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Disciplina</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">Media</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">Frequencia</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">Situacao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalRows.map((grade, index) => (
                        <tr
                          key={grade.disciplina}
                          className="border-t border-[#1C1917]/10 hover:bg-[#FAFAFA]"
                          style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#FCFBF8" }}
                        >
                          <td className="px-4 py-3 font-semibold text-[#1C1917]">{grade.disciplina}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="font-bold text-[#4338CA]">{grade.media?.toFixed(2) ?? "-"}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                              <Box sx={{ width: 42, height: 6, borderRadius: 999, bgcolor: "#E5E7EB", overflow: "hidden" }}>
                                <Box sx={{ width: `${grade.frequencia}%`, height: "100%", bgcolor: "#166534" }} />
                              </Box>
                              <span className="font-semibold text-[#166534]">{grade.frequencia}%</span>
                            </Box>
                          </td>
                          <td className="px-4 py-3 text-center capitalize">
                            <Chip
                              label={grade.situacao}
                              size="small"
                              sx={{
                                textTransform: "capitalize",
                                minWidth: 92,
                                whiteSpace: "nowrap",
                                bgcolor:
                                  grade.situacao === "aprovado"
                                    ? "#D1FAE5"
                                    : grade.situacao === "reprovado"
                                    ? "#FEE2E2"
                                    : "#FEF3C7",
                                color:
                                  grade.situacao === "aprovado"
                                    ? "#166534"
                                    : grade.situacao === "reprovado"
                                    ? "#991B1B"
                                    : "#92400E",
                                fontWeight: 700,
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2.5, height: "100%" }}>
                  <Typography fontWeight={700} color="#1A1A1A" mb={0.5}>
                    Grafico comparativo
                  </Typography>
                  <Typography variant="body2" color="#666" mb={2}>
                    Media e frequencia por disciplina.
                  </Typography>

                  <Box sx={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="disciplina" tick={{ fill: "#4B5563", fontSize: 12 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: "#4B5563", fontSize: 12 }} />
                        <Tooltip
                          formatter={(value: number, name: string, item: { payload?: { frequenciaOriginal?: number } }) => {
                            if (name === "Frequencia") {
                              return [`${item.payload?.frequenciaOriginal ?? 0}%`, "Frequencia"];
                            }
                            return [value, "Media"];
                          }}
                        />
                        <Legend />
                        <Bar dataKey="media" name="Media" fill="#6B21A8" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="frequenciaEscalada" name="Frequencia" fill="#166534" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                  <Typography variant="caption" color="#888">
                    Obs: frequencia exibida no grafico em escala 0-10 para comparacao visual com a media.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
}
