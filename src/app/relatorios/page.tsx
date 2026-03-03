"use client";

// ============================================================
// WebSchool — Relatórios (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Relatorios from "@/pages/gestor/Relatorios";

export default function RelatoriosPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <Relatorios />
    </ProtectedRoute>
  );
}
