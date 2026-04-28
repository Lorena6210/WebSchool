import { createTheme } from "@mui/material";
import { mockGrades, mockExams, mockNotices, mockUsers, mockCalendarEvents } from "@/lib/mockData";

export const ACCENT = "#2EEB77";

export const getTheme = (isDark: boolean) =>
  createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: isDark ? "#12121e" : "#ffffff",
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(15,39,71,0.12)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
          },
        },
      },
    },
  });

export const getSectionTitle = (accent: string, isDark: boolean) => ({
  fontWeight: 700,
  letterSpacing: "0.05em",
  fontSize: "1.1rem",
  color: accent,
  mb: 2,
  display: "flex",
  alignItems: "center",
  gap: 1,
  "& svg": {
    color: accent,
  },
  "& .MuiTypography-root": {
    color: isDark ? "#f0f0f8" : "#0f2747",
  },
});

export function getGreeting() {
  const today = new Date();
  const hour = today.getHours();
  return hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
}

export function getDashboardData(user: any) {
  const alunoVinculado = mockUsers.find((u) => u.id === user?.alunoId);
  const turmaAluno = alunoVinculado?.turma ?? "—";

  const avgGrade = mockGrades.length > 0
    ? mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length
    : 0;

  const avgFrequency = mockGrades.length > 0
    ? mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length
    : 0;

  const today = new Date();

  const reuniaoNotices = mockNotices.filter(
    (n) => n.destinatarios.includes("responsavel") && n.tipo === "reuniao"
  );

  const allMyNotices = mockNotices.filter((n) =>
    n.destinatarios.includes("responsavel")
  );

  const upcomingExams = mockExams
    .filter((e) => !turmaAluno || e.turma === turmaAluno)
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 4);

  return {
    alunoVinculado,
    turmaAluno,
    avgGrade,
    avgFrequency,
    reuniaoNotices,
    allMyNotices,
    upcomingExams,
    upcomingEvents,
  };
}
