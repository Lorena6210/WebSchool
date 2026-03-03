'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardAluno from '@/pages/aluno/DashboardAluno';
import DashboardProfessor from '@/pages/professor/DashboardProfessor';
import DashboardResponsavel from '@/pages/responsavel/DashboardResponsavel';
import DashboardGestor from '@/pages/gestor/DashboardGestor';

interface MuralProps {
  perfil: string;
}

export default function Mural({ perfil }: MuralProps) {
  switch (perfil.toLowerCase()) {
    case 'aluno':
      return <ProtectedRoute allowedRoles={['aluno']}><DashboardAluno /></ProtectedRoute>;
    case 'professor':
      return <ProtectedRoute allowedRoles={['professor']}><DashboardProfessor /></ProtectedRoute>;
    case 'responsável':
    case 'responsavel':
      return <ProtectedRoute allowedRoles={['responsavel']}><DashboardResponsavel /></ProtectedRoute>;
    case 'gestor':
      return <ProtectedRoute allowedRoles={['gestor']}><DashboardGestor /></ProtectedRoute>;
    default:
      return <div>Perfil não encontrado</div>;
  }
}