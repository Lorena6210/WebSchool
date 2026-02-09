// Views/Login.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";

interface Usuario {
  id: number;  // Padronizado para lowercase
  nome: string;
  ra?: string;
  email?: string;
  status: string;
  senha?: string;
}

interface Dados {
  alunos: Usuario[];  // Padronizado para português
  professores: Usuario[];
  responsaveis: Usuario[];
  gestores: Usuario[];
}

interface LoginProps {
  usuariosProp: Dados;
}

export default function Login({ usuariosProp }: LoginProps) {
  const router = useRouter();
  const [campoPrincipal, setCampoPrincipal] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("aluno");  // Corrigido: "studants" → "aluno" (padronizado português)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateRA = (ra: string) => /^RA\d+$/i.test(ra);

  const handleLogin = () => {
  setError("");
    if (!campoPrincipal.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    if (tipo === "students" && !validateRA(campoPrincipal)) {
      setError("RA inválido. Ex: RA1003");
      return;
    }
    let usuarioEncontrado: Usuario | undefined;  // Corrigido: Adicionado "undefined"
    switch (tipo) {
      case "aluno":
        usuarioEncontrado = usuariosProp.alunos.find(  // Corrigido: "students" → "alunos"
          (u) => u.ra?.toLowerCase() === campoPrincipal.toLowerCase()  // Corrigido: "RA" → "ra"
        );
        break;
      case "professor":
        usuarioEncontrado = usuariosProp.professores.find(
          (u) => u.email?.toLowerCase() === campoPrincipal.toLowerCase()
        );
        break;
      case "responsavel":
        usuarioEncontrado = usuariosProp.responsaveis.find(
          (u) => u.email?.toLowerCase() === campoPrincipal.toLowerCase()
        );
        break;
      case "gestor":
        usuarioEncontrado = usuariosProp.gestores.find(
          (u) => u.email?.toLowerCase() === campoPrincipal.toLowerCase()
        );
        break;
    }
    if (!usuarioEncontrado) {
      setError(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} não encontrado.`);
      return;
    }
    if (usuarioEncontrado.senha !== password) {
      setError("Senha incorreta.");
      return;
    }
    router.push(`/${tipo}/${usuarioEncontrado.id}`);  // Corrigido: "Id" → "id"
  };

  // Renderização do campo dinâmico
  const renderCampoPrincipal = () => {
    const getLabelAndPlaceholder = () => {
      switch (tipo) {
        case "aluno":
          return { label: "RA (Registro Acadêmico)", placeholder: "Ex: RA1003" };
        case "professor":
          return { label: "Email Institucional", placeholder: "professor@escola.com" };
        case "responsavel":
          return { label: "Email", placeholder: "responsavel@escola.com" };
        case "gestor":
          return { label: "Email Administrativo", placeholder: "gestor@escola.com" };
        default:
          return { label: "", placeholder: "" };
      }
    };

    const { label, placeholder } = getLabelAndPlaceholder();

    return (
      <TextField
        fullWidth
        label={label}
        placeholder={placeholder}
        value={campoPrincipal}
        onChange={(e) => setCampoPrincipal(e.target.value)}
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: tipo === "aluno" ? "#eff6ff" : tipo === "professor" ? "#f0fdf4" : tipo === "responsavel" ? "#fffbeb" : "#faf5ff",
            borderRadius: 3,
          },
        }}
        autoFocus
      />
    );
  };

  // Ícone para cada tipo de usuário
  const userIcon = () => {
    const iconProps = { size: 40 };
    switch (tipo) {
      case "aluno": return <FaUserGraduate {...iconProps} style={{ color: "#3b82f6" }} />;
      case "professor": return <FaChalkboardTeacher {...iconProps} style={{ color: "#22c55e" }} />;
      case "responsavel": return <FaUserShield {...iconProps} style={{ color: "#eab308" }} />;
      case "gestor": return <FaUserTie {...iconProps} style={{ color: "#a855f7" }} />;
      default: return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "linear-gradient(to bottom right, #dbeafe, #fce7f3, #fef3c7)",
      }}
    >
      {/* Lado esquerdo */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        {/* Mascote/Ilustração */}
        <Box
          component="img"
          src="/mascote-escola.svg"
          alt="Mascote estudando"
          sx={{
            width: 320,
            height: 320,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
            animation: "bounce 2s infinite",
          }}
        />
      </Box>
      {/* Lado direito */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            borderTop: "10px solid #3b82f6",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            {userIcon()}
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af", mt: 1, mb: 0.5 }}>
              Bem-vindo!
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280" }}>
              Faça login para acessar sua área
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de usuário</InputLabel>
            <Select
              value={tipo}
              label="Tipo de usuário"
              onChange={(e) => {
                setTipo(e.target.value);
                setCampoPrincipal("");
                setPassword("");
                setError("");
              }}
              sx={{ backgroundColor: "#f9fafb", borderRadius: 3 }}
            >
              <MenuItem value="aluno">Aluno</MenuItem>
              <MenuItem value="professor">Professor</MenuItem>
              <MenuItem value="responsavel">Responsável</MenuItem>
              <MenuItem value="gestor">Gestor</MenuItem>
            </Select>
          </FormControl>
          {renderCampoPrincipal()}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 3,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            component="a"
            href="/esqueceu-senha"
            sx={{
              display: "block",
              textAlign: "right",
              fontSize: "0.75rem",
              mb: 2,
              color: "#2563eb",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Esqueceu a senha?
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, backgroundColor: "#fef2f2", borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1.125rem",
              background: "linear-gradient(to right, #3b82f6, #ec4899)",
              "&:hover": {
                background: "linear-gradient(to right, #ec4899, #3b82f6)",
              },
              boxShadow: 2,
            }}
          >
            Entrar
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#374151" }}>
            Não tem conta?{" "}
            <Typography
              component="a"
              href="/cadastro"
              sx={{
                color: "#1e40af",
                textDecoration: "underline",
                "&:hover": { color: "#ec4899" },
              }}
            >
              Se cadastre...
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}