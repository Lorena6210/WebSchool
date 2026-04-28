"use client";

import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterType } from "../../utils";

type ActivitiesFiltersProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export function ActivitiesFilters({ filter, onFilterChange }: ActivitiesFiltersProps) {
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      <Filter size={16} style={{ color: "rgba(240,240,248,0.4)" }} />
      {(["todos", "pendente", "entregue", "atrasado"] as FilterType[]).map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize"
          )}
          style={
            filter === status
              ? { backgroundColor: "#e5244a", color: "#f0f0f8", border: "1px solid rgba(229,36,74,0.5)" }
              : { backgroundColor: "#1a1a2c", color: "rgba(240,240,248,0.6)", border: "1px solid rgba(255,255,255,0.12)" }
          }
        >
          {status === "todos" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}
