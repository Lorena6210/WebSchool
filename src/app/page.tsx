// App.tsx
"use client";
import LoginPage from "@/pages/login";
import { useEffect, useState } from "react";
import { data } from "@/mock/mockUsuarios"; // Ajuste o caminho para o data.ts

// Transformar o JSON em Dados (usando nome diretamente dos usuários, e outros do perfil)
const mockUsuarios = {
  alunos: data.usuarios.alunos.map(aluno => {
    const perfil = data.perfis.find(p => p.id === aluno.perfilId);
    return {
      Id: aluno.id,
      Nome: aluno.nome, // Agora usa diretamente do usuário
      RA: aluno.ra,
      Email: perfil?.email,
      Status: perfil?.status || 'ativo',
      Role: perfil?.role || 'ALUNO',
      Senha: perfil?.senha || 'senha123'
    };
  }),
  professores: data.usuarios.professores.map(prof => {
    const perfil = data.perfis.find(p => p.id === prof.perfilId);
    return {
      Id: prof.id,
      Nome: prof.nome, // Agora usa diretamente do usuário
      Email: perfil?.email || prof.perfilId, // Fallback
      Status: perfil?.status || 'ativo',
      Role: perfil?.role || 'PROFESSOR',
      Senha: perfil?.senha || 'senha123'
    };
  }),
  responsaveis: data.usuarios.responsaveis.map(resp => {
    const perfil = data.perfis.find(p => p.id === resp.perfilId);
    return {
      Id: resp.id,
      Nome: resp.nome, // Agora usa diretamente do usuário
      Email: perfil?.email || resp.perfilId,
      Status: perfil?.status || 'ativo',
      Role: perfil?.role || 'RESPONSAVEL',
      Senha: perfil?.senha || 'senha123'
    };
  }),
  gestores: data.usuarios.gestores.map(gest => {
    const perfil = data.perfis.find(p => p.id === gest.perfilId);
    return {
      Id: gest.id,
      Nome: gest.nome, // Agora usa diretamente do usuário
      Email: perfil?.email || gest.perfilId,
      Status: perfil?.status || 'ativo',
      Role: perfil?.role || 'GESTOR',
      Senha: perfil?.senha || 'senha123'
    };
  })
};

export default function App() {
  const [usuarios, setUsuarios] = useState<typeof mockUsuarios | null>(null);
  const [loading, setLoading] = useState(true);
  const usuariosFlat = [
  ...mockUsuarios.alunos,
  ...mockUsuarios.professores,
  ...mockUsuarios.responsaveis,
  ...mockUsuarios.gestores
];


  useEffect(() => {
    setTimeout(() => {
      setUsuarios(mockUsuarios);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Carregando usuários...</div>;
  if (!usuarios) return <div>Nenhum usuário encontrado.</div>;

  return <LoginPage usuarios={usuarios} />;
}