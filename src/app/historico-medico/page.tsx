"use client";

// ============================================================
// WebSchool — Histórico Médico (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import HistoricoMedico from "@/pages/HistoricoMedico";

export default function HistoricoMedicoPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel"]}>
      <HistoricoMedico />
    </ProtectedRoute>
  );
}
