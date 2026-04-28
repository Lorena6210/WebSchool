import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BarChart2, Bell, FileText, User } from "lucide-react";

interface MuralStatsProps {
  isDark: boolean;
  accent: string;
  avgGrade: number;
  avgFrequency: number;
  upcomingExamsCount: number;
  turmaAluno: string;
  reuniaoNoticesCount: number;
}

export function MuralStats({
  isDark,
  accent,
  avgGrade,
  avgFrequency,
  upcomingExamsCount,
  turmaAluno,
  reuniaoNoticesCount,
}: MuralStatsProps) {
  const statCards = [
    {
      title: "Média Geral",
      value: avgGrade.toFixed(1),
      subtitle: "Todas as disciplinas",
      icon: <BarChart2 size={16} color="#22d3ee" />,
      color: "rgba(34,211,238,0.1)",
      textColor: "#22d3ee",
    },
    {
      title: "Frequência Média",
      value: `${avgFrequency.toFixed(0)}%`,
      subtitle: "Presença nas aulas",
      icon: <User size={16} color="#4ade80" />,
      color: "rgba(74,222,128,0.1)",
      textColor: "#4ade80",
    },
    {
      title: "Provas Próximas",
      value: upcomingExamsCount,
      subtitle: `Turma ${turmaAluno}`,
      icon: <FileText size={16} color="#a78bfa" />,
      color: "rgba(167,139,250,0.1)",
      textColor: "#a78bfa",
    },
    {
      title: "Reuniões",
      value: reuniaoNoticesCount,
      subtitle: "Agendadas",
      icon: <Bell size={16} color="#60a5fa" />,
      color: "rgba(96,165,250,0.1)",
      textColor: "#60a5fa",
    },
  ];

  return (
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
                transform: "translateY(-2px)",
                boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(15,39,71,0.14)",
                borderColor: `${accent}55`,
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
                  color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)",
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
              <Typography variant="h4" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
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
  );
}
