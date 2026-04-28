"use client";

// ============================================================
// WebSchool — Gerenciar Usuários (Gestor)
// ============================================================

import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/stat-card";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
import { getRoleAccent } from "@/lib/theme/roleAccent";
import { mockUsers } from "@/lib/mockData";
import { Plus } from "lucide-react";
import {ModalNovoUsuario} from "./components/ModalNovoUsuario";
import { UserFilters } from "./components/UserFilters"
import { UsersList } from "./components/UsersList";
import { ACCENT } from "./utils";
import type { FilterRole } from "./utils";

// ── GerenciarUsuarios ────────────────────────────────────────

export default function GerenciarUsuarios() {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === "dark";
  const accent = getRoleAccent(user?.role) || ACCENT;
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
      {modalOpen && <ModalNovoUsuario isDark={isDark} accent={accent} onClose={() => setModalOpen(false)} />}

      <Box sx={{ width: "100%", minHeight: "100vh", py: 2, bgcolor: isDark ? "#0c0c14" : "#f2f7ff" }}>
        <Container maxWidth="lg">
          <PageHeader
            title="Gerenciar Usuários"
            subtitle={`${mockUsers.length} usuários cadastrados — pesquise, filtre e crie novos`}
            accentColor={accent}
            action={
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all active:translate-y-0.5"
                style={{ backgroundColor: accent, color: "#f0f0f8", border: `1px solid ${accent}88`, boxShadow: `0 0 12px ${accent}66` }}
              >
                <Plus size={16} /> Novo Usuário
              </button>
            }
          />

          <UserFilters
            isDark={isDark}
            accent={accent}
            search={search}
            onSearchChange={setSearch}
            filterRole={filterRole}
            onFilterRoleChange={setFilterRole}
          />

          <UsersList isDark={isDark} accent={accent} users={filtered} onCreateUser={() => setModalOpen(true)} />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
