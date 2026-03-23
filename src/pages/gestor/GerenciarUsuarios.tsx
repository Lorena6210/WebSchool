"use client";

// ============================================================
// WebSchool — Gerenciar Usuários (Gestor)
// ============================================================

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader, SectionCard, Badge } from "@/components/ui/stat-card";
import { mockUsers } from "@/lib/mockData";
import type { UserRole } from "@/types";
import { Users, Plus, Search, Edit, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCENT = "#3B4FD8";

const roleColors: Record<UserRole, string> = {
  aluno: "#6B21A8", responsavel: "#B45309", professor: "#166534", gestor: "#3B4FD8",
};

const roleLabels: Record<UserRole, string> = {
  aluno: "Aluno", responsavel: "Responsável", professor: "Professor", gestor: "Gestor",
};

type FilterRole = "todos" | UserRole;

// ── Modal criar usuário ──────────────────────────────────────
function ModalNovoUsuario({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nome: "", email: "", ra: "", role: "aluno" as UserRole, turma: "", senha: "",
  });

  const handleSalvar = () => {
    if (!form.nome || !form.role) {
      toast.error("Preencha ao menos nome e perfil.");
      return;
    }
    if (form.role === "aluno" && !form.ra) {
      toast.error("Alunos precisam de RA.");
      return;
    }
    if (form.role !== "aluno" && !form.email) {
      toast.error("Informe o e-mail.");
      return;
    }
    toast.success(`Usuário ${form.nome} criado com sucesso!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-6 w-full max-w-md" style={{ boxShadow: "6px 6px 0 #1C1917" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: roleColors[form.role] + "20" }}>
            <UserPlus size={20} style={{ color: roleColors[form.role] }} />
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>Novo Usuário</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#1C1917]/50 uppercase tracking-wide">Perfil</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
              className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#3B4FD8] bg-white"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="responsavel">Responsável</option>
              <option value="gestor">Gestor</option>
            </select>
          </div>

          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome completo" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B4FD8]" />

          {form.role === "aluno" ? (
            <input value={form.ra} onChange={(e) => setForm({ ...form, ra: e.target.value })} placeholder="RA (Registro do Aluno)" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B4FD8]" />
          ) : (
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B4FD8]" />
          )}

          {(form.role === "aluno" || form.role === "professor") && (
            <input value={form.turma} onChange={(e) => setForm({ ...form, turma: e.target.value })} placeholder="Turma (ex: 9º A)" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B4FD8]" />
          )}

          <div>
            <label className="text-xs text-[#1C1917]/50 uppercase tracking-wide">Senha inicial</label>
            <input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder="Senha inicial para o usuário" className="w-full border-2 border-[#1C1917]/20 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#3B4FD8]" />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={handleSalvar} className="flex-1 flex items-center justify-center gap-2 bg-[#3B4FD8] text-white font-semibold py-2 rounded-lg text-sm hover:bg-[#2D3FB8] transition-all">
            <UserPlus size={14} /> Criar Usuário
          </button>
          <button onClick={onClose} className="flex-1 border-2 border-[#1C1917]/20 text-[#1C1917] font-semibold py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── GerenciarUsuarios ────────────────────────────────────────

export default function GerenciarUsuarios() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<FilterRole>("todos");
  const [modalOpen, setModalOpen] = useState(false);

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
      {modalOpen && <ModalNovoUsuario onClose={() => setModalOpen(false)} />}

      <PageHeader
        title="Gerenciar Usuários"
        subtitle={`${mockUsers.length} usuários cadastrados — pesquise, filtre e crie novos`}
        accentColor={ACCENT}
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B4FD8] text-white font-semibold rounded-lg border-2 border-[#1C1917] text-sm hover:bg-[#2D3FB8] transition-all active:translate-y-0.5"
            style={{ boxShadow: "3px 3px 0px #1C1917" }}
          >
            <Plus size={16} /> Novo Usuário
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
        <div className="flex gap-2 flex-wrap">
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
              {r === "todos" ? `Todos (${mockUsers.length})` : `${roleLabels[r as UserRole]} (${mockUsers.filter(u => u.role === r).length})`}
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
              <div key={u.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#1C1917]/10 hover:border-[#1C1917]/30 transition-all">
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
                    {u.disciplinas && ` · ${u.disciplinas.join(", ")}`}
                  </p>
                </div>
                <Badge color={roleColors[u.role]}>{roleLabels[u.role]}</Badge>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toast.info(`Editando ${u.nome}...`)}
                    className="p-2 rounded-lg border border-[#1C1917]/20 hover:border-[#3B4FD8] hover:text-[#3B4FD8] transition-all"
                    title="Editar"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => toast.error(`Usuário ${u.nome} removido (simulação)`)}
                    className="p-2 rounded-lg border border-[#1C1917]/20 hover:border-red-400 hover:text-red-600 transition-all"
                    title="Excluir"
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
