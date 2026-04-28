'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { AssignmentOutlined } from '@mui/icons-material';
import { sectionTitleSx, ACCENT } from '../../utils';
import type { Exam } from '@/types';

interface UpcomingExamsCardProps {
  exams: Exam[];
}

const UpcomingExamsCard: React.FC<UpcomingExamsCardProps> = ({ exams }) => {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "#12121e",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Typography sx={sectionTitleSx(ACCENT)}>
        <AssignmentOutlined sx={{ fontSize: 20 }} />
        Próximas Provas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {exams.map(exam => (
          <Box
            key={exam.titulo}
            sx={{
              p: 2,
              bgcolor: "rgba(245,158,11,0.08)",
              borderRadius: 2,
              border: "1px solid rgba(245,158,11,0.2)",
              position: 'relative',
              overflow: 'hidden',
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "rgba(245,158,11,0.4)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              },
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.15 }}>
              <AssignmentOutlined sx={{ color: "#F59E0B" }} />
            </Box>
            <Typography
              variant="body2"
              color="#F59E0B"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="0.75rem"
            >
              {exam.disciplina}
            </Typography>
            <Typography fontWeight="bold" variant="body1" color="#f0f0f8" mb={0.5}>
              {exam.titulo}
            </Typography>
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Chip
                label={exam.data}
                size="small"
                sx={{
                  bgcolor: "rgba(245,158,11,0.12)",
                  color: "#F59E0B",
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  border: "1px solid rgba(245,158,11,0.25)",
                }}
              />
              <Typography variant="caption" color="rgba(240,240,248,0.5)">
                {exam.horario}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default UpcomingExamsCard;
