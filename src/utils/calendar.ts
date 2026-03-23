import type { CalendarEvent } from "@/types";

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function dayEventsForDate(
  events: CalendarEvent[],
  year: number,
  month: number,
  day: number
): CalendarEvent[] {
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return events.filter((event) => event.data === dateStr);
}

export function monthEvents(events: CalendarEvent[], year: number, month: number): CalendarEvent[] {
  return events.filter((event) => {
    const date = new Date(event.data);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}
