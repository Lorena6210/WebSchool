import React from "react";
import { SectionCard, Badge } from "@/components/ui/stat-card";
import { Calendar } from "lucide-react";
import type { CalendarEvent } from "@/types";
import { MONTHS, eventTypeColors, eventTypeLabels } from "../utils";

interface CalendarSidebarProps {
  isDark: boolean;
  currentMonth: number;
  selectedDay: number | null;
  selectedDayEvents: CalendarEvent[];
  allMonthEvents: CalendarEvent[];
}

export function CalendarSidebar({
  isDark,
  currentMonth,
  selectedDay,
  selectedDayEvents,
  allMonthEvents,
}: CalendarSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Eventos do dia selecionado */}
      {selectedDay && (
        <SectionCard title={`${selectedDay} de ${MONTHS[currentMonth]}`}>
          {selectedDayEvents.length === 0 ? (
            <div className="text-center py-6">
              <Calendar size={32} className="mx-auto mb-2" style={{ color: isDark ? "rgba(240,240,248,0.2)" : "rgba(15,39,71,0.2)" }} />
              <p className="text-sm" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>Nenhum evento neste dia</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDayEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: eventTypeColors[event.tipo],
                    backgroundColor: eventTypeColors[event.tipo] + "20",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge color={eventTypeColors[event.tipo]}>
                      {eventTypeLabels[event.tipo]}
                    </Badge>
                    <span className="text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)" }}>{event.horario}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>{event.titulo}</p>
                  {event.descricao && (
                    <p className="text-xs mt-1" style={{ color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.68)" }}>{event.descricao}</p>
                  )}
                  {event.turma && (
                    <p className="text-xs mt-1" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>Turma: {event.turma}</p>
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
            <p className="text-sm" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>Nenhum evento este mês</p>
          </div>
        ) : (
          <div className="space-y-2">
            {allMonthEvents
              .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
              .map((event) => (
                <div key={event.id} className="flex items-center gap-3 py-2 last:border-0" style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,39,71,0.08)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: eventTypeColors[event.tipo], color: "#f0f0f8" }}
                  >
                    {new Date(event.data).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>{event.titulo}</p>
                    <p className="text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)" }}>{event.horario}</p>
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
              <span className="text-sm" style={{ color: isDark ? "rgba(240,240,248,0.7)" : "rgba(15,39,71,0.75)" }}>{eventTypeLabels[tipo]}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
