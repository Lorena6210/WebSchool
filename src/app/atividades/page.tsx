"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AtividadesRoot from "./index";

export default function AtividadesPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "professor"]}>
      <AtividadesRoot />
    </ProtectedRoute>
  );
}