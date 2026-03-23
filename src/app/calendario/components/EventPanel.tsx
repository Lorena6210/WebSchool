import type { CalendarEvent } from "@/types";

type EventPanelProps = {
  selectedDay: number | null;
  currentMonth: number;
  allMonthEvents: CalendarEvent[];
  selectedDayEvents: CalendarEvent[];
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

function eventTypeLabel(tipo: CalendarEvent["tipo"]): string {
  if (tipo === "prova") return "Prova";
  if (tipo === "reuniao") return "Reuniao";
  if (tipo === "evento") return "Evento";
  return "Aula";
}

function eventTypeClass(tipo: CalendarEvent["tipo"]): string {
  if (tipo === "prova") return "bg-red-100 text-red-700";
  if (tipo === "reuniao") return "bg-amber-100 text-amber-700";
  if (tipo === "evento") return "bg-indigo-100 text-indigo-700";
  return "bg-emerald-100 text-emerald-700";
}

export default function EventPanel({
  selectedDay,
  currentMonth,
  allMonthEvents,
  selectedDayEvents,
}: EventPanelProps) {
  const eventsToShow = selectedDay ? selectedDayEvents : allMonthEvents;

  return (
    <aside className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-5">
      <header className="mb-4 border-b border-[#E5E7EB] pb-3">
        <h3 className="text-base font-bold text-[#1F2937]">
          {selectedDay
            ? `Eventos em ${selectedDay} de ${MONTHS_PT[currentMonth]}`
            : `Eventos de ${MONTHS_PT[currentMonth]}`}
        </h3>
        <p className="text-xs text-[#6B7280]">
          {selectedDay
            ? "Mostrando os eventos do dia selecionado"
            : "Selecione um dia no calendario para filtrar"}
        </p>
      </header>

      <div className="space-y-3">
        {eventsToShow.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[#D1D5DB] bg-[#F9FAFB] p-3 text-sm text-[#6B7280]">
            Nenhum evento encontrado.
          </p>
        ) : (
          eventsToShow.map((event) => (
            <article
              key={event.id}
              className="rounded-lg border border-[#E5E7EB] bg-white p-3 transition-all hover:border-[#CBD5E1] hover:bg-[#FAFAFC]"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-[#1F2937]">{event.titulo}</h4>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${eventTypeClass(event.tipo)}`}>
                  {eventTypeLabel(event.tipo)}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#6B7280]">{event.data} as {event.horario}</p>
              {event.descricao ? (
                <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">{event.descricao}</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </aside>
  );
}