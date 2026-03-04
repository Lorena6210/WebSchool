'use client';

import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

export default function SidebarAluno() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Box
      sx={{
        width: '280px',
        height: '100vh',
        background: 'linear-gradient(180deg, #1C1917 0%, #141210 100%)',
        color: '#F3EFEA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      {/* TOPO */}
      <Box>
        {/* Usuário */}
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            sx={{
              bgcolor: '#9333EA',
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            {user?.nome?.[0] || 'L'}
          </Avatar>

          <Box>
            <Typography fontWeight="bold">
              {user?.nome || 'Lucas Ferreira'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              RA: {user?.ra || '2024001'}
            </Typography>

            <Box mt={1}>
              <Chip
                label="Aluno"
                size="small"
                sx={{
                  backgroundColor: '#E9D5FF',
                  color: '#4C1D95',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* MENU */}
        <List sx={{ py: 0 }}>
          <ListItemButton
            onClick={() => router.push('/mural/alun')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <MenuBookIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mural" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/atividades')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Atividades" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/provas/aluno')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Provas" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/boletim/aluno')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <BarChartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Boletim" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/historico-medico')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <FavoriteBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Histórico Médico" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/historico-escola')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <SchoolIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Histórico Escolar" />
          </ListItemButton>

          <ListItemButton
            onClick={() => router.push('/calendario/aluno')}
            sx={itemStyle}
          >
            <ListItemIcon sx={{ color: '#aaa' }}>
              <CalendarTodayIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Calendário" />
          </ListItemButton>
        </List>
      </Box>

      {/* RODAPÉ */}
      <Box>
        <Divider sx={{ borderColor: '#ffffff20', mb: 2 }} />

        <ListItemButton
          onClick={() => router.push('/perfil')}
          sx={itemStyle}
        >
          <ListItemIcon sx={{ color: '#aaa' }}>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            logout();
            router.push('/login');
          }}
          sx={itemStyle}
        >
          <ListItemIcon sx={{ color: '#EF4444' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            sx={{ color: '#EF4444' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

/* Estilo padrão dos itens */
const itemStyle = {
  minHeight: 40,
  px: 1.5,
  py: 0.5,
  mb: 0.5,
  borderRadius: 2,
  '& .MuiListItemIcon-root': {
    minWidth: 32,
  },
};