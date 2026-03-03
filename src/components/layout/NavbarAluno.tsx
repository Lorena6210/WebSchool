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

import { useAuth } from '@/lib/context/AuthContext';

const ACCENT = '#6B21A8';

export default function SidebarAluno() {
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        width: 260,
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
        {/* Logo */}
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            sx={{
              bgcolor: ACCENT,
              width: 42,
              height: 42,
              fontWeight: 'bold',
              mr: 2,
            }}
          >
            CW
          </Avatar>
          <Box>
            <Typography fontWeight="bold">
              Creamywork
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              Neck
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#ffffff20', mb: 3 }} />

        {/* Usuário */}
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            sx={{
              bgcolor: '#9333EA',
              width: 42,
              height: 42,
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
        <List>
          <ListItemButton
            sx={{
              backgroundColor: '#2A2725',
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Mural" />
          </ListItemButton>

          <ListItemButton sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Atividades" />
          </ListItemButton>

          <ListItemButton sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Provas" />
          </ListItemButton>

          <ListItemButton sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Boletim" />
          </ListItemButton>

          <ListItemButton sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Histórico Médico" />
          </ListItemButton>

          <ListItemButton sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Histórico Escolar" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: '#aaa' }}>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendário" />
          </ListItemButton>
        </List>
      </Box>

      {/* RODAPÉ */}
      <Box>
        <Divider sx={{ borderColor: '#ffffff20', mb: 2 }} />

        <ListItemButton sx={{ mb: 1 }}>
          <ListItemIcon sx={{ color: '#aaa' }}>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>

        <ListItemButton onClick={logout}>
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