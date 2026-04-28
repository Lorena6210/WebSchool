"use client";

import React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { getInputSx, type LoginThemeMode } from "../../utils";

interface LoginFormProps {
  mode: LoginThemeMode;
  identifier: string;
  setIdentifier: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  mode,
  identifier,
  setIdentifier,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  error,
  onSubmit,
}: LoginFormProps) {
  const isDark = mode === "dark";
  const inputSx = getInputSx(mode);

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <TextField
        label="RA ou E-mail"
        placeholder="Ex: 2024001 ou email@escola.edu.br"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        fullWidth
        variant="outlined"
        autoComplete="username"
        sx={inputSx}
      />

      <TextField
        label="Senha"
        placeholder="Digite sua senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
        autoComplete="current-password"
        sx={{ ...inputSx, mt: 2.5 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((v) => !v)}
                edge="end"
                size="small"
                sx={{
                  color: isDark ? "rgba(216,230,250,0.58)" : "rgba(15,39,71,0.45)",
                  "&:hover": { color: isDark ? "#8ec2ff" : "#123d6b" },
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Mensagem de erro */}
      {error && (
        <Box
          sx={{
            mt: 2,
            px: 2.5,
            py: 1.5,
            bgcolor: isDark ? "rgba(245,92,116,0.12)" : "rgba(229,36,74,0.1)",
            border: isDark ? "1px solid rgba(245,92,116,0.28)" : "1px solid rgba(229,36,74,0.3)",
            borderLeft: isDark ? "3px solid #ff7f96" : "3px solid #e5244a",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ fontSize: 13.5, color: isDark ? "#ff9dad" : "#f87171", lineHeight: 1.5 }}>
            {error}
          </Typography>
        </Box>
      )}

      {/* Esqueceu a senha */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
        <Typography
          component="button"
          type="button"
          sx={{
            fontSize: 13,
            color: isDark ? "rgba(216,230,250,0.66)" : "rgba(15,39,71,0.62)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: 3,
            "&:hover": { color: isDark ? "#8ec2ff" : "#123d6b" },
            transition: "color 0.15s",
          }}
        >
          Esqueceu a senha?
        </Typography>
      </Box>

      {/* Botão de login */}
      <Box
        component="button"
        type="submit"
        disabled={isLoading}
        sx={{
          mt: 3.5,
          width: "100%",
          height: 52,
          background: isLoading
            ? (isDark ? "rgba(43,109,172,0.55)" : "rgba(28,79,130,0.5)")
            : (isDark
                ? "linear-gradient(135deg, #2b6dac 0%, #18436f 100%)"
                : "linear-gradient(135deg, #1c4f82 0%, #0f2747 100%)"),
          color: "#fff",
          border: "none",
          borderRadius: "14px",
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "'Poppins', system-ui, sans-serif",
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          transition: "all 0.2s ease",
          boxShadow: isDark ? "0 4px 20px rgba(24,67,111,0.42)" : "0 4px 20px rgba(15,39,71,0.3)",
          "&:hover:not(:disabled)": {
            background: isDark
              ? "linear-gradient(135deg, #3a82c7 0%, #225786 100%)"
              : "linear-gradient(135deg, #245f9a 0%, #12345a 100%)",
            transform: "translateY(-1px)",
            boxShadow: isDark ? "0 8px 28px rgba(24,67,111,0.55)" : "0 8px 28px rgba(15,39,71,0.45)",
          },
          "&:active:not(:disabled)": { transform: "translateY(0)" },
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={18} sx={{ color: "rgba(255,255,255,0.8)" }} />
            <span>Entrando...</span>
          </>
        ) : (
          <>
            <span>Entrar na Plataforma</span>
            <ArrowRight size={18} />
          </>
        )}
      </Box>
    </Box>
  );
}
