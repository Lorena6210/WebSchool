import { useRouter } from "next/router";
import { mockTurmas } from "@/mock/mockTurmas";
import { getMenuByRole } from "@/components/Sidebar/index";

export default function GestorUsuarios() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Carregando...</div>;

  const userId = parseInt(id as string);

  const gestor = mockTurmas.usuarios.manager.find((m) => m.id === userId);

  if (!gestor) return <div>Gestor não encontrado.</div>;

  const menu = getMenuByRole("GESTOR", userId);

  return (
    <div>
      <h1>Usuários - Gestor {gestor.nome}</h1>
      <ul>
        {data.perfis.map((perfil) => (
          <li key={perfil.id}>{perfil.nome} - {perfil.role}</li>
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