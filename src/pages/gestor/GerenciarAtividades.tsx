"use client";

// ============================================================
// WebSchool — Atividades
// Design: Academic Warmth
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockActivities } from "@/lib/mockData";
import { BookOpen, Plus, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCENT = "#6B21A8";

type FilterType = "todos" | "pendente" | "entregue" | "atrasado";

export default function Atividades() {
  const { user } = useAuth();
  const canCreate = user?.role === "professor" || user?.role === "gestor";
  const [filter, setFilter] = useState<FilterType>("todos");

  const filtered = filter === "todos"
    ? mockActivities
    : mockActivities.filter((a) => a.status === filter);

  const statusConfig = {
    entregue: { icon: <CheckCircle size={16} />, color: "#166534", label: "Entregue" },
    atrasado: { icon: <AlertCircle size={16} />, color: "#DC2626", label: "Atrasado" },
    pendente: { icon: <Clock size={16} />, color: "#B45309", label: "Pendente" },
  };

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
              className="flex items-center gap-2 px-4 py-2 bg-[#6B21A8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#581C87] transition-all active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #1C1917" }}
            >
              <Plus size={16} />
              Nova Atividade
            </button>
          ) : undefined
        }
      />

      {/* Filtros */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter size={16} className="text-[#1C1917]/40" />
        {(["todos", "pendente", "entregue", "atrasado"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all capitalize",
              filter === f
                ? "bg-[#1C1917] text-white border-[#1C1917]"
                : "bg-white text-[#1C1917]/60 border-[#1C1917]/20 hover:border-[#1C1917]/50"
            )}
          >
            {f === "todos" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <SectionCard>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={40} className="text-[#1C1917]/20 mx-auto mb-3" />
              <p className="text-[#1C1917]/40 font-medium">Nenhuma atividade encontrada</p>
            </div>
          ) : (
            filtered.map((activity) => {
              const config = statusConfig[activity.status];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#1C1917]/10 hover:border-[#1C1917]/30 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.color + "15", color: config.color }}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#1C1917]">{activity.titulo}</p>
                        <p className="text-sm text-[#1C1917]/60 mt-0.5">{activity.descricao}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge color={ACCENT}>{activity.disciplina}</Badge>
                          <span className="text-xs text-[#1C1917]/40">Turma {activity.turma}</span>
                          <span className="text-xs text-[#1C1917]/40">· {activity.professorNome}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge color={config.color}>{config.label}</Badge>
                        {activity.nota && (
                          <p className="text-sm font-bold text-green-700 mt-1">Nota: {activity.nota}</p>
                        )}
                        <p className="text-xs text-[#1C1917]/40 mt-1">
                          Entrega: {new Date(activity.dataEntrega).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
