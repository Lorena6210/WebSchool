"use client";

import type { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import type { UserRole } from "@/types";

interface AppPageShellProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  withNavbar?: boolean;
}

export default function AppPageShell({ children, allowedRoles, withNavbar = true }: AppPageShellProps) {
  const content = withNavbar ? <DashboardLayout>{children}</DashboardLayout> : children;

  if (!allowedRoles) {
    return content;
  }

  return <ProtectedRoute allowedRoles={allowedRoles}>{content}</ProtectedRoute>;
}