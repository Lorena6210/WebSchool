"use client";

import { AssignmentOutlined } from "@mui/icons-material";
import { Box, Chip, Paper, Typography } from "@mui/material";
import type { CalendarEvent } from "@/types";
import { sectionTitleSx } from "../../utils";

type UpcomingEventsCardProps = {
  accent: string;
  events: CalendarEvent[];
};

export function UpcomingEventsCard({ accent, events }: UpcomingEventsCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
        border: "1px solid rgba(15,39,71,0.1)",
      }}
    >
      <Typography sx={sectionTitleSx(accent)}>
        <AssignmentOutlined sx={{ fontSize: 20 }} />
        Próximos Eventos
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {events.map((event) => (
          <Box
            key={event.id}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#f7faff",
              border: "1px solid rgba(15,39,71,0.12)",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: `${accent}66`,
                transform: "translateY(-2px)",
                boxShadow: "0 8px 22px rgba(15,39,71,0.16)",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                color={accent}
                textTransform="uppercase"
              >
                {event.tipo}
              </Typography>
              <Typography variant="caption" color="rgba(15,39,71,0.5)">
                {new Date(event.data).toLocaleDateString("pt-BR")}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" mb={1} color="#0f2747">
              {event.titulo}
            </Typography>
            {event.turma && (
              <Chip
                label={event.turma}
                size="small"
                sx={{
                  bgcolor: accent,
                  color: "#ffffff",
                  fontWeight: 600,
                  height: 24,
                  boxShadow: "0 0 8px rgba(18,58,107,0.25)",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
