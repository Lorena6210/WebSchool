"use client";

// ============================================================
// WebSchool — Histórico Médico
// Design: Academic Warmth — Cards informativos com ícones
// ============================================================

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { mockMedicalRecord } from "@/lib/mockData";
import { AlertTriangle, FileText, Phone, Info, Heart } from "lucide-react";

const ACCENT = "#DC2626";

export default function HistoricoMedico() {
  const record = mockMedicalRecord;

  return (
    <DashboardLayout>
      <PageHeader
        title="Histórico Médico"
        subtitle="Informações de saúde e contato de emergência"
        accentColor={ACCENT}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alergias */}
        <SectionCard title="Alergias">
          <div className="space-y-3">
            {record.alergias.length === 0 ? (
              <p className="text-sm text-[#1C1917]/50">Nenhuma alergia registrada.</p>
            ) : (
              record.alergias.map((alergia, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-red-800">{alergia}</span>
                  <Badge color="#DC2626" className="ml-auto">Alergia</Badge>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        {/* Contato de emergência */}
        <SectionCard title="Contato de Emergência">
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-lg">
                {record.contatoEmergencia.nome.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#1C1917]" style={{ fontFamily: "'Fraunces', serif" }}>
                  {record.contatoEmergencia.nome}
                </p>
                <p className="text-sm text-[#1C1917]/60">{record.contatoEmergencia.parentesco}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200">
              <Phone size={16} className="text-amber-700" />
              <span className="text-sm font-semibold text-[#1C1917]">
                {record.contatoEmergencia.telefone}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Laudos */}
        <SectionCard title="Laudos Médicos">
          <div className="space-y-3">
            {record.laudos.length === 0 ? (
              <p className="text-sm text-[#1C1917]/50">Nenhum laudo registrado.</p>
            ) : (
              record.laudos.map((laudo, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 border border-[#1C1917]/10 rounded-lg hover:border-[#1C1917]/30 transition-all"
                >
                  <FileText size={18} className="text-[#3B4FD8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#1C1917]">{laudo}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        {/* Observações */}
        <SectionCard title="Observações Médicas">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#1C1917] leading-relaxed">{record.observacoes}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Aviso de confidencialidade */}
      <div className="mt-6 p-4 bg-[#1C1917]/5 border border-[#1C1917]/10 rounded-xl flex items-start gap-3">
        <Heart size={18} className="text-[#1C1917]/40 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#1C1917]/50">
          As informações médicas são confidenciais e acessíveis apenas ao aluno, responsáveis autorizados e gestores escolares. 
          Em caso de emergência, entre em contato imediatamente com o responsável indicado acima.
        </p>
      </div>
    </DashboardLayout>
  );
}
