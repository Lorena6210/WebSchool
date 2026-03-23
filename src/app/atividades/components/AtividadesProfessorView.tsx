"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/stat-card";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AtividadesProfessorView() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Gerenciar Atividades"
        subtitle="Crie e gerencie atividades da turma"
        accentColor="#6B21A8"
        action={
          <button
            onClick={() => toast.info("Formulario de criacao em breve.")}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B21A8] text-white font-semibold rounded-lg"
          >
            <Plus size={16} />
            Nova Atividade
          </button>
        }
      />
    </DashboardLayout>
  );
}
