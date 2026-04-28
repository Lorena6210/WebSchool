"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CriarHorarios from "@/features/gestor/CriarHorarios";

export default function CriarHorariosPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <CriarHorarios />
    </ProtectedRoute>
  );
}
