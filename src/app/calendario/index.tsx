"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MainView } from "./components";

export default function CalendarioRoot() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel"]}>
      <DashboardLayout>
        <MainView />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
