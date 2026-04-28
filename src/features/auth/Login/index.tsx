"use client";

import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { GraduationCap, Moon, Sun } from "lucide-react";
import { DemoCards } from "./components/DemoCards";
import { LeftPanel } from "./components/LeftPanel";
import { LoginForm } from "./components/LoginForm";
import { useLoginForm, type LoginThemeMode } from "./utils";

const LOGIN_THEME_KEY = "webschool-login-theme";

export default function Login() {
  const [mode, setMode] = React.useState<LoginThemeMode>("dark");

  React.useEffect(() => {
    const storedMode = window.localStorage.getItem(LOGIN_THEME_KEY) as LoginThemeMode | null;

    if (storedMode === "dark" || storedMode === "light") {
      setMode(storedMode);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setMode(prefersDark ? "dark" : "light");
  }, []);

  const {
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
  } = useLoginForm();

  const isDark = mode === "dark";

  function toggleThemeMode() {
    setMode((prev) => {
      const nextMode: LoginThemeMode = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(LOGIN_THEME_KEY, nextMode);
      return nextMode;
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: isDark ? "#060d18" : "#f3f7ff",
        fontFamily: "'Poppins', system-ui, sans-serif",
      }}
    >
      <LeftPanel mode={mode} />

      {/* ── Painel Direito (formulário) ─────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
          overflowY: "auto",
          bgcolor: isDark ? "#091427" : "#ffffff",
          position: "relative",
        }}
      >
        <Tooltip title={isDark ? "Ativar modo dia" : "Ativar modo noite"}>
          <IconButton
            onClick={toggleThemeMode}
            sx={{
              position: "absolute",
              top: { xs: 18, sm: 24 },
              right: { xs: 18, sm: 24 },
              width: 40,
              height: 40,
              bgcolor: isDark ? "rgba(142,194,255,0.16)" : "rgba(15,39,71,0.08)",
              color: isDark ? "#8ec2ff" : "#0f2747",
              border: "1px solid",
              borderColor: isDark ? "rgba(142,194,255,0.35)" : "rgba(15,39,71,0.2)",
              "&:hover": {
                bgcolor: isDark ? "rgba(142,194,255,0.24)" : "rgba(15,39,71,0.13)",
              },
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>

        <Box sx={{ width: "100%", maxWidth: 460 }}>
          {/* Logo mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.5, mb: 5 }}>
            <Box
              sx={{
                width: 36, height: 36,
                background: isDark
                  ? "linear-gradient(135deg, #2b6dac 0%, #18436f 100%)"
                  : "linear-gradient(135deg, #1c4f82 0%, #0f2747 100%)",
                borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isDark ? "0 0 16px rgba(43,109,172,0.35)" : "0 0 16px rgba(15,39,71,0.3)",
              }}
            >
              <GraduationCap size={18} color="#fff" />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 700,
                fontSize: 17,
                color: isDark ? "#eaf2ff" : "#0f2747",
              }}
            >
              WebSchool
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: { xs: 30, sm: 38 },
              color: isDark ? "#f2f7ff" : "#0f2747",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Bem-vindo de volta
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              color: isDark ? "rgba(216,230,250,0.72)" : "rgba(15,39,71,0.7)",
              mb: 5,
              lineHeight: 1.5,
            }}
          >
            Entre com seu RA (alunos) ou e-mail institucional.
          </Typography>

          <LoginForm
            mode={mode}
            identifier={identifier}
            setIdentifier={setIdentifier}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            error={error}
            onSubmit={handleSubmit}
          />

          <DemoCards mode={mode} activeIdentifier={identifier} onSelect={handleDemoSelect} />
        </Box>
      </Box>
    </Box>
  );
}
