"use client";

// ============================================================
// WebSchool — Relatórios (Gestor)
// ============================================================

import React from "react";
import { PageHeader } from "@/components/ui/stat-card";
import {
  ACCENT,
  performanceData,
  monthlyData,
  situacaoData,
  getReportStats,
} from "./utils";
import {
  RelatorioKPIs,
  MediaDisciplinaChart,
  SituacaoAlunosChart,
  EvolucaoMensalChart,
} from "./components";

export default function Relatorios() {
  const { kpis } = getReportStats();

  return (
    <>
      <PageHeader
        title="Relatórios"
        subtitle="Análise de desempenho e frequência da escola"
        accentColor={ACCENT}
      />

      {/* KPIs */}
      <RelatorioKPIs kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Média por disciplina */}
        <MediaDisciplinaChart data={performanceData} />

        {/* Situação dos alunos */}
        <SituacaoAlunosChart data={situacaoData} />
      </div>

      {/* Evolução mensal */}
      <EvolucaoMensalChart data={monthlyData} />
    </>
  );
}

