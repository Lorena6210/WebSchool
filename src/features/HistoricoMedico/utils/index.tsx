import React from "react";
import { AlertTriangle, FileText, Phone } from "lucide-react";
import { createTheme } from "@mui/material";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import type { UserRole } from "@/types";

export const ACCENT = "#e5244a";

export const getHistoricoTheme = (isDark: boolean) => createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: isDark ? "#12121e" : "#ffffff",
          boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(15,39,71,0.12)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
        },
      },
    },
  },
});

export function getHistoricoCards(record: any, contato: any, role?: UserRole | null) {
  const accent = getRoleAccent(role);

  return [
    {
      title: "Alergias",
      value: record.alergias.length,
      subtitle: "Registradas",
      icon: <AlertTriangle size={16} color={accent} />,
      color: `${accent}26`,
      textColor: accent,
    },
    {
      title: "Laudos",
      value: record.laudos.length,
      subtitle: "Documentos médicos",
      icon: <FileText size={16} color="#60a5fa" />,
      color: "rgba(96,165,250,0.15)",
      textColor: "#60a5fa",
    },
    {
      title: "Contato",
      value: contato?.nome?.split(" ")[0] ?? "-",
      subtitle: contato?.parentesco ?? "Sem vínculo",
      icon: <Phone size={16} color="#fbbf24" />,
      color: "rgba(251,191,36,0.15)",
      textColor: "#fbbf24",
    },
  ];
}