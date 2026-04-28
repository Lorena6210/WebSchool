"use client";

// ============================================================
// WebSchool — Layout Principal do Dashboard (Refatorado com MUI)
// Design: Material UI — Drawer + AppBar responsivos
// ============================================================

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme as useAppTheme } from "@/lib/context/ThemeContext";
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
  useTheme as useMuiTheme,
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
  Moon,
  Sun,
} from "lucide-react";
import { USER_ROLE_LABELS } from "@/types";
import type { UserRole } from "@/types";
import { ROLE_ACCENT_COLORS } from "@/lib/theme/roleAccent";

type MenuItem = { href: string; label: string; icon: React.ReactNode };

type DrawerContentProps = {
  items: { href: string; label: string; icon: React.ReactNode }[];
  accentColor: string;
  pathname: string;
  isDark: boolean;
  onToggleTheme: () => void;
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

const roleColors: Record<UserRole, string> = ROLE_ACCENT_COLORS;

const DRAWER_WIDTH = 280;

const DrawerContent = ({
  items,
  accentColor,
  pathname,
  isDark,
  onToggleTheme,
  user,
  onLogout,
  onNavClick,
}: DrawerContentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: isDark
          ? "linear-gradient(180deg, #0c0c14 0%, #10101c 100%)"
          : "linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%)",
        color: isDark ? "#f0f0f8" : "#0f2747",
        borderRight: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,39,71,0.1)",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,39,71,0.1)",
        }}
      >
        <Avatar sx={{
          background: isDark
            ? "linear-gradient(135deg, #e5244a 0%, #c01a3a 100%)"
            : "linear-gradient(135deg, #1c4f82 0%, #0f2747 100%)",
          width: 36, height: 36,
          boxShadow: isDark ? "0 0 16px rgba(229,36,74,0.4)" : "0 0 16px rgba(15,39,71,0.3)",
        }}>
          <GraduationCap size={20} />
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: isDark ? "#f0f0f8" : "#0f2747",
              fontFamily: "'Fraunces', serif",
              fontSize: 16,
            }}
          >
            WebSchool
          </Typography>
          <Typography variant="caption" sx={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.55)", fontSize: 10 }}>
            Plataforma Educacional
          </Typography>
        </Box>
        <IconButton
          onClick={onToggleTheme}
          size="small"
          sx={{
            ml: "auto",
            bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,39,71,0.08)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,39,71,0.18)",
            color: isDark ? "#f0f0f8" : "#0f2747",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,39,71,0.14)",
            },
          }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </IconButton>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,39,71,0.1)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
            width: 40, height: 40, fontSize: "0.875rem", fontWeight: 700,
            boxShadow: `0 0 12px ${accentColor}55`,
          }}>
            {user?.nome.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: isDark ? "#f0f0f8" : "#0f2747",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.nome}
            </Typography>
            <Chip
              label={user?.role ? USER_ROLE_LABELS[user.role] : ""}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                backgroundColor: `${accentColor}22`,
                color: accentColor,
                fontWeight: 600,
                border: `1px solid ${accentColor}44`,
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
              borderRadius: "8px",
              backgroundColor: pathname === item.href ? `${accentColor}22` : "transparent",
              color: pathname === item.href ? accentColor : (isDark ? "rgba(240,240,248,0.65)" : "rgba(15,39,71,0.72)"),
              borderLeft: pathname === item.href ? `3px solid ${accentColor}` : "3px solid transparent",
              "&:hover": {
                backgroundColor: pathname === item.href
                  ? `${accentColor}28`
                  : (isDark ? "rgba(255,255,255,0.05)" : "rgba(15,39,71,0.08)"),
                color: pathname === item.href ? accentColor : (isDark ? "#f0f0f8" : "#0f2747"),
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: pathname === item.href ? 600 : 400, fontSize: 14 }} />
          </ListItemButton>
        ))}
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 1, borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,39,71,0.1)" }}>
        <ListItemButton
          onClick={() => onNavClick("/perfil")}
          sx={{
            borderRadius: "8px",
            color: isDark ? "rgba(240,240,248,0.65)" : "rgba(15,39,71,0.72)",
            mb: 0.5,
            "&:hover": {
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,39,71,0.08)",
              color: isDark ? "#f0f0f8" : "#0f2747",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <UserRound size={18} />
          </ListItemIcon>
          <ListItemText primary="Perfil" primaryTypographyProps={{ fontSize: 14 }} />
        </ListItemButton>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: "8px",
            color: "#e5244a",
            "&:hover": {
              backgroundColor: "rgba(229,36,74,0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: 14 }} />
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
  const { theme, toggleTheme } = useAppTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: isDark ? "#0c0c14" : "#f2f7ff" }}>
      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1301,
          display: { xs: "inline-flex", md: "none" },
          backgroundColor: isDark ? "#12121e" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,39,71,0.16)",
          color: isDark ? "#f0f0f8" : "#0f2747",
          "&:hover": { backgroundColor: isDark ? "#1a1a2c" : "#eef5ff" },
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
          isDark={isDark}
          onToggleTheme={toggleTheme}
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
          isDark={isDark}
          onToggleTheme={toggleTheme}
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
          minHeight: "100vh",
          backgroundColor: isDark ? "#0c0c14" : "#f2f7ff",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}