import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import { getSectionTitle } from "../utils";

interface AvisosImportantesProps {
  isDark: boolean;
  accent: string;
  allMyNotices: any[];
}

export function AvisosImportantes({ isDark, accent, allMyNotices }: AvisosImportantesProps) {
  return (
    <Paper sx={{ p: 3, flex: 1 }}>
      <Typography sx={getSectionTitle(accent, isDark)}>
        <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
        Avisos Importantes
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {allMyNotices.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>
            Nenhum aviso
          </p>
        ) : (
          allMyNotices.slice(0, 2).map((notice) => (
            <Box
              key={notice.id}
              sx={{
                p: 2,
                bgcolor: isDark ? "#1a1a2c" : "#f8fbff",
                borderRadius: 2,
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: `${accent}55`,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="caption" fontWeight="bold" color={accent}>
                  {notice.tipo?.charAt(0).toUpperCase() + notice.tipo?.slice(1)}
                </Typography>
                <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.3)" : "rgba(15,39,71,0.5)"}>
                  {new Date(notice.data).toLocaleDateString("pt-BR")}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"} mb={0.5}>
                {notice.titulo}
              </Typography>
              {notice.mensagem && (
                <Typography
                  variant="body2"
                  color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.72)"}
                  sx={{
                    fontSize: "0.9rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {notice.mensagem}
                </Typography>
              )}
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}
