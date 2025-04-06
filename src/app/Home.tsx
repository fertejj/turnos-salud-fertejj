import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

export default function Home() {
  const { user, userData } = useAuth(); // Asegurate de tener userData. Debe contener el campo `role`.
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !userData) return;

    if (userData.role === "profesional") {
      navigate("/dashboard/profesional");
    } else if (userData.role === "admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/login"); // fallback en caso de rol desconocido
    }
  }, [user, userData, navigate]);

  return null; // No se renderiza nada, solo redirección
}
