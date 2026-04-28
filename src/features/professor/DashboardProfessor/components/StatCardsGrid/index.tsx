'use client';

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { ReactNode } from 'react';

interface StatCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: string;
  textColor: string;
}

interface StatCardsGridProps {
  cards: StatCard[];
}

const StatCardsGrid: React.FC<StatCardsGridProps> = ({ cards }) => {
  return (
    <Grid container spacing={3} mb={5}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              bgcolor: "#12121e",
              border: "1px solid rgba(255,255,255,0.08)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                borderColor: "rgba(229,36,74,0.3)",
              },
              position: 'relative',
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
                  color: "rgba(240,240,248,0.4)",
                  textTransform: 'uppercase',
                  fontSize: '0.75rem'
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
              <Typography variant="body2" color="rgba(240,240,248,0.5)">
                {card.subtitle}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCardsGrid;
