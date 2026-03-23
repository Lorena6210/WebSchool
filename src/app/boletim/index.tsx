"use client";

import { useAuth } from "@/lib/context/AuthContext";
import type { UserRole } from "@/types";
import { BoletimAlunoView, BoletimResponsavelView } from "./components";

const roleView: Partial<Record<UserRole, React.ComponentType>> = {
  aluno: BoletimAlunoView,
  responsavel: BoletimResponsavelView,
};

export default function BoletimRoot() {
  const { user } = useAuth();
  const Component = user?.role ? roleView[user.role] : null;

  if (!Component) return null;

  return <Component />;
}
