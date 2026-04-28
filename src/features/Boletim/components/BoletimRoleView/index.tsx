"use client";

import type { ComponentType } from "react";
import BoletimResponsavel from "@/features/responsavel/BoletimResponsavel";
import { useAuth } from "@/lib/context/AuthContext";
import type { UserRole } from "@/types";
import BoletimAlunoView from "..";
import BoletimProfessorGestorView from "../BoletimProfessorGestorView";

const roleView: Record<UserRole, ComponentType> = {
  aluno: BoletimAlunoView,
  professor: BoletimProfessorGestorView,
  gestor: BoletimProfessorGestorView,
  responsavel: BoletimResponsavel,
};

export default function BoletimRoleView() {
  const { user } = useAuth();

  if (!user?.role) {
    return null;
  }

  const Component = roleView[user.role];
  return <Component />;
}
