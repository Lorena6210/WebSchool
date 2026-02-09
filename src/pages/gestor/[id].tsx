// pages/gestor/[id].tsx - Página dinâmica para gestores
import { GetServerSideProps } from "next";
import ManagerPage from "../../Views/manager";
import { data } from "@/mock/mockUsuarios";
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

export default function PaginaGestor({ usuario }: Props) {
  return (
    <BasePage usuario={usuario} titulo="Painel do Gestor">
      <ManagerPage usuario={usuario} />
    </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;
  if (!id || Array.isArray(id)) return { notFound: true };
  const idGestor = Number(id);
  const gestor = data.usuarios.manager.find((u) => u.id === idGestor);
  if (!gestor) return { notFound: true };
  return {
    props: {
      usuario: { Id: gestor.id, Nome: gestor.nome, Role: "GESTOR" },
    },
  };
};