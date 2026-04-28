"use client";

// ============================================================
// WebSchool — Avisos (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Avisos from "@/features/responsavel/Avisos";

export default function AvisosPage() {
  return (
    <ProtectedRoute allowedRoles={["responsavel", "professor", "gestor"]}>
      <Avisos />
    </ProtectedRoute>
  );
}
