"use client";

import type { ComponentType } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import type { UserRole } from "@/types";
import AtividadesAlunoView from "./components/AtividadesAlunoView";
import AtividadesProfessorView from "./components/AtividadesProfessorView";

const roleView: Partial<Record<UserRole, ComponentType>> = {
  aluno: AtividadesAlunoView,
  professor: AtividadesProfessorView,
};

export default function Atividades() {
  const { user } = useAuth();
  const Component = user?.role ? roleView[user.role] : null;

  if (!Component) {
    return null;
  }

  return <Component />;
}


