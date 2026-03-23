"use client";

// ============================================================
// WebSchool — Layout Principal do Dashboard (Refatorado com MUI)
// Design: Material UI — Drawer + AppBar responsivos
// ============================================================

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Heart,
  Bell,
  FileText,
  UserRound,
  Users,
  ClipboardList,
  BarChart3,
  Clock,
  GraduationCap,
  LogOut,
  Menu,
} from "lucide-react";
import { USER_ROLE_LABELS } from "@/types";
import type { UserRole } from "@/types";

type MenuItem = { href: string; label: string; icon: React.ReactNode };

type DrawerContentProps = {
  items: { href: string; label: string; icon: React.ReactNode }[];
  accentColor: string;
  pathname: string;
  user: {
    nome: string;
    role: UserRole;
  };
  onLogout: () => void;
  onNavClick: (href: string) => void;
};

// ---- Definição dos itens de menu por perfil ----
const menuItems: Record<UserRole, MenuItem[]> = {
  aluno: [
    { href: "/mural", label: "Mural", icon: <LayoutDashboard size={18} /> },
    { href: "/atividades", label: "Atividades", icon: <BookOpen size={18} /> },
    { href: "/provas", label: "Provas", icon: <FileText size={18} /> },
    { href: "/boletim", label: "Boletim", icon: <ClipboardList size={18} /> },
    { href: "/historico-medico", label: "Histórico Médico", icon: <Heart size={18} /> },
    { href: "/historico-escola", label: "Histórico Escolar", icon: <FileText size={18} /> },
    { href: "/calendario", label: "Calendário", icon: <Calendar size={18} /> },
  ],
  responsavel: [
    { href: "/mural", label: "Mural", icon: <LayoutDashboard size={18} /> },
    { href: "/boletim", label: "Boletim", icon: <FileText size={18} /> },
    { href: "/provas", label: "Provas", icon: <ClipboardList size={18} /> },
    { href: "/calendario", label: "Calendário", icon: <Calendar size={18} /> },
    { href: "/avisos", label: "Avisos e Reunião", icon: <Bell size={18} /> },
    { href: "/historico-medico", label: "Histórico Médico", icon: <Heart size={18} /> },
    { href: "/historico-escola", label: "Histórico Escolar", icon: <FileText size={18} /> },
  ],
  professor: [
    { href: "/mural", label: "Mural", icon: <LayoutDashboard size={18} /> },
    { href: "/atividades", label: "Criar Atividades", icon: <BookOpen size={18} /> },
    { href: "/provas", label: "Criar Provas", icon: <FileText size={18} /> },
    { href: "/boletim", label: "Lançar Notas", icon: <ClipboardList size={18} /> },
    { href: "/criar-calendario", label: "Calendário / Presença", icon: <Calendar size={18} /> },
    { href: "/avisos", label: "Enviar Avisos", icon: <Bell size={18} /> },
  ],
  gestor: [
    { href: "/mural", label: "Mural", icon: <LayoutDashboard size={18} /> },
    { href: "/gerenciar-usuarios", label: "Usuários", icon: <Users size={18} /> },
    { href: "/gerenciar-atividades", label: "Atividades", icon: <ClipboardList size={18} /> },
    { href: "/provas", label: "Provas", icon: <FileText size={18} /> },
    { href: "/relatorios", label: "Relatórios", icon: <BarChart3 size={18} /> },
    { href: "/criar-calendario", label: "Calendário", icon: <Calendar size={18} /> },
    { href: "/criar-horarios", label: "Grade de Horários", icon: <Clock size={18} /> },
    { href: "/avisos", label: "Envio de Avisos", icon: <Bell size={18} /> },
  ],
};

const roleColors: Record<UserRole, string> = {
  aluno: "#6B21A8",
  responsavel: "#B45309",
  professor: "#166534",
  gestor: "#3B4FD8",
};

const DRAWER_WIDTH = 280;

const DrawerContent = ({ items, accentColor, pathname, user, onLogout, onNavClick }: DrawerContentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "linear-gradient(180deg, #1C1917 0%, #141210 100%)",
        color: "#f3efea",
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ backgroundColor: "#0a37cadc", width: 36, height: 36 }}>
          <GraduationCap size={20} />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#F3EFEA", fontFamily: "'Fraunces', serif" }}>
            WebSchool
          </Typography>
          <Typography variant="caption" sx={{ color: "#F3EFEA", opacity: 0.6 }}>
            Plataforma Educacional
          </Typography>
        </Box>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ backgroundColor: roleColors[user.role], width: 40, height: 40, fontSize: "0.875rem", fontWeight: 700 }}>
            {user?.nome.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#F3EFEA", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.nome}
            </Typography>
            <Chip
              label={user?.role ? USER_ROLE_LABELS[user.role] : ""}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.7rem",
                backgroundColor: "#E9D5FF",
                color: "#4C1D95",
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Menus */}
      <List sx={{ flex: 1, p: 1, overflow: "auto" }}>
        {items.map((item) => (
          <ListItemButton
            key={item.href}
            onClick={() => onNavClick(item.href)}
            sx={{
              mb: 0.5,
              borderRadius: 0,
              backgroundColor: pathname === item.href ? accentColor : "transparent",
              color: pathname === item.href ? "#fff" : "#f3efea",
              "&:hover": {
                backgroundColor: pathname === item.href ? accentColor : "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={() => onNavClick("/perfil")}
          sx={{
            borderRadius: 0,
            color: "#F3EFEA",
            mb: 0.5,
            "&:hover": {
              backgroundColor: "#ffffff12",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <UserRound size={18} />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 0,
            color: "#DC2626",
            "&:hover": {
              backgroundColor: "#ffffff12",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <>{children}</>;

  const items = menuItems[user.role] ?? menuItems.aluno;
  const accentColor = roleColors[user.role] ?? roleColors.aluno;

  const handleNavClick = (href: string) => {
    router.push(href);
    if (isMobile) setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F6F3EF" }}>
      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1301,
          display: { xs: "inline-flex", md: "none" },
          backgroundColor: "#ffffffd9",
          border: "1px solid #E7E2DC",
        }}
      >
        <Menu size={20} />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: 0, borderRadius: 0 },
        }}
      >
        <DrawerContent
          items={items}
          accentColor={accentColor}
          pathname={pathname}
          user={user}
          onLogout={handleLogout}
          onNavClick={handleNavClick}
        />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: 0, borderRadius: 0 },
        }}
      >
        <DrawerContent
          items={items}
          accentColor={accentColor}
          pathname={pathname}
          user={user}
          onLogout={handleLogout}
          onNavClick={handleNavClick}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          px: { xs: 2, sm: 3 },
          pt: { xs: 8, md: 3 },
          pb: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}