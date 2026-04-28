"use client";

// ============================================================
// WebSchool — Atividades
// Design: Academic Warmth
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockActivities } from "@/lib/mockData";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ActivitiesFilters } from "./components/ActivitiesFilters";
import { ActivitiesList } from "./components/ActivitiesList";
import { ACCENT } from "./utils";
import type { FilterType } from "./utils";

export default function Atividades() {
  const { user } = useAuth();
  const canCreate = user?.role === "professor" || user?.role === "gestor";
  const [filter, setFilter] = useState<FilterType>("todos");

  const filtered = filter === "todos"
    ? mockActivities
    : mockActivities.filter((a) => a.status === filter);

  return (
    <DashboardLayout>
      <PageHeader
        title="Atividades"
        subtitle={canCreate ? "Gerencie as atividades da turma" : "Suas atividades escolares"}
        accentColor={ACCENT}
        action={
          canCreate ? (
            <button
              onClick={() => toast.info("Formulário de criação de atividade disponível em breve.")}
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all active:translate-y-0.5"
              style={{ backgroundColor: "#e5244a", color: "#f0f0f8", border: "1px solid rgba(229,36,74,0.5)", boxShadow: "0 0 12px rgba(229,36,74,0.35)" }}
            >
              <Plus size={16} />
              Nova Atividade
            </button>
          ) : undefined
        }
      />

      <ActivitiesFilters filter={filter} onFilterChange={setFilter} />

      <ActivitiesList activities={filtered} />
    </DashboardLayout>
  );
}
