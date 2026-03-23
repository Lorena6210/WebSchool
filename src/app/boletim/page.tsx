"use client";

// ============================================================
// WebSchool — Boletim (Next.js App Router)
// ============================================================

import ProtectedRoute from "@/components/ProtectedRoute";
import BoletimRoot from "./index";

export default function BoletimPage() {
  return (
    <ProtectedRoute allowedRoles={["aluno", "responsavel", "professor"]}>
      <BoletimRoot />
    </ProtectedRoute>
  );
}
