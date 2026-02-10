// /pages/aluno/[id]/index.tsx (or wherever this page is located)
import { GetServerSideProps } from "next";
import { TurmaCompleta } from "@/types/Turma";
import { mockTurmas } from "@/mock/mockTurmas";
import { data } from "@/mock/mockUsuarios";
import BasePage from "@/components/BasePage";
import AlunoInicio from "@/Views/Student/components/inicio";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
  turma: TurmaCompleta | null; // Pass only the relevant turma
}

export default function PaginaAlunoInicial({ usuario, turma }: Props) {
  if (!turma) {
    return <div>Turma não encontrada.</div>; // Fallback if no turma
  }

  return (
    <BasePage usuario={usuario} titulo={null}>
      <AlunoInicio usuario={usuario} turma={turma} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idAluno = Number(id);
  if (isNaN(idAluno)) {
    return { notFound: true };
  }

  const aluno = data.usuarios.students.find((u) => u.id === idAluno);
  if (!aluno) {
    return { notFound: true };
  }

  // Fetch only the student's turma (assuming aluno.turmaId exists)
  const turma = mockTurmas.find((t) => t.Id === aluno.turmaId) || null;

  return {
    props: {
      usuario: {
        Id: aluno.id,
        Nome: aluno.nome,
        Role: "ALUNO",
      },
      turma, // Pass the specific turma or null
    },
  };
};
