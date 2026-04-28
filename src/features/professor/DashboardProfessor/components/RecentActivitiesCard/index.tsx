'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { BookOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { sectionTitleSx, ACCENT } from '../../utils';
import type { Activity } from '@/types';

interface RecentActivitiesCardProps {
  activities: Activity[];
  lateActivitiesCount: number;
}

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
  activities,
  lateActivitiesCount,
}) => {
  return (
    <Paper
      sx={{
        p: 4,
        height: '100%',
        bgcolor: "#12121e",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={sectionTitleSx(ACCENT)}>
          <BookOutlined sx={{ fontSize: 20 }} />
          Atividades Recentes
        </Typography>
        <Typography variant="body2" sx={{ color: ACCENT, cursor: 'pointer', fontWeight: 600 }}>
          Ver todas
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activities.slice(0, 4).map((activity) => (
          <Box
            key={activity.titulo}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 2,
              bgcolor: "#1a1a2c",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "rgba(5,150,105,0.3)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: activity.status === "entregue" ? "#10B981" : activity.status === "atrasado" ? "#EF4444" : "#F59E0B"
              }} />
              <Box>
                <Typography fontWeight="bold" variant="body1" color="#f0f0f8">
                  {activity.titulo}
                </Typography>
                <Typography variant="body2" color="rgba(240,240,248,0.5)">
                  {activity.disciplina}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                size="small"
                sx={{
                  bgcolor:
                    activity.status === "pendente" ? "rgba(245,158,11,0.15)" :
                      activity.status === "entregue" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                  color:
                    activity.status === "pendente" ? "#F59E0B" :
                      activity.status === "entregue" ? "#10B981" : "#EF4444",
                  fontWeight: 600,
                  height: 32,
                  border: "1px solid",
                  borderColor:
                    activity.status === "pendente" ? "rgba(245,158,11,0.3)" :
                      activity.status === "entregue" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
                }}
              />
              <Typography variant="caption" color="rgba(240,240,248,0.4)">
                {activity.dataEntrega}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {lateActivitiesCount > 0 && (
        <Box
          mt={3}
          p={2}
          bgcolor="rgba(239,68,68,0.1)"
          borderRadius={2}
          border="1px solid rgba(239,68,68,0.25)"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <NotificationsNoneOutlined sx={{ color: "#EF4444" }} />
          <Typography variant="body2" color="#EF4444" fontWeight="500">
            Atenção: Você tem {lateActivitiesCount} atividade(s) em atraso.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RecentActivitiesCard;
