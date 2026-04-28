import { notFound } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import type { UserRole } from "@/types";
import DashboardAluno from "@/features/aluno/DashboardAluno";
import DashboardProfessor from "@/features/professor/DashboardProfessor";
import DashboardResponsavel from "@/features/responsavel/DashboardResponsavel";
import DashboardGestor from "@/features/gestor/DashboardGestor";
import DashboardLayout from "@/components/DashboardLayout";

const pageByRole = {
  aluno: DashboardAluno,
  professor: DashboardProfessor,
  responsavel: DashboardResponsavel,
  gestor: DashboardGestor,
} satisfies Record<UserRole, React.ComponentType>;

interface MuralByRolePageProps {
  params: {
    id: string;
  };
}

export default function MuralByRolePage({ params }: MuralByRolePageProps) {
  if (!(params.id in pageByRole)) {
    notFound();
  }

  const role = params.id as UserRole;
  const PageComponent = pageByRole[role];

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <DashboardLayout>
        <PageComponent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}