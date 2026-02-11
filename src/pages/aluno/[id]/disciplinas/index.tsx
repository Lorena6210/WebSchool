import { GetServerSideProps } from "next";
import { data } from "@/mock/mockUsuarios";
import { TurmaCompleta } from "@/types/Turma";
import { mockTurmas } from "@/mock/mockTurmas";
import BasePage from "@/components/BasePage";
import DisciplinasList from "../../../../Views/Student/components/disciplina";

interface Usuario {
  nome: string;
  id: number;
  role: string;
}

interface Props {
  usuario: Usuario;
  turmas: TurmaCompleta[];
}

// types/Turma.ts
export interface Disciplina {
  id: number;
  nome: string;
  progresso?: number;
}

export interface TurmaCompleta {
  id: number;
  nome: string;
  disciplinas: Disciplina[];
}

export default function PaginaAlunoInicial({ usuario, turmas }: Props) {
  const turma = turmas[0];
  return (
    <BasePage usuario={usuario} titulo={null}>
      <DisciplinasList disciplinas={turma?.disciplinas} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx
) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idAluno = Number(id);
  const aluno = data.usuarios.students.find(
    (u) => u.id === idAluno
  );

  if (!aluno) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: aluno.id,
        Nome: aluno.nome,
        Role: "ALUNO",
      },
      turmas: mockTurmas,  // Assumindo que mockTurmas é um array de TurmaCompleta; substitua por fetch real se necessário
    },
  };
};