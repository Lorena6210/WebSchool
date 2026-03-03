import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // personalize aqui se quiser :)
  palette: {
    mode: 'light',
    primary: { main: '#1C1917' },
    background: { default: '#FDFAF5' },
  },
  typography: {
    fontFamily: [
      '"Fraunces"',
      '"DM Sans"',
      '"Space Mono"',
      'sans-serif'
    ].join(','),
  },
});

export default theme;