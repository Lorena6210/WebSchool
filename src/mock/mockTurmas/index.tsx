// lib/mockTurmas.ts - Dados mock para turmas, usuários e relacionados
import { TurmaCompleta } from "@/types/Turma"; // Ajuste o caminho se necessário

// Mock de turmas completas (usado para exibir detalhes de turmas)
export const mockTurmas: TurmaCompleta[] = [
  {
    Id: 1,
    Nome: "Turma A - Matemática",
    disciplinas: [
      {
        Id: 1,
        Nome: "Álgebra",
        Nota: "8.5",
        progresso: 75,
        frequencia: 90,
        descricao: "Estudo de equações, funções e estruturas algébricas básicas.",
        topicos: ["Equações lineares", "Funções quadráticas", "Sistemas de equações"],
        materiais: [
          { nome: "Vídeo introdutório", url: "https://exemplo.com/video" },
          { nome: "Exercícios práticos", url: "https://exemplo.com/exercicios" },
        ],
        atividades: [
          { nome: "Atividade 1 - Equações", nota: 8.0 },
          { nome: "Atividade 2 - Funções", nota: 9.0 },
        ],
        provas: [{ nome: "Prova Bimestral 1", nota: 8.5 }],
        caderno: 9.0,
        bimestre: 1,
        Habilidades: [
          { nome: "Resolver equações", concluida: true },
          { nome: "Graficar funções", concluida: false },
        ],
      },
      {
        Id: 2,
        Nome: "Geometria",
        Nota: "9.0",
        progresso: 90,
        frequencia: 95,
        descricao: "Exploração de formas, espaços e teoremas geométricos.",
        topicos: ["Figuras planas", "Teorema de Pitágoras", "Áreas e volumes"],
        materiais: [
          { nome: "Tutorial interativo", url: "https://exemplo.com/tutorial" },
          { nome: "Livro digital", url: "https://exemplo.com/livro" },
        ],
        atividades: [{ nome: "Atividade 1 - Figuras", nota: 9.5 }],
        provas: [
          { nome: "Prova Bimestral 1", nota: 9.0 },
          { nome: "Prova Bimestral 2", nota: 8.5 },
        ],
        caderno: 8.5,
        bimestre: 1,
        Habilidades: [
          { nome: "Calcular áreas", concluida: true },
          { nome: "Teorema de Pitágoras", concluida: true },
        ],
      },
    ],
    professores: [1], // Array de IDs para serialização JSON
  },
];

// Dados mock gerais (perfis, usuários, etc.) - Consolidado para evitar duplicatas
export const mockData = {
  perfis: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@escola.com",
      telefone: "11999999999",
      dataNascimento: "2012-05-10",
      tempoRegistro: "2024-02-10",
      status: "ativo",
      ultimoAcesso: "2026-02-01",
      role: "ALUNO",
      senha: "senha123",
    },
    {
      id: 2,
      nome: "Carlos Souza",
      email: "carlos@escola.com",
      telefone: "11977777777",
      tempoRegistro: "2020-08-15",
      status: "ativo",
      ultimoAcesso: "2026-02-01",
      role: "PROFESSOR",
      senha: "senha123",
    },
    {
      id: 3,
      nome: "Maria Silva",
      email: "maria@gmail.com",
      telefone: "11988888888",
      tempoRegistro: "2024-02-10",
      status: "ativo",
      ultimoAcesso: "2026-02-01",
      role: "RESPONSAVEL",
      senha: "senha123",
    },
    {
      id: 4,
      nome: "Ana Gestora",
      email: "ana@escola.com",
      tempoRegistro: "2019-01-05",
      status: "ativo",
      ultimoAcesso: "2026-02-01",
      role: "GESTOR",
      senha: "senha123",
    },
  ],
  usuarios: {
    students: [
      {
        id: 1,
        nome: "João Silva",
        ra: "RA2024001",
        perfilId: 1,
        turmaId: 1,
        responsaveis: [1],
        saude: {
          doencas: ["asma"],
          alergias: ["amendoim"],
          medicacoes: ["bombinha"],
          observacoes: "Evitar esforço excessivo",
        },
        historicoEscolar: [
          {
            anoLetivo: 2023,
            turma: "5º Ano B",
            situacao: "Aprovado",
            mediaFinal: 8.5,
          },
        ],
      },
    ],
    responsible: [
      {
        id: 1,
        nome: "Maria Silva",
        perfilId: 3,
        tipo: "Mae",
        alunos: [1],
        permissoes: ["VER_NOTAS", "VER_ATIVIDADES", "VER_CALENDARIO", "VER_VIDEOAULAS"],
      },
    ],
    teachers: [
      {
        id: 1,
        nome: "Carlos Souza",
        perfilId: 2,
        formacao: [
          {
            curso: "Licenciatura em Matemática",
            instituicao: "Universidade Estadual",
            anoConclusao: 2018,
          },
        ],
        disciplinas: [1],
        turmas: [1],
        cargaHoraria: "20h",
      },
    ],
    manager: [
      {
        id: 1,
        nome: "Ana Gestora",
        perfilId: 4,
        acessoTotal: true,
        logs: [
          {
            acao: "CRIACAO_TURMA",
            data: "2026-01-10",
          },
        ],
      },
    ],
  },
  turmas: [
    {
      id: 1,
      nome: "1º Ano A",
      anoLetivo: 2026,
      turno: "Manha",
      alunos: [1],
      professores: [1],
      disciplinas: [1],
      calendario: {
        bimestres: [
          {
            numero: 1,
            inicio: "2026-02-01",
            fim: "2026-04-30",
          },
        ],
        eventos: [
          {
            titulo: "Prova Bimestral",
            data: "2026-04-20",
          },
        ],
      },
    },
  ],
  disciplinas: [
    {
      id: 1,
      nome: "Matemática",
      professorId: 1,
      conteudos: [
        {
          tipo: "VIDEO",
          titulo: "Introdução à Matemática",
          url: "https://video.com/aula1",
        },
      ],
      atividades: [
        {
          id: 1,
          titulo: "Exercícios Básicos",
          bimestre: 1,
          dataEntrega: "2026-03-10",
        },
      ],
    },
  ],
  controleAcesso: {
    roles: {
      ALUNO: ["VER_CONTEUDO"],
      RESPONSAVEL: ["VER_DADOS_ALUNO"],
      PROFESSOR: ["GERENCIAR_ATIVIDADES"],
      GESTOR: ["ACESSO_TOTAL"],
    },
  },
  users: [
    {
      IDPerfil: 1,
      IDEscola: 1,
      ID: 1,
      Sessao: 12345,
      SessaoLogada: "sessao-ativa-123",
      IDTurma: 1,
      IDMasterPrincipal: null,
      authorizedTools: [{ ruleId: 1, authorizedToolsName: "VER_CONTEUDO" }],
      schoolRules: [{ ruleId: 1, tool: "VER_CONTEUDO", defaultRule: true }],
      NomeEscola: "Escola Projeto",
      Foto: "https://exemplo.com/foto-joao.jpg",
      Nome: "João Silva",
      city: { id: "1", name: "São Paulo" },
      state: { id: "SP", name: "São Paulo" },
    },
  ],
  questoes: [
    {
      ID: 1,
      IDMateria: 1,
      IDSerie: 5,
      IDPeriodo: 1,
      Pergunta: "Quanto é 2 + 2?",
      Descricao: "Questão básica de matemática",
      Gabarito: "4",
      Ativo: true,
      IDEnsino: 1,
      IDMaster: 1,
      IDUsuario: 2,
      DataCriacao: "2024-01-01T00:00:00Z",
      Compartilhar: true,
      Aprovado: true,
      Netbil: false,
      Sessao: "sessao-questao-1",
      Tipo: "MULTIPLA_ESCOLHA",
      IDPerfil: 2,
      palavraChave: "matematica basica",
      idUnidadeTematica: 1,
      idDificuldade: 1,
    },
  ],
  headers: {
    "Content-Type": "application/json",
    profileID: "1",
    masterID: "1",
    schoolID: "1",
    userId: "1",
    section: "login",
  },
};