export const ACCENT = "#3B4FD8";

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const eventTypeColors: Record<string, string> = {
  prova: "#B45309",
  reuniao: "#3B4FD8",
  aula: "#166534",
  evento: "#6B21A8",
};

export const eventTypeLabels: Record<string, string> = {
  prova: "Prova",
  reuniao: "Reunião",
  aula: "Aula",
  evento: "Evento",
};

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}