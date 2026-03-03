'use client';

import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { BookOutlined, AssignmentOutlined, NotificationsNoneOutlined, BarChartOutlined, Height } from '@mui/icons-material';

import { useAuth } from '@/lib/context/AuthContext';
import { mockActivities, mockExams, mockGrades, mockNotices } from '@/lib/mockData';
import LayoutAluno from '@/components/layout/LayoutAluno';

const ACCENT = '#6B21A8';

const retroCard = {
  width: "100%",
  Height: "25px",
  border: '2.5px solid black',
  borderRadius: '18px',
  boxShadow: '4px 4px 0px black',
  backgroundColor: '#FFF',
};

const sectionTitle = {
  fontWeight: 700,
  letterSpacing: '0.07em',
  fontSize: '1.05rem',
  textTransform: 'uppercase',
  mb: 2,
};

export default function DashboardAluno() {
  const { user } = useAuth();

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? 'Bom dia'
      : today.getHours() < 18
      ? 'Boa tarde'
      : 'Boa noite';

  // MOCKS
  const pendingActivities = mockActivities.filter((a) => a.status === 'pendente');
  const lateActivities = mockActivities.filter((a) => a.status === 'atrasado');
  const nextExams = mockExams.slice(0, 3);
  const unreadNotices = mockNotices.filter(n => n.destinatarios.includes('aluno')).length;
  const avgGrade = mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;

  return (
    <LayoutAluno>
    <Box sx={{
      width:"100%",
      // minHeight: "100vh",
      bgcolor: "#F9F6F1",
      px: { xs: 1, md: 8 },
      py: { xs: 2, md: 4 },
      fontFamily: "Poppins, sans-serif"
    }}>
      {/* HEADER */}
      <Typography variant="h3" fontWeight="bold" mb={0.5}>
        {greeting}, {user?.nome.split(' ')[0]}!
      </Typography>
      <Typography sx={{ color: "#4B4238", mb: 2 }}>
        Aqui está um resumo do seu dia escolar
      </Typography>
      <Divider sx={{ borderColor: ACCENT, width: "60px", mb: 3, borderBottomWidth: "3px" }} />

      {/* TOP CARDS */}
      <Grid container spacing={3.4} mb={2} bgcolor={"red"}>
        <Grid item xs={12} sm={6} md={3}>

          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Atividades Pendentes</Typography>
            <Typography variant="h3" fontWeight="bold" color="#1C1917">{pendingActivities.length}</Typography>
            <Typography variant="body2">Para entregar</Typography>
            <BookOutlined sx={{ color: ACCENT, mt: 1 }} />
          </Paper>
        </Grid
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Provas Próximas</Typography>
            <Typography variant="h3" fontWeight="bold" color="#1C1917">{nextExams.length}</Typography>
            <Typography variant="body2">Este bimestre</Typography>
            <AssignmentOutlined sx={{ color: "#EAB308", mt: 1 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Média Geral</Typography>
            <Typography variant="h3" fontWeight="bold" color="#139D57">{avgGrade.toFixed(1)}</Typography>
            <Typography variant="body2">Todas as disciplinas</Typography>
            <BarChartOutlined sx={{ color: "#139D57", mt: 1 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Avisos</Typography>
            <Typography variant="h3" fontWeight="bold" color="#1C1917">{unreadNotices}</Typography>
            <Typography variant="body2">Não lidos</Typography>
            <NotificationsNoneOutlined sx={{ color: ACCENT, mt: 1 }} />
          </Paper>
        </Grid>
      </Grid>

      {/* MAIN GRID */}
      <Grid container spacing={3}>
        {/* Atividades Recentes */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Atividades Recentes</Typography>
            {/* Lista de Atividades */}
            {mockActivities.map((activity) => (
              <Box key={activity.titulo}
                sx={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderBottom: "1px solid #E5E5E5", py: 1
                }}>
                <Box>
                  <Typography fontWeight="bold">{activity.titulo}</Typography>
                  <Typography variant="body2" color="#757575">{activity.disciplina}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  {/* Status e Data */}
                  <Box
                    sx={{
                      bgcolor:
                        activity.status === "pendente"
                          ? "#FDE68A"
                          : activity.status === "entregue"
                          ? "#D1FAE5"
                          : "#FECACA",
                      color:
                        activity.status === "pendente"
                          ? "#92400E"
                          : activity.status === "entregue"
                          ? "#166534"
                          : "#991B1B",
                      borderRadius: "12px",
                      px: 2,
                      py: .5,
                      mr: 2,
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                    }}
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Box>
                  <Typography variant="caption" color="#888">
                    {activity.data}
                  </Typography>
                </Box>
              </Box>
            ))}
            {/* Alerta de atraso */}
            {lateActivities.length > 0 && (
              <Box
                mt={2}
                px={2}
                py={1}
                bgcolor="#FEE2E2"
                borderRadius="8px"
                color="#991B1B"
                fontWeight="bold"
                fontSize="0.96rem"
              >
                ⚠️ Você tem {lateActivities.length} atividade(s) em atraso. Fale com seu professor.
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Provas e Avisos */}
        <Grid item xs={12} md={4}>
          {/* Próximas Provas */}
          <Paper sx={{ ...retroCard, p: 3, mb: 3 }}>
            <Typography sx={sectionTitle}>Próximas Provas</Typography>
            {nextExams.map(exam => (
              <Box key={exam.titulo}
                sx={{
                  bgcolor:"#FEF9C3", borderRadius:"12px", p:2, mb:2,
                  border:"1px solid #FDE68A"
                }}>
                <Typography fontWeight="bold">{exam.disciplina}</Typography>
                <Typography variant="body2">{exam.titulo}</Typography>
                <Box mt={.5} display="flex" alignItems="center">
                  <Box bgcolor="#FDE68A" color="#92400E" borderRadius="6px" px={1} mr={1}>{exam.data}</Box>
                  <Typography variant="caption">{exam.horario}</Typography>
                </Box>
              </Box>
            ))}
          </Paper>

          {/* Avisos */}
          <Paper sx={{ ...retroCard, p: 3 }}>
            <Typography sx={sectionTitle}>Avisos</Typography>
            {mockNotices.slice(0,2).map(notice => (
              <Box key={notice.id}
                sx={{
                  bgcolor:"#F4F4F5", borderRadius:"12px", p:2, mb:2,
                  border:"1px solid #D1D5DB"
                }}>
                <Box fontWeight="bold" color="#6B21A8" mb={.5}>{notice.tipo}</Box>
                <Typography>{notice.titulo}</Typography>
                {notice.mensagem && (
                  <Typography variant="body2" color="#444">{notice.mensagem}</Typography>
                )}
                <Typography variant="caption">{notice.data}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

    </Box>
    </LayoutAluno> 
  );
}