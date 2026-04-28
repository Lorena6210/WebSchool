import { Box, Grid, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SummaryCard = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: string;
  textColor: string;
};

type BoletimStatsCardsProps = {
  isDark: boolean;
  cards: SummaryCard[];
  hoverShadow: string;
};

export default function BoletimStatsCards({ isDark, cards, hoverShadow }: BoletimStatsCardsProps) {
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
              "&:hover": { transform: "translateY(-5px)", boxShadow: hoverShadow },
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
                  color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.5)",
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
              <Typography variant="h3" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
                {card.value}
              </Typography>
              <Typography variant="body2" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.62)"}>
                {card.subtitle}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
