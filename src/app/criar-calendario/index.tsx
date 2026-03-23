"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { MainView } from "./components";

export default function CriarCalendarioRoot() {
  return (
    <ProtectedRoute allowedRoles={["gestor", "professor"]}>
      <MainView />
    </ProtectedRoute>
  );
}
