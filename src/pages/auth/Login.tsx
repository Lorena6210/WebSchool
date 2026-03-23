'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Button, Divider, Grid, IconButton,
  InputAdornment, TextField, Typography, Paper,
  Avatar,
  Container
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '@/lib/context/AuthContext';

const demoAccounts = [
  { role: "Aluno", identifier: "2024001", password: "aluno123", color: "#6B21A8", acesso:"aluno" },
  { role: "Responsável", identifier: "maria.ferreira@email.com", password: "resp123", color: "#B45309", acesso:"responsavel" },
  { role: "Professor", identifier: "carlos.mendes@escola.edu.br", password: "prof123", color: "#166534", acesso:"professor" },
  { role: "Gestor", identifier: "ana.paula@escola.edu.br", password: "gestor123", color: "#3B4FD8", acesso:"gestor" },
];

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    const result = await login(identifier.trim(), password);

    setIsLoading(false);

    if (!result.success) {
      alert(result.error || 'Credenciais inválidas.');
      return;
    }

    router.push('/mural');
  };

  const fillDemo = (acc: (typeof demoAccounts)[0]) => {
    setIdentifier(acc.identifier);
    setPassword(acc.password);
  };


  return (
    <Box
    sx={{
      m: 0,
      p: 0,
      position: "relative",
      width: "100vw",
      minHeight: "50vh",
      bgcolor: '#FDFAF5',
      display: 'flex',
      flexDirection: 'row',
    }}>
      {/* {matchesMd && ( */}
        <Box sx={{
          m: 0,
          bgcolor: "#1C1917",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 8,
          position: "relative",
          overflow: "hidden",
          minHeight:'100vh',
          width:"40%"
        }}>
          {/* Branding */}
          <Box zIndex={2} width={"100%"}>
            <Box display="flex" alignItems="center" gap={2} mb={5}>
              <Avatar sx={{ bgcolor: "#3B4FD8", borderRadius: 2 }}>
                <SchoolIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "'Fraunces', serif" }}>
                  Creamywork Neck
                </Typography>
                <Typography variant="caption" color="white" sx={{ opacity: 0.5 }}>
                  Plataforma Educacional
                </Typography>
              </Box>
            </Box>
            <Typography variant="h4" fontWeight={700} mb={1}
              sx={{ fontFamily: "'Fraunces', serif" }}>
              Aprendizado que<br />
              <Box component="span" sx={{ color: "#F59E0B" }}>transforma vidas</Box>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 320 }}>
              Uma plataforma completa para alunos, professores, responsáveis e gestores escolares.
            </Typography>
          </Box>
          {/* Hero image */}
          <Box
            zIndex={2}
            flex={1}
            display="flex"
            alignItems="center"
            // justifyContent=""
            padding={"10px"}
          >

              {/* Imagem principal */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: '60%',
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: '0 10px 36px rgba(59,79,216,0.10), 0 2px 10px rgba(0,0,0,0.04)',
                  border: '3px solid #ECE9E1',
                  transition: 'transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s',
                }}
              >
                <img
                  src="image.png"
                  alt="Elementos educacionais"
                  style={{
                    width:'100%',
                    height:'auto',
                    display:'block',
                    borderRadius:'24px',
                    objectFit:'cover'
                  }}
                />
            </Box>
          </Box>
          <Typography variant="caption" color="#fff" sx={{ opacity: .25 }} zIndex={2}>
            © 2026 Creamywork Neck. Todos os direitos reservados.
          </Typography>

          {/* Decoração de fundo */}
          <Box
            sx={{
              position: "absolute",
              top: -90,
              right: -90,
              width: 220,
              height: 220,
              bgcolor: "#3B4FD8",
              opacity: .10,
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 150,
              height: 150,
              bgcolor: "#6B21A8",
              opacity: .10,
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
        </Box>

      {/* Direita - Formulário */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width:"100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >

      <Paper elevation={0} sx={{ background: 'transparent', boxShadow: 'none', width: '100%', maxWidth: 500, px: { xs: 2, sm: 4 } }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', fontFamily: "'Fraunces', serif", mb: 1, fontSize: { xs: 32, sm: 40 } }}>
          Bem-vindo de volta
        </Typography>
        <Typography variant="body1" sx={{ color: '#9A9489', mb: 4 }}>
          Faça login com seu RA (alunos) ou e-mail.
        </Typography>

        <form autoComplete="off" onSubmit={handleLogin}>
          <TextField
            label="RA ou E-mail"
            placeholder="Ex: 2024001 ou email@escola.edu.br"
            variant="outlined"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            fullWidth
            sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button 
            fullWidth 
            type="submit" 
            size="large" 
            disabled={isLoading}
            sx={{ bgcolor:'#1C1917', borderRadius:'16px', color:'white', py:1.6, mb:2.5 }}
          >
            {isLoading ? "Entrando..." : "Entrar na Plataforma"}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>Contas de demonstração</Divider>

        <Grid container spacing={1}mb={1}>
          {demoAccounts.map(acc => (
            <Grid item xs={6} key={acc.role} width={"48%"}>
              <Button
                onClick={() => fillDemo(acc)}
                startIcon={
                  <span 
                    style={{ 
                      width:10, 
                      height:10, 
                      borderRadius:'50%', 
                      backgroundColor:acc.color, 
                      display:'inline-block' 
                    }}
                  />
                }
                sx={{ 
                  bgcolor:'#fff', 
                  borderRadius:2, 
                  border:'2px solid #ECE9E1', 
                  color:'#181818', 
                  textTransform:'none', 
                  justifyContent:'start', 
                  px:2, 
                  py:.8 
                }}
                fullWidth
              >
                {acc.role}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography textAlign="center" variant="caption" sx={{color:'#9A9489'}}>
          Clique em um perfil para preencher automaticamente
        </Typography>
      </Paper>
      </Container>
    </Box>
  );
}