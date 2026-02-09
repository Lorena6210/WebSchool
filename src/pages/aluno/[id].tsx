// pages/aluno/[id].tsx - Página dinâmica para alunos
import { GetServerSideProps } from "next";
import AlunoPage from "../../Views/Student";  // Ajuste o caminho se necessário (e.g., @/Views/Student)
import { data } from "@/mock/mockUsuarios";  // Corrigido: Import do data.ts (não mockUsuarios) - assumindo que o arquivo é mockUsuarios.ts baseado no contexto
// import BasePage from "@/components/BasePage";  // Removido se não usado, mas mantido no código abaixo
import { TurmaCompleta, Disciplina } from "@/types/Turma";  // Assumindo que existem; remova se não usados
import { mockTurmas } from "@/mock/mockTurmas";  // Import separado para turmas - assumindo que existe; se não, substitua por lógica para buscar turmas
import Root from "@/components/Root";
import BasePage from "@/components/BasePage";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Props {
  usuario: Usuario;
  turmas: TurmaCompleta[];  // Adicionado como prop para passar turmas
}

export default function PaginaAluno({ usuario, turmas }: Props) {  // Corrigido: turmas como prop
  const turma = turmas[0];  // Agora usa a prop turmas - ajuste se precisar de lógica para selecionar a turma correta do aluno
  return (
      <BasePage usuario={usuario} titulo={turma?.Nome || "Turma"} >
        <AlunoPage usuario={usuario} />
      </BasePage>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx
) => {
  const { id } = ctx.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idAluno = Number(id);
  const aluno = data.usuarios.students.find(
    (u) => u.id === idAluno
  );

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
      turmas: mockTurmas,  // Assumindo que mockTurmas é um array de TurmaCompleta; substitua por fetch real se necessário
    },
  };
};