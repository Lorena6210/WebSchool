"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { BookOpen, BarChart3, Users, Shield, GraduationCap } from "lucide-react";

export type LoginThemeMode = "dark" | "light";

// ─── Contas de demonstração ───────────────────────────────────────────────────

export function getDemoAccounts(mode: LoginThemeMode) {
  const textColor = mode === "dark" ? "#d9ecff" : "#0f365f";
  const blueShades = mode === "dark"
    ? {
        first: "#7cc0ff",
        second: "#5da8f0",
        third: "#96d1ff",
        fourth: "#4e9de8",
      }
    : {
        first: "#1d5fa0",
        second: "#2e73b8",
        third: "#2269ab",
        fourth: "#0f4f8a",
      };
  const activeBg = mode === "dark" ? "0.2" : "0.14";

  return [
    {
      role: "Aluno",
      identifier: "2024001",
      password: "aluno123",
      color: blueShades.first,
      bg: `rgba(${mode === "dark" ? "124,192,255" : "29,95,160"},${activeBg})`,
      textColor,
      icon: BookOpen,
      desc: "Lucas · 9º Ano A",
    },
    {
      role: "Responsável",
      identifier: "maria.ferreira@email.com",
      password: "resp123",
      color: blueShades.second,
      bg: `rgba(${mode === "dark" ? "93,168,240" : "46,115,184"},${activeBg})`,
      textColor,
      icon: Users,
      desc: "Maria · Mãe do aluno",
    },
    {
      role: "Professor",
      identifier: "carlos.mendes@escola.edu.br",
      password: "prof123",
      color: blueShades.third,
      bg: `rgba(${mode === "dark" ? "150,209,255" : "34,105,171"},${activeBg})`,
      textColor,
      icon: GraduationCap,
      desc: "Carlos · Matemática",
    },
    {
      role: "Gestor",
      identifier: "ana.paula@escola.edu.br",
      password: "gestor123",
      color: blueShades.fourth,
      bg: `rgba(${mode === "dark" ? "78,157,232" : "15,79,138"},${activeBg})`,
      textColor,
      icon: BarChart3,
      desc: "Ana Paula · Diretora",
    },
  ] as const;
}

// ─── Funcionalidades exibidas no painel esquerdo ──────────────────────────────

export const features = [
  { icon: BookOpen, text: "Acompanhe atividades, provas e calendário escolar" },
  { icon: BarChart3, text: "Boletins e relatórios em tempo real" },
  { icon: Users, text: "Comunicação integrada entre escola e família" },
  { icon: Shield, text: "Acesso seguro e personalizado por perfil" },
] as const;

// ─── Estilos dos inputs ───────────────────────────────────────────────────────

export function getInputSx(mode: LoginThemeMode) {
  const isDark = mode === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      bgcolor: isDark ? "#0d1e37" : "#f7faff",
      borderRadius: "12px",
      fontSize: 15,
      color: isDark ? "#eaf3ff" : "#0f2747",
      "& fieldset": {
        borderColor: isDark ? "rgba(142,194,255,0.24)" : "rgba(15,39,71,0.18)",
        borderWidth: "1.5px",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "rgba(142,194,255,0.45)" : "rgba(15,39,71,0.36)",
      },
      "&.Mui-focused fieldset": {
        borderColor: isDark ? "#7abfff" : "#1c4f82",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "rgba(216,230,250,0.76)" : "rgba(15,39,71,0.62)",
      fontSize: 14,
      "&.Mui-focused": { color: isDark ? "#9bccff" : "#1c4f82" },
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 16px",
      "&::placeholder": { color: isDark ? "rgba(216,230,250,0.5)" : "rgba(15,39,71,0.38)" },
    },
  } as const;
}

// ─── Tipo derivado das contas demo ────────────────────────────────────────────

export type DemoAccount = ReturnType<typeof getDemoAccounts>[number];

// ─── Hook de lógica do login ──────────────────────────────────────────────────

export function useLoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifierRaw] = useState("");
  const [password, setPasswordRaw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function setIdentifier(v: string) {
    setIdentifierRaw(v);
    setError("");
  }

  function setPassword(v: string) {
    setPasswordRaw(v);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Preencha o identificador e a senha.");
      return;
    }

    setIsLoading(true);
    const result = await login(identifier.trim(), password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error ?? "Credenciais inválidas.");
      return;
    }

    router.push("/mural");
  }

  function handleDemoSelect(acc: DemoAccount) {
    setIdentifierRaw(acc.identifier);
    setPasswordRaw(acc.password);
    setError("");
  }

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleSubmit,
    handleDemoSelect,
  };
}
