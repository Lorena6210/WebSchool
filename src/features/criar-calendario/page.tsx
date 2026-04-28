"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CriarCalendario from "@/features/gestor/CriarCalendario";

export default function CriarCalendarioPage() {
  return (
    <ProtectedRoute allowedRoles={["gestor", "professor"]}>
      <CriarCalendario />
    </ProtectedRoute>
  );
}
