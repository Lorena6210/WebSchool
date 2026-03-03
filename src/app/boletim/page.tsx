"use client";

// ============================================================
// WebSchool — Boletim (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import BoletimResponsavel from "@/pages/responsavel/BoletimResponsavel";

export default function BoletimResponsavelPage() {
  return (
    <ProtectedRoute allowedRoles={["responsavel"]}>
      <BoletimResponsavel />
    </ProtectedRoute>
  );
}
