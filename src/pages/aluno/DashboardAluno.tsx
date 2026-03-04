'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Container, 
  Chip, 
  Avatar,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { 
  BookOutlined, 
  AssignmentOutlined, 
  NotificationsNoneOutlined, 
  BarChartOutlined, 
  ArrowForwardIos,
  School
} from '@mui/icons-material';
import { useTheme as useMUITheme } from "@mui/material/styles";
import { useAuth } from '@/lib/context/AuthContext';
import { mockActivities, mockExams, mockGrades, mockNotices } from '@/lib/mockData';
import LayoutAluno from '@/components/layout/LayoutAluno';

// Cor de destaque da marca
const ACCENT = '#6B21A8';
const ACCENT_LIGHT = '#F3E5F5';

// Configuração de tema personalizada para fontes
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.03)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.85rem',
        },
      },
    },
  },
});

const DashboardAluno = () => {
  const { user } = useAuth();
  const muiTheme = useMUITheme();
  const today = new Date();
  
  const greeting =
    today.getHours() < 12
      ? 'Bom dia'
      : today.getHours() < 18
        ? 'Boa tarde'
        : 'Boa noite';

  // Lógica de Dados
  const pendingActivities = mockActivities.filter((a) => a.status === 'pendente');
  const lateActivities = mockActivities.filter((a) => a.status === 'atrasado');
  const nextExams = mockExams.slice(0, 3);
  const unreadNotices = mockNotices.filter(n => n.destinatarios.includes('aluno')).length;
  const avgGrade = mockGrades.reduce((acc, g) => acc + (g.media || 0), 0) / mockGrades.length;

  // Estilos de Seção
  const sectionTitle = {
    fontWeight: 700,
    letterSpacing: '0.05em',
    fontSize: '1.1rem',
    color: ACCENT,
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  };

  function getLeftAccent(
  status: AulaDigitalItem['statusClass'],
  isLive?: boolean
) {
  if (status === 'NOVA') return '#69BD45';
  if (status === 'JA_ABERTA') return '#666666';
  if (status === 'COM_RESPOSTA') return '#EAD308';
  return '#CBD5E0'; // cinza
}

const accent = getLeftAccent(item.statusClass, item.isLive);
  return (
    <ThemeProvider theme={theme}>
      <LayoutAluno>
        <Box sx={{
          width: "100%",
          bgcolor: "#F9F6F1",
          minHeight: "100vh",
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          fontFamily: "Poppins, sans-serif"
        }}>
          <Container maxWidth="lg">
            
            {/* HEADER */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <School sx={{ color: 'white' }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    {greeting}, {user?.nome.split(' ')[0]} !
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Vamos dar continuidade aos seus estudos hoje?
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
            </Box>

            {/* TOP CARDS */}
            <Grid container spacing={3} mb={5}>
              {[
                {
                  title: "Atividades Pendentes",
                  value: pendingActivities.length,
                  subtitle: "Para entregar",
                  icon: <BookOutlined />,
                  color: "#FDE68A", // Warning Yellow
                  textColor: "#92400E"
                },
                {
                  title: "Provas Próximas",
                  value: nextExams.length,
                  subtitle: "Este bimestre",
                  icon: <AssignmentOutlined />,
                  color: "#E0E7FF", // Indigo Light
                  textColor: "#4338CA"
                },
                {
                  title: "Média Geral",
                  value: avgGrade.toFixed(1),
                  subtitle: "Todas as disciplinas",
                  icon: <BarChartOutlined />,
                  color: "#D1FAE5", // Green Light
                  textColor: "#065F46"
                },
                {
                  title: "Avisos",
                  value: unreadNotices,
                  subtitle: "Não lidos",
                  icon: <NotificationsNoneOutlined />,
                  color: "#F3E5F5", // Purple Light
                  textColor: ACCENT
                }
              ].map((card, index) => (
                <Grid item xs={12} sm={6} md={3} size={3} key={index}>                 
                  <Paper
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 25px rgba(107, 33, 168, 0.15)",
                      }
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box
                      position="absolute"
                      left={0}
                      top={0}
                      bottom={0}
                      w="8px"
                      bg={accent}
                    />
                      <Typography
                        variant="overline"
                        sx={{
                          fontWeight: 700,
                          letterSpacing: 1,
                          color: "#888",
                          textTransform: 'uppercase',
                          fontSize: '0.75rem'
                        }}
                      >
                        {card.title}
                      </Typography>

                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: card.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: card.textColor,
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>

                    <Box mt={2}>
                      <Typography variant="h3" fontWeight="bold" color="#1A1A1A">
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="#666">
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* MAIN GRID */}
            <Grid container spacing={4} size={3}>
              {/* Atividades Recentes */}
              <Grid item xs={12} lg={8} size={8} >
                <Paper sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography sx={sectionTitle}>
                      <BookOutlined sx={{ fontSize: 20 }} />
                      Atividades Recentes
                    </Typography>
                    <Typography variant="body2" sx={{ color: ACCENT, cursor: 'pointer', fontWeight: 600 }}>
                      Ver todas
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {mockActivities.map((activity) => (
                      <Box 
                        key={activity.titulo}
                        sx={{
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "space-between",
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "white",
                          border: "1px solid #eee",
                          transition: "background 0.2s",
                          "&:hover": { bgcolor: "#FAFAFA" }
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
                            <Typography fontWeight="bold" variant="body1" color="#1A1A1A">{activity.titulo}</Typography>
                            <Typography variant="body2" color="#757575">{activity.disciplina}</Typography>
                          </Box>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={2}>
                          <Chip 
                            label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            size="small"
                            sx={{
                              bgcolor: 
                                activity.status === "pendente" ? "#FEF3C7" : 
                                activity.status === "entregue" ? "#D1FAE5" : "#FEE2E2",
                              color: 
                                activity.status === "pendente" ? "#92400E" : 
                                activity.status === "entregue" ? "#166534" : "#991B1B",
                              fontWeight: 600,
                              height: 32
                            }}
                          />
                          <Typography variant="caption" color="#888">
                            {activity.data}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {lateActivities.length > 0 && (
                    <Box
                      mt={3}
                      p={2}
                      bgcolor="#FEF2F2"
                      borderRadius={2}
                      border="1px solid #FECACA"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <NotificationsNoneOutlined color="error" />
                      <Typography variant="body2" color="#991B1B" fontWeight="500">
                        Atenção: Você tem {lateActivities.length} atividade(s) em atraso.
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Coluna Lateral (Provas e Avisos) */}
              <Grid item xs={12} lg={4} size={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%'}}>
                  
                  {/* Próximas Provas */}
                  <Paper sx={{ p:1 }}>
                    <Typography sx={sectionTitle}>
                      <AssignmentOutlined sx={{ fontSize: 20 }} />
                      Próximas Provas
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {nextExams.map(exam => (
                        <Box 
                          key={exam.titulo}
                          sx={{
                            p: 2,
                            bgcolor: "#FEF9C3",
                            borderRadius: 2,
                            border: "1px solid #FDE68A",
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1, opacity: 0.2 }}>
                            <AssignmentOutlined />
                          </Box>
                          <Typography variant="body2" color="#92400E" fontWeight="bold" textTransform="uppercase" fontSize="0.75rem">
                            {exam.disciplina}
                          </Typography>
                          <Typography fontWeight="bold" variant="body1" color="#1A1A1A" mb={0.5}>
                            {exam.titulo}
                          </Typography>
                          <Box mt={1} display="flex" alignItems="center" gap={1}>
                            <Chip 
                              label={exam.data} 
                              size="small" 
                              sx={{ bgcolor: "white", fontWeight: 600, fontSize: '0.75rem' }} 
                            />
                            <Typography variant="caption" color="#666">
                              {exam.horario}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Paper>

                  {/* Avisos */}
                  <Paper sx={{ p: 3, flex: 1 }}>
                    <Typography sx={sectionTitle}>
                      <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
                      Avisos Importantes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {mockNotices.slice(0, 2).map(notice => (
                        <Box 
                          key={notice.id}
                          sx={{
                            p: 2,
                            bgcolor: "white",
                            borderRadius: 2,
                            border: "1px solid #E5E7EB",
                            cursor: 'pointer',
                            transition: 'border-color 0.2s',
                            '&:hover': { borderColor: ACCENT }
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="caption" fontWeight="bold" color={ACCENT}>
                              {notice.tipo}
                            </Typography>
                            <Typography variant="caption" color="#999">
                              {notice.data}
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="bold" mb={0.5}>
                            {notice.titulo}
                          </Typography>
                          {notice.mensagem && (
                            <Typography variant="body2" color="#555" sx={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {notice.mensagem}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Paper>

                </Box>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </LayoutAluno>
    </ThemeProvider>
  );
};

export default DashboardAluno;