// pages/aluno/[id]/disciplinas/[disciplinaId].tsx
import { useRouter } from "next/router";
import { mockData } from "@/mock/mockTurmas";

export default function DetalheDisciplinaAluno() {
  const router = useRouter();
  const { id, disciplinaId } = router.query;

  const disciplina = mockData.disciplinas.find((d) => d.id === Number(disciplinaId));
  if (!disciplina) return <div>Disciplina não encontrada</div>;

  return (
    <div>
      <h1>{disciplina.nome}</h1>
      {/* Mostre conteúdos, atividades, notas, etc */}
      <h2>Conteúdos</h2>
      <ul>
        {disciplina.conteudos.map((c, idx) => (
          <li key={idx}>
            {c.tipo === "VIDEO" ? (
              <a href={c.url} target="_blank">{c.titulo}</a>
            ) : (
              c.titulo
            )}
          </li>
        ))}
      </ul>
      {/* Atividades */}
      <h2>Atividades</h2>
      <ul>
        {disciplina.atividades.map((a) => (
          <li key={a.id}>{a.titulo} - Entrega: {a.dataEntrega}</li>
        ))}
      </ul>
    </div>
  );
}