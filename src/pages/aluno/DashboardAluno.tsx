'use client';

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
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
=======
import React from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import { BookOutlined, AssignmentOutlined, NotificationsNoneOutlined, BarChartOutlined } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";
>>>>>>> f7ea447154fe7daab842b32d55458407ce57642b
import { useAuth } from '@/lib/context/AuthContext';
import { MockAPI } from '@/lib/mockData';
import type {
  Activity,
  Exam,
  Grade,
  Notice,
} from "@/types";
import DashboardLayout from '@/components/DashboardLayout';

// Cor de destaque da marca
const ACCENT = '#6B21A8';
const ACCENT_LIGHT = '#F3E5F5';

<<<<<<< HEAD
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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

=======
const sectionTitle = {
  fontWeight: 700,
  letterSpacing: '0.07em',
  fontSize: '1rem',
  textTransform: 'uppercase',
  mb: 2,
};

export default function DashboardAluno() {
  const { user } = useAuth();
  const theme = useTheme();
>>>>>>> f7ea447154fe7daab842b32d55458407ce57642b
  const today = new Date();
  
  const greeting =
    today.getHours() < 12
      ? 'Bom dia'
      : today.getHours() < 18
        ? 'Boa tarde'
        : 'Boa noite';
<<<<<<< HEAD
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          activitiesData,
          examsData,
          gradesData,
          noticesData,
        ] = await Promise.all([
          MockAPI.academic.getActivities(),
          MockAPI.academic.getExams(),
          MockAPI.academic.getGrades(),
          MockAPI.notices.getAll(),
        ]);
        setActivities(activitiesData);
        setExams(examsData);
        setGrades(gradesData);
        setNotices(noticesData);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard do aluno:", error);
      } finally {
        setIsLoading(false);
      }
    };
=======
>>>>>>> f7ea447154fe7daab842b32d55458407ce57642b

    fetchData();
  }, []);

  // Lógica de Dados
  const pendingActivities = activities.filter((a) => a.status === 'pendente');
  const lateActivities = activities.filter((a) => a.status === 'atrasado');
  const nextExams = exams.slice(0, 3);
  const unreadNotices = notices.filter(n => n.destinatarios.includes('aluno')).length;
  const avgGrade = grades.length > 0 ? grades.reduce((acc, g) => acc + (g.media || 0), 0) / grades.length : 0;

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

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <DashboardLayout>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: "#F9F6F1" }}>
            <Typography color="#666">
              Carregando seu dashboard...
            </Typography>
          </Box>
        </DashboardLayout>
      </ThemeProvider>
    );
  }

  const retroCard = (theme: any) => ({
    width: "100%",
    // height: "25px",
    border: `2px solid ${theme.palette.common.black}`,
    borderRadius: theme.spacing(2),
    boxShadow: `4px 4px 0px ${theme.palette.common.black}`,
    backgroundColor: theme.palette.background.paper,
  });

  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Box sx={{
          width: "100%",
          // bgcolor: "#F9F6F1",
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
=======
    <LayoutAluno>
      <Box sx={{
        width: "100%",
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
        <Grid
          container
          spacing={3}
          mb={4}
          // justifyContent=""
        >
          {[
            {
              title: "Atividades Pendentes",
              value: pendingActivities.length,
              subtitle: "Para entregar",
              icon: <BookOutlined fontSize="large" />,
              color: "warning.main"
            },
            {
              title: "Provas Próximas",
              value: nextExams.length,
              subtitle: "Este bimestre",
              icon: <AssignmentOutlined fontSize="large" />,
              color: "secondary.main"
            },
            {
              title: "Média Geral",
              value: avgGrade.toFixed(1),
              subtitle: "Todas as disciplinas",
              icon: <BarChartOutlined fontSize="large" />,
              color: "success.main"
            },
            {
              title: "Avisos",
              value: unreadNotices,
              subtitle: "Não lidos",
              icon: <NotificationsNoneOutlined fontSize="large" />,
              color: "primary.main"
            }
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={(theme) => ({
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.common.black}`,
                  boxShadow: "4px 4px 0px black",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: theme.palette.background.paper,

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "6px 6px 0px black",
                  }
                })}
              >
                {/* Top Section */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    {card.title}
>>>>>>> f7ea447154fe7daab842b32d55458407ce57642b
                  </Typography>

                  <Box
                    sx={(theme) => ({
                      color: theme.palette[card.color?.split(".")[0]]?.main || card.color,
                      opacity: 0.9
                    })}
                  >
                    {card.icon}
                  </Box>
                </Box>
<<<<<<< HEAD
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
                      },
                      position: 'relative',
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box
                      position="absolute"
                      left={0}
                      top={0}
                      bottom={0}
                      w="8px"
                      bgcolor={card.textColor}
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
                    {activities.slice(0, 4).map((activity) => (
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
                             {activity.dataEntrega}
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
                      {notices.filter(n => n.destinatarios.includes('aluno')).slice(0, 2).map(notice => (
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
      </DashboardLayout>
    </ThemeProvider>
=======

                {/* Value */}
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  mt={2}
                >
                  {card.value}
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* MAIN GRID */}
        <Grid container spacing={2}>
          {/* Atividades Recentes */}
          <Grid item xs={12} size={8}>
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
          <Grid item xs={12} size={4}>
            {/* Próximas Provas */}
            <Paper sx={{ ...retroCard, p: 3, mb: 3 }}>
              <Typography sx={sectionTitle}>Próximas Provas</Typography>
              {nextExams.map(exam => (
                <Box key={exam.titulo}
                  sx={{
                    bgcolor: "#FEF9C3", borderRadius: "12px", p: 2, mb: 2,
                    border: "1px solid #FDE68A"
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
              {mockNotices.slice(0, 2).map(notice => (
                <Box key={notice.id}
                  sx={{
                    bgcolor: "#F4F4F5", borderRadius: "12px", p: 2, mb: 2,
                    border: "1px solid #D1D5DB"
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
>>>>>>> f7ea447154fe7daab842b32d55458407ce57642b
  );
};

export default DashboardAluno;