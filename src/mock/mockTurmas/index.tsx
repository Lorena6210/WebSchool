// mockTurmas.ts
import { TurmaCompleta } from "@/types/Turma"; // Ajuste o caminho se necessário

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
        frequencia: 90, // Novo: Porcentagem de frequência
        descricao:
          "Estudo de equações, funções e estruturas algébricas básicas.",
        topicos: [
          "Equações lineares",
          "Funções quadráticas",
          "Sistemas de equações",
        ],
        materiais: [
          { nome: "Vídeo introdutório", url: "https://exemplo.com/video" },
          {
            nome: "Exercícios práticos",
            url: "https://exemplo.com/exercicios",
          },
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
  },
];