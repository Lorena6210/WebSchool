import type { UserRole } from "@/types";

export const ROLE_ACCENT_COLORS: Record<UserRole, string> = {
  aluno: "#B266FF",
  responsavel: "#2EEB77",
  professor: "#123A8C",
  gestor: "#4169E1",
};

export function getRoleAccent(role?: UserRole | null): string {
  if (!role) {
    return ROLE_ACCENT_COLORS.aluno;
  }

  return ROLE_ACCENT_COLORS[role];
}

export function getThemeText(isDark: boolean) {
  return {
    primary: isDark ? "#f0f0f8" : "#0f2747",
    secondary: isDark ? "rgba(240,240,248,0.68)" : "rgba(15,39,71,0.72)",
    muted: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.52)",
    border: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,39,71,0.16)",
    card: isDark ? "#12121e" : "#ffffff",
    cardAlt: isDark ? "#1a1a2c" : "#f7faff",
    hover: isDark ? "#20203a" : "#eef5ff",
  };
}
