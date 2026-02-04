import { GetServerSideProps } from 'next';
import GestorPage from "../../Views/manager";
import { data } from "@/mock/mockUsuarios";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

export default function PaginaGestor({ usuario }: { usuario: Usuario }) {
  return <GestorPage usuario={usuario} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idGest = Number(id);
  const gest = data.usuarios.gestores.find((u) => u.id === idGest);

  if (!gest) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: gest.id,
        Nome: gest.nome,
        Role: "GESTOR",
      },
    },
  };
};
