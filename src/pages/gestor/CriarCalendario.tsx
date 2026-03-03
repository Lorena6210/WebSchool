"use client";

// ============================================================
// WebSchool — Calendário Interativo
// Design: Academic Warmth — Grid mensal com eventos coloridos
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockCalendarEvents } from "@/lib/mockData";
import type { CalendarEvent } from "@/types";
import { ChevronLeft, ChevronRight, Plus, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ACCENT = "#3B4FD8";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const eventTypeColors: Record<string, string> = {
  prova: "#B45309",
  reuniao: "#3B4FD8",
  aula: "#166534",
  evento: "#6B21A8",
};

const eventTypeLabels: Record<string, string> = {
  prova: "Prova",
  reuniao: "Reunião",
  aula: "Aula",
  evento: "Evento",
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function Calendario() {
  const { user } = useAuth();
  const canEdit = user?.role === "gestor";

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockCalendarEvents.filter((e) => e.data === dateStr);
  };

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const allMonthEvents = mockCalendarEvents.filter((e) => {
    const d = new Date(e.data);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Calendário Escolar"
        subtitle={canEdit ? "Gerencie eventos, provas e reuniões" : "Visualize os eventos do calendário escolar"}
        accentColor={ACCENT}
        action={
          canEdit ? (
            <button
              onClick={() => toast.info("Funcionalidade de criação de evento disponível em breve.")}
              className="flex items-center gap-2 px-4 py-2 bg-[#3B4FD8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#2D3FB8] transition-all active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #1C1917" }}
            >
              <Plus size={16} />
              Novo Evento
            </button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <div
            className="bg-white border-2 border-[#1C1917] rounded-xl overflow-hidden"
            style={{ boxShadow: "4px 4px 0px #1C1917" }}
          >
            {/* Header do mês */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#1C1917]">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg border-2 border-[#1C1917]/20 hover:border-[#1C1917] transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className="font-bold text-[#1C1917] text-lg" style={{ fontFamily: "'Fraunces', serif" }}>
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg border-2 border-[#1C1917]/20 hover:border-[#1C1917] transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 border-b border-[#1C1917]/10">
              {WEEKDAYS.map((day) => (
                <div key={day} className="py-2 text-center text-xs font-semibold text-[#1C1917]/40 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Células do calendário */}
            <div className="grid grid-cols-7">
              {cells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-16 border-b border-r border-[#1C1917]/5" />;
                }
                const events = getEventsForDay(day);
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();
                const isSelected = day === selectedDay;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                    className={cn(
                      "h-16 p-1.5 border-b border-r border-[#1C1917]/5 text-left transition-all hover:bg-[#FDFAF5]",
                      isSelected && "bg-[#3B4FD8]/5 border-[#3B4FD8]/30"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold",
                        isToday && "bg-[#1C1917] text-white",
                        !isToday && "text-[#1C1917]"
                      )}
                    >
                      {day}
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="w-full h-1.5 rounded-full"
                          style={{ backgroundColor: eventTypeColors[event.tipo] }}
                        />
                      ))}
                      {events.length > 2 && (
                        <span className="text-[10px] text-[#1C1917]/40">+{events.length - 2}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Painel lateral */}
        <div className="space-y-6">
          {/* Eventos do dia selecionado */}
          {selectedDay && (
            <SectionCard
              title={`${selectedDay} de ${MONTHS[currentMonth]}`}
            >
              {selectedDayEvents.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar size={32} className="text-[#1C1917]/20 mx-auto mb-2" />
                  <p className="text-sm text-[#1C1917]/40">Nenhum evento neste dia</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border-l-4"
                      style={{
                        borderLeftColor: eventTypeColors[event.tipo],
                        backgroundColor: eventTypeColors[event.tipo] + "10",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge color={eventTypeColors[event.tipo]}>
                          {eventTypeLabels[event.tipo]}
                        </Badge>
                        <span className="text-xs text-[#1C1917]/50">{event.horario}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917]">{event.titulo}</p>
                      {event.descricao && (
                        <p className="text-xs text-[#1C1917]/60 mt-1">{event.descricao}</p>
                      )}
                      {event.turma && (
                        <p className="text-xs text-[#1C1917]/40 mt-1">Turma: {event.turma}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          )}

          {/* Todos os eventos do mês */}
          <SectionCard title={`Eventos de ${MONTHS[currentMonth]}`}>
            {allMonthEvents.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-[#1C1917]/40">Nenhum evento este mês</p>
              </div>
            ) : (
              <div className="space-y-2">
                {allMonthEvents
                  .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-center gap-3 py-2 border-b border-[#1C1917]/5 last:border-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: eventTypeColors[event.tipo] }}
                      >
                        {new Date(event.data).getDate()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1C1917] truncate">{event.titulo}</p>
                        <p className="text-xs text-[#1C1917]/50">{event.horario}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </SectionCard>

          {/* Legenda */}
          <SectionCard title="Legenda">
            <div className="space-y-2">
              {Object.entries(eventTypeColors).map(([tipo, color]) => (
                <div key={tipo} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-[#1C1917]">{eventTypeLabels[tipo]}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
