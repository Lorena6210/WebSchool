"use client";

// ============================================================
// WebSchool — Atividades (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Atividades from "@/pages/Atividades";

export default function AtividadesPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "professor"]}>
      <Atividades />
    </ProtectedRoute>
  );
}
