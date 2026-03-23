"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/context/AuthContext";

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["aluno"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1C1917]">Perfil</h1>
            <p className="text-sm text-[#1C1917]/60">Dados da sua conta escolar.</p>
          </div>

          <div className="grid gap-4 rounded-xl border-2 border-[#1C1917]/10 bg-white p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#1C1917]/50">Nome</p>
              <p className="font-semibold text-[#1C1917]">{user?.nome ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#1C1917]/50">RA</p>
              <p className="font-semibold text-[#1C1917]">{user?.ra ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#1C1917]/50">Turma</p>
              <p className="font-semibold text-[#1C1917]">{user?.turma ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#1C1917]/50">Perfil</p>
              <p className="font-semibold capitalize text-[#1C1917]">{user?.role ?? "-"}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
