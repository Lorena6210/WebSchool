// pages/professor/[id].tsx - Página dinâmica para professores
import { GetServerSideProps } from "next";
import TeacherPage from "../../Views/Teacher";
import { data } from "@/data";
import BasePage from "@/components/BasePage";
import { TurmaCompleta } from "@/types/Turma";
import { mockTurmas } from "@/mock/mockTurmas";
import Root from '../../components/Root';

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
  turmas: TurmaCompleta[];
}

export default function PaginaProfessor({ usuario, turmas }: Props) {
  return (
    <Root>
      <BasePage usuario={usuario} titulo="Turmas do Professor">
        <TeacherPage usuario={usuario} turmas={turmas} />
      </BasePage>
    </Root>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;
  if (!id || Array.isArray(id)) return { notFound: true };
  const idProfessor = Number(id);
  const professor = data.usuarios.teachers.find((u) => u.id === idProfessor);
  if (!professor) return { notFound: true };
  return {
    props: {
      usuario: { Id: professor.id, Nome: professor.nome, Role: "PROFESSOR" },
      turmas: mockTurmas,
    },
  };
};