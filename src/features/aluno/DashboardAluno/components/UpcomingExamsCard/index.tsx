'use client';

import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { AssignmentOutlined, AccessTimeOutlined, Add } from '@mui/icons-material';
import { sectionTitleSx } from '../../utils';
import type { Exam } from '@/types';

interface UpcomingExamsCardProps {
  isDark: boolean;
  accentColor: string;
  exams: Exam[];
}

const EXAM_COLORS = ['#a78bfa', '#60a5fa', '#34d399'];

const UpcomingExamsCard: React.FC<UpcomingExamsCardProps> = ({ isDark, accentColor, exams }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={sectionTitleSx(accentColor, isDark)}>
          <AssignmentOutlined sx={{ fontSize: 20, color: accentColor }} />
          Agenda de Provas
        </Typography>
        <IconButton size="small" sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,39,71,0.06)', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,39,71,0.12)' } }}>
          <Add sx={{ fontSize: 18, color: isDark ? 'rgba(240,240,248,0.5)' : 'rgba(15,39,71,0.65)' }} />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {exams.map((exam, i) => (
          <Box
            key={exam.titulo}
            sx={{
              display: 'flex', gap: 1.5,
              py: 1.75,
              borderBottom: i < exams.length - 1 ? (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,39,71,0.08)') : 'none',
              cursor: 'pointer',
              '&:hover': { '& .exam-title': { color: accentColor } },
              transition: 'color 0.2s',
            }}
          >
            {/* Color indicator */}
            <Box sx={{
              width: 3, borderRadius: 4,
              bgcolor: EXAM_COLORS[i % EXAM_COLORS.length],
              flexShrink: 0,
              minHeight: 52,
            }} />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Date badge */}
              <Typography
                sx={{
                  fontSize: '0.67rem', fontWeight: 700,
                  color: EXAM_COLORS[i % EXAM_COLORS.length],
                  textTransform: 'uppercase', letterSpacing: 0.8,
                  display: 'block', mb: 0.25,
                }}
              >
                {exam.data}
              </Typography>

              <Typography
                className="exam-title"
                fontWeight="600"
                variant="body2"
                sx={{ color: isDark ? '#f0f0f8' : '#0f2747', transition: 'color 0.2s' }}
                noWrap
              >
                {exam.titulo}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.55)' }} noWrap>
                  {exam.disciplina}
                </Typography>
                {exam.horario && (
                  <>
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.2)' : 'rgba(15,39,71,0.3)' }}>·</Typography>
                    <AccessTimeOutlined sx={{ fontSize: 12, color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.55)' }} />
                    <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.55)' }}>
                      {exam.horario}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default UpcomingExamsCard;
