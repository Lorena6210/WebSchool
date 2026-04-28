import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e5244a', light: '#ff2d57', dark: '#c01a3a' },
    secondary: { main: '#7c3aed' },
    background: {
      default: '#0c0c14',
      paper: '#12121e',
    },
    text: {
      primary: '#f0f0f8',
      secondary: 'rgba(240,240,248,0.6)',
    },
    divider: 'rgba(255,255,255,0.08)',
    error: { main: '#f87171' },
    success: { main: '#34d399' },
    warning: { main: '#fbbf24' },
    info: { main: '#60a5fa' },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '"Fraunces"',
      '"Space Mono"',
      'sans-serif',
    ].join(','),
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#12121e',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#12121e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          transition: 'all 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(229,36,74,0.3)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: '#e5244a',
          '&:hover': {
            background: '#ff2d57',
            boxShadow: '0 4px 20px rgba(229,36,74,0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1a1a2c',
            borderRadius: 10,
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e5244a',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#e5244a',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0c0c14',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.08)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#e5244a',
        },
      },
    },
  },
});

export default theme;
