"use client";

// ============================================================
// WebSchool — Mural do Gestor
// Design: Academic Warmth — cor âncora: azul-índigo #3B4FD8
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatCard, PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockUsers, mockActivities, mockExams, mockCalendarEvents, mockNotices } from "@/lib/mockData";
import {
  Users,
  BookOpen,
  FileText,
  Calendar,
  Bell,
  GraduationCap,
  TrendingUp,
  School,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ACCENT = "#3B4FD8";

const enrollmentData = [
  { turma: "6º A", alunos: 28 },
  { turma: "6º B", alunos: 30 },
  { turma: "7º A", alunos: 27 },
  { turma: "7º B", alunos: 29 },
  { turma: "8º A", alunos: 31 },
  { turma: "9º A", alunos: 32 },
];

export default function GestorMural() {
  const { user } = useAuth();

  const totalAlunos = enrollmentData.reduce((acc, t) => acc + t.alunos, 0);
  const totalProfessores = 12;
  const totalTurmas = enrollmentData.length;

  const today = new Date();
  const greeting =
    today.getHours() < 12 ? "Bom dia" : today.getHours() < 18 ? "Boa tarde" : "Boa noite";

  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 4);

  return (
    <DashboardLayout>
      <PageHeader
        title={`${greeting}, ${user?.nome.split(" ")[0]}!`}
        subtitle="Visão geral da escola — todos os dados em um lugar"
        accentColor={ACCENT}
      />

      {/* Stats principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total de Alunos"
          value={totalAlunos}
          subtitle={`${totalTurmas} turmas ativas`}
          icon={<GraduationCap size={16} />}
          accentColor={ACCENT}
        />
        <StatCard
          title="Professores"
          value={totalProfessores}
          subtitle="Corpo docente"
          icon={<Users size={16} />}
          accentColor="#166534"
        />
        <StatCard
          title="Atividades"
          value={mockActivities.length}
          subtitle="Este bimestre"
          icon={<BookOpen size={16} />}
          accentColor="#B45309"
        />
        <StatCard
          title="Provas"
          value={mockExams.length}
          subtitle="Agendadas"
          icon={<FileText size={16} />}
          accentColor="#6B21A8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Gráfico de matrículas */}
        <div className="lg:col-span-2">
          <SectionCard title="Alunos por Turma">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C191710" />
                  <XAxis dataKey="turma" tick={{ fontSize: 12, fill: "#1C191780" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#1C191780" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "2px solid #1C1917",
                      borderRadius: "8px",
                      boxShadow: "4px 4px 0px #1C1917",
                    }}
                  />
                  <Bar dataKey="alunos" fill={ACCENT} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Próximos eventos */}
        <SectionCard title="Próximos Eventos">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border border-[#1C1917]/10">
                <div
                  className="w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0 border-2 border-[#1C1917]"
                  style={{
                    backgroundColor:
                      event.tipo === "prova"
                        ? "#FEF3C7"
                        : event.tipo === "reuniao"
                        ? "#EFF6FF"
                        : event.tipo === "aula"
                        ? "#F0FDF4"
                        : "#FAF5FF",
                  }}
                >
                  <span className="text-xs font-bold text-[#1C1917] leading-none">
                    {new Date(event.data).getDate()}
                  </span>
                  <span className="text-[10px] text-[#1C1917]/50 leading-none">
                    {new Date(event.data).toLocaleString("pt-BR", { month: "short" })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1C1917] truncate">{event.titulo}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge
                      color={
                        event.tipo === "prova"
                          ? "#B45309"
                          : event.tipo === "reuniao"
                          ? "#3B4FD8"
                          : event.tipo === "aula"
                          ? "#166534"
                          : "#6B21A8"
                      }
                    >
                      {event.tipo}
                    </Badge>
                    <span className="text-xs text-[#1C1917]/40">{event.horario}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos avisos */}
        <SectionCard title="Últimos Avisos Enviados">
          <div className="space-y-3">
            {mockNotices.map((notice) => (
              <div key={notice.id} className="flex items-start gap-3 p-3 rounded-lg border border-[#1C1917]/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      color={
                        notice.tipo === "prova"
                          ? "#B45309"
                          : notice.tipo === "reuniao"
                          ? "#3B4FD8"
                          : notice.tipo === "atividade"
                          ? "#166534"
                          : "#6B21A8"
                      }
                    >
                      {notice.tipo}
                    </Badge>
                    <span className="text-xs text-[#1C1917]/40">
                      {new Date(notice.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#1C1917]">{notice.titulo}</p>
                  <p className="text-xs text-[#1C1917]/50 mt-0.5 line-clamp-1">{notice.mensagem}</p>
                  <p className="text-xs text-[#1C1917]/30 mt-1">Por: {notice.autorNome}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Usuários do sistema */}
        <SectionCard title="Usuários do Sistema">
          <div className="space-y-3">
            {mockUsers.map((u) => {
              const roleColors: Record<string, string> = {
                aluno: "#6B21A8",
                responsavel: "#B45309",
                professor: "#166534",
                gestor: "#3B4FD8",
              };
              const roleLabels: Record<string, string> = {
                aluno: "Aluno",
                responsavel: "Responsável",
                professor: "Professor",
                gestor: "Gestor",
              };
              return (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg border border-[#1C1917]/10 hover:border-[#1C1917]/30 transition-all">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: roleColors[u.role] }}
                  >
                    {u.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1C1917] truncate">{u.nome}</p>
                    <p className="text-xs text-[#1C1917]/50 truncate">
                      {u.ra ? `RA: ${u.ra}` : u.email}
                    </p>
                  </div>
                  <Badge color={roleColors[u.role]}>{roleLabels[u.role]}</Badge>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
