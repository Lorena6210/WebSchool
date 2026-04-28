"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import HistoricoEscola from "@/features/HistoricoEscola";

export default function HistoricoEscolaPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel"]}>
      <HistoricoEscola />
    </ProtectedRoute>
  );
}
