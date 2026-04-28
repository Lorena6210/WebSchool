import React from "react";
import { Box, Typography } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import { noticeTypeColors, noticeTypeColorsText, noticeTypeLabels } from "../utils";

interface Aviso {
  id: string | number;
  tipo: string;
  data: string;
  titulo: string;
  mensagem: string;
  autorNome: string;
  destinatarios: string[];
}

interface AvisosListProps {
  isDark: boolean;
  notices: Aviso[];
  canSend: boolean;
}

export function AvisosList({ isDark, notices, canSend }: AvisosListProps) {
  if (notices.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <NotificationsNoneOutlined
          sx={{
            fontSize: 48,
            color: isDark ? "rgba(240,240,248,0.2)" : "rgba(15,39,71,0.2)",
            mb: 1,
          }}
        />
        <Typography color={isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.5)"}>Nenhum aviso encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {notices.map((notice) => (
        <Box
          key={notice.id}
          sx={{
            p: 2,
            bgcolor: noticeTypeColors[notice.tipo],
            borderRadius: 2,
            border: `1px solid ${noticeTypeColorsText[notice.tipo]}20`,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: noticeTypeColorsText[notice.tipo],
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography
              variant="caption"
              fontWeight="bold"
              color={noticeTypeColorsText[notice.tipo]}
              textTransform="uppercase"
              fontSize="0.75rem"
            >
              {noticeTypeLabels[notice.tipo]}
            </Typography>
            <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.54)"}>
              {new Date(notice.data).toLocaleDateString("pt-BR")}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold" mb={0.5} color={isDark ? "#f0f0f8" : "#0f2747"}>
            {notice.titulo}
          </Typography>
          {notice.mensagem && (
            <Typography
              variant="body2"
              color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.68)"}
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
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.75rem",
              color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.54)",
            }}
          >
            <span>Por: {notice.autorNome}</span>
            {canSend && (
              <>
                <span>•</span>
                <span>Para: {notice.destinatarios.join(", ")}</span>
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
