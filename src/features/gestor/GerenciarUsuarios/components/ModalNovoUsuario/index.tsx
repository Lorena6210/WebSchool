"use client";

import React, { useState } from "react";
import type { UserRole } from "@/types";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { roleColors } from "../../utils";

type ModalNovoUsuarioProps = {
  isDark: boolean;
  accent: string;
  onClose: () => void;
};

export function ModalNovoUsuario({ isDark, accent, onClose }: ModalNovoUsuarioProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    ra: "",
    role: "aluno" as UserRole,
    turma: "",
    senha: "",
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
      <div
        className="rounded-2xl p-6 w-full max-w-md"
        style={{
          backgroundColor: isDark ? "#12121e" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.6)" : "0 8px 32px rgba(15,39,71,0.16)",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${roleColors[form.role]}20` }}
          >
            <UserPlus size={20} style={{ color: roleColors[form.role] }} />
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: isDark ? "#f0f0f8" : "#0f2747" }}>
            Novo Usuário
          </h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs uppercase tracking-wide" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.52)" }}>Perfil</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
              className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                color: isDark ? "#f0f0f8" : "#0f2747",
              }}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="responsavel">Responsável</option>
              <option value="gestor">Gestor</option>
            </select>
          </div>

          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Nome completo"
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{
              backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
              color: isDark ? "#f0f0f8" : "#0f2747",
            }}
          />

          {form.role === "aluno" ? (
            <input
              value={form.ra}
              onChange={(e) => setForm({ ...form, ra: e.target.value })}
              placeholder="RA (Registro do Aluno)"
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                color: isDark ? "#f0f0f8" : "#0f2747",
              }}
            />
          ) : (
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="E-mail"
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                color: isDark ? "#f0f0f8" : "#0f2747",
              }}
            />
          )}

          {(form.role === "aluno" || form.role === "professor") && (
            <input
              value={form.turma}
              onChange={(e) => setForm({ ...form, turma: e.target.value })}
              placeholder="Turma (ex: 9º A)"
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                color: isDark ? "#f0f0f8" : "#0f2747",
              }}
            />
          )}

          <div>
            <label className="text-xs uppercase tracking-wide" style={{ color: isDark ? "rgba(240,240,248,0.45)" : "rgba(15,39,71,0.52)" }}>Senha inicial</label>
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              placeholder="Senha inicial para o usuário"
              className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                color: isDark ? "#f0f0f8" : "#0f2747",
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={handleSalvar}
            className="flex-1 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg text-sm transition-all"
            style={{ backgroundColor: accent, color: "#f0f0f8" }}
          >
            <UserPlus size={14} /> Criar Usuário
          </button>
          <button
            onClick={onClose}
            className="flex-1 font-semibold py-2 rounded-lg text-sm transition-all"
            style={{
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
              backgroundColor: "transparent",
              color: isDark ? "rgba(240,240,248,0.7)" : "rgba(15,39,71,0.75)",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
