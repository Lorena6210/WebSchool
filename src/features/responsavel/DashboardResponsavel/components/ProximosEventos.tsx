import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { EventNoteOutlined } from "@mui/icons-material";
import { getSectionTitle } from "../utils";

interface ProximosEventosProps {
  isDark: boolean;
  accent: string;
  upcomingEvents: any[];
}

export function ProximosEventos({ isDark, accent, upcomingEvents }: ProximosEventosProps) {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography sx={getSectionTitle(accent, isDark)}>
        <EventNoteOutlined sx={{ fontSize: 20 }} />
        Próximos Eventos da Turma
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: isDark ? "rgba(240,240,248,0.4)" : "rgba(15,39,71,0.52)" }}>
            Nenhum evento próximo
          </p>
        ) : (
          upcomingEvents.map((ev) => (
            <Box
              key={ev.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: isDark ? "#1a1a2c" : "#f8fbff",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,39,71,0.1)",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: `${accent}55`,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="caption" fontWeight="bold" color={accent}>
                  {ev.tipo?.charAt(0).toUpperCase() + ev.tipo?.slice(1)}
                </Typography>
                <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.3)" : "rgba(15,39,71,0.5)"}>
                  {new Date(ev.data).toLocaleDateString("pt-BR")}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"} mb={0.5}>
                {ev.titulo}
              </Typography>
              <Typography variant="caption" color={isDark ? "rgba(240,240,248,0.5)" : "rgba(15,39,71,0.62)"}>
                {ev.horario}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}
