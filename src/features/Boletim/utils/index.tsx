import { School, TrendingUp, BarChartOutlined } from "@mui/icons-material";

export const ACCENT = "#e5244a";

export function getBoletimStats(grades: any[]) {
  const mediaGeral =
    grades.length > 0
      ? grades.reduce((sum, item) => sum + (item.media ?? 0), 0) / grades.length
      : 0;
  const frequenciaMedia =
    grades.length > 0
      ? grades.reduce((sum, item) => sum + (item.frequencia ?? 0), 0) / grades.length
      : 0;

  const focusRows = ["Matemática", "Português"];
  const rowsForTable = grades.filter((grade) => focusRows.includes(grade.disciplina));
  const finalRows = rowsForTable.length > 0 ? rowsForTable : grades.slice(0, 2);

  const chartData = finalRows.map((row) => ({
    disciplina: row.disciplina,
    media: Number((row.media ?? 0).toFixed(2)),
    frequenciaEscalada: Number(((row.frequencia ?? 0) / 10).toFixed(2)),
    frequenciaOriginal: row.frequencia ?? 0,
  }));

  const summaryCards = [
    {
      title: "Media Geral",
      value: mediaGeral.toFixed(1),
      subtitle: "Todas as disciplinas",
      icon: <BarChartOutlined />,
      color: "rgba(229,36,74,0.15)",
      textColor: "#e5244a",
    },
    {
      title: "Frequencia Media",
      value: `${frequenciaMedia.toFixed(0)}%`,
      subtitle: "Presenca nas aulas",
      icon: <TrendingUp />,
      color: "rgba(34,197,94,0.15)",
      textColor: "#4ade80",
    },
    {
      title: "Disciplinas",
      value: grades.length,
      subtitle: "No boletim atual",
      icon: <School />,
      color: "rgba(229,36,74,0.15)",
      textColor: ACCENT,
    },
  ];

  return { mediaGeral, frequenciaMedia, finalRows, chartData, summaryCards };
}
