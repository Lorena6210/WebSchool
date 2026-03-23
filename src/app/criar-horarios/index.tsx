"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { MainView } from "./components";

export default function CriarHorariosRoot() {
  return (
    <ProtectedRoute allowedRoles={["gestor"]}>
      <MainView />
    </ProtectedRoute>
  );
}
