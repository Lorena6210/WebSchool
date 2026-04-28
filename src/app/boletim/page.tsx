"use client";

// ============================================================
// WebSchool — Boletim (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import Boletim from "@/features/Boletim";

export default function BoletimPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel", "professor"]}>
      <Boletim />
    </ProtectedRoute>
  );
}
