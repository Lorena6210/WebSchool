import { createTheme } from "@mui/material";

export const ACCENT = "#e5244a";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#12121e",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

export function getMediaGeral(grades: any[]) {
  return grades.length > 0
    ? grades.reduce((sum, item) => sum + (item.media ?? 0), 0) / grades.length
    : 0;
}

export function getFrequenciaMedia(grades: any[]) {
  return grades.length > 0
    ? grades.reduce((sum, item) => sum + (item.frequencia ?? 0), 0) / grades.length
    : 0;
}

export function getFinalRows(grades: any[], focusRows: string[]) {
  const rowsForTable = grades.filter((grade) => focusRows.includes(grade.disciplina));
  return rowsForTable.length > 0 ? rowsForTable : grades.slice(0, 2);
}

export function getChartData(finalRows: any[]) {
  return finalRows.map((row) => ({
    disciplina: row.disciplina,
    media: Number((row.media ?? 0).toFixed(2)),
    frequenciaEscalada: Number(((row.frequencia ?? 0) / 10).toFixed(2)),
    frequenciaOriginal: row.frequencia ?? 0,
  }));
}
