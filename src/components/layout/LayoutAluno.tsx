'use client';

import React from 'react';
import { Box } from '@mui/material';
import NavbarAluno from './NavbarAluno';

export default function LayoutAluno({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex">
      
      {/* NAVBAR FIXA */}
      <Box
        sx={{
          width: "280vh",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1200
        }}
      >
        <NavbarAluno />
      </Box>

      {/* CONTEÚDO */}
      <Box
        sx={{
          marginLeft: `260px`,
          width: `calc(100% - 260px)`,
          minHeight: "100vh",
          overflowY: "auto"
        }}
      >
        {children}
      </Box>

    </Box>
  );
}