"use client";

// ============================================================
// WebSchool — Criar Horários (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import CriarHorarios from "@/pages/gestor/CriarHorarios";

export default function CriarHorariosPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <CriarHorarios />
    </ProtectedRoute>
  );
}
