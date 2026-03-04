"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/context/AuthContext";
import AtividadesAluno from "./AtividadesAluno";
import AtividadesProfessor from "./AtividadesProfessor";

export default function AtividadesPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["aluno", "professor"]}>
      {user?.role === "professor" ? (
        <AtividadesProfessor />
      ) : (
        <AtividadesAluno />
      )}
    </ProtectedRoute>
  );
}