"use client";

// ============================================================
// WebSchool — Mural do Aluno (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardAluno from "@/pages/aluno/DashboardAluno";

export default function AlunoMuralPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno"]}>
      <DashboardAluno />
    </ProtectedRoute>
  );
}
