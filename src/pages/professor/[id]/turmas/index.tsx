import { useParams } from "next/navigation";
import { mockData, mockTurmas } from "@/lib/mockTurmas";
import { getMenuByRole } from "@/lib/menu";

export default function ProfessorTurmas() {
  const { id } = useParams();
  const userId = parseInt(id as string);

  const professor = mockData.usuarios.teachers.find((t) => t.id === userId);
  const turmas = mockTurmas.filter((t) => t.professores.includes(userId));

  if (!professor) return <div>Professor não encontrado.</div>;

  const menu = getMenuByRole("PROFESSOR", userId);

  return (
    <div>
      <h1>Turmas - Professor {professor.nome}</h1>
      <ul>
        {turmas.map((turma) => (
          <li key={turma.Id}>{turma.Nome}</li>
        ))}
      </ul>
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