"use client";

// ============================================================
// WebSchool — Grade Horária
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockClassSchedule } from "@/lib/mockData";
import { Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCENT = "#e5244a";

const diaLabels: Record<string, string> = {
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
};

const disciplineColors: Record<string, string> = {
  "Matemática": "#3B4FD8",
  "Português": "#6B21A8",
  "Ciências": "#166534",
  "História": "#B45309",
  "Geografia": "#0891B2",
  "Inglês": "#DC2626",
  "Educação Física": "#16A34A",
  "Arte": "#D97706",
};

export default function Horarios() {
  const { user } = useAuth();
  const canEdit = user?.role === "gestor";
  const [selectedDay, setSelectedDay] = useState("segunda");

  const daySchedule = mockClassSchedule.horarios.find((h) => h.dia === selectedDay);

  return (
    <DashboardLayout>
      <PageHeader
        title="Grade Horária"
        subtitle={`Turma ${mockClassSchedule.turma} — Horário semanal`}
        accentColor={ACCENT}
        action={
          canEdit ? (
            <button
              onClick={() => toast.info("Editor de grade horária disponível em breve.")}
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all active:translate-y-0.5"
              style={{ backgroundColor: "#e5244a", color: "#f0f0f8", border: "1px solid rgba(229,36,74,0.5)", boxShadow: "0 0 12px rgba(229,36,74,0.35)" }}
            >
              <Plus size={16} />
              Editar Grade
            </button>
          ) : undefined
        }
      />

      {/* Seletor de dia */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {mockClassSchedule.horarios.map((h) => (
          <button
            key={h.dia}
            onClick={() => setSelectedDay(h.dia)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all"
            )}
            style={
              selectedDay === h.dia
                ? { backgroundColor: "#e5244a", color: "#f0f0f8", border: "1px solid rgba(229,36,74,0.5)" }
                : { backgroundColor: "#1a1a2c", color: "rgba(240,240,248,0.6)", border: "1px solid rgba(255,255,255,0.12)" }
            }
          >
            {diaLabels[h.dia].split("-")[0]}
          </button>
        ))}
      </div>

      {/* Grade do dia selecionado */}
      <SectionCard title={diaLabels[selectedDay]}>
        <div className="space-y-3">
          {daySchedule?.aulas.map((aula, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2 w-28 flex-shrink-0">
                <Clock size={14} style={{ color: "rgba(240,240,248,0.4)" }} />
                <span className="text-xs font-mono" style={{ color: "rgba(240,240,248,0.6)" }}>{aula.horario}</span>
              </div>
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: disciplineColors[aula.disciplina] || "#1C1917" }}
              />
              <div className="flex-1">
                <p className="font-semibold" style={{ color: "#f0f0f8" }}>{aula.disciplina}</p>
                <p className="text-xs" style={{ color: "rgba(240,240,248,0.5)" }}>{aula.professor}</p>
              </div>
              <Badge color={disciplineColors[aula.disciplina] || "#1C1917"}>
                {aula.sala}
              </Badge>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Visão semanal compacta */}
      <div className="mt-6">
        <h3 className="font-bold mb-4" style={{ color: "#f0f0f8", fontFamily: "'Fraunces', serif" }}>
          Visão Semanal
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <thead>
              <tr style={{ backgroundColor: "#1a1a2c" }}>
                <th className="p-3 text-left font-semibold" style={{ color: "rgba(240,240,248,0.7)" }}>Horário</th>
                {mockClassSchedule.horarios.map((h) => (
                  <th key={h.dia} className="p-3 text-center font-semibold" style={{ color: "rgba(240,240,248,0.7)" }}>
                    {diaLabels[h.dia].split("-")[0].substring(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockClassSchedule.horarios[0].aulas.map((_, aulaIdx) => (
                <tr key={aulaIdx} className="transition-colors" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="p-3 font-mono whitespace-nowrap" style={{ color: "rgba(240,240,248,0.5)" }}>
                    {mockClassSchedule.horarios[0].aulas[aulaIdx]?.horario.split(" - ")[0]}
                  </td>
                  {mockClassSchedule.horarios.map((h) => {
                    const aula = h.aulas[aulaIdx];
                    return (
                      <td key={h.dia} className="p-2 text-center">
                        {aula ? (
                          <span
                            className="inline-block px-2 py-1 rounded-md text-[10px] font-semibold"
                            style={{ backgroundColor: disciplineColors[aula.disciplina] || "#e5244a", color: "#f0f0f8" }}
                          >
                            {aula.disciplina.substring(0, 4)}
                          </span>
                        ) : (
                          <span style={{ color: "rgba(240,240,248,0.2)" }}>—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export * from "./components";
export * from "./services";
export * from "./utils";
