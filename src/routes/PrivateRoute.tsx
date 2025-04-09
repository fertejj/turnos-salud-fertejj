import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import Spinner from "../shared/components/ui/Spinner";

type Role = "admin" | "profesional" ;

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

// Type guard para validar si un string es un Role válido
const isValidRole = (role: string): role is Role => {
  return ["admin", "profesional"].includes(role);
};

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, userData, loading } = useAuth();

  // Esperar carga completa
  if (loading) {
    return <Spinner />;
  }

  // Usuario no logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuario logueado pero sin permisos
  if (
    allowedRoles &&
    (!userData || !isValidRole(userData.role) || !allowedRoles.includes(userData.role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
