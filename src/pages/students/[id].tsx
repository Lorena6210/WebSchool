import { GetServerSideProps } from 'next';
import AlunoPage from "../../Views/Student";
import { data } from "@/mock/mockUsuarios"; // seu JSON

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
}

export default function PaginaAluno({ usuario }: Props) {
  return <AlunoPage usuario={usuario} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idAluno = Number(id);
  const aluno = data.usuarios.alunos.find((u) => u.id === idAluno);

  if (!aluno) {
    return { notFound: true };
  }

  return {
    props: {
      usuario: {
        Id: aluno.id,
        Nome: aluno.nome,
        Role: "ALUNO",
      },
    },
  };
};
