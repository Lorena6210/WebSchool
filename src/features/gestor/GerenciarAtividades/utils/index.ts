import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const ACCENT = "#6B21A8";

export type FilterType = "todos" | "pendente" | "entregue" | "atrasado";

export const statusConfig = {
	entregue: { icon: CheckCircle, color: "#166534", label: "Entregue" },
	atrasado: { icon: AlertCircle, color: "#DC2626", label: "Atrasado" },
	pendente: { icon: Clock, color: "#B45309", label: "Pendente" },
} as const;