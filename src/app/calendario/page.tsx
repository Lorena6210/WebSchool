"use client";

// ============================================================
// WebSchool — Calendário (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Calendario from "@/pages/Calendario";

export default function CalendarioPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "professor", "responsavel", "gestor"]}>
      <Calendario />
    </ProtectedRoute>
  );
}
