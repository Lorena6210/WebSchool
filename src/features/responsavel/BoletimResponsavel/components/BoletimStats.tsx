import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BarChartOutlined, TrendingUp, CheckCircle } from "@mui/icons-material";
import { ACCENT } from "../utils";

interface BoletimStatsProps {
  mediaGeral: number;
  frequenciaMedia: number;
}

export function BoletimStats({ mediaGeral, frequenciaMedia }: BoletimStatsProps) {
  const cards = [
    {
      title: "Media Geral",
      value: mediaGeral.toFixed(1),
      subtitle: "Todas as disciplinas",
      icon: <BarChartOutlined />,
      color: "rgba(229,36,74,0.15)",
      textColor: ACCENT,
    },
    {
      title: "Frequencia Media",
      value: `${frequenciaMedia.toFixed(0)}%`,
      subtitle: "Presenca nas aulas",
      icon: <TrendingUp />,
      color: "rgba(74,222,128,0.15)",
      textColor: "#4ade80",
    },
    {
      title: "Situacao",
      value: "Cursando",
      subtitle: "2º Bimestre 2026",
      icon: <CheckCircle />,
      color: "rgba(96,165,250,0.15)",
      textColor: "#60a5fa",
    },
  ];

  return (
    <Grid container spacing={3} mb={5}>
      {cards.map((card) => (
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
                boxShadow: "0 10px 25px rgba(229,36,74,0.2)",
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
                  color: "rgba(240,240,248,0.45)",
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
              <Typography variant="h3" fontWeight="bold" color="#f0f0f8">
                {card.value}
              </Typography>
              <Typography variant="body2" color="rgba(240,240,248,0.6)">
                {card.subtitle}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
