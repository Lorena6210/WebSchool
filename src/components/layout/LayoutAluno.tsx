'use client';

import React from 'react';
import { Box } from '@mui/material';
import NavbarAluno from './NavbarAluno';

export default function LayoutAluno({ children }: { children: React.ReactNode }) {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <NavbarAluno />
      <Box>
        {children}
      </Box>
    </Box>
  );
}