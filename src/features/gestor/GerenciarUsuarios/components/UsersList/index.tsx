"use client";

import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Badge } from "@/components/ui/stat-card";
import { roleColors, roleLabels } from "../../utils";
import { Clock3, Edit, Mail, Plus, Shield, Trash2, UserCircle2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/types";

type UsersListProps = {
  isDark: boolean;
  accent: string;
  users: User[];
  onCreateUser: () => void;
};

function getAddedByName(user: User) {
  if (user.role === "aluno") return "Secretaria Escolar";
  if (user.role === "professor") return "Coordenação Pedagógica";
  if (user.role === "responsavel") return "Portal de Matrícula";
  return "Super Admin";
}

function getLastUpdate(user: User) {
  const day = ((Number(user.id.replace(/\D/g, "")) || 1) % 26) + 1;
  return `${String(day).padStart(2, "0")}/04/2026 14:${String((day * 3) % 60).padStart(2, "0")}`;
}

function getMaskedPassword(user: User) {
  const visibleHint = user.role === "aluno" ? "aluno" : user.role;
  return `${visibleHint}********`;
}

export function UsersList({ isDark, accent, users, onCreateUser }: UsersListProps) {
  return (
    <div
      className="rounded-2xl p-4 sm:p-5"
      style={{
        backgroundColor: isDark ? "#12121e" : "#ffffff",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,39,71,0.12)",
        boxShadow: isDark ? "0 8px 28px rgba(0,0,0,0.35)" : "0 8px 24px rgba(15,39,71,0.12)",
      }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold" style={{ color: accent, letterSpacing: "0.04em" }}>
            GESTAO DE USUARIOS
          </p>
          <p style={{ color: isDark ? "rgba(240,240,248,0.65)" : "rgba(15,39,71,0.68)" }}>
            Nome, foto, email, senha, ultima atualizacao e responsavel pelo cadastro
          </p>
        </div>
        <button
          onClick={onCreateUser}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          style={{
            backgroundColor: accent,
            color: "#ffffff",
            border: `1px solid ${accent}88`,
            boxShadow: `0 0 14px ${accent}55`,
          }}
        >
          <Plus size={15} /> Criar Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {users.length === 0 ? (
          <div className="rounded-xl py-12 text-center" style={{ border: isDark ? "1px dashed rgba(255,255,255,0.14)" : "1px dashed rgba(15,39,71,0.2)" }}>
            <Users size={40} className="mx-auto mb-3" style={{ color: isDark ? "rgba(240,240,248,0.2)" : "rgba(15,39,71,0.2)" }} />
            <p style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>Nenhum usuário encontrado</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl p-4 transition-all"
              style={{
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
                backgroundColor: isDark ? "#1a1a2c" : "#f7faff",
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    sx={{
                      width: 46,
                      height: 46,
                      bgcolor: `${roleColors[user.role]}22`,
                      border: `2px solid ${roleColors[user.role]}66`,
                      color: roleColors[user.role],
                      fontWeight: 700,
                    }}
                  >
                    {user.avatarInitials || <UserCircle2 size={18} />}
                  </Avatar>
                  <div>
                    <p className="font-semibold" style={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>{user.nome}</p>
                    <p className="text-xs" style={{ color: isDark ? "rgba(240,240,248,0.56)" : "rgba(15,39,71,0.62)" }}>
                      {user.email || `${user.ra ?? "sem-ra"}@aluno.webschool.edu.br`}
                    </p>
                  </div>
                </div>
                <Badge color={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
              </div>

              <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl px-3 py-2" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.06)" }}>
                  <div className="mb-1 flex items-center gap-1 text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.54)" }}>
                    <Mail size={12} /> Email
                  </div>
                  <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>
                    {user.email || `${user.ra ?? "sem-ra"}@aluno.webschool.edu.br`}
                  </Typography>
                </div>

                <div className="rounded-xl px-3 py-2" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.06)" }}>
                  <div className="mb-1 flex items-center gap-1 text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.54)" }}>
                    <Shield size={12} /> Senha
                  </div>
                  <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#f0f0f8" : "#0f2747", letterSpacing: "0.06em" }}>
                    {getMaskedPassword(user)}
                  </Typography>
                </div>

                <div className="rounded-xl px-3 py-2" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.06)" }}>
                  <div className="mb-1 flex items-center gap-1 text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.54)" }}>
                    <Clock3 size={12} /> Ultima atualizacao
                  </div>
                  <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>
                    {getLastUpdate(user)}
                  </Typography>
                </div>

                <div className="rounded-xl px-3 py-2" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,39,71,0.06)" }}>
                  <div className="mb-1 flex items-center gap-1 text-xs" style={{ color: isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.54)" }}>
                    <UserPlus size={12} /> Usuario adicionado por
                  </div>
                  <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#f0f0f8" : "#0f2747" }}>
                    {getAddedByName(user)}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => toast.info(`Editando ${user.nome}...`)}
                  className="p-2 rounded-lg transition-all"
                  style={{ border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)", color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)" }}
                  title="Editar"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => toast.error(`Usuário ${user.nome} removido (simulação)`)}
                  className="p-2 rounded-lg transition-all"
                  style={{ border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)", color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)" }}
                  title="Excluir"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
