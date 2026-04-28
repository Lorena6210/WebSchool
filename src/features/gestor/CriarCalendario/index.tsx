"use client";

// ============================================================
// WebSchool — Calendário Interativo
// Design: Academic Warmth — Grid mensal com eventos coloridos
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { mockCalendarEvents } from "@/lib/mockData";
import { CalendarEvent } from "@/types";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CalendarGrid } from "./components/CalendarGrid";
import { CalendarSidebar } from "./components/CalendarSidebar";
import { ACCENT } from "./utils";
import { getRoleAccent } from "@/lib/theme/roleAccent";

export default function Calendario() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role);
  const canEdit = user?.role === "gestor";

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  return (
    <DashboardLayout>
      <PageHeader
        title="Calendário Escolar"
        subtitle={canEdit ? "Gerencie eventos, provas e reuniões" : "Visualize os eventos do calendário escolar"}
        accentColor={accent || ACCENT}
        action={
          canEdit ? (
            <button
              onClick={() => toast.info("Funcionalidade de criação de evento disponível em breve.")}
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all active:translate-y-0.5"
              style={{ backgroundColor: accent, color: "#f0f0f8", border: `1px solid ${accent}88`, boxShadow: `0 0 12px ${accent}66` }}
            >
              <Plus size={16} />
              Novo Evento
            </button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarGrid
            isDark={isDark}
            accent={accent}
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDay={selectedDay}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onSelectDay={setSelectedDay}
            events={mockCalendarEvents}
          />
        </div>

        <CalendarSidebar
          isDark={isDark}
          currentMonth={currentMonth}
          selectedDay={selectedDay}
          selectedDayEvents={selectedDayEvents}
          allMonthEvents={allMonthEvents}
        />
      </div>
    </DashboardLayout>
  );
}

export * from "./components";
export * from "./services";
export * from "./utils";
