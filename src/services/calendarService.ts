import { MockAPI } from "@/lib/mockData";
import type { CalendarEvent } from "@/types";

export const calendarService = {
  async getEvents(): Promise<CalendarEvent[]> {
    return MockAPI.calendar.getEvents();
  },
};
