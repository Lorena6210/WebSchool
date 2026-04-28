import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types";
import { MONTHS, WEEKDAYS, eventTypeColors, getDaysInMonth, getFirstDayOfMonth } from "../utils";

interface CalendarGridProps {
  isDark: boolean;
  accent: string;
  currentYear: number;
  currentMonth: number;
  selectedDay: number | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number | null) => void;
  events: CalendarEvent[];
}

export function CalendarGrid({
  isDark,
  accent,
  currentYear,
  currentMonth,
  selectedDay,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  events,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.data === dateStr);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: isDark ? "#12121e" : "#ffffff",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)",
        boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(15,39,71,0.1)",
      }}
    >
      {/* Header do mês */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)" }}>
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg transition-all"
          style={{ border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.16)", color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)" }}
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="font-bold text-lg" style={{ color: isDark ? "#f0f0f8" : "#0f2747", fontFamily: "'Fraunces', serif" }}>
          {MONTHS[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg transition-all"
          style={{ border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.16)", color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7" style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.12)" }}>
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(240,240,248,0.3)" : "rgba(15,39,71,0.45)" }}>
            {day}
          </div>
        ))}
      </div>

      {/* Células do calendário */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-16" style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,39,71,0.08)", borderRight: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,39,71,0.08)" }} />;
          }
          const dayEvents = getEventsForDay(day);
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day === selectedDay ? null : day)}
              className={cn(
                "h-16 p-1.5 text-left transition-all",
              )}
              style={{
                borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,39,71,0.08)",
                borderRight: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,39,71,0.08)",
                backgroundColor: isSelected ? `${accent}22` : "transparent",
              }}
            >
              <span
                className="inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: isToday ? accent : "transparent",
                  color: isToday ? "#f0f0f8" : (isDark ? "rgba(240,240,248,0.7)" : "rgba(15,39,71,0.72)"),
                }}
              >
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="w-full h-1.5 rounded-full"
                    style={{ backgroundColor: eventTypeColors[event.tipo] }}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <span className="text-[10px]" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.55)" }}>+{dayEvents.length - 2}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
