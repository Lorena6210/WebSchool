"use client";

import React from "react";
import { Badge, SectionCard } from "@/components/ui/stat-card";
import { BookOpen } from "lucide-react";
import type { Activity } from "@/types";
import { statusConfig, ACCENT } from "../../utils";

type ActivitiesListProps = {
  activities: Activity[];
};

export function ActivitiesList({ activities }: ActivitiesListProps) {
  return (
    <SectionCard>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={40} className="mx-auto mb-3" style={{ color: "rgba(240,240,248,0.2)" }} />
            <p className="font-medium" style={{ color: "rgba(240,240,248,0.4)" }}>Nenhuma atividade encontrada</p>
          </div>
        ) : (
          activities.map((activity) => {
            const config = statusConfig[activity.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.color}15`, color: config.color }}
                >
                  <StatusIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold" style={{ color: "#f0f0f8" }}>{activity.titulo}</p>
                      <p className="text-sm mt-0.5" style={{ color: "rgba(240,240,248,0.6)" }}>{activity.descricao}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge color={ACCENT}>{activity.disciplina}</Badge>
                        <span className="text-xs" style={{ color: "rgba(240,240,248,0.4)" }}>Turma {activity.turma}</span>
                        <span className="text-xs" style={{ color: "rgba(240,240,248,0.4)" }}>· {activity.professorNome}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge color={config.color}>{config.label}</Badge>
                      {activity.nota && (
                        <p className="text-sm font-bold mt-1" style={{ color: "#4ade80" }}>Nota: {activity.nota}</p>
                      )}
                      <p className="text-xs mt-1" style={{ color: "rgba(240,240,248,0.4)" }}>
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
  );
}
