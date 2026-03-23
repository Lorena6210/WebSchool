import type { CalendarEvent } from "@/types";
import { BookmarkCheck, ChevronLeft, ChevronRight } from "lucide-react";

type CalendarGridProps = {
  currentYear: number;
  currentMonth: number;
  selectedDay: number | null;
  cells: (number | null)[];
  today: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
  onDayClick: (day: number) => void;
  getEventsForDay: (day: number) => CalendarEvent[];
};

const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const WEEKDAYS_PT = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

function eventShortLabel(tipo: CalendarEvent["tipo"]): string {
  if (tipo === "prova") return "PV";
  if (tipo === "reuniao") return "RE";
  if (tipo === "evento") return "EV";
  return "AU";
}

function eventDotColor(tipo: CalendarEvent["tipo"]): string {
  if (tipo === "prova") return "bg-red-500";
  if (tipo === "reuniao") return "bg-amber-500";
  if (tipo === "evento") return "bg-indigo-500";
  return "bg-emerald-500";
}

export default function CalendarGrid({
  currentYear,
  currentMonth,
  selectedDay,
  cells,
  today,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  onDayClick,
  getEventsForDay,
}: CalendarGridProps) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onPrevMonth}
          className="rounded-lg border border-[#E5E7EB] bg-white p-2 text-[#1F2937] transition hover:bg-[#F8FAFC]"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          <h2 className="rounded-lg border border-[#DBEAFE] bg-[#EEF2FF] px-4 py-1.5 text-base font-bold text-[#1F2937] md:text-lg">
            Agenda de {MONTHS_PT[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={onGoToday}
            className="rounded-lg border border-[#3B4FD8]/20 bg-[#3B4FD8] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#2E3FB2]"
          >
            Hoje
          </button>
        </div>

        <button
          onClick={onNextMonth}
          className="rounded-lg border border-[#E5E7EB] bg-white p-2 text-[#1F2937] transition hover:bg-[#F8FAFC]"
          aria-label="Proximo mes"
        >
          <ChevronRight size={18} />
        </button>
      </header>

      <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
        {WEEKDAYS_PT.map((weekday) => (
          <div key={weekday} className="py-2">
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-24 rounded-lg border border-dashed border-[#E5E7EB] bg-[#F9FAFB]" />;
          }

          const dayEvents = getEventsForDay(day);
          const isToday =
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
          const isSelected = selectedDay === day;

          return (
            <button
              key={`${currentYear}-${currentMonth}-${day}`}
              onClick={() => onDayClick(day)}
              className={[
                "h-24 rounded-lg border p-2 text-left transition-all",
                isSelected
                  ? "border-[#3B4FD8] bg-[#EEF2FF] shadow-[0_6px_16px_rgba(59,79,216,0.16)]"
                  : "border-[#E5E7EB] bg-white hover:border-[#CBD5E1] hover:bg-[#FAFAFC]",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "text-sm font-semibold",
                    isToday ? "rounded-md bg-[#1F2937] px-1.5 py-0.5 text-white" : "text-[#1F2937]",
                  ].join(" ")}
                >
                  {day}
                </span>
                {dayEvents.length > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                    <BookmarkCheck size={10} /> {dayEvents.length}
                  </span>
                ) : null}
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <span
                    key={event.id}
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white ${eventDotColor(event.tipo)}`}
                    title={event.titulo}
                  >
                    {eventShortLabel(event.tipo)}
                  </span>
                ))}
              </div>

              {dayEvents[0] ? (
                <p className="mt-1 truncate text-[10px] text-[#4B5563]">{dayEvents[0].titulo}</p>
              ) : (
                <p className="mt-1 text-[10px] text-[#9CA3AF]">Sem marcacao</p>
              )}
            </button>
          );
        })}
      </div>

      <footer className="mt-5 flex flex-wrap gap-2 text-xs text-[#6B7280]">
        <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-red-500" /> Prova (PV)
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Reuniao (RE)
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-indigo-500" /> Evento (EV)
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Aula (AU)
        </span>
      </footer>
    </section>
  );
}
