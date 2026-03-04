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

// ---- Usuários Mock ----
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
  },
  {
    id: "3",
    nome: "Prof. Carlos Mendes",
    email: "carlos.mendes@escola.edu.br",
    role: "professor",
    turma: "9º A",
    avatarInitials: "CM",
  },
  {
    id: "4",
    nome: "Diretora Ana Paula",
    email: "ana.paula@escola.edu.br",
    role: "gestor",
    avatarInitials: "AP",
  },
];

// Credenciais de login mock
export const loginCredentials = [
  { identifier: "2024001", password: "aluno123", userId: "1" }, // RA para aluno
  { identifier: "maria.ferreira@email.com", password: "resp123", userId: "2" },
  { identifier: "carlos.mendes@escola.edu.br", password: "prof123", userId: "3" },
  { identifier: "ana.paula@escola.edu.br", password: "gestor123", userId: "4" },
];

// ---- Calendário Mock ----
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
    titulo: "Aula de Ciências",
    data: "2026-03-05",
    horario: "10:00",
    tipo: "aula",
    turma: "9º A",
  },
  {
    id: "e4",
    titulo: "Festa Junina",
    data: "2026-06-20",
    horario: "14:00",
    tipo: "evento",
    descricao: "Evento cultural da escola",
  },
  {
    id: "e5",
    titulo: "Prova de Português",
    data: "2026-03-18",
    horario: "09:00",
    tipo: "prova",
    turma: "9º A",
  },
  {
    id: "e6",
    titulo: "Aula de Educação Física",
    data: "2026-03-07",
    horario: "14:00",
    tipo: "aula",
    turma: "9º A",
  },
];

// ---- Atividades Mock ----
export const mockActivities: Activity[] = [
  {
    id: "a1",
    titulo: "Lista de Exercícios — Equações",
    descricao: "Resolver os exercícios 1 a 20 do capítulo 5",
    disciplina: "Matemática",
    dataEntrega: "2026-03-08",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    turma: "9º A",
    status: "pendente",
  },
  {
    id: "a2",
    titulo: "Redação — Meio Ambiente",
    descricao: "Escrever uma redação dissertativa sobre preservação ambiental",
    disciplina: "Português",
    dataEntrega: "2026-03-12",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    turma: "9º A",
    status: "entregue",
    nota: 8.5,
  },
  {
    id: "a3",
    titulo: "Mapa Mental — Sistema Solar",
    descricao: "Criar um mapa mental sobre os planetas do sistema solar",
    disciplina: "Ciências",
    dataEntrega: "2026-02-28",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    turma: "9º A",
    status: "atrasado",
  },
  {
    id: "a4",
    titulo: "Exercícios de Gramática",
    descricao: "Páginas 45 a 50 do livro didático",
    disciplina: "Português",
    dataEntrega: "2026-03-20",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    turma: "9º A",
    status: "pendente",
  },
];

// ---- Provas Mock ----
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
    conteudo: "Equações do 2º grau, Funções, Geometria Plana",
  },
  {
    id: "p2",
    titulo: "Prova Bimestral — Português",
    disciplina: "Português",
    data: "2026-03-18",
    horario: "09:00",
    sala: "Sala 12",
    turma: "9º A",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    conteudo: "Interpretação de texto, Gramática, Redação",
  },
  {
    id: "p3",
    titulo: "Prova de Ciências",
    disciplina: "Ciências",
    data: "2026-03-25",
    horario: "10:00",
    sala: "Laboratório",
    turma: "9º A",
    professorId: "3",
    professorNome: "Prof. Carlos Mendes",
    conteudo: "Sistema Solar, Ecossistemas",
  },
];

// ---- Notas Mock ----
export const mockGrades: Grade[] = [
  {
    disciplina: "Matemática",
    nota1: 7.5,
    nota2: 8.0,
    nota3: 6.5,
    nota4: undefined,
    media: 7.33,
    frequencia: 92,
    situacao: "cursando",
  },
  {
    disciplina: "Português",
    nota1: 8.5,
    nota2: 9.0,
    nota3: 8.0,
    nota4: undefined,
    media: 8.5,
    frequencia: 95,
    situacao: "cursando",
  },
  {
    disciplina: "Ciências",
    nota1: 6.0,
    nota2: 7.5,
    nota3: 7.0,
    nota4: undefined,
    media: 6.83,
    frequencia: 88,
    situacao: "cursando",
  },
  {
    disciplina: "História",
    nota1: 9.0,
    nota2: 8.5,
    nota3: 9.5,
    nota4: undefined,
    media: 9.0,
    frequencia: 97,
    situacao: "cursando",
  },
  {
    disciplina: "Geografia",
    nota1: 7.0,
    nota2: 7.5,
    nota3: 8.0,
    nota4: undefined,
    media: 7.5,
    frequencia: 90,
    situacao: "cursando",
  },
  {
    disciplina: "Inglês",
    nota1: 8.0,
    nota2: 8.5,
    nota3: 7.5,
    nota4: undefined,
    media: 8.0,
    frequencia: 93,
    situacao: "cursando",
  },
];

// ---- Histórico Médico Mock ----
export const mockMedicalRecord: MedicalRecord = {
  alergias: ["Penicilina", "Amendoim"],
  laudos: [
    "Laudo oftalmológico — Miopia leve (2024)",
    "Laudo fonoaudiológico — Sem alterações (2023)",
  ],
  observacoes:
    "Aluno usa óculos. Necessita sentar nas primeiras fileiras. Não possui restrições para atividades físicas.",
  contatoEmergencia: {
    nome: "Maria Ferreira",
    telefone: "(11) 99999-1234",
    parentesco: "Mãe",
  },
};

// ---- Histórico Escolar Mock ----
export const mockSchoolHistory: SchoolHistory[] = [
  {
    anoLetivo: "2025",
    turma: "8º A",
    notas: [
      { disciplina: "Matemática", nota1: 8.0, nota2: 7.5, nota3: 8.5, nota4: 9.0, media: 8.25, frequencia: 94, situacao: "aprovado" },
      { disciplina: "Português", nota1: 7.5, nota2: 8.0, nota3: 8.0, nota4: 8.5, media: 8.0, frequencia: 96, situacao: "aprovado" },
      { disciplina: "Ciências", nota1: 7.0, nota2: 7.5, nota3: 8.0, nota4: 7.5, media: 7.5, frequencia: 90, situacao: "aprovado" },
    ],
    frequenciaGeral: 93,
    situacao: "aprovado",
  },
  {
    anoLetivo: "2024",
    turma: "7º A",
    notas: [
      { disciplina: "Matemática", nota1: 6.5, nota2: 7.0, nota3: 7.5, nota4: 8.0, media: 7.25, frequencia: 89, situacao: "aprovado" },
      { disciplina: "Português", nota1: 8.0, nota2: 8.5, nota3: 7.5, nota4: 9.0, media: 8.25, frequencia: 95, situacao: "aprovado" },
    ],
    frequenciaGeral: 91,
    situacao: "aprovado",
  },
];

// ---- Avisos Mock ----
export const mockNotices: Notice[] = [
  {
    id: "n1",
    titulo: "Prova de Matemática na próxima semana",
    mensagem:
      "Lembramos que a prova bimestral de Matemática será realizada no dia 10/03 às 08h. Conteúdo: Equações do 2º grau, Funções e Geometria Plana. Estudem bastante!",
    tipo: "prova",
    data: "2026-03-03",
    autorId: "3",
    autorNome: "Prof. Carlos Mendes",
    destinatarios: ["aluno", "responsavel"],
  },
  {
    id: "n2",
    titulo: "Reunião de Pais — 15/03",
    mensagem:
      "Convidamos todos os responsáveis para a reunião bimestral que ocorrerá no dia 15/03 às 19h no auditório da escola. Presença obrigatória.",
    tipo: "reuniao",
    data: "2026-03-01",
    autorId: "4",
    autorNome: "Diretora Ana Paula",
    destinatarios: ["responsavel"],
  },
  {
    id: "n3",
    titulo: "Entrega da Redação",
    mensagem:
      "A atividade de redação sobre Meio Ambiente deve ser entregue até o dia 12/03. Não serão aceitas entregas após o prazo.",
    tipo: "atividade",
    data: "2026-03-02",
    autorId: "3",
    autorNome: "Prof. Carlos Mendes",
    destinatarios: ["aluno"],
  },
  {
    id: "n4",
    titulo: "Comunicado Geral — Recesso de Carnaval",
    mensagem:
      "Informamos que a escola estará fechada nos dias 02 e 03 de março (segunda e terça-feira de carnaval). As aulas retornam normalmente na quarta-feira, dia 04/03.",
    tipo: "geral",
    data: "2026-02-28",
    autorId: "4",
    autorNome: "Diretora Ana Paula",
    destinatarios: ["aluno", "responsavel", "professor", "gestor"],
  },
];

// ---- Grade Horária Mock ----
export const mockClassSchedule: ClassSchedule = {
  turma: "9º A",
  horarios: [
    {
      dia: "segunda",
      aulas: [
        { horario: "07:00 - 07:50", disciplina: "Matemática", professor: "Prof. Carlos Mendes", sala: "Sala 12" },
        { horario: "07:50 - 08:40", disciplina: "Matemática", professor: "Prof. Carlos Mendes", sala: "Sala 12" },
        { horario: "08:40 - 09:30", disciplina: "Português", professor: "Profa. Fernanda Lima", sala: "Sala 12" },
        { horario: "09:50 - 10:40", disciplina: "História", professor: "Prof. Roberto Silva", sala: "Sala 12" },
        { horario: "10:40 - 11:30", disciplina: "Inglês", professor: "Profa. Juliana Costa", sala: "Sala 12" },
      ],
    },
    {
      dia: "terca",
      aulas: [
        { horario: "07:00 - 07:50", disciplina: "Ciências", professor: "Profa. Beatriz Nunes", sala: "Lab. Ciências" },
        { horario: "07:50 - 08:40", disciplina: "Ciências", professor: "Profa. Beatriz Nunes", sala: "Lab. Ciências" },
        { horario: "08:40 - 09:30", disciplina: "Geografia", professor: "Prof. André Souza", sala: "Sala 12" },
        { horario: "09:50 - 10:40", disciplina: "Educação Física", professor: "Prof. Marcos Oliveira", sala: "Quadra" },
        { horario: "10:40 - 11:30", disciplina: "Arte", professor: "Profa. Camila Rocha", sala: "Sala 12" },
      ],
    },
    {
      dia: "quarta",
      aulas: [
        { horario: "07:00 - 07:50", disciplina: "Português", professor: "Profa. Fernanda Lima", sala: "Sala 12" },
        { horario: "07:50 - 08:40", disciplina: "Português", professor: "Profa. Fernanda Lima", sala: "Sala 12" },
        { horario: "08:40 - 09:30", disciplina: "Matemática", professor: "Prof. Carlos Mendes", sala: "Sala 12" },
        { horario: "09:50 - 10:40", disciplina: "Inglês", professor: "Profa. Juliana Costa", sala: "Sala 12" },
        { horario: "10:40 - 11:30", disciplina: "História", professor: "Prof. Roberto Silva", sala: "Sala 12" },
      ],
    },
    {
      dia: "quinta",
      aulas: [
        { horario: "07:00 - 07:50", disciplina: "Matemática", professor: "Prof. Carlos Mendes", sala: "Sala 12" },
        { horario: "07:50 - 08:40", disciplina: "Ciências", professor: "Profa. Beatriz Nunes", sala: "Lab. Ciências" },
        { horario: "08:40 - 09:30", disciplina: "Geografia", professor: "Prof. André Souza", sala: "Sala 12" },
        { horario: "09:50 - 10:40", disciplina: "Português", professor: "Profa. Fernanda Lima", sala: "Sala 12" },
        { horario: "10:40 - 11:30", disciplina: "Arte", professor: "Profa. Camila Rocha", sala: "Sala 12" },
      ],
    },
    {
      dia: "sexta",
      aulas: [
        { horario: "07:00 - 07:50", disciplina: "Educação Física", professor: "Prof. Marcos Oliveira", sala: "Quadra" },
        { horario: "07:50 - 08:40", disciplina: "Inglês", professor: "Profa. Juliana Costa", sala: "Sala 12" },
        { horario: "08:40 - 09:30", disciplina: "História", professor: "Prof. Roberto Silva", sala: "Sala 12" },
        { horario: "09:50 - 10:40", disciplina: "Matemática", professor: "Prof. Carlos Mendes", sala: "Sala 12" },
        { horario: "10:40 - 11:30", disciplina: "Português", professor: "Profa. Fernanda Lima", sala: "Sala 12" },
      ],
    },
  ],
};

// ============================================================
// Camada de Serviço Mock (Simulação de API)
// ============================================================

/**
 * Simula um atraso de rede para dar mais realismo à interface (loading states)
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MockAPI = {
  auth: {
    login: async (identifier: string, password: string) => {
      await delay(800); // Simula delay de rede
      const cred = loginCredentials.find(
        (c) => c.identifier === identifier && c.password === password
      );

      if (!cred) {
        throw new Error("Credenciais inválidas");
      }

      const user = mockUsers.find((u) => u.id === cred.userId);
      return user || null;
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
      return mockUsers;
    },
  },

  calendar: {
    getEvents: async () => {
      await delay(500);
      return mockCalendarEvents;
    },
  },

  academic: {
    getActivities: async () => {
      await delay(600);
      return mockActivities;
    },
    getExams: async () => {
      await delay(500);
      return mockExams;
    },
    getGrades: async () => {
      await delay(700);
      return mockGrades;
    },
    getSchoolHistory: async () => {
      await delay(800);
      return mockSchoolHistory;
    },
    getSchedule: async () => {
      await delay(400);
      return mockClassSchedule;
    },
  },

  medical: {
    getRecord: async () => {
      await delay(500);
      return mockMedicalRecord;
    },
  },

  notices: {
    getAll: async () => {
      await delay(400);
      return mockNotices;
    },
  },
};
