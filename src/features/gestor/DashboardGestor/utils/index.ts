import { createTheme } from "@mui/material";

export const ACCENT = "#123A6B";

export const getDashboardGestorTheme = (isDark: boolean) =>
	createTheme({
		typography: {
			fontFamily: "Poppins, sans-serif",
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: 16,
						boxShadow: "0 4px 20px rgba(15,39,71,0.12)",
						border: "1px solid rgba(15,39,71,0.1)",
						backgroundColor: "#ffffff",
					},
				},
			},
		},
	});

export const turmasData = [
	{ turma: "6º A", alunos: 28, mediaGeral: 7.2, aprovados: 24 },
	{ turma: "6º B", alunos: 30, mediaGeral: 6.8, aprovados: 22 },
	{ turma: "7º A", alunos: 27, mediaGeral: 7.5, aprovados: 25 },
	{ turma: "7º B", alunos: 29, mediaGeral: 6.5, aprovados: 20 },
	{ turma: "8º A", alunos: 31, mediaGeral: 7.8, aprovados: 28 },
	{ turma: "9º A", alunos: 32, mediaGeral: 7.3, aprovados: 27 },
] as const;

export const sectionTitleSx = (accent: string) => ({
	fontWeight: 700,
	letterSpacing: "0.05em",
	fontSize: "1.1rem",
	color: accent,
	mb: 2,
	display: "flex",
	alignItems: "center",
	gap: 1,
});
