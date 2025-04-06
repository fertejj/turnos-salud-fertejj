import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, loading, userData } = useAuth();

  // Mientras se cargan datos del usuario
  if (loading) return <p className="p-4 text-gray-500">Cargando...</p>;

  // Si no está logueado
  if (!user) return <Navigate to="/login" replace />;

  // Si hay roles definidos y el rol del usuario no está permitido
  if (allowedRoles && (!userData || !allowedRoles.includes(userData.role))) {
    return <Navigate to="/" replace />;
  }

  // Si todo está OK, renderiza los children
  return <>{children}</>;
}
