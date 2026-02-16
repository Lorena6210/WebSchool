import { GetServerSideProps } from "next";
import BasePage from "@/components/BasePage";
import TeacherPage from "@/Views/teachers";
import { schoolMock } from "@/mock/schoolMock";

interface Usuario {
  Id: number;
  Nome: string;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaProfessor({ usuario }: Props) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Professor">
      <TeacherPage usuario={usuario} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) return { notFound: true };

  const idProfessor = Number(id);

  const professor = schoolMock.professores.find(p => p.id === idProfessor);

  if (!professor) return { notFound: true };

  const perfil = schoolMock.perfis.find(p => p.id === professor.perfilId);

  if (!perfil) return { notFound: true };

  return {
    props: {
      usuario: {
        Id: professor.id,
        Nome: perfil.nome,
        Role: "PROFESSOR",
      },
    },
  };
};
