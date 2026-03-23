// ============================================================
// WebSchool — Dados Mock para Demonstração
// ============================================================

import type {
  User,
  CalendarEvent,
  Activity,
  Exam,
  Grade,
  MedicalRecord,
  SchoolHistory,
  Notice,
  ClassSchedule,
} from "@/types";

// ------------------------------------------------------------
// Usuários
// ------------------------------------------------------------

export const mockUsers: User[] = [
  {
    id: "1",
    nome: "Lucas Ferreira",
    ra: "2024001",
    role: "aluno",
    turma: "9º A",
    avatarInitials: "LF",
  },
  {
    id: "2",
    nome: "Maria Ferreira",
    email: "maria.ferreira@email.com",
    role: "responsavel",
    avatarInitials: "MF",
    alunoId: "1", // responsável pelo aluno Lucas Ferreira
  },
  {
    id: "3",
    nome: "Prof. Carlos Mendes",
    email: "carlos.mendes@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "CM",
    disciplinas: ["Matemática"],
    bimestre: 1,
  },
  {
    id: "4",
    nome: "Diretora Ana Paula",
    email: "ana.paula@escola.edu.br",
    role: "gestor",
    avatarInitials: "AP",
  },
  {
    id: "5",
    nome: "Profa. Fernanda Lima",
    email: "fernanda.lima@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "FL",
    disciplinas: ["Português"],
    bimestre: 1,
  },
  {
    id: "6",
    nome: "Profa. Beatriz Nunes",
    email: "beatriz.nunes@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "BN",
    disciplinas: ["Ciências"],
    bimestre: 1,
  },
  {
    id: "7",
    nome: "Prof. Roberto Silva",
    email: "roberto.silva@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "RS",
    disciplinas: ["História"],
    bimestre: 1,
  },
  {
    id: "8",
    nome: "Profa. Juliana Costa",
    email: "juliana.costa@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "JC",
    disciplinas: ["Inglês"],
    bimestre: 1,
  },
  {
    id: "9",
    nome: "Prof. André Souza",
    email: "andre.souza@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "AS",
    disciplinas: ["Geografia"],
    bimestre: 1,
  },
  {
    id: "10",
    nome: "Prof. Marcos Oliveira",
    email: "marcos.oliveira@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "MO",
    disciplinas: ["Educação Física"],
    bimestre: 1,
  },
  {
    id: "11",
    nome: "Profa. Camila Rocha",
    email: "camila.rocha@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "CR",
    disciplinas: ["Arte"],
    bimestre: 1,
  },
  {
    id: "12",
    nome: "Pedro Ferreira",
    ra: "2024012",
    role: "aluno",
    turma: "7º B",
    avatarInitials: "PF",
  },
  {
    id: "13",
    nome: "Ana Costa",
    ra: "2024013",
    role: "aluno",
    turma: "8º A",
    avatarInitials: "AC",
  },
];

// ------------------------------------------------------------
// Credenciais
// ------------------------------------------------------------

export const loginCredentials = [
  { identifier: "2024001", password: "aluno123", userId: "1" },
  { identifier: "maria.ferreira@email.com", password: "resp123", userId: "2" },
  { identifier: "carlos.mendes@escola.edu.br", password: "prof123", userId: "3" },
  { identifier: "ana.paula@escola.edu.br", password: "gestor123", userId: "4" },
  { identifier: "fernanda.lima@escola.edu.br", password: "prof123", userId: "5" },
  { identifier: "beatriz.nunes@escola.edu.br", password: "prof123", userId: "6" },
  { identifier: "roberto.silva@escola.edu.br", password: "prof123", userId: "7" },
  { identifier: "juliana.costa@escola.edu.br", password: "prof123", userId: "8" },
  { identifier: "andre.souza@escola.edu.br", password: "prof123", userId: "9" },
  { identifier: "marcos.oliveira@escola.edu.br", password: "prof123", userId: "10" },
  { identifier: "camila.rocha@escola.edu.br", password: "prof123", userId: "11" },
];

// ------------------------------------------------------------
// Calendário
// ------------------------------------------------------------

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "e1",
    titulo: "Prova de Matemática",
    data: "2026-03-10",
    horario: "08:00",
    tipo: "prova",
    descricao: "Conteúdo: Equações do 2º grau",
    turma: "9º A",
  },
  {
    id: "e2",
    titulo: "Reunião de Pais",
    data: "2026-03-15",
    horario: "19:00",
    tipo: "reuniao",
    descricao: "Reunião bimestral com responsáveis",
  },
  {
    id: "e3",
    titulo: "Festa Junina",
    data: "2026-06-20",
    horario: "14:00",
    tipo: "evento",
    descricao: "Evento cultural da escola",
  },
];

// ------------------------------------------------------------
// Atividades
// ------------------------------------------------------------

export const mockActivities: Activity[] = [
  {
    id: "a1",
    titulo: "Lista de Exercícios — Equações",
    descricao: "Resolver exercícios 1 a 20",
    disciplina: "Matemática",
    dataEntrega: "2026-03-08",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    turma: "9º A",
    status: "atrasado",
  },
  {
    id: "a2",
    titulo: "Redação — Meio Ambiente",
    descricao: "Redação dissertativa",
    disciplina: "Português",
    dataEntrega: "2026-03-12",
    professorId: "5",
    professorNome: "Profa. Fernanda Lima",
    turma: "9º A",
    status: "entregue",
    nota: 8.5,
  },
];

// ------------------------------------------------------------
// Provas
// ------------------------------------------------------------

export const mockExams: Exam[] = [
  {
    id: "p1",
    titulo: "Prova Bimestral — Matemática",
    disciplina: "Matemática",
    data: "2026-03-10",
    horario: "08:00",
    sala: "Sala 12",
    turma: "9º A",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    conteudo: "Equações do 2º grau, Funções",
  },
  {
    id: "p2",
    titulo: "Prova Bimestral — Português",
    disciplina: "Português",
    data: "2026-03-18",
    horario: "09:00",
    sala: "Sala 12",
    turma: "9º A",
    professorId: "5",
    professorNome: "Profa. Fernanda Lima",
    conteudo: "Interpretação de texto e gramática",
  },
  {
    id: "p3",
    titulo: "Prova de Ciências",
    disciplina: "Ciências",
    data: "2026-03-25",
    horario: "10:00",
    sala: "Laboratório",
    turma: "9º A",
    professorId: "6",
    professorNome: "Profa. Beatriz Nunes",
    conteudo: "Sistema Solar e Ecossistemas",
  },
];

// ------------------------------------------------------------
// Notas
// ------------------------------------------------------------

export const mockGrades: Grade[] = [
  {
    disciplina: "Matemática",
    nota1: 7.5,
    nota2: 8,
    nota3: 6.5,
    media: 7.33,
    frequencia: 92,
    situacao: "cursando",
  },
  {
    disciplina: "Português",
    nota1: 8.5,
    nota2: 9,
    nota3: 8,
    media: 8.5,
    frequencia: 95,
    situacao: "cursando",
  },
];

// ------------------------------------------------------------
// Historico medico
// ------------------------------------------------------------

export const mockMedicalRecord: MedicalRecord = {
  alergias: ["Penicilina", "Amendoim"],
  laudos: [
    "Laudo oftalmologico - Miopia leve (2024)",
    "Laudo fonoaudiologico - Sem alteracoes (2023)",
  ],
  observacoes:
    "Aluno usa oculos. Recomenda-se sentar nas primeiras fileiras. Sem restricoes para atividade fisica.",
  contatoEmergencia: {
    nome: "Maria Ferreira",
    telefone: "(11) 99999-1234",
    parentesco: "Mae",
  },
};

// ------------------------------------------------------------
// Historico escolar
// ------------------------------------------------------------

export const mockSchoolHistory: SchoolHistory[] = [
  {
    anoLetivo: "2025",
    turma: "8o A",
    notas: [
      {
        disciplina: "Matematica",
        nota1: 8,
        nota2: 7.5,
        nota3: 8.5,
        nota4: 9,
        media: 8.25,
        frequencia: 94,
        situacao: "aprovado",
      },
      {
        disciplina: "Portugues",
        nota1: 7.5,
        nota2: 8,
        nota3: 8,
        nota4: 8.5,
        media: 8,
        frequencia: 96,
        situacao: "aprovado",
      },
    ],
    frequenciaGeral: 95,
    situacao: "aprovado",
  },
];

// ------------------------------------------------------------
// Grade horaria
// ------------------------------------------------------------

export const mockClassSchedule: ClassSchedule = {
  turma: "9o A",
  horarios: [
    {
      dia: "segunda",
      aulas: [
        {
          horario: "07:00 - 07:50",
          disciplina: "Matematica",
          professor: "Prof. Carlos Mendes",
          sala: "Sala 12",
        },
        {
          horario: "07:50 - 08:40",
          disciplina: "Portugues",
          professor: "Profa. Fernanda Lima",
          sala: "Sala 12",
        },
      ],
    },
    {
      dia: "terca",
      aulas: [
        {
          horario: "07:00 - 07:50",
          disciplina: "Ciencias",
          professor: "Profa. Beatriz Nunes",
          sala: "Lab. Ciencias",
        },
        {
          horario: "07:50 - 08:40",
          disciplina: "Historia",
          professor: "Prof. Roberto Silva",
          sala: "Sala 12",
        },
      ],
    },
    {
      dia: "quarta",
      aulas: [
        {
          horario: "07:00 - 07:50",
          disciplina: "Geografia",
          professor: "Prof. Andre Souza",
          sala: "Sala 12",
        },
        {
          horario: "07:50 - 08:40",
          disciplina: "Ingles",
          professor: "Profa. Juliana Costa",
          sala: "Sala 12",
        },
      ],
    },
    {
      dia: "quinta",
      aulas: [
        {
          horario: "07:00 - 07:50",
          disciplina: "Educacao Fisica",
          professor: "Prof. Marcos Oliveira",
          sala: "Quadra",
        },
        {
          horario: "07:50 - 08:40",
          disciplina: "Arte",
          professor: "Profa. Camila Rocha",
          sala: "Sala 12",
        },
      ],
    },
    {
      dia: "sexta",
      aulas: [
        {
          horario: "07:00 - 07:50",
          disciplina: "Matematica",
          professor: "Prof. Carlos Mendes",
          sala: "Sala 12",
        },
        {
          horario: "07:50 - 08:40",
          disciplina: "Portugues",
          professor: "Profa. Fernanda Lima",
          sala: "Sala 12",
        },
      ],
    },
  ],
};

// ------------------------------------------------------------
// Avisos
// ------------------------------------------------------------

// Presença dos alunos (usado pelo professor)
export interface AttendanceRecord {
  alunoId: string;
  alunoNome: string;
  data: string;
  presente: boolean;
}

export const mockAttendance: AttendanceRecord[] = [
  { alunoId: "1", alunoNome: "Lucas Ferreira", data: "2026-03-15", presente: true },
  { alunoId: "12", alunoNome: "Pedro Ferreira", data: "2026-03-15", presente: false },
  { alunoId: "13", alunoNome: "Ana Costa", data: "2026-03-15", presente: true },
];

// Alunos da turma do professor (para lançar notas e presença)
export const mockClassStudents = [
  { id: "1", nome: "Lucas Ferreira", ra: "2024001", nota1: 7.5, nota2: 8.0, media: 7.75, frequencia: 92 },
  { id: "12", nome: "Pedro Ferreira", ra: "2024012", nota1: 6.0, nota2: 7.0, media: 6.5, frequencia: 85 },
  { id: "13", nome: "Ana Costa", ra: "2024013", nota1: 9.0, nota2: 8.5, media: 8.75, frequencia: 98 },
  { id: "s4", nome: "Rafael Lima", ra: "2024014", nota1: 5.0, nota2: 6.5, media: 5.75, frequencia: 78 },
  { id: "s5", nome: "Julia Santos", ra: "2024015", nota1: 10.0, nota2: 9.5, media: 9.75, frequencia: 100 },
];

export const mockNotices: Notice[] = [
  {
    id: "n1",
    titulo: "Prova de Matemática na próxima semana",
    mensagem: "A prova bimestral de Matemática será realizada no dia 10/03.",
    tipo: "prova",
    data: "2026-03-03",
    autorId: "3",
    autorNome: "Prof. Carlos Mendes",
    destinatarios: ["aluno", "responsavel"],
  },
  {
    id: "n2",
    titulo: "Reunião de Pais — 15/03",
    mensagem: "Convidamos os responsáveis para reunião bimestral no salão principal.",
    tipo: "reuniao",
    data: "2026-03-01",
    autorId: "4",
    autorNome: "Diretora Ana Paula",
    destinatarios: ["responsavel"],
  },
  {
    id: "n3",
    titulo: "Aviso de Falta — Lucas Ferreira",
    mensagem: "Lucas Ferreira esteve ausente na aula de Matemática do dia 12/03. Favor justificar.",
    tipo: "geral",
    data: "2026-03-12",
    autorId: "3",
    autorNome: "Prof. Carlos Mendes",
    destinatarios: ["responsavel", "gestor"],
  },
  {
    id: "n4",
    titulo: "Comunicado: Semana de Provas",
    mensagem: "Na semana de 18 a 22/03 serão aplicadas as provas bimestrais de todas as disciplinas.",
    tipo: "prova",
    data: "2026-03-10",
    autorId: "4",
    autorNome: "Diretora Ana Paula",
    destinatarios: ["aluno", "responsavel", "professor"],
  },
  {
    id: "n5",
    titulo: "Comunicado: Festa Junina 2026",
    mensagem: "A Festa Junina será realizada no dia 20/06 a partir das 14h. Partipacao de todos os alunos.",
    tipo: "geral",
    data: "2026-03-14",
    autorId: "4",
    autorNome: "Diretora Ana Paula",
    destinatarios: ["aluno", "responsavel", "professor"],
  },
];

// ------------------------------------------------------------
// Delay simulado
// ------------------------------------------------------------

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ------------------------------------------------------------
// Mock API
// ------------------------------------------------------------

export const MockAPI = {
  auth: {
    login: async (identifier: string, password: string) => {
      await delay(800);

      const cred = loginCredentials.find(
        (c) => c.identifier === identifier && c.password === password
      );

      if (!cred) {
        throw new Error("Credenciais inválidas");
      }

      const user = mockUsers.find((u) => u.id === cred.userId);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    },

    logout: async () => {
      await delay(500);
      return true;
    },
  },

  users: {
    getById: async (id: string) => {
      await delay(400);
      return mockUsers.find((u) => u.id === id) || null;
    },

    getAll: async () => {
      await delay(600);
      return [...mockUsers];
    },
  },

  calendar: {
    getEvents: async () => {
      await delay(500);
      return [...mockCalendarEvents];
    },
  },

  academic: {
    getActivities: async () => {
      await delay(600);
      return [...mockActivities];
    },

    getExams: async () => {
      await delay(500);
      return [...mockExams];
    },

    getGrades: async () => {
      await delay(700);
      return [...mockGrades];
    },

    getSchoolHistory: async () => {
      await delay(700);
      return [...mockSchoolHistory];
    },

    getSchedule: async () => {
      await delay(500);
      return mockClassSchedule;
    },
  },

  notices: {
    getAll: async () => {
      await delay(400);
      return [...mockNotices];
    },
  },
};