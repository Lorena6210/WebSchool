'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowForward, MenuBookOutlined, EmojiEventsOutlined, EditNoteOutlined } from '@mui/icons-material';

interface DashboardAlunoHeaderProps {
  isDark: boolean;
  greeting: string;
  userName: string;
  accentColor: string;
  pendingCount: number;
  examsCount: number;
}

// Converte hex em rgba com opacidade
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const DashboardAlunoHeader: React.FC<DashboardAlunoHeaderProps> = ({
  isDark,
  greeting,
  userName,
  accentColor,
  pendingCount,
  examsCount,
}) => {
  const glowColor = hexToRgba(accentColor, 0.25);
  const glowStrong = hexToRgba(accentColor, 0.18);
  const borderColor = hexToRgba(accentColor, 0.3);

  const floatingCards = [
    { icon: <MenuBookOutlined sx={{ fontSize: 22 }} />, label: 'Atividades', value: String(pendingCount), delay: '0s' },
    { icon: <EmojiEventsOutlined sx={{ fontSize: 22 }} />, label: 'Rank', value: 'A+', delay: '0.7s' },
    { icon: <EditNoteOutlined sx={{ fontSize: 22 }} />, label: 'Provas', value: String(examsCount), delay: '1.4s' },
  ];

  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 3, md: '28px 36px' },
        borderRadius: '20px',
        background: isDark
          ? `linear-gradient(135deg, #0e0e1a 0%, ${hexToRgba(accentColor, 0.22)} 60%, #0e0e1a 100%)`
          : `linear-gradient(135deg, #ffffff 0%, ${hexToRgba(accentColor, 0.15)} 55%, #f2f7ff 100%)`,
        border: `1px solid ${borderColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 160,
        boxShadow: isDark
          ? `0 8px 40px ${hexToRgba(accentColor, 0.2)}, 0 2px 12px rgba(0,0,0,0.5)`
          : `0 8px 32px ${hexToRgba(accentColor, 0.16)}, 0 2px 10px rgba(15,39,71,0.14)`,
      }}
    >
      {/* Glow esquerdo */}
      <Box sx={{
        position: 'absolute', top: '50%', left: -60,
        transform: 'translateY(-50%)',
        width: 280, height: 280, borderRadius: '50%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />
      {/* Glow direito */}
      <Box sx={{
        position: 'absolute', top: -60, right: 200,
        width: 260, height: 260, borderRadius: '50%',
        background: `radial-gradient(circle, ${glowStrong} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Conteúdo esquerdo */}
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 440 }}>
        <Typography
          sx={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: isDark ? '#fff' : '#0f2747',
            lineHeight: 1.15,
            mb: 0.75,
          }}
        >
          {greeting}, {userName}!
        </Typography>
        <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,39,71,0.7)', fontSize: '0.875rem', mb: 2.5, lineHeight: 1.6 }}>
          Acompanhe suas atividades e continue evoluindo nos estudos.
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
          sx={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${hexToRgba(accentColor, 0.8)} 100%)`,
            color: '#fff',
            fontWeight: 700,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: '0.875rem',
            px: 2.5, py: 1,
            boxShadow: `0 4px 18px ${hexToRgba(accentColor, 0.45)}`,
            '&:hover': {
              background: accentColor,
              transform: 'translateY(-1px)',
              boxShadow: `0 8px 28px ${hexToRgba(accentColor, 0.55)}`,
            },
            transition: 'all 0.2s',
          }}
        >
          Explorar Atividades
        </Button>
      </Box>

      {/* Cards flutuantes direita */}
      <Box
        sx={{
          position: 'relative', zIndex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1.5,
          mr: 1,
        }}
      >
        {floatingCards.map((item, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.72)',
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(15,39,71,0.12)',
              backdropFilter: 'blur(10px)',
              borderRadius: '14px',
              px: 2.5,
              pt: 1.75,
              pb: 1.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: isDark ? 'white' : '#0f2747',
              minWidth: 80,
              animation: `floatCard 3.5s ease-in-out ${item.delay} infinite`,
              '@keyframes floatCard': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          >
            <Box sx={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(15,39,71,0.82)', mb: 0.5 }}>{item.icon}</Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: '1.25rem', color: isDark ? '#fff' : '#0f2747', lineHeight: 1.1 }}
            >
              {item.value}
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,39,71,0.62)', mt: 0.25, letterSpacing: 0.3 }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardAlunoHeader;
