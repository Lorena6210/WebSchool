"use client";

import { GroupsOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { sectionTitleSx } from "../../utils";

type TurmaData = {
  turma: string;
  alunos: number;
  mediaGeral: number;
  aprovados: number;
};

type TurmasBarChartCardProps = {
  accent: string;
  data: TurmaData[];
};

export function TurmasBarChartCard({ accent, data }: TurmasBarChartCardProps) {
  return (
    <Paper
      sx={{
        p: 4,
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
        border: "1px solid rgba(15,39,71,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: `${accent}66`,
          boxShadow: "0 8px 22px rgba(15,39,71,0.16)",
        },
      }}
    >
      <Typography sx={sectionTitleSx(accent)}>
        <GroupsOutlined sx={{ fontSize: 20 }} />
        Alunos por Turma
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,39,71,0.1)" />
          <XAxis dataKey="turma" tick={{ fontSize: 12, fill: "rgba(15,39,71,0.72)" }} />
          <YAxis tick={{ fontSize: 12, fill: "rgba(15,39,71,0.72)" }} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid rgba(15,39,71,0.18)",
              borderRadius: 8,
              color: "#0f2747",
            }}
            labelStyle={{ color: "#0f2747" }}
            itemStyle={{ color: "rgba(15,39,71,0.85)" }}
          />
          <Bar dataKey="alunos" fill={accent} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
