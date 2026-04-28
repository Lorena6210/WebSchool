"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { GraduationCap } from "lucide-react";
import { features, type LoginThemeMode } from "../../utils";

interface LeftPanelProps {
  mode: LoginThemeMode;
}

export function LeftPanel({ mode }: LeftPanelProps) {
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        width: "42%",
        minHeight: "100vh",
        bgcolor: isDark ? "#071226" : "#0f2747",
        color: "#ffffff",
        p: 6,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        borderRight: isDark ? "1px solid rgba(151,186,230,0.16)" : "1px solid rgba(15,39,71,0.12)",
      }}
    >
      {/* Decorações de fundo */}
      <Box sx={{
        position: "absolute", top: -140, right: -100,
        width: 380, height: 380, borderRadius: "50%",
        background: isDark
          ? "radial-gradient(circle, rgba(70,140,215,0.32) 0%, transparent 72%)"
          : "radial-gradient(circle, rgba(143,192,255,0.26) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", bottom: -80, left: -60,
        width: 280, height: 280, borderRadius: "50%",
        background: isDark
          ? "radial-gradient(circle, rgba(140,188,244,0.22) 0%, transparent 74%)"
          : "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 8 }}>
          <Box
            sx={{
              width: 40, height: 40,
              background: isDark
                ? "linear-gradient(135deg, #2b6dac 0%, #18436f 100%)"
                : "linear-gradient(135deg, #2a67a3 0%, #16406d 100%)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: isDark ? "0 0 20px rgba(43,109,172,0.35)" : "0 0 20px rgba(9,23,40,0.35)",
            }}
          >
            <GraduationCap size={20} color="#fff" />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 18, lineHeight: 1, color: "#ffffff" }}>
              WebSchool
            </Typography>
            <Typography sx={{ fontSize: 11, color: isDark ? "rgba(225,236,252,0.8)" : "rgba(255,255,255,0.72)", lineHeight: 1.4 }}>
              Plataforma Educacional
            </Typography>
          </Box>
        </Box>

        {/* Headline */}
        <Typography sx={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 34, lineHeight: 1.2, mb: 2.5, color: "#ffffff" }}>
          Aprendizado que{" "}
          <Box
            component="span"
            sx={{
              color: isDark ? "#8ec2ff" : "#b8daff",
              textShadow: isDark ? "0 0 20px rgba(142,194,255,0.4)" : "0 0 20px rgba(184,218,255,0.35)",
            }}
          >
            transforma
          </Box>{" "}
          vidas.
        </Typography>

        <Typography sx={{ fontSize: 14, color: isDark ? "rgba(225,236,252,0.82)" : "rgba(255,255,255,0.8)", mb: 5, maxWidth: 300, lineHeight: 1.7 }}>
          Conectamos alunos, professores, responsáveis e gestores em uma plataforma completa e intuitiva.
        </Typography>

        {/* Lista de funcionalidades */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {features.map(({ icon: Icon, text }) => (
            <Box key={text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <Box sx={{
                width: 32, height: 32,
                borderRadius: "8px",
                bgcolor: isDark ? "rgba(142,194,255,0.14)" : "rgba(255,255,255,0.14)",
                border: isDark ? "1px solid rgba(142,194,255,0.34)" : "1px solid rgba(255,255,255,0.24)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, mt: 0.2,
              }}>
                <Icon size={14} color={isDark ? "#c8e2ff" : "#ffffff"} />
              </Box>
              <Typography sx={{ fontSize: 13, color: isDark ? "rgba(233,242,255,0.88)" : "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 11,
          color: isDark ? "rgba(204,222,246,0.7)" : "rgba(255,255,255,0.62)",
          position: "relative",
          zIndex: 2,
        }}
      >
        © 2026 WebSchool · Todos os direitos reservados
      </Typography>
    </Box>
  );
}
