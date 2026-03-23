export const USER_ROLES = ["aluno", "professor", "responsavel", "gestor"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ALL_USER_ROLES: UserRole[] = [...USER_ROLES];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  aluno: "Aluno",
  professor: "Professor",
  responsavel: "Responsavel",
  gestor: "Gestor",
};

export const USER_ROLE_IDS: Record<UserRole, number> = {
  aluno: 1,
  professor: 2,
  responsavel: 3,
  gestor: 4,
};

export type UserRoleId = (typeof USER_ROLE_IDS)[UserRole];

export function getUserRoleId(role: UserRole): UserRoleId {
  return USER_ROLE_IDS[role];
}
