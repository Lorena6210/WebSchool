// ============================================================
// WebSchool — Tipos TypeScript Base
// Design: Academic Warmth (Neobrutalism Educacional Suave)
// ============================================================

export type UserRole = "aluno" | "professor" | "responsavel" | "gestor";

export interface User {
  id: string;
  nome: string;
  email?: string;
  ra?: string; // Registro do Aluno (apenas para alunos)
  role: UserRole;
  turma?: string;
  avatarInitials: string;
}

export interface Permissions {
  canCreateActivity: boolean;
  canCreateExam: boolean;
  canViewMedicalHistory: boolean;
  canEditCalendar: boolean;
  canManageUsers: boolean;
  canLaunchGrades: boolean;
  canSendNotices: boolean;
  canViewAllReports: boolean;
  canCreateSchedule: boolean;
}

export const rolePermissions: Record<UserRole, Permissions> = {
  aluno: {
    canCreateActivity: false,
    canCreateExam: false,
    canViewMedicalHistory: true,
    canEditCalendar: false,
    canManageUsers: false,
    canLaunchGrades: false,
    canSendNotices: false,
    canViewAllReports: false,
    canCreateSchedule: false,
  },
  responsavel: {
    canCreateActivity: false,
    canCreateExam: false,
    canViewMedicalHistory: true,
    canEditCalendar: false,
    canManageUsers: false,
    canLaunchGrades: false,
    canSendNotices: false,
    canViewAllReports: false,
    canCreateSchedule: false,
  },
  professor: {
    canCreateActivity: true,
    canCreateExam: true,
    canViewMedicalHistory: false,
    canEditCalendar: false,
    canManageUsers: false,
    canLaunchGrades: true,
    canSendNotices: true,
    canViewAllReports: false,
    canCreateSchedule: false,
  },
  gestor: {
    canCreateActivity: true,
    canCreateExam: true,
    canViewMedicalHistory: true,
    canEditCalendar: true,
    canManageUsers: true,
    canLaunchGrades: true,
    canSendNotices: true,
    canViewAllReports: true,
    canCreateSchedule: true,
  },
};

export interface CalendarEvent {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  tipo: "aula" | "prova" | "reuniao" | "evento";
  descricao?: string;
  turma?: string;
}

export interface Activity {
  data: ReactNode;
  id: string;
  titulo: string;
  descricao: string;
  disciplina: string;
  dataEntrega: string;
  professorId: string;
  professorNome: string;
  turma: string;
  status: "pendente" | "entregue" | "atrasado";
  nota?: number;
}

export interface Exam {
  id: string;
  titulo: string;
  disciplina: string;
  data: string;
  horario: string;
  sala: string;
  turma: string;
  professorId: string;
  professorNome: string;
  conteudo?: string;
}

export interface Grade {
  disciplina: string;
  nota1?: number;
  nota2?: number;
  nota3?: number;
  nota4?: number;
  media?: number;
  frequencia: number;
  situacao: "aprovado" | "reprovado" | "cursando";
}

export interface MedicalRecord {
  alergias: string[];
  laudos: string[];
  observacoes: string;
  contatoEmergencia: {
    nome: string;
    telefone: string;
    parentesco: string;
  };
}

export interface SchoolHistory {
  anoLetivo: string;
  turma: string;
  notas: Grade[];
  frequenciaGeral: number;
  situacao: "aprovado" | "reprovado" | "cursando";
}

export interface Notice {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: "prova" | "reuniao" | "atividade" | "geral";
  data: string;
  autorId: string;
  autorNome: string;
  destinatarios: UserRole[];
}

export interface ClassSchedule {
  turma: string;
  horarios: {
    dia: "segunda" | "terca" | "quarta" | "quinta" | "sexta";
    aulas: {
      horario: string;
      disciplina: string;
      professor: string;
      sala: string;
    }[];
  }[];
}
