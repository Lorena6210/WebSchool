'use client';

import { useParams } from 'next/navigation';
import DashboardAluno from '@/pages/aluno/DashboardAluno';
import DashboardProfessor from '@/pages/professor/DashboardProfessor';
import DashboardGestor from '@/pages/gestor/DashboardGestor';
import DashboardResponsavel from '@/pages/responsavel/DashboardResponsavel';

export default function MuralPage() {
  const params = useParams<{ acesso: string }>();
  const acesso = params?.acesso;

  if (acesso === 'aluno') return <DashboardAluno />;
  if (acesso === 'professor') return <DashboardProfessor />;
  if (acesso === 'gestor') return <DashboardGestor />;
  if (acesso === 'responsavel') return <DashboardResponsavel />;

  return <div>Acesso inválido</div>;
}