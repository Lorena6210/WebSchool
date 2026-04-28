"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Calendario from "@/features/Calendario";

export default function CalendarioPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel"]}>
      <Calendario />
    </ProtectedRoute>
  );
}
