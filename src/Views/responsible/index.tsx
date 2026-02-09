// Views/Responsible.tsx - Componente para a página do responsável
import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, List, ListItem, ListItemText } from "@mui/material";
import { FaUserShield } from "react-icons/fa";
import { data } from "@/data";  // Para acessar alunos e permissões

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface ResponsiblePageProps {
  usuario: Usuario;
}

export default function ResponsiblePage({ usuario }: ResponsiblePageProps) {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [permissoes, setPermissoes] = useState<string[]>([]);

  useEffect(() => {
    // Filtrar alunos e permissões do responsável
    const responsavel = data.usuarios.responsible.find(r => r.id === usuario.Id);
    setAlunos(responsavel?.alunos.map(id => data.usuarios.students.find(a => a.id === id)) ?? []);
    setPermissoes(responsavel?.permissoes ?? []);
  }, [usuario.Id]);

  return (
    <Grid container spacing={4} justifyContent="left" sx={{ width: "100%", maxWidth: "1024px" }}>
      <Grid item xs={12}>
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
            <FaUserShield />
          </Box>

          <Typography variant="h6" sx={{ mb: "18px", color: "#222", fontWeight: "bold" }}>
            Dados do Aluno - Responsável
          </Typography>

          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
            Alunos:
          </Typography>
          <List dense>
            {alunos.map((aluno) => (
              <ListItem key={aluno.id} sx={{ py: 0 }}>
                <ListItemText primary={aluno.nome} sx={{ textAlign: "center" }} />
              </ListItem>
            ))}
          </List>

          <Typography variant="body2" sx={{ color: "#666", mb: 1, mt: 2 }}>
            Permissões:
          </Typography>
          <List dense>
            {permissoes.map((perm, i) => (
              <ListItem key={i} sx={{ py: 0 }}>
                <ListItemText primary={perm} sx={{ textAlign: "center" }} />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}