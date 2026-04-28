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
  isDark: boolean;
  cards: StatCard[];
  accentColor?: string;
}

const StatCardsGrid: React.FC<StatCardsGridProps> = ({ isDark, cards, accentColor = '#e5244a' }) => {
  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return (
    <Grid container spacing={3} mb={5}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Paper
            sx={{
              p: 2.5,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: isDark ? '#12121e' : '#ffffff',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,39,71,0.1)',
              transition: 'all 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                borderColor: hexToRgba(accentColor, 0.3),
                boxShadow: isDark ? '0 8px 28px rgba(0,0,0,0.4)' : '0 8px 28px rgba(15,39,71,0.14)',
              },
            }}
          >
            {/* Icon badge */}
            <Box
              sx={{
                width: 52, height: 52,
                borderRadius: 2.5,
                bgcolor: hexToRgba(accentColor, 0.12),
                border: `1px solid ${hexToRgba(accentColor, 0.2)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: accentColor,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>

            {/* Text */}
            <Box>
              <Typography
                variant="caption"
                sx={{ color: isDark ? 'rgba(240,240,248,0.45)' : 'rgba(15,39,71,0.55)', fontWeight: 500, display: 'block', lineHeight: 1.2, fontSize: '0.72rem' }}
              >
                {card.title}
              </Typography>
              <Typography variant="h5" fontWeight="700" sx={{ color: isDark ? '#f0f0f8' : '#0f2747' }} lineHeight={1.2}>
                {card.value}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.3)' : 'rgba(15,39,71,0.45)', fontSize: '0.7rem' }}>
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
