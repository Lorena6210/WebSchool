"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { getDemoAccounts, type DemoAccount, type LoginThemeMode } from "../../utils";

interface DemoCardsProps {
  mode: LoginThemeMode;
  activeIdentifier: string;
  onSelect: (acc: DemoAccount) => void;
}

export function DemoCards({ mode, activeIdentifier, onSelect }: DemoCardsProps) {
  const isDark = mode === "dark";
  const demoAccounts = getDemoAccounts(mode);

  return (
    <>
      {/* Divisor */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 4 }}>
        <Box sx={{ flex: 1, height: "1px", bgcolor: isDark ? "rgba(142,194,255,0.18)" : "rgba(15,39,71,0.14)" }} />
        <Typography
          sx={{
            fontSize: 12,
            color: isDark ? "rgba(216,230,250,0.52)" : "rgba(15,39,71,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          Acesso rápido por perfil
        </Typography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: isDark ? "rgba(142,194,255,0.18)" : "rgba(15,39,71,0.14)" }} />
      </Box>

      {/* Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        {demoAccounts.map((acc) => {
          const Icon = acc.icon;
          const isActive = activeIdentifier === acc.identifier;

          return (
            <Box
              key={acc.role}
              component="button"
              type="button"
              onClick={() => onSelect(acc)}
              sx={{
                bgcolor: isActive ? acc.bg : (isDark ? "rgba(12,28,49,0.95)" : "#f6f9ff"),
                border: "1.5px solid",
                borderColor: isActive ? acc.color : (isDark ? "rgba(142,194,255,0.2)" : "rgba(15,39,71,0.14)"),
                borderRadius: "14px",
                p: 2,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                transition: "all 0.18s ease",
                "&:hover": {
                  bgcolor: acc.bg,
                  borderColor: acc.color,
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 16px ${acc.color}33`,
                },
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  bgcolor: isActive ? acc.color : `${acc.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.18s",
                }}
              >
                <Icon size={15} color={isActive ? "#fff" : acc.color} />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: isActive ? acc.textColor : (isDark ? "#ecf5ff" : "#0f2747"),
                    lineHeight: 1.2,
                    mb: 0.3,
                  }}
                >
                  {acc.role}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontSize: 11,
                    color: isActive ? acc.textColor : (isDark ? "rgba(216,230,250,0.66)" : "rgba(15,39,71,0.58)"),
                    opacity: isActive ? 0.8 : 1,
                    lineHeight: 1.2,
                  }}
                >
                  {acc.desc}
                </Typography>
              </Box>

              <ChevronRight
                size={13}
                color={isActive ? acc.color : (isDark ? "rgba(216,230,250,0.38)" : "rgba(15,39,71,0.34)")}
                style={{ flexShrink: 0 }}
              />
            </Box>
          );
        })}
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 11,
          color: isDark ? "rgba(216,230,250,0.46)" : "rgba(15,39,71,0.45)",
          mt: 2,
        }}
      >
        Clique em um perfil para preencher automaticamente
      </Typography>
    </>
  );
}
