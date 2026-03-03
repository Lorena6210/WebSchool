"use client";

// ============================================================
// WebSchool — Layout Principal do Dashboard (Refatorado com MUI)
// Design: Material UI — Drawer + AppBar responsivos
// ============================================================

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  Users,
  ClipboardList,
  BarChart3,
  Clock,
  GraduationCap,
  LogOut,
  Menu,
} from "lucide-react";
import type { UserRole } from "@/types";

// ---- Definição dos itens de menu por perfil ----
const menuItems: Record<UserRole, { href: string; label: string; icon: React.ReactNode }[]> = {
  aluno: [
    { href: "/mural/aluno", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/atividades", label: "Atividades", icon: <BookOpen size={18} /> },
    { href: "/calendario", label: "Calendário", icon: <Calendar size={18} /> },
    { href: "/historico-medico", label: "Histórico Médico", icon: <Heart size={18} /> },
  ],
  responsavel: [
    { href: "/mural/responsavel", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/boletim", label: "Boletim", icon: <FileText size={18} /> },
    { href: "/avisos", label: "Avisos", icon: <Bell size={18} /> },
    { href: "/calendario", label: "Calendário", icon: <Calendar size={18} /> },
  ],
  professor: [
    { href: "/mural/professor", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/atividades", label: "Atividades", icon: <BookOpen size={18} /> },
    { href: "/calendario", label: "Calendário", icon: <Calendar size={18} /> },
  ],
  gestor: [
    { href: "/mural/gestor", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/gerenciar-usuarios", label: "Usuários", icon: <Users size={18} /> },
    { href: "/gerenciar-atividades", label: "Atividades", icon: <ClipboardList size={18} /> },
    { href: "/relatorios", label: "Relatórios", icon: <BarChart3 size={18} /> },
    { href: "/criar-calendario", label: "Calendário", icon: <Calendar size={18} /> },
    { href: "/criar-horarios", label: "Horários", icon: <Clock size={18} /> },
  ],
};

const roleColors: Record<UserRole, string> = {
  aluno: "#6B21A8",
  responsavel: "#B45309",
  professor: "#166534",
  gestor: "#3B4FD8",
};

const roleLabels: Record<UserRole, string> = {
  aluno: "Aluno",
  responsavel: "Responsável",
  professor: "Professor",
  gestor: "Gestor",
};

const DRAWER_WIDTH = 280;

// ---- Drawer Content ----
function DrawerContent({
  items,
  accentColor,
  pathname,
  user,
  onLogout,
  onNavClick,
}: {
  items: { href: string; label: string; icon: React.ReactNode }[];
  accentColor: string;
  pathname: string;
  user: any;
  onLogout: () => void;
  onNavClick: (href: string) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 2, borderBottom: "2px solid #1C1917", display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ backgroundColor: accentColor, width: 36, height: 36 }}>
          <GraduationCap size={20} />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1C1917", fontFamily: "'Fraunces', serif" }}>
            WebSchool
          </Typography>
          <Typography variant="caption" sx={{ color: "#1C1917", opacity: 0.4 }}>
            Plataforma Educacional
          </Typography>
        </Box>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, borderBottom: "1px solid #1C1917", opacity: 0.1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ backgroundColor: accentColor, width: 40, height: 40, fontSize: "0.875rem", fontWeight: 700 }}>
            {user?.avatarInitials}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#1C1917", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.nome}
            </Typography>
            <Chip
              label={roleLabels[user?.role] || ""}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.7rem",
                backgroundColor: accentColor + "20",
                color: accentColor,
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, p: 1, overflowY: "auto" }}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItemButton
              key={item.href}
              onClick={() => onNavClick(item.href)}
              sx={{
                mb: 0.5,
                borderRadius: 1.5,
                backgroundColor: isActive ? accentColor : "transparent",
                color: isActive ? "#FFFFFF" : "#1C1917",
                opacity: isActive ? 1 : 0.7,
                "&:hover": {
                  backgroundColor: isActive ? accentColor : "#1C1917",
                  opacity: 1,
                  color: "#FFFFFF",
                },
                transition: "all 0.3s ease",
                border: isActive ? `2px solid #1C1917` : "2px solid transparent",
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 1, borderTop: "1px solid #1C1917", opacity: 0.1 }}>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 1.5,
            color: "#DC2626",
            "&:hover": {
              backgroundColor: "#FEE2E2",
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
}

// ---- Layout Principal ----
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const items = menuItems[user.role] ?? [];
  const accentColor = roleColors[user.role];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleNav = (href: string) => {
    router.push(href);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#FDFAF5" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#FDFAF5",
          color: "#1C1917",
          borderBottom: "2px solid #1C1917",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { xs: "block", lg: "none" } }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <Avatar sx={{ backgroundColor: accentColor, width: 32, height: 32 }}>
              <GraduationCap size={16} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "'Fraunces', serif" }}>
              WebSchool
            </Typography>
          </Box>
          <Avatar sx={{ backgroundColor: accentColor, width: 36, height: 36, fontSize: "0.875rem", fontWeight: 700 }}>
            {user.avatarInitials}
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "#FDFAF5",
            borderRight: "2px solid #1C1917",
            marginTop: isMobile ? "64px" : 0,
            height: isMobile ? `calc(100vh - 64px)` : "100vh",
          },
        }}
      >
        <DrawerContent
          items={items}
          accentColor={accentColor}
          pathname={pathname}
          user={user}
          onLogout={handleLogout}
          onNavClick={handleNav}
        />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: isMobile ? "64px" : 0,
          marginLeft: { xs: 0, lg: `${DRAWER_WIDTH}px` },
        }}
      >
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, overflowAuto: true }}>
          <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
