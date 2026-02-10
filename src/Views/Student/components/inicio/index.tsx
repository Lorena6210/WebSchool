// /Views/Student/components/inicio.tsx
import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, Grid } from "@mui/material";

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface Disciplina {
  Id: number;
  Nome: string;
  Nota: number;
  progresso: number;
}

interface TurmaCompleta {
  Id: number;
  Nome: string;
  disciplinas: Disciplina[];
}

interface AlunoInicioProps {
  usuario: Usuario;
  turma: TurmaCompleta;
}

export default function AlunoInicio({ usuario, turma }: AlunoInicioProps) {
  return (
    <Grid container spacing={4} justifyContent="left" height={"81.2vh"}>
      <List sx={{ width: "100%" }}>
        {turma.disciplinas.map((disc) => (
          <ListItem key={disc.Id} sx={{ mb: 1 }}>
            <Card sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {disc.Nome}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Nota: {disc.Nota} | Progresso: {disc.progresso}%
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}