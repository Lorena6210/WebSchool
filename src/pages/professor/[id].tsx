// pages/professor/[id].tsx - Página dinâmica para professores
import { GetServerSideProps } from "next";
import TeacherPage from "../../Views/teachers";  // Corrigido: Caminho para o componente TeacherPage (assumindo pasta teachers)
import { data } from "@/mock/mockUsuarios";  // Import do data.ts
import { TurmaCompleta, Disciplina } from "@/types/Turma";  // Assumindo que existem; remova se não usados
import { mockTurmas } from "@/mock/mockTurmas";  // Import separado para turmas
import Root from "@/components/Root";
import BasePage from "@/components/BasePage";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
  turmas: TurmaCompleta[];  // Adicionado como prop para passar turmas
}

export default function PaginaProfessor({ usuario, turmas }: Props) {  // Corrigido: turmas como prop
  const turma = turmas[0];  // Agora usa a prop turmas - ajuste se precisar de lógica para selecionar a turma correta do professor
  return (
      <BasePage usuario={usuario} titulo={turma?.Nome || "Turma"}>
        <TeacherPage usuario={usuario} turmas={turmas} />  {/* Passa turmas como prop para o componente */}
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

  const idProfessor = Number(id);
  const professor = data.usuarios.teachers.find(
    (u) => u.id === idProfessor
  );

  if (!professor) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: professor.id,
        Nome: professor.nome,
        Role: "PROFESSOR",
      },
      turmas: mockTurmas,  // Assumindo que mockTurmas é um array de TurmaCompleta; substitua por fetch real se necessário
    },
  };
};
