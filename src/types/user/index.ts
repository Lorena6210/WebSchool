export type UserProps = {
  IDPerfil: number;
  IDEscola: number | null;
  ID: number;
  Sessao: number;
  SessaoLogada: string;
  IDTurma: number | null;
  IDMasterPrincipal: number | null;
  authorizedTools: AuthorizedTools[];
  schoolRules: SchoolRules[];
  NomeEscola: string | null;
  Foto: string;
  Nome: string;
  city: {
    id: string | number;
    name: string;
  };
  state: {
    id: string | number;
    name: string;
  };
};

export type AuthorizedTools = {
  ruleId: number;
  authorizedToolsName: string;
};

export type SchoolRules = {
  ruleId: number;
  tool: string;
  defaultRule: boolean;
};

export type QuestoesTypes = {
  ID: number;
  IDMateria: number;
  IDSerie: number;
  IDPeriodo: number;
  Pergunta: string;
  Descricao: string | null;
  Gabarito: string | null;
  Ativo: boolean;
  IDEnsino: number | null;
  IDMaster: number;
  IDUsuario: number;
  DataCriacao: Date | null;
  Compartilhar: boolean;
  Aprovado: boolean;
  Netbil: boolean;
  Sessao: string | null;
  Tipo: string;
  IDPerfil: number | null;
  palavraChave: string | null;
  idUnidadeTematica: number | null;
  idDificuldade: number | null;
};

export type HeaderProps = {
  'Content-Type': string;
  profileID: string;
  masterID: string;
  schoolID: string;
  userId: string;
  section: string;
};

// Interfaces para as outras partes do JSON

export interface Perfil {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  tempoRegistro: string;
  status: string;
  ultimoAcesso: string;
  role: string;
  senha: string;
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

export interface Responsavel {
  id: number;
  nome: string;
  perfilId: number;
  tipo: string;
  alunos: number[];
  permissoes: string[];
}

export interface Professor {
  id: number;
  nome: string;
  perfilId: number;
  formacao: {
    curso: string;
    instituicao: string;
    anoConclusao: number;
  }[];
  disciplinas: number[];
  turmas: number[];
  cargaHoraria: string;
}

export interface Gestor {
  id: number;
  nome: string;
  perfilId: number;
  acessoTotal: boolean;
  logs: {
    acao: string;
    data: string;
  }[];
}

export interface Turma {
  id: number;
  nome: string;
  anoLetivo: number;
  turno: string;
  alunos: number[];
  professores: number[];
  disciplinas: number[];
  calendario: {
    bimestres: {
      numero: number;
      inicio: string;
      fim: string;
    }[];
    eventos: {
      titulo: string;
      data: string;
    }[];
  };
}

export interface Disciplina {
  id: number;
  nome: string;
  professorId: number;
  conteudos: {
    tipo: string;
    titulo: string;
    url: string;
  }[];
  atividades: {
    id: number;
    titulo: string;
    bimestre: number;
    dataEntrega: string;
  }[];
}

export interface ControleAcesso {
  roles: {
    [key: string]: string[];  // e.g., "ALUNO": ["VER_CONTEUDO"]
  };
}

// Interface principal para o objeto data
export interface Data {
  perfis: Perfil[];
  usuarios: {
    alunos: Aluno[];
    responsaveis: Responsavel[];
    professores: Professor[];
    gestores: Gestor[];
  };
  turmas: Turma[];
  disciplinas: Disciplina[];
  controleAcesso: ControleAcesso;
  users: UserProps[];
  questoes: QuestoesTypes[];
  headers: HeaderProps;
}