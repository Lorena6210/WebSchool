"use client";

import { useAuth } from "@/lib/context/AuthContext";
import type { UserRole } from "@/types";
import { AtividadesAlunoView, AtividadesProfessorView } from "./components";

const roleView: Partial<Record<UserRole, React.ComponentType>> = {
  aluno: AtividadesAlunoView,
  professor: AtividadesProfessorView,
};

export default function AtividadesRoot() {
  const { user } = useAuth();
  const Component = user?.role ? roleView[user.role] : null;

  if (!Component) return null;

  return <Component />;
}
