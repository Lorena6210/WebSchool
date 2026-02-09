// App.tsx
"use client";
import LoginPage from "@/pages/login";
import { useEffect, useState } from "react";
import { data } from "@/mock/mockUsuarios";

// Transformar o JSON em Dados (usando nome diretamente dos usuários, e outros do perfil)
const mockUsuarios = {
  alunos: data.usuarios.students.map(aluno => {
    const perfil = data.perfis.find(p => p.id === aluno.perfilId);
    return {
      id: aluno.id,  // Corrigido: 'Id' → 'id' (padronizado lowercase), e variável 'aluno'
      nome: aluno.nome,  // Corrigido: variável 'aluno'
      ra: aluno.ra,  // Corrigido: variável 'aluno'
      email: perfil?.email,
      status: perfil?.status || 'ativo',
      role: perfil?.role || 'ALUNO',
      senha: perfil?.senha || 'senha123'
    };
  }),
  professores: data.usuarios.teachers.map(prof => {
    const perfil = data.perfis.find(p => p.id === prof.perfilId);
    return {
      id: prof.id,  // Corrigido: 'Id' → 'id'
      nome: prof.nome,
      email: perfil?.email || `prof${prof.id}@escola.com`,  // Fallback melhorado
      status: perfil?.status || 'ativo',
      role: perfil?.role || 'PROFESSOR',
      senha: perfil?.senha || 'senha123'
    };
  }),
  responsaveis: data.usuarios.responsible.map(resp => {
    const perfil = data.perfis.find(p => p.id === resp.perfilId);
    return {
      id: resp.id,  // Corrigido: 'Id' → 'id'
      nome: resp.nome,
      email: perfil?.email || `resp${resp.id}@escola.com`,  // Fallback melhorado
      status: perfil?.status || 'ativo',
      role: perfil?.role || 'RESPONSAVEL',
      senha: perfil?.senha || 'senha123'
    };
  }),
  gestores: data.usuarios.manager.map(gest => {
    const perfil = data.perfis.find(p => p.id === gest.perfilId);
    return {
      id: gest.id,  // Corrigido: 'Id' → 'id'
      nome: gest.nome,
      email: perfil?.email || `gest${gest.id}@escola.com`,  // Fallback melhorado
      status: perfil?.status || 'ativo',
      role: perfil?.role || 'GESTOR',
      senha: perfil?.senha || 'senha123'
    };
  })
};

export default function App() {
  const [usuarios, setUsuarios] = useState<typeof mockUsuarios | null>(null);
  const [loading, setLoading] = useState(true);

  // Removido usuariosFlat, pois era inconsistente e não usado; adicione se necessário

  useEffect(() => {
    setTimeout(() => {
      setUsuarios(mockUsuarios);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Carregando usuários...</div>;
  if (!usuarios) return <div>Nenhum usuário encontrado.</div>;

  return <LoginPage usuariosProp={usuarios} />;  
}