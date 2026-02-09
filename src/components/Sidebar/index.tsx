// lib/menu.ts - Arquivo corrigido para o utilitário de menu
import { useRouter } from "next/navigation";  // Import correto para Next.js 13+
import { JSX } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaUserTie
} from "react-icons/fa";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export const getMenuByRole = (role: string | number, id?: number): Menu => {
  const router = useRouter();  // Corrigido: router é o hook do Next.js, não um parâmetro string[]

  const base = {
    ajuda: {
      icon: <FaUserShield />,
      label: "Ajuda",
      onClick: () => router.push(`/ajuda`)
    },
    configuracoes: {
      icon: <FaUserTie />,
      label: "Configurações",
      onClick: () => router.push(`/configuracoes`)
    },
    sair: {
      icon: <FaUserGraduate />,
      label: "Sair",
      onClick: () => (window.location.href = `/`)  // Ou router.push(``/``) para navegação SPA
    }
  };

  const menus = {
    ALUNO: [
      {
        icon: <FaUserGraduate />,
        label: "Início",
        onClick: () => router.push(`/aluno/${id}/inicio`)  // Corrigido: Usa userId passado como parâmetro
      },
      {
        icon: <FaUserGraduate />,
        label: "Disciplinas",
        onClick: () => router.push(`/aluno/${id}/disciplinas`)
      },
      {
        icon: <FaUserGraduate />,
        label: "Atividades",
        onClick: () => router.push(`/aluno/${id}/atividades`)
      },
      {
        icon: <FaUserGraduate />,
        label: "Boletim",
        onClick: () => router.push(`/aluno/${id}/boletim`)
      },
      {
        icon: <FaUserGraduate />,
        label: "Perfil",
        onClick: () => router.push(`/aluno/${id}/perfil`)
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    PROFESSOR: [
      {
        icon: <FaChalkboardTeacher />,
        label: "Dashboard",
        onClick: () => router.push(`/professor`)
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Turmas",
        onClick: () => router.push(`/professor/${id}/turmas`)
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Atividades",
        onClick: () => router.push(`/professor/${id}/atividades`)
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Perfil",
        onClick: () => router.push(`/professor/${id}/perfil`)
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    RESPONSAVEL: [
      {
        icon: <FaUserTie />,
        label: "Visão Geral",
        onClick: () => router.push(`/responsavel`)
      },
      {
        icon: <FaUserTie />,
        label: "Aluno",
        onClick: () => router.push(`/responsavel/${id}/aluno`)
      },
      {
        icon: <FaUserTie />,
        label: "Atividades",
        onClick: () => router.push(`/responsavel/${id}/atividades`)
      },
      {
        icon: <FaUserTie />,
        label: "Calendário",
        onClick: () => router.push(`/responsavel/${id}/calendario`)
      },
      {
        icon: <FaUserTie />,
        label: "Perfil",
        onClick: () => router.push(`/responsavel/${id}/perfil`)
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    GESTOR: [
      {
        icon: <FaUserShield />,
        label: "Dashboard",
        onClick: () => router.push(`/gestor`)
      },
      {
        icon: <FaUserShield />,
        label: "Usuários",
        onClick: () => router.push(`/gestor/${id}/usuarios`)
      },
      {
        icon: <FaUserShield />,
        label: "Turmas",
        onClick: () => router.push(`/gestor/${id}/turmas`)
      },
      {
        icon: <FaUserShield />,
        label: "Relatórios",
        onClick: () => router.push(`/gestor/${id}/relatorios`)
      },
      {
        icon: <FaUserShield />,
        label: "Configurações",
        onClick: () => router.push(`/gestor/${id}/configuracoes`)
      },
      base.sair
    ]
  };

  return menus[role] || [];
};
