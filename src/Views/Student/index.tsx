import React, { useState, useEffect } from "react";
import { Box, Card, LinearProgress, Typography, Badge, Grid } from "@mui/material";
import { FaBookOpen } from "react-icons/fa";
import { TurmaCompleta, Disciplina } from "@/types/Turma";
import BasePage from "@/components/BasePage";
import { mockTurmas } from "@/mock/mockTurmas";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface AlunoPageProps {
  usuario: Usuario;
  turmas?: TurmaCompleta[];
}

export default function AulaPage({ usuario, turmas = mockTurmas }: AlunoPageProps) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const turma = turmas[0];

  useEffect(() => {
    setDisciplinas(turma?.disciplinas ?? []);
  }, [turma]);

  return (
    <BasePage usuario={usuario} titulo={turma?.Nome || "Turma"}>
      <Grid container spacing={4} justifyContent="left" sx={{ width: "100%", maxWidth: "1024px" }}>
        {disciplinas.map((disciplina, i) => (
          <Grid item xs={12} sm={6} md={4} key={disciplina.Id}>
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
                <FaBookOpen />
              </Box>

              <Typography variant="h6" sx={{ mb: "18px", color: "#222", fontWeight: "bold" }}>
                {disciplina.Nome}
              </Typography>

              {(disciplina as any).progresso !== undefined && (
                <Box sx={{ mb: "16px" }}>
                  <LinearProgress
                    variant="determinate"
                    value={(disciplina as any).progresso}
                    sx={{
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "linear-gradient(90deg, #4CAF50, #38b6ff)",
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                    {(disciplina as any).progresso}% concluído
                  </Typography>
                </Box>
              )}

              <Badge
                badgeContent={`${i + 1}/${disciplinas.length}`}
                sx={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(56,182,255,.09)",
                  color: "#38b6ff",
                  borderRadius: "20px",
                  fontSize: "0.8em",
                  fontWeight: "600",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </BasePage>
  );
}
