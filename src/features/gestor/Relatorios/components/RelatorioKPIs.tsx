import React from "react";
import { StatCard } from "@/components/ui/stat-card";

interface KPI {
  title: string;
  value: string;
  subtitle: string;
  accentColor: string;
  icon: React.ReactNode;
}

interface RelatorioKPIsProps {
  kpis: KPI[];
}

export function RelatorioKPIs({ kpis }: RelatorioKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, idx) => (
        <StatCard
          key={idx}
          title={kpi.title}
          value={kpi.value}
          subtitle={kpi.subtitle}
          accentColor={kpi.accentColor}
          icon={kpi.icon}
        />
      ))}
    </div>
  );
}
