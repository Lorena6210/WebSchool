"use client";

// ============================================================
// WebSchool — Gerenciar Usuários (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import GerenciarUsuarios from "@/pages/gestor/GerenciarUsuarios";

export default function GerenciarUsuariosPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <GerenciarUsuarios />
    </ProtectedRoute>
  );
}
