"use client";

// ============================================================
// WebSchool — Gerenciar Usuários (Gestor)
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { mockUsers } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCENT = "#3B4FD8";

const roleColors: Record<UserRole, string> = {
  aluno: "#6B21A8",
  responsavel: "#B45309",
  professor: "#166534",
  gestor: "#3B4FD8",
};

const roleLabels: Record<UserRole, string> = {
  aluno: "Aluno",
  responsavel: "Responsável",
  professor: "Professor",
  gestor: "Gestor",
};

type FilterRole = "todos" | UserRole;

export default function GerenciarUsuarios() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<FilterRole>("todos");

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.ra?.includes(search);
    const matchRole = filterRole === "todos" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Gerenciar Usuários"
        subtitle="Administre alunos, professores e responsáveis"
        accentColor={ACCENT}
        action={
          <button
            onClick={() => toast.info("Formulário de cadastro disponível em breve.")}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B4FD8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#2D3FB8] transition-all active:translate-y-0.5"
            style={{ boxShadow: "3px 3px 0px #1C1917" }}
          >
            <Plus size={16} />
            Novo Usuário
          </button>
        }
      />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1917]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail ou RA..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-[#1C1917]/20 rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-[#3B4FD8] transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["todos", "aluno", "professor", "responsavel", "gestor"] as FilterRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all capitalize whitespace-nowrap",
                filterRole === r
                  ? "bg-[#1C1917] text-white border-[#1C1917]"
                  : "bg-white text-[#1C1917]/60 border-[#1C1917]/20 hover:border-[#1C1917]/50"
              )}
            >
              {r === "todos" ? "Todos" : roleLabels[r as UserRole]}
            </button>
          ))}
        </div>
      </div>

      <SectionCard>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Users size={40} className="text-[#1C1917]/20 mx-auto mb-3" />
              <p className="text-[#1C1917]/40">Nenhum usuário encontrado</p>
            </div>
          ) : (
            filtered.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#1C1917]/10 hover:border-[#1C1917]/30 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: roleColors[u.role] }}
                >
                  {u.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1C1917] truncate">{u.nome}</p>
                  <p className="text-xs text-[#1C1917]/50 truncate">
                    {u.ra ? `RA: ${u.ra}` : u.email}
                    {u.turma && ` · Turma ${u.turma}`}
                  </p>
                </div>
                <Badge color={roleColors[u.role]}>{roleLabels[u.role]}</Badge>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toast.info("Edição de usuário disponível em breve.")}
                    className="p-2 rounded-lg border border-[#1C1917]/20 hover:border-[#3B4FD8] hover:text-[#3B4FD8] transition-all"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => toast.error("Exclusão de usuário disponível em breve.")}
                    className="p-2 rounded-lg border border-[#1C1917]/20 hover:border-red-400 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
