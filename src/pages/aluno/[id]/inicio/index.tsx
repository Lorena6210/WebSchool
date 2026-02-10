import { mockTurmas } from "@/mock/mockTurmas"; 
import {data} from "@/mock/mockUsuarios"
import { getMenuByRole } from "@/components/Sidebar/index"; // Seu menu.ts
import { useRouter } from "next/router";  // Pages Router

export default function AlunoInicio() {
  const router = useRouter();

  // Correção: Force id a ser uma string (evita [object Object])
  const id = String(router.query.id);  // Converte para string, mesmo se for array/objeto

  // Aguarde o carregamento e valide
  if (!id || id === 'undefined' || id === '[object Object]') {
    return <div>Carregando ou ID inválido...</div>;
  }

  const userId = parseInt(id);

  // Filtrar dados do aluno
  const aluno = data.usuarios.students.find((s) => s.id === userId);
  const turma = mockTurmas.find((t) => t.Id === aluno?.turmaId);

  if (!aluno || !turma) return <div>Usuário ou turma não encontrada.</div>;

  const menu = getMenuByRole("ALUNO", userId);

  return (
    <div>
      <h1>Início - Aluno {aluno.nome}</h1>
      <p>Turma: {turma.Nome}</p>
      <ul>
        {turma.disciplinas.map((disc) => (
          <li key={disc.Id}>
            {disc.Nome} - Nota: {disc.Nota} - Progresso: {disc.progresso}%
          </li>
        ))}
      </ul>
      <nav>
        {menu.map((item, idx) => (
          <button key={idx} onClick={() => router.push(item.path)}>
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
