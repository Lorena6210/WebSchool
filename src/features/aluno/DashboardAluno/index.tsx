'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, ThemeProvider } from '@mui/material';
import { BookOutlined, AssignmentOutlined, NotificationsNoneOutlined, BarChartOutlined } from '@mui/icons-material';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme as useAppTheme } from '@/lib/context/ThemeContext';
import { getRoleAccent } from '@/lib/theme/roleAccent';
import { MockAPI } from '@/lib/mockData';
import type { Activity, Exam, Grade, Notice } from "@/types";
import DashboardLayout from '@/components/DashboardLayout';
import {
  DashboardAlunoHeader,
  StatCardsGrid,
  RecentActivitiesCard,
  UpcomingExamsCard,
  ImportantNoticesCard,
  DashboardAlunoLoading,
} from './components';
import { getDashboardAlunoTheme } from './utils';

const DashboardAluno = () => {
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const isDark = theme === 'dark';
  const accentColor = getRoleAccent(user?.role);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? 'Bom dia'
      : today.getHours() < 18
        ? 'Boa tarde'
        : 'Boa noite';

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

    fetchData();
  }, []);

  // Lógica de Dados
  const pendingActivities = activities.filter((a) => a.status === 'pendente');
  const lateActivities = activities.filter((a) => a.status === 'atrasado');
  const nextExams = exams.slice(0, 3);
  const unreadNotices = notices.filter(n => n.destinatarios.includes('aluno')).length;
  const avgGrade = grades.length > 0 ? grades.reduce((acc, g) => acc + (g.media || 0), 0) / grades.length : 0;

  if (isLoading) {
    return <DashboardAlunoLoading isDark={isDark} accentColor={accentColor} />;
  }

  const statCards = [
    {
      title: "Atividades Pendentes",
      value: pendingActivities.length,
      subtitle: "Para entregar",
      icon: <BookOutlined />,
      color: accentColor,
      textColor: accentColor,
    },
    {
      title: "Provas Próximas",
      value: nextExams.length,
      subtitle: "Este bimestre",
      icon: <AssignmentOutlined />,
      color: accentColor,
      textColor: accentColor,
    },
    {
      title: "Média Geral",
      value: avgGrade.toFixed(1),
      subtitle: "Todas as disciplinas",
      icon: <BarChartOutlined />,
      color: accentColor,
      textColor: accentColor,
    },
    {
      title: "Avisos",
      value: unreadNotices,
      subtitle: "Não lidos",
      icon: <NotificationsNoneOutlined />,
      color: accentColor,
      textColor: accentColor,
    }
  ];

  const filteredNotices = notices.filter(n => n.destinatarios.includes('aluno'));

  return (
    <ThemeProvider theme={getDashboardAlunoTheme(isDark)}>
        <Box sx={{
          width: "100%",
          minHeight: '100vh',
          bgcolor: isDark ? '#0c0c14' : '#f2f7ff',
          fontFamily: "Poppins, sans-serif",
          py: 3,
        }}>
          <Container maxWidth="lg">

            {/* HEADER */}
            <DashboardAlunoHeader
              isDark={isDark}
              greeting={greeting}
              userName={user?.nome.split(' ')[0] || 'Aluno'}
              accentColor={accentColor}
              pendingCount={pendingActivities.length}
              examsCount={nextExams.length}
            />

            {/* TOP CARDS */}
            <StatCardsGrid isDark={isDark} cards={statCards} accentColor={accentColor} />

            {/* SECTION TITLE */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 4, height: 20, borderRadius: 2, bgcolor: accentColor }} />
                <Typography fontWeight="700" sx={{ color: isDark ? '#f0f0f8' : '#0f2747' }} fontSize="0.95rem">
                  Visão Geral
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: isDark ? 'rgba(240,240,248,0.45)' : 'rgba(15,39,71,0.55)' }} fontWeight={500}>
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Typography>
            </Box>

            {/* MAIN GRID */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, pb: 5 }}>
              {/* Atividades Recentes */}
              <RecentActivitiesCard
                isDark={isDark}
                accentColor={accentColor}
                activities={activities}
                lateActivitiesCount={lateActivities.length}
              />

              {/* Coluna Lateral (Provas e Avisos) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                <UpcomingExamsCard isDark={isDark} accentColor={accentColor} exams={nextExams} />
                <ImportantNoticesCard isDark={isDark} accentColor={accentColor} notices={filteredNotices} />
              </Box>
            </Box>

          </Container>
        </Box>
    </ThemeProvider>
  );
};

export default DashboardAluno;