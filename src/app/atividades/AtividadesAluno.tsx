"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { mockActivities } from "@/lib/mockData";
import { BookOpen, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "todos" | "pendente" | "entregue" | "atrasado";

export default function AtividadesAluno() {
  const [filter, setFilter] = useState<FilterType>("todos");

  const filtered =
    filter === "todos"
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
        title="Minhas Atividades"
        subtitle="Acompanhe suas atividades escolares"
        accentColor="#6B21A8"
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
                : "bg-white text-[#1C1917]/60 border-[#1C1917]/20"
            )}
          >
            {f === "todos" ? "Todos" : f}
          </button>
        ))}
      </div>

      <SectionCard>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={40} className="text-[#1C1917]/20 mx-auto mb-3" />
              <p className="text-[#1C1917]/40 font-medium">
                Nenhuma atividade encontrada
              </p>
            </div>
          ) : (
            filtered.map((activity) => {
              const config = statusConfig[activity.status];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#1C1917]/10"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: config.color + "15", color: config.color }}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{activity.titulo}</p>
                    <p className="text-sm text-[#1C1917]/60">
                      {activity.descricao}
                    </p>
                    <Badge color={config.color}>{config.label}</Badge>
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