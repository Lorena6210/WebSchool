// pages/aluno/[id].tsx - Página dinâmica para alunos
import { GetServerSideProps } from "next";
import AlunoPage from "../../Views/Student";  // Ajuste o caminho se necessário (e.g., @/Views/Student)
import { data } from "@/data";  // Corrigido: Import do data.ts (não mockUsuarios)
import BasePage from "@/components/BasePage";
import { TurmaCompleta, Disciplina } from "@/types/Turma";  // Assumindo que existem; remova se não usados
import { mockTurmas } from "@/mock/mockTurmas";  // Import separado para turmas
import Root from '../../components/Root';  // Corrigido: Import do componente Root

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
  const turma = turmas[0];  // Agora usa a prop turmas
  return (
    <Root>  {/* Corrigido: <Root> em vez de <Root> (sem fechamento automático) */}
      <BasePage usuario={usuario} titulo={turma?.Nome || "Turma"}>
        <AlunoPage usuario={usuario} />
      </BasePage>
    </Root>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const idAluno = Number(id);
  const aluno = data.usuarios.students.find((u) => u.id === idAluno);  // Corrigido: "alunos" → "students" para corresponder ao data.ts (inglês); ajuste se o JSON usar português

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
      turmas: mockTurmas,  // Adicionado: Passa turmas como prop
    },
  };
};