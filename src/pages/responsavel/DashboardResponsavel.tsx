"use client";

// ============================================================
// WebSchool — Mural do Responsável
// Design: Academic Warmth — cor âncora: laranja-âmbar #B45309
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatCard, PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockGrades, mockExams, mockNotices, mockUsers } from "@/lib/mockData";
import { BarChart2, FileText, Bell, User, TrendingUp } from "lucide-react";

const ACCENT = "#B45309";
const ALUNO = mockUsers.find((u) => u.role === "aluno")!;

export default function ResponsavelMural() {
  const { user } = useAuth();

  const avgGrade =
    mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;
  const avgFrequency =
    mockGrades.reduce((acc, g) => acc + g.frequencia, 0) / mockGrades.length;

  const myNotices = mockNotices.filter((n) =>
    n.destinatarios.includes("responsavel")
  );

  const today = new Date();
  const greeting =
    today.getHours() < 12 ? "Bom dia" : today.getHours() < 18 ? "Boa tarde" : "Boa noite";

  return (
    <DashboardLayout>
      <PageHeader
        title={`${greeting}, ${user?.nome.split(" ")[0]}!`}
        subtitle={`Acompanhando o desempenho de ${ALUNO.nome} — ${ALUNO.turma}`}
        accentColor={ACCENT}
      />

      {/* Card do aluno */}
      <div
        className="bg-white border-2 border-[#1C1917] rounded-xl p-5 mb-6 flex items-center gap-4"
        style={{ boxShadow: "4px 4px 0px #1C1917" }}
      >
        <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-lg">
          {ALUNO.avatarInitials}
        </div>
        <div>
          <p className="font-bold text-[#1C1917] text-lg" style={{ fontFamily: "'Fraunces', serif" }}>
            {ALUNO.nome}
          </p>
          <p className="text-[#1C1917]/50 text-sm">RA: {ALUNO.ra} · Turma: {ALUNO.turma}</p>
          <Badge color="#6B21A8" className="mt-1">Aluno</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Média Geral"
          value={avgGrade.toFixed(1)}
          subtitle="Todas as disciplinas"
          icon={<BarChart2 size={16} />}
          accentColor={ACCENT}
        />
        <StatCard
          title="Frequência Média"
          value={`${avgFrequency.toFixed(0)}%`}
          subtitle="Presença nas aulas"
          icon={<User size={16} />}
          accentColor="#166534"
        />
        <StatCard
          title="Provas Próximas"
          value={mockExams.length}
          subtitle="Este bimestre"
          icon={<FileText size={16} />}
          accentColor="#6B21A8"
        />
        <StatCard
          title="Avisos"
          value={myNotices.length}
          subtitle="Para responsáveis"
          icon={<Bell size={16} />}
          accentColor="#3B4FD8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Boletim resumido */}
        <div className="lg:col-span-2">
          <SectionCard title="Boletim — Resumo do Bimestre">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#1C1917]/10">
                    <th className="text-left py-2 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Disciplina</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Média</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Freq.</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockGrades.map((grade) => (
                    <tr key={grade.disciplina} className="border-b border-[#1C1917]/5 hover:bg-[#FDFAF5] transition-colors">
                      <td className="py-3 font-medium text-[#1C1917]">{grade.disciplina}</td>
                      <td className="py-3 text-center">
                        <span
                          className={`font-bold ${
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
                      <td className="py-3 text-center text-[#1C1917]/70">{grade.frequencia}%</td>
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
                          {(grade.media || 0) >= 7 ? "Aprovado" : (grade.media || 0) >= 5 ? "Recuperação" : "Reprovado"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Avisos e Provas */}
        <div className="space-y-6">
          {/* Próximas provas */}
          <SectionCard title="Próximas Provas">
            <div className="space-y-3">
              {mockExams.slice(0, 3).map((exam) => (
                <div key={exam.id} className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm font-semibold text-[#1C1917]">{exam.disciplina}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge color="#B45309">
                      {new Date(exam.data).toLocaleDateString("pt-BR")}
                    </Badge>
                    <span className="text-xs text-[#1C1917]/50">{exam.horario}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Avisos para responsáveis */}
          <SectionCard title="Avisos">
            <div className="space-y-3">
              {myNotices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 rounded-lg border border-[#1C1917]/10">
                  <Badge
                    color={
                      notice.tipo === "reuniao" ? "#3B4FD8" : notice.tipo === "prova" ? "#B45309" : "#6B21A8"
                    }
                  >
                    {notice.tipo}
                  </Badge>
                  <p className="text-sm font-semibold text-[#1C1917] mt-1">{notice.titulo}</p>
                  <p className="text-xs text-[#1C1917]/50 mt-0.5 line-clamp-2">{notice.mensagem}</p>
                  <p className="text-xs text-[#1C1917]/30 mt-1">
                    {new Date(notice.data).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
