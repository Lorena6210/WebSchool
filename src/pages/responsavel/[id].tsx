import { GetServerSideProps } from "next";
import BasePage from "@/components/BasePage";
import ResponsiblePage from "@/Views/responsible";
import { schoolMock } from "@/mock/schoolMock";

interface Usuario {
  Id: number;
  Nome: string;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaResponsavel({ usuario }: Props) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Responsável">
      <ResponsiblePage usuario={usuario} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) return { notFound: true };

  const idResponsavel = Number(id);

  const responsavel = schoolMock.responsaveis.find(
    r => r.id === idResponsavel
  );

  if (!responsavel) return { notFound: true };

  const perfil = schoolMock.perfis.find(
    p => p.id === responsavel.perfilId
  );

  if (!perfil) return { notFound: true };

  return {
    props: {
      usuario: {
        Id: responsavel.id,
        Nome: perfil.nome,
        Role: "RESPONSAVEL",
      },
    },
  };
};
