export const schoolMock = {
  anoLetivoAtual: 2026,

  // =========================
  // 👤 PERFIS (LOGIN BASE)
  // =========================
  perfis: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@escola.com",
      role: "ALUNO",
      status: "ativo",
      ultimoAcesso: "2026-02-01",
    },
    {
      id: 2,
      nome: "Carlos Souza",
      email: "carlos@escola.com",
      role: "PROFESSOR",
      status: "ativo",
      ultimoAcesso: "2026-02-02",
    },
    {
      id: 3,
      nome: "Maria Silva",
      email: "maria@gmail.com",
      role: "RESPONSAVEL",
      status: "ativo",
      ultimoAcesso: "2026-02-03",
    },
    {
      id: 4,
      nome: "Ana Gestora",
      email: "ana@escola.com",
      role: "GESTOR",
      status: "ativo",
      ultimoAcesso: "2026-02-04",
    },
  ],

  // =========================
  // 🏫 TURMAS
  // =========================
  turmas: [
    {
      id: 1,
      nome: "1º Ano A",
      turno: "Manhã",
      anoLetivo: 2026,
      alunos: [1],
      professores: [2],
      disciplinas: [1, 2],
    },
  ],

  // =========================
  // 📚 DISCIPLINAS
  // =========================
  disciplinas: [
    {
      id: 1,
      nome: "Matemática",
      professorId: 2,
      turmaId: 1,
    },
    {
      id: 2,
      nome: "Português",
      professorId: 2,
      turmaId: 1,
    },
  ],

  // =========================
  // 👨‍🎓 ALUNOS
  // =========================
  alunos: [
    {
      id: 1,
      perfilId: 1,
      turmaId: 1,
      responsaveis: [3],
      frequenciaGeral: 92,
    },
  ],

  // =========================
  // 👩 RESPONSÁVEIS
  // =========================
  responsaveis: [
    {
      id: 3,
      perfilId: 3,
      alunos: [1],
    },
  ],

  // =========================
  // 👨‍🏫 PROFESSORES
  // =========================
  professores: [
    {
      id: 2,
      perfilId: 2,
      disciplinas: [1, 2],
      turmas: [1],
      cargaHoraria: "40h",
    },
  ],

  // =========================
  // 📝 ATIVIDADES
  // =========================
  atividades: [
    {
      id: 1,
      disciplinaId: 1,
      turmaId: 1,
      titulo: "Lista de Exercícios 1",
      descricao: "Exercícios sobre equações básicas",
      dataEntrega: "2026-03-10",
      valor: 10,
      notas: [
        {
          alunoId: 1,
          nota: 8.5,
          entregue: true,
        },
      ],
    },
    {
      id: 2,
      disciplinaId: 2,
      turmaId: 1,
      titulo: "Redação Bimestral",
      descricao: "Produção de texto dissertativo",
      dataEntrega: "2026-03-15",
      valor: 10,
      notas: [
        {
          alunoId: 1,
          nota: 9.0,
          entregue: true,
        },
      ],
    },
  ],

  // =========================
  // 🧪 PROVAS
  // =========================
  provas: [
    {
      id: 1,
      disciplinaId: 1,
      turmaId: 1,
      titulo: "Prova Bimestral 1",
      data: "2026-04-20",
      valor: 10,
      notas: [
        {
          alunoId: 1,
          nota: 8.0,
        },
      ],
    },
  ],

  // =========================
  // 📊 BOLETINS
  // =========================
  boletins: [
    {
      alunoId: 1,
      anoLetivo: 2026,
      bimestres: [
        {
          numero: 1,
          disciplinas: [
            {
              disciplinaId: 1,
              media: 8.25,
              frequencia: 90,
              situacao: "Aprovado",
            },
            {
              disciplinaId: 2,
              media: 9.0,
              frequencia: 95,
              situacao: "Aprovado",
            },
          ],
        },
      ],
      mediaFinal: 8.62,
      situacaoFinal: "Aprovado",
    },
  ],

  // =========================
  // 📅 CALENDÁRIO
  // =========================
  calendario: [
    {
      id: 1,
      titulo: "Início do Ano Letivo",
      data: "2026-02-01",
      tipo: "EVENTO",
    },
    {
      id: 2,
      titulo: "Prova Bimestral de Matemática",
      data: "2026-04-20",
      tipo: "PROVA",
    },
    {
      id: 3,
      titulo: "Reunião de Pais",
      data: "2026-03-25",
      tipo: "REUNIAO",
    },
  ],

  // =========================
  // 📈 RELATÓRIO GESTOR
  // =========================
  relatorioGestor: {
    totalAlunos: 1,
    totalProfessores: 1,
    totalTurmas: 1,
    mediaGeralEscola: 8.62,
    frequenciaMedia: 92,
    disciplinasCriticas: [],
  },

  // =========================
  // 🔐 CONTROLE DE ACESSO
  // =========================
  controleAcesso: {
    ALUNO: ["VER_CONTEUDO", "VER_BOLETIM", "VER_ATIVIDADES"],
    RESPONSAVEL: ["VER_BOLETIM", "VER_ATIVIDADES", "VER_CALENDARIO"],
    PROFESSOR: ["CRIAR_ATIVIDADE", "LANÇAR_NOTA", "CRIAR_PROVA"],
    GESTOR: ["ACESSO_TOTAL"],
  },

  // =========================
  // 🧾 LOGS DO SISTEMA
  // =========================
  logs: [
    {
      id: 1,
      usuarioId: 4,
      acao: "CRIACAO_TURMA",
      data: "2026-01-10",
    },
    {
      id: 2,
      usuarioId: 2,
      acao: "CRIACAO_ATIVIDADE",
      data: "2026-02-05",
    },
  ],
};
