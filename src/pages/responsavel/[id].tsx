// pages/responsavel/[id].tsx - Página dinâmica para responsáveis
import { GetServerSideProps } from "next";
import ResponsiblePage from "../../Views/Responsible";
import { data } from "@/data";
import BasePage from "@/components/BasePage";
import Root from '../../components/Root';

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaResponsavel({ usuario }: Props) {
  return (
    <Root>
      <BasePage usuario={usuario} titulo="Dados do Responsável">
        <ResponsiblePage usuario={usuario} />
      </BasePage>
    </Root>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;
  if (!id || Array.isArray(id)) return { notFound: true };
  const idResponsavel = Number(id);
  const responsavel = data.usuarios.responsible.find((u) => u.id === idResponsavel);
  if (!responsavel) return { notFound: true };
  return {
    props: {
      usuario: { Id: responsavel.id, Nome: responsavel.nome, Role: "RESPONSAVEL" },
    },
  };
};