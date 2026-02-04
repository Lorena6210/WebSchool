import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaUserTie
} from "react-icons/fa";

export const getMenuByRole = (role: string | number, router: string[]) => {
  const base = {
    ajuda: {
      icon: <FaUserShield />,
      label: "Ajuda",
      onClick: () => router.push("/ajuda")
    },
    configuracoes: {
      icon: <FaUserTie />,
      label: "Configurações",
      onClick: () => router.push("/configuracoes")
    },
    sair: {
      icon: <FaUserGraduate />,
      label: "Sair",
      onClick: () => (window.location.href = "/")
    }
  };

  const menus = {
    ALUNO: [
      {
        icon: <FaUserGraduate />,
        label: "Início",
        onClick: () => router.push("/aluno/inicio")
      },
      {
        icon: <FaUserGraduate />,
        label: "Disciplinas",
        onClick: () => router.push("/aluno/disciplinas")
      },
      {
        icon: <FaUserGraduate />,
        label: "Atividades",
        onClick: () => router.push("/aluno/atividades")
      },
      {
        icon: <FaUserGraduate />,
        label: "Boletim",
        onClick: () => router.push("/aluno/boletim")
      },
      {
        icon: <FaUserGraduate />,
        label: "Perfil",
        onClick: () => router.push("/aluno/perfil")
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    PROFESSOR: [
      {
        icon: <FaChalkboardTeacher />,
        label: "Dashboard",
        onClick: () => router.push("/professor")
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Turmas",
        onClick: () => router.push("/professor/turmas")
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Atividades",
        onClick: () => router.push("/professor/atividades")
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Perfil",
        onClick: () => router.push("/professor/perfil")
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    RESPONSAVEL: [
      {
        icon: <FaUserTie />,
        label: "Visão Geral",
        onClick: () => router.push("/responsavel")
      },
      {
        icon: <FaUserTie />,
        label: "Aluno",
        onClick: () => router.push("/responsavel/aluno")
      },
      {
        icon: <FaUserTie />,
        label: "Atividades",
        onClick: () => router.push("/responsavel/atividades")
      },
      {
        icon: <FaUserTie />,
        label: "Calendário",
        onClick: () => router.push("/responsavel/calendario")
      },
      {
        icon: <FaUserTie />,
        label: "Perfil",
        onClick: () => router.push("/responsavel/perfil")
      },
      base.ajuda,
      base.configuracoes,
      base.sair
    ],

    GESTOR: [
      {
        icon: <FaUserShield />,
        label: "Dashboard",
        onClick: () => router.push("/gestor")
      },
      {
        icon: <FaUserShield />,
        label: "Usuários",
        onClick: () => router.push("/gestor/usuarios")
      },
      {
        icon: <FaUserShield />,
        label: "Turmas",
        onClick: () => router.push("/gestor/turmas")
      },
      {
        icon: <FaUserShield />,
        label: "Relatórios",
        onClick: () => router.push("/gestor/relatorios")
      },
      {
        icon: <FaUserShield />,
        label: "Configurações",
        onClick: () => router.push("/gestor/configuracoes")
      },
      base.sair
    ]
  };

  return menus[role] || [];
};
