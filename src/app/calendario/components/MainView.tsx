"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { CalendarCheck2, CalendarDays, Plus, Shapes, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useCalendarData } from "@/hooks/useCalendarData";
import CalendarGrid from "./CalendarGrid";
import EventPanel from "./EventPanel";

const ACCENT = "#3B4FD8";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.03)",
        },
      },
    },
  },
});

export default function MainView() {
  const canEdit = false;
  const {
    isLoading,
    error,
    today,
    currentYear,
    currentMonth,
    selectedDay,
    cells,
    selectedDayEvents,
    allMonthEvents,
    provasNoMes,
    reunioesNoMes,
    getEventsForDay,
    prevMonth,
    nextMonth,
    goToToday,
    onDayClick,
  } = useCalendarData();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
                  <CalendarDays size={20} color="white" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#1A1A1A">
                    Agenda Escolar
                  </Typography>
                  <Typography variant="body1" color="#666">
                    {canEdit ? "Organize os dias marcados da escola" : "Visualize sua agenda escolar com os dias marcados"}
                  </Typography>
                </Box>
              </Box>

              {canEdit ? (
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  onClick={() => toast.info("Funcionalidade de criacao de evento disponivel em breve.")}
                  sx={{
                    bgcolor: ACCENT,
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 2,
                    "&:hover": { bgcolor: "#2D3FB8" },
                  }}
                >
                  Novo Evento
                </Button>
              ) : null}
            </Box>
            <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
          </Box>

          {isLoading ? (
            <Paper sx={{ p: 8, textAlign: "center", bgcolor: "#FAFAFC" }}>
              <Typography color="#6B7280">Carregando calendario...</Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Grid container spacing={3}>
                {[
                  {
                    title: "Dias marcados no mes",
                    value: new Set(allMonthEvents.map((e) => e.data)).size,
                    icon: <CalendarCheck2 size={16} color="#1D4ED8" />,
                    color: "#DBEAFE",
                    textColor: "#1D4ED8",
                  },
                  {
                    title: "Provas",
                    value: provasNoMes,
                    icon: <Sparkles size={16} color="#C2410C" />,
                    color: "#FFEDD5",
                    textColor: "#C2410C",
                  },
                  {
                    title: "Reunioes",
                    value: reunioesNoMes,
                    icon: <Shapes size={16} color="#A16207" />,
                    color: "#FEF3C7",
                    textColor: "#A16207",
                  },
                ].map((card) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 25px rgba(59, 79, 216, 0.12)",
                        },
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box
                          position="absolute"
                          left={0}
                          top={0}
                          bottom={0}
                          sx={{ width: "8px" }}
                          bgcolor={card.textColor}
                        />
                        <Typography
                          variant="overline"
                          sx={{
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: "#888",
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {card.icon}
                        </Box>
                      </Box>
                      <Typography variant="h4" fontWeight="bold" color="#1A1A1A" mt={2}>
                        {card.value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                  <CalendarGrid
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    selectedDay={selectedDay}
                    cells={cells}
                    today={today}
                    onPrevMonth={prevMonth}
                    onNextMonth={nextMonth}
                    onGoToday={goToToday}
                    onDayClick={onDayClick}
                    getEventsForDay={getEventsForDay}
                  />
                </Grid>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <EventPanel
                    selectedDay={selectedDay}
                    currentMonth={currentMonth}
                    allMonthEvents={allMonthEvents}
                    selectedDayEvents={selectedDayEvents}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
