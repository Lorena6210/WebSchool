"use client";

// ============================================================
// WebSchool — Dashboard do Professor
// Design: Academic Warmth — cor âncora: verde #166534
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatCard, PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import {
  mockActivities,
  mockExams,
  mockCalendarEvents,
  mockGrades,
  mockClassSchedule,
} from "@/lib/mockData";
import {
  BookOpen,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const ACCENT = "#166534";

const DIAS_PT: Record<string, string> = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
};

export default function DashboardProfessor() {
  const { user } = useAuth();

  const today = new Date();
  const greeting =
    today.getHours() < 12 ? "Bom dia" : today.getHours() < 18 ? "Boa tarde" : "Boa noite";

  // Estatísticas
  const totalActivities = mockActivities.length;
  const totalExams = mockExams.length;
  const avgGrade =
    mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;

  // Próximos eventos
  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.data) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 4);

  // Horário de hoje
  const weekdays = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  const todayKey = weekdays[today.getDay()];
  const todaySchedule = mockClassSchedule.horarios.find((h) => h.dia === todayKey);

  return (
    <DashboardLayout>
      <PageHeader
        title={`${greeting}, ${user?.nome.split(" ")[0]}!`}
        subtitle={`Turma ${user?.turma ?? ""} · Professor(a)`}
        accentColor={ACCENT}
      />

      {/* Stats principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Atividades"
          value={totalActivities}
          subtitle="Criadas este bimestre"
          icon={<BookOpen size={16} />}
          accentColor={ACCENT}
        />
        <StatCard
          title="Provas"
          value={totalExams}
          subtitle="Agendadas"
          icon={<FileText size={16} />}
          accentColor="#B45309"
        />
        <StatCard
          title="Média da Turma"
          value={avgGrade.toFixed(1)}
          subtitle="9º A — todas as disciplinas"
          icon={<TrendingUp size={16} />}
          accentColor="#3B4FD8"
        />
        <StatCard
          title="Alunos"
          value={32}
          subtitle="Na turma 9º A"
          icon={<Users size={16} />}
          accentColor="#6B21A8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Atividades recentes */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Atividades da Turma"
            action={
              <button
                onClick={() => toast.info("Formulário de criação disponível em breve.")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#166534] text-white text-xs font-semibold rounded-lg border border-[#1C1917] hover:bg-[#14532D] transition-all"
                style={{ boxShadow: "2px 2px 0px #1C1917" }}
              >
                <Plus size={12} />
                Nova Atividade
              </button>
            }
          >
            <div className="space-y-3">
              {mockActivities.map((activity) => {
                const statusConfig = {
                  entregue: { color: "#166534", label: "Entregue" },
                  atrasado: { color: "#DC2626", label: "Atrasado" },
                  pendente: { color: "#B45309", label: "Pendente" },
                };
                const config = statusConfig[activity.status];
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-[#1C1917]/10 hover:border-[#1C1917]/25 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917]">{activity.titulo}</p>
                      <p className="text-xs text-[#1C1917]/50 mt-0.5 line-clamp-1">
                        {activity.descricao}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge color={ACCENT}>{activity.disciplina}</Badge>
                        <span className="text-xs text-[#1C1917]/40">
                          Entrega: {new Date(activity.dataEntrega).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge color={config.color}>{config.label}</Badge>
                      {activity.nota && (
                        <span className="text-xs font-bold text-green-700">
                          Nota: {activity.nota}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Próximas provas */}
        <SectionCard
          title="Provas Agendadas"
          action={
            <button
              onClick={() => toast.info("Formulário de prova disponível em breve.")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B45309] text-white text-xs font-semibold rounded-lg border border-[#1C1917] hover:bg-[#92400E] transition-all"
              style={{ boxShadow: "2px 2px 0px #1C1917" }}
            >
              <Plus size={12} />
              Nova Prova
            </button>
          }
        >
          <div className="space-y-3">
            {mockExams.map((exam) => (
              <div
                key={exam.id}
                className="p-3 rounded-xl bg-amber-50 border border-amber-200"
              >
                <p className="text-sm font-semibold text-[#1C1917]">{exam.disciplina}</p>
                <p className="text-xs text-[#1C1917]/60 mt-0.5 truncate">{exam.titulo}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge color="#B45309">
                    {new Date(exam.data).toLocaleDateString("pt-BR")}
                  </Badge>
                  <span className="text-xs text-[#1C1917]/50">{exam.sala}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horário de hoje */}
        <SectionCard title={`Suas Aulas Hoje — ${DIAS_PT[todayKey] ?? "Hoje"}`}>
          {todaySchedule ? (
            <div className="space-y-2">
              {todaySchedule.aulas
                .filter((a) => a.professor === user?.nome)
                .map((aula, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-green-50 border border-green-200"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-green-700 w-28 flex-shrink-0">
                      <Clock size={12} />
                      {aula.horario}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] truncate">
                        {aula.disciplina}
                      </p>
                      <p className="text-xs text-[#1C1917]/40">{aula.sala}</p>
                    </div>
                  </div>
                ))}
              {todaySchedule.aulas.filter((a) => a.professor === user?.nome).length === 0 && (
                <div className="text-center py-6">
                  <Calendar size={28} className="text-[#1C1917]/20 mx-auto mb-2" />
                  <p className="text-sm text-[#1C1917]/40">Sem aulas suas hoje</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar size={32} className="text-[#1C1917]/20 mx-auto mb-2" />
              <p className="text-sm text-[#1C1917]/40">Sem aulas hoje</p>
            </div>
          )}
        </SectionCard>

        {/* Próximos eventos */}
        <SectionCard title="Próximos Eventos">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-[#1C1917]/10"
              >
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
    </DashboardLayout>
  );
}
