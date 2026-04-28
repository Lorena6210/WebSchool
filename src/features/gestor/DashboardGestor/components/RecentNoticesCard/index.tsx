"use client";

import { Box, Chip, Paper, Typography } from "@mui/material";
import type { Notice } from "@/types";
import { sectionTitleSx } from "../../utils";

type RecentNoticesCardProps = {
  accent: string;
  notices: Notice[];
};

export function RecentNoticesCard({ accent, notices }: RecentNoticesCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "#ffffff",
        border: "1px solid rgba(15,39,71,0.1)",
      }}
    >
      <Typography sx={sectionTitleSx(accent)}>Últimos Avisos Enviados</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {notices.map((notice) => (
          <Box
            key={notice.id}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#f7faff",
              border: "1px solid rgba(15,39,71,0.12)",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: `${accent}66`,
                transform: "translateY(-2px)",
                boxShadow: "0 8px 22px rgba(15,39,71,0.16)",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Chip
                label={notice.tipo}
                size="small"
                sx={{
                  bgcolor: accent,
                  color: "#ffffff",
                  fontWeight: 600,
                  height: 24,
                  boxShadow: "0 0 8px rgba(18,58,107,0.25)",
                }}
              />
              <Typography variant="caption" color="rgba(15,39,71,0.5)">
                {new Date(notice.data).toLocaleDateString("pt-BR")}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" mb={0.5} color="#0f2747">
              {notice.titulo}
            </Typography>
            {notice.mensagem && (
              <Typography
                variant="body2"
                color="rgba(15,39,71,0.68)"
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
        ))}
      </Box>
    </Paper>
  );
}
