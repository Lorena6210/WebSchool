// Importações necessárias
import React from 'react';
import { useRouter } from 'next/navigation'; // Para o router
import Navbar from '../views/index'; // Caminho para o componente Navbar
import { getMenuByRole } from '../index'; // Caminho para a função getMenuByRole

// Interface para o usuário (ajuste conforme necessário)
interface Usuario {
  Nome: string;
  Id: number;
  Role: string; // Adicione o role ao usuário (ex.: "ALUNO", "PROFESSOR", etc.)
}

// Componente pai que usa a Navbar
interface LayoutProps {
  usuario: Usuario;
  children: React.ReactNode;
}

export default function Layout({ usuario, children }: LayoutProps) {
  const router = useRouter();
  
  // Gera os menuItems baseados no role do usuário
  const menuItems = getMenuByRole(usuario.Role, router);
  
  return (
    <div style={{ display: 'flex' }}>
      {/* Navbar lateral */}
      <Navbar usuario={usuario} menuItems={menuItems} />
      
      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}