// Views/Teacher.tsx - Componente para a página do professor
import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, List, ListItem, ListItemText } from "@mui/material";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TurmaCompleta } from "@/types/Turma";
import { mockTurmas } from "@/mock/mockTurmas";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface TeacherPageProps {
  usuario: Usuario;
  turmas?: TurmaCompleta[];
}

export default function TeacherPage({ usuario, turmas = mockTurmas }: TeacherPageProps) {
  const [turmasProfessor, setTurmasProfessor] = useState<TurmaCompleta[]>([]);

  useEffect(() => {
    // Filtrar turmas onde o professor leciona (assumindo que o ID do professor está nas turmas)
    const turmasFiltradas = turmas.filter(turma => turma.professores.includes(usuario.Id));
    setTurmasProfessor(turmasFiltradas);
  }, [turmas, usuario.Id]);

  return (
    <Grid container spacing={4} justifyContent="left" sx={{ width: "100%", maxWidth: "1024px" }}>
      {turmasProfessor.map((turma, i) => (
        <Grid item xs={12} sm={6} md={4} key={turma.id}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.85)",
              borderRadius: "20px",
              p: "32px 24px",
              textAlign: "center",
              minWidth: "200px",
              minHeight: "180px",
              boxShadow: "0 8px 32px rgba(56,182,255,0.10)",
              transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(56,182,255,0.13)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-7px) scale(1.03)",
                boxShadow: "0 16px 32px rgba(56,182,255,0.18)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "250px",
                height: "5px",
                background: "linear-gradient(90deg,#F76969,#4CAF50,#38b6ff)",
              }}
            />

            <Box
              sx={{
                width: "54px",
                height: "54px",
                mx: "auto",
                mb: "16px",
                borderRadius: "14px",
                backgroundColor: "#e3fcec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4CAF50",
                fontSize: "2rem",
              }}
            >
              <FaChalkboardTeacher />
            </Box>

            <Typography variant="h6" sx={{ mb: "18px", color: "#222", fontWeight: "bold" }}>
              {turma.nome}
            </Typography>

            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Disciplinas:
            </Typography>
            <List dense>
              {turma.disciplinas.map((discId) => (
                <ListItem key={discId} sx={{ py: 0 }}>
                  <ListItemText primary={`Disciplina ${discId}`} sx={{ textAlign: "center" }} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}