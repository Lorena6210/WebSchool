"use client";

// ============================================================
// WebSchool — Avisos e Comunicados
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { mockNotices } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { Bell, Plus, Send } from "lucide-react";
import { toast } from "sonner";

const ACCENT = "#3B4FD8";

const noticeTypeColors: Record<string, string> = {
  prova: "#B45309",
  reuniao: "#3B4FD8",
  atividade: "#166534",
  geral: "#6B21A8",
};

export default function Avisos() {
  const { user } = useAuth();
  const canSend = user?.role === "professor" || user?.role === "gestor";

  // Filtrar avisos relevantes para o perfil
  const myNotices = mockNotices.filter((n) =>
    n.destinatarios.includes(user?.role as UserRole)
  );

  const displayNotices = canSend ? mockNotices : myNotices;

  return (
    <DashboardLayout>
      <PageHeader
        title={canSend ? "Avisos e Comunicados" : "Avisos"}
        subtitle={canSend ? "Envie comunicados para alunos e responsáveis" : "Comunicados da escola"}
        accentColor={ACCENT}
        action={
          canSend ? (
            <button
              onClick={() => toast.info("Formulário de envio de aviso disponível em breve.")}
              className="flex items-center gap-2 px-4 py-2 bg-[#3B4FD8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#2D3FB8] transition-all active:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px #1C1917" }}
            >
              <Send size={16} />
              Enviar Aviso
            </button>
          ) : undefined
        }
      />

      <div className="space-y-4">
        {displayNotices.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={48} className="text-[#1C1917]/20 mx-auto mb-4" />
            <p className="text-[#1C1917]/40 font-medium">Nenhum aviso disponível</p>
          </div>
        ) : (
          displayNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border-2 border-[#1C1917] rounded-xl p-5"
              style={{ boxShadow: "4px 4px 0px #1C1917" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge color={noticeTypeColors[notice.tipo]}>
                      {notice.tipo}
                    </Badge>
                    <span className="text-xs text-[#1C1917]/40">
                      {new Date(notice.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-[#1C1917] text-lg mb-2"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {notice.titulo}
                  </h3>
                  <p className="text-sm text-[#1C1917]/70 leading-relaxed">{notice.mensagem}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-xs text-[#1C1917]/40">Por: {notice.autorNome}</p>
                    {canSend && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#1C1917]/30">Para:</span>
                        {notice.destinatarios.map((dest) => (
                          <Badge key={dest} color="#1C1917" className="text-[10px]">
                            {dest}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
