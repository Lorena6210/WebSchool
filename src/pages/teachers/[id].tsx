import { GetServerSideProps } from 'next';
import ProfessorPage from "../../Views/Teacher";
import { data } from "@/mock/mockUsuarios";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

export default function PaginaProfessor({ usuario }: { usuario: Usuario }) {
  return <ProfessorPage usuario={usuario} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idProf = Number(id);
  const prof = data.usuarios.professores.find((u) => u.id === idProf);

  if (!prof) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: prof.id,
        Nome: prof.nome,
        Role: "PROFESSOR",
      },
    },
  };
};
