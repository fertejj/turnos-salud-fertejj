import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import Spinner from "../shared/components/Spinner";

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, loading, userData } = useAuth();

  // Mientras se cargan los datos del usuario
  if (loading) {
    return <Spinner/>
  }

  // Usuario no logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuario sin permisos para esta ruta
  if (allowedRoles && (!userData || !allowedRoles.includes(userData.role))) {
    return <Navigate to="/" replace />;
  }

  // Usuario autorizado
  return <>{children}</>;
}
