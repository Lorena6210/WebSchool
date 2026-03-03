"use client";

// ============================================================
// WebSchool — Relatórios (Gestor)
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, StatCard } from "@/components/ui/stat-card";
import { mockGrades } from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const ACCENT = "#3B4FD8";

const performanceData = mockGrades.map((g) => ({
  disciplina: g.disciplina.substring(0, 5),
  media: g.media || 0,
  frequencia: g.frequencia,
}));

const monthlyData = [
  { mes: "Ago", media: 7.2, frequencia: 91 },
  { mes: "Set", media: 7.5, frequencia: 93 },
  { mes: "Out", media: 7.8, frequencia: 92 },
  { mes: "Nov", media: 7.6, frequencia: 90 },
  { mes: "Dez", media: 8.0, frequencia: 94 },
  { mes: "Fev", media: 7.9, frequencia: 93 },
];

const situacaoData = [
  { name: "Aprovados", value: 24, color: "#166534" },
  { name: "Em Recuperação", value: 6, color: "#B45309" },
  { name: "Reprovados", value: 2, color: "#DC2626" },
];

export default function Relatorios() {
  const avgGrade = mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;
  const avgFreq = mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length;

  return (
    <DashboardLayout>
      <PageHeader
        title="Relatórios"
        subtitle="Análise de desempenho e frequência da escola"
        accentColor={ACCENT}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Média Geral" value={avgGrade.toFixed(1)} subtitle="Todas as turmas" accentColor={ACCENT} icon={<TrendingUp size={16} />} />
        <StatCard title="Frequência Média" value={`${avgFreq.toFixed(0)}%`} subtitle="Presença geral" accentColor="#166534" icon={<TrendingUp size={16} />} />
        <StatCard title="Taxa de Aprovação" value="75%" subtitle="Alunos aprovados" accentColor="#B45309" icon={<Minus size={16} />} />
        <StatCard title="Em Recuperação" value="6" subtitle="Precisam de apoio" accentColor="#DC2626" icon={<TrendingDown size={16} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Média por disciplina */}
        <SectionCard title="Média por Disciplina">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C191710" />
                <XAxis dataKey="disciplina" tick={{ fontSize: 11, fill: "#1C191780" }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#1C191780" }} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "2px solid #1C1917",
                    borderRadius: "8px",
                    boxShadow: "4px 4px 0px #1C1917",
                  }}
                />
                <Bar dataKey="media" name="Média" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.media >= 7 ? "#166534" : entry.media >= 5 ? "#B45309" : "#DC2626"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Situação dos alunos */}
        <SectionCard title="Situação dos Alunos — 9º A">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={situacaoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {situacaoData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span className="text-xs text-[#1C1917]">{value}</span>}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "2px solid #1C1917",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Evolução mensal */}
      <SectionCard title="Evolução Mensal — Média e Frequência">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C191710" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#1C191780" }} />
              <YAxis yAxisId="left" domain={[0, 10]} tick={{ fontSize: 12, fill: "#1C191780" }} />
              <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tick={{ fontSize: 12, fill: "#1C191780" }} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "2px solid #1C1917",
                  borderRadius: "8px",
                  boxShadow: "4px 4px 0px #1C1917",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="media"
                name="Média"
                stroke={ACCENT}
                strokeWidth={2.5}
                dot={{ fill: ACCENT, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="frequencia"
                name="Frequência (%)"
                stroke="#166534"
                strokeWidth={2.5}
                dot={{ fill: "#166534", r: 4 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#3B4FD8]" />
            <span className="text-xs text-[#1C1917]/60">Média (0–10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-800 border-dashed" style={{ borderTop: "2px dashed #166534", background: "none" }} />
            <span className="text-xs text-[#1C1917]/60">Frequência (%)</span>
          </div>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
