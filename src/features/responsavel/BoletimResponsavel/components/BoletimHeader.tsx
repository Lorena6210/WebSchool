import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { School } from "@mui/icons-material";
import { ACCENT } from "../utils";

interface BoletimHeaderProps {
  studentName: string;
  studentClass: string;
}

export function BoletimHeader({ studentName, studentClass }: BoletimHeaderProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>
          <School sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#f0f0f8">
            Boletim
          </Typography>
          <Typography variant="body1" color="rgba(240,240,248,0.6)">
            {studentName} · Turma {studentClass}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: ACCENT, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
    </Box>
  );
}
