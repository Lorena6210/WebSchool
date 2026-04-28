import { Avatar, Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";

type BoletimHeaderProps = {
  isDark: boolean;
  accent: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  action?: ReactNode;
};

export default function BoletimHeader({ isDark, accent, title, subtitle, icon, action }: BoletimHeaderProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: accent, width: 48, height: 48 }}>{icon}</Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold" color={isDark ? "#f0f0f8" : "#0f2747"}>
              {title}
            </Typography>
            <Typography variant="body1" color={isDark ? "rgba(240,240,248,0.6)" : "rgba(15,39,71,0.7)"}>
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {action ? <Box>{action}</Box> : null}
      </Box>
      <Divider sx={{ borderColor: accent, width: "100px", mt: 2, borderBottomWidth: "2px" }} />
    </Box>
  );
}
