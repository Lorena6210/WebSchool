import { useParams } from "next/navigation";
import { mockData } from "@/lib/mockTurmas";
import { getMenuByRole } from "@/lib/menu";

export default function ResponsavelAluno() {
  const { id } = useParams();
  const userId = parseInt(id as string);

  const responsavel = mockData.usuarios.responsible.find((r) => r.id === userId);
  const alunos = responsavel?.alunos.map((alunoId) =>
    mockData.usuarios.students.find((s) => s.id === alunoId)
  ).filter(Boolean);

  if (!responsavel) return <div>Responsável não encontrado.</div>;

  const menu = getMenuByRole("RESPONSAVEL", userId);

  return (
    <div>
      <h1>Aluno - Responsável {responsavel.nome}</h1>
      {alunos?.map((aluno) => (
        <div key={aluno.id}>
          <p>Nome: {aluno.nome} - RA: {aluno.ra}</p>
        </div>
      ))}
      <nav>
        {menu.map((item, idx) => (
          <button key={idx} onClick={item.onClick}>
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}