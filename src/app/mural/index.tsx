'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { ALL_USER_ROLES } from '@/types';
import { MainView } from './components';

export default function MuralRoot() {
  return (
    <ProtectedRoute allowedRoles={ALL_USER_ROLES}>
      <MainView />
    </ProtectedRoute>
  );
}