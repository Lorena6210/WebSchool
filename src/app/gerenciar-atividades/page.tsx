"use client";

// ============================================================
// WebSchool — Gerenciar Atividades (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import GerenciarAtividades from "@/pages/gestor/GerenciarAtividades";

export default function GerenciarAtividadesPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <GerenciarAtividades />
    </ProtectedRoute>
  );
}
