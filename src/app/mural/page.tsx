"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Mural from "@/features/Mural";

export default function MuralPage() {
  return (
    <ProtectedRoute>
      <Mural />
    </ProtectedRoute>
  );
}
