import type { UserRole } from "@/types";
import { ROLE_ACCENT_COLORS } from "@/lib/theme/roleAccent";

export const ACCENT = "#3B4FD8";

export const roleColors: Record<UserRole, string> = {
	aluno: ROLE_ACCENT_COLORS.aluno,
	responsavel: ROLE_ACCENT_COLORS.responsavel,
	professor: ROLE_ACCENT_COLORS.professor,
	gestor: ROLE_ACCENT_COLORS.gestor,
};

export const roleLabels: Record<UserRole, string> = {
	aluno: "Aluno",
	responsavel: "Responsável",
	professor: "Professor",
	gestor: "Gestor",
};

export type FilterRole = "todos" | UserRole;