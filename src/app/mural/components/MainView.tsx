"use client";

import { useAuth } from "@/lib/context/AuthContext";
import DashboardAluno from "@/pages/aluno/DashboardAluno";
import DashboardProfessor from "@/pages/professor/DashboardProfessor";
import DashboardResponsavel from "@/pages/responsavel/DashboardResponsavel";
import DashboardGestor from "@/pages/gestor/DashboardGestor";

export default function MainView() {
  const { user } = useAuth();

  if (user?.role === "responsavel") {
    return <DashboardResponsavel />;
  }

  if (user?.role === "professor") {
    return <DashboardProfessor />;
  }

  if (user?.role === "gestor") {
    return <DashboardGestor />;
  }

  return <DashboardAluno />;
}
