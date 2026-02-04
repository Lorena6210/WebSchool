import { GetServerSideProps } from 'next';
import ResponsavelPage from "../../Views/responsible";
import { data } from "@/mock/mockUsuarios";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

export default function PaginaResponsavel({ usuario }: { usuario: Usuario }) {
  return <ResponsavelPage usuario={usuario} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idResp = Number(id);
  const resp = data.usuarios.responsaveis.find((u) => u.id === idResp);

  if (!resp) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: resp.id,
        Nome: resp.nome,
        Role: "RESPONSAVEL",
      },
    },
  };
};
