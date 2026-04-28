'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { BookOutlined, NotificationsNoneOutlined, MoreHoriz } from '@mui/icons-material';
import { sectionTitleSx } from '../../utils';
import type { Activity } from '@/types';

interface RecentActivitiesCardProps {
  isDark: boolean;
  accentColor: string;
  activities: Activity[];
  lateActivitiesCount: number;
}

const STATUS_STYLES = {
  entregue: { chipBg: 'rgba(52,211,153,0.15)', chipText: '#34d399', iconBg: 'rgba(52,211,153,0.12)', iconColor: '#34d399' },
  atrasado: { chipBg: 'rgba(248,113,113,0.15)', chipText: '#f87171', iconBg: 'rgba(248,113,113,0.12)', iconColor: '#f87171' },
  pendente:  { chipBg: 'rgba(251,191,36,0.15)', chipText: '#fbbf24', iconBg: 'rgba(251,191,36,0.12)', iconColor: '#fbbf24' },
} as const;

type ActivityStatus = keyof typeof STATUS_STYLES;

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
  isDark,
  accentColor,
  activities,
  lateActivitiesCount,
}) => {
  return (
    <Paper sx={{ p: 3.5, height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={sectionTitleSx(accentColor, isDark)}>
          Atividades
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: accentColor, fontWeight: 600, cursor: 'pointer',
              px: 1.5, py: 0.5, borderRadius: 2,
              bgcolor: `${accentColor}0D`,
              '&:hover': { bgcolor: `${accentColor}1A` },
              transition: 'background 0.2s',
            }}
          >
            Ver todas
          </Typography>
          <MoreHoriz sx={{ fontSize: 20, color: isDark ? 'rgba(240,240,248,0.35)' : 'rgba(15,39,71,0.45)', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* Column headers */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, mb: 1 }}>
        <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.52)', flex: 1, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }} fontWeight={600}>
          Atividade
        </Typography>
        <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.52)', width: 90, textAlign: 'center', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }} fontWeight={600}>
          Entrega
        </Typography>
        <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.52)', width: 90, textAlign: 'center', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }} fontWeight={600}>
          Status
        </Typography>
      </Box>

      {/* Rows */}
      <Box>
        {activities.slice(0, 4).map((activity) => {
          const s = STATUS_STYLES[activity.status as ActivityStatus] ?? STATUS_STYLES.pendente;
          return (
            <Box
              key={activity.titulo}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1, py: 1.5,
                borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,39,71,0.08)',
                '&:hover': { bgcolor: isDark ? '#1a1a2c' : '#f8fbff', borderRadius: 2 },
                transition: 'background 0.15s',
                cursor: 'default',
              }}
            >
              {/* Icon + name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: 1.5,
                  bgcolor: s.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.iconColor, flexShrink: 0,
                }}>
                  <BookOutlined sx={{ fontSize: 18 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight="600" variant="body2" sx={{ color: isDark ? '#f0f0f8' : '#0f2747' }} noWrap>
                    {activity.titulo}
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.55)' }} display="block">
                    {activity.disciplina}
                  </Typography>
                </Box>
              </Box>

              {/* Due date */}
              <Typography
                variant="caption"
                sx={{
                  width: 90, textAlign: 'center',
                  bgcolor: 'rgba(251,191,36,0.1)', color: '#fbbf24',
                  fontWeight: 600, fontSize: '0.72rem',
                  px: 1, py: 0.4, borderRadius: 1.5,
                }}
              >
                {activity.dataEntrega}
              </Typography>

              {/* Status chip */}
              <Box sx={{ width: 90, display: 'flex', justifyContent: 'center' }}>
                <Chip
                  label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  size="small"
                  sx={{ bgcolor: s.chipBg, color: s.chipText, fontWeight: 600, height: 24, fontSize: '0.72rem' }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Late warning */}
      {lateActivitiesCount > 0 && (
        <Box
          mt={2} p={1.75}
          sx={{
            background: `${accentColor}14`,
            borderRadius: 2,
            border: `1px solid ${accentColor}40`,
            borderLeft: `3px solid ${accentColor}`,
            display: 'flex', alignItems: 'center', gap: 1.5,
          }}
        >
          <NotificationsNoneOutlined sx={{ color: accentColor, fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: isDark ? '#f87171' : '#b42344' }} fontWeight="600">
            Você tem <strong>{lateActivitiesCount}</strong> atividade(s) em atraso.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RecentActivitiesCard;
