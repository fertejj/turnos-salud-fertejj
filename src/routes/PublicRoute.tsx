// src/router/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../features/auth/context/AuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard/profesional" replace />;
  }

  return <>{children}</>;
}
