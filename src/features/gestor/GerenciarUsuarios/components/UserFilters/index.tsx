"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { roleLabels } from "../../utils";
import type { FilterRole } from "../../utils";
import { mockUsers } from "@/lib/mockData";
import type { UserRole } from "@/types";

type UserFiltersProps = {
  isDark: boolean;
  accent: string;
  search: string;
  onSearchChange: (value: string) => void;
  filterRole: FilterRole;
  onFilterRoleChange: (role: FilterRole) => void;
};

export function UserFilters({
  isDark,
  accent,
  search,
  onSearchChange,
  filterRole,
  onFilterRoleChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.5)" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, e-mail ou RA..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
          style={{
            backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
            color: isDark ? "#f0f0f8" : "#0f2747",
          }}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["todos", "aluno", "professor", "responsavel", "gestor"] as FilterRole[]).map((role) => (
          <button
            key={role}
            onClick={() => onFilterRoleChange(role)}
            className={cn(
              "px-3 py-2 rounded-lg text-xs font-semibold transition-all capitalize whitespace-nowrap"
            )}
            style={
              filterRole === role
                ? { backgroundColor: accent, color: "#f0f0f8", border: `1px solid ${accent}88`, boxShadow: `0 0 10px ${accent}55` }
                : {
                    backgroundColor: isDark ? "#1a1a2c" : "#ffffff",
                    color: isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)",
                    border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,39,71,0.14)",
                  }
            }
          >
            {role === "todos"
              ? `Todos (${mockUsers.length})`
              : `${roleLabels[role as UserRole]} (${mockUsers.filter((user) => user.role === role).length})`}
          </button>
        ))}
      </div>
    </div>
  );
}
