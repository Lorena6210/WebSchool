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

const ACCENT = "#3B4FD8";

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
              className="flex items-center gap-2 px-4 py-2 bg-[#3B4FD8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#2D3FB8] transition-all active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #1C1917" }}
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
              "px-4 py-2 rounded-lg text-sm font-semibold border-2 whitespace-nowrap transition-all",
              selectedDay === h.dia
                ? "bg-[#1C1917] text-white border-[#1C1917]"
                : "bg-white text-[#1C1917]/60 border-[#1C1917]/20 hover:border-[#1C1917]/50"
            )}
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
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#1C1917]/10 hover:border-[#1C1917]/30 transition-all"
            >
              <div className="flex items-center gap-2 w-28 flex-shrink-0">
                <Clock size={14} className="text-[#1C1917]/40" />
                <span className="text-xs font-mono text-[#1C1917]/60">{aula.horario}</span>
              </div>
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: disciplineColors[aula.disciplina] || "#1C1917" }}
              />
              <div className="flex-1">
                <p className="font-semibold text-[#1C1917]">{aula.disciplina}</p>
                <p className="text-xs text-[#1C1917]/50">{aula.professor}</p>
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
        <h3 className="font-bold text-[#1C1917] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
          Visão Semanal
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-2 border-[#1C1917] rounded-xl overflow-hidden" style={{ boxShadow: "4px 4px 0px #1C1917" }}>
            <thead>
              <tr className="bg-[#1C1917] text-white">
                <th className="p-3 text-left font-semibold">Horário</th>
                {mockClassSchedule.horarios.map((h) => (
                  <th key={h.dia} className="p-3 text-center font-semibold">
                    {diaLabels[h.dia].split("-")[0].substring(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockClassSchedule.horarios[0].aulas.map((_, aulaIdx) => (
                <tr key={aulaIdx} className="border-t border-[#1C1917]/10 hover:bg-[#FDFAF5] transition-colors">
                  <td className="p-3 font-mono text-[#1C1917]/60 whitespace-nowrap">
                    {mockClassSchedule.horarios[0].aulas[aulaIdx]?.horario.split(" - ")[0]}
                  </td>
                  {mockClassSchedule.horarios.map((h) => {
                    const aula = h.aulas[aulaIdx];
                    return (
                      <td key={h.dia} className="p-2 text-center">
                        {aula ? (
                          <span
                            className="inline-block px-2 py-1 rounded-md text-white text-[10px] font-semibold"
                            style={{ backgroundColor: disciplineColors[aula.disciplina] || "#1C1917" }}
                          >
                            {aula.disciplina.substring(0, 4)}
                          </span>
                        ) : (
                          <span className="text-[#1C1917]/20">—</span>
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
