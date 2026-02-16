import { GetServerSideProps } from "next";
import BasePage from "@/components/BasePage";
import AlunoPage from "@/Views/Student";
import { schoolMock } from "@/mock/schoolMock";

interface Usuario {
  Id: number;
  Nome: string;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaAluno({ usuario }: Props) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Aluno">
      <AlunoPage usuario={usuario} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) return { notFound: true };

  const idAluno = Number(id);

  const aluno = schoolMock.alunos.find(a => a.id === idAluno);

  if (!aluno) return { notFound: true };

  const perfil = schoolMock.perfis.find(p => p.id === aluno.perfilId);

  if (!perfil) return { notFound: true };

  return {
    props: {
      usuario: {
        Id: aluno.id,
        Nome: perfil.nome,
        Role: "ALUNO",
      },
    },
  };
};
