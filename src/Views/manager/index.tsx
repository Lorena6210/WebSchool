// Views/Manager.tsx - Componente para a página do gestor
import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, List, ListItem, ListItemText } from "@mui/material";
import { FaUserTie } from "react-icons/fa";
import { data } from "@/data";  // Para acessar logs ou controle

interface Usuario {
  Nome: string;
  Id: number;
  Role: string;
}

interface ManagerPageProps {
  usuario: Usuario;
}

export default function ManagerPage({ usuario }: ManagerPageProps) {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Filtrar logs do gestor (assumindo que logs estão no data.gestores)
    const gestor = data.usuarios.managers.find(g => g.id === usuario.Id);
    setLogs(gestor?.logs ?? []);
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
            <FaUserTie />
          </Box>

          <Typography variant="h6" sx={{ mb: "18px", color: "#222", fontWeight: "bold" }}>
            Controle de Acesso - Gestor
          </Typography>

          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
            Logs de Ações:
          </Typography>
          <List dense>
            {logs.map((log, i) => (
              <ListItem key={i} sx={{ py: 0 }}>
                <ListItemText primary={`${log.acao} - ${log.data}`} sx={{ textAlign: "center" }} />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}