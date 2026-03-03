"use client";

// ============================================================
// WebSchool — Boletim com Gráficos
// Design: Academic Warmth — Recharts + cards neobrutalist
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockGrades } from "@/lib/mockData";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

const ACCENT = "#3B4FD8";

export default function Boletim() {
  const { user } = useAuth();
  const isAluno = user?.role === "aluno";

  const avgGrade =
    mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;
  const avgFrequency =
    mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length;

  const radarData = mockGrades.map((g) => ({
    disciplina: g.disciplina.substring(0, 5),
    nota: g.media || 0,
    fullMark: 10,
  }));

  const barData = mockGrades.map((g) => ({
    name: g.disciplina.substring(0, 4) + ".",
    N1: g.nota1 || 0,
    N2: g.nota2 || 0,
    N3: g.nota3 || 0,
  }));

  return (
    <DashboardLayout>
      <PageHeader
        title="Boletim Escolar"
        subtitle={`Ano letivo 2026 — ${isAluno ? "Suas notas" : `Notas de Lucas Ferreira`} · Turma 9º A`}
        accentColor={ACCENT}
      />

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div
          className="bg-white border-2 border-[#1C1917] rounded-xl p-5 text-center"
          style={{ boxShadow: "4px 4px 0px #1C1917" }}
        >
          <p className="text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider mb-1">Média Geral</p>
          <p
            className={`text-4xl font-bold ${
              avgGrade >= 7 ? "text-green-700" : avgGrade >= 5 ? "text-amber-700" : "text-red-700"
            }`}
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {avgGrade.toFixed(1)}
          </p>
          <p className="text-xs text-[#1C1917]/40 mt-1">de 10.0</p>
        </div>
        <div
          className="bg-white border-2 border-[#1C1917] rounded-xl p-5 text-center"
          style={{ boxShadow: "4px 4px 0px #1C1917" }}
        >
          <p className="text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider mb-1">Frequência</p>
          <p
            className={`text-4xl font-bold ${
              avgFrequency >= 75 ? "text-green-700" : "text-red-700"
            }`}
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {avgFrequency.toFixed(0)}%
          </p>
          <p className="text-xs text-[#1C1917]/40 mt-1">mínimo: 75%</p>
        </div>
        <div
          className="bg-white border-2 border-[#1C1917] rounded-xl p-5 text-center"
          style={{ boxShadow: "4px 4px 0px #1C1917" }}
        >
          <p className="text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider mb-1">Situação</p>
          <p
            className="text-2xl font-bold text-green-700 mt-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Cursando
          </p>
          <Badge color="#166534" className="mt-2">2º Bimestre</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de barras por bimestre */}
        <SectionCard title="Notas por Bimestre">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C191710" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#1C191780" }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#1C191780" }} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "2px solid #1C1917",
                    borderRadius: "8px",
                    boxShadow: "4px 4px 0px #1C1917",
                  }}
                />
                <ReferenceLine y={7} stroke="#166534" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "Mínimo", position: "right", fontSize: 10, fill: "#166534" }} />
                <Bar dataKey="N1" name="1º Bim" fill={ACCENT} radius={[3, 3, 0, 0]} />
                <Bar dataKey="N2" name="2º Bim" fill="#166534" radius={[3, 3, 0, 0]} />
                <Bar dataKey="N3" name="3º Bim" fill="#B45309" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ACCENT }} /><span className="text-xs text-[#1C1917]/60">1º Bim</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-800" /><span className="text-xs text-[#1C1917]/60">2º Bim</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-700" /><span className="text-xs text-[#1C1917]/60">3º Bim</span></div>
          </div>
        </SectionCard>

        {/* Radar de desempenho */}
        <SectionCard title="Desempenho por Disciplina">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1C191720" />
                <PolarAngleAxis dataKey="disciplina" tick={{ fontSize: 11, fill: "#1C191780" }} />
                <Radar
                  name="Média"
                  dataKey="nota"
                  stroke={ACCENT}
                  fill={ACCENT}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Tabela completa de notas */}
      <SectionCard title="Notas Detalhadas — 2026">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#1C1917]/10">
                <th className="text-left py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Disciplina</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">1º Bim</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">2º Bim</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">3º Bim</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">4º Bim</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Média</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Freq.</th>
                <th className="text-center py-3 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Situação</th>
              </tr>
            </thead>
            <tbody>
              {mockGrades.map((grade) => (
                <tr
                  key={grade.disciplina}
                  className="border-b border-[#1C1917]/5 hover:bg-[#FDFAF5] transition-colors"
                >
                  <td className="py-3 font-semibold text-[#1C1917]">{grade.disciplina}</td>
                  <td className="py-3 text-center text-[#1C1917]/70">{grade.nota1?.toFixed(1) || "—"}</td>
                  <td className="py-3 text-center text-[#1C1917]/70">{grade.nota2?.toFixed(1) || "—"}</td>
                  <td className="py-3 text-center text-[#1C1917]/70">{grade.nota3?.toFixed(1) || "—"}</td>
                  <td className="py-3 text-center text-[#1C1917]/30">—</td>
                  <td className="py-3 text-center">
                    <span
                      className={`font-bold text-base ${
                        (grade.media || 0) >= 7
                          ? "text-green-700"
                          : (grade.media || 0) >= 5
                          ? "text-amber-700"
                          : "text-red-700"
                      }`}
                    >
                      {grade.media?.toFixed(1) || "—"}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={grade.frequencia >= 75 ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                      {grade.frequencia}%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <Badge
                      color={
                        (grade.media || 0) >= 7
                          ? "#166534"
                          : (grade.media || 0) >= 5
                          ? "#B45309"
                          : "#DC2626"
                      }
                    >
                      {(grade.media || 0) >= 7 ? "Aprovado" : (grade.media || 0) >= 5 ? "Rec." : "Reprovado"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
