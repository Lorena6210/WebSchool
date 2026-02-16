import { GetServerSideProps } from "next";
import BasePage from "@/components/BasePage";
import ManagerPage from "@/Views/manager";
import { schoolMock } from "@/mock/schoolMock";

interface Usuario {
  Id: number;
  Nome: string;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaGestor({ usuario }: Props) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Gestor">
      <ManagerPage usuario={usuario} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) return { notFound: true };

  const idGestor = Number(id);

  const perfil = schoolMock.perfis.find(
    p => p.id === idGestor && p.role === "GESTOR"
  );

  if (!perfil) return { notFound: true };

  return {
    props: {
      usuario: {
        Id: perfil.id,
        Nome: perfil.nome,
        Role: "GESTOR",
      },
    },
  };
};
