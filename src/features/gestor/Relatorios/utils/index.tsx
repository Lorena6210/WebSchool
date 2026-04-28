import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { mockGrades } from "@/lib/mockData";

export const ACCENT = "#e5244a";

export const performanceData = mockGrades.map((g) => ({
  disciplina: g.disciplina.substring(0, 5),
  media: g.media || 0,
  frequencia: g.frequencia,
}));

export const monthlyData = [
  { mes: "Ago", media: 7.2, frequencia: 91 },
  { mes: "Set", media: 7.5, frequencia: 93 },
  { mes: "Out", media: 7.8, frequencia: 92 },
  { mes: "Nov", media: 7.6, frequencia: 90 },
  { mes: "Dez", media: 8.0, frequencia: 94 },
  { mes: "Fev", media: 7.9, frequencia: 93 },
];

export const situacaoData = [
  { name: "Aprovados", value: 24, color: "#4ade80" },
  { name: "Em Recuperação", value: 6, color: "#fbbf24" },
  { name: "Reprovados", value: 2, color: "#e5244a" },
];

export function getReportStats() {
  const avgGrade = mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;
  const avgFreq = mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length;

  const kpis = [
    {
      title: "Média Geral",
      value: avgGrade.toFixed(1),
      subtitle: "Todas as turmas",
      accentColor: ACCENT,
      icon: <TrendingUp size={16} />,
    },
    {
      title: "Frequência Média",
      value: `${avgFreq.toFixed(0)}%`,
      subtitle: "Presença geral",
      accentColor: "#4ade80",
      icon: <TrendingUp size={16} />,
    },
    {
      title: "Taxa de Aprovação",
      value: "75%",
      subtitle: "Alunos aprovados",
      accentColor: "#fbbf24",
      icon: <Minus size={16} />,
    },
    {
      title: "Em Recuperação",
      value: "6",
      subtitle: "Precisam de apoio",
      accentColor: "#e5244a",
      icon: <TrendingDown size={16} />,
    },
  ];

  return { avgGrade, avgFreq, kpis };
}