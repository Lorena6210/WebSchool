// lib/menu.ts
import { JSX } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaUserTie,
  FaQuestion,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBook,
  FaClipboardList,
  FaChartBar,
  FaCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export interface MenuItem {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export type Role = "ALUNO" | "PROFESSOR" | "RESPONSAVEL" | "GESTOR";

export const getMenuByRole = (
  role: Role,
  userId: number,
  router: ReturnType<typeof useRouter>,
): MenuItem[] => {
  const base: MenuItem[] = [
    {
      icon: <FaQuestion />,
      label: "Ajuda",
      onClick: () => router.push("/ajuda"),
    },
    {
      icon: <FaCog />,
      label: "Configurações",
      onClick: () => router.push("/configuracoes"),
    },
    {
      icon: <FaSignOutAlt />,
      label: "Sair",
      onClick: () => router.push("/"),
    },
  ];

  const menus: Record<Role, MenuItem[]> = {
    ALUNO: [
      {
        icon: <FaHome />,
        label: "Início",
        onClick: () => router.push(`/aluno/${userId}/inicio`),
      },
      {
        icon: <FaBook />,
        label: "Disciplinas",
        onClick: () => router.push(`/aluno/${userId}/disciplinas`),
      },
      {
        icon: <FaClipboardList />,
        label: "Atividades",
        onClick: () => router.push(`/aluno/${userId}/atividades`),
      },
      {
        icon: <FaChartBar />,
        label: "Boletim",
        onClick: () => router.push(`/aluno/${userId}/boletim`),
      },
      {
        icon: <FaUser />,
        label: "Perfil",
        onClick: () => router.push(`/aluno/${userId}/perfil`),
      },
      ...base,
    ],

    PROFESSOR: [
      {
        icon: <FaHome />,
        label: "Dashboard",
        onClick: () => router.push(`/professor/${userId}`),
      },
      {
        icon: <FaUsers />,
        label: "Turmas",
        onClick: () => router.push(`/professor/${userId}/turmas`),
      },
      {
        icon: <FaClipboardList />,
        label: "Atividades",
        onClick: () => router.push(`/professor/${userId}/atividades`),
      },
      {
        icon: <FaUser />,
        label: "Perfil",
        onClick: () => router.push(`/professor/${userId}/perfil`),
      },
      ...base,
    ],

    RESPONSAVEL: [
      {
        icon: <FaHome />,
        label: "Visão Geral",
        onClick: () => router.push(`/responsavel/${userId}`),
      },
      {
        icon: <FaUserGraduate />,
        label: "Aluno",
        onClick: () => router.push(`/responsavel/${userId}/aluno`),
      },
      {
        icon: <FaClipboardList />,
        label: "Atividades",
        onClick: () => router.push(`/responsavel/${userId}/atividades`),
      },
      {
        icon: <FaCalendarAlt />,
        label: "Calendário",
        onClick: () => router.push(`/responsavel/${userId}/calendario`),
      },
      {
        icon: <FaUser />,
        label: "Perfil",
        onClick: () => router.push(`/responsavel/${userId}/perfil`),
      },
      ...base,
    ],

    GESTOR: [
      {
        icon: <FaHome />,
        label: "Dashboard",
        onClick: () => router.push(`/gestor/${userId}`),
      },
      {
        icon: <FaUsers />,
        label: "Usuários",
        onClick: () => router.push(`/gestor/${userId}/usuarios`),
      },
      {
        icon: <FaUsers />,
        label: "Turmas",
        onClick: () => router.push(`/gestor/${userId}/turmas`),
      },
      {
        icon: <FaChartBar />,
        label: "Relatórios",
        onClick: () => router.push(`/gestor/${userId}/relatorios`),
      },
      {
        icon: <FaCog />,
        label: "Configurações",
        onClick: () => router.push(`/gestor/${userId}/configuracoes`),
      },
      {
        icon: <FaQuestion />,
        label: "Ajuda",
        onClick: () => router.push("/ajuda"),
      },
      {
        icon: <FaSignOutAlt />,
        label: "Sair",
        onClick: () => router.push("/"),
      },
    ],
  };

  return menus[role];
};
