"use client";

// ============================================================
// WebSchool — Avisos (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Avisos from "@/pages/responsavel/Avisos";

export default function AvisosPage() {
  return (
    <ProtectedRoute allowedRoles={["responsavel"]}>
      <Avisos />
    </ProtectedRoute>
  );
}
