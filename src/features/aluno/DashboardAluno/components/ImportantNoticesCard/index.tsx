'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { NotificationsNoneOutlined, FiberManualRecord } from '@mui/icons-material';
import { sectionTitleSx } from '../../utils';
import type { Notice } from '@/types';

interface ImportantNoticesCardProps {
  isDark: boolean;
  accentColor: string;
  notices: Notice[];
}

const NOTICE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  default: { bg: 'rgba(124,58,237,0.15)', text: '#a78bfa', dot: '#a78bfa' },
  urgente: { bg: 'rgba(229,36,74,0.12)', text: '#f87171', dot: '#e5244a' },
  informativo: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa', dot: '#3b82f6' },
  evento: { bg: 'rgba(52,211,153,0.12)', text: '#34d399', dot: '#10b981' },
};

const ImportantNoticesCard: React.FC<ImportantNoticesCardProps> = ({ isDark, accentColor, notices }) => {
  return (
    <Paper sx={{ p: 3, flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={sectionTitleSx(accentColor, isDark)}>
          <NotificationsNoneOutlined sx={{ fontSize: 20, color: accentColor }} />
          Avisos Recentes
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {notices.slice(0, 3).map((notice, i) => {
          const typeKey = notice.tipo?.toLowerCase() as keyof typeof NOTICE_COLORS;
          const c = NOTICE_COLORS[typeKey] ?? NOTICE_COLORS.default;
          return (
            <Box
              key={notice.id}
              sx={{
                display: 'flex', gap: 1.5,
                py: 1.75,
                borderBottom: i < Math.min(notices.length, 3) - 1 ? (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,39,71,0.08)') : 'none',
                cursor: 'pointer',
                '&:hover': { opacity: 0.85 },
                transition: 'opacity 0.2s',
              }}
            >
              {/* Icon */}
              <Box sx={{
                width: 36, height: 36,
                borderRadius: 2,
                bgcolor: c.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.text, flexShrink: 0,
              }}>
                <NotificationsNoneOutlined sx={{ fontSize: 18 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FiberManualRecord sx={{ fontSize: 6, color: c.dot }} />
                    <Typography sx={{
                      fontSize: '0.65rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: 0.8,
                      color: c.text,
                    }}>
                      {notice.tipo}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.52)', fontSize: '0.65rem', flexShrink: 0 }}>
                    {notice.data}
                  </Typography>
                </Box>

                <Typography variant="body2" fontWeight="600" sx={{ color: isDark ? '#f0f0f8' : '#0f2747' }} lineHeight={1.3} noWrap>
                  {notice.titulo}
                </Typography>

                {notice.mensagem && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDark ? 'rgba(240,240,248,0.4)' : 'rgba(15,39,71,0.58)',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: '0.75rem',
                      mt: 0.25,
                    }}
                  >
                    {notice.mensagem}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ImportantNoticesCard;
