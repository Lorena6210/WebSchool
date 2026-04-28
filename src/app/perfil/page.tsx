"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Perfil from "@/features/Perfil";

export default function PerfilPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno"]}>
      <Perfil />
    </ProtectedRoute>
  );
}
