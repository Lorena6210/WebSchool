// types/Turma.ts
export interface Disciplina {
  Id: number;
  Nome: string;
  Nota: string;
  progresso: number;
  frequencia: number;
  descricao: string;
  topicos: string[];
  materiais: { nome: string; url: string }[];
  atividades: { nome: string; nota: number }[];
  provas: { nome: string; nota: number }[];
  caderno: number;
  bimestre: number;
  Habilidades: { nome: string; concluida: boolean }[];
}

export interface TurmaCompleta {
  Id: number;
  Nome: string;
  disciplinas: Disciplina[];
}