"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Provas from "@/features/Provas";

export default function ProvasPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel", "professor", "gestor"]}>
      <Provas />
    </ProtectedRoute>
  );
}
