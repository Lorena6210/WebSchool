"use client";

// ============================================================
// WebSchool — Relatórios (Next.js App Router)
// ============================================================

import AppPageShell from "@/components/AppPageShell";
import Relatorios from "@/features/gestor/Relatorios";

export default function RelatoriosPage() {
  return (
    <AppPageShell allowedRoles={["gestor"]} withNavbar>
      <Relatorios />
    </AppPageShell>
  );
}
