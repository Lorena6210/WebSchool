import { createTheme } from '@mui/material';

export const ACCENT = '#7c3aed';
export const ACCENT_LIGHT = 'rgba(124,58,237,0.15)';

export const getDashboardAlunoTheme = (isDark: boolean) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    background: {
      default: isDark ? '#0c0c14' : '#f2f7ff',
      paper: isDark ? '#12121e' : '#ffffff',
    },
    text: {
      primary: isDark ? '#f0f0f8' : '#0f2747',
      secondary: isDark ? 'rgba(240,240,248,0.6)' : 'rgba(15,39,71,0.7)',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(15,39,71,0.12)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,39,71,0.1)',
          backgroundImage: 'none',
          backgroundColor: isDark ? '#12121e' : '#ffffff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.78rem',
          borderRadius: 8,
        },
      },
    },
  },
});

export const sectionTitleSx = (accent: string, isDark: boolean) => ({
  fontWeight: 700,
  fontSize: '1rem',
  color: isDark ? '#f0f0f8' : '#0f2747',
  mb: 2.5,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  '& svg': {
    color: accent,
  },
});
