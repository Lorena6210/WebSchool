import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';
import { getDashboardAlunoTheme } from '../../utils';

interface DashboardAlunoLoadingProps {
  isDark?: boolean;
  accentColor?: string;
}

const DashboardAlunoLoading = ({ isDark = true, accentColor = '#7c3aed' }: DashboardAlunoLoadingProps) => {
  return (
    <ThemeProvider theme={getDashboardAlunoTheme(isDark)}>
      <DashboardLayout>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: isDark ? '#0c0c14' : '#f2f7ff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 44, height: 44,
              borderRadius: '50%',
              border: `3px solid ${accentColor}33`,
              borderTopColor: accentColor,
              animation: 'spin 0.9s linear infinite',
              '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
            }} />
            <Typography sx={{ color: isDark ? 'rgba(240,240,248,0.45)' : 'rgba(15,39,71,0.55)' }} variant="body2" fontWeight={500}>
              Carregando dashboard...
            </Typography>
          </Box>
        </Box>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default DashboardAlunoLoading;
