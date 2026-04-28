"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Atividades from "@/features/Atividades";

export default function AtividadesPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "professor"]}>
      <Atividades />
    </ProtectedRoute>
  );
}