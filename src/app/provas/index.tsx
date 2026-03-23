"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { MainView } from "./components";

export default function ProvasRoot() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel", "professor", "gestor"]}>
      <MainView />
    </ProtectedRoute>
  );
}
