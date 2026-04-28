import { createTheme } from "@mui/material";

export const ACCENT = "#e5244a";

export const getTheme = (isDark: boolean) => createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: isDark ? "#12121e" : "#ffffff",
          boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(15,39,71,0.12)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
        },
      },
    },
  },
});

export const noticeTypeColors: Record<string, string> = {
  prova: "rgba(251,191,36,0.12)",
  reuniao: "rgba(96,165,250,0.12)",
  atividade: "rgba(74,222,128,0.12)",
  geral: "rgba(229,36,74,0.12)",
};

export const noticeTypeColorsText: Record<string, string> = {
  prova: "#fbbf24",
  reuniao: "#60a5fa",
  atividade: "#4ade80",
  geral: "#e5244a",
};

export const noticeTypeLabels: Record<string, string> = {
  prova: "Prova",
  reuniao: "Reunião",
  atividade: "Atividade",
  geral: "Geral",
};

export type FilterTipo = "todos" | "prova" | "reuniao" | "atividade" | "geral";
