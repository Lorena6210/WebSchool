'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { sectionTitleSx, ACCENT } from '../../utils';
import type { Notice } from '@/types';

interface ImportantNoticesCardProps {
  notices: Notice[];
}

const ImportantNoticesCard: React.FC<ImportantNoticesCardProps> = ({ notices }) => {
  return (
    <Paper
      sx={{
        p: 3,
        flex: 1,
        bgcolor: "#12121e",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Typography sx={sectionTitleSx(ACCENT)}>
        <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
        Avisos Importantes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notices.slice(0, 2).map(notice => (
          <Box
            key={notice.id}
            sx={{
              p: 2,
              bgcolor: "#1a1a2c",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: `rgba(5,150,105,0.3)`,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="caption" fontWeight="bold" color={ACCENT}>
                {notice.tipo}
              </Typography>
              <Typography variant="caption" color="rgba(240,240,248,0.3)">
                {notice.data}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" mb={0.5} color="#f0f0f8">
              {notice.titulo}
            </Typography>
            {notice.mensagem && (
              <Typography
                variant="body2"
                color="rgba(240,240,248,0.5)"
                sx={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {notice.mensagem}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ImportantNoticesCard;
