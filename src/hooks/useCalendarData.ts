import { useCallback, useEffect, useMemo, useState } from "react";
import type { CalendarEvent } from "@/types";
import { calendarService } from "@/services";
import {
  dayEventsForDate,
  getDaysInMonth,
  getFirstDayOfMonth,
  monthEvents,
} from "@/utils/calendar";

export function useCalendarData() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await calendarService.getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Falha ao carregar eventos do calendario.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const firstDay = useMemo(
    () => getFirstDayOfMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const cells = useMemo<(number | null)[]>(
    () => [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ],
    [daysInMonth, firstDay]
  );

  const getEventsForDay = useCallback(
    (day: number) => dayEventsForDate(events, currentYear, currentMonth, day),
    [events, currentYear, currentMonth]
  );

  const selectedDayEvents = useMemo(
    () => (selectedDay ? getEventsForDay(selectedDay) : []),
    [selectedDay, getEventsForDay]
  );

  const allMonthEvents = useMemo(
    () => monthEvents(events, currentYear, currentMonth),
    [events, currentYear, currentMonth]
  );

  const provasNoMes = useMemo(
    () => allMonthEvents.filter((event) => event.tipo === "prova").length,
    [allMonthEvents]
  );

  const reunioesNoMes = useMemo(
    () => allMonthEvents.filter((event) => event.tipo === "reuniao").length,
    [allMonthEvents]
  );

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedDay(null);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedDay(null);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDay(now.getDate());
  }, []);

  const onDayClick = useCallback((day: number) => {
    setSelectedDay((prev) => (prev === day ? null : day));
  }, []);

  return {
    isLoading,
    error,
    today,
    currentYear,
    currentMonth,
    selectedDay,
    cells,
    selectedDayEvents,
    allMonthEvents,
    provasNoMes,
    reunioesNoMes,
    getEventsForDay,
    prevMonth,
    nextMonth,
    goToToday,
    onDayClick,
  };
}
