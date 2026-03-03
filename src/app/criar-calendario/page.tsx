"use client";

// ============================================================
// WebSchool — Criar Calendário (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import CriarCalendario from "@/pages/gestor/CriarCalendario";

export default function CriarCalendarioPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <CriarCalendario />
    </ProtectedRoute>
  );
}
