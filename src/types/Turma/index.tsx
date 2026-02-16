// types/index.ts
export interface Usuario {
  id: number;
  nome: string;
  role: string; // 'ALUNO', 'PROFESSOR', etc.
}

export interface Disciplina {
  id: number;
  nome: string;
  nota?: string;
  progresso: number;
  frequencia: number;
  descricao: string;
  topicos: string[];
  materiais: { nome: string; url: string }[];
  atividades: { nome: string; nota?: number }[];
  provas: { nome: string; nota?: number }[];
  caderno?: number;
  bimestre: number;
  habilidades: { nome: string; concluida: boolean }[];
}

export interface Turma {
  id: number;
  nome: string; // Ex: "1º Ano A"
  anoLetivo: number;
  turno: string;
  alunos: number[]; // IDs de alunos
  professores: number[]; // IDs de professores
  disciplinas: Disciplina[];
  calendario: {
    bimestres: { numero: number; inicio: string; fim: string }[];
    eventos: { titulo: string; data: string }[];
  };
}

export interface Aluno {
  id: number;
  nome: string;
  ra: string;
  perfilId: number;
  turmaId: number;
  responsaveis: number[];
  saude: {
    doencas: string[];
    alergias: string[];
    medicacoes: string[];
    observacoes: string;
  };
  historicoEscolar: {
    anoLetivo: number;
    turma: string;
    situacao: string;
    mediaFinal: number;
  }[];
}